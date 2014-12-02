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

dojo.provide("wm");
if(!dojo._hasResource["wm.base.components.componentList"]){
dojo._hasResource["wm.base.components.componentList"]=true;
dojo.provide("wm.base.components.componentList");
wm.componentFixList={_phonegap:[]};
wm.componentList={"wm.Content":["wm.base.widget.Content"],"wm.DataGrid":["build.Gzipped.wm_data_grid"],"wm.DojoGrid":["build.Gzipped.wm_dojo_grid"],"wm.DojoMenu":["build.Gzipped.wm_menus"],"wm.PopupMenu":["build.Gzipped.wm_menus"],"wm.DojoChart":["build.Gzipped.wm_charts"],"wm.DojoGauge":["build.Gzipped.wm_charts"],"wm.Dashboard":["build.Gzipped.wm_editors","build.Gzipped.wm_dashboard"],"wm.AccordionLayers":["build.Gzipped.wm_accordion"],"wm.WizardLayers":["build.Gzipped.wm_wizardlayer"],"wm.BreadcrumbLayers":["build.Gzipped.wm_breadcrumblayer"],"wm.ColorPicker":["build.Gzipped.wm_colorpicker"],"wm.RichTextDialog":["wm.base.widget.Dialogs.RichTextDialog"],"wm.DojoFisheye":["wm.base.widget.DojoFisheye"],"wm.DojoLightbox":["wm.base.widget.DojoLightbox"],"wm.TwitterFeed":["wm.base.widget.TwitterFeed"],"wm.JsonStatus":["build.Gzipped.wm_editors"],"wm.Tree":["build.Gzipped.wm_trees"],"wm.PropertyTree":["build.Gzipped.wm_trees"],"wm.ObjectTree":["build.Gzipped.wm_trees"],"wm.DraggableTree":["build.Gzipped.wm_trees"],"wm.Gadget":["wm.base.widget.gadget.Gadget"],"wm.gadget.YouTube":["wm.base.widget.gadget.YouTube"],"wm.gadget.FacebookLikeButton":["wm.base.widget.gadget.Facebook"],"wm.gadget.FacebookActivityFeed":["wm.base.widget.gadget.Facebook"],"wm.gadget.GoogleMap":["wm.base.widget.gadget.GoogleMap"],"wm.gadget.Stocks":["wm.base.widget.gadget.Stocks"],"wm.gadget.Weather":["wm.base.widget.gadget.Weather"],"wm.gadget.TwitterFollowButton":["wm.base.widget.gadget.TwitterGadgets"],"wm.gadget.TwitterTweetButton":["wm.base.widget.gadget.TwitterGadgets"],"wm.gadget.TwitterList":["wm.base.widget.gadget.TwitterGadgets"],"wm.TwitterFeed":["wm.base.widget.TwitterFeed"],"wm.RichText":["build.Gzipped.wm_editors","build.Gzipped.wm_richTextEditor"],"wm.CheckBoxEditor":["build.Gzipped.wm_editors_old"],"wm.RadioButtonEditor":["build.Gzipped.wm_editors_old"],"wm.SelectEditor":["build.Gzipped.wm_editors_old"],"wm.TextEditor":["build.Gzipped.wm_editors_old"],"wm.SliderEditor":["build.Gzipped.wm_editors_old"],"wm._SliderEditor":["build.Gzipped.wm_editors_old"],"wm.TextAreaEditor":["build.Gzipped.wm_editors_old"],"wm._TextEditor":["build.Gzipped.wm_editors_old"],"wm.CurrencyEditor":["build.Gzipped.wm_editors_old"],"wm.NumberEditor":["build.Gzipped.wm_editors_old"],"wm.Editor":["build.Gzipped.wm_editors_old"],"wm.DateEditor":["build.Gzipped.wm_editors_old"],"wm.TimeEditor":["build.Gzipped.wm_editors_old"],"wm.Select":["build.Gzipped.wm_editors_old"],"wm.Date":["build.Gzipped.wm_editors"],"wm.DateTime":["build.Gzipped.wm_editors","build.Gzipped.wm_list"],"wm.SelectMenu":["build.Gzipped.wm_editors"],"wm.Lookup":["build.Gzipped.wm_editors"],"wm.FilteringLookup":["build.Gzipped.wm_editors"],"wm.CheckboxSet":["build.Gzipped.wm_editors"],"wm.RadioSet":["build.Gzipped.wm_editors_misc"],"wm.ListSet":["build.Gzipped.wm_editors","build.Gzipped.wm_list"],"wm.Number":["build.Gzipped.wm_editors"],"wm.Checkbox":["build.Gzipped.wm_editors"],"wm.RadioButton":["build.Gzipped.wm_editors_misc"],"wm.Currency":["build.Gzipped.wm_editors"],"wm.Slider":["build.Gzipped.wm_editors_misc"],"wm.Text":["build.Gzipped.wm_editors"],"wm.TextArea":["build.Gzipped.wm_editors"],"wm.Time":["build.Gzipped.wm_editors"],"wm.LargeTextArea":["build.Gzipped.wm_editors"],"wm.dijit.Dijit":["wm.base.widget.dijit.Dijit"],"wm.dijit.ProgressBar":["build.Gzipped.wm_progressbar"],"wm.RoundedButton":["wm.base.widget.Buttons.RoundedButton"],"wm.BusyButton":["wm.base.widget.Buttons.BusyButton"],"wm.PopupMenuButton":["build.Gzipped.wm_menus"],"wm.ToggleButton":["build.Gzipped.wm_editors"],"wm.ToggleButtonPanel":["build.Gzipped.wm_editors"],"wm.Timer":["wm.base.components.Timer"],"wm.SimpleForm":["build.Gzipped.wm_livepanel"],"wm.LiveForm":["build.Gzipped.wm_livepanel"],"wm.RelatedEditor":["build.Gzipped.wm_livepanel"],"wm.LivePanel":["build.Gzipped.wm_livepanel"],"wm.EditPanel":["build.Gzipped.wm_livepanel"],"wm.DataNavigator":["build.Gzipped.wm_livepanel"],"wm.RegularExpressionFormatter":["wm.base.widget.FormattersMisc"],"wm.EvaluationFormatter":["wm.base.widget.FormattersMisc"],"wm.LinkFormatter":["wm.base.widget.FormattersMisc"],"wm.ImageFormatter":["wm.base.widget.FormattersMisc"],"wm.DataForm":["build.Gzipped.wm_dataform"],"wm.FormPanel":["build.Gzipped.wm_dataform"],"wm.SubForm":["build.Gzipped.wm_dataform"],"wm.DBForm":["build.Gzipped.wm_dataform"],"wm.OneToMany":["wm.compressed.wm_dataform"],"wm.ServiceInputForm":["build.Gzipped.wm_dataform"],"wm.ServiceQueue":["wm.base.components.ServiceQueue"],"wm.dijit.Calendar":["build.Gzipped.wm_editors"],"wm.Template":["wm.base.widget.Template"],"wm.ComponentPublisher":["wm.base.components.Publisher"],"wm.CompositePublisher":["wm.base.components.Publisher"],"wm.TemplatePublisher":["wm.base.components.Publisher"],"wm.Composite":["wm.base.widget.Composite"],"wm.CompositeMixin":["wm.base.widget.Composite"],"wm.Ticker":["wm.base.widget.Ticker"],"wm.FileUpload":["wm.base.widget.FileUpload"],"wm.DojoFileUpload":["build.Gzipped.wm_fileupload"],"wm.DojoFlashFileUpload":["build.Gzipped.wm_fileupload"],"wm.DijitDesigner":["wm.base.widget.dijit.Dijit"],"wm.FunctionService":["wm.base.components.FunctionService"],"wm.List":["build.Gzipped.wm_list"],"wm.IFrame":["wm.base.widget.IFrame"],"wm.FeedList":["wm.base.widget.FeedList"],"wm.ListViewer":["wm.base.widget.ListViewer"],"wm.PhoneGapService":["wm.base.components.PhoneGapService"],"wm.XhrService":["wm.base.components.XhrService"],"wm.LogoutVariable":["wm.base.components.LogoutVariable"]};
wm.require=function(_1,_2){
if(dojo.getObject(_1)){
return;
}
var _3=wm.componentList[_1];
if(_3||_2){
return wm.getComponentStructure(_1);
}else{
dojo["require"](_1);
}
};
wm.getComponentStructure=function(_4){
if(_4=="wm.DojoGrid"&&wm.isMobile){
_4="wm.List";
}
var _5=wm.componentList[_4];
if(!_5){
if(_4.indexOf("wm.")==0){
_4=_4.substring(3);
}
_5=["wm.base.widget.Composite","wm.packages."+_4];
}
if(!_5){
console.error("Add "+_4+" in component list.");
}else{
for(var i=0;i<_5.length;i++){
var _6=dojo._getModuleSymbols(_5[i]).join("/")+".js";
var _7;
if(wm.isPhonegap&&_5[i].match(/^(wm|common)\.packages\./)){
_7=_6;
}else{
_7=((_6.charAt(0)=="/"||_6.match(/^\w+:/))?"":dojo.baseUrl)+_6;
}
while(_7.match(/[^\/]\/\.\.\//)){
_7=_7.replace(/[^\/]*\/\.\.\/+/,"");
}
wm.dojoScriptLoader(_7);
if(wm.componentFixList[_5[i]]){
var _8=wm.componentFixList[_5[i]];
for(var j=0;j<_8.length;j++){
_8[j]();
}
}
}
}
if(wm.isMobile&&_4=="wm.List"){
wm.DojoGrid=wm.List;
}
};
wm.addFrameworkFix=function(_9,_a,_b){
if(djConfig.isDebug&&!wm.studioConfig){
_b();
}else{
var _c=dojo.getObject(_9);
if(_c){
_b();
}else{
if(_a&&_a.length){
dojo.forEach(_a,function(_d){
if(!wm.componentFixList[_d]){
wm.componentFixList[_d]=[_b];
}else{
wm.componentFixList[_d].push(_b);
}
});
}else{
wm.componentFixList._phonegap.push(_b);
}
}
}
};
wm.applyFrameworkFixes=function(){
for(var _e in wm.componentFixList){
var _f=dojo.getObject(_e);
if(_f){
var _10=wm.componentFixList[_e];
for(var i=0;i<_e.length;i++){
_10[i]();
}
delete wm.componentFixList[_e];
}
}
};
}
if(!dojo._hasResource["wm.base.lib.util"]){
dojo._hasResource["wm.base.lib.util"]=true;
dojo.provide("wm.base.lib.util");
wm=window["wm"]||{};
wm.logErrors=false;
wm.log=function(){
console.log.apply(console,arguments);
};
wm.capitalize=function(s){
return s?s.charAt(0).toUpperCase()+s.slice(1):"";
};
wm.decapitalize=function(s){
return s?s.charAt(0).toLowerCase()+s.slice(1):"";
};
wm.camelcase=function(s){
return s.replace(/[\.-](.?)/g,function(_11){
return _11[1].toUpperCase();
});
};
wm.flattenObject=function(_12,_13){
var _14={};
for(var _15 in _12){
if(!_12[_15]){
continue;
}
if(typeof _12[_15]!="object"){
_14[_15]=_12[_15];
}else{
var _16=wm.flattenObject(_12[_15]);
if(_13){
_14[_15]=_16;
}
for(var _17 in _16){
_14[_15+"."+_17]=_16[_17];
}
}
}
return _14;
};
wm.shallowClone=function(_18){
var _19={};
wm.forEachProperty(_18,function(_1a,_1b){
_19[_1b]=_1a;
});
return _19;
};
wm.requireCss=function(_1c){
var _1d=wm.dojoModuleToPath(_1c)+".css";
wm.requireCssPath(_1d);
};
wm.dojoModuleToPath=function(_1e){
var _1f=_1e.lastIndexOf(".");
var _20=_1e.substring(_1f+1);
var _1e=_1e.substring(0,_1f);
var _21=dojo.moduleUrl(_1e).path.replace(/lib\/\//,"lib/")+_20;
while(_21.match(/[^\/]\/\.\.\//)){
_21=_21.replace(/[^\/]*\/\.\.\/+/,"");
}
return _21;
};
wm.requireCssPath=function(_22){
var _23="CSS_"+_22.replace(/\./g,"_").replace(/\//g,"_");
var _24=dojo.byId(_23);
if(_24){
return;
}
_24=document.createElement("link");
_24.rel="stylesheet";
_24.id=_23;
_24.type="text/css";
_24.href=_22;
document.getElementsByTagName("head")[0].appendChild(_24);
};
wm.isEqual=function(a1,a2){
try{
if(a1==a2){
return true;
}
if(dojo.isArray(a1)&&dojo.isArray(a2)){
return dojo.toJson([].concat(a1).sort())==dojo.toJson([].concat(a2).sort());
}
return dojo.toJson(a1)==dojo.toJson(a2);
}
catch(e){
return false;
}
};
wm.compareStrings=function(a,b){
return a<b?-1:a==b?0:1;
};
wm.toTitleCase=function(s){
return s.replace(/\b\w+\b/g,function(_25){
return _25?_25.charAt(0).toUpperCase()+(_25.slice(1)||"").toLowerCase():"";
});
};
wm.delimCat=function(_26,_27,_28){
return _26+(_26&&_27?_28:"")+_27;
};
wm.joinEx=function(_29,_2a){
var i=0;
while(i<_29.length){
if(_29[i++]!==""){
_29.splice(--i,1);
}
}
return _29.join(_2a);
};
wm.isNumber=function(v){
return (typeof v=="number")||(v instanceof Number);
};
wm.max=function(_2b){
var max=_2b[0];
for(var i=1;i<_2b.length;i++){
if(_2b[i]>max){
max=_2b[i];
}
}
return max;
};
wm.sum=function(_2c){
var sum=0;
for(var i=0;i<_2c.length;i++){
sum+=_2c[i];
}
return sum;
};
wm.average=function(_2d){
return wm.sum(_2d)/_2d.length;
};
wm.nop=function(){
};
wm.isEmpty=function(_2e){
if(window["studio"]&&dojo.isIE==8){
if(dojo.isArray(_2e)&&_2e.length==0){
return true;
}
if(typeof _2e=="object"){
for(var i in _2e){
if(!dojo.isFunction(_2e[i])){
return false;
}
}
}
}else{
for(var i in _2e){
return false;
}
}
if(typeof _2e=="object"&&_2e instanceof Date){
return false;
}
return true;
};
wm.fire=function(obj,_2f,_30){
var f=obj&&_2f&&obj[_2f];
if(f){
return _30?f.apply(obj,_30):f.call(obj);
}
};
wm.async=function(f,_31){
return function(){
setTimeout(f,_31||1);
};
};
wm.forEach=function(_32,_33){
if(dojo.isArray(_32)){
dojo.forEach(_32,_33);
}else{
wm.forEachProperty(_32,_33);
}
};
wm.forEachProperty=function(_34,_35){
for(var i in _34){
if(!_34.hasOwnProperty||_34.hasOwnProperty(i)){
_35(_34[i],i);
}
}
};
wm.isDomShowing=function(_36){
var n=_36;
while(n&&n!=window.document.body&&n.style.display!="none"){
n=n.parentNode;
}
return !n||n.style.display!="none";
};
wm.evalJs=function(_37,_38){
var r=_38||"";
try{
r=eval(_37);
}
catch(e){
wm.logging&&undefined;
}
return r;
};
wm.getClassProp=function(_39,_3a){
var _3b=dojo.getObject(_39);
var _3c=_3b&&_3b.prototype;
return _3c&&_3c[_3a];
};
wm.showHideNode=function(_3d,_3e){
_3d.style.display=_3e?"":"none";
};
wm.kids=function(_3f,_40){
var _41=[],t=_40.toUpperCase();
for(var i=0,n;(n=_3f.childNodes[i]);i++){
if(n.tagName==_40){
_41.push(n);
}
}
return _41;
};
wm.divkids=function(_42){
return wm.kids(_42,"div");
};
wm.clearSelection=function(){
try{
if(window.getSelection){
window.getSelection().collapseToEnd();
}else{
if(document.selection){
document.selection.clear();
}
}
}
catch(e){
}
};
wm.focusOnIdle=function(_43){
setTimeout(function(){
try{
wm.fire(_43,"focus");
wm.fire(_43,"select");
}
catch(e){
}
},1);
};
wm.inScrollbar=function(e){
var t=e.target;
var s=t.style&&dojo.getComputedStyle(t);
return s&&(((s.overflow!="hidden"||s.overflowX!="hidden")&&(t.scrollWidth!=t.offsetWidth)&&(t.offsetWidth-19-e.clientX<0))||((s.overflow!="hidden"||s.overflowY!="hidden")&&(t.scrollHeight!=t.offsetHeight)&&(t.offsetHeight-19-e.clientY<0)));
};
wm.preloadImage=function(_44){
var i=new Image();
i.src=_44;
(wm.preloaded=(wm.preloaded||[])).push(i);
};
wm.setUnitsBox=function(_45,l,t,w,h){
with(_45.style){
l&&(left=l);
t&&(top=t);
w&&(width=w);
h&&(height=h);
}
};
wm.getNaturalBox=function(_46){
var tn=_46.tagName,cs=dojo.getComputedStyle(_46),box=dojo._getContentBox(_46,cs);
if(tn=="BUTTON"||tn=="TABLE"){
var pb=dojo._getPadBorderExtents(_46,cs);
box.w+=pb.w;
box.h+=pb.h;
}
return box;
};
wm.calcOffset=function(_47,_48,_49){
var o={x:0,y:0},n=_47,cs,mb,be;
while(n&&n!=_48&&n!=document){
cs=dojo.getComputedStyle(n);
mb=dojo._getMarginBox(n,cs);
be=dojo._getBorderExtents(n,cs);
me=_49?dojo._getMarginExtents(n,cs):{l:0,t:0};
o.x+=mb.l+be.l+me.l-(n.scrollLeft||0);
o.y+=mb.t+be.t+me.t-(n.scrollTop||0);
n=n.parentNode;
}
return o;
};
wm.addRemoveClass=function(_4a,_4b,_4c){
dojo[_4c?"addClass":"removeClass"](_4a,_4b);
};
wm.onidle=function(){
var _4d=[];
for(var i=0;i in arguments;i++){
_4d.push(arguments[i]);
}
if(app&&app.debugDialog){
var _4e=app.debugDialog.cacheEventChain();
}
window.setTimeout(function(){
if(_4e){
app.debugDialog.restoreEventChain(_4e);
}
dojo.hitch.apply(null,_4d)();
if(_4e){
app.debugDialog.clearEventChain();
}
},1);
};
wm.onidleChain=function(_4f,_50){
if(!_50){
_50={};
}
var f2=function(_51){
window.setTimeout(function(){
var f=_51.shift();
if(f){
f();
}
if(_51.length&&!_50.canceled){
f2(_51);
}
},1);
};
if(!_50.canceled){
f2(_4f,_50);
}
};
wm.job=function(_52,_53,_54,_55){
var _56;
if(_54&&_55){
_56=dojo.hitch(_54,_55);
}else{
if(_55){
_56=_55;
}else{
_56=_54;
}
}
wm.cancelJob(_52);
if(window["app"]&&app.debugDialog){
var _57=app.debugDialog.cacheEventChain();
}
var job=function(){
delete wm._jobs[_52];
if(_57){
app.debugDialog.restoreEventChain(_57);
}
_56();
if(_57){
app.debugDialog.clearEventChain();
}
};
wm._jobs[_52]=setTimeout(job,_53);
};
wm.cancelJob=function(_58){
clearTimeout(wm._jobs[_58]);
};
wm._jobs={};
wm.hasJob=function(_59){
return Boolean(wm._jobs[_59]);
};
wm.connectEvents=function(_5a,_5b,_5c){
if(!dojo.isArray(_5c)){
throw ("wm.connectEvents: event list must be an array (did you use variable args?)");
}
var _5d=[];
for(var i=0,e;(e=_5c[i]);i++){
_5d.push(dojo.connect(_5b,"on"+e,_5a,e));
}
return _5d;
};
wm._isUniqueName=function(_5e,_5f){
for(var j=0,s;(s=_5f[j]);j++){
if(s[_5e]!==undefined){
return false;
}
}
return true;
};
wm.findUniqueName=function(_60,_61){
if(wm._isUniqueName(_60,_61)){
return _60;
}
var m=(_60||"").match(/([^\d]*)([\d]*)/);
var i=m[2]||1,n0=m[1]||"noname";
do{
_60=n0+(i>0?i:"");
i++;
}while(!wm._isUniqueName(_60,_61));
return _60;
};
wm.getValidJsName=function(_62){
var dc="_";
_62=_62.replace(new RegExp("[- ]","g"),dc);
var _63=true;
if(_62.match(/^[0-9]/)){
_62=["zero","one","two","three","four","five","six","seven","eight","nine"][_62[0]]+_62.substring(1);
}
for(var i=0;i<_62.length&&_63;i++){
try{
var _64=eval("(function() {var "+_62+" = 5; return "+_62+";})()");
if(_64==5){
_63=false;
}
}
catch(e){
}
if(_63){
_62=_62.substring(0,i)+_62.substring(i,i+1).replace(/[^a-zA-Z0-9]+/g,"")+_62.substring(i+1);
var _64=eval("(function() {var "+_62+" = 5; return "+_62+";})()");
}
}
if(_62=="_"){
_62="";
}
return _62;
};
wm._modules=[];
wm.loadModule=function(_65){
if(!wm._modules[_65]){
tag=["<scrip","t type=\"text/javascript\" src=\"",_65,".js\"></scrip","t>"].join("");
document.write(tag);
wm._modules[_65]=true;
}
};
wm.widgetIsShowing=function(_66){
var w=_66,p;
while(w){
p=w.parent;
if(!w.showing||(w.isActive&&!w.isActive())){
return false;
}
w=p;
}
return true;
};
wm.forEachWidget=function(_67,_68,_69){
if(_68&&_68(_67)===false){
return false;
}
if(!_67){
return false;
}
for(var i=0,ws=_69&&_67 instanceof wm.PageContainer?[]:_67.getOrderedWidgets(),r,w;w=ws[i];i++){
if(w.forEachWidget&&!_69){
r=_68(w);
if(r!==false){
r=w.forEachWidget(_68);
}
}else{
r=wm.forEachWidget(w,_68,_69);
}
if(r===false){
return false;
}
}
};
wm.forEachVisibleWidget=function(_6a,_6b,_6c){
var _6d;
if(_6b&&_6a&&!_6a.isAncestorHidden()){
_6d=_6b(_6a);
}
if(_6d!==false&&(!_6c||!wm.isInstanceType(_6a,[wm.PageContainer,wm.Composite]))){
for(var i=0,ws=_6a.getOrderedWidgets(),r,w;w=ws[i];i++){
if(w.forEachVisibleWidget&&!_6c){
w.forEachVisibleWidget(_6b);
}else{
wm.forEachVisibleWidget(w,_6b,_6c);
}
}
}
};
wm.theme={getPath:function(){
return dojo.moduleUrl("lib.wm.base","widget/themes/"+"default/");
},getImagesPath:function(){
return wm.theme.getPath()+"images/";
}};
wm.hideToolTip=function(_6e){
var tt=dijit._masterTT;
if(tt){
dijit.hideTooltip(tt.aroundNode);
tt._onDeck=null;
if(_6e&&tt.fadeOut){
tt.fadeOut.stop(true);
dojo.style(tt.fadeOut.node,"opacity",0);
}
}
};
wm.focusContainer=function(_6f){
wm.onidle(function(){
wm.forEachWidget(_6f,function(w){
if(w&&w.focus&&(!w.canFocus||w.canFocus())){
w.focus();
return false;
}
});
});
};
wm.isClassInstanceType=function(_70,_71){
try{
return _71&&_70.prototype instanceof _71;
}
catch(e){
}
return false;
};
wm.isInstanceType=function(obj,_72){
if(_72&&typeof _72=="object"&&_72.length){
for(var i=0;i<_72.length;i++){
if(_72[i]&&obj instanceof _72[i]){
return true;
}
}
return false;
}else{
return _72&&obj instanceof _72;
}
};
wm.getWidgetByDomNode=function(_73){
if(!_73){
return;
}
if(dojo.isString(_73)){
_73=dojo.byId(_73);
}
if(!_73){
return;
}
var _74=app._page.name;
var reg=new RegExp("^("+_74+"|app)_?");
while((!_73.id||!_73.id.match(reg))&&_73.parentNode){
_73=_73.parentNode;
}
var id=_73.id;
if(!id){
return;
}
var _75=id;
var id=id.replace(reg,"");
var _76=id.split(/_+/);
var _77="";
var _78=(_75.match(/^app_/))?app:app._page;
for(var i=0;i<_76.length;i++){
if(wm.isInstanceType(_78,wm.PageDialog)){
_78=_78.pageContainer;
}
if(wm.isInstanceType(_78,wm.PageContainer)||wm.isInstanceType(_78,wm.pageContainerMixin)){
_78=_78.page;
_77="";
}else{
_77+=((_77)?"_":"")+_76[i];
if(wm.isInstanceType(_78,wm.Application)){
if(_78[_77]){
_78=_78[_77];
_77="";
}
}else{
if(_78.$[_77]){
_78=_78.$[_77];
_77="";
}
}
}
}
return _78;
};
wm.isNode=function(_79){
if(window["Node"]){
return _79 instanceof Node;
}
if(typeof _79=="object"&&_79){
return "nodeType" in _79&&"appendChild" in _79;
}
};
if(!wm.Array){
wm.Array={};
}
wm.Array.removeElementAt=function(_7a,_7b){
_7a.splice(_7b,1);
return _7a;
};
wm.Array.insertElementAt=function(_7c,_7d,_7e){
_7c.splice(_7e,0,_7d);
};
wm.Array.removeElement=function(_7f,_80){
var _81=dojo.indexOf(_7f,_80);
if(_81>=0){
_7f.splice(_81,1);
}
return _7f;
};
wm.Array.equals=function(a,b,_82){
if(a==b){
return true;
}
if(!a||!b){
return false;
}
if(a.length!=b.length){
return false;
}
for(var i=0;i<a.length;i++){
if(_82){
if(!_82(a[i],b[i])){
return false;
}
}else{
if(a[i]!=b[i]){
return false;
}
}
}
return true;
};
wm.Array.indexOf=function(_83,_84,_85){
for(var i=0;i<_83.length;i++){
if(_85(_83[i],_84)){
return i;
}
}
return -1;
};
wm.Array.last=function(_86){
return _86[_86.length-1];
};
if(!wm.String){
wm.String={};
}
wm.String.endStringWith=function(_87,_88){
if(!_87.match(new RegExp(_88+"$"))){
return _87+_88;
}else{
return _87;
}
};
setCss=function(_89,_8a){
var _8b=dojo.byId(_89);
if(!_8b){
return;
}
_8a=_8a||"";
if(_8b.styleSheet){
if(dojo.isIE<7){
setIe6Css(_8b,_8a);
}else{
_8b.styleSheet.cssText=_8a;
}
}else{
_8b.firstChild&&_8b.removeChild(_8b.firstChild);
_8b.appendChild(document.createTextNode(_8a));
}
};
setIe6Css=function(_8c,_8d){
var c=document.documentElement.firstChild,id=_8c.id;
c.removeChild(_8c);
var n=document.createElement("style");
n.id=id;
n.type="text/css";
if(n.styleSheet){
n.styleSheet.cssText=_8d;
}else{
n.appendChild(document.createTextNode(_8d));
}
c.appendChild(n);
};
wm.conditionalRequire=function(_8e,_8f){
if(arguments.length==1||_8f){
dojo["require"](_8e);
}
};
wm.getBackgroundStyle=function(_90,_91,_92,_93,_94){
if(!_94){
if(dojo.isWebKit){
_94="webkit";
}else{
if(dojo.isMoz){
_94="moz";
}else{
if(dojo.isOpera){
_94="opera";
}else{
if(dojo.isIE<10){
_94="ieold";
}else{
if(dojo.isIE>=10){
_94="ie10";
}
}
}
}
}
}
var _95="-linear-gradient("+(_93=="vertical"?"top":"left")+", "+_90+" 0%,"+_91+" "+_92+"%,"+_91+" 100%)";
switch(_94){
case "webkit":
return "-webkit-gradient(linear, "+(_93=="vertical"?"center top, center bottom":"left center, right center")+", from("+_90+"), color-stop("+_92+"%,"+_91+"), to("+_91+"))";
case "moz":
return "-moz"+_95;
case "ieold":
return "progid:DXImageTransform.Microsoft.gradient( startColorstr='"+_90+"', endColorstr='"+_91+"',GradientType="+(_93=="vertical"?0:1)+")";
case "ie10":
return "-ms"+_95;
case "opera":
return "-o"+_95;
}
};
wm.getStyleFromNode=function(_96,_97){
var _98="";
if(document.defaultView&&document.defaultView.getComputedStyle){
_98=document.defaultView.getComputedStyle(_96,"").getPropertyValue(_97);
}else{
if(_96.currentStyle){
_97=_97.replace(/\-(\w)/g,function(_99,_9a){
return _9a.toUpperCase();
});
_98=_96.currentStyle[_97];
}
}
return _98;
};
wm.getParentForm=function(_9b){
var w=_9b.parent;
var r=_9b.getRoot();
r=r&&r.root;
while(w&&w!=r){
if(wm.isInstanceType(w,[wm.LiveFormBase,wm.DataForm])){
return w;
}
w=w.parent;
}
};
wm.getFormLiveView=function(_9c){
var lv=_9c&&_9c.findLiveVariable();
return lv&&lv.liveView;
};
wm.getFormField=function(_9d){
var a=[],w=_9d;
while(w&&!(wm.isInstanceType(w,wm.LiveForm))){
if(w.formField){
a.unshift(w.formField);
}
w=wm.getParentForm(w);
}
return a.join(".");
};
}
if(!dojo._hasResource["dojo.date"]){
dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.getObject("date",true,dojo);
dojo.date.getDaysInMonth=function(_9e){
var _9f=_9e.getMonth();
var _a0=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_9f==1&&dojo.date.isLeapYear(_9e)){
return 29;
}
return _a0[_9f];
};
dojo.date.isLeapYear=function(_a1){
var _a2=_a1.getFullYear();
return !(_a2%400)||(!(_a2%4)&&!!(_a2%100));
};
dojo.date.getTimezoneName=function(_a3){
var str=_a3.toString();
var tz="";
var _a4;
var pos=str.indexOf("(");
if(pos>-1){
tz=str.substring(++pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((_a4=str.match(pat))){
tz=_a4[1];
}else{
str=_a3.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((_a4=str.match(pat))){
tz=_a4[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
dojo.date.compare=function(_a5,_a6,_a7){
_a5=new Date(+_a5);
_a6=new Date(+(_a6||new Date()));
if(_a7=="date"){
_a5.setHours(0,0,0,0);
_a6.setHours(0,0,0,0);
}else{
if(_a7=="time"){
_a5.setFullYear(0,0,0);
_a6.setFullYear(0,0,0);
}
}
if(_a5>_a6){
return 1;
}
if(_a5<_a6){
return -1;
}
return 0;
};
dojo.date.add=function(_a8,_a9,_aa){
var sum=new Date(+_a8);
var _ab=false;
var _ac="Date";
switch(_a9){
case "day":
break;
case "weekday":
var _ad,_ae;
var mod=_aa%5;
if(!mod){
_ad=(_aa>0)?5:-5;
_ae=(_aa>0)?((_aa-5)/5):((_aa+5)/5);
}else{
_ad=mod;
_ae=parseInt(_aa/5);
}
var _af=_a8.getDay();
var adj=0;
if(_af==6&&_aa>0){
adj=1;
}else{
if(_af==0&&_aa<0){
adj=-1;
}
}
var _b0=_af+_ad;
if(_b0==0||_b0==6){
adj=(_aa>0)?2:-2;
}
_aa=(7*_ae)+_ad+adj;
break;
case "year":
_ac="FullYear";
_ab=true;
break;
case "week":
_aa*=7;
break;
case "quarter":
_aa*=3;
case "month":
_ab=true;
_ac="Month";
break;
default:
_ac="UTC"+_a9.charAt(0).toUpperCase()+_a9.substring(1)+"s";
}
if(_ac){
sum["set"+_ac](sum["get"+_ac]()+_aa);
}
if(_ab&&(sum.getDate()<_a8.getDate())){
sum.setDate(0);
}
return sum;
};
dojo.date.difference=function(_b1,_b2,_b3){
_b2=_b2||new Date();
_b3=_b3||"day";
var _b4=_b2.getFullYear()-_b1.getFullYear();
var _b5=1;
switch(_b3){
case "quarter":
var m1=_b1.getMonth();
var m2=_b2.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_b4*4);
_b5=q2-q1;
break;
case "weekday":
var _b6=Math.round(dojo.date.difference(_b1,_b2,"day"));
var _b7=parseInt(dojo.date.difference(_b1,_b2,"week"));
var mod=_b6%7;
if(mod==0){
_b6=_b7*5;
}else{
var adj=0;
var _b8=_b1.getDay();
var _b9=_b2.getDay();
_b7=parseInt(_b6/7);
mod=_b6%7;
var _ba=new Date(_b1);
_ba.setDate(_ba.getDate()+(_b7*7));
var _bb=_ba.getDay();
if(_b6>0){
switch(true){
case _b8==6:
adj=-1;
break;
case _b8==0:
adj=0;
break;
case _b9==6:
adj=-1;
break;
case _b9==0:
adj=-2;
break;
case (_bb+mod)>5:
adj=-2;
}
}else{
if(_b6<0){
switch(true){
case _b8==6:
adj=0;
break;
case _b8==0:
adj=1;
break;
case _b9==6:
adj=2;
break;
case _b9==0:
adj=1;
break;
case (_bb+mod)<0:
adj=2;
}
}
}
_b6+=adj;
_b6-=(_b7*2);
}
_b5=_b6;
break;
case "year":
_b5=_b4;
break;
case "month":
_b5=(_b2.getMonth()-_b1.getMonth())+(_b4*12);
break;
case "week":
_b5=parseInt(dojo.date.difference(_b1,_b2,"day")/7);
break;
case "day":
_b5/=24;
case "hour":
_b5/=60;
case "minute":
_b5/=60;
case "second":
_b5/=1000;
case "millisecond":
_b5*=_b2.getTime()-_b1.getTime();
}
return Math.round(_b5);
};
}
if(!dojo._hasResource["dojo.cldr.supplemental"]){
dojo._hasResource["dojo.cldr.supplemental"]=true;
dojo.provide("dojo.cldr.supplemental");
dojo.getObject("cldr.supplemental",true,dojo);
dojo.cldr.supplemental.getFirstDayOfWeek=function(_bc){
var _bd={mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,er:6,et:6,iq:6,ir:6,jo:6,ke:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,so:6,sy:6,tn:6,ye:6,ar:0,as:0,az:0,bw:0,ca:0,cn:0,fo:0,ge:0,gl:0,gu:0,hk:0,il:0,"in":0,jm:0,jp:0,kg:0,kr:0,la:0,mh:0,mn:0,mo:0,mp:0,mt:0,nz:0,ph:0,pk:0,sg:0,th:0,tt:0,tw:0,um:0,us:0,uz:0,vi:0,zw:0};
var _be=dojo.cldr.supplemental._region(_bc);
var dow=_bd[_be];
return (dow===undefined)?1:dow;
};
dojo.cldr.supplemental._region=function(_bf){
_bf=dojo.i18n.normalizeLocale(_bf);
var _c0=_bf.split("-");
var _c1=_c0[1];
if(!_c1){
_c1={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",he:"il",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[_c0[0]];
}else{
if(_c1.length==4){
_c1=_c0[2];
}
}
return _c1;
};
dojo.cldr.supplemental.getWeekend=function(_c2){
var _c3={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5};
var _c4={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6};
var _c5=dojo.cldr.supplemental._region(_c2);
var _c6=_c3[_c5];
var end=_c4[_c5];
if(_c6===undefined){
_c6=6;
}
if(end===undefined){
end=0;
}
return {start:_c6,end:end};
};
}
if(!dojo._hasResource["dojo.string"]){
dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.getObject("string",true,dojo);
dojo.string.rep=function(str,num){
if(num<=0||!str){
return "";
}
var buf=[];
for(;;){
if(num&1){
buf.push(str);
}
if(!(num>>=1)){
break;
}
str+=str;
}
return buf.join("");
};
dojo.string.pad=function(_c7,_c8,ch,end){
if(!ch){
ch="0";
}
var out=String(_c7),pad=dojo.string.rep(ch,Math.ceil((_c8-out.length)/ch.length));
return end?out+pad:pad+out;
};
dojo.string.substitute=function(_c9,map,_ca,_cb){
_cb=_cb||dojo.global;
_ca=_ca?dojo.hitch(_cb,_ca):function(v){
return v;
};
return _c9.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_cc,key,_cd){
var _ce=dojo.getObject(key,false,map);
if(_cd){
_ce=dojo.getObject(_cd,false,_cb).call(_cb,_ce,key);
}
try{
return _ca(_ce,key).toString();
}
catch(e){
return "";
}
});
};
dojo.string.trim=String.prototype.trim?dojo.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
}
if(!dojo._hasResource["dojo.date.locale"]){
dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
dojo.getObject("date.locale",true,dojo);
(function(){
function _cf(_d0,_d1,_d2,_d3){
return _d3.replace(/([a-z])\1*/ig,function(_d4){
var s,pad,c=_d4.charAt(0),l=_d4.length,_d5=["abbr","wide","narrow"];
switch(c){
case "G":
s=_d1[(l<4)?"eraAbbr":"eraNames"][_d0.getFullYear()<0?0:1];
break;
case "y":
case "Y":
s=_d0.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_d2.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
pad=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_d0.getMonth()+1)/3);
pad=true;
break;
case "M":
var m=_d0.getMonth();
if(l<3){
s=m+1;
pad=true;
}else{
var _d6=["months","format",_d5[l-3]].join("-");
s=_d1[_d6][m];
}
break;
case "w":
var _d7=0;
s=dojo.date.locale._getWeekOfYear(_d0,_d7);
pad=true;
break;
case "d":
s=_d0.getDate();
pad=true;
break;
case "D":
s=dojo.date.locale._getDayOfYear(_d0);
pad=true;
break;
case "E":
var d=_d0.getDay();
if(l<3){
s=d+1;
pad=true;
}else{
var _d8=["days","format",_d5[l-3]].join("-");
s=_d1[_d8][d];
}
break;
case "a":
var _d9=(_d0.getHours()<12)?"am":"pm";
s=_d2[_d9]||_d1["dayPeriods-format-wide-"+_d9];
break;
case "h":
case "H":
case "K":
case "k":
var h=_d0.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
pad=true;
break;
case "m":
s=_d0.getMinutes();
pad=true;
break;
case "s":
s=_d0.getSeconds();
pad=true;
break;
case "S":
s=Math.round(_d0.getMilliseconds()*Math.pow(10,l-3));
pad=true;
break;
case "v":
case "z":
s=dojo.date.locale._getZone(_d0,true,_d2);
if(s){
break;
}
l=4;
case "Z":
var _da=dojo.date.locale._getZone(_d0,false,_d2);
var tz=[(_da<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(_da)/60),2),dojo.string.pad(Math.abs(_da)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_d3);
}
if(pad){
s=dojo.string.pad(s,l);
}
return s;
});
};
dojo.date.locale._getZone=function(_db,_dc,_dd){
if(_dc){
return dojo.date.getTimezoneName(_db);
}else{
return _db.getTimezoneOffset();
}
};
dojo.date.locale.format=function(_de,_df){
_df=_df||{};
var _e0=dojo.i18n.normalizeLocale(_df.locale),_e1=_df.formatLength||"short",_e2=dojo.date.locale._getGregorianBundle(_e0),str=[],_e3=dojo.hitch(this,_cf,_de,_e2,_df);
if(_df.selector=="year"){
return _e4(_e2["dateFormatItem-yyyy"]||"yyyy",_e3);
}
var _e5;
if(_df.selector!="date"){
_e5=_df.timePattern||_e2["timeFormat-"+_e1];
if(_e5){
str.push(_e4(_e5,_e3));
}
}
if(_df.selector!="time"){
_e5=_df.datePattern||_e2["dateFormat-"+_e1];
if(_e5){
str.push(_e4(_e5,_e3));
}
}
return str.length==1?str[0]:_e2["dateTimeFormat-"+_e1].replace(/\{(\d+)\}/g,function(_e6,key){
return str[key];
});
};
dojo.date.locale.regexp=function(_e7){
return dojo.date.locale._parseInfo(_e7).regexp;
};
dojo.date.locale._parseInfo=function(_e8){
_e8=_e8||{};
var _e9=dojo.i18n.normalizeLocale(_e8.locale),_ea=dojo.date.locale._getGregorianBundle(_e9),_eb=_e8.formatLength||"short",_ec=_e8.datePattern||_ea["dateFormat-"+_eb],_ed=_e8.timePattern||_ea["timeFormat-"+_eb],_ee;
if(_e8.selector=="date"){
_ee=_ec;
}else{
if(_e8.selector=="time"){
_ee=_ed;
}else{
_ee=_ea["dateTimeFormat-"+_eb].replace(/\{(\d+)\}/g,function(_ef,key){
return [_ed,_ec][key];
});
}
}
var _f0=[],re=_e4(_ee,dojo.hitch(this,_f1,_f0,_ea,_e8));
return {regexp:re,tokens:_f0,bundle:_ea};
};
dojo.date.locale.parse=function(_f2,_f3){
var _f4=/[\u200E\u200F\u202A\u202E]/g,_f5=dojo.date.locale._parseInfo(_f3),_f6=_f5.tokens,_f7=_f5.bundle,re=new RegExp("^"+_f5.regexp.replace(_f4,"")+"$",_f5.strict?"":"i"),_f8=re.exec(_f2&&_f2.replace(_f4,""));
if(!_f8){
return null;
}
var _f9=["abbr","wide","narrow"],_fa=[1970,0,1,0,0,0,0],_fb="",_fc=dojo.every(_f8,function(v,i){
if(!i){
return true;
}
var _fd=_f6[i-1];
var l=_fd.length;
switch(_fd.charAt(0)){
case "y":
if(l!=2&&_f3.strict){
_fa[0]=v;
}else{
if(v<100){
v=Number(v);
var _fe=""+new Date().getFullYear(),_ff=_fe.substring(0,2)*100,_100=Math.min(Number(_fe.substring(2,4))+20,99),num=(v<_100)?_ff+v:_ff-100+v;
_fa[0]=num;
}else{
if(_f3.strict){
return false;
}
_fa[0]=v;
}
}
break;
case "M":
if(l>2){
var _101=_f7["months-format-"+_f9[l-3]].concat();
if(!_f3.strict){
v=v.replace(".","").toLowerCase();
_101=dojo.map(_101,function(s){
return s.replace(".","").toLowerCase();
});
}
v=dojo.indexOf(_101,v);
if(v==-1){
return false;
}
}else{
v--;
}
_fa[1]=v;
break;
case "E":
case "e":
var days=_f7["days-format-"+_f9[l-3]].concat();
if(!_f3.strict){
v=v.toLowerCase();
days=dojo.map(days,function(d){
return d.toLowerCase();
});
}
v=dojo.indexOf(days,v);
if(v==-1){
return false;
}
break;
case "D":
_fa[1]=0;
case "d":
_fa[2]=v;
break;
case "a":
var am=_f3.am||_f7["dayPeriods-format-wide-am"],pm=_f3.pm||_f7["dayPeriods-format-wide-pm"];
if(!_f3.strict){
var _102=/\./g;
v=v.replace(_102,"").toLowerCase();
am=am.replace(_102,"").toLowerCase();
pm=pm.replace(_102,"").toLowerCase();
}
if(_f3.strict&&v!=am&&v!=pm){
return false;
}
_fb=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_fa[3]=v;
break;
case "m":
_fa[4]=v;
break;
case "s":
_fa[5]=v;
break;
case "S":
_fa[6]=v;
}
return true;
});
var _103=+_fa[3];
if(_fb==="p"&&_103<12){
_fa[3]=_103+12;
}else{
if(_fb==="a"&&_103==12){
_fa[3]=0;
}
}
var _104=new Date(_fa[0],_fa[1],_fa[2],_fa[3],_fa[4],_fa[5],_fa[6]);
if(_f3.strict){
_104.setFullYear(_fa[0]);
}
var _105=_f6.join(""),_106=_105.indexOf("d")!=-1,_107=_105.indexOf("M")!=-1;
if(!_fc||(_107&&_104.getMonth()>_fa[1])||(_106&&_104.getDate()>_fa[2])){
return null;
}
if((_107&&_104.getMonth()<_fa[1])||(_106&&_104.getDate()<_fa[2])){
_104=dojo.date.add(_104,"hour",1);
}
return _104;
};
function _e4(_108,_109,_10a,_10b){
var _10c=function(x){
return x;
};
_109=_109||_10c;
_10a=_10a||_10c;
_10b=_10b||_10c;
var _10d=_108.match(/(''|[^'])+/g),_10e=_108.charAt(0)=="'";
dojo.forEach(_10d,function(_10f,i){
if(!_10f){
_10d[i]="";
}else{
_10d[i]=(_10e?_10a:_109)(_10f.replace(/''/g,"'"));
_10e=!_10e;
}
});
return _10b(_10d.join(""));
};
function _f1(_110,_111,_112,_113){
_113=dojo.regexp.escapeString(_113);
if(!_112.strict){
_113=_113.replace(" a"," ?a");
}
return _113.replace(/([a-z])\1*/ig,function(_114){
var s,c=_114.charAt(0),l=_114.length,p2="",p3="";
if(_112.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
s=(l>2)?"\\S+?":"1[0-2]|"+p2+"[1-9]";
break;
case "D":
s="[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|"+p3+"[1-9][0-9]|"+p2+"[1-9]";
break;
case "d":
s="3[01]|[12]\\d|"+p2+"[1-9]";
break;
case "w":
s="[1-4][0-9]|5[0-3]|"+p2+"[1-9]";
break;
case "E":
s="\\S+";
break;
case "h":
s="1[0-2]|"+p2+"[1-9]";
break;
case "k":
s="1[01]|"+p2+"\\d";
break;
case "H":
s="1\\d|2[0-3]|"+p2+"\\d";
break;
case "K":
s="1\\d|2[0-4]|"+p2+"[1-9]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_112.am||_111["dayPeriods-format-wide-am"],pm=_112.pm||_111["dayPeriods-format-wide-pm"];
s=am+"|"+pm;
if(!_112.strict){
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_110){
_110.push(_114);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
})();
(function(){
var _115=[];
dojo.date.locale.addCustomFormats=function(_116,_117){
_115.push({pkg:_116,name:_117});
};
dojo.date.locale._getGregorianBundle=function(_118){
var _119={};
dojo.forEach(_115,function(desc){
var _11a=dojo.i18n.getLocalization(desc.pkg,desc.name,_118);
_119=dojo.mixin(_119,_11a);
},this);
return _119;
};
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(item,type,_11b,_11c){
var _11d,_11e=dojo.date.locale._getGregorianBundle(_11c),_11f=[item,_11b,type];
if(_11b=="standAlone"){
var key=_11f.join("-");
_11d=_11e[key];
if(_11d[0]==1){
_11d=undefined;
}
}
_11f[1]="format";
return (_11d||_11e[_11f.join("-")]).concat();
};
dojo.date.locale.isWeekend=function(_120,_121){
var _122=dojo.cldr.supplemental.getWeekend(_121),day=(_120||new Date()).getDay();
if(_122.end<_122.start){
_122.end+=7;
if(day<_122.start){
day+=7;
}
}
return day>=_122.start&&day<=_122.end;
};
dojo.date.locale._getDayOfYear=function(_123){
return dojo.date.difference(new Date(_123.getFullYear(),0,1,_123.getHours()),_123)+1;
};
dojo.date.locale._getWeekOfYear=function(_124,_125){
if(arguments.length==1){
_125=0;
}
var _126=new Date(_124.getFullYear(),0,1).getDay(),adj=(_126-_125+7)%7,week=Math.floor((dojo.date.locale._getDayOfYear(_124)+adj-1)/7);
if(_126==_125){
week++;
}
return week;
};
}
if(!dojo._hasResource["wm.base.lib.date"]){
dojo._hasResource["wm.base.lib.date"]=true;
dojo.provide("wm.base.lib.date");
wm.setTimeZoneOffset=function(){
wm.timezoneOffset=new Date().getTimezoneOffset()/60+wm.serverTimeOffset/(1000*60*60);
if(isNaN(wm.timezoneOffset)){
wm.timezoneOffset=0;
}
};
if(wm.serverTimeOffset!==undefined){
wm.setTimeZoneOffset();
}
wm.convertValueToDate=function(_127,_128){
if(_127 instanceof Date){
return _127;
}
var v=_127,s=_128||{selector:"date"};
if(!v&&v!==0){
return null;
}else{
if(Number(v)||typeof (v)=="number"){
return new Date(Number(v));
}else{
if(dojo.trim(v.toLowerCase()).indexOf("today")!=-1){
if(v.indexOf("+")!=-1){
var _129=v.toLowerCase().split("+");
try{
var _12a=dojo.trim(_129[0]);
var _12b=dojo.trim(_129[1]);
if(_12a=="today"){
v=dojo.date.add(new Date(),"day",_12b*1);
}else{
v=dojo.date.add(new Date(),"day",_12a*1);
}
}
catch(e){
}
}else{
v=new Date();
}
return v;
}
}
}
return v!=Number(v)?dojo.date.locale.parse(v,s):new Date(Number(v));
};
}
if(!dojo._hasResource["wm.base.lib.types"]){
dojo._hasResource["wm.base.lib.types"]=true;
dojo.provide("wm.base.lib.types");
wm.typeManager={types:{},initialized:false,initTypes:function(){
if(wm.types&&wm.types.types){
wm.typeManager.setTypes(wm.types.types);
}else{
this.addDefaultTypes();
}
},setTypes:function(_12c){
this.clearTypes();
if(_12c){
wm.forEachProperty(_12c,function(_12d,_12e){
var _12f=_12e.match(/\<(.*),(.*)\>/);
if(_12f){
_12d.isList=true;
_12d.isHashMap=true;
_12d.fields={name:{include:["read"],isList:false,type:_12f[1]},dataValue:{isList:false,type:_12f[2]}};
}
});
dojo.mixin(this.types,_12c);
}
this.addDefaultTypes();
},clearTypes:function(){
this._publicTypes={};
if(wm.dataSources){
wm.dataSources.clearSources();
}
for(var i in this.types){
if(!this.types[i].userType){
delete this.types[i];
}
}
},getPrimaryKey:function(_130){
if(!_130||!_130.fields){
return "";
}
for(var _131 in _130.fields){
if(_130.fields[_131].include.length){
return _131;
}
}
},getPrimitiveType:function(_132){
return (this.types[_132]||0).primitiveType;
},isStructuredType:function(_133){
return this.types[_133]&&!this.getPrimitiveType(_133);
},getService:function(_134){
var t=this.types[_134];
return (t&&t.service);
},getLiveService:function(_135){
var t=this.types[_135];
return (t&&t.liveService&&t.service);
},generatePublicTypes:function(){
var _136={};
for(var i in this.types){
if(this.isPublicType(i)){
_136[i]=this.types[i];
}
}
return _136;
},getPublicTypes:function(){
return wm.isEmpty(this._publicTypes)?this._publicTypes=this.generatePublicTypes():this._publicTypes;
},getLiveServiceTypes:function(){
var _137=this.getPublicTypes(),_138={};
for(var i in _137){
if(this.getLiveService(i)){
_138[i]=_137[i];
}
}
return _138;
},isPublicType:function(_139){
var t=this.types[_139];
return (t&&!t.internal&&!t.primitiveType);
},getTypeSchema:function(_13a){
return (this.types[_13a]||0).fields;
},getType:function(_13b){
return this.types[_13b];
},isType:function(_13c){
return Boolean(this.getType(_13c));
},typeHasField:function(_13d,_13e){
var _13f=this.types[_13d];
if(!_13f){
return false;
}
var _140=_13e.split(/\./);
for(var i=0;i<_140.length;i++){
var _141=_13f.fields[_140[i]];
if(!_141){
return false;
}
if(i+1<_140.length){
_13f=this.types[_141.type];
if(!_13f){
return false;
}
}
}
return true;
},getPropertyInfoFromSchema:function(_142,_143){
var s=_142,_144=dojo.isString(_143)?_143.split("."):_143,p=_144.shift(),f=s[p];
if(!_144.length){
return f;
}else{
var t=(f||0).type,ts=this.getTypeSchema(t);
if(ts){
return this.getPropertyInfoFromSchema(ts,_144);
}
}
},getFilteredPropNames:function(_145,_146){
var ts=[],u=[],t,_147=dojo.isFunction(_146);
wm.forEach(_145,function(o,i){
if(!_147||_146(o)){
var elem={};
elem.info=o;
elem.name=i;
ts.push(elem);
}
});
ts.sort(function(a,b){
return (a.info.fieldOrder-b.info.fieldOrder);
});
for(i=0;(ti=ts[i]);i++){
u.push(ti.name);
}
return u;
},getSimplePropNames:function(_148){
return this.getFilteredPropNames(_148,function(p){
return !wm.typeManager.isStructuredType((p||0).type);
});
},getFieldList:function(_149,_14a,_14b){
if(typeof _149=="string"){
_149=this.getType(_149).fields;
}
var _14c=[];
for(var i in _149){
if(wm.typeManager.isStructuredType(_149[i].type)){
if(!_149[i].isList&&!wm.isListType(_149[i].type)&&(_14b===undefined||_14b>=0)){
_14c=_14c.concat(this.getFieldList(_149[i].type,_14a?_14a+"."+i:i,_14b===undefined?undefined:_14b-1));
}
}else{
_14c.push({dataIndex:(_14a?_14a+".":"")+i,caption:wm.capitalize(i),displayType:wm.capitalize(_149[i].type)});
}
}
return _14c;
},getStructuredPropNames:function(_14d,_14e){
return this.getFilteredPropNames(_14d,function(p){
return wm.typeManager.isStructuredType((p||0).type)||_14e&&p.isList;
});
},getPropNames:function(_14f,_150){
var u=this.getSimplePropNames(_14f),s=_150?this.getStructuredPropNames(_14f):[];
return u.concat(s);
},getPropertyOrder:function(_151,_152){
var o=[],_153=dojo.isString(_152)?_152.split("."):_152,p=_153.shift(),_154=this.getTypeSchema(_151),_155=this.getPropNames(_154,true);
var c,l=_155.length;
for(var i=0,n;(n=_155[i]);i++){
if(p==n){
c=i;
break;
}
}
o.push(c!==undefined?c:l);
var f=_154&&_154[p],t=(f||0).type;
if(!_153.length||!t){
return o;
}else{
return o.concat(this.getPropertyOrder(t,_153));
}
},hasStructuredType:function(_156,_157){
var s=this.getTypeSchema(_156),p,c=dojo.isFunction(_157)&&_157;
for(var i in s){
p=s[i];
if(this.isStructuredType(p.type)){
if(c){
if(c(p)){
return true;
}
}else{
return true;
}
}
}
},addType:function(_158,_159){
if(!_159||wm.isEmpty(_159)){
return;
}
_159.userType=true;
this.types[_158]=_159;
if(this.isPublicType(_158)&&!wm.isEmpty(this._publicTypes)){
this._publicTypes[_158]=_159;
}
},removeType:function(_15a){
if(this._publicTypes){
delete this._publicTypes[_15a];
}
delete this.types[_15a];
},addDefaultTypes:function(){
if(!this.initialized){
this.initialized=true;
var d=wm.defaultTypes||{};
for(var i in d){
this.addType(i,d[i]);
}
}
},isPropInList:function(_15b,_15c){
var s=_15b,_15d=dojo.isString(_15c)?_15c.split("."):_15c,p=_15d.shift(),f=s[p];
if(!f){
return false;
}else{
if(f.isList){
return true;
}else{
if(_15d.length){
var t=(f||0).type,ts=this.getTypeSchema(t);
if(ts){
return this.isPropInList(ts,_15d);
}
}
}
}
},getDisplayField:function(_15e){
var _15f=wm.typeManager.getType(_15e);
if(!_15f){
return "";
}
var _160=_15f.fields;
var _161={};
var _162={};
for(_163 in _160){
var _164=_160[_163];
if(!_164.exclude||_164.exclude.length==0){
if(_164.type=="java.lang.String"||_164.type=="StringData"){
_161[_163]=_164;
}else{
if(!wm.typeManager.isStructuredType(_164.type)){
_162[_163]=_164;
}
}
}
}
for(var _163 in _161){
var _165=100000;
var _166;
if(!dojo.isFunction(_161[_163])){
if(_161[_163].fieldOrder===undefined&&!_166){
_166=_163;
}else{
if(_161[_163].fieldOrder!==undefined&&_161[_163].fieldOrder<_165){
_165=_161[_163].fieldOrder;
_166=_163;
}
}
}
}
if(_166){
return _166;
}
for(var _163 in _162){
var _165=100000;
var _166;
if(!dojo.isFunction(_162[_163])){
if(_162[_163].fieldOrder===undefined&&!_166){
_166=_163;
}else{
if(_162[_163].fieldOrder!==undefined&&_162[_163].fieldOrder<_165){
_165=_162[_163].fieldOrder;
_166=_163;
}
}
}
}
if(_166){
return _166;
}
for(_163 in _160){
return _163;
}
}};
wm.defaultTypes={NumberData:{fields:{dataValue:{type:"Number"}}},BooleanData:{fields:{dataValue:{type:"Boolean"}}},StringData:{fields:{dataValue:{type:"String"}}},DateData:{fields:{dataValue:{type:"Date"}}},EntryData:{fields:{name:{type:"string"},dataValue:{type:"any","include":["delete","read","update","insert"]}}},AnyData:{fields:{dataValue:{type:"any"}}}};
wm.isListType=function(_167){
return _167&&(_167.charAt(0)=="["||_167.match(/\<.*,.*\>/));
};
wm.isHashMapType=function(_168){
var _169=wm.typeManager.getType(_168);
return _169&&_169.isHashMap;
};
wm.getFriendlyTypeName=function(_16a,_16b){
_16a=_16a||"(any)";
var s=wm.typeManager.getService(_16a),_16c=wm.isListType(_16a),t=s&&!_16a.match(/\</)?[s,_16a.split(".").pop()].join("."):_16a;
if(!wm.isHashMapType(_16a)){
if(_16c){
t=t.slice(0,-1);
}
if(_16b||_16c){
t=t+" list";
}
}
return t;
};
wm.getPrimitiveDisplayType=function(_16d){
var t=wm.typeManager.getPrimitiveType(_16d);
if(t=="Boolean"){
t="CheckBox";
}
if(!t||t=="String"){
t="Text";
}
return t;
};
wm.getDisplayType=function(_16e){
var t;
var _16f=_16e.fieldSubType;
if(_16f!=undefined&&_16f!=null&&_16f.length>0){
if(_16f=="picklist"){
t="Select";
}else{
if(_16f=="textarea"){
t="LargeTextArea";
}else{
if(_16f=="boolean"){
t="CheckBox";
}else{
if(_16f=="date"){
t="Date";
}else{
if(_16f=="datetime"){
t="Time";
}else{
if(_16f=="currency"){
t="Currency";
}else{
t="Text";
}
}
}
}
}
}
}else{
t=wm.getPrimitiveDisplayType(_16e.type);
}
return t;
};
}
if(!dojo._hasResource["wm.base.lib.data"]){
dojo._hasResource["wm.base.lib.data"]=true;
dojo.provide("wm.base.lib.data");
wm.data=wm.data||{};
dojo.mixin(wm.data,{getIncludeFields:function(_170){
var pi,_171=[],_172=wm.typeManager.getTypeSchema(_170);
for(var i in _172){
pi=_172[i];
if(pi.include&&pi.include.length){
if(wm.typeManager.isStructuredType(pi.type)){
var _173=wm.typeManager.getTypeSchema(pi.type);
for(var j in _173){
_171.push(i+"."+j);
}
}else{
_171.push(i);
}
}
}
return _171;
},hasIncludeData:function(_174,_175){
if(!_175||wm.isEmpty(_175)){
return false;
}
var _176=this.getIncludeFields(_174);
for(var i=0,f;f=_176[i];i++){
if(dojo.getObject(f,false,_175)===undefined){
return;
}
}
return true;
},hasOperationData:function(_177,_178,_179){
if(!wm.typeManager.getLiveService(_178)){
return false;
}
switch(_177){
case "read":
return !_179||wm.data.hasIncludeData(_178,_179);
case "delete":
case "update":
return wm.data.hasIncludeData(_178,_179);
case "insert":
return wm.data.hasRequiredData(_177,_178,_179,true);
}
},hasRequiredData:function(_17a,_17b,_17c,_17d){
var _17e=wm.typeManager.getTypeSchema(_17b),s,d,_17f,_180,_181,_182;
for(var i in _17e){
s=_17e[i];
_17f=wm.typeManager.isStructuredType(s.type);
d=_17c&&_17c[i];
if(_17f&&_17d){
if((d||s.required)&&!s.isList&&!this.hasRequiredData(s.type,d,_17d)){
return false;
}
}else{
_180=(d!==undefined);
_181=s.required&&!_180;
if(dojo.indexOf(s.exclude,_17a)!=-1?_180:_181){
return false;
}
}
}
return true;
},clearBinding:function(_183,_184){
var w=wm.data.getPropWire(_183,_184);
if(w){
var b=w.owner,_185=w.target,tp=w.targetProperty;
if(b){
b.removeWire(w.getWireId());
}
if(_185&&tp){
_185.setValue(tp,"");
}
}
},getPropWire:function(_186,_187){
var tp=_187,tobj=_186,_188=tobj&&tobj.$.binding,w=_188&&_188.wires[tp];
if(w){
return w;
}
var _189=tobj&&tobj.isDesignLoaded()?studio.application:app;
if(tobj&&tobj.isOwnedBy(_189)){
return wm.data.findSourceWire((tobj||0).getId(),tp);
}
},findSourceWire:function(_18a,_18b){
if(_18a){
var c,o,id,_18c,w;
for(var i in wm.Component.byId){
c=wm.Component.byId[i];
if((c instanceof wm.Binding)&&(c.isDesignLoaded()||!(window.studio&&window.studio._isWaveMakerStudio))){
var _18c=c.findWiresByProps({targetId:_18a,targetProperty:_18b});
if(_18c.length){
return _18c[0];
}
}
}
}
},getPropBindSource:function(_18d,_18e){
var w=wm.data.getPropWire(_18d,_18e);
if(w){
return _18d.getValueById(w.source);
}
},compare:function(a,b){
return a===b?0:a===undefined?-1:b===undefined?1:b===null?1:a>b?1:-1;
},compareNumbers:function(a,b){
var na=wm.isNumber(a),nb=wm.isNumber(b);
return na&&nb?a-b:(na?-1:(nb?1:0));
}});
}
if(!dojo._hasResource["wm.base.data.expression"]){
dojo._hasResource["wm.base.data.expression"]=true;
dojo.provide("wm.base.data.expression");
wm.expression={getValue:function(_18f,_190,_191){
var v=wm.expression._getText(_18f,_190);
var _192="";
try{
var f=function(){
_192=eval(v);
}.call(_191);
}
catch(e){
}
return _192;
},getSources:function(_193){
var re=wm.expression._getSourceRegEx;
re.lastIndex=0;
var _194=(_193||"").match(re,"g")||[];
for(var i=0;i<_194.length;i++){
_194[i]=_194[i].substring(2,_194[i].length-1);
}
return _194;
},_getText:function(_195,_196){
return _195.replace(wm.expression._getSourceRegEx,function(){
try{
var _197=arguments[1];
if(_197.match(/^\[.*\]/)){
var _198=_197.match(/^\[(.*?)\]/);
_197=_197.replace(/^\[(.*?)\]\./,"");
var root=wm.Page.getPage(_198[1]);
var v=root?root.getValue(_197):"";
}else{
if(_196.getValue){
var v=_196.getValue(_197);
}else{
if(_197.indexOf(".")!=-1){
var arr=_197.split(".");
var v=_196;
dojo.forEach(arr,function(prop){
if(v!=null){
v=v[prop];
}
});
}else{
var v=_196[_197];
}
}
}
if(v instanceof wm.Component){
return v.getRuntimeId();
}else{
if(v instanceof wm.Object||v===undefined){
v="";
}
}
if(v instanceof Date){
return "new Date("+v.getTime()+")";
}else{
return dojo.toJson(v);
}
}
catch(e){
}
});
},_getSourceRegEx:new RegExp(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g)};
}
if(!dojo._hasResource["wm.base.Object"]){
dojo._hasResource["wm.base.Object"]=true;
dojo.provide("wm.base.Object");
dojo.declare("wm.Object",null,{constructor:function(){
this.type=this.declaredClass;
},toString:function(){
return "["+this.declaredClass+"]";
},getProp:function(_199){
var g=this._getPropWorker(this,_199,"get");
if(g){
return g.call(this,_199);
}else{
return this._getProp(_199);
}
},_getProp:function(_19a){
return this[_19a];
},setProp:function(_19b,_19c){
if(this.isDestroyed){
return;
}
var s=this._getPropWorker(this,_19b,"set");
if(s){
s.call(this,_19c);
}else{
this._setProp(_19b,_19c);
}
this.valueChanged(_19b,this.getProp(_19b));
},_setProp:function(_19d,_19e){
if(_19d in this){
this[_19d]=_19e;
}
},_getPropWorker:function(_19f,_1a0,_1a1){
if(_1a0=="value"){
return null;
}
var w=_19f._isDesignLoaded&&_19f[_1a1+"_"+_1a0]||this[_1a1+_1a0.slice(0,1).toUpperCase()+_1a0.slice(1)];
if(dojo.isFunction(w)){
return w;
}
},valueChanged:function(_1a2,_1a3){
},_getValue:function(_1a4){
return this.getProp(_1a4);
},_setValue:function(_1a5,_1a6){
this.setProp(_1a5,_1a6);
},getValue:function(_1a7){
if(!_1a7){
return;
}
var _1a8=dojo.isString(_1a7)?_1a7.replace(/([^\.])\[/g,"$1.[").split("."):_1a7;
var o=(_1a8[0]=="studio"&&this instanceof wm.Application)?window:this;
var p;
while(_1a8.length>1){
p=_1a8.shift();
var _1a9;
if(this instanceof wm.Variable||this instanceof Array){
_1a9=p.match(/^\[(\d+)\]$/);
}
if(_1a9&&this instanceof wm.Variable){
o=o.getItem(_1a9[1]);
}else{
if(_1a9&&this instanceof Array){
o=o[pmatch1];
}else{
o=o.getValue?o.getValue(p):o[p];
}
}
if(!o){
wm.logging&&undefined;
return;
}
if(o.getValue){
return o.getValue(_1a8);
}
}
p=_1a8.shift();
return o._getValue?o._getValue(p):o[p];
},setValue:function(_1aa,_1ab){
var _1ac=dojo.isString(_1aa)?_1aa.split("."):_1aa,o=this,p;
while(_1ac.length>1){
o=o.getValue(_1ac.shift());
if(!o){
return;
}
if(o instanceof wm.Object){
return o.setValue(_1ac,_1ab);
}
}
p=_1ac.shift();
o._setValue?o._setValue(p,_1ab):o[p]=_1ab;
}});
dojo.mixin(wm.Object,{makeSchema:function(_1ad){
_1ad.schemaClass=function(){
};
var _1ae=_1ad.superclass;
try{
if(_1ad._meta.parents&&_1ad._meta.parents.length>1){
_1ae=_1ad._meta.parents[0].prototype;
}
}
catch(e){
}
if(_1ae){
var ctor=this.getSchemaClass(_1ae.constructor);
_1ad.schemaClass.prototype=new ctor();
}
_1ad.prototype.schema=new _1ad.schemaClass();
return _1ad.schemaClass;
},getSchemaClass:function(_1af){
return _1af.schemaClass||wm.Object.makeSchema(_1af);
},extendSchema:function(_1b0,_1b1,_1b2){
if(!_1b2&&_1b1){
var _1b3=_1b0.prototype.declaredClass;
if(wm.extendSchemaDictionary){
var _1b4=wm.extendSchemaDictionary[_1b3];
if(_1b4){
for(var i in _1b4){
if(_1b1[i]){
_1b1[i].shortname=_1b4[i];
}else{
_1b1[i]={shortname:_1b4[i]};
}
}
}
}
}
var _1b5=wm.Object.getSchemaClass(_1b0).prototype;
if(_1b5){
for(var _1b6 in _1b1){
if(_1b5[_1b6]){
_1b1[_1b6]=dojo.mixin(dojo.clone(_1b5[_1b6]),_1b1[_1b6],!_1b1[_1b6].ignore?{ignore:0}:{});
}
}
}
dojo.extend(wm.Object.getSchemaClass(_1b0),_1b1);
delete _1b0._publishedProps;
}});
wm.Object.extendSchema(wm.Object,{declaredClass:{ignore:1},schema:{ignore:1},schemaClass:{ignore:1},type:{ignore:1},setValue:{ignore:1,group:"method"},getValue:{ignore:1,group:"method",returns:"Any"}});
wm.Object.extend({getPropFlags:function(_1b7,_1b8){
},getPropertyType:function(_1b9){
var v=this.getProp(_1b9);
var t={type:v&&v.type||typeof v,isObject:v instanceof wm.Object};
if(t.type=="number"&&isNaN(v)){
t.type="string";
}
this.getPropFlags(_1b9,t);
var s=this.schema[_1b9]||{noprop:Boolean((v===undefined)||(v===null)||_1b9.charAt(0)=="_"||(dojo.isFunction(v)||dojo.isObject(v))&&!t.isCustomMethod)};
return dojo.mixin(t,s);
},_listSchemaProperties:function(_1ba,_1bb,_1bc){
var _1bd=this[_1bc||"getPropertyType"],op=Object.prototype;
for(var p in _1bb){
if(p=="inherited"){
continue;
}
if(!(p in _1ba)&&!(p in op)){
var t=_1bd.call(this,p);
if(!t.noprop){
_1ba[p]=t;
}
}
}
return _1ba;
},_listProperties:function(){
var _1be={};
this._listSchemaProperties(_1be,this);
return this._listSchemaProperties(_1be,this.schema);
},listProperties:function(){
var _1bf=this.constructor._publishedProps||(this.constructor._publishedProps=this._listProperties());
return dojo.clone(_1bf);
},listDataProperties:function(){
return this.listProperties();
}});
wm.define=function(_1c0,_1c1,_1c2){
if(arguments.length<3){
_1c2=_1c1;
_1c1=wm.Control;
}
var _1c3=_1c2.published;
delete _1c2.published;
var ctor=dojo.declare(_1c0,_1c1,_1c2);
wm.Object.extendSchema(ctor,_1c3);
return ctor;
};
}
if(!dojo._hasResource["wm.base.Component"]){
dojo._hasResource["wm.base.Component"]=true;
dojo.provide("wm.base.Component");
if(!wm.Component){
dojo.declare("wm.Component",wm.Object,{theme:"wm_tundra",name:"",owner:null,getParentDialog:function(){
var w=this;
while(w){
if(w instanceof wm.Dialog){
return w;
}else{
w=w.parent;
}
}
return null;
},getParentPage:function(){
if(this instanceof wm.Page||this instanceof wm.PageDialog){
return this;
}
if(this.owner){
return this.owner.getParentPage();
}
return null;
},getParentPageOrComposite:function(){
if(wm.isInstanceType(this,[wm.Page,wm.PageDialog,wm.Composite])){
return this;
}
if(this.owner){
return this.owner.getParentPageOrComposite();
}
return null;
},isAncestor:function(_1c4){
var o=this.owner;
while(o&&o!=_1c4){
o=o.owner;
}
return (o==_1c4);
},isAncestorInstanceOf:function(_1c5){
if(this==app._page||this==app||window["studio"]&&(this==studio.application||this==studio.page)){
return false;
}
if(wm.isInstanceType(this,_1c5)){
return this;
}
if(this.parent){
return this.parent.isAncestorInstanceOf(_1c5);
}else{
if(this.owner){
return this.owner.isAncestorInstanceOf(_1c5);
}else{
return false;
}
}
},getOwnerApp:function(){
if(wm.isInstanceType(this,wm.Application)){
return this;
}
if(!this.isDesignLoaded()){
return window.app;
}else{
if(this==studio.page){
return studio.application;
}else{
return this.owner.getOwnerApp();
}
}
},constructor:function(_1c6){
this.$=this.components={};
this._connections=[];
this._subscriptions=[];
if(djConfig.isDebug){
this._debugSubscriptions=[];
}
this._designee=this;
this.isDestroyed=false;
},postscript:function(_1c7){
this.create(_1c7);
wm.Component.add(this);
},create:function(_1c8){
try{
this._initializing=true;
if(wm.debugPerformance){
this.startTimerWithName("create",this.declaredClass);
}
this.prepare(_1c8);
this.build();
this.init();
if(this._designer){
wm.fire(this,"designCreate");
}
if(!this._loading){
this.postInit();
delete this._initializing;
}
if(!this._temporaryComponent){
dojo.addOnWindowUnload(this,"_unload");
}
if(wm.debugPerformance){
this.stopTimerWithName("create",this.declaredClass);
}
}
catch(e){
console.error("Error thrown; failed to create "+this.toString()+": "+e);
}
},_unload:function(){
if(this.owner){
this.owner._isUnloading=true;
}
this.destroy();
},destroy:function(){
if(this.isDestroyed){
return;
}
try{
this._disconnect();
this._unsubscribe();
wm.fire(this,"designDestroy");
var _1c9=[];
for(var n in this.components){
_1c9.push(this.components[n]);
}
for(var i=0,c;(c=_1c9[i]);i++){
c.destroy();
for(var n in c){
delete c[n];
}
c.isDestroyed=true;
}
_1c9=null;
delete this.components;
delete this.$;
wm.Component.remove(this);
this.setOwner(null);
this.isDestroyed=true;
}
catch(e){
}
},prepare:function(_1ca){
this.readProps(_1ca);
dojo.mixin(this,{flags:{}},_1ca);
this.setOwner(this.owner);
},readProps:function(_1cb){
},build:function(){
},init:function(){
if(this.isDesignLoaded()){
this._isDesignLoaded=true;
}
if(this.manageURL){
var _1cc=app?app:this.getRoot();
if(wm.Application&&_1cc instanceof wm.Application){
this.connect(_1cc,"_generateStateUrl",this,"generateStateUrl");
}
}
if(window["studio"]&&this.themeableProps){
dojo.forEach(this.themeableProps,function(_1cd){
var tmp=this[_1cd];
delete this[_1cd];
this[_1cd]=tmp;
},this);
}
},postInit:function(){
this.valueChanged("",this);
},loaded:function(){
this._loading=false;
this.postInit();
delete this._initializing;
},toString:function(_1ce){
var t=_1ce||"";
return "["+this.declaredClass+((this.name)?":"+this.name:"")+(this.isDestroyed?":"+wm.getDictionaryItem("wm.Component.toString_DESTROYED"):"")+t+"]";
},getComponent:function(_1cf){
return this.components[_1cf]||this.owner&&this.owner.getComponent(_1cf);
},isDesignedComponent:function(){
return this.isDesignLoaded();
},isDesignLoaded:function(){
if(this._isDesignLoaded!==undefined){
return this._isDesignLoaded;
}
if(!window.studio||!this.owner){
return false;
}
if(this.owner==studio.application||this.owner==studio._application){
return true;
}
if(!studio.page&&!studio.application&&!studio._application){
return false;
}
if(!this.owner){
return false;
}
var pp=this.getParentPageOrComposite();
if(pp&&pp==studio.page||this.owner==studio.page){
return true;
}
if(this==studio.page){
return true;
}
if(this.isOwnedBy(studio.application)){
return true;
}
if(window["app"]&&!this.isOwnedBy(window["app"])&&window["app"]!=this){
return true;
}
return false;
},getPath:function(){
var p="";
var o=this.owner;
while(o&&!o._hasCustomPath){
o=o.owner;
}
if(o&&o._hasCustomPath){
return this.owner.getPath();
}else{
if(this.isDesignLoaded()&&studio.project){
p="projects/"+studio.project.getProjectPath()+"/";
}
}
return p;
},addComponent:function(_1d0){
var n=_1d0.name;
this.components[n]=_1d0;
},removeComponent:function(_1d1){
if(!this.components){
return;
}
var n=_1d1.name;
if(this.components[n]==_1d1){
delete this.components[n];
}
},setOwner:function(_1d2,_1d3){
var _1d4=this.isDesignLoaded();
if(_1d4){
wm.job("studio.updateDirtyBit",10,function(){
studio.updateProjectDirty();
});
}
var _1d5=this.owner;
if(this.owner){
this.owner.removeComponent(this);
}
this.owner=_1d2;
if(this.owner){
if(!_1d3){
this.owner.addComponent(this);
if(!this._designer&&this._isDesignLoaded!==false){
this._designer=this.owner._designer;
}
}
if((!_1d5&&this.owner instanceof wm.Page==false)||(this.owner!=_1d5&&_1d5&&(this.owner instanceof wm.Page==false&&_1d5 instanceof wm.Page||this.owner instanceof wm.Page&&_1d5 instanceof wm.Page==false))){
this.updateId();
if(this.isDesignLoaded()){
this.resetChildIds();
}
}
}
delete this.rootId;
},isOwnedBy:function(_1d6){
var o=this.owner;
while(o){
if(o==_1d6){
return true;
}
o=o.owner;
}
},qualifyName:function(_1d7){
_1d7=this.name+"_"+_1d7;
if(window.studio&&(window.studio.page==this.owner||window.studio.application==this.owner)){
return _1d7;
}
return this.owner?this.owner.qualifyName(_1d7):_1d7;
},getUniqueName:function(_1d8){
return wm.findUniqueName(_1d8,[this,this.components]);
},setName:function(_1d9){
if(!_1d9){
return;
}
wm.Component.remove(this);
this.owner.removeComponent(this);
this.name=_1d9;
this.owner.addComponent(this);
this.updateId();
wm.Component.add(this);
},updateId:function(){
var id=this.makeId();
if(id!=this.id){
this.id=id;
delete this.runtimeId;
}
},makeId:function(_1da){
_1da=this.name+(_1da?(this.name?".":"")+_1da:"");
return this.owner?this.owner.getId(_1da):_1da;
},getId:function(_1db){
if(_1db){
return this.makeId(_1db);
}
var id=this.id;
if(!this.id||this.isDesignLoaded()){
var id=this.makeId();
this.id=id;
}
return id;
},resetChildIds:function(){
for(var i in this.components){
delete this.components[i].id;
delete this.components[i].runtimeId;
delete this.components[i].rootId;
this.components[i].resetChildIds();
}
},getRoot:function(){
if(this.owner){
return this.owner.getRoot();
}else{
return null;
}
},getRootId:function(){
if(!this.rootId||this.isDesignLoaded()){
var r=this.getRoot();
r=r?r.getRuntimeId():"";
this.rootId=r?r+(r.charAt(r.length-1)=="."?"":"."):"";
}
return this.rootId;
},getRuntimeId:function(_1dc){
if(!this.runtimeId||this.isDesignLoaded()){
this.runtimeId=this.getRootId()+this.getId();
}
var _1dd=(_1dc)?this.runtimeId+"."+_1dc:this.runtimeId;
return _1dd;
},getValueById:function(inId){
if(inId===null||inId===undefined){
return null;
}
var r=this.getRoot();
r=r&&r.getValue(inId);
var _1de;
if(r&&r._wmNull){
return app.getValue(inId);
}
if(r!==undefined){
return r;
}
if(inId&&wm.Component.byId[inId]){
return wm.Component.byId[inId];
}
var _1df=inId.indexOf(".");
if(_1df!=-1){
var _1e0=inId.substring(0,_1df);
if(_1e0.indexOf("[")==0){
_1e0=_1e0.substring(1,_1e0.length-1);
}
var _1e1=inId.substring(_1df+1);
var page=wm.Page.getPage(_1e0);
if(page){
return page.getValueById(_1e1);
}
if(this._isDesignLoaded&&wm.decapitalize(String(studio.bindDialog.bindSourceDialog.pageContainer.pageName))==_1e0){
page=studio.bindDialog.bindSourceDialog.pageContainer.page;
if(page){
return page.getValueById(_1e1);
}
}
}
return undefined;
},connect:function(){
var c=dojo.connect.apply(dojo,arguments);
this._connections.push(c);
return c;
},connectOnce:function(_1e2,_1e3,_1e4,_1e5){
var _1e6=this._connections;
var args=[_1e2,_1e3];
if(typeof _1e4=="function"){
_1e5=_1e4;
}else{
args.push(_1e4);
}
args.push(function(){
dojo.disconnect(c);
wm.Array.removeElement(_1e6,c);
dojo.hitch(this,_1e5)();
});
var c=dojo.connect.apply(dojo,args);
_1e6.push(c);
return c;
},connectEvents:function(_1e7,_1e8){
this._connections=this._connections.concat(wm.connectEvents(this,_1e7,_1e8));
},_disconnect:function(_1e9,_1ea){
dojo.forEach(this._connections,dojo.disconnect);
this._connections=[];
},disconnectEvent:function(_1eb){
this._connections=dojo.filter(this._connections,function(item,_1ec,_1ed){
if(item[1]==_1eb){
dojo.disconnect(item);
return false;
}else{
return true;
}
return item[1]!=_1eb;
});
},disconnect:function(_1ee){
dojo.disconnect(_1ee);
wm.Array.removeElement(this._connections,_1ee);
},findConnection:function(_1ef){
for(var i=0;i<this._connections.length;i++){
var con=this._connections[i];
if(con[1]==_1ef){
return con;
}
}
},findSubscription:function(_1f0){
for(var i=0;i<this._subscriptions.length;i++){
var con=this._subscriptions[i];
if(con[0]==_1f0){
return con;
}
}
},subscribe:function(){
var s=dojo.subscribe.apply(dojo,arguments);
this._subscriptions.push(s);
if(djConfig.isDebug){
this._debugSubscriptions.push(arguments[0]);
}
return s;
},unsubscribe:function(_1f1){
for(var i=this._subscriptions.length-1;i>=0;i--){
if(this._subscriptions[i][0]==_1f1){
dojo.unsubscribe(this._subscriptions[i]);
wm.Array.removeElementAt(this._subscriptions,i);
if(djConfig.isDebug){
wm.Array.removeElementAt(this._debugSubscriptions,i);
}
}
}
},_unsubscribe:function(){
dojo.forEach(this._subscriptions,dojo.unsubscribe);
this._subscriptions=[];
if(djConfig.isDebug){
this._debugSubscriptions=[];
}
},isEventProp:function(n){
if(!this._designee){
return false;
}
return dojo.isFunction(this._designee[n]||this._designee[n.replace(/\d+$/,"")])&&(n.slice(0,2)=="on");
},isCustomMethodProp:function(n){
return dojo.isFunction(this.constructor.prototype[n])&&(n.slice(0,6)=="custom");
},_getProp:function(n){
if(this.isEventProp(n)){
return this.eventBindings?(this.eventBindings[n]||""):"";
}
var g=this._getPropWorker(this._designee,n,"get");
if(g){
return g.call(this,n);
}
return n in this._designee?this._designee[n]:this.components[n];
},_setProp:function(n,v){
if(this.isEventProp(n)&&this._isDesignLoaded){
this.setEvent(n,v);
}else{
if(this.isCustomMethodProp(n)&&this._isDesignLoaded){
if(v){
this._designee[n]=v;
eventEdit(this,n,v,this.owner==studio.application);
}else{
delete this._designee[n];
}
}else{
var s=this._getPropWorker(this._designee,n,"set");
if(s){
s.call(this,v);
}else{
this._designee[n]=v;
}
}
}
},valueChanged:function(_1f2,_1f3){
var _1f4=this.getRuntimeId(_1f2);
if(_1f4==""){
return;
}
dojo.publish(_1f4+"-changed",[_1f3,this]);
var root=this.getRoot();
if(root){
root=root.getRuntimeId();
}
if(root&&root.indexOf(".")&&_1f4.indexOf(root)==0){
var n=_1f4.substring(root.length);
n=root.substring(root.lastIndexOf(".")+1)+n;
if(n!=_1f4){
var _1f5=n+"-changed";
wm.logging&&undefined;
dojo.publish(_1f5,[_1f3,this]);
}
}
},_create:function(ctor,_1f6){
try{
return new ctor(_1f6);
}
catch(e){
}
},adjustChildProps:function(_1f7,_1f8){
dojo.mixin(_1f8,{owner:this});
},createComponent:function(_1f9,_1fa,_1fb,_1fc,_1fd,_1fe){
if(wm.debugPerformance){
if(_1fa=="wm.Layout"){
if(dojo.isFF){
console.groupCollapsed("CREATE "+_1fa+": "+_1f9+" AT "+startTime);
}else{
}
}
this.startTimer("CreateComponent",_1fa);
}
var ctor=dojo.getObject(_1fa);
if(!ctor){
try{
wm.getComponentStructure(_1fa);
ctor=dojo.getObject(_1fa);
}
catch(e){
}
}
if(!ctor){
throw (wm.getDictionaryItem("wm.Component.CLASS_NOT_FOUND",{type:_1fa,name:_1f9}));
}
var _1ff=dojo.mixin({_designer:this._designer,_loading:true},_1fb);
this.adjustChildProps(ctor,_1ff);
if(_1fb._isDesignLoaded===false){
delete _1ff._designer;
}
if(_1fe){
_1ff.owner=_1fe;
}
_1ff.name=_1ff.owner.getRoot()._loading||_1ff.owner._loading?_1f9:_1ff.owner.getUniqueName(_1f9);
if(!this.isDesignLoaded()){
for(var p in _1ff){
if(p.indexOf("custom")==0&&dojo.isFunction(ctor.prototype[p])){
var _200=_1ff.owner;
_1ff[p]=dojo.hitch(_200,_200[_1ff[p]]);
}
}
}
var w=this._create(ctor,_1ff);
if(w.name!=_1f9&&wm.pasting&&window["studio"]){
studio.renamedDuringPaste[_1f9]=w;
}
try{
if(_1fc&&w.owner){
w.owner.makeEvents(_1fc,w);
}
if(_1fd){
w.createComponents(_1fd);
}
}
catch(e){
}
finally{
try{
w.loaded();
if(w.owner&&w.owner[w.name]===undefined&&!w._isDesignLoaded&&!wm.isInstanceType(w,wm.Property)){
w.owner[w.name]=w;
}
}
catch(e){
console.error("Error in postInit for "+w.toString()+": "+e);
}
}
if(wm.debugPerformance){
this.stopTimerWithName("CreateComponent",_1fa,1);
}
return w;
},createComponents:function(_201,_202){
var _203=[];
for(var i in _201){
var c=_201[i];
_203.push(this.createComponent(i,c[0],c[1],c[2],c[3],_202));
}
return _203;
},_eventArgs:function(c,a){
var args=[c];
for(var i=0,l=a.length;i<l;i++){
args.push(a[i]);
}
return args;
},makeEvents:function(_204,_205){
var e,n,f;
var _206=[];
for(n in _204){
_206.push(n);
}
_206.sort();
for(var i=0;i<_206.length;i++){
var n=_206[i];
f=_204[n];
e=this[f]||f;
if(this._designer){
if(n.match(/\d+$/)&&!_205[n]){
_205[n]=function(){
};
}
wm.fire(_205,"setProp",[n,f]);
}else{
this.connect(_205._eventSource||_205,n.replace(/\d*$/,""),this.makeEvent(e,f,_205,n.replace(/\d*$/,"")));
if(n.match(/^onRightClick\d*$/)){
_205.connect(_205.domNode,"oncontextmenu",_205,function(_207){
dojo.stopEvent(_207);
this.onRightClick(_207);
});
if(dojo.isFF){
_205.connect(_205.domNode,"onmousedown",_205,function(_208){
if(_208.button==2||_208.ctrlKey){
dojo.stopEvent(_208);
this.onRightClick(_208);
}
});
}
}else{
if(n.match(/^onMouseOver\d*$/)){
_205.createMouseOverConnect();
}else{
if(n.match(/^onMouseOut\d*$/)){
_205.createMouseOutConnect();
}else{
if(n.match(/^onEnterKeyPress\d*$/)&&_205 instanceof wm.Container){
_205.connectOnEnterKey();
}
}
}
}
}
}
},makeEvent:function(_209,_20a,_20b,_20c){
return dojo.isFunction(_209)?this._makeEvent(_20a,_20b,_20c):this._makeComponentEvent(_209,_20b,_20c);
},_makeEvent:function(_20d,_20e,_20f){
var self=this;
return function jsEventHandler(){
var args=arguments;
var f=function(){
if(app.debugDialog&&!_20e.isAncestor(app.debugDialog)){
var _210=app.debugDialog.newLogEvent({eventType:"javascriptEvent",sourceDescription:(_20e instanceof wm.Component?_20e.getRuntimeId()+".":"")+_20f+"() has been called",resultDescription:"Calling "+(self instanceof wm.Component?self.getRuntimeId()+".":"")+_20d+"()",firingId:_20e instanceof wm.Component?_20e.getRuntimeId():"",affectedId:self.getRuntimeId(),method:_20d});
}
try{
self[_20d].apply(self,self._eventArgs(this,args));
}
catch(e){
if(e instanceof Error&&e.message=="Abort"||e.toString()=="Abort"){
throw e;
}
var _211="Error in "+self.toString()+"."+_20d+": "+e.message;
if(djConfig.isDebug){
app.toastError(_211);
}else{
console.error(_211);
}
}
if(_210){
app.debugDialog.endLogEvent(_210);
}
};
if(_20e&&_20f&&_20e["_"+_20f+"BeforeStart"]){
dojo.hitch(this,f)();
}else{
if(self instanceof wm.Page&&self._loadingPage){
self.connectOnce(self,"start",this,f);
}else{
if(self._loading){
self.connectOnce(self,"postInit",this,f);
}else{
dojo.hitch(this,f)();
}
}
}
};
},_makeComponentEvent:function(_212,_213,_214){
var self=this;
return function eventHandler(e,_215){
var args=arguments;
var f=function(){
var c=wm.isInstanceType(_212,wm.Component)?_212:self.getValueById(_212);
if(wm.isInstanceType(c,wm.Component)){
if(app.debugDialog&&!_213.isAncestor(app.debugDialog)){
if(c instanceof wm.ServiceVariable){
if(!c._debug){
c._debug={};
}
c._debug={trigger:_213.getId(),eventName:_214,method:"update",lastUpdate:new Date()};
}
var _216=app.debugDialog.newLogEvent({eventType:"componentEvent",sourceDescription:_213.getRuntimeId()+"."+_214+"() has been called",resultDescription:"Invoking "+c.getRuntimeId(),eventName:_214,firingId:_213.getRuntimeId(),affectedId:c.getRuntimeId(),method:"update"});
}
if(c.updateInternal){
wm.fire(c,"updateInternal",[e,_215]);
}else{
wm.fire(c,"update",[e,_215]);
}
}else{
if(dojo.isString(_212)){
var o=_212.split(".");
var m,c;
if(o.length>1){
m=o.pop();
c=self.getValueById(o.join("."));
}else{
c=self;
m=o[0];
}
if(c&&c[m]){
if(app.debugDialog&&!_213.isAncestor(app.debugDialog)){
if(c instanceof wm.ServiceVariable){
if(!c._debug){
c._debug={};
}
c._debug={trigger:_213.getId(),eventName:_214,method:m,lastUpdate:new Date()};
}
var _216=app.debugDialog.newLogEvent({eventType:"subcomponentEvent",sourceDescription:(_213 instanceof wm.Component?_213.getRuntimeId()+".":"")+_214+"() has been called",resultDescription:"Calling "+c.getRuntimeId()+"."+m+"()",firingId:_213 instanceof wm.Component?_213.getRuntimeId():undefined,affectedId:c instanceof wm.Component?c.getRuntimeId():undefined,method:m});
}
try{
c[m].apply(c,self._eventArgs(this,args));
}
catch(e){
if(e instanceof Error&&e.message=="Abort"||e.toString()=="Abort"){
throw e;
}
var _217="Error in "+self.toString()+"."+m+": "+e.message;
if(djConfig.isDebug){
app.toastError(_217);
}else{
console.error(_217);
}
}
}
}
}
if(_216){
app.debugDialog.endLogEvent(_216);
}
};
if(self instanceof wm.Page&&self._loadingPage){
self.connectOnce(self,"start",this,f);
}else{
if(self._loading){
self.connectOnce(self,"postInit",this,f);
}else{
dojo.hitch(this,f)();
}
}
};
},readComponents:function(_218){
var c=dojo.fromJson(_218);
return this.createComponents(c);
},startTimerWithName:function(_219,_21a){
if(!wm.debugPerformance){
return;
}
if(!this.logTimesWithComponentNames){
this.logTimesWithComponentNames={};
}
if(!this.logTimesWithComponentNames[_21a]){
this.logTimesWithComponentNames[_21a]={};
}
this.logTimesWithComponentNames[_21a][_219]=new Date().getTime();
},stopTimerWithName:function(_21b,_21c){
if(!wm.debugPerformance){
return;
}
if(!this.logTimesWithComponentNames){
this.logTimesWithComponentNames={};
}
if(!this.logTimesWithComponentNames[_21c]){
this.logTimesWithComponentNames[_21c]={};
}
var _21d=this.logTimesWithComponentNames[_21c][_21b];
if(!_21d){
return -1;
}
this.logTimesWithComponentNames[_21c][_21b]=0;
var _21e=new Date().getTime()-_21d;
var _21f=wm.Component.timingByComponent[_21c];
if(!_21f){
wm.Component.timingByComponent[_21c]={};
_21f=wm.Component.timingByComponent[_21c];
}
if(!_21f[_21b]){
_21f[_21b]=[];
}
_21f[_21b].push(_21e);
return _21e;
},subtractTimerWithName:function(_220,_221,time){
if(!wm.debugPerformance){
return;
}
if(!this.logTimesWithComponentNames){
this.logTimesWithComponentNames={};
}
if(!this.logTimesWithComponentNames[_221]){
this.logTimesWithComponentNames[_221]={};
}
var _222=this.logTimesWithComponentNames[_221][_220];
if(!_222){
return -1;
}
var _223=wm.Component.timingByComponent[_221];
if(!_223){
wm.Component.timingByComponent[_221]={};
_223=wm.Component.timingByComponent[_221];
}
var tmp=_223[timereName];
tmp[tmp.length-1]-=time;
},startTimer:function(_224){
if(!wm.debugPerformance){
return;
}
if(!this.logTimes){
this.logTimes={};
}
this.logTimes[_224]=new Date().getTime();
},stopTimer:function(_225,_226){
if(!wm.debugPerformance){
return;
}
if(!this.logTimes){
this.logTimes={};
}
var _227=this.logTimes[_225];
if(!_227){
return -1;
}
this.logTimes[_225]=0;
var _228=new Date().getTime()-_227;
if(_226){
var _229=wm.Component.timingByComponent[this.declaredClass];
if(!_229){
wm.Component.timingByComponent[this.declaredClass]={};
_229=wm.Component.timingByComponent[this.declaredClass];
}
if(!_229[_225]){
_229[_225]=[];
}
_229[_225].push(_228);
}
return _228;
}});
dojo.mixin(wm.Component,{byId:{},byShortId:{},timingByComponent:{},add:function(_22a){
if(_22a._temporaryComponent){
return;
}
var rid=_22a.getRuntimeId();
wm.Component.byId[rid]=_22a;
},remove:function(_22b){
delete wm.Component.byId[_22b.getRuntimeId()];
},property:{}});
}
}
if(!dojo._hasResource["wm.base.Control"]){
dojo._hasResource["wm.base.Control"]=true;
dojo.provide("wm.base.Control");
dojo.provide("wm.base.Widget");
wm.splitUnits=function(_22c){
if(!dojo.isString(_22c)){
return {value:_22c,units:"px"};
}
var m=(_22c||"").match(wm.splitUnits.Rx);
return {value:Number(m[1])||0,units:m[2]||"px"};
};
wm.splitUnits.Rx=/(\d*)(.*)/;
dojo.declare("wm.Bounds",null,{padding:"",border:"",margin:"",constructor:function(){
this.bounds={l:0,t:0,w:96,h:64};
this.borderExtents={l:0,t:0,r:0,b:0};
this.paddingExtents={l:0,t:0,r:0,b:0};
this.marginExtents={l:0,t:0,r:0,b:0,w:0,h:0};
this.padBorderMargin={};
this.calcPadBorderMargin();
},getBounds:function(){
return this.bounds;
},setBounds:function(inL,inT,inW,inH){
if(arguments.length==1){
return this.setBounds(inL.l,inL.t,inL.w,inL.h);
}
var b=this.bounds;
if(!isNaN(inL)&&b.l!=inL){
b.l=inL;
}
if(!isNaN(inT)&&b.t!=inT){
b.t=inT;
}
if(inW>=0&&b.w!=inW){
b.w=inW;
this._boundsDirty=true;
}
if(inH>=0&&b.h!=inH){
b.h=inH;
this._boundsDirty=true;
}
b.r=b.l*1+b.w*1;
b.b=b.t*1+b.h*1;
return b;
},setContentBounds:function(_22d){
var b={};
var sm=this.getScrollMargins();
if("w" in _22d){
b.w=_22d.w+this.padBorderMargin.w+sm.w;
}
if("h" in _22d){
b.h=_22d.h+this.padBorderMargin.h+sm.h;
}
return this.setBounds(b);
},_parseExtents:function(_22e){
_22e=String(_22e);
var r={};
if(typeof _22e=="number"){
r={l:_22e,t:_22e,r:_22e,b:_22e};
}else{
var ex=_22e.split(",");
var l=ex.length;
r.t=parseFloat(ex[0])||0;
r.r=l<2?r.t:parseFloat(ex[1])||0;
r.b=l<3?r.t:parseFloat(ex[2])||0;
r.l=l<4?r.r:parseFloat(ex[3])||0;
}
return r;
},_stringifyExtents:function(_22f){
return _22f.t+","+_22f.r+","+_22f.b+","+_22f.l;
},setPadding:function(_230){
this.padding=String(_230);
this.paddingExtents=this._parseExtents(this.padding);
this.padBorderMarginChanged();
this.invalidCss=true;
this.render();
},setBorder:function(_231){
_231=String(_231);
_231=(_231&&_231.match(/\d/))?_231:"0";
if(_231!==this.border){
this.border=_231;
this.borderExtents=this._parseExtents(_231);
this.padBorderMarginChanged();
this.invalidCss=true;
this.render();
}
},setMargin:function(_232){
this.margin=String(_232);
var me=this.marginExtents=this._parseExtents(this.margin);
me.h=me.t+me.b;
me.w=me.l+me.r;
this.padBorderMarginChanged();
this.invalidCss=true;
this.render();
},setOneMargin:function(_233,edge){
var m=this.marginExtents;
m[edge]=_233;
this.setMargin(this._stringifyExtents(m));
},padBorderMarginChanged:function(){
this.calcPadBorderMargin();
},_edges:{l:1,t:1,r:1,b:1},calcPadBorderMargin:function(){
var pbm=this.padBorderMargin;
for(var e in this._edges){
pbm[e]=this.borderExtents[e]+this.paddingExtents[e]+this.marginExtents[e];
}
if(this._isDesignLoaded&&studio.useDesignBorder&&wm.isDesignable(this)&&(!this.border||this.border==="0")){
pbm.t++;
pbm.b++;
pbm.r++;
pbm.l++;
}
pbm.w=pbm.l+pbm.r;
pbm.h=pbm.t+pbm.b;
},getScrollMargins:function(){
return {w:0,h:0};
},getContentBounds:function(){
var sm=this.getScrollMargins();
var b={l:this.paddingExtents.l,t:this.paddingExtents.t,w:Math.floor(this.bounds.w)-this.padBorderMargin.w-sm.w,h:Math.floor(this.bounds.h)-this.padBorderMargin.h-sm.h};
if(b.w<0){
b.w=0;
}
if(b.h<0){
b.h=0;
}
b.r=b.l+b.w;
b.b=b.t+b.h;
return b;
},getStyleBounds:function(){
if(this.isRelativePositioned){
return {w:this.width,h:this.height};
}
var pbm=(this.dom.node.tagName.toLowerCase()=="button")?this.marginExtents:this.padBorderMargin;
var b={l:this.bounds.l,t:this.bounds.t,w:this.bounds.w-pbm.w,h:this.bounds.h-pbm.h};
if(b.w<0){
b.w=0;
}
if(b.h<0){
b.h=0;
}
b.r=b.l+b.w;
b.b=b.t+b.h;
return b;
},cloneBounds:function(){
with(this.bounds){
return {l:l,t:t,w:w,h:h,r:r,b:b};
}
}});
dojo.declare("wm.DomNode",null,{constructor:function(_234,_235){
this.node=_234||document.createElement("div");
this.isRelativePositioned=_235;
},append:function(_236){
this.node.appendChild(_236.node);
},remove:function(_237){
this.node.removeChild(_237.node);
},getWidth:function(){
return this.node.offsetWidth;
},getHeight:function(){
return this.node.offsetHeight;
},setBox:function(_238,_239){
var _23a=false;
var s=this.node.style;
if(this.isRelativePositioned){
s.width=_238.w;
s.height=_238.h;
return true;
}
var bl=_238.l+"px";
if(!isNaN(_238.l)&&s.left!=bl){
s.left=bl;
_23a=true;
}
var bt=_238.t+"px";
if(!isNaN(_238.t)&&s.top!=bt){
s.top=bt;
_23a=true;
}
var bw=_238.w+"px";
if(_238.w>=0&&s.width!=bw){
s.width=bw;
_23a=true;
}
var bh=_238.h+"px";
if(_238.h>=0){
s.height=bh;
s.lineHeight=_239?bh:"normal";
_23a=true;
}
return _23a;
},setCssText:function(_23b){
this.node.style.cssText+=";"+_23b;
},addCssText:function(_23c){
this.node.style.cssText+=_23c;
}});
wm.define("wm.Control",[wm.Component,wm.Bounds],{mobileFolding:false,mobileFoldingIndex:"",mobileFoldingCaption:"",imageList:"",imageIndex:-1,renderedOnce:0,invalidCss:1,autoScroll:false,backgroundColor:"",borderColor:"#F0F0F0",classNames:"",id:"",autoSizeWidth:false,autoSizeHeight:false,_needsAutoSize:true,width:"",height:"",minHeight:0,minWidth:0,minMobileHeight:0,minDesktopHeight:0,enableTouchHeight:false,styles:"",showing:true,disabled:false,_parentDisabled:false,_disabled:false,container:false,_classes:{domNode:[]},scrollX:false,scrollY:false,constructor:function(){
this.widgets={};
this._classes=dojo.clone(this._classes);
},markupFactory:function(_23d,node){
var ctor=arguments.callee.arguments[2];
var _23e=node;
var _23f=wm._dojoParserCurrentOwner;
var _240=node.parentNode.id;
while(_240.indexOf("_")!=-1&&!_23f[_240]){
_240=_240.substring(_240.indexOf("_")+1);
}
var _241=_23f[_240];
_23d=dojo.mixin(_23d,{domNode:_23e,parentNode:_23e.parentNode,parent:_241,name:_23f.getUniqueName(_23d.name),owner:_23f,_designer:_23f._designer,_loading:false});
var _242=new ctor(_23d);
if(!_23d.parent&&ctor.prototype.declaredClass=="wm.Layout"){
_242.owner.root=_242;
}
return _242;
},prepare:function(_243){
try{
if(_243){
var _244=_243.owner;
if(!_244&&parent){
_244=_243.owner=parent.owner;
}
if(_244){
_244=_244.getOwnerApp();
}
if(_244){
_244.loadThemePrototypeForClass(this.constructor,this);
}
}
}
catch(e){
console.error("What the hell?"+e);
}
this.inherited(arguments);
},postscript:function(_245){
this.inherited(arguments);
},create:function(){
this._cupdating=true;
this.inherited(arguments);
},build:function(){
this.domNode=dojo.byId(this.domNode||undefined);
if(!this.domNode){
this.domNode=document.createElement("div");
}
},initDomNode:function(){
if(!this.dom){
this.dom=new wm.DomNode(this.domNode,this.isRelativePositioned);
if(!this.isRelativePositioned){
this.domNode.style.position="absolute";
}else{
this.domNode.style.position="relative";
}
this.setParent(this.parent);
this.setDomNode(this.domNode);
}
},init:function(){
this.initDomNode();
this.inherited(arguments);
if(this.ariaRole){
dojo.attr(this.domNode,"role",this.ariaRole);
}
var _246=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop";
if(this.height&&String(this.height).match(/\%/)){
this.mobileHeight=this.desktopHeight=this.height;
}else{
if(!_246||!this.enableTouchHeight){
if(this.desktopHeight!=null){
this.height=this.desktopHeight;
}else{
if(this.height){
this.desktopHeight=this.height;
}else{
this.height=this.desktopHeight=this.constructor.prototype.height;
}
}
if(this.minDesktopHeight){
this.minHeight=this.minDesktopHeight;
}else{
if(this.minHeight){
this.minDesktopHeight=this.minHeight;
}else{
this.minHeight=this.minDesktopHeight=this.constructor.prototype.minHeight;
}
}
}else{
if(this._isDesignLoaded&&studio.currentDeviceType=="desktop"||this.desktopHeight==undefined){
this.desktopHeight=this.height||this.mobileHeight;
}
if(this.desktopHeight&&typeof this.desktopHeight=="string"&&this.desktopHeight.match(/\%/)){
this.height=this.mobileHeight=this.desktopHeight;
}else{
if(this.mobileHeight){
this.height=this.mobileHeight;
}else{
if(this.height){
this.mobileHeight=this.height;
}else{
this.height=this.mobileHeight=this.constructor.prototype.height;
}
}
}
if(this.minMobileHeight){
this.minHeight=this.minMobileHeight;
}else{
this.minHeight=this.minMobileHeight=this.constructor.prototype.minHeight;
}
}
}
this.bc();
if(this.isDesignLoaded()){
this.set_border((this.border)?String(this.border):"0");
}else{
this.border=(this.border)?String(this.border):"0";
}
this.borderExtents=this._parseExtents(this.border);
this.padding=String(this.padding);
this.paddingExtents=this._parseExtents(this.padding);
this.setMargin(String(this.margin));
this.doSetSizeBc();
if(!this.showing){
this.setShowing(false,true);
}
this._parentDisabled=this.parent?this.parent.disabled||this.parent._parentDisabled:false;
this.setDisabled(this.disabled);
this.appendDOMNode(this.parent);
this.updateBounds();
},bc:function(){
},postInit:function(){
this._cupdating=false;
this.inherited(arguments);
this.render(1);
if(this.addTouchListener&&wm.isMobile&&!window["studio"]){
this.addTouchListener(this._touchNode||this.domNode);
}
if(!this.$.binding&&this.isDesignLoaded()){
new wm.Binding({name:"binding",owner:this});
}
if(this.hint){
this.setHint(this.hint);
}
},destroy:function(){
if(this.isDestroyed||this._isDestroying){
return;
}
this._isDestroying=true;
try{
if(app.toolTipDialog&&this==app.toolTipDialog.tipOwner){
app.toolTipDialog.hide();
}
if(this._layerConnections){
delete this._layerConnections;
}
if(this.widgets){
var wids=[];
wm.forEachProperty(this.widgets,function(w,name){
wids.push(w);
});
for(var i=0,w;(w=wids[i]);i++){
w.destroy();
}
wids=[];
}
this.widgets=null;
this.parentNode=null;
this.setParent(null);
wm.fire(this.designWrapper,"destroy");
this.layout=null;
this.inherited(arguments);
}
catch(e){
}
finally{
if(this.domNode){
dojo.destroy(this.domNode);
}
this.domNode=null;
this._designee=null;
if(this.dom&&this.dom.node){
dojo.destroy(this.dom.node);
this.dom.node=null;
this.dom=null;
}
}
},loaded:function(){
this.inherited(arguments);
this.initUserClasses();
},setDomNode:function(_247){
var n=this.domNode=_247;
if(dojo.isIE<=8){
n.style.width="0px";
}
this.updateId();
var _248=this.classNames+(this.owner?" "+(this.owner._appendCssClassName||this.owner.declaredClass.replace(/\./g,""))+"-"+this.name:"")+(this.isRelativePositioned&&this.parent&&this.parent.layoutKind=="left-to-right"?" wmInlineDiv":"");
dojo.addClass(n,_248);
this.initUserClasses();
},isAncestorHiddenLayer:function(){
if(this instanceof wm.Layout&&this.owner==app._page){
return false;
}
if(this instanceof wm.Layer&&this.parent instanceof wm.Layers&&this.parent.getActiveLayer()!=this){
return true;
}
var _249;
if(this.parent&&this.parent instanceof wm.Control){
_249=this.parent;
}else{
if(this.owner instanceof wm.Page&&this.owner.owner instanceof wm.Control){
_249=this.owner.owner;
}
}
if(!_249){
return false;
}
return _249.isAncestorHiddenLayer();
},isAncestorHidden:function(){
if(!this.showing&&this instanceof wm.Layer==false){
return true;
}
if(this instanceof wm.Layout&&this.owner==app._page||this instanceof wm.Dialog){
return false;
}
if(this instanceof wm.Layer&&!this.active){
return true;
}
var _24a;
if(this.parent&&this.parent instanceof wm.Control){
_24a=this.parent;
}else{
if(this.owner instanceof wm.Page&&this.owner.owner instanceof wm.Control){
_24a=this.owner.owner;
}
}
if(!_24a){
return false;
}
return _24a.isAncestorHidden();
},callOnShowParent:function(){
if(this.owner&&this.owner._isUnloading){
return;
}
var self=this;
wm.forEachVisibleWidget(this,function(w){
if(self!=w){
if(w._onShowParent){
w._onShowParent();
}
if(w.onShow&&w.onShow!=w.constructor.prototype.onShow){
w.onShow();
}
}
},true);
},callOnHideParent:function(){
var self=this;
if(!this.isDestroyed){
wm.forEachVisibleWidget(this,function(w){
if(w.hint&&app.toolTipDialog&&app.toolTipDialog.tipOwner==self){
app.hideToolTip();
}
if(self!=w){
if(w._onHideParent){
w._onHideParent();
}
if(w.onHide&&w.onHide!=w.constructor.prototype.onHide){
w.onHide();
}
}
},true);
}
},onShow:function(){
},onHide:function(){
},connectToAllLayers:function(obj,_24b){
var _24c=[];
var _24d=[];
var _24e=this;
while(_24e&&(!app._page||_24e!=app._page.root)){
if(_24e instanceof wm.Layer){
_24c.push(_24e);
}else{
if(_24e instanceof wm.Dialog){
_24d.push(_24e);
}
}
if(_24e.parent){
_24e=_24e.parent;
}else{
if(_24e.owner instanceof wm.Page&&_24e.owner.owner instanceof wm.Control){
_24e=_24e.owner.owner;
}else{
_24e=null;
}
}
}
var f=dojo.hitch(obj,_24b);
this._layerConnections=[];
dojo.forEach(_24c,dojo.hitch(this,function(l){
this._layerConnections.push(this.connect(l,"onShow",this,function(){
if(dojo.every(_24c,function(l2){
return l2.isActive();
})&&dojo.every(_24d,function(l2){
return l2.showing;
})){
f();
}
}));
}));
dojo.forEach(_24d,dojo.hitch(this,function(d){
this._layerConnections.push(this.connect(d,"setShowing",this,function(){
if(d.showing&&!d._transitionToHiding){
if(dojo.every(_24c,function(l2){
return l2.isActive();
})&&dojo.every(_24d,function(l2){
return l2.showing;
})){
f();
}
}
}));
}));
},disconnectFromAllLayers:function(){
dojo.forEach(this._layerConnections,dojo.hitch(this,function(c){
dojo.disconnect(c);
this._connections=wm.Array.removeElement(this._connections,c);
}));
delete this._layerConnections;
},isAncestor:function(_24f){
var o=this.parent;
while(o&&o!=_24f){
o=o.parent;
}
return (o==_24f);
},updateId:function(){
this.inherited(arguments);
if(this.domNode){
var rid=this.getRuntimeId();
this.domNode.rid=rid;
this.domNode.id=rid.replace(/\./g,"_");
}
},getUniqueName:function(_250){
return wm.findUniqueName(_250,[this,this.components,this.widgets]);
},setName:function(_251){
if(!_251){
return;
}
if(this.parent){
this.parent.removeWidget(this);
}
this.addRemoveDefaultCssClass(false);
this.inherited(arguments);
if(this.parent){
this.parent.addWidget(this);
}
this.addRemoveDefaultCssClass(true);
},addWidget:function(_252){
this.widgets[_252.name]=_252;
var p=this.containerNode||this.domNode;
if(_252.domNode.parentNode!=p){
p.appendChild(_252.domNode);
}
},insertDomNodes:function(){
wm.forEachProperty(this.widgets,function(w,name){
w.insertDomNodes();
});
var _253=this.getParentPage();
try{
var a=1;
if((!_253||_253._disableRendering)&&this.invalidCss){
this.renderCss();
this.invalidCss=false;
}
var p=this.containerNode||this.parentNode||this.parent.domNode;
if(this.domNode.parentNode!=p&&this.domNode.parentNode!=window.document.body){
p.appendChild(this.domNode);
}
}
catch(e){
}
},leafFirstRenderCss:function(){
wm.forEachProperty(this.widgets,function(w,name){
w.leafFirstRenderCss();
});
if(this.invalidCss){
this.render(1);
}
},removeWidget:function(_254){
if(this.widgets){
delete this.widgets[_254.name];
}
},adjustChildProps:function(_255,_256){
if(wm.isClassInstanceType(_255,wm.Control)){
dojo.mixin(_256,{owner:this._assignChildrenToOwner||this.owner,parent:this});
}else{
this.inherited(arguments);
}
},doSetSizeBc:function(){
if(this.sizeUnits=="flex"){
this.setFlex(this.size);
}else{
if(this.sizeUnits){
var b=this.getParentBox(),p={v:"height",h:"width"}[b];
this.setSizeProp(p,this.size+this.sizeUnits);
}else{
if(this.flex){
this.setFlex(this.flex);
}
}
}
},setFlex:function(_257){
var box=this.getParentBox();
if(box){
var ex={h:"width",v:"height"}[box];
this.setSizeProp(ex,_257*100+"%");
this._boundsDirty=true;
}else{
this.setSizeProp("width",_257*100+"%");
this.setSizeProp("height",_257*100+"%");
}
},getScrollMargins:function(){
if(wm.isMobile){
return {w:(this.scrollY||this._xscrollY)?2:0,h:(this.scrollX||this._xscrollX)?2:0};
}else{
return {w:(this.scrollY||this._xscrollY)?17:0,h:(this.scrollX||this._xscrollX)?17:0};
}
},isReflowEnabled:function(){
if(this._cupdating){
return false;
}
if(this.owner){
if(wm.isInstanceType(this.owner,wm.Control)){
return this.owner.isReflowEnabled();
}else{
return !this.owner._loadingPage;
}
}
return true;
},padBorderMarginChanged:function(){
this.inherited(arguments);
if(!this._doingAutoSize){
this._needsAutoSize=true;
}
if(this.isReflowEnabled()){
if(this.parent){
this.parent.reflow();
}else{
this.render();
wm.fire(this,"flow");
}
}
},boundsResized:function(){
var box=dojo.marginBox(this.dom.node);
if(this.bounds.w!=box.w){
this.width=this.bounds.w+"px";
}
if(this.bounds.h!=box.h){
this.height=this.bounds.h+"px";
}
this.updateBounds();
},updateBounds:function(){
this._percEx={w:0,h:0};
var su=wm.splitUnits(this.width);
var w=su.value;
switch(su.units){
case "flex":
w*=100;
this._percEx.w=w;
this.width=w+"%";
w=NaN;
break;
case "em":
w*=18;
this.width=w+"px";
break;
case "%":
this._percEx.w=w;
w=NaN;
break;
}
su=wm.splitUnits(this.height);
var h=su.value;
switch(su.units){
case "flex":
h*=100;
this._percEx.h=h;
this.height=h+"%";
h=NaN;
break;
case "em":
h*=h*18;
this.height=h+"px";
break;
case "%":
this._percEx.h=h;
h=NaN;
break;
}
this.setBounds(NaN,NaN,w,h);
},getParentBox:function(){
var n=(this.domNode||0).parentNode;
return n&&(n.box||(n.getAttribute&&n.getAttribute("box")))||(this.parent||0).box||"";
},adjustSetSizeProp:function(n,v){
return v;
},setSizeProp:function(n,v,_258){
var _259="min"+wm.capitalize(n);
var _25a="getMin"+wm.capitalize(n)+"Prop";
var _25b=!wm.isMobile&&_258||this[_25a]();
v=this.adjustSetSizeProp(n,v);
if(this[n]==v&&this[_259]==_258){
if(v.match(/px/)&&parseInt(v)!=this.bounds[(n=="height")?"h":"w"]){
}else{
return;
}
}
this[n]=v;
this[_259]=_258;
if(!this._doingAutoSize){
this._needsAutoSize=true;
if(this.autoSizeHeight&&n=="height"){
this.autoSizeHeight=false;
}
if(this.autoSizeWidth&&n=="width"){
this.autoSizeWidth=false;
}
}
if(this.designWrapper){
this.designWrapper.invalidCss=true;
}
if(!this._loading){
this.updateBounds();
}
if(this.isReflowEnabled()&&this.showing){
this.reflowParent();
if(this._isDesignLoaded&&this.parent instanceof wm.Container){
var _25c=this.parent;
wm.job(_25c.getRuntimeId()+".designResize",50,function(){
_25c.designResizeForNewChild();
});
}
}
},setWidth:function(_25d){
this.setSizeProp("width",_25d,this.minWidth);
},setHeight:function(_25e){
this.setSizeProp("height",_25e,this.minHeight);
},setMinWidth:function(_25f){
_25f=(_25f)?parseInt(_25f):0;
this.setSizeProp("width",this.width,_25f);
},setMinHeight:function(_260){
_260=(_260)?parseInt(_260):0;
this.setSizeProp("height",this.height,_260);
},getMinWidthProp:function(){
return parseInt(this.minWidth)||30;
},getMinHeightProp:function(){
return parseInt(this.minHeight)||15;
},setMaxHeight:function(_261){
_261=parseInt(_261)||0;
this.maxHeight=_261;
if(_261>this.bounds.h){
this.reflowParent();
}
},getDomHeight:function(){
return dojo.coords(this.domNode,false).h;
},getDomWidth:function(){
return dojo.coords(this.domNode,false).w;
},doAutoSize:function(_262,_263){
if(this._doingAutoSize||!this.autoSizeHeight&&!this.autoSizeWidth){
return;
}
if(!_263&&!this._needsAutoSize){
return;
}
if(this.isAncestorHidden()){
return;
}
this._doingAutoSize=true;
this._needsAutoSize=false;
if(this.autoSizeWidth){
this.domNode.style.width="";
var neww=dojo.coords(this.domNode).w;
if(this.minWidth&&this.minWidth>neww){
neww=this.minWidth;
}
if(_262){
this.setWidth(neww+"px");
}else{
this.bounds.w=neww;
this.domNode.style.width=neww+"px";
}
}
if(this.autoSizeHeight){
this.domNode.style.height="";
var newh=dojo.coords(this.domNode).h;
if(this.minHeight&&this.minHeight>neww){
newh=this.minHeight;
}
if(_262){
this.setHeight(newh+"px");
}else{
this.bounds.h=newh;
this.domNode.style.height=newh+"px";
}
}
if(this.isDesignLoaded()&&studio.designer.selected==this){
setTimeout(dojo.hitch(studio.inspector,"reinspect"),100);
}
this._doingAutoSize=false;
},setAutoSizeWidth:function(_264){
this.autoSizeWidth=_264;
if(this.autoSizeWidth){
if(this._percEx.w){
this.width=this.bounds.w+"px";
this._percEx.w=0;
}
this.doAutoSize(1,1);
}
},setAutoSizeHeight:function(_265){
this.autoSizeHeight=_265;
if(this.autoSizeHeight){
if(this._percEx.h){
this.height=this.bounds.h+"px";
this._percEx.h=0;
}
this.doAutoSize(1,1);
}
},disruptChromeOverflow:function(_266){
},render:function(_267){
if(_267||this.isReflowEnabled()){
this.renderCss();
}else{
this.invalidCss=true;
}
return true;
},renderCss:function(){
if(!this.invalidCss){
return;
}
this.invalidCss=false;
var _268=this.buildCssSetterObj();
if(!this.renderedOnce&&(dojo.isFF||dojo.isSafari||dojo.isChrome)){
this.setCssViaCssText(_268);
this.renderedOnce=1;
}else{
this.setCssViaDom(_268);
}
if(!this.noRenderBounds){
this.renderBounds();
}
},buildCssSetterObj:function(){
if(!this._appliedStyles){
this._appliedStyles={};
}
var _269=this.getCssSplitter(this.margin);
var _26a=this.getCssSplitter(this.padding);
var _26b=this.getCssSplitter(this.border);
if(this.margin.indexOf(",")==-1&&this.margin.indexOf(" ")!=-1){
_269=" ";
}
var _26c=this.padding.split(_26a);
var _26d=((this.autoScroll||this._xscrollX||this._xscrollY)&&(!wm.isFakeMobile||this instanceof wm.Container==false)?"auto":"hidden");
var _26e;
var _26f=(this.margin||"0").split(_269);
var _270=(this.border||"0").split(_26b);
var _271=(this.padding||"0").split(_26a);
if(_26f.length==1){
_26f[1]=_26f[2]=_26f[3]=_26f[0];
}else{
if(_26f.length==2){
_26f[2]=_26f[0];
_26f[3]=_26f[1];
}
}
if(_270.length==1){
_270[1]=_270[2]=_270[3]=_270[0];
}else{
if(_270.length==2){
_270[2]=_270[0];
_270[3]=_270[1];
}
}
if(_271.length==1){
_271[1]=_271[2]=_271[3]=_271[0];
}else{
if(_271.length==2){
_271[2]=_271[0];
_271[3]=_271[1];
}
}
if(app._currentZoomLevel&&app._currentZoomLevel>1&&app._currentZoomLevel<1.4){
for(var i=0;i<_26f.length;i++){
if(_26f[i]%10){
_26f[i]*=app._currentZoomLevel;
}
}
for(var i=0;i<_271.length;i++){
if(_271[i]%10){
_271[i]*=app._currentZoomLevel;
}
}
for(var i=0;i<_270.length;i++){
if(_270[i]%10){
_270[i]*=app._currentZoomLevel;
}
}
}
if(this.designBorderState){
_26e={margin:(_26f.join("px ")||0)+"px",padding:(_271.join("px ")||0)+"px",backgroundColor:this.backgroundColor,overflowX:this.scrollX?"auto":_26d,overflowY:this.scrollY?"auto":_26d};
var _272="",_273="",_274="";
if(this.designBorderState.t){
_272+="1px ";
_273+="dashed ";
_274+="#C1C1C1 ";
}else{
_272+=this.borderExtents.t+"px ";
_273+="solid ";
_274+=this.borderColor+" ";
}
if(this.designBorderState.r){
_272+="1px ";
_273+="dashed ";
_274+="#C1C1C1 ";
}else{
_272+=this.borderExtents.r+"px ";
_273+="solid ";
_274+=this.borderColor+" ";
}
if(this.designBorderState.b){
_272+="1px ";
_273+="dashed ";
_274+="#C1C1C1 ";
}else{
_272+=this.borderExtents.b+"px ";
_273+="solid ";
_274+=this.borderColor+" ";
}
if(this.designBorderState.l){
_272+="1px";
_273+="dashed";
_274+="#C1C1C1";
}else{
_272+=this.borderExtents.l+"px";
_273+="solid";
_274+=this.borderColor;
}
_26e.borderStyle=_273;
_26e.borderColor=_274;
_26e.borderWidth=_272;
}else{
var _275=this._isDesignLoaded?studio.currentDeviceType:wm.device;
_26e={margin:(_26f.join("px ")||0)+"px",padding:(_271.join("px ")||0)+"px",borderStyle:"solid",borderWidth:(_270.join("px ")||0)+"px",borderColor:this.borderColor,backgroundColor:this.backgroundColor,overflowX:_275!="desktop"?"hidden":this.scrollX?"auto":_26d,overflowY:this.scrollY?"auto":_26d};
}
if(this.styles&&!wm.isEmpty(this.styles)){
_26e=dojo.mixin(_26e,this.styles);
}
return _26e;
},setCssViaCssText:function(_276){
if(!this.domNode){
return;
}
var _277=[];
var _278=["backgroundColor","padding","margin","borderTopWidth","borderTopStyle","borderTopColor","borderBottomWidth","borderBottomStyle","borderBottomColor","borderLeftWidth","borderLeftStyle","borderLeftColor","borderRightWidth","borderRightStyle","borderRightColor","overflowX","overflowY"];
wm.forEachProperty(_276,dojo.hitch(this,function(_279,_27a){
if(dojo.indexOf(_278,_27a)==-1){
if(_27a=="backgroundGradient"){
var _27b=_276.backgroundGradient;
if(_27b){
inValue=wm.getBackgroundStyle(_27b.startColor,_27b.endColor,_27b.colorStop,_27b.direction,"");
if(dojo.isIE<10){
_277.push("filter: "+inValue);
}else{
_277.push("background: "+inValue);
}
}
}else{
if(_27a=="borderRadius"){
var _27c="";
if(dojo.isWebKit){
_27c="-webkit-";
}
var _27d=String(_279).split(/\s+/);
inValue="";
for(var i=0;i<_27d.length;i++){
if(_27d[i].match(/^\d+$/)){
_27d[i]+="px";
}
}
if(_27d.length==1){
_27d[1]=_27d[2]=_27d[3]=_27d[0];
}
if(_27d.length==2){
_27d[3]=_27d[0];
_27d[2]=_27d[1];
}
if(_27d.length==3){
_27d[3]="0px";
}
_277.push(_27c+"border-top-left-radius: "+_27d[0]);
_277.push(_27c+"border-top-right-radius: "+_27d[1]);
_277.push(_27c+"border-bottom-left-radius: "+_27d[2]);
_277.push(_27c+"border-bottom-right-radius: "+_27d[3]);
}else{
if(_27a=="backgroundImage"){
if(this._isDesignLoaded&&(_279.indexOf("url")!=0&&_279.indexOf("http")!=0&&_279.indexOf("/")!=0)){
_279=this.getPath()+_279;
}
if(_279.indexOf("url")!=0){
_279="url("+_279+")";
}
}
_277.push(_27a.replace(/([A-Z])/g,function(_27e){
return "-"+_27e.toLowerCase();
})+":"+_279);
}
}
this._appliedStyles[_27a]=_279;
}
}));
_277.push("margin:"+_276.margin);
_277.push("padding:"+_276.padding);
_277.push("border-style:"+_276.borderStyle);
_277.push("border-width:"+_276.borderWidth);
_277.push("border-color:"+_276.borderColor);
if(_276.backgroundColor){
_277.push("background-color:"+_276.backgroundColor);
}
_277.push("overflow-x:"+_276.overflowX);
_277.push("overflow-y:"+_276.overflowY);
if(wm.isMobile&&dojo.isWebKit&&(_276.overflowY=="auto"||_276.overflowY=="scroll")){
_277.push("-webkit-overflow-scrolling: touch");
}
this.domNode.style.cssText+=_277.join(";");
},setCssViaDom:function(_27f){
if(!this.domNode){
return;
}
var s=this.domNode.style;
var _280=false;
wm.forEachProperty(_27f,dojo.hitch(this,function(_281,_282){
try{
if(this._appliedStyles[_282]!=_281){
if(_282=="backgroundGradient"){
var _283=_27f[_282];
if(_283){
inValue=wm.getBackgroundStyle(_283.startColor,_283.endColor,_283.colorStop,_283.direction,"");
if(dojo.isIE<10){
s.filter=inValue;
}else{
s.background=inValue;
}
}
}else{
if(_282=="backgroundImage"){
if(this._isDesignLoaded&&(_281.indexOf("url")!=0&&_281.indexOf("http")!=0&&_281.indexOf("/")!=0)){
_281=this.getPath()+_281;
}
if(_281.indexOf("url")!=0){
_281="url("+_281+")";
}
}
s[_282]=_281;
this._appliedStyles[_282]=_281;
}
}
if(wm.isMobile&&dojo.isWebKit&&(s.overflowY=="scroll"||s.overflowY=="auto")){
s.WebkitOverflowScrolling="touch";
}
}
catch(e){
console.error("Invalid style for "+this.name+"; "+_282+": "+_27f[_282]);
}
}));
},getCssSplitter:function(_284){
var _285=",";
if(_284){
_284=dojo.trim(String(_284));
if(_284.indexOf(",")==-1&&_284.indexOf(" ")!=-1){
_285=" ";
}
}
return _285;
},renderBounds:function(){
var _286=false;
if(this.dom){
var b=this.getStyleBounds();
_286=this.dom.setBox(b,wm.AbstractEditor&&this.singleLine&&this instanceof wm.AbstractEditor==false);
}
if(this.designWrapper){
this.designWrapper.controlBoundsChange();
this.designWrapper.renderBounds();
}
return _286;
},reflow:function(){
},reflowParent:function(){
wm.fire(this.parent,"reflow");
},setScrollX:function(_287){
this.scrollX=_287;
this.invalidCss=true;
this.render();
this.reflowParent();
},setScrollY:function(_288){
this.scrollY=_288;
this.invalidCss=true;
this.render();
this.reflowParent();
},setAutoScroll:function(_289){
this.autoScroll=_289;
if(_289){
if(this.isDesignLoaded()&&(this.scrollX||this.scrollY)){
this.scrollX=false;
this.scrollY=false;
if(dojo.indexOf(studio.designer.selected,this)!=-1){
studio.inspector.reinspect();
}
}
}
this.noRenderBounds=true;
this.invalidCss=true;
this.renderCss();
delete this.noRenderBounds;
},show:function(){
this.setValue("showing",true);
},hide:function(){
this.setValue("showing",false);
},disable:function(){
this.setValue("disabled",true);
},enable:function(){
this.setValue("disabled",false);
},toString:function(_28a){
var t=_28a||"";
if(!this.showing){
t+=" ("+wm.getDictionaryItem("wm.Control.toString_HIDDEN")+")";
}
return this.inherited(arguments,[t]);
},setParent:function(_28b){
var _28c=this.parent;
var _28d=this.parent=_28b;
if(_28b&&_28b.containerWidget&&_28b.containerWidget.owner==_28b&&!wm.isInstanceType(_28b.containerWidget.owner,wm.Composite)){
_28d=this.parent=_28b.containerWidget;
}
if(_28c&&_28c!=_28d&&!_28c.isDestroyed){
_28c.removeWidget(this);
if(_28c.removeControl){
_28c.removeControl(this);
}
}
if(!this._cupdating){
if(_28d){
this.appendDOMNode(_28d);
}else{
if(this.domNode&&this.domNode.parentNode){
this.domNode.parentNode.removeChild(this.domNode);
}
}
}
if(_28d&&_28c){
dojo.publish("wmwidget-parentChange",[_28c,_28d,this]);
}
if((this._isDesignLoaded===undefined?this.isDesignLoaded():this._isDesignLoaded)&&this.owner==studio.page&&!this.owner._loadingPage&&_28b instanceof wm.Container){
wm.job(_28b.getRuntimeId()+".designResize",50,function(){
_28b.designResizeForNewChild();
});
}
},appendDOMNode:function(_28e){
var _28f=_28e;
if(_28f){
_28f.addWidget(this);
if(_28f.addControl){
_28f.addControl(this);
}
}else{
if(this.parentNode&&this.domNode){
var node=this.parentNode;
node.appendChild(this.domNode);
}
}
},getIndexInParent:function(){
if(this.parent&&this.parent instanceof wm.Container){
return this.parent.indexOfControl(this);
}
return -1;
},setIndexInParent:function(_290){
if(this.parent){
this.parent.moveControl(this,_290);
}
},canChangeShowing:function(){
return true;
},setShowing:function(_291,_292){
var s=Boolean(_291);
if(!this.canChangeShowing()){
return;
}
if(this._isDesignLoaded&&this.$.binding&&this.$.binding.wires.showing){
s=true;
}
if(_292||this.showing!=s){
this.showing=s;
this.domNode.style.display=s?"":"none";
this.reflowParent();
}
},setDisabled:function(_293){
var d=Boolean(_293);
this.disabled=d;
this._disabled=d||this._parentDisabled;
wm.forEachProperty(this.widgets,dojo.hitch(this,function(w,name){
w.setParentDisabled(this._disabled);
}));
if(this.c$){
dojo.forEach(this.c$,function(w){
if(!w.name){
w.setParentDisabled(this._disabled);
}
},this);
}
dojo.toggleClass(this.domNode,"Disabled",this._disabled);
},setParentDisabled:function(_294){
this._parentDisabled=_294;
this.setDisabled(this.disabled);
},setBackgroundColor:function(_295){
this.backgroundColor=_295;
this.invalidCss=true;
this.render();
},setBorderColor:function(_296){
this.borderColor=_296;
this.invalidCss=true;
this.render();
},addRemoveDefaultCssClass:function(_297){
if(this.owner){
dojo[_297?"addClass":"removeClass"](this.domNode,this.owner.declaredClass+"-"+this.name);
}
},getUserNodeClasses:function(_298){
var _299=this._classes;
for(var i in _299){
if(_298==i){
return _299[i].join(" ");
}
}
return "";
},initUserClasses:function(){
if(dojo.isArray(this._classes)){
this._classes={domNode:this._classes};
}
var _29a=this._classes;
for(var i in _29a){
this.initUserNodeClasses(_29a[i],i);
}
},initUserNodeClasses:function(_29b,_29c){
var k=_29b||[],n=this[_29c];
if(n){
dojo.addClass(n,k.join(" "));
}
},addUserClass:function(_29d,_29e){
_29e=_29e||"domNode";
var cs=this._classes[_29e]=this._classes[_29e]||[];
cs.push(_29d);
var n=this[_29e];
if(n){
dojo.addClass(n,_29d);
}
},removeUserClass:function(_29f,_2a0){
_2a0=_2a0||"domNode";
var n=this[_2a0];
if(n){
dojo.removeClass(n,_29f);
}
var cs=this._classes[_2a0]||[];
for(var i=0,c;c=cs[i];i++){
if(c==_29f){
cs.splice(i--,1);
}
}
if(!cs.length){
delete this._classes[_2a0];
}
},setStyle:function(_2a1,_2a2){
if(_2a2===undefined||_2a2===null){
_2a2="";
}
if(_2a1=="border"||_2a1=="borderColor"||_2a1=="margin"||_2a1=="padding"){
return this.setProp(_2a1,_2a2);
}
if(!this.styles){
this.styles={};
}
if(_2a2===null||_2a2===undefined||_2a2===""){
delete this.styles[_2a1];
}else{
this.styles[_2a1]=_2a2;
}
switch(_2a1){
case "backgroundGradient":
if(_2a2){
_2a2=wm.getBackgroundStyle(_2a2.startColor,_2a2.endColor,_2a2.colorStop,_2a2.direction,"");
}else{
_2a2="";
}
if(dojo.isIE<10){
this.domNode.style.filter=_2a2;
}else{
this.domNode.style.background=_2a2;
}
break;
case "borderRadius":
var _2a3;
if(dojo.isWebKit){
_2a3="Webkit";
}
if(_2a3){
_2a3+="B";
}else{
_2a3="b";
}
var _2a4=String(_2a2).split(/\s+/);
_2a2="";
for(var i=0;i<_2a4.length;i++){
if(_2a4[i].match(/^\d+$/)){
_2a4[i]+="px";
}
}
if(_2a4.length==1){
_2a4[1]=_2a4[2]=_2a4[3]=_2a4[0];
}
if(_2a4.length==2){
_2a4[3]=_2a4[0];
_2a4[2]=_2a4[1];
}
if(_2a4.length==3){
_2a4[3]="0px";
}
this.domNode.style[_2a3+"orderTopLeftRadius"]=_2a4[0];
this.domNode.style[_2a3+"orderTopRightRadius"]=_2a4[1];
this.domNode.style[_2a3+"orderBottomLeftRadius"]=_2a4[2];
this.domNode.style[_2a3+"orderBottomRightRadius"]=_2a4[3];
break;
case "backgroundImage":
if(this._isDesignLoaded&&(_2a2.indexOf("url")!=0&&_2a2.indexOf("http")!=0&&_2a2.indexOf("/")!=0)){
_2a2=this.getPath()+_2a2;
}
if(_2a2.indexOf("url")!=0){
_2a2="url("+_2a2+")";
}
this.domNode.style[_2a1]=_2a2;
break;
default:
this.domNode.style[_2a1]=_2a2;
}
},getStyle:function(_2a5){
if(_2a5=="border"||_2a5=="borderColor"||_2a5=="margin"||_2a5=="padding"){
return this.getProp(_2a5);
}else{
if(!this.styles){
return "";
}else{
return this.styles[_2a5]!==undefined?this.styles[_2a5]:"";
}
}
},getOrderedWidgets:function(){
return [];
},updatingEvent:function(prop,_2a6){
},onRightClick:function(_2a7){
},onMouseOver:function(_2a8){
},onMouseOut:function(_2a9){
},toHtml:function(){
return "";
},toHtmlStyles:function(){
var _2aa="";
if(this.styles){
wm.forEachProperty(this.styles,function(_2ab,name){
if(_2aa){
_2aa+=";";
}
_2aa+=name.replace(/([A-Z])/g,function(_2ac){
return "-"+_2ac.toLowerCase();
})+": "+_2ab;
});
if(_2aa){
_2aa="style='"+_2aa+"'";
}
}
return _2aa;
},customToHtml:function(_2ad){
return "";
},print:function(){
var html=this.toHtml(725);
var _2ae=dojo.moduleUrl("wm.base.widget.themes.default").path+"print.css";
var _2af=dojo.moduleUrl("wm.base.styles").path+"wavemaker.css";
var page=this.getParentPage();
if(page){
var name=page.declaredClass;
var css=wm.load("pages/"+name+"/"+name+".css");
}
html="<html><head><title>Printing "+app.declaredClass+"</title><link rel='stylesheet' type='text/css' href='"+_2ae+"' /><link rel='stylesheet' type='text/css' href='"+_2af+"'/><link rel='stylesheet' href='print.css'/>"+(css?"<style>"+css+"</style>":"")+"</head><body onload='print()'>"+html+"</body><html>";
var win=window.open("","Printing");
if(win){
win.document.open("text/html");
win.document.write(html);
win.document.close();
}
},setHint:function(_2b0){
this.hint=_2b0;
if(_2b0){
this.createMouseOverConnect();
this.createMouseOutConnect();
}
},createMouseOverConnect:function(){
if(this.findConnection("onmouseover")){
return;
}
var self=this;
this.connect(this.domNode,"onmouseover",function(e){
wm.job(self.getRuntimeId()+"MouseOverEvents",50,function(){
self.mouseOver(e);
});
});
},createMouseOutConnect:function(){
if(this.findConnection("onmouseout")){
return;
}
var self=this;
this.connect(this.domNode,"onmouseout",function(e){
wm.job(self.getRuntimeId()+"MouseOverEvents",50,function(){
self.mouseOut(e);
});
});
},mouseOver:function(_2b1){
if(this.hint){
var self=this;
wm.cancelJob("app.hint");
var _2b2=(app.toolTipDialog&&app.toolTipDialog.showing);
wm.job("app.hint",_2b2?0:app.hintDelay,function(){
if(!self.isAncestorHidden()){
app.createToolTip(self.hint,self.domNode,_2b1,self);
}
});
}
this.onMouseOver(_2b1);
dojo.stopEvent(_2b1);
},mouseOut:function(_2b3){
if(this.hint&&app.toolTipDialog&&(app.toolTipDialog.showing||wm.hasJob("app.hint"))){
var self=this;
wm.job("app.hint",500,function(){
if(self==app.toolTipDialog.tipOwner){
app.hideToolTip();
}
});
}
this.onMouseOut(_2b3);
dojo.stopEvent(_2b3);
},onMouseOver:function(_2b4){
},onMouseOut:function(_2b5){
},getParentForm:function(){
var w=this.parent;
var r=this.getRoot();
r=r&&r.root;
while(w&&w!=r){
if(wm.isInstanceType(w,[wm.LiveFormBase,wm.DataForm])){
return w;
}
w=w.parent;
}
},setImageList:function(_2b6){
this.imageList=_2b6;
this.imageListChanged();
},setImageIndex:function(_2b7){
if(_2b7!==undefined){
this.imageIndex=Number(_2b7);
this.imageListChanged();
}
},imageListChanged:function(){
var iln=this.findImageList();
this._imageList=iln?iln instanceof wm.ImageList?iln:this.owner.getValueById(iln):null;
this.invalidCss=true;
this.render(true,true);
if(this._isDesignLoaded&&this._imageList&&!this._renameSubscription){
this._renameSubscription=this.subscribe("wmwidget-rename",dojo.hitch(this,function(_2b8,_2b9,_2ba){
if(_2ba==this._imageList){
this.imageList=_2ba.getId();
this.imageListChanged();
}
}));
}
},getCurrentImageIndex:function(){
return this.imageIndex;
},findImageList:function(){
var t=this;
while(t&&!t.imageList){
t=t.parent;
}
return t?t.imageList:null;
},update:function(){
this.show();
if(this.parent){
this.parent.update();
}
}});
dojo.declare("wm.TouchMixin",null,{addTouchListener:function(_2bb){
if(!this._subscriptions){
this._subscriptions=[];
this._connections=[];
this._debugSubscriptions=[];
this.subscribe=function(){
wm.Component.prototype.subscribe.apply(this,arguments);
};
this.connect=function(){
wm.Component.prototype.connect.apply(this,arguments);
};
this.disconnectEvent=function(){
wm.Component.prototype.disconnectEvent.apply(this,arguments);
};
}
this.connect(_2bb||this.domNode,wm.isFakeMobile?"mousedown":"touchstart",this,"_onTouchStart");
if(!wm.isFakeMobile){
this.connect(_2bb||this.domNode,"touchmove",this,"_onTouchMove");
this.connect(_2bb||this.domNode,"touchend",this,"_onTouchEnd");
}
this.subscribe("wmTouchMove",dojo.hitch(this,function(){
wm.cancelJob(this.getRuntimeId()+".longClick");
}));
},_onTouchStart:function(e){
this._touchMoved=false;
var _2bc;
if(e.targetTouches){
if(e.targetTouches.length){
this._touchStartY=e.targetTouches[0].clientY;
this._touchStartX=e.targetTouches[0].clientX;
_2bc=e.targetTouches[0].target;
}
}else{
if("clientY" in e){
this._touchStartY=e.clientY;
this._touchStartX=e.clientX;
_2bc=e.target;
this.connect(document.body,"mousemove",this,"_onTouchMove");
this.connect(document.body,"mouseup",this,"_onTouchEnd");
}else{
delete this._touchStartY;
delete this._touchStartX;
}
}
if("_touchStartY" in this){
this._touchLastY=this._touchStartY;
this._touchLastX=this._touchStartX;
if(this.onTouchStart(e,_2bc)){
this.disconnectEvent("mousemove");
this.disconnectEvent("mouseup");
}else{
wm.job(this.getRuntimeId()+".longClick",1000,this,"_onLongTouch");
}
}
},_onLongTouch:function(){
this.onLongTouch(this._touchStartX,this._touchStartY);
this._onTouchEnd(null,this.onLongTouch!=wm.TouchMixinOptional.prototype.onLongTouch);
},onTouchStart:function(_2bd){
},_onTouchMove:function(e){
var _2be,_2bf,_2c0,_2c1;
if(e.targetTouches){
if(e.targetTouches.length!=1){
return false;
}
_2be=e.targetTouches[0].clientY-this._touchStartY;
_2bf=e.targetTouches[0].clientY-this._touchLastY;
_2c0=e.targetTouches[0].clientX-this._touchStartX;
_2c1=e.targetTouches[0].clientX-this._touchLastX;
this._touchLastY=e.targetTouches[0].clientY;
this._touchLastX=e.targetTouches[0].clientX;
}else{
_2be=e.clientY-this._touchStartY;
_2bf=e.clientY-this._touchLastY;
_2c0=e.clientX-this._touchStartX;
_2c1=e.clientX-this._touchLastX;
this._touchLastY=e.clientY;
this._touchLastX=e.clientX;
}
var posY=this._touchStartY+_2be;
var posX=this._touchStartX+_2c0;
if(!this._touchMoved&&(Math.abs(_2be)>5||Math.abs(_2c0)>5)){
this._touchMoved=true;
wm.cancelJob(this.getRuntimeId()+".longClick");
}
if(this._touchMoved){
this.onTouchMove(e,posY,_2be,_2bf,posX,_2c0,_2c1);
}
},onTouchMove:function(_2c2,_2c3,_2c4,_2c5,_2c6,_2c7,_2c8){
},_onTouchEnd:function(e,_2c9){
wm.cancelJob(this.getRuntimeId()+".longClick");
this.disconnectEvent("mousemove");
this.disconnectEvent("mouseup");
if(!_2c9){
this.onTouchEnd(e,this._touchMoved);
if(!this._touchMoved){
this.onTouch(this._touchStartX,this._touchStartY);
}
}
},onTouchEnd:function(_2ca,_2cb){
},onTouch:function(posX,posY){
},onLongTouch:function(posX,posY){
}});
dojo.declare("wm.TouchScrollMixin",wm.TouchMixin,{onTouchStart:function(_2cc){
this._touchTime=new Date().getTime();
if(this._touchAnimationId){
window.clearInterval(this._touchAnimationId);
}
},onTouchMove:function(_2cd,_2ce,_2cf,_2d0,_2d1,_2d2,_2d3){
var node=this._scrollNode||this.domNode;
node.scrollTop-=_2d0;
var _2d4=new Date().getTime();
if(this._touchTime!=_2d4){
this._touchVelocity=_2d0/(this._touchTime-_2d4);
this._touchTime=_2d4;
}
dojo.stopEvent(_2cd);
},onTouchEnd:function(_2d5,_2d6){
if(_2d6){
if(this._touchVelocity!=Infinity&&Math.abs(this._touchVelocity)>0.15){
if(this._touchAnimationId){
window.clearInterval(this._touchAnimationId);
}
this._touchAnimationId=window.setInterval(dojo.hitch(this,"_onAnimateScroll"),50);
}
}
},_onAnimateScroll:function(){
var node=this._scrollNode||this.domNode;
this._touchVelocity*=0.9;
var top=node.scrollTop;
node.scrollTop=node.scrollTop+this._touchVelocity*50;
var _2d7=node.scrollTop;
var diff=Math.abs(_2d7-top);
if(diff<=1){
window.clearInterval(this._touchAnimationId);
}
}});
if(wm.isMobile){
dojo.declare("wm.TouchMixinOptional",wm.TouchMixin,{});
}else{
dojo.declare("wm.TouchMixinOptional",null,{onLongTouch:function(posX,posY){
}});
}
if(wm.isIOS<=4||wm.isAndroid<=2||wm.isFakeMobile){
dojo.declare("wm.TouchScrollMixinOptional",wm.TouchScrollMixin,{});
}else{
dojo.declare("wm.TouchScrollMixinOptional",null,{});
}
wm.Widget=wm.Control;
dojo.declare("wm.Box",wm.Widget,{});
}
if(!dojo._hasResource["wm.base.Plugin"]){
dojo._hasResource["wm.base.Plugin"]=true;
dojo.provide("wm.base.Plugin");
wm.Plugin={targetClass:null,callerFactory:function(_2d8){
return function(_2d9,_2da){
var fn=_2d8[_2d9.callee.nom];
if(fn){
return fn.apply(this,_2da||_2d9||[]);
}
};
},plugin:function(_2db,_2dc,_2dd){
var _2de=[];
for(var p in _2dd){
if(dojo.isFunction(_2dd[p])&&_2dc.prototype[p]){
_2de[p]=_2dc.prototype[p];
}
}
_2dd[_2db+"Socket"]=this.callerFactory(_2de);
_2dc.extend(_2dd);
}};
}
if(!dojo._hasResource["wm.base.components.Variable"]){
dojo._hasResource["wm.base.components.Variable"]=true;
dojo.provide("wm.base.components.Variable");
wm.getRuntimeService=function(_2df){
var a=dojo.getObject("studio.wip.app")||app;
return wm.fire(a,"getRuntimeService");
};
wm.getRuntimeServiceDesignTime=function(_2e0){
var a=dojo.getObject("studio.wip.app")||app;
return wm.fire(a,"getRuntimeServiceDesignTime");
};
dojo.declare("wm.Variable",wm.Component,{json:"",type:"",saveInCookie:false,saveInPhonegap:false,isList:false,_updating:0,_dataSchema:{},_greedyLoadProps:false,_allowLazyLoad:true,cursor:0,_uniqueSubnardId:1,init:function(){
this.inherited(arguments);
if(this._isDesignLoaded){
this._subscriptions.push(dojo.subscribe("wmtypes-changed",this,"wmTypesChanged"));
}
},postInit:function(){
this.inherited(arguments);
this._inPostInit=true;
if(!this._subNard&&!this.$.binding){
new wm.Binding({name:"binding",owner:this});
}
this.setType(this.type,true);
if(window["PhoneGap"]&&this.saveInPhonegap){
var _2e1=window.localStorage.getItem(this.getRuntimeId());
if(_2e1){
this.json=_2e1;
}
}else{
if(this.saveInCookie){
var _2e1=dojo.cookie(this.getRuntimeId());
if(_2e1){
this.json=_2e1;
}
}
}
if(this.json){
this.setJson(this.json);
}else{
this._clearData();
}
this._inPostInit=false;
if(!this._updating&&this.$.binding){
this.$.binding.refresh();
}
if(this.isEmpty()){
this.notify();
}
},canSetType:function(_2e2){
if(this.dataSet&&this.dataSet.type==this.type){
wm.logging&&undefined;
return;
}
return true;
},setType:function(_2e3,_2e4){
this._hasChanged=false;
if(_2e3==this.declaredClass||this.owner instanceof wm.Variable&&_2e3==this.owner.declaredClass){
_2e3="";
}
if(!this.canSetType(_2e3)){
return;
}
var t=_2e3;
if(wm.isListType(t)){
this.isList=true;
if(t.substring(t.length-1)=="]"){
t=t.slice(1,-1);
}
}else{
if(!(this.data&&this.data._list)&&!this._inPostInit){
this.isList=false;
}
}
var _2e5;
if(this.type!=t){
_2e5=true;
}else{
if(this._isDesignLoaded){
_2e5=dojo.toJson(this._getSchemaForType(_2e3))!=dojo.toJson(this._dataSchema);
}
}
this._hasChanged=_2e5;
this.type=t;
if(this._proxy){
this._proxy.setType(this.type);
}
this.typeChanged(this.type);
if(this._query&&_2e5){
this._query.setType(this.type);
}
if(this.json&_2e5){
this.setJson(this.json);
}
if(!_2e4&&_2e5&&_2e3&&_2e3!="any"){
this.notify();
}
},set_type:function(_2e6){
this.setType(_2e6);
studio.reinspect();
},typeChanged:function(_2e7){
var t=_2e7;
var _2e8=wm.typeManager.getPrimitiveType(t)||!t||t=="wm.Variable";
this.isPrimitive=Boolean(_2e8);
var _2e9=this._getSchemaForType(t);
if(_2e9){
this.setDataSchema(_2e9);
}
},_getSchemaForType:function(_2ea){
var p=wm.typeManager.getPrimitiveType(_2ea);
if(this.isPrimitive){
return {dataValue:{type:p||"String"}};
}else{
return wm.typeManager.getTypeSchema(_2ea)||{dataValue:{type:p||"String",isList:this.isList}};
}
},setDataSchema:function(_2eb){
this._dataSchema=_2eb;
},setJson:function(_2ec){
this.json=_2ec;
try{
var d=eval("("+_2ec+")");
}
catch(e){
console.error("Json error in "+this.name+": "+e);
}
this.setData(d);
},hasList:function(){
return this.data&&("list" in this.data);
},getDataTypeInfo:function(_2ed){
return this._dataSchema[_2ed];
},listDataProperties:function(){
var list=this._listSchemaProperties({},this._dataSchema,"getDataTypeInfo");
for(var i in list){
list[i].bindable=true;
}
return list;
},beginUpdate:function(){
this._updating++;
},endUpdate:function(){
this._updating--;
},isUpdating:function(){
return this._updating>0;
},clearData:function(){
this._clearData();
this.setType(this.type,true);
if(this.type&&this.type!=this.declaredClass&&!this._initializing){
this.notify();
}
},_clearData:function(){
this._isNull=false;
this._nostub=false;
if(!this.data){
this.data={};
}
if(this.isList){
this.data={_list:[]};
}else{
var d;
for(var i in this.data){
d=this.data[i];
if(d instanceof wm.Variable&&!wm.typeManager.getLiveService(d.type)){
d._clearData();
}else{
delete this.data[i];
}
}
}
},_setNull:function(_2ee){
this._isNull=_2ee;
if(!_2ee&&this._subNard&&this.owner){
this.owner._setNull(_2ee);
}
},setData:function(_2ef){
if(window["PhoneGap"]&&this.saveInPhonegap||this.saveInCookie){
var _2f0=this.getParentPage();
if(_2f0&&_2f0._loadingPage&&!_2ef){
return;
}
}
if(_2ef instanceof wm.Variable){
_2ef=_2ef.getData();
}
this.onPrepareSetData(_2ef);
if(dojo.isArray(_2ef)){
this._setArrayData(_2ef);
}else{
if(this.isPrimitive){
this._setPrimitiveData(_2ef);
}else{
this._setObjectData(_2ef);
}
}
this.notify();
this.onSetData();
},onPrepareSetData:function(_2f1){
},onSetData:function(){
},notify:function(){
this.dataOwnerChanged();
this.dataChanged();
this.valueChanged("isEmpty",this.isEmpty());
if(this.isList){
this.valueChanged("count",this.getCount());
}
if(!this.isUpdating()&&this.queriedItems){
this.setQuery(this._query);
}
this.updatePermanentMemory();
},_setPrimitiveData:function(_2f2){
if(_2f2!==null&&typeof _2f2=="object"){
this.data=_2f2;
}else{
this.data={dataValue:_2f2};
}
this.isList=false;
},setIsList:function(_2f3){
if(_2f3&&!this.isList){
this.isList=true;
if(this.json&&!this.data._list){
this.setJson("["+this.json+"]");
}else{
if(wm.isEmpty(this.data)){
this._setArrayData([]);
}else{
var data=[];
data.push(this.getData());
this.setData(data);
}
}
}else{
if(!_2f3&&this.isList){
if(this.json){
this.setJson(dojo.toJson(this.getItem(0).getData()));
}else{
if(wm.isEmpty(this.data._list)){
this.setData(null);
}else{
this.setData(this.getItem(0));
}
}
}
}
},_setArrayData:function(_2f4){
if(wm.defaultTypes[this.type]&&_2f4.length&&typeof _2f4[0]!="object"){
_2f4=dojo.map(_2f4,function(v){
return {dataValue:v};
});
}
this.data={_list:_2f4};
this.isList=true;
this._isNull=_2f4.length==0;
},_setObjectData:function(_2f5){
this.beginUpdate();
this._clearData();
this.isList=false;
delete this.data._list;
var d,v,nv,_2f6=_2f5===null,_2f7=wm.isEmpty(_2f5);
for(var i in this._dataSchema){
d=this.data[i];
v=!_2f7?_2f5[i]:undefined;
nv=_2f6?null:v;
if(this._isVariableProp(i)){
if(d instanceof wm.Variable){
if(nv!==undefined){
d.beginUpdate();
d.setData(nv);
d.endUpdate();
}
}else{
if(v!==undefined){
this._setDataValue(i,v);
}
}
}else{
if(nv!==undefined){
this._setDataValue(i,nv);
}
}
}
this._setNull(_2f6);
this.endUpdate();
},getData:function(_2f8){
if(!this.data||this.disabled){
return;
}
if(this._isNull){
return null;
}else{
if(this.isList){
if(this.type=="byte"){
try{
if(this.data._list&&this.data._list[0] instanceof wm.Variable){
this.data._list[0]=this.data._list[0].data.dataValue;
}
this.data={dataValue:this.data._list.join("")};
}
catch(e){
this.data=null;
}
this.isList=false;
return dojo.clone(this.data);
}else{
if(wm.Variable.convertToHashMaps&&this.data._list&&wm.isHashMapType(this.type)){
var data={};
for(var i=0,l=this.getCount(),v;i<l;i++){
v=(this.getItem(i)||0).getData(_2f8);
data[v.name]=v.dataValue;
}
return data;
}else{
var data=[];
for(var i=0,l=this.getCount(),v;i<l;i++){
v=(this.getItem(i)||0).getData(_2f8);
if(v){
data.push(v);
}
}
return data;
}
}
}else{
if(_2f8&&this.isPrimitive&&this.data["dataValue"]!==undefined){
return this.data.dataValue;
}else{
if(this.isEmpty()){
return null;
}else{
var data={};
var _2f9=this.listDataProperties();
for(var i in _2f9){
var v=this.data[i];
if(wm.getDataConvertDates&&v instanceof Date){
v=v.getTime();
}else{
if(_2f9[i]&&_2f9[i].type=="Date"&&typeof v==="string"){
v=this.data[i]=new Date(v).getTime();
}
}
if(v!==undefined){
if(v instanceof wm.Variable){
if(v.isEmpty()){
v=null;
}else{
v=v.getData(_2f8);
}
}
if(v===undefined||(v!==null&&typeof v=="object"&&wm.isEmpty(v))){
continue;
}
data[i]=v;
}
}
if(!wm.isEmpty(data)){
return data;
}
}
}
}
}
},_getDataValue:function(n,_2fa){
if(!this.data){
this.data={};
}
var d,f;
if(this.isList){
f=this.getCursorItem();
d=f&&f.data;
}else{
d=this.data;
}
var v=d&&d[n],_2fb=this._dataSchema[n];
if(this._isVariableProp(n)&&(!v||(v._isStub&&v._isStub()))&&!_2fa){
v=d[n]=(f||this).marshallVariable(n,_2fb,v);
}else{
if(_2fb&&_2fb.type=="Date"){
v=d[n];
if(typeof v=="string"){
try{
v=d[n]=new Date(v).getTime();
}
catch(e){
}
}
}
}
return v;
},_setDataValue:function(n,v){
if(this._isNull&&v!==undefined){
this._setNull(false);
}
this.beginUpdate();
var o;
if(v===null||v===undefined){
o=this._getDataValue(n,true);
if(o===v){
this.endUpdate();
return;
}
}else{
o=this._getDataValue(n);
if(o===undefined&&v instanceof wm.Variable){
o=this.data[n]=this.createVariable({type:v.type,_subNard:true,name:n});
}
}
this.endUpdate();
if(!o&&v instanceof wm.Variable){
}
if(o instanceof wm.Variable){
if(this._updating){
o._updating++;
}
if(this.isList&&v instanceof wm.Variable&&!v.isList){
this.setIsList(false);
}
o.setData(v);
if(this._updating){
o._updating--;
}
return;
}
if(!(v instanceof wm.Variable)){
this.data[n]=v;
this.dataValueChanged(n,v);
}
},setDisabled:function(_2fc){
var _2fd=this.disabled;
this.disabled=Boolean(_2fc);
if(_2fd!=this.disabled){
this.notify();
}
},getCount:function(){
if(this._isNull){
return 0;
}
if(this.isList){
return (this.data&&this.data._list)?this.data._list.length:0;
}
return 1;
},getIsEmpty:function(){
return this.isEmpty();
},isEmpty:function(){
if(!this.data){
return true;
}
if(this.data._list){
return !Boolean(this.data._list.length);
}
for(var _2fe in this.data){
if(this.data[_2fe] instanceof wm.Variable){
if(!this.data[_2fe].isEmpty()){
return false;
}
}else{
if(this.data[_2fe]!=null){
return false;
}
}
}
return true;
},_isEmpty:function(obj){
for(var prop in obj){
if(obj.hasOwnProperty(prop)){
return false;
}
}
return true;
},_needItem:function(_2ff,_300){
if(_2ff>=this.getCount()&&_300===undefined){
return null;
}
var item=this.data._list[_2ff];
var data=_300;
if(!(item instanceof wm.Variable)){
data=_300||item;
item=this.createVariable({type:this.type,_subNard:true,itemIndex:_2ff});
this.data._list[_2ff]=item;
}
if(data!==undefined){
item.beginUpdate();
item.setData(data);
item.endUpdate();
}
return item;
},getItem:function(_301){
return this.isList&&this._needItem(_301)||!this.isList&&this;
},getItemData:function(_302){
if(!this.isList){
return;
}
var item=this.data._list[_302];
if(item instanceof wm.Variable){
return item.data;
}else{
return item;
}
},_populateItems:function(){
for(var i=0,c=this.getCount();i<c;i++){
this.getItem(i);
}
},forEach:function(_303){
var _304=this.getCount();
for(var i=0;i<_304;i++){
if(_303(this.getItem(i),i)===true){
break;
}
}
},map:function(_305){
var _306=[];
var _307=this.getCount();
for(var i=0;i<_307;i++){
_306.push(_305(this.getItem(i)));
}
return _306;
},filterItems:function(_308){
var _309=[];
this.forEach(function(item,_30a){
if(_308(item,_30a)){
_309.push(item.getData());
}
});
var v=new wm.Variable({type:this.type,owner:this});
v.setData(_309);
return v;
},sort:function(_30b){
this._populateItems();
var l=this.isList&&this.data&&this.data._list;
if(l){
if(typeof _30b=="function"){
l.sort(_30b);
}else{
l.sort(function(a,b){
var v1=a.getValue(_30b);
var v2=b.getValue(_30b);
return wm.compareStrings(v1,v2);
});
}
this.notify();
}
},setCursor:function(_30c){
this.cursor=Math.max(0,Math.min(this.getCount()-1,_30c));
this.notify();
},setNext:function(){
this.setCursor(this.cursor+1);
},setPrevious:function(){
this.setCursor(this.cursor-1);
},setFirst:function(){
this.setCursor(0);
},setLast:function(){
this.setCursor(this.getCount()-1);
},getIndexInOwner:function(){
if(this.owner instanceof wm.Variable&&this.owner.data._list){
return dojo.indexOf(this.owner.data._list,this);
}
return -1;
},getCursorItem:function(){
return this.getItem(this.cursor||0)||this;
},setItem:function(_30d,_30e){
this._setItem(_30d,_30e);
this.cursor=_30d;
this.notify();
},_setItem:function(_30f,_310){
if(this.isList){
this._needItem(_30f,_310);
}
this.onSetData();
},addItem:function(_311,_312){
this._addItem(_311,_312);
this.cursor=_312;
this.notify();
},_addItem:function(_313,_314){
if(this.isList){
var c=this.getCount();
if(_314>=0&&_314<c){
this.data._list.splice(_314,0,{});
}else{
_314=this.getCount();
}
this._setItem(_314,_313);
}
},removeItem:function(_315){
this._removeItem(_315);
this.cursor=0;
this.notify();
},_removeItem:function(_316){
if(this.isList){
this.data._list.splice(_316,1);
}
},getItemIndex:function(_317){
if(!this.isList){
return -1;
}
var list=(this.data||0)._list||[];
for(var i=0,l=list.length;i<l;i++){
if(_317==list[i]){
return i;
}
}
return -1;
},getItemIndexByPrimaryKey:function(_318,_319){
if(!this.isList||!_319||_319.length<1){
return -1;
}
var obj=_318;
if(obj instanceof wm.Variable){
obj=_318.getData();
}
var list=(this.data||0)._list||[];
for(var i=0,l=list.length;i<l;i++){
obj2=list[i] instanceof wm.Variable?list[i].getData():list[i];
var _31a=true;
for(var j=0;j<_319.length;j++){
var f=_319[j];
if(obj[f]!=obj2[f]){
_31a=false;
break;
}
}
if(_31a){
return i;
}
}
return -1;
},getQueriedItems:function(){
if(!this.queriedItems){
this.queriedItems=new wm.Variable({isList:true,type:this.type,name:"queriedItems"});
this.queriedItems.setOwner(this,true);
this.queriedItems.setDataSet(this);
}
return this.queriedItems;
},createQueryVar:function(){
if(this.owner instanceof wm.Variable==false){
this._query=new wm.Variable({type:this.type,isList:false,owner:this,name:"queryVar"});
}
},getQueryVar:function(){
if(!this._query){
this.createQueryVar();
}
return this._query;
},setQueryVar:function(_31b){
return this.setQuery(_31b);
},setQuery:function(_31c){
if(!this._query){
this.createQueryVar();
}
this._query.setData(_31c);
if(!this._query.isEmpty()){
return this.query(this._query.getData(),true);
}else{
this.getQueriedItems().setDataSet(this);
}
},query:function(_31d,_31e){
if(!this.isList){
return;
}
if(!_31d){
_31d={};
}
var _31f=_31d._maxResults||0;
delete _31d._maxResults;
var _320=this.getCount();
var _321=[];
if(_31d instanceof wm.Variable){
_31d=_31d.getData()||{};
}
for(var i=0;i<_320;i++){
var item=this.getItem(i);
if(this._queryItem(item,_31d,i)){
_321.push(item);
}
if(_31f){
if(_321.length>=_31f){
break;
}
}
}
if(_31e){
var v=this.getQueriedItems();
}else{
var v=new wm.Variable({type:this.type,isList:true,name:"QueryResults"});
v.setOwner(this,true);
}
v.setData(_321);
if(_31f){
_31d._maxResults=_31f;
}
return v;
},_queryItem:function(_322,_323,_324){
if(dojo.isArray(_323)){
return dojo.some(_323,function(_325){
return this._queryItem2(_322,_325,_324);
},this);
}else{
return this._queryItem2(_322,_323,_324);
}
},_queryItem2:function(_326,_327,_328){
var w="*";
for(var key in _327){
var _329=true;
var _32a=true;
var a=_326.getValue(key);
var b=_327[key];
if(typeof b=="function"){
return b(a);
}else{
if(b!==null&&typeof b=="object"&&wm.typeManager.isStructuredType(_326._dataSchema[key].type)){
var _32b=(!a||a instanceof wm.Variable&&a.isEmpty()||a instanceof wm.Variable===false&&wm.isEmpty(a));
var _32c=(!b||b instanceof wm.Variable&&b.isEmpty()||b instanceof wm.Variable===false&&wm.isEmpty(b));
if(_32b!=_32c){
return false;
}
if(_32b&&_32c){
continue;
}
if(a instanceof wm.Variable&&a.isList){
continue;
}else{
var _32d=this._queryItem(a,b,0);
if(!_32d){
return false;
}
continue;
}
}else{
if(typeof b=="boolean"){
if(Boolean(b)!=Boolean(a)){
return false;
}else{
continue;
}
}else{
var _32e=String(b);
if(_32e.charAt(0)==w){
b=b.substring(1);
_329=false;
}else{
if(_32e.charAt(0)==">"){
var _32f=false;
if(_32e.charAt(1)=="="){
_32f=true;
b=b.substring(2);
}else{
b=b.substring(1);
}
if(typeof a=="number"){
b=Number(b);
}else{
if(typeof a=="string"){
b=b.toLowerCase();
}
}
if(_32f){
if(a<b){
return false;
}
}else{
if(a<=b){
return false;
}
}
continue;
}else{
if(_32e.charAt(0)=="<"){
var _32f=false;
if(_32e.charAt(1)=="="){
_32f=true;
b=b.substring(2);
}else{
b=b.substring(1);
}
if(typeof a=="number"){
b=Number(b);
}else{
if(typeof a=="string"){
b=b.toLowerCase();
}
}
if(_32f){
if(a>b){
return false;
}
}else{
if(a>=b){
return false;
}
}
continue;
}else{
if(_32e.charAt(0)=="!"){
b=b.substring(1);
if(typeof a=="number"){
b=Number(b);
}else{
if(typeof a=="string"){
b=b.toLowerCase();
}
}
var _330=true;
}
}
}
}
}
}
}
if(b==w){
if(_330){
return false;
}else{
continue;
}
}
if(dojo.isString(a)&&dojo.isString(b)){
if(b.charAt(b.length-1)==w){
b=b.slice(0,-1);
_32a=false;
}
a=a.toLowerCase();
b=b.toLowerCase();
var _331=a.indexOf(b);
var _332=true;
if(_331==-1){
_332=false;
}else{
if(_329&&_32a&&a!=b){
_332=false;
}else{
if(_329&&!_32a&&_331>0){
_332=false;
}else{
if(!_329&&_32a&&a.lastIndexOf(b)+b.length!=a.length){
_332=false;
}
}
}
}
if(_330){
_332=!_332;
}
if(!_332){
return false;
}
}else{
if(a!==b){
if(_330){
continue;
}else{
return false;
}
}else{
if(_330){
return false;
}
}
}
}
return true;
},dataRootChanged:function(){
if(this._subNard||!this.owner){
return;
}
var o=this.owner,p,root=this.getRoot();
while(o&&o!=root){
p=o;
o=o&&o.owner;
}
var n=p?p.getRuntimeId():this.getRuntimeId();
var _333=n+"-rootChanged";
wm.logging&&undefined;
dojo.publish(_333,[n]);
var root=this.getRoot().getRuntimeId();
if(root&&root.indexOf(".")&&n.indexOf(root)==0){
var tmpn=n.substring(root.length);
tmpn=root.substring(root.lastIndexOf(".")+1)+tmpn;
var _334=tmpn+"-rootChanged";
if(_334!=_333){
wm.logging&&undefined;
dojo.publish(_334,[n]);
}
}
wm.logging&&undefined;
},dataOwnerChanged:function(){
if(this._updating||!this.owner){
return;
}
var n=this.getRuntimeId();
if(!n){
return;
}
var _335=n+"-ownerChanged";
wm.logging&&undefined;
dojo.publish(_335,[n]);
var root=this.getRoot();
if(!root){
return;
}
var _336=root.getRuntimeId();
while(_336&&_336.indexOf(".")&&n.indexOf(_336)==0){
var tmpn=n.substring(_336.length);
tmpn=_336.substring(_336.lastIndexOf(".")+1)+tmpn;
var _337=tmpn+"-ownerChanged";
if(_337!=_335){
wm.logging&&undefined;
dojo.publish(_337,[n]);
_336=tmpn;
}else{
break;
}
}
wm.logging&&undefined;
if(this._allowLazyLoad){
this.dataRootChanged();
}
var v=this.getCursorItem();
for(var i in v.data){
wm.fire(v.data[i],"dataOwnerChanged");
}
},dataChanged:function(){
if(this._updating||!this.owner){
return;
}
var id=this.getRuntimeId();
if(!id){
return;
}
var _338=[id,"-changed"].join("");
wm.logging&&undefined;
dojo.publish(_338,[this]);
var root=this.getRoot();
if(!root){
return;
}
var _339=root.getRuntimeId();
if(_339&&_339.indexOf(".")&&id.indexOf(_339)==0){
var tmpn=id.substring(_339.length);
tmpn=_339.substring(_339.lastIndexOf(".")+1)+tmpn;
var _33a=tmpn+"-changed";
if(_33a!=_338){
wm.logging&&undefined;
dojo.publish(_33a,[this]);
}
}
if(this._subNard){
wm.fire(this.owner,"dataChanged");
}
wm.logging&&undefined;
},updatePermanentMemory:function(){
var _33b=this.getParentPage();
if(_33b&&_33b._loadingPage){
return;
}
if(window["PhoneGap"]&&this.saveInPhonegap){
var _33c=dojo.toJson(this.getData());
window.localStorage.setItem(this.getRuntimeId(),_33c);
}else{
if(this.saveInCookie){
var _33c=dojo.toJson(this.getData());
dojo.cookie(this.getRuntimeId(),_33c);
}
}
},dataValueChanged:function(_33d,_33e){
if(!this._updating&&this.owner){
wm.Component.prototype.valueChanged.call(this,_33d,_33e);
this.notify();
this.updatePermanentMemory();
}
},valueChanged:function(_33f,_340){
if(!this.type||this.type==this.declaredClass){
return;
}
if(!this.isDataProp(_33f)){
this.inherited(arguments);
}
},getDataSet:function(){
return this.dataSet||this;
},_isVariableProp:function(_341){
var _342=this._dataSchema[_341];
return Boolean(_342&&(_342.isList||wm.typeManager.isStructuredType(_342.type)));
},isDataProp:function(_343){
return _343 in this._dataSchema;
},_getValue:function(_344){
return this.isDataProp(_344)?this._getDataValue(_344):this.inherited(arguments);
},_setValue:function(n,v){
if((this._isDesignLoaded&&this.schema[n]||0).defaultBindTarget||!this.isDataProp(n)){
this.inherited(arguments);
}else{
this._setDataValue(n,v);
}
},createVariable:function(_345,_346){
if((window["studio"]||djConfig.isDebug)&&_345.type&&!wm.typeManager.getType(_345.type)){
app.toastWarning("A variable of type "+_345.type+" has been created, but that type does not exist");
}
_345._temporaryComponent=1;
if(!_345.name){
_345.name=this._uniqueSubnardId;
this._uniqueSubnardId++;
}
var v=new wm.Variable(_345);
v.owner=this;
return v;
},marshallVariable:function(_347,_348,_349){
var p=_347,v=_349,t=_348.isList?"["+_348.type+"]":_348.type;
if(!(v instanceof wm.Variable)){
v=this.createVariable({name:p,type:t,_subNard:true},p);
if(_349||_349===null){
v.beginUpdate();
v.setData(_349);
v.endUpdate();
}
}
if(v._isStub()&&this.canLazyLoad(_348)){
this.beginUpdate();
this.lazyLoadData(p,v);
this.endUpdate();
}
return v;
},_isStub:function(){
if(!this._nostub&&!this._isNull){
if(this.data===undefined){
return true;
}
if(this.isList||this.hasList()){
return !this.data._list||!this.data._list.length;
}
if(this._greedyLoadProps){
var _34a=this._dataSchema,s;
for(var i in _34a){
s=_34a[i];
if(!s.isList&&(this.data[i]===undefined)&&!wm.typeManager.isStructuredType(s.type)){
return true;
}
}
}else{
if(wm.isEmpty(this.data)){
return true;
}
}
}
this._nostub=true;
return false;
},lazyLoadData:function(_34b,_34c){
var s=wm.getRuntimeService(this),v=_34c;
try{
if(s.ready){
var d=this.getData();
if(!wm.isEmpty(d)){
var args=[null,this.type,d,{properties:[_34b]}];
wm.logging&&undefined;
var f=function(r){
var _34d=r&&r[_34b];
if(_34d){
v.beginUpdate();
v.setData(_34d);
v.endUpdate();
}
};
var d;
if(this.async){
d=s.requestAsync("read",args);
}else{
d=s.requestSync("read",args);
}
d.addCallback(dojo.hitch(this,function(){
f();
}));
}
}
}
catch(x){
}
},canLazyLoad:function(_34e){
if(this._updating||!wm.typeManager.getLiveService(this.type)||!wm.typeManager.getLiveService(_34e.type)){
return;
}
if(this.isDesignLoaded()&&!studio.isLiveLayoutReady()){
return false;
}
var o=this;
while(o instanceof wm.Variable){
if(!o._allowLazyLoad||wm.disableLazyLoad){
return false;
}
o=o.owner;
}
return _34e.isList||this._hasRequiredReadData();
},_hasRequiredReadData:function(){
var ds=this._dataSchema,s,d;
for(var i in ds){
s=ds[i];
if(s.include&&dojo.indexOf(s.include,"read")>-1){
d=this.data[i];
if(d===undefined||d===null){
return false;
}
}
}
return true;
},toString:function(_34f){
var t=_34f||"";
var _350=this.isEmpty();
t+="; "+wm.getDictionaryItem("wm.Variable.toString_TYPE",{type:this.type})+"; "+wm.getDictionaryItem("wm.Variable.toString_ISEMPTY",{isEmpty:_350});
return this.inherited(arguments,[t]);
},_end:0});
wm.Variable.extend({_includeListProps:false,createVariable:function(_351,_352){
_351=_351||{};
if((window["studio"]&&this.isDesignLoaded()||!window["studio"]&&djConfig.isDebug)&&_351.type&&!this._dataSchema){
app.alert(wm.getDictionaryItem("wm.Variable.TYPE_INVALID",{type:_351.type.replace(/[\[\]]/g,""),name:this.getRuntimeId()}));
}
if(!_351.name){
_351.name=this._uniqueSubnardId;
this._uniqueSubnardId++;
}
_351._temporaryComponent=1;
_351.liveView=this.liveView;
var r=this._rootField,n=_352;
_351._rootField=r&&_352?r+"."+_352:(_352||"");
var v=new wm.Variable(_351);
v.setOwner(this,true);
return v;
},setDataSet:function(_353){
this.dataSet="";
if(_353 instanceof wm.Variable){
this._rootField=_353._rootField||"";
if(_353.liveView){
this.setLiveView(_353.liveView);
}
this.setType(_353?_353.type:"wm.Variable",true);
this.dataSet=_353;
this.cursor=_353.cursor;
}
this.setData(_353);
},_getEagerProps:function(_354){
var v=_354,_355=this.liveView?this.liveView.getSubRelated(v._rootField):[],_356=wm.typeManager.getTypeSchema(v.type);
return this._includeListProps?_355:dojo.filter(_355,function(r){
return !wm.typeManager.isPropInList(_356,r);
});
},_getLoadProps:function(_357,_358){
return [_357].concat(dojo.map(this._getEagerProps(_358),function(r){
return [_357,r].join(".");
}));
},lazyLoadData:function(_359,_35a){
var s=wm.getRuntimeService(this),v=_35a;
try{
if(s.ready){
var d=this.getData();
if(!wm.isEmpty(d)){
var _35b=this._getLoadProps(_359,v),args=[null,this.type,d,{properties:_35b}];
wm.logging&&undefined;
var f=function(r){
var _35c=r&&r[_359];
if(_35c){
v.beginUpdate();
v.setData(_35c);
v.endUpdate();
}
};
if(this.async){
s.requestAsync("read",args,f);
}else{
s.requestSync("read",args);
f(s.result);
}
}
}
}
catch(x){
wm.logging&&undefined;
}
},setLiveView:function(_35d){
this.liveView=_35d;
},getViewType:function(){
return this.liveView&&this.liveView.getSubType(this._rootField);
},getViewFields:function(){
return (this.liveView&&this.liveView.getSubView(this._rootField))||[];
},getViewListFields:function(){
return (this.liveView&&this.liveView.getListView(this._rootField))||[];
},getViewRelated:function(){
return (this.liveView&&this.liveView.getSubRelated(this._rootField))||[];
}});
if(0){
wm.Variable.extend({getFeatures:function(){
return {"dojo.data.api.Read":true};
},getValue:function(_35e,_35f,_360){
if(this.isItem(_35e)){
if(_35f=="_id"){
return _35e.getIndexInOwner();
}
var _361=_35e.getValue(_35f);
if(_361===undefined){
_361=_360;
}
return _361;
}else{
return this.inherited(arguments);
}
},getValues:function(_362,_363){
if(this.isItem(_362)&&typeof _363=="string"){
var _364=this.getValue(_362,_363);
return [_364];
}else{
throw "getValues must have a wm.Variable as input; and inAttribute must be a String; perhaps you want getValue?";
}
},getAttributes:function(_365){
if(this.isItem(_365)){
var type=wm.typeManager.getType(_365.type);
var _366=[];
if(type&&type.fields){
for(var _367 in type.fields){
_366.push(_367);
}
}
if(!this.identity){
_366.push("_id");
}
return _366;
}else{
throw "getAttribute must have a wm.Variable as an input";
}
},hasAttribute:function(_368,_369){
if(this.isItem(_368)&&typeof _369=="string"){
var _36a=_368.getValue(_368,_369);
return !(_36a===undefined||_36a===null);
}else{
throw "getValues must have a wm.Variable as input; and inAttribute must be a String.";
}
},containsValue:function(_36b,_36c,_36d){
var _36e=this.getValues(_36b,_36c);
return dojo.indexOf(_36e,_36d)!=-1;
},isItem:function(_36f){
return _36f instanceof wm.Variable;
},isItemLoaded:function(_370){
return false;
},loadItem:function(_371){
return null;
},_fetchItems:function(_372,_373,_374){
var opts=_372.queryOptions;
var _375=[];
var i,key;
if(_372.query){
var _376=this.getCount();
for(i=0;i<_376;++i){
var _377=true;
var _378=this.getItem(i);
if(_378 instanceof wm.Variable==false){
_377=false;
}else{
for(key in _372.query){
value=_372.query[key];
if(value!="*"&&!this._containsValue(_378,key,value,opts)){
_377=false;
}
}
}
if(_377){
_375.push(_378);
}
}
_373(_375,_372);
}else{
var _376=this.getCount();
for(i=0;i<_376;++i){
var item=this.getItem(i);
if(item!==null){
_375.push(item);
}
}
_373(_375,_372);
}
},_containsValue:function(item,_379,_37a,opts){
var _37b=String(_37a);
var _37c=item.getValue(_379);
var _37d=String(_37c);
if(_37a===_37c){
return true;
}
if(opts.ignoreCase){
if(_37b.toLowerCase()===_37d.toLowerCase()){
return true;
}
}
if(!opts.exactMatch){
if(_37b.indexOf(_37d)!=-1){
return true;
}
}
return false;
},close:function(_37e){
},getLabel:function(_37f){
if(this.displayField){
return _37f.getValue(this.displayField);
}else{
if(this.displayExpression){
return wm.expression.getValue(this.displayExpression,_37f,this.getRoot());
}else{
return undefined;
}
}
},getLabelAttributes:function(_380){
if(this.displayField){
return [this.displayField];
}else{
if(this.displayExpression){
var _381=this.displayExpression.match(wm.expression._getSourceRegEx);
for(var i=0;i<_381.length;i++){
_381[i]=_381[i].substring(2,_381[i].length-1);
}
return _381;
}else{
return this.getAttributes();
}
}
},_end:0});
wm.Variable.extend({getFeatures:function(){
return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
},getIdentity:function(_382){
if(this.identity){
return _382.getValue(this.identity);
}else{
return _382.getIndexInOwner();
}
},getIdentityAttributes:function(_383){
if(this.identity){
return [this.identity];
}else{
return ["_id"];
}
},fetchItemByIdentity:function(_384){
var item=this.getItem(_384.identity);
if(item){
_384.onItem.call(_384.scope||dojo.global,item,_384);
}else{
_384.onError.call(_384.scope||dojo.global,_384);
}
},_end:0});
wm.Variable.extend({forEachItem:function(_385,_386){
if(!_386){
option={count:0,stopOnTrue:false};
}
var _387=_386.stopOnTrue;
var _388=this.getCount();
for(var i=_386.start||0;i<_388;i++){
var item=this.getItem(i);
if(_385(item)&&_387){
return;
}
}
},get:function(id){
var keys=this.primaryKeyFields.split(/\s*,\s*/);
var _389={};
if(keys.length==0){
return null;
}
for(var i=0;i<keys.length;i++){
if(id instanceof wm.Variable){
_389[keys[i]]=id.getValue(keys[i]);
}else{
if(id!==null&&typeof id=="object"){
_389[keys[i]]=id[keys[i]];
}else{
_389[keys[i]]=id;
}
}
}
return this.query(_389,{limit:1}).matches[0];
},query:function(_38a,_38b){
var _38c=[];
var _38d=function(val1,val2,_38e){
if(_38e.ignoreCase){
val1=val1.toLowerCase();
val2=val2.toLowerCase();
}
if(val1==val2){
return true;
}else{
if(!_38e.exactMatch&&typeof val1=="string"&&val1.indexOf(val2)==0){
return true;
}
}
return false;
};
this.forEachItem(function(item){
for(key in _38a){
var _38f=_38a[key];
if(_38f instanceof wm.Variable){
_38f=_38f.getValue(_38a[key]);
}else{
if(_38f!=null&&typeof _38f=="object"){
_38f=_38f[_38a[key]];
}
}
if(!_38d(_38f,item.getValue(_38a[key]),_38b)){
return false;
}
}
result.push(item);
return _38b.count?result.length<_38b.count:false;
},{stopOnTrue:true,start:_38b.start||0});
return {total:result.length,matches:result,forEach:function(_390,_391){
return dojo.forEach(_38c,_390,_391);
},filter:function(_392,_393){
return dojo.filter(_38c,_392,_393);
},map:function(_394,_395){
return dojo.map(_38c,_394,_395);
}};
},put:function(data,_396){
this.addItem(data);
},remove:function(id){
var item=this.get(id);
if(item){
var _397=this.getItemIndex(item);
if(_397!=-1){
this.removeItem(_397);
}
}
},getIdentity:function(item){
var keys=this.primaryKeyFields.split(/\s*,\s*/);
var _398="";
for(var i=0;i<keys.length;i++){
if(_398){
_398+="|";
}
_398+=item.getValue(keys[i]);
}
return _398;
},getChildren:function(item){
var _399=[];
var _39a=this._dataSchema;
for(var i in _39a){
var s=_39a[i];
if(s.isList||wm.typeManager.isStructuredType(s.type)){
_399.push(item.getValue(i));
}
}
return {total:_399.length,matches:_399,forEach:function(_39b,_39c){
return dojo.forEach(results,_39b,_39c);
},filter:function(_39d,_39e){
return dojo.filter(results,_39d,_39e);
},map:function(_39f,_3a0){
return dojo.map(results,_39f,_3a0);
}};
}});
}
}
if(!dojo._hasResource["wm.base.components.Service"]){
dojo._hasResource["wm.base.components.Service"]=true;
dojo.provide("wm.base.components.Service");
dojo.declare("wm.Service",wm.Component,{_operations:{},result:null,error:null,getOperationsList:function(){
var l=[];
for(var i in this._operations){
l.push(i);
}
l.sort();
return l;
},makePropEdit:function(_3a1,_3a2,_3a3){
var prop=this.schema?this.schema[_3a1]:null;
var name=(prop&&prop.shortname)?prop.shortname:_3a1;
switch(_3a1){
case "operation":
return new wm.SelectMenu(dojo.mixin(_3a3,{options:this.getOperationsList()}));
}
},getOperation:function(_3a4){
return this._operations[_3a4];
},initService:function(){
},invoke:function(_3a5,_3a6,_3a7){
var d=new dojo.Deferred(),m=this[_3a5];
if(m){
var _3a8=m.apply(this,_3a6);
this.onResult();
wm.onidle(function(){
d.callback(_3a8);
});
}else{
this.onError();
wm.onidle(function(){
d.errback("operation: "+_3a5+" does not exist.");
});
}
return d;
},onResult:function(_3a9){
this.error=null;
return this.result=_3a9;
},onError:function(_3aa){
this.result=null;
return this.error=_3aa;
}});
wm.services={byName:{},_services:{},add:function(_3ab){
return wm.services.byName[_3ab.name]=_3ab;
},remove:function(_3ac){
var n=_3ac.name;
this._destroyService(n);
delete wm.services._services[n];
delete wm.services.byName[n];
},getNamesList:function(){
var l=[],_3ad=wm.services.byName,s;
for(var i in _3ad){
s=_3ad[i];
if(!s.clientHide){
l.push(i);
}
}
l.sort();
return l;
},forEach:function(_3ae){
wm.forEach(this.byName,function(s){
_3ae(s);
});
},clear:function(){
var n=wm.services.byName,s;
for(var i in n){
s=n[i];
if(!s.isClientService){
this.remove(s);
}else{
this._destroyService(s);
}
}
},getService:function(_3af,_3b0){
var s;
if(_3af){
if(this._services[_3af]){
s=this._services[_3af];
}else{
s=this._services[_3af]=this._createService(_3af,_3b0);
}
if(!s._service){
s.initService();
}
}
return s;
},_createService:function(_3b1,_3b2){
var _3b3="wm.JsonRpcService",s=this.byName[_3b1];
if(!s){
s=this.add({name:_3b1,ctor:_3b3,clientHide:_3b2});
}
var ctor=dojo.getObject(s.ctor||_3b3);
var _3b4=window["studio"]?studio.application||studio._application:app;
var _3b5=new ctor({name:_3b1,service:_3b1,owner:_3b4});
return _3b5;
},_destroyService:function(_3b6){
wm.fire(this._services[_3b6.name],"destroy");
}};
wm.Object.extendSchema(wm.Service,{operation:{type:"string"}});
}
if(!dojo._hasResource["wm.base.components.ServiceQueue"]){
dojo._hasResource["wm.base.components.ServiceQueue"]=true;
dojo.provide("wm.base.components.ServiceQueue");
dojo.declare("wm.ServiceQueue",wm.Component,{services:"",init:function(){
this._services=[];
this._serviceConnections=[];
this.inherited(arguments);
},getServicesCount:function(){
return this._services&&this._services.length;
},getServicesList:function(){
for(var i=0,l=[],ss=this.services.split(","),s,v;(s=ss[i]);i++){
v=this.getValueById(dojo.string.trim(s));
if(v){
l.push(v);
}
}
return l;
},update:function(){
this.beginUpdate();
},beginUpdate:function(){
this._services=this.getServicesList();
this.connectServices();
this._currentService=0;
this.updateNextService();
},getCurrentService:function(){
return this._services[this._currentService];
},updateNextService:function(){
if(this._currentService<this.getServicesCount()){
var s=this.getCurrentService();
this._currentService++;
s.update();
}else{
this.completeUpdate();
}
},completeUpdate:function(){
this.disconnectServices();
},abortUpdate:function(){
this.disconnectServices();
},connectServices:function(){
this.disconnectServices();
dojo.forEach(this._services,dojo.hitch(this,function(s){
this._serviceConnections.push(dojo.connect(s,"onResult",this,"updateNextService"));
this._serviceConnections.push(dojo.connect(s,"onError",this,"abortUpdate"));
}));
},disconnectServices:function(){
dojo.forEach(this._serviceConnections,function(s){
dojo.disconnect(s);
});
}});
wm.ServiceQueue.extend({getAvailableServicesList:function(){
var d=wm.listComponentIds([studio.application,studio.page],wm.ServiceVariable);
d=d.concat(wm.listComponentIds([studio.application,studio.page],wm.NavigationCall));
var i=dojo.indexOf(d,this.owner.getId());
if(i!=-1){
d.splice(i,1);
}
return d;
},write:function(_3b7){
return this.services?this.inherited(arguments):null;
}});
}
if(!dojo._hasResource["wm.base.components.ServiceCall"]){
dojo._hasResource["wm.base.components.ServiceCall"]=true;
dojo.provide("wm.base.components.ServiceCall");
dojo.declare("wm.ServiceCall",null,{autoUpdate:false,startUpdate:false,_startUpdateComplete:false,service:"",operation:"",_operationInfo:{},disabled:false,inFlightBehavior:"none",destroy:function(){
delete this._inFlightBacklog;
wm.fire(this._requester,"cancel");
delete this._requester;
this.inherited(arguments);
},init:function(){
this.inherited(arguments);
this._inFlightBacklog=[];
if(this._isDesignLoaded){
this.subscribe("wmservices-changed",dojo.hitch(this,"servicesChanged"));
}
},postInit:function(){
this.inherited(arguments);
this.connectStartUpdate();
if(!this.$.queue){
new wm.ServiceQueue({name:"queue",owner:this});
}
this.initInput();
this.setService(this.service);
this._setOperation(this.operation);
},initInput:function(){
this.input=this.$.input;
if(!this.input){
this.input=this.createInput();
}
this.subscribe(this.input.getRuntimeId()+"-changed",this,"inputChanged");
},setInput:function(_3b8){
if(this.$.input){
this.$.input.setDataSet(_3b8);
}
},setService:function(_3b9){
if(this._inSetService){
return;
}
try{
this._inSetService=true;
this.service=_3b9;
var _3ba=this.getOwnerApp();
this._service=wm.services.getService(this.service,_3ba&&_3ba.declaredClass=="StudioApplication")||new wm.Service({});
wm.fire(this._service,"setServiceCall",[this]);
this._setOperation(this.operation,1);
}
catch(e){
}
finally{
delete this._inSetService;
}
},set_service:function(_3bb){
this.setService(_3bb);
var s=this._service;
var _3bc=s&&s.getOperation(this.operation);
if(!_3bc){
var _3bd=s&&s.getOperationsList();
var _3be=_3bd?_3bd[0]:"";
if(_3be&&_3be!=this.operation){
this.set_operation(_3be);
}
}
studio.inspector.refocusEditor();
},wmTypesChanged:function(){
var _3bf=this.getOwnerApp();
this._service=wm.services.getService(this.service,_3bf&&_3bf.declaredClass=="StudioApplication")||new wm.Service({});
wm.fire(this._service,"setServiceCall",[this]);
this._setOperation(this.operation,1);
if(this.setType){
this.setType(this.type);
}
if(studio.isSelected(this)){
studio.inspect(this);
}
},_setOperation:function(_3c0,_3c1){
this.operation=_3c0;
this._operationInfo=this.getOperationInfo(this.operation);
this.operationChanged(_3c1);
},setOperation:function(_3c2){
this._setOperation(_3c2);
this.doAutoUpdate();
},getOperationInfo:function(_3c3){
return (this._service&&this._service.getOperation(_3c3))||{};
},operationChanged:function(_3c4){
this.input.operationChanged(this.operation,this._operationInfo.parameters);
},createInput:function(){
var i=new wm.ServiceInput({name:"input",owner:this});
i.operationChanged(this.operation,this._operationInfo.parameters);
return i;
},inputChanged:function(){
this.doAutoUpdate();
},connectStartUpdate:function(){
if(this.owner&&this.owner instanceof wm.Application){
this.doStartUpdate();
}else{
if(this.owner&&this.owner.start){
this.connectOnce(this.owner,"onStart",this,"doStartUpdate");
}
}
},setAutoUpdate:function(_3c5){
this.autoUpdate=_3c5;
this.doAutoUpdate();
},setStartUpdate:function(_3c6){
this.startUpdate=_3c6;
if(this.startUpdate&&!this._loading&&this.isDesignLoaded()){
this.updateInternal();
}
},canStartUpdate:function(){
return this.startUpdate&&!this._loading&&(!window["PhoneGap"]||!this.saveInPhoneGap||this.isEmpty()||this.autoUpdate);
},doStartUpdate:function(){
if(this.canStartUpdate()){
this.updateInternal();
this._startUpdateComplete=true;
}
},canAutoUpdate:function(){
return (this.autoUpdate&&!this._loading&&(!this.startUpdate||this._startUpdateComplete||this.isDesignLoaded()));
},doAutoUpdate:function(){
if(this.canAutoUpdate()){
wm.job(this.getRuntimeId()+".doAutoUpdate",wm.isMobile?20:1,dojo.hitch(this,"updateInternal"));
}
},update:function(){
return this._isDesignLoaded?this.doDesigntimeUpdate():this._update();
},updateInternal:function(){
return this._isDesignLoaded?this.doDesigntimeUpdate():this._update();
},addToBacklog:function(){
var d=new dojo.Deferred();
if(this.inFlightBehavior=="executeLast"){
this._inFlightBacklog.pop();
}
if(this.inFlightBehavior=="executeLast"||this.inFlightBehavior=="executeAll"){
this._inFlightBacklog.push({args:this.getArgs(),operation:this.operation,deferred:d,eventChain:app.debugDialog?app.debugDialog.cacheEventChain():undefined});
}else{
d.errback("Unable to fire "+this.toString()+" because it is already firing, and the inFlightBehavior property is unset");
}
return d;
},_update:function(){
if(this.canUpdate()){
if(this._requester&&!this._isDesignLoaded){
var d=this.addToBacklog();
return d;
}
this.onBeforeUpdate(this.input);
wm.cancelJob(this.getRuntimeId()+".doAutoUpdate");
return this.request();
}else{
var _3c7=this.disabled?this.getRuntimeId()+" tried to fire but its disabled property prevented it":this.getRuntimeId()+".canUpdate() returns false";
this.blocked(_3c7);
var d=new dojo.Deferred();
d.errback(_3c7);
return d;
}
},canUpdate:function(){
var info={canUpdate:this._getCanUpdate()};
this.onCanUpdate(info);
return info.canUpdate;
},_getCanUpdate:function(){
return this._service&&this.operation&&!this.disabled;
},getArgs:function(){
return this.input.getArgs();
},getOperationType:function(){
var _3c8=this._service;
var _3c9;
if(_3c8){
_3c9=_3c8._operations[this.operation];
}
if(_3c9){
return _3c9.operationType;
}else{
return "";
}
},request:function(_3ca,_3cb,_3cc){
var args;
try{
args=_3ca||this.getArgs();
}
catch(e){
this.error(e);
return;
}
var d=this._requester=this._service.invoke(_3cb||this.operation,args,this.owner,this);
if(_3cc){
d.then(function(_3cd){
_3cc.callback(_3cd);
},function(_3ce){
_3cc.errback(_3ce);
});
}
return this.processRequest(d);
},blocked:function(_3cf){
},processRequest:function(_3d0){
var d=_3d0;
if(d){
d.addCallbacks(dojo.hitch(this,"result"),dojo.hitch(this,"error"));
return d;
}
},result:function(_3d1){
this._requester=false;
this.processResult(_3d1);
this._updateNextInQueue();
return _3d1;
},_updateNextInQueue:function(){
if(!this._isDesignLoaded&&this._inFlightBacklog){
if(this._inFlightBacklog.length){
wm.onidle(this,function(){
var _3d2=this._inFlightBacklog.shift();
if(_3d2){
this.request(_3d2.args,_3d2.operation,_3d2.deferred);
}
});
}else{
this.onInflightBacklogComplete();
}
}
},onInflightBacklogComplete:function(){
},processResult:function(_3d3){
this.onResult(_3d3);
this.onSuccess(_3d3);
if(!this.isDestroyed&&this.$.queue){
this.$.queue.update();
}
},error:function(_3d4){
this._requester=false;
this.processError(_3d4);
this._updateNextInQueue();
return _3d4;
},processError:function(_3d5){
this.onResult(_3d5);
this.onError(_3d5);
},_onCanUpdateBeforeStart:1,onCanUpdate:function(_3d6){
},onBeforeUpdate:function(_3d7){
},onResult:function(_3d8){
},onSuccess:function(_3d9){
},onError:function(_3da){
}});
dojo.declare("wm.ServiceInput",wm.Variable,{_allowLazyLoad:false,_getSchemaForType:function(_3db){
return this.owner&&this.owner._operationInfo?this.owner._operationInfo.parameters:null;
},isDataProp:function(_3dc){
return wm.isEmpty(this._dataSchema)||(_3dc in this._dataSchema);
},operationChanged:function(_3dd,_3de){
this.setType(_3dd+"Inputs");
this.setDataSchema(_3de);
if(this.$.binding&&_3de){
this.$.binding.refresh();
}
},getArgsHash:function(){
var data=this.getData(),args={},d;
for(var p in this._dataSchema){
args[p]=(data[p]===undefined||data[p]===null)?"":data[p];
}
return args;
},getArgs:function(){
wm.Variable.convertToHashMaps=true;
try{
var data=this.getData(true),args=[],d;
}
catch(e){
}
wm.Variable.convertToHashMaps=false;
for(var p in this._dataSchema){
if(data){
if(data[p] instanceof Date){
d=data[p].getTime();
}else{
d=data[p];
}
}else{
d=undefined;
}
args.push(d!==undefined?d:null);
}
return args;
}});
wm.ServiceCall.extend({clearInput:"(clear input)",updateNow:"(update now)",queue:"(serviceCalls)",servicesChanged:function(){
if(this.service){
var _3df=this.getOwnerApp();
this._service=wm.services.getService(this.service,_3df&&_3df.declaredClass=="StudioApplication");
if(!this._service){
this._service=new wm.Service({});
}
this._setOperation(this.operation,1);
}
},getUniqueName:function(_3e0){
if(_3e0==="input"){
return "input";
}
return this.inherited(arguments);
},doDesigntimeUpdate:function(){
this._designTime=true;
return studio.makeLiveDataCall(dojo.hitch(this,"_update"));
},doClearInput:function(){
this.input.destroy();
this.input=this.createInput();
},set_operation:function(_3e1){
this.setOperation(_3e1);
if(this.isDesignLoaded()&&dojo.indexOf(studio.selected,this)!=-1){
if(this.service=="securityService"){
this.startUpdate=_3e1!="logout";
}
studio.inspector.refocusEditor();
}
},getServicesList:function(){
return [""].concat(wm.services.getNamesList()||[]);
},showQueueDialog:function(){
var d=wm.ServiceQueue.dialog,q=this.$.queue;
if(d){
d.page.binding=q;
d.page.update();
}else{
wm.ServiceQueue.dialog=d=new wm.PageDialog({name:"queueDialog",owner:studio,contentWidth:600,contentHeight:400,hideControls:true,pageName:"QueueDialog",pageProperties:{binding:q}});
}
d.show();
},makePropEdit:function(_3e2,_3e3,_3e4){
var prop=this.schema?this.schema[_3e2]:null;
var name=(prop&&prop.shortname)?prop.shortname:_3e2;
switch(_3e2){
case "service":
return new wm.SelectMenu(dojo.mixin(_3e4,{options:this.getServicesList()}));
case "operation":
var s=this._service,_3e5=s&&s.getOperation(_3e3),_3e6=s&&s.getOperationsList();
if(!_3e5){
_3e3=_3e6?_3e6[0]:"";
if(_3e3&&_3e3!=this.operation){
this.set_operation(_3e3);
}
}
if(_3e6){
return new wm.SelectMenu(dojo.mixin(_3e4,{options:_3e6}));
}
break;
}
return this.inherited(arguments);
}});
wm.ServiceInputVariable=wm.ServiceInput;
}
if(!dojo._hasResource["wm.base.components.ServiceVariable"]){
dojo._hasResource["wm.base.components.ServiceVariable"]=true;
dojo.provide("wm.base.components.ServiceVariable");
dojo.declare("wm.ServiceVariable",[wm.Variable,wm.ServiceCall],{loadingDialog:null,downloadFile:false,_page:0,maxResults:0,designMaxResults:50,transposeHashMap:function(_3e7){
var data=[];
wm.forEachProperty(_3e7,function(_3e8,_3e9){
data.push({name:_3e9,dataValue:_3e8});
});
return data;
},processResult:function(_3ea){
if(wm.isHashMapType(this.type)){
_3ea=this.transposeHashMap(_3ea);
}
this.setData(_3ea);
if(this.service=="securityService"&&this.operation=="logout"){
wm.logoutSuccess();
}
this.inherited(arguments);
},processError:function(_3eb){
if(_3eb&&_3eb.message&&_3eb.message.indexOf("Invalid Long Polling Request:")===0){
this.request();
return;
}
this.handleSecurityErrors(_3eb);
this.inherited(arguments);
},handleSecurityErrors:function(_3ec){
var _3ed=(dojo.isObject(_3ec)?_3ec.message:_3ec).match(/(\d+)$/);
var _3ee=(_3ed)?_3ed[0]:"";
if(_3ee==403){
dojo.publish("session-expiration-servicecall",[this]);
if(app){
app._onSessionExpiration();
}
}else{
dojo.publish("service-variable-error",[this,_3ec]);
}
},setType:function(){
this.inherited(arguments);
if(this._isDesignLoaded&&this.input){
this.setService(this.service);
if(this==studio.selected){
studio.inspector.inspect(this);
}
}
},operationChanged:function(_3ef){
this.inherited(arguments);
var op=this._operationInfo;
if(op||_3ef){
this.setType(op.returnType);
this.clearData();
}
if((this.autoUpdate||this.startUpdate)&&!this._loading&&this.isDesignLoaded()){
this.update();
}
},getArgs:function(){
var args=this.inherited(arguments);
var _3f0=this.getOperationType();
if(_3f0=="hqlquery"){
var max=this.isDesignLoaded()?this.designMaxResults:this.maxResults;
var _3f1=max?{maxResults:max,firstResult:this.firstRow||0}:{};
args.push(_3f1);
}
return args;
},getDebugArgs:function(){
return this.input.getData();
},getTotal:function(){
return this.getCount();
},getPageCount:function(){
return Math.ceil(this.getTotal()/(this.getCount()||1));
},setPage:function(_3f2){
this._page=Math.max(0,Math.min(this.getPageCount()-1,_3f2));
this.firstRow=this._page*this.maxResults;
this.update();
},getPage:function(){
return this._page;
},setFirstPage:function(){
this.setPage(0);
},setPreviousPage:function(){
this.setPage(this._page-1);
},setNextPage:function(){
this.setPage(this._page+1);
},setLastPage:function(){
this.setPage(this.getPageCount());
},_update:function(){
if(this.loadingDialog&&!this._isDesignLoaded){
if(this.loadingDialog instanceof wm.LoadingDialog==false){
this.loadingDialog=new wm.LoadingDialog({owner:this,name:"loadingDialog",widgetToCover:this.loadingDialog});
this.loadingDialog.setServiceVariableToTrack(this);
}
}
return this.inherited(arguments);
},toString:function(_3f3){
var t=_3f3||"";
t+="; "+wm.getDictionaryItem("wm.ServiceVariable.toString_FIRING",{isFiring:Boolean(this._requester)});
return this.inherited(arguments,[t]);
},log:function(_3f4,_3f5,_3f6,_3f7){
if(!app.debugDialog){
return;
}
if(!this.debugId){
this.debugId=[];
}
if((_3f4!="serviceCall"&&_3f4!="serviceCallResponse")){
this._debug={trigger:_3f5||_3f4,eventName:_3f4,request:"",lastUpdate:new Date()};
}
if(_3f4=="autoUpdate"){
try{
var i=0;
var _3f8=arguments.callee.caller;
while(_3f8&&_3f8.nom!="dataValueChanged"&&i<15){
_3f8=_3f8.caller;
i++;
}
if(_3f8&&_3f8.nom=="dataValueChanged"){
var _3f9=_3f8.arguments[1];
this._debug.eventName="inputChanged: "+_3f8.arguments[0]+" set to "+(_3f9 instanceof wm.Component?_3f9.toString():_3f9);
}
}
catch(e){
}
this.debugId.push({eventType:_3f4,id:app.debugDialog.newLogEvent({eventType:"autoUpdate",sourceDescription:"An input has changed",resultDescription:"Because autoUpdate is set, "+this.getRuntimeId()+".update() was called",method:"update",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId()})});
}else{
if(_3f4=="start"){
this.debugId.push({eventType:_3f4,id:app.debugDialog.newLogEvent({eventType:"start",sourceDescription:"Owner has loaded",resultDescription:"Because startUpdate is set, "+this.getRuntimeId()+".update() was called",method:"update",affectedId:this.getRuntimeId(),firingId:this.owner.getRuntimeId()})});
}else{
if(_3f4=="autoUpdateOnStart"){
var page=this.getParentPage()||app;
this._debug.trigger="autoUpdate"+(page&&page._loadingPage?": onStart":"unknown source");
this.debugId.push({eventType:_3f4,id:app.debugDialog.newLogEvent({eventType:"autoUpdate",sourceDescription:"An input has initialized",resultDescription:"Because autoUpdate is set, "+this.getRuntimeId()+".update() was called",method:"update",affectedId:this.getRuntimeId(),firingId:this.owner.getRuntimeId()})});
}else{
if(_3f4=="update"){
this.debugId.push({eventType:_3f4,id:app.debugDialog.newLogEvent({eventType:"update",sourceDescription:(_3f5?_3f5+"() called ":"")+this.getRuntimeId()+".update()",resultDescription:"Processing request to fire service variable",method:"update",affectedId:this.getRuntimeId(),firingId:""})});
}else{
if(_3f4=="serviceCall"){
if(_3f6&&_3f6.eventChain){
var _3fa=app.debugDialog.cacheEventChain();
app.debugDialog.restoreEventChain(_3f6.eventChain);
}
this.debugId.push({eventType:_3f4,id:app.debugDialog.newLogEvent({eventType:"serviceCall",sourceDescription:this.getRuntimeId()+".update()",resultDescription:"Sending request to server",method:"request",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId()})});
this.debugEventChain=app.debugDialog.cacheEventChain();
if(_3fa){
app.debugDialog.restoreEventChain(_3fa);
}
}else{
if(_3f4=="serviceCallResponse"){
app.debugDialog.restoreEventChain(this.debugEventChain);
delete this.debugEventChain;
this.debugId.push({eventType:_3f4,id:app.debugDialog.newLogEvent({eventType:"serviceCallResponse",sourceDescription:"Response received from server",resultDescription:_3f7?"Calling "+this.getRuntimeId()+".onError()":"Calling "+this.getRuntimeId()+".onSuccess()",method:_3f7?"processError":"processResult",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId()})});
if(this._debug&&this._debug.lastUpdate){
this._debug.duration=new Date().getTime()-this._debug.lastUpdate.getTime();
}
}else{
if(_3f4=="disabled"||"onCanUpdate"){
this.debugId.push({eventType:_3f4,id:app.debugDialog.newLogEvent({eventType:_3f4,sourceDescription:"Update was prevented by "+(_3f4=="disabled"?"disabled property":"onCanUpdate() call"),resultDescription:"Service did not fire",method:"update",affectedId:this.getRuntimeId(),firingId:""})});
}
}
}
}
}
}
}
if(_3f4!="serviceCall"&&_3f4!="serviceCallResponse"&&this._debug||this._debug&&!this._debug.eventId){
this._debug.eventId=this.debugId[this.debugId.length-1].id;
}
},endLog:function(_3fb){
if(!app.debugDialog){
return;
}
if(this.debugId&&this.debugId.length){
var _3fc=this.debugId.pop();
if(_3fc.eventType==_3fb){
app.debugDialog.endLogEvent(_3fc.id);
}
}
if(_3fb=="serviceCallResponse"){
app.debugDialog.clearEventChain();
}
},inputChanged:function(){
if(this.autoUpdate){
if(app.debugDialog){
this.log("autoUpdate");
}
this.inherited(arguments);
if(app.debugDialog){
this.endLog("autoUpdate");
}
}
},doStartUpdate:function(){
if(this.canStartUpdate()){
if(app.debugDialog){
this.log("start");
}
this.inherited(arguments);
if(app.debugDialog){
this.endLog("start");
}
}
},doAutoUpdate:function(){
if(this.canAutoUpdate()){
if(app.debugDialog&&!this._debug&&this._inPostInit){
this.log("autoUpdateOnStart");
}
this.inherited(arguments);
if(app.debugDialog){
this.endLog("autoUpdateOnStart");
}
}
},request:function(_3fd,_3fe,_3ff){
if(app.debugDialog&&this._debug){
this._debug.request=this.getDebugArgs();
}
if(app.debugDialog){
this.log("serviceCall",null,_3fe);
this.endLog("serviceCall",null,_3fe);
}
if(!this.downloadFile){
return this.inherited(arguments);
}else{
var args=_3fd||this.input.getArgsHash();
var _400;
if(wm.xhrPath){
_400=wm.xhrPath;
}else{
_400=window.location.href;
_400=_400.replace(/\?.*$/,"");
_400=_400.replace(/\/[^\/]*$/,"/");
}
var _401=_400+this._service._service.serviceUrl.replace(/\.json$/,".download");
var _402=dojo.byId("downloadFrame");
if(_402){
_402.parentNode.removeChild(_402);
}
_402=document.createElement("iframe");
dojo.attr(_402,{id:"downloadFrame",name:"downloadFrame"});
dojo.style(_402,{top:"1px",left:"1px",width:"1px",height:"1px",visibility:"hidden"});
dojo.body().appendChild(_402);
var _403=_402.contentDocument||_402.contentWindow.document;
_403.open("text/html");
_403.close();
var form=_403.createElement("form");
dojo.attr(form,{id:"downloadForm",method:"POST",action:_401});
var _404=_403.createElement("input");
dojo.attr(_404,{name:"method",value:_3fe||this.operation});
form.appendChild(_404);
wm.forEachProperty(args,function(_405,name){
var _406=_403.createElement("textarea");
dojo.attr(_406,{name:name,value:_405});
form.appendChild(_406);
});
_403.body.appendChild(form);
form.submit();
}
},blocked:function(_407){
this.log(this.disabled?"disabled":"onCanUpdate");
this.onBlocked();
this.endLog(this.disabled?"disabled":"onCanUpdate");
},onBlocked:function(_408){
},setDisabled:function(_409){
var _40a=this.disabled;
this.disabled=Boolean(_409);
},result:function(_40b){
delete this._lastError;
if(app.debugDialog){
this.log("serviceCallResponse");
if(this._jsonRpcServiceDeferred&&this._jsonRpcServiceDeferred.xhr){
var text=this._jsonRpcServiceDeferred.xhr.responseText;
this._lastResponse=(text||"").length>1000?text.substring(0,1000)+"...":text;
}
}
var _40c=this.inherited(arguments);
if(app.debugDialog){
this.endLog("serviceCallResponse");
}
return _40b;
},error:function(_40d){
if(djConfig.isDebug){
this.log("serviceCallResponse");
}
this._lastError=_40d;
this.inherited(arguments);
if(djConfig.isDebug){
this.endLog("serviceCallResponse");
}
return _40d;
}});
}
if(!dojo._hasResource["wm.base.widget.Container"]){
dojo._hasResource["wm.base.widget.Container"]=true;
dojo.provide("wm.base.widget.Container");
wm.define("wm.Container",wm.Control,{imageList:"",border:"0",container:true,lock:false,freeze:false,classNames:"wmcontainer",autoScroll:false,fitToContentWidth:false,fitToContentHeight:false,fitToContent:false,_needsFitToContent:false,constructor:function(){
this.c$=[];
},init:function(){
if(this.dockRight){
app.dockRight=this;
}
if(this.dockLeft){
app.dockLeft=this;
}
if(this.dockTop){
app.dockTop=this;
}
if(this.dockBottom){
app.dockBottom=this;
}
if(this.autoScroll&&app._touchEnabled&&!wm.disableTouchScroll){
var node=this.domNode;
this.connect(node,wm.isFakeMobile?"mousedown":"touchstart",this,"_ontouchstart");
if(!wm.isFakeMobile){
this.connect(node,"touchmove",this,"_ontouchmove");
this.connect(node,"touchend",this,"_ontouchend");
}
}
this.inherited(arguments);
this.setLayoutKind(this.layoutKind);
this.domNode.box=this.box="";
this._needsFitToContent=this.fitToContent=this.fitToContentWidth||this.fitToContentHeight;
},_ontouchstart:function(e){
if(app._touchY&&app._touchY.animationId){
window.clearInterval(app._touchY.animationId);
delete app._touchY.animationId;
}
if(!this._xscrollY){
return;
}
var node=this.domNode;
var _40e=e.touches?e.touches[0].target:e.target;
if(_40e.tagName=="INPUT"||_40e.tagName=="TEXTAREA"){
_40e.focus();
return;
}
dojo.stopEvent(e);
var y=e.touches&&e.touches.length?e.touches[0].screenY:e.screenY;
app._touchY={y:y,initialY:y,targetNode:_40e,targetWidget:this,time:new Date().getTime(),moved:false};
this.connect(node,wm.isFakeMobile?"mousemove":"touchmove",this,"_ontouchmove");
this.connect(node,wm.isFakeMobile?"mouseup":"touchend",this,"_ontouchend");
},_ontouchmove:function(e){
if(!app._touchY){
return;
}
dojo.publish("wmTouchMove",[this]);
var y=e.touches&&e.touches.length?e.touches[0].screenY:e.screenY;
var _40f=e.touches&&e.touches.length?e.touches[0].target:e.target;
if(_40f!=app._touchY.targetNode&&!wm.isFakeMobile){
return;
}
var node=this.domNode;
if(node.scrollHeight<=node.clientHeight){
return;
}
var _410=node.scrollTop;
var _411=app._touchY.y;
if(y==_411){
dojo.stopEvent(e);
return;
}
if(y<_411&&node.clientHeight+node.scrollTop>=node.scrollHeight||y>_411&&node.scrollTop<=0){
return;
}
var _412=_411-y;
var time=new Date().getTime();
var _413=time-app._touchY.time;
var _414=node.scrollTop;
var _415=_414+_412;
if(_415<0){
_415=0;
}else{
if(_415>node.scrollHeight){
_415=node.scrollHeight;
}
}
node.scrollTop=_415;
var _416=_410-node.scrollTop;
app._touchY.y=y;
app._touchY.velocity=_412/_413;
app._touchY.time=new Date().getTime();
if(Math.abs(y-app._touchY.initialY)>5){
app._touchY.moved=true;
}
dojo.stopEvent(e);
},_ontouchend:function(e){
var node=this.domNode;
if(node.scrollHeight<=node.clientHeight){
return;
}
if(app._touchY.velocity!=Infinity&&Math.abs(app._touchY.velocity)>0.15){
if(app._touchY.animationId){
window.clearInterval(app._touchY.animationId);
}
app._touchY.animationId=window.setInterval(dojo.hitch(this,"_onAnimateScroll"),50);
}
this.disconnectEvent("mousemove");
this.disconnectEvent("mouseup");
},_onAnimateScroll:function(){
var node=this.domNode;
app._touchY.velocity*=0.9;
var top=node.scrollTop;
var _417=node.scrollTop+Math.min(app._touchY.velocity*50,node.clientHeight);
node.scrollTop=_417;
if(app._touchY.velocity==Infinity||Math.abs(top-_417)<=1){
window.clearInterval(app._touchY.animationId);
return;
}
node.scrollTop+=Math.min(app._touchY.velocity*50,node.clientHeight);
},postInit:function(){
if(this.isDesignLoaded()){
this.setLock(this.lock);
}
this.inherited(arguments);
if(this.disabled){
wm.forEachProperty(this.widgets,dojo.hitch(this,function(w,name){
w.setParentDisabled(this._disabled);
}));
}
},connectOnEnterKey:function(){
this.connect(this.domNode,"onkeypress",this,"keypress");
},keypress:function(evt){
var self=this;
if(evt.keyCode==dojo.keys.ENTER&&evt.target.tagName!="TEXTAREA"){
wm.job(this.getRuntimeId()+".enterkeypress",50,dojo.hitch(this,function(){
if(!this.isDestroyed){
this.onEnterKeyPress(evt);
}
}));
}
},setThemeStyleType:function(_418){
var _419=this.getThemeStyleType();
if(_419){
this.removeUserClass(_419);
}
if(_418){
this.addUserClass(_418);
}
},getThemeStyleType:function(){
var _41a=["MainContent","EmphasizedContent","HeaderContent"];
if(this._classes&&this._classes.domNode){
for(var i=0;i<_41a.length;i++){
if(dojo.indexOf(this._classes.domNode,_41a[i])!=-1){
return _41a[i];
}
}
}
},destroy:function(){
if(this.dockRight){
delete app.dockRight;
}else{
if(this.dockLeft){
delete app.dockLeft;
}else{
if(this.dockTop){
delete app.dockTop;
}else{
if(this.dockBottom){
delete app.dockBottom;
}
}
}
}
if(this.domNode&&this.domNode.box){
delete this.domNode.box;
}
this.inherited(arguments);
},bc:function(){
this.inherited(arguments);
delete this.layoutJustify;
if(this.layoutAlign){
this.contentAlign=this.layoutAlign;
delete this.layoutAlign;
}
if(this.layoutFit){
this.fitToContentWidth=this.fitToContentHeight=this.layoutFit;
delete this.layoutFit;
}
if(this.box=="h"){
this.layoutKind="left-to-right";
}
if(this.boxPosition){
var _41b=["topLeft","center","bottomRight"],_41c=["top","middle","bottom"],_41d=["left","center","right"],h=this.layoutKind=="left-to-right",i=dojo.indexOf(_41b,this.boxPosition);
if(i!=-1){
if(h){
this.horizontalAlign=_41d[i];
}else{
this.verticalAlign=_41c[i];
}
}
}
},addWidget:function(_41e){
this.inherited(arguments);
if(this.box=="h"&&!_41e.width){
_41e.setProp("width","64px");
}else{
if(this.box=="v"&&!_41e.height){
_41e.setProp("height","64px");
}
}
},getOrderedWidgets:function(){
return this.c$;
},addControl:function(_41f){
this.c$.push(_41f);
},removeControl:function(_420){
if(this.c$){
for(var i=0,c;c=this.c$[i];i++){
if(c==_420){
this.c$.splice(i,1);
return i;
}
}
}
},removeAllControls:function(){
while(this.c$.length){
var c=this.c$[0];
this.removeControl(c);
c.destroy();
}
this.reflow();
},insertControl:function(_421,_422){
this.c$.splice(_422,0,_421);
},moveControl:function(_423,_424){
var i0=this.removeControl(_423);
if(_424==-1){
this.c$.push(_423);
}else{
this.c$.splice(_424,0,_423);
}
},indexOfControl:function(_425){
for(var i=0,c;c=this.c$[i];i++){
if(c==_425){
return i;
}
}
return -1;
},nextSibling:function(_426,_427){
for(var i=0,c;c=this.c$[i];i++){
if(c==_426){
if(!_427){
return this.c$[i+1];
}else{
for(var j=i+1;j<this.c$.length;j++){
if(this.c$[j].showing){
return this.c$[j];
}
}
}
}
}
},prevSibling:function(_428,_429){
for(var i=0,c;c=this.c$[i];i++){
if(c==_428){
if(!_429){
return this.c$[i-1];
}else{
for(var j=i-1;j>=0;j--){
if(this.c$[j].showing){
return this.c$[j];
}
}
}
}
}
},setAutoScroll:function(_42a){
this._xscrollX=false;
this._xscrollY=false;
this.inherited(arguments);
this.reflow();
},adjustSetSizeProp:function(n,v){
if(n=="height"&&this.fitToContentHeight&&this.getPreferredFitToContentHeight){
return this.getPreferredFitToContentHeight()+"px";
}
if(n=="width"&&this.fitToContentWidth&&this.getPreferredFitToContentWidth){
return this.getPreferredFitToContentWidth()+"px";
}
return v;
},reflow:function(){
this._boundsDirty=true;
if(!this.isReflowEnabled()){
return;
}
if(this.parent&&(this.fitToContent||this.parent.fitToContent)){
if(this._needsFitToContent){
delete this._needsFitToContent;
}
this.parent.reflow();
}else{
this.flow();
}
},adjustFlowForMobile:function(){
if(this.autoScroll||this.fitToContentHeight||studio.currentDeviceType=="desktop"||this._percEx.h){
return;
}
var max=0;
if(this.layoutKind=="left-to-right"){
max=this.bounds.h;
for(var i=0;i<this.c$.length;i++){
var c=this.c$[i];
if(c.enableTouchHeight&&!c._percEx.h&&c.mobileHeight){
if(c.bounds.h>max){
max=c.bounds.h;
}
}
}
}else{
var _42b=false;
for(var i=0;i<this.c$.length;i++){
var c=this.c$[i];
if(c.enableTouchHeight&&!c._percEx.h&&c.mobileHeight){
_42b=true;
break;
}
}
if(_42b){
max=this.getPreferredFitToContentHeight();
}
}
if(max>this.bounds.h){
this.enableTouchHeight=true;
var h=max+"px";
this.mobileHeight=h;
this.setHeight(h);
}
},flow:function(){
if(this._boundsDirty&&this.isReflowEnabled()){
if(this._isDesignLoaded){
this.adjustFlowForMobile();
}
this.layout.flow(this,false);
}
},renderControls:function(){
for(var i=0,c;c=this.c$[i];i++){
if(c.showing){
c.renderBounds();
}
}
},removeDelayedReflow:function(){
delete wm.Container.delayedReflowWidgets[this.getRuntimeId()];
},delayedReflow:function(){
if(wm.Container.delayedReflowWidgets[this.getRuntimeId()]){
return;
}
wm.Container.delayedReflowWidgets[this.getRuntimeId()]=this;
var _42c=[];
try{
wm.forEachProperty(wm.Container.delayedReflowWidgets,dojo.hitch(this,function(_42d,_42e){
if(_42d===this){
}else{
if(_42d.parent===this.parent){
delete wm.Container.delayedReflowWidgets[_42e];
delete wm.Container.delayedReflowWidgets[this.getRuntimeId()];
_42c.push(this.parent);
}else{
if(this.isAncestor(_42d)){
delete wm.Container.delayedReflowWidgets[this.getRuntimeId()];
}else{
if(_42d.isAncestor(this)){
delete wm.Container.delayedReflowWidgets[_42e];
}
}
}
}
}));
}
catch(e){
}
for(var i=0;i<_42c.length;i++){
_42c[i].delayedReflow();
}
if(!wm.Container._delayedReflowWidgetsId){
wm.Container._delayedReflowWidgetsId=window.setTimeout(wm.Container.runDelayedReflow,1);
}
},forEachControl:function(_42f,_430){
dojo.forEach(this.c$,function(_431){
_42f.apply(_431,(_430)?_430:[]);
});
},nodeBoundsChange:function(){
},imageListChanged:function(){
for(var i=0,c;c=this.c$[i];i++){
wm.fire(c,"imageListChanged");
}
},setImageList:function(_432){
this.imageList=_432;
this.imageListChanged();
},updateIsDirty:function(){
this.setValue("isDirty",this.getIsDirty());
wm.fire(this.parent,"updateIsDirty");
},getIsDirty:function(){
for(var i in this.widgets){
var w=this.widgets[i];
if(w.isDirty){
return true;
}else{
if(w.isDirty===undefined&&w.getIsDirty&&w.getIsDirty()){
return true;
}
}
}
},validate:function(){
this.setValue("invalid",this.getInvalid());
wm.fire(this.parent,"validate");
},getInvalid:function(){
var p=this.getParentPage();
for(var i in this.widgets){
var w=this.widgets[i];
if(p&&p.validateVisibleOnly&&(!w.showing||wm.Layer&&w instanceof wm.Layer&&!w.isActive())){
continue;
}
if(w.invalid){
return true;
}else{
if(w.invalid===undefined&&w.getInvalid&&w.getInvalid()){
return true;
}
}
}
if(dojo.isFunction(this.customGetValidate)){
return !this.customGetValidate();
}
return false;
},customGetValidate:function(){
return true;
},getInvalidWidget:function(){
var p=this.getParentPage();
for(var i in this.widgets){
var w=this.widgets[i];
if(p&&p.validateVisibleOnly&&(!w.showing||wm.Layer&&w instanceof wm.Layer&&!w.isActive())){
continue;
}
if(wm.isInstanceType(w,[wm.AbstractEditor,wm.Editor])){
if(w.getInvalid()){
return w;
}
}else{
if(wm.isInstanceType(w,wm.Container)){
var tmp=w.getInvalidWidget();
if(tmp){
return tmp;
}
}
}
}
return null;
},getLock:function(){
return this.lock||(this.parent&&wm.fire(this.parent,"getLock"))||false;
},setLock:function(_433){
var _434=this.lock;
this.lock=_433;
if(window["studio"]&&(this.lock!=_434||this.lock)){
studio.refreshComponentOnTree(this);
}
},getFreeze:function(){
return this.freeze||this.getLock();
},isWidgetTypeAllowed:function(_435){
return true;
},_reorientChildren:function(_436){
var _437=this.containerNode||this.domNode;
wm.forEachProperty(this.widgets,function(w){
if(w.domNode.parentNode!=_437){
return;
}
var ww=w.width;
w.width=w.height;
w.height=ww;
w.updateBounds();
});
},clearData:function(){
var _438=function(w){
if(wm.isInstanceType(w,[wm.AbstractEditor,wm.Editor])){
w.clear();
}
};
wm.forEachWidget(this,_438);
},resetData:function(){
var _439=function(w){
if(w instanceof wm.AbstractEditor){
w.reset();
}
};
wm.forEachWidget(this,_439);
},clearDirty:function(){
this.setValue("isDirty",false);
var _43a=function(w){
if(w instanceof wm.AbstractEditor){
w.clearDirty();
}
};
wm.forEachWidget(this,_43a);
},getCurrentMaxWidth:function(){
if(!this.parent||!this.parent.getCurrentMaxWidth){
return this.bounds.w-this.padBorderMargin.l-this.padBorderMargin.r;
}else{
if(this.fitToContent){
return this.parent.getCurrentMaxWidth();
}else{
if(this._percEx.w&&this.layoutKind=="top-to-bottom"){
return this.parent.getCurrentMaxWidth();
}else{
if(this._percEx.w&&this.layoutKind=="top-to-bottom"){
var _43b=this.parent.layout.getMaxFreeSpace(this.parent.c$,"w",this.parent.bounds.w-this.parent.padBorderMargin.l-this.parent.padBorderMargin.r);
return _43b+this.bounds.w;
}else{
return this.bounds.w-this.padBorderMargin.l-this.padBorderMargin.r;
}
}
}
}
},getCurrentMaxHeight:function(){
if(!this.parent||!this.parent.getCurrentMaxHeight){
return this.bounds.h-this.padBorderMargin.t-this.padBorderMargin.b;
}else{
if(this.fitToContent){
return this.parent.getCurrentMaxHeight();
}else{
if(this._percEx.h&&this.layoutKind=="left-to-right"){
return this.parent.getCurrentMaxHeight();
}else{
if(this._percEx.h&&this.layoutKind=="top-to-bottom"){
var _43c=this.parent.layout.getMaxFreeSpace(this.parent.c$,"h",this.parent.bounds.h-this.parent.padBorderMargin.t-this.parent.padBorderMargin.b);
return _43c+this.bounds.h;
}else{
return this.bounds.h-this.padBorderMargin.t-this.padBorderMargin.b;
}
}
}
}
}});
wm.Container.extend({getPreferredFitToContentWidth:function(){
var _43d=this.padBorderMargin.r+this.padBorderMargin.l;
var max=0;
var sum=0;
var _43e=0;
var v;
var _43f=0;
for(var i=0,c;c=this.c$[i];i++){
if(this.layout.inFlow(c)){
_43f++;
if(c.fitToContentWidth||c instanceof wm.Container&&c._percEx.w==100&&!c.autoScroll&&c.parent&&(c.parent.fitToContentWidth||c.parent.autoScroll)){
v=c.getPreferredFitToContentWidth();
}else{
if(!c._percEx.w){
v=c.bounds.w;
}else{
v=parseInt(c.minWidth)||c.getMinWidthProp();
if(c.bounds.w>v||this.c$.length==1){
if(_43e<100){
_43e+=c._percEx.w;
}
}else{
_43e=100;
}
}
}
max=Math.max(max,v);
sum+=v;
}
}
var _440=_43f==1;
if(!_440&&_43e&&_43e<100){
sum=Math.round(sum*100/_43e);
max=Math.round(max*100/_43e);
}
if(this.layoutKind=="fluid"){
return Math.min(this.bounds.w,max);
}
var _441=((this.layoutKind=="top-to-bottom")?max:sum)+_43d;
return Math.max(this.minWidth,Math.max(_441,wm.Control.prototype.getMinWidthProp.call(this)));
},getFluidHeight:function(){
return this.layout.flow(this,true);
},getPreferredFitToContentHeight:function(){
if(this.layoutKind=="fluid"){
return this.getFluidHeight();
}
var _442=this.padBorderMargin.t+this.padBorderMargin.b;
var max=0;
var sum=0;
var _443=0;
var v;
var _444=0;
for(var i=0,c;c=this.c$[i];i++){
if(this.layout.inFlow(c)){
_444++;
if(c.fitToContentHeight||c instanceof wm.Container&&c._percEx.h==100&&!c.autoScroll&&c.parent&&(c.parent.fitToContentHeight||c.parent.autoScroll)){
v=c.getPreferredFitToContentHeight();
}else{
if(!c._percEx.h){
v=c.bounds.h;
}else{
v=c.getMinHeightProp();
if(c.bounds.h>v||this.c$.length==1){
if(_443<100){
_443+=c._percEx.h;
}
}else{
_443=100;
}
}
}
max=Math.max(max,v);
sum+=v;
}
}
var _445=_444==1;
if(!_445&&_443&&_443<100){
sum=Math.round(sum*100/_443);
max=Math.round(max*100/_443);
}
var _446=((this.layoutKind=="left-to-right")?max:sum)+_442;
return Math.max(_446,wm.Control.prototype.getMinHeightProp.call(this));
},setBestWidth:function(){
this._inDesignResize=true;
this.setWidth(this.getPreferredFitToContentWidth()+"px");
delete this._inDesignResize;
},setBestHeight:function(){
this._inDesignResize=true;
this[this._isDesignLoaded?"set_height":"setHeight"](this.getPreferredFitToContentHeight()+"px");
delete this._inDesignResize;
},getMinWidthProp:function(){
if(this.fitToContentWidth){
return this.getPreferredFitToContentWidth();
}else{
return this.inherited(arguments);
}
},getMinHeightProp:function(){
if(this.fitToContentHeight){
return this.getPreferredFitToContentHeight();
}else{
return this.inherited(arguments);
}
},focusFirstEditor:function(){
for(var i=0;i<this.c$.length;i++){
var w=this.c$[i];
if(wm.isInstanceType(w,[wm.AbstractEditor,wm.Editor])){
w.focus();
return w;
}else{
if(wm.isInstanceType(w,wm.Container)){
var tmp=w.focusFirstEditor();
if(tmp){
return tmp;
}
}
}
}
return null;
},clearEditors:function(){
return this.clearData();
},onEnterKeyPress:function(_447){
}});
wm.Container.extend({layoutKind:"top-to-bottom",horizontalAlign:"justified",verticalAlign:"justified",setLayoutKind:function(_448){
if(this.layoutKind!=_448||!this.layout){
this.layoutKind=_448;
this.layout=wm.layout.cache[_448];
}
if(this.isDesignLoaded()){
dojo.publish("LayoutKindChanged",[this]);
}
this.reflow();
},setHorizontalAlign:function(_449){
this.horizontalAlign=_449;
this.reflow();
},setVerticalAlign:function(_44a){
this.verticalAlign=_44a;
this.reflow();
},setFitToContentWidth:function(_44b){
this.fitToContentWidth=_44b;
this.fitToContent=this.fitToContentWidth||this.fitToContentHeight;
this.updateBounds();
this.reflowParent();
this.calcFitToContent();
this.reflowParent();
},setFitToContentHeight:function(_44c){
this.fitToContentHeight=_44c;
this.fitToContent=this.fitToContentWidth||this.fitToContentHeight;
this.updateBounds();
this.reflowParent();
this.calcFitToContent();
this.reflowParent();
},calcFitToContent:function(){
if(this.fitToContentHeight){
this.height=this.bounds.h+"px";
this._percEx.h=0;
}
if(this.fitToContentWidth){
this.width=this.bounds.w+"px";
this._percEx.w=0;
}
},toHtml:function(_44d){
if(this.customToHtml!=this.constructor.prototype.customToHtml){
return this.customToHtml();
}
var html=[];
var _44e=0;
var _44f=[];
for(var i=0;i<this.c$.length;i++){
var c=this.c$[i];
if(this.layout.inFlow(c)){
_44f[i]=c.toHtml!=wm.Control.prototype.toHtml;
if(_44f[i]&&c.customToHtml!=c.constructor.prototype.customToHtml){
var _450=c.toHtml(_44d);
if(_450===""||_450===undefined||_450===null){
_44f[i]=false;
}
}
if(_44f[i]){
_44e++;
}
}
}
if(this.layoutKind=="top-to-bottom"||_44e<=1){
html.push("<div id='"+this.domNode.id+"' class='wmPanelTopToBottom'>");
for(var i=0;i<this.c$.length;i++){
if(_44f[i]){
var h=this.c$[i].toHtml(_44d);
if(h){
var _451=this.toHtmlStyles();
var _452=(this.c$[i]._classes&&this.c$[i]._classes.domNode?this.c$[i]._classes.domNode:[]);
_452=dojo.filter(_452,function(_453){
return _453.indexOf("wm_Font")==0||_453.indexOf("wm_Text")==0;
});
_452=_452.join(" ");
html.push("<div id='"+this.c$[i].domNode.id+"_Outer' "+_451+" class='"+_452+"'>"+h+"</div>");
}
}
}
}else{
var _454=_44d-4;
var _455=0;
var _456=[];
for(var i=0;i<this.c$.length;i++){
if(_44f[i]){
var c=this.c$[i];
if(!c._percEx.w){
_456[i]=c.bounds.w;
_454-=c.bounds.w;
}else{
_455+=c._percEx.w;
}
}
}
for(var i=0;i<this.c$.length;i++){
if(_44f[i]){
var c=this.c$[i];
if(c._percEx.w){
var _457=c._percEx.w/_455*_454;
_456[i]=_457;
}
}
}
html.push("<div id='"+this.domNode.id+"' class='wmPanelLeftToRight'>");
for(var i=0;i<this.c$.length;i++){
var h=this.c$[i].toHtml(_456[i]);
if(h){
var _451="";
var _452=(this.c$[i]._classes&&this.c$[i]._classes.domNode?this.c$[i]._classes.domNode:[]);
_452=dojo.filter(_452,function(_458){
return _458.indexOf("wm_Font")==0||_458.indexOf("wm_Text")==0;
});
_452=_452.join(" ");
html.push("<div id='"+this.c$[i].domNode.id+"_Outer' style='width:"+_456[i]+"px;' "+_451+" class='"+_452+"'>"+h+"</div>");
}
}
}
html.push("</div>");
return html.join("");
}});
wm.Container.delayedReflowWidgets={};
wm.Container._delayedReflowWidgetsId=0;
wm.Container.runDelayedReflow=function(){
var _459=wm.Container.delayedReflowWidgets;
wm.Container.delayedReflowWidgets={};
wm.Container._delayedReflowWidgetsId=0;
wm.forEachProperty(_459,function(_45a,_45b){
if(!_45a.isDestroyed){
_45a.reflow();
}
});
};
}
if(!dojo._hasResource["wm.base.widget.Layers.Decorator"]){
dojo._hasResource["wm.base.widget.Layers.Decorator"]=true;
dojo.provide("wm.base.widget.Layers.Decorator");
dojo.declare("wm.LayersDecorator",null,{decorationClass:"",constructor:function(_45c){
this.decoree=_45c;
},destroy:function(){
this.decoree=null;
},decorate:function(){
this.decorateContainer();
this.decorateLayers();
},decorateContainer:function(){
var d=this.decoree;
dojo.addClass(d.domNode,this.decorationClass);
},decorateLayers:function(){
dojo.forEach(this.decoree.layers,function(l,i){
this.decorateLayer(l,i);
},this);
},decorateLayer:function(_45d,_45e){
_45d.decorator=this;
},undecorate:function(){
this.undecorateContainer();
var _45f=this.decoree.layers;
for(var i=_45f.length-1;i>=0;i--){
this.undecorateLayer(_45f[i],i);
}
},undecorateContainer:function(){
dojo.removeClass(this.decoree.domNode,this.decorationClass);
},undecorateLayer:function(){
},setLayerShowing:function(_460,_461){
if(this.active){
wm.Control.prototype.setShowing.call(_460,_461);
}else{
_460.showing=_461;
}
},setLayerActive:function(_462,_463){
if(_462.active==_463&&_462.domNode.style.display!="none"){
return;
}
_462.inFlow=_463;
_462.active=_463;
var page=_462.getParentPage();
if(dojo.isIE<=9||wm.isAndroid<=3||this.decoree._cupdating||!page||page._loadingPage||window["studio"]||!this.decoree.transition||this.decoree.transition==="none"){
_462.domNode.style.display=_463?"":"none";
if(_463){
_462.reflowParent();
}
}else{
this.anim(_462,_463);
}
wm.fire(_462,"domNodeShowingChanged",[_463]);
},anim:function(_464,_465){
if(!_464._transitionEndSub){
if(!dojo.isIE||dojo.isIE>=10){
var _466;
if(dojo.isWebKit){
_466="webkitAnimationEnd";
}else{
if(dojo.isOpera){
_466="oanimationend";
}else{
if(dojo.isIE){
_466="MSAnimationEnd";
}else{
_466="animationend";
}
}
}
_464.domNode.addEventListener(_466,function(_467){
if(!_464.isActive()){
_464.domNode.style.display="none";
_464.domNode.style.opacity=1;
}
},false);
_464._transitionEndSub=true;
}
}
var _468=this.decoree.transition;
dojo.removeClass(_464.domNode,[_468+"OutLeftAnim",_468+"OutRightAnim",_468+"InLeftAnim",_468+"InRightAnim"]);
if(!_465){
var _469=_464._transitionNext?"Left":"Right";
dojo.addClass(_464.domNode,_468+"Out"+(_469)+"Anim");
}else{
var _469=_464._transitionNext?"Left":"Right";
_464.domNode.style.display="";
dojo.addClass(_464.domNode,_468+"In"+(_469)+"Anim");
_464.reflowParent();
}
},animFade:function(_46a,_46b){
if(_46b){
_46a.domNode.style.opacity=0.01;
_46a.domNode.style.display="";
}
var _46c=(_46b)?1:0.01;
var anim=dojo.animateProperty({node:_46a.domNode,properties:{opacity:_46c},duration:350});
dojo.connect(anim,"onEnd",function(){
if(!_46b){
_46a.domNode.style.display="none";
_46a.domNode.style.opacity=1;
}else{
_46a.reflow();
}
});
anim.play();
},activateLayer:function(_46d){
var d=this.decoree;
var old=d.getLayer(d.lastLayerIndex);
if(old&&old!=_46d){
old._transitionNext=_46d._transitionNext=_46d.getIndex()>old.getIndex();
this.setLayerActive(old,false);
}
this.setLayerActive(_46d,true);
},applyLayerCaption:function(){
},moveLayerIndex:function(_46e,_46f){
var d=this.decoree,l=d.getLayer(_46e);
d.client.removeControl(l);
d.client.insertControl(l,_46f);
}});
}
if(!dojo._hasResource["dojo.dnd.common"]){
dojo._hasResource["dojo.dnd.common"]=true;
dojo.provide("dojo.dnd.common");
dojo.getObject("dnd",true,dojo);
dojo.dnd.getCopyKeyState=dojo.isCopyKey;
dojo.dnd._uniqueId=0;
dojo.dnd.getUniqueId=function(){
var id;
do{
id=dojo._scopeName+"Unique"+(++dojo.dnd._uniqueId);
}while(dojo.byId(id));
return id;
};
dojo.dnd._empty={};
dojo.dnd.isFormElement=function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
};
}
if(!dojo._hasResource["dojo.date.stamp"]){
dojo._hasResource["dojo.date.stamp"]=true;
dojo.provide("dojo.date.stamp");
dojo.getObject("date.stamp",true,dojo);
dojo.date.stamp.fromISOString=function(_470,_471){
if(!dojo.date.stamp._isoRegExp){
dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
}
var _472=dojo.date.stamp._isoRegExp.exec(_470),_473=null;
if(_472){
_472.shift();
if(_472[1]){
_472[1]--;
}
if(_472[6]){
_472[6]*=1000;
}
if(_471){
_471=new Date(_471);
dojo.forEach(dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(prop){
return _471["get"+prop]();
}),function(_474,_475){
_472[_475]=_472[_475]||_474;
});
}
_473=new Date(_472[0]||1970,_472[1]||0,_472[2]||1,_472[3]||0,_472[4]||0,_472[5]||0,_472[6]||0);
if(_472[0]<100){
_473.setFullYear(_472[0]||1970);
}
var _476=0,_477=_472[7]&&_472[7].charAt(0);
if(_477!="Z"){
_476=((_472[8]||0)*60)+(Number(_472[9])||0);
if(_477!="-"){
_476*=-1;
}
}
if(_477){
_476-=_473.getTimezoneOffset();
}
if(_476){
_473.setTime(_473.getTime()+_476*60000);
}
}
return _473;
};
dojo.date.stamp.toISOString=function(_478,_479){
var _47a=function(n){
return (n<10)?"0"+n:n;
};
_479=_479||{};
var _47b=[],_47c=_479.zulu?"getUTC":"get",date="";
if(_479.selector!="time"){
var year=_478[_47c+"FullYear"]();
date=["0000".substr((year+"").length)+year,_47a(_478[_47c+"Month"]()+1),_47a(_478[_47c+"Date"]())].join("-");
}
_47b.push(date);
if(_479.selector!="date"){
var time=[_47a(_478[_47c+"Hours"]()),_47a(_478[_47c+"Minutes"]()),_47a(_478[_47c+"Seconds"]())].join(":");
var _47d=_478[_47c+"Milliseconds"]();
if(_479.milliseconds){
time+="."+(_47d<100?"0":"")+_47a(_47d);
}
if(_479.zulu){
time+="Z";
}else{
if(_479.selector!="time"){
var _47e=_478.getTimezoneOffset();
var _47f=Math.abs(_47e);
time+=(_47e>0?"-":"+")+_47a(Math.floor(_47f/60))+":"+_47a(_47f%60);
}
}
_47b.push(time);
}
return _47b.join("T");
};
}
if(!dojo._hasResource["dojo.parser"]){
dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
new Date("X");
dojo.parser=new function(){
var d=dojo;
function _480(_481){
if(d.isString(_481)){
return "string";
}
if(typeof _481=="number"){
return "number";
}
if(typeof _481=="boolean"){
return "boolean";
}
if(d.isFunction(_481)){
return "function";
}
if(d.isArray(_481)){
return "array";
}
if(_481 instanceof Date){
return "date";
}
if(_481 instanceof d._Url){
return "url";
}
return "object";
};
function _482(_483,type){
switch(type){
case "string":
return _483;
case "number":
return _483.length?Number(_483):NaN;
case "boolean":
return typeof _483=="boolean"?_483:!(_483.toLowerCase()=="false");
case "function":
if(d.isFunction(_483)){
_483=_483.toString();
_483=d.trim(_483.substring(_483.indexOf("{")+1,_483.length-1));
}
try{
if(_483===""||_483.search(/[^\w\.]+/i)!=-1){
return new Function(_483);
}else{
return d.getObject(_483,false)||new Function(_483);
}
}
catch(e){
return new Function();
}
case "array":
return _483?_483.split(/\s*,\s*/):[];
case "date":
switch(_483){
case "":
return new Date("");
case "now":
return new Date();
default:
return d.date.stamp.fromISOString(_483);
}
case "url":
return d.baseUrl+_483;
default:
return d.fromJson(_483);
}
};
var _484={},_485={};
d.connect(d,"extend",function(){
_485={};
});
function _486(cls,_487){
for(var name in cls){
if(name.charAt(0)=="_"){
continue;
}
if(name in _484){
continue;
}
_487[name]=_480(cls[name]);
}
return _487;
};
function _488(_489,_48a){
var c=_485[_489];
if(!c){
var cls=d.getObject(_489),_48b=null;
if(!cls){
return null;
}
if(!_48a){
_48b=_486(cls.prototype,{});
}
c={cls:cls,params:_48b};
}else{
if(!_48a&&!c.params){
c.params=_486(c.cls.prototype,{});
}
}
return c;
};
this._functionFromScript=function(_48c,_48d){
var _48e="";
var _48f="";
var _490=(_48c.getAttribute(_48d+"args")||_48c.getAttribute("args"));
if(_490){
d.forEach(_490.split(/\s*,\s*/),function(part,idx){
_48e+="var "+part+" = arguments["+idx+"]; ";
});
}
var _491=_48c.getAttribute("with");
if(_491&&_491.length){
d.forEach(_491.split(/\s*,\s*/),function(part){
_48e+="with("+part+"){";
_48f+="}";
});
}
return new Function(_48e+_48c.innerHTML+_48f);
};
this.instantiate=function(_492,_493,args){
var _494=[],_493=_493||{};
args=args||{};
var _495=(args.scope||d._scopeName)+"Type",_496="data-"+(args.scope||d._scopeName)+"-";
d.forEach(_492,function(obj){
if(!obj){
return;
}
var node,type,_497,_498,_499,_49a;
if(obj.node){
node=obj.node;
type=obj.type;
_49a=obj.fastpath;
_497=obj.clsInfo||(type&&_488(type,_49a));
_498=_497&&_497.cls;
_499=obj.scripts;
}else{
node=obj;
type=_495 in _493?_493[_495]:node.getAttribute(_495);
_497=type&&_488(type);
_498=_497&&_497.cls;
_499=(_498&&(_498._noScript||_498.prototype._noScript)?[]:d.query("> script[type^='dojo/']",node));
}
if(!_497){
throw new Error("Could not load class '"+type);
}
var _49b={};
if(args.defaults){
d._mixin(_49b,args.defaults);
}
if(obj.inherited){
d._mixin(_49b,obj.inherited);
}
if(_49a){
var _49c=node.getAttribute(_496+"props");
if(_49c&&_49c.length){
try{
_49c=d.fromJson.call(args.propsThis,"{"+_49c+"}");
d._mixin(_49b,_49c);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_49c+"'");
}
}
var _49d=node.getAttribute(_496+"attach-point");
if(_49d){
_49b.dojoAttachPoint=_49d;
}
var _49e=node.getAttribute(_496+"attach-event");
if(_49e){
_49b.dojoAttachEvent=_49e;
}
dojo.mixin(_49b,_493);
}else{
var _49f=node.attributes;
for(var name in _497.params){
var item=name in _493?{value:_493[name],specified:true}:_49f.getNamedItem(name);
if(!item||(!item.specified&&(!dojo.isIE||name.toLowerCase()!="value"))){
continue;
}
var _4a0=item.value;
switch(name){
case "class":
_4a0="className" in _493?_493.className:node.className;
break;
case "style":
_4a0="style" in _493?_493.style:(node.style&&node.style.cssText);
}
var _4a1=_497.params[name];
if(typeof _4a0=="string"){
_49b[name]=_482(_4a0,_4a1);
}else{
_49b[name]=_4a0;
}
}
}
var _4a2=[],_4a3=[];
d.forEach(_499,function(_4a4){
node.removeChild(_4a4);
var _4a5=(_4a4.getAttribute(_496+"event")||_4a4.getAttribute("event")),type=_4a4.getAttribute("type"),nf=d.parser._functionFromScript(_4a4,_496);
if(_4a5){
if(type=="dojo/connect"){
_4a2.push({event:_4a5,func:nf});
}else{
_49b[_4a5]=nf;
}
}else{
_4a3.push(nf);
}
});
var _4a6=_498.markupFactory||_498.prototype&&_498.prototype.markupFactory;
var _4a7=_4a6?_4a6(_49b,node,_498):new _498(_49b,node);
_494.push(_4a7);
var _4a8=(node.getAttribute(_496+"id")||node.getAttribute("jsId"));
if(_4a8){
d.setObject(_4a8,_4a7);
}
d.forEach(_4a2,function(_4a9){
d.connect(_4a7,_4a9.event,null,_4a9.func);
});
d.forEach(_4a3,function(func){
func.call(_4a7);
});
});
if(!_493._started){
d.forEach(_494,function(_4aa){
if(!args.noStart&&_4aa&&dojo.isFunction(_4aa.startup)&&!_4aa._started&&(!_4aa.getParent||!_4aa.getParent())){
_4aa.startup();
}
});
}
return _494;
};
this.parse=function(_4ab,args){
var root;
if(!args&&_4ab&&_4ab.rootNode){
args=_4ab;
root=args.rootNode;
}else{
root=_4ab;
}
root=root?dojo.byId(root):dojo.body();
args=args||{};
var _4ac=(args.scope||d._scopeName)+"Type",_4ad="data-"+(args.scope||d._scopeName)+"-";
function scan(_4ae,list){
var _4af=dojo.clone(_4ae.inherited);
dojo.forEach(["dir","lang"],function(name){
var val=_4ae.node.getAttribute(name);
if(val){
_4af[name]=val;
}
});
var _4b0=_4ae.clsInfo&&!_4ae.clsInfo.cls.prototype._noScript?_4ae.scripts:null;
var _4b1=(!_4ae.clsInfo||!_4ae.clsInfo.cls.prototype.stopParser)||(args&&args.template);
for(var _4b2=_4ae.node.firstChild;_4b2;_4b2=_4b2.nextSibling){
if(_4b2.nodeType==1){
var type,_4b3=_4b1&&_4b2.getAttribute(_4ad+"type");
if(_4b3){
type=_4b3;
}else{
type=_4b1&&_4b2.getAttribute(_4ac);
}
var _4b4=_4b3==type;
if(type){
var _4b5={"type":type,fastpath:_4b4,clsInfo:_488(type,_4b4),node:_4b2,scripts:[],inherited:_4af};
list.push(_4b5);
scan(_4b5,list);
}else{
if(_4b0&&_4b2.nodeName.toLowerCase()=="script"){
type=_4b2.getAttribute("type");
if(type&&/^dojo\/\w/i.test(type)){
_4b0.push(_4b2);
}
}else{
if(_4b1){
scan({node:_4b2,inherited:_4af},list);
}
}
}
}
}
};
var _4b6={};
if(args&&args.inherited){
for(var key in args.inherited){
if(args.inherited[key]){
_4b6[key]=args.inherited[key];
}
}
}
var list=[];
scan({node:root,inherited:_4b6},list);
var _4b7=args&&args.template?{template:true}:null;
return this.instantiate(list,_4b7,args);
};
}();
(function(){
var _4b8=function(){
if(dojo.config.parseOnLoad){
dojo.parser.parse();
}
};
if(dojo.getObject("dijit.wai.onload")===dojo._loaders[0]){
dojo._loaders.splice(1,0,_4b8);
}else{
dojo._loaders.unshift(_4b8);
}
})();
}
if(!dojo._hasResource["dojo.dnd.Container"]){
dojo._hasResource["dojo.dnd.Container"]=true;
dojo.provide("dojo.dnd.Container");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(node,_4b9){
this.node=dojo.byId(node);
if(!_4b9){
_4b9={};
}
this.creator=_4b9.creator||null;
this.skipForm=_4b9.skipForm;
this.parent=_4b9.dropParent&&dojo.byId(_4b9.dropParent);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(_4b9&&_4b9._skipStartup)){
this.startup();
}
this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")];
},creator:function(){
},getItem:function(key){
return this.map[key];
},setItem:function(key,data){
this.map[key]=data;
},delItem:function(key){
delete this.map[key];
},forInItems:function(f,o){
o=o||dojo.global;
var m=this.map,e=dojo.dnd._empty;
for(var i in m){
if(i in e){
continue;
}
f.call(o,m[i],i,this);
}
return o;
},clearItems:function(){
this.map={};
},getAllNodes:function(){
return dojo.query("> .dojoDndItem",this.parent);
},sync:function(){
var map={};
this.getAllNodes().forEach(function(node){
if(node.id){
var item=this.getItem(node.id);
if(item){
map[node.id]=item;
return;
}
}else{
node.id=dojo.dnd.getUniqueId();
}
var type=node.getAttribute("dndType"),data=node.getAttribute("dndData");
map[node.id]={data:data||node.innerHTML,type:type?type.split(/\s*,\s*/):["text"]};
},this);
this.map=map;
return this;
},insertNodes:function(data,_4ba,_4bb){
if(!this.parent.firstChild){
_4bb=null;
}else{
if(_4ba){
if(!_4bb){
_4bb=this.parent.firstChild;
}
}else{
if(_4bb){
_4bb=_4bb.nextSibling;
}
}
}
if(_4bb){
for(var i=0;i<data.length;++i){
var t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.insertBefore(t.node,_4bb);
}
}else{
for(var i=0;i<data.length;++i){
var t=this._normalizedCreator(data[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.appendChild(t.node);
}
}
return this;
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current=null;
},markupFactory:function(_4bc,node){
_4bc._skipStartup=true;
return new dojo.dnd.Container(node,_4bc);
},startup:function(){
if(!this.parent){
this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){
var c=this.parent.getElementsByTagName("tbody");
if(c&&c.length){
this.parent=c[0];
}
}
}
this.defaultCreator=dojo.dnd._defaultCreator(this.parent);
this.sync();
},onMouseOver:function(e){
var n=e.relatedTarget;
while(n){
if(n==this.node){
break;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(!n){
this._changeState("Container","Over");
this.onOverEvent();
}
n=this._getChildByEvent(e);
if(this.current==n){
return;
}
if(this.current){
this._removeItemClass(this.current,"Over");
}
if(n){
this._addItemClass(n,"Over");
}
this.current=n;
},onMouseOut:function(e){
for(var n=e.relatedTarget;n;){
if(n==this.node){
return;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(this.current){
this._removeItemClass(this.current,"Over");
this.current=null;
}
this._changeState("Container","");
this.onOutEvent();
},onSelectStart:function(e){
if(!this.skipForm||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onOverEvent:function(){
},onOutEvent:function(){
},_changeState:function(type,_4bd){
var _4be="dojoDnd"+type;
var _4bf=type.toLowerCase()+"State";
dojo.replaceClass(this.node,_4be+_4bd,_4be+this[_4bf]);
this[_4bf]=_4bd;
},_addItemClass:function(node,type){
dojo.addClass(node,"dojoDndItem"+type);
},_removeItemClass:function(node,type){
dojo.removeClass(node,"dojoDndItem"+type);
},_getChildByEvent:function(e){
var node=e.target;
if(node){
for(var _4c0=node.parentNode;_4c0;node=_4c0,_4c0=node.parentNode){
if(_4c0==this.parent&&dojo.hasClass(node,"dojoDndItem")){
return node;
}
}
}
return null;
},_normalizedCreator:function(item,hint){
var t=(this.creator||this.defaultCreator).call(this,item,hint);
if(!dojo.isArray(t.type)){
t.type=["text"];
}
if(!t.node.id){
t.node.id=dojo.dnd.getUniqueId();
}
dojo.addClass(t.node,"dojoDndItem");
return t;
}});
dojo.dnd._createNode=function(tag){
if(!tag){
return dojo.dnd._createSpan;
}
return function(text){
return dojo.create(tag,{innerHTML:text});
};
};
dojo.dnd._createTrTd=function(text){
var tr=dojo.create("tr");
dojo.create("td",{innerHTML:text},tr);
return tr;
};
dojo.dnd._createSpan=function(text){
return dojo.create("span",{innerHTML:text});
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(node){
var tag=node.tagName.toLowerCase();
var c=tag=="tbody"||tag=="thead"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[tag]);
return function(item,hint){
var _4c1=item&&dojo.isObject(item),data,type,n;
if(_4c1&&item.tagName&&item.nodeType&&item.getAttribute){
data=item.getAttribute("dndData")||item.innerHTML;
type=item.getAttribute("dndType");
type=type?type.split(/\s*,\s*/):["text"];
n=item;
}else{
data=(_4c1&&item.data)?item.data:item;
type=(_4c1&&item.type)?item.type:["text"];
n=(hint=="avatar"?dojo.dnd._createSpan:c)(String(data));
}
if(!n.id){
n.id=dojo.dnd.getUniqueId();
}
return {node:n,data:data,type:type};
};
};
}
if(!dojo._hasResource["dojo.dnd.Selector"]){
dojo._hasResource["dojo.dnd.Selector"]=true;
dojo.provide("dojo.dnd.Selector");
dojo.declare("dojo.dnd.Selector",dojo.dnd.Container,{constructor:function(node,_4c2){
if(!_4c2){
_4c2={};
}
this.singular=_4c2.singular;
this.autoSync=_4c2.autoSync;
this.selection={};
this.anchor=null;
this.simpleSelection=false;
this.events.push(dojo.connect(this.node,"onmousedown",this,"onMouseDown"),dojo.connect(this.node,"onmouseup",this,"onMouseUp"));
},singular:false,getSelectedNodes:function(){
var t=new dojo.NodeList();
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
t.push(dojo.byId(i));
}
return t;
},selectNone:function(){
return this._removeSelection()._removeAnchor();
},selectAll:function(){
this.forInItems(function(data,id){
this._addItemClass(dojo.byId(id),"Selected");
this.selection[id]=1;
},this);
return this._removeAnchor();
},deleteSelectedNodes:function(){
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var n=dojo.byId(i);
this.delItem(i);
dojo.destroy(n);
}
this.anchor=null;
this.selection={};
return this;
},forInSelectedItems:function(f,o){
o=o||dojo.global;
var s=this.selection,e=dojo.dnd._empty;
for(var i in s){
if(i in e){
continue;
}
f.call(o,this.getItem(i),i,this);
}
},sync:function(){
dojo.dnd.Selector.superclass.sync.call(this);
if(this.anchor){
if(!this.getItem(this.anchor.id)){
this.anchor=null;
}
}
var t=[],e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
if(!this.getItem(i)){
t.push(i);
}
}
dojo.forEach(t,function(i){
delete this.selection[i];
},this);
return this;
},insertNodes:function(_4c3,data,_4c4,_4c5){
var _4c6=this._normalizedCreator;
this._normalizedCreator=function(item,hint){
var t=_4c6.call(this,item,hint);
if(_4c3){
if(!this.anchor){
this.anchor=t.node;
this._removeItemClass(t.node,"Selected");
this._addItemClass(this.anchor,"Anchor");
}else{
if(this.anchor!=t.node){
this._removeItemClass(t.node,"Anchor");
this._addItemClass(t.node,"Selected");
}
}
this.selection[t.node.id]=1;
}else{
this._removeItemClass(t.node,"Selected");
this._removeItemClass(t.node,"Anchor");
}
return t;
};
dojo.dnd.Selector.superclass.insertNodes.call(this,data,_4c4,_4c5);
this._normalizedCreator=_4c6;
return this;
},destroy:function(){
dojo.dnd.Selector.superclass.destroy.call(this);
this.selection=this.anchor=null;
},markupFactory:function(_4c7,node){
_4c7._skipStartup=true;
return new dojo.dnd.Selector(node,_4c7);
},onMouseDown:function(e){
if(this.autoSync){
this.sync();
}
if(!this.current){
return;
}
if(!this.singular&&!dojo.isCopyKey(e)&&!e.shiftKey&&(this.current.id in this.selection)){
this.simpleSelection=true;
if(e.button===dojo.mouseButtons.LEFT){
dojo.stopEvent(e);
}
return;
}
if(!this.singular&&e.shiftKey){
if(!dojo.isCopyKey(e)){
this._removeSelection();
}
var c=this.getAllNodes();
if(c.length){
if(!this.anchor){
this.anchor=c[0];
this._addItemClass(this.anchor,"Anchor");
}
this.selection[this.anchor.id]=1;
if(this.anchor!=this.current){
var i=0;
for(;i<c.length;++i){
var node=c[i];
if(node==this.anchor||node==this.current){
break;
}
}
for(++i;i<c.length;++i){
var node=c[i];
if(node==this.anchor||node==this.current){
break;
}
this._addItemClass(node,"Selected");
this.selection[node.id]=1;
}
this._addItemClass(this.current,"Selected");
this.selection[this.current.id]=1;
}
}
}else{
if(this.singular){
if(this.anchor==this.current){
if(dojo.isCopyKey(e)){
this.selectNone();
}
}else{
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
}else{
if(dojo.isCopyKey(e)){
if(this.anchor==this.current){
delete this.selection[this.anchor.id];
this._removeAnchor();
}else{
if(this.current.id in this.selection){
this._removeItemClass(this.current,"Selected");
delete this.selection[this.current.id];
}else{
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this._addItemClass(this.anchor,"Selected");
}
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}else{
if(!(this.current.id in this.selection)){
this.selectNone();
this.anchor=this.current;
this._addItemClass(this.current,"Anchor");
this.selection[this.current.id]=1;
}
}
}
}
dojo.stopEvent(e);
},onMouseUp:function(e){
if(!this.simpleSelection){
return;
}
this.simpleSelection=false;
this.selectNone();
if(this.current){
this.anchor=this.current;
this._addItemClass(this.anchor,"Anchor");
this.selection[this.current.id]=1;
}
},onMouseMove:function(e){
this.simpleSelection=false;
},onOverEvent:function(){
this.onmousemoveEvent=dojo.connect(this.node,"onmousemove",this,"onMouseMove");
},onOutEvent:function(){
dojo.disconnect(this.onmousemoveEvent);
delete this.onmousemoveEvent;
},_removeSelection:function(){
var e=dojo.dnd._empty;
for(var i in this.selection){
if(i in e){
continue;
}
var node=dojo.byId(i);
if(node){
this._removeItemClass(node,"Selected");
}
}
this.selection={};
return this;
},_removeAnchor:function(){
if(this.anchor){
this._removeItemClass(this.anchor,"Anchor");
this.anchor=null;
}
return this;
}});
}
if(!dojo._hasResource["dojo.window"]){
dojo._hasResource["dojo.window"]=true;
dojo.provide("dojo.window");
dojo.getObject("window",true,dojo);
dojo.window.getBox=function(){
var _4c8=(dojo.doc.compatMode=="BackCompat")?dojo.body():dojo.doc.documentElement;
var _4c9=dojo._docScroll();
return {w:_4c8.clientWidth,h:_4c8.clientHeight,l:_4c9.x,t:_4c9.y};
};
dojo.window.get=function(doc){
if(dojo.isIE&&window!==document.parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc.parentWindow||doc.defaultView;
};
dojo.window.scrollIntoView=function(node,pos){
try{
node=dojo.byId(node);
var doc=node.ownerDocument||dojo.doc,body=doc.body||dojo.body(),html=doc.documentElement||body.parentNode,isIE=dojo.isIE,isWK=dojo.isWebKit;
if((!(dojo.isMoz||isIE||isWK||dojo.isOpera)||node==body||node==html)&&(typeof node.scrollIntoView!="undefined")){
node.scrollIntoView(false);
return;
}
var _4ca=doc.compatMode=="BackCompat",_4cb=(isIE>=9&&node.ownerDocument.parentWindow.frameElement)?((html.clientHeight>0&&html.clientWidth>0&&(body.clientHeight==0||body.clientWidth==0||body.clientHeight>html.clientHeight||body.clientWidth>html.clientWidth))?html:body):(_4ca?body:html),_4cc=isWK?body:_4cb,_4cd=_4cb.clientWidth,_4ce=_4cb.clientHeight,rtl=!dojo._isBodyLtr(),_4cf=pos||dojo.position(node),el=node.parentNode,_4d0=function(el){
return ((isIE<=6||(isIE&&_4ca))?false:(dojo.style(el,"position").toLowerCase()=="fixed"));
};
if(_4d0(node)){
return;
}
while(el){
if(el==body){
el=_4cc;
}
var _4d1=dojo.position(el),_4d2=_4d0(el);
if(el==_4cc){
_4d1.w=_4cd;
_4d1.h=_4ce;
if(_4cc==html&&isIE&&rtl){
_4d1.x+=_4cc.offsetWidth-_4d1.w;
}
if(_4d1.x<0||!isIE){
_4d1.x=0;
}
if(_4d1.y<0||!isIE){
_4d1.y=0;
}
}else{
var pb=dojo._getPadBorderExtents(el);
_4d1.w-=pb.w;
_4d1.h-=pb.h;
_4d1.x+=pb.l;
_4d1.y+=pb.t;
var _4d3=el.clientWidth,_4d4=_4d1.w-_4d3;
if(_4d3>0&&_4d4>0){
_4d1.w=_4d3;
_4d1.x+=(rtl&&(isIE||el.clientLeft>pb.l))?_4d4:0;
}
_4d3=el.clientHeight;
_4d4=_4d1.h-_4d3;
if(_4d3>0&&_4d4>0){
_4d1.h=_4d3;
}
}
if(_4d2){
if(_4d1.y<0){
_4d1.h+=_4d1.y;
_4d1.y=0;
}
if(_4d1.x<0){
_4d1.w+=_4d1.x;
_4d1.x=0;
}
if(_4d1.y+_4d1.h>_4ce){
_4d1.h=_4ce-_4d1.y;
}
if(_4d1.x+_4d1.w>_4cd){
_4d1.w=_4cd-_4d1.x;
}
}
var l=_4cf.x-_4d1.x,t=_4cf.y-Math.max(_4d1.y,0),r=l+_4cf.w-_4d1.w,bot=t+_4cf.h-_4d1.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((isIE==8&&!_4ca)||isIE>=9)){
s=-s;
}
_4cf.x+=el.scrollLeft;
el.scrollLeft+=s;
_4cf.x-=el.scrollLeft;
}
if(bot*t>0){
_4cf.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_4cf.y-=el.scrollTop;
}
el=(el!=_4cc)&&!_4d2&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
node.scrollIntoView(false);
}
};
}
if(!dojo._hasResource["dojo.dnd.autoscroll"]){
dojo._hasResource["dojo.dnd.autoscroll"]=true;
dojo.provide("dojo.dnd.autoscroll");
dojo.getObject("dnd",true,dojo);
dojo.dnd.getViewport=dojo.window.getBox;
dojo.dnd.V_TRIGGER_AUTOSCROLL=32;
dojo.dnd.H_TRIGGER_AUTOSCROLL=32;
dojo.dnd.V_AUTOSCROLL_VALUE=16;
dojo.dnd.H_AUTOSCROLL_VALUE=16;
dojo.dnd.autoScroll=function(e){
var v=dojo.window.getBox(),dx=0,dy=0;
if(e.clientX<dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=-dojo.dnd.H_AUTOSCROLL_VALUE;
}else{
if(e.clientX>v.w-dojo.dnd.H_TRIGGER_AUTOSCROLL){
dx=dojo.dnd.H_AUTOSCROLL_VALUE;
}
}
if(e.clientY<dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=-dojo.dnd.V_AUTOSCROLL_VALUE;
}else{
if(e.clientY>v.h-dojo.dnd.V_TRIGGER_AUTOSCROLL){
dy=dojo.dnd.V_AUTOSCROLL_VALUE;
}
}
window.scrollBy(dx,dy);
};
dojo.dnd._validNodes={"div":1,"p":1,"td":1};
dojo.dnd._validOverflow={"auto":1,"scroll":1};
dojo.dnd.autoScrollNodes=function(e){
for(var n=e.target;n;){
if(n.nodeType==1&&(n.tagName.toLowerCase() in dojo.dnd._validNodes)){
var s=dojo.getComputedStyle(n);
if(s.overflow.toLowerCase() in dojo.dnd._validOverflow){
var b=dojo._getContentBox(n,s),t=dojo.position(n,true);
var w=Math.min(dojo.dnd.H_TRIGGER_AUTOSCROLL,b.w/2),h=Math.min(dojo.dnd.V_TRIGGER_AUTOSCROLL,b.h/2),rx=e.pageX-t.x,ry=e.pageY-t.y,dx=0,dy=0;
if(dojo.isWebKit||dojo.isOpera){
rx+=dojo.body().scrollLeft;
ry+=dojo.body().scrollTop;
}
if(rx>0&&rx<b.w){
if(rx<w){
dx=-w;
}else{
if(rx>b.w-w){
dx=w;
}
}
}
if(ry>0&&ry<b.h){
if(ry<h){
dy=-h;
}else{
if(ry>b.h-h){
dy=h;
}
}
}
var _4d5=n.scrollLeft,_4d6=n.scrollTop;
n.scrollLeft=n.scrollLeft+dx;
n.scrollTop=n.scrollTop+dy;
if(_4d5!=n.scrollLeft||_4d6!=n.scrollTop){
return;
}
}
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
dojo.dnd.autoScroll(e);
};
}
if(!dojo._hasResource["dojo.dnd.Avatar"]){
dojo._hasResource["dojo.dnd.Avatar"]=true;
dojo.provide("dojo.dnd.Avatar");
dojo.declare("dojo.dnd.Avatar",null,{constructor:function(_4d7){
this.manager=_4d7;
this.construct();
},construct:function(){
this.isA11y=dojo.hasClass(dojo.body(),"dijit_a11y");
var a=dojo.create("table",{"class":"dojoDndAvatar",style:{position:"absolute",zIndex:"1999",margin:"0px"}}),_4d8=this.manager.source,node,b=dojo.create("tbody",null,a),tr=dojo.create("tr",null,b),td=dojo.create("td",null,tr),icon=this.isA11y?dojo.create("span",{id:"a11yIcon",innerHTML:this.manager.copy?"+":"<"},td):null,span=dojo.create("span",{innerHTML:_4d8.generateText?this._generateText():""},td),k=Math.min(5,this.manager.nodes.length),i=0;
dojo.attr(tr,{"class":"dojoDndAvatarHeader",style:{opacity:0.9}});
for(;i<k;++i){
if(_4d8.creator){
node=_4d8._normalizedCreator(_4d8.getItem(this.manager.nodes[i].id).data,"avatar").node;
}else{
node=this.manager.nodes[i].cloneNode(true);
if(node.tagName.toLowerCase()=="tr"){
var _4d9=dojo.create("table"),_4da=dojo.create("tbody",null,_4d9);
_4da.appendChild(node);
node=_4d9;
}
}
node.id="";
tr=dojo.create("tr",null,b);
td=dojo.create("td",null,tr);
td.appendChild(node);
dojo.attr(tr,{"class":"dojoDndAvatarItem",style:{opacity:(9-i)/10}});
}
this.node=a;
},destroy:function(){
dojo.destroy(this.node);
this.node=false;
},update:function(){
dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
if(this.isA11y){
var icon=dojo.byId("a11yIcon");
var text="+";
if(this.manager.canDropFlag&&!this.manager.copy){
text="< ";
}else{
if(!this.manager.canDropFlag&&!this.manager.copy){
text="o";
}else{
if(!this.manager.canDropFlag){
text="x";
}
}
}
icon.innerHTML=text;
}
dojo.query(("tr.dojoDndAvatarHeader td span"+(this.isA11y?" span":"")),this.node).forEach(function(node){
node.innerHTML=this._generateText();
},this);
},_generateText:function(){
return this.manager.nodes.length.toString();
}});
}
if(!dojo._hasResource["dojo.dnd.Manager"]){
dojo._hasResource["dojo.dnd.Manager"]=true;
dojo.provide("dojo.dnd.Manager");
dojo.declare("dojo.dnd.Manager",null,{constructor:function(){
this.avatar=null;
this.source=null;
this.nodes=[];
this.copy=true;
this.target=null;
this.canDropFlag=false;
this.events=[];
},OFFSET_X:16,OFFSET_Y:16,overSource:function(_4db){
if(this.avatar){
this.target=(_4db&&_4db.targetState!="Disabled")?_4db:null;
this.canDropFlag=Boolean(this.target);
this.avatar.update();
}
dojo.publish("/dnd/source/over",[_4db]);
},outSource:function(_4dc){
if(this.avatar){
if(this.target==_4dc){
this.target=null;
this.canDropFlag=false;
this.avatar.update();
dojo.publish("/dnd/source/over",[null]);
}
}else{
dojo.publish("/dnd/source/over",[null]);
}
},startDrag:function(_4dd,_4de,copy){
this.source=_4dd;
this.nodes=_4de;
this.copy=Boolean(copy);
this.avatar=this.makeAvatar();
dojo.body().appendChild(this.avatar.node);
dojo.publish("/dnd/start",[_4dd,_4de,this.copy]);
this.events=[dojo.connect(dojo.doc,"onmousemove",this,"onMouseMove"),dojo.connect(dojo.doc,"onmouseup",this,"onMouseUp"),dojo.connect(dojo.doc,"onkeydown",this,"onKeyDown"),dojo.connect(dojo.doc,"onkeyup",this,"onKeyUp"),dojo.connect(dojo.doc,"ondragstart",dojo.stopEvent),dojo.connect(dojo.body(),"onselectstart",dojo.stopEvent)];
var c="dojoDnd"+(copy?"Copy":"Move");
dojo.addClass(dojo.body(),c);
},canDrop:function(flag){
var _4df=Boolean(this.target&&flag);
if(this.canDropFlag!=_4df){
this.canDropFlag=_4df;
this.avatar.update();
}
},stopDrag:function(){
dojo.removeClass(dojo.body(),["dojoDndCopy","dojoDndMove"]);
dojo.forEach(this.events,dojo.disconnect);
this.events=[];
this.avatar.destroy();
this.avatar=null;
this.source=this.target=null;
this.nodes=[];
},makeAvatar:function(){
return new dojo.dnd.Avatar(this);
},updateAvatar:function(){
this.avatar.update();
},onMouseMove:function(e){
if(e.which===0){
this.onMouseUp();
return;
}
var a=this.avatar;
if(a){
dojo.dnd.autoScrollNodes(e);
var s=a.node.style;
s.left=(e.pageX+this.OFFSET_X)+"px";
s.top=(e.pageY+this.OFFSET_Y)+"px";
var copy=Boolean(this.source.copyState(dojo.isCopyKey(e)));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
},onMouseUp:function(e){
if(this.avatar){
if(this.target&&this.canDropFlag){
var copy=Boolean(this.source.copyState(dojo.isCopyKey(e))),_4e0=[this.source,this.nodes,copy,this.target,e];
dojo.publish("/dnd/drop/before",_4e0);
dojo.publish("/dnd/drop",_4e0);
}else{
dojo.publish("/dnd/cancel");
}
this.stopDrag();
}
},onKeyDown:function(e){
if(this.avatar){
switch(e.keyCode){
case dojo.keys.CTRL:
var copy=Boolean(this.source.copyState(true));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
break;
case dojo.keys.ESCAPE:
dojo.publish("/dnd/cancel");
this.stopDrag();
break;
}
}
},onKeyUp:function(e){
if(this.avatar&&e.keyCode==dojo.keys.CTRL){
var copy=Boolean(this.source.copyState(false));
if(this.copy!=copy){
this._setCopyStatus(copy);
}
}
},_setCopyStatus:function(copy){
this.copy=copy;
this.source._markDndStatus(this.copy);
this.updateAvatar();
dojo.replaceClass(dojo.body(),"dojoDnd"+(this.copy?"Copy":"Move"),"dojoDnd"+(this.copy?"Move":"Copy"));
}});
dojo.dnd._manager=null;
dojo.dnd.manager=function(){
if(!dojo.dnd._manager){
dojo.dnd._manager=new dojo.dnd.Manager();
}
return dojo.dnd._manager;
};
}
if(!dojo._hasResource["dojo.dnd.Source"]){
dojo._hasResource["dojo.dnd.Source"]=true;
dojo.provide("dojo.dnd.Source");
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,selfCopy:false,selfAccept:true,skipForm:false,withHandles:false,autoSync:false,delay:0,accept:["text"],generateText:true,constructor:function(node,_4e1){
dojo.mixin(this,dojo.mixin({},_4e1));
var type=this.accept;
if(type.length){
this.accept={};
for(var i=0;i<type.length;++i){
this.accept[type[i]]=1;
}
}
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this._lastX=0;
this._lastY=0;
this.sourceState="";
if(this.isSource){
dojo.addClass(this.node,"dojoDndSource");
}
this.targetState="";
if(this.accept){
dojo.addClass(this.node,"dojoDndTarget");
}
if(this.horizontal){
dojo.addClass(this.node,"dojoDndHorizontal");
}
this.topics=[dojo.subscribe("/dnd/source/over",this,"onDndSourceOver"),dojo.subscribe("/dnd/start",this,"onDndStart"),dojo.subscribe("/dnd/drop",this,"onDndDrop"),dojo.subscribe("/dnd/cancel",this,"onDndCancel")];
},checkAcceptance:function(_4e2,_4e3){
if(this==_4e2){
return !this.copyOnly||this.selfAccept;
}
for(var i=0;i<_4e3.length;++i){
var type=_4e2.getItem(_4e3[i].id).type;
var flag=false;
for(var j=0;j<type.length;++j){
if(type[j] in this.accept){
flag=true;
break;
}
}
if(!flag){
return false;
}
}
return true;
},copyState:function(_4e4,self){
if(_4e4){
return true;
}
if(arguments.length<2){
self=this==dojo.dnd.manager().target;
}
if(self){
if(this.copyOnly){
return this.selfCopy;
}
}else{
return this.copyOnly;
}
return false;
},destroy:function(){
dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null;
},markupFactory:function(_4e5,node){
_4e5._skipStartup=true;
return new dojo.dnd.Source(node,_4e5);
},onMouseMove:function(e){
if(this.isDragging&&this.targetState=="Disabled"){
return;
}
dojo.dnd.Source.superclass.onMouseMove.call(this,e);
var m=dojo.dnd.manager();
if(!this.isDragging){
if(this.mouseDown&&this.isSource&&(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay)){
var _4e6=this.getSelectedNodes();
if(_4e6.length){
m.startDrag(this,_4e6,this.copyState(dojo.isCopyKey(e),true));
}
}
}
if(this.isDragging){
var _4e7=false;
if(this.current){
if(!this.targetBox||this.targetAnchor!=this.current){
this.targetBox=dojo.position(this.current,true);
}
if(this.horizontal){
_4e7=(e.pageX-this.targetBox.x)<(this.targetBox.w/2);
}else{
_4e7=(e.pageY-this.targetBox.y)<(this.targetBox.h/2);
}
}
if(this.current!=this.targetAnchor||_4e7!=this.before){
this._markTargetAnchor(_4e7);
m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection));
}
}
},onMouseDown:function(e){
if(!this.mouseDown&&this._legalMouseDown(e)&&(!this.skipForm||!dojo.dnd.isFormElement(e))){
this.mouseDown=true;
this._lastX=e.pageX;
this._lastY=e.pageY;
dojo.dnd.Source.superclass.onMouseDown.call(this,e);
}
},onMouseUp:function(e){
if(this.mouseDown){
this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,e);
}
},onDndSourceOver:function(_4e8){
if(this!=_4e8){
this.mouseDown=false;
if(this.targetAnchor){
this._unmarkTargetAnchor();
}
}else{
if(this.isDragging){
var m=dojo.dnd.manager();
m.canDrop(this.targetState!="Disabled"&&(!this.current||m.source!=this||!(this.current.id in this.selection)));
}
}
},onDndStart:function(_4e9,_4ea,copy){
if(this.autoSync){
this.sync();
}
if(this.isSource){
this._changeState("Source",this==_4e9?(copy?"Copied":"Moved"):"");
}
var _4eb=this.accept&&this.checkAcceptance(_4e9,_4ea);
this._changeState("Target",_4eb?"":"Disabled");
if(this==_4e9){
dojo.dnd.manager().overSource(this);
}
this.isDragging=true;
},onDndDrop:function(_4ec,_4ed,copy,_4ee){
if(this==_4ee){
this.onDrop(_4ec,_4ed,copy);
}
this.onDndCancel();
},onDndCancel:function(){
if(this.targetAnchor){
this._unmarkTargetAnchor();
this.targetAnchor=null;
}
this.before=true;
this.isDragging=false;
this.mouseDown=false;
this._changeState("Source","");
this._changeState("Target","");
},onDrop:function(_4ef,_4f0,copy){
if(this!=_4ef){
this.onDropExternal(_4ef,_4f0,copy);
}else{
this.onDropInternal(_4f0,copy);
}
},onDropExternal:function(_4f1,_4f2,copy){
var _4f3=this._normalizedCreator;
if(this.creator){
this._normalizedCreator=function(node,hint){
return _4f3.call(this,_4f1.getItem(node.id).data,hint);
};
}else{
if(copy){
this._normalizedCreator=function(node,hint){
var t=_4f1.getItem(node.id);
var n=node.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}else{
this._normalizedCreator=function(node,hint){
var t=_4f1.getItem(node.id);
_4f1.delItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
}
this.selectNone();
if(!copy&&!this.creator){
_4f1.selectNone();
}
this.insertNodes(true,_4f2,this.before,this.current);
if(!copy&&this.creator){
_4f1.deleteSelectedNodes();
}
this._normalizedCreator=_4f3;
},onDropInternal:function(_4f4,copy){
var _4f5=this._normalizedCreator;
if(this.current&&this.current.id in this.selection){
return;
}
if(copy){
if(this.creator){
this._normalizedCreator=function(node,hint){
return _4f5.call(this,this.getItem(node.id).data,hint);
};
}else{
this._normalizedCreator=function(node,hint){
var t=this.getItem(node.id);
var n=node.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}
}else{
if(!this.current){
return;
}
this._normalizedCreator=function(node,hint){
var t=this.getItem(node.id);
return {node:node,data:t.data,type:t.type};
};
}
this._removeSelection();
this.insertNodes(true,_4f4,this.before,this.current);
this._normalizedCreator=_4f5;
},onDraggingOver:function(){
},onDraggingOut:function(){
},onOverEvent:function(){
dojo.dnd.Source.superclass.onOverEvent.call(this);
dojo.dnd.manager().overSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOver();
}
},onOutEvent:function(){
dojo.dnd.Source.superclass.onOutEvent.call(this);
dojo.dnd.manager().outSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOut();
}
},_markTargetAnchor:function(_4f6){
if(this.current==this.targetAnchor&&this.before==_4f6){
return;
}
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.targetAnchor=this.current;
this.targetBox=null;
this.before=_4f6;
if(this.targetAnchor){
this._addItemClass(this.targetAnchor,this.before?"Before":"After");
}
},_unmarkTargetAnchor:function(){
if(!this.targetAnchor){
return;
}
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
},_markDndStatus:function(copy){
this._changeState("Source",copy?"Copied":"Moved");
},_legalMouseDown:function(e){
if(!dojo.mouseButtons.isLeft(e)){
return false;
}
if(!this.withHandles){
return true;
}
for(var node=e.target;node&&node!==this.node;node=node.parentNode){
if(dojo.hasClass(node,"dojoDndHandle")){
return true;
}
if(dojo.hasClass(node,"dojoDndItem")||dojo.hasClass(node,"dojoDndIgnore")){
break;
}
}
return false;
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(node,_4f7){
this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource");
},markupFactory:function(_4f8,node){
_4f8._skipStartup=true;
return new dojo.dnd.Target(node,_4f8);
}});
dojo.declare("dojo.dnd.AutoSource",dojo.dnd.Source,{constructor:function(node,_4f9){
this.autoSync=true;
},markupFactory:function(_4fa,node){
_4fa._skipStartup=true;
return new dojo.dnd.AutoSource(node,_4fa);
}});
}
if(!dojo._hasResource["wm.base.widget.Layers.TabsDecorator"]){
dojo._hasResource["wm.base.widget.Layers.TabsDecorator"]=true;
dojo.provide("wm.base.widget.Layers.TabsDecorator");
dojo.declare("wm.TabsDecorator",[wm.LayersDecorator,wm.TouchMixinOptional],{decorationClass:"wmtablayers",decoratorPadding:"7, 0, 0, 0",verticalDecoratorPadding:"0,0,0,7",undecorate:function(){
this.inherited(arguments);
this.tabsControl.destroy();
},decorateContainer:function(){
this.inherited(arguments);
this.btns=[];
if(this.tabsControl){
this.tabsControl.destroy();
}
this.tabsControl=new wm.TabsControl({parent:this.decoree,owner:this.decoree,padding:this.decoree.verticalButtons?this.verticalDecoratorPadding:this.decoratorPadding,name:"tabsControl"});
this.decoree.moveControl(this.tabsControl,0);
if(this.decoree.verticalButtons){
this.decoree.setLayoutKind("left-to-right");
}
if(this.decoree.dndTargetName||this.decoree._designer){
this.dndObj=new dojo.dnd.Source(this.tabsControl.domNode,{accept:[this.decoree.dndTargetName||"designMoveLayers"]});
this.dndObjConnect=this.tabsControl.connect(this.dndObj,"onDndDrop",this,"onTabDrop");
}
},createTab:function(_4fb,_4fc,_4fd){
var b=this.btns[_4fc]=document.createElement("button");
dojo.attr(b,"id",this.decoree.domNode.id+"_decorator_button"+this.btns.length);
dojo.attr(b,"type","button");
dojo.attr(b,"type","button");
b.style.display=_4fd.showing?"":"none";
this.setBtnText(b,_4fb,_4fd.closable||_4fd.destroyable);
if(!wm.isMobile){
this.decoree.connect(b,"onclick",dojo.hitch(this,"onTabClick",_4fd));
}else{
this.addTouchListener(b);
}
var _4fe=(this.decoree.verticalButtons)?"-verticaltab":"-tab";
b.className=this.decorationClass+_4fe+(_4fd.closable||_4fd.destroyable?" "+this.decorationClass+"-closabletab":"");
if(!_4fb){
b.style.display="none";
}
this.tabsControl.domNode.appendChild(b);
if(this.dndObj){
this.dndObj.destroy();
dojo.disconnect(this.dndObjConnect);
dojo.addClass(b,"dojoDndItem");
dojo.attr(b,"dndType",this.decoree.dndTargetName||"designMoveLayers");
this.dndObj=new dojo.dnd.Source(this.tabsControl.domNode,{accept:[this.decoree.dndTargetName||"designMoveLayers"]});
this.dndObjConnect=this.tabsControl.connect(this.dndObj,"onDndDrop",this,"onTabDrop");
}
},onTabClick:function(_4ff,evt){
if(this.decoree.isDesignLoaded()){
dojo.stopEvent(evt);
}
if(evt.type=="submit"){
return;
}
var _500={target:evt.target,clientX:evt.clientX,clientY:evt.clientY};
wm.onidle(this,function(){
this.tabClicked(_4ff,_500);
_500.target.style.borderWidth="";
});
},onTouchStart:function(_501){
var _502=_501.target;
while(_502.tagName!="BUTTON"&&_502.tagName!="BODY"){
_502=_502.parentNode;
}
var _503=dojo.indexOf(this.btns,_502);
if(_503>=0){
this._touchedLayer=this.decoree.layers[_503];
}
},onTouchMove:function(_504,_505,_506,_507,_508,_509,_50a){
},onTouchEnd:function(_50b,_50c){
if(!_50c){
this.tabClicked(this._touchedLayer,_50b);
}
delete this._touchedLayer;
},getRuntimeId:function(){
return this.decoree.getRuntimeId()+".decorator";
},onTabDrop:function(_50d,_50e,copy,_50f,_510){
if(dojo.dnd.manager().target!=this.dndObj){
return;
}
var _511=wm.getWidgetByDomNode(_50e[0]);
var _512=dojo.indexOf(_511.decorator.btns,_50e[0]);
if(_512==-1){
return;
}
var _513=_511.layers[_512];
if(!_513){
return;
}
var _514=dojo.indexOf(this.tabsControl.domNode.childNodes,_50e[0]);
var _515=false;
var _516=_513.parent!=this.decoree;
if(_516){
_513.setParent(this.decoree);
var _517=_511.layerIndex;
_511.layerIndex=-1;
_511.setLayerIndex(_511.layers.length>_517?_517:_511.layers.length-1);
var _518=this.btns;
var _519=this.tabsControl.domNode.childNodes;
if(_514==this.btns.length-1){
_515=true;
}
if(_50e[0].parentNode){
dojo.destroy(_50e[0]);
}
}else{
if(_512==_514){
_515=true;
}
}
if(_515){
var x=_510.offsetX;
var _51a=false;
for(var i=0;i<this.btns.length;i++){
var b=this.btns[i];
var _51b=dojo.marginBox(b);
_51b.l+=dojo._getContentBox(b).l;
if(_51b.l>x){
_514=i;
_51a=true;
break;
}
}
if(!_51a){
_514=this.btns.length;
}else{
if(_514>_512&&!_516){
_514--;
}
}
}
this.decoree.moveLayerIndex(_513,_514);
if(this.decoree.isDesignLoaded()){
studio.refreshWidgetsTree();
}
_513.activate();
_513.onTabDrop();
if(_511!=this.decoree&&_511.onTabRemoved){
_511.onTabRemoved();
}
this.decoree.onTabDrop();
},tabClicked:function(_51c,e){
var d=this.decoree;
var _51d=dojo.hasClass(e.target,"TabCloseIcon");
if(!_51d&&(_51c.closable||_51c.destroyable)){
var _51e=dojo.coords(e.target.firstChild);
var _51f=dojo.coords(e.target);
if(e.clientX>=_51e.x&&e.clientY<=_51e.y+_51e.h){
_51d=true;
}
}
if(_51d){
if(_51c.customCloseOrDestroy!=_51c.constructor.prototype.customCloseOrDestroy){
return _51c.customCloseOrDestroy(_51c);
}
_51c.onCloseOrDestroy();
if(_51c.parent.customCloseOrDestroy!=_51c.parent.constructor.prototype.customCloseOrDestroy){
return _51c.parent.customCloseOrDestroy(_51c.parent,_51c);
}
var _520=_51c.parent.getActiveLayer();
var _521=_520.getIndex();
var _522=_51c.parent;
_522.onCloseOrDestroy(_51c);
if(_51c.destroyable){
_51c.destroy();
}else{
_51c.hide();
}
this.decoree.renderBounds();
if(!_520.isDestroyed){
_520.activate();
_520.parent.layerIndex=dojo.indexOf(_520.parent.layers,_520);
}else{
if(_521>0){
_522.setLayerIndex(_521-1);
}else{
_522.setLayerIndex(0);
}
}
}else{
d.setLayer(_51c);
}
},decorateLayer:function(_523,_524){
this.inherited(arguments);
this.createTab(_523.caption,_524,_523);
},undecorateLayer:function(_525,_526){
dojo._destroyElement(this.btns[_526]);
this.btns.splice(_526,1);
},setLayerShowing:function(_527,_528){
var i=_527.getIndex();
if(i!=-1){
this.btns[i].style.display=_528?"":"none";
}
this.inherited(arguments);
},setLayerActive:function(_529,_52a){
var b=this.btns[_529.getIndex()];
if(b){
dojo[_52a?"addClass":"removeClass"](b,this.decorationClass+"-selected");
}
this.inherited(arguments);
},applyLayerCaption:function(_52b){
var d=this.decoree,i=_52b.getIndex();
if(i!=-1){
this.setBtnText(this.btns[i],_52b.caption,_52b.closable||_52b.destroyable);
}
},setBtnText:function(_52c,_52d,_52e){
var _52f=dojo.indexOf(this.btns,_52c);
var _530=this.decoree.layers[_52f];
if(_52d){
if(_52c.style.display&&_530.showing){
_52c.style.display="";
}
dojo[_52e?"addClass":"removeClass"](_52c,this.decorationClass+"-closabletab");
_52c.innerHTML=(_52e?"<span class='TabCloseIcon'>x</span>":"")+(_52d||"&nbsp;");
}else{
_52c.style.display="none";
}
},getBtn:function(_531){
var d=this.decoree,i=d.indexOfLayerCaption(_531);
if(i!=-1){
return this.btns[i];
}
},disenableTab:function(_532,_533){
var b=this.getBtn(_532);
if(b){
b.disabled=_533?"disabled":"";
}
},disableTab:function(_534){
this.disenableTab(_534,true);
},enableTab:function(_535){
this.disenableTab(_535,false);
},moveLayerIndex:function(_536,_537){
this.inherited(arguments);
var d=this.tabsControl.domNode,f=this.btns[_536],t=this.btns[_537],c=this.decoree.getCount()-1;
if(_537<_536){
d.insertBefore(f,t);
}else{
if(_537>_536){
if(_537==c){
d.appendChild(f);
}else{
var nl=this.btns[_537+1];
if(nl){
d.insertBefore(f,nl);
}
}
}
}
wm.Array.removeElement(this.btns,f);
wm.Array.insertElementAt(this.btns,f,_537);
}});
dojo.declare("wm.RoundedTabsDecorator",wm.TabsDecorator,{});
dojo.declare("wm.TabsControl",wm.Control,{height:"27px",width:"100%",border:0,init:function(){
if(this.parent&&this.parent.isRelativePositioned){
this.isRelativePositioned=true;
}
dojo.addClass(this.domNode,"wmtablayers-tabbar");
if(this.owner){
if(this.owner.verticalButtons){
this.height="100%";
this.width=this.owner.headerWidth;
}else{
this.height=this.owner._headerHeight;
}
}
this.inherited(arguments);
},updateHeaderHeight:function(){
if(this.owner._lockHeaderHeight){
return this.bounds.h;
}
var _538=dojo.marginBox(this.domNode).h;
return _538;
if(_538!=_currHeight){
dojo.marginBox(this.domNode,{h:_currHeight});
return _538;
}
return false;
}});
}
if(!dojo._hasResource["wm.base.widget.Layers"]){
dojo._hasResource["wm.base.widget.Layers"]=true;
dojo.provide("wm.base.widget.Layers");
dojo.declare("wm.Layer",wm.Container,{height:"100%",width:"100%",caption:"",layoutKind:"top-to-bottom",closable:false,destroyable:false,showDirtyFlag:false,destroy:function(){
this._isLayerDestroying=true;
var _539=this.parent;
if(_539&&_539 instanceof wm.Layers&&!_539.isDestroyed){
_539.setCaptionMapLayer(this.caption,null);
}
this.inherited(arguments);
if(_539&&_539.conditionalTabButtons&&!_539.decorator.tabsControl.isDestroyed){
_539.decorator.tabsControl.setShowing(_539.getVisibleLayerCount()>1);
}
},init:function(){
this.inherited(arguments);
if(this.title){
this.caption=this.title;
delete this.title;
}
this.setCaption(this.caption);
if(!this.isRelativePositioned){
dojo.addClass(this.domNode,"wmlayer");
}
},setParent:function(_53a){
this.inherited(arguments);
if(this.parent){
if(this.border===wm.Layer.prototype.border){
this.setBorder(this.parent.clientBorder);
}
if(this.borderColor===wm.Layer.prototype.borderColor){
this.setBorderColor(this.parent.clientBorderColor);
}
}
},setName:function(_53b){
if(this.parent){
delete this.parent.widgets[this.name];
}
this.addRemoveDefaultCssClass(false);
wm.Component.prototype.setName.apply(this,arguments);
if(this.parent){
this.parent.widgets[this.name]=this;
}
this.addRemoveDefaultCssClass(true);
},activate:function(){
var p=this.parent;
if((this.showing||wm.BreadcrumbLayers&&this.parent instanceof wm.BreadcrumbLayers)&&!this.isActive()){
if(!this.showing){
this.show();
}
p.setLayer(this);
}
},activateAllParents:function(){
var p=this.parent;
p.setLayer(this);
var _53c=this.parent.isAncestorInstanceOf(wm.Layer);
if(_53c){
_53c.activateAllParents();
}else{
_53c=this.parent.isAncestorInstanceOf(wm.Dialog);
if(_53c){
_53c.show();
}
}
},update:function(){
this.activate();
},isActive:function(){
return this.active;
},setShowing:function(_53d){
if(!this.canChangeShowing()){
return;
}
var p=this.parent;
if(this.showing!=_53d){
this.showing=_53d;
this.decorator.setLayerShowing(this,_53d);
if(!_53d&&p.layerIndex==this.getIndex()){
p.setNext();
}
}
if(p&&p.conditionalTabButtons&&!p.decorator.tabsControl.isDestroyed){
p.decorator.tabsControl.setShowing(p.getVisibleLayerCount()>1);
}
},show:function(){
this.setShowing(true);
},hide:function(){
this.setShowing(false);
},setCaption:function(_53e){
this.caption=_53e;
if(this.parent){
this.parent.setCaptionMapLayer(_53e,this);
}
if(this.decorator){
this.decorator.applyLayerCaption(this);
}
},setIsDirty:function(_53f){
if(this.isDirty!=_53f){
this.isDirty=_53f;
if(this.showDirtyFlag){
var _540=this.caption;
_540=_540.replace(/^\<span class="DirtyTab"\>\*\<\/span\>\s*/,"");
if(_53f){
_540="<span class=\"DirtyTab\">*</span> "+_540;
}
this.setCaption(_540);
}
}
},getIndex:function(){
var p=this.parent;
return p&&p.indexOfLayer(this);
},onShow:function(){
this.callOnShowParent();
},onDeactivate:function(){
},onCloseOrDestroy:function(){
},customCloseOrDestroy:function(){
},setClosable:function(_541){
this.closable=_541;
this.decorator.applyLayerCaption(this);
},setDestroyable:function(_542){
this.destroyable=_542;
this.decorator.applyLayerCaption(this);
},handleBack:function(_543){
if(this.active){
return false;
}
this.activate();
return true;
},onTabDrop:function(){
}});
dojo.declare("wm.Layers",wm.Container,{manageHistory:true,manageURL:false,isMobileFoldingParent:false,transition:"none",clientBorder:"",clientBorderColor:"",layerIndex:-1,defaultLayer:-1,decoratorClass:wm.LayersDecorator,layersType:"Layers",layoutKind:"top-to-bottom",height:"100%",width:"100%",destroy:function(){
this.inherited(arguments);
if(this.decorator){
this.decorator.destroy();
this.decorator=null;
}
this.layers=null;
this.captionMap=null;
this.client=null;
},prepare:function(){
this.layers=[];
this.captionMap=[];
this.inherited(arguments);
var _544=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop";
this._headerHeight=(_544&&this.mobileHeaderHeight)?this.mobileHeaderHeight||this.headerHeight:this.headerHeight;
},build:function(){
this.inherited(arguments);
this.setLayersType(this.layersType);
},init:function(){
this.userDefHeaderHeight=this.headerHeight;
if(!this.isRelativePositioned){
dojo.addClass(this.domNode,"wmlayers");
}else{
this.setHeaderHeight("20px");
}
this.client=new wm.Panel({isRelativePositioned:this.isRelativePositioned,border:"0",margin:"0",padding:"0",name:"client",parent:this,owner:this,height:"100%",width:"100%",verticalAlign:"top",horizontalAlign:"left",flags:{notInspectable:true,bindInspectable:true}});
this.inherited(arguments);
this._isDesign=this.isDesignLoaded();
},postInit:function(){
this.inherited(arguments);
this._initDefaultLayer();
if(wm.widgetIsShowing(this)){
this._fireLayerOnShow();
}
if(this.manageURL&&this.owner.locationState){
this.restoreFromLocationHash(this.owner.locationState[this.getRuntimeId()]);
}
},_initDefaultLayer:function(){
var d=this.defaultLayer;
d=d!=-1?d:0;
var dl=this.getLayer(d);
if(dl&&!dl.showing){
d=this._getNextShownIndex(d);
dl=this.getLayer(d);
}
if(dl){
this._setLayerIndex(dl.getIndex());
}
},getVisibleLayerCount:function(){
var _545=0;
for(var i=0;i<this.layers.length;i++){
if(this.layers[i].showing){
_545++;
}
}
return _545;
},createLayer:function(_546){
var _547=_546;
if(!_547){
_547=this.owner.getUniqueName("layer1");
}
var name=_547;
if(name){
name=name.replace(/\s/g,"_");
}
var _548=this.owner.getUniqueName(name);
var _549={width:"100%",height:"100%",caption:_547,parent:this,horizontalAlign:"left",verticalAlign:"top",themeStyleType:this.themeStyleType,border:this.clientBorder,borderColor:this.clientBorderColor};
var o=this.getRoot();
if(o){
return o.createComponent(_548,"wm.Layer",_549);
}
},addPageContainerLayer:function(_54a,_54b,_54c){
var _54d=this.getLayerByCaption(_54b);
if(_54d){
if(_54c||_54c===undefined){
_54d.activate();
}
return _54d;
}
_54d=this.createLayer(_54b);
new wm.PageContainer({owner:this.owner,parent:_54d,name:this.owner.getUniqueName(_54d.name+"PageContainer"),width:"100%",height:"100%",pageName:_54a,deferLoad:false});
if(_54c||_54c===undefined){
_54d.activate();
}
if(this.conditionalTabButtons){
this.decorator.tabsControl.setShowing(this.getVisibleLayerCount()>1);
}
return _54d;
},themeStyleType:"",setThemeStyleType:function(_54e){
this.themeStyleType=_54e;
for(var i=0;i<this.layers.length;i++){
this.layers[i].setThemeStyleType(_54e);
}
},setClientBorder:function(_54f){
this.clientBorder=_54f;
var _550=this.isDesignLoaded()?"set_border":"setBorder";
for(var i=0;i<this.layers.length;i++){
this.layers[i][_550](_54f);
}
},setClientBorderColor:function(_551){
this.clientBorderColor=_551;
for(var i=0;i<this.layers.length;i++){
this.layers[i].setBorderColor(_551);
}
},addLayer:function(_552,_553){
var pg=this.createLayer(_552);
if(!_553){
this._setLayerIndex(this.getCount()-1);
}else{
pg.active=false;
}
return pg;
},addWidget:function(_554){
if(_554 instanceof wm.Layer){
this.client.addWidget(_554);
this.layers.push(_554);
this.setCaptionMapLayer(_554.caption,_554);
if(this.decorator){
this.decorator.decorateLayer(_554,this.getCount()-1);
this.decorator.setLayerActive(_554,false);
}
}else{
this.inherited(arguments);
}
},removeWidget:function(_555){
if(_555 instanceof wm.Layer){
var _556=_555.isActive();
var i=this.indexOfLayer(_555);
this.layers.splice(i,1);
this.setCaptionMapLayer(_555.caption,null);
this.decorator.undecorateLayer(_555,i);
_555.active=false;
_555.inFlow=false;
this.client.removeWidget(_555);
if(_556&&!this._isDestroying&&this.layers.length){
if(this.layers.length>i){
this.layerIndex=-1;
this.setLayerIndex(i);
}else{
this.setLayerIndex(i-1);
}
}else{
if(!this._isDestroying&&i<=this.layerIndex){
this.layerIndex--;
}
}
}else{
this.inherited(arguments);
}
},addControl:function(_557){
if(_557.owner==this){
this.inherited(arguments);
}else{
if(_557 instanceof wm.Layer){
this.client.addControl(_557);
}
}
},removeControl:function(_558){
if(_558.owner==this){
this.inherited(arguments);
}else{
if(_558 instanceof wm.Layer){
this.client.removeControl(_558);
}
}
},insertControl:function(_559,_55a){
if(_559 instanceof wm.Layer){
this.addControl(_559);
this.moveLayerIndex(_559,_55a);
}else{
this.inherited(arguments);
}
},moveControl:function(_55b,_55c){
if(_55b instanceof wm.Layer){
if(dojo.indexOf(this.layers,_55b)!=-1){
this.moveLayerIndex(_55b,_55c);
this.client.moveControl(_55b,_55b.getIndex());
}else{
}
}else{
this.inherited(arguments);
}
},isWidgetTypeAllowed:function(_55d){
return _55d=="wm.Layer";
},getLayer:function(_55e){
return this.layers[_55e!=undefined?_55e:this.layerIndex];
},getActiveLayer:function(){
if(this.layerIndex!=-1){
return this.layers[this.layerIndex];
}
var _55f=(this.defaultLayer==-1)?0:this.defaultLayer;
return this.layers[_55f];
},removeLayer:function(_560){
if(!this.layers){
return;
}
var p=this.getLayer(_560);
if(p){
this.removeWidget(p);
}
},indexOfLayer:function(_561){
for(var i=0,l;(l=this.getLayer(i));i++){
if(l==_561){
return i;
}
}
return -1;
},indexOfLayerName:function(_562){
for(var i=0,l;(l=this.getLayer(i));i++){
if(l.name==_562){
return i;
}
}
return -1;
},indexOfLayerCaption:function(_563){
return this.indexOfLayer(this.captionMap[_563]);
},getLayerCaption:function(_564){
var p=this.getLayer(_564);
return p&&p.caption;
},getLayerByCaption:function(_565){
return this.getLayer(this.indexOfLayerCaption(_565));
},setLayerByCaption:function(_566){
var p=this.captionMap[_566];
this.setLayerByName(p&&p.name?p.name:_566);
},setLayerByName:function(_567){
var l=this.client.widgets[_567];
if(l){
this.setLayer(l);
}else{
if(_567){
this.addLayer(_567);
}
}
},setLayer:function(_568){
if(_568 instanceof wm.Layer){
this.setProp("layerIndex",_568.getIndex());
}else{
this.setLayerByName(_568);
}
},setLayerInactive:function(_569){
wm.fire(_569.decorator,"deactivateLayer",[_569]);
_569.onDeactivate();
_569.onHide();
},setLayerIndex:function(_56a){
if(_56a==this.layerIndex){
return;
}
var _56b=!this.loading;
var _56c=this.layers[this.layerIndex];
var l=this.getLayer(_56a);
if(_56b){
var info={newIndex:_56a,canChange:undefined};
this.oncanchange(info);
if(info.canChange===false){
return;
}
_56a=info.newIndex;
}
if(_56a<0||_56a>this.getCount()-1){
return;
}
if(_56b&&_56c){
_56c.callOnHideParent();
}
this._setLayerIndex(_56a);
if(_56b){
if(l){
if(app.debugDialog&&!this.isAncestor(app.debugDialog)){
var i=0;
var _56d=arguments.callee.caller;
var _56e=["setProp","setLayer","setLayerByName","setLayerByCaption","addLayer","activate","update"];
while(_56d&&dojo.indexOf(_56e,_56d.nom)!=-1&&i<15){
_56d=_56d.caller;
i++;
}
var _56f=app.debugDialog.newLogEvent({eventType:"layer",sourceDescription:(_56d&&_56d.nom?_56d.nom+"()":""),resultDescription:"Activating Layer: "+l.getRuntimeId()+".activate()",firingId:l.getRuntimeId(),affectedId:l.getRuntimeId(),method:"hide"});
}
l.onShow();
if(_56f){
app.debugDialog.endLogEvent(_56f);
}
}
if(_56c){
_56c.onDeactivate();
_56c.onHide();
}
}
if(_56b&&this.lastLayerIndex!=this.layerIndex){
this.onchange(this.layerIndex);
}
if(!this._initialization&&_56c&&!this._isDesignLoaded&&this.manageHistory){
app.addHistory({id:_56c.getRuntimeId(),options:{},title:"Show "+l.caption});
}
},_setLayerIndex:function(_570){
this.lastLayerIndex=this.layerIndex;
this.layerIndex=_570;
var l=this.getLayer(_570);
if(l){
this.decorator.activateLayer(l);
var page=this.getParentPage();
if(page&&page.validateVisibleOnly){
this.validate();
}
}
},setDecoratorClass:function(_571){
this.decoratorClass=_571;
this.createDecorator();
},createDecorator:function(){
if(this.decorator){
this.decorator.destroy();
}
this.decorator=this.decoratorClass?new this.decoratorClass(this):null;
},setLayersType:function(_572){
var ctor=wm[_572+"Decorator"];
if(!ctor){
return;
}
this.layersType=_572;
var i=this.layerIndex;
if(this.decorator){
this.decorator.undecorate();
this.decorator.destroy();
this.decorator=null;
}
this.setDecoratorClass(ctor);
this.decorator.decorate();
this._setLayerIndex(i);
this.reflow();
},setDefaultLayer:function(_573){
this.defaultLayer=_573;
},getCount:function(){
return this.layers.length;
},setCaptionMapLayer:function(_574,_575){
try{
this.captionMap[_574]=_575;
}
catch(e){
}
},_getNextShownIndex:function(_576,_577){
var _578=this.layers.length;
for(var i=_576+1;i<_578&&!this.layers[i].showing;i++){
}
if(this.layers[i]&&this.layers[i].showing){
return i;
}
if(!_577){
return this._getPrevShownIndex(_576,true);
}
return 0;
},_getPrevShownIndex:function(_579,_57a){
for(var i=_579-1;i>=0&&!this.layers[i].showing;i--){
}
if(this.layers[i]&&this.layers[i].showing){
return i;
}
if(!_57a){
return this._getNextShownIndex(_579,true);
}
return 0;
},setNext:function(_57b){
var p=this._getNextShownIndex(Number(this.layerIndex),false);
if(p!==undefined){
this.setLayerIndex(p);
}
},setPrevious:function(_57c){
var p=this._getPrevShownIndex(Number(this.layerIndex),false);
if(p!==undefined){
this.setLayerIndex(p);
}
},moveLayerIndex:function(_57d,_57e){
if(_57e==-1){
_57e=this.layers.length-1;
}
var i=_57d.getIndex(),_57e=Math.max(0,Math.min(_57e,this.getCount()-1));
if(i==_57e){
return;
}
this.layers.splice(i,1);
this.layers.splice(_57e,0,_57d);
this.decorator.moveLayerIndex(i,_57e);
if(_57d.active){
this._setLayerIndex(_57e);
}else{
for(var i=0;i<this.layers.length;i++){
if(this.layers[i].active){
this.layerIndex=i;
break;
}
}
}
},_fireLayerOnShow:function(){
var l=this.getLayer(this.layerIndex);
l&&l.onShow();
},_onShowParent:function(){
this._fireLayerOnShow();
},clear:function(){
wm.forEach(this.widgets,function(w){
w.destroy();
});
this.widgets={};
this.layers=[];
this.domNode.innerHTML="";
},_oncanchangeBeforeStart:1,oncanchange:function(_57f){
var l=this.getLayer(_57f.newIndex);
_57f.canChange=(l&&l.showing);
},onchange:function(_580){
},headerHeight:"27px",mobileHeaderHeight:"37px",setHeaderHeight:function(_581){
if(this.layersType!="Tabs"&&this.layersType!="RoundedTabs"&&this.layersType!="Wizard"&&this.layersType!="Breadcrumb"){
return;
}
this._headerHeight=_581;
this.decorator&&this.decorator.tabsControl&&this.decorator.tabsControl.setHeight(_581);
delete this._lastTabHeight;
this.renderBounds();
},renderBounds:function(){
this.inherited(arguments);
if(this.layersType!="Tabs"&&this.layersType!="RoundedTabs"){
return;
}
if(!this.decorator||!this.decorator.tabsControl){
return;
}
if(this.decorator.tabsControl.isDestroyed){
return;
}
wm.job(this.getRuntimeId()+".renderBounds",10,this,function(){
if(this.isDestroyed||this._lockHeaderHeight){
return;
}
if(this.decorator.btns.length<=1){
return;
}
var _582=this.decorator.tabsControl.bounds.h;
this.decorator.tabsControl.domNode.style.height="auto";
var _583;
var _584,_585;
for(var i=this.decorator.btns.length-1;i>=1;i--){
if(this.decorator.btns[i].style.display!="none"){
if(!_585){
_585=this.decorator.btns[i];
}
_584=this.decorator.btns[i];
break;
}
}
if(_584&&Math.abs(_585.offsetTop-_584.offsetTop)>4){
if(this._headerHeight==this.decorator.tabsControl.height){
this.decorator.tabsControl.domNode.style.height=this.decorator.tabsControl.bounds.h+"px";
}else{
this.decorator.tabsControl.setHeight(this._headerHeight);
}
}else{
_583=Math.max(this.decorator.tabsControl.domNode.clientHeight,parseInt(this._headerHeight));
if(_583!=this.decorator.tabsControl.bounds.h){
this.decorator.tabsControl.setHeight(_583+"px");
}else{
this.decorator.tabsControl.domNode.style.height=this.decorator.tabsControl.bounds.h+"px";
}
}
});
},getMinHeightProp:function(){
if(this.minHeight){
return this.minHeight;
}
var _586=15;
if(this.layersType.match(/tabs/i)){
_586+=parseInt(this._headerHeight);
}
return _586;
},getMinWidthProp:function(){
if(this.minWidth){
return this.minWidth;
}
var _587=80;
if(this.layersType.match(/tabs/i)){
_587+=120;
}
return _587;
},restoreFromLocationHash:function(_588){
var _589=_588;
if(_589!==undefined){
var w=this.manageHistory;
this.manageHistory=false;
var _58a=Number(_588);
this.setLayerIndex(_588);
this.manageHistory=w;
}
},generateStateUrl:function(_58b){
if(!this._isDesignLoaded&&this.getActiveLayer()){
var _58c=this.defaultLayer==-1?0:this.defaultLayer;
var _58d=this.layerIndex;
if(_58d!=_58c&&!this.getActiveLayer()._mobileFoldingGenerated){
_58b[this.getRuntimeId()]=this.layerIndex;
}
}
}});
dojo.declare("wm.TabLayers",wm.Layers,{dndTargetName:"",themeStyleType:"ContentPanel",layersType:"Tabs",conditionalTabButtons:false,verticalButtons:false,headerWidth:"50px",postInit:function(){
this.inherited(arguments);
if(this.conditionalTabButtons){
this.decorator.tabsControl.setShowing(this.getVisibleLayerCount()>1);
}
},addLayer:function(_58e,_58f){
var _590=this.inherited(arguments);
if(!this._cupdating&&!this.owner._loadingPage){
this.renderBounds();
}
if(this.conditionalTabButtons){
this.decorator.tabsControl.setShowing(this.getVisibleLayerCount()>1);
}
return _590;
},removeLayer:function(_591){
this.inherited(arguments);
if(this.conditionalTabButtons&&!this.isDestroyed){
this.decorator.tabsControl.setShowing(this.getVisibleLayerCount()>1);
}
},onCloseOrDestroy:function(_592){
},customCloseOrDestroy:function(_593){
},onTabDrop:function(){
},onTabRemoved:function(){
}});
}
if(!dojo._hasResource["wm.base.RbacPlugin"]){
dojo._hasResource["wm.base.RbacPlugin"]=true;
dojo.provide("wm.base.RbacPlugin");
wm.Plugin.plugin("rbac",wm.Widget,{roles:"",prepare:function(){
this.rbacSocket(arguments);
if(this.roles&&this.roles.length&&app.isSecurityEnabled){
this._rbacShowingRequested=this.showing;
this.showing=this.updateRbacShowing(this.showing);
this.subscribe("wmRbacUpdate",this,"reshowRbac");
}
},reshowRbac:function(){
this.setShowing(this._rbacShowingRequested);
},setShowing:function(_594){
if(this instanceof wm.Layer==false&&this.roles){
_594=this.updateRbacShowing(_594);
}
this.rbacSocket(arguments);
},updateRbacShowing:function(_595){
if(!this._cupdating){
this._rbacShowingRequested=_595;
}
return _595&&this.isRbacShowAllowed();
},isRbacShowAllowed:function(){
var _596=this._getUserRoles();
if(_596){
for(var i=0,r;(r=this.roles[i]);i++){
for(var j=0,ur;(ur=_596[j]);j++){
if(r==ur){
return true;
}
}
}
return false;
}
return true;
},_getUserRoles:function(){
if(this.isDesignLoaded()){
return null;
}else{
return wm.getUserRoles();
}
}});
wm.Plugin.plugin("rbacLayer",wm.Layer,{setShowing:function(_597){
if(this.roles&&this.roles.length){
_597=this.updateRbacShowing(_597);
}
this.rbacLayerSocket(arguments);
}});
wm.Plugin.plugin("rbacservice",wm.ServiceVariable,{roles:"",update:function(){
if(djConfig.isDebug){
try{
this.log("update",arguments.callee.caller.nom||arguments.callee.caller.name||"anonymous");
}
catch(e){
}
}
if(!this.roles||this.isRbacUpdateAllowed()){
return this.rbacserviceSocket(arguments);
}else{
return new dojo.Deferred();
}
},updateInternal:function(){
if(!this.roles||this.isRbacUpdateAllowed()){
return this.rbacserviceSocket(arguments);
}else{
}
},isRbacUpdateAllowed:function(){
var _598=this._getUserRoles();
if(_598){
for(var i=0,r;(r=this.roles[i]);i++){
for(var j=0,ur;(ur=_598[j]);j++){
if(r==ur){
return true;
}
}
}
return false;
}
return true;
},_getUserRoles:function(){
if(this.isDesignLoaded()){
return null;
}else{
return wm.getUserRoles();
}
}});
}
if(!dojo._hasResource["wm.base.MobilePlugin"]){
dojo._hasResource["wm.base.MobilePlugin"]=true;
dojo.provide("wm.base.MobilePlugin");
wm.Plugin.plugin("mobile",wm.Control,{deviceSizes:"",prepare:function(_599){
this.mobileSocket(arguments);
if(this.deviceSizes||_599.deviceSizes||window["studio"]&&this.deviceType){
this._mobileShowingRequested=this.showing;
this.showing=this.updateMobileShowing(this.showing);
this.subscribe("deviceSizeRecalc",this,"reshowMobile");
}
},reshowMobile:function(){
this.setShowing(this._mobileShowingRequested||this.showing);
},setShowing:function(_59a){
if(this instanceof wm.Layer==false&&this.deviceSizes||this._isDesignLoaded&&this.deviceType){
_59a=this.updateMobileShowing(_59a);
}
this.mobileSocket(arguments);
},updateMobileShowing:function(_59b){
if(!this._cupdating){
this._mobileShowingRequested=_59b;
}
if(this.deviceSizes&&this.deviceSizes.length||this._isDesignLoaded&&this.deviceType){
return _59b&&this.isMobileShowAllowed();
}else{
return _59b;
}
},isMobileShowAllowed:function(){
if(window["studio"]&&this.isDesignLoaded()){
var _59c=studio.currentDeviceType;
if(_59c&&this.deviceType&&dojo.indexOf(this.deviceType,_59c)==-1){
return false;
}
var _59d=studio.deviceSizeSelect.getDataValue();
if(!_59d){
return true;
}
if(_59c=="desktop"||studio.portraitToggleButton.clicked){
_59d=_59d.width;
}else{
_59d=_59d.height;
}
if(_59d=="100%"){
return true;
}
_59d=app.appRoot.calcDeviceSize(parseInt(_59d));
var isOk=true;
if(this.deviceSizes&&dojo.indexOf(this.deviceSizes,_59d)==-1){
return false;
}
return true;
}else{
var _59d=app.appRoot.deviceSize;
return (!_59d||dojo.indexOf(this.deviceSizes,_59d)!=-1);
}
}});
wm.Plugin.plugin("mobileLayer",wm.Layer,{deviceSizes:"",setShowing:function(_59e){
_59e=this.updateMobileShowing(_59e);
this.mobileLayerSocket(arguments);
}});
}
if(!dojo._hasResource["wm.base.I18nPlugin"]){
dojo._hasResource["wm.base.I18nPlugin"]=true;
dojo.provide("wm.base.I18nPlugin");
wm.getDictionaryItem=function(name,_59f){
if(_59f==undefined){
return wm.locale.phrases[name];
}
var _5a0={};
for(var i in _59f){
_5a0[i]=(_59f[i]===undefined||_59f[i]===null)?"":_59f[i];
}
return dojo.string.substitute(wm.locale.phrases[name],_5a0);
};
wm.Plugin.plugin("i18n",wm.Component,{prepare:function(_5a1){
if(_5a1&&_5a1.owner){
var _5a2=_5a1.owner.getDictionaryItem(_5a1.name);
}
if(_5a2){
_5a1=dojo.mixin(_5a1,_5a2);
}
if(wm.branding){
var app=_5a1.owner?_5a1.owner.getOwnerApp():null;
if(app&&app._brandingDictionary){
var _5a3=_5a1.owner;
var _5a4;
if(_5a3==app){
_5a4="app";
}else{
if(_5a3 instanceof wm.Page){
_5a4=_5a3.declaredClass;
}
}
if(_5a4&&app._brandingDictionary[_5a4]&&app._brandingDictionary[_5a4][_5a1.name]){
var _5a5=app._brandingDictionary[_5a4][_5a1.name];
var _5a6=dojo.locale;
for(prop in _5a5){
var _5a7=_5a5[prop];
if(_5a7[_5a6]!==undefined){
_5a1[prop]=_5a7[_5a6];
}else{
if(_5a7["default"]!==undefined){
_5a1[prop]=_5a7["default"];
}
}
}
}
}
}
this.i18nSocket(arguments);
},getDictionaryItem:function(name,_5a8){
if(!this._i18nDictionary){
if(this.owner){
return this.owner.getDictionaryItem(name,_5a8);
}else{
return "";
}
}
if(_5a8==undefined){
return this._i18nDictionary[name];
}else{
var _5a9={};
for(var i in _5a8){
_5a9[i]=(_5a8[i]===undefined||_5a8[i]===null)?"":_5a8[i];
}
return dojo.string.substitute(this._i18nDictionary[name],_5a9);
}
}});
}
if(!dojo._hasResource["wm.base.components.CssLoader"]){
dojo._hasResource["wm.base.components.CssLoader"]=true;
dojo.provide("wm.base.components.CssLoader");
dojo.declare("wm.CssLoader",wm.Component,{url:"",css:"",relativeUrl:true,init:function(){
this.inherited(arguments);
if(this.url){
this.setUrl(this.url);
}else{
this.setCss(this.css);
}
},destroy:function(){
this._sheet=null;
this.inherited(arguments);
},getStyleSheet:function(){
if(dojo.isIE&&!this._sheet){
this._sheet=wm.CssLoader.sheet||(wm.CssLoader.sheet=this.makeSheet());
}
if(!this._sheet){
this._sheet=this.makeSheet();
}
return this._sheet;
},makeSheet:function(){
var _5aa=document.createElement("style");
_5aa.setAttribute("type","text/css");
document.getElementsByTagName("head")[0].appendChild(_5aa);
return _5aa;
},setUrl:function(_5ab){
this.url=_5ab||"";
if(this.url){
var _5ac=this.relativeUrl?this.getPath()+this.url:this.url;
this.setCss(wm.load(_5ac,true));
}
},setCss:function(_5ad){
this.clearCss();
this.css=_5ad||"";
if(this.css){
this.addCss(this.css);
}
},clearCss:function(){
this.css="";
this.removeCss();
},removeCss:function(){
if(dojo.isIE){
return;
}
var s=this.getStyleSheet();
if(s){
if(s.styleSheet){
s.styleSheet.cssText="";
}else{
while(s.firstChild){
s.removeChild(s.firstChild);
}
}
}
},addCss:function(_5ae){
if(this.isDesignLoaded()){
var p=this.getPath();
_5ae=_5ae.replace(/url\s*\(\s*([^(http:)\/].*)\.*\)/g,"url("+p+"$1)");
}
var s=this.getStyleSheet();
if(s.styleSheet){
s.styleSheet.cssText=[s.styleSheet.cssText,_5ae].join("\n");
}else{
s.appendChild(document.createTextNode("\n"));
s.appendChild(document.createTextNode(_5ae));
}
}});
}
if(!dojo._hasResource["wm.base.components.Application"]){
dojo._hasResource["wm.base.components.Application"]=true;
dojo.provide("wm.base.components.Application");
wm.componentLoaders=wm.componentLoaders||{};
wm.registerComponentLoader=function(_5af,_5b0){
wm.componentLoaders[_5af]=_5b0;
};
dojo.declare("wm.Application",wm.Component,{debugDialog:null,sessionExpirationHandler:"nothing",touchToClickDelay:500,touchToRightClickDelay:1500,eventDelay:wm.isMobile?100:0,manageURL:false,manageHistory:true,i18n:false,main:"Main",tabletMain:"",phoneMain:"",isSecurityEnabled:false,phoneGapLoginPage:"Login",hintDelay:1500,disableDirtyEditorTracking:false,deletionDisabled:1,projectSubVersion:"Alpha",projectVersion:1,studioVersion:"",theme:"wm_notheme",toastPosition:"br",_lastTheme:"",init:function(){
this.history=[];
if(window["onpopstate"]!==undefined){
this._initializingBack=true;
this.connect(window,"onpopstate",this,"_onBack");
}
this.requireLocalization();
if(djConfig.isDebug){
dojo["require"]("common."+wm.version.replace(/[^a-zA-Z0-9]/g,"")+"_patches",true);
}
window.app=wm.application=wm.application||this;
this.connectList=[];
this.app=this;
if(this.i18n){
try{
dojo["requireLocalization"]("language","app");
this._i18nDictionary=dojo.i18n.getLocalization("language","app");
}
catch(e){
}
}
this.loadBranding();
this.inherited(arguments);
this._isDesignLoaded=(window["studio"]&&this!=app);
if(!this._isDesignLoaded){
wm.typeManager.initTypes();
}
if(this._isDesignLoaded){
studio._application=this;
}
var node=this._isDesignLoaded?null:document.body.parentNode;
if(node){
dojo.addClass(node,"WMApp");
}
var _5b1=window.location.search.match(/theme\=(.*?)\&/)||window.location.search.match(/theme\=(.*?)$/);
if(_5b1){
this._setTheme(_5b1[1],true);
}else{
if(wm.device=="phone"||window["studio"]&&studio.currentDeviceType=="phone"){
this._setTheme(this.phoneTheme||this.theme,true);
}else{
if(wm.device=="tablet"||window["studio"]&&studio.currentDeviceType=="tablet"){
this._setTheme(this.tabletTheme||this.theme,true);
}else{
this._setTheme(this.theme,true);
}
}
}
if(this._css){
this._cssLoader=new wm.CssLoader({owner:this});
this._cssLoader.setCss(this._css);
}
if(wm.isMobile){
if(wm.isAndroid>2||wm.isAndroid=="chrome"||wm.isIOS&&wm.isIOS>4){
}else{
this._touchEnabled=true;
}
}
this.$=this.components={};
this._setupKeys();
},_pollForTimezoneChange:function(){
if(new Date().getTimezoneOffset()!=wm.currentTimeZone){
wm.setTimeZoneOffset();
wm.currentTimeZone=new Date().getTimezoneOffset();
}
},getServerTimeOffset:function(){
if(!this.serverTimeSVar){
var _5b2=this.serverTimeSVar=new wm.ServiceVariable({owner:this,name:"serverTimeSVar",service:"waveMakerService",operation:"getServerTimeOffset",onSuccess:function(_5b3){
wm.serverTimeOffset=_5b3;
wm.setTimeZoneOffset();
wm.currentTimeZone=new Date().getTimezoneOffset();
}});
}
this.serverTimeSVar.update();
},_setupKeys:function(){
this._keys={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",17:"CTRL",18:"ALT",19:"BREAK",20:"CAPS",27:"ESC",32:" ",33:"PAGE UP",34:"PAGE DOWN",35:"END",36:"HOME",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN",45:"INSERT",46:"DELETE",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",91:"LEFT WINDOW",92:"RIGHT WINDOW",93:"SELECT",96:"NUMPAD 0",97:"NUMPAD 1",98:"NUMPAD 2",99:"NUMPAD 3",100:"NUMPAD 4",101:"NUMPAD 5",102:"NUMPAD 6",103:"NUMPAD 7",104:"NUMPAD 8",105:"NUMPAD 9",106:"NUMPAD *",107:"NUMPAD +",108:"NUMPAD ENTER",109:"NUMPAD -",110:"NUMPAD .",111:"NUMPAD /",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NUMLOCK",145:"SCROLLLOCK",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"\""};
},requireLocalization:function(){
if(djConfig.isDebug){
dojo.registerModulePath("wm.language",wm.libPath+"/wm/language");
}
wm.locale={};
wm.locale.phrases=dojo.i18n.getLocalization("wm.language","components");
wm.locale.props=dojo.i18n.getLocalization("wm.language","properties");
},loadBranding:function(){
if(wm.branding){
this._brandingDictionary=dojo.fromJson(wm.load("branding/"+wm.branding+"/branding.js"));
var _5b4=document.createElement("link");
_5b4.type="text/css";
_5b4.rel="stylesheet";
_5b4.href="branding/"+wm.branding+"/branding.css";
document.getElementsByTagName("head")[0].appendChild(_5b4);
}
},createDebugDialog:function(){
dojo["require"]("wm.base.debug.Dialog");
dojo["require"]("wm.base.components.JsonRpcService");
if(!this.debugDialog){
this.debugDialog=new wm.debug.Dialog({owner:this,titlebarButtons:"DebuggerHelpIcon",name:"debugDialog",width:"700px",height:"400px",corner:"cr"});
}
},setPhoneTheme:function(_5b5){
this.phoneTheme=_5b5;
if(wm.device=="phone"||window["studio"]&&studio.currentDeviceType=="phone"){
this._setTheme(_5b5||this.theme);
}
},setTabletTheme:function(_5b6){
this.tabletTheme=_5b6;
if(wm.device=="tablet"||window["studio"]&&studio.currentDeviceType=="tablet"){
this._setTheme(_5b6||this.theme);
}
},_setTheme:function(_5b7,_5b8,_5b9,_5ba,_5bb,_5bc){
if(_5b7.indexOf(".")==-1){
_5b7=_5b7.indexOf("wm_")==0?"wm.base.widget.themes."+_5b7:"common.themes."+_5b7;
}
var _5bd=window.location.search.match(/theme\=(.*?)\&/)||window.location.search.match(/theme\=(.*?)$/);
var node;
if(this._isDesignLoaded){
if(studio.themesListVar.query({dataValue:_5b7,designer:"themedesigner"}).getCount()){
node=studio.designer.domNode;
}else{
node=studio.designerWrapper.domNode;
}
}else{
node=document.body;
}
if(this.themeName){
dojo.removeClass(studio.designer.domNode,this.themeName);
dojo.removeClass(studio.designerWrapper.domNode,this.themeName);
}
if(this._isDesignLoaded){
studio.themeChanged(_5b7);
}
if(this._isDesignLoaded&&!_5b8){
try{
if(this._isDesignLoaded&&!_5b8){
this._themeChanged=true;
this.cacheWidgets();
}
}
catch(e){
}
}
this._lastTheme=this._theme;
this._theme=_5b7;
this.themeName=_5b7.replace(/^.*\./,"");
dojo.addClass(node,this.themeName);
if(this._isDesignLoaded||!_5b8||_5bd){
try{
this.loadThemeCss(this._theme,this._isDesignLoaded,_5b9);
this.loadThemePrototype(this._theme,_5ba);
if(this._isDesignLoaded&&!_5b8&&!_5bb){
this.useWidgetCache();
}
}
catch(e){
if(_5b7!="wm_notheme"){
this._setTheme("wm_notheme",_5b8,_5b9,_5ba,_5bb);
app.alert(wm.getDictionaryItem("wm.Application.ALERT_MISSING_THEME",{name:_5b7}));
}else{
app.alert(wm.getDictionaryItem("wm.Application.ALERT_MISSING_NOTHEME",{name:_5b7}));
}
return;
}
}else{
this.loadThemePrototype(this._theme,_5ba);
}
},cacheWidgets:function(){
if(!this._widgetsjs){
var _5be="";
var _5bf=studio.page.components;
for(c in _5bf){
if(_5bf[c] instanceof wm.Dialog){
_5be+=_5bf[c].write("")+",";
}
}
var _5c0=dojo.fromJson("{"+_5be+studio.page.root.write("")+"}");
this._widgetsjs=_5c0;
}
},useWidgetCache:function(){
studio.page.root.destroy();
delete studio.page.root;
var _5c1=studio.page.components;
for(c in _5c1){
if(_5c1[c] instanceof wm.Dialog){
_5c1[c].destroy();
}
}
studio.page.loadComponents(this._widgetsjs,null);
delete this._widgetsjs;
studio.page.reflow();
studio.refreshWidgetsTree();
},loadThemePrototype:function(_5c2,_5c3){
var _5c4=_5c2.replace(/^.*\./,"");
var _5c5=wm.Application.themeData[_5c2];
if(!_5c5||_5c3){
var path;
if(_5c2===_5c4){
if(_5c4.match(/^wm_/)){
path=dojo.moduleUrl("wm")+"base/widget/themes/"+_5c4+"/Theme.js";
}else{
path=dojo.moduleUrl("common")+"themes/"+_5c4+"/Theme.js";
}
}else{
path=dojo.moduleUrl(_5c2)+"/Theme.js";
}
_5c5=_5c3||dojo.fromJson(dojo.xhrGet({url:path,sync:true,preventCache:true}).results[0]);
wm.Application.themeData[_5c2]=_5c5||{};
}
var _5c6=_5c5["wm.Control"];
for(var j in _5c6){
wm.Control.prototype[j]=_5c6[j];
}
if(!wm.Application.themePrototypeData){
wm.Application.themePrototypeData={};
}
wm.Application.themePrototypeData["wm.Control"]=this._theme;
},loadThemePrototypeForClass:function(ctor,_5c7){
if(!this._theme||!ctor){
return;
}
var _5c8=ctor.prototype.declaredClass;
if(_5c8=="wm.Template"){
_5c8="wm.Panel";
}
var _5c9=wm.Application.themeData[this._theme];
var _5ca=_5c9[ctor.prototype.declaredClass];
var p=ctor.prototype;
if((window["StudioApplication"])){
if(!wm.defaultPrototypeValues){
wm.defaultPrototypeValues={};
}
if(!wm.defaultPrototypeValues[_5c8]){
wm.defaultPrototypeValues[_5c8]={};
var _5cb=wm.Object.getSchemaClass(ctor).prototype;
for(var _5cc in _5cb){
var _5cd=_5cb[_5cc];
if(typeof _5cd=="object"&&_5cd&&!_5cd.method&&!_5cd.ignore&&!_5cd.readonly&&!_5cd.operation&&!(typeof p[_5cc]=="function")){
wm.defaultPrototypeValues[_5c8][_5cc]=p[_5cc];
}
}
if("desktopHeight" in wm.defaultPrototypeValues[_5c8]===false){
wm.defaultPrototypeValues[_5c8].desktopHeight=undefined;
}
}
if(wm.Application.themePrototypeData[_5c8]&&wm.Application.themePrototypeData[_5c8]!=this._theme){
var _5ce=wm.defaultPrototypeValues[_5c8];
wm.forEachProperty(_5ce,function(_5cf,_5d0){
if(_5cf&&typeof _5cf=="object"){
_5cf=dojo.clone(_5cf);
}
p[_5d0]=_5cf;
if(_5c7){
_5c7[_5d0]=_5cf;
}
});
}
}
if(wm.locale.props){
dojo.mixin(_5ca,wm.locale.props[_5c8]);
}
if(wm.Application.themePrototypeData[_5c8]!=this._theme){
if(_5ca){
for(var j in _5ca){
ctor.prototype[j]=_5ca[j];
if(_5c7){
_5c7[j]=_5ca[j];
}
}
}
wm.Application.themePrototypeData[_5c8]=this._theme;
}
},loadThemeCss:function(_5d1,_5d2,_5d3){
var _5d4=_5d1.replace(/^.*\./,"");
var path;
var _5d5;
if(_5d1===_5d4){
if(_5d4.match(/^wm_/)){
path=dojo.moduleUrl("wm")+"base/widget/themes/"+_5d4+"/theme.css";
}else{
path=dojo.moduleUrl("common")+"themes/"+_5d4+"/theme.css";
}
}else{
path=dojo.moduleUrl(_5d1)+"/theme.css";
}
if(_5d2){
var _5d6=path.replace(/\/[^\/]*$/,"/images");
while(_5d6.match(/[^\/]+\/\.\.\//)){
_5d6=_5d6.replace(/[^\/]+\/\.\.\//,"");
}
if(_5d3){
_5d5=_5d3;
}else{
var _5d7=dojo.xhrGet({url:path,sync:true,preventCache:false}).results;
if(_5d7[1]){
throw _5d7[1];
}
_5d5=_5d7[0]||"";
var _5d7=dojo.xhrGet({url:path.replace(/theme\.css/,"custom.css"),sync:true,preventCache:false}).results;
if(!_5d7[1]){
_5d5+=_5d7[0]||"";
}
}
_5d5=_5d5.replace(/url\s*\(\s*images/g,"url("+_5d6);
setCss("theme_ss",_5d5);
}else{
wm.headAppend(wm.createElement("link",{rel:"stylesheet",type:"text/css",href:path}));
}
},postInit:function(){
this.inherited(arguments);
},destroy:function(){
this._isDestroying=true;
wm.fire(this.scrim,"destroy");
wm.fire(this._runtimeService,"destroy");
this.inherited(arguments);
dojo.forEach(this.connectList,dojo.disconnect);
this.connectList=null;
delete this._page;
if(this.pageContainer){
this.pageContainer.destroy();
this.pageContainer=null;
}
if(this.domNode){
dojo.destroy(this.domNode);
this.domNode=null;
}
if(this.pageDialog){
this.pageDialog.destroy();
}
delete this.pageDialog;
if(this.scrim){
this.scrim.destroy();
}
delete this.scrim;
delete this.app;
},createPageContainer:function(){
if(!this._isDesignLoaded){
this.appRoot=new wm.AppRoot({owner:this,name:"appRoot",margin:"0",padding:"0",border:"0",borderColor:"0"});
if(wm.isMobile){
dojo.addClass(document.body,"wmmobile");
}
this.pageContainer=new wm.PageContainer({manageHistory:this.manageHistory,manageURL:this.manageURL,owner:this,parent:this.appRoot,width:"100%",height:"100%",margin:wm.AppRoot.prototype.margin,padding:wm.AppRoot.prototype.padding,border:wm.AppRoot.prototype.border,borderColor:wm.AppRoot.prototype.borderColor,getRuntimeId:function(){
return "";
}});
this.connectList[this.connectList.length]=this.connect(this.pageContainer._pageLoader,"onBeforeCreatePage",this,"beforeCreatePage");
this.connectList[this.connectList.length]=this.connect(this.pageContainer._pageLoader,"onPageChanged",this,"pageChanged");
}
},loadComponents:function(_5d8){
this._loading=true;
this.createComponents(_5d8);
this._loading=false;
},subPageLoaded:function(_5d9){
if(djConfig.isDebug){
if(this.debugSubPageList===undefined){
this.debugSubPageList={};
}
this.debugSubPageList[_5d9.name]=_5d9;
}
},subPageUnloaded:function(_5da){
if(djConfig.isDebug&&_5da){
if(this.debugSubPageList!=undefined){
delete (this.debugSubPageList[_5da.name]);
}
}
},_onSessionExpiration:function(){
switch(this.sessionExpirationHandler){
case "nothing":
break;
case "navigateToLogin":
if(window.location.pathname.indexOf("index.html")!=-1){
window.location.pathname=location.pathname.replace(/index\.html/,"login.html");
}else{
window.location.pathname+=window.location.pathname.match(/\/$/)?"login.html":"/login.html";
}
break;
case "showLoginDialog":
if(!this._loginDialog){
this._loginDialog=new wm.PageDialog({name:"_loginDialog",owner:this,width:"80%",height:"80%",title:"Login",pageName:"Login",hideControls:true,noEscape:true,deferLoad:false});
}
this._loginDialog.show();
break;
}
wm.fire(this,"onSessionExpiration");
},qualifyName:function(_5db){
return _5db;
},addComponent:function(_5dc){
this.inherited(arguments);
this[_5dc.name]=_5dc;
},removeComponent:function(_5dd){
delete this[_5dd.name];
this.inherited(arguments);
},getRuntimeService:function(_5de){
if(!this._runtimeService){
this._runtimeService=new wm.JsonRpcService({service:"runtimeService",_isDesignLoaded:this._isDesignLoaded,owner:_5de});
}
return this._runtimeService;
},getRuntimeServiceDesignTime:function(_5df){
if(!this._runtimeService){
this._runtimeService=new wm.JsonRpcService({service:"runtimeService",owner:_5df||this,designTime:true});
}
return this._runtimeService;
},getRoot:function(){
return this;
},getRuntimeId:function(inId){
return inId;
},getId:function(inId){
if(inId){
return "app."+inId;
}else{
return "app";
}
},reflow:function(_5e0){
var d=this.domNode;
this.appRoot.reflow();
},reflowParent:function(){
this.reflow();
},loadComponent:function(_5e1,_5e2,_5e3,_5e4,_5e5,_5e6,_5e7){
return _5e2.createComponent(_5e1,_5e3,_5e4,_5e5,_5e6,this);
},hideLoadingIndicator:function(){
var l=dojo.byId("_wm_loading");
if(l){
dojo._destroyElement(l);
}
},run:function(){
app=wm.application=this;
dojo.addOnLoad(dojo.hitch(this,"runOnLoad"));
},runOnLoad:function(){
setTimeout(dojo.hitch(this,"doRun"),dojo.isIE<7?100:1);
},doRun:function(){
if(wm.isPhonegap){
if(!window["cordova"]&&!window["PhoneGap"]){
wm.job("doRun",100,this,"doRun");
return;
}
if(!window["PhoneGap"]){
window["PhoneGap"]=true;
}
if(document.body.nextSibling&&document.body.nextSibling.tagName=="IFRAME"){
dojo.destroy(document.body.nextSibling);
}
dojo["require"]("build.Gzipped.wm_phonegap_misc",true);
dojo.forEach(wm.componentFixList._phonegap,function(fix){
try{
fix();
}
catch(e){
}
});
}
if(!this._isDesignLoaded){
if(wm.serverTimeOffset===undefined){
this.getServerTimeOffset();
}else{
wm.currentTimeZone=new Date().getTimezoneOffset();
}
window.setInterval(dojo.hitch(this,"_pollForTimezoneChange"),10000);
}
this.createPageContainer();
this.domNode=this.appRoot.domNode;
this.reflow();
this.loadComponents(this.constructor.widgets||this.widgets);
if(!this.debugDialog){
if(this._overrideDebugDialog!==undefined){
if(this._overrideDebugDialog){
this.createDebugDialog();
}
}else{
if(djConfig.isDebug&&(wm.device!="phone"||wm.isFakeMobile)){
this.createDebugDialog();
}
}
}
if(!wm.isPhonegap){
this.pageDialog=new wm.PageDialog({name:"pageDialog",owner:this});
}
if(dojo.isIE<=8){
var _5e8=document.createElement("BUTTON");
_5e8.style.width="1px";
_5e8.style.height="1px";
this.domNode.appendChild(_5e8);
}
var main;
if(wm.device=="tablet"){
main=this.tabletMain;
}else{
if(wm.device=="phone"){
main=this.phoneMain;
}
}
if(!main){
main=this.main;
}
this.pageContainer._initialPageName=main;
if(window["PhoneGap"]&&this.isSecurityEnabled&&this.isLoginPageEnabled&&this.phoneGapLoginPage){
this.loadPage(this.phoneGapLoginPage);
}else{
this.loadPage(main);
}
this.hideLoadingIndicator();
},start:function(){
},getServerComponents:function(){
if(this.serverComponents===undefined){
this.loadServerComponents();
}
return this.serverComponents;
},loadServerComponents:function(_5e9){
if(_5e9&&this.serverComponents){
for(var i=0,c;c=this.serverComponents[i];i++){
if(c.type==_5e9){
this.serverComponents.splice(i--,1);
}
}
var cl=wm.componentLoaders[_5e9];
if(cl){
this.serverComponents=this.serverComponents.concat(cl.getComponents());
}
}else{
this.serverComponents=[];
for(var i in wm.componentLoaders){
this.serverComponents=this.serverComponents.concat(wm.componentLoaders[i].getComponents());
}
}
},addServerComponent:function(_5ea){
this.serverComponents.push(_5ea);
},removeServerComponent:function(_5eb){
for(var i=0,c;c=this.serverComponents[i];i++){
if(c==_5eb){
this.serverComponents.splice(i,1);
return i;
}
}
},removeServerComponentByName:function(_5ec,_5ed){
for(var i=0,c;c=this.serverComponents[i];i++){
if(c.type==_5ed&&c.name==_5ec){
this.serverComponents.splice(i,1);
return i;
}
}
},beforeCreatePage:function(){
this.pageContainer._pageLoader.pageConnect("start",this,"start");
this.pageLoadedDeferred=new dojo.Deferred();
},pageChanged:function(_5ee,_5ef){
this.page=this._page=_5ee;
var n=_5ee.name,o=(_5ef||0).name;
if(o){
window[o]=undefined;
delete this[o];
}
window[n]=this[n]=this._page;
if(this.pageLoadedDeferred){
this.pageLoadedDeferred.callback({page:_5ee,previousPage:_5ef});
}
this.connect(document,"keydown",_5ee,"keydown");
this.onPageChanged(_5ee,_5ef);
},loadPage:function(_5f0){
var _5f1=!Boolean(this.pageContainer.page);
if(_5f1){
var hash=window.location.hash;
if(hash.length>1){
try{
this.locationState=dojo.fromJson(hash.substring(1));
}
catch(e){
try{
this.locationState=dojo.fromJson(unescape(hash.substring(1)));
}
catch(e){
}
}
}
if(this.manageURL){
this._pageName=this.locationState&&this.locationState.pageName?this.locationState.pageName:_5f0;
}else{
this._pageName=_5f0;
}
}else{
this._pageName=_5f0;
}
try{
this.pageContainer.setPageName(this._pageName);
}
catch(e){
if(djConfig.isDebug){
console.error("loadPage error: "+e);
}
}
},forceReloadPage:function(){
this.loadPage(this._pageName);
},onPageChanged:function(_5f2,_5f3){
},onSessionExpiration:function(){
},getFullVersionNumber:function(){
return this.projectVersion+"."+this.projectSubVersion;
},getSessionId:function(){
if(!this.sessionId){
var a=new wm.JsonRpcService({service:"waveMakerService",sync:true});
a.requestSync("getSessionId",[]);
this.sessionId=a.result;
}
return this.sessionId;
},echoFile:function(_5f4,_5f5,_5f6){
if(!this.echoFileService){
this.echoFileService=new wm.ServiceVariable({owner:app,name:"echoFileService",downloadFile:true,service:"waveMakerService",operation:"echo"});
this.echoFileService.input.setType("");
wm.typeManager.addType("echoInputs",{internal:false,fields:{contents:{type:"java.lang.String"},fileType:{type:"java.lang.String"},fileName:{type:"java.lang.String"}}});
this.echoFileService.input.setType("echoInputs");
}
this.echoFileService.input.setData({contents:_5f4,fileType:_5f5,fileName:_5f6});
this.echoFileService.update();
},showLoadingDialog:function(_5f7,_5f8,_5f9){
if(!this.loadingDialog){
this.loadingDialog=new wm.LoadingDialog({owner:this,name:"loadingDialog",widgetToCover:this.appRoot});
}
this.loadingDialog.widgetToCover=_5f9||this.appRoot;
this.loadingDialog.setCaption(_5f7||"Loading...");
if(_5f8){
this.loadingDialog._label.setWidth(_5f8);
}
this.loadingDialog.show();
},hideLoadingDialog:function(){
if(this.loadingDialog){
this.loadingDialog.hide();
}
},warnOnce:function(_5fa,_5fb){
var _5fc=dojo.cookie(_5fa);
if(_5fc){
return false;
}
wm.require("wm.Checkbox");
this.alert(_5fb);
if(!this._warnOnceCheckbox){
this._warnOnceCheckbox=new wm.Checkbox({owner:this.alertDialog,parent:this.alertDialog.containerWidget.c$[0],margin:"10,0,0,0",height:"30px",width:"100%",caption:"Don't warn again",captionPosition:"right",captionAlign:"left",captionSize:"100%"});
}
if(this._warnOnceConnect){
this.disconnect(this._warnOnceConnect);
}
this._warnOnceConnect=this.alertDialog.connectOnce(this.alertDialog,"onClose",dojo.hitch(this,"_cleanupWarnOnce",_5fa));
return true;
},_cleanupWarnOnce:function(_5fd){
if(this._warnOnceCheckbox.getChecked()){
dojo.cookie(_5fd,true);
}
this._warnOnceCheckbox.destroy();
delete this._warnOnceCheckbox;
delete this._warnOnceConnect;
},alert:function(_5fe,_5ff){
if(!this.alertDialog){
this.loadThemePrototypeForClass(wm.Dialog);
this.alertDialog=new wm.GenericDialog({name:"alertDialog",_noAnimation:true,owner:this,title:wm.getDictionaryItem("wm.Application.TITLE_ALERT"),noEscape:false,width:"400px",height:"180px",button1Caption:wm.getDictionaryItem("wm.Application.CAPTION_ALERT_OK"),button1Close:true,userPrompt:""});
this.alertDialog.domNode.style.zIndex=45;
dojo.attr(this.alertDialog.domNode,"role","alertdialog");
}
if(this.alertDialog.width!="400px"){
this.alertDialog.setWidth("400px");
}
if(dojo.isObject(_5fe)){
_5fe=_5fe.toString();
}
_5ff=Boolean(_5ff);
this.alertDialog.setUserPrompt(_5fe);
this.alertDialog.setModal(!_5ff);
this.alertDialog.show();
},confirmOKFunc:null,confirmCancelFunc:null,confirm:function(_600,_601,_602,_603,_604,_605,_606){
var d=this.confirmDialogDeferred=new dojo.Deferred();
if(!this.confirmDialog){
this.loadThemePrototypeForClass(wm.Dialog);
this.confirmDialog=new wm.GenericDialog({name:"confirmDialog",_noAnimation:true,owner:this,noEscape:false,width:"350px",height:"180px",button1Caption:wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_OK"),button1Close:true,button2Caption:wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_CANCEL"),button2Close:true,userPrompt:"confirm..."});
this.confirmDialog.domNode.style.zIndex=50;
this.confirmDialog.connect(this.confirmDialog,"onButton1Click",this,"confirmDialogOKClick");
this.confirmDialog.connect(this.confirmDialog,"onButton2Click",this,"confirmDialogCancelClick");
this.confirmDialog.connect(this.confirmDialog,"_onEsc",this,"confirmDialogCancelClick");
dojo.attr(this.confirmDialog.domNode,"role","alertdialog");
}
_601=Boolean(_601);
this.confirmDialog.setUserPrompt(_600);
this.confirmDialog.setModal(!_601);
this.confirmDialog.setShowInput(false);
this.confirmDialog.setTitle(wm.getDictionaryItem("wm.Application.TITLE_CONFIRM"));
this.confirmOKFunc=_602;
this.confirmCancelFunc=_603;
this.confirmDialog.setButton1Caption(_604||wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_OK"));
this.confirmDialog.setButton2Caption(_605||wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_CANCEL"));
if(!_606){
this.confirmDialog.show();
}
return d;
},prompt:function(_607,_608,_609,_60a,_60b,_60c){
var d=this.confirmDialogDeferred=new dojo.Deferred();
this.confirm(_607,false,_609,_60a,_60b,_60c,true);
this.confirmDialog.setShowInput(true);
this.confirmDialog.setTitle(wm.getDictionaryItem("wm.Application.TITLE_CONFIRM"));
this.confirmDialog.setInputDataValue(_608||"");
this.confirmDialog.show();
return d;
},confirmDialogOKClick:function(){
if(this.confirmDialog.showInput){
var val=this.confirmDialog.getInputDataValue();
if(!val){
this.confirmDialogDeferred.errback();
return this.confirmDialogCancelClick();
}else{
if(this.confirmOKFunc){
this.confirmOKFunc(val);
}
}
this.confirmDialogDeferred.callback(val);
}else{
if(this.confirmOKFunc){
this.confirmOKFunc();
}
this.confirmDialogDeferred.callback(val);
}
},confirmDialogCancelClick:function(){
if(this.confirmCancelFunc){
this.confirmCancelFunc();
}
if(this.confirmDialogDeferred){
this.confirmDialogDeferred.errback();
}
},createToastDialog:function(){
if(!this.toastDialog){
this.toastDialog=new wm.Toast({name:"toastDialog",owner:this});
}
},toastError:function(_60d,_60e){
this.createToastDialog();
this.toastDialog.showToast(_60d,_60e||8000,"Error");
},toastWarning:function(_60f,_610){
this.createToastDialog();
this.toastDialog.showToast(_60f,_610||8000,"Warning");
},toastSuccess:function(_611,_612){
this.createToastDialog();
this.toastDialog.showToast(_611,_612||5000,"Success");
},toastInfo:function(_613,_614){
this.createToastDialog();
this.toastDialog.showToast(_613,_614||5000,"Info");
},createToolTip:function(_615,node,_616,_617){
if(!this.toolTipDialog){
this.toolTipDialog=new wm.Dialog({_classes:{domNode:["AppToolTip"]},title:"",name:"toolTipDialog",modal:false,width:"350px",height:"50px",fitToContentHeight:true,owner:this,corner:"tr",_fixPosition:true,useContainerWidget:true,margin:"0",border:"1",padding:"4",manageHistory:false});
this.toolTipDialog.containerWidget.destroy();
this.toolTipDialog.useContainerWidget=false;
delete this.toolTipDialog.containerWidget;
delete this.toolTipDialog.containerNode;
var html=new wm.Html({owner:this.toolTipDialog,parent:this.toolTipDialog,autoScroll:false,name:"html",width:"100%",height:"100%",margin:"0",padding:"0",autoSizeHeight:true});
this.toolTipDialog.html=html;
}
this.toolTipDialog.tipOwner=_617;
if(node){
this.toolTipDialog.fixPositionNode=node;
}else{
this.toolTipDialog.fixPositionNode=null;
var _618=this.toolTipDialog.bounds.l=_616.screenX||_616.clientX||_616.mouseX;
var _619=this.toolTipDialog.bounds.t=_616.screenY||_616.clientY||_616.mouseY;
}
this.toolTipDialog.html.setHtml();
this.toolTipDialog.show();
this.toolTipDialog._cupdating=true;
this.toolTipDialog.html.setAutoSizeWidth(false);
this.toolTipDialog.html.setAutoSizeHeight(false);
this.toolTipDialog.setFitToContentHeight(false);
this.toolTipDialog.setFitToContentWidth(false);
this.toolTipDialog.setHeight("25px");
this.toolTipDialog.setWidth("350px");
this.toolTipDialog.html.setHeight("100%");
this.toolTipDialog.html.setWidth("100%");
this.toolTipDialog._cupdating=false;
this.toolTipDialog.renderBounds();
this.toolTipDialog.html.setHtml(_615);
if(String(_615).length<30){
this.toolTipDialog.html.setAutoSizeWidth(true);
this.toolTipDialog.setFitToContentWidth(true);
dojo.addClass(this.toolTipDialog.domNode,"NoWrap");
}else{
this.toolTipDialog.html.setAutoSizeHeight(true);
this.toolTipDialog.setFitToContentHeight(true);
dojo.removeClass(this.toolTipDialog.domNode,"NoWrap");
}
this.toolTipDialog.html.setWidth((6+this.toolTipDialog.html.domNode.firstChild.clientWidth)+"px");
this.toolTipDialog.setBestWidth();
var self=this;
if(this._testHintConnect){
dojo.disconnect(this._testHintConnect);
}
this._testHintConnect=this.connect(window.document.body,"onmousemove",this,function(evt){
if(evt.target===this.toolTipDialog.domNode||dojo.isDescendant(evt.target,this.toolTipDialog.domNode)){
return;
}
if(node){
if(evt.target!=node&&!dojo.isDescendant(evt.target,node)){
this.hideToolTip();
}
}else{
if(Math.abs(evt.clientX-_618)>20||Math.abs(evt.clientY-_619)>20){
this.hideToolTip();
}
}
});
},getToolTip:function(){
if(this.toolTipDialog){
return this.toolTipDialog.userPrompt;
}
return "";
},hideToolTip:function(){
dojo.disconnect(this._testHintConnect);
delete this._testHintConnect;
this.toolTipDialog.hide();
},createMinifiedDialogPanel:function(){
var _61a=parseInt(parseInt(wm.isMobile?wm.Button.prototype.mobileHeight:wm.Button.prototype.height)*0.8);
_61a+=3;
this.wmMinifiedDialogPanel=new wm.Panel({name:"wmMinifiedDialogPanel",width:"100%",height:_61a+"px",border:"2,0,0,0",padding:"1,0,0,0",autoScroll:false,verticalAlign:"top",horizontalAlign:"left",layoutKind:"left-to-right",owner:this,parent:this.appRoot});
this.appRoot.reflow();
},createMinifiedDialogLabel:function(_61b){
var l=new wm.Button({caption:_61b,parent:app.wmMinifiedDialogPanel,owner:this,width:"100px",desktopHeight:"100%",height:"100%",margin:"0",padding:"0",border:"1"});
app.wmMinifiedDialogPanel.show();
return l;
},removeMinifiedDialogLabel:function(_61c){
_61c.destroy();
if(this.wmMinifiedDialogPanel){
this.wmMinifiedDialogPanel.setShowing(Boolean(this.wmMinifiedDialogPanel.c$.length));
}
},resizeMinifiedDialogPanel:function(){
var b={l:0,t:this._page.root.bounds.h-this.wmMinifiedDialogPanel.bounds.h,w:this._page.root.bounds.w,h:25};
this.wmMinifiedDialogPanel.setBounds(b);
this.wmMinifiedDialogPanel.renderBounds();
},createLeftToRightDockingPanel:function(){
if(!this._leftToRightDockingPanel){
this._leftToRightDockingPanel=new wm.Panel({name:"_leftToRightDockingPanel",width:"100%",height:"100%",border:"0",padding:"",layoutKind:"left-to-right",owner:this,parent:this.appRoot});
this.appRoot.moveControl(this._leftToRightDockingPanel,this.appRoot.indexOfControl(this.pageContainer));
this.pageContainer.setParent(this._leftToRightDockingPanel);
}
},dockDialog:function(_61d,_61e){
if(_61e=="l"||_61e=="r"){
this.createLeftToRightDockingPanel();
}
var _61f;
var _620=false;
switch(_61e){
case "t":
if(this._topDock){
_61f=this._topDock;
}else{
_620=true;
_61f=this._topDock=new wm.Panel({owner:this,name:"_topDock",width:"100%",height:"100px",border:"0",padding:"",layoutKind:"left-to-right",parent:this.appRoot});
this.appRoot.moveControl(_61f,0);
this._topSplitter=new wm.Splitter({_classes:{domNode:["docksplitter"]},owner:this,parent:this.appRoot});
this.appRoot.moveControl(this._topSplitter,1);
this._topSplitter.findLayout();
}
break;
case "b":
if(this._bottomDock){
_61f=this._bottomDock;
}else{
_620=true;
_61f=this._bottomDock=new wm.Panel({owner:this,name:"_bottomDock",width:"100%",height:"100px",border:"0",padding:"",layoutKind:"left-to-right",parent:this.appRoot});
if(this.wmMinifiedDialogPanel){
this.appRoot.moveControl(_61f,this.wmMinifiedDialogPanel.getIndexInParent());
}
this._bottomSplitter=new wm.Splitter({_classes:{domNode:["docksplitter"]},owner:this,parent:this.appRoot});
this.appRoot.moveControl(this._bottomSplitter,_61f.getIndexInParent());
this._bottomSplitter.findLayout();
}
break;
case "l":
if(this._leftDock){
_61f=this._leftDock;
}else{
_620=true;
_61f=this._leftDock=new wm.Panel({owner:this,name:"_leftDock",width:"150px",height:"100%",border:"0",padding:"",layoutKind:"top-to-bottom",parent:this._leftToRightDockingPanel});
this._leftToRightDockingPanel.moveControl(_61f,0);
this._leftSplitter=new wm.Splitter({_classes:{domNode:["docksplitter"]},owner:this,parent:this._leftToRightDockingPanel});
this._leftToRightDockingPanel.moveControl(this._leftSplitter,1);
this._leftSplitter.findLayout();
}
break;
case "r":
if(this._rightDock){
_61f=this._rightDock;
}else{
_620=true;
this._rightSplitter=new wm.Splitter({_classes:{domNode:["docksplitter"]},owner:this,parent:this._leftToRightDockingPanel});
_61f=this._rightDock=new wm.Panel({owner:this,name:"_rightDock",width:"150px",height:"100%",border:"0",padding:"",layoutKind:"top-to-bottom",parent:this._leftToRightDockingPanel});
this._rightSplitter.findLayout();
}
break;
}
_61d.setParent(_61f);
switch(_61e){
case "t":
case "b":
if(_61d.minHeight>_61f.bounds.h){
_61f.setHeight(_61d.minHeight+"px");
}
_61d.setWidth("100%");
break;
case "l":
case "r":
if(_61d.minWidth>_61f.bounds.w){
_61f.setWidth(_61d.minWidth+"px");
}
_61d.setHeight("100%");
break;
}
if(_620){
this.appRoot.reflow();
}else{
if(!_61f.showing){
_61f.show();
if(_61f==this._topDock){
this._topSplitter.show();
}else{
if(_61f==this._bottomDock){
this._bottomSplitter.show();
}else{
if(_61f==this._rightDock){
this._rightSplitter.show();
}else{
if(_61f==this._leftDock){
this._leftSplitter.show();
}
}
}
}
}else{
_61f.reflow();
}
}
},removeDockedDialog:function(_621){
var _622=_621.parent;
_621.setParent(null);
if(_622.c$.length==0){
_622.hide();
if(_622==this._topDock){
this._topSplitter.hide();
}else{
if(_622==this._bottomDock){
this._bottomSplitter.hide();
}else{
if(_622==this._rightDock){
this._rightSplitter.hide();
}else{
if(_622==this._leftDock){
this._leftSplitter.hide();
}
}
}
}
}
},getDeviceSize:function(){
return this.appRoot?this.appRoot.deviceSize:"1000";
},addHistory:function(_623,_624){
if(this.history&&!this._handlingBack){
try{
if(!_624){
this.history.push({id:_623.id,options:_623.options});
}
var _625={};
this._handlingBack=true;
this._generateStateUrl(_625);
delete this._handlingBack;
if(window.history.pushState){
window.history.pushState(null,"",wm.isEmpty(_625)?"#":"#"+dojo.toJson(_625));
}
}
catch(e){
}
}
},_generateStateUrl:function(){
},generateStateUrl:function(_626){
},_onBack:function(_627){
if(this._initializingBack){
delete this._initializingBack;
return;
}
var _628=this.history.pop();
try{
if(_628){
var id=_628.id;
var c=this.getValueById(id);
if(c instanceof wm.Component&&c.handleBack){
try{
this._handlingBack=true;
if(!c.handleBack(_628.options)){
this._onBack();
}
}
catch(e){
}
delete this._handlingBack;
}else{
if(this.history.length){
this._onBack();
}
}
}
}
catch(e){
}
}});
wm.Application.themePrototypeData={};
wm.Application.themeData={};
}
if(!dojo._hasResource["dojox.uuid.generateRandomUuid"]){
dojo._hasResource["dojox.uuid.generateRandomUuid"]=true;
dojo.provide("dojox.uuid.generateRandomUuid");
dojox.uuid.generateRandomUuid=function(){
var _629=16;
function _62a(){
var _62b=Math.floor((Math.random()%1)*Math.pow(2,32));
var _62c=_62b.toString(_629);
while(_62c.length<8){
_62c="0"+_62c;
}
return _62c;
};
var _62d="-";
var _62e="4";
var _62f="8";
var a=_62a();
var b=_62a();
b=b.substring(0,4)+_62d+_62e+b.substring(5,8);
var c=_62a();
c=_62f+c.substring(1,4)+_62d+c.substring(4,8);
var d=_62a();
var _630=a+_62d+b+_62d+c+d;
_630=_630.toLowerCase();
return _630;
};
}
if(!dojo._hasResource["wm.base.components.JsonRpcService"]){
dojo._hasResource["wm.base.components.JsonRpcService"]=true;
dojo.provide("wm.base.components.JsonRpcService");
dojo.rpc.JsonService.extend({lastSubmissionId:Math.floor(Math.random(new Date().getTime())*1000000)});
wm.inflight={_inflight:[],_inflightNames:[],getCount:function(){
return this._inflight.length;
},change:function(){
},add:function(_631,_632,_633,_634,_635,_636){
_631._timeStamp=new Date().getTime();
if(dojo.indexOf(this._inflight,_631)!=-1){
return;
}
this._inflight.push(_631);
var name;
if(_632!="runtimeService"){
name=_632+"."+_635;
}else{
if(_633){
name=_633+"."+_635;
}else{
if(_634[0]){
name=_634[0]+": "+_634[1];
}else{
name="LazyLoad: "+_634[1];
}
}
}
this._inflightNames.push(name);
_631.addBoth(dojo.hitch(this,"remove",_631));
this.change();
},remove:function(_637,_638){
var i=dojo.indexOf(this._inflight,_637);
if(i==-1){
return;
}
var _639=new Date().getTime()-_637._timeStamp;
this._inflight.splice(i,1);
this._inflightNames.splice(i,1);
this.change();
return _638;
},cancel:function(){
dojo.forEach(this._inflight,function(d){
if(!d.canceller){
d.canceller=function(){
};
}
d.cancel();
});
}};
dojo.subscribe("wm-unload-app",wm.inflight,"cancel");
dojo.declare("wm.JsonRpc",dojo.rpc.JsonService,{smd:null,required:false,sync:false,_designTime:false,requestHeaders:{},bind:function(_63a,_63b,_63c,url){
url=url||this.serviceUrl;
if(_63a=="runQuery"&&_63b[0]==SALESFORCE_SERVICE){
url=wm.services.getService(SALESFORCE_SERVICE)._service.serviceUrl;
}
if(!url){
return;
}
var _63d=this._requestHeaders||this.requestHeaders;
var _63e={url:url||this.serviceUrl,postData:this.createRequest(_63a,_63b||[]),contentType:this.contentType,timeout:this.timeout,handleAs:"json",sync:this.sync,headers:_63d};
if(this._requestHeaders){
delete this._requestHeaders;
}
if(this._designTime&&studio.isCloud()){
var _63f=_63e.postData;
_63e.postData=this.createRequest("remoteRESTCall",[_63e.url.replace(/^.*\//,studio._deployedUrl+"/"),_63f,"POST","application/json"]);
_63e.url="waveMakerService.json";
}
if(wm.xhrPath){
_63e.url=wm.xhrPath+_63e.url;
}
var def=dojo.rawXhrPost(_63e);
if(this._designTime&&studio.isCloud()){
var _640=new dojo.Deferred();
def.addCallbacks(function(_641){
_640.callback(dojo.fromJson(_641.result));
},function(_642){
_640.errback(_642);
});
def=_640;
}
_63c=dojo.mixin(_63c,def.ioArgs);
def.addCallbacks(this.resultCallback(_63c),this.errorCallback(_63c));
},parseResults:function(obj){
return obj;
},addRequestHeader:function(_643,_644){
if(!this.requestHeaders){
this.requestHeaders={};
}
if(!this._requestHeaders){
this._requestHeaders=dojo.clone(this.requestHeaders);
}
this._requestHeaders[_643]=_644;
},setRequestHeaders:function(_645){
this._requestHeaders=_645;
},errorCallback:function(_646){
return function(data){
_646.errback(data);
};
}});
dojo.declare("wm.JsonRpcService",wm.Service,{operations:"",ready:false,service:"",timeout:0,errorLevel:10,sync:false,url:"",_methods:[],_operations:{},_service:null,init:function(){
this.inherited(arguments);
this.initService();
},setSync:function(_647){
this.sync=_647;
},getServiceRoot:function(){
return this.getPath()+"services/";
},getJsonPath:function(){
var p="";
if(this.isDesignLoaded()&&window.studio&&studio.project){
p="/"+studio.project.getProjectPath()+"/";
}
return p;
},initService:function(){
var n=this.service||this.name;
var rand=this.owner&&this.isDesignLoaded()&&studio.application?studio.application.getFullVersionNumber():(app&&!window["studio"]?app.getFullVersionNumber():new Date().getTime());
var _648=this.url||n+".smd";
var url=this.url||(n&&(this.getServiceRoot()+n+".smd"));
this._service=null;
if(url){
try{
if(window["studio"]){
this._service=new wm.JsonRpc(url+"?rand="+rand);
}else{
if(wm.JsonRpcService.smdCache[url]){
this._service=wm.JsonRpcService.smdCache[url];
}else{
if(wm.JsonRpcService.smdCache[_648]){
var _649=wm.JsonRpcService.smdCache[_648];
this._service=new wm.JsonRpc({methods:_649.methods,serviceType:_649.serviceType,serviceUrl:url.replace(/\.smd/,".json")});
}else{
var _64a=window["PhoneGap"]?"":"?rand="+rand;
this._service=new wm.JsonRpc(url+_64a);
this._service.serviceUrl="services/"+this._service.serviceUrl;
}
}
}
wm.JsonRpcService.smdCache[url]=this._service;
if(this._designTime){
this._service._designTime=true;
}
this._service.timeout=this.timeout;
this.ready=Boolean(this._service&&this._service.smd);
if(this.ready){
this._service.serviceUrl=this.getJsonPath()+this._service.serviceUrl;
this.listOperations();
}
}
catch(e){
}
}
},setName:function(_64b){
this.inherited(arguments);
if(!this.url){
this.initService();
}
},ensureArgs:function(_64c,_64d){
if(_64c in this._operations&&dojo.isArray(_64d)){
var op=this._operations[_64c],_64e=0;
if(op){
for(var o in op.parameters){
_64e++;
}
for(var i=_64d.length;i<_64e;i++){
_64d.push(null);
}
}
}
},invoke:function(_64f,_650,_651,_652){
this.invoke(_64f,_650,_651,_652,false,false,null);
},invoke:function(_653,_654,_655,_656,_657,_658,_659){
if(!this._service){
return null;
}
this._service.sync=this.sync;
this.ensureArgs(_653,_654);
this.debugLastMethod=_653;
this.result=null;
this.error=null;
var d;
this._service._designTime=this._isDesignLoaded;
if(wm.connectionTimeout>0){
if(_657){
this._service.addRequestHeader("wm-polling-request",_659);
}else{
_659=dojox.uuid.generateRandomUuid();
this._service.addRequestHeader("wm-initial-request",_659);
}
d=this._service.callRemote(_653,_654||[]);
var _65a=_658||new dojo.Deferred();
d.addCallbacks(dojo.hitch(this,"onLongResponseTimeResult",_653,_654,_655,_656,_657,_659,_65a,d),dojo.hitch(this,"onLongResponseTimeError",_653,_654,_655,_656,_657,_659,_65a,d));
d=_65a;
}else{
d=this._service.callRemote(_653,_654||[]);
d.addCallbacks(dojo.hitch(this,"onResult"),dojo.hitch(this,"onError"));
}
if(_656&&app.debugDialog){
_656._jsonRpcServiceDeferred=d;
}
wm.inflight.add(d,this.service,this.name,_654,_653,_656);
this.inflight=true;
return d;
},request:function(_65b,_65c,_65d,_65e,_65f){
var d=this.invoke(_65b,_65c,null,_65f);
if(_65d){
if(dojo.isFunction(_65d)){
d.addCallback(_65d);
}else{
d.addCallback(this.owner,_65d);
}
}
if(_65e){
if(dojo.isFunction(_65e)){
d.addErrback(_65e);
}else{
d.addErrback(this.owner,_65e);
}
}
return d;
},requestSync:function(_660,_661,_662,_663,_664){
var s=this.sync;
this.sync=true;
var d=this.request.apply(this,[_660,_661,_662,_663,null,_664]);
this.sync=s;
return d;
},requestAsync:function(_665,_666,_667,_668,_669){
var s=this.sync;
this.sync=false;
var cb=_667?dojo.hitch(this,function(){
this.sync=s;
return _667.apply(this,dojo._toArray(arguments));
}):null,eb=_668?dojo.hitch(this,function(){
this.sync=s;
return _668.apply(this,dojo._toArray(arguments));
}):null;
return this.request(_665,_666,cb,eb,null,_669);
},getResultSync:function(_66a,_66b){
var d=this.requestSync(_66a,_66b);
return d.results[0];
},onLongResponseTimeResult:function(_66c,_66d,_66e,_66f,_670,_671,_672,_673,_674){
var r;
this.inflight=false;
var _675=false;
if(_670){
var _676=_673.xhr.getResponseHeader("wm-json-response-status");
if(_676=="processing"){
_675=true;
}else{
if(_676=="error"){
return this.onLongResponseTimeError(_66c,_66d,_66e,_66f,_670,_671,_672,_674.result);
}else{
if(_676=="done"){
r=this.fullResult=_674;
this.result=(r||0).result;
_672.callback(this.result);
}else{
_675=true;
}
}
}
if(_675){
wm.onidle(this,function(){
this.invoke(_66c,_66d,_66e,_66f,true,_672,_671);
});
}
}else{
_672.callback(this.onResult(_674));
}
},onLongResponseTimeError:function(_677,_678,_679,_67a,_67b,_67c,_67d,_67e,_67f){
if(!_67e.xhr){
_67d.errback(_67f);
return;
}
if((_67e.xhr.status==504)||(_67e.xhr.status==502&&_67e.xhr.getResponseHeader("X-Squid-Error")==="ERR_ZERO_SIZE_OBJECT 0")){
this.invoke(_677,_678,_679,_67a,true,_67d,_67c);
}else{
_67d.errback(this.onError(_67f));
}
},onResult:function(_680){
this.inflight=false;
var r=this.fullResult=_680;
this.result=(r||0).result;
return this.result;
},onError:function(_681){
this.inflight=false;
var _682=_681!=null&&dojo.isObject(_681)?_681.message:_681;
try{
if(!_681||_682.match(/No ServiceWire found/)&&!djConfig.isDebug){
return;
}
if(_682.indexOf("Invalid Long Polling Request:")==0){
var _683=_682.match(/Timeout for this server is: (\d+)/);
wm.connectionTimeout=_683?Number(_683[1]):30;
return;
}
if(console.groupCollapsed){
console.groupCollapsed("Service Call Failed: "+this.name+"."+this.debugLastMethod);
}else{
}
if(_682){
console.error(_682);
}
var _684=_682.match(/(\d+)$/);
var _685=(_684)?_684[0]:"";
if(_685==403){
dojo.publish("session-expiration",[]);
if(app){
app._onSessionExpiration();
}
}
}
catch(e){
if(wm.logging){
}
}
this.reportError(_681);
return this.error=_681;
},reportError:function(_686){
var m=dojo.isString(_686)?_686:(_686.message?"Error: "+_686.message:"Unspecified Error");
m=(this.name?this.name+": ":"")+m;
if(this.errorLevel>5){
if(!_686.dojoType=="cancel"){
console.error(m);
}
}else{
if(this.errorLevel>0){
wm.logging&&undefined;
}
}
},paramArrayToHash:function(_687){
var hash={};
for(var i=0,p;(p=_687[i]);i++){
hash[p.name]={type:p.type,hidden:p.hidden};
}
return hash;
},listOperations:function(){
this._methods=[];
this._operations={};
var m=(this._service.smd||0).methods||[];
for(var i=0,op;(op=m[i]);i++){
this._methods.push(op.name);
this._operations[op.name]={parameters:this.paramArrayToHash(op.parameters||[]),returnType:op.returnType||"any",operationType:op.operationType||""};
}
this._methods.sort();
},makePropEdit:function(_688,_689,_68a){
if(_688=="operations"){
return new wm.SelectMenu(dojo.mixin(_68a,{options:this._methods||[]}));
}
return this.inherited(arguments);
}});
wm.Object.extendSchema(wm.JsonRpcService,{ready:{ignore:1}});
wm.JsonRpcService.description="Any JsonRpc service.";
wm.JsonRpcService.smdCache={};
}
dojo.i18n._preloadLocalizations("dojo.nls.lib_build_phonegap",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
