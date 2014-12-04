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

dojo.provide("wm.compressed.wm_dashboard");
if(!dojo._hasResource["dijit._Contained"]){
dojo._hasResource["dijit._Contained"]=true;
dojo.provide("dijit._Contained");
dojo.declare("dijit._Contained",null,{getParent:function(){
var _1=dijit.getEnclosingWidget(this.domNode.parentNode);
return _1&&_1.isContainer?_1:null;
},_getSibling:function(_2){
var _3=this.domNode;
do{
_3=_3[_2+"Sibling"];
}while(_3&&_3.nodeType!=1);
return _3&&dijit.byNode(_3);
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
if(!dojo._hasResource["dijit.layout._LayoutWidget"]){
dojo._hasResource["dijit.layout._LayoutWidget"]=true;
dojo.provide("dijit.layout._LayoutWidget");
dojo.declare("dijit.layout._LayoutWidget",[dijit._Widget,dijit._Container,dijit._Contained],{baseClass:"dijitLayoutContainer",isLayoutContainer:true,buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitContainer");
},startup:function(){
if(this._started){
return;
}
this.inherited(arguments);
var _4=this.getParent&&this.getParent();
if(!(_4&&_4.isLayoutContainer)){
this.resize();
this.connect(dojo.isIE?this.domNode:dojo.global,"onresize",function(){
this.resize();
});
}
},resize:function(_5,_6){
var _7=this.domNode;
if(_5){
dojo.marginBox(_7,_5);
if(_5.t){
_7.style.top=_5.t+"px";
}
if(_5.l){
_7.style.left=_5.l+"px";
}
}
var mb=_6||{};
dojo.mixin(mb,_5||{});
if(!("h" in mb)||!("w" in mb)){
mb=dojo.mixin(dojo.marginBox(_7),mb);
}
var cs=dojo.getComputedStyle(_7);
var me=dojo._getMarginExtents(_7,cs);
var be=dojo._getBorderExtents(_7,cs);
var bb=(this._borderBox={w:mb.w-(me.w+be.w),h:mb.h-(me.h+be.h)});
var pe=dojo._getPadExtents(_7,cs);
this._contentBox={l:dojo._toPixelValue(_7,cs.paddingLeft),t:dojo._toPixelValue(_7,cs.paddingTop),w:bb.w-pe.w,h:bb.h-pe.h};
this.layout();
},layout:function(){
},_setupChild:function(_8){
var _9=this.baseClass+"-child "+(_8.baseClass?this.baseClass+"-"+_8.baseClass:"");
dojo.addClass(_8.domNode,_9);
},addChild:function(_a,_b){
this.inherited(arguments);
if(this._started){
this._setupChild(_a);
}
},removeChild:function(_c){
var _d=this.baseClass+"-child"+(_c.baseClass?" "+this.baseClass+"-"+_c.baseClass:"");
dojo.removeClass(_c.domNode,_d);
this.inherited(arguments);
}});
dijit.layout.marginBox2contentBox=function(_e,mb){
var cs=dojo.getComputedStyle(_e);
var me=dojo._getMarginExtents(_e,cs);
var pb=dojo._getPadBorderExtents(_e,cs);
return {l:dojo._toPixelValue(_e,cs.paddingLeft),t:dojo._toPixelValue(_e,cs.paddingTop),w:mb.w-(me.w+pb.w),h:mb.h-(me.h+pb.h)};
};
(function(){
var _f=function(_10){
return _10.substring(0,1).toUpperCase()+_10.substring(1);
};
var _11=function(_12,dim){
var _13=_12.resize?_12.resize(dim):dojo.marginBox(_12.domNode,dim);
if(_13){
dojo.mixin(_12,_13);
}else{
dojo.mixin(_12,dojo.marginBox(_12.domNode));
dojo.mixin(_12,dim);
}
};
dijit.layout.layoutChildren=function(_14,dim,_15,_16,_17){
dim=dojo.mixin({},dim);
dojo.addClass(_14,"dijitLayoutContainer");
_15=dojo.filter(_15,function(_18){
return _18.region!="center"&&_18.layoutAlign!="client";
}).concat(dojo.filter(_15,function(_19){
return _19.region=="center"||_19.layoutAlign=="client";
}));
dojo.forEach(_15,function(_1a){
var elm=_1a.domNode,pos=(_1a.region||_1a.layoutAlign);
var _1b=elm.style;
_1b.left=dim.l+"px";
_1b.top=dim.t+"px";
_1b.position="absolute";
dojo.addClass(elm,"dijitAlign"+_f(pos));
var _1c={};
if(_16&&_16==_1a.id){
_1c[_1a.region=="top"||_1a.region=="bottom"?"h":"w"]=_17;
}
if(pos=="top"||pos=="bottom"){
_1c.w=dim.w;
_11(_1a,_1c);
dim.h-=_1a.h;
if(pos=="top"){
dim.t+=_1a.h;
}else{
_1b.top=dim.t+dim.h+"px";
}
}else{
if(pos=="left"||pos=="right"){
_1c.h=dim.h;
_11(_1a,_1c);
dim.w-=_1a.w;
if(pos=="left"){
dim.l+=_1a.w;
}else{
_1b.left=dim.l+dim.w+"px";
}
}else{
if(pos=="client"||pos=="center"){
_11(_1a,dim);
}
}
}
});
};
})();
}
if(!dojo._hasResource["dojox.mdnd.Moveable"]){
dojo._hasResource["dojox.mdnd.Moveable"]=true;
dojo.provide("dojox.mdnd.Moveable");
dojo.declare("dojox.mdnd.Moveable",null,{handle:null,skip:true,dragDistance:3,constructor:function(_1d,_1e){
this.node=dojo.byId(_1e);
this.d=this.node.ownerDocument;
if(!_1d){
_1d={};
}
this.handle=_1d.handle?dojo.byId(_1d.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.skip=_1d.skip;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown")];
if(dojox.mdnd.autoScroll){
this.autoScroll=dojox.mdnd.autoScroll;
}
},isFormElement:function(e){
var t=e.target;
if(t.nodeType==3){
t=t.parentNode;
}
return " a button textarea input select option ".indexOf(" "+t.tagName.toLowerCase()+" ")>=0;
},onMouseDown:function(e){
if(this._isDragging){
return;
}
var _1f=dojo.isIE?(e.button==1):(e.which==1);
if(!_1f){
return;
}
if(this.skip&&this.isFormElement(e)){
return;
}
var _20=dojo.coords(e.target);
var _21=wm.getStyleFromNode(e.target,"overflow-y")||wm.getStyleFromNode(e.target,"overflow");
var _22=wm.getStyleFromNode(e.target,"overflow-x")||wm.getStyleFromNode(e.target,"overflow");
if((_21=="auto"||_21=="scroll")&&_20.w<17+e.offsetX){
return;
}
if((_22=="auto"||_22=="scroll")&&_20.h<17+e.offsetY){
return;
}
if(this.autoScroll){
this.autoScroll.setAutoScrollNode(this.node);
this.autoScroll.setAutoScrollMaxPage();
}
this.events.push(dojo.connect(this.d,"onmouseup",this,"onMouseUp"));
this.events.push(dojo.connect(this.d,"onmousemove",this,"onFirstMove"));
this._selectStart=dojo.connect(dojo.body(),"onselectstart",dojo.stopEvent);
this._firstX=e.clientX;
this._firstY=e.clientY;
dojo.stopEvent(e);
},onFirstMove:function(e){
dojo.stopEvent(e);
var d=(this._firstX-e.clientX)*(this._firstX-e.clientX)+(this._firstY-e.clientY)*(this._firstY-e.clientY);
if(d>this.dragDistance*this.dragDistance){
this._isDragging=true;
dojo.disconnect(this.events.pop());
dojo.style(this.node,"width",dojo.contentBox(this.node).w+"px");
this.initOffsetDrag(e);
this.events.push(dojo.connect(this.d,"onmousemove",this,"onMove"));
}
},initOffsetDrag:function(e){
this.offsetDrag={"l":e.pageX,"t":e.pageY};
var s=this.node.style;
var _23=dojo.position(this.node,true);
this.offsetDrag.l=_23.x-this.offsetDrag.l;
this.offsetDrag.t=_23.y-this.offsetDrag.t;
var _24={"x":_23.x,"y":_23.y};
this.size={"w":_23.w,"h":_23.h};
this.onDragStart(this.node,_24,this.size);
},onMove:function(e){
dojo.stopEvent(e);
if(dojo.isIE==8&&new Date()-this.date<20){
return;
}
if(this.autoScroll){
this.autoScroll.checkAutoScroll(e);
}
var _25={"x":this.offsetDrag.l+e.pageX,"y":this.offsetDrag.t+e.pageY};
var s=this.node.style;
s.left=_25.x+"px";
s.top=_25.y+"px";
this.onDrag(this.node,_25,this.size,{"x":e.pageX,"y":e.pageY});
if(dojo.isIE==8){
this.date=new Date();
}
},onMouseUp:function(e){
if(this._isDragging){
dojo.stopEvent(e);
this._isDragging=false;
if(this.autoScroll){
this.autoScroll.stopAutoScroll();
}
delete this.onMove;
this.onDragEnd(this.node);
this.node.focus();
}
dojo.disconnect(this.events.pop());
dojo.disconnect(this.events.pop());
},onDragStart:function(_26,_27,_28){
},onDragEnd:function(_29){
},onDrag:function(_2a,_2b,_2c,_2d){
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=null;
}});
}
if(!dojo._hasResource["dojox.mdnd.AreaManager"]){
dojo._hasResource["dojox.mdnd.AreaManager"]=true;
dojo.provide("dojox.mdnd.AreaManager");
dojo.declare("dojox.mdnd.AreaManager",null,{autoRefresh:true,areaClass:"dojoxDndArea",dragHandleClass:"dojoxDragHandle",constructor:function(){
this._areaList=[];
this.resizeHandler=dojo.connect(dojo.global,"onresize",this,function(){
this._dropMode.updateAreas(this._areaList);
});
this._oldIndexArea=this._currentIndexArea=this._oldDropIndex=this._currentDropIndex=this._sourceIndexArea=this._sourceDropIndex=-1;
},init:function(){
this.registerByClass();
},registerByNode:function(_2e,_2f){
var _30=this._getIndexArea(_2e);
if(_2e&&_30==-1){
var _31=_2e.getAttribute("accept");
var _32=(_31)?_31.split(/\s*,\s*/):["text"];
var obj={"node":_2e,"items":[],"coords":{},"margin":null,"accept":_32,"initItems":false};
dojo.forEach(this._getChildren(_2e),function(_33){
this._setMarginArea(obj,_33);
obj.items.push(this._addMoveableItem(_33));
},this);
this._areaList=this._dropMode.addArea(this._areaList,obj);
if(!_2f){
this._dropMode.updateAreas(this._areaList);
}
dojo.publish("/dojox/mdnd/manager/register",[_2e]);
}
},registerByClass:function(){
dojo.query("."+this.areaClass).forEach(function(_34){
this.registerByNode(_34,true);
},this);
this._dropMode.updateAreas(this._areaList);
},unregister:function(_35){
var _36=this._getIndexArea(_35);
if(_36!=-1){
dojo.forEach(this._areaList[_36].items,function(_37){
this._deleteMoveableItem(_37);
},this);
this._areaList.splice(_36,1);
this._dropMode.updateAreas(this._areaList);
return true;
}
return false;
},_addMoveableItem:function(_38){
_38.setAttribute("tabIndex","0");
var _39=this._searchDragHandle(_38);
var _3a=new dojox.mdnd.Moveable({"handle":_39,"skip":true},_38);
dojo.addClass(_39||_38,"dragHandle");
var _3b=_38.getAttribute("dndType");
var _3c={"item":_3a,"type":_3b?_3b.split(/\s*,\s*/):["text"],"handlers":[dojo.connect(_3a,"onDragStart",this,"onDragStart")]};
if(dijit&&dijit.byNode){
var _3d=dijit.byNode(_38);
if(_3d){
_3c.type=_3d.dndType?_3d.dndType.split(/\s*,\s*/):["text"];
_3c.handlers.push(dojo.connect(_3d,"uninitialize",this,function(){
this.removeDragItem(_38.parentNode,_3a.node);
}));
}
}
return _3c;
},_deleteMoveableItem:function(_3e){
dojo.forEach(_3e.handlers,function(_3f){
dojo.disconnect(_3f);
});
var _40=_3e.item.node,_41=this._searchDragHandle(_40);
dojo.removeClass(_41||_40,"dragHandle");
_3e.item.destroy();
},_getIndexArea:function(_42){
if(_42){
for(var i=0;i<this._areaList.length;i++){
if(this._areaList[i].node===_42){
return i;
}
}
}
return -1;
},_searchDragHandle:function(_43){
if(_43){
var _44=this.dragHandleClass.split(" "),_45=_44.length,_46="";
dojo.forEach(_44,function(css,i){
_46+="."+css;
if(i!=_45-1){
_46+=", ";
}
});
return dojo.query(_46,_43)[0];
}
},addDragItem:function(_47,_48,_49,_4a){
var add=true;
if(!_4a){
add=_47&&_48&&(_48.parentNode===null||(_48.parentNode&&_48.parentNode.nodeType!==1));
}
if(add){
var _4b=this._getIndexArea(_47);
if(_4b!==-1){
var _4c=this._addMoveableItem(_48),_4d=this._areaList[_4b].items;
if(0<=_49&&_49<_4d.length){
var _4e=_4d.slice(0,_49),_4f=_4d.slice(_49,_4d.length);
_4e[_4e.length]=_4c;
this._areaList[_4b].items=_4e.concat(_4f);
_47.insertBefore(_48,_4d[_49].item.node);
}else{
this._areaList[_4b].items.push(_4c);
_47.appendChild(_48);
}
this._setMarginArea(this._areaList[_4b],_48);
this._areaList[_4b].initItems=false;
return true;
}
}
return false;
},removeDragItem:function(_50,_51){
var _52=this._getIndexArea(_50);
if(_50&&_52!==-1){
var _53=this._areaList[_52].items;
for(var j=0;j<_53.length;j++){
if(_53[j].item.node===_51){
this._deleteMoveableItem(_53[j]);
_53.splice(j,1);
return _50.removeChild(_51);
}
}
}
return null;
},_getChildren:function(_54){
var _55=[];
dojo.forEach(_54.childNodes,function(_56){
if(_56.nodeType==1){
if(dijit&&dijit.byNode){
var _57=dijit.byNode(_56);
if(_57){
if(!_57.dragRestriction){
_55.push(_56);
}
}else{
_55.push(_56);
}
}else{
_55.push(_56);
}
}
});
return _55;
},_setMarginArea:function(_58,_59){
if(_58&&_58.margin===null&&_59){
_58.margin=dojo._getMarginExtents(_59);
}
},findCurrentIndexArea:function(_5a,_5b){
this._oldIndexArea=this._currentIndexArea;
this._currentIndexArea=this._dropMode.getTargetArea(this._areaList,_5a,this._currentIndexArea);
if(this._currentIndexArea!=this._oldIndexArea){
if(this._oldIndexArea!=-1){
this.onDragExit(_5a,_5b);
}
if(this._currentIndexArea!=-1){
this.onDragEnter(_5a,_5b);
}
}
return this._currentIndexArea;
},_isAccepted:function(_5c,_5d){
this._accept=false;
for(var i=0;i<_5d.length;++i){
for(var j=0;j<_5c.length;++j){
if(_5c[j]==_5d[i]){
this._accept=true;
break;
}
}
}
},onDragStart:function(_5e,_5f,_60){
if(this.autoRefresh){
this._dropMode.updateAreas(this._areaList);
}
var _61=(dojo.isWebKit)?dojo.body():dojo.body().parentNode;
if(!this._cover){
this._cover=dojo.create("div",{"class":"dndCover"});
this._cover2=dojo.clone(this._cover);
dojo.addClass(this._cover2,"dndCover2");
}
var h=_61.scrollHeight+"px";
this._cover.style.height=this._cover2.style.height=h;
dojo.body().appendChild(this._cover);
dojo.body().appendChild(this._cover2);
this._dragStartHandler=dojo.connect(_5e.ownerDocument,"ondragstart",dojo,"stopEvent");
this._sourceIndexArea=this._lastValidIndexArea=this._currentIndexArea=this._getIndexArea(_5e.parentNode);
var _62=this._areaList[this._sourceIndexArea];
var _63=_62.items;
for(var i=0;i<_63.length;i++){
if(_63[i].item.node==_5e){
this._dragItem=_63[i];
this._dragItem.handlers.push(dojo.connect(this._dragItem.item,"onDrag",this,"onDrag"));
this._dragItem.handlers.push(dojo.connect(this._dragItem.item,"onDragEnd",this,"onDrop"));
_63.splice(i,1);
this._currentDropIndex=this._sourceDropIndex=i;
break;
}
}
var _64=null;
if(this._sourceDropIndex!==_62.items.length){
_64=_62.items[this._sourceDropIndex].item.node;
}
if(dojo.isIE>7){
this._eventsIE7=[dojo.connect(this._cover,"onmouseover",dojo,"stopEvent"),dojo.connect(this._cover,"onmouseout",dojo,"stopEvent"),dojo.connect(this._cover,"onmouseenter",dojo,"stopEvent"),dojo.connect(this._cover,"onmouseleave",dojo,"stopEvent")];
}
var s=_5e.style;
s.left=_5f.x+"px";
s.top=_5f.y+"px";
if(s.position=="relative"||s.position==""){
s.position="absolute";
}
this._cover.appendChild(_5e);
this._dropIndicator.place(_62.node,_64,_60);
dojo.addClass(_5e,"dragNode");
this._accept=true;
dojo.publish("/dojox/mdnd/drag/start",[_5e,_62,this._sourceDropIndex]);
},onDragEnter:function(_65,_66){
if(this._currentIndexArea===this._sourceIndexArea){
this._accept=true;
}else{
this._isAccepted(this._dragItem.type,this._areaList[this._currentIndexArea].accept);
}
},onDragExit:function(_67,_68){
this._accept=false;
},onDrag:function(_69,_6a,_6b,_6c){
var _6d=this._dropMode.getDragPoint(_6a,_6b,_6c);
this.findCurrentIndexArea(_6d,_6b);
if(this._currentIndexArea!==-1&&this._accept){
this.placeDropIndicator(_6d,_6b);
}
},placeDropIndicator:function(_6e,_6f){
this._oldDropIndex=this._currentDropIndex;
var _70=this._areaList[this._currentIndexArea];
if(!_70.initItems){
this._dropMode.initItems(_70);
}
this._currentDropIndex=this._dropMode.getDropIndex(_70,_6e);
if(!(this._currentIndexArea===this._oldIndexArea&&this._oldDropIndex===this._currentDropIndex)){
this._placeDropIndicator(_6f);
}
return this._currentDropIndex;
},_placeDropIndicator:function(_71){
var _72=this._areaList[this._lastValidIndexArea];
var _73=this._areaList[this._currentIndexArea];
this._dropMode.refreshItems(_72,this._oldDropIndex,_71,false);
var _74=null;
if(this._currentDropIndex!=-1){
_74=_73.items[this._currentDropIndex].item.node;
}
this._dropIndicator.place(_73.node,_74);
this._lastValidIndexArea=this._currentIndexArea;
this._dropMode.refreshItems(_73,this._currentDropIndex,_71,true);
},onDropCancel:function(){
if(!this._accept){
var _75=this._getIndexArea(this._dropIndicator.node.parentNode);
if(_75!=-1){
this._currentIndexArea=_75;
}else{
this._currentIndexArea=0;
}
}
},onDrop:function(_76){
this.onDropCancel();
var _77=this._areaList[this._currentIndexArea];
dojo.removeClass(_76,"dragNode");
var _78=_76.style;
_78.position="relative";
_78.left="0";
_78.top="0";
_78.width="auto";
if(_77.node==this._dropIndicator.node.parentNode){
_77.node.insertBefore(_76,this._dropIndicator.node);
}else{
_77.node.appendChild(_76);
this._currentDropIndex=_77.items.length;
}
var _79=this._currentDropIndex;
if(_79==-1){
_79=_77.items.length;
}
var _7a=_77.items;
var _7b=_7a.slice(0,_79);
var _7c=_7a.slice(_79,_7a.length);
_7b[_7b.length]=this._dragItem;
_77.items=_7b.concat(_7c);
this._setMarginArea(_77,_76);
dojo.forEach(this._areaList,function(obj){
obj.initItems=false;
});
dojo.disconnect(this._dragItem.handlers.pop());
dojo.disconnect(this._dragItem.handlers.pop());
this._resetAfterDrop();
if(this._cover){
dojo.body().removeChild(this._cover);
dojo.body().removeChild(this._cover2);
}
dojo.publish("/dojox/mdnd/drop",[_76,_77,_79]);
},_resetAfterDrop:function(){
this._accept=false;
this._dragItem=null;
this._currentDropIndex=-1;
this._currentIndexArea=-1;
this._oldDropIndex=-1;
this._sourceIndexArea=-1;
this._sourceDropIndex=-1;
this._dropIndicator.remove();
if(this._dragStartHandler){
dojo.disconnect(this._dragStartHandler);
}
if(dojo.isIE>7){
dojo.forEach(this._eventsIE7,dojo.disconnect);
}
},destroy:function(){
while(this._areaList.length>0){
if(!this.unregister(this._areaList[0].node)){
throw new Error("Error while destroying AreaManager");
}
}
dojo.disconnect(this.resizeHandler);
this._dropIndicator.destroy();
this._dropMode.destroy();
if(dojox.mdnd.autoScroll){
dojox.mdnd.autoScroll.destroy();
}
if(this.refreshListener){
dojo.unsubscribe(this.refreshListener);
}
if(this._cover){
dojo._destroyElement(this._cover);
dojo._destroyElement(this._cover2);
delete this._cover;
delete this._cover2;
}
}});
if(dijit&&dijit._Widget){
dojo.extend(dijit._Widget,{dndType:"text"});
}
dojox.mdnd._areaManager=null;
dojox.mdnd.areaManager=function(){
if(!dojox.mdnd._areaManager){
dojox.mdnd._areaManager=new dojox.mdnd.AreaManager();
}
return dojox.mdnd._areaManager;
};
}
if(!dojo._hasResource["dojox.mdnd.DropIndicator"]){
dojo._hasResource["dojox.mdnd.DropIndicator"]=true;
dojo.provide("dojox.mdnd.DropIndicator");
dojo.declare("dojox.mdnd.DropIndicator",null,{node:null,constructor:function(){
var _7d=document.createElement("div");
var _7e=document.createElement("div");
_7d.appendChild(_7e);
dojo.addClass(_7d,"dropIndicator");
this.node=_7d;
},place:function(_7f,_80,_81){
if(_81){
this.node.style.height=_81.h+"px";
}
try{
if(_80){
_7f.insertBefore(this.node,_80);
}else{
_7f.appendChild(this.node);
}
return this.node;
}
catch(e){
return null;
}
},remove:function(){
if(this.node){
this.node.style.height="";
if(this.node.parentNode){
this.node.parentNode.removeChild(this.node);
}
}
},destroy:function(){
if(this.node){
if(this.node.parentNode){
this.node.parentNode.removeChild(this.node);
}
dojo._destroyElement(this.node);
delete this.node;
}
}});
(function(){
dojox.mdnd.areaManager()._dropIndicator=new dojox.mdnd.DropIndicator();
}());
}
if(!dojo._hasResource["dojox.mdnd.dropMode.OverDropMode"]){
dojo._hasResource["dojox.mdnd.dropMode.OverDropMode"]=true;
dojo.provide("dojox.mdnd.dropMode.OverDropMode");
dojo.declare("dojox.mdnd.dropMode.OverDropMode",null,{_oldXPoint:null,_oldYPoint:null,_oldBehaviour:"up",constructor:function(){
this._dragHandler=[dojo.connect(dojox.mdnd.areaManager(),"onDragEnter",function(_82,_83){
var m=dojox.mdnd.areaManager();
if(m._oldIndexArea==-1){
m._oldIndexArea=m._lastValidIndexArea;
}
})];
},addArea:function(_84,_85){
var _86=_84.length,_87=dojo.position(_85.node,true);
_85.coords={"x":_87.x,"y":_87.y};
if(_86==0){
_84.push(_85);
}else{
var x=_85.coords.x;
for(var i=0;i<_86;i++){
if(x<_84[i].coords.x){
for(var j=_86-1;j>=i;j--){
_84[j+1]=_84[j];
}
_84[i]=_85;
break;
}
}
if(i==_86){
_84.push(_85);
}
}
return _84;
},updateAreas:function(_88){
var _89=_88.length;
for(var i=0;i<_89;i++){
this._updateArea(_88[i]);
}
},_updateArea:function(_8a){
var _8b=dojo.position(_8a.node,true);
_8a.coords.x=_8b.x;
_8a.coords.x2=_8b.x+_8b.w;
_8a.coords.y=_8b.y;
},initItems:function(_8c){
dojo.forEach(_8c.items,function(obj){
var _8d=obj.item.node;
var _8e=dojo.position(_8d,true);
var y=_8e.y+_8e.h/2;
obj.y=y;
});
_8c.initItems=true;
},refreshItems:function(_8f,_90,_91,_92){
if(_90==-1){
return;
}else{
if(_8f&&_91&&_91.h){
var _93=_91.h;
if(_8f.margin){
_93+=_8f.margin.t;
}
var _94=_8f.items.length;
for(var i=_90;i<_94;i++){
var _95=_8f.items[i];
if(_92){
_95.y+=_93;
}else{
_95.y-=_93;
}
}
}
}
},getDragPoint:function(_96,_97,_98){
return {"x":_98.x,"y":_98.y};
},getTargetArea:function(_99,_9a,_9b){
var _9c=0;
var x=_9a.x;
var y=_9a.y;
var end=_99.length;
var _9d=0,_9e="right",_9f=false;
if(_9b==-1||arguments.length<3){
_9f=true;
}else{
if(this._checkInterval(_99,_9b,x,y)){
_9c=_9b;
}else{
if(this._oldXPoint<x){
_9d=_9b+1;
}else{
_9d=_9b-1;
end=0;
_9e="left";
}
_9f=true;
}
}
if(_9f){
if(_9e==="right"){
for(var i=_9d;i<end;i++){
if(this._checkInterval(_99,i,x,y)){
_9c=i;
break;
}
}
if(i==end){
_9c=-1;
}
}else{
for(var i=_9d;i>=end;i--){
if(this._checkInterval(_99,i,x,y)){
_9c=i;
break;
}
}
if(i==end-1){
_9c=-1;
}
}
}
this._oldXPoint=x;
return _9c;
},_checkInterval:function(_a0,_a1,x,y){
var _a2=_a0[_a1];
var _a3=_a2.node;
var _a4=_a2.coords;
var _a5=_a4.x;
var _a6=_a4.x2;
var _a7=_a4.y;
var _a8=_a7+_a3.offsetHeight;
if(_a5<=x&&x<=_a6&&_a7<=y&&y<=_a8){
return true;
}
return false;
},getDropIndex:function(_a9,_aa){
var _ab=_a9.items.length;
var _ac=_a9.coords;
var y=_aa.y;
if(_ab>0){
for(var i=0;i<_ab;i++){
if(y<_a9.items[i].y){
return i;
}else{
if(i==_ab-1){
return -1;
}
}
}
}
return -1;
},destroy:function(){
dojo.forEach(this._dragHandler,dojo.disconnect);
}});
(function(){
dojox.mdnd.areaManager()._dropMode=new dojox.mdnd.dropMode.OverDropMode();
}());
}
if(!dojo._hasResource["dojox.mdnd.AutoScroll"]){
dojo._hasResource["dojox.mdnd.AutoScroll"]=true;
dojo.provide("dojox.mdnd.AutoScroll");
dojo.declare("dojox.mdnd.AutoScroll",null,{interval:3,recursiveTimer:10,marginMouse:50,constructor:function(){
this.resizeHandler=dojo.connect(dojo.global,"onresize",this,function(){
this.getViewport();
});
dojo.ready(dojo.hitch(this,"init"));
},init:function(){
this._html=(dojo.isWebKit)?dojo.body():dojo.body().parentNode;
this.getViewport();
},getViewport:function(){
var d=dojo.doc,dd=d.documentElement,w=window,b=dojo.body();
if(dojo.isMozilla){
this._v={"w":dd.clientWidth,"h":w.innerHeight};
}else{
if(!dojo.isOpera&&w.innerWidth){
this._v={"w":w.innerWidth,"h":w.innerHeight};
}else{
if(!dojo.isOpera&&dd&&dd.clientWidth){
this._v={"w":dd.clientWidth,"h":dd.clientHeight};
}else{
if(b.clientWidth){
this._v={"w":b.clientWidth,"h":b.clientHeight};
}
}
}
}
},setAutoScrollNode:function(_ad){
this._node=_ad;
},setAutoScrollMaxPage:function(){
this._yMax=this._html.scrollHeight;
this._xMax=this._html.scrollWidth;
},checkAutoScroll:function(e){
if(this._autoScrollActive){
this.stopAutoScroll();
}
this._y=e.pageY;
this._x=e.pageX;
if(e.clientX<this.marginMouse){
this._autoScrollActive=true;
this._autoScrollLeft(e);
}else{
if(e.clientX>this._v.w-this.marginMouse){
this._autoScrollActive=true;
this._autoScrollRight(e);
}
}
if(e.clientY<this.marginMouse){
this._autoScrollActive=true;
this._autoScrollUp(e);
}else{
if(e.clientY>this._v.h-this.marginMouse){
this._autoScrollActive=true;
this._autoScrollDown();
}
}
},_autoScrollDown:function(){
if(this._timer){
clearTimeout(this._timer);
}
if(this._autoScrollActive&&this._y+this.marginMouse<this._yMax){
this._html.scrollTop+=this.interval;
this._node.style.top=(parseInt(this._node.style.top)+this.interval)+"px";
this._y+=this.interval;
this._timer=setTimeout(dojo.hitch(this,"_autoScrollDown"),this.recursiveTimer);
}
},_autoScrollUp:function(){
if(this._timer){
clearTimeout(this._timer);
}
if(this._autoScrollActive&&this._y-this.marginMouse>0){
this._html.scrollTop-=this.interval;
this._node.style.top=(parseInt(this._node.style.top)-this.interval)+"px";
this._y-=this.interval;
this._timer=setTimeout(dojo.hitch(this,"_autoScrollUp"),this.recursiveTimer);
}
},_autoScrollRight:function(){
if(this._timer){
clearTimeout(this._timer);
}
if(this._autoScrollActive&&this._x+this.marginMouse<this._xMax){
this._html.scrollLeft+=this.interval;
this._node.style.left=(parseInt(this._node.style.left)+this.interval)+"px";
this._x+=this.interval;
this._timer=setTimeout(dojo.hitch(this,"_autoScrollRight"),this.recursiveTimer);
}
},_autoScrollLeft:function(e){
if(this._timer){
clearTimeout(this._timer);
}
if(this._autoScrollActive&&this._x-this.marginMouse>0){
this._html.scrollLeft-=this.interval;
this._node.style.left=(parseInt(this._node.style.left)-this.interval)+"px";
this._x-=this.interval;
this._timer=setTimeout(dojo.hitch(this,"_autoScrollLeft"),this.recursiveTimer);
}
},stopAutoScroll:function(){
if(this._timer){
clearTimeout(this._timer);
}
this._autoScrollActive=false;
},destroy:function(){
dojo.disconnect(this.resizeHandler);
}});
dojox.mdnd.autoScroll=null;
(function(){
dojox.mdnd.autoScroll=new dojox.mdnd.AutoScroll();
}());
}
if(!dojo._hasResource["dojox.layout.GridContainerLite"]){
dojo._hasResource["dojox.layout.GridContainerLite"]=true;
dojo.provide("dojox.layout.GridContainerLite");
dojo.declare("dojox.layout.GridContainerLite",[dijit.layout._LayoutWidget,dijit._Templated],{autoRefresh:true,templateString:dojo.cache("dojox.layout","resources/GridContainer.html","<div id=\"${id}\" class=\"gridContainer\" dojoAttachPoint=\"containerNode\" tabIndex=\"0\" dojoAttachEvent=\"onkeypress:_selectFocus\">\r\n\t<div dojoAttachPoint=\"gridContainerDiv\">\r\n\t\t<table class=\"gridContainerTable\" dojoAttachPoint=\"gridContainerTable\" cellspacing=\"0\" cellpadding=\"0\">\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr dojoAttachPoint=\"gridNode\" >\r\n\t\t\t\t\t\r\n\t\t\t\t</tr>\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t</div>\r\n</div>\r\n"),dragHandleClass:"dojoxDragHandle",nbZones:1,doLayout:true,isAutoOrganized:true,acceptTypes:[],colWidths:"",constructor:function(_ae,_af){
this.acceptTypes=(_ae||{}).acceptTypes||["text"];
this._disabled=true;
},postCreate:function(){
this.inherited(arguments);
this._grid=[];
this._createCells();
this.subscribe("/dojox/mdnd/drop","resizeChildAfterDrop");
this.subscribe("/dojox/mdnd/drag/start","resizeChildAfterDragStart");
this._dragManager=dojox.mdnd.areaManager();
this._dragManager.autoRefresh=this.autoRefresh;
this._dragManager.dragHandleClass=this.dragHandleClass;
if(this.doLayout){
this._border={"h":(dojo.isIE)?dojo._getBorderExtents(this.gridContainerTable).h:0,"w":(dojo.isIE==6)?1:0};
}else{
dojo.style(this.domNode,"overflowY","hidden");
dojo.style(this.gridContainerTable,"height","auto");
}
this.inherited(arguments);
},startup:function(){
if(this._started){
return;
}
if(this.isAutoOrganized){
this._organizeChildren();
}else{
this._organizeChildrenManually();
}
dojo.forEach(this.getChildren(),function(_b0){
_b0.startup();
});
if(this._isShown()){
this.enableDnd();
}
this.inherited(arguments);
},resizeChildAfterDrop:function(_b1,_b2,_b3){
if(this._disabled){
return false;
}
if(dijit.getEnclosingWidget(_b2.node)==this){
var _b4=dijit.byNode(_b1);
if(_b4.resize&&dojo.isFunction(_b4.resize)){
_b4.resize();
}
_b4.set("column",_b1.parentNode.cellIndex);
if(this.doLayout){
var _b5=this._contentBox.h,_b6=dojo.contentBox(this.gridContainerDiv).h;
if(_b6>=_b5){
dojo.style(this.gridContainerTable,"height",(_b5-this._border.h)+"px");
}
}
return true;
}
return false;
},resizeChildAfterDragStart:function(_b7,_b8,_b9){
if(this._disabled){
return false;
}
if(dijit.getEnclosingWidget(_b8.node)==this){
this._draggedNode=_b7;
if(this.doLayout){
dojo.marginBox(this.gridContainerTable,{"h":dojo.contentBox(this.gridContainerDiv).h-this._border.h});
}
return true;
}
return false;
},getChildren:function(){
var _ba=[];
dojo.forEach(this._grid,function(_bb){
_ba=_ba.concat(dojo.query("> [widgetId]",_bb.node).map(dijit.byNode));
});
return _ba;
},_isShown:function(){
if("open" in this){
return this.open;
}else{
var _bc=this.domNode;
return (_bc.style.display!="none")&&(_bc.style.visibility!="hidden")&&!dojo.hasClass(_bc,"dijitHidden");
}
},layout:function(){
if(this.doLayout){
var _bd=this._contentBox;
dojo.marginBox(this.gridContainerTable,{"h":_bd.h-this._border.h});
dojo.contentBox(this.domNode,{"w":_bd.w-this._border.w});
}
dojo.forEach(this.getChildren(),function(_be){
if(_be.resize&&dojo.isFunction(_be.resize)){
_be.resize();
}
});
},onShow:function(){
if(this._disabled){
this.enableDnd();
}
},onHide:function(){
if(!this._disabled){
this.disableDnd();
}
},_createCells:function(){
if(this.nbZones===0){
this.nbZones=1;
}
var _bf=this.acceptTypes.join(","),i=0;
var _c0=this.colWidths||[];
var _c1=[];
var _c2;
var _c3=0;
for(i=0;i<this.nbZones;i++){
if(_c1.length<_c0.length){
_c3+=_c0[i];
_c1.push(_c0[i]);
}else{
if(!_c2){
_c2=(100-_c3)/(this.nbZones-i);
}
_c1.push(_c2);
}
}
i=0;
while(i<this.nbZones){
this._grid.push({"node":dojo.create("td",{"class":"gridContainerZone","accept":_bf,"id":this.id+"_dz"+i,"style":{"width":_c1[i]+"%"}},this.gridNode)});
i++;
}
},_getZonesAttr:function(){
return dojo.query(".gridContainerZone",this.containerNode);
},enableDnd:function(){
var m=this._dragManager;
dojo.forEach(this._grid,function(_c4){
m.registerByNode(_c4.node);
});
m._dropMode.updateAreas(m._areaList);
this._disabled=false;
},disableDnd:function(){
var m=this._dragManager;
dojo.forEach(this._grid,function(_c5){
m.unregister(_c5.node);
});
m._dropMode.updateAreas(m._areaList);
this._disabled=true;
},_organizeChildren:function(){
var _c6=dojox.layout.GridContainerLite.superclass.getChildren.call(this);
var _c7=this.nbZones,_c8=Math.floor(_c6.length/_c7),mod=_c6.length%_c7,i=0;
for(var z=0;z<_c7;z++){
for(var r=0;r<_c8;r++){
this._insertChild(_c6[i],z);
i++;
}
if(mod>0){
try{
this._insertChild(_c6[i],z);
i++;
}
catch(e){
console.error("Unable to insert child in GridContainer",e);
}
mod--;
}else{
if(_c8===0){
break;
}
}
}
},_organizeChildrenManually:function(){
var _c9=dojox.layout.GridContainerLite.superclass.getChildren.call(this),_ca=_c9.length,_cb;
for(var i=0;i<_ca;i++){
_cb=_c9[i];
try{
this._insertChild(_cb,_cb.column-1);
}
catch(e){
console.error("Unable to insert child in GridContainer",e);
}
}
},_insertChild:function(_cc,_cd,p){
var _ce=this._grid[_cd].node,_cf=_ce.childNodes.length;
if(typeof (p)==undefined||p>_cf){
p=_cf;
}
if(this._disabled){
dojo.place(_cc.domNode,_ce,p);
dojo.attr(_cc.domNode,"tabIndex","0");
}else{
if(!_cc.dragRestriction){
this._dragManager.addDragItem(_ce,_cc.domNode,p,true);
}else{
dojo.place(_cc.domNode,_ce,p);
dojo.attr(_cc.domNode,"tabIndex","0");
}
}
_cc.set("column",_cd);
return _cc;
},removeChild:function(_d0){
if(this._disabled){
this.inherited(arguments);
}else{
this._dragManager.removeDragItem(_d0.domNode.parentNode,_d0.domNode);
}
},addService:function(_d1,_d2,p){
dojo.deprecated("addService is deprecated.","Please use  instead.","Future");
this.addChild(_d1,_d2,p);
},addChild:function(_d3,_d4,p){
_d3.domNode.id=_d3.id;
dojox.layout.GridContainerLite.superclass.addChild.call(this,_d3,0);
if(_d4<0||_d4==undefined){
_d4=0;
}
if(p<=0){
p=0;
}
try{
return this._insertChild(_d3,_d4,p);
}
catch(e){
console.error("Unable to insert child in GridContainer",e);
}
return null;
},_setColWidthsAttr:function(_d5){
this.colWidths=dojo.isString(_d5)?_d5.split(","):(dojo.isArray(_d5)?_d5:[_d5]);
if(this._started){
this._updateColumnsWidth();
}
},_updateColumnsWidth:function(_d6){
var _d7=this._grid.length;
var _d8=this.colWidths||[];
var _d9=[];
var _da;
var _db=0;
var i;
for(i=0;i<_d7;i++){
if(_d9.length<_d8.length){
_db+=_d8[i]*1;
_d9.push(_d8[i]);
}else{
if(!_da){
_da=(100-_db)/(this.nbZones-i);
if(_da<0){
_da=100/this.nbZones;
}
}
_d9.push(_da);
_db+=_da*1;
}
}
if(_db>100){
var _dc=100/_db;
for(i=0;i<_d9.length;i++){
_d9[i]*=_dc;
}
}
for(i=0;i<_d7;i++){
this._grid[i].node.style.width=_d9[i]+"%";
}
},_selectFocus:function(_dd){
if(this._disabled){
return;
}
var key=_dd.keyCode,k=dojo.keys,_de=null,_df=dijit.getFocus(),_e0=_df.node,m=this._dragManager,_e1,i,j,r,_e2,_e3,_e4;
if(_e0==this.containerNode){
_e3=this.gridNode.childNodes;
switch(key){
case k.DOWN_ARROW:
case k.RIGHT_ARROW:
_e1=false;
for(i=0;i<_e3.length;i++){
_e2=_e3[i].childNodes;
for(j=0;j<_e2.length;j++){
_de=_e2[j];
if(_de!=null&&_de.style.display!="none"){
dijit.focus(_de);
dojo.stopEvent(_dd);
_e1=true;
break;
}
}
if(_e1){
break;
}
}
break;
case k.UP_ARROW:
case k.LEFT_ARROW:
_e3=this.gridNode.childNodes;
_e1=false;
for(i=_e3.length-1;i>=0;i--){
_e2=_e3[i].childNodes;
for(j=_e2.length;j>=0;j--){
_de=_e2[j];
if(_de!=null&&_de.style.display!="none"){
dijit.focus(_de);
dojo.stopEvent(_dd);
_e1=true;
break;
}
}
if(_e1){
break;
}
}
break;
}
}else{
if(_e0.parentNode.parentNode==this.gridNode){
var _e5=(key==k.UP_ARROW||key==k.LEFT_ARROW)?"lastChild":"firstChild";
var pos=(key==k.UP_ARROW||key==k.LEFT_ARROW)?"previousSibling":"nextSibling";
switch(key){
case k.UP_ARROW:
case k.DOWN_ARROW:
dojo.stopEvent(_dd);
_e1=false;
var _e6=_e0;
while(!_e1){
_e2=_e6.parentNode.childNodes;
var num=0;
for(i=0;i<_e2.length;i++){
if(_e2[i].style.display!="none"){
num++;
}
if(num>1){
break;
}
}
if(num==1){
return;
}
if(_e6[pos]==null){
_de=_e6.parentNode[_e5];
}else{
_de=_e6[pos];
}
if(_de.style.display==="none"){
_e6=_de;
}else{
_e1=true;
}
}
if(_dd.shiftKey){
var _e7=_e0.parentNode;
for(i=0;i<this.gridNode.childNodes.length;i++){
if(_e7==this.gridNode.childNodes[i]){
break;
}
}
_e2=this.gridNode.childNodes[i].childNodes;
for(j=0;j<_e2.length;j++){
if(_de==_e2[j]){
break;
}
}
if(dojo.isMoz||dojo.isWebKit){
i--;
}
_e4=dijit.byNode(_e0);
if(!_e4.dragRestriction){
r=m.removeDragItem(_e7,_e0);
this.addChild(_e4,i,j);
dojo.attr(_e0,"tabIndex","0");
dijit.focus(_e0);
}else{
dojo.publish("/dojox/layout/gridContainer/moveRestriction",[this]);
}
}else{
dijit.focus(_de);
}
break;
case k.RIGHT_ARROW:
case k.LEFT_ARROW:
dojo.stopEvent(_dd);
if(_dd.shiftKey){
var z=0;
if(_e0.parentNode[pos]==null){
if(dojo.isIE&&key==k.LEFT_ARROW){
z=this.gridNode.childNodes.length-1;
}
}else{
if(_e0.parentNode[pos].nodeType==3){
z=this.gridNode.childNodes.length-2;
}else{
for(i=0;i<this.gridNode.childNodes.length;i++){
if(_e0.parentNode[pos]==this.gridNode.childNodes[i]){
break;
}
z++;
}
if(dojo.isMoz||dojo.isWebKit){
z--;
}
}
}
_e4=dijit.byNode(_e0);
var _e8=_e0.getAttribute("dndtype");
if(_e8==null){
if(_e4&&_e4.dndType){
_e8=_e4.dndType.split(/\s*,\s*/);
}else{
_e8=["text"];
}
}else{
_e8=_e8.split(/\s*,\s*/);
}
var _e9=false;
for(i=0;i<this.acceptTypes.length;i++){
for(j=0;j<_e8.length;j++){
if(_e8[j]==this.acceptTypes[i]){
_e9=true;
break;
}
}
}
if(_e9&&!_e4.dragRestriction){
var _ea=_e0.parentNode,_eb=0;
if(k.LEFT_ARROW==key){
var t=z;
if(dojo.isMoz||dojo.isWebKit){
t=z+1;
}
_eb=this.gridNode.childNodes[t].childNodes.length;
}
r=m.removeDragItem(_ea,_e0);
this.addChild(_e4,z,_eb);
dojo.attr(r,"tabIndex","0");
dijit.focus(r);
}else{
dojo.publish("/dojox/layout/gridContainer/moveRestriction",[this]);
}
}else{
var _ec=_e0.parentNode;
while(_de===null){
if(_ec[pos]!==null&&_ec[pos].nodeType!==3){
_ec=_ec[pos];
}else{
if(pos==="previousSibling"){
_ec=_ec.parentNode.childNodes[_ec.parentNode.childNodes.length-1];
}else{
_ec=(dojo.isIE)?_ec.parentNode.childNodes[0]:_ec.parentNode.childNodes[1];
}
}
_de=_ec[_e5];
if(_de&&_de.style.display=="none"){
_e2=_de.parentNode.childNodes;
var _ed=null;
if(pos=="previousSibling"){
for(i=_e2.length-1;i>=0;i--){
if(_e2[i].style.display!="none"){
_ed=_e2[i];
break;
}
}
}else{
for(i=0;i<_e2.length;i++){
if(_e2[i].style.display!="none"){
_ed=_e2[i];
break;
}
}
}
if(!_ed){
_e0=_de;
_ec=_e0.parentNode;
_de=null;
}else{
_de=_ed;
}
}
}
dijit.focus(_de);
}
break;
}
}
}
},destroy:function(){
var m=this._dragManager;
dojo.forEach(this._grid,function(_ee){
m.unregister(_ee.node);
});
this.inherited(arguments);
}});
dojo.extend(dijit._Widget,{column:"1",dragRestriction:false});
}
if(!dojo._hasResource["dojox.layout.GridContainer"]){
dojo._hasResource["dojox.layout.GridContainer"]=true;
dojo.provide("dojox.layout.GridContainer");
dojo.declare("dojox.layout.GridContainer",dojox.layout.GridContainerLite,{hasResizableColumns:true,liveResizeColumns:false,minColWidth:20,minChildWidth:150,mode:"right",isRightFixed:false,isLeftFixed:false,startup:function(){
this.inherited(arguments);
if(this.hasResizableColumns){
for(var i=0;i<this._grid.length-1;i++){
this._createGrip(i);
}
if(!this.getParent()){
dojo.ready(dojo.hitch(this,"_placeGrips"));
}
}
},resizeChildAfterDrop:function(_ef,_f0,_f1){
if(this.inherited(arguments)){
this._placeGrips();
}
},onShow:function(){
this.inherited(arguments);
this._placeGrips();
},resize:function(){
this.inherited(arguments);
if(this._isShown()&&this.hasResizableColumns){
this._placeGrips();
}
},_createGrip:function(_f2){
var _f3=this._grid[_f2],_f4=dojo.create("div",{"class":"gridContainerGrip"},this.domNode);
_f3.grip=_f4;
_f3.gripHandler=[this.connect(_f4,"onmouseover",function(e){
var _f5=false;
for(var i=0;i<this._grid.length-1;i++){
if(dojo.hasClass(this._grid[i].grip,"gridContainerGripShow")){
_f5=true;
break;
}
}
if(!_f5){
dojo.removeClass(e.target,"gridContainerGrip");
dojo.addClass(e.target,"gridContainerGripShow");
}
})[0],this.connect(_f4,"onmouseout",function(e){
if(!this._isResized){
dojo.removeClass(e.target,"gridContainerGripShow");
dojo.addClass(e.target,"gridContainerGrip");
}
})[0],this.connect(_f4,"onmousedown","_resizeColumnOn")[0],this.connect(_f4,"ondblclick","_onGripDbClick")[0]];
},_placeGrips:function(){
var _f6,_f7,_f8=0,_f9;
var _fa=this.domNode.style.overflowY;
dojo.forEach(this._grid,function(_fb){
if(_fb.grip){
_f9=_fb.grip;
if(!_f6){
_f6=_f9.offsetWidth/2;
}
_f8+=dojo.marginBox(_fb.node).w;
dojo.style(_f9,"left",(_f8-_f6)+"px");
if(!_f7){
_f7=dojo.contentBox(this.gridNode).h;
}
if(_f7>0){
dojo.style(_f9,"height",_f7+"px");
}
}
},this);
},_onGripDbClick:function(){
this._updateColumnsWidth(this._dragManager);
this.resize();
},_resizeColumnOn:function(e){
this._activeGrip=e.target;
this._initX=e.pageX;
e.preventDefault();
dojo.body().style.cursor="ew-resize";
this._isResized=true;
var _fc=[];
var _fd;
var i;
for(i=0;i<this._grid.length;i++){
_fc[i]=dojo.contentBox(this._grid[i].node).w;
}
this._oldTabSize=_fc;
for(i=0;i<this._grid.length;i++){
_fd=this._grid[i];
if(this._activeGrip==_fd.grip){
this._currentColumn=_fd.node;
this._currentColumnWidth=_fc[i];
this._nextColumn=this._grid[i+1].node;
this._nextColumnWidth=_fc[i+1];
}
_fd.node.style.width=_fc[i]+"px";
}
var _fe=function(_ff,_100){
var _101=0;
var _102=0;
dojo.forEach(_ff,function(_103){
if(_103.nodeType==1){
var _104=dojo.getComputedStyle(_103);
var _105=(dojo.isIE)?_100:parseInt(_104.minWidth);
_102=_105+parseInt(_104.marginLeft)+parseInt(_104.marginRight);
if(_101<_102){
_101=_102;
}
}
});
return _101;
};
var _106=_fe(this._currentColumn.childNodes,this.minChildWidth);
var _107=_fe(this._nextColumn.childNodes,this.minChildWidth);
var _108=Math.round((dojo.marginBox(this.gridContainerTable).w*this.minColWidth)/100);
this._currentMinCol=_106;
this._nextMinCol=_107;
if(_108>this._currentMinCol){
this._currentMinCol=_108;
}
if(_108>this._nextMinCol){
this._nextMinCol=_108;
}
this._connectResizeColumnMove=dojo.connect(dojo.doc,"onmousemove",this,"_resizeColumnMove");
this._connectOnGripMouseUp=dojo.connect(dojo.doc,"onmouseup",this,"_onGripMouseUp");
},_onGripMouseUp:function(){
dojo.body().style.cursor="default";
dojo.disconnect(this._connectResizeColumnMove);
dojo.disconnect(this._connectOnGripMouseUp);
this._connectOnGripMouseUp=this._connectResizeColumnMove=null;
if(this._activeGrip){
dojo.removeClass(this._activeGrip,"gridContainerGripShow");
dojo.addClass(this._activeGrip,"gridContainerGrip");
}
this._isResized=false;
},_resizeColumnMove:function(e){
e.preventDefault();
if(!this._connectResizeColumnOff){
dojo.disconnect(this._connectOnGripMouseUp);
this._connectOnGripMouseUp=null;
this._connectResizeColumnOff=dojo.connect(dojo.doc,"onmouseup",this,"_resizeColumnOff");
}
var d=e.pageX-this._initX;
if(d==0){
return;
}
if(!(this._currentColumnWidth+d<this._currentMinCol||this._nextColumnWidth-d<this._nextMinCol)){
this._currentColumnWidth+=d;
this._nextColumnWidth-=d;
this._initX=e.pageX;
this._activeGrip.style.left=parseInt(this._activeGrip.style.left)+d+"px";
if(this.liveResizeColumns){
this._currentColumn.style["width"]=this._currentColumnWidth+"px";
this._nextColumn.style["width"]=this._nextColumnWidth+"px";
this.resize();
}
}
},_resizeColumnOff:function(e){
dojo.body().style.cursor="default";
dojo.disconnect(this._connectResizeColumnMove);
dojo.disconnect(this._connectResizeColumnOff);
this._connectResizeColumnOff=this._connectResizeColumnMove=null;
if(!this.liveResizeColumns){
this._currentColumn.style["width"]=this._currentColumnWidth+"px";
this._nextColumn.style["width"]=this._nextColumnWidth+"px";
}
var _109=[],_10a=[],_10b=this.gridContainerTable.clientWidth,node,_10c=false,i;
for(i=0;i<this._grid.length;i++){
node=this._grid[i].node;
if(dojo.isIE){
_109[i]=dojo.marginBox(node).w;
_10a[i]=dojo.contentBox(node).w;
}else{
_109[i]=dojo.contentBox(node).w;
_10a=_109;
}
}
for(i=0;i<_10a.length;i++){
if(_10a[i]!=this._oldTabSize[i]){
_10c=true;
break;
}
}
if(_10c){
var mul=dojo.isIE?100:10000;
for(i=0;i<this._grid.length;i++){
this._grid[i].node.style.width=Math.round((100*mul*_109[i])/_10b)/mul+"%";
}
this.resize();
}
if(this._activeGrip){
dojo.removeClass(this._activeGrip,"gridContainerGripShow");
dojo.addClass(this._activeGrip,"gridContainerGrip");
}
this._isResized=false;
},setColumns:function(_10d){
var z,j;
if(_10d>0){
var _10e=this._grid.length,_10f=_10e-_10d;
if(_10f>0){
var _110=[],zone,_111,end,_112;
if(this.mode=="right"){
end=(this.isLeftFixed&&_10e>0)?1:0;
_111=(this.isRightFixed)?_10e-2:_10e-1;
for(z=_111;z>=end;z--){
_112=0;
zone=this._grid[z].node;
for(j=0;j<zone.childNodes.length;j++){
if(zone.childNodes[j].nodeType==1&&!(zone.childNodes[j].id=="")){
_112++;
break;
}
}
if(_112==0){
_110[_110.length]=z;
}
if(_110.length>=_10f){
this._deleteColumn(_110);
break;
}
}
if(_110.length<_10f){
dojo.publish("/dojox/layout/gridContainer/noEmptyColumn",[this]);
}
}else{
_111=(this.isLeftFixed&&_10e>0)?1:0;
end=(this.isRightFixed)?_10e-1:_10e;
for(z=_111;z<end;z++){
_112=0;
zone=this._grid[z].node;
for(j=0;j<zone.childNodes.length;j++){
if(zone.childNodes[j].nodeType==1&&!(zone.childNodes[j].id=="")){
_112++;
break;
}
}
if(_112==0){
_110[_110.length]=z;
}
if(_110.length>=_10f){
this._deleteColumn(_110);
break;
}
}
if(_110.length<_10f){
dojo.publish("/dojox/layout/gridContainer/noEmptyColumn",[this]);
}
}
}else{
if(_10f<0){
this._addColumn(Math.abs(_10f));
}
}
if(this.hasResizableColumns){
this._placeGrips();
}
}
},_addColumn:function(_113){
var grid=this._grid,_114,node,_115,_116,_117=(this.mode=="right"),_118=this.acceptTypes.join(","),m=this._dragManager;
if(this.hasResizableColumns&&((!this.isRightFixed&&_117)||(this.isLeftFixed&&!_117&&this.nbZones==1))){
this._createGrip(grid.length-1);
}
for(var i=0;i<_113;i++){
node=dojo.create("td",{"class":"gridContainerZone dojoxDndArea","accept":_118,"id":this.id+"_dz"+this.nbZones});
_116=grid.length;
if(_117){
if(this.isRightFixed){
_115=_116-1;
grid.splice(_115,0,{"node":grid[_115].node.parentNode.insertBefore(node,grid[_115].node)});
}else{
_115=_116;
grid.push({"node":this.gridNode.appendChild(node)});
}
}else{
if(this.isLeftFixed){
_115=(_116==1)?0:1;
this._grid.splice(1,0,{"node":this._grid[_115].node.parentNode.appendChild(node,this._grid[_115].node)});
_115=1;
}else{
_115=_116-this.nbZones;
this._grid.splice(_115,0,{"node":grid[_115].node.parentNode.insertBefore(node,grid[_115].node)});
}
}
if(this.hasResizableColumns){
if((!_117&&this.nbZones!=1)||(!_117&&this.nbZones==1&&!this.isLeftFixed)||(_117&&i<_113-1)||(_117&&i==_113-1&&this.isRightFixed)){
this._createGrip(_115);
}
}
m.registerByNode(grid[_115].node);
this.nbZones++;
}
this._updateColumnsWidth(m);
},_deleteColumn:function(_119){
var _11a,grid,_11b,_11c=0,_11d=_119.length,m=this._dragManager;
for(var i=0;i<_11d;i++){
_11b=(this.mode=="right")?_119[i]:_119[i]-_11c;
grid=this._grid[_11b];
if(this.hasResizableColumns&&grid.grip){
dojo.forEach(grid.gripHandler,function(_11e){
dojo.disconnect(_11e);
});
dojo.destroy(this.domNode.removeChild(grid.grip));
grid.grip=null;
}
m.unregister(grid.node);
dojo.destroy(this.gridNode.removeChild(grid.node));
this._grid.splice(_11b,1);
this.nbZones--;
_11c++;
}
var _11f=this._grid[this.nbZones-1];
if(_11f.grip){
dojo.forEach(_11f.gripHandler,dojo.disconnect);
dojo.destroy(this.domNode.removeChild(_11f.grip));
_11f.grip=null;
}
this._updateColumnsWidth(m);
},_updateColumnsWidth:function(_120){
this.inherited(arguments);
_120._dropMode.updateAreas(_120._areaList);
},destroy:function(){
dojo.unsubscribe(this._dropHandler);
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(args){
var _121=this;
dojo.mixin(_121,args);
_121.node=args.node;
_121._showArgs=dojo.mixin({},args);
_121._showArgs.node=_121.node;
_121._showArgs.duration=_121.showDuration;
_121.showAnim=_121.showFunc(_121._showArgs);
_121._hideArgs=dojo.mixin({},args);
_121._hideArgs.node=_121.node;
_121._hideArgs.duration=_121.hideDuration;
_121.hideAnim=_121.hideFunc(_121._hideArgs);
dojo.connect(_121.showAnim,"beforeBegin",dojo.hitch(_121.hideAnim,"stop",true));
dojo.connect(_121.hideAnim,"beforeBegin",dojo.hitch(_121.showAnim,"stop",true));
},show:function(_122){
return this.showAnim.play(_122||0);
},hide:function(_123){
return this.hideAnim.play(_123||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_124={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _125=function(_126){
this._index=-1;
this._animations=_126||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_125,{_onAnimate:function(){
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
},play:function(_127,_128){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_128&&this._current.status()=="playing"){
return this;
}
var _129=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_12a=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_12b=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_129);
d.disconnect(_12a);
d.disconnect(_12b);
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
},gotoPercent:function(_12c,_12d){
this.pause();
var _12e=this.duration*_12c;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_12e){
this._current=a;
return true;
}
_12e-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_12e/this._current.duration,_12d);
}
return this;
},stop:function(_12f){
if(this._current){
if(_12f){
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
d.extend(_125,_124);
dojo.fx.chain=function(_130){
return new _125(_130);
};
var _131=function(_132){
this._animations=_132||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_132,function(a){
var _133=a.duration;
if(a.delay){
_133+=a.delay;
}
if(this.duration<_133){
this.duration=_133;
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
d.extend(_131,{_doAction:function(_134,args){
d.forEach(this._animations,function(a){
a[_134].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_135,args){
var t=this._pseudoAnimation;
t[_135].apply(t,args);
},play:function(_136,_137){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_138,_139){
var ms=this.duration*_138;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_139);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_13a){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_131,_124);
dojo.fx.combine=function(_13b){
return new _131(_13b);
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
var _13c=d.style(node,"height");
return Math.max(_13c,1);
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
if(!dojo._hasResource["dijit.layout._ContentPaneResizeMixin"]){
dojo._hasResource["dijit.layout._ContentPaneResizeMixin"]=true;
dojo.provide("dijit.layout._ContentPaneResizeMixin");
dojo.declare("dijit.layout._ContentPaneResizeMixin",null,{doLayout:true,isContainer:true,isLayoutContainer:true,_startChildren:function(){
dojo.forEach(this.getChildren(),function(_13d){
_13d.startup();
_13d._started=true;
});
},startup:function(){
if(this._started){
return;
}
var _13e=dijit._Contained.prototype.getParent.call(this);
this._childOfLayoutWidget=_13e&&_13e.isLayoutContainer;
this._needLayout=!this._childOfLayoutWidget;
this.inherited(arguments);
this._startChildren();
if(this._isShown()){
this._onShow();
}
if(!this._childOfLayoutWidget){
this.connect(dojo.isIE?this.domNode:dojo.global,"onresize",function(){
this._needLayout=!this._childOfLayoutWidget;
this.resize();
});
}
},_checkIfSingleChild:function(){
var _13f=dojo.query("> *",this.containerNode).filter(function(node){
return node.tagName!=="SCRIPT";
}),_140=_13f.filter(function(node){
return dojo.hasAttr(node,"data-dojo-type")||dojo.hasAttr(node,"dojoType")||dojo.hasAttr(node,"widgetId");
}),_141=dojo.filter(_140.map(dijit.byNode),function(_142){
return _142&&_142.domNode&&_142.resize;
});
if(_13f.length==_140.length&&_141.length==1){
this._singleChild=_141[0];
}else{
delete this._singleChild;
}
dojo.toggleClass(this.containerNode,this.baseClass+"SingleChild",!!this._singleChild);
},resize:function(_143,_144){
if(!this._wasShown&&this.open!==false){
this._onShow();
}
this._resizeCalled=true;
this._scheduleLayout(_143,_144);
},_scheduleLayout:function(_145,_146){
if(this._isShown()){
this._layout(_145,_146);
}else{
this._needLayout=true;
this._changeSize=_145;
this._resultSize=_146;
}
},_layout:function(_147,_148){
if(_147){
dojo.marginBox(this.domNode,_147);
}
var cn=this.containerNode;
if(cn===this.domNode){
var mb=_148||{};
dojo.mixin(mb,_147||{});
if(!("h" in mb)||!("w" in mb)){
mb=dojo.mixin(dojo.marginBox(cn),mb);
}
this._contentBox=dijit.layout.marginBox2contentBox(cn,mb);
}else{
this._contentBox=dojo.contentBox(cn);
}
this._layoutChildren();
delete this._needLayout;
},_layoutChildren:function(){
if(this.doLayout){
this._checkIfSingleChild();
}
if(this._singleChild&&this._singleChild.resize){
var cb=this._contentBox||dojo.contentBox(this.containerNode);
this._singleChild.resize({w:cb.w,h:cb.h});
}else{
dojo.forEach(this.getChildren(),function(_149){
if(_149.resize){
_149.resize();
}
});
}
},_isShown:function(){
if(this._childOfLayoutWidget){
if(this._resizeCalled&&"open" in this){
return this.open;
}
return this._resizeCalled;
}else{
if("open" in this){
return this.open;
}else{
var node=this.domNode,_14a=this.domNode.parentNode;
return (node.style.display!="none")&&(node.style.visibility!="hidden")&&!dojo.hasClass(node,"dijitHidden")&&_14a&&_14a.style&&(_14a.style.display!="none");
}
}
},_onShow:function(){
if(this._needLayout){
this._layout(this._changeSize,this._resultSize);
}
this.inherited(arguments);
this._wasShown=true;
}});
}
if(!dojo._hasResource["dojo.html"]){
dojo._hasResource["dojo.html"]=true;
dojo.provide("dojo.html");
dojo.getObject("html",true,dojo);
(function(){
var _14b=0,d=dojo;
dojo.html._secureForInnerHtml=function(cont){
return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=dojo.empty;
dojo.html._setNodeContent=function(node,cont){
d.empty(node);
if(cont){
if(typeof cont=="string"){
cont=d._toDom(cont,node.ownerDocument);
}
if(!cont.nodeType&&d.isArrayLike(cont)){
for(var _14c=cont.length,i=0;i<cont.length;i=_14c==cont.length?i+1:0){
d.place(cont[i],node,"last");
}
}else{
d.place(cont,node,"last");
}
}
return node;
};
dojo.declare("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,parserScope:dojo._scopeName,startup:true,constructor:function(_14d,node){
dojo.mixin(this,_14d||{});
node=this.node=dojo.byId(this.node||node);
if(!this.id){
this.id=["Setter",(node)?node.id||node.tagName:"",_14b++].join("_");
}
},set:function(cont,_14e){
if(undefined!==cont){
this.content=cont;
}
if(_14e){
this._mixin(_14e);
}
this.onBegin();
this.setContent();
this.onEnd();
return this.node;
},setContent:function(){
var node=this.node;
if(!node){
throw new Error(this.declaredClass+": setContent given no node");
}
try{
node=dojo.html._setNodeContent(node,this.content);
}
catch(e){
var _14f=this.onContentError(e);
try{
node.innerHTML=_14f;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=node;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
dojo.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
dojo.html._emptyNode(this.node);
},onBegin:function(){
var cont=this.content;
if(dojo.isString(cont)){
if(this.cleanContent){
cont=dojo.html._secureForInnerHtml(cont);
}
if(this.extractContent){
var _150=cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_150){
cont=_150[1];
}
}
}
this.empty();
this.content=cont;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.node;
delete this.content;
},onContentError:function(err){
return "Error occured setting content: "+err;
},_mixin:function(_151){
var _152={},key;
for(key in _151){
if(key in _152){
continue;
}
this[key]=_151[key];
}
},_parse:function(){
var _153=this.node;
try{
var _154={};
dojo.forEach(["dir","lang","textDir"],function(name){
if(this[name]){
_154[name]=this[name];
}
},this);
this.parseResults=dojo.parser.parse({rootNode:_153,noStart:!this.startup,inherited:_154,scope:this.parserScope});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(type,err,_155){
var _156=this["on"+type+"Error"].call(this,err);
if(_155){
console.error(_155,err);
}else{
if(_156){
dojo.html._setNodeContent(this.node,_156,true);
}
}
}});
dojo.html.set=function(node,cont,_157){
if(undefined==cont){
console.warn("dojo.html.set: no cont argument provided, using empty string");
cont="";
}
if(!_157){
return dojo.html._setNodeContent(node,cont,true);
}else{
var op=new dojo.html._ContentSetter(dojo.mixin(_157,{content:cont,node:node}));
return op.set();
}
};
})();
}
if(!dojo._hasResource["dijit.layout.ContentPane"]){
dojo._hasResource["dijit.layout.ContentPane"]=true;
dojo.provide("dijit.layout.ContentPane");
dojo.declare("dijit.layout.ContentPane",[dijit._Widget,dijit.layout._ContentPaneResizeMixin],{href:"",extractContent:false,parseOnLoad:true,parserScope:dojo._scopeName,preventCache:false,preload:false,refreshOnShow:false,loadingMessage:"<span class='dijitContentPaneLoading'>${loadingState}</span>",errorMessage:"<span class='dijitContentPaneError'>${errorState}</span>",isLoaded:false,baseClass:"dijitContentPane",ioArgs:{},onLoadDeferred:null,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{title:[]}),stopParser:true,template:false,create:function(_158,_159){
if((!_158||!_158.template)&&_159&&!("href" in _158)&&!("content" in _158)){
var df=dojo.doc.createDocumentFragment();
_159=dojo.byId(_159);
while(_159.firstChild){
df.appendChild(_159.firstChild);
}
_158=dojo.delegate(_158,{content:df});
}
this.inherited(arguments,[_158,_159]);
},postMixInProperties:function(){
this.inherited(arguments);
var _15a=dojo.i18n.getLocalization("dijit","loading",this.lang);
this.loadingMessage=dojo.string.substitute(this.loadingMessage,_15a);
this.errorMessage=dojo.string.substitute(this.errorMessage,_15a);
},buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
this.domNode.title="";
if(!dojo.attr(this.domNode,"role")){
dijit.setWaiRole(this.domNode,"group");
}
},_startChildren:function(){
this.inherited(arguments);
if(this._contentSetter){
dojo.forEach(this._contentSetter.parseResults,function(obj){
if(!obj._started&&!obj._destroyed&&dojo.isFunction(obj.startup)){
obj.startup();
obj._started=true;
}
},this);
}
},setHref:function(href){
dojo.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.","","2.0");
return this.set("href",href);
},_setHrefAttr:function(href){
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(dojo.hitch(this,"onLoad"));
this._set("href",href);
if(this.preload||(this._created&&this._isShown())){
this._load();
}else{
this._hrefChanged=true;
}
return this.onLoadDeferred;
},setContent:function(data){
dojo.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.","","2.0");
this.set("content",data);
},_setContentAttr:function(data){
this._set("href","");
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
if(this._created){
this.onLoadDeferred.addCallback(dojo.hitch(this,"onLoad"));
}
this._setContent(data||"");
this._isDownloaded=false;
return this.onLoadDeferred;
},_getContentAttr:function(){
return this.containerNode.innerHTML;
},cancel:function(){
if(this._xhrDfd&&(this._xhrDfd.fired==-1)){
this._xhrDfd.cancel();
}
delete this._xhrDfd;
this.onLoadDeferred=null;
},uninitialize:function(){
if(this._beingDestroyed){
this.cancel();
}
this.inherited(arguments);
},destroyRecursive:function(_15b){
if(this._beingDestroyed){
return;
}
this.inherited(arguments);
},_onShow:function(){
this.inherited(arguments);
if(this.href){
if(!this._xhrDfd&&(!this.isLoaded||this._hrefChanged||this.refreshOnShow)){
return this.refresh();
}
}
},refresh:function(){
this.cancel();
this.onLoadDeferred=new dojo.Deferred(dojo.hitch(this,"cancel"));
this.onLoadDeferred.addCallback(dojo.hitch(this,"onLoad"));
this._load();
return this.onLoadDeferred;
},_load:function(){
this._setContent(this.onDownloadStart(),true);
var self=this;
var _15c={preventCache:(this.preventCache||this.refreshOnShow),url:this.href,handleAs:"text"};
if(dojo.isObject(this.ioArgs)){
dojo.mixin(_15c,this.ioArgs);
}
var hand=(this._xhrDfd=(this.ioMethod||dojo.xhrGet)(_15c));
hand.addCallback(function(html){
try{
self._isDownloaded=true;
self._setContent(html,false);
self.onDownloadEnd();
}
catch(err){
self._onError("Content",err);
}
delete self._xhrDfd;
return html;
});
hand.addErrback(function(err){
if(!hand.canceled){
self._onError("Download",err);
}
delete self._xhrDfd;
return err;
});
delete this._hrefChanged;
},_onLoadHandler:function(data){
this._set("isLoaded",true);
try{
this.onLoadDeferred.callback(data);
}
catch(e){
console.error("Error "+this.widgetId+" running custom onLoad code: "+e.message);
}
},_onUnloadHandler:function(){
this._set("isLoaded",false);
try{
this.onUnload();
}
catch(e){
console.error("Error "+this.widgetId+" running custom onUnload code: "+e.message);
}
},destroyDescendants:function(){
if(this.isLoaded){
this._onUnloadHandler();
}
var _15d=this._contentSetter;
dojo.forEach(this.getChildren(),function(_15e){
if(_15e.destroyRecursive){
_15e.destroyRecursive();
}
});
if(_15d){
dojo.forEach(_15d.parseResults,function(_15f){
if(_15f.destroyRecursive&&_15f.domNode&&_15f.domNode.parentNode==dojo.body()){
_15f.destroyRecursive();
}
});
delete _15d.parseResults;
}
dojo.html._emptyNode(this.containerNode);
delete this._singleChild;
},_setContent:function(cont,_160){
this.destroyDescendants();
var _161=this._contentSetter;
if(!(_161&&_161 instanceof dojo.html._ContentSetter)){
_161=this._contentSetter=new dojo.html._ContentSetter({node:this.containerNode,_onError:dojo.hitch(this,this._onError),onContentError:dojo.hitch(this,function(e){
var _162=this.onContentError(e);
try{
this.containerNode.innerHTML=_162;
}
catch(e){
console.error("Fatal "+this.id+" could not change content due to "+e.message,e);
}
})});
}
var _163=dojo.mixin({cleanContent:this.cleanContent,extractContent:this.extractContent,parseContent:this.parseOnLoad,parserScope:this.parserScope,startup:false,dir:this.dir,lang:this.lang},this._contentSetterParams||{});
_161.set((dojo.isObject(cont)&&cont.domNode)?cont.domNode:cont,_163);
delete this._contentSetterParams;
if(this.doLayout){
this._checkIfSingleChild();
}
if(!_160){
if(this._started){
this._startChildren();
this._scheduleLayout();
}
this._onLoadHandler(cont);
}
},_onError:function(type,err,_164){
this.onLoadDeferred.errback(err);
var _165=this["on"+type+"Error"].call(this,err);
if(_164){
console.error(_164,err);
}else{
if(_165){
this._setContent(_165,true);
}
}
},onLoad:function(data){
},onUnload:function(){
},onDownloadStart:function(){
return this.loadingMessage;
},onContentError:function(_166){
},onDownloadError:function(_167){
return this.errorMessage;
},onDownloadEnd:function(){
}});
}
if(!dojo._hasResource["dijit.TitlePane"]){
dojo._hasResource["dijit.TitlePane"]=true;
dojo.provide("dijit.TitlePane");
dojo.declare("dijit.TitlePane",[dijit.layout.ContentPane,dijit._Templated,dijit._CssStateMixin],{title:"",open:true,toggleable:true,tabIndex:"0",duration:dijit.defaultDuration,baseClass:"dijitTitlePane",templateString:dojo.cache("dijit","templates/TitlePane.html","<div>\r\n\t<div dojoAttachEvent=\"onclick:_onTitleClick, onkeypress:_onTitleKey\"\r\n\t\t\tclass=\"dijitTitlePaneTitle\" dojoAttachPoint=\"titleBarNode\">\r\n\t\t<div class=\"dijitTitlePaneTitleFocus\" dojoAttachPoint=\"focusNode\">\r\n\t\t\t<img src=\"${_blankGif}\" alt=\"\" dojoAttachPoint=\"arrowNode\" class=\"dijitArrowNode\" role=\"presentation\"\r\n\t\t\t/><span dojoAttachPoint=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\r\n\t\t\t><span dojoAttachPoint=\"titleNode\" class=\"dijitTitlePaneTextNode\"></span>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"dijitTitlePaneContentOuter\" dojoAttachPoint=\"hideNode\" role=\"presentation\">\r\n\t\t<div class=\"dijitReset\" dojoAttachPoint=\"wipeNode\" role=\"presentation\">\r\n\t\t\t<div class=\"dijitTitlePaneContentInner\" dojoAttachPoint=\"containerNode\" role=\"region\" id=\"${id}_pane\">\r\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n"),attributeMap:dojo.delegate(dijit.layout.ContentPane.prototype.attributeMap,{title:{node:"titleNode",type:"innerHTML"},tooltip:{node:"focusNode",type:"attribute",attribute:"title"},id:""}),buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.titleNode,false);
},postCreate:function(){
this.inherited(arguments);
if(this.toggleable){
this._trackMouseState(this.titleBarNode,"dijitTitlePaneTitle");
}
var _168=this.hideNode,_169=this.wipeNode;
this._wipeIn=dojo.fx.wipeIn({node:this.wipeNode,duration:this.duration,beforeBegin:function(){
_168.style.display="";
}});
this._wipeOut=dojo.fx.wipeOut({node:this.wipeNode,duration:this.duration,onEnd:function(){
_168.style.display="none";
}});
},_setOpenAttr:function(open,_16a){
dojo.forEach([this._wipeIn,this._wipeOut],function(_16b){
if(_16b&&_16b.status()=="playing"){
_16b.stop();
}
});
if(_16a){
var anim=this[open?"_wipeIn":"_wipeOut"];
anim.play();
}else{
this.hideNode.style.display=this.wipeNode.style.display=open?"":"none";
}
if(this._started){
if(open){
this._onShow();
}else{
this.onHide();
}
}
this.arrowNodeInner.innerHTML=open?"-":"+";
dijit.setWaiState(this.containerNode,"hidden",open?"false":"true");
dijit.setWaiState(this.focusNode,"pressed",open?"true":"false");
this._set("open",open);
this._setCss();
},_setToggleableAttr:function(_16c){
dijit.setWaiRole(this.focusNode,_16c?"button":"heading");
if(_16c){
dijit.setWaiState(this.focusNode,"controls",this.id+"_pane");
dojo.attr(this.focusNode,"tabIndex",this.tabIndex);
}else{
dojo.removeAttr(this.focusNode,"tabIndex");
}
this._set("toggleable",_16c);
this._setCss();
},_setContentAttr:function(_16d){
if(!this.open||!this._wipeOut||this._wipeOut.status()=="playing"){
this.inherited(arguments);
}else{
if(this._wipeIn&&this._wipeIn.status()=="playing"){
this._wipeIn.stop();
}
dojo.marginBox(this.wipeNode,{h:dojo.marginBox(this.wipeNode).h});
this.inherited(arguments);
if(this._wipeIn){
this._wipeIn.play();
}else{
this.hideNode.style.display="";
}
}
},toggle:function(){
this._setOpenAttr(!this.open,true);
},_setCss:function(){
var node=this.titleBarNode||this.focusNode;
var _16e=this._titleBarClass;
this._titleBarClass="dijit"+(this.toggleable?"":"Fixed")+(this.open?"Open":"Closed");
dojo.replaceClass(node,this._titleBarClass,_16e||"");
this.arrowNodeInner.innerHTML=this.open?"-":"+";
},_onTitleKey:function(e){
if(e.charOrCode==dojo.keys.ENTER||e.charOrCode==" "){
if(this.toggleable){
this.toggle();
}
dojo.stopEvent(e);
}else{
if(e.charOrCode==dojo.keys.DOWN_ARROW&&this.open){
this.containerNode.focus();
e.preventDefault();
}
}
},_onTitleClick:function(){
if(this.toggleable){
this.toggle();
}
},setTitle:function(_16f){
dojo.deprecated("dijit.TitlePane.setTitle() is deprecated.  Use set('title', ...) instead.","","2.0");
this.set("title",_16f);
}});
}
if(!dojo._hasResource["dojox.widget.Portlet"]){
dojo._hasResource["dojox.widget.Portlet"]=true;
dojo.experimental("dojox.widget.Portlet");
dojo.provide("dojox.widget.Portlet");
dojo.declare("dojox.widget.Portlet",[dijit.TitlePane,dijit._Container],{resizeChildren:true,closable:true,_parents:null,_size:null,dragRestriction:false,buildRendering:function(){
this.inherited(arguments);
dojo.style(this.domNode,"visibility","hidden");
},postCreate:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dojoxPortlet");
dojo.removeClass(this.arrowNode,"dijitArrowNode");
dojo.addClass(this.arrowNode,"dojoxPortletIcon dojoxArrowDown");
dojo.addClass(this.titleBarNode,"dojoxPortletTitle");
dojo.addClass(this.hideNode,"dojoxPortletContentOuter");
dojo.addClass(this.domNode,"dojoxPortlet-"+(!this.dragRestriction?"movable":"nonmovable"));
var _170=this;
if(this.resizeChildren){
this.subscribe("/dnd/drop",function(){
_170._updateSize();
});
this.subscribe("/Portlet/sizechange",function(_171){
_170.onSizeChange(_171);
});
this.connect(window,"onresize",function(){
_170._updateSize();
});
var _172=dojo.hitch(this,function(id,_173){
var _174=dijit.byId(id);
if(_174.selectChild){
var s=this.subscribe(id+"-selectChild",function(_175){
var n=_170.domNode.parentNode;
while(n){
if(n==_175.domNode){
_170.unsubscribe(s);
_170._updateSize();
break;
}
n=n.parentNode;
}
});
var _176=dijit.byId(_173);
if(_174&&_176){
_170._parents.push({parent:_174,child:_176});
}
}
});
var _177;
this._parents=[];
for(var p=this.domNode.parentNode;p!=null;p=p.parentNode){
var id=p.getAttribute?p.getAttribute("widgetId"):null;
if(id){
_172(id,_177);
_177=id;
}
}
}
this.connect(this.titleBarNode,"onmousedown",function(evt){
if(dojo.hasClass(evt.target,"dojoxPortletIcon")){
dojo.stopEvent(evt);
return false;
}
return true;
});
this.connect(this._wipeOut,"onEnd",function(){
_170._publish();
});
this.connect(this._wipeIn,"onEnd",function(){
_170._publish();
});
if(this.closable){
this.closeIcon=this._createIcon("dojoxCloseNode","dojoxCloseNodeHover",dojo.hitch(this,"onClose"));
dojo.style(this.closeIcon,"display","");
}
},startup:function(){
if(this._started){
return;
}
var _178=this.getChildren();
this._placeSettingsWidgets();
dojo.forEach(_178,function(_179){
try{
if(!_179.started&&!_179._started){
_179.startup();
}
}
catch(e){
}
});
this.inherited(arguments);
dojo.style(this.domNode,"visibility","visible");
},_placeSettingsWidgets:function(){
dojo.forEach(this.getChildren(),dojo.hitch(this,function(_17a){
if(_17a.portletIconClass&&_17a.toggle&&!_17a.attr("portlet")){
this._createIcon(_17a.portletIconClass,_17a.portletIconHoverClass,dojo.hitch(_17a,"toggle"));
dojo.place(_17a.domNode,this.containerNode,"before");
_17a.attr("portlet",this);
this._settingsWidget=_17a;
}
}));
},_createIcon:function(_17b,_17c,fn){
var icon=dojo.create("div",{"class":"dojoxPortletIcon "+_17b,"waiRole":"presentation"});
dojo.place(icon,this.arrowNode,"before");
this.connect(icon,"onclick",fn);
if(_17c){
this.connect(icon,"onmouseover",function(){
dojo.addClass(icon,_17c);
});
this.connect(icon,"onmouseout",function(){
dojo.removeClass(icon,_17c);
});
}
return icon;
},onClose:function(evt){
dojo.style(this.domNode,"display","none");
},onSizeChange:function(_17d){
if(_17d==this){
return;
}
this._updateSize();
},_updateSize:function(){
if(!this.open||!this._started||!this.resizeChildren){
return;
}
if(this._timer){
clearTimeout(this._timer);
}
this._timer=setTimeout(dojo.hitch(this,function(){
var size={w:dojo.style(this.domNode,"width"),h:dojo.style(this.domNode,"height")};
for(var i=0;i<this._parents.length;i++){
var p=this._parents[i];
var sel=p.parent.selectedChildWidget;
if(sel&&sel!=p.child){
return;
}
}
if(this._size){
if(this._size.w==size.w&&this._size.h==size.h){
return;
}
}
this._size=size;
var fns=["resize","layout"];
this._timer=null;
var kids=this.getChildren();
dojo.forEach(kids,function(_17e){
for(var i=0;i<fns.length;i++){
if(dojo.isFunction(_17e[fns[i]])){
try{
_17e[fns[i]]();
}
catch(e){
}
break;
}
}
});
this.onUpdateSize();
}),100);
},onUpdateSize:function(){
},_publish:function(){
dojo.publish("/Portlet/sizechange",[this]);
},_onTitleClick:function(evt){
if(evt.target==this.arrowNode){
this.inherited(arguments);
}
},addChild:function(_17f){
this._size=null;
this.inherited(arguments);
if(this._started){
this._placeSettingsWidgets();
this._updateSize();
}
if(this._started&&!_17f.started&&!_17f._started){
_17f.startup();
}
},destroyDescendants:function(_180){
this.inherited(arguments);
if(this._settingsWidget){
this._settingsWidget.destroyRecursive(_180);
}
},destroy:function(){
if(this._timer){
clearTimeout(this._timer);
}
this.inherited(arguments);
},_setCss:function(){
this.inherited(arguments);
dojo.style(this.arrowNode,"display",this.toggleable?"":"none");
}});
dojo.declare("dojox.widget.PortletSettings",[dijit._Container,dijit.layout.ContentPane],{portletIconClass:"dojoxPortletSettingsIcon",portletIconHoverClass:"dojoxPortletSettingsIconHover",postCreate:function(){
dojo.style(this.domNode,"display","none");
dojo.addClass(this.domNode,"dojoxPortletSettingsContainer");
dojo.removeClass(this.domNode,"dijitContentPane");
},_setPortletAttr:function(_181){
this.portlet=_181;
},toggle:function(){
var n=this.domNode;
if(dojo.style(n,"display")=="none"){
dojo.style(n,{"display":"block","height":"1px","width":"auto"});
dojo.fx.wipeIn({node:n}).play();
}else{
dojo.fx.wipeOut({node:n,onEnd:dojo.hitch(this,function(){
dojo.style(n,{"display":"none","height":"","width":""});
})}).play();
}
}});
dojo.declare("dojox.widget.PortletDialogSettings",dojox.widget.PortletSettings,{dimensions:null,constructor:function(_182,node){
this.dimensions=_182.dimensions||[300,100];
},toggle:function(){
if(!this.dialog){
dojo["require"]("dijit.Dialog");
this.dialog=new dijit.Dialog({title:this.title});
dojo.body().appendChild(this.dialog.domNode);
this.dialog.containerNode.appendChild(this.domNode);
dojo.style(this.dialog.domNode,{"width":this.dimensions[0]+"px","height":this.dimensions[1]+"px"});
dojo.style(this.domNode,"display","");
}
if(this.dialog.open){
this.dialog.hide();
}else{
this.dialog.show(this.domNode);
}
}});
}
if(!dojo._hasResource["dijit.form._FormMixin"]){
dojo._hasResource["dijit.form._FormMixin"]=true;
dojo.provide("dijit.form._FormMixin");
dojo.declare("dijit.form._FormMixin",null,{state:"",reset:function(){
dojo.forEach(this.getDescendants(),function(_183){
if(_183.reset){
_183.reset();
}
});
},validate:function(){
var _184=false;
return dojo.every(dojo.map(this.getDescendants(),function(_185){
_185._hasBeenBlurred=true;
var _186=_185.disabled||!_185.validate||_185.validate();
if(!_186&&!_184){
dojo.window.scrollIntoView(_185.containerNode||_185.domNode);
_185.focus();
_184=true;
}
return _186;
}),function(item){
return item;
});
},setValues:function(val){
dojo.deprecated(this.declaredClass+"::setValues() is deprecated. Use set('value', val) instead.","","2.0");
return this.set("value",val);
},_setValueAttr:function(obj){
var map={};
dojo.forEach(this.getDescendants(),function(_187){
if(!_187.name){
return;
}
var _188=map[_187.name]||(map[_187.name]=[]);
_188.push(_187);
});
for(var name in map){
if(!map.hasOwnProperty(name)){
continue;
}
var _189=map[name],_18a=dojo.getObject(name,false,obj);
if(_18a===undefined){
continue;
}
if(!dojo.isArray(_18a)){
_18a=[_18a];
}
if(typeof _189[0].checked=="boolean"){
dojo.forEach(_189,function(w,i){
w.set("value",dojo.indexOf(_18a,w.value)!=-1);
});
}else{
if(_189[0].multiple){
_189[0].set("value",_18a);
}else{
dojo.forEach(_189,function(w,i){
w.set("value",_18a[i]);
});
}
}
}
},getValues:function(){
dojo.deprecated(this.declaredClass+"::getValues() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_getValueAttr:function(){
var obj={};
dojo.forEach(this.getDescendants(),function(_18b){
var name=_18b.name;
if(!name||_18b.disabled){
return;
}
var _18c=_18b.get("value");
if(typeof _18b.checked=="boolean"){
if(/Radio/.test(_18b.declaredClass)){
if(_18c!==false){
dojo.setObject(name,_18c,obj);
}else{
_18c=dojo.getObject(name,false,obj);
if(_18c===undefined){
dojo.setObject(name,null,obj);
}
}
}else{
var ary=dojo.getObject(name,false,obj);
if(!ary){
ary=[];
dojo.setObject(name,ary,obj);
}
if(_18c!==false){
ary.push(_18c);
}
}
}else{
var prev=dojo.getObject(name,false,obj);
if(typeof prev!="undefined"){
if(dojo.isArray(prev)){
prev.push(_18c);
}else{
dojo.setObject(name,[prev,_18c],obj);
}
}else{
dojo.setObject(name,_18c,obj);
}
}
});
return obj;
},isValid:function(){
return this.state=="";
},onValidStateChange:function(_18d){
},_getState:function(){
var _18e=dojo.map(this._descendants,function(w){
return w.get("state")||"";
});
return dojo.indexOf(_18e,"Error")>=0?"Error":dojo.indexOf(_18e,"Incomplete")>=0?"Incomplete":"";
},disconnectChildren:function(){
dojo.forEach(this._childConnections||[],dojo.hitch(this,"disconnect"));
dojo.forEach(this._childWatches||[],function(w){
w.unwatch();
});
},connectChildren:function(_18f){
var _190=this;
this.disconnectChildren();
this._descendants=this.getDescendants();
var set=_18f?function(name,val){
_190[name]=val;
}:dojo.hitch(this,"_set");
set("value",this.get("value"));
set("state",this._getState());
var _191=(this._childConnections=[]),_192=(this._childWatches=[]);
dojo.forEach(dojo.filter(this._descendants,function(item){
return item.validate;
}),function(_193){
dojo.forEach(["state","disabled"],function(attr){
_192.push(_193.watch(attr,function(attr,_194,_195){
_190.set("state",_190._getState());
}));
});
});
var _196=function(){
if(_190._onChangeDelayTimer){
clearTimeout(_190._onChangeDelayTimer);
}
_190._onChangeDelayTimer=setTimeout(function(){
delete _190._onChangeDelayTimer;
_190._set("value",_190.get("value"));
},10);
};
dojo.forEach(dojo.filter(this._descendants,function(item){
return item.onChange;
}),function(_197){
_191.push(_190.connect(_197,"onChange",_196));
_192.push(_197.watch("disabled",_196));
});
},startup:function(){
this.inherited(arguments);
this.connectChildren(true);
this.watch("state",function(attr,_198,_199){
this.onValidStateChange(_199=="");
});
},destroy:function(){
this.disconnectChildren();
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dijit._DialogMixin"]){
dojo._hasResource["dijit._DialogMixin"]=true;
dojo.provide("dijit._DialogMixin");
dojo.declare("dijit._DialogMixin",null,{attributeMap:dijit._Widget.prototype.attributeMap,execute:function(_19a){
},onCancel:function(){
},onExecute:function(){
},_onSubmit:function(){
this.onExecute();
this.execute(this.get("value"));
},_getFocusItems:function(){
var _19b=dijit._getTabNavigable(this.containerNode);
this._firstFocusItem=_19b.lowest||_19b.first||this.closeButtonNode||this.domNode;
this._lastFocusItem=_19b.last||_19b.highest||this._firstFocusItem;
}});
}
if(!dojo._hasResource["dijit.TooltipDialog"]){
dojo._hasResource["dijit.TooltipDialog"]=true;
dojo.provide("dijit.TooltipDialog");
dojo.declare("dijit.TooltipDialog",[dijit.layout.ContentPane,dijit._Templated,dijit.form._FormMixin,dijit._DialogMixin],{title:"",doLayout:false,autofocus:true,baseClass:"dijitTooltipDialog",_firstFocusItem:null,_lastFocusItem:null,templateString:dojo.cache("dijit","templates/TooltipDialog.html","<div role=\"presentation\" tabIndex=\"-1\">\r\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\r\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" dojoAttachPoint=\"containerNode\" role=\"dialog\"></div>\r\n\t</div>\r\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\"></div>\r\n</div>\r\n"),_setTitleAttr:function(_19c){
this.containerNode.title=_19c;
this._set("title",_19c);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.containerNode,"onkeypress","_onKey");
},orient:function(node,_19d,_19e){
var newC="dijitTooltipAB"+(_19e.charAt(1)=="L"?"Left":"Right")+" dijitTooltip"+(_19e.charAt(0)=="T"?"Below":"Above");
dojo.replaceClass(this.domNode,newC,this._currentOrientClass||"");
this._currentOrientClass=newC;
},focus:function(){
this._getFocusItems(this.containerNode);
dijit.focus(this._firstFocusItem);
},onOpen:function(pos){
this.orient(this.domNode,pos.aroundCorner,pos.corner);
this._onShow();
},onClose:function(){
this.onHide();
},_onKey:function(evt){
var node=evt.target;
var dk=dojo.keys;
if(evt.charOrCode===dk.TAB){
this._getFocusItems(this.containerNode);
}
var _19f=(this._firstFocusItem==this._lastFocusItem);
if(evt.charOrCode==dk.ESCAPE){
setTimeout(dojo.hitch(this,"onCancel"),0);
dojo.stopEvent(evt);
}else{
if(node==this._firstFocusItem&&evt.shiftKey&&evt.charOrCode===dk.TAB){
if(!_19f){
dijit.focus(this._lastFocusItem);
}
dojo.stopEvent(evt);
}else{
if(node==this._lastFocusItem&&evt.charOrCode===dk.TAB&&!evt.shiftKey){
if(!_19f){
dijit.focus(this._firstFocusItem);
}
dojo.stopEvent(evt);
}else{
if(evt.charOrCode===dk.TAB){
evt.stopPropagation();
}
}
}
}
}});
}
if(!dojo._hasResource["wm.base.widget.Dashboard"]){
dojo._hasResource["wm.base.widget.Dashboard"]=true;
dojo.provide("wm.base.widget.Dashboard");
dojo.declare("wm.Dashboard",wm.Control,{margin:4,width:"100%",height:"100%",dojoObj:null,hasResizableColumns:false,nbZones:3,allowAutoScroll:true,withHandles:true,minChildWidth:200,minColWidth:10,saveInCookie:true,portlets:null,dijitPortlets:null,init:function(){
if(!this.portlets){
this.portlets=[];
}
if(!this.dijitPortlets){
this.dijitPortlets=[];
}
this.inherited(arguments);
wm.requireCss("lib.dojo.dojox.layout.resources.GridContainer");
wm.requireCss("lib.dojo.dojox.widget.Portlet.Portlet");
},postInit:function(){
this.inherited(arguments);
this.initAddDialog();
this.bcPortlets(this.portlets);
this.portletsObj={};
dojo.forEach(this.portlets,function(p){
this.portletsObj[p.id]=p;
},this);
dojo.addOnLoad(dojo.hitch(this,"renderDojoObj"));
},createAddDialog:function(){
this.addDialog=new wm.Dialog({owner:this,useContainerWidget:true,useButtonBar:true,width:"350px",height:"90px",title:"",modal:true,corner:"tl"});
this.addDialog.containerWidget.setVerticalAlign("middle");
this.selectEditor=new wm.SelectMenu({owner:this,parent:this.addDialog.containerWidget,"caption":wm.getDictionaryItem("wm.Dashboard.ADD_DIALOG_SELECT_CAPTION"),"display":"Select","readonly":false,"width":"250px",captionSize:wm.getDictionaryItem("wm.Dashboard.ADD_DIALOG_SELECT_CAPTION_SIZE"),required:true});
this.okButton=new wm.Button({owner:this,"height":"100%","width":"60px","caption":wm.getDictionaryItem("wm.Dashboard.ADD_DIALOG_ADD_CAPTION"),parent:this.addDialog.buttonBar});
this.connect(this.selectEditor,"onEnterKeyPress",this,"_onOkClick");
this.cancelButton=new wm.Button({owner:this,"height":"100%","width":wm.getDictionaryItem("wm.Dashboard.ADD_DIALOG_CANCEL_WIDTH"),"caption":wm.getDictionaryItem("wm.Dashboard.ADD_DIALOG_CANCEL_CAPTION"),parent:this.addDialog.buttonBar});
},initAddDialog:function(){
if(this.isDesignLoaded()){
return;
}
if(!this.addDialog){
this.createAddDialog();
}
var e=this.selectEditor;
var _1a0=[];
dojo.forEach(this.portlets,function(obj){
_1a0.push({name:obj.title,dataValue:obj});
});
var ds=e.dataSet=new wm.Variable({name:"optionsVar",owner:e,type:"EntryData"});
ds.setData(_1a0);
e.displayField="name";
e.dataField="dataValue";
e.createEditor();
dojo.connect(this.okButton,"onclick",this,"_onOkClick");
dojo.connect(this.cancelButton,"onclick",this,"_onCancelClick");
},_onOkClick:function(){
var _1a1=this.selectEditor.getDataValue();
_1a1.isOpen=true;
if(_1a1){
this.addPortlet(_1a1);
this.updateClosedList(_1a1.id,false);
}
this.closeDialog();
},_onCancelClick:function(){
this.closeDialog();
},update:function(e){
if(e&&(e.currentTarget||e.target)){
this.openDialog(e.currentTarget||e.target);
}
},closeDialog:function(){
this.addDialog.hide();
},openDialog:function(_1a2){
this.addDialog.fixPositionNode=_1a2;
this.addDialog.show();
},renderBounds:function(){
this.inherited(arguments);
this.resizeDijit();
this.updatePageContainerBounds();
},updatePageContainerBounds:function(){
wm.job(this.getRuntimeId()+".updatePageContainerBounds",10,dojo.hitch(this,function(){
for(var i=0;i<this.dijitPortlets.length;i++){
var p=this.dijitPortlets[i];
if(p.wm_pageContainer&&p.wm_pageContainer.domNode&&p.wm_pageContainer.domNode.parentNode){
if(p.wm_pageContainer.page&&p.wm_pageContainer.page.root){
if(String(p.wm_pageContainer.page.root.height).match(/\%/)){
p.wm_pageContainer.page.root.setHeight("250px");
}
var c=dojo.coords(p.wm_pageContainer.domNode.parentNode);
p.wm_pageContainer.setBounds(null,null,c.w-2,c.h-4);
p.wm_pageContainer.reflow();
}
}
}
}));
},resizeDijit:function(){
if(this.dojoObj){
this.dojoObj.resize(dojo.contentBox(this.domNode));
}
},renderDojoObj:function(){
if(this.dojoObj!=null){
this.dojoObj.destroy();
}
var _1a3={acceptTypes:["Portlet"],handleClasses:["dijitTitlePaneTitle"],isAutoOrganized:false,hasResizableColumns:this.hasResizableColumns,nbZones:this.nbZones,allowAutoScroll:this.allowAutoScroll,withHandles:this.withHandles,minChildWidth:this.minChildWidth,minColWidth:this.minColWidth,style:"width:100%;height:100%;"};
this.dojoObj=new dojox.layout.GridContainer(_1a3,dojo.create("div",{style:"width:100%;height:100%;"},this.domNode));
this.connectDojoEvents();
this.dojoRenderer();
this.renderPortlets();
},dojoRenderer:function(){
if(!this.dojoObj){
return;
}
this.dojoObj.startup();
},customGetPortletsCookie:function(){
return dojo.cookie(this.getId()+"_portlets");
},customSavePortletsCookie:function(data,_1a4){
dojo.cookie(this.getId()+"_portlets",data,_1a4);
},customGetClosedPortletsCookie:function(){
return dojo.cookie(this.getId()+"_closed_portlets")||"[]";
},customSaveClosedPortletsCookie:function(data,_1a5){
dojo.cookie(this.getId()+"_closed_portlets",data,_1a5);
},renderPortlets:function(){
var _1a6={},_1a7=[],_1a8=[];
dojo.forEach(this.portlets,function(p){
if(p.isOpen){
_1a6[p.id]=p;
}
},this);
if(!this.isDesignLoaded()&&this.saveInCookie){
var _1a9=this.customGetPortletsCookie();
if(_1a9&&_1a9!=""){
_1a7=dojo.fromJson(_1a9);
this.bcPortlets(_1a7);
dojo.forEach(_1a7,function(p){
var _1aa=this.portletsObj[p.id];
if(_1aa){
_1a6[p.id]=dojo.mixin({},_1aa,{x:p.x,y:p.y,isOpen:true});
}
},this);
}
var _1ab=this.customGetClosedPortletsCookie();
if(_1ab&&_1ab!=""){
_1a8=dojo.fromJson(_1ab);
dojo.forEach(_1a8,function(pId){
var _1ac=this.portletsObj[pId];
if(_1ac){
_1a6[pId]=dojo.mixin({},_1ac,{isOpen:false});
}
},this);
}
}
var _1ad=[];
for(var i in _1a6){
_1ad.push(_1a6[i]);
}
if(!this.isDesignLoaded()){
this.onBeforeRenderPortlet(_1ad);
}
for(var i=0;i<_1ad.length;i++){
this.addPortlet(_1ad[i]);
}
},onBeforeRenderPortlet:function(_1ae){
},connectDojoEvents:function(){
},addPortlet:function(_1af,_1b0){
if(!_1af.isOpen){
return;
}
var _1b1={"title":_1af.title,"dndType":"Portlet","closable":_1af.isClosable};
var _1b2=new dojox.widget.Portlet(_1b1,dojo.create("div"));
_1b2.wmProps=_1af;
if(this.isDesignLoaded()){
_1af.portletId=_1b2.id;
_1b2.closeIcon.style.display=_1af.isClosable?"block":"none";
}
_1b2.containerNode.style.padding="0px";
this.dojoObj.addService(_1b2,_1af.x||0,_1af.y||0);
_1b2.wm_pageContainer=new wm.PageContainer({loadParentFirst:false,owner:this,parentNode:_1b2.containerNode,isRelativePositioned:true});
if(_1af.page){
_1b2.wm_pageContainer.setPageName(_1af.page);
this.updatePageContainerBounds();
}
if(!this.isDesignLoaded()){
dojo.connect(_1b2,"onClose",this,"portletClosed");
_1b2.subscribe("/dojox/mdnd/drop",dojo.hitch(this,"_onDashboardChange"));
this._onDashboardChange();
}
if(_1b0!==undefined){
wm.Array.insertElementAt(this.dijitPortlets,_1b2,_1b0);
}else{
this.dijitPortlets.push(_1b2);
}
return _1af;
},addNewPortlet:function(_1b3){
_1b3.id=this.getNewPortletId(_1b3.id);
_1b3.title=this.getPortletTitleFromId(_1b3.id);
this.addPortlet(_1b3);
return _1b3;
},getNewPortletId:function(inId){
inId=inId.toLowerCase().replace(/ /g,"_");
if(!this.pIds){
this.pIds={};
dojo.forEach(this.portlets,function(p){
this.pIds[p.id]=true;
},this);
}
if(!this.pIds[inId]){
this.pIds[inId]=true;
return inId;
}
var c=1;
while(this.pIds[inId+"_"+c]){
c++;
}
this.pIds[inId+"_"+c]=true;
return inId+"_"+c;
},portletClosed:function(e){
var p=dijit.getEnclosingWidget(e.target);
if(p){
var _1b4=p.wmProps;
this.updateClosedList(_1b4.id,true);
if(p.wm_pageContainer){
p.wm_pageContainer.destroy();
}
p.destroy();
}
this._onDashboardChange(e);
},updateClosedList:function(id,_1b5){
if(!this.saveInCookie){
return;
}
if(!this.closedList){
var _1b6=this.customGetClosedPortletsCookie();
this.closedList=dojo.fromJson(_1b6);
}
if(!this.closedList){
this.closedList=[];
}
if((_1b5&&dojo.indexOf(this.closedList,id)!=-1)||(!_1b5&&dojo.indexOf(this.closedList,id)==-1)){
return;
}
if(_1b5){
this.closedList.push(id);
}else{
while(dojo.indexOf(this.closedList,id)!=-1){
var idx=dojo.indexOf(this.closedList,id);
this.closedList.splice(idx,1);
}
}
this.customSaveClosedPortletsCookie(dojo.toJson(this.closedList),{expires:5});
},_onDashboardChange:function(e){
var _1b7=this.updatePortletXY();
if(this.saveInCookie){
this.customSavePortletsCookie(dojo.toJson(_1b7),{expires:5});
}else{
this.customSavePortletsCookie(null,{expires:-1});
}
this.onDashboardChange(_1b7);
},onDashboardChange:function(_1b8){
},_togglePortlet:function(evt){
var p=dijit.getEnclosingWidget(evt.originalTarget);
dojo.toggleDOM(p.containerNode);
},destroyPortlet:function(_1b9){
var p=dijit.byId(_1b9.portletId);
delete _1b9.portletId;
if(p){
p.destroy();
}
},updatePortletXY:function(){
this.portletXY={};
var _1ba=this;
var _1bb=[];
dojo.forEach(this.dojoObj._grid,function(col,x){
dojo.forEach(col.node.childNodes,function(_1bc,y){
var _1bd=dijit.getEnclosingWidget(_1bc);
var _1be=_1bd.wmProps;
if(_1bd){
_1ba.portletXY[_1bd.id]={x:x,y:y};
_1be.x=x;
_1be.y=y;
_1bb.push(_1be);
}
});
});
return _1bb;
},destroy:function(){
this.inherited(arguments);
if(this.addDialog){
this.addDialog.destroy();
delete this.addDialog;
}
},bcPortlets:function(_1bf){
dojo.forEach(_1bf,function(p){
if(p.id){
return;
}
p.id=this.getPortletIdFromTitle(p.title);
},this);
},getPortletIdFromTitle:function(_1c0){
if(!_1c0){
return "";
}
return _1c0.replace(/ /g,"_");
},getPortletTitleFromId:function(pId){
return pId.replace(/_/g," ");
}});
dojo.toggleDOM=function(_1c1,_1c2){
var n=_1c1;
if(dojo.style(n,"display")=="none"){
if(_1c2){
dojo.style(n,{"display":"block","height":"1px","width":"auto"});
dojo.fx.wipeIn({node:n}).play();
}else{
dojo.style(n,{"display":"block"});
}
}else{
if(_1c2){
dojo.fx.wipeOut({node:n,onEnd:dojo.hitch(this,function(){
dojo.style(n,{"display":"none","height":"","width":""});
})}).play();
}else{
dojo.style(n,{"display":"none"});
}
}
};
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_dashboard",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
