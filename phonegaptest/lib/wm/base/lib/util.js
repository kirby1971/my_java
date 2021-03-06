/*
 *  Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

dojo.provide('wm.base.lib.util');

/**
	@namespace Master namespace for all WaveMaker library objects.
*/
wm = window["wm"] || {};

// simple logging
wm.logErrors = false;
wm.log = function() {
	console.log.apply(console, arguments);
}

// strings

wm.capitalize = function(s) {
	return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}

wm.decapitalize = function(s) {
	return s ? s.charAt(0).toLowerCase() + s.slice(1) : "";
}

wm.camelcase = function(s) {
    return s.replace(/[\.-](.?)/g, function(inChar) {console.log(inChar);return inChar[1].toUpperCase();})
}

wm.flattenObject = function(inObj, keepOld) {
    var outObj = {};
    for (var prop in inObj) {
	if (!inObj[prop])
	    continue;

	if (typeof inObj[prop] != "object") {
	    outObj[prop] = inObj[prop];
	} else {
	    var tmpObj = wm.flattenObject(inObj[prop]);
	    if (keepOld) outObj[prop] = tmpObj;
	    for (var prop2 in tmpObj) outObj[prop + "." + prop2] = tmpObj[prop2];
	}
    }
    return outObj;
}

/* Use this instead of dojo.clone when you don't want to recurse through the full depth
 * of the object.  Full recursion can cause infinite recursion; almost certain to do this
 * for a Component which has an owner and child component where each points to the other.
 */
 wm.shallowClone = function(inObj) {
    var result = {};
    wm.forEachProperty(inObj, function(inValue, inKey) {
        result[inKey] = inValue;
    });
    return result;
 }

