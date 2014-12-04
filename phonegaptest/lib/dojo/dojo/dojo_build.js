/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is an optimized version of Dojo, built for deployment and not for
	development. To get sources and documentation, please visit:

		http://dojotoolkit.org
*/

(function(){
var _1=null;
if((_1||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){
var _2="",_3="",_4="",_5={},_6={};
_1=_1||djConfig.scopeMap;
for(var i=0;i<_1.length;i++){
var _7=_1[i];
_2+="var "+_7[0]+" = {}; "+_7[1]+" = "+_7[0]+";"+_7[1]+"._scopeName = '"+_7[1]+"';";
_3+=(i==0?"":",")+_7[0];
_4+=(i==0?"":",")+_7[1];
_5[_7[0]]=_7[1];
_6[_7[1]]=_7[0];
}
eval(_2+"dojo._scopeArgs = ["+_4+"];");
dojo._scopePrefixArgs=_3;
dojo._scopePrefix="(function("+_3+"){";
dojo._scopeSuffix="})("+_4+")";
dojo._scopeMap=_5;
dojo._scopeMapRev=_6;
}
(function(){
if(typeof this["loadFirebugConsole"]=="function"){
this["loadFirebugConsole"]();
}else{
this.console=this.console||{};
var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];
var i=0,tn;
while((tn=cn[i++])){
if(!console[tn]){
(function(){
var _8=tn+"";
console[_8]=("log" in console)?function(){
var a=Array.apply({},arguments);
a.unshift(_8+":");
console["log"](a.join(" "));
}:function(){
};
console[_8]._fake=true;
})();
}
}
}
if(typeof dojo=="undefined"){
dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};
}
var d=dojo;
if(typeof dijit=="undefined"){
dijit={_scopeName:"dijit"};
}
if(typeof dojox=="undefined"){
dojox={_scopeName:"dojox"};
}
if(!d._scopeArgs){
d._scopeArgs=[dojo,dijit,dojox];
}
d.global=this;
d.config={isDebug:false,debugAtAllCosts:false};
var _9=typeof djConfig!="undefined"?djConfig:typeof dojoConfig!="undefined"?dojoConfig:null;
if(_9){
for(var c in _9){
d.config[c]=_9[c];
}
}
dojo.locale=d.config.locale;
var _a="$Rev: 24595 $".match(/\d+/);
dojo.version={major:1,minor:6,patch:1,flag:"24595",revision:_a?+_a[0]:NaN,toString:function(){
with(d.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
if(typeof OpenAjax!="undefined"){
OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());
}
var _b,_c,_d={};
for(var i in {toString:1}){
_b=[];
break;
}
dojo._extraNames=_b=_b||["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"];
_c=_b.length;
dojo._mixin=function(_e,_f){
var _10,s,i;
for(_10 in _f){
s=_f[_10];
if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){
_e[_10]=s;
}
}
if(_c&&_f){
for(i=0;i<_c;++i){
_10=_b[i];
s=_f[_10];
if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){
_e[_10]=s;
}
}
}
return _e;
};
dojo.mixin=function(obj,_11){
if(!obj){
obj={};
}
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(obj,arguments[i]);
}
return obj;
};
dojo._getProp=function(_12,_13,_14){
var obj=_14||d.global;
for(var i=0,p;obj&&(p=_12[i]);i++){
if(i==0&&d._scopeMap[p]){
p=d._scopeMap[p];
}
obj=(p in obj?obj[p]:(_13?obj[p]={}:undefined));
}
return obj;
};
dojo.setObject=function(_15,_16,_17){
var _18=_15.split("."),p=_18.pop(),obj=d._getProp(_18,true,_17);
return obj&&p?(obj[p]=_16):undefined;
};
dojo.getObject=function(_19,_1a,_1b){
return d._getProp(_19.split("."),_1a,_1b);
};
dojo.exists=function(_1c,obj){
return d.getObject(_1c,false,obj)!==undefined;
};
dojo["eval"]=function(_1d){
return d.global.eval?d.global.eval(_1d):eval(_1d);
};
d.deprecated=d.experimental=function(){
};
})();
(function(){
var d=dojo,_1e;
d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_1f){
var mp=d._modulePrefixes;
return !!(mp[_1f]&&(mp[_1f].value||mp[_1f].fixed));
},_modulePathLocked:function(_20){
var mp=d._modulePrefixes;
var _21=_20&&_20.replace(/\..*$/,"");
return mp[_21]&&mp[_21].fixed;
},_getModulePrefix:function(_22){
var mp=d._modulePrefixes;
if(d._moduleHasPrefix(_22)){
return mp[_22].value;
}
return _22;
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadPath=function(_23,_24,cb){
var uri=(_24&&d._modulePathLocked(_24.split(/\./)[0])||(_23.charAt(0)=="/"||_23.match(/^\w+:/))?"":d.baseUrl)+_23;
try{
_1e=_24;
return !_24?d._loadUri(uri,cb):d._loadUriAndCheck(uri,_24,cb);
}
catch(e){
console.error(e);
return false;
}
finally{
_1e=null;
}
};
dojo._loadUri=function(uri,cb){
if(d._loadedUrls[uri]){
return true;
}
d._inFlightCount++;
var _25=d._getText(uri,true);
if(_25){
d._loadedUrls[uri]=true;
d._loadedUrls.push(uri);
if(cb){
_25=/^define\(/.test(_25)?_25:"("+_25+")";
}else{
_25=d._scopePrefix+_25+d._scopeSuffix;
}
if(!d.isIE){
_25+="\r\n//@ sourceURL="+uri;
}
try{
var _26=d["eval"](_25);
}
catch(e){
}
if(cb){
cb(_26);
}
}
if(--d._inFlightCount==0&&d._postLoad&&d._loaders.length){
setTimeout(function(){
if(d._inFlightCount==0){
d._callLoaded();
}
},0);
}
return !!_25;
};
dojo._loadUriAndCheck=function(uri,_27,cb){
var ok=false;
try{
ok=d._loadUri(uri,cb);
}
catch(e){
console.error("failed loading "+uri+" with error: "+e);
}
return !!(ok&&d._loadedModules[_27]);
};
dojo.loaded=function(){
d._loadNotifying=true;
d._postLoad=true;
var mll=d._loaders;
d._loaders=[];
for(var x=0;x<mll.length;x++){
try{
mll[x]();
}
catch(e){
console.error(e);
}
}
d._loadNotifying=false;
if(d._postLoad&&d._inFlightCount==0&&mll.length){
d._callLoaded();
}
};
dojo.unloaded=function(){
var mll=d._unloaders;
while(mll.length){
(mll.pop())();
}
};
d._onto=function(arr,obj,fn){
if(!fn){
arr.push(obj);
}else{
if(fn){
var _28=(typeof fn=="string")?obj[fn]:fn;
arr.push(function(){
_28.call(obj);
});
}
}
};
dojo.ready=dojo.addOnLoad=function(obj,_29){
d._onto(d._loaders,obj,_29);
if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){
d._callLoaded();
}
};
var dca=d.config.addOnLoad;
if(dca){
d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);
}
dojo._modulesLoaded=function(){
if(d._postLoad){
return;
}
if(d._inFlightCount>0){
console.warn("files still in flight!");
return;
}
d._callLoaded();
};
dojo._callLoaded=function(){
if(typeof setTimeout=="object"||(d.config.useXDomain&&d.isOpera)){
setTimeout(d.isAIR?function(){
d.loaded();
}:d._scopeName+".loaded();",0);
}else{
d.loaded();
}
};
dojo._getModuleSymbols=function(_2a){
var _2b=_2a.split(".");
for(var i=_2b.length;i>0;i--){
var _2c=_2b.slice(0,i).join(".");
if(i==1&&!d._moduleHasPrefix(_2c)){
_2b[0]="../"+_2b[0];
}else{
var _2d=d._getModulePrefix(_2c);
if(_2d!=_2c){
_2b.splice(0,i,_2d);
break;
}
}
}
if(_2b[0]===""){
_2b.shift();
}
return _2b;
};
dojo._global_omit_module_check=false;
dojo.loadInit=function(_2e){
_2e();
};
dojo._loadModule=dojo.require=function(_2f,_30){
_30=d._global_omit_module_check||_30;
_2f=_2f.replace(/i18n\!/,"");
var _31=d._loadedModules[_2f];
if(_31){
return _31;
}
var _32=d._getModuleSymbols(_2f).join("/")+".js";
var _33=!_30?_2f:null;
var ok=d._loadPath(_32,_33);
if(!ok&&!_30){
throw new Error("Could not load '"+_2f+"'; last tried '"+_32+"'");
}
if(!_30&&!d._isXDomain){
_31=d._loadedModules[_2f];
if(!_31){
throw new Error("symbol '"+_2f+"' is not defined after loading '"+_32+"'");
}
}
return _31;
};
dojo.provide=function(_34){
_34=_34+"";
return (d._loadedModules[_34]=d.getObject(_34,true));
};
dojo.platformRequire=function(_35){
var _36=_35.common||[];
var _37=_36.concat(_35[d._name]||_35["default"]||[]);
for(var x=0;x<_37.length;x++){
var _38=_37[x];
if(_38.constructor==Array){
d._loadModule.apply(d,_38);
}else{
d._loadModule(_38);
}
}
};
dojo.requireIf=function(_39,_3a){
if(_39===true){
var _3b=[];
for(var i=1;i<arguments.length;i++){
_3b.push(arguments[i]);
}
d.require.apply(d,_3b);
}
};
dojo.requireAfterIf=d.requireIf;
dojo.registerModulePath=function(_3c,_3d,_3e){
d._modulePrefixes[_3c]={name:_3c,value:_3d,fixed:_3e};
};
dojo.requireLocalization=function(_3f,_40,_41,_42){
d.require("dojo.i18n");
d.i18n._requireLocalization.apply(d.hostenv,arguments);
};
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
dojo._Url=function(){
var n=null,_43=arguments,uri=[_43[0]];
for(var i=1;i<_43.length;i++){
if(!_43[i]){
continue;
}
var _44=new d._Url(_43[i]+""),_45=new d._Url(uri[0]+"");
if(_44.path==""&&!_44.scheme&&!_44.authority&&!_44.query){
if(_44.fragment!=n){
_45.fragment=_44.fragment;
}
_44=_45;
}else{
if(!_44.scheme){
_44.scheme=_45.scheme;
if(!_44.authority){
_44.authority=_45.authority;
if(_44.path.charAt(0)!="/"){
var _46=_45.path.substring(0,_45.path.lastIndexOf("/")+1)+_44.path;
var _47=_46.split("/");
for(var j=0;j<_47.length;j++){
if(_47[j]=="."){
if(j==_47.length-1){
_47[j]="";
}else{
_47.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&_47[0]=="")&&_47[j]==".."&&_47[j-1]!=".."){
if(j==(_47.length-1)){
_47.splice(j,1);
_47[j-1]="";
}else{
_47.splice(j-1,2);
j-=2;
}
}
}
}
_44.path=_47.join("/");
}
}
}
}
uri=[];
if(_44.scheme){
uri.push(_44.scheme,":");
}
if(_44.authority){
uri.push("//",_44.authority);
}
uri.push(_44.path);
if(_44.query){
uri.push("?",_44.query);
}
if(_44.fragment){
uri.push("#",_44.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
dojo._Url.prototype.toString=function(){
return this.uri;
};
dojo.moduleUrl=function(_48,url){
var loc=d._getModuleSymbols(_48).join("/");
if(!loc&&loc!==""){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _49=loc.indexOf(":");
if(!d._modulePathLocked(_48)&&loc.charAt(0)!="/"&&(_49==-1||_49>loc.indexOf("/"))){
loc=d.baseUrl+loc;
}
return new d._Url(loc,url);
};
})();
if(typeof window!="undefined"){
dojo.isBrowser=true;
dojo._name="browser";
(function(){
var d=dojo;
if(document&&document.getElementsByTagName){
var _4a=document.getElementsByTagName("script");
var _4b=/dojo(\.xd)?\.js(\W|$)/i;
for(var i=0;i<_4a.length;i++){
var src=_4a[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_4b);
if(m){
if(!d.config.baseUrl){
d.config.baseUrl=src.substring(0,m.index);
}
var cfg=(_4a[i].getAttribute("djConfig")||_4a[i].getAttribute("data-dojo-config"));
if(cfg){
var _4c=eval("({ "+cfg+" })");
for(var x in _4c){
dojo.config[x]=_4c[x];
}
}
break;
}
}
}
d.baseUrl=d.config.baseUrl;
var n=navigator;
var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);
if(dua.indexOf("Opera")>=0){
d.isOpera=tv;
}
if(dua.indexOf("AdobeAIR")>=0){
d.isAIR=1;
}
d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;
d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;
d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;
d.isMac=dav.indexOf("Macintosh")>=0;
var _4d=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);
if(_4d&&!dojo.isChrome){
d.isSafari=parseFloat(dav.split("Version/")[1]);
if(!d.isSafari||parseFloat(dav.substr(_4d+7))<=419.3){
d.isSafari=2;
}
}
if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){
d.isMozilla=d.isMoz=tv;
}
if(d.isMoz){
d.isFF=parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1])||undefined;
}
if(document.all&&!d.isOpera){
d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
var _4e=document.documentMode;
if(_4e&&_4e!=5&&Math.floor(d.isIE)!=_4e){
d.isIE=_4e;
}
}
if(dojo.isIE&&window.location.protocol==="file:"){
dojo.config.ieForceActiveXXhr=true;
}
d.isQuirks=document.compatMode=="BackCompat";
d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();
d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
d._xhrObj=function(){
var _4f,_50;
if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){
try{
_4f=new XMLHttpRequest();
}
catch(e){
}
}
if(!_4f){
for(var i=0;i<3;++i){
var _51=d._XMLHTTP_PROGIDS[i];
try{
_4f=new ActiveXObject(_51);
}
catch(e){
_50=e;
}
if(_4f){
d._XMLHTTP_PROGIDS=[_51];
break;
}
}
}
if(!_4f){
throw new Error("XMLHTTP not available: "+_50);
}
return _4f;
};
d._isDocumentOk=function(_52){
var _53=_52.status||0,lp=location.protocol;
return (_53>=200&&_53<300)||_53==304||_53==1223||(!_53&&(lp=="file:"||lp=="chrome:"||lp=="chrome-extension:"||lp=="app:"));
};
var _54=window.location+"";
var _55=document.getElementsByTagName("base");
var _56=(_55&&_55.length>0);
d._getText=function(uri,_57){
var _58=d._xhrObj();
if(!_56&&dojo._Url){
uri=(new dojo._Url(_54,uri)).toString();
}
if(d.config.cacheBust){
uri+="";
uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");
}
_58.open("GET",uri,false);
try{
_58.send(null);
if(!d._isDocumentOk(_58)){
var err=Error("Unable to load "+uri+" status:"+_58.status);
err.status=_58.status;
err.responseText=_58.responseText;
if(_57){
return null;
}
throw err;
}
}
catch(e){
if(_57){
return null;
}
throw e;
}
return _58.responseText;
};
var _59=window;
var _5a=function(_5b,fp){
var _5c=_59.attachEvent||_59.addEventListener;
_5b=_59.attachEvent?_5b:_5b.substring(2);
_5c(_5b,function(){
fp.apply(_59,arguments);
},false);
};
d._windowUnloaders=[];
d.windowUnloaded=function(){
var mll=d._windowUnloaders;
while(mll.length){
(mll.pop())();
}
d=null;
};
var _5d=0;
d.addOnWindowUnload=function(obj,_5e){
d._onto(d._windowUnloaders,obj,_5e);
if(!_5d){
_5d=1;
_5a("onunload",d.windowUnloaded);
}
};
var _5f=0;
d.addOnUnload=function(obj,_60){
d._onto(d._unloaders,obj,_60);
if(!_5f){
_5f=1;
_5a("onbeforeunload",dojo.unloaded);
}
};
})();
dojo._initFired=false;
dojo._loadInit=function(e){
if(dojo._scrollIntervalId){
clearInterval(dojo._scrollIntervalId);
dojo._scrollIntervalId=0;
}
if(!dojo._initFired){
dojo._initFired=true;
if(!dojo.config.afterOnLoad&&window.detachEvent){
window.detachEvent("onload",dojo._loadInit);
}
if(dojo._inFlightCount==0){
dojo._modulesLoaded();
}
}
};
if(!dojo.config.afterOnLoad){
if(document.addEventListener){
document.addEventListener("DOMContentLoaded",dojo._loadInit,false);
window.addEventListener("load",dojo._loadInit,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",dojo._loadInit);
if(!dojo.config.skipIeDomLoaded&&self===self.top){
dojo._scrollIntervalId=setInterval(function(){
try{
if(document.body){
document.documentElement.doScroll("left");
dojo._loadInit();
}
}
catch(e){
}
},30);
}
}
}
}
if(dojo.isIE){
try{
(function(){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
var _61=["*","group","roundrect","oval","shape","rect","imagedata","path","textpath","text"],i=0,l=1,s=document.createStyleSheet();
if(dojo.isIE>=8){
i=1;
l=_61.length;
}
for(;i<l;++i){
s.addRule("v\\:"+_61[i],"behavior:url(#default#VML); display:inline-block");
}
})();
}
catch(e){
}
}
}
(function(){
var mp=dojo.config["modulePaths"];
if(mp){
for(var _62 in mp){
dojo.registerModulePath(_62,mp[_62]);
}
}
})();
if(dojo.config.isDebug){
dojo.require("dojo._firebug.firebug");
}
if(dojo.config.debugAtAllCosts){
dojo.require("dojo._base._loader.loader_debug");
}
if(!dojo._hasResource["dojo._base.lang"]){
dojo._hasResource["dojo._base.lang"]=true;
dojo.provide("dojo._base.lang");
(function(){
var d=dojo,_63=Object.prototype.toString;
dojo.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.isArray=function(it){
return it&&(it instanceof Array||typeof it=="array");
};
dojo.isFunction=function(it){
return _63.call(it)==="[object Function]";
};
dojo.isObject=function(it){
return it!==undefined&&(it===null||typeof it=="object"||d.isArray(it)||d.isFunction(it));
};
dojo.isArrayLike=function(it){
return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));
};
dojo.isAlien=function(it){
return it&&!d.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.extend=function(_64,_65){
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(_64.prototype,arguments[i]);
}
return _64;
};
dojo._hitchArgs=function(_66,_67){
var pre=d._toArray(arguments,2);
var _68=d.isString(_67);
return function(){
var _69=d._toArray(arguments);
var f=_68?(_66||d.global)[_67]:_67;
return f&&f.apply(_66||this,pre.concat(_69));
};
};
dojo.hitch=function(_6a,_6b){
if(arguments.length>2){
return d._hitchArgs.apply(d,arguments);
}
if(!_6b){
_6b=_6a;
_6a=null;
}
if(d.isString(_6b)){
_6a=_6a||d.global;
if(!_6a[_6b]){
throw (["dojo.hitch: scope[\"",_6b,"\"] is null (scope=\"",_6a,"\")"].join(""));
}
return function(){
return _6a[_6b].apply(_6a,arguments||[]);
};
}
return !_6a?_6b:function(){
return _6b.apply(_6a,arguments||[]);
};
};
dojo.delegate=dojo._delegate=(function(){
function TMP(){
};
return function(obj,_6c){
TMP.prototype=obj;
var tmp=new TMP();
TMP.prototype=null;
if(_6c){
d._mixin(tmp,_6c);
}
return tmp;
};
})();
var _6d=function(obj,_6e,_6f){
return (_6f||[]).concat(Array.prototype.slice.call(obj,_6e||0));
};
var _70=function(obj,_71,_72){
var arr=_72||[];
for(var x=_71||0;x<obj.length;x++){
arr.push(obj[x]);
}
return arr;
};
dojo._toArray=d.isIE?function(obj){
return ((obj.item)?_70:_6d).apply(this,arguments);
}:_6d;
dojo.partial=function(_73){
var arr=[null];
return d.hitch.apply(d,arr.concat(d._toArray(arguments)));
};
var _74=d._extraNames,_75=_74.length,_76={};
dojo.clone=function(o){
if(!o||typeof o!="object"||d.isFunction(o)){
return o;
}
if(o.nodeType&&"cloneNode" in o){
return o.cloneNode(true);
}
if(o instanceof Date){
return new Date(o.getTime());
}
if(o instanceof RegExp){
return new RegExp(o);
}
var r,i,l,s,_77;
if(d.isArray(o)){
r=[];
for(i=0,l=o.length;i<l;++i){
if(i in o){
r.push(d.clone(o[i]));
}
}
}else{
r=o.constructor?new o.constructor():{};
}
for(_77 in o){
s=o[_77];
if(!(_77 in r)||(r[_77]!==s&&(!(_77 in _76)||_76[_77]!==s))){
r[_77]=d.clone(s);
}
}
if(_75){
for(i=0;i<_75;++i){
_77=_74[i];
s=o[_77];
if(!(_77 in r)||(r[_77]!==s&&(!(_77 in _76)||_76[_77]!==s))){
r[_77]=s;
}
}
}
return r;
};
dojo.trim=String.prototype.trim?function(str){
return str.trim();
}:function(str){
return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
};
var _78=/\{([^\}]+)\}/g;
dojo.replace=function(_79,map,_7a){
return _79.replace(_7a||_78,d.isFunction(map)?map:function(_7b,k){
return d.getObject(k,false,map);
});
};
})();
}
if(!dojo._hasResource["dojo._base.array"]){
dojo._hasResource["dojo._base.array"]=true;
dojo.provide("dojo._base.array");
(function(){
var _7c=function(arr,obj,cb){
return [(typeof arr=="string")?arr.split(""):arr,obj||dojo.global,(typeof cb=="string")?new Function("item","index","array",cb):cb];
};
var _7d=function(_7e,arr,_7f,_80){
var _81=_7c(arr,_80,_7f);
arr=_81[0];
for(var i=0,l=arr.length;i<l;++i){
var _82=!!_81[2].call(_81[1],arr[i],i,arr);
if(_7e^_82){
return _82;
}
}
return _7e;
};
dojo.mixin(dojo,{indexOf:function(_83,_84,_85,_86){
var _87=1,end=_83.length||0,i=0;
if(_86){
i=end-1;
_87=end=-1;
}
if(_85!=undefined){
i=_85;
}
if((_86&&i>end)||i<end){
for(;i!=end;i+=_87){
if(_83[i]==_84){
return i;
}
}
}
return -1;
},lastIndexOf:function(_88,_89,_8a){
return dojo.indexOf(_88,_89,_8a,true);
},forEach:function(arr,_8b,_8c){
if(!arr||!arr.length){
return;
}
var _8d=_7c(arr,_8c,_8b);
arr=_8d[0];
for(var i=0,l=arr.length;i<l;++i){
_8d[2].call(_8d[1],arr[i],i,arr);
}
},every:function(arr,_8e,_8f){
return _7d(true,arr,_8e,_8f);
},some:function(arr,_90,_91){
return _7d(false,arr,_90,_91);
},map:function(arr,_92,_93){
var _94=_7c(arr,_93,_92);
arr=_94[0];
var _95=(arguments[3]?(new arguments[3]()):[]);
for(var i=0,l=arr.length;i<l;++i){
_95.push(_94[2].call(_94[1],arr[i],i,arr));
}
return _95;
},filter:function(arr,_96,_97){
var _98=_7c(arr,_97,_96);
arr=_98[0];
var _99=[];
for(var i=0,l=arr.length;i<l;++i){
if(_98[2].call(_98[1],arr[i],i,arr)){
_99.push(arr[i]);
}
}
return _99;
}});
})();
}
if(!dojo._hasResource["dojo._base.declare"]){
dojo._hasResource["dojo._base.declare"]=true;
dojo.provide("dojo._base.declare");
(function(){
var d=dojo,mix=d._mixin,op=Object.prototype,_9a=op.toString,_9b=new Function,_9c=0,_9d="constructor";
function err(msg,cls){
throw new Error("declare"+(cls?" "+cls:"")+": "+msg);
};
function _9e(_9f,_a0){
var _a1=[],_a2=[{cls:0,refs:[]}],_a3={},_a4=1,l=_9f.length,i=0,j,lin,_a5,top,_a6,rec,_a7,_a8;
for(;i<l;++i){
_a5=_9f[i];
if(!_a5){
err("mixin #"+i+" is unknown. Did you use dojo.require to pull it in?",_a0);
}else{
if(_9a.call(_a5)!="[object Function]"){
err("mixin #"+i+" is not a callable constructor.",_a0);
}
}
lin=_a5._meta?_a5._meta.bases:[_a5];
top=0;
for(j=lin.length-1;j>=0;--j){
_a6=lin[j].prototype;
if(!_a6.hasOwnProperty("declaredClass")){
_a6.declaredClass="uniqName_"+(_9c++);
}
_a7=_a6.declaredClass;
if(!_a3.hasOwnProperty(_a7)){
_a3[_a7]={count:0,refs:[],cls:lin[j]};
++_a4;
}
rec=_a3[_a7];
if(top&&top!==rec){
rec.refs.push(top);
++top.count;
}
top=rec;
}
++top.count;
_a2[0].refs.push(top);
}
while(_a2.length){
top=_a2.pop();
_a1.push(top.cls);
--_a4;
while(_a8=top.refs,_a8.length==1){
top=_a8[0];
if(!top||--top.count){
top=0;
break;
}
_a1.push(top.cls);
--_a4;
}
if(top){
for(i=0,l=_a8.length;i<l;++i){
top=_a8[i];
if(!--top.count){
_a2.push(top);
}
}
}
}
if(_a4){
err("can't build consistent linearization",_a0);
}
_a5=_9f[0];
_a1[0]=_a5?_a5._meta&&_a5===_a1[_a1.length-_a5._meta.bases.length]?_a5._meta.bases.length:1:0;
return _a1;
};
function _a9(_aa,a,f){
var _ab,_ac,_ad,_ae,_af,_b0,_b1,opf,pos,_b2=this._inherited=this._inherited||{};
if(typeof _aa=="string"){
_ab=_aa;
_aa=a;
a=f;
}
f=0;
_ae=_aa.callee;
_ab=_ab||_ae.nom;
if(!_ab){
err("can't deduce a name to call inherited()",this.declaredClass);
}
_af=this.constructor._meta;
_ad=_af.bases;
pos=_b2.p;
if(_ab!=_9d){
if(_b2.c!==_ae){
pos=0;
_b0=_ad[0];
_af=_b0._meta;
if(_af.hidden[_ab]!==_ae){
_ac=_af.chains;
if(_ac&&typeof _ac[_ab]=="string"){
err("calling chained method with inherited: "+_ab,this.declaredClass);
}
do{
_af=_b0._meta;
_b1=_b0.prototype;
if(_af&&(_b1[_ab]===_ae&&_b1.hasOwnProperty(_ab)||_af.hidden[_ab]===_ae)){
break;
}
}while(_b0=_ad[++pos]);
pos=_b0?pos:-1;
}
}
_b0=_ad[++pos];
if(_b0){
_b1=_b0.prototype;
if(_b0._meta&&_b1.hasOwnProperty(_ab)){
f=_b1[_ab];
}else{
opf=op[_ab];
do{
_b1=_b0.prototype;
f=_b1[_ab];
if(f&&(_b0._meta?_b1.hasOwnProperty(_ab):f!==opf)){
break;
}
}while(_b0=_ad[++pos]);
}
}
f=_b0&&f||op[_ab];
}else{
if(_b2.c!==_ae){
pos=0;
_af=_ad[0]._meta;
if(_af&&_af.ctor!==_ae){
_ac=_af.chains;
if(!_ac||_ac.constructor!=="manual"){
err("calling chained constructor with inherited",this.declaredClass);
}
while(_b0=_ad[++pos]){
_af=_b0._meta;
if(_af&&_af.ctor===_ae){
break;
}
}
pos=_b0?pos:-1;
}
}
while(_b0=_ad[++pos]){
_af=_b0._meta;
f=_af?_af.ctor:_b0;
if(f){
break;
}
}
f=_b0&&f;
}
_b2.c=f;
_b2.p=pos;
return f;
};
function _b3(_b4,a,f){
var f=_a9.call(this,_b4,a,f);
if(f){
return a===true?f:f.apply(this,a||_b4);
}
};
function _b5(_b6,_b7){
if(typeof _b6=="string"){
return this.inherited(_b6,_b7,true);
}
return this.inherited(_b6,true);
};
function _b8(cls){
var _b9=this.constructor._meta.bases;
for(var i=0,l=_b9.length;i<l;++i){
if(_b9[i]===cls){
return true;
}
}
return this instanceof cls;
};
function _ba(_bb,_bc){
var _bd,i=0,l=d._extraNames.length;
for(_bd in _bc){
if(_bd!=_9d&&_bc.hasOwnProperty(_bd)){
_bb[_bd]=_bc[_bd];
}
}
for(;i<l;++i){
_bd=d._extraNames[i];
if(_bd!=_9d&&_bc.hasOwnProperty(_bd)){
_bb[_bd]=_bc[_bd];
}
}
};
function _be(_bf,_c0){
var _c1,t,i=0,l=d._extraNames.length;
for(_c1 in _c0){
t=_c0[_c1];
if((t!==op[_c1]||!(_c1 in op))&&_c1!=_9d){
if(_9a.call(t)=="[object Function]"){
t.nom=_c1;
}
_bf[_c1]=t;
}
}
for(;i<l;++i){
_c1=d._extraNames[i];
t=_c0[_c1];
if((t!==op[_c1]||!(_c1 in op))&&_c1!=_9d){
if(_9a.call(t)=="[object Function]"){
t.nom=_c1;
}
_bf[_c1]=t;
}
}
return _bf;
};
function _c2(_c3){
_be(this.prototype,_c3);
return this;
};
function _c4(_c5,_c6){
return function(){
var a=arguments,_c7=a,a0=a[0],f,i,m,l=_c5.length,_c8;
if(!(this instanceof a.callee)){
return _c9(a);
}
if(_c6&&(a0&&a0.preamble||this.preamble)){
_c8=new Array(_c5.length);
_c8[0]=a;
for(i=0;;){
a0=a[0];
if(a0){
f=a0.preamble;
if(f){
a=f.apply(this,a)||a;
}
}
f=_c5[i].prototype;
f=f.hasOwnProperty("preamble")&&f.preamble;
if(f){
a=f.apply(this,a)||a;
}
if(++i==l){
break;
}
_c8[i]=a;
}
}
for(i=l-1;i>=0;--i){
f=_c5[i];
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,_c8?_c8[i]:a);
}
}
f=this.postscript;
if(f){
f.apply(this,_c7);
}
};
};
function _ca(_cb,_cc){
return function(){
var a=arguments,t=a,a0=a[0],f;
if(!(this instanceof a.callee)){
return _c9(a);
}
if(_cc){
if(a0){
f=a0.preamble;
if(f){
t=f.apply(this,t)||t;
}
}
f=this.preamble;
if(f){
f.apply(this,t);
}
}
if(_cb){
_cb.apply(this,a);
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _cd(_ce){
return function(){
var a=arguments,i=0,f,m;
if(!(this instanceof a.callee)){
return _c9(a);
}
for(;f=_ce[i];++i){
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,a);
break;
}
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _cf(_d0,_d1,_d2){
return function(){
var b,m,f,i=0,_d3=1;
if(_d2){
i=_d1.length-1;
_d3=-1;
}
for(;b=_d1[i];i+=_d3){
m=b._meta;
f=(m?m.hidden:b.prototype)[_d0];
if(f){
f.apply(this,arguments);
}
}
};
};
function _d4(_d5){
_9b.prototype=_d5.prototype;
var t=new _9b;
_9b.prototype=null;
return t;
};
function _c9(_d6){
var _d7=_d6.callee,t=_d4(_d7);
_d7.apply(t,_d6);
return t;
};
d.declare=function(_d8,_d9,_da){
if(typeof _d8!="string"){
_da=_d9;
_d9=_d8;
_d8="";
}
_da=_da||{};
var _db,i,t,_dc,_dd,_de,_df,_e0=1,_e1=_d9;
if(_9a.call(_d9)=="[object Array]"){
_de=_9e(_d9,_d8);
t=_de[0];
_e0=_de.length-t;
_d9=_de[_e0];
}else{
_de=[0];
if(_d9){
if(_9a.call(_d9)=="[object Function]"){
t=_d9._meta;
_de=_de.concat(t?t.bases:_d9);
}else{
err("base class is not a callable constructor.",_d8);
}
}else{
if(_d9!==null){
err("unknown base class. Did you use dojo.require to pull it in?",_d8);
}
}
}
if(_d9){
for(i=_e0-1;;--i){
_db=_d4(_d9);
if(!i){
break;
}
t=_de[i];
(t._meta?_ba:mix)(_db,t.prototype);
_dc=new Function;
_dc.superclass=_d9;
_dc.prototype=_db;
_d9=_db.constructor=_dc;
}
}else{
_db={};
}
_be(_db,_da);
t=_da.constructor;
if(t!==op.constructor){
t.nom=_9d;
_db.constructor=t;
}
for(i=_e0-1;i;--i){
t=_de[i]._meta;
if(t&&t.chains){
_df=mix(_df||{},t.chains);
}
}
if(_db["-chains-"]){
_df=mix(_df||{},_db["-chains-"]);
}
t=!_df||!_df.hasOwnProperty(_9d);
_de[0]=_dc=(_df&&_df.constructor==="manual")?_cd(_de):(_de.length==1?_ca(_da.constructor,t):_c4(_de,t));
_dc._meta={bases:_de,hidden:_da,chains:_df,parents:_e1,ctor:_da.constructor};
_dc.superclass=_d9&&_d9.prototype;
_dc.extend=_c2;
_dc.prototype=_db;
_db.constructor=_dc;
_db.getInherited=_b5;
_db.inherited=_b3;
_db.isInstanceOf=_b8;
if(_d8){
_db.declaredClass=_d8;
d.setObject(_d8,_dc);
}
if(_df){
for(_dd in _df){
if(_db[_dd]&&typeof _df[_dd]=="string"&&_dd!=_9d){
t=_db[_dd]=_cf(_dd,_de,_df[_dd]==="after");
t.nom=_dd;
}
}
}
return _dc;
};
d.safeMixin=_be;
})();
}
if(!dojo._hasResource["dojo._base.connect"]){
dojo._hasResource["dojo._base.connect"]=true;
dojo.provide("dojo._base.connect");
dojo._listener={getDispatcher:function(){
return function(){
var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target,r=t&&t.apply(this,arguments),i,lls=[].concat(ls);
for(i in lls){
if(!(i in ap)){
lls[i].apply(this,arguments);
}
}
return r;
};
},add:function(_e2,_e3,_e4){
_e2=_e2||dojo.global;
var f=_e2[_e3];
if(!f||!f._listeners){
var d=dojo._listener.getDispatcher();
d.target=f;
d._listeners=[];
f=_e2[_e3]=d;
}
return f._listeners.push(_e4);
},remove:function(_e5,_e6,_e7){
var f=(_e5||dojo.global)[_e6];
if(f&&f._listeners&&_e7--){
delete f._listeners[_e7];
}
}};
dojo.connect=function(obj,_e8,_e9,_ea,_eb){
var a=arguments,_ec=[],i=0;
_ec.push(dojo.isString(a[0])?null:a[i++],a[i++]);
var a1=a[i+1];
_ec.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);
for(var l=a.length;i<l;i++){
_ec.push(a[i]);
}
return dojo._connect.apply(this,_ec);
};
dojo._connect=function(obj,_ed,_ee,_ef){
var l=dojo._listener,h=l.add(obj,_ed,dojo.hitch(_ee,_ef));
return [obj,_ed,h,l];
};
dojo.disconnect=function(_f0){
if(_f0&&_f0[0]!==undefined){
dojo._disconnect.apply(this,_f0);
delete _f0[0];
}
};
dojo._disconnect=function(obj,_f1,_f2,_f3){
_f3.remove(obj,_f1,_f2);
};
dojo._topics={};
dojo.subscribe=function(_f4,_f5,_f6){
return [_f4,dojo._listener.add(dojo._topics,_f4,dojo.hitch(_f5,_f6))];
};
dojo.unsubscribe=function(_f7){
if(_f7){
dojo._listener.remove(dojo._topics,_f7[0],_f7[1]);
}
};
dojo.publish=function(_f8,_f9){
var f=dojo._topics[_f8];
if(f){
f.apply(this,_f9||[]);
}
};
dojo.connectPublisher=function(_fa,obj,_fb){
var pf=function(){
dojo.publish(_fa,arguments);
};
return _fb?dojo.connect(obj,_fb,pf):dojo.connect(obj,pf);
};
}
if(!dojo._hasResource["dojo._base.Deferred"]){
dojo._hasResource["dojo._base.Deferred"]=true;
dojo.provide("dojo._base.Deferred");
(function(){
var _fc=function(){
};
var _fd=Object.freeze||function(){
};
dojo.Deferred=function(_fe){
var _ff,_100,_101,head,_102;
var _103=(this.promise={});
function _104(_105){
if(_100){
throw new Error("This deferred has already been resolved");
}
_ff=_105;
_100=true;
_106();
};
function _106(){
var _107;
while(!_107&&_102){
var _108=_102;
_102=_102.next;
if((_107=(_108.progress==_fc))){
_100=false;
}
var func=(_101?_108.error:_108.resolved);
if(func){
try{
var _109=func(_ff);
if(_109&&typeof _109.then==="function"){
_109.then(dojo.hitch(_108.deferred,"resolve"),dojo.hitch(_108.deferred,"reject"));
continue;
}
var _10a=_107&&_109===undefined;
if(_107&&!_10a){
_101=_109 instanceof Error;
}
_108.deferred[_10a&&_101?"reject":"resolve"](_10a?_ff:_109);
}
catch(e){
_108.deferred.reject(e);
}
}else{
if(_101){
_108.deferred.reject(_ff);
}else{
_108.deferred.resolve(_ff);
}
}
}
};
this.resolve=this.callback=function(_10b){
this.fired=0;
this.results=[_10b,null];
_104(_10b);
};
this.reject=this.errback=function(_10c){
_101=true;
this.fired=1;
_104(_10c);
this.results=[null,_10c];
if(!_10c||_10c.log!==false){
(dojo.config.deferredOnError||function(x){
console.error(x);
})(_10c);
}
};
this.progress=function(_10d){
var _10e=_102;
while(_10e){
var _10f=_10e.progress;
_10f&&_10f(_10d);
_10e=_10e.next;
}
};
this.addCallbacks=function(_110,_111){
this.then(_110,_111,_fc);
return this;
};
this.then=_103.then=function(_112,_113,_114){
var _115=_114==_fc?this:new dojo.Deferred(_103.cancel);
var _116={resolved:_112,error:_113,progress:_114,deferred:_115};
if(_102){
head=head.next=_116;
}else{
_102=head=_116;
}
if(_100){
_106();
}
return _115.promise;
};
var _117=this;
this.cancel=_103.cancel=function(){
if(!_100){
var _118=_fe&&_fe(_117);
if(!_100){
if(!(_118 instanceof Error)){
_118=new Error(_118);
}
_118.log=false;
_117.reject(_118);
}
}
};
_fd(_103);
};
dojo.extend(dojo.Deferred,{addCallback:function(_119){
return this.addCallbacks(dojo.hitch.apply(dojo,arguments));
},addErrback:function(_11a){
return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));
},addBoth:function(_11b){
var _11c=dojo.hitch.apply(dojo,arguments);
return this.addCallbacks(_11c,_11c);
},fired:-1});
})();
dojo.when=function(_11d,_11e,_11f,_120){
if(_11d&&typeof _11d.then==="function"){
return _11d.then(_11e,_11f,_120);
}
return _11e(_11d);
};
}
if(!dojo._hasResource["dojo._base.json"]){
dojo._hasResource["dojo._base.json"]=true;
dojo.provide("dojo._base.json");
dojo.fromJson=function(json){
return eval("("+json+")");
};
dojo._escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(it,_121,_122){
if(it===undefined){
return "undefined";
}
var _123=typeof it;
if(_123=="number"||_123=="boolean"){
return it+"";
}
if(it===null){
return "null";
}
if(dojo.isString(it)){
return dojo._escapeString(it);
}
var _124=arguments.callee;
var _125;
_122=_122||"";
var _126=_121&&_121!==-1?_122+dojo.toJsonIndentStr:"";
var tf=it.__json__||it.json;
if(dojo.isFunction(tf)){
_125=tf.call(it);
if(it!==_125){
return _124(_125,_121,_126);
}
}
if(it.nodeType&&it.cloneNode){
throw new Error("Can't serialize DOM nodes");
}
var sep=_121&&_121!=-1?" ":"";
var _127=_121===-1&&dojo.isArray(it)&&it.length>0&&typeof it[0]=="object"||_121&&_121!==-1?"\n":"";
if(dojo.isArray(it)){
var res=dojo.map(it,function(obj){
var val=_124(obj,_121,_126);
if(typeof val!="string"){
val="undefined";
}
return _127+_126+val;
});
return "["+res.join(","+sep)+_127+_122+"]";
}
if(_123=="function"){
return null;
}
var _128=[],key;
for(key in it){
var _129,val;
if(typeof key=="number"){
_129="\""+key+"\"";
}else{
if(typeof key=="string"){
_129=dojo._escapeString(key);
}else{
continue;
}
}
val=_124(it[key],_121,_126);
if(typeof val!="string"){
continue;
}
_128.push(_127+_126+_129+":"+sep+val);
}
return "{"+_128.join(","+sep)+_127+_122+"}";
};
}
if(!dojo._hasResource["dojo._base.Color"]){
dojo._hasResource["dojo._base.Color"]=true;
dojo.provide("dojo._base.Color");
(function(){
var d=dojo;
dojo.Color=function(_12a){
if(_12a){
this.setColor(_12a);
}
};
dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:d.config.transparentColor||[255,255,255]};
dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){
var t=this;
t.r=r;
t.g=g;
t.b=b;
t.a=a;
},setColor:function(_12b){
if(d.isString(_12b)){
d.colorFromString(_12b,this);
}else{
if(d.isArray(_12b)){
d.colorFromArray(_12b,this);
}else{
this._set(_12b.r,_12b.g,_12b.b,_12b.a);
if(!(_12b instanceof d.Color)){
this.sanitize();
}
}
}
return this;
},sanitize:function(){
return this;
},toRgb:function(){
var t=this;
return [t.r,t.g,t.b];
},toRgba:function(){
var t=this;
return [t.r,t.g,t.b,t.a];
},toHex:function(){
var arr=d.map(["r","g","b"],function(x){
var s=this[x].toString(16);
return s.length<2?"0"+s:s;
},this);
return "#"+arr.join("");
},toCss:function(_12c){
var t=this,rgb=t.r+", "+t.g+", "+t.b;
return (_12c?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";
},toString:function(){
return this.toCss(true);
}});
dojo.blendColors=function(_12d,end,_12e,obj){
var t=obj||new d.Color();
d.forEach(["r","g","b","a"],function(x){
t[x]=_12d[x]+(end[x]-_12d[x])*_12e;
if(x!="a"){
t[x]=Math.round(t[x]);
}
});
return t.sanitize();
};
dojo.colorFromRgb=function(_12f,obj){
var m=_12f.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);
};
dojo.colorFromHex=function(_130,obj){
var t=obj||new d.Color(),bits=(_130.length==4)?4:8,mask=(1<<bits)-1;
_130=Number("0x"+_130.substr(1));
if(isNaN(_130)){
return null;
}
d.forEach(["b","g","r"],function(x){
var c=_130&mask;
_130>>=bits;
t[x]=bits==4?17*c:c;
});
t.a=1;
return t;
};
dojo.colorFromArray=function(a,obj){
var t=obj||new d.Color();
t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));
if(isNaN(t.a)){
t.a=1;
}
return t.sanitize();
};
dojo.colorFromString=function(str,obj){
var a=d.Color.named[str];
return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);
};
})();
}
if(!dojo._hasResource["dojo._base.window"]){
dojo._hasResource["dojo._base.window"]=true;
dojo.provide("dojo._base.window");
dojo.doc=window["document"]||null;
dojo.body=function(){
return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];
};
dojo.setContext=function(_131,_132){
dojo.global=_131;
dojo.doc=_132;
};
dojo.withGlobal=function(_133,_134,_135,_136){
var _137=dojo.global;
try{
dojo.global=_133;
return dojo.withDoc.call(null,_133.document,_134,_135,_136);
}
finally{
dojo.global=_137;
}
};
dojo.withDoc=function(_138,_139,_13a,_13b){
var _13c=dojo.doc,_13d=dojo._bodyLtr,oldQ=dojo.isQuirks;
try{
dojo.doc=_138;
delete dojo._bodyLtr;
dojo.isQuirks=dojo.doc.compatMode=="BackCompat";
if(_13a&&typeof _139=="string"){
_139=_13a[_139];
}
return _139.apply(_13a,_13b||[]);
}
finally{
dojo.doc=_13c;
delete dojo._bodyLtr;
if(_13d!==undefined){
dojo._bodyLtr=_13d;
}
dojo.isQuirks=oldQ;
}
};
}
if(!dojo._hasResource["dojo._base.event"]){
dojo._hasResource["dojo._base.event"]=true;
dojo.provide("dojo._base.event");
(function(){
var del=(dojo._event_listener={add:function(node,name,fp){
if(!node){
return;
}
name=del._normalizeEventName(name);
fp=del._fixCallback(name,fp);
if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){
var ofp=fp;
name=(name=="mouseenter")?"mouseover":"mouseout";
fp=function(e){
if(!dojo.isDescendant(e.relatedTarget,node)){
return ofp.call(this,e);
}
};
}
node.addEventListener(name,fp,false);
return fp;
},remove:function(node,_13e,_13f){
if(node){
_13e=del._normalizeEventName(_13e);
if(!dojo.isIE&&(_13e=="mouseenter"||_13e=="mouseleave")){
_13e=(_13e=="mouseenter")?"mouseover":"mouseout";
}
node.removeEventListener(_13e,_13f,false);
}
},_normalizeEventName:function(name){
return name.slice(0,2)=="on"?name.slice(2):name;
},_fixCallback:function(name,fp){
return name!="keypress"?fp:function(e){
return fp.call(this,del._fixEvent(e,this));
};
},_fixEvent:function(evt,_140){
switch(evt.type){
case "keypress":
del._setKeyChar(evt);
break;
}
return evt;
},_setKeyChar:function(evt){
evt.keyChar=evt.charCode>=32?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});
dojo.fixEvent=function(evt,_141){
return del._fixEvent(evt,_141);
};
dojo.stopEvent=function(evt){
evt.preventDefault();
evt.stopPropagation();
};
var _142=dojo._listener;
dojo._connect=function(obj,_143,_144,_145,_146){
var _147=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);
var lid=_147?(_146?2:1):0,l=[dojo._listener,del,_142][lid];
var h=l.add(obj,_143,dojo.hitch(_144,_145));
return [obj,_143,h,lid];
};
dojo._disconnect=function(obj,_148,_149,_14a){
([dojo._listener,del,_142][_14a]).remove(obj,_148,_149);
};
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:dojo.isSafari?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,copyKey:dojo.isMac&&!dojo.isAIR?(dojo.isSafari?91:224):17};
var _14b=dojo.isMac?"metaKey":"ctrlKey";
dojo.isCopyKey=function(e){
return e[_14b];
};
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
dojo.mouseButtons={LEFT:1,MIDDLE:4,RIGHT:2,isButton:function(e,_14c){
return e.button&_14c;
},isLeft:function(e){
return e.button&1;
},isMiddle:function(e){
return e.button&4;
},isRight:function(e){
return e.button&2;
}};
}else{
dojo.mouseButtons={LEFT:0,MIDDLE:1,RIGHT:2,isButton:function(e,_14d){
return e.button==_14d;
},isLeft:function(e){
return e.button==0;
},isMiddle:function(e){
return e.button==1;
},isRight:function(e){
return e.button==2;
}};
}
if(dojo.isIE){
var _14e=function(e,code){
try{
return (e.keyCode=code);
}
catch(e){
return 0;
}
};
var iel=dojo._listener;
var _14f=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");
if(!dojo.config._allow_leaks){
_142=iel=dojo._ie_listener={handlers:[],add:function(_150,_151,_152){
_150=_150||dojo.global;
var f=_150[_151];
if(!f||!f[_14f]){
var d=dojo._getIeDispatcher();
d.target=f&&(ieh.push(f)-1);
d[_14f]=[];
f=_150[_151]=d;
}
return f[_14f].push(ieh.push(_152)-1);
},remove:function(_153,_154,_155){
var f=(_153||dojo.global)[_154],l=f&&f[_14f];
if(f&&l&&_155--){
delete ieh[l[_155]];
delete l[_155];
}
}};
var ieh=iel.handlers;
}
dojo.mixin(del,{add:function(node,_156,fp){
if(!node){
return;
}
_156=del._normalizeEventName(_156);
if(_156=="onkeypress"){
var kd=node.onkeydown;
if(!kd||!kd[_14f]||!kd._stealthKeydownHandle){
var h=del.add(node,"onkeydown",del._stealthKeyDown);
kd=node.onkeydown;
kd._stealthKeydownHandle=h;
kd._stealthKeydownRefs=1;
}else{
kd._stealthKeydownRefs++;
}
}
return iel.add(node,_156,del._fixCallback(fp));
},remove:function(node,_157,_158){
_157=del._normalizeEventName(_157);
iel.remove(node,_157,_158);
if(_157=="onkeypress"){
var kd=node.onkeydown;
if(--kd._stealthKeydownRefs<=0){
iel.remove(node,"onkeydown",kd._stealthKeydownHandle);
delete kd._stealthKeydownHandle;
}
}
},_normalizeEventName:function(_159){
return _159.slice(0,2)!="on"?"on"+_159:_159;
},_nop:function(){
},_fixEvent:function(evt,_15a){
if(!evt){
var w=_15a&&(_15a.ownerDocument||_15a.document||_15a).parentWindow||window;
evt=w.event;
}
if(!evt){
return (evt);
}
evt.target=evt.srcElement;
evt.currentTarget=(_15a||evt.srcElement);
evt.layerX=evt.offsetX;
evt.layerY=evt.offsetY;
var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;
var _15b=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
var _15c=dojo._getIeDocumentElementOffset();
evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(_15b.scrollLeft||0)-_15c.x;
evt.pageY=evt.clientY+(_15b.scrollTop||0)-_15c.y;
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(dojo.isIE<9||dojo.isQuirks){
evt.stopPropagation=del._stopPropagation;
evt.preventDefault=del._preventDefault;
}
return del._fixKeys(evt);
},_fixKeys:function(evt){
switch(evt.type){
case "keypress":
var c=("charCode" in evt?evt.charCode:evt.keyCode);
if(c==10){
c=0;
evt.keyCode=13;
}else{
if(c==13||c==27){
c=0;
}else{
if(c==3){
c=99;
}
}
}
evt.charCode=c;
del._setKeyChar(evt);
break;
}
return evt;
},_stealthKeyDown:function(evt){
var kp=evt.currentTarget.onkeypress;
if(!kp||!kp[_14f]){
return;
}
var k=evt.keyCode;
var _15d=(k!=13||(dojo.isIE>=9&&!dojo.isQuirks))&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_15d||evt.ctrlKey){
var c=_15d?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if((!evt.shiftKey)&&(c>=65&&c<=90)){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
kp.call(evt.currentTarget,faux);
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
evt.cancelBubble=faux.cancelBubble;
}
evt.returnValue=faux.returnValue;
_14e(evt,faux.keyCode);
}
},_stopPropagation:function(){
this.cancelBubble=true;
},_preventDefault:function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
_14e(this,0);
}
this.returnValue=false;
}});
dojo.stopEvent=(dojo.isIE||dojo.isQuirks)?function(evt){
evt=evt||window.event;
if(dojo.isIE>=9&&evt.preventDefault){
evt.preventDefault();
evt.stopPropagation();
}else{
del._stopPropagation.call(evt);
del._preventDefault.call(evt);
}
}:dojo.stopEvent;
}
del._synthesizeEvent=function(evt,_15e){
var faux=dojo.mixin({},evt,_15e);
del._setKeyChar(faux);
faux.preventDefault=function(){
evt.preventDefault();
};
faux.stopPropagation=function(){
evt.stopPropagation();
};
return faux;
};
if(dojo.isOpera){
dojo.mixin(del,{_fixEvent:function(evt,_15f){
switch(evt.type){
case "keypress":
var c=evt.which;
if(c==3){
c=99;
}
c=c<41&&!evt.shiftKey?0:c;
if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}
return del._synthesizeEvent(evt,{charCode:c});
}
return evt;
}});
}
if(dojo.isWebKit){
del._add=del.add;
del._remove=del.remove;
dojo.mixin(del,{add:function(node,_160,fp){
if(!node){
return;
}
var _161=del._add(node,_160,fp);
if(del._normalizeEventName(_160)=="keypress"){
_161._stealthKeyDownHandle=del._add(node,"keydown",function(evt){
var k=evt.keyCode;
var _162=k!=13&&k!=32&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_162||evt.ctrlKey){
var c=_162?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if(!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}else{
c=del._punctMap[c]||c;
}
}
}
}
var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
fp.call(evt.currentTarget,faux);
}
});
}
return _161;
},remove:function(node,_163,_164){
if(node){
if(_164._stealthKeyDownHandle){
del._remove(node,"keydown",_164._stealthKeyDownHandle);
}
del._remove(node,_163,_164);
}
},_fixEvent:function(evt,_165){
switch(evt.type){
case "keypress":
if(evt.faux){
return evt;
}
var c=evt.charCode;
c=c>=32?c:0;
return del._synthesizeEvent(evt,{charCode:c,faux:true});
}
return evt;
}});
}
})();
if(dojo.isIE){
dojo._ieDispatcher=function(args,_166){
var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];
var r=t&&t.apply(_166,args);
var lls=[].concat(ls);
for(var i in lls){
var f=h[lls[i]];
if(!(i in ap)&&f){
f.apply(_166,args);
}
}
return r;
};
dojo._getIeDispatcher=function(){
return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");
};
dojo._event_listener._fixCallback=function(fp){
var f=dojo._event_listener._fixEvent;
return function(e){
return fp.call(this,f(e,this));
};
};
}
}
if(!dojo._hasResource["dojo._base.html"]){
dojo._hasResource["dojo._base.html"]=true;
dojo.provide("dojo._base.html");
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
if(dojo.isIE){
dojo.byId=function(id,doc){
if(typeof id!="string"){
return id;
}
var _167=doc||dojo.doc,te=_167.getElementById(id);
if(te&&(te.attributes.id.value==id||te.id==id)){
return te;
}else{
var eles=_167.all[id];
if(!eles||eles.nodeName){
eles=[eles];
}
var i=0;
while((te=eles[i++])){
if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){
return te;
}
}
}
};
}else{
dojo.byId=function(id,doc){
return ((typeof id=="string")?(doc||dojo.doc).getElementById(id):id)||null;
};
}
(function(){
var d=dojo;
var byId=d.byId;
var _168=null,_169;
d.addOnWindowUnload(function(){
_168=null;
});
dojo._destroyElement=dojo.destroy=function(node){
node=byId(node);
if(!node){
return;
}
try{
var doc=node.ownerDocument;
if(!_168||_169!=doc){
_168=doc.createElement("div");
_169=doc;
}
_168.appendChild(node.parentNode?node.parentNode.removeChild(node):node);
_168.innerHTML="";
}
catch(e){
}
};
dojo.isDescendant=function(node,_16a){
try{
node=byId(node);
_16a=byId(_16a);
while(node){
if(node==_16a){
return true;
}
node=node.parentNode;
}
}
catch(e){
}
return false;
};
dojo.setSelectable=function(node,_16b){
node=byId(node);
if(d.isMozilla){
node.style.MozUserSelect=_16b?"":"none";
}else{
if(d.isKhtml||d.isWebKit){
node.style.KhtmlUserSelect=_16b?"auto":"none";
}else{
if(d.isIE){
var v=(node.unselectable=_16b?"":"on");
d.query("*",node).forEach("item.unselectable = '"+v+"'");
}
}
}
};
var _16c=function(node,ref){
var _16d=ref.parentNode;
if(_16d){
_16d.insertBefore(node,ref);
}
};
var _16e=function(node,ref){
var _16f=ref.parentNode;
if(_16f){
if(_16f.lastChild==ref){
_16f.appendChild(node);
}else{
_16f.insertBefore(node,ref.nextSibling);
}
}
};
dojo.place=function(node,_170,_171){
_170=byId(_170);
if(typeof node=="string"){
node=/^\s*</.test(node)?d._toDom(node,_170.ownerDocument):byId(node);
}
if(typeof _171=="number"){
var cn=_170.childNodes;
if(!cn.length||cn.length<=_171){
_170.appendChild(node);
}else{
_16c(node,cn[_171<0?0:_171]);
}
}else{
switch(_171){
case "before":
_16c(node,_170);
break;
case "after":
_16e(node,_170);
break;
case "replace":
_170.parentNode.replaceChild(node,_170);
break;
case "only":
d.empty(_170);
_170.appendChild(node);
break;
case "first":
if(_170.firstChild){
_16c(node,_170.firstChild);
break;
}
default:
_170.appendChild(node);
}
}
return node;
};
dojo.boxModel="content-box";
if(d.isIE){
d.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";
}
var gcs;
if(d.isWebKit){
gcs=function(node){
var s;
if(node.nodeType==1){
var dv=node.ownerDocument.defaultView;
s=dv.getComputedStyle(node,null);
if(!s&&node.style){
node.style.display="";
s=dv.getComputedStyle(node,null);
}
}
return s||{};
};
}else{
if(d.isIE){
gcs=function(node){
return node&&node.nodeType==1?node.currentStyle:{};
};
}else{
gcs=function(node){
return node.nodeType==1?(node.ownerDocument.defaultView.getComputedStyle(node,null)||{}):{};
};
}
}
dojo.getComputedStyle=gcs;
if(!d.isIE){
d._toPixelValue=function(_172,_173){
return parseFloat(_173)||0;
};
}else{
d._toPixelValue=function(_174,_175){
if(!_175){
return 0;
}
if(_175=="medium"){
return 4;
}
if(_175.slice&&_175.slice(-2)=="px"){
return parseFloat(_175);
}
with(_174){
var _176=style.left;
var _177=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_175;
_175=style.pixelLeft;
}
catch(e){
_175=0;
}
style.left=_176;
runtimeStyle.left=_177;
}
return _175;
};
}
var px=d._toPixelValue;
var astr="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(astr);
}
catch(e){
return f?{}:null;
}
};
dojo._getOpacity=d.isIE<9?function(node){
try{
return af(node).Opacity/100;
}
catch(e){
return 1;
}
}:function(node){
return gcs(node).opacity;
};
dojo._setOpacity=d.isIE<9?function(node,_178){
var ov=_178*100,_179=_178==1;
node.style.zoom=_179?"":1;
if(!af(node)){
if(_179){
return _178;
}
node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";
}else{
af(node,1).Opacity=ov;
}
af(node,1).Enabled=!_179;
if(node.nodeName.toLowerCase()=="tr"){
d.query("> td",node).forEach(function(i){
d._setOpacity(i,_178);
});
}
return _178;
}:function(node,_17a){
return node.style.opacity=_17a;
};
var _17b={left:true,top:true};
var _17c=/margin|padding|width|height|max|min|offset/;
var _17d=function(node,type,_17e){
type=type.toLowerCase();
if(d.isIE){
if(_17e=="auto"){
if(type=="height"){
return node.offsetHeight;
}
if(type=="width"){
return node.offsetWidth;
}
}
if(type=="fontweight"){
switch(_17e){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(type in _17b)){
_17b[type]=_17c.test(type);
}
return _17b[type]?px(node,_17e):_17e;
};
var _17f=d.isIE?"styleFloat":"cssFloat",_180={"cssFloat":_17f,"styleFloat":_17f,"float":_17f};
dojo.style=function(node,_181,_182){
var n=byId(node),args=arguments.length,op=(_181=="opacity");
_181=_180[_181]||_181;
if(args==3){
return op?d._setOpacity(n,_182):n.style[_181]=_182;
}
if(args==2&&op){
return d._getOpacity(n);
}
var s=gcs(n);
if(args==2&&typeof _181!="string"){
for(var x in _181){
d.style(node,x,_181[x]);
}
return s;
}
return (args==1)?s:_17d(n,_181,s[_181]||n.style[_181]);
};
dojo._getPadExtents=function(n,_183){
var s=_183||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getBorderExtents=function(n,_184){
var ne="none",s=_184||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
dojo._getPadBorderExtents=function(n,_185){
var s=_185||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_186){
var s=_186||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(d.isWebKit&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getMarginBox=function(node,_187){
var s=_187||gcs(node),me=d._getMarginExtents(node,s);
var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;
if(d.isMoz){
var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){
l=sl,t=st;
}else{
if(p&&p.style){
var pcs=gcs(p);
if(pcs.overflow!="visible"){
var be=d._getBorderExtents(p,pcs);
l+=be.l,t+=be.t;
}
}
}
}else{
if(d.isOpera||(d.isIE>7&&!d.isQuirks)){
if(p){
be=d._getBorderExtents(p);
l-=be.l;
t-=be.t;
}
}
}
return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};
};
dojo._getMarginSize=function(node,_188){
node=byId(node);
var me=d._getMarginExtents(node,_188||gcs(node));
var size=node.getBoundingClientRect();
return {w:(size.right-size.left)+me.w,h:(size.bottom-size.top)+me.h};
};
dojo._getContentBox=function(node,_189){
var s=_189||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;
if(!w){
w=node.offsetWidth,h=node.offsetHeight;
}else{
h=node.clientHeight,be.w=be.h=0;
}
if(d.isOpera){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo._getBorderBox=function(node,_18a){
var s=_18a||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);
return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};
};
dojo._setBox=function(node,l,t,w,h,u){
u=u||"px";
var s=node.style;
if(!isNaN(l)){
s.left=l+u;
}
if(!isNaN(t)){
s.top=t+u;
}
if(w>=0){
s.width=w+u;
}
if(h>=0){
s.height=h+u;
}
};
dojo._isButtonTag=function(node){
return node.tagName=="BUTTON"||node.tagName=="INPUT"&&(node.getAttribute("type")||"").toUpperCase()=="BUTTON";
};
dojo._usesBorderBox=function(node){
var n=node.tagName;
return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);
};
dojo._setContentSize=function(node,_18b,_18c,_18d){
if(d._usesBorderBox(node)){
var pb=d._getPadBorderExtents(node,_18d);
if(_18b>=0){
_18b+=pb.w;
}
if(_18c>=0){
_18c+=pb.h;
}
}
d._setBox(node,NaN,NaN,_18b,_18c);
};
dojo._setMarginBox=function(node,_18e,_18f,_190,_191,_192){
var s=_192||gcs(node),bb=d._usesBorderBox(node),pb=bb?_193:d._getPadBorderExtents(node,s);
if(d.isWebKit){
if(d._isButtonTag(node)){
var ns=node.style;
if(_190>=0&&!ns.width){
ns.width="4px";
}
if(_191>=0&&!ns.height){
ns.height="4px";
}
}
}
var mb=d._getMarginExtents(node,s);
if(_190>=0){
_190=Math.max(_190-pb.w-mb.w,0);
}
if(_191>=0){
_191=Math.max(_191-pb.h-mb.h,0);
}
d._setBox(node,_18e,_18f,_190,_191);
};
var _193={l:0,t:0,w:0,h:0};
dojo.marginBox=function(node,box){
var n=byId(node),s=gcs(n),b=box;
return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);
};
dojo.contentBox=function(node,box){
var n=byId(node),s=gcs(n),b=box;
return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);
};
var _194=function(node,prop){
if(!(node=(node||0).parentNode)){
return 0;
}
var val,_195=0,_196=d.body();
while(node&&node.style){
if(gcs(node).position=="fixed"){
return 0;
}
val=node[prop];
if(val){
_195+=val-0;
if(node==_196){
break;
}
}
node=node.parentNode;
}
return _195;
};
dojo._docScroll=function(){
var n=d.global;
return "pageXOffset" in n?{x:n.pageXOffset,y:n.pageYOffset}:(n=d.isQuirks?d.doc.body:d.doc.documentElement,{x:d._fixIeBiDiScrollLeft(n.scrollLeft||0),y:n.scrollTop||0});
};
dojo._isBodyLtr=function(){
return "_bodyLtr" in d?d._bodyLtr:d._bodyLtr=(d.body().dir||d.doc.documentElement.dir||"ltr").toLowerCase()=="ltr";
};
dojo._getIeDocumentElementOffset=function(){
var de=d.doc.documentElement;
if(d.isIE<8){
var r=de.getBoundingClientRect();
var l=r.left,t=r.top;
if(d.isIE<7){
l+=de.clientLeft;
t+=de.clientTop;
}
return {x:l<0?0:l,y:t<0?0:t};
}else{
return {x:0,y:0};
}
};
dojo._fixIeBiDiScrollLeft=function(_197){
var ie=d.isIE;
if(ie&&!d._isBodyLtr()){
var qk=d.isQuirks,de=qk?d.doc.body:d.doc.documentElement;
if(ie==6&&!qk&&d.global.frameElement&&de.scrollHeight>de.clientHeight){
_197+=de.clientLeft;
}
return (ie<8||qk)?(_197+de.clientWidth-de.scrollWidth):-_197;
}
return _197;
};
dojo._abs=dojo.position=function(node,_198){
node=byId(node);
var db=d.body(),dh=db.parentNode,ret=node.getBoundingClientRect();
ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};
if(d.isIE){
var _199=d._getIeDocumentElementOffset();
ret.x-=_199.x+(d.isQuirks?db.clientLeft+db.offsetLeft:0);
ret.y-=_199.y+(d.isQuirks?db.clientTop+db.offsetTop:0);
}else{
if(d.isFF==3){
var cs=gcs(dh);
ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);
ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);
}
}
if(_198){
var _19a=d._docScroll();
ret.x+=_19a.x;
ret.y+=_19a.y;
}
return ret;
};
dojo.coords=function(node,_19b){
var n=byId(node),s=gcs(n),mb=d._getMarginBox(n,s);
var abs=d.position(n,_19b);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
var _19c={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_19d={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_19e={innerHTML:1,className:1,htmlFor:d.isIE,value:1};
var _19f=function(name){
return _19d[name.toLowerCase()]||name;
};
var _1a0=function(node,name){
var attr=node.getAttributeNode&&node.getAttributeNode(name);
return attr&&attr.specified;
};
dojo.hasAttr=function(node,name){
var lc=name.toLowerCase();
return _19e[_19c[lc]||name]||_1a0(byId(node),_19d[lc]||name);
};
var _1a1={},_1a2=0,_1a3=dojo._scopeName+"attrid",_1a4={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
dojo.attr=function(node,name,_1a5){
node=byId(node);
var args=arguments.length,prop;
if(args==2&&typeof name!="string"){
for(var x in name){
d.attr(node,x,name[x]);
}
return node;
}
var lc=name.toLowerCase(),_1a6=_19c[lc]||name,_1a7=_19e[_1a6],_1a8=_19d[lc]||name;
if(args==3){
do{
if(_1a6=="style"&&typeof _1a5!="string"){
d.style(node,_1a5);
break;
}
if(_1a6=="innerHTML"){
if(d.isIE&&node.tagName.toLowerCase() in _1a4){
d.empty(node);
node.appendChild(d._toDom(_1a5,node.ownerDocument));
}else{
node[_1a6]=_1a5;
}
break;
}
if(d.isFunction(_1a5)){
var _1a9=d.attr(node,_1a3);
if(!_1a9){
_1a9=_1a2++;
d.attr(node,_1a3,_1a9);
}
if(!_1a1[_1a9]){
_1a1[_1a9]={};
}
var h=_1a1[_1a9][_1a6];
if(h){
d.disconnect(h);
}else{
try{
delete node[_1a6];
}
catch(e){
}
}
_1a1[_1a9][_1a6]=d.connect(node,_1a6,_1a5);
break;
}
if(_1a7||typeof _1a5=="boolean"){
node[_1a6]=_1a5;
break;
}
node.setAttribute(_1a8,_1a5);
}while(false);
return node;
}
_1a5=node[_1a6];
if(_1a7&&typeof _1a5!="undefined"){
return _1a5;
}
if(_1a6!="href"&&(typeof _1a5=="boolean"||d.isFunction(_1a5))){
return _1a5;
}
return _1a0(node,_1a8)?node.getAttribute(_1a8):null;
};
dojo.removeAttr=function(node,name){
byId(node).removeAttribute(_19f(name));
};
dojo.getNodeProp=function(node,name){
node=byId(node);
var lc=name.toLowerCase(),_1aa=_19c[lc]||name;
if((_1aa in node)&&_1aa!="href"){
return node[_1aa];
}
var _1ab=_19d[lc]||name;
return _1a0(node,_1ab)?node.getAttribute(_1ab):null;
};
dojo.create=function(tag,_1ac,_1ad,pos){
var doc=d.doc;
if(_1ad){
_1ad=byId(_1ad);
doc=_1ad.ownerDocument;
}
if(typeof tag=="string"){
tag=doc.createElement(tag);
}
if(_1ac){
d.attr(tag,_1ac);
}
if(_1ad){
d.place(tag,_1ad,pos);
}
return tag;
};
d.empty=d.isIE?function(node){
node=byId(node);
for(var c;c=node.lastChild;){
d.destroy(c);
}
}:function(node){
byId(node).innerHTML="";
};
var _1ae={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_1af=/<\s*([\w\:]+)/,_1b0={},_1b1=0,_1b2="__"+d._scopeName+"ToDomId";
for(var _1b3 in _1ae){
if(_1ae.hasOwnProperty(_1b3)){
var tw=_1ae[_1b3];
tw.pre=_1b3=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
}
d._toDom=function(frag,doc){
doc=doc||d.doc;
var _1b4=doc[_1b2];
if(!_1b4){
doc[_1b2]=_1b4=++_1b1+"";
_1b0[_1b4]=doc.createElement("div");
}
frag+="";
var _1b5=frag.match(_1af),tag=_1b5?_1b5[1].toLowerCase():"",_1b6=_1b0[_1b4],wrap,i,fc,df;
if(_1b5&&_1ae[tag]){
wrap=_1ae[tag];
_1b6.innerHTML=wrap.pre+frag+wrap.post;
for(i=wrap.length;i;--i){
_1b6=_1b6.firstChild;
}
}else{
_1b6.innerHTML=frag;
}
if(_1b6.childNodes.length==1){
return _1b6.removeChild(_1b6.firstChild);
}
df=doc.createDocumentFragment();
while(fc=_1b6.firstChild){
df.appendChild(fc);
}
return df;
};
var _1b7="className";
dojo.hasClass=function(node,_1b8){
return ((" "+byId(node)[_1b7]+" ").indexOf(" "+_1b8+" ")>=0);
};
var _1b9=/\s+/,a1=[""],_1ba={},_1bb=function(s){
if(typeof s=="string"||s instanceof String){
if(s.indexOf(" ")<0){
a1[0]=s;
return a1;
}else{
return s.split(_1b9);
}
}
return s||"";
};
dojo.addClass=function(node,_1bc){
node=byId(node);
_1bc=_1bb(_1bc);
var cls=node[_1b7],_1bd;
cls=cls?" "+cls+" ":" ";
_1bd=cls.length;
for(var i=0,len=_1bc.length,c;i<len;++i){
c=_1bc[i];
if(c&&cls.indexOf(" "+c+" ")<0){
cls+=c+" ";
}
}
if(_1bd<cls.length){
node[_1b7]=cls.substr(1,cls.length-2);
}
};
dojo.removeClass=function(node,_1be){
node=byId(node);
var cls;
if(_1be!==undefined){
_1be=_1bb(_1be);
cls=" "+node[_1b7]+" ";
for(var i=0,len=_1be.length;i<len;++i){
cls=cls.replace(" "+_1be[i]+" "," ");
}
cls=d.trim(cls);
}else{
cls="";
}
if(node[_1b7]!=cls){
node[_1b7]=cls;
}
};
dojo.replaceClass=function(node,_1bf,_1c0){
node=byId(node);
_1ba.className=node.className;
dojo.removeClass(_1ba,_1c0);
dojo.addClass(_1ba,_1bf);
if(node.className!==_1ba.className){
node.className=_1ba.className;
}
};
dojo.toggleClass=function(node,_1c1,_1c2){
if(_1c2===undefined){
_1c2=!d.hasClass(node,_1c1);
}
d[_1c2?"addClass":"removeClass"](node,_1c1);
};
})();
}
if(!dojo._hasResource["dojo._base.NodeList"]){
dojo._hasResource["dojo._base.NodeList"]=true;
dojo.provide("dojo._base.NodeList");
(function(){
var d=dojo;
var ap=Array.prototype,aps=ap.slice,apc=ap.concat;
var tnl=function(a,_1c3,_1c4){
if(!a.sort){
a=aps.call(a,0);
}
var ctor=_1c4||this._NodeListCtor||d._NodeListCtor;
a.constructor=ctor;
dojo._mixin(a,ctor.prototype);
a._NodeListCtor=ctor;
return _1c3?a._stash(_1c3):a;
};
var _1c5=function(f,a,o){
a=[0].concat(aps.call(a,0));
o=o||d.global;
return function(node){
a[0]=node;
return f.apply(o,a);
};
};
var _1c6=function(f,o){
return function(){
this.forEach(_1c5(f,arguments,o));
return this;
};
};
var _1c7=function(f,o){
return function(){
return this.map(_1c5(f,arguments,o));
};
};
var _1c8=function(f,o){
return function(){
return this.filter(_1c5(f,arguments,o));
};
};
var _1c9=function(f,g,o){
return function(){
var a=arguments,body=_1c5(f,a,o);
if(g.call(o||d.global,a)){
return this.map(body);
}
this.forEach(body);
return this;
};
};
var _1ca=function(a){
return a.length==1&&(typeof a[0]=="string");
};
var _1cb=function(node){
var p=node.parentNode;
if(p){
p.removeChild(node);
}
};
dojo.NodeList=function(){
return tnl(Array.apply(null,arguments));
};
d._NodeListCtor=d.NodeList;
var nl=d.NodeList,nlp=nl.prototype;
nl._wrap=nlp._wrap=tnl;
nl._adaptAsMap=_1c7;
nl._adaptAsForEach=_1c6;
nl._adaptAsFilter=_1c8;
nl._adaptWithCondition=_1c9;
d.forEach(["slice","splice"],function(name){
var f=ap[name];
nlp[name]=function(){
return this._wrap(f.apply(this,arguments),name=="slice"?this:null);
};
});
d.forEach(["indexOf","lastIndexOf","every","some"],function(name){
var f=d[name];
nlp[name]=function(){
return f.apply(d,[this].concat(aps.call(arguments,0)));
};
});
d.forEach(["attr","style"],function(name){
nlp[name]=_1c9(d[name],_1ca);
});
d.forEach(["connect","addClass","removeClass","replaceClass","toggleClass","empty","removeAttr"],function(name){
nlp[name]=_1c6(d[name]);
});
dojo.extend(dojo.NodeList,{_normalize:function(_1cc,_1cd){
var _1ce=_1cc.parse===true?true:false;
if(typeof _1cc.template=="string"){
var _1cf=_1cc.templateFunc||(dojo.string&&dojo.string.substitute);
_1cc=_1cf?_1cf(_1cc.template,_1cc):_1cc;
}
var type=(typeof _1cc);
if(type=="string"||type=="number"){
_1cc=dojo._toDom(_1cc,(_1cd&&_1cd.ownerDocument));
if(_1cc.nodeType==11){
_1cc=dojo._toArray(_1cc.childNodes);
}else{
_1cc=[_1cc];
}
}else{
if(!dojo.isArrayLike(_1cc)){
_1cc=[_1cc];
}else{
if(!dojo.isArray(_1cc)){
_1cc=dojo._toArray(_1cc);
}
}
}
if(_1ce){
_1cc._runParse=true;
}
return _1cc;
},_cloneNode:function(node){
return node.cloneNode(true);
},_place:function(ary,_1d0,_1d1,_1d2){
if(_1d0.nodeType!=1&&_1d1=="only"){
return;
}
var _1d3=_1d0,_1d4;
var _1d5=ary.length;
for(var i=_1d5-1;i>=0;i--){
var node=(_1d2?this._cloneNode(ary[i]):ary[i]);
if(ary._runParse&&dojo.parser&&dojo.parser.parse){
if(!_1d4){
_1d4=_1d3.ownerDocument.createElement("div");
}
_1d4.appendChild(node);
dojo.parser.parse(_1d4);
node=_1d4.firstChild;
while(_1d4.firstChild){
_1d4.removeChild(_1d4.firstChild);
}
}
if(i==_1d5-1){
dojo.place(node,_1d3,_1d1);
}else{
_1d3.parentNode.insertBefore(node,_1d3);
}
_1d3=node;
}
},_stash:function(_1d6){
this._parent=_1d6;
return this;
},end:function(){
if(this._parent){
return this._parent;
}else{
return new this._NodeListCtor();
}
},concat:function(item){
var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){
return a&&!d.isArray(a)&&(typeof NodeList!="undefined"&&a.constructor===NodeList||a.constructor===this._NodeListCtor)?aps.call(a,0):a;
});
return this._wrap(apc.apply(t,m),this);
},map:function(func,obj){
return this._wrap(d.map(this,func,obj),this);
},forEach:function(_1d7,_1d8){
d.forEach(this,_1d7,_1d8);
return this;
},coords:_1c7(d.coords),position:_1c7(d.position),place:function(_1d9,_1da){
var item=d.query(_1d9)[0];
return this.forEach(function(node){
d.place(node,item,_1da);
});
},orphan:function(_1db){
return (_1db?d._filterQueryResult(this,_1db):this).forEach(_1cb);
},adopt:function(_1dc,_1dd){
return d.query(_1dc).place(this[0],_1dd)._stash(this);
},query:function(_1de){
if(!_1de){
return this;
}
var ret=this.map(function(node){
return d.query(_1de,node).filter(function(_1df){
return _1df!==undefined;
});
});
return this._wrap(apc.apply([],ret),this);
},filter:function(_1e0){
var a=arguments,_1e1=this,_1e2=0;
if(typeof _1e0=="string"){
_1e1=d._filterQueryResult(this,a[0]);
if(a.length==1){
return _1e1._stash(this);
}
_1e2=1;
}
return this._wrap(d.filter(_1e1,a[_1e2],a[_1e2+1]),this);
},addContent:function(_1e3,_1e4){
_1e3=this._normalize(_1e3,this[0]);
for(var i=0,node;(node=this[i]);i++){
this._place(_1e3,node,_1e4,i>0);
}
return this;
},instantiate:function(_1e5,_1e6){
var c=d.isFunction(_1e5)?_1e5:d.getObject(_1e5);
_1e6=_1e6||{};
return this.forEach(function(node){
new c(_1e6,node);
});
},at:function(){
var t=new this._NodeListCtor();
d.forEach(arguments,function(i){
if(i<0){
i=this.length+i;
}
if(this[i]){
t.push(this[i]);
}
},this);
return t._stash(this);
}});
nl.events=["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"];
d.forEach(nl.events,function(evt){
var _1e7="on"+evt;
nlp[_1e7]=function(a,b){
return this.connect(_1e7,a,b);
};
});
})();
}
if(!dojo._hasResource["dojo._base.query"]){
dojo._hasResource["dojo._base.query"]=true;
(function(){
var _1e8=function(d){
var trim=d.trim;
var each=d.forEach;
var qlc=(d._NodeListCtor=d.NodeList);
var _1e9=function(){
return d.doc;
};
var _1ea=((d.isWebKit||d.isMozilla)&&((_1e9().compatMode)=="BackCompat"));
var _1eb=!!_1e9().firstChild["children"]?"children":"childNodes";
var _1ec=">~+";
var _1ed=false;
var _1ee=function(){
return true;
};
var _1ef=function(_1f0){
if(_1ec.indexOf(_1f0.slice(-1))>=0){
_1f0+=" * ";
}else{
_1f0+=" ";
}
var ts=function(s,e){
return trim(_1f0.slice(s,e));
};
var _1f1=[];
var _1f2=-1,_1f3=-1,_1f4=-1,_1f5=-1,_1f6=-1,inId=-1,_1f7=-1,lc="",cc="",_1f8;
var x=0,ql=_1f0.length,_1f9=null,_1fa=null;
var _1fb=function(){
if(_1f7>=0){
var tv=(_1f7==x)?null:ts(_1f7,x);
_1f9[(_1ec.indexOf(tv)<0)?"tag":"oper"]=tv;
_1f7=-1;
}
};
var _1fc=function(){
if(inId>=0){
_1f9.id=ts(inId,x).replace(/\\/g,"");
inId=-1;
}
};
var _1fd=function(){
if(_1f6>=0){
_1f9.classes.push(ts(_1f6+1,x).replace(/\\/g,""));
_1f6=-1;
}
};
var _1fe=function(){
_1fc();
_1fb();
_1fd();
};
var _1ff=function(){
_1fe();
if(_1f5>=0){
_1f9.pseudos.push({name:ts(_1f5+1,x)});
}
_1f9.loops=(_1f9.pseudos.length||_1f9.attrs.length||_1f9.classes.length);
_1f9.oquery=_1f9.query=ts(_1f8,x);
_1f9.otag=_1f9.tag=(_1f9["oper"])?null:(_1f9.tag||"*");
if(_1f9.tag){
_1f9.tag=_1f9.tag.toUpperCase();
}
if(_1f1.length&&(_1f1[_1f1.length-1].oper)){
_1f9.infixOper=_1f1.pop();
_1f9.query=_1f9.infixOper.query+" "+_1f9.query;
}
_1f1.push(_1f9);
_1f9=null;
};
for(;lc=cc,cc=_1f0.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_1f9){
_1f8=x;
_1f9={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return (_1ed)?this.otag:this.tag;
}};
_1f7=x;
}
if(_1f2>=0){
if(cc=="]"){
if(!_1fa.attr){
_1fa.attr=ts(_1f2+1,x);
}else{
_1fa.matchFor=ts((_1f4||_1f2+1),x);
}
var cmf=_1fa.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_1fa.matchFor=cmf.slice(1,-1);
}
}
_1f9.attrs.push(_1fa);
_1fa=null;
_1f2=_1f4=-1;
}else{
if(cc=="="){
var _200=("|~^$*".indexOf(lc)>=0)?lc:"";
_1fa.type=_200+cc;
_1fa.attr=ts(_1f2+1,x-_200.length);
_1f4=x+1;
}
}
}else{
if(_1f3>=0){
if(cc==")"){
if(_1f5>=0){
_1fa.value=ts(_1f3+1,x);
}
_1f5=_1f3=-1;
}
}else{
if(cc=="#"){
_1fe();
inId=x+1;
}else{
if(cc=="."){
_1fe();
_1f6=x;
}else{
if(cc==":"){
_1fe();
_1f5=x;
}else{
if(cc=="["){
_1fe();
_1f2=x;
_1fa={};
}else{
if(cc=="("){
if(_1f5>=0){
_1fa={name:ts(_1f5+1,x),value:null};
_1f9.pseudos.push(_1fa);
}
_1f3=x;
}else{
if((cc==" ")&&(lc!=cc)){
_1ff();
}
}
}
}
}
}
}
}
}
return _1f1;
};
var _201=function(_202,_203){
if(!_202){
return _203;
}
if(!_203){
return _202;
}
return function(){
return _202.apply(window,arguments)&&_203.apply(window,arguments);
};
};
var _204=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _205=function(n){
return (1==n.nodeType);
};
var _206="";
var _207=function(elem,attr){
if(!elem){
return _206;
}
if(attr=="class"){
return elem.className||_206;
}
if(attr=="for"){
return elem.htmlFor||_206;
}
if(attr=="style"){
return elem.style.cssText||_206;
}
return (_1ed?elem.getAttribute(attr):elem.getAttribute(attr,2))||_206;
};
var _208={"*=":function(attr,_209){
return function(elem){
return (_207(elem,attr).indexOf(_209)>=0);
};
},"^=":function(attr,_20a){
return function(elem){
return (_207(elem,attr).indexOf(_20a)==0);
};
},"$=":function(attr,_20b){
var tval=" "+_20b;
return function(elem){
var ea=" "+_207(elem,attr);
return (ea.lastIndexOf(_20b)==(ea.length-_20b.length));
};
},"~=":function(attr,_20c){
var tval=" "+_20c+" ";
return function(elem){
var ea=" "+_207(elem,attr)+" ";
return (ea.indexOf(tval)>=0);
};
},"|=":function(attr,_20d){
var _20e=" "+_20d+"-";
return function(elem){
var ea=" "+_207(elem,attr);
return ((ea==_20d)||(ea.indexOf(_20e)==0));
};
},"=":function(attr,_20f){
return function(elem){
return (_207(elem,attr)==_20f);
};
}};
var _210=(typeof _1e9().firstChild.nextElementSibling=="undefined");
var _211=!_210?"nextElementSibling":"nextSibling";
var _212=!_210?"previousElementSibling":"previousSibling";
var _213=(_210?_205:_1ee);
var _214=function(node){
while(node=node[_212]){
if(_213(node)){
return false;
}
}
return true;
};
var _215=function(node){
while(node=node[_211]){
if(_213(node)){
return false;
}
}
return true;
};
var _216=function(node){
var root=node.parentNode;
var i=0,tret=root[_1eb],ci=(node["_i"]||-1),cl=(root["_l"]||-1);
if(!tret){
return -1;
}
var l=tret.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
root["_l"]=l;
ci=-1;
for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_211]){
if(_213(te)){
te["_i"]=++i;
if(node===te){
ci=i;
}
}
}
return ci;
};
var _217=function(elem){
return !((_216(elem))%2);
};
var _218=function(elem){
return ((_216(elem))%2);
};
var _219={"checked":function(name,_21a){
return function(elem){
return !!("checked" in elem?elem.checked:elem.selected);
};
},"first-child":function(){
return _214;
},"last-child":function(){
return _215;
},"only-child":function(name,_21b){
return function(node){
if(!_214(node)){
return false;
}
if(!_215(node)){
return false;
}
return true;
};
},"empty":function(name,_21c){
return function(elem){
var cn=elem.childNodes;
var cnl=elem.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(name,_21d){
var cz=_21d.charAt(0);
if(cz=="\""||cz=="'"){
_21d=_21d.slice(1,-1);
}
return function(elem){
return (elem.innerHTML.indexOf(_21d)>=0);
};
},"not":function(name,_21e){
var p=_1ef(_21e)[0];
var _21f={el:1};
if(p.tag!="*"){
_21f.tag=1;
}
if(!p.classes.length){
_21f.classes=1;
}
var ntf=_220(p,_21f);
return function(elem){
return (!ntf(elem));
};
},"nth-child":function(name,_221){
var pi=parseInt;
if(_221=="odd"){
return _218;
}else{
if(_221=="even"){
return _217;
}
}
if(_221.indexOf("n")!=-1){
var _222=_221.split("n",2);
var pred=_222[0]?((_222[0]=="-")?-1:pi(_222[0])):1;
var idx=_222[1]?pi(_222[1]):0;
var lb=0,ub=-1;
if(pred>0){
if(idx<0){
idx=(idx%pred)&&(pred+(idx%pred));
}else{
if(idx>0){
if(idx>=pred){
lb=idx-idx%pred;
}
idx=idx%pred;
}
}
}else{
if(pred<0){
pred*=-1;
if(idx>0){
ub=idx;
idx=idx%pred;
}
}
}
if(pred>0){
return function(elem){
var i=_216(elem);
return (i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);
};
}else{
_221=idx;
}
}
var _223=pi(_221);
return function(elem){
return (_216(elem)==_223);
};
}};
var _224=(d.isIE<9||(dojo.isIE&&dojo.isQuirks))?function(cond){
var clc=cond.toLowerCase();
if(clc=="class"){
cond="className";
}
return function(elem){
return (_1ed?elem.getAttribute(cond):elem[cond]||elem[clc]);
};
}:function(cond){
return function(elem){
return (elem&&elem.getAttribute&&elem.hasAttribute(cond));
};
};
var _220=function(_225,_226){
if(!_225){
return _1ee;
}
_226=_226||{};
var ff=null;
if(!("el" in _226)){
ff=_201(ff,_205);
}
if(!("tag" in _226)){
if(_225.tag!="*"){
ff=_201(ff,function(elem){
return (elem&&(elem.tagName==_225.getTag()));
});
}
}
if(!("classes" in _226)){
each(_225.classes,function(_227,idx,arr){
var re=new RegExp("(?:^|\\s)"+_227+"(?:\\s|$)");
ff=_201(ff,function(elem){
return re.test(elem.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _226)){
each(_225.pseudos,function(_228){
var pn=_228.name;
if(_219[pn]){
ff=_201(ff,_219[pn](pn,_228.value));
}
});
}
if(!("attrs" in _226)){
each(_225.attrs,function(attr){
var _229;
var a=attr.attr;
if(attr.type&&_208[attr.type]){
_229=_208[attr.type](a,attr.matchFor);
}else{
if(a.length){
_229=_224(a);
}
}
if(_229){
ff=_201(ff,_229);
}
});
}
if(!("id" in _226)){
if(_225.id){
ff=_201(ff,function(elem){
return (!!elem&&(elem.id==_225.id));
});
}
}
if(!ff){
if(!("default" in _226)){
ff=_1ee;
}
}
return ff;
};
var _22a=function(_22b){
return function(node,ret,bag){
while(node=node[_211]){
if(_210&&(!_205(node))){
continue;
}
if((!bag||_22c(node,bag))&&_22b(node)){
ret.push(node);
}
break;
}
return ret;
};
};
var _22d=function(_22e){
return function(root,ret,bag){
var te=root[_211];
while(te){
if(_213(te)){
if(bag&&!_22c(te,bag)){
break;
}
if(_22e(te)){
ret.push(te);
}
}
te=te[_211];
}
return ret;
};
};
var _22f=function(_230){
_230=_230||_1ee;
return function(root,ret,bag){
var te,x=0,tret=root[_1eb];
while(te=tret[x++]){
if(_213(te)&&(!bag||_22c(te,bag))&&(_230(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _231=function(node,root){
var pn=node.parentNode;
while(pn){
if(pn==root){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _232={};
var _233=function(_234){
var _235=_232[_234.query];
if(_235){
return _235;
}
var io=_234.infixOper;
var oper=(io?io.oper:"");
var _236=_220(_234,{el:1});
var qt=_234.tag;
var _237=("*"==qt);
var ecs=_1e9()["getElementsByClassName"];
if(!oper){
if(_234.id){
_236=(!_234.loops&&_237)?_1ee:_220(_234,{el:1,id:1});
_235=function(root,arr){
var te=d.byId(_234.id,(root.ownerDocument||root));
if(!te||!_236(te)){
return;
}
if(9==root.nodeType){
return _204(te,arr);
}else{
if(_231(te,root)){
return _204(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_234.classes.length&&!_1ea){
_236=_220(_234,{el:1,classes:1,id:1});
var _238=_234.classes.join(" ");
_235=function(root,arr,bag){
var ret=_204(0,arr),te,x=0;
var tret=root.getElementsByClassName(_238);
while((te=tret[x++])){
if(_236(te,root)&&_22c(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_237&&!_234.loops){
_235=function(root,arr,bag){
var ret=_204(0,arr),te,x=0;
var tret=root.getElementsByTagName(_234.getTag());
while((te=tret[x++])){
if(_22c(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_236=_220(_234,{el:1,tag:1,id:1});
_235=function(root,arr,bag){
var ret=_204(0,arr),te,x=0;
var tret=root.getElementsByTagName(_234.getTag());
while((te=tret[x++])){
if(_236(te,root)&&_22c(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _239={el:1};
if(_237){
_239.tag=1;
}
_236=_220(_234,_239);
if("+"==oper){
_235=_22a(_236);
}else{
if("~"==oper){
_235=_22d(_236);
}else{
if(">"==oper){
_235=_22f(_236);
}
}
}
}
return _232[_234.query]=_235;
};
var _23a=function(root,_23b){
var _23c=_204(root),qp,x,te,qpl=_23b.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_23b[i];
x=_23c.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_233(qp);
for(var j=0;(te=_23c[j]);j++){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_23c=ret;
}
return ret;
};
var _23d={},_23e={};
var _23f=function(_240){
var _241=_1ef(trim(_240));
if(_241.length==1){
var tef=_233(_241[0]);
return function(root){
var r=tef(root,new qlc());
if(r){
r.nozip=true;
}
return r;
};
}
return function(root){
return _23a(root,_241);
};
};
var nua=navigator.userAgent;
var wk="WebKit/";
var _242=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));
var _243=d.isIE?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _244=(!!_1e9()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_242));
var _245=/n\+\d|([^ ])?([>~+])([^ =])?/g;
var _246=function(_247,pre,ch,post){
return ch?(pre?pre+" ":"")+ch+(post?" "+post:""):_247;
};
var _248=function(_249,_24a){
_249=_249.replace(_245,_246);
if(_244){
var _24b=_23e[_249];
if(_24b&&!_24a){
return _24b;
}
}
var _24c=_23d[_249];
if(_24c){
return _24c;
}
var qcz=_249.charAt(0);
var _24d=(-1==_249.indexOf(" "));
if((_249.indexOf("#")>=0)&&(_24d)){
_24a=true;
}
var _24e=(_244&&(!_24a)&&(_1ec.indexOf(qcz)==-1)&&(!d.isIE||(_249.indexOf(":")==-1))&&(!(_1ea&&(_249.indexOf(".")>=0)))&&(_249.indexOf(":contains")==-1)&&(_249.indexOf(":checked")==-1)&&(_249.indexOf("|=")==-1));
if(_24e){
var tq=(_1ec.indexOf(_249.charAt(_249.length-1))>=0)?(_249+" *"):_249;
return _23e[_249]=function(root){
try{
if(!((9==root.nodeType)||_24d)){
}
var r=root[qsa](tq);
r[_243]=true;
return r;
}
catch(e){
return _248(_249,true)(root);
}
};
}else{
var _24f=_249.split(/\s*,\s*/);
return _23d[_249]=((_24f.length<2)?_23f(_249):function(root){
var _250=0,ret=[],tp;
while((tp=_24f[_250++])){
ret=ret.concat(_23f(tp)(root));
}
return ret;
});
}
};
var _251=0;
var _252=d.isIE?function(node){
if(_1ed){
return (node.getAttribute("_uid")||node.setAttribute("_uid",++_251)||_251);
}else{
return node.uniqueID;
}
}:function(node){
return (node._uid||(node._uid=++_251));
};
var _22c=function(node,bag){
if(!bag){
return 1;
}
var id=_252(node);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _253="_zipIdx";
var _254=function(arr){
if(arr&&arr.nozip){
return (qlc._wrap)?qlc._wrap(arr):arr;
}
var ret=new qlc();
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_251++;
if(d.isIE&&_1ed){
var _255=_251+"";
arr[0].setAttribute(_253,_255);
for(var x=1,te;te=arr[x];x++){
if(arr[x].getAttribute(_253)!=_255){
ret.push(te);
}
te.setAttribute(_253,_255);
}
}else{
if(d.isIE&&arr.commentStrip){
try{
for(var x=1,te;te=arr[x];x++){
if(_205(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_253]=_251;
}
for(var x=1,te;te=arr[x];x++){
if(arr[x][_253]!=_251){
ret.push(te);
}
te[_253]=_251;
}
}
}
return ret;
};
d.query=function(_256,root){
qlc=d._NodeListCtor;
if(!_256){
return new qlc();
}
if(_256.constructor==qlc){
return _256;
}
if(typeof _256!="string"){
return new qlc(_256);
}
if(typeof root=="string"){
root=d.byId(root);
if(!root){
return new qlc();
}
}
root=root||_1e9();
var od=root.ownerDocument||root.documentElement;
_1ed=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));
var r=_248(_256)(root);
if(r&&r.nozip&&!qlc._wrap){
return r;
}
return _254(r);
};
d.query.pseudos=_219;
d._filterQueryResult=function(_257,_258,root){
var _259=new d._NodeListCtor(),_25a=_1ef(_258),_25b=(_25a.length==1&&!/[^\w#\.]/.test(_258))?_220(_25a[0]):function(node){
return dojo.query(_258,root).indexOf(node)!=-1;
};
for(var x=0,te;te=_257[x];x++){
if(_25b(te)){
_259.push(te);
}
}
return _259;
};
};
var _25c=function(){
acme={trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
},forEach:function(arr,_25d,_25e){
if(!arr||!arr.length){
return;
}
for(var i=0,l=arr.length;i<l;++i){
_25d.call(_25e||window,arr[i],i,arr);
}
},byId:function(id,doc){
if(typeof id=="string"){
return (doc||document).getElementById(id);
}else{
return id;
}
},doc:document,NodeList:Array};
var n=navigator;
var dua=n.userAgent;
var dav=n.appVersion;
var tv=parseFloat(dav);
acme.isOpera=(dua.indexOf("Opera")>=0)?tv:undefined;
acme.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:undefined;
acme.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;
acme.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;
var _25f=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);
if(_25f&&!acme.isChrome){
acme.isSafari=parseFloat(dav.split("Version/")[1]);
if(!acme.isSafari||parseFloat(dav.substr(_25f+7))<=419.3){
acme.isSafari=2;
}
}
if(document.all&&!acme.isOpera){
acme.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;
}
Array._wrap=function(arr){
return arr;
};
return acme;
};
if(this["dojo"]){
dojo.provide("dojo._base.query");
_1e8(this["queryPortability"]||this["acme"]||dojo);
}else{
_1e8(this["queryPortability"]||this["acme"]||_25c());
}
})();
}
if(!dojo._hasResource["dojo._base.xhr"]){
dojo._hasResource["dojo._base.xhr"]=true;
dojo.provide("dojo._base.xhr");
(function(){
var _260=dojo,cfg=_260.config;
function _261(obj,name,_262){
if(_262===null){
return;
}
var val=obj[name];
if(typeof val=="string"){
obj[name]=[val,_262];
}else{
if(_260.isArray(val)){
val.push(_262);
}else{
obj[name]=_262;
}
}
};
dojo.fieldToObject=function(_263){
var ret=null;
var item=_260.byId(_263);
if(item){
var _264=item.name;
var type=(item.type||"").toLowerCase();
if(_264&&type&&!item.disabled){
if(type=="radio"||type=="checkbox"){
if(item.checked){
ret=item.value;
}
}else{
if(item.multiple){
ret=[];
_260.query("option",item).forEach(function(opt){
if(opt.selected){
ret.push(opt.value);
}
});
}else{
ret=item.value;
}
}
}
}
return ret;
};
dojo.formToObject=function(_265){
var ret={};
var _266="file|submit|image|reset|button|";
_260.forEach(dojo.byId(_265).elements,function(item){
var _267=item.name;
var type=(item.type||"").toLowerCase();
if(_267&&type&&_266.indexOf(type)==-1&&!item.disabled){
_261(ret,_267,_260.fieldToObject(item));
if(type=="image"){
ret[_267+".x"]=ret[_267+".y"]=ret[_267].x=ret[_267].y=0;
}
}
});
return ret;
};
dojo.objectToQuery=function(map){
var enc=encodeURIComponent;
var _268=[];
var _269={};
for(var name in map){
var _26a=map[name];
if(_26a!=_269[name]){
var _26b=enc(name)+"=";
if(_260.isArray(_26a)){
for(var i=0;i<_26a.length;i++){
_268.push(_26b+enc(_26a[i]));
}
}else{
_268.push(_26b+enc(_26a));
}
}
}
return _268.join("&");
};
dojo.formToQuery=function(_26c){
return _260.objectToQuery(_260.formToObject(_26c));
};
dojo.formToJson=function(_26d,_26e){
return _260.toJson(_260.formToObject(_26d),_26e);
};
dojo.queryToObject=function(str){
var ret={};
var qp=str.split("&");
var dec=decodeURIComponent;
_260.forEach(qp,function(item){
if(item.length){
var _26f=item.split("=");
var name=dec(_26f.shift());
var val=dec(_26f.join("="));
if(typeof ret[name]=="string"){
ret[name]=[ret[name]];
}
if(_260.isArray(ret[name])){
ret[name].push(val);
}else{
ret[name]=val;
}
}
});
return ret;
};
dojo._blockAsync=false;
var _270=_260._contentHandlers=dojo.contentHandlers={text:function(xhr){
return xhr.responseText;
},json:function(xhr){
return _260.fromJson(xhr.responseText||null);
},"json-comment-filtered":function(xhr){
if(!dojo.config.useCommentedJson){
console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");
}
var _271=xhr.responseText;
var _272=_271.indexOf("/*");
var _273=_271.lastIndexOf("*/");
if(_272==-1||_273==-1){
throw new Error("JSON was not comment filtered");
}
return _260.fromJson(_271.substring(_272+2,_273));
},javascript:function(xhr){
return _260.eval(xhr.responseText);
},xml:function(xhr){
var _274=xhr.responseXML;
if(_260.isIE&&(!_274||!_274.documentElement)){
var ms=function(n){
return "MSXML"+n+".DOMDocument";
};
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];
_260.some(dp,function(p){
try{
var dom=new ActiveXObject(p);
dom.async=false;
dom.loadXML(xhr.responseText);
_274=dom;
}
catch(e){
return false;
}
return true;
});
}
return _274;
},"json-comment-optional":function(xhr){
if(xhr.responseText&&/^[^{\[]*\/\*/.test(xhr.responseText)){
return _270["json-comment-filtered"](xhr);
}else{
return _270["json"](xhr);
}
}};
dojo._ioSetArgs=function(args,_275,_276,_277){
var _278={args:args,url:args.url};
var _279=null;
if(args.form){
var form=_260.byId(args.form);
var _27a=form.getAttributeNode("action");
_278.url=_278.url||(_27a?_27a.value:null);
_279=_260.formToObject(form);
}
var _27b=[{}];
if(_279){
_27b.push(_279);
}
if(args.content){
_27b.push(args.content);
}
if(args.preventCache){
_27b.push({"dojo.preventCache":new Date().valueOf()});
}
_278.query=_260.objectToQuery(_260.mixin.apply(null,_27b));
_278.handleAs=args.handleAs||"text";
var d=new _260.Deferred(_275);
d.addCallbacks(_276,function(_27c){
return _277(_27c,d);
});
var ld=args.load;
if(ld&&_260.isFunction(ld)){
d.addCallback(function(_27d){
return ld.call(args,_27d,_278);
});
}
var err=args.error;
if(err&&_260.isFunction(err)){
d.addErrback(function(_27e){
return err.call(args,_27e,_278);
});
}
var _27f=args.handle;
if(_27f&&_260.isFunction(_27f)){
d.addBoth(function(_280){
return _27f.call(args,_280,_278);
});
}
if(cfg.ioPublish&&_260.publish&&_278.args.ioPublish!==false){
d.addCallbacks(function(res){
_260.publish("/dojo/io/load",[d,res]);
return res;
},function(res){
_260.publish("/dojo/io/error",[d,res]);
return res;
});
d.addBoth(function(res){
_260.publish("/dojo/io/done",[d,res]);
return res;
});
}
d.ioArgs=_278;
return d;
};
var _281=function(dfd){
dfd.canceled=true;
var xhr=dfd.ioArgs.xhr;
var _282=typeof xhr.abort;
if(_282=="function"||_282=="object"||_282=="unknown"){
xhr.abort();
}
var err=dfd.ioArgs.error;
if(!err){
err=new Error("xhr cancelled");
err.dojoType="cancel";
}
return err;
};
var _283=function(dfd){
var ret=_270[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
return ret===undefined?null:ret;
};
var _284=function(_285,dfd){
if(!dfd.ioArgs.args.failOk){
console.error(_285);
}
return _285;
};
var _286=null;
var _287=[];
var _288=0;
var _289=function(dfd){
if(_288<=0){
_288=0;
if(cfg.ioPublish&&_260.publish&&(!dfd||dfd&&dfd.ioArgs.args.ioPublish!==false)){
_260.publish("/dojo/io/stop");
}
}
};
var _28a=function(){
var now=(new Date()).getTime();
if(!_260._blockAsync){
for(var i=0,tif;i<_287.length&&(tif=_287[i]);i++){
var dfd=tif.dfd;
var func=function(){
if(!dfd||dfd.canceled||!tif.validCheck(dfd)){
_287.splice(i--,1);
_288-=1;
}else{
if(tif.ioCheck(dfd)){
_287.splice(i--,1);
tif.resHandle(dfd);
_288-=1;
}else{
if(dfd.startTime){
if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){
_287.splice(i--,1);
var err=new Error("timeout exceeded");
err.dojoType="timeout";
dfd.errback(err);
dfd.cancel();
_288-=1;
}
}
}
}
};
if(dojo.config.debugAtAllCosts){
func.call(this);
}else{
try{
func.call(this);
}
catch(e){
dfd.errback(e);
}
}
}
}
_289(dfd);
if(!_287.length){
clearInterval(_286);
_286=null;
return;
}
};
dojo._ioCancelAll=function(){
try{
_260.forEach(_287,function(i){
try{
i.dfd.cancel();
}
catch(e){
}
});
}
catch(e){
}
};
if(_260.isIE){
_260.addOnWindowUnload(_260._ioCancelAll);
}
_260._ioNotifyStart=function(dfd){
if(cfg.ioPublish&&_260.publish&&dfd.ioArgs.args.ioPublish!==false){
if(!_288){
_260.publish("/dojo/io/start");
}
_288+=1;
_260.publish("/dojo/io/send",[dfd]);
}
};
_260._ioWatch=function(dfd,_28b,_28c,_28d){
var args=dfd.ioArgs.args;
if(args.timeout){
dfd.startTime=(new Date()).getTime();
}
_287.push({dfd:dfd,validCheck:_28b,ioCheck:_28c,resHandle:_28d});
if(!_286){
_286=setInterval(_28a,50);
}
if(args.sync){
_28a();
}
};
var _28e="application/x-www-form-urlencoded";
var _28f=function(dfd){
return dfd.ioArgs.xhr.readyState;
};
var _290=function(dfd){
return 4==dfd.ioArgs.xhr.readyState;
};
var _291=function(dfd){
var xhr=dfd.ioArgs.xhr;
if(_260._isDocumentOk(xhr)){
dfd.callback(dfd);
}else{
var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);
err.status=xhr.status;
err.responseText=xhr.responseText;
dfd.errback(err);
}
};
dojo._ioAddQueryToUrl=function(_292){
if(_292.query.length){
_292.url+=(_292.url.indexOf("?")==-1?"?":"&")+_292.query;
_292.query=null;
}
};
dojo.xhr=function(_293,args,_294){
var dfd=_260._ioSetArgs(args,_281,_283,_284);
var _295=dfd.ioArgs;
var xhr=_295.xhr=_260._xhrObj(_295.args);
if(!xhr){
dfd.cancel();
return dfd;
}
if("postData" in args){
_295.query=args.postData;
}else{
if("putData" in args){
_295.query=args.putData;
}else{
if("rawBody" in args){
_295.query=args.rawBody;
}else{
if((arguments.length>2&&!_294)||"POST|PUT".indexOf(_293.toUpperCase())==-1){
_260._ioAddQueryToUrl(_295);
}
}
}
}
xhr.open(_293,_295.url,args.sync!==true,args.user||undefined,args.password||undefined);
if(args.headers){
for(var hdr in args.headers){
if(hdr.toLowerCase()==="content-type"&&!args.contentType){
args.contentType=args.headers[hdr];
}else{
if(args.headers[hdr]){
xhr.setRequestHeader(hdr,args.headers[hdr]);
}
}
}
}
xhr.setRequestHeader("Content-Type",args.contentType||_28e);
if(!args.headers||!("X-Requested-With" in args.headers)){
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
_260._ioNotifyStart(dfd);
if(dojo.config.debugAtAllCosts){
xhr.send(_295.query);
}else{
try{
xhr.send(_295.query);
}
catch(e){
_295.error=e;
dfd.cancel();
}
}
_260._ioWatch(dfd,_28f,_290,_291);
xhr=null;
return dfd;
};
dojo.xhrGet=function(args){
return _260.xhr("GET",args);
};
dojo.rawXhrPost=dojo.xhrPost=function(args){
return _260.xhr("POST",args,true);
};
dojo.rawXhrPut=dojo.xhrPut=function(args){
return _260.xhr("PUT",args,true);
};
dojo.xhrDelete=function(args){
return _260.xhr("DELETE",args);
};
})();
}
if(!dojo._hasResource["dojo._base.fx"]){
dojo._hasResource["dojo._base.fx"]=true;
dojo.provide("dojo._base.fx");
(function(){
var d=dojo;
var _296=d._mixin;
dojo._Line=function(_297,end){
this.start=_297;
this.end=end;
};
dojo._Line.prototype.getValue=function(n){
return ((this.end-this.start)*n)+this.start;
};
dojo.Animation=function(args){
_296(this,args);
if(d.isArray(this.curve)){
this.curve=new d._Line(this.curve[0],this.curve[1]);
}
};
d._Animation=d.Animation;
d.extend(dojo.Animation,{duration:350,repeat:0,rate:20,_percent:0,_startRepeatCount:0,_getStep:function(){
var _298=this._percent,_299=this.easing;
return _299?_299(_298):_298;
},_fire:function(evt,args){
var a=args||[];
if(this[evt]){
if(d.config.debugAtAllCosts){
this[evt].apply(this,a);
}else{
try{
this[evt].apply(this,a);
}
catch(e){
console.error("exception in animation handler for:",evt);
console.error(e);
}
}
}
return this;
},play:function(_29a,_29b){
var _29c=this;
if(_29c._delayTimer){
_29c._clearTimer();
}
if(_29b){
_29c._stopTimer();
_29c._active=_29c._paused=false;
_29c._percent=0;
}else{
if(_29c._active&&!_29c._paused){
return _29c;
}
}
_29c._fire("beforeBegin",[_29c.node]);
var de=_29a||_29c.delay,_29d=dojo.hitch(_29c,"_play",_29b);
if(de>0){
_29c._delayTimer=setTimeout(_29d,de);
return _29c;
}
_29d();
return _29c;
},_play:function(_29e){
var _29f=this;
if(_29f._delayTimer){
_29f._clearTimer();
}
_29f._startTime=new Date().valueOf();
if(_29f._paused){
_29f._startTime-=_29f.duration*_29f._percent;
}
_29f._active=true;
_29f._paused=false;
var _2a0=_29f.curve.getValue(_29f._getStep());
if(!_29f._percent){
if(!_29f._startRepeatCount){
_29f._startRepeatCount=_29f.repeat;
}
_29f._fire("onBegin",[_2a0]);
}
_29f._fire("onPlay",[_2a0]);
_29f._cycle();
return _29f;
},pause:function(){
var _2a1=this;
if(_2a1._delayTimer){
_2a1._clearTimer();
}
_2a1._stopTimer();
if(!_2a1._active){
return _2a1;
}
_2a1._paused=true;
_2a1._fire("onPause",[_2a1.curve.getValue(_2a1._getStep())]);
return _2a1;
},gotoPercent:function(_2a2,_2a3){
var _2a4=this;
_2a4._stopTimer();
_2a4._active=_2a4._paused=true;
_2a4._percent=_2a2;
if(_2a3){
_2a4.play();
}
return _2a4;
},stop:function(_2a5){
var _2a6=this;
if(_2a6._delayTimer){
_2a6._clearTimer();
}
if(!_2a6._timer){
return _2a6;
}
_2a6._stopTimer();
if(_2a5){
_2a6._percent=1;
}
_2a6._fire("onStop",[_2a6.curve.getValue(_2a6._getStep())]);
_2a6._active=_2a6._paused=false;
return _2a6;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}
return "stopped";
},_cycle:function(){
var _2a7=this;
if(_2a7._active){
var curr=new Date().valueOf();
var step=(curr-_2a7._startTime)/(_2a7.duration);
if(step>=1){
step=1;
}
_2a7._percent=step;
if(_2a7.easing){
step=_2a7.easing(step);
}
_2a7._fire("onAnimate",[_2a7.curve.getValue(step)]);
if(_2a7._percent<1){
_2a7._startTimer();
}else{
_2a7._active=false;
if(_2a7.repeat>0){
_2a7.repeat--;
_2a7.play(null,true);
}else{
if(_2a7.repeat==-1){
_2a7.play(null,true);
}else{
if(_2a7._startRepeatCount){
_2a7.repeat=_2a7._startRepeatCount;
_2a7._startRepeatCount=0;
}
}
}
_2a7._percent=0;
_2a7._fire("onEnd",[_2a7.node]);
!_2a7.repeat&&_2a7._stopTimer();
}
}
return _2a7;
},_clearTimer:function(){
clearTimeout(this._delayTimer);
delete this._delayTimer;
}});
var ctr=0,_2a8=null,_2a9={run:function(){
}};
d.extend(d.Animation,{_startTimer:function(){
if(!this._timer){
this._timer=d.connect(_2a9,"run",this,"_cycle");
ctr++;
}
if(!_2a8){
_2a8=setInterval(d.hitch(_2a9,"run"),this.rate);
}
},_stopTimer:function(){
if(this._timer){
d.disconnect(this._timer);
this._timer=null;
ctr--;
}
if(ctr<=0){
clearInterval(_2a8);
_2a8=null;
ctr=0;
}
}});
var _2aa=d.isIE?function(node){
var ns=node.style;
if(!ns.width.length&&d.style(node,"width")=="auto"){
ns.width="auto";
}
}:function(){
};
dojo._fade=function(args){
args.node=d.byId(args.node);
var _2ab=_296({properties:{}},args),_2ac=(_2ab.properties.opacity={});
_2ac.start=!("start" in _2ab)?function(){
return +d.style(_2ab.node,"opacity")||0;
}:_2ab.start;
_2ac.end=_2ab.end;
var anim=d.animateProperty(_2ab);
d.connect(anim,"beforeBegin",d.partial(_2aa,_2ab.node));
return anim;
};
dojo.fadeIn=function(args){
return d._fade(_296({end:1},args));
};
dojo.fadeOut=function(args){
return d._fade(_296({end:0},args));
};
dojo._defaultEasing=function(n){
return 0.5+((Math.sin((n+1.5)*Math.PI))/2);
};
var _2ad=function(_2ae){
this._properties=_2ae;
for(var p in _2ae){
var prop=_2ae[p];
if(prop.start instanceof d.Color){
prop.tempColor=new d.Color();
}
}
};
_2ad.prototype.getValue=function(r){
var ret={};
for(var p in this._properties){
var prop=this._properties[p],_2af=prop.start;
if(_2af instanceof d.Color){
ret[p]=d.blendColors(_2af,prop.end,r,prop.tempColor).toCss();
}else{
if(!d.isArray(_2af)){
ret[p]=((prop.end-_2af)*r)+_2af+(p!="opacity"?prop.units||"px":0);
}
}
}
return ret;
};
dojo.animateProperty=function(args){
var n=args.node=d.byId(args.node);
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args);
d.connect(anim,"beforeBegin",anim,function(){
var pm={};
for(var p in this.properties){
if(p=="width"||p=="height"){
this.node.display="block";
}
var prop=this.properties[p];
if(d.isFunction(prop)){
prop=prop(n);
}
prop=pm[p]=_296({},(d.isObject(prop)?prop:{end:prop}));
if(d.isFunction(prop.start)){
prop.start=prop.start(n);
}
if(d.isFunction(prop.end)){
prop.end=prop.end(n);
}
var _2b0=(p.toLowerCase().indexOf("color")>=0);
function _2b1(node,p){
var v={height:node.offsetHeight,width:node.offsetWidth}[p];
if(v!==undefined){
return v;
}
v=d.style(node,p);
return (p=="opacity")?+v:(_2b0?v:parseFloat(v));
};
if(!("end" in prop)){
prop.end=_2b1(n,p);
}else{
if(!("start" in prop)){
prop.start=_2b1(n,p);
}
}
if(_2b0){
prop.start=new d.Color(prop.start);
prop.end=new d.Color(prop.end);
}else{
prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);
}
}
this.curve=new _2ad(pm);
});
d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));
return anim;
};
dojo.anim=function(node,_2b2,_2b3,_2b4,_2b5,_2b6){
return d.animateProperty({node:node,duration:_2b3||d.Animation.prototype.duration,properties:_2b2,easing:_2b4,onEnd:_2b5}).play(_2b6||0);
};
})();
}
if(!dojo._hasResource["dojo._base.browser"]){
dojo._hasResource["dojo._base.browser"]=true;
dojo.provide("dojo._base.browser");
dojo.forEach(dojo.config.require,function(i){
dojo["require"](i);
});
}
if(!dojo._hasResource["dojo._base"]){
dojo._hasResource["dojo._base"]=true;
dojo.provide("dojo._base");
}
if(!dojo._hasResource["dijit._base.manager"]){
dojo._hasResource["dijit._base.manager"]=true;
dojo.provide("dijit._base.manager");
dojo.declare("dijit.WidgetSet",null,{constructor:function(){
this._hash={};
this.length=0;
},add:function(_2b7){
if(this._hash[_2b7.id]){
throw new Error("Tried to register widget with id=="+_2b7.id+" but that id is already registered");
}
this._hash[_2b7.id]=_2b7;
this.length++;
},remove:function(id){
if(this._hash[id]){
delete this._hash[id];
this.length--;
}
},forEach:function(func,_2b8){
_2b8=_2b8||dojo.global;
var i=0,id;
for(id in this._hash){
func.call(_2b8,this._hash[id],i++,this._hash);
}
return this;
},filter:function(_2b9,_2ba){
_2ba=_2ba||dojo.global;
var res=new dijit.WidgetSet(),i=0,id;
for(id in this._hash){
var w=this._hash[id];
if(_2b9.call(_2ba,w,i++,this._hash)){
res.add(w);
}
}
return res;
},byId:function(id){
return this._hash[id];
},byClass:function(cls){
var res=new dijit.WidgetSet(),id,_2bb;
for(id in this._hash){
_2bb=this._hash[id];
if(_2bb.declaredClass==cls){
res.add(_2bb);
}
}
return res;
},toArray:function(){
var ar=[];
for(var id in this._hash){
ar.push(this._hash[id]);
}
return ar;
},map:function(func,_2bc){
return dojo.map(this.toArray(),func,_2bc);
},every:function(func,_2bd){
_2bd=_2bd||dojo.global;
var x=0,i;
for(i in this._hash){
if(!func.call(_2bd,this._hash[i],x++,this._hash)){
return false;
}
}
return true;
},some:function(func,_2be){
_2be=_2be||dojo.global;
var x=0,i;
for(i in this._hash){
if(func.call(_2be,this._hash[i],x++,this._hash)){
return true;
}
}
return false;
}});
(function(){
dijit.registry=new dijit.WidgetSet();
var hash=dijit.registry._hash,attr=dojo.attr,_2bf=dojo.hasAttr,_2c0=dojo.style;
dijit.byId=function(id){
return typeof id=="string"?hash[id]:id;
};
var _2c1={};
dijit.getUniqueId=function(_2c2){
var id;
do{
id=_2c2+"_"+(_2c2 in _2c1?++_2c1[_2c2]:_2c1[_2c2]=0);
}while(hash[id]);
return dijit._scopeName=="dijit"?id:dijit._scopeName+"_"+id;
};
dijit.findWidgets=function(root){
var _2c3=[];
function _2c4(root){
if(!root){
return _2c3;
}
for(var node=root.firstChild;node;node=node.nextSibling){
if(node.nodeType==1){
var _2c5=node.getAttribute("widgetId");
if(_2c5){
var _2c6=hash[_2c5];
if(_2c6){
_2c3.push(_2c6);
}
}else{
_2c4(node);
}
}
}
};
_2c4(root);
return _2c3;
};
dijit._destroyAll=function(){
dijit._curFocus=null;
dijit._prevFocus=null;
dijit._activeStack=[];
dojo.forEach(dijit.findWidgets(dojo.body()),function(_2c7){
if(!_2c7._destroyed){
if(_2c7.destroyRecursive){
_2c7.destroyRecursive();
}else{
if(_2c7.destroy){
_2c7.destroy();
}
}
}
});
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dijit._destroyAll();
});
}
dijit.byNode=function(node){
return hash[node.getAttribute("widgetId")];
};
dijit.getEnclosingWidget=function(node){
while(node){
var id=node.getAttribute&&node.getAttribute("widgetId");
if(id){
return hash[id];
}
node=node.parentNode;
}
return null;
};
var _2c8=(dijit._isElementShown=function(elem){
var s=_2c0(elem);
return (s.visibility!="hidden")&&(s.visibility!="collapsed")&&(s.display!="none")&&(attr(elem,"type")!="hidden");
});
dijit.hasDefaultTabStop=function(elem){
switch(elem.nodeName.toLowerCase()){
case "a":
return _2bf(elem,"href");
case "area":
case "button":
case "input":
case "object":
case "select":
case "textarea":
return true;
case "iframe":
var body;
try{
var _2c9=elem.contentDocument;
if("designMode" in _2c9&&_2c9.designMode=="on"){
return true;
}
body=_2c9.body;
}
catch(e1){
try{
body=elem.contentWindow.document.body;
}
catch(e2){
return false;
}
}
return body.contentEditable=="true"||(body.firstChild&&body.firstChild.contentEditable=="true");
default:
return elem.contentEditable=="true";
}
};
var _2ca=(dijit.isTabNavigable=function(elem){
if(attr(elem,"disabled")){
return false;
}else{
if(_2bf(elem,"tabIndex")){
return attr(elem,"tabIndex")>=0;
}else{
return dijit.hasDefaultTabStop(elem);
}
}
});
dijit._getTabNavigable=function(root){
var _2cb,last,_2cc,_2cd,_2ce,_2cf,_2d0={};
function _2d1(node){
return node&&node.tagName.toLowerCase()=="input"&&node.type&&node.type.toLowerCase()=="radio"&&node.name&&node.name.toLowerCase();
};
var _2d2=function(_2d3){
dojo.query("> *",_2d3).forEach(function(_2d4){
if((dojo.isIE&&_2d4.scopeName!=="HTML")||!_2c8(_2d4)){
return;
}
if(_2ca(_2d4)){
var _2d5=attr(_2d4,"tabIndex");
if(!_2bf(_2d4,"tabIndex")||_2d5==0){
if(!_2cb){
_2cb=_2d4;
}
last=_2d4;
}else{
if(_2d5>0){
if(!_2cc||_2d5<_2cd){
_2cd=_2d5;
_2cc=_2d4;
}
if(!_2ce||_2d5>=_2cf){
_2cf=_2d5;
_2ce=_2d4;
}
}
}
var rn=_2d1(_2d4);
if(dojo.attr(_2d4,"checked")&&rn){
_2d0[rn]=_2d4;
}
}
if(_2d4.nodeName.toUpperCase()!="SELECT"){
_2d2(_2d4);
}
});
};
if(_2c8(root)){
_2d2(root);
}
function rs(node){
return _2d0[_2d1(node)]||node;
};
return {first:rs(_2cb),last:rs(last),lowest:rs(_2cc),highest:rs(_2ce)};
};
dijit.getFirstInTabbingOrder=function(root){
var _2d6=dijit._getTabNavigable(dojo.byId(root));
return _2d6.lowest?_2d6.lowest:_2d6.first;
};
dijit.getLastInTabbingOrder=function(root){
var _2d7=dijit._getTabNavigable(dojo.byId(root));
return _2d7.last?_2d7.last:_2d7.highest;
};
dijit.defaultDuration=dojo.config["defaultDuration"]||200;
})();
}
if(!dojo._hasResource["dojo.Stateful"]){
dojo._hasResource["dojo.Stateful"]=true;
dojo.provide("dojo.Stateful");
dojo.declare("dojo.Stateful",null,{postscript:function(_2d8){
if(_2d8){
dojo.mixin(this,_2d8);
}
},get:function(name){
return this[name];
},set:function(name,_2d9){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _2da=this[name];
this[name]=_2d9;
if(this._watchCallbacks){
this._watchCallbacks(name,_2da,_2d9);
}
return this;
},watch:function(name,_2db){
var _2dc=this._watchCallbacks;
if(!_2dc){
var self=this;
_2dc=this._watchCallbacks=function(name,_2dd,_2de,_2df){
var _2e0=function(_2e1){
if(_2e1){
_2e1=_2e1.slice();
for(var i=0,l=_2e1.length;i<l;i++){
try{
_2e1[i].call(self,name,_2dd,_2de);
}
catch(e){
console.error(e);
}
}
}
};
_2e0(_2dc["_"+name]);
if(!_2df){
_2e0(_2dc["*"]);
}
};
}
if(!_2db&&typeof name==="function"){
_2db=name;
name="*";
}else{
name="_"+name;
}
var _2e2=_2dc[name];
if(typeof _2e2!=="object"){
_2e2=_2dc[name]=[];
}
_2e2.push(_2db);
return {unwatch:function(){
_2e2.splice(dojo.indexOf(_2e2,_2db),1);
}};
}});
}
if(!dojo._hasResource["dijit._WidgetBase"]){
dojo._hasResource["dijit._WidgetBase"]=true;
dojo.provide("dijit._WidgetBase");
(function(){
dojo.declare("dijit._WidgetBase",dojo.Stateful,{id:"",lang:"",dir:"","class":"",style:"",title:"",tooltip:"",baseClass:"",srcNodeRef:null,domNode:null,containerNode:null,attributeMap:{id:"",dir:"",lang:"","class":"",style:"",title:""},_blankGif:(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif")).toString(),postscript:function(_2e3,_2e4){
this.create(_2e3,_2e4);
},create:function(_2e5,_2e6){
this.srcNodeRef=dojo.byId(_2e6);
this._connects=[];
this._subscribes=[];
if(this.srcNodeRef&&(typeof this.srcNodeRef.id=="string")){
this.id=this.srcNodeRef.id;
}
if(_2e5){
this.params=_2e5;
dojo._mixin(this,_2e5);
}
this.postMixInProperties();
if(!this.id){
this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"));
}
dijit.registry.add(this);
this.buildRendering();
if(this.domNode){
this._applyAttributes();
var _2e7=this.srcNodeRef;
if(_2e7&&_2e7.parentNode&&this.domNode!==_2e7){
_2e7.parentNode.replaceChild(this.domNode,_2e7);
}
}
if(this.domNode){
this.domNode.setAttribute("widgetId",this.id);
}
this.postCreate();
if(this.srcNodeRef&&!this.srcNodeRef.parentNode){
delete this.srcNodeRef;
}
this._created=true;
},_applyAttributes:function(){
var _2e8=function(attr,_2e9){
if((_2e9.params&&attr in _2e9.params)||_2e9[attr]){
_2e9.set(attr,_2e9[attr]);
}
};
for(var attr in this.attributeMap){
_2e8(attr,this);
}
dojo.forEach(this._getSetterAttributes(),function(a){
if(!(a in this.attributeMap)){
_2e8(a,this);
}
},this);
},_getSetterAttributes:function(){
var ctor=this.constructor;
if(!ctor._setterAttrs){
var r=(ctor._setterAttrs=[]),_2ea,_2eb=ctor.prototype;
for(var _2ec in _2eb){
if(dojo.isFunction(_2eb[_2ec])&&(_2ea=_2ec.match(/^_set([a-zA-Z]*)Attr$/))&&_2ea[1]){
r.push(_2ea[1].charAt(0).toLowerCase()+_2ea[1].substr(1));
}
}
}
return ctor._setterAttrs;
},postMixInProperties:function(){
},buildRendering:function(){
if(!this.domNode){
this.domNode=this.srcNodeRef||dojo.create("div");
}
if(this.baseClass){
var _2ed=this.baseClass.split(" ");
if(!this.isLeftToRight()){
_2ed=_2ed.concat(dojo.map(_2ed,function(name){
return name+"Rtl";
}));
}
dojo.addClass(this.domNode,_2ed);
}
},postCreate:function(){
},startup:function(){
this._started=true;
},destroyRecursive:function(_2ee){
this._beingDestroyed=true;
this.destroyDescendants(_2ee);
this.destroy(_2ee);
},destroy:function(_2ef){
this._beingDestroyed=true;
this.uninitialize();
var d=dojo,dfe=d.forEach,dun=d.unsubscribe;
dfe(this._connects,function(_2f0){
dfe(_2f0,d.disconnect);
});
dfe(this._subscribes,function(_2f1){
dun(_2f1);
});
var self=this;
dfe(this._supportingWidgets||[],function(w){
if(w==self){
return;
}
if(w.destroyRecursive){
w.destroyRecursive();
}else{
if(w.destroy){
w.destroy();
}
}
});
this.destroyRendering(_2ef);
dijit.registry.remove(this.id);
this._destroyed=true;
},destroyRendering:function(_2f2){
if(this.bgIframe){
this.bgIframe.destroy(_2f2);
delete this.bgIframe;
}
if(this.domNode){
if(_2f2){
dojo.removeAttr(this.domNode,"widgetId");
}else{
dojo.destroy(this.domNode);
}
delete this.domNode;
}
if(this.srcNodeRef){
if(!_2f2){
dojo.destroy(this.srcNodeRef);
}
delete this.srcNodeRef;
}
},destroyDescendants:function(_2f3){
dojo.forEach(this.getChildren(),function(_2f4){
if(_2f4.destroyRecursive){
_2f4.destroyRecursive(_2f3);
}
});
},uninitialize:function(){
return false;
},_setClassAttr:function(_2f5){
var _2f6=this[this.attributeMap["class"]||"domNode"];
dojo.replaceClass(_2f6,_2f5,this["class"]);
this._set("class",_2f5);
},_setStyleAttr:function(_2f7){
var _2f8=this[this.attributeMap.style||"domNode"];
if(dojo.isObject(_2f7)){
dojo.style(_2f8,_2f7);
}else{
if(_2f8.style.cssText){
_2f8.style.cssText+="; "+_2f7;
}else{
_2f8.style.cssText=_2f7;
}
}
this._set("style",_2f7);
},_attrToDom:function(attr,_2f9){
var _2fa=this.attributeMap[attr];
dojo.forEach(dojo.isArray(_2fa)?_2fa:[_2fa],function(_2fb){
var _2fc=this[_2fb.node||_2fb||"domNode"];
var type=_2fb.type||"attribute";
switch(type){
case "attribute":
if(dojo.isFunction(_2f9)){
_2f9=dojo.hitch(this,_2f9);
}
var _2fd=_2fb.attribute?_2fb.attribute:(/^on[A-Z][a-zA-Z]*$/.test(attr)?attr.toLowerCase():attr);
dojo.attr(_2fc,_2fd,_2f9);
break;
case "innerText":
_2fc.innerHTML="";
_2fc.appendChild(dojo.doc.createTextNode(_2f9));
break;
case "innerHTML":
_2fc.innerHTML=_2f9;
break;
case "class":
dojo.replaceClass(_2fc,_2f9,this[attr]);
break;
}
},this);
},get:function(name){
var _2fe=this._getAttrNames(name);
return this[_2fe.g]?this[_2fe.g]():this[name];
},set:function(name,_2ff){
if(typeof name==="object"){
for(var x in name){
this.set(x,name[x]);
}
return this;
}
var _300=this._getAttrNames(name);
if(this[_300.s]){
var _301=this[_300.s].apply(this,Array.prototype.slice.call(arguments,1));
}else{
if(name in this.attributeMap){
this._attrToDom(name,_2ff);
}
this._set(name,_2ff);
}
return _301||this;
},_attrPairNames:{},_getAttrNames:function(name){
var apn=this._attrPairNames;
if(apn[name]){
return apn[name];
}
var uc=name.charAt(0).toUpperCase()+name.substr(1);
return (apn[name]={n:name+"Node",s:"_set"+uc+"Attr",g:"_get"+uc+"Attr"});
},_set:function(name,_302){
var _303=this[name];
this[name]=_302;
if(this._watchCallbacks&&this._created&&_302!==_303){
this._watchCallbacks(name,_303,_302);
}
},toString:function(){
return "[Widget "+this.declaredClass+", "+(this.id||"NO ID")+"]";
},getDescendants:function(){
return this.containerNode?dojo.query("[widgetId]",this.containerNode).map(dijit.byNode):[];
},getChildren:function(){
return this.containerNode?dijit.findWidgets(this.containerNode):[];
},connect:function(obj,_304,_305){
var _306=[dojo._connect(obj,_304,this,_305)];
this._connects.push(_306);
return _306;
},disconnect:function(_307){
for(var i=0;i<this._connects.length;i++){
if(this._connects[i]==_307){
dojo.forEach(_307,dojo.disconnect);
this._connects.splice(i,1);
return;
}
}
},subscribe:function(_308,_309){
var _30a=dojo.subscribe(_308,this,_309);
this._subscribes.push(_30a);
return _30a;
},unsubscribe:function(_30b){
for(var i=0;i<this._subscribes.length;i++){
if(this._subscribes[i]==_30b){
dojo.unsubscribe(_30b);
this._subscribes.splice(i,1);
return;
}
}
},isLeftToRight:function(){
return this.dir?(this.dir=="ltr"):dojo._isBodyLtr();
},placeAt:function(_30c,_30d){
if(_30c.declaredClass&&_30c.addChild){
_30c.addChild(this,_30d);
}else{
dojo.place(this.domNode,_30c,_30d);
}
return this;
}});
})();
}
if(!dojo._hasResource["dojo.i18n"]){
dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.getObject("i18n",true,dojo);
dojo.i18n.getLocalization=dojo.i18n.getLocalization||function(_30e,_30f,_310){
_310=dojo.i18n.normalizeLocale(_310);
var _311=_310.split("-");
var _312=[_30e,"nls",_30f].join(".");
var _313=dojo._loadedModules[_312];
if(_313){
var _314;
for(var i=_311.length;i>0;i--){
var loc=_311.slice(0,i).join("_");
if(_313[loc]){
_314=_313[loc];
break;
}
}
if(!_314){
_314=_313.ROOT;
}
if(_314){
var _315=function(){
};
_315.prototype=_314;
return new _315();
}
}
};
dojo.i18n.normalizeLocale=function(_316){
var _317=_316?_316.toLowerCase():dojo.locale;
if(_317=="root"){
_317="ROOT";
}
return _317;
};
dojo.i18n._requireLocalization=function(_318,_319,_31a,_31b){
var _31c=dojo.i18n.normalizeLocale(_31a);
var _31d=[_318,"nls",_319].join(".");
var _31e="";
if(_31b){
var _31f=_31b.split(",");
for(var i=0;i<_31f.length;i++){
if(_31c["indexOf"](_31f[i])==0){
if(_31f[i].length>_31e.length){
_31e=_31f[i];
}
}
}
if(!_31e){
_31e="ROOT";
}
}
var _320=_31b?_31e:_31c;
var _321=dojo._loadedModules[_31d];
var _322=null;
if(_321){
if(dojo.config.localizationComplete&&_321._built){
return;
}
var _323=_320.replace(/-/g,"_");
var _324=_31d+"."+_323;
_322=dojo._loadedModules[_324];
}
if(!_322){
_321=dojo["provide"](_31d);
var syms=dojo._getModuleSymbols(_318);
var _325=syms.concat("nls").join("/");
var _326;
dojo.i18n._searchLocalePath(_320,_31b,function(loc){
var _327=loc.replace(/-/g,"_");
var _328=_31d+"."+_327;
var _329=false;
if(!dojo._loadedModules[_328]){
dojo["provide"](_328);
var _32a=[_325];
if(loc!="ROOT"){
_32a.push(loc);
}
_32a.push(_319);
var _32b=_32a.join("/")+".js";
_329=dojo._loadPath(_32b,null,function(hash){
hash=hash.root||hash;
var _32c=function(){
};
_32c.prototype=_326;
_321[_327]=new _32c();
for(var j in hash){
_321[_327][j]=hash[j];
}
});
}else{
_329=true;
}
if(_329&&_321[_327]){
_326=_321[_327];
}else{
_321[_327]=_326;
}
if(_31b){
return true;
}
});
}
if(_31b&&_31c!=_31e){
_321[_31c.replace(/-/g,"_")]=_321[_31e.replace(/-/g,"_")];
}
};
(function(){
var _32d=dojo.config.extraLocale;
if(_32d){
if(!_32d instanceof Array){
_32d=[_32d];
}
var req=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(m,b,_32e,_32f){
req(m,b,_32e,_32f);
if(_32e){
return;
}
for(var i=0;i<_32d.length;i++){
req(m,b,_32d[i],_32f);
}
};
}
})();
dojo.i18n._searchLocalePath=function(_330,down,_331){
_330=dojo.i18n.normalizeLocale(_330);
var _332=_330.split("-");
var _333=[];
for(var i=_332.length;i>0;i--){
_333.push(_332.slice(0,i).join("-"));
}
_333.push(false);
if(down){
_333.reverse();
}
for(var j=_333.length-1;j>=0;j--){
var loc=_333[j]||"ROOT";
var stop=_331(loc);
if(stop){
break;
}
}
};
dojo.i18n._preloadLocalizations=function(_334,_335){
function _336(_337){
_337=dojo.i18n.normalizeLocale(_337);
dojo.i18n._searchLocalePath(_337,true,function(loc){
for(var i=0;i<_335.length;i++){
if(_335[i]==loc){
dojo["require"](_334+"_"+loc);
return true;
}
}
return false;
});
};
_336();
var _338=dojo.config.extraLocale||[];
for(var i=0;i<_338.length;i++){
_336(_338[i]);
}
};
}
if(!dojo._hasResource["dojo.rpc.RpcService"]){
dojo._hasResource["dojo.rpc.RpcService"]=true;
dojo.provide("dojo.rpc.RpcService");
dojo.declare("dojo.rpc.RpcService",null,{constructor:function(args){
if(args){
if((dojo.isString(args))||(args instanceof dojo._Url)){
if(args instanceof dojo._Url){
var url=args+"";
}else{
url=args;
}
var def=dojo.xhrGet({url:url,handleAs:"json-comment-optional",sync:true});
def.addCallback(this,"processSmd");
def.addErrback(function(){
throw new Error("Unable to load SMD from "+args);
});
}else{
if(args.smdStr){
this.processSmd(dojo.eval("("+args.smdStr+")"));
}else{
if(args.serviceUrl){
this.serviceUrl=args.serviceUrl;
}
this.timeout=args.timeout||3000;
if("strictArgChecks" in args){
this.strictArgChecks=args.strictArgChecks;
}
this.processSmd(args);
}
}
}
},strictArgChecks:true,serviceUrl:"",parseResults:function(obj){
return obj;
},errorCallback:function(_339){
return function(data){
_339.errback(data.message);
};
},resultCallback:function(_33a){
var tf=dojo.hitch(this,function(obj){
if(obj.error!=null){
var err;
if(typeof obj.error=="object"){
err=new Error(obj.error.message);
err.code=obj.error.code;
err.error=obj.error.error;
}else{
err=new Error(obj.error);
}
err.id=obj.id;
err.errorObject=obj;
_33a.errback(err);
}else{
_33a.callback(this.parseResults(obj));
}
});
return tf;
},generateMethod:function(_33b,_33c,url){
return dojo.hitch(this,function(){
var _33d=new dojo.Deferred();
if((this.strictArgChecks)&&(_33c!=null)&&(arguments.length!=_33c.length)){
throw new Error("Invalid number of parameters for remote method.");
}else{
this.bind(_33b,dojo._toArray(arguments),_33d,url);
}
return _33d;
});
},processSmd:function(_33e){
if(_33e.methods){
dojo.forEach(_33e.methods,function(m){
if(m&&m.name){
this[m.name]=this.generateMethod(m.name,m.parameters,m.url||m.serviceUrl||m.serviceURL);
if(!dojo.isFunction(this[m.name])){
throw new Error("RpcService: Failed to create"+m.name+"()");
}
}
},this);
}
this.serviceUrl=_33e.serviceUrl||_33e.serviceURL;
this.required=_33e.required;
this.smd=_33e;
}});
}
if(!dojo._hasResource["dojo.rpc.JsonService"]){
dojo._hasResource["dojo.rpc.JsonService"]=true;
dojo.provide("dojo.rpc.JsonService");
dojo.declare("dojo.rpc.JsonService",dojo.rpc.RpcService,{bustCache:false,contentType:"application/json-rpc",lastSubmissionId:0,callRemote:function(_33f,_340){
var _341=new dojo.Deferred();
this.bind(_33f,_340,_341);
return _341;
},bind:function(_342,_343,_344,url){
var def=dojo.rawXhrPost({url:url||this.serviceUrl,postData:this.createRequest(_342,_343),contentType:this.contentType,timeout:this.timeout,handleAs:"json-comment-optional"});
def.addCallbacks(this.resultCallback(_344),this.errorCallback(_344));
},createRequest:function(_345,_346){
var req={"params":_346,"method":_345,"id":++this.lastSubmissionId};
var data=dojo.toJson(req);
return data;
},parseResults:function(obj){
if(dojo.isObject(obj)){
if("result" in obj){
return obj.result;
}
if("Result" in obj){
return obj.Result;
}
if("ResultSet" in obj){
return obj.ResultSet;
}
}
return obj;
}});
}
if(!dojo._hasResource["dojo.regexp"]){
dojo._hasResource["dojo.regexp"]=true;
dojo.provide("dojo.regexp");
dojo.getObject("regexp",true,dojo);
dojo.regexp.escapeString=function(str,_347){
return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){
if(_347&&_347.indexOf(ch)!=-1){
return ch;
}
return "\\"+ch;
});
};
dojo.regexp.buildGroupRE=function(arr,re,_348){
if(!(arr instanceof Array)){
return re(arr);
}
var b=[];
for(var i=0;i<arr.length;i++){
b.push(re(arr[i]));
}
return dojo.regexp.group(b.join("|"),_348);
};
dojo.regexp.group=function(_349,_34a){
return "("+(_34a?"?:":"")+_349+")";
};
}
if(!dojo._hasResource["dojo.cookie"]){
dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.cookie=function(name,_34b,_34c){
var c=document.cookie;
if(arguments.length==1){
var _34d=c.match(new RegExp("(?:^|; )"+dojo.regexp.escapeString(name)+"=([^;]*)"));
return _34d?decodeURIComponent(_34d[1]):undefined;
}else{
_34c=_34c||{};
var exp=_34c.expires;
if(typeof exp=="number"){
var d=new Date();
d.setTime(d.getTime()+exp*24*60*60*1000);
exp=_34c.expires=d;
}
if(exp&&exp.toUTCString){
_34c.expires=exp.toUTCString();
}
_34b=encodeURIComponent(_34b);
var _34e=name+"="+_34b,_34f;
for(_34f in _34c){
_34e+="; "+_34f;
var _350=_34c[_34f];
if(_350!==true){
_34e+="="+_350;
}
}
document.cookie=_34e;
}
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
}
if(dojo.isBrowser&&(document.readyState==="complete"||dojo.config.afterOnLoad)){
window.setTimeout(dojo._loadInit,100);
}
})();
