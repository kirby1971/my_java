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

dojo.provide("wm.compressed.wm_progressbar");
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(_1){
var _2=this;
dojo.mixin(_2,_1);
_2.node=_1.node;
_2._showArgs=dojo.mixin({},_1);
_2._showArgs.node=_2.node;
_2._showArgs.duration=_2.showDuration;
_2.showAnim=_2.showFunc(_2._showArgs);
_2._hideArgs=dojo.mixin({},_1);
_2._hideArgs.node=_2.node;
_2._hideArgs.duration=_2.hideDuration;
_2.hideAnim=_2.hideFunc(_2._hideArgs);
dojo.connect(_2.showAnim,"beforeBegin",dojo.hitch(_2.hideAnim,"stop",true));
dojo.connect(_2.hideAnim,"beforeBegin",dojo.hitch(_2.showAnim,"stop",true));
},show:function(_3){
return this.showAnim.play(_3||0);
},hide:function(_4){
return this.hideAnim.play(_4||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_5={_fire:function(_6,_7){
if(this[_6]){
this[_6].apply(this,_7||[]);
}
return this;
}};
var _8=function(_9){
this._index=-1;
this._animations=_9||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_8,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
d.disconnect(this._onAnimateCtx);
d.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_a,_b){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_b&&this._current.status()=="playing"){
return this;
}
var _c=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_d=d.connect(this._current,"onBegin",this,function(_e){
this._fire("onBegin",arguments);
}),_f=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_c);
d.disconnect(_d);
d.disconnect(_f);
});
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=d.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
d.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_10,_11){
this.pause();
var _12=this.duration*_10;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_12){
this._current=a;
return true;
}
_12-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_12/this._current.duration,_11);
}
return this;
},stop:function(_13){
if(this._current){
if(_13){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=d.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
d.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
}});
d.extend(_8,_5);
dojo.fx.chain=function(_14){
return new _8(_14);
};
var _15=function(_16){
this._animations=_16||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_16,function(a){
var _17=a.duration;
if(a.delay){
_17+=a.delay;
}
if(this.duration<_17){
this.duration=_17;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d.Animation({curve:[0,1],duration:this.duration});
var _18=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
_18._connects.push(d.connect(_18._pseudoAnimation,evt,function(){
_18._fire(evt,arguments);
}));
});
};
d.extend(_15,{_doAction:function(_19,_1a){
d.forEach(this._animations,function(a){
a[_19].apply(a,_1a);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_1b,_1c){
var t=this._pseudoAnimation;
t[_1b].apply(t,_1c);
},play:function(_1d,_1e){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_1f,_20){
var ms=this.duration*_1f;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_20);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_21){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_15,_5);
dojo.fx.combine=function(_22){
return new _15(_22);
};
dojo.fx.wipeIn=function(_23){
var _24=_23.node=d.byId(_23.node),s=_24.style,o;
var _25=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _26=d.style(_24,"height");
return Math.max(_26,1);
}
},end:function(){
return _24.scrollHeight;
}}}},_23));
d.connect(_25,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return _25;
};
dojo.fx.wipeOut=function(_27){
var _28=_27.node=d.byId(_27.node),s=_28.style,o;
var _29=d.animateProperty(d.mixin({properties:{height:{end:1}}},_27));
d.connect(_29,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(_29,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return _29;
};
dojo.fx.slideTo=function(_2a){
var _2b=_2a.node=d.byId(_2a.node),top=null,_2c=null;
var _2d=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
_2c=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.position(n,true);
top=ret.y;
_2c=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=_2c+"px";
}
};
})(_2b);
_2d();
var _2e=d.animateProperty(d.mixin({properties:{top:_2a.top||0,left:_2a.left||0}},_2a));
d.connect(_2e,"beforeBegin",_2e,_2d);
return _2e;
};
})();
}
if(!dojo._hasResource["dojo.number"]){
dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.getObject("number",true,dojo);
dojo.number.format=function(_2f,_30){
_30=dojo.mixin({},_30||{});
var _31=dojo.i18n.normalizeLocale(_30.locale),_32=dojo.i18n.getLocalization("dojo.cldr","number",_31);
_30.customs=_32;
var _33=_30.pattern||_32[(_30.type||"decimal")+"Format"];
if(isNaN(_2f)||Math.abs(_2f)==Infinity){
return null;
}
return dojo.number._applyPattern(_2f,_33,_30);
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(_34,_35,_36){
_36=_36||{};
var _37=_36.customs.group,_38=_36.customs.decimal,_39=_35.split(";"),_3a=_39[0];
_35=_39[(_34<0)?1:0]||("-"+_3a);
if(_35.indexOf("%")!=-1){
_34*=100;
}else{
if(_35.indexOf("‰")!=-1){
_34*=1000;
}else{
if(_35.indexOf("¤")!=-1){
_37=_36.customs.currencyGroup||_37;
_38=_36.customs.currencyDecimal||_38;
_35=_35.replace(/\u00a4{1,3}/,function(_3b){
var _3c=["symbol","currency","displayName"][_3b.length-1];
return _36[_3c]||_36.currency||"";
});
}else{
if(_35.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _3d=dojo.number._numberPatternRE;
var _3e=_3a.match(_3d);
if(!_3e){
throw new Error("unable to find a number expression in pattern: "+_35);
}
if(_36.fractional===false){
_36.places=0;
}
return _35.replace(_3d,dojo.number._formatAbsolute(_34,_3e[0],{decimal:_38,group:_37,places:_36.places,round:_36.round}));
};
dojo.number.round=function(_3f,_40,_41){
var _42=10/(_41||10);
return (_42*+_3f).toFixed(_40)/_42;
};
if((0.9).toFixed()==0){
(function(){
var _43=dojo.number.round;
dojo.number.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _43(v,p,m)+(v>0?d:-d);
};
})();
}
dojo.number._formatAbsolute=function(_44,_45,_46){
_46=_46||{};
if(_46.places===true){
_46.places=0;
}
if(_46.places===Infinity){
_46.places=6;
}
var _47=_45.split("."),_48=typeof _46.places=="string"&&_46.places.indexOf(","),_49=_46.places;
if(_48){
_49=_46.places.substring(_48+1);
}else{
if(!(_49>=0)){
_49=(_47[1]||[]).length;
}
}
if(!(_46.round<0)){
_44=dojo.number.round(_44,_49,_46.round);
}
var _4a=String(Math.abs(_44)).split("."),_4b=_4a[1]||"";
if(_47[1]||_46.places){
if(_48){
_46.places=_46.places.substring(0,_48);
}
var pad=_46.places!==undefined?_46.places:(_47[1]&&_47[1].lastIndexOf("0")+1);
if(pad>_4b.length){
_4a[1]=dojo.string.pad(_4b,pad,"0",true);
}
if(_49<_4b.length){
_4a[1]=_4b.substr(0,_49);
}
}else{
if(_4a[1]){
_4a.pop();
}
}
var _4c=_47[0].replace(",","");
pad=_4c.indexOf("0");
if(pad!=-1){
pad=_4c.length-pad;
if(pad>_4a[0].length){
_4a[0]=dojo.string.pad(_4a[0],pad);
}
if(_4c.indexOf("#")==-1){
_4a[0]=_4a[0].substr(_4a[0].length-pad);
}
}
var _4d=_47[0].lastIndexOf(","),_4e,_4f;
if(_4d!=-1){
_4e=_47[0].length-_4d-1;
var _50=_47[0].substr(0,_4d);
_4d=_50.lastIndexOf(",");
if(_4d!=-1){
_4f=_50.length-_4d-1;
}
}
var _51=[];
for(var _52=_4a[0];_52;){
var off=_52.length-_4e;
_51.push((off>0)?_52.substr(off):_52);
_52=(off>0)?_52.slice(0,off):"";
if(_4f){
_4e=_4f;
delete _4f;
}
}
_4a[0]=_51.reverse().join(_46.group||",");
return _4a.join(_46.decimal||".");
};
dojo.number.regexp=function(_53){
return dojo.number._parseInfo(_53).regexp;
};
dojo.number._parseInfo=function(_54){
_54=_54||{};
var _55=dojo.i18n.normalizeLocale(_54.locale),_56=dojo.i18n.getLocalization("dojo.cldr","number",_55),_57=_54.pattern||_56[(_54.type||"decimal")+"Format"],_58=_56.group,_59=_56.decimal,_5a=1;
if(_57.indexOf("%")!=-1){
_5a/=100;
}else{
if(_57.indexOf("‰")!=-1){
_5a/=1000;
}else{
var _5b=_57.indexOf("¤")!=-1;
if(_5b){
_58=_56.currencyGroup||_58;
_59=_56.currencyDecimal||_59;
}
}
}
var _5c=_57.split(";");
if(_5c.length==1){
_5c.push("-"+_5c[0]);
}
var re=dojo.regexp.buildGroupRE(_5c,function(_5d){
_5d="(?:"+dojo.regexp.escapeString(_5d,".")+")";
return _5d.replace(dojo.number._numberPatternRE,function(_5e){
var _5f={signed:false,separator:_54.strict?_58:[_58,""],fractional:_54.fractional,decimal:_59,exponent:false},_60=_5e.split("."),_61=_54.places;
if(_60.length==1&&_5a!=1){
_60[1]="###";
}
if(_60.length==1||_61===0){
_5f.fractional=false;
}else{
if(_61===undefined){
_61=_54.pattern?_60[1].lastIndexOf("0")+1:Infinity;
}
if(_61&&_54.fractional==undefined){
_5f.fractional=true;
}
if(!_54.places&&(_61<_60[1].length)){
_61+=","+_60[1].length;
}
_5f.places=_61;
}
var _62=_60[0].split(",");
if(_62.length>1){
_5f.groupSize=_62.pop().length;
if(_62.length>1){
_5f.groupSize2=_62.pop().length;
}
}
return "("+dojo.number._realNumberRegexp(_5f)+")";
});
},true);
if(_5b){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_63,_64,_65,_66){
var _67=["symbol","currency","displayName"][_65.length-1],_68=dojo.regexp.escapeString(_54[_67]||_54.currency||"");
_64=_64?"[\\s\\xa0]":"";
_66=_66?"[\\s\\xa0]":"";
if(!_54.strict){
if(_64){
_64+="*";
}
if(_66){
_66+="*";
}
return "(?:"+_64+_68+_66+")?";
}
return _64+_68+_66;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_58,decimal:_59,factor:_5a};
};
dojo.number.parse=function(_69,_6a){
var _6b=dojo.number._parseInfo(_6a),_6c=(new RegExp("^"+_6b.regexp+"$")).exec(_69);
if(!_6c){
return NaN;
}
var _6d=_6c[1];
if(!_6c[1]){
if(!_6c[2]){
return NaN;
}
_6d=_6c[2];
_6b.factor*=-1;
}
_6d=_6d.replace(new RegExp("["+_6b.group+"\\s\\xa0"+"]","g"),"").replace(_6b.decimal,".");
return _6d*_6b.factor;
};
dojo.number._realNumberRegexp=function(_6e){
_6e=_6e||{};
if(!("places" in _6e)){
_6e.places=Infinity;
}
if(typeof _6e.decimal!="string"){
_6e.decimal=".";
}
if(!("fractional" in _6e)||/^0/.test(_6e.places)){
_6e.fractional=[true,false];
}
if(!("exponent" in _6e)){
_6e.exponent=[true,false];
}
if(!("eSigned" in _6e)){
_6e.eSigned=[true,false];
}
var _6f=dojo.number._integerRegexp(_6e),_70=dojo.regexp.buildGroupRE(_6e.fractional,function(q){
var re="";
if(q&&(_6e.places!==0)){
re="\\"+_6e.decimal;
if(_6e.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_6e.places+"}";
}
}
return re;
},true);
var _71=dojo.regexp.buildGroupRE(_6e.exponent,function(q){
if(q){
return "([eE]"+dojo.number._integerRegexp({signed:_6e.eSigned})+")";
}
return "";
});
var _72=_6f+_70;
if(_70){
_72="(?:(?:"+_72+")|(?:"+_70+"))";
}
return _72+_71;
};
dojo.number._integerRegexp=function(_73){
_73=_73||{};
if(!("signed" in _73)){
_73.signed=[true,false];
}
if(!("separator" in _73)){
_73.separator="";
}else{
if(!("groupSize" in _73)){
_73.groupSize=3;
}
}
var _74=dojo.regexp.buildGroupRE(_73.signed,function(q){
return q?"[-+]":"";
},true);
var _75=dojo.regexp.buildGroupRE(_73.separator,function(sep){
if(!sep){
return "(?:\\d+)";
}
sep=dojo.regexp.escapeString(sep);
if(sep==" "){
sep="\\s";
}else{
if(sep==" "){
sep="\\s\\xa0";
}
}
var grp=_73.groupSize,_76=_73.groupSize2;
if(_76){
var _77="(?:0|[1-9]\\d{0,"+(_76-1)+"}(?:["+sep+"]\\d{"+_76+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-_76)>0)?"(?:"+_77+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_77;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _74+_75;
};
}
if(!dojo._hasResource["dijit.ProgressBar"]){
dojo._hasResource["dijit.ProgressBar"]=true;
dojo.provide("dijit.ProgressBar");
dojo.declare("dijit.ProgressBar",[dijit._Widget,dijit._Templated],{progress:"0",value:"",maximum:100,places:0,indeterminate:false,label:"",name:"",templateString:dojo.cache("dijit","templates/ProgressBar.html","<div class=\"dijitProgressBar dijitProgressBarEmpty\" role=\"progressbar\"\r\n\t><div  dojoAttachPoint=\"internalProgress\" class=\"dijitProgressBarFull\"\r\n\t\t><div class=\"dijitProgressBarTile\" role=\"presentation\"></div\r\n\t\t><span style=\"visibility:hidden\">&nbsp;</span\r\n\t></div\r\n\t><div dojoAttachPoint=\"labelNode\" class=\"dijitProgressBarLabel\" id=\"${id}_label\"></div\r\n\t><img dojoAttachPoint=\"indeterminateHighContrastImage\" class=\"dijitProgressBarIndeterminateHighContrastImage\" alt=\"\"\r\n/></div>\r\n"),_indeterminateHighContrastImagePath:dojo.moduleUrl("dijit","themes/a11y/indeterminate_progress.gif"),postMixInProperties:function(){
this.inherited(arguments);
if(!("value" in this.params)){
this.value=this.indeterminate?Infinity:this.progress;
}
},buildRendering:function(){
this.inherited(arguments);
this.indeterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath.toString());
this.update();
},update:function(_78){
dojo.mixin(this,_78||{});
var tip=this.internalProgress,ap=this.domNode;
var _79=1;
if(this.indeterminate){
dijit.removeWaiState(ap,"valuenow");
dijit.removeWaiState(ap,"valuemin");
dijit.removeWaiState(ap,"valuemax");
}else{
if(String(this.progress).indexOf("%")!=-1){
_79=Math.min(parseFloat(this.progress)/100,1);
this.progress=_79*this.maximum;
}else{
this.progress=Math.min(this.progress,this.maximum);
_79=this.progress/this.maximum;
}
dijit.setWaiState(ap,"describedby",this.labelNode.id);
dijit.setWaiState(ap,"valuenow",this.progress);
dijit.setWaiState(ap,"valuemin",0);
dijit.setWaiState(ap,"valuemax",this.maximum);
}
this.labelNode.innerHTML=this.report(_79);
dojo.toggleClass(this.domNode,"dijitProgressBarIndeterminate",this.indeterminate);
tip.style.width=(_79*100)+"%";
this.onChange();
},_setValueAttr:function(v){
this._set("value",v);
if(v==Infinity){
this.update({indeterminate:true});
}else{
this.update({indeterminate:false,progress:v});
}
},_setLabelAttr:function(_7a){
this._set("label",_7a);
this.update();
},_setIndeterminateAttr:function(_7b){
this.indeterminate=_7b;
this.update();
},report:function(_7c){
return this.label?this.label:(this.indeterminate?"&nbsp;":dojo.number.format(_7c,{type:"percent",places:this.places,locale:this.lang}));
},onChange:function(){
}});
}
if(!dojo._hasResource["wm.base.widget.dijit.Dijit"]){
dojo._hasResource["wm.base.widget.dijit.Dijit"]=true;
dojo.provide("wm.base.widget.dijit.Dijit");
dojo.addOnLoad(function(){
var _7d=function(_7e){
var n=dojo.byId(_7e);
n&&(n.style.visibility="hidden");
};
_7d("a11yTestNode");
});
dojo.declare("wm.Dijit",wm.Control,{dijitClass:null,nonDijitProps:{name:1,flex:1,box:1,left:1,top:1,width:1,height:1,owner:1,parent:1,publishClass:1,dijitClass:1,domNode:1,id:1},prepare:function(_7f){
this.dijitProps={};
for(var i in _7f){
if(!(i in this.nonDijitProps)){
this.dijitProps[i]=_7f[i];
}
}
this.inherited(arguments);
},destroy:function(){
if(this.dijit){
this.dijit.destroy();
}
this.inherited(arguments);
},setDomNode:function(_80){
_80=this.initDijit(_80);
this.inherited(arguments);
},initDijit:function(_81){
if(this.dijitClass){
if(typeof this.dijitClass=="string"){
dojo["require"](this.dijitClass);
}
var n=document.createElement("div");
_81.appendChild(n);
var p=dojo.mixin({srcNodeRef:n},this.getProperties());
var _82=typeof this.dijitClass=="string"?dojo.getObject(this.dijitClass):this.dijitClass;
try{
this.dijit=_82?new _82(p):null;
this.setEvents();
}
catch(e){
console.error(e);
}
}
return _81;
},getProperties:function(){
return this.dijitProps;
},setEvents:function(){
for(var n in this.dijit){
if(!n.indexOf("on")){
var e="_"+n;
if(!this[e]){
e=n;
}
if(this[e]){
this.connect(this.dijit,n,this,e);
}
}
}
}});
wm.Object.extendSchema(wm.Dijit,{box:{ignore:1}});
dojo.declare("wm.DijitWrapper",wm.Dijit,{});
dojo.declare("wm.CustomDijit",wm.Dijit,{scrim:true,renderBoundsX:true,renderBoundsY:true,renderBounds:function(){
this.inherited(arguments);
if(this.dijit){
var b=this.getStyleBounds();
if(!this.renderBoundsX){
delete b.w;
}
if(!this.renderBoundsY){
delete b.h;
}
dojo.marginBox(this.dijit.domNode,b);
}
}});
dojo.declare("wm.DijitDesigner",wm.CustomDijit,{dijitPropList:"",dijitClass:"",setProp:function(_83,_84){
if(_83.indexOf("wmdijit")==0){
this[_83]=_84;
this.dijitSet(_83,_84);
}else{
this.inherited(arguments);
}
},dijitSet:function(_85,_86){
if(_85.indexOf("wmdijit")==0){
_85=wm.decapitalize(_85.substring(7));
}
if(this.dijit["set"+wm.capitalize(_85)]){
this.dijit["set"+wm.capitalize(_85)](_86);
}else{
this.dijit.set(_85,_86);
}
},getProp:function(_87){
if(_87.indexOf("wmdijit")==0){
return this.dijitGet(_87);
}else{
return this.inherited(arguments);
}
},dijitGet:function(_88){
var _89=null;
try{
if(_88.indexOf("wmdijit")==0){
_88=wm.decapitalize(_88.substring(7));
}
if(this.dijit["get"+wm.capitalize(_88)]){
_89=this.dijit["get"+wm.capitalize(_88)]();
}else{
_89=this.dijit.get(_88);
}
if(_89 instanceof Date){
_89=this._isDesignLoaded?dojo.date.locale.format(_89,{formatLength:"short"}):_89.getTime();
}else{
if(wm.isNode(_89)){
_89=_89.id;
}
}
}
catch(e){
}
return _89;
},getProperties:function(){
var _8a={};
var _8b=this.dijitPropList.split(/,/);
for(var i=0;i<_8b.length;i++){
var _8c=_8b[i];
if(_8c.indexOf("wmdijit")==0){
_8a[wm.decapitalize(_8c.substring(7))]=this[_8c];
}else{
_8a[_8c]=this[_8c];
}
}
return _8a;
},setEvents:function(){
for(var _8d in this.dijit){
if(_8d.indexOf("on")==0&&!_8d.match(/(Mouse|Key)/)){
var _8e="onDijit"+_8d.substring(2);
if(!this[_8e]){
this[_8e]=function(){
};
}
this.connect(this.dijit,_8d,this,_8e);
}
}
},_end:0});
}
if(!dojo._hasResource["wm.base.widget.dijit.ProgressBar"]){
dojo._hasResource["wm.base.widget.dijit.ProgressBar"]=true;
dojo.provide("wm.base.widget.dijit.ProgressBar");
dojo.declare("wm.dijit.ProgressBar",wm.Dijit,{progress:10,indeterminate:false,dijitClass:dijit.ProgressBar,width:"20em",classNames:"wmprogressbar",renderBounds:function(){
this.inherited(arguments);
this.reflowDijit();
},init:function(){
this.inherited(arguments);
this.dijit.progress=this.progress;
this.dijit.indeterminate=this.indeterminate;
this.connect(this.dijit,"update",this,"reflowDijit");
this.dijit.update();
},reflowDijit:function(){
var b=dojo.contentBox(this.domNode);
if(this.dijit){
dojo.marginBox(this.dijit.domNode,{h:b.h});
if(this.dijit.labelNode){
dojo.marginBox(this.dijit.labelNode,{h:b.h});
this.dijit.labelNode.style.lineHeight=b.h+"px";
}
}
},setProgress:function(_8f){
var p=Number(_8f);
this.progress=isNaN(p)?0:p;
this.dijit.progress=this.progress;
this.dijit.update();
this.valueChanged("progress",this.progress);
},getProgress:function(){
return this.dijit.progress;
},setIndeterminate:function(_90){
this.indeterminate=_90;
this.dijit.indeterminate=this.indeterminate;
this.dijit.update();
this.valueChanged("indeterminate",this.indeterminate);
},getIndeterminate:function(){
return this.dijit.indeterminate;
},onChange:function(){
}});
}
if(!dojo._hasResource["wm.base.widget.Layers.BreadcrumbDecorator"]){
dojo._hasResource["wm.base.widget.Layers.BreadcrumbDecorator"]=true;
dojo.provide("wm.base.widget.Layers.BreadcrumbDecorator");
dojo.declare("wm.BreadcrumbDecorator",wm.TabsDecorator,{decorationClass:"wmbreadcrumblayers",decoratorPadding:"2",setLayerActive:function(_91,_92){
var _93=!_91._isShowing;
this.inherited(arguments);
if(_91._isDesignLoaded||this.decoree._cupdating){
return;
}
var _94=this.decoree.layers;
if(_92){
if(!_93){
var _95=_91.getIndex();
for(var i=_94.length-1;i>_95;i--){
if(_94[i].showing){
break;
}
}
if(i>_95&&!this.decoree._isDesignLoaded){
this.decoree.moveLayerIndex(_91,i+1);
}
_91.show();
if(_91.showing){
_91.domNode.style.display="";
_91.reflow();
}
}else{
for(var i=_91.getIndex()+1;i<_94.length;i++){
if(_94[i].showing){
_94[i].setShowing(false);
}
}
}
this.decoree.layerIndex=_91.getIndex();
var _96=this.decoree.layers.length;
for(var i=_91.getIndex()+1;i<_96;i++){
if(this.decoree.layers[i].showing){
this.decoree.layers[i].hide();
}
}
}
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_progressbar",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