wm.requireCss = function(modulepath) {
/*
    var replaceSubstr = 'lib/dojo/dojo/../../../lib';
    if (modulepath.indexOf(replaceSubstr) == 0) {
	modulepath = "lib" + modulepath.substring(replaceSubstr.length);
    }
    modulepath = ((modulepath.charAt(0) == "/" || modulepath.match(/^\w+:/)) ? "" : dojo.baseUrl) + modulepath;

    var parts = modulepath.split(".");
    var filename = parts.pop();
    var path = parts.join(".");
    */

    var path = wm.dojoModuleToPath(modulepath) + ".css";
    wm.requireCssPath(path);
}
wm.dojoModuleToPath = function(modulepath) {
    var lastIndex = modulepath.lastIndexOf(".");
    var filename = modulepath.substring(lastIndex + 1);
    var modulepath = modulepath.substring(0,lastIndex);
    var path = dojo.moduleUrl(modulepath).path.replace(/lib\/\//, "lib/") + filename;

    while (path.match(/[^\/]\/\.\.\//)) {
        path = path.replace(/[^\/]*\/\.\.\/+/, "");
    }
    return path;
}
wm.requireCssPath = function(path) {
    var styleNodeId = "CSS_" + path.replace(/\./g,"_").replace(/\//g,"_");
    var stylenode = dojo.byId(styleNodeId);
    if (stylenode) return;

    stylenode = document.createElement("link");
    stylenode.rel = "stylesheet";
    stylenode.id = styleNodeId;
    stylenode.type="text/css";
    stylenode.href = path;
    document.getElementsByTagName("head")[0].appendChild(stylenode);
}


wm.isEqual = function (a1, a2){
	try{
		if(a1 == a2)
			return true;
		if(dojo.isArray(a1) && dojo.isArray(a2))
			return dojo.toJson([].concat(a1).sort()) == dojo.toJson([].concat(a2).sort())
		return dojo.toJson(a1) == dojo.toJson(a2)
	} catch(e) {
		console.info('Could not compare objects ', arguments, ' therefore returning false. Error ', e);
		return false;
	}
}

wm.compareStrings = function(a, b) {
	return a < b ? -1 : a == b ? 0 : 1;
}

wm.toTitleCase = function(s){
	return s.replace(/\b\w+\b/g, function(word) {
		return word ? word.charAt(0).toUpperCase() + (word.slice(1) || "").toLowerCase() : "";
	});
}

wm.delimCat = function(inPrefix, inSuffix, inDelim) {
	return inPrefix + (inPrefix && inSuffix ? inDelim : "") + inSuffix;
}

wm.joinEx = function(inValues, inDelim) {
	var i = 0;
	while (i < inValues.length) {
		if (inValues[i++] !== "")
			inValues.splice(--i, 1);
	}
	return inValues.join(inDelim);
}

// number

wm.isNumber = function(v) {
	return (typeof v == 'number') || (v instanceof Number);
}

wm.max = function(list) {
  var max = list[0];
  for (var i = 1; i < list.length; i++) if (list[i] > max) max = list[i];
  return max;
}
wm.sum = function(list) {
  var sum = 0;
  for (var i = 0; i < list.length; i++) sum += list[i];
  return sum;
}

wm.average = function(list) {
  return wm.sum(list)/list.length;
}

// lang

wm.nop = function() {};

wm.isEmpty = function(inObj) {
    /* ACE Editor's libraries changed fundamental aspects of javascript objects in IE such that our default handling here is invalid */
    if (window["studio"] && dojo.isIE == 8) {
	if (dojo.isArray(inObj) && inObj.length == 0) return true;
	if (typeof inObj == "object") {
	    for (var i in inObj) {
		if (!dojo.isFunction(inObj[i])) {
		    return false;
		}
	    }
	}

    } else {
	for (var i in inObj)
		return false;
    }
    // for (var i in inObj) finds no properties
    if (typeof inObj == "object" && inObj instanceof Date)
        return false;
    return true;
}

wm.fire = function(obj, method, args) {
	var f = obj && method && obj[method];
	if (f)
		return args ? f.apply(obj, args) : f.call(obj);
}

wm.async = function(f, delay) {
	return function(){setTimeout(f, delay || 1);};
}

wm.forEach = function(inObject, inFunc) {
	if (dojo.isArray(inObject))
		dojo.forEach(inObject, inFunc);
	else
		wm.forEachProperty(inObject, inFunc);
}

wm.forEachProperty = function(inObject, inFunc) {
	for (var i in inObject) {
	    if (!inObject.hasOwnProperty || inObject.hasOwnProperty(i)) {
		inFunc(inObject[i], i);
	    }
	}
}

wm.isDomShowing = function(inNode) {
    var n = inNode;
    while(n && n != window.document.body && n.style.display != "none") {
	n = n.parentNode;
    }
    return !n || n.style.display != "none";
}

wm.evalJs = function(inJavascript, inDefault) {
	var r = inDefault || "";
	try {
		r = eval(inJavascript);
	} catch(e) {
		wm.logging && console.log("Error evaluating Javascript:", e);
	}
	return r;
};

wm.getClassProp = function(inClassName, inProp) {
	var klass = dojo.getObject(inClassName);
	var ptype = klass && klass.prototype;
	return ptype && ptype[inProp];
}

// DOM

wm.showHideNode = function(inNode, inTrueToShow) {
	inNode.style.display = inTrueToShow ? "" : "none";
};

wm.kids = function(inNode, inTag) {
	var result = [], t=inTag.toUpperCase();
	for (var i=0, n; (n=inNode.childNodes[i]); i++)
		if (n.tagName == inTag)
			result.push(n);
	return result;
}

wm.divkids = function(inNode) {
	return wm.kids(inNode, 'div');
}

wm.clearSelection = function() {
	try{
		if (window.getSelection)
			window.getSelection().collapseToEnd();
		else if (document.selection)
			document.selection.clear();
	}catch(e){
	}
}

wm.focusOnIdle = function(inNode) {
	setTimeout(function() {
		try {
			wm.fire(inNode, "focus");
			wm.fire(inNode, "select");
		} catch(e) {};
	}, 1);
}

wm.inScrollbar = function(e) {
	var t = e.target;
	var s = t.style && dojo.getComputedStyle(t);
	return  s && (
		((s.overflow != 'hidden' || s.overflowX != 'hidden') && (t.scrollWidth != t.offsetWidth) && (t.offsetWidth - 19 - e.clientX < 0)) ||
		((s.overflow != 'hidden' || s.overflowY != 'hidden') && (t.scrollHeight != t.offsetHeight) && (t.offsetHeight - 19 - e.clientY < 0))
	);
};

wm.preloadImage = function(inPath) {
	var i = new Image();
	i.src = inPath;
	(wm.preloaded = (wm.preloaded || [])).push(i);
}

// style

wm.setUnitsBox = function(node, l, t, w, h) {
	with (node.style) {
		l&&(left = l);
		t&&(top = t);
		w&&(width = w);
		h&&(height = h);
	}
}

wm.getNaturalBox = function(node){
	var tn = node.tagName, cs = dojo.getComputedStyle(node), box = dojo._getContentBox(node, cs);
	if(tn=="BUTTON" || tn=="TABLE"){
		var pb = dojo._getPadBorderExtents(node, cs);
		box.w += pb.w;
		box.h += pb.h;
	}
	return box;
}

wm.calcOffset = function(inNode, inAncestor, inAdjustMargin) {
	var o = { x:0, y: 0}, n = inNode, cs, mb, be;
	while (n && n != inAncestor && n != document) {
		cs = dojo.getComputedStyle(n);
		mb = dojo._getMarginBox(n, cs);
		be = dojo._getBorderExtents(n, cs);
		me = inAdjustMargin ? dojo._getMarginExtents(n, cs) : {l:0, t:0};
		o.x += mb.l + be.l + me.l - (n.scrollLeft || 0);
		o.y += mb.t + be.t + me.t - (n.scrollTop || 0);
		n = n.parentNode;
	}
	return o;
}

wm.addRemoveClass = function(node, classn, addRemove) {
	dojo[addRemove ? "addClass" : "removeClass"](node, classn);
}

// misc

wm.onidle = function( /*hitch args*/ ) {
    var args = [];
    for (var i = 0; i in arguments; i++) {
        args.push(arguments[i]);
    }
    if (app && app.debugDialog) {
        var eventChain = app.debugDialog.cacheEventChain();
    }
    window.setTimeout(function() {
        if (eventChain) {
            app.debugDialog.restoreEventChain(eventChain);
        }
        dojo.hitch.apply(null, args)();
        if (eventChain) {
            app.debugDialog.clearEventChain();
        }
    }, 1);
}
wm.onidleChain = function(functionList, stateObj) {
    if (!stateObj) stateObj = {};
    var f2 = function(methods) {
            window.setTimeout(function() {
                var f = methods.shift();
                if (f) f();
                if (methods.length && !stateObj.canceled) f2(methods);
            }, 1);
        }
    if (!stateObj.canceled) f2(functionList, stateObj);

}
wm.job = function(inName, inDelay, inJob1, inJob2) {
    var inJob;
    if (inJob1 && inJob2) {
        inJob = dojo.hitch(inJob1, inJob2);
    } else if (inJob2) {
        inJob = inJob2;
    } else {
        inJob = inJob1;
    }
    wm.cancelJob(inName);
    if (window["app"] && app.debugDialog) {
        var eventChain = app.debugDialog.cacheEventChain();
    }
    var job = function() {
            delete wm._jobs[inName];
            if (eventChain) {
                app.debugDialog.restoreEventChain(eventChain);
            }
            inJob();
            if (eventChain) {
                app.debugDialog.clearEventChain();
            }
        }
    wm._jobs[inName] = setTimeout(job, inDelay);
}
wm.cancelJob = function(inName) {
    clearTimeout(wm._jobs[inName]);
}
wm._jobs = {};
wm.hasJob = function(inName) {
    return Boolean(wm._jobs[inName]);
}
wm.connectEvents = function(inObject, inNode, inEvents) {
    // FIXME: maybe remove this at some point
    if (!dojo.isArray(inEvents)) {
        throw ("wm.connectEvents: event list must be an array (did you use variable args?)")
    };
    var links = [];
    for (var i = 0, e;
    (e = inEvents[i]); i++) {
        links.push(dojo.connect(inNode, 'on' + e, inObject, e));
    }
    return links;
}

wm._isUniqueName = function(inName, inNameSpaces) {
    for (var j = 0, s;
    (s = inNameSpaces[j]); j++)
    if (s[inName] !== undefined) return false;
    return true;
}

wm.findUniqueName = function(inName, inNameSpaces) {
	if (wm._isUniqueName(inName, inNameSpaces))
		return inName;
	var m = (inName || '').match(/([^\d]*)([\d]*)/);
	var i = m[2] || 1, n0 = m[1] || 'noname';
	do {
		inName = n0 + (i > 0 ? i : '');
		i++;
	} while (!wm._isUniqueName(inName, inNameSpaces));
	return inName;
}

wm.getValidJsName = function(inName) {
    var dc = "_";
    inName = inName.replace(new RegExp("[- ]", "g"), dc);

    /*********************************************************
     * This used to be     inName = inName.replace(new RegExp("[^a-zA-Z0-9_]", "g"), "");
     * however this is unfriendly to valid unicode strings.  Instead
     * we now use an algorithm for determining if we have a valid name and if not, trimming
     * characters until we have a valid name
     */
    var isInvalid = true;
    if (inName.match(/^[0-9]/)) {
        inName = ["zero","one","two","three","four","five","six","seven","eight","nine"][inName[0]] + inName.substring(1);
    }
    for (var i = 0; i < inName.length && isInvalid; i++) {
        try { /* Declare var inName in an inner function so it doesn't polute the window object's name space */
            var result = eval("(function() {var " + inName + " = 5; return " + inName + ";})()");
            if (result == 5) {
                isInvalid = false;
            }
        } catch (e) {};
        if (isInvalid) {
            inName = inName.substring(0, i) + inName.substring(i, i + 1).replace(/[^a-zA-Z0-9]+/g, '') + inName.substring(i + 1);
            var result = eval("(function() {var " + inName + " = 5; return " + inName + ";})()"); // if the name is still invalid, throw an error
        }
    }

    /*
    if (inName.match(new RegExp("^[0-9]")) || !inName)
    inName = dc + inName;
    */
    if (inName == "_") inName = "";
    return inName;
}

wm._modules = [];
wm.loadModule = function(inModule) {
	if (!wm._modules[inModule]) {
		tag = [ '<scrip', 't type="text/javascript" src="', inModule, '.js"></scrip', 't>' ].join('');
		document.write(tag);
		wm._modules[inModule] = true;
	}
}

wm.widgetIsShowing = function(inWidget) {
	var w = inWidget, p;
	while (w) {
		p = w.parent;
		if (!w.showing || (w.isActive && !w.isActive()))
			return false;
		w = p;
	}
	return true;
}

wm.forEachWidget = function(inWidget, inFunc, inIgnoreBuiltin) {
	if (inFunc&&inFunc(inWidget) === false)
		return false;
	if (!inWidget)
		return false;

    /* TODO: if inIgnoreBuiltin is false, perhaps we should use inWidget.widgets instead of getOrderedWidgets */
    for (var i=0, ws = inIgnoreBuiltin && inWidget instanceof wm.PageContainer ? [] : inWidget.getOrderedWidgets(), r, w; w=ws[i]; i++) {

		if (w.forEachWidget && !inIgnoreBuiltin) {
		    r = inFunc(w);
		    if (r !== false)
			r = w.forEachWidget(inFunc);
		} else {
		    r = wm.forEachWidget(w, inFunc, inIgnoreBuiltin);
		}

	    if (r === false)
		return false;
	}
}

// if inFunc returns false, do not call on its widgets; unlike wm.forEachWidgets though, it does NOT mean cancel calling on other subtrees
wm.forEachVisibleWidget = function(inWidget, inFunc, inIgnoreBuiltin) {
    var result;
    if (inFunc && inWidget && !inWidget.isAncestorHidden()) result = inFunc(inWidget);

    if (result !== false && (!inIgnoreBuiltin || !wm.isInstanceType(inWidget, [wm.PageContainer, wm.Composite]))) {
        for (var i = 0, ws = inWidget.getOrderedWidgets(), r, w; w = ws[i]; i++) {
            if (w.forEachVisibleWidget && !inIgnoreBuiltin) {
                w.forEachVisibleWidget(inFunc);
            } else {
                 wm.forEachVisibleWidget(w, inFunc, inIgnoreBuiltin);
            }
        }
    }
}

// themes
wm.theme = {
	getPath: function() {
			return dojo.moduleUrl("lib.wm.base","widget/themes/" + "default/");
	},
	getImagesPath: function() {
		return wm.theme.getPath() + "images/";
	}
};

//utility: ensure dijit tooltip is hidden
wm.hideToolTip = function(inImmediate) {
	var tt = dijit._masterTT;
	if (tt) {
		dijit.hideTooltip(tt.aroundNode);
		tt._onDeck=null;
		if (inImmediate && tt.fadeOut) {
			tt.fadeOut.stop(true);
			dojo.style(tt.fadeOut.node, "opacity", 0);
		}
	}
};

wm.focusContainer = function(inContainer) {
	wm.onidle(function() {
		wm.forEachWidget(inContainer, function(w) {
			if (w && w.focus && (!w.canFocus || w.canFocus())) {
				w.focus();
				return false;
			}
		});
	});
}

/*
wm.isInstanceType = function(obj, type){
	try
	{
		if (!obj)
			return false;
		if (obj.instanceType)
			return obj.instanceType[type];
		else
			return (obj instanceof dojo.getObject(type));
	}
	catch(e)
	{
		console.info('failed responding to instanceType query with obj = ', obj, ' and type = ', type);
	}

	return false;
}
*/


wm.isClassInstanceType = function(inClass, type) {
    try {
        return type && inClass.prototype instanceof type;
    } catch(e) {}
    return false;
}
wm.isInstanceType = function(obj, types){
    if (types && typeof types == "object" && types.length) {
	for (var i = 0; i < types.length; i++) {
	    if (types[i] && obj instanceof types[i]) return true;
	}
	return false;
    } else {
	return types && obj instanceof types;
    }
}


wm.getWidgetByDomNode = function(element) {
        if (!element) return;
        if (dojo.isString(element))
                element = dojo.byId(element);
        if (!element) return;
        var pageName = app._page.name;
        var reg = new RegExp("^(" + pageName + "|app)_?");

        // If the node has no ID, then its a subnode of one of our widgets, find the node with the REAL ID.
        while ((!element.id || !element.id.match(reg)) && element.parentNode) element = element.parentNode;
        var id = element.id;
        if (!id) return;

        var originalId = id;
        var id = id.replace(reg,"");
        var elements = id.split(/_+/);
        var name = "";
        var widget = (originalId.match(/^app_/)) ? app : app._page;
        for (var i = 0; i < elements.length; i++) {
            if (wm.isInstanceType(widget, wm.PageDialog)) {
                widget = widget.pageContainer;
            }
                if (wm.isInstanceType(widget, wm.PageContainer) || wm.isInstanceType(widget, wm.pageContainerMixin)) {
                        widget = widget.page;
                        name = "";
                } else {
                        name += ((name) ? "_" : "") + elements[i];
                        if (wm.isInstanceType(widget, wm.Application)) {
                                if (widget[name]) {
                                        widget = widget[name];
                                        name = "";
                                }

                        } else {
                                if (widget.$[name]) {
                                        widget = widget.$[name];
                                        name = "";
                                }
                        }
                }
        }
        return widget;
}

wm.isNode = function(inObject) {
    if (window["Node"]) return inObject instanceof Node;
    if (typeof inObject == "object" && inObject) return "nodeType" in inObject && "appendChild" in inObject;
}

if (!wm.Array) wm.Array = {};

/* Side effect: alters input inArray Object.  Returns inArray Object; Return is mostly used for chaining operations together */
wm.Array.removeElementAt = function(inArray, inIndex) {
    inArray.splice(inIndex, 1);
    return inArray;
}

wm.Array.insertElementAt = function(inArray, inElement, inIndex) {
    inArray.splice(inIndex, 0, inElement);
}

/* Side effect: alters input inArray Object.  Returns inArray Object; Return is mostly used for chaining operations together */
wm.Array.removeElement = function(inArray, inElement) {
    var index = dojo.indexOf(inArray, inElement);
    if (index >= 0)
	inArray.splice(index, 1);
    return inArray;
}

wm.Array.equals = function(a, b,optionalCallback) {
    if (a == b) return true;
    if (!a || !b) return false;
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++) {
	if (optionalCallback) {
	    if (!optionalCallback(a[i],b[i])) return false;
	} else {
	    if (a[i] != b[i]) return false;
	}
    }
    return true;
}


wm.Array.indexOf = function(inArray, inValue, inCallback) {
    for (var i = 0; i < inArray.length; i++) {
        if (inCallback(inArray[i], inValue))
            return i;
    }
    return -1;
}

wm.Array.last = function(inArray) {
    return inArray[inArray.length-1];
}

if (!wm.String) wm.String = {};
wm.String.endStringWith = function(inString, inEnd) {
    if (!inString.match(new RegExp(inEnd + "$")))
	return inString + inEnd;
    else
	return inString;
}



setCss = function(inSheetId, inCss){
	var sheet = dojo.byId(inSheetId);
	if (!sheet)
		return;
	inCss = inCss || "";
	if(sheet.styleSheet) {//IE
		// must make sure to set cssText to at least empty string or IE can crash
		if (dojo.isIE < 7)
			setIe6Css(sheet, inCss);
		else
			sheet.styleSheet.cssText = inCss;
	} else {
		sheet.firstChild && sheet.removeChild(sheet.firstChild);
		sheet.appendChild(document.createTextNode(inCss));
	}
}

// IE6 doesn't allow setting cssText so replace the style node completely
setIe6Css = function(inSheet, inCss) {
	var c = document.documentElement.firstChild, id = inSheet.id;
	c.removeChild(inSheet);
	var n = document.createElement("style");
	n.id = id;
	n.type = "text/css";
	if (n.styleSheet)
		n.styleSheet.cssText = inCss;
	else
		n.appendChild(document.createTextNode(inCss));
	c.appendChild(n);
}

/* Stupid hack to hide a conditional dojo.require package from the build system
   so that something like touchscroll doesn't get built into the core libraries -- especially
   since nonwebkit browsers break on touchscroll and its a useless library for desktop apps.
   The bulid system searches for "dojo.require", by using dojo["require"] the
   build system ignores this and doesn't try to add this package into the layer.
 */
wm.conditionalRequire = function(packageName, condition) {
    if (arguments.length == 1 || condition)
	dojo["require"](packageName);
}


wm.getBackgroundStyle = function(startColor, endColor, colorStop, direction, browser) {
    if (!browser) {
	if (dojo.isWebKit) {
	    browser = "webkit";
	} else if (dojo.isMoz) {
	    browser = "moz";
	} else if (dojo.isOpera) {
	    browser = "opera";
	} else if (dojo.isIE < 10) {
	    browser = "ieold";
	} else if (dojo.isIE >= 10) {
	    browser = "ie10";
	}
    }
    var result = "-linear-gradient(" + (direction == "vertical" ? "top" : "left") + ", " + startColor + " 0%," + endColor + " " + colorStop + "%," + endColor + " 100%)";
	switch(browser) {
	case "webkit":
	    // return  "-webkit" + result; sadly some mobile webkit browsers don't support this
	    return "-webkit-gradient(linear, " + (direction == "vertical" ? "center top, center bottom" : "left center, right center") + ", from(" + startColor + "), color-stop(" + colorStop + "%," + endColor+"), to(" + endColor+"))";
	case "moz":
	    return  "-moz" + result;
	case "ieold":
	    return  "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + startColor + "', endColorstr='" + endColor + "',GradientType=" + (direction == "vertical" ? 0 : 1) + ")";
	case "ie10":
	    return  "-ms" + result;
	case "opera":
	    return "-o" + result;
	}


    }


 wm.getStyleFromNode = function(inNode, inStyle){
	var result = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		result = document.defaultView.getComputedStyle(inNode, "").getPropertyValue(inStyle);
	}
	else if(inNode.currentStyle){
		inStyle = inStyle.replace(/\-(\w)/g, function (ignore, dashLetter){
			return dashLetter.toUpperCase();
		});
		result = inNode.currentStyle[inStyle];
	}
	return result;
}

/* Moved to here because both DataForm and LiveForm layers need these */
wm.getParentForm = function(inWidget) {
	var w = inWidget.parent;
	var r = inWidget.getRoot();
	r = r && r.root;
	while (w && w != r) {
	    if (wm.isInstanceType(w, [wm.LiveFormBase,wm.DataForm])) {
			return w;
		}
		w = w.parent;
	}
}

wm.getFormLiveView = function(inForm) {
	var lv = inForm && inForm.findLiveVariable();
	return lv && lv.liveView;
}

wm.getFormField = function(inWidget) {
	var a = [], w = inWidget;
        while (w && !(wm.isInstanceType(w, wm.LiveForm))) {
		if (w.formField)
			a.unshift(w.formField);
		w = wm.getParentForm(w);
	}
	return a.join('.');
}