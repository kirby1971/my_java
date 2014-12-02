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

dojo.provide("wm.compressed.wm_colorpicker");
if(!dojo._hasResource["dijit._HasDropDown"]){
dojo._hasResource["dijit._HasDropDown"]=true;
dojo.provide("dijit._HasDropDown");
dojo.declare("dijit._HasDropDown",null,{buttonNodeType:wm.isMobile?"span":"input",_buttonNode:null,_arrowWrapperNode:null,_popupStateNode:null,_aroundNode:null,dropDown:null,autoWidth:true,forceWidth:false,maxHeight:0,dropDownPosition:["below","above"],_stopClickEvents:true,_onDropDownMouseDown:function(e){
if(this.disabled||this.readOnly){
return;
}
if(e instanceof Event){
dojo.stopEvent(e);
}
this._docHandler=this.connect(dojo.doc,"onmouseup","_onDropDownMouseUp");
if(!e.type.ontouchend&&!e.type.mouseup&&this._opened||!this._opened){
this.toggleDropDown();
}
},_onDropDownMouseUp:function(e){
if(e&&this._docHandler){
this.disconnect(this._docHandler);
}
var _1=this.dropDown,_2=false;
if(e&&this._opened){
var c=dojo.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_2){
if(dojo.hasClass(t,"dijitPopup")){
_2=true;
}else{
t=t.parentNode;
}
}
if(_2){
t=e.target;
if(_1.onItemClick){
var _3;
while(t&&!(_3=dijit.byNode(t))){
t=t.parentNode;
}
if(_3&&_3.onClick&&_3.getParent){
_3.getParent().onItemClick(_3,e);
}
}
return;
}
}
}
if(this._opened&&_1.focus&&_1.autoFocus!==false){
window.setTimeout(dojo.hitch(_1,"focus"),1);
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
dojo.stopEvent(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _4={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+_4+"ArrowButton");
},postCreate:function(){
this.inherited(arguments);
if(!wm||!wm.isMobile){
this.connect(this._buttonNode,"onmousedown","_onDropDownMouseDown");
this.connect(this._buttonNode,"onclick","_onDropDownClick");
}else{
if(wm&&wm.isFakeMobile||navigator.userAgent.match(/(phone|ipad) OS (1|2|3|4)_/i)){
this.connect(this._buttonNode,"onmousedown","touchStart");
this.connect(this._buttonNode,"onmousemove","touchMove");
this.connect(this._buttonNode,"onmouseup","touchEnd");
}else{
this.connect(this._buttonNode,"ontouchstart","touchStart");
this.connect(this._buttonNode,"ontouchmove","touchMove");
this.connect(this._buttonNode,"ontouchend","touchEnd");
}
}
this.connect(this.focusNode,"onkeypress","_onKey");
this.connect(this.focusNode,"onkeyup","_onKeyUp");
},touchStart:function(e){
dojo.stopEvent(e);
if(!this._isTouched){
this._isTouched=true;
this.domNode.style.backgroundColor="black";
this.domNode.style.color="white";
}
},touchMove:function(e){
if(this._isTouched){
delete this._isTouched;
this.domNode.style.backgroundColor="";
this.domNode.style.color="";
}
},touchEnd:function(e){
if(this._isTouched){
if(e instanceof Event){
dojo.stopEvent(e);
}
this.domNode.style.backgroundColor="";
this.domNode.style.color="";
this._onDropDownMouseDown(e||{type:"ontouchend"});
}
},destroy:function(){
if(this.dropDown){
if(!this.dropDown._destroyed){
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
},_onKey:function(e){
if(this.disabled||this.readOnly){
return;
}
var d=this.dropDown,_5=e.target;
if(d&&this._opened&&d.handleKey){
if(d.handleKey(e)===false){
dojo.stopEvent(e);
return;
}
}
if(d&&this._opened&&e.charOrCode==dojo.keys.ESCAPE){
this.closeDropDown();
dojo.stopEvent(e);
}else{
if(!this._opened&&(e.charOrCode==dojo.keys.DOWN_ARROW||((e.charOrCode==dojo.keys.ENTER||e.charOrCode==" ")&&((_5.tagName||"").toLowerCase()!=="input"||(_5.type&&_5.type.toLowerCase()!=="text"))))){
this._toggleOnKeyUp=true;
dojo.stopEvent(e);
}
}
},_onKeyUp:function(){
if(this._toggleOnKeyUp){
delete this._toggleOnKeyUp;
this.toggleDropDown();
var d=this.dropDown;
if(d&&d.focus){
setTimeout(dojo.hitch(d,"focus"),1);
}
}
},_onBlur:function(){
var _6=dijit._curFocus&&this.dropDown&&dojo.isDescendant(dijit._curFocus,this.dropDown.domNode);
this.closeDropDown(_6);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_7){
_7();
},toggleDropDown:function(){
if(this.disabled||this.readOnly){
return;
}
if(!this._opened){
if(!this.isLoaded()){
this.loadDropDown(dojo.hitch(this,"openDropDown"));
return;
}else{
this.openDropDown();
}
}else{
this.closeDropDown();
}
},openDropDown:function(){
var _8=this.dropDown,_9=_8.domNode,_a=this._aroundNode||this.domNode,_b=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_9.style.width){
this._explicitDDWidth=true;
}
if(_9.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _c={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_c.width="";
}
if(!this._explicitDDHeight){
_c.height="";
}
dojo.style(_9,_c);
var _d=this.maxHeight;
if(_d==-1){
var _e=dojo.window.getBox(),_f=dojo.position(_a,false);
_d=Math.floor(Math.max(_f.y,_e.h-(_f.y+_f.h)));
}
if(_8.startup&&!_8._started){
_8.startup();
}
dijit.popup.moveOffScreen(_8);
var mb=dojo._getMarginSize(_9);
var _10=(_d&&mb.h>_d);
dojo.style(_9,{overflowX:"hidden",overflowY:_10?"auto":"hidden"});
if(_10){
mb.h=_d;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_a.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_a.offsetWidth);
}else{
delete mb.w;
}
}
if(dojo.isFunction(_8.resize)){
_8.resize(mb);
}else{
dojo.marginBox(_9,mb);
}
}
var _11=dijit.popup.open({parent:this,popup:_8,around:_a,orient:dijit.getPopupAroundAlignment((this.dropDownPosition&&this.dropDownPosition.length)?this.dropDownPosition:["below"],this.isLeftToRight()),onExecute:function(){
_b.closeDropDown(true);
},onCancel:function(){
_b.closeDropDown(true);
},onClose:function(){
dojo.attr(_b._popupStateNode,"popupActive",false);
dojo.removeClass(_b._popupStateNode,"dijitHasDropDownOpen");
_b._opened=false;
}});
dojo.attr(this._popupStateNode,"popupActive","true");
dojo.addClass(_b._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _11;
},closeDropDown:function(_12){
if(this._opened){
if(_12){
this.focus();
}
dijit.popup.close(this.dropDown);
this._opened=false;
}
}});
}
if(!dojo._hasResource["dojo.colors"]){
dojo._hasResource["dojo.colors"]=true;
dojo.provide("dojo.colors");
dojo.getObject("colors",true,dojo);
(function(){
var _13=function(m1,m2,h){
if(h<0){
++h;
}
if(h>1){
--h;
}
var h6=6*h;
if(h6<1){
return m1+(m2-m1)*h6;
}
if(2*h<1){
return m2;
}
if(3*h<2){
return m1+(m2-m1)*(2/3-h)*6;
}
return m1;
};
dojo.colorFromRgb=function(_14,obj){
var m=_14.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
if(m){
var c=m[2].split(/\s*,\s*/),l=c.length,t=m[1],a;
if((t=="rgb"&&l==3)||(t=="rgba"&&l==4)){
var r=c[0];
if(r.charAt(r.length-1)=="%"){
a=dojo.map(c,function(x){
return parseFloat(x)*2.56;
});
if(l==4){
a[3]=c[3];
}
return dojo.colorFromArray(a,obj);
}
return dojo.colorFromArray(c,obj);
}
if((t=="hsl"&&l==3)||(t=="hsla"&&l==4)){
var H=((parseFloat(c[0])%360)+360)%360/360,S=parseFloat(c[1])/100,L=parseFloat(c[2])/100,m2=L<=0.5?L*(S+1):L+S-L*S,m1=2*L-m2;
a=[_13(m1,m2,H+1/3)*256,_13(m1,m2,H)*256,_13(m1,m2,H-1/3)*256,1];
if(l==4){
a[3]=c[3];
}
return dojo.colorFromArray(a,obj);
}
}
return null;
};
var _15=function(c,low,_16){
c=Number(c);
return isNaN(c)?_16:c<low?low:c>_16?_16:c;
};
dojo.Color.prototype.sanitize=function(){
var t=this;
t.r=Math.round(_15(t.r,0,255));
t.g=Math.round(_15(t.g,0,255));
t.b=Math.round(_15(t.b,0,255));
t.a=_15(t.a,0,1);
return this;
};
})();
dojo.colors.makeGrey=function(g,a){
return dojo.colorFromArray([g,g,g,a]);
};
dojo.mixin(dojo.Color.named,{aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],transparent:[0,0,0,0],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]});
}
if(!dojo._hasResource["dojox.color._base"]){
dojo._hasResource["dojox.color._base"]=true;
dojo.provide("dojox.color._base");
dojox.color.Color=dojo.Color;
dojox.color.blend=dojo.blendColors;
dojox.color.fromRgb=dojo.colorFromRgb;
dojox.color.fromHex=dojo.colorFromHex;
dojox.color.fromArray=dojo.colorFromArray;
dojox.color.fromString=dojo.colorFromString;
dojox.color.greyscale=dojo.colors.makeGrey;
dojo.mixin(dojox.color,{fromCmy:function(_17,_18,_19){
if(dojo.isArray(_17)){
_18=_17[1],_19=_17[2],_17=_17[0];
}else{
if(dojo.isObject(_17)){
_18=_17.m,_19=_17.y,_17=_17.c;
}
}
_17/=100,_18/=100,_19/=100;
var r=1-_17,g=1-_18,b=1-_19;
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromCmyk:function(_1a,_1b,_1c,_1d){
if(dojo.isArray(_1a)){
_1b=_1a[1],_1c=_1a[2],_1d=_1a[3],_1a=_1a[0];
}else{
if(dojo.isObject(_1a)){
_1b=_1a.m,_1c=_1a.y,_1d=_1a.b,_1a=_1a.c;
}
}
_1a/=100,_1b/=100,_1c/=100,_1d/=100;
var r,g,b;
r=1-Math.min(1,_1a*(1-_1d)+_1d);
g=1-Math.min(1,_1b*(1-_1d)+_1d);
b=1-Math.min(1,_1c*(1-_1d)+_1d);
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromHsl:function(hue,_1e,_1f){
if(dojo.isArray(hue)){
_1e=hue[1],_1f=hue[2],hue=hue[0];
}else{
if(dojo.isObject(hue)){
_1e=hue.s,_1f=hue.l,hue=hue.h;
}
}
_1e/=100;
_1f/=100;
while(hue<0){
hue+=360;
}
while(hue>=360){
hue-=360;
}
var r,g,b;
if(hue<120){
r=(120-hue)/60,g=hue/60,b=0;
}else{
if(hue<240){
r=0,g=(240-hue)/60,b=(hue-120)/60;
}else{
r=(hue-240)/60,g=0,b=(360-hue)/60;
}
}
r=2*_1e*Math.min(r,1)+(1-_1e);
g=2*_1e*Math.min(g,1)+(1-_1e);
b=2*_1e*Math.min(b,1)+(1-_1e);
if(_1f<0.5){
r*=_1f,g*=_1f,b*=_1f;
}else{
r=(1-_1f)*r+2*_1f-1;
g=(1-_1f)*g+2*_1f-1;
b=(1-_1f)*b+2*_1f-1;
}
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromHsv:function(hue,_20,_21){
if(dojo.isArray(hue)){
_20=hue[1],_21=hue[2],hue=hue[0];
}else{
if(dojo.isObject(hue)){
_20=hue.s,_21=hue.v,hue=hue.h;
}
}
if(hue==360){
hue=0;
}
_20/=100;
_21/=100;
var r,g,b;
if(_20==0){
r=_21,b=_21,g=_21;
}else{
var _22=hue/60,i=Math.floor(_22),f=_22-i;
var p=_21*(1-_20);
var q=_21*(1-(_20*f));
var t=_21*(1-(_20*(1-f)));
switch(i){
case 0:
r=_21,g=t,b=p;
break;
case 1:
r=q,g=_21,b=p;
break;
case 2:
r=p,g=_21,b=t;
break;
case 3:
r=p,g=q,b=_21;
break;
case 4:
r=t,g=p,b=_21;
break;
case 5:
r=_21,g=p,b=q;
break;
}
}
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
}});
dojo.extend(dojox.color.Color,{toCmy:function(){
var _23=1-(this.r/255),_24=1-(this.g/255),_25=1-(this.b/255);
return {c:Math.round(_23*100),m:Math.round(_24*100),y:Math.round(_25*100)};
},toCmyk:function(){
var _26,_27,_28,_29;
var r=this.r/255,g=this.g/255,b=this.b/255;
_29=Math.min(1-r,1-g,1-b);
_26=(1-r-_29)/(1-_29);
_27=(1-g-_29)/(1-_29);
_28=(1-b-_29)/(1-_29);
return {c:Math.round(_26*100),m:Math.round(_27*100),y:Math.round(_28*100),b:Math.round(_29*100)};
},toHsl:function(){
var r=this.r/255,g=this.g/255,b=this.b/255;
var min=Math.min(r,b,g),max=Math.max(r,g,b);
var _2a=max-min;
var h=0,s=0,l=(min+max)/2;
if(l>0&&l<1){
s=_2a/((l<0.5)?(2*l):(2-2*l));
}
if(_2a>0){
if(max==r&&max!=g){
h+=(g-b)/_2a;
}
if(max==g&&max!=b){
h+=(2+(b-r)/_2a);
}
if(max==b&&max!=r){
h+=(4+(r-g)/_2a);
}
h*=60;
}
return {h:h,s:Math.round(s*100),l:Math.round(l*100)};
},toHsv:function(){
var r=this.r/255,g=this.g/255,b=this.b/255;
var min=Math.min(r,b,g),max=Math.max(r,g,b);
var _2b=max-min;
var h=null,s=(max==0)?0:(_2b/max);
if(s==0){
h=0;
}else{
if(r==max){
h=60*(g-b)/_2b;
}else{
if(g==max){
h=120+60*(b-r)/_2b;
}else{
h=240+60*(r-g)/_2b;
}
}
if(h<0){
h+=360;
}
}
return {h:h,s:Math.round(s*100),v:Math.round(max*100)};
}});
}
if(!dojo._hasResource["dojox.color"]){
dojo._hasResource["dojox.color"]=true;
dojo.provide("dojox.color");
}
if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_2c,_2d){
return new dojo.dnd.move.constrainedMoveable(_2d,_2c);
},constructor:function(_2e,_2f){
if(!_2f){
_2f={};
}
this.constraints=_2f.constraints;
this.within=_2f.within;
},onFirstMove:function(_30){
var c=this.constraintBox=this.constraints.call(this,_30);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_30.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_31,_32){
var c=this.constraintBox,s=_31.node.style;
this.onMoving(_31,_32);
_32.l=_32.l<c.l?c.l:c.r<_32.l?c.r:_32.l;
_32.t=_32.t<c.t?c.t:c.b<_32.t?c.b:_32.t;
s.left=_32.l+"px";
s.top=_32.t+"px";
this.onMoved(_31,_32);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_33,_34){
return new dojo.dnd.move.boxConstrainedMoveable(_34,_33);
},constructor:function(_35,_36){
var box=_36&&_36.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_37,_38){
return new dojo.dnd.move.parentConstrainedMoveable(_38,_37);
},constructor:function(_39,_3a){
var _3b=_3a&&_3a.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_3b=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_3b=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_3b=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover;
}
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(_3c){
var _3d=this;
dojo.mixin(_3d,_3c);
_3d.node=_3c.node;
_3d._showArgs=dojo.mixin({},_3c);
_3d._showArgs.node=_3d.node;
_3d._showArgs.duration=_3d.showDuration;
_3d.showAnim=_3d.showFunc(_3d._showArgs);
_3d._hideArgs=dojo.mixin({},_3c);
_3d._hideArgs.node=_3d.node;
_3d._hideArgs.duration=_3d.hideDuration;
_3d.hideAnim=_3d.hideFunc(_3d._hideArgs);
dojo.connect(_3d.showAnim,"beforeBegin",dojo.hitch(_3d.hideAnim,"stop",true));
dojo.connect(_3d.hideAnim,"beforeBegin",dojo.hitch(_3d.showAnim,"stop",true));
},show:function(_3e){
return this.showAnim.play(_3e||0);
},hide:function(_3f){
return this.hideAnim.play(_3f||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_40={_fire:function(evt,_41){
if(this[evt]){
this[evt].apply(this,_41||[]);
}
return this;
}};
var _42=function(_43){
this._index=-1;
this._animations=_43||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_42,{_onAnimate:function(){
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
},play:function(_44,_45){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_45&&this._current.status()=="playing"){
return this;
}
var _46=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_47=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_48=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_46);
d.disconnect(_47);
d.disconnect(_48);
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
},gotoPercent:function(_49,_4a){
this.pause();
var _4b=this.duration*_49;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_4b){
this._current=a;
return true;
}
_4b-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_4b/this._current.duration,_4a);
}
return this;
},stop:function(_4c){
if(this._current){
if(_4c){
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
d.extend(_42,_40);
dojo.fx.chain=function(_4d){
return new _42(_4d);
};
var _4e=function(_4f){
this._animations=_4f||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_4f,function(a){
var _50=a.duration;
if(a.delay){
_50+=a.delay;
}
if(this.duration<_50){
this.duration=_50;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d.Animation({curve:[0,1],duration:this.duration});
var _51=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
_51._connects.push(d.connect(_51._pseudoAnimation,evt,function(){
_51._fire(evt,arguments);
}));
});
};
d.extend(_4e,{_doAction:function(_52,_53){
d.forEach(this._animations,function(a){
a[_52].apply(a,_53);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_54,_55){
var t=this._pseudoAnimation;
t[_54].apply(t,_55);
},play:function(_56,_57){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_58,_59){
var ms=this.duration*_58;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_59);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_5a){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_4e,_40);
dojo.fx.combine=function(_5b){
return new _4e(_5b);
};
dojo.fx.wipeIn=function(_5c){
var _5d=_5c.node=d.byId(_5c.node),s=_5d.style,o;
var _5e=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _5f=d.style(_5d,"height");
return Math.max(_5f,1);
}
},end:function(){
return _5d.scrollHeight;
}}}},_5c));
d.connect(_5e,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return _5e;
};
dojo.fx.wipeOut=function(_60){
var _61=_60.node=d.byId(_60.node),s=_61.style,o;
var _62=d.animateProperty(d.mixin({properties:{height:{end:1}}},_60));
d.connect(_62,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(_62,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return _62;
};
dojo.fx.slideTo=function(_63){
var _64=_63.node=d.byId(_63.node),top=null,_65=null;
var _66=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
_65=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.position(n,true);
top=ret.y;
_65=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=_65+"px";
}
};
})(_64);
_66();
var _67=d.animateProperty(d.mixin({properties:{top:_63.top||0,left:_63.left||0}},_63));
d.connect(_67,"beforeBegin",_67,_66);
return _67;
};
})();
}
if(!dojo._hasResource["dojox.widget.ColorPicker"]){
dojo._hasResource["dojox.widget.ColorPicker"]=true;
dojo.provide("dojox.widget.ColorPicker");
dojo.experimental("dojox.widget.ColorPicker");
(function(d){
var _68=function(hex){
return hex;
};
dojo.declare("dojox.widget.ColorPicker",dijit.form._FormWidget,{showRgb:true,showHsv:true,showHex:true,webSafe:true,animatePoint:true,slideDuration:250,liveUpdate:false,PICKER_HUE_H:150,PICKER_SAT_VAL_H:150,PICKER_SAT_VAL_W:150,PICKER_HUE_SELECTOR_H:8,PICKER_SAT_SELECTOR_H:10,PICKER_SAT_SELECTOR_W:10,value:"#ffffff",_underlay:d.moduleUrl("dojox.widget","ColorPicker/images/underlay.png"),_hueUnderlay:d.moduleUrl("dojox.widget","ColorPicker/images/hue.png"),_pickerPointer:d.moduleUrl("dojox.widget","ColorPicker/images/pickerPointer.png"),_huePickerPointer:d.moduleUrl("dojox.widget","ColorPicker/images/hueHandle.png"),_huePickerPointerAlly:d.moduleUrl("dojox.widget","ColorPicker/images/hueHandleA11y.png"),templateString:dojo.cache("dojox.widget","ColorPicker/ColorPicker.html","<table class=\"dojoxColorPicker\" dojoAttachEvent=\"onkeypress: _handleKey\" cellpadding=\"0\" cellspacing=\"0\">\r\n\t<tr>\r\n\t\t<td valign=\"top\" class=\"dojoxColorPickerRightPad\">\r\n\t\t\t<div class=\"dojoxColorPickerBox\">\r\n\t\t\t\t<!-- Forcing ABS in style attr due to dojo DND issue with not picking it up form the class. -->\r\n\t\t\t\t<img role=\"status\" title=\"${saturationPickerTitle}\" alt=\"${saturationPickerTitle}\" class=\"dojoxColorPickerPoint\" src=\"${_pickerPointer}\" tabIndex=\"0\" dojoAttachPoint=\"cursorNode\" style=\"position: absolute; top: 0px; left: 0px;\">\r\n\t\t\t\t<img role=\"presentation\" alt=\"\" dojoAttachPoint=\"colorUnderlay\" dojoAttachEvent=\"onclick: _setPoint, onmousedown: _stopDrag\" class=\"dojoxColorPickerUnderlay\" src=\"${_underlay}\" ondragstart=\"return false\">\r\n\t\t\t</div>\r\n\t\t</td>\r\n\t\t<td valign=\"top\" class=\"dojoxColorPickerRightPad\">\r\n\t\t\t<div class=\"dojoxHuePicker\">\r\n\t\t\t\t<!-- Forcing ABS in style attr due to dojo DND issue with not picking it up form the class. -->\r\n\t\t\t\t<img role=\"status\" dojoAttachPoint=\"hueCursorNode\" tabIndex=\"0\" class=\"dojoxHuePickerPoint\" title=\"${huePickerTitle}\" alt=\"${huePickerTitle}\" src=\"${_huePickerPointer}\" style=\"position: absolute; top: 0px; left: 0px;\">\r\n\t\t\t\t<div class=\"dojoxHuePickerUnderlay\" dojoAttachPoint=\"hueNode\">\r\n\t\t\t\t    <img role=\"presentation\" alt=\"\" dojoAttachEvent=\"onclick: _setHuePoint, onmousedown: _stopDrag\" src=\"${_hueUnderlay}\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</td>\r\n\t\t<td valign=\"top\">\r\n\t\t\t<table cellpadding=\"0\" cellspacing=\"0\">\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td valign=\"top\" class=\"dojoxColorPickerPreviewContainer\">\r\n\t\t\t\t\t\t<table cellpadding=\"0\" cellspacing=\"0\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td valign=\"top\" class=\"dojoxColorPickerRightPad\">\r\n\t\t\t\t\t\t\t\t\t<div dojoAttachPoint=\"previewNode\" class=\"dojoxColorPickerPreview\"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td valign=\"top\">\r\n\t\t\t\t\t\t\t\t\t<div dojoAttachPoint=\"safePreviewNode\" class=\"dojoxColorPickerWebSafePreview\"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td valign=\"bottom\">\r\n\t\t\t\t\t\t<table class=\"dojoxColorPickerOptional\" cellpadding=\"0\" cellspacing=\"0\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<div class=\"dijitInline dojoxColorPickerRgb\" dojoAttachPoint=\"rgbNode\">\r\n\t\t\t\t\t\t\t\t\t\t<table cellpadding=\"1\" cellspacing=\"1\">\r\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_r\">${redLabel}</label></td><td><input id=\"${_uId}_r\" dojoAttachPoint=\"Rval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"></td></tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_g\">${greenLabel}</label></td><td><input id=\"${_uId}_g\" dojoAttachPoint=\"Gval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"></td></tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_b\">${blueLabel}</label></td><td><input id=\"${_uId}_b\" dojoAttachPoint=\"Bval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"></td></tr>\r\n\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<!--  Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \r\n\t\t\t\t\t\t\t WaveMaker: Added ok/cancel buttons-->\r\n\t\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t  <button class=\"wmbutton StudioButton OKButton\">OK</button>\r\n\t\t\t\t\t\t\t\t  <button class=\"wmbutton StudioButton CancelButton\">Cancel</button>\r\n\t\t\t\t\t\t\t\t\t  </div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<!--  Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \r\n\t\t\t\t\t\t\t WaveMaker: set display:none because it was not laid out to our satisfaction -->\r\n\t\t\t\t\t\t\t\t<td style=\"display:none\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"dijitInline dojoxColorPickerHsv\" dojoAttachPoint=\"hsvNode\">\r\n\t\t\t\t\t\t\t\t\t\t<table cellpadding=\"1\" cellspacing=\"1\">\r\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_h\">${hueLabel}</label></td><td><input id=\"${_uId}_h\" dojoAttachPoint=\"Hval\"size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"> ${degLabel}</td></tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_s\">${saturationLabel}</label></td><td><input id=\"${_uId}_s\" dojoAttachPoint=\"Sval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"> ${percentSign}</td></tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr><td><label for=\"${_uId}_v\">${valueLabel}</label></td><td><input id=\"${_uId}_v\" dojoAttachPoint=\"Vval\" size=\"1\" dojoAttachEvent=\"onchange: _colorInputChange\"> ${percentSign}</td></tr>\r\n\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<!--  Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \r\n\t\t\t\t\t\t\t WaveMaker: set display:none because it was not laid out to our satisfaction -->\r\n\t\t\t\t\t\t\t<tr style=\"display:none\">\r\n\t\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"dojoxColorPickerHex\" dojoAttachPoint=\"hexNode\" aria-live=\"polite\">\t\r\n\t\t\t\t\t\t\t\t\t\t<label for=\"${_uId}_hex\">&nbsp;${hexLabel}&nbsp;</label><input id=\"${_uId}_hex\" dojoAttachPoint=\"hexCode, focusNode, valueNode\" size=\"6\" class=\"dojoxColorPickerHexCode\" dojoAttachEvent=\"onchange: _colorInputChange\">\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n\t\t</td>\r\n\t</tr>\r\n</table>\r\n\r\n"),postMixInProperties:function(){
if(dojo.hasClass(dojo.body(),"dijit_a11y")){
this._huePickerPointer=this._huePickerPointerAlly;
}
this._uId=dijit.getUniqueId(this.id);
dojo.mixin(this,dojo.i18n.getLocalization("dojox.widget","ColorPicker"));
dojo.mixin(this,dojo.i18n.getLocalization("dojo.cldr","number"));
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
if(d.isIE<7){
this.colorUnderlay.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this._underlay+"', sizingMethod='scale')";
this.colorUnderlay.src=this._blankGif.toString();
}
if(!this.showRgb){
this.rgbNode.style.visibility="hidden";
}
if(!this.showHsv){
this.hsvNode.style.visibility="hidden";
}
if(!this.showHex){
this.hexNode.style.visibility="hidden";
}
if(!this.webSafe){
this.safePreviewNode.style.visibility="hidden";
}
},startup:function(){
if(this._started){
return;
}
this._started=true;
this.set("value",this.value);
this._subs=[];
this._keyListeners=[];
this._connects.push(dijit.typematic.addKeyListener(this.hueCursorNode,{charOrCode:dojo.keys.UP_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateHueCursorNode),25,25));
this._connects.push(dijit.typematic.addKeyListener(this.hueCursorNode,{charOrCode:dojo.keys.DOWN_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateHueCursorNode),25,25));
this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,{charOrCode:dojo.keys.UP_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateCursorNode),25,25));
this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,{charOrCode:dojo.keys.DOWN_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateCursorNode),25,25));
this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,{charOrCode:dojo.keys.LEFT_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateCursorNode),25,25));
this._connects.push(dijit.typematic.addKeyListener(this.cursorNode,{charOrCode:dojo.keys.RIGHT_ARROW,shiftKey:false,metaKey:false,ctrlKey:false,altKey:false},this,dojo.hitch(this,this._updateCursorNode),25,25));
},_setValueAttr:function(_69){
if(!this._started){
return;
}
this.setColor(_69,true);
},setColor:function(_6a,_6b){
var col=dojox.color.fromString(_6a);
this._updatePickerLocations(col);
this._updateColorInputs(col);
this._updateValue(col,_6b);
},_setTimer:function(_6c){
dijit.focus(_6c.node);
d.setSelectable(this.domNode,false);
this._timer=setInterval(d.hitch(this,"_updateColor"),45);
},_clearTimer:function(_6d){
clearInterval(this._timer);
this._timer=null;
this.onChange(this.value);
d.setSelectable(this.domNode,true);
},_setHue:function(h){
d.style(this.colorUnderlay,"backgroundColor",dojox.color.fromHsv(h,100,100).toHex());
},_updateHueCursorNode:function(_6e,_6f,e){
if(_6e!==-1){
var y=dojo.style(this.hueCursorNode,"top");
var _70=(this.PICKER_HUE_SELECTOR_H/2);
y+=_70;
var _71=false;
if(e.charOrCode==dojo.keys.UP_ARROW){
if(y>0){
y-=1;
_71=true;
}
}else{
if(e.charOrCode==dojo.keys.DOWN_ARROW){
if(y<this.PICKER_HUE_H){
y+=1;
_71=true;
}
}
}
y-=_70;
if(_71){
dojo.style(this.hueCursorNode,"top",y+"px");
}
}else{
this._updateColor(true);
}
},_updateCursorNode:function(_72,_73,e){
var _74=this.PICKER_SAT_SELECTOR_H/2;
var _75=this.PICKER_SAT_SELECTOR_W/2;
if(_72!==-1){
var y=dojo.style(this.cursorNode,"top");
var x=dojo.style(this.cursorNode,"left");
y+=_74;
x+=_75;
var _76=false;
if(e.charOrCode==dojo.keys.UP_ARROW){
if(y>0){
y-=1;
_76=true;
}
}else{
if(e.charOrCode==dojo.keys.DOWN_ARROW){
if(y<this.PICKER_SAT_VAL_H){
y+=1;
_76=true;
}
}else{
if(e.charOrCode==dojo.keys.LEFT_ARROW){
if(x>0){
x-=1;
_76=true;
}
}else{
if(e.charOrCode==dojo.keys.RIGHT_ARROW){
if(x<this.PICKER_SAT_VAL_W){
x+=1;
_76=true;
}
}
}
}
}
if(_76){
y-=_74;
x-=_75;
dojo.style(this.cursorNode,"top",y+"px");
dojo.style(this.cursorNode,"left",x+"px");
}
}else{
this._updateColor(true);
}
},_updateColor:function(){
var _77=this.PICKER_HUE_SELECTOR_H/2,_78=this.PICKER_SAT_SELECTOR_H/2,_79=this.PICKER_SAT_SELECTOR_W/2;
var _7a=d.style(this.hueCursorNode,"top")+_77,_7b=d.style(this.cursorNode,"top")+_78,_7c=d.style(this.cursorNode,"left")+_79,h=Math.round(360-(_7a/this.PICKER_HUE_H*360)),col=dojox.color.fromHsv(h,_7c/this.PICKER_SAT_VAL_W*100,100-(_7b/this.PICKER_SAT_VAL_H*100));
this._updateColorInputs(col);
this._updateValue(col,true);
if(h!=this._hue){
this._setHue(h);
}
},_colorInputChange:function(e){
var col,_7d=false;
switch(e.target){
case this.hexCode:
col=dojox.color.fromString(e.target.value);
_7d=true;
break;
case this.Rval:
case this.Gval:
case this.Bval:
col=dojox.color.fromArray([this.Rval.value,this.Gval.value,this.Bval.value]);
_7d=true;
break;
case this.Hval:
case this.Sval:
case this.Vval:
col=dojox.color.fromHsv(this.Hval.value,this.Sval.value,this.Vval.value);
_7d=true;
break;
}
if(_7d){
this._updatePickerLocations(col);
this._updateColorInputs(col);
this._updateValue(col,true);
}
},_updateValue:function(col,_7e){
var hex=col.toHex();
this.value=this.valueNode.value=hex;
if(_7e&&(!this._timer||this.liveUpdate)){
this.onChange(hex);
}
},_updatePickerLocations:function(col){
var _7f=this.PICKER_HUE_SELECTOR_H/2,_80=this.PICKER_SAT_SELECTOR_H/2,_81=this.PICKER_SAT_SELECTOR_W/2;
var hsv=col.toHsv(),_82=Math.round(this.PICKER_HUE_H-hsv.h/360*this.PICKER_HUE_H)-_7f,_83=Math.round(hsv.s/100*this.PICKER_SAT_VAL_W)-_81,_84=Math.round(this.PICKER_SAT_VAL_H-hsv.v/100*this.PICKER_SAT_VAL_H)-_80;
if(this.animatePoint){
d.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:_82,left:0}).play();
d.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:_84,left:_83}).play();
}else{
d.style(this.hueCursorNode,"top",_82+"px");
d.style(this.cursorNode,{left:_83+"px",top:_84+"px"});
}
if(hsv.h!=this._hue){
this._setHue(hsv.h);
}
},_updateColorInputs:function(col){
var hex=col.toHex();
if(this.showRgb){
this.Rval.value=col.r;
this.Gval.value=col.g;
this.Bval.value=col.b;
}
if(this.showHsv){
var hsv=col.toHsv();
this.Hval.value=Math.round((hsv.h));
this.Sval.value=Math.round(hsv.s);
this.Vval.value=Math.round(hsv.v);
}
if(this.showHex){
this.hexCode.value=hex;
}
this.previewNode.style.backgroundColor=hex;
if(this.webSafe){
this.safePreviewNode.style.backgroundColor=_68(hex);
}
},_setHuePoint:function(evt){
var _85=(this.PICKER_HUE_SELECTOR_H/2);
var _86=dojo.coords(this.colorUnderlay);
var _87=evt.pageY-_86.y-2;
if(this.animatePoint){
d.fx.slideTo({node:this.hueCursorNode,duration:this.slideDuration,top:_87,left:0,onEnd:d.hitch(this,function(){
this._updateColor(true);
dijit.focus(this.hueCursorNode);
})}).play();
}else{
d.style(this.hueCursorNode,"top",_87+"px");
this._updateColor(false);
}
},_setPoint:function(evt){
var _88=this.PICKER_SAT_SELECTOR_H/2;
var _89=this.PICKER_SAT_SELECTOR_W/2;
var _8a=dojo.coords(this.colorUnderlay);
var _8b=evt.pageY-_8a.y;
var _8c=evt.pageX-_8a.x;
if(evt){
dijit.focus(evt.target);
}
if(this.animatePoint){
d.fx.slideTo({node:this.cursorNode,duration:this.slideDuration,top:_8b,left:_8c,onEnd:d.hitch(this,function(){
this._updateColor(true);
dijit.focus(this.cursorNode);
})}).play();
}else{
d.style(this.cursorNode,{left:_8c+"px",top:_8b+"px"});
this._updateColor(false);
}
},_handleKey:function(e){
},focus:function(){
if(!this._focused){
dijit.focus(this.focusNode);
}
},_stopDrag:function(e){
dojo.stopEvent(e);
},destroy:function(){
this.inherited(arguments);
dojo.forEach(this._subs,function(sub){
dojo.unsubscribe(sub);
});
delete this._subs;
}});
})(dojo);
}
if(!dojo._hasResource["wm.base.widget.Editors.ColorPicker"]){
dojo._hasResource["wm.base.widget.Editors.ColorPicker"]=true;
dojo.provide("wm.base.widget.Editors.ColorPicker");
dojo.declare("wm.ColorPicker",wm.Text,{classNames:"wmeditor wmcolorpicker",changeOnKey:true,className:"wmeditor wmcolorpickereditor",_editorBackgroundColor:true,defaultColor:"",cancelValue:null,_empty:true,regExp:"\\s*(#[0-9a-fA-F]{6}|{.*}|#[0-9a-fA-F]{3}|transparent|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|purple|red|silver|teal|white|yellow|rgb\\(\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+\\s*\\)|rgba\\(\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d*\\.?\\d*\\s*\\))\\s*",regExpOptions:"i",showMessages:false,gradient:false,_createEditor:function(_8d,_8e){
return new wm.dijit.form.ColorPicker(this.getEditorProps(_8d,_8e));
},setInitialValue:function(){
this.inherited(arguments);
this.updateEditorColors(this.dataValue);
},getDataValue:function(){
if(!this.gradient){
return this.inherited(arguments)||this.defaultColor;
}else{
return this.inherited(arguments);
}
},getEditorValue:function(){
var _8f=this.inherited(arguments);
if(this.gradient&&_8f){
_8f=(dojo.fromJson(_8f));
}
return _8f;
},setEditorValue:function(_90){
if(this.gradient&&_90&&typeof _90==="object"){
_90=dojo.toJson(_90);
}else{
if(!this.gradient){
_90=String(_90||"").toLowerCase();
}
}
this.inherited(arguments);
},calcIsDirty:function(_91,_92){
if(typeof _91=="object"&&typeof _92=="object"){
return dojo.toJson(_91)!=dojo.toJson(_92);
}
return this.inherited(arguments);
},onClose:function(){
},doChangeOnKey:function(_93){
this.inherited(arguments);
this.editor.dropDown.reset();
},changed:function(){
if(!this.gradient){
var _94=this.editor.get("value")||"";
if(_94.match(/[A-Z]/)){
this.editor.set("value",_94.toLowerCase(),false);
}
}
this.inherited(arguments);
},editorChanged:function(){
if(this.inherited(arguments)){
this.updateEditorColors(this.dataValue);
return true;
}
return false;
},updateEditorColors:function(_95){
if(!this.gradient||this.gradient&&_95&&_95.endColor){
if(this.gradient){
_95=_95.endColor;
}
if(_95){
var v1,v2,v3;
this.editorNode.style.backgroundColor=_95;
_95=this.editorNode.style.backgroundColor;
if(_95.match(/^\#/)){
}else{
if(_95){
var _96=_95.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/);
if(_96){
_95="#"+Number(_96[1]).toString(16)+Number(_96[2]).toString(16)+Number(_96[3]).toString(16);
}else{
var _97=dojox.color.fromString(_95);
if(_97){
_95=_97.toHex();
}
}
}
}
if(_95===""){
v1=v2=v3=255;
}else{
if(_95.length>5){
v1=parseInt(_95.substr(1,2),16);
v2=parseInt(_95.substr(3,2),16);
v3=parseInt(_95.substr(5,2),16);
}else{
v1=parseInt(_95.substr(1,1)||0,16);
v2=parseInt(_95.substr(2,1)||0,16);
v3=parseInt(_95.substr(3,1)||0,16);
}
}
this.editor.focusNode.style.color=(v1<130&&v2<130&&v3<130||v1+v2<180||v1+v3<180||v2+v3<180)||(v1+v2+v3<250)?"white":"black";
}else{
this.editorNode.style.backgroundColor="";
this.editor.focusNode.style.color="";
}
}else{
if(typeof _95=="string"&&_95.length){
_95=dojo.fromJson(_95);
}
var _98=_95?wm.getBackgroundStyle(_95.startColor,_95.endColor,_95.colorStop,_95.direction,""):"";
if(dojo.isIE<10){
this.editorNode.style.filter=_98;
}else{
this.editorNode.style.background=_98;
}
}
}});
dojo.declare("wm.dijit.form.ColorPicker",[dijit.form.ValidationTextBox,dijit._HasDropDown],{baseClass:"dijitTextBox dijitComboBox",popupClass:"wm.ListSet",forceWidth:false,autoWidth:false,value:"",noFilter:false,templateString:dojo.cache("dijit.form","templates/DropDownBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\r\n\tid=\"widget_${id}\"\r\n\trole=\"combobox\"\r\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n\t\t>\r\n\t\t\t    <!-- Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0\r\n\t\t\t      WaveMaker: Unfortunate hack to replace input with span to avoid focus issues with mobile that cause keyboards to pop open -->\r\n<${buttonNodeType} class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t${_buttonInputDisabled}\r\n\t/></div\r\n\t><div class='dijitReset dijitValidationContainer'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t/></div\r\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n\t/></div\r\n></div>\r\n"),hasDownArrow:true,openOnClick:true,buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this.domNode;
},createDropDown:function(){
if(this.owner.gradient){
this.dropDown=new wm.GradientPickerPanel({owner:this.owner,dataValue:this.dataValue||{direction:"vertical",startColor:"#0101b7",endColor:"#011d65",colorStop:"50"},destroyRecursive:function(){
if(!this.isDestroyed){
this.destroy();
}
}});
}else{
this.dropDown=new wm.ColorPickerPanel({owner:this.owner,destroyRecursive:function(){
if(!this.isDestroyed){
this.destroy();
}
}});
}
if(wm.isMobile){
this.dropDown.dialogScrim.connect(this.dropDown.dialogScrim.domNode,wm.isFakeMobile?"onclick":"ontouchstart",this.dropDown,"hide");
}
this.dropDown.connect(this.dropDown,"onChange",this,function(_99){
if(this.dropDown.showing){
if(!this.owner.gradient){
this.set("value",_99);
}else{
this.set("value",dojo.toJson(_99));
}
}
this.onChange(_99);
});
},openDropDown:function(_9a){
if(!this.dropDown){
this.createDropDown();
}
if(this.owner.dataValue){
this.dropDown.reset();
}
this.dropDown.setShowing(true);
return dijit._HasDropDown.prototype.openDropDown.call(this,_9a);
},closeDropDown:function(){
var _9b=this._opened;
this.inherited(arguments);
if(_9b){
wm.onidle(this,function(){
if(!this._opened){
this.owner.onClose();
}
});
}
},destroy:function(){
if(this.dropDown){
this.dropDown.destroy();
delete this.dropDown;
}
this.inherited(arguments);
}});
dojo.declare("wm.ColorPickerPanel",wm.Container,{colorPicker:null,colorPickerSet:false,border:"0",borderColor:"#888888",width:"325px",height:"185px",modal:false,colorPickerControl:null,init:function(){
this.inherited(arguments);
},destroy:function(){
if(this.colorPicker){
this.colorPicker.destroy();
}
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
if(!wm.ColorPickerPanel.cssLoaded){
var _9c=document.createElement("link");
_9c.rel="stylesheet";
_9c.type="text/css";
_9c.href=dojo.moduleUrl("dojox.widget.ColorPicker").uri+"ColorPicker.css";
document.getElementsByTagName("head")[0].appendChild(_9c);
wm.ColorPickerPanel.cssLoaded=true;
}
this.colorPickerControl=new wm.Control({name:"colorPickerControl",width:"325px",height:"170px",owner:this,parent:this});
this.colorPicker=new dojox.widget.ColorPicker({animatePoint:true,showHsv:false,showRtb:true,webSave:false,onChange:dojo.hitch(this,"valueChange")},this.colorPickerControl.domNode);
wm.onidle(this,function(){
this.colorPicker.startup();
this.connect(dojo.query(".OKButton",this.domNode)[0],"onclick",this,"onOKClick");
this.connect(dojo.query(".CancelButton",this.domNode)[0],"onclick",this,"onCancelClick");
});
this.colorPicker.PICKER_SAT_VAL_H=152;
this.colorPicker.PICKER_SAT_VAL_W=152;
this.colorPicker.PICKER_HUE_H=150;
},onCancelClick:function(){
this.owner.setDataValue(this._initialValue);
this.owner.editor.closeDropDown();
},onOKClick:function(){
this.owner.editor.closeDropDown();
},reset:function(){
if(this.getValue()!=this.owner.getDataValue()){
this.setDijitValue(this.owner.isValid()?this.owner.getDataValue():"#FFFFFF");
}
this._initialValue=this.getValue();
this.owner.updateEditorColors();
},getValue:function(){
if(this.colorPicker){
return this.colorPicker.getValue();
}else{
return this._tmpValue;
}
},setDijitValue:function(_9d){
if(this.colorPicker){
if(_9d){
this.colorPicker.setColor(_9d);
}
}else{
this._tmpValue=_9d;
}
if(this.text&&_9d!=this.text.getDataValue()){
this.text.setDataValue(_9d);
}
},valueChange:function(_9e){
this._changed=true;
this.onChange(_9e);
},onExecute:function(){
},onChange:function(_9f){
},destroy:function(){
if(this.colorPicker){
this.colorPicker.destroyRecursive();
}
this.inherited(arguments);
}});
dojo.declare("wm.GradientPickerPanel",wm.Container,{border:"0",borderColor:"#888888",width:"500px",height:"200px",backgroundColor:"white",layoutKind:"top-to-bottom",verticalAlign:"top",horizontalAlign:"left",postInit:function(){
this.inherited(arguments);
var _a0=new wm.Panel({owner:this,parent:this,verticalAlign:"top",horizontalAlign:"left",width:"100%",height:"30px",layoutKind:"left-to-right"});
this.startColor=new wm.ColorPicker({name:"startColor",owner:this,parent:_a0,width:"100%",dataValue:this.dataValue.startColor});
this.endColor=new wm.ColorPicker({name:"endColor",owner:this,parent:_a0,width:"100%",dataValue:this.dataValue.endColor});
this.direction=new wm.SelectMenu({name:"direction",owner:this,parent:_a0,width:"100%",options:"vertical, horizontal",dataValue:this.dataValue.direction});
this.bottomPanel=new wm.Panel({owner:this,parent:this,verticalAlign:"top",horizontalAlign:"left",width:"100%",height:"100%",layoutKind:"left-to-right"});
this.colorStop=new wm.Slider({name:"colorStop",owner:this,parent:this.bottomPanel,width:"30px",height:"100%",captionPosition:"left",caption:"",verticalSlider:true,dataValue:this.dataValue.direction=="horizontal"?this.dataValue.colorStop:100-this.dataValue.colorStop});
this.connect(this.startColor,"onchange",this,"_onChange");
this.connect(this.endColor,"onchange",this,"_onChange");
this.connect(this.direction,"onchange",this,"_onDirectionChange");
this.connect(this.colorStop,"onchange",this,"_onChange");
this.html=new wm.Html({name:"html",owner:this,parent:this.bottomPanel,width:"100%",height:"100%",border:"1",borderColor:"black"});
this.buttonPanel=new wm.Panel({_classes:{domNode:["dialogfooter"]},owner:this,parent:this,verticalAlign:"top",horizontalAlign:"right",width:"100%",height:"30px",layoutKind:"left-to-right"});
this.okButton=new wm.Button({_classes:{domNode:["StudioButton","OKButton"]},owner:this,parent:this.buttonPanel,caption:"OK",width:"80px",onclick:dojo.hitch(this,"onOKClick")});
this.cancelButton=new wm.Button({_classes:{domNode:["StudioButton","CancelButton"]},owner:this,parent:this.buttonPanel,caption:"Cancel",width:"80px",onclick:dojo.hitch(this,"onCancelClick")});
wm.onidle(this,function(){
this.reflow();
this._cupdating=true;
this._onChange();
this._cupdating=false;
});
},onOKClick:function(){
this.owner.editor.closeDropDown();
},onCancelClick:function(){
this.owner.setEditorValue(this._initialValue);
this.owner.editor.closeDropDown();
},reset:function(){
this._cupdating=true;
this.startColor.setDataValue(this.owner.dataValue?this.owner.dataValue.startColor:"");
this.endColor.setDataValue(this.owner.dataValue?this.owner.dataValue.endColor:"");
this.direction.setDataValue(this.owner.dataValue?this.owner.dataValue.direction:"");
this.colorStop.setDataValue(this.owner.dataValue?(this.direction.getDataValue()=="vertical"?100-this.owner.dataValue.colorStop:this.owner.dataValue.colorStop):"");
this._initialValue=dojo.clone(this.owner.dataValue);
this._cupdating=false;
this.updateColorDisplay();
},onExecute:function(){
},_onDirectionChange:function(){
var _a1=this.direction.getDataValue();
if(_a1=="vertical"){
if(this.bottomPanel.layoutKind=="top-to-bottom"){
this.bottomPanel.setLayoutKind("left-to-right");
this.colorStop.setVerticalSlider(true);
this.colorStop.setHeight("100%");
this.colorStop.setWidth("30px");
this.colorStop.setDataValue(90);
}
}else{
if(this.bottomPanel.layoutKind=="left-to-right"){
this.bottomPanel.setLayoutKind("top-to-bottom");
this.colorStop.setVerticalSlider(false);
this.colorStop.setWidth("100%");
this.colorStop.setHeight("30px");
this.colorStop.setDataValue(10);
}
}
this._onChange();
},updateColorDisplay:function(){
var v=this.getDataValue();
var _a2=wm.getBackgroundStyle(v.startColor,v.endColor,v.colorStop,v.direction,"");
if(dojo.isIE<10){
this.html.domNode.style.filter=_a2;
}else{
this.html.domNode.style.background=_a2;
}
},getDataValue:function(){
var _a3=this.direction.getDataValue();
var _a4=_a3=="vertical"?100-this.colorStop.getDataValue():this.colorStop.getDataValue();
var _a5=this.startColor.getDataValue();
var _a6=this.endColor.getDataValue();
var _a7={direction:_a3,startColor:_a5,endColor:_a6,colorStop:_a4};
return _a7;
},_onChange:function(){
var v=this.getDataValue();
this.updateColorDisplay();
if(!this._cupdating){
this.owner.setEditorValue(v);
}
},destroy:function(){
if(this.colorPicker){
this.colorPicker.destroyRecursive();
}
this.inherited(arguments);
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_colorpicker",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
