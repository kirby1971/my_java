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

dojo.provide("wm.compressed.wm_charts");
if(!dojo._hasResource["dojox.gfx._base"]){
dojo._hasResource["dojox.gfx._base"]=true;
dojo.provide("dojox.gfx._base");
(function(){
var g=dojox.gfx,b=g._base;
g._hasClass=function(_1,_2){
var _3=_1.getAttribute("className");
return _3&&(" "+_3+" ").indexOf(" "+_2+" ")>=0;
};
g._addClass=function(_4,_5){
var _6=_4.getAttribute("className")||"";
if(!_6||(" "+_6+" ").indexOf(" "+_5+" ")<0){
_4.setAttribute("className",_6+(_6?" ":"")+_5);
}
};
g._removeClass=function(_7,_8){
var _9=_7.getAttribute("className");
if(_9){
_7.setAttribute("className",_9.replace(new RegExp("(^|\\s+)"+_8+"(\\s+|$)"),"$1$2"));
}
};
b._getFontMeasurements=function(){
var _a={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,"small":0,"medium":0,"large":0,"x-large":0,"xx-large":0};
if(dojo.isIE){
dojo.doc.documentElement.style.fontSize="100%";
}
var _b=dojo.create("div",{style:{position:"absolute",left:"0",top:"-100px",width:"30px",height:"1000em",borderWidth:"0",margin:"0",padding:"0",outline:"none",lineHeight:"1",overflow:"hidden"}},dojo.body());
for(var p in _a){
_b.style.fontSize=p;
_a[p]=Math.round(_b.offsetHeight*12/16)*16/12/1000;
}
dojo.body().removeChild(_b);
return _a;
};
var _c=null;
b._getCachedFontMeasurements=function(_d){
if(_d||!_c){
_c=b._getFontMeasurements();
}
return _c;
};
var _e=null,_f={};
b._getTextBox=function(_10,_11,_12){
var m,s,al=arguments.length;
if(!_e){
_e=dojo.create("div",{style:{position:"absolute",top:"-10000px",left:"0"}},dojo.body());
}
m=_e;
m.className="";
s=m.style;
s.borderWidth="0";
s.margin="0";
s.padding="0";
s.outline="0";
if(al>1&&_11){
for(var i in _11){
if(i in _f){
continue;
}
s[i]=_11[i];
}
}
if(al>2&&_12){
m.className=_12;
}
m.innerHTML=_10;
if(m["getBoundingClientRect"]){
var bcr=m.getBoundingClientRect();
return {l:bcr.left,t:bcr.top,w:bcr.width||(bcr.right-bcr.left),h:bcr.height||(bcr.bottom-bcr.top)};
}else{
return dojo.marginBox(m);
}
};
var _13=0;
b._getUniqueId=function(){
var id;
do{
id=dojo._scopeName+"Unique"+(++_13);
}while(dojo.byId(id));
return id;
};
})();
dojo.mixin(dojox.gfx,{defaultPath:{type:"path",path:""},defaultPolyline:{type:"polyline",points:[]},defaultRect:{type:"rect",x:0,y:0,width:100,height:100,r:0},defaultEllipse:{type:"ellipse",cx:0,cy:0,rx:200,ry:100},defaultCircle:{type:"circle",cx:0,cy:0,r:100},defaultLine:{type:"line",x1:0,y1:0,x2:100,y2:100},defaultImage:{type:"image",x:0,y:0,width:0,height:0,src:""},defaultText:{type:"text",x:0,y:0,text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultTextPath:{type:"textpath",text:"",align:"start",decoration:"none",rotated:false,kerning:true},defaultStroke:{type:"stroke",color:"black",style:"solid",width:1,cap:"butt",join:4},defaultLinearGradient:{type:"linear",x1:0,y1:0,x2:100,y2:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultRadialGradient:{type:"radial",cx:0,cy:0,r:100,colors:[{offset:0,color:"black"},{offset:1,color:"white"}]},defaultPattern:{type:"pattern",x:0,y:0,width:0,height:0,src:""},defaultFont:{type:"font",style:"normal",variant:"normal",weight:"normal",size:"10pt",family:"serif"},getDefault:(function(){
var _14={};
return function(_15){
var t=_14[_15];
if(t){
return new t();
}
t=_14[_15]=new Function;
t.prototype=dojox.gfx["default"+_15];
return new t();
};
})(),normalizeColor:function(_16){
return (_16 instanceof dojo.Color)?_16:new dojo.Color(_16);
},normalizeParameters:function(_17,_18){
if(_18){
var _19={};
for(var x in _17){
if(x in _18&&!(x in _19)){
_17[x]=_18[x];
}
}
}
return _17;
},makeParameters:function(_1a,_1b){
if(!_1b){
return dojo.delegate(_1a);
}
var _1c={};
for(var i in _1a){
if(!(i in _1c)){
_1c[i]=dojo.clone((i in _1b)?_1b[i]:_1a[i]);
}
}
return _1c;
},formatNumber:function(x,_1d){
var val=x.toString();
if(val.indexOf("e")>=0){
val=x.toFixed(4);
}else{
var _1e=val.indexOf(".");
if(_1e>=0&&val.length-_1e>5){
val=x.toFixed(4);
}
}
if(x<0){
return val;
}
return _1d?" "+val:val;
},makeFontString:function(_1f){
return _1f.style+" "+_1f.variant+" "+_1f.weight+" "+_1f.size+" "+_1f.family;
},splitFontString:function(str){
var _20=dojox.gfx.getDefault("Font");
var t=str.split(/\s+/);
do{
if(t.length<5){
break;
}
_20.style=t[0];
_20.variant=t[1];
_20.weight=t[2];
var i=t[3].indexOf("/");
_20.size=i<0?t[3]:t[3].substring(0,i);
var j=4;
if(i<0){
if(t[4]=="/"){
j=6;
}else{
if(t[4].charAt(0)=="/"){
j=5;
}
}
}
if(j<t.length){
_20.family=t.slice(j).join(" ");
}
}while(false);
return _20;
},cm_in_pt:72/2.54,mm_in_pt:7.2/2.54,px_in_pt:function(){
return dojox.gfx._base._getCachedFontMeasurements()["12pt"]/12;
},pt2px:function(len){
return len*dojox.gfx.px_in_pt();
},px2pt:function(len){
return len/dojox.gfx.px_in_pt();
},normalizedLength:function(len){
if(len.length==0){
return 0;
}
if(len.length>2){
var _21=dojox.gfx.px_in_pt();
var val=parseFloat(len);
switch(len.slice(-2)){
case "px":
return val;
case "pt":
return val*_21;
case "in":
return val*72*_21;
case "pc":
return val*12*_21;
case "mm":
return val*dojox.gfx.mm_in_pt*_21;
case "cm":
return val*dojox.gfx.cm_in_pt*_21;
}
}
return parseFloat(len);
},pathVmlRegExp:/([A-Za-z]+)|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,pathSvgRegExp:/([A-Za-z])|(\d+(\.\d+)?)|(\.\d+)|(-\d+(\.\d+)?)|(-\.\d+)/g,equalSources:function(a,b){
return a&&b&&a==b;
},switchTo:function(_22){
var ns=dojox.gfx[_22];
if(ns){
dojo.forEach(["Group","Rect","Ellipse","Circle","Line","Polyline","Image","Text","Path","TextPath","Surface","createSurface"],function(_23){
dojox.gfx[_23]=ns[_23];
});
}
}});
}
if(!dojo._hasResource["dojox.gfx.shape"]){
dojo._hasResource["dojox.gfx.shape"]=true;
dojo.provide("dojox.gfx.shape");
dojo.declare("dojox.gfx.shape.Shape",null,{constructor:function(){
this.rawNode=null;
this.shape=null;
this.matrix=null;
this.fillStyle=null;
this.strokeStyle=null;
this.bbox=null;
this.parent=null;
this.parentMatrix=null;
},getNode:function(){
return this.rawNode;
},getShape:function(){
return this.shape;
},getTransform:function(){
return this.matrix;
},getFill:function(){
return this.fillStyle;
},getStroke:function(){
return this.strokeStyle;
},getParent:function(){
return this.parent;
},getBoundingBox:function(){
return this.bbox;
},getTransformedBoundingBox:function(){
var b=this.getBoundingBox();
if(!b){
return null;
}
var m=this._getRealMatrix();
gm=dojox.gfx.matrix;
return [gm.multiplyPoint(m,b.x,b.y),gm.multiplyPoint(m,b.x+b.width,b.y),gm.multiplyPoint(m,b.x+b.width,b.y+b.height),gm.multiplyPoint(m,b.x,b.y+b.height)];
},getEventSource:function(){
return this.rawNode;
},setShape:function(_24){
this.shape=dojox.gfx.makeParameters(this.shape,_24);
this.bbox=null;
return this;
},setFill:function(_25){
if(!_25){
this.fillStyle=null;
return this;
}
var f=null;
if(typeof (_25)=="object"&&"type" in _25){
switch(_25.type){
case "linear":
f=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,_25);
break;
case "radial":
f=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,_25);
break;
case "pattern":
f=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,_25);
break;
}
}else{
f=dojox.gfx.normalizeColor(_25);
}
this.fillStyle=f;
return this;
},setStroke:function(_26){
if(!_26){
this.strokeStyle=null;
return this;
}
if(typeof _26=="string"||dojo.isArray(_26)||_26 instanceof dojo.Color){
_26={color:_26};
}
var s=this.strokeStyle=dojox.gfx.makeParameters(dojox.gfx.defaultStroke,_26);
s.color=dojox.gfx.normalizeColor(s.color);
return this;
},setTransform:function(_27){
this.matrix=dojox.gfx.matrix.clone(_27?dojox.gfx.matrix.normalize(_27):dojox.gfx.matrix.identity);
return this._applyTransform();
},_applyTransform:function(){
return this;
},moveToFront:function(){
var p=this.getParent();
if(p){
p._moveChildToFront(this);
this._moveToFront();
}
return this;
},moveToBack:function(){
var p=this.getParent();
if(p){
p._moveChildToBack(this);
this._moveToBack();
}
return this;
},_moveToFront:function(){
},_moveToBack:function(){
},applyRightTransform:function(_28){
return _28?this.setTransform([this.matrix,_28]):this;
},applyLeftTransform:function(_29){
return _29?this.setTransform([_29,this.matrix]):this;
},applyTransform:function(_2a){
return _2a?this.setTransform([this.matrix,_2a]):this;
},removeShape:function(_2b){
if(this.parent){
this.parent.remove(this,_2b);
}
return this;
},_setParent:function(_2c,_2d){
this.parent=_2c;
return this._updateParentMatrix(_2d);
},_updateParentMatrix:function(_2e){
this.parentMatrix=_2e?dojox.gfx.matrix.clone(_2e):null;
return this._applyTransform();
},_getRealMatrix:function(){
var m=this.matrix;
var p=this.parent;
while(p){
if(p.matrix){
m=dojox.gfx.matrix.multiply(p.matrix,m);
}
p=p.parent;
}
return m;
}});
dojox.gfx.shape._eventsProcessing={connect:function(_2f,_30,_31){
return arguments.length>2?dojo.connect(this.getEventSource(),_2f,_30,_31):dojo.connect(this.getEventSource(),_2f,_30);
},disconnect:function(_32){
dojo.disconnect(_32);
}};
dojo.extend(dojox.gfx.shape.Shape,dojox.gfx.shape._eventsProcessing);
dojox.gfx.shape.Container={_init:function(){
this.children=[];
},openBatch:function(){
},closeBatch:function(){
},add:function(_33){
var _34=_33.getParent();
if(_34){
_34.remove(_33,true);
}
this.children.push(_33);
return _33._setParent(this,this._getRealMatrix());
},remove:function(_35,_36){
for(var i=0;i<this.children.length;++i){
if(this.children[i]==_35){
if(_36){
}else{
_35.parent=null;
_35.parentMatrix=null;
}
this.children.splice(i,1);
break;
}
}
return this;
},clear:function(){
this.children=[];
return this;
},_moveChildToFront:function(_37){
for(var i=0;i<this.children.length;++i){
if(this.children[i]==_37){
this.children.splice(i,1);
this.children.push(_37);
break;
}
}
return this;
},_moveChildToBack:function(_38){
for(var i=0;i<this.children.length;++i){
if(this.children[i]==_38){
this.children.splice(i,1);
this.children.unshift(_38);
break;
}
}
return this;
}};
dojo.declare("dojox.gfx.shape.Surface",null,{constructor:function(){
this.rawNode=null;
this._parent=null;
this._nodes=[];
this._events=[];
},destroy:function(){
dojo.forEach(this._nodes,dojo.destroy);
this._nodes=[];
dojo.forEach(this._events,dojo.disconnect);
this._events=[];
this.rawNode=null;
if(dojo.isIE){
while(this._parent.lastChild){
dojo.destroy(this._parent.lastChild);
}
}else{
this._parent.innerHTML="";
}
this._parent=null;
},getEventSource:function(){
return this.rawNode;
},_getRealMatrix:function(){
return null;
},isLoaded:true,onLoad:function(_39){
},whenLoaded:function(_3a,_3b){
var f=dojo.hitch(_3a,_3b);
if(this.isLoaded){
f(this);
}else{
var h=dojo.connect(this,"onLoad",function(_3c){
dojo.disconnect(h);
f(_3c);
});
}
}});
dojo.extend(dojox.gfx.shape.Surface,dojox.gfx.shape._eventsProcessing);
dojo.declare("dojox.gfx.Point",null,{});
dojo.declare("dojox.gfx.Rectangle",null,{});
dojo.declare("dojox.gfx.shape.Rect",dojox.gfx.shape.Shape,{constructor:function(_3d){
this.shape=dojox.gfx.getDefault("Rect");
this.rawNode=_3d;
},getBoundingBox:function(){
return this.shape;
}});
dojo.declare("dojox.gfx.shape.Ellipse",dojox.gfx.shape.Shape,{constructor:function(_3e){
this.shape=dojox.gfx.getDefault("Ellipse");
this.rawNode=_3e;
},getBoundingBox:function(){
if(!this.bbox){
var _3f=this.shape;
this.bbox={x:_3f.cx-_3f.rx,y:_3f.cy-_3f.ry,width:2*_3f.rx,height:2*_3f.ry};
}
return this.bbox;
}});
dojo.declare("dojox.gfx.shape.Circle",dojox.gfx.shape.Shape,{constructor:function(_40){
this.shape=dojox.gfx.getDefault("Circle");
this.rawNode=_40;
},getBoundingBox:function(){
if(!this.bbox){
var _41=this.shape;
this.bbox={x:_41.cx-_41.r,y:_41.cy-_41.r,width:2*_41.r,height:2*_41.r};
}
return this.bbox;
}});
dojo.declare("dojox.gfx.shape.Line",dojox.gfx.shape.Shape,{constructor:function(_42){
this.shape=dojox.gfx.getDefault("Line");
this.rawNode=_42;
},getBoundingBox:function(){
if(!this.bbox){
var _43=this.shape;
this.bbox={x:Math.min(_43.x1,_43.x2),y:Math.min(_43.y1,_43.y2),width:Math.abs(_43.x2-_43.x1),height:Math.abs(_43.y2-_43.y1)};
}
return this.bbox;
}});
dojo.declare("dojox.gfx.shape.Polyline",dojox.gfx.shape.Shape,{constructor:function(_44){
this.shape=dojox.gfx.getDefault("Polyline");
this.rawNode=_44;
},setShape:function(_45,_46){
if(_45&&_45 instanceof Array){
this.inherited(arguments,[{points:_45}]);
if(_46&&this.shape.points.length){
this.shape.points.push(this.shape.points[0]);
}
}else{
this.inherited(arguments,[_45]);
}
return this;
},_normalizePoints:function(){
var p=this.shape.points,l=p&&p.length;
if(l&&typeof p[0]=="number"){
var _47=[];
for(var i=0;i<l;i+=2){
_47.push({x:p[i],y:p[i+1]});
}
this.shape.points=_47;
}
},getBoundingBox:function(){
if(!this.bbox&&this.shape.points.length){
var p=this.shape.points;
var l=p.length;
var t=p[0];
var _48={l:t.x,t:t.y,r:t.x,b:t.y};
for(var i=1;i<l;++i){
t=p[i];
if(_48.l>t.x){
_48.l=t.x;
}
if(_48.r<t.x){
_48.r=t.x;
}
if(_48.t>t.y){
_48.t=t.y;
}
if(_48.b<t.y){
_48.b=t.y;
}
}
this.bbox={x:_48.l,y:_48.t,width:_48.r-_48.l,height:_48.b-_48.t};
}
return this.bbox;
}});
dojo.declare("dojox.gfx.shape.Image",dojox.gfx.shape.Shape,{constructor:function(_49){
this.shape=dojox.gfx.getDefault("Image");
this.rawNode=_49;
},getBoundingBox:function(){
return this.shape;
},setStroke:function(){
return this;
},setFill:function(){
return this;
}});
dojo.declare("dojox.gfx.shape.Text",dojox.gfx.shape.Shape,{constructor:function(_4a){
this.fontStyle=null;
this.shape=dojox.gfx.getDefault("Text");
this.rawNode=_4a;
},getFont:function(){
return this.fontStyle;
},setFont:function(_4b){
this.fontStyle=typeof _4b=="string"?dojox.gfx.splitFontString(_4b):dojox.gfx.makeParameters(dojox.gfx.defaultFont,_4b);
this._setFont();
return this;
}});
dojox.gfx.shape.Creator={createShape:function(_4c){
var gfx=dojox.gfx;
switch(_4c.type){
case gfx.defaultPath.type:
return this.createPath(_4c);
case gfx.defaultRect.type:
return this.createRect(_4c);
case gfx.defaultCircle.type:
return this.createCircle(_4c);
case gfx.defaultEllipse.type:
return this.createEllipse(_4c);
case gfx.defaultLine.type:
return this.createLine(_4c);
case gfx.defaultPolyline.type:
return this.createPolyline(_4c);
case gfx.defaultImage.type:
return this.createImage(_4c);
case gfx.defaultText.type:
return this.createText(_4c);
case gfx.defaultTextPath.type:
return this.createTextPath(_4c);
}
return null;
},createGroup:function(){
return this.createObject(dojox.gfx.Group);
},createRect:function(_4d){
return this.createObject(dojox.gfx.Rect,_4d);
},createEllipse:function(_4e){
return this.createObject(dojox.gfx.Ellipse,_4e);
},createCircle:function(_4f){
return this.createObject(dojox.gfx.Circle,_4f);
},createLine:function(_50){
return this.createObject(dojox.gfx.Line,_50);
},createPolyline:function(_51){
return this.createObject(dojox.gfx.Polyline,_51);
},createImage:function(_52){
return this.createObject(dojox.gfx.Image,_52);
},createText:function(_53){
return this.createObject(dojox.gfx.Text,_53);
},createPath:function(_54){
return this.createObject(dojox.gfx.Path,_54);
},createTextPath:function(_55){
return this.createObject(dojox.gfx.TextPath,{}).setText(_55);
},createObject:function(_56,_57){
return null;
}};
}
if(!dojo._hasResource["dojox.gfx.matrix"]){
dojo._hasResource["dojox.gfx.matrix"]=true;
dojo.provide("dojox.gfx.matrix");
(function(){
var m=dojox.gfx.matrix;
var _58={};
m._degToRad=function(_59){
return _58[_59]||(_58[_59]=(Math.PI*_59/180));
};
m._radToDeg=function(_5a){
return _5a/Math.PI*180;
};
m.Matrix2D=function(arg){
if(arg){
if(typeof arg=="number"){
this.xx=this.yy=arg;
}else{
if(arg instanceof Array){
if(arg.length>0){
var _5b=m.normalize(arg[0]);
for(var i=1;i<arg.length;++i){
var l=_5b,r=dojox.gfx.matrix.normalize(arg[i]);
_5b=new m.Matrix2D();
_5b.xx=l.xx*r.xx+l.xy*r.yx;
_5b.xy=l.xx*r.xy+l.xy*r.yy;
_5b.yx=l.yx*r.xx+l.yy*r.yx;
_5b.yy=l.yx*r.xy+l.yy*r.yy;
_5b.dx=l.xx*r.dx+l.xy*r.dy+l.dx;
_5b.dy=l.yx*r.dx+l.yy*r.dy+l.dy;
}
dojo.mixin(this,_5b);
}
}else{
dojo.mixin(this,arg);
}
}
}
};
dojo.extend(m.Matrix2D,{xx:1,xy:0,yx:0,yy:1,dx:0,dy:0});
dojo.mixin(m,{identity:new m.Matrix2D(),flipX:new m.Matrix2D({xx:-1}),flipY:new m.Matrix2D({yy:-1}),flipXY:new m.Matrix2D({xx:-1,yy:-1}),translate:function(a,b){
if(arguments.length>1){
return new m.Matrix2D({dx:a,dy:b});
}
return new m.Matrix2D({dx:a.x,dy:a.y});
},scale:function(a,b){
if(arguments.length>1){
return new m.Matrix2D({xx:a,yy:b});
}
if(typeof a=="number"){
return new m.Matrix2D({xx:a,yy:a});
}
return new m.Matrix2D({xx:a.x,yy:a.y});
},rotate:function(_5c){
var c=Math.cos(_5c);
var s=Math.sin(_5c);
return new m.Matrix2D({xx:c,xy:-s,yx:s,yy:c});
},rotateg:function(_5d){
return m.rotate(m._degToRad(_5d));
},skewX:function(_5e){
return new m.Matrix2D({xy:Math.tan(_5e)});
},skewXg:function(_5f){
return m.skewX(m._degToRad(_5f));
},skewY:function(_60){
return new m.Matrix2D({yx:Math.tan(_60)});
},skewYg:function(_61){
return m.skewY(m._degToRad(_61));
},reflect:function(a,b){
if(arguments.length==1){
b=a.y;
a=a.x;
}
var a2=a*a,b2=b*b,n2=a2+b2,xy=2*a*b/n2;
return new m.Matrix2D({xx:2*a2/n2-1,xy:xy,yx:xy,yy:2*b2/n2-1});
},project:function(a,b){
if(arguments.length==1){
b=a.y;
a=a.x;
}
var a2=a*a,b2=b*b,n2=a2+b2,xy=a*b/n2;
return new m.Matrix2D({xx:a2/n2,xy:xy,yx:xy,yy:b2/n2});
},normalize:function(_62){
return (_62 instanceof m.Matrix2D)?_62:new m.Matrix2D(_62);
},clone:function(_63){
var obj=new m.Matrix2D();
for(var i in _63){
if(typeof (_63[i])=="number"&&typeof (obj[i])=="number"&&obj[i]!=_63[i]){
obj[i]=_63[i];
}
}
return obj;
},invert:function(_64){
var M=m.normalize(_64),D=M.xx*M.yy-M.xy*M.yx,M=new m.Matrix2D({xx:M.yy/D,xy:-M.xy/D,yx:-M.yx/D,yy:M.xx/D,dx:(M.xy*M.dy-M.yy*M.dx)/D,dy:(M.yx*M.dx-M.xx*M.dy)/D});
return M;
},_multiplyPoint:function(_65,x,y){
return {x:_65.xx*x+_65.xy*y+_65.dx,y:_65.yx*x+_65.yy*y+_65.dy};
},multiplyPoint:function(_66,a,b){
var M=m.normalize(_66);
if(typeof a=="number"&&typeof b=="number"){
return m._multiplyPoint(M,a,b);
}
return m._multiplyPoint(M,a.x,a.y);
},multiply:function(_67){
var M=m.normalize(_67);
for(var i=1;i<arguments.length;++i){
var l=M,r=m.normalize(arguments[i]);
M=new m.Matrix2D();
M.xx=l.xx*r.xx+l.xy*r.yx;
M.xy=l.xx*r.xy+l.xy*r.yy;
M.yx=l.yx*r.xx+l.yy*r.yx;
M.yy=l.yx*r.xy+l.yy*r.yy;
M.dx=l.xx*r.dx+l.xy*r.dy+l.dx;
M.dy=l.yx*r.dx+l.yy*r.dy+l.dy;
}
return M;
},_sandwich:function(_68,x,y){
return m.multiply(m.translate(x,y),_68,m.translate(-x,-y));
},scaleAt:function(a,b,c,d){
switch(arguments.length){
case 4:
return m._sandwich(m.scale(a,b),c,d);
case 3:
if(typeof c=="number"){
return m._sandwich(m.scale(a),b,c);
}
return m._sandwich(m.scale(a,b),c.x,c.y);
}
return m._sandwich(m.scale(a),b.x,b.y);
},rotateAt:function(_69,a,b){
if(arguments.length>2){
return m._sandwich(m.rotate(_69),a,b);
}
return m._sandwich(m.rotate(_69),a.x,a.y);
},rotategAt:function(_6a,a,b){
if(arguments.length>2){
return m._sandwich(m.rotateg(_6a),a,b);
}
return m._sandwich(m.rotateg(_6a),a.x,a.y);
},skewXAt:function(_6b,a,b){
if(arguments.length>2){
return m._sandwich(m.skewX(_6b),a,b);
}
return m._sandwich(m.skewX(_6b),a.x,a.y);
},skewXgAt:function(_6c,a,b){
if(arguments.length>2){
return m._sandwich(m.skewXg(_6c),a,b);
}
return m._sandwich(m.skewXg(_6c),a.x,a.y);
},skewYAt:function(_6d,a,b){
if(arguments.length>2){
return m._sandwich(m.skewY(_6d),a,b);
}
return m._sandwich(m.skewY(_6d),a.x,a.y);
},skewYgAt:function(_6e,a,b){
if(arguments.length>2){
return m._sandwich(m.skewYg(_6e),a,b);
}
return m._sandwich(m.skewYg(_6e),a.x,a.y);
}});
})();
dojox.gfx.Matrix2D=dojox.gfx.matrix.Matrix2D;
}
if(!dojo._hasResource["dojox.gfx.path"]){
dojo._hasResource["dojox.gfx.path"]=true;
dojo.provide("dojox.gfx.path");
dojo.declare("dojox.gfx.path.Path",dojox.gfx.shape.Shape,{constructor:function(_6f){
this.shape=dojo.clone(dojox.gfx.defaultPath);
this.segments=[];
this.tbbox=null;
this.absolute=true;
this.last={};
this.rawNode=_6f;
this.segmented=false;
},setAbsoluteMode:function(_70){
this._confirmSegmented();
this.absolute=typeof _70=="string"?(_70=="absolute"):_70;
return this;
},getAbsoluteMode:function(){
this._confirmSegmented();
return this.absolute;
},getBoundingBox:function(){
this._confirmSegmented();
return (this.bbox&&("l" in this.bbox))?{x:this.bbox.l,y:this.bbox.t,width:this.bbox.r-this.bbox.l,height:this.bbox.b-this.bbox.t}:null;
},_getRealBBox:function(){
this._confirmSegmented();
if(this.tbbox){
return this.tbbox;
}
var _71=this.bbox,_72=this._getRealMatrix();
this.bbox=null;
for(var i=0,len=this.segments.length;i<len;++i){
this._updateWithSegment(this.segments[i],_72);
}
var t=this.bbox;
this.bbox=_71;
this.tbbox=t?[{x:t.l,y:t.t},{x:t.r,y:t.t},{x:t.r,y:t.b},{x:t.l,y:t.b}]:null;
return this.tbbox;
},getLastPosition:function(){
this._confirmSegmented();
return "x" in this.last?this.last:null;
},_applyTransform:function(){
this.tbbox=null;
return this.inherited(arguments);
},_updateBBox:function(x,y,_73){
if(_73){
var t=dojox.gfx.matrix.multiplyPoint(_73,x,y);
x=t.x;
y=t.y;
}
if(this.bbox&&("l" in this.bbox)){
if(this.bbox.l>x){
this.bbox.l=x;
}
if(this.bbox.r<x){
this.bbox.r=x;
}
if(this.bbox.t>y){
this.bbox.t=y;
}
if(this.bbox.b<y){
this.bbox.b=y;
}
}else{
this.bbox={l:x,b:y,r:x,t:y};
}
},_updateWithSegment:function(_74,_75){
var n=_74.args,l=n.length;
switch(_74.action){
case "M":
case "L":
case "C":
case "S":
case "Q":
case "T":
for(var i=0;i<l;i+=2){
this._updateBBox(n[i],n[i+1],_75);
}
this.last.x=n[l-2];
this.last.y=n[l-1];
this.absolute=true;
break;
case "H":
for(var i=0;i<l;++i){
this._updateBBox(n[i],this.last.y,_75);
}
this.last.x=n[l-1];
this.absolute=true;
break;
case "V":
for(var i=0;i<l;++i){
this._updateBBox(this.last.x,n[i],_75);
}
this.last.y=n[l-1];
this.absolute=true;
break;
case "m":
var _76=0;
if(!("x" in this.last)){
this._updateBBox(this.last.x=n[0],this.last.y=n[1],_75);
_76=2;
}
for(var i=_76;i<l;i+=2){
this._updateBBox(this.last.x+=n[i],this.last.y+=n[i+1],_75);
}
this.absolute=false;
break;
case "l":
case "t":
for(var i=0;i<l;i+=2){
this._updateBBox(this.last.x+=n[i],this.last.y+=n[i+1],_75);
}
this.absolute=false;
break;
case "h":
for(var i=0;i<l;++i){
this._updateBBox(this.last.x+=n[i],this.last.y,_75);
}
this.absolute=false;
break;
case "v":
for(var i=0;i<l;++i){
this._updateBBox(this.last.x,this.last.y+=n[i],_75);
}
this.absolute=false;
break;
case "c":
for(var i=0;i<l;i+=6){
this._updateBBox(this.last.x+n[i],this.last.y+n[i+1],_75);
this._updateBBox(this.last.x+n[i+2],this.last.y+n[i+3],_75);
this._updateBBox(this.last.x+=n[i+4],this.last.y+=n[i+5],_75);
}
this.absolute=false;
break;
case "s":
case "q":
for(var i=0;i<l;i+=4){
this._updateBBox(this.last.x+n[i],this.last.y+n[i+1],_75);
this._updateBBox(this.last.x+=n[i+2],this.last.y+=n[i+3],_75);
}
this.absolute=false;
break;
case "A":
for(var i=0;i<l;i+=7){
this._updateBBox(n[i+5],n[i+6],_75);
}
this.last.x=n[l-2];
this.last.y=n[l-1];
this.absolute=true;
break;
case "a":
for(var i=0;i<l;i+=7){
this._updateBBox(this.last.x+=n[i+5],this.last.y+=n[i+6],_75);
}
this.absolute=false;
break;
}
var _77=[_74.action];
for(var i=0;i<l;++i){
_77.push(dojox.gfx.formatNumber(n[i],true));
}
if(typeof this.shape.path=="string"){
this.shape.path+=_77.join("");
}else{
Array.prototype.push.apply(this.shape.path,_77);
}
},_validSegments:{m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},_pushSegment:function(_78,_79){
this.tbbox=null;
var _7a=this._validSegments[_78.toLowerCase()];
if(typeof _7a=="number"){
if(_7a){
if(_79.length>=_7a){
var _7b={action:_78,args:_79.slice(0,_79.length-_79.length%_7a)};
this.segments.push(_7b);
this._updateWithSegment(_7b);
}
}else{
var _7b={action:_78,args:[]};
this.segments.push(_7b);
this._updateWithSegment(_7b);
}
}
},_collectArgs:function(_7c,_7d){
for(var i=0;i<_7d.length;++i){
var t=_7d[i];
if(typeof t=="boolean"){
_7c.push(t?1:0);
}else{
if(typeof t=="number"){
_7c.push(t);
}else{
if(t instanceof Array){
this._collectArgs(_7c,t);
}else{
if("x" in t&&"y" in t){
_7c.push(t.x,t.y);
}
}
}
}
}
},moveTo:function(){
this._confirmSegmented();
var _7e=[];
this._collectArgs(_7e,arguments);
this._pushSegment(this.absolute?"M":"m",_7e);
return this;
},lineTo:function(){
this._confirmSegmented();
var _7f=[];
this._collectArgs(_7f,arguments);
this._pushSegment(this.absolute?"L":"l",_7f);
return this;
},hLineTo:function(){
this._confirmSegmented();
var _80=[];
this._collectArgs(_80,arguments);
this._pushSegment(this.absolute?"H":"h",_80);
return this;
},vLineTo:function(){
this._confirmSegmented();
var _81=[];
this._collectArgs(_81,arguments);
this._pushSegment(this.absolute?"V":"v",_81);
return this;
},curveTo:function(){
this._confirmSegmented();
var _82=[];
this._collectArgs(_82,arguments);
this._pushSegment(this.absolute?"C":"c",_82);
return this;
},smoothCurveTo:function(){
this._confirmSegmented();
var _83=[];
this._collectArgs(_83,arguments);
this._pushSegment(this.absolute?"S":"s",_83);
return this;
},qCurveTo:function(){
this._confirmSegmented();
var _84=[];
this._collectArgs(_84,arguments);
this._pushSegment(this.absolute?"Q":"q",_84);
return this;
},qSmoothCurveTo:function(){
this._confirmSegmented();
var _85=[];
this._collectArgs(_85,arguments);
this._pushSegment(this.absolute?"T":"t",_85);
return this;
},arcTo:function(){
this._confirmSegmented();
var _86=[];
this._collectArgs(_86,arguments);
this._pushSegment(this.absolute?"A":"a",_86);
return this;
},closePath:function(){
this._confirmSegmented();
this._pushSegment("Z",[]);
return this;
},_confirmSegmented:function(){
if(!this.segmented){
var _87=this.shape.path;
this.shape.path=[];
this._setPath(_87);
this.shape.path=this.shape.path.join("");
this.segmented=true;
}
},_setPath:function(_88){
var p=dojo.isArray(_88)?_88:_88.match(dojox.gfx.pathSvgRegExp);
this.segments=[];
this.absolute=true;
this.bbox={};
this.last={};
if(!p){
return;
}
var _89="",_8a=[],l=p.length;
for(var i=0;i<l;++i){
var t=p[i],x=parseFloat(t);
if(isNaN(x)){
if(_89){
this._pushSegment(_89,_8a);
}
_8a=[];
_89=t;
}else{
_8a.push(x);
}
}
this._pushSegment(_89,_8a);
},setShape:function(_8b){
this.inherited(arguments,[typeof _8b=="string"?{path:_8b}:_8b]);
this.segmented=false;
this.segments=[];
if(!dojox.gfx.lazyPathSegmentation){
this._confirmSegmented();
}
return this;
},_2PI:Math.PI*2});
dojo.declare("dojox.gfx.path.TextPath",dojox.gfx.path.Path,{constructor:function(_8c){
if(!("text" in this)){
this.text=dojo.clone(dojox.gfx.defaultTextPath);
}
if(!("fontStyle" in this)){
this.fontStyle=dojo.clone(dojox.gfx.defaultFont);
}
},getText:function(){
return this.text;
},setText:function(_8d){
this.text=dojox.gfx.makeParameters(this.text,typeof _8d=="string"?{text:_8d}:_8d);
this._setText();
return this;
},getFont:function(){
return this.fontStyle;
},setFont:function(_8e){
this.fontStyle=typeof _8e=="string"?dojox.gfx.splitFontString(_8e):dojox.gfx.makeParameters(dojox.gfx.defaultFont,_8e);
this._setFont();
return this;
}});
}
if(!dojo._hasResource["dojox.gfx.svg"]){
dojo._hasResource["dojox.gfx.svg"]=true;
dojo.provide("dojox.gfx.svg");
(function(){
var d=dojo,g=dojox.gfx,gs=g.shape,svg=g.svg;
svg.useSvgWeb=(typeof window.svgweb!="undefined");
function _8f(ns,_90){
if(dojo.doc.createElementNS){
return dojo.doc.createElementNS(ns,_90);
}else{
return dojo.doc.createElement(_90);
}
};
function _91(_92){
if(svg.useSvgWeb){
return dojo.doc.createTextNode(_92,true);
}else{
return dojo.doc.createTextNode(_92);
}
};
function _93(){
if(svg.useSvgWeb){
return dojo.doc.createDocumentFragment(true);
}else{
return dojo.doc.createDocumentFragment();
}
};
svg.xmlns={xlink:"http://www.w3.org/1999/xlink",svg:"http://www.w3.org/2000/svg"};
svg.getRef=function(_94){
if(!_94||_94=="none"){
return null;
}
if(_94.match(/^url\(#.+\)$/)){
return d.byId(_94.slice(5,-1));
}
if(_94.match(/^#dojoUnique\d+$/)){
return d.byId(_94.slice(1));
}
return null;
};
svg.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};
d.declare("dojox.gfx.svg.Shape",gs.Shape,{setFill:function(_95){
if(!_95){
this.fillStyle=null;
this.rawNode.setAttribute("fill","none");
this.rawNode.setAttribute("fill-opacity",0);
return this;
}
var f;
var _96=function(x){
this.setAttribute(x,f[x].toFixed(8));
};
if(typeof (_95)=="object"&&"type" in _95){
switch(_95.type){
case "linear":
f=g.makeParameters(g.defaultLinearGradient,_95);
var _97=this._setFillObject(f,"linearGradient");
d.forEach(["x1","y1","x2","y2"],_96,_97);
break;
case "radial":
f=g.makeParameters(g.defaultRadialGradient,_95);
var _97=this._setFillObject(f,"radialGradient");
d.forEach(["cx","cy","r"],_96,_97);
break;
case "pattern":
f=g.makeParameters(g.defaultPattern,_95);
var _98=this._setFillObject(f,"pattern");
d.forEach(["x","y","width","height"],_96,_98);
break;
}
this.fillStyle=f;
return this;
}
var f=g.normalizeColor(_95);
this.fillStyle=f;
this.rawNode.setAttribute("fill",f.toCss());
this.rawNode.setAttribute("fill-opacity",f.a);
this.rawNode.setAttribute("fill-rule","evenodd");
return this;
},setStroke:function(_99){
var rn=this.rawNode;
if(!_99){
this.strokeStyle=null;
rn.setAttribute("stroke","none");
rn.setAttribute("stroke-opacity",0);
return this;
}
if(typeof _99=="string"||d.isArray(_99)||_99 instanceof d.Color){
_99={color:_99};
}
var s=this.strokeStyle=g.makeParameters(g.defaultStroke,_99);
s.color=g.normalizeColor(s.color);
if(s){
rn.setAttribute("stroke",s.color.toCss());
rn.setAttribute("stroke-opacity",s.color.a);
rn.setAttribute("stroke-width",s.width);
rn.setAttribute("stroke-linecap",s.cap);
if(typeof s.join=="number"){
rn.setAttribute("stroke-linejoin","miter");
rn.setAttribute("stroke-miterlimit",s.join);
}else{
rn.setAttribute("stroke-linejoin",s.join);
}
var da=s.style.toLowerCase();
if(da in svg.dasharray){
da=svg.dasharray[da];
}
if(da instanceof Array){
da=d._toArray(da);
for(var i=0;i<da.length;++i){
da[i]*=s.width;
}
if(s.cap!="butt"){
for(var i=0;i<da.length;i+=2){
da[i]-=s.width;
if(da[i]<1){
da[i]=1;
}
}
for(var i=1;i<da.length;i+=2){
da[i]+=s.width;
}
}
da=da.join(",");
}
rn.setAttribute("stroke-dasharray",da);
rn.setAttribute("dojoGfxStrokeStyle",s.style);
}
return this;
},_getParentSurface:function(){
var _9a=this.parent;
for(;_9a&&!(_9a instanceof g.Surface);_9a=_9a.parent){
}
return _9a;
},_setFillObject:function(f,_9b){
var _9c=svg.xmlns.svg;
this.fillStyle=f;
var _9d=this._getParentSurface(),_9e=_9d.defNode,_9f=this.rawNode.getAttribute("fill"),ref=svg.getRef(_9f);
if(ref){
_9f=ref;
if(_9f.tagName.toLowerCase()!=_9b.toLowerCase()){
var id=_9f.id;
_9f.parentNode.removeChild(_9f);
_9f=_8f(_9c,_9b);
_9f.setAttribute("id",id);
_9e.appendChild(_9f);
}else{
while(_9f.childNodes.length){
_9f.removeChild(_9f.lastChild);
}
}
}else{
_9f=_8f(_9c,_9b);
_9f.setAttribute("id",g._base._getUniqueId());
_9e.appendChild(_9f);
}
if(_9b=="pattern"){
_9f.setAttribute("patternUnits","userSpaceOnUse");
var img=_8f(_9c,"image");
img.setAttribute("x",0);
img.setAttribute("y",0);
img.setAttribute("width",f.width.toFixed(8));
img.setAttribute("height",f.height.toFixed(8));
img.setAttributeNS(svg.xmlns.xlink,"xlink:href",f.src);
_9f.appendChild(img);
}else{
_9f.setAttribute("gradientUnits","userSpaceOnUse");
for(var i=0;i<f.colors.length;++i){
var c=f.colors[i],t=_8f(_9c,"stop"),cc=c.color=g.normalizeColor(c.color);
t.setAttribute("offset",c.offset.toFixed(8));
t.setAttribute("stop-color",cc.toCss());
t.setAttribute("stop-opacity",cc.a);
_9f.appendChild(t);
}
}
this.rawNode.setAttribute("fill","url(#"+_9f.getAttribute("id")+")");
this.rawNode.removeAttribute("fill-opacity");
this.rawNode.setAttribute("fill-rule","evenodd");
return _9f;
},_applyTransform:function(){
var _a0=this.matrix;
if(_a0){
var tm=this.matrix;
this.rawNode.setAttribute("transform","matrix("+tm.xx.toFixed(8)+","+tm.yx.toFixed(8)+","+tm.xy.toFixed(8)+","+tm.yy.toFixed(8)+","+tm.dx.toFixed(8)+","+tm.dy.toFixed(8)+")");
}else{
this.rawNode.removeAttribute("transform");
}
return this;
},setRawNode:function(_a1){
var r=this.rawNode=_a1;
if(this.shape.type!="image"){
r.setAttribute("fill","none");
}
r.setAttribute("fill-opacity",0);
r.setAttribute("stroke","none");
r.setAttribute("stroke-opacity",0);
r.setAttribute("stroke-width",1);
r.setAttribute("stroke-linecap","butt");
r.setAttribute("stroke-linejoin","miter");
r.setAttribute("stroke-miterlimit",4);
},setShape:function(_a2){
this.shape=g.makeParameters(this.shape,_a2);
for(var i in this.shape){
if(i!="type"){
this.rawNode.setAttribute(i,this.shape[i]);
}
}
this.bbox=null;
return this;
},_moveToFront:function(){
this.rawNode.parentNode.appendChild(this.rawNode);
return this;
},_moveToBack:function(){
this.rawNode.parentNode.insertBefore(this.rawNode,this.rawNode.parentNode.firstChild);
return this;
}});
dojo.declare("dojox.gfx.svg.Group",svg.Shape,{constructor:function(){
gs.Container._init.call(this);
},setRawNode:function(_a3){
this.rawNode=_a3;
}});
svg.Group.nodeType="g";
dojo.declare("dojox.gfx.svg.Rect",[svg.Shape,gs.Rect],{setShape:function(_a4){
this.shape=g.makeParameters(this.shape,_a4);
this.bbox=null;
for(var i in this.shape){
if(i!="type"&&i!="r"){
this.rawNode.setAttribute(i,this.shape[i]);
}
}
if(this.shape.r){
this.rawNode.setAttribute("ry",this.shape.r);
this.rawNode.setAttribute("rx",this.shape.r);
}
return this;
}});
svg.Rect.nodeType="rect";
dojo.declare("dojox.gfx.svg.Ellipse",[svg.Shape,gs.Ellipse],{});
svg.Ellipse.nodeType="ellipse";
dojo.declare("dojox.gfx.svg.Circle",[svg.Shape,gs.Circle],{});
svg.Circle.nodeType="circle";
dojo.declare("dojox.gfx.svg.Line",[svg.Shape,gs.Line],{});
svg.Line.nodeType="line";
dojo.declare("dojox.gfx.svg.Polyline",[svg.Shape,gs.Polyline],{setShape:function(_a5,_a6){
if(_a5&&_a5 instanceof Array){
this.shape=g.makeParameters(this.shape,{points:_a5});
if(_a6&&this.shape.points.length){
this.shape.points.push(this.shape.points[0]);
}
}else{
this.shape=g.makeParameters(this.shape,_a5);
}
this.bbox=null;
this._normalizePoints();
var _a7=[],p=this.shape.points;
for(var i=0;i<p.length;++i){
_a7.push(p[i].x.toFixed(8),p[i].y.toFixed(8));
}
this.rawNode.setAttribute("points",_a7.join(" "));
return this;
}});
svg.Polyline.nodeType="polyline";
dojo.declare("dojox.gfx.svg.Image",[svg.Shape,gs.Image],{setShape:function(_a8){
this.shape=g.makeParameters(this.shape,_a8);
this.bbox=null;
var _a9=this.rawNode;
for(var i in this.shape){
if(i!="type"&&i!="src"){
_a9.setAttribute(i,this.shape[i]);
}
}
_a9.setAttribute("preserveAspectRatio","none");
_a9.setAttributeNS(svg.xmlns.xlink,"xlink:href",this.shape.src);
return this;
}});
svg.Image.nodeType="image";
dojo.declare("dojox.gfx.svg.Text",[svg.Shape,gs.Text],{setShape:function(_aa){
this.shape=g.makeParameters(this.shape,_aa);
this.bbox=null;
var r=this.rawNode,s=this.shape;
r.setAttribute("x",s.x);
r.setAttribute("y",s.y);
r.setAttribute("text-anchor",s.align);
r.setAttribute("text-decoration",s.decoration);
r.setAttribute("rotate",s.rotated?90:0);
r.setAttribute("kerning",s.kerning?"auto":0);
r.setAttribute("text-rendering","optimizeLegibility");
if(r.firstChild){
r.firstChild.nodeValue=s.text;
}else{
r.appendChild(_91(s.text));
}
return this;
},getTextWidth:function(){
var _ab=this.rawNode,_ac=_ab.parentNode,_ad=_ab.cloneNode(true);
_ad.style.visibility="hidden";
var _ae=0,_af=_ad.firstChild.nodeValue;
_ac.appendChild(_ad);
if(_af!=""){
while(!_ae){
if(_ad.getBBox){
_ae=parseInt(_ad.getBBox().width);
}else{
_ae=68;
}
}
}
_ac.removeChild(_ad);
return _ae;
}});
svg.Text.nodeType="text";
dojo.declare("dojox.gfx.svg.Path",[svg.Shape,g.path.Path],{_updateWithSegment:function(_b0){
this.inherited(arguments);
if(typeof (this.shape.path)=="string"){
this.rawNode.setAttribute("d",this.shape.path);
}
},setShape:function(_b1){
this.inherited(arguments);
if(this.shape.path){
this.rawNode.setAttribute("d",this.shape.path);
}else{
this.rawNode.removeAttribute("d");
}
return this;
}});
svg.Path.nodeType="path";
dojo.declare("dojox.gfx.svg.TextPath",[svg.Shape,g.path.TextPath],{_updateWithSegment:function(_b2){
this.inherited(arguments);
this._setTextPath();
},setShape:function(_b3){
this.inherited(arguments);
this._setTextPath();
return this;
},_setTextPath:function(){
if(typeof this.shape.path!="string"){
return;
}
var r=this.rawNode;
if(!r.firstChild){
var tp=_8f(svg.xmlns.svg,"textPath"),tx=_91("");
tp.appendChild(tx);
r.appendChild(tp);
}
var ref=r.firstChild.getAttributeNS(svg.xmlns.xlink,"href"),_b4=ref&&svg.getRef(ref);
if(!_b4){
var _b5=this._getParentSurface();
if(_b5){
var _b6=_b5.defNode;
_b4=_8f(svg.xmlns.svg,"path");
var id=g._base._getUniqueId();
_b4.setAttribute("id",id);
_b6.appendChild(_b4);
r.firstChild.setAttributeNS(svg.xmlns.xlink,"xlink:href","#"+id);
}
}
if(_b4){
_b4.setAttribute("d",this.shape.path);
}
},_setText:function(){
var r=this.rawNode;
if(!r.firstChild){
var tp=_8f(svg.xmlns.svg,"textPath"),tx=_91("");
tp.appendChild(tx);
r.appendChild(tp);
}
r=r.firstChild;
var t=this.text;
r.setAttribute("alignment-baseline","middle");
switch(t.align){
case "middle":
r.setAttribute("text-anchor","middle");
r.setAttribute("startOffset","50%");
break;
case "end":
r.setAttribute("text-anchor","end");
r.setAttribute("startOffset","100%");
break;
default:
r.setAttribute("text-anchor","start");
r.setAttribute("startOffset","0%");
break;
}
r.setAttribute("baseline-shift","0.5ex");
r.setAttribute("text-decoration",t.decoration);
r.setAttribute("rotate",t.rotated?90:0);
r.setAttribute("kerning",t.kerning?"auto":0);
r.firstChild.data=t.text;
}});
svg.TextPath.nodeType="text";
dojo.declare("dojox.gfx.svg.Surface",gs.Surface,{constructor:function(){
gs.Container._init.call(this);
},destroy:function(){
this.defNode=null;
this.inherited(arguments);
},setDimensions:function(_b7,_b8){
if(!this.rawNode){
return this;
}
this.rawNode.setAttribute("width",_b7);
this.rawNode.setAttribute("height",_b8);
return this;
},getDimensions:function(){
var t=this.rawNode?{width:g.normalizedLength(this.rawNode.getAttribute("width")),height:g.normalizedLength(this.rawNode.getAttribute("height"))}:null;
return t;
}});
svg.createSurface=function(_b9,_ba,_bb){
var s=new svg.Surface();
s.rawNode=_8f(svg.xmlns.svg,"svg");
if(_ba){
s.rawNode.setAttribute("width",_ba);
}
if(_bb){
s.rawNode.setAttribute("height",_bb);
}
var _bc=_8f(svg.xmlns.svg,"defs");
s.rawNode.appendChild(_bc);
s.defNode=_bc;
s._parent=d.byId(_b9);
s._parent.appendChild(s.rawNode);
return s;
};
var _bd={_setFont:function(){
var f=this.fontStyle;
this.rawNode.setAttribute("font-style",f.style);
this.rawNode.setAttribute("font-variant",f.variant);
this.rawNode.setAttribute("font-weight",f.weight);
this.rawNode.setAttribute("font-size",f.size);
this.rawNode.setAttribute("font-family",f.family);
}};
var C=gs.Container,_be={openBatch:function(){
this.fragment=_93();
},closeBatch:function(){
if(this.fragment){
this.rawNode.appendChild(this.fragment);
delete this.fragment;
}
},add:function(_bf){
if(this!=_bf.getParent()){
if(this.fragment){
this.fragment.appendChild(_bf.rawNode);
}else{
this.rawNode.appendChild(_bf.rawNode);
}
C.add.apply(this,arguments);
}
return this;
},remove:function(_c0,_c1){
if(this==_c0.getParent()){
if(this.rawNode==_c0.rawNode.parentNode){
this.rawNode.removeChild(_c0.rawNode);
}
if(this.fragment&&this.fragment==_c0.rawNode.parentNode){
this.fragment.removeChild(_c0.rawNode);
}
C.remove.apply(this,arguments);
}
return this;
},clear:function(){
var r=this.rawNode;
while(r.lastChild){
r.removeChild(r.lastChild);
}
var _c2=this.defNode;
if(_c2){
while(_c2.lastChild){
_c2.removeChild(_c2.lastChild);
}
r.appendChild(_c2);
}
return C.clear.apply(this,arguments);
},_moveChildToFront:C._moveChildToFront,_moveChildToBack:C._moveChildToBack};
var _c3={createObject:function(_c4,_c5){
if(!this.rawNode){
return null;
}
var _c6=new _c4(),_c7=_8f(svg.xmlns.svg,_c4.nodeType);
_c6.setRawNode(_c7);
_c6.setShape(_c5);
this.add(_c6);
return _c6;
}};
d.extend(svg.Text,_bd);
d.extend(svg.TextPath,_bd);
d.extend(svg.Group,_be);
d.extend(svg.Group,gs.Creator);
d.extend(svg.Group,_c3);
d.extend(svg.Surface,_be);
d.extend(svg.Surface,gs.Creator);
d.extend(svg.Surface,_c3);
if(svg.useSvgWeb){
svg.createSurface=function(_c8,_c9,_ca){
var s=new svg.Surface();
if(!_c9||!_ca){
var pos=d.position(_c8);
_c9=_c9||pos.w;
_ca=_ca||pos.h;
}
_c8=d.byId(_c8);
var id=_c8.id?_c8.id+"_svgweb":g._base._getUniqueId();
var _cb=_8f(svg.xmlns.svg,"svg");
_cb.id=id;
_cb.setAttribute("width",_c9);
_cb.setAttribute("height",_ca);
svgweb.appendChild(_cb,_c8);
_cb.addEventListener("SVGLoad",function(){
s.rawNode=this;
s.isLoaded=true;
var _cc=_8f(svg.xmlns.svg,"defs");
s.rawNode.appendChild(_cc);
s.defNode=_cc;
if(s.onLoad){
s.onLoad(s);
}
},false);
s.isLoaded=false;
return s;
};
svg.Surface.extend({destroy:function(){
var _cd=this.rawNode;
svgweb.removeChild(_cd,_cd.parentNode);
}});
var _ce={connect:function(_cf,_d0,_d1){
if(_cf.substring(0,2)==="on"){
_cf=_cf.substring(2);
}
if(arguments.length==2){
_d1=_d0;
}else{
_d1=d.hitch(_d0,_d1);
}
this.getEventSource().addEventListener(_cf,_d1,false);
return [this,_cf,_d1];
},disconnect:function(_d2){
this.getEventSource().removeEventListener(_d2[1],_d2[2],false);
delete _d2[0];
}};
dojo.extend(svg.Shape,_ce);
dojo.extend(svg.Surface,_ce);
}
if(g.loadAndSwitch==="svg"){
g.switchTo("svg");
delete g.loadAndSwitch;
}
})();
}
if(!dojo._hasResource["dojox.charting.scaler.common"]){
dojo._hasResource["dojox.charting.scaler.common"]=true;
dojo.provide("dojox.charting.scaler.common");
(function(){
var eq=function(a,b){
return Math.abs(a-b)<=0.000001*(Math.abs(a)+Math.abs(b));
};
dojo.mixin(dojox.charting.scaler.common,{findString:function(val,_d3){
val=val.toLowerCase();
for(var i=0;i<_d3.length;++i){
if(val==_d3[i]){
return true;
}
}
return false;
},getNumericLabel:function(_d4,_d5,_d6){
var def="";
if(dojo.number){
def=(_d6.fixed?dojo.number.format(_d4,{places:_d5<0?-_d5:0}):dojo.number.format(_d4))||"";
}else{
def=_d6.fixed?_d4.toFixed(_d5<0?-_d5:0):_d4.toString();
}
if(_d6.labelFunc){
var r=_d6.labelFunc(def,_d4,_d5);
if(r){
return r;
}
}
if(_d6.labels){
var l=_d6.labels,lo=0,hi=l.length;
while(lo<hi){
var mid=Math.floor((lo+hi)/2),val=l[mid].value;
if(val<_d4){
lo=mid+1;
}else{
hi=mid;
}
}
if(lo<l.length&&eq(l[lo].value,_d4)){
return l[lo].text;
}
--lo;
if(lo>=0&&lo<l.length&&eq(l[lo].value,_d4)){
return l[lo].text;
}
lo+=2;
if(lo<l.length&&eq(l[lo].value,_d4)){
return l[lo].text;
}
}
return def;
}});
})();
}
if(!dojo._hasResource["dojox.charting.scaler.linear"]){
dojo._hasResource["dojox.charting.scaler.linear"]=true;
dojo.provide("dojox.charting.scaler.linear");
(function(){
var _d7=3,dc=dojox.charting,dcs=dc.scaler,_d8=dcs.common,_d9=_d8.findString,_da=_d8.getNumericLabel;
var _db=function(min,max,_dc,_dd,_de,_df,_e0){
_dc=dojo.delegate(_dc);
if(!_dd){
if(_dc.fixUpper=="major"){
_dc.fixUpper="minor";
}
if(_dc.fixLower=="major"){
_dc.fixLower="minor";
}
}
if(!_de){
if(_dc.fixUpper=="minor"){
_dc.fixUpper="micro";
}
if(_dc.fixLower=="minor"){
_dc.fixLower="micro";
}
}
if(!_df){
if(_dc.fixUpper=="micro"){
_dc.fixUpper="none";
}
if(_dc.fixLower=="micro"){
_dc.fixLower="none";
}
}
var _e1=_d9(_dc.fixLower,["major"])?Math.floor(_dc.min/_dd)*_dd:_d9(_dc.fixLower,["minor"])?Math.floor(_dc.min/_de)*_de:_d9(_dc.fixLower,["micro"])?Math.floor(_dc.min/_df)*_df:_dc.min,_e2=_d9(_dc.fixUpper,["major"])?Math.ceil(_dc.max/_dd)*_dd:_d9(_dc.fixUpper,["minor"])?Math.ceil(_dc.max/_de)*_de:_d9(_dc.fixUpper,["micro"])?Math.ceil(_dc.max/_df)*_df:_dc.max;
if(_dc.useMin){
min=_e1;
}
if(_dc.useMax){
max=_e2;
}
var _e3=(!_dd||_dc.useMin&&_d9(_dc.fixLower,["major"]))?min:Math.ceil(min/_dd)*_dd,_e4=(!_de||_dc.useMin&&_d9(_dc.fixLower,["major","minor"]))?min:Math.ceil(min/_de)*_de,_e5=(!_df||_dc.useMin&&_d9(_dc.fixLower,["major","minor","micro"]))?min:Math.ceil(min/_df)*_df,_e6=!_dd?0:(_dc.useMax&&_d9(_dc.fixUpper,["major"])?Math.round((max-_e3)/_dd):Math.floor((max-_e3)/_dd))+1,_e7=!_de?0:(_dc.useMax&&_d9(_dc.fixUpper,["major","minor"])?Math.round((max-_e4)/_de):Math.floor((max-_e4)/_de))+1,_e8=!_df?0:(_dc.useMax&&_d9(_dc.fixUpper,["major","minor","micro"])?Math.round((max-_e5)/_df):Math.floor((max-_e5)/_df))+1,_e9=_de?Math.round(_dd/_de):0,_ea=_df?Math.round(_de/_df):0,_eb=_dd?Math.floor(Math.log(_dd)/Math.LN10):0,_ec=_de?Math.floor(Math.log(_de)/Math.LN10):0,_ed=_e0/(max-min);
if(!isFinite(_ed)){
_ed=1;
}
return {bounds:{lower:_e1,upper:_e2,from:min,to:max,scale:_ed,span:_e0},major:{tick:_dd,start:_e3,count:_e6,prec:_eb},minor:{tick:_de,start:_e4,count:_e7,prec:_ec},micro:{tick:_df,start:_e5,count:_e8,prec:0},minorPerMajor:_e9,microPerMinor:_ea,scaler:dcs.linear};
};
dojo.mixin(dojox.charting.scaler.linear,{buildScaler:function(min,max,_ee,_ef){
var h={fixUpper:"none",fixLower:"none",natural:false};
if(_ef){
if("fixUpper" in _ef){
h.fixUpper=String(_ef.fixUpper);
}
if("fixLower" in _ef){
h.fixLower=String(_ef.fixLower);
}
if("natural" in _ef){
h.natural=Boolean(_ef.natural);
}
}
if("min" in _ef){
min=_ef.min;
}
if("max" in _ef){
max=_ef.max;
}
if(_ef.includeZero){
if(min>0){
min=0;
}
if(max<0){
max=0;
}
}
h.min=min;
h.useMin=true;
h.max=max;
h.useMax=true;
if("from" in _ef){
min=_ef.from;
h.useMin=false;
}
if("to" in _ef){
max=_ef.to;
h.useMax=false;
}
if(max<=min){
return _db(min,max,h,0,0,0,_ee);
}
var mag=Math.floor(Math.log(max-min)/Math.LN10),_f0=_ef&&("majorTickStep" in _ef)?_ef.majorTickStep:Math.pow(10,mag),_f1=0,_f2=0,_f3;
if(_ef&&("minorTickStep" in _ef)){
_f1=_ef.minorTickStep;
}else{
do{
_f1=_f0/10;
if(!h.natural||_f1>0.9){
_f3=_db(min,max,h,_f0,_f1,0,_ee);
if(_f3.bounds.scale*_f3.minor.tick>_d7){
break;
}
}
_f1=_f0/5;
if(!h.natural||_f1>0.9){
_f3=_db(min,max,h,_f0,_f1,0,_ee);
if(_f3.bounds.scale*_f3.minor.tick>_d7){
break;
}
}
_f1=_f0/2;
if(!h.natural||_f1>0.9){
_f3=_db(min,max,h,_f0,_f1,0,_ee);
if(_f3.bounds.scale*_f3.minor.tick>_d7){
break;
}
}
return _db(min,max,h,_f0,0,0,_ee);
}while(false);
}
if(_ef&&("microTickStep" in _ef)){
_f2=_ef.microTickStep;
_f3=_db(min,max,h,_f0,_f1,_f2,_ee);
}else{
do{
_f2=_f1/10;
if(!h.natural||_f2>0.9){
_f3=_db(min,max,h,_f0,_f1,_f2,_ee);
if(_f3.bounds.scale*_f3.micro.tick>_d7){
break;
}
}
_f2=_f1/5;
if(!h.natural||_f2>0.9){
_f3=_db(min,max,h,_f0,_f1,_f2,_ee);
if(_f3.bounds.scale*_f3.micro.tick>_d7){
break;
}
}
_f2=_f1/2;
if(!h.natural||_f2>0.9){
_f3=_db(min,max,h,_f0,_f1,_f2,_ee);
if(_f3.bounds.scale*_f3.micro.tick>_d7){
break;
}
}
_f2=0;
}while(false);
}
return _f2?_f3:_db(min,max,h,_f0,_f1,0,_ee);
},buildTicks:function(_f4,_f5){
var _f6,_f7,_f8,_f9=_f4.major.start,_fa=_f4.minor.start,_fb=_f4.micro.start;
if(_f5.microTicks&&_f4.micro.tick){
_f6=_f4.micro.tick,_f7=_fb;
}else{
if(_f5.minorTicks&&_f4.minor.tick){
_f6=_f4.minor.tick,_f7=_fa;
}else{
if(_f4.major.tick){
_f6=_f4.major.tick,_f7=_f9;
}else{
return null;
}
}
}
var _fc=1/_f4.bounds.scale;
if(_f4.bounds.to<=_f4.bounds.from||isNaN(_fc)||!isFinite(_fc)||_f6<=0||isNaN(_f6)||!isFinite(_f6)){
return null;
}
var _fd=[],_fe=[],_ff=[];
while(_f7<=_f4.bounds.to+_fc){
if(Math.abs(_f9-_f7)<_f6/2){
_f8={value:_f9};
if(_f5.majorLabels){
_f8.label=_da(_f9,_f4.major.prec,_f5);
}
_fd.push(_f8);
_f9+=_f4.major.tick;
_fa+=_f4.minor.tick;
_fb+=_f4.micro.tick;
}else{
if(Math.abs(_fa-_f7)<_f6/2){
if(_f5.minorTicks){
_f8={value:_fa};
if(_f5.minorLabels&&(_f4.minMinorStep<=_f4.minor.tick*_f4.bounds.scale)){
_f8.label=_da(_fa,_f4.minor.prec,_f5);
}
_fe.push(_f8);
}
_fa+=_f4.minor.tick;
_fb+=_f4.micro.tick;
}else{
if(_f5.microTicks){
_ff.push({value:_fb});
}
_fb+=_f4.micro.tick;
}
}
_f7+=_f6;
}
return {major:_fd,minor:_fe,micro:_ff};
},getTransformerFromModel:function(_100){
var _101=_100.bounds.from,_102=_100.bounds.scale;
return function(x){
return (x-_101)*_102;
};
},getTransformerFromPlot:function(_103){
var _104=_103.bounds.from,_105=_103.bounds.scale;
return function(x){
return x/_105+_104;
};
}});
})();
}
if(!dojo._hasResource["dojox.gfx"]){
dojo._hasResource["dojox.gfx"]=true;
dojo.provide("dojox.gfx");
dojo.loadInit(function(){
var gfx=dojo.getObject("dojox.gfx",true),sl,flag,_106;
while(!gfx.renderer){
if(dojo.config.forceGfxRenderer){
dojox.gfx.renderer=dojo.config.forceGfxRenderer;
break;
}
var _107=(typeof dojo.config.gfxRenderer=="string"?dojo.config.gfxRenderer:"svg,vml,canvas,silverlight").split(",");
for(var i=0;i<_107.length;++i){
switch(_107[i]){
case "svg":
if("SVGAngle" in dojo.global){
dojox.gfx.renderer="svg";
}
break;
case "vml":
if(dojo.isIE){
dojox.gfx.renderer="vml";
}
break;
case "silverlight":
try{
if(dojo.isIE){
sl=new ActiveXObject("AgControl.AgControl");
if(sl&&sl.IsVersionSupported("1.0")){
flag=true;
}
}else{
if(navigator.plugins["Silverlight Plug-In"]){
flag=true;
}
}
}
catch(e){
flag=false;
}
finally{
sl=null;
}
if(flag){
dojox.gfx.renderer="silverlight";
}
break;
case "canvas":
if(dojo.global.CanvasRenderingContext2D){
dojox.gfx.renderer="canvas";
}
break;
}
if(gfx.renderer){
break;
}
}
break;
}
if(dojo.config.isDebug){
}
if(gfx[gfx.renderer]){
gfx.switchTo(gfx.renderer);
}else{
gfx.loadAndSwitch=gfx.renderer;
dojo["require"]("dojox.gfx."+gfx.renderer);
}
});
}
if(!dojo._hasResource["dojox.charting.axis2d.common"]){
dojo._hasResource["dojox.charting.axis2d.common"]=true;
dojo.provide("dojox.charting.axis2d.common");
(function(){
var g=dojox.gfx;
var _108=function(s){
s.marginLeft="0px";
s.marginTop="0px";
s.marginRight="0px";
s.marginBottom="0px";
s.paddingLeft="0px";
s.paddingTop="0px";
s.paddingRight="0px";
s.paddingBottom="0px";
s.borderLeftWidth="0px";
s.borderTopWidth="0px";
s.borderRightWidth="0px";
s.borderBottomWidth="0px";
};
var _109=function(n){
if(n["getBoundingClientRect"]){
var bcr=n.getBoundingClientRect();
return bcr.width||(bcr.right-bcr.left);
}else{
return dojo.marginBox(n).w;
}
};
dojo.mixin(dojox.charting.axis2d.common,{createText:{gfx:function(_10a,_10b,x,y,_10c,text,font,_10d){
return _10b.createText({x:x,y:y,text:text,align:_10c}).setFont(font).setFill(_10d);
},html:function(_10e,_10f,x,y,_110,text,font,_111,_112){
var p=dojo.doc.createElement("div"),s=p.style,_113;
_108(s);
s.font=font;
p.innerHTML=String(text).replace(/\s/g,"&nbsp;");
s.color=_111;
s.position="absolute";
s.left="-10000px";
dojo.body().appendChild(p);
var size=g.normalizedLength(g.splitFontString(font).size);
if(!_112){
_113=_109(p);
}
dojo.body().removeChild(p);
s.position="relative";
if(_112){
s.width=_112+"px";
switch(_110){
case "middle":
s.textAlign="center";
s.left=(x-_112/2)+"px";
break;
case "end":
s.textAlign="right";
s.left=(x-_112)+"px";
break;
default:
s.left=x+"px";
s.textAlign="left";
break;
}
}else{
switch(_110){
case "middle":
s.left=Math.floor(x-_113/2)+"px";
break;
case "end":
s.left=Math.floor(x-_113)+"px";
break;
default:
s.left=Math.floor(x)+"px";
break;
}
}
s.top=Math.floor(y-size)+"px";
s.whiteSpace="nowrap";
var wrap=dojo.doc.createElement("div"),w=wrap.style;
_108(w);
w.width="0px";
w.height="0px";
wrap.appendChild(p);
_10e.node.insertBefore(wrap,_10e.node.firstChild);
return wrap;
}}});
})();
}
if(!dojo._hasResource["dojox.charting.Element"]){
dojo._hasResource["dojox.charting.Element"]=true;
dojo.provide("dojox.charting.Element");
dojo.declare("dojox.charting.Element",null,{chart:null,group:null,htmlElements:null,dirty:true,constructor:function(_114){
this.chart=_114;
this.group=null;
this.htmlElements=[];
this.dirty=true;
this.trailingSymbol="...";
this._events=[];
},createGroup:function(_115){
if(!_115){
_115=this.chart.surface;
}
if(!this.group){
this.group=_115.createGroup();
}
return this;
},purgeGroup:function(){
this.destroyHtmlElements();
if(this.group){
this.group.clear();
this.group.removeShape();
this.group=null;
}
this.dirty=true;
if(this._events.length){
dojo.forEach(this._events,function(item){
item.shape.disconnect(item.handle);
});
this._events=[];
}
return this;
},cleanGroup:function(_116){
this.destroyHtmlElements();
if(!_116){
_116=this.chart.surface;
}
if(this.group){
this.group.clear();
}else{
this.group=_116.createGroup();
}
this.dirty=true;
return this;
},destroyHtmlElements:function(){
if(this.htmlElements.length){
dojo.forEach(this.htmlElements,dojo.destroy);
this.htmlElements=[];
}
},destroy:function(){
this.purgeGroup();
},getTextWidth:function(s,font){
return dojox.gfx._base._getTextBox(s,{font:font}).w||0;
},getTextWithLimitLength:function(s,font,_117,_118){
if(!s||s.length<=0){
return {text:"",truncated:_118||false};
}
if(!_117||_117<=0){
return {text:s,truncated:_118||false};
}
var _119=2,_11a=0.618,_11b=s.substring(0,1)+this.trailingSymbol,_11c=this.getTextWidth(_11b,font);
if(_117<=_11c){
return {text:_11b,truncated:true};
}
var _11d=this.getTextWidth(s,font);
if(_11d<=_117){
return {text:s,truncated:_118||false};
}else{
var _11e=0,end=s.length;
while(_11e<end){
if(end-_11e<=_119){
while(this.getTextWidth(s.substring(0,_11e)+this.trailingSymbol,font)>_117){
_11e-=1;
}
return {text:(s.substring(0,_11e)+this.trailingSymbol),truncated:true};
}
var _11f=_11e+Math.round((end-_11e)*_11a),_120=this.getTextWidth(s.substring(0,_11f),font);
if(_120<_117){
_11e=_11f;
end=end;
}else{
_11e=_11e;
end=_11f;
}
}
}
},getTextWithLimitCharCount:function(s,font,_121,_122){
if(!s||s.length<=0){
return {text:"",truncated:_122||false};
}
if(!_121||_121<=0||s.length<=_121){
return {text:s,truncated:_122||false};
}
return {text:s.substring(0,_121)+this.trailingSymbol,truncated:true};
},_plotFill:function(fill,dim,_123){
if(!fill||!fill.type||!fill.space){
return fill;
}
var _124=fill.space;
switch(fill.type){
case "linear":
if(_124==="plot"||_124==="shapeX"||_124==="shapeY"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,fill);
fill.space=_124;
if(_124==="plot"||_124==="shapeX"){
var span=dim.height-_123.t-_123.b;
fill.y1=_123.t+span*fill.y1/100;
fill.y2=_123.t+span*fill.y2/100;
}
if(_124==="plot"||_124==="shapeY"){
var span=dim.width-_123.l-_123.r;
fill.x1=_123.l+span*fill.x1/100;
fill.x2=_123.l+span*fill.x2/100;
}
}
break;
case "radial":
if(_124==="plot"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,fill);
fill.space=_124;
var _125=dim.width-_123.l-_123.r,_126=dim.height-_123.t-_123.b;
fill.cx=_123.l+_125*fill.cx/100;
fill.cy=_123.t+_126*fill.cy/100;
fill.r=fill.r*Math.sqrt(_125*_125+_126*_126)/200;
}
break;
case "pattern":
if(_124==="plot"||_124==="shapeX"||_124==="shapeY"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,fill);
fill.space=_124;
if(_124==="plot"||_124==="shapeX"){
var span=dim.height-_123.t-_123.b;
fill.y=_123.t+span*fill.y/100;
fill.height=span*fill.height/100;
}
if(_124==="plot"||_124==="shapeY"){
var span=dim.width-_123.l-_123.r;
fill.x=_123.l+span*fill.x/100;
fill.width=span*fill.width/100;
}
}
break;
}
return fill;
},_shapeFill:function(fill,bbox){
if(!fill||!fill.space){
return fill;
}
var _127=fill.space;
switch(fill.type){
case "linear":
if(_127==="shape"||_127==="shapeX"||_127==="shapeY"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultLinearGradient,fill);
fill.space=_127;
if(_127==="shape"||_127==="shapeX"){
var span=bbox.width;
fill.x1=bbox.x+span*fill.x1/100;
fill.x2=bbox.x+span*fill.x2/100;
}
if(_127==="shape"||_127==="shapeY"){
var span=bbox.height;
fill.y1=bbox.y+span*fill.y1/100;
fill.y2=bbox.y+span*fill.y2/100;
}
}
break;
case "radial":
if(_127==="shape"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,fill);
fill.space=_127;
fill.cx=bbox.x+bbox.width/2;
fill.cy=bbox.y+bbox.height/2;
fill.r=fill.r*bbox.width/200;
}
break;
case "pattern":
if(_127==="shape"||_127==="shapeX"||_127==="shapeY"){
fill=dojox.gfx.makeParameters(dojox.gfx.defaultPattern,fill);
fill.space=_127;
if(_127==="shape"||_127==="shapeX"){
var span=bbox.width;
fill.x=bbox.x+span*fill.x/100;
fill.width=span*fill.width/100;
}
if(_127==="shape"||_127==="shapeY"){
var span=bbox.height;
fill.y=bbox.y+span*fill.y/100;
fill.height=span*fill.height/100;
}
}
break;
}
return fill;
},_pseudoRadialFill:function(fill,_128,_129,_12a,end){
if(!fill||fill.type!=="radial"||fill.space!=="shape"){
return fill;
}
var _12b=fill.space;
fill=dojox.gfx.makeParameters(dojox.gfx.defaultRadialGradient,fill);
fill.space=_12b;
if(arguments.length<4){
fill.cx=_128.x;
fill.cy=_128.y;
fill.r=fill.r*_129/100;
return fill;
}
var _12c=arguments.length<5?_12a:(end+_12a)/2;
return {type:"linear",x1:_128.x,y1:_128.y,x2:_128.x+fill.r*_129*Math.cos(_12c)/100,y2:_128.y+fill.r*_129*Math.sin(_12c)/100,colors:fill.colors};
return fill;
}});
}
if(!dojo._hasResource["dojox.charting.axis2d.Base"]){
dojo._hasResource["dojox.charting.axis2d.Base"]=true;
dojo.provide("dojox.charting.axis2d.Base");
dojo.declare("dojox.charting.axis2d.Base",dojox.charting.Element,{constructor:function(_12d,_12e){
this.vertical=_12e&&_12e.vertical;
},clear:function(){
return this;
},initialized:function(){
return false;
},calculate:function(min,max,span){
return this;
},getScaler:function(){
return null;
},getTicks:function(){
return null;
},getOffsets:function(){
return {l:0,r:0,t:0,b:0};
},render:function(dim,_12f){
this.dirty=false;
return this;
}});
}
if(!dojo._hasResource["dojox.lang.functional.lambda"]){
dojo._hasResource["dojox.lang.functional.lambda"]=true;
dojo.provide("dojox.lang.functional.lambda");
(function(){
var df=dojox.lang.functional,_130={};
var _131="ab".split(/a*/).length>1?String.prototype.split:function(sep){
var r=this.split.call(this,sep),m=sep.exec(this);
if(m&&m.index==0){
r.unshift("");
}
return r;
};
var _132=function(s){
var args=[],_133=_131.call(s,/\s*->\s*/m);
if(_133.length>1){
while(_133.length){
s=_133.pop();
args=_133.pop().split(/\s*,\s*|\s+/m);
if(_133.length){
_133.push("(function("+args+"){return ("+s+")})");
}
}
}else{
if(s.match(/\b_\b/)){
args=["_"];
}else{
var l=s.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/m),r=s.match(/[+\-*\/%&|\^\.=<>!]\s*$/m);
if(l||r){
if(l){
args.push("$1");
s="$1"+s;
}
if(r){
args.push("$2");
s=s+"$2";
}
}else{
var vars=s.replace(/(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*:|this|true|false|null|undefined|typeof|instanceof|in|delete|new|void|arguments|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|eval|isFinite|isNaN|parseFloat|parseInt|unescape|dojo|dijit|dojox|window|document|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,"").match(/([a-z_$][a-z_$\d]*)/gi)||[],t={};
dojo.forEach(vars,function(v){
if(!(v in t)){
args.push(v);
t[v]=1;
}
});
}
}
}
return {args:args,body:s};
};
var _134=function(a){
return a.length?function(){
var i=a.length-1,x=df.lambda(a[i]).apply(this,arguments);
for(--i;i>=0;--i){
x=df.lambda(a[i]).call(this,x);
}
return x;
}:function(x){
return x;
};
};
dojo.mixin(df,{rawLambda:function(s){
return _132(s);
},buildLambda:function(s){
s=_132(s);
return "function("+s.args.join(",")+"){return ("+s.body+");}";
},lambda:function(s){
if(typeof s=="function"){
return s;
}
if(s instanceof Array){
return _134(s);
}
if(s in _130){
return _130[s];
}
s=_132(s);
return _130[s]=new Function(s.args,"return ("+s.body+");");
},clearLambdaCache:function(){
_130={};
}});
})();
}
if(!dojo._hasResource["dojox.lang.functional.array"]){
dojo._hasResource["dojox.lang.functional.array"]=true;
dojo.provide("dojox.lang.functional.array");
(function(){
var d=dojo,df=dojox.lang.functional,_135={};
d.mixin(df,{filter:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var t=[],v,i,n;
if(d.isArray(a)){
for(i=0,n=a.length;i<n;++i){
v=a[i];
if(f.call(o,v,i,a)){
t.push(v);
}
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
for(i=0;a.hasNext();){
v=a.next();
if(f.call(o,v,i++,a)){
t.push(v);
}
}
}else{
for(i in a){
if(!(i in _135)){
v=a[i];
if(f.call(o,v,i,a)){
t.push(v);
}
}
}
}
}
return t;
},forEach:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var i,n;
if(d.isArray(a)){
for(i=0,n=a.length;i<n;f.call(o,a[i],i,a),++i){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
for(i=0;a.hasNext();f.call(o,a.next(),i++,a)){
}
}else{
for(i in a){
if(!(i in _135)){
f.call(o,a[i],i,a);
}
}
}
}
return o;
},map:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var t,n,i;
if(d.isArray(a)){
t=new Array(n=a.length);
for(i=0;i<n;t[i]=f.call(o,a[i],i,a),++i){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
t=[];
for(i=0;a.hasNext();t.push(f.call(o,a.next(),i++,a))){
}
}else{
t=[];
for(i in a){
if(!(i in _135)){
t.push(f.call(o,a[i],i,a));
}
}
}
}
return t;
},every:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var i,n;
if(d.isArray(a)){
for(i=0,n=a.length;i<n;++i){
if(!f.call(o,a[i],i,a)){
return false;
}
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
for(i=0;a.hasNext();){
if(!f.call(o,a.next(),i++,a)){
return false;
}
}
}else{
for(i in a){
if(!(i in _135)){
if(!f.call(o,a[i],i,a)){
return false;
}
}
}
}
}
return true;
},some:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var i,n;
if(d.isArray(a)){
for(i=0,n=a.length;i<n;++i){
if(f.call(o,a[i],i,a)){
return true;
}
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
for(i=0;a.hasNext();){
if(f.call(o,a.next(),i++,a)){
return true;
}
}
}else{
for(i in a){
if(!(i in _135)){
if(f.call(o,a[i],i,a)){
return true;
}
}
}
}
}
return false;
}});
})();
}
if(!dojo._hasResource["dojox.lang.functional.object"]){
dojo._hasResource["dojox.lang.functional.object"]=true;
dojo.provide("dojox.lang.functional.object");
(function(){
var d=dojo,df=dojox.lang.functional,_136={};
d.mixin(df,{keys:function(obj){
var t=[];
for(var i in obj){
if(!(i in _136)){
t.push(i);
}
}
return t;
},values:function(obj){
var t=[];
for(var i in obj){
if(!(i in _136)){
t.push(obj[i]);
}
}
return t;
},filterIn:function(obj,f,o){
o=o||d.global;
f=df.lambda(f);
var t={},v,i;
for(i in obj){
if(!(i in _136)){
v=obj[i];
if(f.call(o,v,i,obj)){
t[i]=v;
}
}
}
return t;
},forIn:function(obj,f,o){
o=o||d.global;
f=df.lambda(f);
for(var i in obj){
if(!(i in _136)){
f.call(o,obj[i],i,obj);
}
}
return o;
},mapIn:function(obj,f,o){
o=o||d.global;
f=df.lambda(f);
var t={},i;
for(i in obj){
if(!(i in _136)){
t[i]=f.call(o,obj[i],i,obj);
}
}
return t;
}});
})();
}
if(!dojo._hasResource["dojox.lang.functional"]){
dojo._hasResource["dojox.lang.functional"]=true;
dojo.provide("dojox.lang.functional");
}
if(!dojo._hasResource["dojox.lang.utils"]){
dojo._hasResource["dojox.lang.utils"]=true;
dojo.provide("dojox.lang.utils");
(function(){
var _137={},du=dojox.lang.utils,opts=Object.prototype.toString;
var _138=function(o){
if(o){
switch(opts.call(o)){
case "[object Array]":
return o.slice(0);
case "[object Object]":
return dojo.delegate(o);
}
}
return o;
};
dojo.mixin(du,{coerceType:function(_139,_13a){
switch(typeof _139){
case "number":
return Number(eval("("+_13a+")"));
case "string":
return String(_13a);
case "boolean":
return Boolean(eval("("+_13a+")"));
}
return eval("("+_13a+")");
},updateWithObject:function(_13b,_13c,conv){
if(!_13c){
return _13b;
}
for(var x in _13b){
if(x in _13c&&!(x in _137)){
var t=_13b[x];
if(t&&typeof t=="object"){
du.updateWithObject(t,_13c[x],conv);
}else{
_13b[x]=conv?du.coerceType(t,_13c[x]):_138(_13c[x]);
}
}
}
return _13b;
},updateWithPattern:function(_13d,_13e,_13f,conv){
if(!_13e||!_13f){
return _13d;
}
for(var x in _13f){
if(x in _13e&&!(x in _137)){
_13d[x]=conv?du.coerceType(_13f[x],_13e[x]):_138(_13e[x]);
}
}
return _13d;
},merge:function(_140,_141){
if(_141){
var _142=opts.call(_140),_143=opts.call(_141),t,i,l,m;
switch(_143){
case "[object Array]":
if(_143==_142){
t=new Array(Math.max(_140.length,_141.length));
for(i=0,l=t.length;i<l;++i){
t[i]=du.merge(_140[i],_141[i]);
}
return t;
}
return _141.slice(0);
case "[object Object]":
if(_143==_142&&_140){
t=dojo.delegate(_140);
for(i in _141){
if(i in _140){
l=_140[i];
m=_141[i];
if(m!==l){
t[i]=du.merge(l,m);
}
}else{
t[i]=dojo.clone(_141[i]);
}
}
return t;
}
return dojo.clone(_141);
}
}
return _141;
}});
})();
}
if(!dojo._hasResource["dojox.charting.axis2d.Invisible"]){
dojo._hasResource["dojox.charting.axis2d.Invisible"]=true;
dojo.provide("dojox.charting.axis2d.Invisible");
(function(){
var dc=dojox.charting,df=dojox.lang.functional,du=dojox.lang.utils,g=dojox.gfx,lin=dc.scaler.linear,_144=du.merge,_145=4,_146=45;
dojo.declare("dojox.charting.axis2d.Invisible",dojox.charting.axis2d.Base,{defaultParams:{vertical:false,fixUpper:"none",fixLower:"none",natural:false,leftBottom:true,includeZero:false,fixed:true,majorLabels:true,minorTicks:true,minorLabels:true,microTicks:false,rotation:0},optionalParams:{min:0,max:1,from:0,to:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],labelFunc:null,maxLabelSize:0,maxLabelCharCount:0,trailingSymbol:null},constructor:function(_147,_148){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_148);
du.updateWithPattern(this.opt,_148,this.optionalParams);
},dependOnData:function(){
return !("min" in this.opt)||!("max" in this.opt);
},clear:function(){
delete this.scaler;
delete this.ticks;
this.dirty=true;
return this;
},initialized:function(){
return "scaler" in this&&!(this.dirty&&this.dependOnData());
},setWindow:function(_149,_14a){
this.scale=_149;
this.offset=_14a;
return this.clear();
},getWindowScale:function(){
return "scale" in this?this.scale:1;
},getWindowOffset:function(){
return "offset" in this?this.offset:0;
},_groupLabelWidth:function(_14b,font,_14c){
if(!_14b.length){
return 0;
}
if(dojo.isObject(_14b[0])){
_14b=df.map(_14b,function(_14d){
return _14d.text;
});
}
if(_14c){
_14b=df.map(_14b,function(_14e){
return dojo.trim(_14e).length==0?"":_14e.substring(0,_14c)+this.trailingSymbol;
},this);
}
var s=_14b.join("<br>");
return dojox.gfx._base._getTextBox(s,{font:font}).w||0;
},calculate:function(min,max,span,_14f){
if(this.initialized()){
return this;
}
var o=this.opt;
this.labels="labels" in o?o.labels:_14f;
this.scaler=lin.buildScaler(min,max,span,o);
var tsb=this.scaler.bounds;
if("scale" in this){
o.from=tsb.lower+this.offset;
o.to=(tsb.upper-tsb.lower)/this.scale+o.from;
if(!isFinite(o.from)||isNaN(o.from)||!isFinite(o.to)||isNaN(o.to)||o.to-o.from>=tsb.upper-tsb.lower){
delete o.from;
delete o.to;
delete this.scale;
delete this.offset;
}else{
if(o.from<tsb.lower){
o.to+=tsb.lower-o.from;
o.from=tsb.lower;
}else{
if(o.to>tsb.upper){
o.from+=tsb.upper-o.to;
o.to=tsb.upper;
}
}
this.offset=o.from-tsb.lower;
}
this.scaler=lin.buildScaler(min,max,span,o);
tsb=this.scaler.bounds;
if(this.scale==1&&this.offset==0){
delete this.scale;
delete this.offset;
}
}
var ta=this.chart.theme.axis,_150=0,_151=o.rotation%360,_152=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),size=_152?g.normalizedLength(g.splitFontString(_152).size):0,cosr=Math.abs(Math.cos(_151*Math.PI/180)),sinr=Math.abs(Math.sin(_151*Math.PI/180));
if(_151<0){
_151+=360;
}
if(size){
if(this.vertical?_151!=0&&_151!=180:_151!=90&&_151!=270){
if(this.labels){
_150=this._groupLabelWidth(this.labels,_152,o.maxLabelCharCount);
}else{
var _153=Math.ceil(Math.log(Math.max(Math.abs(tsb.from),Math.abs(tsb.to)))/Math.LN10),t=[];
if(tsb.from<0||tsb.to<0){
t.push("-");
}
t.push(dojo.string.rep("9",_153));
var _154=Math.floor(Math.log(tsb.to-tsb.from)/Math.LN10);
if(_154>0){
t.push(".");
t.push(dojo.string.rep("9",_154));
}
_150=dojox.gfx._base._getTextBox(t.join(""),{font:_152}).w;
}
_150=o.maxLabelSize?Math.min(o.maxLabelSize,_150):_150;
}else{
_150=size;
}
switch(_151){
case 0:
case 90:
case 180:
case 270:
break;
default:
var gap1=Math.sqrt(_150*_150+size*size),gap2=this.vertical?size*cosr+_150*sinr:_150*cosr+size*sinr;
_150=Math.min(gap1,gap2);
break;
}
}
this.scaler.minMinorStep=_150+_145;
this.ticks=lin.buildTicks(this.scaler,o);
return this;
},getScaler:function(){
return this.scaler;
},getTicks:function(){
return this.ticks;
}});
})();
}
if(!dojo._hasResource["dojo.colors"]){
dojo._hasResource["dojo.colors"]=true;
dojo.provide("dojo.colors");
dojo.getObject("colors",true,dojo);
(function(){
var _155=function(m1,m2,h){
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
dojo.colorFromRgb=function(_156,obj){
var m=_156.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
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
a=[_155(m1,m2,H+1/3)*256,_155(m1,m2,H)*256,_155(m1,m2,H-1/3)*256,1];
if(l==4){
a[3]=c[3];
}
return dojo.colorFromArray(a,obj);
}
}
return null;
};
var _157=function(c,low,high){
c=Number(c);
return isNaN(c)?high:c<low?low:c>high?high:c;
};
dojo.Color.prototype.sanitize=function(){
var t=this;
t.r=Math.round(_157(t.r,0,255));
t.g=Math.round(_157(t.g,0,255));
t.b=Math.round(_157(t.b,0,255));
t.a=_157(t.a,0,1);
return this;
};
})();
dojo.colors.makeGrey=function(g,a){
return dojo.colorFromArray([g,g,g,a]);
};
dojo.mixin(dojo.Color.named,{aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],transparent:[0,0,0,0],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]});
}
if(!dojo._hasResource["dojox.charting.axis2d.Default"]){
dojo._hasResource["dojox.charting.axis2d.Default"]=true;
dojo.provide("dojox.charting.axis2d.Default");
(function(){
var dc=dojox.charting,du=dojox.lang.utils,g=dojox.gfx,lin=dc.scaler.linear,_158=4,_159=45;
dojo.declare("dojox.charting.axis2d.Default",dojox.charting.axis2d.Invisible,{defaultParams:{vertical:false,fixUpper:"none",fixLower:"none",natural:false,leftBottom:true,includeZero:false,fixed:true,majorLabels:true,minorTicks:true,minorLabels:true,microTicks:false,rotation:0,htmlLabels:true},optionalParams:{min:0,max:1,from:0,to:1,majorTickStep:4,minorTickStep:2,microTickStep:1,labels:[],labelFunc:null,maxLabelSize:0,maxLabelCharCount:0,trailingSymbol:null,stroke:{},majorTick:{},minorTick:{},microTick:{},tick:{},font:"",fontColor:"",title:"",titleGap:0,titleFont:"",titleFontColor:"",titleOrientation:""},constructor:function(_15a,_15b){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_15b);
du.updateWithPattern(this.opt,_15b,this.optionalParams);
},getOffsets:function(){
var s=this.scaler,_15c={l:0,r:0,t:0,b:0};
if(!s){
return _15c;
}
var o=this.opt,_15d=0,a,b,c,d,gl=dc.scaler.common.getNumericLabel,_15e=0,ma=s.major,mi=s.minor,ta=this.chart.theme.axis,_15f=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_160=o.titleFont||(ta.tick&&ta.tick.titleFont),_161=(o.titleGap==0)?0:o.titleGap||(ta.tick&&ta.tick.titleGap)||15,_162=this.chart.theme.getTick("major",o),_163=this.chart.theme.getTick("minor",o),size=_15f?g.normalizedLength(g.splitFontString(_15f).size):0,_164=_160?g.normalizedLength(g.splitFontString(_160).size):0,_165=o.rotation%360,_166=o.leftBottom,cosr=Math.abs(Math.cos(_165*Math.PI/180)),sinr=Math.abs(Math.sin(_165*Math.PI/180));
this.trailingSymbol=(o.trailingSymbol===undefined||o.trailingSymbol===null)?this.trailingSymbol:o.trailingSymbol;
if(_165<0){
_165+=360;
}
if(size){
if(this.labels){
_15d=this._groupLabelWidth(this.labels,_15f,o.maxLabelCharCount);
}else{
_15d=this._groupLabelWidth([gl(ma.start,ma.prec,o),gl(ma.start+ma.count*ma.tick,ma.prec,o),gl(mi.start,mi.prec,o),gl(mi.start+mi.count*mi.tick,mi.prec,o)],_15f,o.maxLabelCharCount);
}
_15d=o.maxLabelSize?Math.min(o.maxLabelSize,_15d):_15d;
if(this.vertical){
var side=_166?"l":"r";
switch(_165){
case 0:
case 180:
_15c[side]=_15d;
_15c.t=_15c.b=size/2;
break;
case 90:
case 270:
_15c[side]=size;
_15c.t=_15c.b=_15d/2;
break;
default:
if(_165<=_159||(180<_165&&_165<=(180+_159))){
_15c[side]=size*sinr/2+_15d*cosr;
_15c[_166?"t":"b"]=size*cosr/2+_15d*sinr;
_15c[_166?"b":"t"]=size*cosr/2;
}else{
if(_165>(360-_159)||(180>_165&&_165>(180-_159))){
_15c[side]=size*sinr/2+_15d*cosr;
_15c[_166?"b":"t"]=size*cosr/2+_15d*sinr;
_15c[_166?"t":"b"]=size*cosr/2;
}else{
if(_165<90||(180<_165&&_165<270)){
_15c[side]=size*sinr+_15d*cosr;
_15c[_166?"t":"b"]=size*cosr+_15d*sinr;
}else{
_15c[side]=size*sinr+_15d*cosr;
_15c[_166?"b":"t"]=size*cosr+_15d*sinr;
}
}
}
break;
}
_15c[side]+=_158+Math.max(_162.length,_163.length)+(o.title?(_164+_161):0);
}else{
var side=_166?"b":"t";
switch(_165){
case 0:
case 180:
_15c[side]=size;
_15c.l=_15c.r=_15d/2;
break;
case 90:
case 270:
_15c[side]=_15d;
_15c.l=_15c.r=size/2;
break;
default:
if((90-_159)<=_165&&_165<=90||(270-_159)<=_165&&_165<=270){
_15c[side]=size*sinr/2+_15d*cosr;
_15c[_166?"r":"l"]=size*cosr/2+_15d*sinr;
_15c[_166?"l":"r"]=size*cosr/2;
}else{
if(90<=_165&&_165<=(90+_159)||270<=_165&&_165<=(270+_159)){
_15c[side]=size*sinr/2+_15d*cosr;
_15c[_166?"l":"r"]=size*cosr/2+_15d*sinr;
_15c[_166?"r":"l"]=size*cosr/2;
}else{
if(_165<_159||(180<_165&&_165<(180-_159))){
_15c[side]=size*sinr+_15d*cosr;
_15c[_166?"r":"l"]=size*cosr+_15d*sinr;
}else{
_15c[side]=size*sinr+_15d*cosr;
_15c[_166?"l":"r"]=size*cosr+_15d*sinr;
}
}
}
break;
}
_15c[side]+=_158+Math.max(_162.length,_163.length)+(o.title?(_164+_161):0);
}
}
if(_15d){
this._cachedLabelWidth=_15d;
}
return _15c;
},render:function(dim,_167){
if(!this.dirty){
return this;
}
var o=this.opt,ta=this.chart.theme.axis,_168=o.leftBottom,_169=o.rotation%360,_16a,stop,_16b,_16c=0,_16d,_16e,_16f,_170,_171,_172,_173=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font),_174=o.titleFont||(ta.tick&&ta.tick.titleFont),_175=o.fontColor||(ta.majorTick&&ta.majorTick.fontColor)||(ta.tick&&ta.tick.fontColor)||"black",_176=o.titleFontColor||(ta.tick&&ta.tick.titleFontColor)||"black",_177=(o.titleGap==0)?0:o.titleGap||(ta.tick&&ta.tick.titleGap)||15,_178=o.titleOrientation||(ta.tick&&ta.tick.titleOrientation)||"axis",_179=this.chart.theme.getTick("major",o),_17a=this.chart.theme.getTick("minor",o),_17b=this.chart.theme.getTick("micro",o),_17c=Math.max(_179.length,_17a.length,_17b.length),_17d="stroke" in o?o.stroke:ta.stroke,size=_173?g.normalizedLength(g.splitFontString(_173).size):0,cosr=Math.abs(Math.cos(_169*Math.PI/180)),sinr=Math.abs(Math.sin(_169*Math.PI/180)),_17e=_174?g.normalizedLength(g.splitFontString(_174).size):0;
if(_169<0){
_169+=360;
}
if(this.vertical){
_16a={y:dim.height-_167.b};
stop={y:_167.t};
_16b={y:(dim.height-_167.b+_167.t)/2};
_16d=size*sinr+(this._cachedLabelWidth||0)*cosr+_158+Math.max(_179.length,_17a.length)+_17e+_177;
_16e={x:0,y:-1};
_171={x:0,y:0};
_16f={x:1,y:0};
_170={x:_158,y:0};
switch(_169){
case 0:
_172="end";
_171.y=size*0.4;
break;
case 90:
_172="middle";
_171.x=-size;
break;
case 180:
_172="start";
_171.y=-size*0.4;
break;
case 270:
_172="middle";
break;
default:
if(_169<_159){
_172="end";
_171.y=size*0.4;
}else{
if(_169<90){
_172="end";
_171.y=size*0.4;
}else{
if(_169<(180-_159)){
_172="start";
}else{
if(_169<(180+_159)){
_172="start";
_171.y=-size*0.4;
}else{
if(_169<270){
_172="start";
_171.x=_168?0:size*0.4;
}else{
if(_169<(360-_159)){
_172="end";
_171.x=_168?0:size*0.4;
}else{
_172="end";
_171.y=size*0.4;
}
}
}
}
}
}
}
if(_168){
_16a.x=stop.x=_167.l;
_16c=(_178&&_178=="away")?90:270;
_16b.x=_167.l-_16d+(_16c==270?_17e:0);
_16f.x=-1;
_170.x=-_170.x;
}else{
_16a.x=stop.x=dim.width-_167.r;
_16c=(_178&&_178=="axis")?90:270;
_16b.x=dim.width-_167.r+_16d-(_16c==270?0:_17e);
switch(_172){
case "start":
_172="end";
break;
case "end":
_172="start";
break;
case "middle":
_171.x+=size;
break;
}
}
}else{
_16a={x:_167.l};
stop={x:dim.width-_167.r};
_16b={x:(dim.width-_167.r+_167.l)/2};
_16d=size*cosr+(this._cachedLabelWidth||0)*sinr+_158+Math.max(_179.length,_17a.length)+_17e+_177;
_16e={x:1,y:0};
_171={x:0,y:0};
_16f={x:0,y:1};
_170={x:0,y:_158};
switch(_169){
case 0:
_172="middle";
_171.y=size;
break;
case 90:
_172="start";
_171.x=-size*0.4;
break;
case 180:
_172="middle";
break;
case 270:
_172="end";
_171.x=size*0.4;
break;
default:
if(_169<(90-_159)){
_172="start";
_171.y=_168?size:0;
}else{
if(_169<(90+_159)){
_172="start";
_171.x=-size*0.4;
}else{
if(_169<180){
_172="start";
_171.y=_168?0:-size;
}else{
if(_169<(270-_159)){
_172="end";
_171.y=_168?0:-size;
}else{
if(_169<(270+_159)){
_172="end";
_171.y=_168?size*0.4:0;
}else{
_172="end";
_171.y=_168?size:0;
}
}
}
}
}
}
if(_168){
_16a.y=stop.y=dim.height-_167.b;
_16c=(_178&&_178=="axis")?180:0;
_16b.y=dim.height-_167.b+_16d-(_16c?_17e:0);
}else{
_16a.y=stop.y=_167.t;
_16c=(_178&&_178=="away")?180:0;
_16b.y=_167.t-_16d+(_16c?0:_17e);
_16f.y=-1;
_170.y=-_170.y;
switch(_172){
case "start":
_172="end";
break;
case "end":
_172="start";
break;
case "middle":
_171.y-=size;
break;
}
}
}
this.cleanGroup();
try{
var s=this.group,c=this.scaler,t=this.ticks,_17f,f=lin.getTransformerFromModel(this.scaler),_180=!_16c&&!_169&&this.opt.htmlLabels&&!dojo.isIE&&!dojo.isOpera?"html":"gfx",dx=_16f.x*_179.length,dy=_16f.y*_179.length;
s.createLine({x1:_16a.x,y1:_16a.y,x2:stop.x,y2:stop.y}).setStroke(_17d);
if(o.title){
var _181=dc.axis2d.common.createText[_180](this.chart,s,_16b.x,_16b.y,"middle",o.title,_174,_176);
if(_180=="html"){
this.htmlElements.push(_181);
}else{
_181.setTransform(g.matrix.rotategAt(_16c,_16b.x,_16b.y));
}
}
if(!t){
return;
}
dojo.forEach(t.major,function(tick){
var _182=f(tick.value),elem,x=_16a.x+_16e.x*_182,y=_16a.y+_16e.y*_182;
s.createLine({x1:x,y1:y,x2:x+dx,y2:y+dy}).setStroke(_179);
if(tick.label){
var _183=o.maxLabelCharCount?this.getTextWithLimitCharCount(tick.label,_173,o.maxLabelCharCount):{text:tick.label,truncated:false};
_183=o.maxLabelSize?this.getTextWithLimitLength(_183.text,_173,o.maxLabelSize,_183.truncated):_183;
elem=dc.axis2d.common.createText[_180](this.chart,s,x+dx+_170.x+(_169?0:_171.x),y+dy+_170.y+(_169?0:_171.y),_172,_183.text,_173,_175);
_183.truncated&&this.labelTooltip(elem,this.chart,tick.label,_183.text,_173,_180);
if(_180=="html"){
this.htmlElements.push(elem);
}else{
if(_169){
elem.setTransform([{dx:_171.x,dy:_171.y},g.matrix.rotategAt(_169,x+dx+_170.x,y+dy+_170.y)]);
}
}
}
},this);
dx=_16f.x*_17a.length;
dy=_16f.y*_17a.length;
_17f=c.minMinorStep<=c.minor.tick*c.bounds.scale;
dojo.forEach(t.minor,function(tick){
var _184=f(tick.value),elem,x=_16a.x+_16e.x*_184,y=_16a.y+_16e.y*_184;
s.createLine({x1:x,y1:y,x2:x+dx,y2:y+dy}).setStroke(_17a);
if(_17f&&tick.label){
var _185=o.maxLabelCharCount?this.getTextWithLimitCharCount(tick.label,_173,o.maxLabelCharCount):{text:tick.label,truncated:false};
_185=o.maxLabelSize?this.getTextWithLimitLength(_185.text,_173,o.maxLabelSize,_185.truncated):_185;
elem=dc.axis2d.common.createText[_180](this.chart,s,x+dx+_170.x+(_169?0:_171.x),y+dy+_170.y+(_169?0:_171.y),_172,_185.text,_173,_175);
_185.truncated&&this.labelTooltip(elem,this.chart,tick.label,_185.text,_173,_180);
if(_180=="html"){
this.htmlElements.push(elem);
}else{
if(_169){
elem.setTransform([{dx:_171.x,dy:_171.y},g.matrix.rotategAt(_169,x+dx+_170.x,y+dy+_170.y)]);
}
}
}
},this);
dx=_16f.x*_17b.length;
dy=_16f.y*_17b.length;
dojo.forEach(t.micro,function(tick){
var _186=f(tick.value),elem,x=_16a.x+_16e.x*_186,y=_16a.y+_16e.y*_186;
s.createLine({x1:x,y1:y,x2:x+dx,y2:y+dy}).setStroke(_17b);
},this);
}
catch(e){
}
this.dirty=false;
return this;
},labelTooltip:function(elem,_187,_188,_189,font,_18a){
if(!dijit||!dijit.Tooltip){
return;
}
var _18b={type:"rect"},_18c=["above","below"],_18d=dojox.gfx._base._getTextBox(_189,{font:font}).w||0;
fontHeight=font?g.normalizedLength(g.splitFontString(font).size):0;
if(_18a=="html"){
dojo.mixin(_18b,dojo.coords(elem.firstChild,true));
_18b.width=Math.ceil(_18d);
_18b.height=Math.ceil(fontHeight);
this._events.push({shape:dojo,handle:dojo.connect(elem.firstChild,"onmouseover",this,function(e){
dijit.showTooltip(_188,_18b,_18c);
})});
this._events.push({shape:dojo,handle:dojo.connect(elem.firstChild,"onmouseout",this,function(e){
dijit.hideTooltip(_18b);
})});
}else{
var shp=elem.getShape(),lt=dojo.coords(_187.node,true);
_18b=dojo.mixin(_18b,{x:shp.x-_18d/2,y:shp.y});
_18b.x+=lt.x;
_18b.y+=lt.y;
_18b.x=Math.round(_18b.x);
_18b.y=Math.round(_18b.y);
_18b.width=Math.ceil(_18d);
_18b.height=Math.ceil(fontHeight);
this._events.push({shape:elem,handle:elem.connect("onmouseenter",this,function(e){
dijit.showTooltip(_188,_18b,_18c);
})});
this._events.push({shape:elem,handle:elem.connect("onmouseleave",this,function(e){
dijit.hideTooltip(_18b);
})});
}
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.common"]){
dojo._hasResource["dojox.charting.plot2d.common"]=true;
dojo.provide("dojox.charting.plot2d.common");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common;
dojo.mixin(dojox.charting.plot2d.common,{makeStroke:function(_18e){
if(!_18e){
return _18e;
}
if(typeof _18e=="string"||_18e instanceof dojo.Color){
_18e={color:_18e};
}
return dojox.gfx.makeParameters(dojox.gfx.defaultStroke,_18e);
},augmentColor:function(_18f,_190){
var t=new dojo.Color(_18f),c=new dojo.Color(_190);
c.a=t.a;
return c;
},augmentStroke:function(_191,_192){
var s=dc.makeStroke(_191);
if(s){
s.color=dc.augmentColor(s.color,_192);
}
return s;
},augmentFill:function(fill,_193){
var fc,c=new dojo.Color(_193);
if(typeof fill=="string"||fill instanceof dojo.Color){
return dc.augmentColor(fill,_193);
}
return fill;
},defaultStats:{vmin:Number.POSITIVE_INFINITY,vmax:Number.NEGATIVE_INFINITY,hmin:Number.POSITIVE_INFINITY,hmax:Number.NEGATIVE_INFINITY},collectSimpleStats:function(_194){
var _195=dojo.delegate(dc.defaultStats);
for(var i=0;i<_194.length;++i){
var run=_194[i];
for(var j=0;j<run.data.length;j++){
if(run.data[j]!==null){
if(typeof run.data[j]=="number"){
var _196=_195.vmin,_197=_195.vmax;
if(!("ymin" in run)||!("ymax" in run)){
dojo.forEach(run.data,function(val,i){
if(val!==null){
var x=i+1,y=val;
if(isNaN(y)){
y=0;
}
_195.hmin=Math.min(_195.hmin,x);
_195.hmax=Math.max(_195.hmax,x);
_195.vmin=Math.min(_195.vmin,y);
_195.vmax=Math.max(_195.vmax,y);
}
});
}
if("ymin" in run){
_195.vmin=Math.min(_196,run.ymin);
}
if("ymax" in run){
_195.vmax=Math.max(_197,run.ymax);
}
}else{
var _198=_195.hmin,_199=_195.hmax,_196=_195.vmin,_197=_195.vmax;
if(!("xmin" in run)||!("xmax" in run)||!("ymin" in run)||!("ymax" in run)){
dojo.forEach(run.data,function(val,i){
if(val!==null){
var x="x" in val?val.x:i+1,y=val.y;
if(isNaN(x)){
x=0;
}
if(isNaN(y)){
y=0;
}
_195.hmin=Math.min(_195.hmin,x);
_195.hmax=Math.max(_195.hmax,x);
_195.vmin=Math.min(_195.vmin,y);
_195.vmax=Math.max(_195.vmax,y);
}
});
}
if("xmin" in run){
_195.hmin=Math.min(_198,run.xmin);
}
if("xmax" in run){
_195.hmax=Math.max(_199,run.xmax);
}
if("ymin" in run){
_195.vmin=Math.min(_196,run.ymin);
}
if("ymax" in run){
_195.vmax=Math.max(_197,run.ymax);
}
}
break;
}
}
}
return _195;
},calculateBarSize:function(_19a,opt,_19b){
if(!_19b){
_19b=1;
}
var gap=opt.gap,size=(_19a-2*gap)/_19b;
if("minBarSize" in opt){
size=Math.max(size,opt.minBarSize);
}
if("maxBarSize" in opt){
size=Math.min(size,opt.maxBarSize);
}
size=Math.max(size,1);
gap=(_19a-size*_19b)/2;
return {size:size,gap:gap};
},collectStackedStats:function(_19c){
var _19d=dojo.clone(dc.defaultStats);
if(_19c.length){
_19d.hmin=Math.min(_19d.hmin,1);
_19d.hmax=df.foldl(_19c,"seed, run -> Math.max(seed, run.data.length)",_19d.hmax);
for(var i=0;i<_19d.hmax;++i){
var v=_19c[0].data[i];
v=v&&(typeof v=="number"?v:v.y);
if(isNaN(v)){
v=0;
}
_19d.vmin=Math.min(_19d.vmin,v);
for(var j=1;j<_19c.length;++j){
var t=_19c[j].data[i];
t=t&&(typeof t=="number"?t:t.y);
if(isNaN(t)){
t=0;
}
v+=t;
}
_19d.vmax=Math.max(_19d.vmax,v);
}
}
return _19d;
},curve:function(a,_19e){
var arr=a.slice(0);
if(_19e=="x"){
arr[arr.length]=arr[0];
}
var p=dojo.map(arr,function(item,i){
if(i==0){
return "M"+item.x+","+item.y;
}
if(!isNaN(_19e)){
var dx=item.x-arr[i-1].x,dy=arr[i-1].y;
return "C"+(item.x-(_19e-1)*(dx/_19e))+","+dy+" "+(item.x-(dx/_19e))+","+item.y+" "+item.x+","+item.y;
}else{
if(_19e=="X"||_19e=="x"||_19e=="S"){
var p0,p1=arr[i-1],p2=arr[i],p3;
var bz1x,bz1y,bz2x,bz2y;
var f=1/6;
if(i==1){
if(_19e=="x"){
p0=arr[arr.length-2];
}else{
p0=p1;
}
f=1/3;
}else{
p0=arr[i-2];
}
if(i==(arr.length-1)){
if(_19e=="x"){
p3=arr[1];
}else{
p3=p2;
}
f=1/3;
}else{
p3=arr[i+1];
}
var p1p2=Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y));
var p0p2=Math.sqrt((p2.x-p0.x)*(p2.x-p0.x)+(p2.y-p0.y)*(p2.y-p0.y));
var p1p3=Math.sqrt((p3.x-p1.x)*(p3.x-p1.x)+(p3.y-p1.y)*(p3.y-p1.y));
var _19f=p0p2*f;
var _1a0=p1p3*f;
if(_19f>p1p2/2&&_1a0>p1p2/2){
_19f=p1p2/2;
_1a0=p1p2/2;
}else{
if(_19f>p1p2/2){
_19f=p1p2/2;
_1a0=p1p2/2*p1p3/p0p2;
}else{
if(_1a0>p1p2/2){
_1a0=p1p2/2;
_19f=p1p2/2*p0p2/p1p3;
}
}
}
if(_19e=="S"){
if(p0==p1){
_19f=0;
}
if(p2==p3){
_1a0=0;
}
}
bz1x=p1.x+_19f*(p2.x-p0.x)/p0p2;
bz1y=p1.y+_19f*(p2.y-p0.y)/p0p2;
bz2x=p2.x-_1a0*(p3.x-p1.x)/p1p3;
bz2y=p2.y-_1a0*(p3.y-p1.y)/p1p3;
}
}
return "C"+(bz1x+","+bz1y+" "+bz2x+","+bz2y+" "+p2.x+","+p2.y);
});
return p.join(" ");
},getLabel:function(_1a1,_1a2,_1a3){
if(dojo.number){
return (_1a2?dojo.number.format(_1a1,{places:_1a3}):dojo.number.format(_1a1))||"";
}
return _1a2?_1a1.toFixed(_1a3):_1a1.toString();
}});
})();
}
if(!dojo._hasResource["dojox.charting.scaler.primitive"]){
dojo._hasResource["dojox.charting.scaler.primitive"]=true;
dojo.provide("dojox.charting.scaler.primitive");
dojox.charting.scaler.primitive={buildScaler:function(min,max,span,_1a4){
if(min==max){
min-=0.5;
max+=0.5;
}
return {bounds:{lower:min,upper:max,from:min,to:max,scale:span/(max-min),span:span},scaler:dojox.charting.scaler.primitive};
},buildTicks:function(_1a5,_1a6){
return {major:[],minor:[],micro:[]};
},getTransformerFromModel:function(_1a7){
var _1a8=_1a7.bounds.from,_1a9=_1a7.bounds.scale;
return function(x){
return (x-_1a8)*_1a9;
};
},getTransformerFromPlot:function(_1aa){
var _1ab=_1aa.bounds.from,_1ac=_1aa.bounds.scale;
return function(x){
return x/_1ac+_1ab;
};
}};
}
if(!dojo._hasResource["dojox.charting.plot2d._PlotEvents"]){
dojo._hasResource["dojox.charting.plot2d._PlotEvents"]=true;
dojo.provide("dojox.charting.plot2d._PlotEvents");
dojo.declare("dojox.charting.plot2d._PlotEvents",null,{constructor:function(){
this._shapeEvents=[];
this._eventSeries={};
},destroy:function(){
this.resetEvents();
this.inherited(arguments);
},plotEvent:function(o){
},raiseEvent:function(o){
this.plotEvent(o);
var t=dojo.delegate(o);
t.originalEvent=o.type;
t.originalPlot=o.plot;
t.type="onindirect";
dojo.forEach(this.chart.stack,function(plot){
if(plot!==this&&plot.plotEvent){
t.plot=plot;
plot.plotEvent(t);
}
},this);
},connect:function(_1ad,_1ae){
this.dirty=true;
return dojo.connect(this,"plotEvent",_1ad,_1ae);
},events:function(){
var ls=this.plotEvent._listeners;
if(!ls||!ls.length){
return false;
}
for(var i in ls){
if(!(i in Array.prototype)){
return true;
}
}
return false;
},resetEvents:function(){
if(this._shapeEvents.length){
dojo.forEach(this._shapeEvents,function(item){
item.shape.disconnect(item.handle);
});
this._shapeEvents=[];
}
this.raiseEvent({type:"onplotreset",plot:this});
},_connectSingleEvent:function(o,_1af){
this._shapeEvents.push({shape:o.eventMask,handle:o.eventMask.connect(_1af,this,function(e){
o.type=_1af;
o.event=e;
this.raiseEvent(o);
o.event=null;
})});
},_connectEvents:function(o){
if(o){
o.chart=this.chart;
o.plot=this;
o.hAxis=this.hAxis||null;
o.vAxis=this.vAxis||null;
o.eventMask=o.eventMask||o.shape;
this._connectSingleEvent(o,"onmouseover");
this._connectSingleEvent(o,"onmouseout");
this._connectSingleEvent(o,"onclick");
}
},_reconnectEvents:function(_1b0){
var a=this._eventSeries[_1b0];
if(a){
dojo.forEach(a,this._connectEvents,this);
}
},fireEvent:function(_1b1,_1b2,_1b3,_1b4){
var s=this._eventSeries[_1b1];
if(s&&s.length&&_1b3<s.length){
var o=s[_1b3];
o.type=_1b2;
o.event=_1b4||null;
this.raiseEvent(o);
o.event=null;
}
}});
}
if(!dojo._hasResource["dojox.charting.plot2d.Base"]){
dojo._hasResource["dojox.charting.plot2d.Base"]=true;
dojo.provide("dojox.charting.plot2d.Base");
dojo.declare("dojox.charting.plot2d.Base",[dojox.charting.Element,dojox.charting.plot2d._PlotEvents],{constructor:function(_1b5,_1b6){
this.zoom=null,this.zoomQueue=[];
this.lastWindow={vscale:1,hscale:1,xoffset:0,yoffset:0};
},clear:function(){
this.series=[];
this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this;
},setAxis:function(axis){
if(axis){
this[axis.vertical?"_vAxis":"_hAxis"]=axis;
}
return this;
},addSeries:function(run){
this.series.push(run);
return this;
},getSeriesStats:function(){
return dojox.charting.plot2d.common.collectSimpleStats(this.series);
},calculateAxes:function(dim){
this.initializeScalers(dim,this.getSeriesStats());
return this;
},isDirty:function(){
return this.dirty||this._hAxis&&this._hAxis.dirty||this._vAxis&&this._vAxis.dirty;
},isDataDirty:function(){
return dojo.some(this.series,function(item){
return item.dirty;
});
},performZoom:function(dim,_1b7){
var vs=this._vAxis.scale||1,hs=this._hAxis.scale||1,_1b8=dim.height-_1b7.b,_1b9=this._hScaler.bounds,_1ba=(_1b9.from-_1b9.lower)*_1b9.scale,_1bb=this._vScaler.bounds,_1bc=(_1bb.from-_1bb.lower)*_1bb.scale;
rVScale=vs/this.lastWindow.vscale,rHScale=hs/this.lastWindow.hscale,rXOffset=(this.lastWindow.xoffset-_1ba)/((this.lastWindow.hscale==1)?hs:this.lastWindow.hscale),rYOffset=(_1bc-this.lastWindow.yoffset)/((this.lastWindow.vscale==1)?vs:this.lastWindow.vscale),shape=this.group,anim=dojox.gfx.fx.animateTransform(dojo.delegate({shape:shape,duration:1200,transform:[{name:"translate",start:[0,0],end:[_1b7.l*(1-rHScale),_1b8*(1-rVScale)]},{name:"scale",start:[1,1],end:[rHScale,rVScale]},{name:"original"},{name:"translate",start:[0,0],end:[rXOffset,rYOffset]}]},this.zoom));
dojo.mixin(this.lastWindow,{vscale:vs,hscale:hs,xoffset:_1ba,yoffset:_1bc});
this.zoomQueue.push(anim);
dojo.connect(anim,"onEnd",this,function(){
this.zoom=null;
this.zoomQueue.shift();
if(this.zoomQueue.length>0){
this.zoomQueue[0].play();
}
});
if(this.zoomQueue.length==1){
this.zoomQueue[0].play();
}
return this;
},render:function(dim,_1bd){
return this;
},getRequiredColors:function(){
return this.series.length;
},initializeScalers:function(dim,_1be){
if(this._hAxis){
if(!this._hAxis.initialized()){
this._hAxis.calculate(_1be.hmin,_1be.hmax,dim.width);
}
this._hScaler=this._hAxis.getScaler();
}else{
this._hScaler=dojox.charting.scaler.primitive.buildScaler(_1be.hmin,_1be.hmax,dim.width);
}
if(this._vAxis){
if(!this._vAxis.initialized()){
this._vAxis.calculate(_1be.vmin,_1be.vmax,dim.height);
}
this._vScaler=this._vAxis.getScaler();
}else{
this._vScaler=dojox.charting.scaler.primitive.buildScaler(_1be.vmin,_1be.vmax,dim.height);
}
return this;
}});
}
if(!dojo._hasResource["dojox.lang.functional.reversed"]){
dojo._hasResource["dojox.lang.functional.reversed"]=true;
dojo.provide("dojox.lang.functional.reversed");
(function(){
var d=dojo,df=dojox.lang.functional;
d.mixin(df,{filterRev:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var t=[],v,i=a.length-1;
for(;i>=0;--i){
v=a[i];
if(f.call(o,v,i,a)){
t.push(v);
}
}
return t;
},forEachRev:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
for(var i=a.length-1;i>=0;f.call(o,a[i],i,a),--i){
}
},mapRev:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var n=a.length,t=new Array(n),i=n-1,j=0;
for(;i>=0;t[j++]=f.call(o,a[i],i,a),--i){
}
return t;
},everyRev:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
for(var i=a.length-1;i>=0;--i){
if(!f.call(o,a[i],i,a)){
return false;
}
}
return true;
},someRev:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
for(var i=a.length-1;i>=0;--i){
if(f.call(o,a[i],i,a)){
return true;
}
}
return false;
}});
})();
}
if(!dojo._hasResource["dojox.gfx.fx"]){
dojo._hasResource["dojox.gfx.fx"]=true;
dojo.provide("dojox.gfx.fx");
(function(){
var d=dojo,g=dojox.gfx,m=g.matrix;
function _1bf(_1c0,end){
this.start=_1c0,this.end=end;
};
_1bf.prototype.getValue=function(r){
return (this.end-this.start)*r+this.start;
};
function _1c1(_1c2,end,_1c3){
this.start=_1c2,this.end=end;
this.units=_1c3;
};
_1c1.prototype.getValue=function(r){
return (this.end-this.start)*r+this.start+this.units;
};
function _1c4(_1c5,end){
this.start=_1c5,this.end=end;
this.temp=new dojo.Color();
};
_1c4.prototype.getValue=function(r){
return d.blendColors(this.start,this.end,r,this.temp);
};
function _1c6(_1c7){
this.values=_1c7;
this.length=_1c7.length;
};
_1c6.prototype.getValue=function(r){
return this.values[Math.min(Math.floor(r*this.length),this.length-1)];
};
function _1c8(_1c9,def){
this.values=_1c9;
this.def=def?def:{};
};
_1c8.prototype.getValue=function(r){
var ret=dojo.clone(this.def);
for(var i in this.values){
ret[i]=this.values[i].getValue(r);
}
return ret;
};
function _1ca(_1cb,_1cc){
this.stack=_1cb;
this.original=_1cc;
};
_1ca.prototype.getValue=function(r){
var ret=[];
dojo.forEach(this.stack,function(t){
if(t instanceof m.Matrix2D){
ret.push(t);
return;
}
if(t.name=="original"&&this.original){
ret.push(this.original);
return;
}
if(!(t.name in m)){
return;
}
var f=m[t.name];
if(typeof f!="function"){
ret.push(f);
return;
}
var val=dojo.map(t.start,function(v,i){
return (t.end[i]-v)*r+v;
}),_1cd=f.apply(m,val);
if(_1cd instanceof m.Matrix2D){
ret.push(_1cd);
}
},this);
return ret;
};
var _1ce=new d.Color(0,0,0,0);
function _1cf(prop,obj,name,def){
if(prop.values){
return new _1c6(prop.values);
}
var _1d0,_1d1,end;
if(prop.start){
_1d1=g.normalizeColor(prop.start);
}else{
_1d1=_1d0=obj?(name?obj[name]:obj):def;
}
if(prop.end){
end=g.normalizeColor(prop.end);
}else{
if(!_1d0){
_1d0=obj?(name?obj[name]:obj):def;
}
end=_1d0;
}
return new _1c4(_1d1,end);
};
function _1d2(prop,obj,name,def){
if(prop.values){
return new _1c6(prop.values);
}
var _1d3,_1d4,end;
if(prop.start){
_1d4=prop.start;
}else{
_1d4=_1d3=obj?obj[name]:def;
}
if(prop.end){
end=prop.end;
}else{
if(typeof _1d3!="number"){
_1d3=obj?obj[name]:def;
}
end=_1d3;
}
return new _1bf(_1d4,end);
};
g.fx.animateStroke=function(args){
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args),_1d5=args.shape,_1d6;
d.connect(anim,"beforeBegin",anim,function(){
_1d6=_1d5.getStroke();
var prop=args.color,_1d7={},_1d8,_1d9,end;
if(prop){
_1d7.color=_1cf(prop,_1d6,"color",_1ce);
}
prop=args.style;
if(prop&&prop.values){
_1d7.style=new _1c6(prop.values);
}
prop=args.width;
if(prop){
_1d7.width=_1d2(prop,_1d6,"width",1);
}
prop=args.cap;
if(prop&&prop.values){
_1d7.cap=new _1c6(prop.values);
}
prop=args.join;
if(prop){
if(prop.values){
_1d7.join=new _1c6(prop.values);
}else{
_1d9=prop.start?prop.start:(_1d6&&_1d6.join||0);
end=prop.end?prop.end:(_1d6&&_1d6.join||0);
if(typeof _1d9=="number"&&typeof end=="number"){
_1d7.join=new _1bf(_1d9,end);
}
}
}
this.curve=new _1c8(_1d7,_1d6);
});
d.connect(anim,"onAnimate",_1d5,"setStroke");
return anim;
};
g.fx.animateFill=function(args){
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args),_1da=args.shape,fill;
d.connect(anim,"beforeBegin",anim,function(){
fill=_1da.getFill();
var prop=args.color,_1db={};
if(prop){
this.curve=_1cf(prop,fill,"",_1ce);
}
});
d.connect(anim,"onAnimate",_1da,"setFill");
return anim;
};
g.fx.animateFont=function(args){
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args),_1dc=args.shape,font;
d.connect(anim,"beforeBegin",anim,function(){
font=_1dc.getFont();
var prop=args.style,_1dd={},_1de,_1df,end;
if(prop&&prop.values){
_1dd.style=new _1c6(prop.values);
}
prop=args.variant;
if(prop&&prop.values){
_1dd.variant=new _1c6(prop.values);
}
prop=args.weight;
if(prop&&prop.values){
_1dd.weight=new _1c6(prop.values);
}
prop=args.family;
if(prop&&prop.values){
_1dd.family=new _1c6(prop.values);
}
prop=args.size;
if(prop&&prop.units){
_1df=parseFloat(prop.start?prop.start:(_1dc.font&&_1dc.font.size||"0"));
end=parseFloat(prop.end?prop.end:(_1dc.font&&_1dc.font.size||"0"));
_1dd.size=new _1c1(_1df,end,prop.units);
}
this.curve=new _1c8(_1dd,font);
});
d.connect(anim,"onAnimate",_1dc,"setFont");
return anim;
};
g.fx.animateTransform=function(args){
if(!args.easing){
args.easing=d._defaultEasing;
}
var anim=new d.Animation(args),_1e0=args.shape,_1e1;
d.connect(anim,"beforeBegin",anim,function(){
_1e1=_1e0.getTransform();
this.curve=new _1ca(args.transform,_1e1);
});
d.connect(anim,"onAnimate",_1e0,"setTransform");
return anim;
};
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Default"]){
dojo._hasResource["dojox.charting.plot2d.Default"]=true;
dojo.provide("dojox.charting.plot2d.Default");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_1e2=df.lambda("item.purgeGroup()");
var _1e3=1200;
dojo.declare("dojox.charting.plot2d.Default",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",lines:true,areas:false,markers:false,tension:"",animate:false},optionalParams:{stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:"",markerStroke:{},markerOutline:{},markerShadow:{},markerFill:{},markerFont:"",markerFontColor:""},constructor:function(_1e4,_1e5){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_1e5);
du.updateWithPattern(this.opt,_1e5,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},render:function(dim,_1e6){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_1e6);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_1e2);
this._eventSeries={};
this.cleanGroup();
this.group.setTransform(null);
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,_1e7,_1e8,_1e9,_1ea=this.events();
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
if(!run.data.length){
run.dirty=false;
t.skip();
continue;
}
var _1eb=t.next(this.opt.areas?"area":"line",[this.opt,run],true),s=run.group,_1ec=[],_1ed=[],rseg=null,_1ee,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_1ef=this._eventSeries[run.name]=new Array(run.data.length);
for(var j=0;j<run.data.length;j++){
if(run.data[j]!=null){
if(!rseg){
rseg=[];
_1ed.push(j);
_1ec.push(rseg);
}
rseg.push(run.data[j]);
}else{
rseg=null;
}
}
for(var seg=0;seg<_1ec.length;seg++){
if(typeof _1ec[seg][0]=="number"){
_1ee=dojo.map(_1ec[seg],function(v,i){
return {x:ht(i+_1ed[seg]+1)+_1e6.l,y:dim.height-_1e6.b-vt(v)};
},this);
}else{
_1ee=dojo.map(_1ec[seg],function(v,i){
return {x:ht(v.x)+_1e6.l,y:dim.height-_1e6.b-vt(v.y)};
},this);
}
var _1f0=this.opt.tension?dc.curve(_1ee,this.opt.tension):"";
if(this.opt.areas&&_1ee.length>1){
var fill=_1eb.series.fill;
var _1f1=dojo.clone(_1ee);
if(this.opt.tension){
var _1f2="L"+_1f1[_1f1.length-1].x+","+(dim.height-_1e6.b)+" L"+_1f1[0].x+","+(dim.height-_1e6.b)+" L"+_1f1[0].x+","+_1f1[0].y;
run.dyn.fill=s.createPath(_1f0+" "+_1f2).setFill(fill).getFill();
}else{
_1f1.push({x:_1ee[_1ee.length-1].x,y:dim.height-_1e6.b});
_1f1.push({x:_1ee[0].x,y:dim.height-_1e6.b});
_1f1.push(_1ee[0]);
run.dyn.fill=s.createPolyline(_1f1).setFill(fill).getFill();
}
}
if(this.opt.lines||this.opt.markers){
_1e7=_1eb.series.stroke;
if(_1eb.series.outline){
_1e8=run.dyn.outline=dc.makeStroke(_1eb.series.outline);
_1e8.width=2*_1e8.width+_1e7.width;
}
}
if(this.opt.markers){
run.dyn.marker=_1eb.symbol;
}
var _1f3=null,_1f4=null,_1f5=null;
if(_1e7&&_1eb.series.shadow&&_1ee.length>1){
var _1f6=_1eb.series.shadow,_1f7=dojo.map(_1ee,function(c){
return {x:c.x+_1f6.dx,y:c.y+_1f6.dy};
});
if(this.opt.lines){
if(this.opt.tension){
run.dyn.shadow=s.createPath(dc.curve(_1f7,this.opt.tension)).setStroke(_1f6).getStroke();
}else{
run.dyn.shadow=s.createPolyline(_1f7).setStroke(_1f6).getStroke();
}
}
if(this.opt.markers&&_1eb.marker.shadow){
_1f6=_1eb.marker.shadow;
_1f5=dojo.map(_1f7,function(c){
return s.createPath("M"+c.x+" "+c.y+" "+_1eb.symbol).setStroke(_1f6).setFill(_1f6.color);
},this);
}
}
if(this.opt.lines&&_1ee.length>1){
if(_1e8){
if(this.opt.tension){
run.dyn.outline=s.createPath(_1f0).setStroke(_1e8).getStroke();
}else{
run.dyn.outline=s.createPolyline(_1ee).setStroke(_1e8).getStroke();
}
}
if(this.opt.tension){
run.dyn.stroke=s.createPath(_1f0).setStroke(_1e7).getStroke();
}else{
run.dyn.stroke=s.createPolyline(_1ee).setStroke(_1e7).getStroke();
}
}
if(this.opt.markers){
_1f3=new Array(_1ee.length);
_1f4=new Array(_1ee.length);
_1e8=null;
if(_1eb.marker.outline){
_1e8=dc.makeStroke(_1eb.marker.outline);
_1e8.width=2*_1e8.width+(_1eb.marker.stroke?_1eb.marker.stroke.width:0);
}
dojo.forEach(_1ee,function(c,i){
var path="M"+c.x+" "+c.y+" "+_1eb.symbol;
if(_1e8){
_1f4[i]=s.createPath(path).setStroke(_1e8);
}
_1f3[i]=s.createPath(path).setStroke(_1eb.marker.stroke).setFill(_1eb.marker.fill);
},this);
run.dyn.markerFill=_1eb.marker.fill;
run.dyn.markerStroke=_1eb.marker.stroke;
if(_1ea){
dojo.forEach(_1f3,function(s,i){
var o={element:"marker",index:i+_1ed[seg],run:run,shape:s,outline:_1f4[i]||null,shadow:_1f5&&_1f5[i]||null,cx:_1ee[i].x,cy:_1ee[i].y};
if(typeof _1ec[seg][0]=="number"){
o.x=i+_1ed[seg]+1;
o.y=_1ec[seg][i];
}else{
o.x=_1ec[seg][i].x;
o.y=_1ec[seg][i].y;
}
this._connectEvents(o);
_1ef[i+_1ed[seg]]=o;
},this);
}else{
delete this._eventSeries[run.name];
}
}
}
run.dirty=false;
}
if(this.animate){
var _1f8=this.group;
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_1f8,duration:_1e3,transform:[{name:"translate",start:[0,dim.height-_1e6.b],end:[0,0]},{name:"scale",start:[1,0],end:[1,1]},{name:"original"}]},this.animate)).play();
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Lines"]){
dojo._hasResource["dojox.charting.plot2d.Lines"]=true;
dojo.provide("dojox.charting.plot2d.Lines");
dojo.declare("dojox.charting.plot2d.Lines",dojox.charting.plot2d.Default,{constructor:function(){
this.opt.lines=true;
}});
}
if(!dojo._hasResource["dojox.charting.plot2d.Areas"]){
dojo._hasResource["dojox.charting.plot2d.Areas"]=true;
dojo.provide("dojox.charting.plot2d.Areas");
dojo.declare("dojox.charting.plot2d.Areas",dojox.charting.plot2d.Default,{constructor:function(){
this.opt.lines=true;
this.opt.areas=true;
}});
}
if(!dojo._hasResource["dojox.charting.plot2d.Markers"]){
dojo._hasResource["dojox.charting.plot2d.Markers"]=true;
dojo.provide("dojox.charting.plot2d.Markers");
dojo.declare("dojox.charting.plot2d.Markers",dojox.charting.plot2d.Default,{constructor:function(){
this.opt.markers=true;
}});
}
if(!dojo._hasResource["dojox.charting.plot2d.MarkersOnly"]){
dojo._hasResource["dojox.charting.plot2d.MarkersOnly"]=true;
dojo.provide("dojox.charting.plot2d.MarkersOnly");
dojo.declare("dojox.charting.plot2d.MarkersOnly",dojox.charting.plot2d.Default,{constructor:function(){
this.opt.lines=false;
this.opt.markers=true;
}});
}
if(!dojo._hasResource["dojox.gfx.gradutils"]){
dojo._hasResource["dojox.gfx.gradutils"]=true;
dojo.provide("dojox.gfx.gradutils");
(function(){
var d=dojo,m=dojox.gfx.matrix,C=d.Color;
function _1f9(o,c){
if(o<=0){
return c[0].color;
}
var len=c.length;
if(o>=1){
return c[len-1].color;
}
for(var i=0;i<len;++i){
var stop=c[i];
if(stop.offset>=o){
if(i){
var prev=c[i-1];
return d.blendColors(new C(prev.color),new C(stop.color),(o-prev.offset)/(stop.offset-prev.offset));
}
return stop.color;
}
}
return c[len-1].color;
};
dojox.gfx.gradutils.getColor=function(fill,pt){
var o;
if(fill){
switch(fill.type){
case "linear":
var _1fa=Math.atan2(fill.y2-fill.y1,fill.x2-fill.x1),_1fb=m.rotate(-_1fa),_1fc=m.project(fill.x2-fill.x1,fill.y2-fill.y1),p=m.multiplyPoint(_1fc,pt),pf1=m.multiplyPoint(_1fc,fill.x1,fill.y1),pf2=m.multiplyPoint(_1fc,fill.x2,fill.y2),_1fd=m.multiplyPoint(_1fb,pf2.x-pf1.x,pf2.y-pf1.y).x,o=m.multiplyPoint(_1fb,p.x-pf1.x,p.y-pf1.y).x/_1fd;
break;
case "radial":
var dx=pt.x-fill.cx,dy=pt.y-fill.cy,o=Math.sqrt(dx*dx+dy*dy)/fill.r;
break;
}
return _1f9(o,fill.colors);
}
return new C(fill||[0,0,0,0]);
};
dojox.gfx.gradutils.reverse=function(fill){
if(fill){
switch(fill.type){
case "linear":
case "radial":
fill=dojo.delegate(fill);
if(fill.colors){
var c=fill.colors,l=c.length,i=0,stop,n=fill.colors=new Array(c.length);
for(;i<l;++i){
stop=c[i];
n[i]={offset:1-stop.offset,color:stop.color};
}
n.sort(function(a,b){
return a.offset-b.offset;
});
}
break;
}
}
return fill;
};
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Scatter"]){
dojo._hasResource["dojox.charting.plot2d.Scatter"]=true;
dojo.provide("dojox.charting.plot2d.Scatter");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_1fe=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Scatter",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",shadows:null,animate:null},optionalParams:{markerStroke:{},markerOutline:{},markerShadow:{},markerFill:{},markerFont:"",markerFontColor:""},constructor:function(_1ff,_200){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_200);
du.updateWithPattern(this.opt,_200,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},render:function(dim,_201){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_201);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_1fe);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,_202=this.events();
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
if(!run.data.length){
run.dirty=false;
t.skip();
continue;
}
var _203=t.next("marker",[this.opt,run]),s=run.group,_204,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler);
if(typeof run.data[0]=="number"){
_204=dojo.map(run.data,function(v,i){
return {x:ht(i+1)+_201.l,y:dim.height-_201.b-vt(v)};
},this);
}else{
_204=dojo.map(run.data,function(v,i){
return {x:ht(v.x)+_201.l,y:dim.height-_201.b-vt(v.y)};
},this);
}
var _205=new Array(_204.length),_206=new Array(_204.length),_207=new Array(_204.length);
dojo.forEach(_204,function(c,i){
var _208=typeof run.data[i]=="number"?t.post(_203,"marker"):t.addMixin(_203,"marker",run.data[i],true),path="M"+c.x+" "+c.y+" "+_208.symbol;
if(_208.marker.shadow){
_205[i]=s.createPath("M"+(c.x+_208.marker.shadow.dx)+" "+(c.y+_208.marker.shadow.dy)+" "+_208.symbol).setStroke(_208.marker.shadow).setFill(_208.marker.shadow.color);
if(this.animate){
this._animateScatter(_205[i],dim.height-_201.b);
}
}
if(_208.marker.outline){
var _209=dc.makeStroke(_208.marker.outline);
_209.width=2*_209.width+_208.marker.stroke.width;
_207[i]=s.createPath(path).setStroke(_209);
if(this.animate){
this._animateScatter(_207[i],dim.height-_201.b);
}
}
var _20a=dc.makeStroke(_208.marker.stroke),fill=this._plotFill(_208.marker.fill,dim,_201);
if(fill&&(fill.type==="linear"||fill.type=="radial")){
var _20b=dojox.gfx.gradutils.getColor(fill,{x:c.x,y:c.y});
if(_20a){
_20a.color=_20b;
}
_206[i]=s.createPath(path).setStroke(_20a).setFill(_20b);
}else{
_206[i]=s.createPath(path).setStroke(_20a).setFill(fill);
}
if(this.animate){
this._animateScatter(_206[i],dim.height-_201.b);
}
},this);
if(_206.length){
run.dyn.stroke=_206[_206.length-1].getStroke();
run.dyn.fill=_206[_206.length-1].getFill();
}
if(_202){
var _20c=new Array(_206.length);
dojo.forEach(_206,function(s,i){
var o={element:"marker",index:i,run:run,shape:s,outline:_207&&_207[i]||null,shadow:_205&&_205[i]||null,cx:_204[i].x,cy:_204[i].y};
if(typeof run.data[0]=="number"){
o.x=i+1;
o.y=run.data[i];
}else{
o.x=run.data[i].x;
o.y=run.data[i].y;
}
this._connectEvents(o);
_20c[i]=o;
},this);
this._eventSeries[run.name]=_20c;
}else{
delete this._eventSeries[run.name];
}
run.dirty=false;
}
this.dirty=false;
return this;
},_animateScatter:function(_20d,_20e){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_20d,duration:1200,transform:[{name:"translate",start:[0,_20e],end:[0,0]},{name:"scale",start:[0,0],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.lang.functional.sequence"]){
dojo._hasResource["dojox.lang.functional.sequence"]=true;
dojo.provide("dojox.lang.functional.sequence");
(function(){
var d=dojo,df=dojox.lang.functional;
d.mixin(df,{repeat:function(n,f,z,o){
o=o||d.global;
f=df.lambda(f);
var t=new Array(n),i=1;
t[0]=z;
for(;i<n;t[i]=z=f.call(o,z),++i){
}
return t;
},until:function(pr,f,z,o){
o=o||d.global;
f=df.lambda(f);
pr=df.lambda(pr);
var t=[];
for(;!pr.call(o,z);t.push(z),z=f.call(o,z)){
}
return t;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Stacked"]){
dojo._hasResource["dojox.charting.plot2d.Stacked"]=true;
dojo.provide("dojox.charting.plot2d.Stacked");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common,_20f=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Stacked",dojox.charting.plot2d.Default,{getSeriesStats:function(){
var _210=dc.collectStackedStats(this.series);
this._maxRunLength=_210.hmax;
return _210;
},render:function(dim,_211){
if(this._maxRunLength<=0){
return this;
}
var acc=df.repeat(this._maxRunLength,"-> 0",0);
for(var i=0;i<this.series.length;++i){
var run=this.series[i];
for(var j=0;j<run.data.length;++j){
var v=run.data[j];
if(v!==null){
if(isNaN(v)){
v=0;
}
acc[j]+=v;
}
}
}
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_211);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_20f);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,_212=this.events(),ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler);
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _213=t.next(this.opt.areas?"area":"line",[this.opt,run],true),s=run.group,_214,_215=dojo.map(acc,function(v,i){
return {x:ht(i+1)+_211.l,y:dim.height-_211.b-vt(v)};
},this);
var _216=this.opt.tension?dc.curve(_215,this.opt.tension):"";
if(this.opt.areas){
var _217=dojo.clone(_215);
if(this.opt.tension){
var p=dc.curve(_217,this.opt.tension);
p+=" L"+_215[_215.length-1].x+","+(dim.height-_211.b)+" L"+_215[0].x+","+(dim.height-_211.b)+" L"+_215[0].x+","+_215[0].y;
run.dyn.fill=s.createPath(p).setFill(_213.series.fill).getFill();
}else{
_217.push({x:_215[_215.length-1].x,y:dim.height-_211.b});
_217.push({x:_215[0].x,y:dim.height-_211.b});
_217.push(_215[0]);
run.dyn.fill=s.createPolyline(_217).setFill(_213.series.fill).getFill();
}
}
if(this.opt.lines||this.opt.markers){
if(_213.series.outline){
_214=dc.makeStroke(_213.series.outline);
_214.width=2*_214.width+_213.series.stroke.width;
}
}
if(this.opt.markers){
run.dyn.marker=_213.symbol;
}
var _218,_219,_21a;
if(_213.series.shadow&&_213.series.stroke){
var _21b=_213.series.shadow,_21c=dojo.map(_215,function(c){
return {x:c.x+_21b.dx,y:c.y+_21b.dy};
});
if(this.opt.lines){
if(this.opt.tension){
run.dyn.shadow=s.createPath(dc.curve(_21c,this.opt.tension)).setStroke(_21b).getStroke();
}else{
run.dyn.shadow=s.createPolyline(_21c).setStroke(_21b).getStroke();
}
}
if(this.opt.markers){
_21b=_213.marker.shadow;
_21a=dojo.map(_21c,function(c){
return s.createPath("M"+c.x+" "+c.y+" "+_213.symbol).setStroke(_21b).setFill(_21b.color);
},this);
}
}
if(this.opt.lines){
if(_214){
if(this.opt.tension){
run.dyn.outline=s.createPath(_216).setStroke(_214).getStroke();
}else{
run.dyn.outline=s.createPolyline(_215).setStroke(_214).getStroke();
}
}
if(this.opt.tension){
run.dyn.stroke=s.createPath(_216).setStroke(_213.series.stroke).getStroke();
}else{
run.dyn.stroke=s.createPolyline(_215).setStroke(_213.series.stroke).getStroke();
}
}
if(this.opt.markers){
_218=new Array(_215.length);
_219=new Array(_215.length);
_214=null;
if(_213.marker.outline){
_214=dc.makeStroke(_213.marker.outline);
_214.width=2*_214.width+(_213.marker.stroke?_213.marker.stroke.width:0);
}
dojo.forEach(_215,function(c,i){
var path="M"+c.x+" "+c.y+" "+_213.symbol;
if(_214){
_219[i]=s.createPath(path).setStroke(_214);
}
_218[i]=s.createPath(path).setStroke(_213.marker.stroke).setFill(_213.marker.fill);
},this);
if(_212){
var _21d=new Array(_218.length);
dojo.forEach(_218,function(s,i){
var o={element:"marker",index:i,run:run,shape:s,outline:_219[i]||null,shadow:_21a&&_21a[i]||null,cx:_215[i].x,cy:_215[i].y,x:i+1,y:run.data[i]};
this._connectEvents(o);
_21d[i]=o;
},this);
this._eventSeries[run.name]=_21d;
}else{
delete this._eventSeries[run.name];
}
}
run.dirty=false;
for(var j=0;j<run.data.length;++j){
var v=run.data[j];
if(v!==null){
if(isNaN(v)){
v=0;
}
acc[j]-=v;
}
}
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.StackedLines"]){
dojo._hasResource["dojox.charting.plot2d.StackedLines"]=true;
dojo.provide("dojox.charting.plot2d.StackedLines");
dojo.declare("dojox.charting.plot2d.StackedLines",dojox.charting.plot2d.Stacked,{constructor:function(){
this.opt.lines=true;
}});
}
if(!dojo._hasResource["dojox.charting.plot2d.StackedAreas"]){
dojo._hasResource["dojox.charting.plot2d.StackedAreas"]=true;
dojo.provide("dojox.charting.plot2d.StackedAreas");
dojo.declare("dojox.charting.plot2d.StackedAreas",dojox.charting.plot2d.Stacked,{constructor:function(){
this.opt.lines=true;
this.opt.areas=true;
}});
}
if(!dojo._hasResource["dojox.charting.plot2d.Columns"]){
dojo._hasResource["dojox.charting.plot2d.Columns"]=true;
dojo.provide("dojox.charting.plot2d.Columns");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_21e=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Columns",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(_21f,_220){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_220);
du.updateWithPattern(this.opt,_220,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},getSeriesStats:function(){
var _221=dc.collectSimpleStats(this.series);
_221.hmin-=0.5;
_221.hmax+=0.5;
return _221;
},render:function(dim,_222){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_222);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_21e);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_223,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_224=Math.max(0,this._vScaler.bounds.lower),_225=vt(_224),_226=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);
gap=f.gap;
_223=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _227=t.next("column",[this.opt,run]),s=run.group,_228=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _229=run.data[j];
if(_229!==null){
var v=typeof _229=="number"?_229:_229.y,vv=vt(v),_22a=vv-_225,h=Math.abs(_22a),_22b=typeof _229!="number"?t.addMixin(_227,"column",_229,true):t.post(_227,"column");
if(_223>=1&&h>=1){
var rect={x:_222.l+ht(j+0.5)+gap,y:dim.height-_222.b-(v>_224?vv:_225),width:_223,height:h};
var _22c=this._plotFill(_22b.series.fill,dim,_222);
_22c=this._shapeFill(_22c,rect);
var _22d=s.createRect(rect).setFill(_22c).setStroke(_22b.series.stroke);
run.dyn.fill=_22d.getFill();
run.dyn.stroke=_22d.getStroke();
if(_226){
var o={element:"column",index:j,run:run,shape:_22d,x:j+0.5,y:v};
this._connectEvents(o);
_228[j]=o;
}
if(this.animate){
this._animateColumn(_22d,dim.height-_222.b-_225,h);
}
}
}
}
this._eventSeries[run.name]=_228;
run.dirty=false;
}
this.dirty=false;
return this;
},_animateColumn:function(_22e,_22f,_230){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_22e,duration:1200,transform:[{name:"translate",start:[0,_22f-(_22f/_230)],end:[0,0]},{name:"scale",start:[1,1/_230],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.StackedColumns"]){
dojo._hasResource["dojox.charting.plot2d.StackedColumns"]=true;
dojo.provide("dojox.charting.plot2d.StackedColumns");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common,_231=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.StackedColumns",dojox.charting.plot2d.Columns,{getSeriesStats:function(){
var _232=dc.collectStackedStats(this.series);
this._maxRunLength=_232.hmax;
_232.hmin-=0.5;
_232.hmax+=0.5;
return _232;
},render:function(dim,_233){
if(this._maxRunLength<=0){
return this;
}
var acc=df.repeat(this._maxRunLength,"-> 0",0);
for(var i=0;i<this.series.length;++i){
var run=this.series[i];
for(var j=0;j<run.data.length;++j){
var _234=run.data[j];
if(_234!==null){
var v=typeof _234=="number"?_234:_234.y;
if(isNaN(v)){
v=0;
}
acc[j]+=v;
}
}
}
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_233);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_231);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_235,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_236=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);
gap=f.gap;
_235=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _237=t.next("column",[this.opt,run]),s=run.group,_238=new Array(acc.length);
for(var j=0;j<acc.length;++j){
var _234=run.data[j];
if(_234!==null){
var v=acc[j],_239=vt(v),_23a=typeof _234!="number"?t.addMixin(_237,"column",_234,true):t.post(_237,"column");
if(_235>=1&&_239>=1){
var rect={x:_233.l+ht(j+0.5)+gap,y:dim.height-_233.b-vt(v),width:_235,height:_239};
var _23b=this._plotFill(_23a.series.fill,dim,_233);
_23b=this._shapeFill(_23b,rect);
var _23c=s.createRect(rect).setFill(_23b).setStroke(_23a.series.stroke);
run.dyn.fill=_23c.getFill();
run.dyn.stroke=_23c.getStroke();
if(_236){
var o={element:"column",index:j,run:run,shape:_23c,x:j+0.5,y:v};
this._connectEvents(o);
_238[j]=o;
}
if(this.animate){
this._animateColumn(_23c,dim.height-_233.b,_239);
}
}
}
}
this._eventSeries[run.name]=_238;
run.dirty=false;
for(var j=0;j<run.data.length;++j){
var _234=run.data[j];
if(_234!==null){
var v=typeof _234=="number"?_234:_234.y;
if(isNaN(v)){
v=0;
}
acc[j]-=v;
}
}
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.ClusteredColumns"]){
dojo._hasResource["dojox.charting.plot2d.ClusteredColumns"]=true;
dojo.provide("dojox.charting.plot2d.ClusteredColumns");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common,_23d=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.ClusteredColumns",dojox.charting.plot2d.Columns,{render:function(dim,_23e){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_23e);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_23d);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_23f,_240,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_241=Math.max(0,this._vScaler.bounds.lower),_242=vt(_241),_243=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt,this.series.length);
gap=f.gap;
_23f=_240=f.size;
for(var i=0;i<this.series.length;++i){
var run=this.series[i],_244=_240*i;
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _245=t.next("column",[this.opt,run]),s=run.group,_246=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _247=run.data[j];
if(_247!==null){
var v=typeof _247=="number"?_247:_247.y,vv=vt(v),_248=vv-_242,h=Math.abs(_248),_249=typeof _247!="number"?t.addMixin(_245,"column",_247,true):t.post(_245,"column");
if(_23f>=1&&h>=1){
var rect={x:_23e.l+ht(j+0.5)+gap+_244,y:dim.height-_23e.b-(v>_241?vv:_242),width:_23f,height:h};
var _24a=this._plotFill(_249.series.fill,dim,_23e);
_24a=this._shapeFill(_24a,rect);
var _24b=s.createRect(rect).setFill(_24a).setStroke(_249.series.stroke);
run.dyn.fill=_24b.getFill();
run.dyn.stroke=_24b.getStroke();
if(_243){
var o={element:"column",index:j,run:run,shape:_24b,x:j+0.5,y:v};
this._connectEvents(o);
_246[j]=o;
}
if(this.animate){
this._animateColumn(_24b,dim.height-_23e.b-_242,h);
}
}
}
}
this._eventSeries[run.name]=_246;
run.dirty=false;
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Bars"]){
dojo._hasResource["dojox.charting.plot2d.Bars"]=true;
dojo.provide("dojox.charting.plot2d.Bars");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_24c=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Bars",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:0,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(_24d,_24e){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_24e);
du.updateWithPattern(this.opt,_24e,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},getSeriesStats:function(){
var _24f=dc.collectSimpleStats(this.series),t;
_24f.hmin-=0.5;
_24f.hmax+=0.5;
t=_24f.hmin,_24f.hmin=_24f.vmin,_24f.vmin=t;
t=_24f.hmax,_24f.hmax=_24f.vmax,_24f.vmax=t;
return _24f;
},render:function(dim,_250){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_250);
}
this.dirty=this.isDirty();
this.resetEvents();
if(this.dirty){
dojo.forEach(this.series,_24c);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_251,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_252=Math.max(0,this._hScaler.bounds.lower),_253=ht(_252),_254=this.events();
f=dc.calculateBarSize(this._vScaler.bounds.scale,this.opt);
gap=f.gap;
_251=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _255=t.next("bar",[this.opt,run]),s=run.group,_256=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _257=run.data[j];
if(_257!==null){
var v=typeof _257=="number"?_257:_257.y,hv=ht(v),_258=hv-_253,w=Math.abs(_258),_259=typeof _257!="number"?t.addMixin(_255,"bar",_257,true):t.post(_255,"bar");
if(w>=1&&_251>=1){
var rect={x:_250.l+(v<_252?hv:_253),y:dim.height-_250.b-vt(j+1.5)+gap,width:w,height:_251};
var _25a=this._plotFill(_259.series.fill,dim,_250);
_25a=this._shapeFill(_25a,rect);
var _25b=s.createRect(rect).setFill(_25a).setStroke(_259.series.stroke);
run.dyn.fill=_25b.getFill();
run.dyn.stroke=_25b.getStroke();
if(_254){
var o={element:"bar",index:j,run:run,shape:_25b,x:v,y:j+1.5};
this._connectEvents(o);
_256[j]=o;
}
if(this.animate){
this._animateBar(_25b,_250.l+_253,-w);
}
}
}
}
this._eventSeries[run.name]=_256;
run.dirty=false;
}
this.dirty=false;
return this;
},_animateBar:function(_25c,_25d,_25e){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_25c,duration:1200,transform:[{name:"translate",start:[_25d-(_25d/_25e),0],end:[0,0]},{name:"scale",start:[1/_25e,1],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.StackedBars"]){
dojo._hasResource["dojox.charting.plot2d.StackedBars"]=true;
dojo.provide("dojox.charting.plot2d.StackedBars");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common,_25f=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.StackedBars",dojox.charting.plot2d.Bars,{getSeriesStats:function(){
var _260=dc.collectStackedStats(this.series),t;
this._maxRunLength=_260.hmax;
_260.hmin-=0.5;
_260.hmax+=0.5;
t=_260.hmin,_260.hmin=_260.vmin,_260.vmin=t;
t=_260.hmax,_260.hmax=_260.vmax,_260.vmax=t;
return _260;
},render:function(dim,_261){
if(this._maxRunLength<=0){
return this;
}
var acc=df.repeat(this._maxRunLength,"-> 0",0);
for(var i=0;i<this.series.length;++i){
var run=this.series[i];
for(var j=0;j<run.data.length;++j){
var _262=run.data[j];
if(_262!==null){
var v=typeof _262=="number"?_262:_262.y;
if(isNaN(v)){
v=0;
}
acc[j]+=v;
}
}
}
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_261);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_25f);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_263,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_264=this.events();
f=dc.calculateBarSize(this._vScaler.bounds.scale,this.opt);
gap=f.gap;
_263=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _265=t.next("bar",[this.opt,run]),s=run.group,_266=new Array(acc.length);
for(var j=0;j<acc.length;++j){
var _262=run.data[j];
if(_262!==null){
var v=acc[j],_267=ht(v),_268=typeof _262!="number"?t.addMixin(_265,"bar",_262,true):t.post(_265,"bar");
if(_267>=1&&_263>=1){
var rect={x:_261.l,y:dim.height-_261.b-vt(j+1.5)+gap,width:_267,height:_263};
var _269=this._plotFill(_268.series.fill,dim,_261);
_269=this._shapeFill(_269,rect);
var _26a=s.createRect(rect).setFill(_269).setStroke(_268.series.stroke);
run.dyn.fill=_26a.getFill();
run.dyn.stroke=_26a.getStroke();
if(_264){
var o={element:"bar",index:j,run:run,shape:_26a,x:v,y:j+1.5};
this._connectEvents(o);
_266[j]=o;
}
if(this.animate){
this._animateBar(_26a,_261.l,-_267);
}
}
}
}
this._eventSeries[run.name]=_266;
run.dirty=false;
for(var j=0;j<run.data.length;++j){
var _262=run.data[j];
if(_262!==null){
var v=typeof _262=="number"?_262:_262.y;
if(isNaN(v)){
v=0;
}
acc[j]-=v;
}
}
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.ClusteredBars"]){
dojo._hasResource["dojox.charting.plot2d.ClusteredBars"]=true;
dojo.provide("dojox.charting.plot2d.ClusteredBars");
(function(){
var df=dojox.lang.functional,dc=dojox.charting.plot2d.common,_26b=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.ClusteredBars",dojox.charting.plot2d.Bars,{render:function(dim,_26c){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_26c);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_26b);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_26d,_26e,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_26f=Math.max(0,this._hScaler.bounds.lower),_270=ht(_26f),_271=this.events();
f=dc.calculateBarSize(this._vScaler.bounds.scale,this.opt,this.series.length);
gap=f.gap;
_26d=_26e=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i],_272=_26e*(this.series.length-i-1);
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _273=t.next("bar",[this.opt,run]),s=run.group,_274=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var _275=run.data[j];
if(_275!==null){
var v=typeof _275=="number"?_275:_275.y,hv=ht(v),_276=hv-_270,w=Math.abs(_276),_277=typeof _275!="number"?t.addMixin(_273,"bar",_275,true):t.post(_273,"bar");
if(w>=1&&_26d>=1){
var rect={x:_26c.l+(v<_26f?hv:_270),y:dim.height-_26c.b-vt(j+1.5)+gap+_272,width:w,height:_26d};
var _278=this._plotFill(_277.series.fill,dim,_26c);
_278=this._shapeFill(_278,rect);
var _279=s.createRect(rect).setFill(_278).setStroke(_277.series.stroke);
run.dyn.fill=_279.getFill();
run.dyn.stroke=_279.getStroke();
if(_271){
var o={element:"bar",index:j,run:run,shape:_279,x:v,y:j+1.5};
this._connectEvents(o);
_274[j]=o;
}
if(this.animate){
this._animateBar(_279,_26c.l+_270,-_276);
}
}
}
}
this._eventSeries[run.name]=_274;
run.dirty=false;
}
this.dirty=false;
return this;
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Grid"]){
dojo._hasResource["dojox.charting.plot2d.Grid"]=true;
dojo.provide("dojox.charting.plot2d.Grid");
(function(){
var du=dojox.lang.utils,dc=dojox.charting.plot2d.common;
dojo.declare("dojox.charting.plot2d.Grid",dojox.charting.Element,{defaultParams:{hAxis:"x",vAxis:"y",hMajorLines:true,hMinorLines:false,vMajorLines:true,vMinorLines:false,hStripes:"none",vStripes:"none",animate:null},optionalParams:{},constructor:function(_27a,_27b){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_27b);
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.dirty=true;
this.animate=this.opt.animate;
this.zoom=null,this.zoomQueue=[];
this.lastWindow={vscale:1,hscale:1,xoffset:0,yoffset:0};
},clear:function(){
this._hAxis=null;
this._vAxis=null;
this.dirty=true;
return this;
},setAxis:function(axis){
if(axis){
this[axis.vertical?"_vAxis":"_hAxis"]=axis;
}
return this;
},addSeries:function(run){
return this;
},getSeriesStats:function(){
return dojo.delegate(dc.defaultStats);
},initializeScalers:function(){
return this;
},isDirty:function(){
return this.dirty||this._hAxis&&this._hAxis.dirty||this._vAxis&&this._vAxis.dirty;
},performZoom:function(dim,_27c){
var vs=this._vAxis.scale||1,hs=this._hAxis.scale||1,_27d=dim.height-_27c.b,_27e=this._hAxis.getScaler().bounds,_27f=(_27e.from-_27e.lower)*_27e.scale,_280=this._vAxis.getScaler().bounds,_281=(_280.from-_280.lower)*_280.scale;
rVScale=vs/this.lastWindow.vscale,rHScale=hs/this.lastWindow.hscale,rXOffset=(this.lastWindow.xoffset-_27f)/((this.lastWindow.hscale==1)?hs:this.lastWindow.hscale),rYOffset=(_281-this.lastWindow.yoffset)/((this.lastWindow.vscale==1)?vs:this.lastWindow.vscale),shape=this.group,anim=dojox.gfx.fx.animateTransform(dojo.delegate({shape:shape,duration:1200,transform:[{name:"translate",start:[0,0],end:[_27c.l*(1-rHScale),_27d*(1-rVScale)]},{name:"scale",start:[1,1],end:[rHScale,rVScale]},{name:"original"},{name:"translate",start:[0,0],end:[rXOffset,rYOffset]}]},this.zoom));
dojo.mixin(this.lastWindow,{vscale:vs,hscale:hs,xoffset:_27f,yoffset:_281});
this.zoomQueue.push(anim);
dojo.connect(anim,"onEnd",this,function(){
this.zoom=null;
this.zoomQueue.shift();
if(this.zoomQueue.length>0){
this.zoomQueue[0].play();
}
});
if(this.zoomQueue.length==1){
this.zoomQueue[0].play();
}
return this;
},getRequiredColors:function(){
return 0;
},render:function(dim,_282){
if(this.zoom){
return this.performZoom(dim,_282);
}
this.dirty=this.isDirty();
if(!this.dirty){
return this;
}
this.cleanGroup();
var s=this.group,ta=this.chart.theme.axis;
try{
var _283=this._vAxis.getScaler(),vt=_283.scaler.getTransformerFromModel(_283),_284=this._vAxis.getTicks();
if(this.opt.hMinorLines){
dojo.forEach(_284.minor,function(tick){
var y=dim.height-_282.b-vt(tick.value);
var _285=s.createLine({x1:_282.l,y1:y,x2:dim.width-_282.r,y2:y}).setStroke(ta.minorTick);
if(this.animate){
this._animateGrid(_285,"h",_282.l,_282.r+_282.l-dim.width);
}
},this);
}
if(this.opt.hMajorLines){
dojo.forEach(_284.major,function(tick){
var y=dim.height-_282.b-vt(tick.value);
var _286=s.createLine({x1:_282.l,y1:y,x2:dim.width-_282.r,y2:y}).setStroke(ta.majorTick);
if(this.animate){
this._animateGrid(_286,"h",_282.l,_282.r+_282.l-dim.width);
}
},this);
}
}
catch(e){
}
try{
var _287=this._hAxis.getScaler(),ht=_287.scaler.getTransformerFromModel(_287),_284=this._hAxis.getTicks();
if(_284&&this.opt.vMinorLines){
dojo.forEach(_284.minor,function(tick){
var x=_282.l+ht(tick.value);
var _288=s.createLine({x1:x,y1:_282.t,x2:x,y2:dim.height-_282.b}).setStroke(ta.minorTick);
if(this.animate){
this._animateGrid(_288,"v",dim.height-_282.b,dim.height-_282.b-_282.t);
}
},this);
}
if(_284&&this.opt.vMajorLines){
dojo.forEach(_284.major,function(tick){
var x=_282.l+ht(tick.value);
var _289=s.createLine({x1:x,y1:_282.t,x2:x,y2:dim.height-_282.b}).setStroke(ta.majorTick);
if(this.animate){
this._animateGrid(_289,"v",dim.height-_282.b,dim.height-_282.b-_282.t);
}
},this);
}
}
catch(e){
}
this.dirty=false;
return this;
},_animateGrid:function(_28a,type,_28b,size){
var _28c=type=="h"?[_28b,0]:[0,_28b];
var _28d=type=="h"?[1/size,1]:[1,1/size];
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_28a,duration:1200,transform:[{name:"translate",start:_28c,end:[0,0]},{name:"scale",start:_28d,end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Pie"]){
dojo._hasResource["dojox.charting.plot2d.Pie"]=true;
dojo.provide("dojox.charting.plot2d.Pie");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,da=dojox.charting.axis2d.common,g=dojox.gfx,m=g.matrix,_28e=0.2;
dojo.declare("dojox.charting.plot2d.Pie",[dojox.charting.Element,dojox.charting.plot2d._PlotEvents],{defaultParams:{labels:true,ticks:false,fixed:true,precision:1,labelOffset:20,labelStyle:"default",htmlLabels:true,radGrad:"native",fanSize:5,startAngle:0},optionalParams:{radius:0,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:"",labelWiring:{}},constructor:function(_28f,_290){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_290);
du.updateWithPattern(this.opt,_290,this.optionalParams);
this.run=null;
this.dyn=[];
},clear:function(){
this.dirty=true;
this.dyn=[];
this.run=null;
return this;
},setAxis:function(axis){
return this;
},addSeries:function(run){
this.run=run;
return this;
},getSeriesStats:function(){
return dojo.delegate(dc.defaultStats);
},initializeScalers:function(){
return this;
},getRequiredColors:function(){
return this.run?this.run.data.length:0;
},render:function(dim,_291){
if(!this.dirty){
return this;
}
this.resetEvents();
this.dirty=false;
this._eventSeries={};
this.cleanGroup();
var s=this.group,t=this.chart.theme;
if(!this.run||!this.run.data.length){
return this;
}
var rx=(dim.width-_291.l-_291.r)/2,ry=(dim.height-_291.t-_291.b)/2,r=Math.min(rx,ry),_292="font" in this.opt?this.opt.font:t.axis.font,size=_292?g.normalizedLength(g.splitFontString(_292).size):0,_293="fontColor" in this.opt?this.opt.fontColor:t.axis.fontColor,_294=m._degToRad(this.opt.startAngle),_295=_294,step,_296,_297,_298,_299,_29a,run=this.run.data,_29b=this.events();
if(typeof run[0]=="number"){
_296=df.map(run,"x ? Math.max(x, 0) : 0");
if(df.every(_296,"<= 0")){
return this;
}
_297=df.map(_296,"/this",df.foldl(_296,"+",0));
if(this.opt.labels){
_298=dojo.map(_297,function(x){
return x>0?this._getLabel(x*100)+"%":"";
},this);
}
}else{
_296=df.map(run,"x ? Math.max(x.y, 0) : 0");
if(df.every(_296,"<= 0")){
return this;
}
_297=df.map(_296,"/this",df.foldl(_296,"+",0));
if(this.opt.labels){
_298=dojo.map(_297,function(x,i){
if(x<=0){
return "";
}
var v=run[i];
return "text" in v?v.text:this._getLabel(x*100)+"%";
},this);
}
}
var _29c=df.map(run,function(v,i){
if(v===null||typeof v=="number"){
return t.next("slice",[this.opt,this.run],true);
}
return t.next("slice",[this.opt,this.run,v],true);
},this);
if(this.opt.labels){
_299=df.foldl1(df.map(_298,function(_29d,i){
var font=_29c[i].series.font;
return dojox.gfx._base._getTextBox(_29d,{font:font}).w;
},this),"Math.max(a, b)")/2;
if(this.opt.labelOffset<0){
r=Math.min(rx-2*_299,ry-size)+this.opt.labelOffset;
}
_29a=r-this.opt.labelOffset;
}
if("radius" in this.opt){
r=this.opt.radius;
_29a=r-this.opt.labelOffset;
}
var _29e={cx:_291.l+rx,cy:_291.t+ry,r:r};
this.dyn=[];
var _29f=new Array(_297.length);
dojo.some(_297,function(_2a0,i){
if(_2a0<=0){
return false;
}
var v=run[i],_2a1=_29c[i],_2a2;
if(_2a0>=1){
_2a2=this._plotFill(_2a1.series.fill,dim,_291);
_2a2=this._shapeFill(_2a2,{x:_29e.cx-_29e.r,y:_29e.cy-_29e.r,width:2*_29e.r,height:2*_29e.r});
_2a2=this._pseudoRadialFill(_2a2,{x:_29e.cx,y:_29e.cy},_29e.r);
var _2a3=s.createCircle(_29e).setFill(_2a2).setStroke(_2a1.series.stroke);
this.dyn.push({fill:_2a2,stroke:_2a1.series.stroke});
if(_29b){
var o={element:"slice",index:i,run:this.run,shape:_2a3,x:i,y:typeof v=="number"?v:v.y,cx:_29e.cx,cy:_29e.cy,cr:r};
this._connectEvents(o);
_29f[i]=o;
}
return true;
}
var end=_295+_2a0*2*Math.PI;
if(i+1==_297.length){
end=_294+2*Math.PI;
}
var step=end-_295,x1=_29e.cx+r*Math.cos(_295),y1=_29e.cy+r*Math.sin(_295),x2=_29e.cx+r*Math.cos(end),y2=_29e.cy+r*Math.sin(end);
var _2a4=m._degToRad(this.opt.fanSize);
if(_2a1.series.fill&&_2a1.series.fill.type==="radial"&&this.opt.radGrad==="fan"&&step>_2a4){
var _2a5=s.createGroup(),_2a6=Math.ceil(step/_2a4),_2a7=step/_2a6;
_2a2=this._shapeFill(_2a1.series.fill,{x:_29e.cx-_29e.r,y:_29e.cy-_29e.r,width:2*_29e.r,height:2*_29e.r});
for(var j=0;j<_2a6;++j){
var _2a8=j==0?x1:_29e.cx+r*Math.cos(_295+(j-_28e)*_2a7),_2a9=j==0?y1:_29e.cy+r*Math.sin(_295+(j-_28e)*_2a7),_2aa=j==_2a6-1?x2:_29e.cx+r*Math.cos(_295+(j+1+_28e)*_2a7),_2ab=j==_2a6-1?y2:_29e.cy+r*Math.sin(_295+(j+1+_28e)*_2a7),fan=_2a5.createPath({}).moveTo(_29e.cx,_29e.cy).lineTo(_2a8,_2a9).arcTo(r,r,0,_2a7>Math.PI,true,_2aa,_2ab).lineTo(_29e.cx,_29e.cy).closePath().setFill(this._pseudoRadialFill(_2a2,{x:_29e.cx,y:_29e.cy},r,_295+(j+0.5)*_2a7,_295+(j+0.5)*_2a7));
}
_2a5.createPath({}).moveTo(_29e.cx,_29e.cy).lineTo(x1,y1).arcTo(r,r,0,step>Math.PI,true,x2,y2).lineTo(_29e.cx,_29e.cy).closePath().setStroke(_2a1.series.stroke);
_2a3=_2a5;
}else{
_2a3=s.createPath({}).moveTo(_29e.cx,_29e.cy).lineTo(x1,y1).arcTo(r,r,0,step>Math.PI,true,x2,y2).lineTo(_29e.cx,_29e.cy).closePath().setStroke(_2a1.series.stroke);
var _2a2=_2a1.series.fill;
if(_2a2&&_2a2.type==="radial"){
_2a2=this._shapeFill(_2a2,{x:_29e.cx-_29e.r,y:_29e.cy-_29e.r,width:2*_29e.r,height:2*_29e.r});
if(this.opt.radGrad==="linear"){
_2a2=this._pseudoRadialFill(_2a2,{x:_29e.cx,y:_29e.cy},r,_295,end);
}
}else{
if(_2a2&&_2a2.type==="linear"){
_2a2=this._plotFill(_2a2,dim,_291);
_2a2=this._shapeFill(_2a2,_2a3.getBoundingBox());
}
}
_2a3.setFill(_2a2);
}
this.dyn.push({fill:_2a2,stroke:_2a1.series.stroke});
if(_29b){
var o={element:"slice",index:i,run:this.run,shape:_2a3,x:i,y:typeof v=="number"?v:v.y,cx:_29e.cx,cy:_29e.cy,cr:r};
this._connectEvents(o);
_29f[i]=o;
}
_295=end;
return false;
},this);
if(this.opt.labels){
if(this.opt.labelStyle=="default"){
_295=_294;
dojo.some(_297,function(_2ac,i){
if(_2ac<=0){
return false;
}
var _2ad=_29c[i];
if(_2ac>=1){
var v=run[i],elem=da.createText[this.opt.htmlLabels&&dojox.gfx.renderer!="vml"?"html":"gfx"](this.chart,s,_29e.cx,_29e.cy+size/2,"middle",_298[i],_2ad.series.font,_2ad.series.fontColor);
if(this.opt.htmlLabels){
this.htmlElements.push(elem);
}
return true;
}
var end=_295+_2ac*2*Math.PI,v=run[i];
if(i+1==_297.length){
end=_294+2*Math.PI;
}
var _2ae=(_295+end)/2,x=_29e.cx+_29a*Math.cos(_2ae),y=_29e.cy+_29a*Math.sin(_2ae)+size/2;
var elem=da.createText[this.opt.htmlLabels&&dojox.gfx.renderer!="vml"?"html":"gfx"](this.chart,s,x,y,"middle",_298[i],_2ad.series.font,_2ad.series.fontColor);
if(this.opt.htmlLabels){
this.htmlElements.push(elem);
}
_295=end;
return false;
},this);
}else{
if(this.opt.labelStyle=="columns"){
_295=_294;
var _2af=[];
dojo.forEach(_297,function(_2b0,i){
var end=_295+_2b0*2*Math.PI;
if(i+1==_297.length){
end=_294+2*Math.PI;
}
var _2b1=(_295+end)/2;
_2af.push({angle:_2b1,left:Math.cos(_2b1)<0,theme:_29c[i],index:i,omit:end-_295<0.001});
_295=end;
});
var _2b2=dojox.gfx._base._getTextBox("a",{font:_292}).h;
this._getProperLabelRadius(_2af,_2b2,_29e.r*1.1);
dojo.forEach(_2af,function(_2b3,i){
if(!_2b3.omit){
var _2b4=_29e.cx-_29e.r*2,_2b5=_29e.cx+_29e.r*2,_2b6=dojox.gfx._base._getTextBox(_298[i],{font:_292}).w,x=_29e.cx+_2b3.labelR*Math.cos(_2b3.angle),y=_29e.cy+_2b3.labelR*Math.sin(_2b3.angle),_2b7=(_2b3.left)?(_2b4+_2b6):(_2b5-_2b6),_2b8=(_2b3.left)?_2b4:_2b7;
var _2b9=s.createPath().moveTo(_29e.cx+_29e.r*Math.cos(_2b3.angle),_29e.cy+_29e.r*Math.sin(_2b3.angle));
if(Math.abs(_2b3.labelR*Math.cos(_2b3.angle))<_29e.r*2-_2b6){
_2b9.lineTo(x,y);
}
_2b9.lineTo(_2b7,y).setStroke(_2b3.theme.series.labelWiring);
var elem=da.createText[this.opt.htmlLabels&&dojox.gfx.renderer!="vml"?"html":"gfx"](this.chart,s,_2b8,y,"left",_298[i],_2b3.theme.series.font,_2b3.theme.series.fontColor);
if(this.opt.htmlLabels){
this.htmlElements.push(elem);
}
}
},this);
}
}
}
var esi=0;
this._eventSeries[this.run.name]=df.map(run,function(v){
return v<=0?null:_29f[esi++];
});
return this;
},_getProperLabelRadius:function(_2ba,_2bb,_2bc){
var _2bd={},_2be={},_2bf=1,_2c0=1;
if(_2ba.length==1){
_2ba[0].labelR=_2bc;
return;
}
for(var i=0;i<_2ba.length;i++){
var _2c1=Math.abs(Math.sin(_2ba[i].angle));
if(_2ba[i].left){
if(_2bf>_2c1){
_2bf=_2c1;
_2bd=_2ba[i];
}
}else{
if(_2c0>_2c1){
_2c0=_2c1;
_2be=_2ba[i];
}
}
}
_2bd.labelR=_2be.labelR=_2bc;
this._caculateLabelR(_2bd,_2ba,_2bb);
this._caculateLabelR(_2be,_2ba,_2bb);
},_caculateLabelR:function(_2c2,_2c3,_2c4){
var i=_2c2.index,_2c5=_2c3.length,_2c6=_2c2.labelR;
while(!(_2c3[i%_2c5].left^_2c3[(i+1)%_2c5].left)){
if(!_2c3[(i+1)%_2c5].omit){
var _2c7=(Math.sin(_2c3[i%_2c5].angle)*_2c6+((_2c3[i%_2c5].left)?(-_2c4):_2c4))/Math.sin(_2c3[(i+1)%_2c5].angle);
_2c6=(_2c7<_2c2.labelR)?_2c2.labelR:_2c7;
_2c3[(i+1)%_2c5].labelR=_2c6;
}
i++;
}
i=_2c2.index,j=(i==0)?_2c5-1:i-1;
while(!(_2c3[i].left^_2c3[j].left)){
if(!_2c3[j].omit){
var _2c7=(Math.sin(_2c3[i].angle)*_2c6+((_2c3[i].left)?_2c4:(-_2c4)))/Math.sin(_2c3[j].angle);
_2c6=(_2c7<_2c2.labelR)?_2c2.labelR:_2c7;
_2c3[j].labelR=_2c6;
}
i--;
j--;
i=(i<0)?i+_2c3.length:i;
j=(j<0)?j+_2c3.length:j;
}
},_getLabel:function(_2c8){
return dc.getLabel(_2c8,this.opt.fixed,this.opt.precision);
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Bubble"]){
dojo._hasResource["dojox.charting.plot2d.Bubble"]=true;
dojo.provide("dojox.charting.plot2d.Bubble");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_2c9=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Bubble",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",animate:null},optionalParams:{stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(_2ca,_2cb){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_2cb);
du.updateWithPattern(this.opt,_2cb,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},render:function(dim,_2cc){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_2cc);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_2c9);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_2cd=this.events();
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
if(!run.data.length){
run.dirty=false;
t.skip();
continue;
}
if(typeof run.data[0]=="number"){
console.warn("dojox.charting.plot2d.Bubble: the data in the following series cannot be rendered as a bubble chart; ",run);
continue;
}
var _2ce=t.next("circle",[this.opt,run]),s=run.group,_2cf=dojo.map(run.data,function(v,i){
return v?{x:ht(v.x)+_2cc.l,y:dim.height-_2cc.b-vt(v.y),radius:this._vScaler.bounds.scale*(v.size/2)}:null;
},this);
var _2d0=null,_2d1=null,_2d2=null;
if(_2ce.series.shadow){
_2d2=dojo.map(_2cf,function(item){
if(item!==null){
var _2d3=t.addMixin(_2ce,"circle",item,true),_2d4=_2d3.series.shadow;
var _2d5=s.createCircle({cx:item.x+_2d4.dx,cy:item.y+_2d4.dy,r:item.radius}).setStroke(_2d4).setFill(_2d4.color);
if(this.animate){
this._animateBubble(_2d5,dim.height-_2cc.b,item.radius);
}
return _2d5;
}
return null;
},this);
if(_2d2.length){
run.dyn.shadow=_2d2[_2d2.length-1].getStroke();
}
}
if(_2ce.series.outline){
_2d1=dojo.map(_2cf,function(item){
if(item!==null){
var _2d6=t.addMixin(_2ce,"circle",item,true),_2d7=dc.makeStroke(_2d6.series.outline);
_2d7.width=2*_2d7.width+_2ce.series.stroke.width;
var _2d8=s.createCircle({cx:item.x,cy:item.y,r:item.radius}).setStroke(_2d7);
if(this.animate){
this._animateBubble(_2d8,dim.height-_2cc.b,item.radius);
}
return _2d8;
}
return null;
},this);
if(_2d1.length){
run.dyn.outline=_2d1[_2d1.length-1].getStroke();
}
}
_2d0=dojo.map(_2cf,function(item){
if(item!==null){
var _2d9=t.addMixin(_2ce,"circle",item,true),rect={x:item.x-item.radius,y:item.y-item.radius,width:2*item.radius,height:2*item.radius};
var _2da=this._plotFill(_2d9.series.fill,dim,_2cc);
_2da=this._shapeFill(_2da,rect);
var _2db=s.createCircle({cx:item.x,cy:item.y,r:item.radius}).setFill(_2da).setStroke(_2d9.series.stroke);
if(this.animate){
this._animateBubble(_2db,dim.height-_2cc.b,item.radius);
}
return _2db;
}
return null;
},this);
if(_2d0.length){
run.dyn.fill=_2d0[_2d0.length-1].getFill();
run.dyn.stroke=_2d0[_2d0.length-1].getStroke();
}
if(_2cd){
var _2dc=new Array(_2d0.length);
dojo.forEach(_2d0,function(s,i){
if(s!==null){
var o={element:"circle",index:i,run:run,shape:s,outline:_2d1&&_2d1[i]||null,shadow:_2d2&&_2d2[i]||null,x:run.data[i].x,y:run.data[i].y,r:run.data[i].size/2,cx:_2cf[i].x,cy:_2cf[i].y,cr:_2cf[i].radius};
this._connectEvents(o);
_2dc[i]=o;
}
},this);
this._eventSeries[run.name]=_2dc;
}else{
delete this._eventSeries[run.name];
}
run.dirty=false;
}
this.dirty=false;
return this;
},_animateBubble:function(_2dd,_2de,size){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_2dd,duration:1200,transform:[{name:"translate",start:[0,_2de],end:[0,0]},{name:"scale",start:[0,1/size],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.Candlesticks"]){
dojo._hasResource["dojox.charting.plot2d.Candlesticks"]=true;
dojo.provide("dojox.charting.plot2d.Candlesticks");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_2df=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.Candlesticks",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:2,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(_2e0,_2e1){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_2e1);
du.updateWithPattern(this.opt,_2e1,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},collectStats:function(_2e2){
var _2e3=dojo.delegate(dc.defaultStats);
for(var i=0;i<_2e2.length;i++){
var run=_2e2[i];
if(!run.data.length){
continue;
}
var _2e4=_2e3.vmin,_2e5=_2e3.vmax;
if(!("ymin" in run)||!("ymax" in run)){
dojo.forEach(run.data,function(val,idx){
if(val!==null){
var x=val.x||idx+1;
_2e3.hmin=Math.min(_2e3.hmin,x);
_2e3.hmax=Math.max(_2e3.hmax,x);
_2e3.vmin=Math.min(_2e3.vmin,val.open,val.close,val.high,val.low);
_2e3.vmax=Math.max(_2e3.vmax,val.open,val.close,val.high,val.low);
}
});
}
if("ymin" in run){
_2e3.vmin=Math.min(_2e4,run.ymin);
}
if("ymax" in run){
_2e3.vmax=Math.max(_2e5,run.ymax);
}
}
return _2e3;
},getSeriesStats:function(){
var _2e6=this.collectStats(this.series);
_2e6.hmin-=0.5;
_2e6.hmax+=0.5;
return _2e6;
},render:function(dim,_2e7){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_2e7);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_2df);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_2e8,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_2e9=Math.max(0,this._vScaler.bounds.lower),_2ea=vt(_2e9),_2eb=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);
gap=f.gap;
_2e8=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _2ec=t.next("candlestick",[this.opt,run]),s=run.group,_2ed=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var v=run.data[j];
if(v!==null){
var _2ee=t.addMixin(_2ec,"candlestick",v,true);
var x=ht(v.x||(j+0.5))+_2e7.l+gap,y=dim.height-_2e7.b,open=vt(v.open),_2ef=vt(v.close),high=vt(v.high),low=vt(v.low);
if("mid" in v){
var mid=vt(v.mid);
}
if(low>high){
var tmp=high;
high=low;
low=tmp;
}
if(_2e8>=1){
var _2f0=open>_2ef;
var line={x1:_2e8/2,x2:_2e8/2,y1:y-high,y2:y-low},rect={x:0,y:y-Math.max(open,_2ef),width:_2e8,height:Math.max(_2f0?open-_2ef:_2ef-open,1)};
shape=s.createGroup();
shape.setTransform({dx:x,dy:0});
var _2f1=shape.createGroup();
_2f1.createLine(line).setStroke(_2ee.series.stroke);
_2f1.createRect(rect).setStroke(_2ee.series.stroke).setFill(_2f0?_2ee.series.fill:"white");
if("mid" in v){
_2f1.createLine({x1:(_2ee.series.stroke.width||1),x2:_2e8-(_2ee.series.stroke.width||1),y1:y-mid,y2:y-mid}).setStroke(_2f0?"white":_2ee.series.stroke);
}
run.dyn.fill=_2ee.series.fill;
run.dyn.stroke=_2ee.series.stroke;
if(_2eb){
var o={element:"candlestick",index:j,run:run,shape:_2f1,x:x,y:y-Math.max(open,_2ef),cx:_2e8/2,cy:(y-Math.max(open,_2ef))+(Math.max(_2f0?open-_2ef:_2ef-open,1)/2),width:_2e8,height:Math.max(_2f0?open-_2ef:_2ef-open,1),data:v};
this._connectEvents(o);
_2ed[j]=o;
}
}
if(this.animate){
this._animateCandlesticks(shape,y-low,high-low);
}
}
}
this._eventSeries[run.name]=_2ed;
run.dirty=false;
}
this.dirty=false;
return this;
},_animateCandlesticks:function(_2f2,_2f3,_2f4){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_2f2,duration:1200,transform:[{name:"translate",start:[0,_2f3-(_2f3/_2f4)],end:[0,0]},{name:"scale",start:[1,1/_2f4],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.plot2d.OHLC"]){
dojo._hasResource["dojox.charting.plot2d.OHLC"]=true;
dojo.provide("dojox.charting.plot2d.OHLC");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,_2f5=df.lambda("item.purgeGroup()");
dojo.declare("dojox.charting.plot2d.OHLC",dojox.charting.plot2d.Base,{defaultParams:{hAxis:"x",vAxis:"y",gap:2,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(_2f6,_2f7){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_2f7);
du.updateWithPattern(this.opt,_2f7,this.optionalParams);
this.series=[];
this.hAxis=this.opt.hAxis;
this.vAxis=this.opt.vAxis;
this.animate=this.opt.animate;
},collectStats:function(_2f8){
var _2f9=dojo.delegate(dc.defaultStats);
for(var i=0;i<_2f8.length;i++){
var run=_2f8[i];
if(!run.data.length){
continue;
}
var _2fa=_2f9.vmin,_2fb=_2f9.vmax;
if(!("ymin" in run)||!("ymax" in run)){
dojo.forEach(run.data,function(val,idx){
if(val!==null){
var x=val.x||idx+1;
_2f9.hmin=Math.min(_2f9.hmin,x);
_2f9.hmax=Math.max(_2f9.hmax,x);
_2f9.vmin=Math.min(_2f9.vmin,val.open,val.close,val.high,val.low);
_2f9.vmax=Math.max(_2f9.vmax,val.open,val.close,val.high,val.low);
}
});
}
if("ymin" in run){
_2f9.vmin=Math.min(_2fa,run.ymin);
}
if("ymax" in run){
_2f9.vmax=Math.max(_2fb,run.ymax);
}
}
return _2f9;
},getSeriesStats:function(){
var _2fc=this.collectStats(this.series);
_2fc.hmin-=0.5;
_2fc.hmax+=0.5;
return _2fc;
},render:function(dim,_2fd){
if(this.zoom&&!this.isDataDirty()){
return this.performZoom(dim,_2fd);
}
this.resetEvents();
this.dirty=this.isDirty();
if(this.dirty){
dojo.forEach(this.series,_2f5);
this._eventSeries={};
this.cleanGroup();
var s=this.group;
df.forEachRev(this.series,function(item){
item.cleanGroup(s);
});
}
var t=this.chart.theme,f,gap,_2fe,ht=this._hScaler.scaler.getTransformerFromModel(this._hScaler),vt=this._vScaler.scaler.getTransformerFromModel(this._vScaler),_2ff=Math.max(0,this._vScaler.bounds.lower),_300=vt(_2ff),_301=this.events();
f=dc.calculateBarSize(this._hScaler.bounds.scale,this.opt);
gap=f.gap;
_2fe=f.size;
for(var i=this.series.length-1;i>=0;--i){
var run=this.series[i];
if(!this.dirty&&!run.dirty){
t.skip();
this._reconnectEvents(run.name);
continue;
}
run.cleanGroup();
var _302=t.next("candlestick",[this.opt,run]),s=run.group,_303=new Array(run.data.length);
for(var j=0;j<run.data.length;++j){
var v=run.data[j];
if(v!==null){
var _304=t.addMixin(_302,"candlestick",v,true);
var x=ht(v.x||(j+0.5))+_2fd.l+gap,y=dim.height-_2fd.b,open=vt(v.open),_305=vt(v.close),high=vt(v.high),low=vt(v.low);
if(low>high){
var tmp=high;
high=low;
low=tmp;
}
if(_2fe>=1){
var hl={x1:_2fe/2,x2:_2fe/2,y1:y-high,y2:y-low},op={x1:0,x2:((_2fe/2)+((_304.series.stroke.width||1)/2)),y1:y-open,y2:y-open},cl={x1:((_2fe/2)-((_304.series.stroke.width||1)/2)),x2:_2fe,y1:y-_305,y2:y-_305};
shape=s.createGroup();
shape.setTransform({dx:x,dy:0});
var _306=shape.createGroup();
_306.createLine(hl).setStroke(_304.series.stroke);
_306.createLine(op).setStroke(_304.series.stroke);
_306.createLine(cl).setStroke(_304.series.stroke);
run.dyn.stroke=_304.series.stroke;
if(_301){
var o={element:"candlestick",index:j,run:run,shape:_306,x:x,y:y-Math.max(open,_305),cx:_2fe/2,cy:(y-Math.max(open,_305))+(Math.max(open>_305?open-_305:_305-open,1)/2),width:_2fe,height:Math.max(open>_305?open-_305:_305-open,1),data:v};
this._connectEvents(o);
_303[j]=o;
}
}
if(this.animate){
this._animateOHLC(shape,y-low,high-low);
}
}
}
this._eventSeries[run.name]=_303;
run.dirty=false;
}
this.dirty=false;
return this;
},_animateOHLC:function(_307,_308,_309){
dojox.gfx.fx.animateTransform(dojo.delegate({shape:_307,duration:1200,transform:[{name:"translate",start:[0,_308-(_308/_309)],end:[0,0]},{name:"scale",start:[1,1/_309],end:[1,1]},{name:"original"}]},this.animate)).play();
}});
})();
}
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(args){
var _30a=this;
dojo.mixin(_30a,args);
_30a.node=args.node;
_30a._showArgs=dojo.mixin({},args);
_30a._showArgs.node=_30a.node;
_30a._showArgs.duration=_30a.showDuration;
_30a.showAnim=_30a.showFunc(_30a._showArgs);
_30a._hideArgs=dojo.mixin({},args);
_30a._hideArgs.node=_30a.node;
_30a._hideArgs.duration=_30a.hideDuration;
_30a.hideAnim=_30a.hideFunc(_30a._hideArgs);
dojo.connect(_30a.showAnim,"beforeBegin",dojo.hitch(_30a.hideAnim,"stop",true));
dojo.connect(_30a.hideAnim,"beforeBegin",dojo.hitch(_30a.showAnim,"stop",true));
},show:function(_30b){
return this.showAnim.play(_30b||0);
},hide:function(_30c){
return this.hideAnim.play(_30c||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_30d={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _30e=function(_30f){
this._index=-1;
this._animations=_30f||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_30e,{_onAnimate:function(){
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
},play:function(_310,_311){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_311&&this._current.status()=="playing"){
return this;
}
var _312=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_313=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_314=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_312);
d.disconnect(_313);
d.disconnect(_314);
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
},gotoPercent:function(_315,_316){
this.pause();
var _317=this.duration*_315;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_317){
this._current=a;
return true;
}
_317-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_317/this._current.duration,_316);
}
return this;
},stop:function(_318){
if(this._current){
if(_318){
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
d.extend(_30e,_30d);
dojo.fx.chain=function(_319){
return new _30e(_319);
};
var _31a=function(_31b){
this._animations=_31b||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_31b,function(a){
var _31c=a.duration;
if(a.delay){
_31c+=a.delay;
}
if(this.duration<_31c){
this.duration=_31c;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d.Animation({curve:[0,1],duration:this.duration});
var self=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop","onEnd"],function(evt){
self._connects.push(d.connect(self._pseudoAnimation,evt,function(){
self._fire(evt,arguments);
}));
});
};
d.extend(_31a,{_doAction:function(_31d,args){
d.forEach(this._animations,function(a){
a[_31d].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_31e,args){
var t=this._pseudoAnimation;
t[_31e].apply(t,args);
},play:function(_31f,_320){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_321,_322){
var ms=this.duration*_321;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_322);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_323){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_31a,_30d);
dojo.fx.combine=function(_324){
return new _31a(_324);
};
dojo.fx.wipeIn=function(args){
var node=args.node=d.byId(args.node),s=node.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _325=d.style(node,"height");
return Math.max(_325,1);
}
},end:function(){
return node.scrollHeight;
}}}},args));
d.connect(anim,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return anim;
};
dojo.fx.wipeOut=function(args){
var node=args.node=d.byId(args.node),s=node.style,o;
var anim=d.animateProperty(d.mixin({properties:{height:{end:1}}},args));
d.connect(anim,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(anim,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return anim;
};
dojo.fx.slideTo=function(args){
var node=args.node=d.byId(args.node),top=null,left=null;
var init=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.position(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var anim=d.animateProperty(d.mixin({properties:{top:args.top||0,left:args.left||0}},args));
d.connect(anim,"beforeBegin",anim,init);
return anim;
};
})();
}
if(!dojo._hasResource["dojo.fx.easing"]){
dojo._hasResource["dojo.fx.easing"]=true;
dojo.provide("dojo.fx.easing");
dojo.getObject("fx.easing",true,dojo);
dojo.fx.easing={linear:function(n){
return n;
},quadIn:function(n){
return Math.pow(n,2);
},quadOut:function(n){
return n*(n-2)*-1;
},quadInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,2)/2;
}
return -1*((--n)*(n-2)-1)/2;
},cubicIn:function(n){
return Math.pow(n,3);
},cubicOut:function(n){
return Math.pow(n-1,3)+1;
},cubicInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,3)/2;
}
n-=2;
return (Math.pow(n,3)+2)/2;
},quartIn:function(n){
return Math.pow(n,4);
},quartOut:function(n){
return -1*(Math.pow(n-1,4)-1);
},quartInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,4)/2;
}
n-=2;
return -1/2*(Math.pow(n,4)-2);
},quintIn:function(n){
return Math.pow(n,5);
},quintOut:function(n){
return Math.pow(n-1,5)+1;
},quintInOut:function(n){
n=n*2;
if(n<1){
return Math.pow(n,5)/2;
}
n-=2;
return (Math.pow(n,5)+2)/2;
},sineIn:function(n){
return -1*Math.cos(n*(Math.PI/2))+1;
},sineOut:function(n){
return Math.sin(n*(Math.PI/2));
},sineInOut:function(n){
return -1*(Math.cos(Math.PI*n)-1)/2;
},expoIn:function(n){
return (n==0)?0:Math.pow(2,10*(n-1));
},expoOut:function(n){
return (n==1)?1:(-1*Math.pow(2,-10*n)+1);
},expoInOut:function(n){
if(n==0){
return 0;
}
if(n==1){
return 1;
}
n=n*2;
if(n<1){
return Math.pow(2,10*(n-1))/2;
}
--n;
return (-1*Math.pow(2,-10*n)+2)/2;
},circIn:function(n){
return -1*(Math.sqrt(1-Math.pow(n,2))-1);
},circOut:function(n){
n=n-1;
return Math.sqrt(1-Math.pow(n,2));
},circInOut:function(n){
n=n*2;
if(n<1){
return -1/2*(Math.sqrt(1-Math.pow(n,2))-1);
}
n-=2;
return 1/2*(Math.sqrt(1-Math.pow(n,2))+1);
},backIn:function(n){
var s=1.70158;
return Math.pow(n,2)*((s+1)*n-s);
},backOut:function(n){
n=n-1;
var s=1.70158;
return Math.pow(n,2)*((s+1)*n+s)+1;
},backInOut:function(n){
var s=1.70158*1.525;
n=n*2;
if(n<1){
return (Math.pow(n,2)*((s+1)*n-s))/2;
}
n-=2;
return (Math.pow(n,2)*((s+1)*n+s)+2)/2;
},elasticIn:function(n){
if(n==0||n==1){
return n;
}
var p=0.3;
var s=p/4;
n=n-1;
return -1*Math.pow(2,10*n)*Math.sin((n-s)*(2*Math.PI)/p);
},elasticOut:function(n){
if(n==0||n==1){
return n;
}
var p=0.3;
var s=p/4;
return Math.pow(2,-10*n)*Math.sin((n-s)*(2*Math.PI)/p)+1;
},elasticInOut:function(n){
if(n==0){
return 0;
}
n=n*2;
if(n==2){
return 1;
}
var p=0.3*1.5;
var s=p/4;
if(n<1){
n-=1;
return -0.5*(Math.pow(2,10*n)*Math.sin((n-s)*(2*Math.PI)/p));
}
n-=1;
return 0.5*(Math.pow(2,-10*n)*Math.sin((n-s)*(2*Math.PI)/p))+1;
},bounceIn:function(n){
return (1-dojo.fx.easing.bounceOut(1-n));
},bounceOut:function(n){
var s=7.5625;
var p=2.75;
var l;
if(n<(1/p)){
l=s*Math.pow(n,2);
}else{
if(n<(2/p)){
n-=(1.5/p);
l=s*Math.pow(n,2)+0.75;
}else{
if(n<(2.5/p)){
n-=(2.25/p);
l=s*Math.pow(n,2)+0.9375;
}else{
n-=(2.625/p);
l=s*Math.pow(n,2)+0.984375;
}
}
}
return l;
},bounceInOut:function(n){
if(n<0.5){
return dojo.fx.easing.bounceIn(n*2)/2;
}
return (dojo.fx.easing.bounceOut(n*2-1)/2)+0.5;
}};
}
if(!dojo._hasResource["dojox.charting.plot2d.Spider"]){
dojo._hasResource["dojox.charting.plot2d.Spider"]=true;
dojo.provide("dojox.charting.plot2d.Spider");
dojo.experimental("dojox.charting.plot2d.Spider");
(function(){
var df=dojox.lang.functional,du=dojox.lang.utils,dc=dojox.charting.plot2d.common,da=dojox.charting.axis2d.common,g=dojox.gfx,m=g.matrix,_326=0.2;
dojo.declare("dojox.charting.plot2d.Spider",[dojox.charting.Element,dojox.charting.plot2d._PlotEvents],{defaultParams:{labels:true,ticks:false,fixed:true,precision:1,labelOffset:-10,labelStyle:"default",htmlLabels:true,startAngle:-90,divisions:3,axisColor:"",axisWidth:0,spiderColor:"",spiderWidth:0,seriesWidth:0,seriesFillAlpha:0.2,spiderOrigin:0.16,markerSize:3,spiderType:"polygon",animationType:dojo.fx.easing.backOut,axisTickFont:"",axisTickFontColor:"",axisFont:"",axisFontColor:""},optionalParams:{radius:0,font:"",fontColor:""},constructor:function(_327,_328){
this.opt=dojo.clone(this.defaultParams);
du.updateWithObject(this.opt,_328);
du.updateWithPattern(this.opt,_328,this.optionalParams);
this.series=[];
this.dyn=[];
this.datas={};
this.labelKey=[];
this.oldSeriePoints={};
this.animations={};
},clear:function(){
this.dirty=true;
this.dyn=[];
this.series=[];
this.datas={};
this.labelKey=[];
this.oldSeriePoints={};
this.animations={};
return this;
},setAxis:function(axis){
return this;
},addSeries:function(run){
var _329=false;
this.series.push(run);
for(var key in run.data){
var val=run.data[key],data=this.datas[key];
if(data){
data.vlist.push(val);
data.min=Math.min(data.min,val);
data.max=Math.max(data.max,val);
}else{
this.datas[key]={min:val,max:val,vlist:[val]};
}
}
if(this.labelKey.length<=0){
for(var key in run.data){
this.labelKey.push(key);
}
}
return this;
},getSeriesStats:function(){
return dojox.charting.plot2d.common.collectSimpleStats(this.series);
},calculateAxes:function(dim){
this.initializeScalers(dim,this.getSeriesStats());
return this;
},getRequiredColors:function(){
return this.series.length;
},initializeScalers:function(dim,_32a){
if(this._hAxis){
if(!this._hAxis.initialized()){
this._hAxis.calculate(_32a.hmin,_32a.hmax,dim.width);
}
this._hScaler=this._hAxis.getScaler();
}else{
this._hScaler=dojox.charting.scaler.primitive.buildScaler(_32a.hmin,_32a.hmax,dim.width);
}
if(this._vAxis){
if(!this._vAxis.initialized()){
this._vAxis.calculate(_32a.vmin,_32a.vmax,dim.height);
}
this._vScaler=this._vAxis.getScaler();
}else{
this._vScaler=dojox.charting.scaler.primitive.buildScaler(_32a.vmin,_32a.vmax,dim.height);
}
return this;
},render:function(dim,_32b){
if(!this.dirty){
return this;
}
this.dirty=false;
this.cleanGroup();
var s=this.group,t=this.chart.theme;
this.resetEvents();
if(!this.series||!this.series.length){
return this;
}
var o=this.opt,ta=t.axis,rx=(dim.width-_32b.l-_32b.r)/2,ry=(dim.height-_32b.t-_32b.b)/2,r=Math.min(rx,ry),_32c=o.font||(ta.majorTick&&ta.majorTick.font)||(ta.tick&&ta.tick.font)||"normal normal normal 7pt Tahoma",_32d=o.axisFont||(ta.tick&&ta.tick.titleFont)||"normal normal normal 11pt Tahoma",_32e=o.axisTickFontColor||(ta.majorTick&&ta.majorTick.fontColor)||(ta.tick&&ta.tick.fontColor)||"silver",_32f=o.axisFontColor||(ta.tick&&ta.tick.titleFontColor)||"black",_330=o.axisColor||(ta.tick&&ta.tick.axisColor)||"silver",_331=o.spiderColor||(ta.tick&&ta.tick.spiderColor)||"silver",_332=o.axisWidth||(ta.stroke&&ta.stroke.width)||2,_333=o.spiderWidth||(ta.stroke&&ta.stroke.width)||2,_334=o.seriesWidth||(ta.stroke&&ta.stroke.width)||2,_335=g.normalizedLength(g.splitFontString(_32d).size),_336=m._degToRad(o.startAngle),_337=_336,step,_338,_339,_33a,_33b,_33c,_33d,_33e,_33f,_340,_341,ro=o.spiderOrigin,dv=o.divisions>=3?o.divisions:3,ms=o.markerSize,spt=o.spiderType,at=o.animationType,_342=o.labelOffset<-10?o.labelOffset:-10,_343=0.2;
if(o.labels){
_33a=dojo.map(this.series,function(s){
return s.name;
},this);
_33b=df.foldl1(df.map(_33a,function(_344,i){
var font=t.series.font;
return dojox.gfx._base._getTextBox(_344,{font:font}).w;
},this),"Math.max(a, b)")/2;
r=Math.min(rx-2*_33b,ry-_335)+_342;
_33c=r-_342;
}
if("radius" in o){
r=o.radius;
_33c=r-_342;
}
r/=(1+_343);
var _345={cx:_32b.l+rx,cy:_32b.t+ry,r:r};
for(var i=this.series.length-1;i>=0;i--){
var _346=this.series[i];
if(!this.dirty&&!_346.dirty){
t.skip();
continue;
}
_346.cleanGroup();
var run=_346.data;
if(run!==null){
var len=this._getObjectLength(run);
if(!_33d||_33d.length<=0){
_33d=[],_33e=[],_341=[];
this._buildPoints(_33d,len,_345,r,_337,true);
this._buildPoints(_33e,len,_345,r*ro,_337,true);
this._buildPoints(_341,len,_345,_33c,_337);
if(dv>2){
_33f=[],_340=[];
for(var j=0;j<dv-2;j++){
_33f[j]=[];
this._buildPoints(_33f[j],len,_345,r*(ro+(1-ro)*(j+1)/(dv-1)),_337,true);
_340[j]=r*(ro+(1-ro)*(j+1)/(dv-1));
}
}
}
}
}
var _347=s.createGroup(),_348={color:_330,width:_332},_349={color:_331,width:_333};
for(var j=_33d.length-1;j>=0;--j){
var _34a=_33d[j],st={x:_34a.x+(_34a.x-_345.cx)*_343,y:_34a.y+(_34a.y-_345.cy)*_343},nd={x:_34a.x+(_34a.x-_345.cx)*_343/2,y:_34a.y+(_34a.y-_345.cy)*_343/2};
_347.createLine({x1:_345.cx,y1:_345.cy,x2:st.x,y2:st.y}).setStroke(_348);
this._drawArrow(_347,st,nd,_348);
}
var _34b=s.createGroup();
for(var j=_341.length-1;j>=0;--j){
var _34a=_341[j],_34c=dojox.gfx._base._getTextBox(this.labelKey[j],{font:_32d}).w||0,_34d=this.opt.htmlLabels&&dojox.gfx.renderer!="vml"?"html":"gfx";
elem=da.createText[_34d](this.chart,_34b,(!dojo._isBodyLtr()&&_34d=="html")?(_34a.x+_34c-dim.width):_34a.x,_34a.y,"middle",this.labelKey[j],_32d,_32f);
if(this.opt.htmlLabels){
this.htmlElements.push(elem);
}
}
var _34e=s.createGroup();
if(spt=="polygon"){
_34e.createPolyline(_33d).setStroke(_349);
_34e.createPolyline(_33e).setStroke(_349);
if(_33f.length>0){
for(var j=_33f.length-1;j>=0;--j){
_34e.createPolyline(_33f[j]).setStroke(_349);
}
}
}else{
var _34f=this._getObjectLength(this.datas);
_34e.createCircle({cx:_345.cx,cy:_345.cy,r:r}).setStroke(_349);
_34e.createCircle({cx:_345.cx,cy:_345.cy,r:r*ro}).setStroke(_349);
if(_340.length>0){
for(var j=_340.length-1;j>=0;--j){
_34e.createCircle({cx:_345.cx,cy:_345.cy,r:_340[j]}).setStroke(_349);
}
}
}
var _350=s.createGroup(),len=this._getObjectLength(this.datas),k=0;
for(var key in this.datas){
var data=this.datas[key],min=data.min,max=data.max,_351=max-min,end=_337+2*Math.PI*k/len;
for(var i=0;i<dv;i++){
var text=min+_351*i/(dv-1),_34a=this._getCoordinate(_345,r*(ro+(1-ro)*i/(dv-1)),end);
text=this._getLabel(text);
var _34c=dojox.gfx._base._getTextBox(text,{font:_32c}).w||0,_34d=this.opt.htmlLabels&&dojox.gfx.renderer!="vml"?"html":"gfx";
if(this.opt.htmlLabels){
this.htmlElements.push(da.createText[_34d](this.chart,_350,(!dojo._isBodyLtr()&&_34d=="html")?(_34a.x+_34c-dim.width):_34a.x,_34a.y,"start",text,_32c,_32e));
}
}
k++;
}
this.chart.seriesShapes={};
var _352=[];
for(var i=this.series.length-1;i>=0;i--){
var _346=this.series[i],run=_346.data;
if(run!==null){
var _353=[],k=0,_354=[];
for(var key in run){
var data=this.datas[key],min=data.min,max=data.max,_351=max-min,_355=run[key],end=_337+2*Math.PI*k/len,_34a=this._getCoordinate(_345,r*(ro+(1-ro)*(_355-min)/_351),end);
_353.push(_34a);
_354.push({sname:_346.name,key:key,data:_355});
k++;
}
_353[_353.length]=_353[0];
_354[_354.length]=_354[0];
var _356=this._getBoundary(_353),_357=t.next("spider",[o,_346]),ts=_346.group,f=g.normalizeColor(_357.series.fill),sk={color:_357.series.fill,width:_334};
f.a=o.seriesFillAlpha;
_346.dyn={fill:f,stroke:sk};
var osps=this.oldSeriePoints[_346.name];
var cs=this._createSeriesEntry(ts,(osps||_33e),_353,f,sk,r,ro,ms,at);
this.chart.seriesShapes[_346.name]=cs;
this.oldSeriePoints[_346.name]=_353;
var po={element:"spider_poly",index:i,id:"spider_poly_"+_346.name,run:_346,plot:this,shape:cs.poly,parent:ts,brect:_356,cx:_345.cx,cy:_345.cy,cr:r,f:f,s:s};
this._connectEvents(po);
var so={element:"spider_plot",index:i,id:"spider_plot_"+_346.name,run:_346,plot:this,shape:_346.group};
this._connectEvents(so);
dojo.forEach(cs.circles,function(c,i){
var _358=c.getShape(),co={element:"spider_circle",index:i,id:"spider_circle_"+_346.name+i,run:_346,plot:this,shape:c,parent:ts,tdata:_354[i],cx:_353[i].x,cy:_353[i].y,f:f,s:s};
this._connectEvents(co);
},this);
}
}
return this;
},_createSeriesEntry:function(ts,osps,sps,f,sk,r,ro,ms,at){
var _359=ts.createPolyline(osps).setFill(f).setStroke(sk),_35a=[];
for(var j=0;j<osps.length;j++){
var _35b=osps[j],cr=ms;
var _35c=ts.createCircle({cx:_35b.x,cy:_35b.y,r:cr}).setFill(f).setStroke(sk);
_35a.push(_35c);
}
var _35d=dojo.map(sps,function(np,j){
var sp=osps[j],anim=new dojo._Animation({duration:1000,easing:at,curve:[sp.y,np.y]});
var spl=_359,sc=_35a[j];
dojo.connect(anim,"onAnimate",function(y){
var _35e=spl.getShape();
_35e.points[j].y=y;
spl.setShape(_35e);
var _35f=sc.getShape();
_35f.cy=y;
sc.setShape(_35f);
});
return anim;
});
var _360=dojo.map(sps,function(np,j){
var sp=osps[j],anim=new dojo._Animation({duration:1000,easing:at,curve:[sp.x,np.x]});
var spl=_359,sc=_35a[j];
dojo.connect(anim,"onAnimate",function(x){
var _361=spl.getShape();
_361.points[j].x=x;
spl.setShape(_361);
var _362=sc.getShape();
_362.cx=x;
sc.setShape(_362);
});
return anim;
});
var _363=dojo.fx.combine(_35d.concat(_360));
_363.play();
return {group:ts,poly:_359,circles:_35a};
},plotEvent:function(o){
var _364=o.id?o.id:"default",a;
if(_364 in this.animations){
a=this.animations[_364];
a.anim&&a.anim.stop(true);
}else{
a=this.animations[_364]={};
}
if(o.element=="spider_poly"){
if(!a.color){
var _365=o.shape.getFill();
if(!_365||!(_365 instanceof dojo.Color)){
return;
}
a.color={start:_365,end:_366(_365)};
}
var _367=a.color.start,end=a.color.end;
if(o.type=="onmouseout"){
var t=_367;
_367=end;
end=t;
}
a.anim=dojox.gfx.fx.animateFill({shape:o.shape,duration:800,easing:dojo.fx.easing.backOut,color:{start:_367,end:end}});
a.anim.play();
}else{
if(o.element=="spider_circle"){
var init,_368,_369=1.5;
if(o.type=="onmouseover"){
init=dojox.gfx.matrix.identity;
_368=_369;
var _36a={type:"rect"};
_36a.x=o.cx;
_36a.y=o.cy;
_36a.width=_36a.height=1;
var lt=dojo.coords(this.chart.node,true);
_36a.x+=lt.x;
_36a.y+=lt.y;
_36a.x=Math.round(_36a.x);
_36a.y=Math.round(_36a.y);
_36a.width=Math.ceil(_36a.width);
_36a.height=Math.ceil(_36a.height);
this.aroundRect=_36a;
var _36b=["after","before"];
if(dijit&&dijit.Tooltip){
dijit.showTooltip(o.tdata.sname+"<br/>"+o.tdata.key+"<br/>"+o.tdata.data,this.aroundRect,_36b);
}
}else{
init=dojox.gfx.matrix.scaleAt(_369,o.cx,o.cy);
_368=1/_369;
if(dijit&&dijit.Tooltip){
this.aroundRect&&dijit.hideTooltip(this.aroundRect);
}
}
var cs=o.shape.getShape(),init=m.scaleAt(_369,cs.cx,cs.cy),_36c={shape:o.shape,duration:200,easing:dojo.fx.easing.backOut,transform:[{name:"scaleAt",start:[1,cs.cx,cs.cy],end:[_368,cs.cx,cs.cy]},init]};
a.anim=dojox.gfx.fx.animateTransform(_36c);
a.anim.play();
}else{
if(o.element=="spider_plot"){
if(o.type=="onmouseover"&&!dojo.isIE){
o.shape.moveToFront();
}
}
}
}
},_getBoundary:function(_36d){
var xmax=_36d[0].x,xmin=_36d[0].x,ymax=_36d[0].y,ymin=_36d[0].y;
for(var i=0;i<_36d.length;i++){
var _36e=_36d[i];
xmax=Math.max(_36e.x,xmax);
ymax=Math.max(_36e.y,ymax);
xmin=Math.min(_36e.x,xmin);
ymin=Math.min(_36e.y,ymin);
}
return {x:xmin,y:ymin,width:xmax-xmin,height:ymax-ymin};
},_drawArrow:function(s,_36f,end,_370){
var len=Math.sqrt(Math.pow(end.x-_36f.x,2)+Math.pow(end.y-_36f.y,2)),sin=(end.y-_36f.y)/len,cos=(end.x-_36f.x)/len,_371={x:end.x+(len/3)*(-sin),y:end.y+(len/3)*cos},_372={x:end.x+(len/3)*sin,y:end.y+(len/3)*(-cos)};
s.createPolyline([_36f,_371,_372]).setFill(_370.color).setStroke(_370);
},_buildPoints:function(_373,_374,_375,_376,_377,_378){
for(var i=0;i<_374;i++){
var end=_377+2*Math.PI*i/_374;
_373.push(this._getCoordinate(_375,_376,end));
}
if(_378){
_373.push(this._getCoordinate(_375,_376,_377+2*Math.PI));
}
},_getCoordinate:function(_379,_37a,_37b){
return {x:_379.cx+_37a*Math.cos(_37b),y:_379.cy+_37a*Math.sin(_37b)};
},_getObjectLength:function(obj){
var _37c=0;
if(dojo.isObject(obj)){
for(var key in obj){
_37c++;
}
}
return _37c;
},_getLabel:function(_37d){
return dc.getLabel(_37d,this.opt.fixed,this.opt.precision);
}});
function _366(_37e){
var a=new dojox.color.Color(_37e),x=a.toHsl();
if(x.s==0){
x.l=x.l<50?100:0;
}else{
x.s=100;
if(x.l<50){
x.l=75;
}else{
if(x.l>75){
x.l=50;
}else{
x.l=x.l-50>75-x.l?50:75;
}
}
}
var _37e=dojox.color.fromHsl(x);
_37e.a=0.7;
return _37e;
};
})();
}
if(!dojo._hasResource["dojox.lang.functional.fold"]){
dojo._hasResource["dojox.lang.functional.fold"]=true;
dojo.provide("dojox.lang.functional.fold");
(function(){
var d=dojo,df=dojox.lang.functional,_37f={};
d.mixin(df,{foldl:function(a,f,z,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var i,n;
if(d.isArray(a)){
for(i=0,n=a.length;i<n;z=f.call(o,z,a[i],i,a),++i){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
for(i=0;a.hasNext();z=f.call(o,z,a.next(),i++,a)){
}
}else{
for(i in a){
if(!(i in _37f)){
z=f.call(o,z,a[i],i,a);
}
}
}
}
return z;
},foldl1:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var z,i,n;
if(d.isArray(a)){
z=a[0];
for(i=1,n=a.length;i<n;z=f.call(o,z,a[i],i,a),++i){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
if(a.hasNext()){
z=a.next();
for(i=1;a.hasNext();z=f.call(o,z,a.next(),i++,a)){
}
}
}else{
var _380=true;
for(i in a){
if(!(i in _37f)){
if(_380){
z=a[i];
_380=false;
}else{
z=f.call(o,z,a[i],i,a);
}
}
}
}
}
return z;
},foldr:function(a,f,z,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
for(var i=a.length;i>0;--i,z=f.call(o,z,a[i],i,a)){
}
return z;
},foldr1:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var n=a.length,z=a[n-1],i=n-1;
for(;i>0;--i,z=f.call(o,z,a[i],i,a)){
}
return z;
},reduce:function(a,f,z){
return arguments.length<3?df.foldl1(a,f):df.foldl(a,f,z);
},reduceRight:function(a,f,z){
return arguments.length<3?df.foldr1(a,f):df.foldr(a,f,z);
},unfold:function(pr,f,g,z,o){
o=o||d.global;
f=df.lambda(f);
g=df.lambda(g);
pr=df.lambda(pr);
var t=[];
for(;!pr.call(o,z);t.push(f.call(o,z)),z=g.call(o,z)){
}
return t;
}});
})();
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
dojo.mixin(dojox.color,{fromCmy:function(cyan,_381,_382){
if(dojo.isArray(cyan)){
_381=cyan[1],_382=cyan[2],cyan=cyan[0];
}else{
if(dojo.isObject(cyan)){
_381=cyan.m,_382=cyan.y,cyan=cyan.c;
}
}
cyan/=100,_381/=100,_382/=100;
var r=1-cyan,g=1-_381,b=1-_382;
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromCmyk:function(cyan,_383,_384,_385){
if(dojo.isArray(cyan)){
_383=cyan[1],_384=cyan[2],_385=cyan[3],cyan=cyan[0];
}else{
if(dojo.isObject(cyan)){
_383=cyan.m,_384=cyan.y,_385=cyan.b,cyan=cyan.c;
}
}
cyan/=100,_383/=100,_384/=100,_385/=100;
var r,g,b;
r=1-Math.min(1,cyan*(1-_385)+_385);
g=1-Math.min(1,_383*(1-_385)+_385);
b=1-Math.min(1,_384*(1-_385)+_385);
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromHsl:function(hue,_386,_387){
if(dojo.isArray(hue)){
_386=hue[1],_387=hue[2],hue=hue[0];
}else{
if(dojo.isObject(hue)){
_386=hue.s,_387=hue.l,hue=hue.h;
}
}
_386/=100;
_387/=100;
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
r=2*_386*Math.min(r,1)+(1-_386);
g=2*_386*Math.min(g,1)+(1-_386);
b=2*_386*Math.min(b,1)+(1-_386);
if(_387<0.5){
r*=_387,g*=_387,b*=_387;
}else{
r=(1-_387)*r+2*_387-1;
g=(1-_387)*g+2*_387-1;
b=(1-_387)*b+2*_387-1;
}
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
},fromHsv:function(hue,_388,_389){
if(dojo.isArray(hue)){
_388=hue[1],_389=hue[2],hue=hue[0];
}else{
if(dojo.isObject(hue)){
_388=hue.s,_389=hue.v,hue=hue.h;
}
}
if(hue==360){
hue=0;
}
_388/=100;
_389/=100;
var r,g,b;
if(_388==0){
r=_389,b=_389,g=_389;
}else{
var _38a=hue/60,i=Math.floor(_38a),f=_38a-i;
var p=_389*(1-_388);
var q=_389*(1-(_388*f));
var t=_389*(1-(_388*(1-f)));
switch(i){
case 0:
r=_389,g=t,b=p;
break;
case 1:
r=q,g=_389,b=p;
break;
case 2:
r=p,g=_389,b=t;
break;
case 3:
r=p,g=q,b=_389;
break;
case 4:
r=t,g=p,b=_389;
break;
case 5:
r=_389,g=p,b=q;
break;
}
}
return new dojox.color.Color({r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)});
}});
dojo.extend(dojox.color.Color,{toCmy:function(){
var cyan=1-(this.r/255),_38b=1-(this.g/255),_38c=1-(this.b/255);
return {c:Math.round(cyan*100),m:Math.round(_38b*100),y:Math.round(_38c*100)};
},toCmyk:function(){
var cyan,_38d,_38e,_38f;
var r=this.r/255,g=this.g/255,b=this.b/255;
_38f=Math.min(1-r,1-g,1-b);
cyan=(1-r-_38f)/(1-_38f);
_38d=(1-g-_38f)/(1-_38f);
_38e=(1-b-_38f)/(1-_38f);
return {c:Math.round(cyan*100),m:Math.round(_38d*100),y:Math.round(_38e*100),b:Math.round(_38f*100)};
},toHsl:function(){
var r=this.r/255,g=this.g/255,b=this.b/255;
var min=Math.min(r,b,g),max=Math.max(r,g,b);
var _390=max-min;
var h=0,s=0,l=(min+max)/2;
if(l>0&&l<1){
s=_390/((l<0.5)?(2*l):(2-2*l));
}
if(_390>0){
if(max==r&&max!=g){
h+=(g-b)/_390;
}
if(max==g&&max!=b){
h+=(2+(b-r)/_390);
}
if(max==b&&max!=r){
h+=(4+(r-g)/_390);
}
h*=60;
}
return {h:h,s:Math.round(s*100),l:Math.round(l*100)};
},toHsv:function(){
var r=this.r/255,g=this.g/255,b=this.b/255;
var min=Math.min(r,b,g),max=Math.max(r,g,b);
var _391=max-min;
var h=null,s=(max==0)?0:(_391/max);
if(s==0){
h=0;
}else{
if(r==max){
h=60*(g-b)/_391;
}else{
if(g==max){
h=120+60*(b-r)/_391;
}else{
h=240+60*(r-g)/_391;
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
if(!dojo._hasResource["dojox.color.Palette"]){
dojo._hasResource["dojox.color.Palette"]=true;
dojo.provide("dojox.color.Palette");
(function(){
var dxc=dojox.color;
dxc.Palette=function(base){
this.colors=[];
if(base instanceof dojox.color.Palette){
this.colors=base.colors.slice(0);
}else{
if(base instanceof dojox.color.Color){
this.colors=[null,null,base,null,null];
}else{
if(dojo.isArray(base)){
this.colors=dojo.map(base.slice(0),function(item){
if(dojo.isString(item)){
return new dojox.color.Color(item);
}
return item;
});
}else{
if(dojo.isString(base)){
this.colors=[null,null,new dojox.color.Color(base),null,null];
}
}
}
}
};
function _392(p,_393,val){
var ret=new dojox.color.Palette();
ret.colors=[];
dojo.forEach(p.colors,function(item){
var r=(_393=="dr")?item.r+val:item.r,g=(_393=="dg")?item.g+val:item.g,b=(_393=="db")?item.b+val:item.b,a=(_393=="da")?item.a+val:item.a;
ret.colors.push(new dojox.color.Color({r:Math.min(255,Math.max(0,r)),g:Math.min(255,Math.max(0,g)),b:Math.min(255,Math.max(0,b)),a:Math.min(1,Math.max(0,a))}));
});
return ret;
};
function tCMY(p,_394,val){
var ret=new dojox.color.Palette();
ret.colors=[];
dojo.forEach(p.colors,function(item){
var o=item.toCmy(),c=(_394=="dc")?o.c+val:o.c,m=(_394=="dm")?o.m+val:o.m,y=(_394=="dy")?o.y+val:o.y;
ret.colors.push(dojox.color.fromCmy(Math.min(100,Math.max(0,c)),Math.min(100,Math.max(0,m)),Math.min(100,Math.max(0,y))));
});
return ret;
};
function _395(p,_396,val){
var ret=new dojox.color.Palette();
ret.colors=[];
dojo.forEach(p.colors,function(item){
var o=item.toCmyk(),c=(_396=="dc")?o.c+val:o.c,m=(_396=="dm")?o.m+val:o.m,y=(_396=="dy")?o.y+val:o.y,k=(_396=="dk")?o.b+val:o.b;
ret.colors.push(dojox.color.fromCmyk(Math.min(100,Math.max(0,c)),Math.min(100,Math.max(0,m)),Math.min(100,Math.max(0,y)),Math.min(100,Math.max(0,k))));
});
return ret;
};
function tHSL(p,_397,val){
var ret=new dojox.color.Palette();
ret.colors=[];
dojo.forEach(p.colors,function(item){
var o=item.toHsl(),h=(_397=="dh")?o.h+val:o.h,s=(_397=="ds")?o.s+val:o.s,l=(_397=="dl")?o.l+val:o.l;
ret.colors.push(dojox.color.fromHsl(h%360,Math.min(100,Math.max(0,s)),Math.min(100,Math.max(0,l))));
});
return ret;
};
function tHSV(p,_398,val){
var ret=new dojox.color.Palette();
ret.colors=[];
dojo.forEach(p.colors,function(item){
var o=item.toHsv(),h=(_398=="dh")?o.h+val:o.h,s=(_398=="ds")?o.s+val:o.s,v=(_398=="dv")?o.v+val:o.v;
ret.colors.push(dojox.color.fromHsv(h%360,Math.min(100,Math.max(0,s)),Math.min(100,Math.max(0,v))));
});
return ret;
};
function _399(val,low,high){
return high-((high-val)*((high-low)/high));
};
dojo.extend(dxc.Palette,{transform:function(_39a){
var fn=_392;
if(_39a.use){
var use=_39a.use.toLowerCase();
if(use.indexOf("hs")==0){
if(use.charAt(2)=="l"){
fn=tHSL;
}else{
fn=tHSV;
}
}else{
if(use.indexOf("cmy")==0){
if(use.charAt(3)=="k"){
fn=_395;
}else{
fn=tCMY;
}
}
}
}else{
if("dc" in _39a||"dm" in _39a||"dy" in _39a){
if("dk" in _39a){
fn=_395;
}else{
fn=tCMY;
}
}else{
if("dh" in _39a||"ds" in _39a){
if("dv" in _39a){
fn=tHSV;
}else{
fn=tHSL;
}
}
}
}
var _39b=this;
for(var p in _39a){
if(p=="use"){
continue;
}
_39b=fn(_39b,p,_39a[p]);
}
return _39b;
},clone:function(){
return new dxc.Palette(this);
}});
dojo.mixin(dxc.Palette,{generators:{analogous:function(args){
var high=args.high||60,low=args.low||18,base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var h=[(hsv.h+low+360)%360,(hsv.h+Math.round(low/2)+360)%360,hsv.h,(hsv.h-Math.round(high/2)+360)%360,(hsv.h-high+360)%360];
var s1=Math.max(10,(hsv.s<=95)?hsv.s+5:(100-(hsv.s-95))),s2=(hsv.s>1)?hsv.s-1:21-hsv.s,v1=(hsv.v>=92)?hsv.v-9:Math.max(hsv.v+9,20),v2=(hsv.v<=90)?Math.max(hsv.v+5,20):(95+Math.ceil((hsv.v-90)/2)),s=[s1,s2,hsv.s,s1,s1],v=[v1,v2,hsv.v,v1,v2];
return new dxc.Palette(dojo.map(h,function(hue,i){
return dojox.color.fromHsv(hue,s[i],v[i]);
}));
},monochromatic:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var s1=(hsv.s-30>9)?hsv.s-30:hsv.s+30,s2=hsv.s,v1=_399(hsv.v,20,100),v2=(hsv.v-20>20)?hsv.v-20:hsv.v+60,v3=(hsv.v-50>20)?hsv.v-50:hsv.v+30;
return new dxc.Palette([dojox.color.fromHsv(hsv.h,s1,v1),dojox.color.fromHsv(hsv.h,s2,v3),base,dojox.color.fromHsv(hsv.h,s1,v3),dojox.color.fromHsv(hsv.h,s2,v2)]);
},triadic:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var h1=(hsv.h+57+360)%360,h2=(hsv.h-157+360)%360,s1=(hsv.s>20)?hsv.s-10:hsv.s+10,s2=(hsv.s>90)?hsv.s-10:hsv.s+10,s3=(hsv.s>95)?hsv.s-5:hsv.s+5,v1=(hsv.v-20>20)?hsv.v-20:hsv.v+20,v2=(hsv.v-30>20)?hsv.v-30:hsv.v+30,v3=(hsv.v-30>70)?hsv.v-30:hsv.v+30;
return new dxc.Palette([dojox.color.fromHsv(h1,s1,hsv.v),dojox.color.fromHsv(hsv.h,s2,v2),base,dojox.color.fromHsv(h2,s2,v1),dojox.color.fromHsv(h2,s3,v3)]);
},complementary:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var h1=((hsv.h*2)+137<360)?(hsv.h*2)+137:Math.floor(hsv.h/2)-137,s1=Math.max(hsv.s-10,0),s2=_399(hsv.s,10,100),s3=Math.min(100,hsv.s+20),v1=Math.min(100,hsv.v+30),v2=(hsv.v>20)?hsv.v-30:hsv.v+30;
return new dxc.Palette([dojox.color.fromHsv(hsv.h,s1,v1),dojox.color.fromHsv(hsv.h,s2,v2),base,dojox.color.fromHsv(h1,s3,v2),dojox.color.fromHsv(h1,hsv.s,hsv.v)]);
},splitComplementary:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,_39c=args.da||30,hsv=base.toHsv();
var _39d=((hsv.h*2)+137<360)?(hsv.h*2)+137:Math.floor(hsv.h/2)-137,h1=(_39d-_39c+360)%360,h2=(_39d+_39c)%360,s1=Math.max(hsv.s-10,0),s2=_399(hsv.s,10,100),s3=Math.min(100,hsv.s+20),v1=Math.min(100,hsv.v+30),v2=(hsv.v>20)?hsv.v-30:hsv.v+30;
return new dxc.Palette([dojox.color.fromHsv(h1,s1,v1),dojox.color.fromHsv(h1,s2,v2),base,dojox.color.fromHsv(h2,s3,v2),dojox.color.fromHsv(h2,hsv.s,hsv.v)]);
},compound:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var h1=((hsv.h*2)+18<360)?(hsv.h*2)+18:Math.floor(hsv.h/2)-18,h2=((hsv.h*2)+120<360)?(hsv.h*2)+120:Math.floor(hsv.h/2)-120,h3=((hsv.h*2)+99<360)?(hsv.h*2)+99:Math.floor(hsv.h/2)-99,s1=(hsv.s-40>10)?hsv.s-40:hsv.s+40,s2=(hsv.s-10>80)?hsv.s-10:hsv.s+10,s3=(hsv.s-25>10)?hsv.s-25:hsv.s+25,v1=(hsv.v-40>10)?hsv.v-40:hsv.v+40,v2=(hsv.v-20>80)?hsv.v-20:hsv.v+20,v3=Math.max(hsv.v,20);
return new dxc.Palette([dojox.color.fromHsv(h1,s1,v1),dojox.color.fromHsv(h1,s2,v2),base,dojox.color.fromHsv(h2,s3,v3),dojox.color.fromHsv(h3,s2,v2)]);
},shades:function(args){
var base=dojo.isString(args.base)?new dojox.color.Color(args.base):args.base,hsv=base.toHsv();
var s=(hsv.s==100&&hsv.v==0)?0:hsv.s,v1=(hsv.v-50>20)?hsv.v-50:hsv.v+30,v2=(hsv.v-25>=20)?hsv.v-25:hsv.v+55,v3=(hsv.v-75>=20)?hsv.v-75:hsv.v+5,v4=Math.max(hsv.v-10,20);
return new dxc.Palette([new dojox.color.fromHsv(hsv.h,s,v1),new dojox.color.fromHsv(hsv.h,s,v2),base,new dojox.color.fromHsv(hsv.h,s,v3),new dojox.color.fromHsv(hsv.h,s,v4)]);
}},generate:function(base,type){
if(dojo.isFunction(type)){
return type({base:base});
}else{
if(dxc.Palette.generators[type]){
return dxc.Palette.generators[type]({base:base});
}
}
throw new Error("dojox.color.Palette.generate: the specified generator ('"+type+"') does not exist.");
}});
})();
}
if(!dojo._hasResource["dojox.charting.Theme"]){
dojo._hasResource["dojox.charting.Theme"]=true;
dojo.provide("dojox.charting.Theme");
dojo.declare("dojox.charting.Theme",null,{shapeSpaces:{shape:1,shapeX:1,shapeY:1},constructor:function(_39e){
_39e=_39e||{};
var def=dojox.charting.Theme.defaultTheme;
dojo.forEach(["chart","plotarea","axis","series","marker"],function(name){
this[name]=dojo.delegate(def[name],_39e[name]);
},this);
if(_39e.seriesThemes&&_39e.seriesThemes.length){
this.colors=null;
this.seriesThemes=_39e.seriesThemes.slice(0);
}else{
this.seriesThemes=null;
this.colors=(_39e.colors||dojox.charting.Theme.defaultColors).slice(0);
}
this.markerThemes=null;
if(_39e.markerThemes&&_39e.markerThemes.length){
this.markerThemes=_39e.markerThemes.slice(0);
}
this.markers=_39e.markers?dojo.clone(_39e.markers):dojo.delegate(dojox.charting.Theme.defaultMarkers);
this.noGradConv=_39e.noGradConv;
this.noRadialConv=_39e.noRadialConv;
if(_39e.reverseFills){
this.reverseFills();
}
this._current=0;
this._buildMarkerArray();
},clone:function(){
var _39f=new dojox.charting.Theme({chart:this.chart,plotarea:this.plotarea,axis:this.axis,series:this.series,marker:this.marker,colors:this.colors,markers:this.markers,seriesThemes:this.seriesThemes,markerThemes:this.markerThemes,noGradConv:this.noGradConv,noRadialConv:this.noRadialConv});
dojo.forEach(["clone","clear","next","skip","addMixin","post","getTick"],function(name){
if(this.hasOwnProperty(name)){
_39f[name]=this[name];
}
},this);
return _39f;
},clear:function(){
this._current=0;
},next:function(_3a0,_3a1,_3a2){
var _3a3=dojox.lang.utils.merge,_3a4,_3a5;
if(this.colors){
_3a4=dojo.delegate(this.series);
_3a5=dojo.delegate(this.marker);
var _3a6=new dojo.Color(this.colors[this._current%this.colors.length]),old;
if(_3a4.stroke&&_3a4.stroke.color){
_3a4.stroke=dojo.delegate(_3a4.stroke);
old=new dojo.Color(_3a4.stroke.color);
_3a4.stroke.color=new dojo.Color(_3a6);
_3a4.stroke.color.a=old.a;
}else{
_3a4.stroke={color:_3a6};
}
if(_3a5.stroke&&_3a5.stroke.color){
_3a5.stroke=dojo.delegate(_3a5.stroke);
old=new dojo.Color(_3a5.stroke.color);
_3a5.stroke.color=new dojo.Color(_3a6);
_3a5.stroke.color.a=old.a;
}else{
_3a5.stroke={color:_3a6};
}
if(!_3a4.fill||_3a4.fill.type){
_3a4.fill=_3a6;
}else{
old=new dojo.Color(_3a4.fill);
_3a4.fill=new dojo.Color(_3a6);
_3a4.fill.a=old.a;
}
if(!_3a5.fill||_3a5.fill.type){
_3a5.fill=_3a6;
}else{
old=new dojo.Color(_3a5.fill);
_3a5.fill=new dojo.Color(_3a6);
_3a5.fill.a=old.a;
}
}else{
_3a4=this.seriesThemes?_3a3(this.series,this.seriesThemes[this._current%this.seriesThemes.length]):this.series;
_3a5=this.markerThemes?_3a3(this.marker,this.markerThemes[this._current%this.markerThemes.length]):_3a4;
}
var _3a7=_3a5&&_3a5.symbol||this._markers[this._current%this._markers.length];
var _3a8={series:_3a4,marker:_3a5,symbol:_3a7};
++this._current;
if(_3a1){
_3a8=this.addMixin(_3a8,_3a0,_3a1);
}
if(_3a2){
_3a8=this.post(_3a8,_3a0);
}
return _3a8;
},skip:function(){
++this._current;
},addMixin:function(_3a9,_3aa,_3ab,_3ac){
if(dojo.isArray(_3ab)){
dojo.forEach(_3ab,function(m){
_3a9=this.addMixin(_3a9,_3aa,m);
},this);
}else{
var t={};
if("color" in _3ab){
if(_3aa=="line"||_3aa=="area"){
dojo.setObject("series.stroke.color",_3ab.color,t);
dojo.setObject("marker.stroke.color",_3ab.color,t);
}else{
dojo.setObject("series.fill",_3ab.color,t);
}
}
dojo.forEach(["stroke","outline","shadow","fill","font","fontColor","labelWiring"],function(name){
var _3ad="marker"+name.charAt(0).toUpperCase()+name.substr(1),b=_3ad in _3ab;
if(name in _3ab){
dojo.setObject("series."+name,_3ab[name],t);
if(!b){
dojo.setObject("marker."+name,_3ab[name],t);
}
}
if(b){
dojo.setObject("marker."+name,_3ab[_3ad],t);
}
});
if("marker" in _3ab){
t.symbol=_3ab.marker;
}
_3a9=dojox.lang.utils.merge(_3a9,t);
}
if(_3ac){
_3a9=this.post(_3a9,_3aa);
}
return _3a9;
},post:function(_3ae,_3af){
var fill=_3ae.series.fill,t;
if(!this.noGradConv&&this.shapeSpaces[fill.space]&&fill.type=="linear"){
if(_3af=="bar"){
t={x1:fill.y1,y1:fill.x1,x2:fill.y2,y2:fill.x2};
}else{
if(!this.noRadialConv&&fill.space=="shape"&&(_3af=="slice"||_3af=="circle")){
t={type:"radial",cx:0,cy:0,r:100};
}
}
if(t){
return dojox.lang.utils.merge(_3ae,{series:{fill:t}});
}
}
return _3ae;
},getTick:function(name,_3b0){
var tick=this.axis.tick,_3b1=name+"Tick";
merge=dojox.lang.utils.merge;
if(tick){
if(this.axis[_3b1]){
tick=merge(tick,this.axis[_3b1]);
}
}else{
tick=this.axis[_3b1];
}
if(_3b0){
if(tick){
if(_3b0[_3b1]){
tick=merge(tick,_3b0[_3b1]);
}
}else{
tick=_3b0[_3b1];
}
}
return tick;
},inspectObjects:function(f){
dojo.forEach(["chart","plotarea","axis","series","marker"],function(name){
f(this[name]);
},this);
if(this.seriesThemes){
dojo.forEach(this.seriesThemes,f);
}
if(this.markerThemes){
dojo.forEach(this.markerThemes,f);
}
},reverseFills:function(){
this.inspectObjects(function(o){
if(o&&o.fill){
o.fill=dojox.gfx.gradutils.reverse(o.fill);
}
});
},addMarker:function(name,_3b2){
this.markers[name]=_3b2;
this._buildMarkerArray();
},setMarkers:function(obj){
this.markers=obj;
this._buildMarkerArray();
},_buildMarkerArray:function(){
this._markers=[];
for(var p in this.markers){
this._markers.push(this.markers[p]);
}
}});
dojo.mixin(dojox.charting.Theme,{defaultMarkers:{CIRCLE:"m-3,0 c0,-4 6,-4 6,0 m-6,0 c0,4 6,4 6,0",SQUARE:"m-3,-3 l0,6 6,0 0,-6 z",DIAMOND:"m0,-3 l3,3 -3,3 -3,-3 z",CROSS:"m0,-3 l0,6 m-3,-3 l6,0",X:"m-3,-3 l6,6 m0,-6 l-6,6",TRIANGLE:"m-3,3 l3,-6 3,6 z",TRIANGLE_INVERTED:"m-3,-3 l3,6 3,-6 z"},defaultColors:["#54544c","#858e94","#6e767a","#948585","#474747"],defaultTheme:{chart:{stroke:null,fill:"white",pageStyle:null,titleGap:20,titlePos:"top",titleFont:"normal normal bold 14pt Tahoma",titleFontColor:"#333"},plotarea:{stroke:null,fill:"white"},axis:{stroke:{color:"#333",width:1},tick:{color:"#666",position:"center",font:"normal normal normal 7pt Tahoma",fontColor:"#333",titleGap:15,titleFont:"normal normal normal 11pt Tahoma",titleFontColor:"#333",titleOrientation:"axis"},majorTick:{width:1,length:6},minorTick:{width:0.8,length:3},microTick:{width:0.5,length:1}},series:{stroke:{width:1.5,color:"#333"},outline:{width:0.1,color:"#ccc"},shadow:null,fill:"#ccc",font:"normal normal normal 8pt Tahoma",fontColor:"#000",labelWiring:{width:1,color:"#ccc"}},marker:{stroke:{width:1.5,color:"#333"},outline:{width:0.1,color:"#ccc"},shadow:null,fill:"#ccc",font:"normal normal normal 8pt Tahoma",fontColor:"#000"}},defineColors:function(_3b3){
_3b3=_3b3||{};
var c=[],n=_3b3.num||5;
if(_3b3.colors){
var l=_3b3.colors.length;
for(var i=0;i<n;i++){
c.push(_3b3.colors[i%l]);
}
return c;
}
if(_3b3.hue){
var s=_3b3.saturation||100;
var st=_3b3.low||30;
var end=_3b3.high||90;
var l=(end+st)/2;
return dojox.color.Palette.generate(dojox.color.fromHsv(_3b3.hue,s,l),"monochromatic").colors;
}
if(_3b3.generator){
return dojox.color.Palette.generate(_3b3.base,_3b3.generator).colors;
}
return c;
},generateGradient:function(_3b4,_3b5,_3b6){
var fill=dojo.delegate(_3b4);
fill.colors=[{offset:0,color:_3b5},{offset:1,color:_3b6}];
return fill;
},generateHslColor:function(_3b7,_3b8){
_3b7=new dojox.color.Color(_3b7);
var hsl=_3b7.toHsl(),_3b9=dojox.color.fromHsl(hsl.h,hsl.s,_3b8);
_3b9.a=_3b7.a;
return _3b9;
},generateHslGradient:function(_3ba,_3bb,_3bc,_3bd){
_3ba=new dojox.color.Color(_3ba);
var hsl=_3ba.toHsl(),_3be=dojox.color.fromHsl(hsl.h,hsl.s,_3bc),_3bf=dojox.color.fromHsl(hsl.h,hsl.s,_3bd);
_3be.a=_3bf.a=_3ba.a;
return dojox.charting.Theme.generateGradient(_3bb,_3be,_3bf);
}});
}
if(!dojo._hasResource["dojox.charting.Series"]){
dojo._hasResource["dojox.charting.Series"]=true;
dojo.provide("dojox.charting.Series");
dojo.declare("dojox.charting.Series",dojox.charting.Element,{constructor:function(_3c0,data,_3c1){
dojo.mixin(this,_3c1);
if(typeof this.plot!="string"){
this.plot="default";
}
this.update(data);
},clear:function(){
this.dyn={};
},update:function(data){
if(dojo.isArray(data)){
this.data=data;
}else{
this.source=data;
this.data=this.source.data;
if(this.source.setSeriesObject){
this.source.setSeriesObject(this);
}
}
this.dirty=true;
this.clear();
}});
}
if(!dojo._hasResource["dojox.charting.Chart"]){
dojo._hasResource["dojox.charting.Chart"]=true;
dojo.provide("dojox.charting.Chart");
(function(){
var df=dojox.lang.functional,dc=dojox.charting,g=dojox.gfx,_3c2=df.lambda("item.clear()"),_3c3=df.lambda("item.purgeGroup()"),_3c4=df.lambda("item.destroy()"),_3c5=df.lambda("item.dirty = false"),_3c6=df.lambda("item.dirty = true"),_3c7=df.lambda("item.name");
dojo.declare("dojox.charting.Chart",null,{constructor:function(node,_3c8){
if(!_3c8){
_3c8={};
}
this.margins=_3c8.margins?_3c8.margins:{l:10,t:10,r:10,b:10};
this.stroke=_3c8.stroke;
this.fill=_3c8.fill;
this.delayInMs=_3c8.delayInMs||200;
this.title=_3c8.title;
this.titleGap=_3c8.titleGap;
this.titlePos=_3c8.titlePos;
this.titleFont=_3c8.titleFont;
this.titleFontColor=_3c8.titleFontColor;
this.chartTitle=null;
this.theme=null;
this.axes={};
this.stack=[];
this.plots={};
this.series=[];
this.runs={};
this.dirty=true;
this.coords=null;
this.node=dojo.byId(node);
var box=dojo.marginBox(node);
this.surface=g.createSurface(this.node,box.w||400,box.h||300);
},destroy:function(){
dojo.forEach(this.series,_3c4);
dojo.forEach(this.stack,_3c4);
df.forIn(this.axes,_3c4);
if(this.chartTitle&&this.chartTitle.tagName){
dojo.destroy(this.chartTitle);
}
this.surface.destroy();
},getCoords:function(){
if(!this.coords){
this.coords=dojo.coords(this.node,true);
}
return this.coords;
},setTheme:function(_3c9){
this.theme=_3c9.clone();
this.dirty=true;
return this;
},addAxis:function(name,_3ca){
var axis,_3cb=_3ca&&_3ca.type||"Default";
if(typeof _3cb=="string"){
if(!dc.axis2d||!dc.axis2d[_3cb]){
throw Error("Can't find axis: "+_3cb+" - didn't you forget to dojo"+".require() it?");
}
axis=new dc.axis2d[_3cb](this,_3ca);
}else{
axis=new _3cb(this,_3ca);
}
axis.name=name;
axis.dirty=true;
if(name in this.axes){
this.axes[name].destroy();
}
this.axes[name]=axis;
this.dirty=true;
return this;
},getAxis:function(name){
return this.axes[name];
},removeAxis:function(name){
if(name in this.axes){
this.axes[name].destroy();
delete this.axes[name];
this.dirty=true;
}
return this;
},addPlot:function(name,_3cc){
var plot,_3cd=_3cc&&_3cc.type||"Default";
if(typeof _3cd=="string"){
if(!dc.plot2d||!dc.plot2d[_3cd]){
throw Error("Can't find plot: "+_3cd+" - didn't you forget to dojo"+".require() it?");
}
plot=new dc.plot2d[_3cd](this,_3cc);
}else{
plot=new _3cd(this,_3cc);
}
plot.name=name;
plot.dirty=true;
if(name in this.plots){
this.stack[this.plots[name]].destroy();
this.stack[this.plots[name]]=plot;
}else{
this.plots[name]=this.stack.length;
this.stack.push(plot);
}
this.dirty=true;
return this;
},removePlot:function(name){
if(name in this.plots){
var _3ce=this.plots[name];
delete this.plots[name];
this.stack[_3ce].destroy();
this.stack.splice(_3ce,1);
df.forIn(this.plots,function(idx,name,_3cf){
if(idx>_3ce){
_3cf[name]=idx-1;
}
});
var ns=dojo.filter(this.series,function(run){
return run.plot!=name;
});
if(ns.length<this.series.length){
dojo.forEach(this.series,function(run){
if(run.plot==name){
run.destroy();
}
});
this.runs={};
dojo.forEach(ns,function(run,_3d0){
this.runs[run.plot]=_3d0;
},this);
this.series=ns;
}
this.dirty=true;
}
return this;
},getPlotOrder:function(){
return df.map(this.stack,_3c7);
},setPlotOrder:function(_3d1){
var _3d2={},_3d3=df.filter(_3d1,function(name){
if(!(name in this.plots)||(name in _3d2)){
return false;
}
_3d2[name]=1;
return true;
},this);
if(_3d3.length<this.stack.length){
df.forEach(this.stack,function(plot){
var name=plot.name;
if(!(name in _3d2)){
_3d3.push(name);
}
});
}
var _3d4=df.map(_3d3,function(name){
return this.stack[this.plots[name]];
},this);
df.forEach(_3d4,function(plot,i){
this.plots[plot.name]=i;
},this);
this.stack=_3d4;
this.dirty=true;
return this;
},movePlotToFront:function(name){
if(name in this.plots){
var _3d5=this.plots[name];
if(_3d5){
var _3d6=this.getPlotOrder();
_3d6.splice(_3d5,1);
_3d6.unshift(name);
return this.setPlotOrder(_3d6);
}
}
return this;
},movePlotToBack:function(name){
if(name in this.plots){
var _3d7=this.plots[name];
if(_3d7<this.stack.length-1){
var _3d8=this.getPlotOrder();
_3d8.splice(_3d7,1);
_3d8.push(name);
return this.setPlotOrder(_3d8);
}
}
return this;
},addSeries:function(name,data,_3d9){
var run=new dc.Series(this,data,_3d9);
run.name=name;
if(name in this.runs){
this.series[this.runs[name]].destroy();
this.series[this.runs[name]]=run;
}else{
this.runs[name]=this.series.length;
this.series.push(run);
}
this.dirty=true;
if(!("ymin" in run)&&"min" in run){
run.ymin=run.min;
}
if(!("ymax" in run)&&"max" in run){
run.ymax=run.max;
}
return this;
},removeSeries:function(name){
if(name in this.runs){
var _3da=this.runs[name];
delete this.runs[name];
this.series[_3da].destroy();
this.series.splice(_3da,1);
df.forIn(this.runs,function(idx,name,runs){
if(idx>_3da){
runs[name]=idx-1;
}
});
this.dirty=true;
}
return this;
},updateSeries:function(name,data){
if(name in this.runs){
var run=this.series[this.runs[name]];
run.update(data);
this._invalidateDependentPlots(run.plot,false);
this._invalidateDependentPlots(run.plot,true);
}
return this;
},getSeriesOrder:function(_3db){
return df.map(df.filter(this.series,function(run){
return run.plot==_3db;
}),_3c7);
},setSeriesOrder:function(_3dc){
var _3dd,_3de={},_3df=df.filter(_3dc,function(name){
if(!(name in this.runs)||(name in _3de)){
return false;
}
var run=this.series[this.runs[name]];
if(_3dd){
if(run.plot!=_3dd){
return false;
}
}else{
_3dd=run.plot;
}
_3de[name]=1;
return true;
},this);
df.forEach(this.series,function(run){
var name=run.name;
if(!(name in _3de)&&run.plot==_3dd){
_3df.push(name);
}
});
var _3e0=df.map(_3df,function(name){
return this.series[this.runs[name]];
},this);
this.series=_3e0.concat(df.filter(this.series,function(run){
return run.plot!=_3dd;
}));
df.forEach(this.series,function(run,i){
this.runs[run.name]=i;
},this);
this.dirty=true;
return this;
},moveSeriesToFront:function(name){
if(name in this.runs){
var _3e1=this.runs[name],_3e2=this.getSeriesOrder(this.series[_3e1].plot);
if(name!=_3e2[0]){
_3e2.splice(_3e1,1);
_3e2.unshift(name);
return this.setSeriesOrder(_3e2);
}
}
return this;
},moveSeriesToBack:function(name){
if(name in this.runs){
var _3e3=this.runs[name],_3e4=this.getSeriesOrder(this.series[_3e3].plot);
if(name!=_3e4[_3e4.length-1]){
_3e4.splice(_3e3,1);
_3e4.push(name);
return this.setSeriesOrder(_3e4);
}
}
return this;
},resize:function(_3e5,_3e6){
var box;
switch(arguments.length){
case 1:
box=dojo.mixin({},_3e5);
dojo.marginBox(this.node,box);
break;
case 2:
box={w:_3e5,h:_3e6};
dojo.marginBox(this.node,box);
break;
}
box=dojo.marginBox(this.node);
this.surface.setDimensions(box.w,box.h);
this.dirty=true;
this.coords=null;
return this.render();
},getGeometry:function(){
var ret={};
df.forIn(this.axes,function(axis){
if(axis.initialized()){
ret[axis.name]={name:axis.name,vertical:axis.vertical,scaler:axis.scaler,ticks:axis.ticks};
}
});
return ret;
},setAxisWindow:function(name,_3e7,_3e8,zoom){
var axis=this.axes[name];
if(axis){
axis.setWindow(_3e7,_3e8);
dojo.forEach(this.stack,function(plot){
if(plot.hAxis==name||plot.vAxis==name){
plot.zoom=zoom;
}
});
}
return this;
},setWindow:function(sx,sy,dx,dy,zoom){
if(!("plotArea" in this)){
this.calculateGeometry();
}
df.forIn(this.axes,function(axis){
var _3e9,_3ea,_3eb=axis.getScaler().bounds,s=_3eb.span/(_3eb.upper-_3eb.lower);
if(axis.vertical){
_3e9=sy;
_3ea=dy/s/_3e9;
}else{
_3e9=sx;
_3ea=dx/s/_3e9;
}
axis.setWindow(_3e9,_3ea);
});
dojo.forEach(this.stack,function(plot){
plot.zoom=zoom;
});
return this;
},zoomIn:function(name,_3ec){
var axis=this.axes[name];
if(axis){
var _3ed,_3ee,_3ef=axis.getScaler().bounds;
var _3f0=Math.min(_3ec[0],_3ec[1]);
var _3f1=Math.max(_3ec[0],_3ec[1]);
_3f0=_3ec[0]<_3ef.lower?_3ef.lower:_3f0;
_3f1=_3ec[1]>_3ef.upper?_3ef.upper:_3f1;
_3ed=(_3ef.upper-_3ef.lower)/(_3f1-_3f0);
_3ee=_3f0-_3ef.lower;
this.setAxisWindow(name,_3ed,_3ee);
this.render();
}
},calculateGeometry:function(){
if(this.dirty){
return this.fullGeometry();
}
var _3f2=dojo.filter(this.stack,function(plot){
return plot.dirty||(plot.hAxis&&this.axes[plot.hAxis].dirty)||(plot.vAxis&&this.axes[plot.vAxis].dirty);
},this);
_3f3(_3f2,this.plotArea);
return this;
},fullGeometry:function(){
this._makeDirty();
dojo.forEach(this.stack,_3c2);
if(!this.theme){
this.setTheme(new dojox.charting.Theme(dojox.charting._def));
}
dojo.forEach(this.series,function(run){
if(!(run.plot in this.plots)){
if(!dc.plot2d||!dc.plot2d.Default){
throw Error("Can't find plot: Default - didn't you forget to dojo"+".require() it?");
}
var plot=new dc.plot2d.Default(this,{});
plot.name=run.plot;
this.plots[run.plot]=this.stack.length;
this.stack.push(plot);
}
this.stack[this.plots[run.plot]].addSeries(run);
},this);
dojo.forEach(this.stack,function(plot){
if(plot.hAxis){
plot.setAxis(this.axes[plot.hAxis]);
}
if(plot.vAxis){
plot.setAxis(this.axes[plot.vAxis]);
}
},this);
var dim=this.dim=this.surface.getDimensions();
dim.width=g.normalizedLength(dim.width);
dim.height=g.normalizedLength(dim.height);
df.forIn(this.axes,_3c2);
_3f3(this.stack,dim);
var _3f4=this.offsets={l:0,r:0,t:0,b:0};
df.forIn(this.axes,function(axis){
df.forIn(axis.getOffsets(),function(o,i){
_3f4[i]+=o;
});
});
if(this.title){
this.titleGap=(this.titleGap==0)?0:this.titleGap||this.theme.chart.titleGap||20;
this.titlePos=this.titlePos||this.theme.chart.titlePos||"top";
this.titleFont=this.titleFont||this.theme.chart.titleFont;
this.titleFontColor=this.titleFontColor||this.theme.chart.titleFontColor||"black";
var _3f5=g.normalizedLength(g.splitFontString(this.titleFont).size);
_3f4[this.titlePos=="top"?"t":"b"]+=(_3f5+this.titleGap);
}
df.forIn(this.margins,function(o,i){
_3f4[i]+=o;
});
this.plotArea={width:dim.width-_3f4.l-_3f4.r,height:dim.height-_3f4.t-_3f4.b};
df.forIn(this.axes,_3c2);
_3f3(this.stack,this.plotArea);
return this;
},render:function(){
if(this.theme){
this.theme.clear();
}
if(this.dirty){
return this.fullRender();
}
this.calculateGeometry();
df.forEachRev(this.stack,function(plot){
plot.render(this.dim,this.offsets);
},this);
df.forIn(this.axes,function(axis){
axis.render(this.dim,this.offsets);
},this);
this._makeClean();
if(this.surface.render){
this.surface.render();
}
return this;
},fullRender:function(){
this.fullGeometry();
var _3f6=this.offsets,dim=this.dim,rect;
dojo.forEach(this.series,_3c3);
df.forIn(this.axes,_3c3);
dojo.forEach(this.stack,_3c3);
if(this.chartTitle&&this.chartTitle.tagName){
dojo.destroy(this.chartTitle);
}
this.surface.clear();
this.chartTitle=null;
var t=this.theme,fill=t.plotarea&&t.plotarea.fill,_3f7=t.plotarea&&t.plotarea.stroke,rect={x:_3f6.l-1,y:_3f6.t-1,width:dim.width-_3f6.l-_3f6.r+2,height:dim.height-_3f6.t-_3f6.b+2};
if(fill){
fill=dc.Element.prototype._shapeFill(dc.Element.prototype._plotFill(fill,dim,_3f6),rect);
this.surface.createRect(rect).setFill(fill);
}
if(_3f7){
this.surface.createRect({x:_3f6.l,y:_3f6.t,width:dim.width-_3f6.l-_3f6.r+1,height:dim.height-_3f6.t-_3f6.b+1}).setStroke(_3f7);
}
df.foldr(this.stack,function(z,plot){
return plot.render(dim,_3f6),0;
},0);
fill=this.fill!==undefined?this.fill:(t.chart&&t.chart.fill);
_3f7=this.stroke!==undefined?this.stroke:(t.chart&&t.chart.stroke);
if(fill=="inherit"){
var node=this.node,fill=new dojo.Color(dojo.style(node,"backgroundColor"));
while(fill.a==0&&node!=document.documentElement){
fill=new dojo.Color(dojo.style(node,"backgroundColor"));
node=node.parentNode;
}
}
if(fill){
fill=dc.Element.prototype._plotFill(fill,dim,_3f6);
if(_3f6.l){
rect={width:_3f6.l,height:dim.height+1};
this.surface.createRect(rect).setFill(dc.Element.prototype._shapeFill(fill,rect));
}
if(_3f6.r){
rect={x:dim.width-_3f6.r,width:_3f6.r+1,height:dim.height+2};
this.surface.createRect(rect).setFill(dc.Element.prototype._shapeFill(fill,rect));
}
if(_3f6.t){
rect={width:dim.width+1,height:_3f6.t};
this.surface.createRect(rect).setFill(dc.Element.prototype._shapeFill(fill,rect));
}
if(_3f6.b){
rect={y:dim.height-_3f6.b,width:dim.width+1,height:_3f6.b+2};
this.surface.createRect(rect).setFill(dc.Element.prototype._shapeFill(fill,rect));
}
}
if(_3f7){
this.surface.createRect({width:dim.width-1,height:dim.height-1}).setStroke(_3f7);
}
if(this.title){
var _3f8=(g.renderer=="canvas"),_3f9=_3f8||!dojo.isIE&&!dojo.isOpera?"html":"gfx",_3fa=g.normalizedLength(g.splitFontString(this.titleFont).size);
this.chartTitle=dc.axis2d.common.createText[_3f9](this,this.surface,dim.width/2,this.titlePos=="top"?_3fa+this.margins.t:dim.height-this.margins.b,"middle",this.title,this.titleFont,this.titleFontColor);
}
df.forIn(this.axes,function(axis){
axis.render(dim,_3f6);
});
this._makeClean();
if(this.surface.render){
this.surface.render();
}
return this;
},delayedRender:function(){
if(!this._delayedRenderHandle){
this._delayedRenderHandle=setTimeout(dojo.hitch(this,function(){
clearTimeout(this._delayedRenderHandle);
this._delayedRenderHandle=null;
this.render();
}),this.delayInMs);
}
return this;
},connectToPlot:function(name,_3fb,_3fc){
return name in this.plots?this.stack[this.plots[name]].connect(_3fb,_3fc):null;
},fireEvent:function(_3fd,_3fe,_3ff){
if(_3fd in this.runs){
var _400=this.series[this.runs[_3fd]].plot;
if(_400 in this.plots){
var plot=this.stack[this.plots[_400]];
if(plot){
plot.fireEvent(_3fd,_3fe,_3ff);
}
}
}
return this;
},_makeClean:function(){
dojo.forEach(this.axes,_3c5);
dojo.forEach(this.stack,_3c5);
dojo.forEach(this.series,_3c5);
this.dirty=false;
},_makeDirty:function(){
dojo.forEach(this.axes,_3c6);
dojo.forEach(this.stack,_3c6);
dojo.forEach(this.series,_3c6);
this.dirty=true;
},_invalidateDependentPlots:function(_401,_402){
if(_401 in this.plots){
var plot=this.stack[this.plots[_401]],axis,_403=_402?"vAxis":"hAxis";
if(plot[_403]){
axis=this.axes[plot[_403]];
if(axis&&axis.dependOnData()){
axis.dirty=true;
dojo.forEach(this.stack,function(p){
if(p[_403]&&p[_403]==plot[_403]){
p.dirty=true;
}
});
}
}else{
plot.dirty=true;
}
}
}});
function _404(_405){
return {min:_405.hmin,max:_405.hmax};
};
function _406(_407){
return {min:_407.vmin,max:_407.vmax};
};
function _408(_409,h){
_409.hmin=h.min;
_409.hmax=h.max;
};
function _40a(_40b,v){
_40b.vmin=v.min;
_40b.vmax=v.max;
};
function _40c(_40d,_40e){
if(_40d&&_40e){
_40d.min=Math.min(_40d.min,_40e.min);
_40d.max=Math.max(_40d.max,_40e.max);
}
return _40d||_40e;
};
function _3f3(_40f,_410){
var _411={},axes={};
dojo.forEach(_40f,function(plot){
var _412=_411[plot.name]=plot.getSeriesStats();
if(plot.hAxis){
axes[plot.hAxis]=_40c(axes[plot.hAxis],_404(_412));
}
if(plot.vAxis){
axes[plot.vAxis]=_40c(axes[plot.vAxis],_406(_412));
}
});
dojo.forEach(_40f,function(plot){
var _413=_411[plot.name];
if(plot.hAxis){
_408(_413,axes[plot.hAxis]);
}
if(plot.vAxis){
_40a(_413,axes[plot.vAxis]);
}
plot.initializeScalers(_410,_413);
});
};
})();
}
if(!dojo._hasResource["dojox.charting.Chart2D"]){
dojo._hasResource["dojox.charting.Chart2D"]=true;
dojo.provide("dojox.charting.Chart2D");
dojo.deprecated("dojox.charting.Chart2D","Use dojo.charting.Chart instead and require all other components explicitly","2.0");
dojox.charting.Chart2D=dojox.charting.Chart;
}
if(!dojo._hasResource["dojox.charting.widget.Legend"]){
dojo._hasResource["dojox.charting.widget.Legend"]=true;
dojo.provide("dojox.charting.widget.Legend");
dojo.declare("dojox.charting.widget.Legend",[dijit._Widget,dijit._Templated],{chartRef:"",horizontal:true,swatchSize:18,templateString:"<table dojoAttachPoint='legendNode' class='dojoxLegendNode' role='group' aria-label='chart legend'><tbody dojoAttachPoint='legendBody'></tbody></table>",legendNode:null,legendBody:null,postCreate:function(){
if(!this.chart){
if(!this.chartRef){
return;
}
this.chart=dijit.byId(this.chartRef);
if(!this.chart){
var node=dojo.byId(this.chartRef);
if(node){
this.chart=dijit.byNode(node);
}else{
return;
}
}
this.series=this.chart.chart.series;
}else{
this.series=this.chart.series;
}
this.refresh();
},refresh:function(){
var df=dojox.lang.functional;
if(this._surfaces){
dojo.forEach(this._surfaces,function(_414){
_414.destroy();
});
}
this._surfaces=[];
while(this.legendBody.lastChild){
dojo.destroy(this.legendBody.lastChild);
}
if(this.horizontal){
dojo.addClass(this.legendNode,"dojoxLegendHorizontal");
this._tr=dojo.create("tr",null,this.legendBody);
this._inrow=0;
}
var s=this.series;
if(s.length==0){
return;
}
if(s[0].chart.stack[0].declaredClass=="dojox.charting.plot2d.Pie"){
var t=s[0].chart.stack[0];
if(typeof t.run.data[0]=="number"){
var _415=df.map(t.run.data,"Math.max(x, 0)");
if(df.every(_415,"<= 0")){
return;
}
var _416=df.map(_415,"/this",df.foldl(_415,"+",0));
dojo.forEach(_416,function(x,i){
this._addLabel(t.dyn[i],t._getLabel(x*100)+"%");
},this);
}else{
dojo.forEach(t.run.data,function(x,i){
this._addLabel(t.dyn[i],x.legend||x.text||x.y);
},this);
}
}else{
dojo.forEach(s,function(x){
this._addLabel(x.dyn,x.legend||x.name);
},this);
}
},_addLabel:function(dyn,_417){
var _418=dojo.create("td"),icon=dojo.create("div",null,_418),text=dojo.create("label",null,_418),div=dojo.create("div",{style:{"width":this.swatchSize+"px","height":this.swatchSize+"px","float":"left"}},icon);
dojo.addClass(icon,"dojoxLegendIcon dijitInline");
dojo.addClass(text,"dojoxLegendText");
if(this._tr){
this._tr.appendChild(_418);
if(++this._inrow===this.horizontal){
this._tr=dojo.create("tr",null,this.legendBody);
this._inrow=0;
}
}else{
var tr=dojo.create("tr",null,this.legendBody);
tr.appendChild(_418);
}
this._makeIcon(div,dyn);
text.innerHTML=String(_417);
},_makeIcon:function(div,dyn){
var mb={h:this.swatchSize,w:this.swatchSize};
var _419=dojox.gfx.createSurface(div,mb.w,mb.h);
this._surfaces.push(_419);
if(dyn.fill){
_419.createRect({x:2,y:2,width:mb.w-4,height:mb.h-4}).setFill(dyn.fill).setStroke(dyn.stroke);
}else{
if(dyn.stroke||dyn.marker){
var line={x1:0,y1:mb.h/2,x2:mb.w,y2:mb.h/2};
if(dyn.stroke){
_419.createLine(line).setStroke(dyn.stroke);
}
if(dyn.marker){
var c={x:mb.w/2,y:mb.h/2};
if(dyn.stroke){
_419.createPath({path:"M"+c.x+" "+c.y+" "+dyn.marker}).setFill(dyn.stroke.color).setStroke(dyn.stroke);
}else{
_419.createPath({path:"M"+c.x+" "+c.y+" "+dyn.marker}).setFill(dyn.color).setStroke(dyn.color);
}
}
}else{
_419.createRect({x:2,y:2,width:mb.w-4,height:mb.h-4}).setStroke("black");
_419.createLine({x1:2,y1:2,x2:mb.w-2,y2:mb.h-2}).setStroke("black");
_419.createLine({x1:2,y1:mb.h-2,x2:mb.w-2,y2:2}).setStroke("black");
}
}
}});
}
if(!dojo._hasResource["dojox.charting.action2d.Base"]){
dojo._hasResource["dojox.charting.action2d.Base"]=true;
dojo.provide("dojox.charting.action2d.Base");
(function(){
var _41a=400,_41b=dojo.fx.easing.backOut,df=dojox.lang.functional;
dojo.declare("dojox.charting.action2d.Base",null,{overOutEvents:{onmouseover:1,onmouseout:1},constructor:function(_41c,plot,_41d){
this.chart=_41c;
this.plot=plot||"default";
this.anim={};
if(!_41d){
_41d={};
}
this.duration=_41d.duration?_41d.duration:_41a;
this.easing=_41d.easing?_41d.easing:_41b;
},connect:function(){
this.handle=this.chart.connectToPlot(this.plot,this,"process");
},disconnect:function(){
if(this.handle){
dojo.disconnect(this.handle);
this.handle=null;
}
},reset:function(){
},destroy:function(){
this.disconnect();
df.forIn(this.anim,function(o){
df.forIn(o,function(anim){
anim.action.stop(true);
});
});
this.anim={};
}});
})();
}
if(!dojo._hasResource["dojox.charting.action2d.Highlight"]){
dojo._hasResource["dojox.charting.action2d.Highlight"]=true;
dojo.provide("dojox.charting.action2d.Highlight");
(function(){
var _41e=100,_41f=75,_420=50,c=dojox.color,cc=function(_421){
return function(){
return _421;
};
},hl=function(_422){
var a=new c.Color(_422),x=a.toHsl();
if(x.s==0){
x.l=x.l<50?100:0;
}else{
x.s=_41e;
if(x.l<_420){
x.l=_41f;
}else{
if(x.l>_41f){
x.l=_420;
}else{
x.l=x.l-_420>_41f-x.l?_420:_41f;
}
}
}
return c.fromHsl(x);
};
dojo.declare("dojox.charting.action2d.Highlight",dojox.charting.action2d.Base,{defaultParams:{duration:400,easing:dojo.fx.easing.backOut},optionalParams:{highlight:"red"},constructor:function(_423,plot,_424){
var a=_424&&_424.highlight;
this.colorFun=a?(dojo.isFunction(a)?a:cc(a)):hl;
this.connect();
},process:function(o){
if(!o.shape||!(o.type in this.overOutEvents)){
return;
}
var _425=o.run.name,_426=o.index,anim,_427,_428;
if(_425 in this.anim){
anim=this.anim[_425][_426];
}else{
this.anim[_425]={};
}
if(anim){
anim.action.stop(true);
}else{
var _429=o.shape.getFill();
if(!_429||!(_429 instanceof dojo.Color)){
return;
}
this.anim[_425][_426]=anim={start:_429,end:this.colorFun(_429)};
}
var _42a=anim.start,end=anim.end;
if(o.type=="onmouseout"){
var t=_42a;
_42a=end;
end=t;
}
anim.action=dojox.gfx.fx.animateFill({shape:o.shape,duration:this.duration,easing:this.easing,color:{start:_42a,end:end}});
if(o.type=="onmouseout"){
dojo.connect(anim.action,"onEnd",this,function(){
if(this.anim[_425]){
delete this.anim[_425][_426];
}
});
}
anim.action.play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.action2d.Magnify"]){
dojo._hasResource["dojox.charting.action2d.Magnify"]=true;
dojo.provide("dojox.charting.action2d.Magnify");
(function(){
var _42b=2,m=dojox.gfx.matrix,gf=dojox.gfx.fx;
dojo.declare("dojox.charting.action2d.Magnify",dojox.charting.action2d.Base,{defaultParams:{duration:400,easing:dojo.fx.easing.backOut,scale:_42b},optionalParams:{},constructor:function(_42c,plot,_42d){
this.scale=_42d&&typeof _42d.scale=="number"?_42d.scale:_42b;
this.connect();
},process:function(o){
if(!o.shape||!(o.type in this.overOutEvents)||!("cx" in o)||!("cy" in o)){
return;
}
var _42e=o.run.name,_42f=o.index,_430=[],anim,init,_431;
if(_42e in this.anim){
anim=this.anim[_42e][_42f];
}else{
this.anim[_42e]={};
}
if(anim){
anim.action.stop(true);
}else{
this.anim[_42e][_42f]=anim={};
}
if(o.type=="onmouseover"){
init=m.identity;
_431=this.scale;
}else{
init=m.scaleAt(this.scale,o.cx,o.cy);
_431=1/this.scale;
}
var _432={shape:o.shape,duration:this.duration,easing:this.easing,transform:[{name:"scaleAt",start:[1,o.cx,o.cy],end:[_431,o.cx,o.cy]},init]};
if(o.shape){
_430.push(gf.animateTransform(_432));
}
if(o.oultine){
_432.shape=o.outline;
_430.push(gf.animateTransform(_432));
}
if(o.shadow){
_432.shape=o.shadow;
_430.push(gf.animateTransform(_432));
}
if(!_430.length){
delete this.anim[_42e][_42f];
return;
}
anim.action=dojo.fx.combine(_430);
if(o.type=="onmouseout"){
dojo.connect(anim.action,"onEnd",this,function(){
if(this.anim[_42e]){
delete this.anim[_42e][_42f];
}
});
}
anim.action.play();
}});
})();
}
if(!dojo._hasResource["dojox.lang.functional.scan"]){
dojo._hasResource["dojox.lang.functional.scan"]=true;
dojo.provide("dojox.lang.functional.scan");
(function(){
var d=dojo,df=dojox.lang.functional,_433={};
d.mixin(df,{scanl:function(a,f,z,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var t,n,i;
if(d.isArray(a)){
t=new Array((n=a.length)+1);
t[0]=z;
for(i=0;i<n;z=f.call(o,z,a[i],i,a),t[++i]=z){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
t=[z];
for(i=0;a.hasNext();t.push(z=f.call(o,z,a.next(),i++,a))){
}
}else{
t=[z];
for(i in a){
if(!(i in _433)){
t.push(z=f.call(o,z,a[i],i,a));
}
}
}
}
return t;
},scanl1:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var t,n,z,_434=true;
if(d.isArray(a)){
t=new Array(n=a.length);
t[0]=z=a[0];
for(var i=1;i<n;t[i]=z=f.call(o,z,a[i],i,a),++i){
}
}else{
if(typeof a.hasNext=="function"&&typeof a.next=="function"){
if(a.hasNext()){
t=[z=a.next()];
for(var i=1;a.hasNext();t.push(z=f.call(o,z,a.next(),i++,a))){
}
}
}else{
for(var i in a){
if(!(i in _433)){
if(_434){
t=[z=a[i]];
_434=false;
}else{
t.push(z=f.call(o,z,a[i],i,a));
}
}
}
}
}
return t;
},scanr:function(a,f,z,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var n=a.length,t=new Array(n+1),i=n;
t[n]=z;
for(;i>0;--i,z=f.call(o,z,a[i],i,a),t[i]=z){
}
return t;
},scanr1:function(a,f,o){
if(typeof a=="string"){
a=a.split("");
}
o=o||d.global;
f=df.lambda(f);
var n=a.length,t=new Array(n),z=a[n-1],i=n-1;
t[i]=z;
for(;i>0;--i,z=f.call(o,z,a[i],i,a),t[i]=z){
}
return t;
}});
})();
}
if(!dojo._hasResource["dojox.charting.action2d.MoveSlice"]){
dojo._hasResource["dojox.charting.action2d.MoveSlice"]=true;
dojo.provide("dojox.charting.action2d.MoveSlice");
(function(){
var _435=1.05,_436=7,m=dojox.gfx.matrix,gf=dojox.gfx.fx,df=dojox.lang.functional;
dojo.declare("dojox.charting.action2d.MoveSlice",dojox.charting.action2d.Base,{defaultParams:{duration:400,easing:dojo.fx.easing.backOut,scale:_435,shift:_436},optionalParams:{},constructor:function(_437,plot,_438){
if(!_438){
_438={};
}
this.scale=typeof _438.scale=="number"?_438.scale:_435;
this.shift=typeof _438.shift=="number"?_438.shift:_436;
this.connect();
},process:function(o){
if(!o.shape||o.element!="slice"||!(o.type in this.overOutEvents)){
return;
}
if(!this.angles){
var _439=m._degToRad(o.plot.opt.startAngle);
if(typeof o.run.data[0]=="number"){
this.angles=df.map(df.scanl(o.run.data,"+",_439),"* 2 * Math.PI / this",df.foldl(o.run.data,"+",0));
}else{
this.angles=df.map(df.scanl(o.run.data,"a + b.y",_439),"* 2 * Math.PI / this",df.foldl(o.run.data,"a + b.y",0));
}
}
var _43a=o.index,anim,_43b,_43c,_43d,_43e,_43f=(this.angles[_43a]+this.angles[_43a+1])/2,_440=m.rotateAt(-_43f,o.cx,o.cy),_441=m.rotateAt(_43f,o.cx,o.cy);
anim=this.anim[_43a];
if(anim){
anim.action.stop(true);
}else{
this.anim[_43a]=anim={};
}
if(o.type=="onmouseover"){
_43d=0;
_43e=this.shift;
_43b=1;
_43c=this.scale;
}else{
_43d=this.shift;
_43e=0;
_43b=this.scale;
_43c=1;
}
anim.action=dojox.gfx.fx.animateTransform({shape:o.shape,duration:this.duration,easing:this.easing,transform:[_441,{name:"translate",start:[_43d,0],end:[_43e,0]},{name:"scaleAt",start:[_43b,o.cx,o.cy],end:[_43c,o.cx,o.cy]},_440]});
if(o.type=="onmouseout"){
dojo.connect(anim.action,"onEnd",this,function(){
delete this.anim[_43a];
});
}
anim.action.play();
},reset:function(){
delete this.angles;
}});
})();
}
if(!dojo._hasResource["dojox.charting.action2d.Shake"]){
dojo._hasResource["dojox.charting.action2d.Shake"]=true;
dojo.provide("dojox.charting.action2d.Shake");
(function(){
var _442=3,m=dojox.gfx.matrix,gf=dojox.gfx.fx;
dojo.declare("dojox.charting.action2d.Shake",dojox.charting.action2d.Base,{defaultParams:{duration:400,easing:dojo.fx.easing.backOut,shiftX:_442,shiftY:_442},optionalParams:{},constructor:function(_443,plot,_444){
if(!_444){
_444={};
}
this.shiftX=typeof _444.shiftX=="number"?_444.shiftX:_442;
this.shiftY=typeof _444.shiftY=="number"?_444.shiftY:_442;
this.connect();
},process:function(o){
if(!o.shape||!(o.type in this.overOutEvents)){
return;
}
var _445=o.run.name,_446=o.index,_447=[],anim,_448=o.type=="onmouseover"?this.shiftX:-this.shiftX,_449=o.type=="onmouseover"?this.shiftY:-this.shiftY;
if(_445 in this.anim){
anim=this.anim[_445][_446];
}else{
this.anim[_445]={};
}
if(anim){
anim.action.stop(true);
}else{
this.anim[_445][_446]=anim={};
}
var _44a={shape:o.shape,duration:this.duration,easing:this.easing,transform:[{name:"translate",start:[this.shiftX,this.shiftY],end:[0,0]},m.identity]};
if(o.shape){
_447.push(gf.animateTransform(_44a));
}
if(o.oultine){
_44a.shape=o.outline;
_447.push(gf.animateTransform(_44a));
}
if(o.shadow){
_44a.shape=o.shadow;
_447.push(gf.animateTransform(_44a));
}
if(!_447.length){
delete this.anim[_445][_446];
return;
}
anim.action=dojo.fx.combine(_447);
if(o.type=="onmouseout"){
dojo.connect(anim.action,"onEnd",this,function(){
if(this.anim[_445]){
delete this.anim[_445][_446];
}
});
}
anim.action.play();
}});
})();
}
if(!dojo._hasResource["dojox.charting.action2d.Tooltip"]){
dojo._hasResource["dojox.charting.action2d.Tooltip"]=true;
dojo.provide("dojox.charting.action2d.Tooltip");
(function(){
var _44b=function(o){
var t=o.run&&o.run.data&&o.run.data[o.index];
if(t&&typeof t!="number"&&(t.tooltip||t.text)){
return t.tooltip||t.text;
}
if(o.element=="candlestick"){
return "<table cellpadding=\"1\" cellspacing=\"0\" border=\"0\" style=\"font-size:0.9em;\">"+"<tr><td>Open:</td><td align=\"right\"><strong>"+o.data.open+"</strong></td></tr>"+"<tr><td>High:</td><td align=\"right\"><strong>"+o.data.high+"</strong></td></tr>"+"<tr><td>Low:</td><td align=\"right\"><strong>"+o.data.low+"</strong></td></tr>"+"<tr><td>Close:</td><td align=\"right\"><strong>"+o.data.close+"</strong></td></tr>"+(o.data.mid!==undefined?"<tr><td>Mid:</td><td align=\"right\"><strong>"+o.data.mid+"</strong></td></tr>":"")+"</table>";
}
return o.element=="bar"?o.x:o.y;
};
var df=dojox.lang.functional,m=dojox.gfx.matrix,pi4=Math.PI/4,pi2=Math.PI/2;
dojo.declare("dojox.charting.action2d.Tooltip",dojox.charting.action2d.Base,{defaultParams:{text:_44b},optionalParams:{},constructor:function(_44c,plot,_44d){
this.text=_44d&&_44d.text?_44d.text:_44b;
this.connect();
},process:function(o){
if(o.type==="onplotreset"||o.type==="onmouseout"){
dijit.hideTooltip(this.aroundRect);
this.aroundRect=null;
if(o.type==="onplotreset"){
delete this.angles;
}
return;
}
if(!o.shape||o.type!=="onmouseover"){
return;
}
var _44e={type:"rect"},_44f=["after","before"];
switch(o.element){
case "marker":
_44e.x=o.cx;
_44e.y=o.cy;
_44e.width=_44e.height=1;
break;
case "circle":
_44e.x=o.cx-o.cr;
_44e.y=o.cy-o.cr;
_44e.width=_44e.height=2*o.cr;
break;
case "column":
_44f=["above","below"];
case "bar":
_44e=dojo.clone(o.shape.getShape());
break;
case "candlestick":
_44e.x=o.x;
_44e.y=o.y;
_44e.width=o.width;
_44e.height=o.height;
break;
default:
if(!this.angles){
if(typeof o.run.data[0]=="number"){
this.angles=df.map(df.scanl(o.run.data,"+",0),"* 2 * Math.PI / this",df.foldl(o.run.data,"+",0));
}else{
this.angles=df.map(df.scanl(o.run.data,"a + b.y",0),"* 2 * Math.PI / this",df.foldl(o.run.data,"a + b.y",0));
}
}
var _450=m._degToRad(o.plot.opt.startAngle),_451=(this.angles[o.index]+this.angles[o.index+1])/2+_450;
_44e.x=o.cx+o.cr*Math.cos(_451);
_44e.y=o.cy+o.cr*Math.sin(_451);
_44e.width=_44e.height=1;
if(_451<pi4){
}else{
if(_451<pi2+pi4){
_44f=["below","above"];
}else{
if(_451<Math.PI+pi4){
_44f=["before","after"];
}else{
if(_451<2*Math.PI-pi4){
_44f=["above","below"];
}
}
}
}
break;
}
var lt=dojo.coords(this.chart.node,true);
_44e.x+=lt.x;
_44e.y+=lt.y;
_44e.x=Math.round(_44e.x);
_44e.y=Math.round(_44e.y);
_44e.width=Math.ceil(_44e.width);
_44e.height=Math.ceil(_44e.height);
this.aroundRect=_44e;
var _452=this.text(o);
if(_452){
dijit.showTooltip(_452,this.aroundRect,_44f);
}
}});
})();
}
if(!dojo._hasResource["dijit._Container"]){
dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_453,_454){
var _455=this.containerNode;
if(_454&&typeof _454=="number"){
var _456=this.getChildren();
if(_456&&_456.length>=_454){
_455=_456[_454-1].domNode;
_454="after";
}
}
dojo.place(_453.domNode,_455,_454);
if(this._started&&!_453._started){
_453.startup();
}
},removeChild:function(_457){
if(typeof _457=="number"){
_457=this.getChildren()[_457];
}
if(_457){
var node=_457.domNode;
if(node&&node.parentNode){
node.parentNode.removeChild(node);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},destroyDescendants:function(_458){
dojo.forEach(this.getChildren(),function(_459){
_459.destroyRecursive(_458);
});
},_getSiblingOfChild:function(_45a,dir){
var node=_45a.domNode,_45b=(dir>0?"nextSibling":"previousSibling");
do{
node=node[_45b];
}while(node&&(node.nodeType!=1||!dijit.byNode(node)));
return node&&dijit.byNode(node);
},getIndexOfChild:function(_45c){
return dojo.indexOf(this.getChildren(),_45c);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_45d){
_45d.startup();
});
this.inherited(arguments);
}});
}
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
var _45e=this.dropDown,_45f=false;
if(e&&this._opened){
var c=dojo.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_45f){
if(dojo.hasClass(t,"dijitPopup")){
_45f=true;
}else{
t=t.parentNode;
}
}
if(_45f){
t=e.target;
if(_45e.onItemClick){
var _460;
while(t&&!(_460=dijit.byNode(t))){
t=t.parentNode;
}
if(_460&&_460.onClick&&_460.getParent){
_460.getParent().onItemClick(_460,e);
}
}
return;
}
}
}
if(this._opened&&_45e.focus&&_45e.autoFocus!==false){
window.setTimeout(dojo.hitch(_45e,"focus"),1);
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
dojo.stopEvent(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _461={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+_461+"ArrowButton");
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
var d=this.dropDown,_462=e.target;
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
if(!this._opened&&(e.charOrCode==dojo.keys.DOWN_ARROW||((e.charOrCode==dojo.keys.ENTER||e.charOrCode==" ")&&((_462.tagName||"").toLowerCase()!=="input"||(_462.type&&_462.type.toLowerCase()!=="text"))))){
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
var _463=dijit._curFocus&&this.dropDown&&dojo.isDescendant(dijit._curFocus,this.dropDown.domNode);
this.closeDropDown(_463);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_464){
_464();
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
var _465=this.dropDown,_466=_465.domNode,_467=this._aroundNode||this.domNode,self=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_466.style.width){
this._explicitDDWidth=true;
}
if(_466.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _468={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_468.width="";
}
if(!this._explicitDDHeight){
_468.height="";
}
dojo.style(_466,_468);
var _469=this.maxHeight;
if(_469==-1){
var _46a=dojo.window.getBox(),_46b=dojo.position(_467,false);
_469=Math.floor(Math.max(_46b.y,_46a.h-(_46b.y+_46b.h)));
}
if(_465.startup&&!_465._started){
_465.startup();
}
dijit.popup.moveOffScreen(_465);
var mb=dojo._getMarginSize(_466);
var _46c=(_469&&mb.h>_469);
dojo.style(_466,{overflowX:"hidden",overflowY:_46c?"auto":"hidden"});
if(_46c){
mb.h=_469;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_467.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_467.offsetWidth);
}else{
delete mb.w;
}
}
if(dojo.isFunction(_465.resize)){
_465.resize(mb);
}else{
dojo.marginBox(_466,mb);
}
}
var _46d=dijit.popup.open({parent:this,popup:_465,around:_467,orient:dijit.getPopupAroundAlignment((this.dropDownPosition&&this.dropDownPosition.length)?this.dropDownPosition:["below"],this.isLeftToRight()),onExecute:function(){
self.closeDropDown(true);
},onCancel:function(){
self.closeDropDown(true);
},onClose:function(){
dojo.attr(self._popupStateNode,"popupActive",false);
dojo.removeClass(self._popupStateNode,"dijitHasDropDownOpen");
self._opened=false;
}});
dojo.attr(this._popupStateNode,"popupActive","true");
dojo.addClass(self._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _46d;
},closeDropDown:function(_46e){
if(this._opened){
if(_46e){
this.focus();
}
dijit.popup.close(this.dropDown);
this._opened=false;
}
}});
}
if(!dojo._hasResource["dijit.form.Button"]){
dojo._hasResource["dijit.form.Button"]=true;
dojo.provide("dijit.form.Button");
dojo.declare("dijit.form.Button",dijit.form._FormWidget,{label:"",showLabel:true,iconClass:"",type:"button",baseClass:"dijitButton",templateString:dojo.cache("dijit.form","templates/Button.html","<span class=\"dijit dijitReset dijitInline\"\r\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\r\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\"\r\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\r\n\t\t\tdojoAttachPoint=\"titleNode,focusNode\"\r\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\r\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" dojoAttachPoint=\"iconNode\"></span\r\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\r\n\t\t\t\tid=\"${id}_label\"\r\n\t\t\t\tdojoAttachPoint=\"containerNode\"\r\n\t\t\t></span\r\n\t\t></span\r\n\t></span\r\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\r\n\t\tdojoAttachPoint=\"valueNode\"\r\n/></span>\r\n"),attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"valueNode"}),_onClick:function(e){
if(this.disabled){
return false;
}
this._clicked();
return this.onClick(e);
},_onButtonClick:function(e){
if(this._onClick(e)===false){
e.preventDefault();
}else{
if(this.type=="submit"&&!(this.valueNode||this.focusNode).form){
for(var node=this.domNode;node.parentNode;node=node.parentNode){
var _46f=dijit.byNode(node);
if(_46f&&typeof _46f._onSubmit=="function"){
_46f._onSubmit(e);
break;
}
}
}else{
if(this.valueNode){
this.valueNode.click();
e.preventDefault();
}
}
}
},buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.focusNode,false);
},_fillContent:function(_470){
if(_470&&(!this.params||!("label" in this.params))){
this.set("label",_470.innerHTML);
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
dojo.toggleClass(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},onClick:function(e){
return true;
},_clicked:function(e){
},setLabel:function(_471){
dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_471);
},_setLabelAttr:function(_472){
this._set("label",_472);
this.containerNode.innerHTML=_472;
if(this.showLabel==false&&!this.params.title){
this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},_setIconClassAttr:function(val){
var _473=this.iconClass||"dijitNoIcon",_474=val||"dijitNoIcon";
dojo.replaceClass(this.iconNode,_474,_473);
this._set("iconClass",val);
}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container,dijit._HasDropDown],{baseClass:"dijitDropDownButton",templateString:dojo.cache("dijit.form","templates/DropDownButton.html","<span class=\"dijit dijitReset dijitInline\"\r\n\t><span class='dijitReset dijitInline dijitButtonNode'\r\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\" dojoAttachPoint=\"_buttonNode\"\r\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\r\n\t\t\tdojoAttachPoint=\"focusNode,titleNode,_arrowWrapperNode\"\r\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\r\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\r\n\t\t\t\tdojoAttachPoint=\"iconNode\"\r\n\t\t\t></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\r\n\t\t\t\tdojoAttachPoint=\"containerNode,_popupStateNode\"\r\n\t\t\t\tid=\"${id}_label\"\r\n\t\t\t></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\r\n\t\t></span\r\n\t></span\r\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\r\n\t\tdojoAttachPoint=\"valueNode\"\r\n/></span>\r\n"),_fillContent:function(){
if(this.srcNodeRef){
var _475=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,_475[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _476=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(_476);
delete this.dropDownContainer;
}
if(this.dropDown){
dijit.popup.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _477=this.dropDown;
return (!!_477&&(!_477.href||_477.isLoaded));
},loadDropDown:function(){
var _478=this.dropDown;
if(!_478){
return;
}
if(!this.isLoaded()){
var _479=dojo.connect(_478,"onLoad",this,function(){
dojo.disconnect(_479);
this.openDropDown();
});
_478.refresh();
}else{
this.openDropDown();
}
},isFocusable:function(){
return this.inherited(arguments)&&!this._mouseDown;
}});
dojo.declare("dijit.form.ComboButton",dijit.form.DropDownButton,{templateString:dojo.cache("dijit.form","templates/ComboButton.html","<table class=\"dijit dijitReset dijitInline dijitLeft\"\r\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\r\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\r\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" dojoAttachPoint=\"buttonNode\" dojoAttachEvent=\"ondijitclick:_onButtonClick,onkeypress:_onButtonKeyPress\"\r\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\r\n\t\t\tdojoAttachPoint=\"titleNode\"\r\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\r\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" dojoAttachPoint=\"iconNode\" role=\"presentation\"></div\r\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" dojoAttachPoint=\"containerNode\" role=\"presentation\"></div\r\n\t\t></div\r\n\t\t></td\r\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\r\n\t\t\tdojoAttachPoint=\"_popupStateNode,focusNode,_buttonNode\"\r\n\t\t\tdojoAttachEvent=\"onkeypress:_onArrowKeyPress\"\r\n\t\t\ttitle=\"${optionsTitle}\"\r\n\t\t\trole=\"button\" aria-haspopup=\"true\"\r\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\r\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\r\n\t\t></td\r\n\t\t><td style=\"display:none !important;\"\r\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" dojoAttachPoint=\"valueNode\"\r\n\t\t/></td></tr></tbody\r\n></table>\r\n"),attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{id:"",tabIndex:["focusNode","titleNode"],title:"titleNode"}),optionsTitle:"",baseClass:"dijitComboButton",cssStateNodes:{"buttonNode":"dijitButtonNode","titleNode":"dijitButtonContents","_popupStateNode":"dijitDownArrowButton"},_focusedNode:null,_onButtonKeyPress:function(evt){
if(evt.charOrCode==dojo.keys[this.isLeftToRight()?"RIGHT_ARROW":"LEFT_ARROW"]){
dijit.focus(this._popupStateNode);
dojo.stopEvent(evt);
}
},_onArrowKeyPress:function(evt){
if(evt.charOrCode==dojo.keys[this.isLeftToRight()?"LEFT_ARROW":"RIGHT_ARROW"]){
dijit.focus(this.titleNode);
dojo.stopEvent(evt);
}
},focus:function(_47a){
if(!this.disabled){
dijit.focus(_47a=="start"?this.titleNode:this._popupStateNode);
}
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{checked:"focusNode"}),_clicked:function(evt){
this.set("checked",!this.checked);
},_setCheckedAttr:function(_47b,_47c){
this._set("checked",_47b);
dojo.attr(this.focusNode||this.domNode,"checked",_47b);
dijit.setWaiState(this.focusNode||this.domNode,"pressed",_47b);
this._handleOnChange(_47b,_47c);
},setChecked:function(_47d){
dojo.deprecated("setChecked("+_47d+") is deprecated. Use set('checked',"+_47d+") instead.","","2.0");
this.set("checked",_47d);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
}
if(!dojo._hasResource["dijit.form.ToggleButton"]){
dojo._hasResource["dijit.form.ToggleButton"]=true;
dojo.provide("dijit.form.ToggleButton");
}
if(!dojo._hasResource["dijit.form.CheckBox"]){
dojo._hasResource["dijit.form.CheckBox"]=true;
dojo.provide("dijit.form.CheckBox");
dojo.declare("dijit.form.CheckBox",dijit.form.ToggleButton,{templateString:dojo.cache("dijit.form","templates/CheckBox.html","<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\r\n\t><input\r\n\t \t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\r\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\r\n\t\tdojoAttachPoint=\"focusNode\"\r\n\t \tdojoAttachEvent=\"onclick:_onClick\"\r\n/></div>\r\n"),baseClass:"dijitCheckBox",type:"checkbox",value:"on",readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{readOnly:"focusNode"}),_setReadOnlyAttr:function(_47e){
this._set("readOnly",_47e);
dojo.attr(this.focusNode,"readOnly",_47e);
dijit.setWaiState(this.focusNode,"readonly",_47e);
},_setValueAttr:function(_47f,_480){
if(typeof _47f=="string"){
this._set("value",_47f);
dojo.attr(this.focusNode,"value",_47f);
_47f=true;
}
if(this._created){
this.set("checked",_47f,_480);
}
},_getValueAttr:function(){
return (this.checked?this.value:false);
},_setLabelAttr:undefined,postMixInProperties:function(){
if(this.value==""){
this.value="on";
}
this.checkedAttrSetting=this.checked?"checked":"";
this.inherited(arguments);
},_fillContent:function(_481){
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
this._set("value",this.params.value||"on");
dojo.attr(this.focusNode,"value",this.value);
},_onFocus:function(){
if(this.id){
dojo.query("label[for='"+this.id+"']").addClass("dijitFocusedLabel");
}
this.inherited(arguments);
},_onBlur:function(){
if(this.id){
dojo.query("label[for='"+this.id+"']").removeClass("dijitFocusedLabel");
}
this.inherited(arguments);
},_onClick:function(e){
if(this.readOnly){
dojo.stopEvent(e);
return false;
}
return this.inherited(arguments);
}});
dojo.declare("dijit.form.RadioButton",dijit.form.CheckBox,{type:"radio",baseClass:"dijitRadio",_setCheckedAttr:function(_482){
this.inherited(arguments);
if(!this._created){
return;
}
if(_482){
var _483=this;
dojo.query("INPUT[type=radio]",this.focusNode.form||dojo.doc).forEach(function(_484){
if(_484.name==_483.name&&_484!=_483.focusNode&&_484.form==_483.focusNode.form){
var _485=dijit.getEnclosingWidget(_484);
if(_485&&_485.checked){
_485.set("checked",false);
}
}
});
}
},_clicked:function(e){
if(!this.checked){
this.set("checked",true);
}
}});
}
if(!dojo._hasResource["dojox.charting.widget.SelectableLegend"]){
dojo._hasResource["dojox.charting.widget.SelectableLegend"]=true;
dojo.provide("dojox.charting.widget.SelectableLegend");
(function(){
var df=dojox.lang.functional;
dojo.declare("dojox.charting.widget.SelectableLegend",[dojox.charting.widget.Legend],{outline:false,transitionFill:null,transitionStroke:null,postCreate:function(){
this.legends=[];
this.legendAnim={};
this.inherited(arguments);
},refresh:function(){
this.legends=[];
this.inherited(arguments);
this._applyEvents();
new dojox.charting.widget._FocusManager(this);
},_addLabel:function(dyn,_486){
this.inherited(arguments);
var _487=dojo.query("td",this.legendBody);
var _488=_487[_487.length-1];
this.legends.push(_488);
var _489=new dijit.form.CheckBox({checked:true});
dojo.place(_489.domNode,_488,"first");
var _486=dojo.query("label",_488)[0];
dojo.attr(_486,"for",_489.id);
},_applyEvents:function(){
dojo.forEach(this.legends,function(_48a,i){
var _48b,_48c=[],_48d,_48e;
if(this._isPie()){
_48b=this.chart.stack[0];
_48c.push(_48b.group.children[i]);
_48d=_48b.name;
_48e=this.chart.series[0].name;
}else{
_48b=this.chart.series[i];
_48c=_48b.group.children;
_48d=_48b.plot;
_48e=_48b.name;
}
var _48f={fills:df.map(_48c,"x.getFill()"),strokes:df.map(_48c,"x.getStroke()")};
var _490=dojo.query(".dijitCheckBox",_48a)[0];
dojo.connect(_490,"onclick",this,function(e){
this._toggle(_48c,i,_48a.vanished,_48f,_48e,_48d);
_48a.vanished=!_48a.vanished;
e.stopPropagation();
});
var _491=dojo.query(".dojoxLegendIcon",_48a)[0],_492=this._getFilledShape(this._surfaces[i].children);
dojo.forEach(["onmouseenter","onmouseleave"],function(_493){
dojo.connect(_491,_493,this,function(e){
this._highlight(e,_492,_48c,i,_48a.vanished,_48f,_48e,_48d);
});
},this);
},this);
},_toggle:function(_494,_495,_496,dyn,_497,_498){
dojo.forEach(_494,function(_499,i){
var _49a=dyn.fills[i],_49b=this._getTransitionFill(_498),_49c=dyn.strokes[i],_49d=this.transitionStroke;
if(_49a){
if(_49b&&(typeof _49a=="string"||_49a instanceof dojo.Color)){
dojox.gfx.fx.animateFill({shape:_499,color:{start:_496?_49b:_49a,end:_496?_49a:_49b}}).play();
}else{
_499.setFill(_496?_49a:_49b);
}
}
if(_49c&&!this.outline){
_499.setStroke(_496?_49c:_49d);
}
},this);
},_highlight:function(e,_49e,_49f,_4a0,_4a1,dyn,_4a2,_4a3){
if(!_4a1){
var anim=this._getAnim(_4a3),_4a4=this._isPie(),type=_4a5(e.type);
var _4a6={shape:_49e,index:_4a4?"legend"+_4a0:"legend",run:{name:_4a2},type:type};
anim.process(_4a6);
dojo.forEach(_49f,function(_4a7,i){
_4a7.setFill(dyn.fills[i]);
var o={shape:_4a7,index:_4a4?_4a0:i,run:{name:_4a2},type:type};
anim.duration=100;
anim.process(o);
});
}
},_getAnim:function(_4a8){
if(!this.legendAnim[_4a8]){
this.legendAnim[_4a8]=new dojox.charting.action2d.Highlight(this.chart,_4a8);
}
return this.legendAnim[_4a8];
},_getTransitionFill:function(_4a9){
if(this.chart.stack[this.chart.plots[_4a9]].declaredClass.indexOf("dojox.charting.plot2d.Stacked")!=-1){
return this.chart.theme.plotarea.fill;
}
return null;
},_getFilledShape:function(_4aa){
var i=0;
while(_4aa[i]){
if(_4aa[i].getFill()){
return _4aa[i];
}
i++;
}
},_isPie:function(){
return this.chart.stack[0].declaredClass=="dojox.charting.plot2d.Pie";
}});
function _4a5(type){
if(type=="mouseenter"){
return "onmouseover";
}
if(type=="mouseleave"){
return "onmouseout";
}
return "on"+type;
};
dojo.declare("dojox.charting.widget._FocusManager",null,{constructor:function(_4ab){
this.legend=_4ab;
this.index=0;
this.horizontalLength=this._getHrizontalLength();
dojo.forEach(_4ab.legends,function(item,i){
if(i>0){
dojo.query("input",item).attr("tabindex",-1);
}
});
this.firstLabel=dojo.query("input",_4ab.legends[0])[0];
dojo.connect(this.firstLabel,"focus",this,function(){
this.legend.active=true;
});
dojo.connect(this.legend.legendNode,"keydown",this,"_onKeyEvent");
},_getHrizontalLength:function(){
var _4ac=this.legend.horizontal;
if(typeof _4ac=="number"){
return Math.min(_4ac,this.legend.legends.length);
}else{
if(!_4ac){
return 1;
}else{
return this.legend.legends.length;
}
}
},_onKeyEvent:function(e){
if(!this.legend.active){
return;
}
if(e.keyCode==dojo.keys.TAB){
this.legend.active=false;
return;
}
var max=this.legend.legends.length;
switch(e.keyCode){
case dojo.keys.LEFT_ARROW:
this.index--;
if(this.index<0){
this.index+=max;
}
break;
case dojo.keys.RIGHT_ARROW:
this.index++;
if(this.index>=max){
this.index-=max;
}
break;
case dojo.keys.UP_ARROW:
if(this.index-this.horizontalLength>=0){
this.index-=this.horizontalLength;
}
break;
case dojo.keys.DOWN_ARROW:
if(this.index+this.horizontalLength<max){
this.index+=this.horizontalLength;
}
break;
default:
return;
}
this._moveToFocus();
dojo.stopEvent(e);
},_moveToFocus:function(){
dojo.query("input",this.legend.legends[this.index])[0].focus();
}});
})();
}
if(!dojo._hasResource["wm.base.widget.DojoChart"]){
dojo._hasResource["wm.base.widget.DojoChart"]=true;
dojo.provide("wm.base.widget.DojoChart");
dojo.declare("wm.DojoChart",wm.Control,{chartTitle:"",yAxisTitle:"",hideLegend:false,verticalLegend:false,padding:4,width:"200px",height:"200px",legendHeight:"50px",legendWidth:"150px",variable:null,dataSet:null,dojoObj:null,theme:"CubanShirts",xAxis:"wmDefaultX",xAxisLabelLength:0,maxTimePoints:15,xMajorTickStep:5,xMinorTicks:false,xMinorTickStep:1,yAxis:"wmDefaultY",yUpperRange:"",yLowerRange:"",chartColor:"",includeX:true,includeY:true,enableAnimation:true,chartType:"Columns",includeGrid:false,gap:4,defaultXY:[{"wmDefaultX":"Jan","wmDefaultY":3},{"wmDefaultX":"Feb","wmDefaultY":5},{"wmDefaultX":"Mar","wmDefaultY":8},{"wmDefaultX":"Apr","wmDefaultY":2}],addedSeries:{},aniHighlight:null,aniShake:null,magnify:null,aniTooltip:null,addSilverlight:false,init:function(){
if(this.showAddSilverlight()){
return;
}
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
},renderDojoObj:function(){
if(this._loading||this.addSilverlight){
return;
}
if(this.isAncestorHidden()){
this._renderDojoObjSkipped=true;
return;
}
this._renderDojoObjSkipped=false;
if(this.dojoObj!=null){
try{
this.dojoObj.destroy();
while(this.domNode.childNodes.length>0){
this.domNode.removeChild(this.domNode.childNodes[0]);
}
}
catch(e){
}
}
this.dojoDiv=dojo.doc.createElement("div");
this.updateChartDivHeight();
this.updateChartDivWidth();
this.domNode.appendChild(this.dojoDiv);
try{
this.dojoObj=new dojox.charting.Chart2D(this.dojoDiv,{title:this.chartTitle,titlePos:"top",titleGap:5,margins:{l:0,t:5,r:5,b:15}});
}
catch(e){
if(!wm.charterror){
console.error(e.toString());
}
wm.charterror=true;
return;
}
this.setChartTheme();
this.updateChartType();
this.addXAxis();
this.addYAxis();
if(this.includeGrid){
this.dojoObj.addPlot("grid",{type:"Grid",hMinorLines:true,vMinorLines:true});
}
this.addAnimation();
this.addChartSeries();
var self=this;
dojo.addOnLoad(function(){
self.dojoRenderer();
self.connectDojoEvents();
});
},_onShowParent:function(){
if(this._renderDojoObjSkipped){
wm.onidle(this,"renderDojoObj");
}
},renderBounds:function(){
this.inherited(arguments);
this.resizeDijit();
},resizeDijit:function(){
this.renderDojoObj();
},createLegend:function(){
if(this.legend&&this.legend!=null){
this.legend.destroy();
}
if(this.hideLegend){
return;
}
this.legendDiv=dojo.doc.createElement("div");
dojo.attr(this.legendDiv,"align","center");
this.domNode.appendChild(this.legendDiv);
try{
if(!wm.isMobile&&(this.xAxis.match(/,/)||this.yAxis.match(/,/))){
this.legend=new dojox.charting.widget.SelectableLegend({chart:this.dojoObj,horizontal:!this.verticalLegend},this.legendDiv);
}else{
this.legend=new dojox.charting.widget.Legend({chart:this.dojoObj,horizontal:!this.verticalLegend},this.legendDiv);
}
}
catch(e){
}
wm.onidle(this,function(){
if(this.isDestroyed){
return;
}
var _4ad=dojo.query(".dojoxLegendNode",this.domNode)[0];
if(_4ad){
var s=_4ad.style;
if(this.verticalLegend){
s.position="absolute";
s.left=Math.max(0,this.getContentBounds().w-parseInt(this.legendWidth))+"px";
s.width=this.legendWidth;
s.top="0px";
}
}
while(this.domNode.childNodes[1].childNodes.length>1){
dojo.destroy(this.domNode.childNodes[1].childNodes[0]);
}
});
},updateChartDivHeight:function(){
if(!this.dojoDiv){
return;
}
var h=dojo.coords(this.domNode).h;
if(!this.verticalLegend){
var lh=wm.splitUnits(this.legendHeight);
var l=lh.value;
}else{
l=0;
}
if(l==0){
var _4ae=h+10;
}else{
var _4ae=h-l;
}
if(_4ae>0){
this.dojoDiv.style.height=_4ae+"px";
}
},updateChartDivWidth:function(){
if(!this.dojoDiv){
return;
}
var _4af=this.getContentBounds().w;
if(this.verticalLegend){
_4af-=parseInt(this.legendWidth);
}
if(_4af<0){
_4af=0;
}
this.dojoDiv.style.width=_4af+"px";
},dojoRenderer:function(){
if(!this.dojoObj){
return;
}
try{
this.dojoObj.render();
}
catch(e){
}
this.createLegend();
},connectDojoEvents:function(){
this.dojoObj.connectToPlot("default",dojo.hitch(this,"dojoChartEvent"));
},getDataSet:function(){
return this.variable;
},setDataSet:function(_4b0,_4b1){
this.dataSet=this.variable=_4b0;
if(!this.dojoObj&&(!this.variable||!this.variable.getData())){
return;
}
var _4b2=this;
dojo.addOnLoad(function(){
_4b2.renderDojoObj();
});
},addChartSeries:function(_4b3){
this.updateXLabelSet();
dojo.forEach(this.yAxis.split(","),function(_4b4,idx){
try{
_4b4=dojo.trim(_4b4);
if(!_4b4){
return;
}
var _4b5=this.getColumnDataSet(_4b4);
var _4b6=wm.capitalize(_4b4);
if(_4b3&&this.addedSeries[_4b6]&&this.addedSeries[_4b6].length>0){
_4b5=this.addedSeries[_4b6].concat(_4b5);
while(_4b5.length>this.maxTimePoints){
_4b5.shift();
}
}
if(this.chartColor instanceof Array){
var _4b7=this.chartColor[idx];
}
if(_4b7&&_4b7!=""&&this.chartType!="Pie"){
this.dojoObj.addSeries(_4b6,_4b5,{stroke:{width:0},fill:_4b7});
}else{
if(!_4b3){
this.dojoObj.addSeries(_4b6,_4b5);
}else{
this.dojoObj.updateSeries(_4b6,_4b5);
}
}
this.addedSeries[_4b6]=_4b5;
}
catch(e){
}
},this);
},getChartDataSet:function(){
if(this.xAxis=="wmDefaultX"&&this.yAxis=="wmDefaultY"){
return this.defaultXY;
}
if(!this.variable||this.variable==""){
return [];
}
var ds=this.variable.getData();
if(ds&&!(ds instanceof Array)){
ds=[ds];
}
if(this.xAxis=="wmDefaultX"||this.yAxis=="wmDefaultY"){
if(this.xAxis=="wmDefaultX"){
var axis="wmDefaultX";
}else{
var axis="wmDefaultY";
}
dojo.forEach(ds,function(obj,i){
if(i>=this.defaultXY.length){
return;
}
ds[i][axis]=this.defaultXY[i][axis];
},this);
}
return ds;
},updateXLabelSet:function(){
this.xLabels={};
if(this.xAxis=="wmDefaultX"){
var ds=this.defaultXY;
}else{
var ds=this.getChartDataSet();
}
var x=this.xAxis;
dojo.forEach(ds,function(obj,idx){
var _4b8=obj[x];
var _4b9=this.xaxisFormatter(_4b8);
this.xLabels[_4b8]=this.addXLabel(_4b9);
},this);
return this.xLabels;
},formatChanged:function(){
this.renderDojoObj();
},isPieChart:function(){
return this.chartType=="Pie";
},getColumnDataSet:function(_4ba){
var data=[],x="";
var ds=this.getChartDataSet();
var _4bb=this.xAxis;
dojo.forEach(ds,function(_4bc,i){
var obj={y:_4ba in _4bc?_4bc[_4ba]:0};
if(this.isPieChart()){
if(_4bb!=""){
obj.legend=this.xaxisFormatter(_4bc[_4bb]);
}
if(this.chartColor!=""){
if(this.chartColor instanceof Array){
var _4bd=this.chartColor[i];
if(_4bd){
obj.color=_4bd;
}
}else{
obj.color=_4bc[this.chartColor];
}
}
}else{
if(_4bb){
x=this.xLabels[_4bc[_4bb]];
}
if(x!=""){
obj.x=x;
}
}
data.push(obj);
},this);
return data;
},getPieDataSet:function(_4be){
if((_4be=="wmDefaultX"||_4be=="wmDefaultY")&&this.isDesignLoaded()){
if(_4be=="wmDefaultX"){
return this.defaultXY;
}else{
return this.defaultXY;
}
}
if(this.variable==null||this.variable==""){
return [];
}
var data=[];
for(var i=0;i<this.variable.getCount();i++){
var _4bf=this.variable.getItem(i).data;
if(_4bf&&_4bf!=null){
var obj={y:_4bf[_4be]};
if(this.xAxis!=""){
obj.legend=_4bf[this.xAxis];
}
if(this.chartColor!=""){
if(this.chartColor instanceof Array){
var _4c0=this.chartColor[i];
if(_4c0){
obj.color=_4c0;
}
}else{
obj.color=_4bf[this.chartColor];
}
}
data[data.length]=obj;
}
}
return data;
},addXAxis:function(){
if(!this.includeX){
this.dojoObj.removeAxis("x");
return;
}
var x=this.dojoObj?this.dojoObj.getAxis("x"):{},_4c1={};
if(x&&x.opt){
_4c1=x.opt;
}
_4c1.minorTicks=this.xMinorTicks;
var _4c2=this.getFontProperty();
if(_4c2){
dojo.mixin(_4c1,_4c2);
}
if(this.xMajorTickStep){
_4c1.majorTickStep=this.xMajorTickStep;
}
if(this.xMinorTickStep){
_4c1.minorTickStep=this.xMinorTickStep;
}
this.dojoObj.addAxis("x",_4c1);
},addYAxis:function(){
if(this.includeY){
var _4c3={vertical:true,natural:true,includeZero:true,fixUpper:"minor"};
var _4c4=this.getFontProperty();
if(_4c4){
dojo.mixin(_4c3,_4c4);
}
if(this.yLowerRange){
_4c3.min=this.yLowerRange;
}
if(this.yUpperRange&&this.yUpperRange!=""){
_4c3.max=this.yUpperRange;
}
if(this.yMajorTickStep){
_4c3.majorTickStep=this.yMajorTickStep;
}
if(this.yAxisTitle){
_4c3.title=this.yAxisTitle;
}
_4c3.labelFunc=dojo.hitch(this,"yaxisFormatter");
this.dojoObj.addAxis("y",_4c3);
}
},yaxisFormatter:function(_4c5){
if(this.$.yformat){
return this.$.yformat.format(_4c5);
}else{
if(this.ydisplay&&dojo.isFunction(this.owner[this.ydisplay])){
return this.owner[this.ydisplay](this,_4c5);
}else{
return _4c5;
}
}
},xaxisFormatter:function(_4c6){
if(this.$.xformat){
return this.$.xformat.format(_4c6);
}else{
if(this.xdisplay&&dojo.isFunction(this.owner[this.xdisplay])){
return this.owner[this.xdisplay](this,_4c6);
}else{
return _4c6;
}
}
},getFontProperty:function(){
var _4c7={style:"normal",variant:"normal",weight:"normal",size:"7pt",family:"Tahoma"};
var _4c8={};
var _4c9={};
var _4ca=false;
if(this._classes&&this._classes.domNode){
for(var i=0;i<this._classes.domNode.length;i++){
var _4cb=this._classes.domNode[i];
var _4cc=this.getDojoGFXCssPropObj(_4cb);
if(_4cc){
_4c9[_4cc.propName]=_4cc.propValue;
_4ca=true;
}
}
if(_4ca){
var _4cd="";
for(p in _4c7){
if(_4c9[p]&&_4c9[p]!=""){
_4cd+=" "+_4c9[p];
}else{
_4cd+=" "+_4c7[p];
}
}
_4c8.font=dojo.trim(_4cd);
if(_4c9.fontColor){
_4c8.fontColor=_4c9.fontColor;
}
return _4c8;
}
}
return null;
},addSeries:function(){
return;
thisObj=this;
dojo.forEach(this.yAxis.split(","),function(_4ce,idx){
var _4cf=null;
if(thisObj.chartType=="Pie"){
_4cf=thisObj.getPieDataSet(_4ce);
}else{
_4cf=thisObj.getColumnDataSet(_4ce);
}
_4ce=dojo.trim(_4ce);
var _4d0=wm.capitalize(_4ce);
var _4d1=1;
while(dojo.indexOf(thisObj.addedSeries,_4d0)!=-1){
_4d0+=" "+_4d1;
_4d1++;
}
if(thisObj.chartType!="Pie"&&thisObj.chartColor instanceof Array){
var _4d2=thisObj.chartColor[idx];
if(_4d2&&_4d2!=""){
thisObj.dojoObj.addSeries(_4d0,_4cf,{stroke:{width:0},fill:_4d2});
}else{
thisObj.dojoObj.addSeries(_4d0,_4cf);
}
}else{
thisObj.dojoObj.addSeries(_4d0,_4cf);
}
thisObj.addedSeries[thisObj.addedSeries.length]=_4d0;
});
},incrementSeries:function(){
this.addChartSeries(true);
this.renderDojoObj();
},updateSeries:function(_4d3,_4d4){
try{
this.dojoObj.updateSeries(_4d3,_4d4);
this.dojoObj.render();
}
catch(e){
}
},setChartTheme:function(){
var js="dojox.charting.themes."+this.theme;
dojo["require"](js);
var self=this;
dojo.addOnLoad(function(){
self.updateChartTheme();
});
},updateChartTheme:function(){
var _4d5=dojo.getObject("dojox.charting.themes."+this.theme);
this.dojoObj.setTheme(_4d5);
},updateChartType:function(){
this.updateChartXY();
var prop={type:this.chartType,gap:this.gap};
if(this.chartType=="Lines"){
prop.markers=true;
}
this.dojoObj.addPlot("default",prop);
},getDojoGFXCssPropObj:function(prop){
var _4d6=prop.split("_");
if(_4d6.length==3){
switch(_4d6[1]){
case "FontFamily":
return {propName:"family",propValue:_4d6[2]};
case "FontSizePx":
return {propName:"size",propValue:_4d6[2]};
case "FontColor":
return {propName:"fontColor",propValue:_4d6[2]};
case "TextDecoration":
return {propName:"weight",propValue:_4d6[2]};
}
}
return null;
},updateChartXY:function(){
if(this.chartType=="Pie"){
this.dojoObj.removeAxis("x");
}else{
this.addXAxis();
}
this.addSeries();
},addAnimation:function(){
if(this.aniHighlight!=null){
this.aniHighlight.destroy();
this.aniShake.destroy();
this.aniTooltip.destroy();
if(this.magnify){
this.magnify.destroy();
}
}
if(this.enableAnimation){
var dc=dojox.charting;
var dur=450;
this.aniHighlight=new dc.action2d.Highlight(this.dojoObj,"default",{duration:dur,easing:dojo.fx.easing.sineOut});
this.aniShake=new dc.action2d.Shake(this.dojoObj,"default");
this.aniTooltip=new dc.action2d.Tooltip(this.dojoObj,"default");
if(this.chartType=="Lines"){
this.magnify=new dc.action2d.Magnify(this.dojoObj,"default");
}
}
},getTimeX:function(){
var _4d7=new Date();
var h=_4d7.getHours();
var m=_4d7.getMinutes();
var s=_4d7.getSeconds();
var text;
var _4d8=this.dojoObj.getAxis("x"),_4d9=_4d8.opt.labels||[];
if(_4d9.length<1){
var _4da=1;
}else{
var _4da=_4d9[_4d9.length-1].value+1;
while(_4d9.length>this.maxTimePoints){
_4d9.shift();
}
}
_4d9.push({value:_4da,text:text});
_4d8.labels=_4d9;
this.dojoObj.addAxis("x",_4d8);
return _4da;
},addXLabel:function(_4db){
var _4dc=this.dojoObj.getAxis("x"),_4dd=_4dc.opt.labels||[],_4de=0;
if(_4dd.length<1){
_4de=1;
}else{
_4de=_4dd[_4dd.length-1].value+1;
}
_4db=_4db+"";
if(this.xAxisLabelLength){
_4db=_4db.substring(0,this.xAxisLabelLength);
}
_4dd.push({value:_4de,text:_4db});
_4dc.labels=_4dd;
this.dojoObj.addAxis("x",_4dc);
return _4de;
},showAddSilverlight:function(){
if(!dojo.isIE||!Silverlight||Silverlight.isInstalled()){
return;
}
this.addSilverlight=true;
var link=dojo.doc.createElement("a");
dojo.attr(link,"href","http://go.microsoft.com/fwlink/?LinkId=149156");
dojo.attr(link,"style","text-decoration: none;");
var img=dojo.doc.createElement("img");
dojo.attr(img,"src","http://go.microsoft.com/fwlink/?LinkId=108181");
dojo.attr(img,"alt",wm.getDictionaryItem("ALT_PROMPT_SILVERLIGHT"));
dojo.attr(img,"style","border-style: none");
link.appendChild(img);
this.domNode.appendChild(link);
},dojoChartEvent:function(e){
var type=e.type;
var idx=e.index;
if(!this.variable||!type||type==null||idx==null||this.variable==null){
return;
}
var _4df=null;
var item=this.variable.getItem(idx);
if(item!=null){
_4df=item.data;
}
if(type=="onclick"){
dojo.hitch(this,"onClick")(e,_4df);
}else{
if(type=="onmouseover"){
dojo.hitch(this,"onMouseOver")(e,_4df);
}else{
if(type=="onmouseout"){
dojo.hitch(this,"onMouseOut")(e,_4df);
}
}
}
},onClick:function(e,_4e0){
},onMouseOver:function(e,_4e1){
},onMouseOut:function(e,_4e2){
},toHtml:function(){
return this.dojoObj.node.innerHTML;
},createMouseOverConnect:function(){
},createMouseOutConnect:function(){
}});
}
if(!dojo._hasResource["dijit._Contained"]){
dojo._hasResource["dijit._Contained"]=true;
dojo.provide("dijit._Contained");
dojo.declare("dijit._Contained",null,{getParent:function(){
var _4e3=dijit.getEnclosingWidget(this.domNode.parentNode);
return _4e3&&_4e3.isContainer?_4e3:null;
},_getSibling:function(_4e4){
var node=this.domNode;
do{
node=node[_4e4+"Sibling"];
}while(node&&node.nodeType!=1);
return node&&dijit.byNode(node);
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
if(!dojo._hasResource["dojox.widget.gauge._Gauge"]){
dojo._hasResource["dojox.widget.gauge._Gauge"]=true;
dojo.provide("dojox.widget.gauge._Gauge");
dojo.experimental("dojox.widget.gauge._Gauge");
dojo.declare("dojox.widget.gauge._Gauge",[dijit._Widget,dijit._Templated,dijit._Container],{width:0,height:0,background:null,min:0,max:0,image:null,useRangeStyles:0,useTooltip:true,majorTicks:null,minorTicks:null,_defaultIndicator:null,defaultColors:[[0,84,170,1],[68,119,187,1],[102,153,204,1],[153,187,238,1],[153,204,255,1],[204,238,255,1],[221,238,255,1]],min:null,max:null,surface:null,hideValues:false,gaugeContent:undefined,templateString:dojo.cache("dojox.widget.gauge","_Gauge.html","<div>\r\n\t<div class=\"dojoxGaugeContent\" dojoAttachPoint=\"gaugeContent\"></div>\r\n\t<div dojoAttachPoint=\"containerNode\"></div>\r\n\t<div dojoAttachPoint=\"mouseNode\"></div>\r\n</div>\r\n"),_backgroundDefault:{color:"#E0E0E0"},_rangeData:null,_indicatorData:null,_drag:null,_img:null,_overOverlay:false,_lastHover:"",startup:function(){
if(this.image===null){
this.image={};
}
this.connect(this.gaugeContent,"onmousemove",this.handleMouseMove);
this.connect(this.gaugeContent,"onmouseover",this.handleMouseOver);
this.connect(this.gaugeContent,"onmouseout",this.handleMouseOut);
this.connect(this.gaugeContent,"onmouseup",this.handleMouseUp);
if(!dojo.isArray(this.ranges)){
this.ranges=[];
}
if(!dojo.isArray(this.indicators)){
this.indicators=[];
}
var _4e5=[],_4e6=[];
var i;
if(this.hasChildren()){
var _4e7=this.getChildren();
for(i=0;i<_4e7.length;i++){
if(/dojox\.widget\..*Indicator/.test(_4e7[i].declaredClass)){
_4e6.push(_4e7[i]);
continue;
}
switch(_4e7[i].declaredClass){
case "dojox.widget.gauge.Range":
_4e5.push(_4e7[i]);
break;
}
}
this.ranges=this.ranges.concat(_4e5);
this.indicators=this.indicators.concat(_4e6);
}
if(!this.background){
this.background=this._backgroundDefault;
}
this.background=this.background.color||this.background;
if(!this.surface){
this.createSurface();
}
this.addRanges(this.ranges);
if(this.minorTicks&&this.minorTicks.interval){
this.setMinorTicks(this.minorTicks);
}
if(this.majorTicks&&this.majorTicks.interval){
this.setMajorTicks(this.majorTicks);
}
for(i=0;i<this.indicators.length;i++){
this.addIndicator(this.indicators[i]);
}
},_setTicks:function(_4e8,_4e9,_4ea){
var i;
if(_4e8&&dojo.isArray(_4e8._ticks)){
for(i=0;i<_4e8._ticks.length;i++){
this.removeIndicator(_4e8._ticks[i]);
}
}
var t={length:_4e9.length,offset:_4e9.offset,noChange:true};
if(_4e9.color){
t.color=_4e9.color;
}
if(_4e9.font){
t.font=_4e9.font;
}
_4e9._ticks=[];
for(i=this.min;i<=this.max;i+=_4e9.interval){
t.value=i;
if(_4ea){
t.label=""+i;
}
_4e9._ticks.push(this.addIndicator(t));
}
return _4e9;
},setMinorTicks:function(_4eb){
this.minorTicks=this._setTicks(this.minorTicks,_4eb,false);
},setMajorTicks:function(_4ec){
this.majorTicks=this._setTicks(this.majorTicks,_4ec,true);
},postCreate:function(){
if(this.hideValues){
dojo.style(this.containerNode,"display","none");
}
dojo.style(this.mouseNode,"width","0");
dojo.style(this.mouseNode,"height","0");
dojo.style(this.mouseNode,"position","absolute");
dojo.style(this.mouseNode,"z-index","100");
if(this.useTooltip){
dijit.showTooltip("test",this.mouseNode,!this.isLeftToRight());
dijit.hideTooltip(this.mouseNode);
}
},createSurface:function(){
this.gaugeContent.style.width=this.width+"px";
this.gaugeContent.style.height=this.height+"px";
this.surface=dojox.gfx.createSurface(this.gaugeContent,this.width,this.height);
this._background=this.surface.createRect({x:0,y:0,width:this.width,height:this.height});
this._background.setFill(this.background);
if(this.image.url){
this._img=this.surface.createImage({width:this.image.width||this.width,height:this.image.height||this.height,src:this.image.url});
if(this.image.overlay){
this._img.getEventSource().setAttribute("overlay",true);
}
if(this.image.x||this.image.y){
this._img.setTransform({dx:this.image.x||0,dy:this.image.y||0});
}
}
},setBackground:function(_4ed){
if(!_4ed){
_4ed=this._backgroundDefault;
}
this.background=_4ed.color||_4ed;
this._background.setFill(this.background);
},addRange:function(_4ee){
this.addRanges([_4ee]);
},addRanges:function(_4ef){
if(!this._rangeData){
this._rangeData=[];
}
var _4f0;
for(var i=0;i<_4ef.length;i++){
_4f0=_4ef[i];
if((this.min===null)||(_4f0.low<this.min)){
this.min=_4f0.low;
}
if((this.max===null)||(_4f0.high>this.max)){
this.max=_4f0.high;
}
if(!_4f0.color){
var _4f1=this._rangeData.length%this.defaultColors.length;
if(dojox.gfx.svg&&this.useRangeStyles>0){
_4f1=(this._rangeData.length%this.useRangeStyles)+1;
_4f0.color={style:"dojoxGaugeRange"+_4f1};
}else{
_4f1=this._rangeData.length%this.defaultColors.length;
_4f0.color=this.defaultColors[_4f1];
}
}
this._rangeData[this._rangeData.length]=_4f0;
}
this.draw();
},addIndicator:function(_4f2){
_4f2._gauge=this;
if(!_4f2.declaredClass){
_4f2=new this._defaultIndicator(_4f2);
}
if(!_4f2.hideValue){
this.containerNode.appendChild(_4f2.domNode);
}
if(!this._indicatorData){
this._indicatorData=[];
}
this._indicatorData[this._indicatorData.length]=_4f2;
_4f2.draw();
return _4f2;
},removeIndicator:function(_4f3){
for(var i=0;i<this._indicatorData.length;i++){
if(this._indicatorData[i]===_4f3){
this._indicatorData.splice(i,1);
_4f3.remove();
break;
}
}
},moveIndicatorToFront:function(_4f4){
if(_4f4.shapes){
for(var i=0;i<_4f4.shapes.length;i++){
_4f4.shapes[i].moveToFront();
}
}
},drawText:function(txt,x,y,_4f5,_4f6,_4f7,font){
var t=this.surface.createText({x:x,y:y,text:txt,align:_4f5});
t.setFill(_4f7);
t.setFont(font);
return t;
},removeText:function(t){
this.surface.rawNode.removeChild(t);
},updateTooltip:function(txt,e){
if(this._lastHover!=txt){
if(txt!==""){
dijit.hideTooltip(this.mouseNode);
dijit.showTooltip(txt,this.mouseNode,!this.isLeftToRight());
}else{
dijit.hideTooltip(this.mouseNode);
}
this._lastHover=txt;
}
},handleMouseOver:function(_4f8){
var _4f9=_4f8.target.getAttribute("hover");
if(_4f8.target.getAttribute("overlay")){
this._overOverlay=true;
var r=this.getRangeUnderMouse(_4f8);
if(r&&r.hover){
_4f9=r.hover;
}
}
if(this.useTooltip&&!this._drag){
if(_4f9){
this.updateTooltip(_4f9,_4f8);
}else{
this.updateTooltip("",_4f8);
}
}
},handleMouseOut:function(_4fa){
if(_4fa.target.getAttribute("overlay")){
this._overOverlay=false;
}
if(this.useTooltip&&this.mouseNode){
dijit.hideTooltip(this.mouseNode);
}
},handleMouseDown:function(_4fb){
for(var i=0;i<this._indicatorData.length;i++){
var _4fc=this._indicatorData[i].shapes;
for(var s=0;s<_4fc.length;s++){
if(_4fc[s].getEventSource()==_4fb.target){
this._drag=this._indicatorData[i];
s=_4fc.length;
i=this._indicatorData.length;
}
}
}
dojo.stopEvent(_4fb);
},handleMouseUp:function(_4fd){
this._drag=null;
dojo.stopEvent(_4fd);
},handleMouseMove:function(_4fe){
if(_4fe){
dojo.style(this.mouseNode,"left",_4fe.pageX+1+"px");
dojo.style(this.mouseNode,"top",_4fe.pageY+1+"px");
}
if(this._drag){
this._dragIndicator(this,_4fe);
}else{
if(this.useTooltip&&this._overOverlay){
var r=this.getRangeUnderMouse(_4fe);
if(r&&r.hover){
this.updateTooltip(r.hover,_4fe);
}else{
this.updateTooltip("",_4fe);
}
}
}
}});
dojo.declare("dojox.widget.gauge.Range",[dijit._Widget,dijit._Contained],{low:0,high:0,hover:"",color:null,size:0,startup:function(){
this.color=this.color.color||this.color;
}});
dojo.declare("dojox.widget.gauge._Indicator",[dijit._Widget,dijit._Contained,dijit._Templated],{value:0,type:"",color:"black",label:"",font:{family:"sans-serif",size:"12px"},length:0,width:0,offset:0,hover:"",front:false,easing:dojo._defaultEasing,duration:1000,hideValue:false,noChange:false,_gauge:null,title:"",templateString:dojo.cache("dojox.widget.gauge","_Indicator.html","<div class=\"dojoxGaugeIndicatorDiv\">\r\n\t<label class=\"dojoxGaugeIndicatorLabel\" for=\"${title}\">${title}:</label>\r\n\t<input class=\"dojoxGaugeIndicatorInput\" name=\"${title}\" size=\"5\" value=\"${value}\" dojoAttachPoint=\"valueNode\" dojoAttachEvent=\"onchange:_update\"></input>\r\n</div>\r\n"),startup:function(){
if(this.onDragMove){
this.onDragMove=dojo.hitch(this.onDragMove);
}
},postCreate:function(){
if(this.title===""){
dojo.style(this.domNode,"display","none");
}
if(dojo.isString(this.easing)){
this.easing=dojo.getObject(this.easing);
}
},_update:function(_4ff){
var _500=this.valueNode.value;
if(_500===""){
this.value=null;
}else{
this.value=Number(_500);
this.hover=this.title+": "+_500;
}
if(this._gauge){
this.draw();
this.valueNode.value=this.value;
if((this.title=="Target"||this.front)&&this._gauge.moveIndicator){
this._gauge.moveIndicatorToFront(this);
}
}
},update:function(_501){
if(!this.noChange){
this.valueNode.value=_501;
this._update();
}
},onDragMove:function(){
this.value=Math.floor(this.value);
this.valueNode.value=this.value;
this.hover=this.title+": "+this.value;
},draw:function(_502){
},remove:function(){
for(var i=0;i<this.shapes.length;i++){
this._gauge.surface.remove(this.shapes[i]);
}
if(this.text){
this._gauge.surface.remove(this.text);
}
}});
}
if(!dojo._hasResource["dojox.widget.AnalogGauge"]){
dojo._hasResource["dojox.widget.AnalogGauge"]=true;
dojo.provide("dojox.widget.AnalogGauge");
dojo.experimental("dojox.widget.AnalogGauge");
dojo.declare("dojox.widget.gauge.AnalogLineIndicator",[dojox.widget.gauge._Indicator],{_getShapes:function(){
return [this._gauge.surface.createLine({x1:0,y1:-this.offset,x2:0,y2:-this.length-this.offset}).setStroke({color:this.color,width:this.width})];
},draw:function(_503){
if(this.shapes){
this._move(_503);
}else{
if(this.text){
this._gauge.surface.rawNode.removeChild(this.text);
this.text=null;
}
var a=this._gauge._getAngle(Math.min(Math.max(this.value,this._gauge.min),this._gauge.max));
this.color=this.color||"#000000";
this.length=this.length||this._gauge.radius;
this.width=this.width||1;
this.offset=this.offset||0;
this.highlight=this.highlight||"#D0D0D0";
this.shapes=this._getShapes(this._gauge,this);
if(this.shapes){
for(var s=0;s<this.shapes.length;s++){
this.shapes[s].setTransform([{dx:this._gauge.cx,dy:this._gauge.cy},dojox.gfx.matrix.rotateg(a)]);
if(this.hover){
this.shapes[s].getEventSource().setAttribute("hover",this.hover);
}
if(this.onDragMove&&!this.noChange){
this._gauge.connect(this.shapes[s].getEventSource(),"onmousedown",this._gauge.handleMouseDown);
this.shapes[s].getEventSource().style.cursor="pointer";
}
}
}
if(this.label){
var len=this.length+this.offset,rad=this._gauge._getRadians(a),x=this._gauge.cx+(len+5)*Math.sin(rad),y=this._gauge.cy-(len+5)*Math.cos(rad),_504="start",aa=Math.abs(a);
if(a<=-10){
_504="end";
}
if(aa<10){
_504="middle";
}
var _505="bottom";
if(aa>90){
_505="top";
}
this.text=this._gauge.drawText(""+this.label,x,y,_504,_505,this.color,this.font);
}
this.currentValue=this.value;
}
},_move:function(_506){
var v=Math.min(Math.max(this.value,this._gauge.min),this._gauge.max),c=this.currentValue;
if(_506){
var _507=this._gauge._getAngle(v);
for(var i in this.shapes){
this.shapes[i].setTransform([{dx:this._gauge.cx,dy:this._gauge.cy},dojox.gfx.matrix.rotateg(_507)]);
if(this.hover){
this.shapes[i].getEventSource().setAttribute("hover",this.hover);
}
}
}else{
if(c!=v){
var anim=new dojo.Animation({curve:[c,v],duration:this.duration,easing:this.easing});
dojo.connect(anim,"onAnimate",dojo.hitch(this,function(step){
for(var i in this.shapes){
this.shapes[i].setTransform([{dx:this._gauge.cx,dy:this._gauge.cy},dojox.gfx.matrix.rotateg(this._gauge._getAngle(step))]);
if(this.hover){
this.shapes[i].getEventSource().setAttribute("hover",this.hover);
}
}
this.currentValue=step;
}));
anim.play();
}
}
}});
dojo.declare("dojox.widget.AnalogGauge",dojox.widget.gauge._Gauge,{startAngle:-90,endAngle:90,cx:0,cy:0,radius:0,_defaultIndicator:dojox.widget.gauge.AnalogLineIndicator,startup:function(){
if(this.getChildren){
dojo.forEach(this.getChildren(),function(_508){
_508.startup();
});
}
this.startAngle=Number(this.startAngle);
this.endAngle=Number(this.endAngle);
this.cx=Number(this.cx);
if(!this.cx){
this.cx=this.width/2;
}
this.cy=Number(this.cy);
if(!this.cy){
this.cy=this.height/2;
}
this.radius=Number(this.radius);
if(!this.radius){
this.radius=Math.min(this.cx,this.cy)-25;
}
this._oppositeMiddle=(this.startAngle+this.endAngle)/2+180;
this.inherited(arguments);
},_getAngle:function(_509){
return (_509-this.min)/(this.max-this.min)*(this.endAngle-this.startAngle)+this.startAngle;
},_getValueForAngle:function(_50a){
if(_50a>this._oppositeMiddle){
_50a-=360;
}
return (_50a-this.startAngle)*(this.max-this.min)/(this.endAngle-this.startAngle)+this.min;
},_getRadians:function(_50b){
return _50b*Math.PI/180;
},_getDegrees:function(_50c){
return _50c*180/Math.PI;
},draw:function(){
var i;
if(this._rangeData){
for(i=0;i<this._rangeData.length;i++){
this.drawRange(this._rangeData[i]);
}
if(this._img&&this.image.overlay){
this._img.moveToFront();
}
}
if(this._indicatorData){
for(i=0;i<this._indicatorData.length;i++){
this._indicatorData[i].draw();
}
}
},drawRange:function(_50d){
var path;
if(_50d.shape){
this.surface.remove(_50d.shape);
_50d.shape=null;
}
var a1,a2;
if((_50d.low==this.min)&&(_50d.high==this.max)&&((this.endAngle-this.startAngle)==360)){
path=this.surface.createCircle({cx:this.cx,cy:this.cy,r:this.radius});
}else{
a1=this._getRadians(this._getAngle(_50d.low));
a2=this._getRadians(this._getAngle(_50d.high));
var x1=this.cx+this.radius*Math.sin(a1),y1=this.cy-this.radius*Math.cos(a1),x2=this.cx+this.radius*Math.sin(a2),y2=this.cy-this.radius*Math.cos(a2),big=0;
if((a2-a1)>Math.PI){
big=1;
}
path=this.surface.createPath();
if(_50d.size){
path.moveTo(this.cx+(this.radius-_50d.size)*Math.sin(a1),this.cy-(this.radius-_50d.size)*Math.cos(a1));
}else{
path.moveTo(this.cx,this.cy);
}
path.lineTo(x1,y1);
path.arcTo(this.radius,this.radius,0,big,1,x2,y2);
if(_50d.size){
path.lineTo(this.cx+(this.radius-_50d.size)*Math.sin(a2),this.cy-(this.radius-_50d.size)*Math.cos(a2));
path.arcTo((this.radius-_50d.size),(this.radius-_50d.size),0,big,0,this.cx+(this.radius-_50d.size)*Math.sin(a1),this.cy-(this.radius-_50d.size)*Math.cos(a1));
}
path.closePath();
}
if(dojo.isArray(_50d.color)||dojo.isString(_50d.color)){
path.setStroke({color:_50d.color});
path.setFill(_50d.color);
}else{
if(_50d.color.type){
a1=this._getRadians(this._getAngle(_50d.low));
a2=this._getRadians(this._getAngle(_50d.high));
_50d.color.x1=this.cx+(this.radius*Math.sin(a1))/2;
_50d.color.x2=this.cx+(this.radius*Math.sin(a2))/2;
_50d.color.y1=this.cy-(this.radius*Math.cos(a1))/2;
_50d.color.y2=this.cy-(this.radius*Math.cos(a2))/2;
path.setFill(_50d.color);
path.setStroke({color:_50d.color.colors[0].color});
}else{
path.setStroke({color:"green"});
path.setFill("green");
path.getEventSource().setAttribute("class",_50d.color.style);
}
}
if(_50d.hover){
path.getEventSource().setAttribute("hover",_50d.hover);
}
_50d.shape=path;
},getRangeUnderMouse:function(_50e){
var _50f=null,pos=dojo.coords(this.gaugeContent),x=_50e.clientX-pos.x,y=_50e.clientY-pos.y,r=Math.sqrt((y-this.cy)*(y-this.cy)+(x-this.cx)*(x-this.cx));
if(r<this.radius){
var _510=this._getDegrees(Math.atan2(y-this.cy,x-this.cx)+Math.PI/2),_511=this._getValueForAngle(_510);
if(this._rangeData){
for(var i=0;(i<this._rangeData.length)&&!_50f;i++){
if((Number(this._rangeData[i].low)<=_511)&&(Number(this._rangeData[i].high)>=_511)){
_50f=this._rangeData[i];
}
}
}
}
return _50f;
},_dragIndicator:function(_512,_513){
var pos=dojo.coords(_512.gaugeContent),x=_513.clientX-pos.x,y=_513.clientY-pos.y,_514=_512._getDegrees(Math.atan2(y-_512.cy,x-_512.cx)+Math.PI/2),_515=_512._getValueForAngle(_514);
_515=Math.min(Math.max(_515,_512.min),_512.max);
_512._drag.value=_512._drag.currentValue=_515;
_512._drag.onDragMove(_512._drag);
_512._drag.draw(true);
dojo.stopEvent(_513);
}});
}
if(!dojo._hasResource["dojox.widget.gauge.AnalogArrowIndicator"]){
dojo._hasResource["dojox.widget.gauge.AnalogArrowIndicator"]=true;
dojo.provide("dojox.widget.gauge.AnalogArrowIndicator");
dojo.experimental("dojox.widget.gauge.AnalogArrowIndicator");
dojo.declare("dojox.widget.gauge.AnalogArrowIndicator",[dojox.widget.gauge.AnalogLineIndicator],{_getShapes:function(){
if(!this._gauge){
return null;
}
var x=Math.floor(this.width/2);
var head=this.width*5;
var odd=(this.width&1);
var _516=[];
var _517=[{x:-x,y:0},{x:-x,y:-this.length+head},{x:-2*x,y:-this.length+head},{x:0,y:-this.length},{x:2*x+odd,y:-this.length+head},{x:x+odd,y:-this.length+head},{x:x+odd,y:0},{x:-x,y:0}];
_516[0]=this._gauge.surface.createPolyline(_517).setStroke({color:this.color}).setFill(this.color);
_516[1]=this._gauge.surface.createLine({x1:-x,y1:0,x2:-x,y2:-this.length+head}).setStroke({color:this.highlight});
_516[2]=this._gauge.surface.createLine({x1:-x-3,y1:-this.length+head,x2:0,y2:-this.length}).setStroke({color:this.highlight});
_516[3]=this._gauge.surface.createCircle({cx:0,cy:0,r:this.width}).setStroke({color:this.color}).setFill(this.color);
return _516;
}});
}
if(!dojo._hasResource["wm.base.widget.DojoGauge"]){
dojo._hasResource["wm.base.widget.DojoGauge"]=true;
dojo.provide("wm.base.widget.DojoGauge");
dojo.declare("wm.DojoGauge",wm.Control,{useOverlayImage:true,lowRangeMin:0,lowRangeMax:20,lowRangeColor:"#FFFF00",midRangeMax:80,midRangeColor:"#BCDE53",highRangeMax:100,highRangeColor:"#FF6B0A",arrowColor1:"#0000FF",arrowColor2:"#008888",arrowColor3:"#000000",currentValue1:0,currentValue2:0,currentValue3:0,useSecondIndicator:false,useThirdIndicator:false,width:"320px",height:"180px",margin:"4",init:function(){
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
this.createGauge();
},createGauge:function(){
if(this.gauge){
this.gauge.destroy();
}
if(this.valueIndicator1){
this.valueIndicator1.destroy();
}
if(this.valueIndicator2){
this.valueIndicator2.destroy();
}
if(this.valueIndicator3){
this.valueIndicator3.destroy();
}
if(this.gaugeNode){
dojo.destroy(this.gaugeNode);
}
this.gaugeNode=dojo.create("div",{},this.domNode);
if(!this.currentValue1){
this.currentValue1=this.lowRangeMin;
}
var _518={"type":"linear","x1":50,"x2":0,"y2":0,"y1":200,"colors":[{offset:0,color:"#FFFFFF"},{offset:1,color:"white"}]};
if(this.useOverlayImage){
var _519={url:dojo.moduleUrl("wm.base.widget.themes.default.images").path+"gaugeOverlay.png",width:280,height:155,x:10,y:32,overlay:true};
}
var _51a={length:5,interval:10,offset:125,font:{family:"Arial",style:"italic",variant:"small-caps",size:"13px"}};
var _51b=[{low:this.lowRangeMin,high:this.lowRangeMax,color:this.lowRangeColor},{low:this.lowRangeMax,high:this.midRangeMax,color:this.midRangeColor},{low:this.midRangeMax,high:this.highRangeMax,color:this.highRangeColor}];
gauge=this.gauge=new dojox.widget.AnalogGauge({width:320,height:200,cx:150,cy:169,radius:125,background:_518,image:dojo.isIE&&dojo.isIE<=8||!this.useOverlayImage?"":_519,ranges:_51b,useRangeStyles:0,majorTicks:_51a},this.gaugeNode);
gauge.startup();
this.valueIndicator1=new dojox.widget.gauge.AnalogArrowIndicator({value:this.currentValue1,width:3,hover:"Value: "+this.currentValue1,color:this.arrowColor1,easing:dojo.fx.easing.bounceOut});
if(this.useSecondIndicator){
this.valueIndicator2=new dojox.widget.gauge.AnalogArrowIndicator({value:this.currentValue2,width:3,hover:"Value: "+this.currentValue2,color:this.arrowColor2,easing:dojo.fx.easing.bounceOut});
}
if(this.useThirdIndicator){
this.valueIndicator3=new dojox.widget.gauge.AnalogArrowIndicator({value:this.currentValue3,width:3,hover:"Value: "+this.currentValue3,color:this.arrowColor3,easing:dojo.fx.easing.bounceOut});
}
try{
gauge.addIndicator(this.valueIndicator1);
}
catch(e){
}
try{
if(this.valueIndicator2){
gauge.addIndicator(this.valueIndicator2);
}
}
catch(e){
}
try{
if(this.valueIndicator3){
gauge.addIndicator(this.valueIndicator3);
}
}
catch(e){
}
wm.onidle(this,function(){
this.valueIndicator1.currentValue=this.currentValue1;
this.valueIndicator1.update(this.currentValue1);
this.valueIndicator1.draw(true);
if(this.valueIndicator2){
this.valueIndicator2.currentValue=this.currentValue2;
this.valueIndicator2.update(this.currentValue2);
this.valueIndicator2.draw(true);
}
if(this.valueIndicator3){
this.valueIndicator3.currentValue=this.currentValue3;
this.valueIndicator3.update(this.currentValue3);
this.valueIndicator3.draw(true);
}
});
},setCurrentValue1:function(_51c){
this.currentValue1=_51c;
if(this.valueIndicator1){
this.valueIndicator1.update(this.currentValue1);
}
},setCurrentValue2:function(_51d){
this.currentValue2=_51d;
if(this.valueIndicator2){
this.valueIndicator2.update(this.currentValue2);
}
},setCurrentValue3:function(_51e){
this.currentValue3=_51e;
if(this.valueIndicator3){
this.valueIndicator3.update(this.currentValue3);
}
},setUseOverlayImage:function(_51f){
this.useOverlayImage=_51f;
this.createGauge();
},setLowRangeMin:function(_520){
this.lowRangeMin=_520;
this.createGauge();
},setLowRangeMax:function(_521){
this.lowRangeMax=_521;
this.createGauge();
},setLowRangeColor:function(_522){
this.lowRangeColor=_522;
this.createGauge();
},setMidRangeMax:function(_523){
this.midRangeMax=_523;
this.createGauge();
},setMidRangeColor:function(_524){
this.midRangeColor=_524;
this.createGauge();
},setHighRangeMax:function(_525){
this.highRangeMax=_525;
this.createGauge();
},setHighRangeColor:function(_526){
this.highRangeColor=_526;
this.createGauge();
},setUseSecondIndicator:function(_527){
this.useSecondIndicator=_527;
this.createGauge();
},setUseThirdIndicator:function(_528){
this.useThirdIndicator=_528;
this.createGauge();
},setArrowColor1:function(_529){
this.arrowColor1=_529;
this.createGauge();
},setArrowColor2:function(_52a){
this.arrowColor2=_52a;
this.createGauge();
},setArrowColor3:function(_52b){
this.arrowColor3=_52b;
this.createGauge();
},destroy:function(){
this.valueIndicator1.destroy();
this.gauge.destroy();
this.inherited(arguments);
},toHtml:function(){
return main.dojoGauge1.gauge.domNode.innerHTML;
},_end:0});
}
