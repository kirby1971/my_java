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

dojo.provide("wm.compressed.wm_fileupload");
if(!dojo._hasResource["wm.base.widget.dijit.Dijit"]){
dojo._hasResource["wm.base.widget.dijit.Dijit"]=true;
dojo.provide("wm.base.widget.dijit.Dijit");
dojo.addOnLoad(function(){
var _1=function(_2){
var n=dojo.byId(_2);
n&&(n.style.visibility="hidden");
};
_1("a11yTestNode");
});
dojo.declare("wm.Dijit",wm.Control,{dijitClass:null,nonDijitProps:{name:1,flex:1,box:1,left:1,top:1,width:1,height:1,owner:1,parent:1,publishClass:1,dijitClass:1,domNode:1,id:1},prepare:function(_3){
this.dijitProps={};
for(var i in _3){
if(!(i in this.nonDijitProps)){
this.dijitProps[i]=_3[i];
}
}
this.inherited(arguments);
},destroy:function(){
if(this.dijit){
this.dijit.destroy();
}
this.inherited(arguments);
},setDomNode:function(_4){
_4=this.initDijit(_4);
this.inherited(arguments);
},initDijit:function(_5){
if(this.dijitClass){
if(typeof this.dijitClass=="string"){
dojo["require"](this.dijitClass);
}
var n=document.createElement("div");
_5.appendChild(n);
var p=dojo.mixin({srcNodeRef:n},this.getProperties());
var _6=typeof this.dijitClass=="string"?dojo.getObject(this.dijitClass):this.dijitClass;
try{
this.dijit=_6?new _6(p):null;
this.setEvents();
}
catch(e){
console.error(e);
}
}
return _5;
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
dojo.declare("wm.DijitDesigner",wm.CustomDijit,{dijitPropList:"",dijitClass:"",setProp:function(_7,_8){
if(_7.indexOf("wmdijit")==0){
this[_7]=_8;
this.dijitSet(_7,_8);
}else{
this.inherited(arguments);
}
},dijitSet:function(_9,_a){
if(_9.indexOf("wmdijit")==0){
_9=wm.decapitalize(_9.substring(7));
}
if(this.dijit["set"+wm.capitalize(_9)]){
this.dijit["set"+wm.capitalize(_9)](_a);
}else{
this.dijit.set(_9,_a);
}
},getProp:function(_b){
if(_b.indexOf("wmdijit")==0){
return this.dijitGet(_b);
}else{
return this.inherited(arguments);
}
},dijitGet:function(_c){
var _d=null;
try{
if(_c.indexOf("wmdijit")==0){
_c=wm.decapitalize(_c.substring(7));
}
if(this.dijit["get"+wm.capitalize(_c)]){
_d=this.dijit["get"+wm.capitalize(_c)]();
}else{
_d=this.dijit.get(_c);
}
if(_d instanceof Date){
_d=this._isDesignLoaded?dojo.date.locale.format(_d,{formatLength:"short"}):_d.getTime();
}else{
if(wm.isNode(_d)){
_d=_d.id;
}
}
}
catch(e){
}
return _d;
},getProperties:function(){
var _e={};
var _f=this.dijitPropList.split(/,/);
for(var i=0;i<_f.length;i++){
var _10=_f[i];
if(_10.indexOf("wmdijit")==0){
_e[wm.decapitalize(_10.substring(7))]=this[_10];
}else{
_e[_10]=this[_10];
}
}
return _e;
},setEvents:function(){
for(var _11 in this.dijit){
if(_11.indexOf("on")==0&&!_11.match(/(Mouse|Key)/)){
var _12="onDijit"+_11.substring(2);
if(!this[_12]){
this[_12]=function(){
};
}
this.connect(this.dijit,_11,this,_12);
}
}
},_end:0});
}
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(_13){
var _14=this;
dojo.mixin(_14,_13);
_14.node=_13.node;
_14._showArgs=dojo.mixin({},_13);
_14._showArgs.node=_14.node;
_14._showArgs.duration=_14.showDuration;
_14.showAnim=_14.showFunc(_14._showArgs);
_14._hideArgs=dojo.mixin({},_13);
_14._hideArgs.node=_14.node;
_14._hideArgs.duration=_14.hideDuration;
_14.hideAnim=_14.hideFunc(_14._hideArgs);
dojo.connect(_14.showAnim,"beforeBegin",dojo.hitch(_14.hideAnim,"stop",true));
dojo.connect(_14.hideAnim,"beforeBegin",dojo.hitch(_14.showAnim,"stop",true));
},show:function(_15){
return this.showAnim.play(_15||0);
},hide:function(_16){
return this.hideAnim.play(_16||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_17={_fire:function(evt,_18){
if(this[evt]){
this[evt].apply(this,_18||[]);
}
return this;
}};
var _19=function(_1a){
this._index=-1;
this._animations=_1a||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_19,{_onAnimate:function(){
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
},play:function(_1b,_1c){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_1c&&this._current.status()=="playing"){
return this;
}
var _1d=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_1e=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_1f=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_1d);
d.disconnect(_1e);
d.disconnect(_1f);
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
},gotoPercent:function(_20,_21){
this.pause();
var _22=this.duration*_20;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_22){
this._current=a;
return true;
}
_22-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_22/this._current.duration,_21);
}
return this;
},stop:function(_23){
if(this._current){
if(_23){
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
d.extend(_19,_17);
dojo.fx.chain=function(_24){
return new _19(_24);
};
var _25=function(_26){
this._animations=_26||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_26,function(a){
var _27=a.duration;
if(a.delay){
_27+=a.delay;
}
if(this.duration<_27){
this.duration=_27;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d.Animation({curve:[0,1],duration:this.duration});
var _28=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
_28._connects.push(d.connect(_28._pseudoAnimation,evt,function(){
_28._fire(evt,arguments);
}));
});
};
d.extend(_25,{_doAction:function(_29,_2a){
d.forEach(this._animations,function(a){
a[_29].apply(a,_2a);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_2b,_2c){
var t=this._pseudoAnimation;
t[_2b].apply(t,_2c);
},play:function(_2d,_2e){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_2f,_30){
var ms=this.duration*_2f;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_30);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_31){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_25,_17);
dojo.fx.combine=function(_32){
return new _25(_32);
};
dojo.fx.wipeIn=function(_33){
var _34=_33.node=d.byId(_33.node),s=_34.style,o;
var _35=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _36=d.style(_34,"height");
return Math.max(_36,1);
}
},end:function(){
return _34.scrollHeight;
}}}},_33));
d.connect(_35,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return _35;
};
dojo.fx.wipeOut=function(_37){
var _38=_37.node=d.byId(_37.node),s=_38.style,o;
var _39=d.animateProperty(d.mixin({properties:{height:{end:1}}},_37));
d.connect(_39,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(_39,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return _39;
};
dojo.fx.slideTo=function(_3a){
var _3b=_3a.node=d.byId(_3a.node),top=null,_3c=null;
var _3d=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
_3c=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.position(n,true);
top=ret.y;
_3c=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=_3c+"px";
}
};
})(_3b);
_3d();
var _3e=d.animateProperty(d.mixin({properties:{top:_3a.top||0,left:_3a.left||0}},_3a));
d.connect(_3e,"beforeBegin",_3e,_3d);
return _3e;
};
})();
}
if(!dojo._hasResource["dojo.number"]){
dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.getObject("number",true,dojo);
dojo.number.format=function(_3f,_40){
_40=dojo.mixin({},_40||{});
var _41=dojo.i18n.normalizeLocale(_40.locale),_42=dojo.i18n.getLocalization("dojo.cldr","number",_41);
_40.customs=_42;
var _43=_40.pattern||_42[(_40.type||"decimal")+"Format"];
if(isNaN(_3f)||Math.abs(_3f)==Infinity){
return null;
}
return dojo.number._applyPattern(_3f,_43,_40);
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(_44,_45,_46){
_46=_46||{};
var _47=_46.customs.group,_48=_46.customs.decimal,_49=_45.split(";"),_4a=_49[0];
_45=_49[(_44<0)?1:0]||("-"+_4a);
if(_45.indexOf("%")!=-1){
_44*=100;
}else{
if(_45.indexOf("‰")!=-1){
_44*=1000;
}else{
if(_45.indexOf("¤")!=-1){
_47=_46.customs.currencyGroup||_47;
_48=_46.customs.currencyDecimal||_48;
_45=_45.replace(/\u00a4{1,3}/,function(_4b){
var _4c=["symbol","currency","displayName"][_4b.length-1];
return _46[_4c]||_46.currency||"";
});
}else{
if(_45.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _4d=dojo.number._numberPatternRE;
var _4e=_4a.match(_4d);
if(!_4e){
throw new Error("unable to find a number expression in pattern: "+_45);
}
if(_46.fractional===false){
_46.places=0;
}
return _45.replace(_4d,dojo.number._formatAbsolute(_44,_4e[0],{decimal:_48,group:_47,places:_46.places,round:_46.round}));
};
dojo.number.round=function(_4f,_50,_51){
var _52=10/(_51||10);
return (_52*+_4f).toFixed(_50)/_52;
};
if((0.9).toFixed()==0){
(function(){
var _53=dojo.number.round;
dojo.number.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _53(v,p,m)+(v>0?d:-d);
};
})();
}
dojo.number._formatAbsolute=function(_54,_55,_56){
_56=_56||{};
if(_56.places===true){
_56.places=0;
}
if(_56.places===Infinity){
_56.places=6;
}
var _57=_55.split("."),_58=typeof _56.places=="string"&&_56.places.indexOf(","),_59=_56.places;
if(_58){
_59=_56.places.substring(_58+1);
}else{
if(!(_59>=0)){
_59=(_57[1]||[]).length;
}
}
if(!(_56.round<0)){
_54=dojo.number.round(_54,_59,_56.round);
}
var _5a=String(Math.abs(_54)).split("."),_5b=_5a[1]||"";
if(_57[1]||_56.places){
if(_58){
_56.places=_56.places.substring(0,_58);
}
var pad=_56.places!==undefined?_56.places:(_57[1]&&_57[1].lastIndexOf("0")+1);
if(pad>_5b.length){
_5a[1]=dojo.string.pad(_5b,pad,"0",true);
}
if(_59<_5b.length){
_5a[1]=_5b.substr(0,_59);
}
}else{
if(_5a[1]){
_5a.pop();
}
}
var _5c=_57[0].replace(",","");
pad=_5c.indexOf("0");
if(pad!=-1){
pad=_5c.length-pad;
if(pad>_5a[0].length){
_5a[0]=dojo.string.pad(_5a[0],pad);
}
if(_5c.indexOf("#")==-1){
_5a[0]=_5a[0].substr(_5a[0].length-pad);
}
}
var _5d=_57[0].lastIndexOf(","),_5e,_5f;
if(_5d!=-1){
_5e=_57[0].length-_5d-1;
var _60=_57[0].substr(0,_5d);
_5d=_60.lastIndexOf(",");
if(_5d!=-1){
_5f=_60.length-_5d-1;
}
}
var _61=[];
for(var _62=_5a[0];_62;){
var off=_62.length-_5e;
_61.push((off>0)?_62.substr(off):_62);
_62=(off>0)?_62.slice(0,off):"";
if(_5f){
_5e=_5f;
delete _5f;
}
}
_5a[0]=_61.reverse().join(_56.group||",");
return _5a.join(_56.decimal||".");
};
dojo.number.regexp=function(_63){
return dojo.number._parseInfo(_63).regexp;
};
dojo.number._parseInfo=function(_64){
_64=_64||{};
var _65=dojo.i18n.normalizeLocale(_64.locale),_66=dojo.i18n.getLocalization("dojo.cldr","number",_65),_67=_64.pattern||_66[(_64.type||"decimal")+"Format"],_68=_66.group,_69=_66.decimal,_6a=1;
if(_67.indexOf("%")!=-1){
_6a/=100;
}else{
if(_67.indexOf("‰")!=-1){
_6a/=1000;
}else{
var _6b=_67.indexOf("¤")!=-1;
if(_6b){
_68=_66.currencyGroup||_68;
_69=_66.currencyDecimal||_69;
}
}
}
var _6c=_67.split(";");
if(_6c.length==1){
_6c.push("-"+_6c[0]);
}
var re=dojo.regexp.buildGroupRE(_6c,function(_6d){
_6d="(?:"+dojo.regexp.escapeString(_6d,".")+")";
return _6d.replace(dojo.number._numberPatternRE,function(_6e){
var _6f={signed:false,separator:_64.strict?_68:[_68,""],fractional:_64.fractional,decimal:_69,exponent:false},_70=_6e.split("."),_71=_64.places;
if(_70.length==1&&_6a!=1){
_70[1]="###";
}
if(_70.length==1||_71===0){
_6f.fractional=false;
}else{
if(_71===undefined){
_71=_64.pattern?_70[1].lastIndexOf("0")+1:Infinity;
}
if(_71&&_64.fractional==undefined){
_6f.fractional=true;
}
if(!_64.places&&(_71<_70[1].length)){
_71+=","+_70[1].length;
}
_6f.places=_71;
}
var _72=_70[0].split(",");
if(_72.length>1){
_6f.groupSize=_72.pop().length;
if(_72.length>1){
_6f.groupSize2=_72.pop().length;
}
}
return "("+dojo.number._realNumberRegexp(_6f)+")";
});
},true);
if(_6b){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_73,_74,_75,_76){
var _77=["symbol","currency","displayName"][_75.length-1],_78=dojo.regexp.escapeString(_64[_77]||_64.currency||"");
_74=_74?"[\\s\\xa0]":"";
_76=_76?"[\\s\\xa0]":"";
if(!_64.strict){
if(_74){
_74+="*";
}
if(_76){
_76+="*";
}
return "(?:"+_74+_78+_76+")?";
}
return _74+_78+_76;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_68,decimal:_69,factor:_6a};
};
dojo.number.parse=function(_79,_7a){
var _7b=dojo.number._parseInfo(_7a),_7c=(new RegExp("^"+_7b.regexp+"$")).exec(_79);
if(!_7c){
return NaN;
}
var _7d=_7c[1];
if(!_7c[1]){
if(!_7c[2]){
return NaN;
}
_7d=_7c[2];
_7b.factor*=-1;
}
_7d=_7d.replace(new RegExp("["+_7b.group+"\\s\\xa0"+"]","g"),"").replace(_7b.decimal,".");
return _7d*_7b.factor;
};
dojo.number._realNumberRegexp=function(_7e){
_7e=_7e||{};
if(!("places" in _7e)){
_7e.places=Infinity;
}
if(typeof _7e.decimal!="string"){
_7e.decimal=".";
}
if(!("fractional" in _7e)||/^0/.test(_7e.places)){
_7e.fractional=[true,false];
}
if(!("exponent" in _7e)){
_7e.exponent=[true,false];
}
if(!("eSigned" in _7e)){
_7e.eSigned=[true,false];
}
var _7f=dojo.number._integerRegexp(_7e),_80=dojo.regexp.buildGroupRE(_7e.fractional,function(q){
var re="";
if(q&&(_7e.places!==0)){
re="\\"+_7e.decimal;
if(_7e.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_7e.places+"}";
}
}
return re;
},true);
var _81=dojo.regexp.buildGroupRE(_7e.exponent,function(q){
if(q){
return "([eE]"+dojo.number._integerRegexp({signed:_7e.eSigned})+")";
}
return "";
});
var _82=_7f+_80;
if(_80){
_82="(?:(?:"+_82+")|(?:"+_80+"))";
}
return _82+_81;
};
dojo.number._integerRegexp=function(_83){
_83=_83||{};
if(!("signed" in _83)){
_83.signed=[true,false];
}
if(!("separator" in _83)){
_83.separator="";
}else{
if(!("groupSize" in _83)){
_83.groupSize=3;
}
}
var _84=dojo.regexp.buildGroupRE(_83.signed,function(q){
return q?"[-+]":"";
},true);
var _85=dojo.regexp.buildGroupRE(_83.separator,function(sep){
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
var grp=_83.groupSize,_86=_83.groupSize2;
if(_86){
var _87="(?:0|[1-9]\\d{0,"+(_86-1)+"}(?:["+sep+"]\\d{"+_86+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-_86)>0)?"(?:"+_87+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_87;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _84+_85;
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
},update:function(_88){
dojo.mixin(this,_88||{});
var tip=this.internalProgress,ap=this.domNode;
var _89=1;
if(this.indeterminate){
dijit.removeWaiState(ap,"valuenow");
dijit.removeWaiState(ap,"valuemin");
dijit.removeWaiState(ap,"valuemax");
}else{
if(String(this.progress).indexOf("%")!=-1){
_89=Math.min(parseFloat(this.progress)/100,1);
this.progress=_89*this.maximum;
}else{
this.progress=Math.min(this.progress,this.maximum);
_89=this.progress/this.maximum;
}
dijit.setWaiState(ap,"describedby",this.labelNode.id);
dijit.setWaiState(ap,"valuenow",this.progress);
dijit.setWaiState(ap,"valuemin",0);
dijit.setWaiState(ap,"valuemax",this.maximum);
}
this.labelNode.innerHTML=this.report(_89);
dojo.toggleClass(this.domNode,"dijitProgressBarIndeterminate",this.indeterminate);
tip.style.width=(_89*100)+"%";
this.onChange();
},_setValueAttr:function(v){
this._set("value",v);
if(v==Infinity){
this.update({indeterminate:true});
}else{
this.update({indeterminate:false,progress:v});
}
},_setLabelAttr:function(_8a){
this._set("label",_8a);
this.update();
},_setIndeterminateAttr:function(_8b){
this.indeterminate=_8b;
this.update();
},report:function(_8c){
return this.label?this.label:(this.indeterminate?"&nbsp;":dojo.number.format(_8c,{type:"percent",places:this.places,locale:this.lang}));
},onChange:function(){
}});
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
},setProgress:function(_8d){
var p=Number(_8d);
this.progress=isNaN(p)?0:p;
this.dijit.progress=this.progress;
this.dijit.update();
this.valueChanged("progress",this.progress);
},getProgress:function(){
return this.dijit.progress;
},setIndeterminate:function(_8e){
this.indeterminate=_8e;
this.dijit.indeterminate=this.indeterminate;
this.dijit.update();
this.valueChanged("indeterminate",this.indeterminate);
},getIndeterminate:function(){
return this.dijit.indeterminate;
},onChange:function(){
}});
}
if(!dojo._hasResource["dojo.io.iframe"]){
dojo._hasResource["dojo.io.iframe"]=true;
dojo.provide("dojo.io.iframe");
dojo.getObject("io",true,dojo);
dojo.io.iframe={create:function(_8f,_90,uri){
if(window[_8f]){
return window[_8f];
}
if(window.frames[_8f]){
return window.frames[_8f];
}
var _91=null;
var _92=uri;
if(!_92){
if(dojo.config["useXDomain"]&&!dojo.config["dojoBlankHtmlUrl"]){
console.warn("dojo.io.iframe.create: When using cross-domain Dojo builds,"+" please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl"+" to the path on your domain to blank.html");
}
_92=(dojo.config["dojoBlankHtmlUrl"]||dojo.moduleUrl("dojo","resources/blank.html"));
}
var _91=dojo.place("<iframe id=\""+_8f+"\" name=\""+_8f+"\" src=\""+_92+"\" onload=\""+_90+"\" style=\"position: absolute; left: 1px; top: 1px; height: 1px; width: 1px; visibility: hidden\">",dojo.body());
window[_8f]=_91;
return _91;
},setSrc:function(_93,src,_94){
try{
if(!_94){
if(dojo.isWebKit){
_93.location=src;
}else{
frames[_93.name].location=src;
}
}else{
var _95;
if(dojo.isIE||dojo.isWebKit){
_95=_93.contentWindow.document;
}else{
_95=_93.contentWindow;
}
if(!_95){
_93.location=src;
return;
}else{
_95.location.replace(src);
}
}
}
catch(e){
}
},doc:function(_96){
var doc=_96.contentDocument||(((_96.name)&&(_96.document)&&(dojo.doc.getElementsByTagName("iframe")[_96.name].contentWindow)&&(dojo.doc.getElementsByTagName("iframe")[_96.name].contentWindow.document)))||((_96.name)&&(dojo.doc.frames[_96.name])&&(dojo.doc.frames[_96.name].document))||null;
return doc;
},send:function(_97){
if(!this["_frame"]){
this._frame=this.create(this._iframeName,dojo._scopeName+".io.iframe._iframeOnload();");
}
if(!this._frame.parentNode){
_97.form.ownerDocument.body.appendChild(this._frame);
}
var dfd=dojo._ioSetArgs(_97,function(dfd){
dfd.canceled=true;
dfd.ioArgs._callNext();
},function(dfd){
var _98=null;
try{
var _99=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var _9a=_99.handleAs;
_98=ifd;
if(_9a!="html"){
if(_9a=="xml"){
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
dojo.query("a",dii._frame.contentWindow.document.documentElement).orphan();
var _9b=(dii._frame.contentWindow.document).documentElement.innerText;
_9b=_9b.replace(/>\s+</g,"><");
_9b=dojo.trim(_9b);
var _9c={responseText:_9b};
_98=dojo._contentHandlers["xml"](_9c);
}
}else{
_98=ifd.getElementsByTagName("textarea")[0].value;
if(_9a=="json"){
_98=dojo.fromJson(_98);
}else{
if(_9a=="javascript"){
_98=dojo.eval(_98);
}
}
}
}
}
catch(e){
_98=e;
}
finally{
_99._callNext();
}
return _98;
},function(_9d,dfd){
dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return _9d;
});
dfd.ioArgs._callNext=function(){
if(!this["_calledNext"]){
this._calledNext=true;
dojo.io.iframe._currentDfd=null;
dojo.io.iframe._fireNextRequest();
}
};
this._dfdQueue.push(dfd);
this._fireNextRequest();
dojo._ioWatch(dfd,function(dfd){
return !dfd.ioArgs["_hasError"];
},function(dfd){
return (!!dfd.ioArgs["_finished"]);
},function(dfd){
if(dfd.ioArgs._finished){
dfd.callback(dfd);
}else{
dfd.errback(new Error("Invalid dojo.io.iframe request state"));
}
});
return dfd;
},_currentDfd:null,_dfdQueue:[],_iframeName:dojo._scopeName+"IoIframe",_fireNextRequest:function(){
try{
if((this._currentDfd)||(this._dfdQueue.length==0)){
return;
}
do{
var dfd=this._currentDfd=this._dfdQueue.shift();
}while(dfd&&dfd.canceled&&this._dfdQueue.length);
if(!dfd||dfd.canceled){
this._currentDfd=null;
return;
}
var _9e=dfd.ioArgs;
var _9f=_9e.args;
_9e._contentToClean=[];
var fn=dojo.byId(_9f["form"]);
var _a0=_9f["content"]||{};
if(fn){
if(_a0){
var _a1=function(_a2,_a3){
dojo.create("input",{type:"hidden",name:_a2,value:_a3},fn);
_9e._contentToClean.push(_a2);
};
for(var x in _a0){
var val=_a0[x];
if(dojo.isArray(val)&&val.length>1){
var i;
for(i=0;i<val.length;i++){
_a1(x,val[i]);
}
}else{
if(!fn[x]){
_a1(x,val);
}else{
fn[x].value=val;
}
}
}
}
var _a4=fn.getAttributeNode("action");
var _a5=fn.getAttributeNode("method");
var _a6=fn.getAttributeNode("target");
if(_9f["url"]){
_9e._originalAction=_a4?_a4.value:null;
if(_a4){
_a4.value=_9f.url;
}else{
fn.setAttribute("action",_9f.url);
}
}
if(!_a5||!_a5.value){
if(_a5){
_a5.value=(_9f["method"])?_9f["method"]:"post";
}else{
fn.setAttribute("method",(_9f["method"])?_9f["method"]:"post");
}
}
_9e._originalTarget=_a6?_a6.value:null;
if(_a6){
_a6.value=this._iframeName;
}else{
fn.setAttribute("target",this._iframeName);
}
fn.target=this._iframeName;
dojo._ioNotifyStart(dfd);
fn.submit();
}else{
var _a7=_9f.url+(_9f.url.indexOf("?")>-1?"&":"?")+_9e.query;
dojo._ioNotifyStart(dfd);
this.setSrc(this._frame,_a7,true);
}
}
catch(e){
dfd.errback(e);
}
},_iframeOnload:function(){
var dfd=this._currentDfd;
if(!dfd){
this._fireNextRequest();
return;
}
var _a8=dfd.ioArgs;
var _a9=_a8.args;
var _aa=dojo.byId(_a9.form);
if(_aa){
var _ab=_a8._contentToClean;
for(var i=0;i<_ab.length;i++){
var key=_ab[i];
for(var j=0;j<_aa.childNodes.length;j++){
var _ac=_aa.childNodes[j];
if(_ac.name==key){
dojo.destroy(_ac);
break;
}
}
}
if(_a8["_originalAction"]){
_aa.setAttribute("action",_a8._originalAction);
}
if(_a8["_originalTarget"]){
_aa.setAttribute("target",_a8._originalTarget);
_aa.target=_a8._originalTarget;
}
}
_a8._finished=true;
}};
}
if(!dojo._hasResource["dojox.embed.Flash"]){
dojo._hasResource["dojox.embed.Flash"]=true;
dojo.provide("dojox.embed.Flash");
(function(){
var _ad,_ae;
var _af=9;
var _b0="dojox-embed-flash-",_b1=0;
var _b2={expressInstall:false,width:320,height:240,swLiveConnect:"true",allowScriptAccess:"sameDomain",allowNetworking:"all",style:null,redirect:null};
function _b3(_b4){
_b4=dojo.delegate(_b2,_b4);
if(!("path" in _b4)){
console.error("dojox.embed.Flash(ctor):: no path reference to a Flash movie was provided.");
return null;
}
if(!("id" in _b4)){
_b4.id=(_b0+_b1++);
}
return _b4;
};
if(dojo.isIE){
_ad=function(_b5){
_b5=_b3(_b5);
if(!_b5){
return null;
}
var p;
var _b6=_b5.path;
if(_b5.vars){
var a=[];
for(p in _b5.vars){
a.push(p+"="+_b5.vars[p]);
}
_b5.params.FlashVars=a.join("&");
delete _b5.vars;
}
var s="<object id=\""+_b5.id+"\" "+"classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" "+"width=\""+_b5.width+"\" "+"height=\""+_b5.height+"\""+((_b5.style)?" style=\""+_b5.style+"\"":"")+">"+"<param name=\"movie\" value=\""+_b6+"\" />";
if(_b5.params){
for(p in _b5.params){
s+="<param name=\""+p+"\" value=\""+_b5.params[p]+"\" />";
}
}
s+="</object>";
return {id:_b5.id,markup:s};
};
_ae=(function(){
var _b7=10,_b8=null;
while(!_b8&&_b7>7){
try{
_b8=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_b7--);
}
catch(e){
}
}
if(_b8){
var v=_b8.GetVariable("$version").split(" ")[1].split(",");
return {major:(v[0]!=null)?parseInt(v[0]):0,minor:(v[1]!=null)?parseInt(v[1]):0,rev:(v[2]!=null)?parseInt(v[2]):0};
}
return {major:0,minor:0,rev:0};
})();
dojo.addOnUnload(function(){
var _b9=function(){
};
var _ba=dojo.query("object").reverse().style("display","none").forEach(function(i){
for(var p in i){
if((p!="FlashVars")&&dojo.isFunction(i[p])){
try{
i[p]=_b9;
}
catch(e){
}
}
}
});
});
}else{
_ad=function(_bb){
_bb=_b3(_bb);
if(!_bb){
return null;
}
var p;
var _bc=_bb.path;
if(_bb.vars){
var a=[];
for(p in _bb.vars){
a.push(p+"="+_bb.vars[p]);
}
_bb.params.flashVars=a.join("&");
delete _bb.vars;
}
var s="<embed type=\"application/x-shockwave-flash\" "+"src=\""+_bc+"\" "+"id=\""+_bb.id+"\" "+"width=\""+_bb.width+"\" "+"height=\""+_bb.height+"\""+((_bb.style)?" style=\""+_bb.style+"\" ":"")+"pluginspage=\""+window.location.protocol+"//www.adobe.com/go/getflashplayer\" ";
if(_bb.params){
for(p in _bb.params){
s+=" "+p+"=\""+_bb.params[p]+"\"";
}
}
s+=" />";
return {id:_bb.id,markup:s};
};
_ae=(function(){
var _bd=navigator.plugins["Shockwave Flash"];
if(_bd&&_bd.description){
var v=_bd.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split(".");
return {major:(v[0]!=null)?parseInt(v[0]):0,minor:(v[1]!=null)?parseInt(v[1]):0,rev:(v[2]!=null)?parseInt(v[2]):0};
}
return {major:0,minor:0,rev:0};
})();
}
dojox.embed.Flash=function(_be,_bf){
if(location.href.toLowerCase().indexOf("file://")>-1){
throw new Error("dojox.embed.Flash can't be run directly from a file. To instatiate the required SWF correctly it must be run from a server, like localHost.");
}
this.available=dojox.embed.Flash.available;
this.minimumVersion=_be.minimumVersion||_af;
this.id=null;
this.movie=null;
this.domNode=null;
if(_bf){
_bf=dojo.byId(_bf);
}
setTimeout(dojo.hitch(this,function(){
if(_be.expressInstall||this.available&&this.available>=this.minimumVersion){
if(_be&&_bf){
this.init(_be,_bf);
}else{
this.onError("embed.Flash was not provided with the proper arguments.");
}
}else{
if(!this.available){
this.onError("Flash is not installed.");
}else{
this.onError("Flash version detected: "+this.available+" is out of date. Minimum required: "+this.minimumVersion);
}
}
}),100);
};
dojo.extend(dojox.embed.Flash,{onReady:function(_c0){
console.warn("embed.Flash.movie.onReady:",_c0);
},onLoad:function(_c1){
console.warn("embed.Flash.movie.onLoad:",_c1);
},onError:function(msg){
},_onload:function(){
clearInterval(this._poller);
delete this._poller;
delete this._pollCount;
delete this._pollMax;
this.onLoad(this.movie);
},init:function(_c2,_c3){
this.destroy();
_c3=dojo.byId(_c3||this.domNode);
if(!_c3){
throw new Error("dojox.embed.Flash: no domNode reference has been passed.");
}
var p=0,_c4=false;
this._poller=null;
this._pollCount=0;
this._pollMax=15;
this.pollTime=100;
if(dojox.embed.Flash.initialized){
this.id=dojox.embed.Flash.place(_c2,_c3);
this.domNode=_c3;
setTimeout(dojo.hitch(this,function(){
this.movie=this.byId(this.id,_c2.doc);
this.onReady(this.movie);
this._poller=setInterval(dojo.hitch(this,function(){
try{
p=this.movie.PercentLoaded();
}
catch(e){
console.warn("this.movie.PercentLoaded() failed");
}
if(p==100){
this._onload();
}else{
if(p==0&&this._pollCount++>this._pollMax){
clearInterval(this._poller);
throw new Error("Building SWF failed.");
}
}
}),this.pollTime);
}),1);
}
},_destroy:function(){
try{
this.domNode.removeChild(this.movie);
}
catch(e){
}
this.id=this.movie=this.domNode=null;
},destroy:function(){
if(!this.movie){
return;
}
var _c5=dojo.delegate({id:true,movie:true,domNode:true,onReady:true,onLoad:true});
for(var p in this){
if(!_c5[p]){
delete this[p];
}
}
if(this._poller){
dojo.connect(this,"onLoad",this,"_destroy");
}else{
this._destroy();
}
},byId:function(_c6,doc){
doc=doc||document;
if(doc.embeds[_c6]){
return doc.embeds[_c6];
}
if(doc[_c6]){
return doc[_c6];
}
if(window[_c6]){
return window[_c6];
}
if(document[_c6]){
return document[_c6];
}
return null;
}});
dojo.mixin(dojox.embed.Flash,{minSupported:8,available:_ae.major,supported:(_ae.major>=_ae.required),minimumRequired:_ae.required,version:_ae,initialized:false,onInitialize:function(){
dojox.embed.Flash.initialized=true;
},__ie_markup__:function(_c7){
return _ad(_c7);
},proxy:function(obj,_c8){
dojo.forEach((dojo.isArray(_c8)?_c8:[_c8]),function(_c9){
this[_c9]=dojo.hitch(this,function(){
return (function(){
return eval(this.movie.CallFunction("<invoke name=\""+_c9+"\" returntype=\"javascript\">"+"<arguments>"+dojo.map(arguments,function(_ca){
return __flash__toXML(_ca);
}).join("")+"</arguments>"+"</invoke>"));
}).apply(this,arguments||[]);
});
},obj);
}});
dojox.embed.Flash.place=function(_cb,_cc){
var o=_ad(_cb);
_cc=dojo.byId(_cc);
if(!_cc){
_cc=dojo.doc.createElement("div");
_cc.id=o.id+"-container";
dojo.body().appendChild(_cc);
}
if(o){
_cc.innerHTML=o.markup;
return o.id;
}
return null;
};
dojox.embed.Flash.onInitialize();
})();
}
if(!dojo._hasResource["dojox.html.styles"]){
dojo._hasResource["dojox.html.styles"]=true;
dojo.provide("dojox.html.styles");
(function(){
var _cd={};
var _ce={};
var _cf=[];
var _d0=[];
dojox.html.insertCssRule=function(_d1,_d2,_d3){
var ss=dojox.html.getDynamicStyleSheet(_d3);
var _d4=_d1+" {"+_d2+"}";
if(dojo.isIE){
ss.cssText+=_d4;
}else{
if(ss.sheet){
ss.sheet.insertRule(_d4,ss._indicies.length);
}else{
ss.appendChild(dojo.doc.createTextNode(_d4));
}
}
ss._indicies.push(_d1+" "+_d2);
return _d1;
};
dojox.html.removeCssRule=function(_d5,_d6,_d7){
var ss;
var _d8=-1;
for(var nm in _cd){
if(_d7&&_d7!=nm){
continue;
}
ss=_cd[nm];
for(var i=0;i<ss._indicies.length;i++){
if(_d5+" "+_d6==ss._indicies[i]){
_d8=i;
break;
}
}
if(_d8>-1){
break;
}
}
if(!ss){
return false;
}
if(_d8==-1){
return false;
}
ss._indicies.splice(_d8,1);
if(dojo.isIE){
ss.removeRule(_d8);
}else{
if(ss.sheet){
ss.sheet.deleteRule(_d8);
}else{
if(document.styleSheets[0]){
}
}
}
return true;
};
dojox.html.getStyleSheet=function(_d9){
if(_cd[_d9||"default"]){
return _cd[_d9||"default"];
}
if(!_d9){
return false;
}
var _da=dojox.html.getStyleSheets();
if(_da[_d9]){
return dojox.html.getStyleSheets()[_d9];
}
for(var nm in _da){
if(_da[nm].href&&_da[nm].href.indexOf(_d9)>-1){
return _da[nm];
}
}
return false;
};
dojox.html.getDynamicStyleSheet=function(_db){
if(!_db){
_db="default";
}
if(!_cd[_db]){
if(dojo.doc.createStyleSheet){
_cd[_db]=dojo.doc.createStyleSheet();
if(dojo.isIE<9){
_cd[_db].title=_db;
}
}else{
_cd[_db]=dojo.doc.createElement("style");
_cd[_db].setAttribute("type","text/css");
dojo.doc.getElementsByTagName("head")[0].appendChild(_cd[_db]);
}
_cd[_db]._indicies=[];
}
return _cd[_db];
};
dojox.html.enableStyleSheet=function(_dc){
var ss=dojox.html.getStyleSheet(_dc);
if(ss){
if(ss.sheet){
ss.sheet.disabled=false;
}else{
ss.disabled=false;
}
}
};
dojox.html.disableStyleSheet=function(_dd){
var ss=dojox.html.getStyleSheet(_dd);
if(ss){
if(ss.sheet){
ss.sheet.disabled=true;
}else{
ss.disabled=true;
}
}
};
dojox.html.activeStyleSheet=function(_de){
var _df=dojox.html.getToggledStyleSheets();
if(arguments.length==1){
dojo.forEach(_df,function(s){
s.disabled=(s.title==_de)?false:true;
});
}else{
for(var i=0;i<_df.length;i++){
if(_df[i].disabled==false){
return _df[i];
}
}
}
return true;
};
dojox.html.getPreferredStyleSheet=function(){
};
dojox.html.getToggledStyleSheets=function(){
if(!_cf.length){
var _e0=dojox.html.getStyleSheets();
for(var nm in _e0){
if(_e0[nm].title){
_cf.push(_e0[nm]);
}
}
}
return _cf;
};
dojox.html.getStyleSheets=function(){
if(_ce.collected){
return _ce;
}
var _e1=dojo.doc.styleSheets;
dojo.forEach(_e1,function(n){
var s=(n.sheet)?n.sheet:n;
var _e2=s.title||s.href;
if(dojo.isIE){
if(s.cssText.indexOf("#default#VML")==-1){
if(s.href){
_ce[_e2]=s;
}else{
if(s.imports.length){
dojo.forEach(s.imports,function(si){
_ce[si.title||si.href]=si;
});
}else{
_ce[_e2]=s;
}
}
}
}else{
_ce[_e2]=s;
_ce[_e2].id=s.ownerNode.id;
dojo.forEach(s.cssRules,function(r){
if(r.href){
_ce[r.href]=r.styleSheet;
_ce[r.href].id=s.ownerNode.id;
}
});
}
});
_ce.collected=true;
return _ce;
};
})();
}
if(!dojo._hasResource["dojox.embed.flashVars"]){
dojo._hasResource["dojox.embed.flashVars"]=true;
dojo.provide("dojox.embed.flashVars");
dojo.mixin(dojox.embed.flashVars,{serialize:function(n,o){
var esc=function(val){
if(typeof val=="string"){
val=val.replace(/;/g,"_sc_");
val=val.replace(/\./g,"_pr_");
val=val.replace(/\:/g,"_cl_");
}
return val;
};
var df=dojox.embed.flashVars.serialize;
var txt="";
if(dojo.isArray(o)){
for(var i=0;i<o.length;i++){
txt+=df(n+"."+i,esc(o[i]))+";";
}
return txt.replace(/;{2,}/g,";");
}else{
if(dojo.isObject(o)){
for(var nm in o){
txt+=df(n+"."+nm,esc(o[nm]))+";";
}
return txt.replace(/;{2,}/g,";");
}
}
return n+":"+o;
}});
}
if(!dojo._hasResource["dijit._Contained"]){
dojo._hasResource["dijit._Contained"]=true;
dojo.provide("dijit._Contained");
dojo.declare("dijit._Contained",null,{getParent:function(){
var _e3=dijit.getEnclosingWidget(this.domNode.parentNode);
return _e3&&_e3.isContainer?_e3:null;
},_getSibling:function(_e4){
var _e5=this.domNode;
do{
_e5=_e5[_e4+"Sibling"];
}while(_e5&&_e5.nodeType!=1);
return _e5&&dijit.byNode(_e5);
},getPreviousSibling:function(){
return this._getSibling("previous");
},getNextSibling:function(){
return this._getSibling("next");
},getIndexInParent:function(){
var p=this.getParent();
if(!p||!p.getIndexOfChild){
return -1;
}
return p.getIndexOfChild(this);
}});
}
if(!dojo._hasResource["dojox.form.FileUploader"]){
dojo._hasResource["dojox.form.FileUploader"]=true;
dojo.provide("dojox.form.FileUploader");
console.warn("DEPRECATED: dojox.form.FileUploader is no longer supported and will be removed in 2.0. Suggested that you use dojox.form.Uploader instead.");
dojo.declare("dojox.form.FileUploader",[dijit._Widget,dijit._Templated,dijit._Contained],{swfPath:dojo.config.uploaderPath||dojo.moduleUrl("dojox.form","resources/fileuploader.swf"),templateString:"<div><div dojoAttachPoint=\"progNode\"><div dojoAttachPoint=\"progTextNode\"></div></div><div dojoAttachPoint=\"insideNode\" class=\"uploaderInsideNode\"></div></div>",uploadUrl:"",isDebug:false,devMode:false,baseClass:"dojoxUploaderNorm",hoverClass:"dojoxUploaderHover",activeClass:"dojoxUploaderActive",disabledClass:"dojoxUploaderDisabled",force:"",uploaderType:"",flashObject:null,flashMovie:null,insideNode:null,deferredUploading:1,fileListId:"",uploadOnChange:false,selectMultipleFiles:true,htmlFieldName:"uploadedfile",flashFieldName:"flashUploadFiles",fileMask:null,minFlashVersion:9,tabIndex:-1,showProgress:false,progressMessage:"Loading",progressBackgroundUrl:dojo.moduleUrl("dijit","themes/tundra/images/buttonActive.png"),progressBackgroundColor:"#ededed",progressWidgetId:"",skipServerCheck:false,serverTimeout:5000,log:function(){
if(this.isDebug){
console["log"](Array.prototype.slice.call(arguments).join(" "));
}
},constructor:function(){
this._subs=[];
},postMixInProperties:function(){
this.fileList=[];
this._cons=[];
this.fileMask=this.fileMask||[];
this.fileInputs=[];
this.fileCount=0;
this.flashReady=false;
this._disabled=false;
this.force=this.force.toLowerCase();
this.uploaderType=((dojox.embed.Flash.available>=this.minFlashVersion||this.force=="flash")&&this.force!="html")?"flash":"html";
this.deferredUploading=this.deferredUploading===true?1:this.deferredUploading;
this._refNode=this.srcNodeRef;
this.getButtonStyle();
},startup:function(){
},postCreate:function(){
this.inherited(arguments);
this.setButtonStyle();
var _e6;
if(this.uploaderType=="flash"){
_e6="createFlashUploader";
}else{
this.uploaderType="html";
_e6="createHtmlUploader";
}
this[_e6]();
if(this.fileListId){
this.connect(dojo.byId(this.fileListId),"click",function(evt){
var p=evt.target.parentNode.parentNode.parentNode;
if(p.id&&p.id.indexOf("file_")>-1){
this.removeFile(p.id.split("file_")[1]);
}
});
}
dojo.addOnUnload(this,this.destroy);
},getHiddenWidget:function(){
var _e7=this.domNode.parentNode;
while(_e7){
var id=_e7.getAttribute&&_e7.getAttribute("widgetId");
if(id&&dijit.byId(id).onShow){
return dijit.byId(id);
}
_e7=_e7.parentNode;
}
return null;
},getHiddenNode:function(_e8){
if(!_e8){
return null;
}
var _e9=null;
var p=_e8.parentNode;
while(p&&p.tagName.toLowerCase()!="body"){
var d=dojo.style(p,"display");
if(d=="none"){
_e9=p;
break;
}
p=p.parentNode;
}
return _e9;
},getButtonStyle:function(){
var _ea=this.srcNodeRef;
this._hiddenNode=this.getHiddenNode(_ea);
if(this._hiddenNode){
dojo.style(this._hiddenNode,"display","block");
}
if(!_ea&&this.button&&this.button.domNode){
var _eb=true;
var cls=this.button.domNode.className+" dijitButtonNode";
var txt=this.getText(dojo.query(".dijitButtonText",this.button.domNode)[0]);
var _ec="<button id=\""+this.button.id+"\" class=\""+cls+"\">"+txt+"</button>";
_ea=dojo.place(_ec,this.button.domNode,"after");
this.srcNodeRef=_ea;
this.button.destroy();
this.baseClass="dijitButton";
this.hoverClass="dijitButtonHover";
this.pressClass="dijitButtonActive";
this.disabledClass="dijitButtonDisabled";
}else{
if(!this.srcNodeRef&&this.button){
_ea=this.button;
}
}
if(dojo.attr(_ea,"class")){
this.baseClass+=" "+dojo.attr(_ea,"class");
}
dojo.attr(_ea,"class",this.baseClass);
this.norm=this.getStyle(_ea);
this.width=this.norm.w;
this.height=this.norm.h;
if(this.uploaderType=="flash"){
this.over=this.getTempNodeStyle(_ea,this.baseClass+" "+this.hoverClass,_eb);
this.down=this.getTempNodeStyle(_ea,this.baseClass+" "+this.activeClass,_eb);
this.dsbl=this.getTempNodeStyle(_ea,this.baseClass+" "+this.disabledClass,_eb);
this.fhtml={cn:this.getText(_ea),nr:this.norm,ov:this.over,dn:this.down,ds:this.dsbl};
}else{
this.fhtml={cn:this.getText(_ea),nr:this.norm};
if(this.norm.va=="middle"){
this.norm.lh=this.norm.h;
}
}
if(this.devMode){
this.log("classes - base:",this.baseClass," hover:",this.hoverClass,"active:",this.activeClass);
this.log("fhtml:",this.fhtml);
this.log("norm:",this.norm);
this.log("over:",this.over);
this.log("down:",this.down);
}
},setButtonStyle:function(){
dojo.style(this.domNode,{width:Math.max(0,this.fhtml.nr.w)+"px",height:Math.max(0,(this.fhtml.nr.h))+"px",padding:"0px",lineHeight:"normal",position:"relative"});
if(this.uploaderType=="html"&&this.norm.va=="middle"){
dojo.style(this.domNode,"lineHeight",Math.max(0,this.norm.lh)+"px");
}
if(this.showProgress){
this.progTextNode.innerHTML=this.progressMessage;
dojo.style(this.progTextNode,{width:Math.max(0,this.fhtml.nr.w)+"px",height:Math.max(0,(this.fhtml.nr.h+0))+"px",padding:"0px",margin:"0px",left:"0px",lineHeight:Math.max(0,(this.fhtml.nr.h+0))+"px",position:"absolute"});
dojo.style(this.progNode,{width:Math.max(0,this.fhtml.nr.w)+"px",height:Math.max(0,(this.fhtml.nr.h+0))+"px",padding:"0px",margin:"0px",left:"0px",position:"absolute",display:"none",backgroundImage:"url("+this.progressBackgroundUrl+")",backgroundPosition:"bottom",backgroundRepeat:"repeat-x",backgroundColor:this.progressBackgroundColor});
}else{
dojo.destroy(this.progNode);
}
dojo.style(this.insideNode,{position:"absolute",top:"0px",left:"0px",display:""});
dojo.addClass(this.domNode,this.srcNodeRef.className);
if(this.fhtml.nr.d.indexOf("inline")>-1){
dojo.addClass(this.domNode,"dijitInline");
}
try{
this.insideNode.innerHTML=this.fhtml.cn;
}
catch(e){
if(this.uploaderType=="flash"){
this.insideNode=this.insideNode.parentNode.removeChild(this.insideNode);
dojo.body().appendChild(this.insideNode);
this.insideNode.innerHTML=this.fhtml.cn;
var c=dojo.connect(this,"onReady",this,function(){
dojo.disconnect(c);
this.insideNode=this.insideNode.parentNode.removeChild(this.insideNode);
this.domNode.appendChild(this.insideNode);
});
}else{
this.insideNode.appendChild(document.createTextNode(this.fhtml.cn));
}
}
if(this._hiddenNode){
dojo.style(this._hiddenNode,"display","none");
}
},onChange:function(_ed){
},onProgress:function(_ee){
},onComplete:function(_ef){
},onCancel:function(){
},onError:function(_f0){
},onReady:function(_f1){
},onLoad:function(_f2){
},submit:function(_f3){
var _f4=_f3?dojo.formToObject(_f3):null;
this.upload(_f4);
return false;
},upload:function(_f5){
if(!this.fileList.length){
return false;
}
if(!this.uploadUrl){
console.warn("uploadUrl not provided. Aborting.");
return false;
}
if(!this.showProgress){
this.set("disabled",true);
}
if(this.progressWidgetId){
var _f6=dijit.byId(this.progressWidgetId).domNode;
if(dojo.style(_f6,"display")=="none"){
this.restoreProgDisplay="none";
dojo.style(_f6,"display","block");
}
if(dojo.style(_f6,"visibility")=="hidden"){
this.restoreProgDisplay="hidden";
dojo.style(_f6,"visibility","visible");
}
}
if(_f5&&!_f5.target){
this.postData=_f5;
}
this.log("upload type:",this.uploaderType," - postData:",this.postData);
for(var i=0;i<this.fileList.length;i++){
var f=this.fileList[i];
f.bytesLoaded=0;
f.bytesTotal=f.size||100000;
f.percent=0;
}
if(this.uploaderType=="flash"){
this.uploadFlash();
}else{
this.uploadHTML();
}
return false;
},removeFile:function(_f7,_f8){
var i;
for(i=0;i<this.fileList.length;i++){
if(this.fileList[i].name==_f7){
if(!_f8){
this.fileList.splice(i,1);
}
break;
}
}
if(this.uploaderType=="flash"){
this.flashMovie.removeFile(_f7);
}else{
if(!_f8){
dojo.destroy(this.fileInputs[i]);
this.fileInputs.splice(i,1);
this._renumberInputs();
}
}
if(this.fileListId){
dojo.destroy("file_"+_f7);
}
},destroy:function(){
if(this.uploaderType=="flash"&&!this.flashMovie){
this._cons.push(dojo.connect(this,"onLoad",this,"destroy"));
return;
}
dojo.forEach(this._subs,dojo.unsubscribe,dojo);
dojo.forEach(this._cons,dojo.disconnect,dojo);
if(this.scrollConnect){
dojo.disconnect(this.scrollConnect);
}
if(this.uploaderType=="flash"){
this.flashObject.destroy();
delete this.flashObject;
}else{
dojo.destroy(this._fileInput);
dojo.destroy(this._formNode);
}
this.inherited(arguments);
},_displayProgress:function(_f9){
if(_f9===true){
if(this.uploaderType=="flash"){
dojo.style(this.insideNode,"top","-2500px");
}else{
dojo.style(this.insideNode,"display","none");
}
dojo.style(this.progNode,"display","");
}else{
if(_f9===false){
dojo.style(this.insideNode,{display:"",left:"0px"});
dojo.style(this.progNode,"display","none");
}else{
var w=Math.max(0,_f9*this.fhtml.nr.w);
dojo.style(this.progNode,"width",w+"px");
}
}
},_animateProgress:function(){
this._displayProgress(true);
var _fa=false;
var c=dojo.connect(this,"_complete",function(){
dojo.disconnect(c);
_fa=true;
});
var w=0;
var _fb=setInterval(dojo.hitch(this,function(){
w+=5;
if(w>this.fhtml.nr.w){
w=0;
_fa=true;
}
this._displayProgress(w/this.fhtml.nr.w);
if(_fa){
clearInterval(_fb);
setTimeout(dojo.hitch(this,function(){
this._displayProgress(false);
}),500);
}
}),50);
},_error:function(evt){
if(typeof (evt)=="string"){
evt=new Error(evt);
}
this.onError(evt);
},_addToFileList:function(){
if(this.fileListId){
var str="";
dojo.forEach(this.fileList,function(d){
str+="<table id=\"file_"+d.name+"\" class=\"fileToUpload\"><tr><td class=\"fileToUploadClose\"></td><td class=\"fileToUploadName\">"+d.name+"</td><td class=\"fileToUploadSize\">"+(d.size?Math.ceil(d.size*0.001)+"kb":"")+"</td></tr></table>";
},this);
dojo.byId(this.fileListId).innerHTML=str;
}
},_change:function(_fc){
if(dojo.isIE){
dojo.forEach(_fc,function(f){
f.name=f.name.split("\\")[f.name.split("\\").length-1];
});
}
if(this.selectMultipleFiles){
this.fileList=this.fileList.concat(_fc);
}else{
if(this.fileList[0]){
this.removeFile(this.fileList[0].name,true);
}
this.fileList=_fc;
}
this._addToFileList();
this.onChange(_fc);
if(this.uploadOnChange){
if(this.uploaderType=="html"){
this._buildFileInput();
}
this.upload();
}else{
if(this.uploaderType=="html"&&this.selectMultipleFiles){
this._buildFileInput();
this._connectInput();
}
}
},_complete:function(_fd){
_fd=dojo.isArray(_fd)?_fd:[_fd];
dojo.forEach(_fd,function(f){
if(f.ERROR){
this._error(f.ERROR);
}
},this);
dojo.forEach(this.fileList,function(f){
f.bytesLoaded=1;
f.bytesTotal=1;
f.percent=100;
this._progress(f);
},this);
dojo.forEach(this.fileList,function(f){
this.removeFile(f.name,true);
},this);
this.onComplete(_fd);
this.fileList=[];
this._resetHTML();
this.set("disabled",false);
if(this.restoreProgDisplay){
setTimeout(dojo.hitch(this,function(){
dojo.style(dijit.byId(this.progressWidgetId).domNode,this.restoreProgDisplay=="none"?"display":"visibility",this.restoreProgDisplay);
}),500);
}
},_progress:function(_fe){
var _ff=0;
var _100=0;
for(var i=0;i<this.fileList.length;i++){
var f=this.fileList[i];
if(f.name==_fe.name){
f.bytesLoaded=_fe.bytesLoaded;
f.bytesTotal=_fe.bytesTotal;
f.percent=Math.ceil(f.bytesLoaded/f.bytesTotal*100);
this.log(f.name,"percent:",f.percent);
}
_100+=Math.ceil(0.001*f.bytesLoaded);
_ff+=Math.ceil(0.001*f.bytesTotal);
}
var _101=Math.ceil(_100/_ff*100);
if(this.progressWidgetId){
dijit.byId(this.progressWidgetId).update({progress:_101+"%"});
}
if(this.showProgress){
this._displayProgress(_101*0.01);
}
this.onProgress(this.fileList);
},_getDisabledAttr:function(){
return this._disabled;
},_setDisabledAttr:function(_102){
if(this._disabled==_102){
return;
}
if(this.uploaderType=="flash"){
if(!this.flashReady){
var _103=dojo.connect(this,"onLoad",this,function(){
dojo.disconnect(_103);
this._setDisabledAttr(_102);
});
return;
}
this._disabled=_102;
this.flashMovie.doDisable(_102);
}else{
this._disabled=_102;
dojo.style(this._fileInput,"display",this._disabled?"none":"");
}
dojo.toggleClass(this.domNode,this.disabledClass,_102);
},_onFlashBlur:function(){
this.flashMovie.blur();
if(!this.nextFocusObject&&this.tabIndex){
var _104=dojo.query("[tabIndex]");
for(var i=0;i<_104.length;i++){
if(_104[i].tabIndex>=Number(this.tabIndex)+1){
this.nextFocusObject=_104[i];
break;
}
}
}
this.nextFocusObject.focus();
},_disconnect:function(){
dojo.forEach(this._cons,dojo.disconnect,dojo);
},uploadHTML:function(){
if(this.selectMultipleFiles){
dojo.destroy(this._fileInput);
}
this._setHtmlPostData();
if(this.showProgress){
this._animateProgress();
}
var dfd=dojo.io.iframe.send({url:this.uploadUrl.toString(),form:this._formNode,handleAs:"json",error:dojo.hitch(this,function(err){
this._error("HTML Upload Error:"+err.message);
}),load:dojo.hitch(this,function(data,_105,_106){
this._complete(data);
})});
},createHtmlUploader:function(){
this._buildForm();
this._setFormStyle();
this._buildFileInput();
this._connectInput();
this._styleContent();
dojo.style(this.insideNode,"visibility","visible");
this.onReady();
},_connectInput:function(){
this._disconnect();
this._cons.push(dojo.connect(this._fileInput,"mouseover",this,function(evt){
dojo.addClass(this.domNode,this.hoverClass);
this.onMouseOver(evt);
}));
this._cons.push(dojo.connect(this._fileInput,"mouseout",this,function(evt){
setTimeout(dojo.hitch(this,function(){
dojo.removeClass(this.domNode,this.activeClass);
dojo.removeClass(this.domNode,this.hoverClass);
this.onMouseOut(evt);
this._checkHtmlCancel("off");
}),0);
}));
this._cons.push(dojo.connect(this._fileInput,"mousedown",this,function(evt){
dojo.addClass(this.domNode,this.activeClass);
dojo.removeClass(this.domNode,this.hoverClass);
this.onMouseDown(evt);
}));
this._cons.push(dojo.connect(this._fileInput,"mouseup",this,function(evt){
dojo.removeClass(this.domNode,this.activeClass);
this.onMouseUp(evt);
this.onClick(evt);
this._checkHtmlCancel("up");
}));
this._cons.push(dojo.connect(this._fileInput,"change",this,function(){
this._checkHtmlCancel("change");
this._change([{name:this._fileInput.value,type:"",size:0}]);
}));
if(this.tabIndex>=0){
dojo.attr(this.domNode,"tabIndex",this.tabIndex);
}
},_checkHtmlCancel:function(_107){
if(_107=="change"){
this.dialogIsOpen=false;
}
if(_107=="up"){
this.dialogIsOpen=true;
}
if(_107=="off"){
if(this.dialogIsOpen){
this.onCancel();
}
this.dialogIsOpen=false;
}
},_styleContent:function(){
var o=this.fhtml.nr;
dojo.style(this.insideNode,{width:Math.max(0,o.w)+"px",height:o.va=="middle"?Math.max(0,o.h)+"px":"auto",textAlign:o.ta,paddingTop:o.p[0]+"px",paddingRight:o.p[1]+"px",paddingBottom:o.p[2]+"px",paddingLeft:o.p[3]+"px"});
try{
dojo.style(this.insideNode,"lineHeight","inherit");
}
catch(e){
}
},_resetHTML:function(){
if(this.uploaderType=="html"&&this._formNode){
this.fileInputs=[];
dojo.query("*",this._formNode).forEach(function(n){
dojo.destroy(n);
});
this.fileCount=0;
this._buildFileInput();
this._connectInput();
}
},_buildForm:function(){
if(this._formNode){
return;
}
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
this._formNode=document.createElement("<form enctype=\"multipart/form-data\" method=\"post\">");
this._formNode.encoding="multipart/form-data";
this._formNode.id=dijit.getUniqueId("FileUploaderForm");
this.domNode.appendChild(this._formNode);
}else{
this._formNode=dojo.create("form",{enctype:"multipart/form-data",method:"post",id:dijit.getUniqueId("FileUploaderForm")},this.domNode);
}
},_buildFileInput:function(){
if(this._fileInput){
this._disconnect();
this._fileInput.id=this._fileInput.id+this.fileCount;
dojo.style(this._fileInput,"display","none");
}
this._fileInput=document.createElement("input");
this.fileInputs.push(this._fileInput);
var nm=this.htmlFieldName;
var _108=this.id;
if(this.selectMultipleFiles){
nm+=this.fileCount;
_108+=this.fileCount;
this.fileCount++;
}
dojo.attr(this._fileInput,{id:this.id,name:nm,type:"file"});
dojo.addClass(this._fileInput,"dijitFileInputReal");
this._formNode.appendChild(this._fileInput);
var real=dojo.marginBox(this._fileInput);
dojo.style(this._fileInput,{position:"relative",left:(this.fhtml.nr.w-real.w)+"px",opacity:0});
},_renumberInputs:function(){
if(!this.selectMultipleFiles){
return;
}
var nm;
this.fileCount=0;
dojo.forEach(this.fileInputs,function(inp){
nm=this.htmlFieldName+this.fileCount;
this.fileCount++;
dojo.attr(inp,"name",nm);
},this);
},_setFormStyle:function(){
var size=Math.max(2,Math.max(Math.ceil(this.fhtml.nr.w/60),Math.ceil(this.fhtml.nr.h/15)));
dojox.html.insertCssRule("#"+this._formNode.id+" input","font-size:"+size+"em");
dojo.style(this.domNode,{overflow:"hidden",position:"relative"});
dojo.style(this.insideNode,"position","absolute");
},_setHtmlPostData:function(){
if(this.postData){
for(var nm in this.postData){
dojo.create("input",{type:"hidden",name:nm,value:this.postData[nm]},this._formNode);
}
}
},uploadFlash:function(){
try{
if(this.showProgress){
this._displayProgress(true);
var c=dojo.connect(this,"_complete",this,function(){
dojo.disconnect(c);
this._displayProgress(false);
});
}
var o={};
for(var nm in this.postData){
o[nm]=this.postData[nm];
}
this.flashMovie.doUpload(o);
}
catch(err){
this._error("FileUploader - Sorry, the SWF failed to initialize."+err);
}
},createFlashUploader:function(){
this.uploadUrl=this.uploadUrl.toString();
if(this.uploadUrl){
if(this.uploadUrl.toLowerCase().indexOf("http")<0&&this.uploadUrl.indexOf("/")!=0){
var loc=window.location.href.split("/");
loc.pop();
loc=loc.join("/")+"/";
this.uploadUrl=loc+this.uploadUrl;
this.log("SWF Fixed - Relative loc:",loc," abs loc:",this.uploadUrl);
}else{
this.log("SWF URL unmodified:",this.uploadUrl);
}
}else{
console.warn("Warning: no uploadUrl provided.");
}
var w=this.fhtml.nr.w;
var h=this.fhtml.nr.h;
var args={expressInstall:true,path:this.swfPath.uri||this.swfPath,width:w,height:h,allowScriptAccess:"always",allowNetworking:"all",vars:{uploadDataFieldName:this.flashFieldName,uploadUrl:this.uploadUrl,uploadOnSelect:this.uploadOnChange,deferredUploading:this.deferredUploading||0,selectMultipleFiles:this.selectMultipleFiles,id:this.id,isDebug:this.isDebug,devMode:this.devMode,flashButton:dojox.embed.flashVars.serialize("fh",this.fhtml),fileMask:dojox.embed.flashVars.serialize("fm",this.fileMask),noReturnCheck:this.skipServerCheck,serverTimeout:this.serverTimeout},params:{scale:"noscale",wmode:"opaque",allowScriptAccess:"always",allowNetworking:"all"}};
this.flashObject=new dojox.embed.Flash(args,this.insideNode);
this.flashObject.onError=dojo.hitch(function(msg){
this._error("Flash Error: "+msg);
});
this.flashObject.onReady=dojo.hitch(this,function(){
dojo.style(this.insideNode,"visibility","visible");
this.log("FileUploader flash object ready");
this.onReady(this);
});
this.flashObject.onLoad=dojo.hitch(this,function(mov){
this.flashMovie=mov;
this.flashReady=true;
this.onLoad(this);
});
this._connectFlash();
},_connectFlash:function(){
this._doSub("/filesSelected","_change");
this._doSub("/filesUploaded","_complete");
this._doSub("/filesProgress","_progress");
this._doSub("/filesError","_error");
this._doSub("/filesCanceled","onCancel");
this._doSub("/stageBlur","_onFlashBlur");
this._doSub("/up","onMouseUp");
this._doSub("/down","onMouseDown");
this._doSub("/over","onMouseOver");
this._doSub("/out","onMouseOut");
this.connect(this.domNode,"focus",function(){
this.flashMovie.focus();
this.flashMovie.doFocus();
});
if(this.tabIndex>=0){
dojo.attr(this.domNode,"tabIndex",this.tabIndex);
}
},_doSub:function(_109,_10a){
this._subs.push(dojo.subscribe(this.id+_109,this,_10a));
},urlencode:function(url){
if(!url||url=="none"){
return false;
}
return url.replace(/:/g,"||").replace(/\./g,"^^").replace("url(","").replace(")","").replace(/'/g,"").replace(/"/g,"");
},isButton:function(node){
var tn=node.tagName.toLowerCase();
return tn=="button"||tn=="input";
},getTextStyle:function(node){
var o={};
o.ff=dojo.style(node,"fontFamily");
if(o.ff){
o.ff=o.ff.replace(", ",",");
o.ff=o.ff.replace(/\"|\'/g,"");
o.ff=o.ff=="sans-serif"?"Arial":o.ff;
o.fw=dojo.style(node,"fontWeight");
o.fi=dojo.style(node,"fontStyle");
o.fs=parseInt(dojo.style(node,"fontSize"),10);
if(dojo.style(node,"fontSize").indexOf("%")>-1){
var n=node;
while(n.tagName){
if(dojo.style(n,"fontSize").indexOf("%")==-1){
o.fs=parseInt(dojo.style(n,"fontSize"),10);
break;
}
if(n.tagName.toLowerCase()=="body"){
o.fs=16*0.01*parseInt(dojo.style(n,"fontSize"),10);
}
n=n.parentNode;
}
}
o.fc=new dojo.Color(dojo.style(node,"color")).toHex();
o.fc=parseInt(o.fc.substring(1,Infinity),16);
}
o.lh=dojo.style(node,"lineHeight");
o.ta=dojo.style(node,"textAlign");
o.ta=o.ta=="start"||!o.ta?"left":o.ta;
o.va=this.isButton(node)?"middle":o.lh==o.h?"middle":dojo.style(node,"verticalAlign");
return o;
},getText:function(node){
var cn=dojo.trim(node.innerHTML);
if(cn.indexOf("<")>-1){
cn=escape(cn);
}
return cn;
},getStyle:function(node){
var o={};
var dim=dojo.contentBox(node);
var pad=dojo._getPadExtents(node);
o.p=[pad.t,pad.w-pad.l,pad.h-pad.t,pad.l];
o.w=dim.w+pad.w;
o.h=dim.h+pad.h;
o.d=dojo.style(node,"display");
var clr=new dojo.Color(dojo.style(node,"backgroundColor"));
o.bc=clr.a==0?"#ffffff":clr.toHex();
o.bc=parseInt(o.bc.substring(1,Infinity),16);
var url=this.urlencode(dojo.style(node,"backgroundImage"));
if(url){
o.bi={url:url,rp:dojo.style(node,"backgroundRepeat"),pos:escape(dojo.style(node,"backgroundPosition"))};
if(!o.bi.pos){
var rx=dojo.style(node,"backgroundPositionX");
var ry=dojo.style(node,"backgroundPositionY");
rx=(rx=="left")?"0%":(rx=="right")?"100%":rx;
ry=(ry=="top")?"0%":(ry=="bottom")?"100%":ry;
o.bi.pos=escape(rx+" "+ry);
}
}
return dojo.mixin(o,this.getTextStyle(node));
},getTempNodeStyle:function(node,_10b,_10c){
var temp,_10d;
if(_10c){
temp=dojo.place("<"+node.tagName+"><span>"+node.innerHTML+"</span></"+node.tagName+">",node.parentNode);
var _10e=temp.firstChild;
dojo.addClass(_10e,node.className);
dojo.addClass(temp,_10b);
_10d=this.getStyle(_10e);
}else{
temp=dojo.place("<"+node.tagName+">"+node.innerHTML+"</"+node.tagName+">",node.parentNode);
dojo.addClass(temp,node.className);
dojo.addClass(temp,_10b);
temp.id=node.id;
_10d=this.getStyle(temp);
}
dojo.destroy(temp);
return _10d;
}});
}
if(!dojo._hasResource["wm.base.widget.DojoFileUpload"]){
dojo._hasResource["wm.base.widget.DojoFileUpload"]=true;
dojo.provide("wm.base.widget.DojoFileUpload");
dojo.declare("wm.DojoFileUpload",wm.Container,{_uploaderType:"html",_tmpcounter:0,useList:true,autoDeleteDelay:4,classNames:"wmdojofileupload",buttonCaption:"Upload...",buttonWidth:"80",buttonHeight:"32",variable:"",_variable:"",_uploadedVariable:"",_serviceVariable:"",verticalAlign:"top",horizontalAlign:"top",width:"300px",height:"80px",scrim:true,lock:true,layoutKind:"left-to-right",service:"FileUploadDownload",operation:"uploadFile",_state:"",destroy:function(){
if(this.dijit){
this.dijit.destroy();
dijit.registry.remove(this.button.getRuntimeId());
}
if(this.button){
this.button.destroy();
}
if(this.buttonPanel){
this.buttonPanel.destroy();
}
if(this.html){
this.html.destroy();
}
if(this.$&&this.$.input){
delete this.$.input;
}
this.inherited(arguments);
},afterPaletteDrop:function(){
this.inherited(arguments);
try{
var _10f=false;
var _110=studio.application.getServerComponents();
for(var i=0;i<_110.length;i++){
if(_110[i].name==this.service){
_10f=true;
}
}
if(!_10f){
var _111=new wm.JavaService({owner:studio.application,initialNoEdit:true,javaTemplate:this.service+".java"});
var _112=studio.studioService.requestSync("getJavaServiceTemplate",[_111.javaTemplate]).results[0];
_111.connect(_111,"_onClassFirstSave",this,function(){
this._serviceVariable.setService("");
this._serviceVariable.setService(this.service);
studio.inspector.reinspect();
});
_111.newJavaServiceWithFunc(this.service,this.service,_112);
}
}
catch(e){
console.error("DojoFileUpload.js failed to create javaservice:"+e);
}
},init:function(){
this.inherited(arguments);
if(!wm.typeManager.isType("wm.DojoFileUpload.FileData")){
wm.typeManager.addType("wm.DojoFileUpload.FileData",{internal:true,fields:{"name":{type:"String",isObject:false,isList:false},"percent":{type:"Number",isObject:false,isList:false},"uploaded":{type:"boolean",isObject:false,isList:false},"tmpid":{type:"Number",isObject:false,isList:false},"path":{type:"String",isObject:false,isList:false},"error":{type:"String",isObject:false,isList:false},"width":{type:"String",isObject:false,isList:false},"height":{type:"String",isObject:false,isList:false},"included":{type:"Boolean",isObject:false,isList:false}}});
}
this._serviceVariable=new wm.ServiceVariable({owner:this,operation:this.operation,service:this.service});
this.connect(this._serviceVariable,"onSuccess",this,"onSuccess");
this.connect(this._serviceVariable,"onError",this,"onError");
this.variable=new wm.Variable({name:"variable",owner:this,type:"wm.DojoFileUpload.FileData",isList:true});
this.variable.isList=true;
this.variable.setData([]);
this._variable=new wm.Variable({name:"_variable",owner:this,type:"wm.DojoFileUpload.FileData",isList:true});
this._variable.isList=true;
this._variable.setData([]);
this._uploadedVariable=new wm.Variable({name:"_uploadedVariable",owner:this,type:"wm.DojoFileUpload.FileData",isList:true});
this._uploadedVariable.setData([]);
if(this._uploaderType=="flash"&&this.isDesignLoaded()){
try{
var _113=this._serviceVariable._service._service.smd.methods;
var _114=wm.Array.indexOf(_113,"uploadFile",function(a,b){
return a.name==b;
});
var _115=_113[_114].parameters;
var _116=["ignored","Filename","flashUploadFiles"];
for(var i=0;i<_115.length;i++){
if(dojo.indexOf(_116,_115[i].name)!=-1){
_115[i].hidden=true;
}
}
for(var i=0;i<_116.length;i++){
if(this._serviceVariable._operationInfo.parameters[_116[i]]){
this._serviceVariable._operationInfo.parameters[_116[i]].hidden=true;
}
}
}
catch(e){
}
}
},postInit:function(){
this.inherited(arguments);
if(this.$.input){
this._serviceVariable.$.input=this._serviceVariable.input=this.$.input;
this._serviceVariable.operationChanged();
}else{
this.$.input=this._serviceVariable.$.input;
}
this.input=this.$.input;
this.html=new wm.Html({parent:this,owner:this,name:"html",width:"100%",height:"100%",border:"1",padding:"2",html:wm.getDictionaryItem("wm.DojoFileUpload.MESSAGE_NO_FILES"),showing:this.useList});
this.progressBar=new wm.dijit.ProgressBar({parent:this,owner:this,name:"progressBar",showing:false,width:"100%",height:"100%"});
this.buttonPanel=new wm.Panel({layoutKind:"left-to-right",width:(this.useList)?this.buttonWidth+"px":"100%",height:(this.useList)?this.buttonHeight+"px":"100%",name:"buttonPanel",owner:this,parent:this,horizontalAlign:"left",verticalAlign:"top"});
this.createButton();
if(this._uploaderType=="flash"){
if(!this.button.isAncestorHidden()){
this.createDijit();
}
this.connectToAllLayers(this,dojo.hitch(this,function(){
if(!this.dijit){
this.createDijit();
}
}));
}else{
this.createDijit();
}
},createButton:function(){
if(this.button){
this.button.destroy();
}
this.button=new wm.Button({disabled:this.disabled,caption:this._uploaderType=="flash"?".":this.buttonCaption,parent:this.buttonPanel,owner:this,name:"button",width:"100%",height:"100%",margin:this.useList?"2,4,4,2":"0",padding:"0"});
this.button.connect(this.button,"renderBounds",this,function(){
if(!this.button.isAncestorHidden()&&!this._inCreateDijit&&this.dijit){
var b=this.button.getContentBounds();
this.button.btnNode.style.lineHeight=b.h+"px";
this.button.btnNode.style.height=b.h+"px";
this.button.btnNode.style.width=b.w+"px";
}
});
},renderDojoObj:function(){
this.createDijit();
},createDijit:function(){
wm.job(this.getRuntimeId()+": Create Dijit",100,dojo.hitch(this,"createDijit2"));
},createDijit2:function(){
wm.job(this.getRuntimeId()+": Create Dijit",10,function(){
});
this._inCreateDijit=true;
if(this.dijit){
try{
this.dijit.destroy();
}
catch(e){
console.error(e);
}
finally{
dijit.registry.remove(this.button.domNode.id);
}
this.createButton();
this.buttonPanel.reflow();
delete this.dijit;
this._inCreateDijit=false;
return this.createDijit();
}
this._lastButtonBounds=dojo.clone(this.button.bounds);
var path=this.getPath();
this.dijit=new dojox.form.FileUploader({isDebug:true,uploadUrl:path,uploadOnChange:false,force:this._uploaderType,"class":"wmtoolbutton",fileMask:[this.fileMaskLabel,this.fileMaskList],fileList:this.html,htmlFieldName:"file",flashFieldName:"file",selectMultipleFiles:this.multipleFiles,showProgress:!this.useList,progressWidgetId:this.useList?this.progressBar.dijit.domNode.id:undefined},this.button.domNode);
if(this._uploaderType=="html"){
this.dijit.insideNode.className+=" "+this.button.btnNode.className;
dojo.destroy(this.button.domNode);
this.button.btnNode=this.dijit.insideNode;
this.button.domNode=this.button.btnNode.parentNode;
this.button.dom.node=this.button.domNode;
this.button.invalidCss=true;
this.button.render(true);
this.dijit._fileInput.style.position="absolute";
this.dijit._fileInput.style.left="0";
}
this.connect(this.dijit,"onChange",this,"change");
this.connect(this.dijit,"onComplete",this,"success");
this.connect(this.dijit,"onError",this,"onError");
this.connect(this.dijit,"onProgress",this,"progress");
if(this._uploaderType=="html"){
this.adjustButtonHeight();
}
this._inCreateDijit=false;
},getPath:function(){
var l=window.location;
var path=l.protocol+"//"+l.host+l.pathname.replace(/[^\/]*$/,"");
path+="services/"+this.service+".upload?method="+this.operation;
return path;
},upload:function(){
var data=this.variable.getData();
for(var i=0;i<data.length;i++){
var d=data[i];
if(!d.included){
this.dijit.removeFile(d.name);
}
}
var _117=this.input.getData();
if(this.input.type=="AnyData"){
_117=_117.dataValue;
}
this.dijit.upload(_117);
},activate:function(){
if(!this.isDesignLoaded()){
this.upload();
}
},reset:function(){
this.variable.setData([]);
this._variable.setData([]);
this._uploadedVariable.setData([]);
if(this.html){
this.html.setHtml(wm.getDictionaryItem("wm.DojoFileUpload.MESSAGE_NO_FILES"));
}
},removeFile:function(_118){
_118=dojo.isObject(_118)?_118.tmpid:_118;
var data=this.variable.getData();
var _119=wm.Array.indexOf(data,_118,function(a,b){
return (a.tmpid==b);
});
this.variable.removeItem(_119);
if(!d.uploaded){
this.dijit.removeFile(data[_119].name);
this.onChange();
}
},onChange:function(){
},getDataValue:function(_11a){
if(_11a){
return this.variable.getData();
}
var data=this.variable.getData();
for(var i=data.length-1;i>=0;i--){
if(data[i].error){
wm.Array.removeElementAt(data,i);
}
}
return data;
},getAllFilePaths:function(){
var _11b=[];
var data=this._variable.getData().concat(this.variable.getData());
for(var i=0;i<data.length;i++){
_11b.push(data[i].path);
}
return _11b;
},deleteAllFiles:function(){
var _11c=this.getAllFilePaths();
var _11d=this._serviceVariable.operation;
this._serviceVariable.setOperation("deleteFiles");
this._serviceVariable.input.setValue("files",_11c);
this._serviceVariable.update();
this._variable.setData([]);
this.updateHtml();
this._serviceVariable.setOperation(_11d);
},getRemovedFilePaths:function(){
var _11e=[];
var data=this._variable.getData();
for(var i=0;i<data.length;i++){
_11e.push(data[i].path);
}
return _11e;
},deleteRemovedFiles:function(){
var _11f=this.getRemovedFilePaths();
var _120=this._serviceVariable.operation;
this._serviceVariable.setOperation("deleteFiles");
this._serviceVariable.input.setValue("files",_11f);
this._serviceVariable.update();
this._variable.setData([]);
this.updateHtml();
this._serviceVariable.setOperation(_120);
},deleteFileItem:function(item){
if(item instanceof wm.Variable){
item=item.getData();
}
var data=this._variable.getData();
var _121=wm.Array.indexOf(data,item,function(a,b){
return (a.tmpid==b);
});
if(_121!=-1){
this._variable.removeItem(_121);
}
var _122=this._serviceVariable.operation;
this._serviceVariable.setOperation("deleteFiles");
this._serviceVariable.input.setValue("files",[item.path]);
this._serviceVariable.update();
this._serviceVariable.setOperation(_122);
var node=dojo.byId(this.getId()+"_checkbox"+item.tmpid).parentNode;
if(!dojo.isIE||dojo.isIE>=8){
dojo.anim(node,{height:0},350,null,function(){
dojo.destroy(node);
});
}else{
dojo.destroy(node);
}
},success:function(_123){
if(!_123){
return this.onSuccess(this.variable.getData());
}
if(_123&&_123.length==1&&_123[0].result&&_123[0].result.error){
return this.onError(_123[0].result.error);
}
try{
if(dojo.query("input",this.html.domNode).length==0){
this.html.setHtml("");
}
this.updateVariable(_123);
var data=this._uploadedVariable.getData();
var _124=this.variable.getData();
var _125=_124.concat(data);
this.variable.setData(_125);
this._uploadedVariable.setData(_125);
this.progressBar.hide();
if(this.useList){
if(_123.length==1&&this._uploaderType=="html"&&(!dojo.isIE||dojo.isIE>=8)){
var html=this.getHtmlForItem(this.variable.getItem(0).getData()).replace("div","div style='height:0''");
var _126=dojo.place(html,this.html.domNode,"first");
dojo.connect(dojo.query("input",_126)[0],"onchange",this,"checkboxchange");
dojo.animateProperty({node:_126,properties:{height:16},duration:450}).play(5);
}else{
this.updateHtml();
}
this.html.show();
}
if(_123[0].error){
this.onError(_123[0].error);
}else{
this._state="uploaded";
if(this._uploaderType=="html"){
this.onSuccess(this.variable.getData());
}else{
this.onSuccess(_123);
}
}
}
catch(e){
console.error(e);
}
},updateVariable:function(_127){
var _128=_127||this.dijit.fileList;
var _129=this.variable.getData();
var data=[];
for(var i=0;i<_128.length;i++){
var f=_128[i];
if(this._uploaderType=="html"&&!f.name){
data.push(dojo.mixin(_129[i],f.result));
}else{
data.push({path:f.file,tmpid:this._tmpcounter++,name:String(f.name).replace(/^C\:\\fakepath\\/,""),error:f.error,width:f.width,height:f.height,percent:f.uploadTime!==undefined?100:f.percent!==undefined?f.percent:0,included:true,uploaded:!f.error&&(f.uploadTime!==undefined||this._uploaderType=="html"&&f.percent==100)});
}
}
this.variable.setData(data);
},change:function(_12a){
this.updateVariable();
this.onChange();
wm.job(this.getRuntimeId()+": upload()",100,dojo.hitch(this,"upload"));
},getHtmlForItem:function(d){
var _12b=(this._uploaderType=="html"||this.uploadImmediately||this._state=="filestoupload")?"<input type='checkbox' id='"+this.getId()+"_checkbox"+d.tmpid+"' "+((d.included)?"checked='checked'":"")+"/> ":"";
return "<div class='wmfileuploaderListItem'>"+_12b+((d.error)?"<span style='color: red' class='FileUploaderError'>"+d.name+"</span>":d.name)+"</div>";
},updateHtml:function(){
var html="";
var data=this.variable.getData();
dojo.forEach(data,dojo.hitch(this,function(d,i){
html+=this.getHtmlForItem(d);
}));
this.html.setHtml(html);
dojo.query("input",this.html.domNode).connect("onchange",this,"checkboxchange");
},checkboxchange:function(_12c){
var node=_12c.target;
var i=node.id.match(/\d+$/)[0];
if(!_12c.target.checked){
var data=this.variable.getData();
var _12d=wm.Array.indexOf(data,i,function(a,b){
return (a.tmpid==b);
});
var item=this.variable.getItem(_12d);
if(_12d!=-1){
if(this._state=="filestoupload"){
this.variable.getItem(_12d).setValue("included",node.checked);
}else{
this.variable.removeItem(_12d);
this._variable.addItem(item);
var _12e=item.getData();
if(this.autoDeleteDelay&&String(this.autoDeleteDelay).match(/^\d+$/)){
wm.job(this.getRuntimeId()+":removeUncheckedFile:"+_12e.tmpid,this.autoDeleteDelay*1000,dojo.hitch(this,function(){
this.deleteFileItem(item);
}));
}else{
this.deleteFileItem(item);
}
}
}
}else{
var data=this._variable.getData();
var _12d=wm.Array.indexOf(data,i,function(a,b){
return (a.tmpid==b);
});
var item=this._variable.getItem(_12d).getData();
wm.job(this.getRuntimeId()+":removeUncheckedFile:"+item.tmpid,0,function(){
});
var data=this._variable.getData();
var _12d=wm.Array.indexOf(data,i,function(a,b){
return (a.tmpid==b);
});
if(_12d!=-1){
var item=this._variable.getItem(_12d);
this._variable.removeItem(_12d);
this.variable.addItem(item);
}
}
},onSuccess:function(_12f){
},onError:function(_130){
app.toastError(wm.getDictionaryItem("wm.DojoFileUpload.TOAST_ONERROR",{error:_130}));
this.progressBar.hide();
if(this.useList){
this.updateHtml();
this.html.show();
}
},progress:function(_131){
this._state="uploading";
if(this.useList){
this.progressBar.show();
}
this.html.hide();
var data=[];
var _132=0;
this.updateVariable();
for(var i=0;i<_131.length;i++){
if(_131[i].percent==100){
_132++;
}
}
this.onProgress(data,_132,_131.length);
},onProgress:function(_133,_134,_135){
},makePropEdit:function(_136,_137,_138){
if(!this._serviceVariable){
this._serviceVariable=new wm.ServiceVariable({owner:this,operation:this.operation,service:this.service});
}else{
if(this._serviceVariable.service!=this.service){
this._serviceVariable.setService(this.service);
}
if(this._serviceVariable.operation!=this.operation){
this._serviceVariable.setOperation(this.operation);
}
}
switch(_136){
case "operation":
return this._serviceVariable.makePropEdit(_136,_137,_138);
case "service":
return this._serviceVariable.makePropEdit(_136,_137,_138);
}
return this.inherited(arguments);
},getOrderedWidgets:function(){
return [];
},setButtonWidth:function(_139){
this.buttonWidth=parseInt(_139);
this.buttonPanel.setWidth(_139+"px");
this.adjustButtonWidth();
},adjustButtonWidth:function(_13a){
this.button.btnNode.parentNode.style.width=this.button.getContentBounds().w+"px";
this.button.btnNode.style.width=this.button.getContentBounds().w+"px";
},setButtonHeight:function(_13b){
this.buttonHeight=parseInt(_13b);
this.buttonPanel.setHeight(_13b+"px");
this.adjustButtonHeight();
},adjustButtonHeight:function(){
var _13c=this.button.getContentBounds().h+"px";
this.button.btnNode.parentNode.style.height=_13c;
this.button.btnNode.style.height=_13c;
this.button.btnNode.style.lineHeight=_13c;
this.button.render(false,true);
},setButtonCaption:function(_13d){
this.buttonCaption=_13d;
this.button.setCaption(_13d);
},setUseList:function(_13e){
this.useList=_13e;
this.html.setShowing(_13e);
if(!_13e){
this.buttonPanel.setWidth("100%");
this.buttonPanel.setHeight("100%");
this.adjustButtonHeight();
this.adjustButtonWidth();
}else{
this.buttonPanel.setWidth(this.buttonWidth);
this.buttonPanel.setHeight(this.buttonHeight);
this.adjustButtonHeight();
this.adjustButtonWidth();
}
},setDisabled:function(_13f){
this.disabled=_13f;
if(this.button){
try{
this.button.setDisabled(_13f||this._parentDisabled);
}
catch(e){
}
}
},_end:0});
wm.Object.extendSchema(wm.DojoFileUpload,{_variable:{ignore:1},_uploadedVariable:{ignore:1},useList:{group:"display",order:1,type:"boolean"},buttonCaption:{group:"display",order:2,type:"string"},service:{group:"Services",order:38},operation:{group:"Services",order:39},autoDeleteDelay:{group:"Services",order:40,type:"number"},buttonWidth:{group:"layout",order:50},buttonHeight:{group:"layout",order:51},input:{group:"data",order:3,putWiresInSubcomponent:"input",bindTarget:1,editor:"wm.prop.FieldGroupEditor"},variable:{bindSource:true,ignore:true},horizontalAlign:{ignore:true},verticalAlign:{ignore:true},autoScroll:{ignore:true},scrollX:{ignore:true},scrollY:{ignore:true},imageList:{ignore:true},lock:{ignore:true},freeze:{ignore:true},customGetValidate:{ignore:true},autoSizeWidth:{ignore:true},autoSizeHeight:{ignore:true}});
}
if(!dojo._hasResource["wm.base.widget.DojoFlashFileUpload"]){
dojo._hasResource["wm.base.widget.DojoFlashFileUpload"]=true;
dojo.provide("wm.base.widget.DojoFlashFileUpload");
dojo.declare("wm.DojoFlashFileUpload",wm.DojoFileUpload,{uploadImmediately:true,_uploaderType:"flash",fileMaskLabel:"All Images",fileMaskList:"*.png;*.jpg;*.jpeg;*.gif",service:"FlashUploadDownload",operation:"uploadFile",init:function(){
this.inherited(arguments);
if(this.isDesignLoaded()){
try{
var _140=this._serviceVariable._service._service.smd.methods;
var _141=wm.Array.indexOf(_140,"uploadFile",function(a,b){
return a.name==b;
});
var _142=_140[_141].parameters;
var _143=["ignored","Filename","file"];
for(var i=0;i<_142.length;i++){
if(dojo.indexOf(_143,_142[i].name)!=-1){
_142[i].hidden=true;
}
}
for(var i=0;i<_143.length;i++){
if(this._serviceVariable._operationInfo.parameters[_143[i]]){
this._serviceVariable._operationInfo.parameters[_143[i]].hidden=true;
}
}
}
catch(e){
}
}
},postInit:function(){
this.inherited(arguments);
if(!this.button.isAncestorHidden()){
this.createDijit();
}
},setUploadImmediately:function(_144){
this.uploadImmediately=_144;
if(this._isDesignLoaded){
if(this.uploadImmediately){
this.setButtonCaption(studio.getDictionaryItem("wm.DojoFlashFileUpload.CAPTION_UPLOAD"));
}else{
this.setButtonCaption(studio.getDictionaryItem("wm.DojoFlashFileUpload.CAPTION_SELECT"));
}
}
},createButton:function(){
this.inherited(arguments);
this.button.connect(this.button,"renderBounds",this,function(){
if(!this.dijit){
this._buttonBounds=dojo.clone(this.button.bounds);
}else{
if(!this.button.isAncestorHidden()&&!this._inCreateDijit&&this.dijit&&(this._buttonBounds.l!=this.button.bounds.l||this._buttonBounds.t!=this.button.bounds.t||this._buttonBounds.w!=this.button.bounds.w||this._buttonBounds.h!=this.button.bounds.h)){
this.createDijit();
}
}
});
},flashLoaded:function(){
this._flashWidget=dojo.query("embed",this.domNode)[0];
this.adjustButtonHeight();
this.adjustButtonWidth();
},createDijit2:function(){
this.inherited(arguments);
if(!this.dijit){
return;
}
this.connect(this.dijit,"onLoad",this,"flashLoaded");
this.button.dom.node=this.button.btnNode=this.button.domNode=this.dijit.domNode;
var div=document.createElement("div");
var s=div.style;
s.height="100%";
s.width="100%";
s.textAlign="center";
s.lineHeight=this.button.getContentBounds().h+"px";
this.button.domNode.appendChild(div);
this.button.btnNode=div;
this.dijit.insideNode.style.opacity="0.01";
this.dijit.insideNode.style.filter="alpha(opacity=1)";
this.button.caption=this.buttonCaption;
this.button.render(true,true);
},getPath:function(){
var l=window.location;
var path=l.protocol+"//"+l.host+l.pathname.replace(/[^\/]*$/,"");
path+="services/"+this.service+".flashUploader?method="+this.operation+"&sessionid="+app.getSessionId();
return path;
},adjustButtonWidth:function(_145){
},adjustButtonHeight:function(){
},reset:function(){
this.inherited(arguments);
if(!this.uploadImmediately){
var data=this.variable.getData();
for(var i=0;i<data.length;i++){
var d=data[i];
this.dijit.removeFile(d.name);
}
}
},change:function(_146){
this.updateVariable();
if(!this.uploadImmediately){
this._state="filestoupload";
this.progressBar.hide();
if(this.useList){
this.updateHtml();
this.html.show();
}
}else{
this.onChange();
wm.job(this.getRuntimeId()+": upload()",100,dojo.hitch(this,"upload"));
}
},_end:0});
wm.Object.extendSchema(wm.DojoFlashFileUpload,{fileMaskLabel:{group:"edit"},fileMaskList:{group:"edit"},uploadImmediately:{group:"edit"}});
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_fileupload",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
