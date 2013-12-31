var uriTemplates= require("uri-templates"),
  rc2d,
  event= require("eventemitter2").EventEmitter2,
  util= require("util"),
  instance= 0

/**
  Method to compile a template which latter to perform "de-substitution"
*/
module.exports.compileTemplate= function(template){
	return uriTemplates(template)
}

/**
  Name of method used against the compiled template to actually "de-substitute"
*/
module.exports._desub= "fromUri"

/**
  Markup this property that we have done our thing.
*/
module.exports._mark= "_reddit"


/**
  Code-generator for template checking
*/
module.exports.makeStanza= function(tries,o,opts){
	opts= opts||{}
	var out= ["var r,fn,o,exps"+opts.expless?"":"= this._exports"]
	for(var i in tries){
		var t= tries[i]
		if(o[t] instanceof Function){
			out.push("o= this."+t"(req.url)")
		}else{
			out.push("r= this."+t+"||exps['"+t+"']", // exports lookups will be slower
			  "if(r instanceof String) r= (this[r]||exps[r])",
			  "o= r[this._desub||exp.desub](req.url)")
		}
		out.push(
		  "if(o){",
		  "  req[this._mark||this.exps._mark||'"+module.exports._mark+"']= o",
		  "  this.events.emit("+o.instance+",o,'"+t+"',this)"
		  "  return"
		  "}")
		}
	}
	var fn= new Function("req","res", opts.join("\n").bind(o)
}


/**
  Construct a new instance
*/
module.exports= function(opts){
	opts= opts||{}
	var o= {instance: instance++,
	    events= module.exports.globalEventEmitter,  
	    _exports= module.expi
	  },
	  regulars= module.exports._regulars,
	  extras,
	  expless= true

	// slot names
	if(opts._desub) o._desub= opts.desub
	if(opts._mark) o._mark= opts.mark

	// in the copy case, we build a bunch of options that we know
	if(opts.copy){
		o._copy= true
		if((opts.action && opts.action instanceof Function)||module.exports.action instanceof Function) {
			regulars= ["action"]
		}
	}

	// assemble the normal options
	for(var i in regulars){
		var r= regulars[i]
		// is there an option for this regular?
		o[r]= opts[r]
		// if it's a copy, we can try to resolve functions now. or just store it.
		if(opts.copy && o[r] instanceof String){
			o[r]= module.exports[o[r]]||o[r]
		}
		// if we lack a resolved thing or it's not a function, we need to defer to runtime
		if(!o[r] || !(o[r] instanceof Function)){
			expless= false
		}
	}

	// ready: feed 
	var rv= module.exports.makeStanzas(regulars,o,{expless:expless})
	rv.on= function(evs,cb){
		evs.unshift(o.instance)
		return o.events.on(evs,cb)
	}
}

/**
  Build/rebuild the base system (which we'll do for the first time immediately after)
*/
module.exports.reconf= function(opts){
	rc2d= require("rc2.d")()
	if(opts.keep === false || !module.exports.globalEventEmitter)
		module.exports.globalEventEmitter = new EventEmitter()

	// reset
	module.exports.action= null
	module.exports.up= null 
	module.exports.down= null
	module.exports.save= null

	// set
	if(rc2d.action){
		module.exports.action= module.exports.compileTemplate(rc2d.action)
	}else{
		module.exports.up= module.exports.compileTemplate(rc2d.up)
		module.exports.down= module.exports.compileTemplate(rc2d.down)
		module.exports.save= module.exports.compileTemplate(rc2d.save)
	}

	module.exports._regulars= rc2d.regulars||["action","up","down","save","share"]
}

// (now reconf'ing for the first time)
module.exports.reconf()
