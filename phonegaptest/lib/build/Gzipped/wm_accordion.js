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

dojo.provide("wm.compressed.wm_accordion");
if(!dojo._hasResource["wm.base.widget.Layers.AccordionDecorator"]){
dojo._hasResource["wm.base.widget.Layers.AccordionDecorator"]=true;
dojo.provide("wm.base.widget.Layers.AccordionDecorator");
dojo.declare("wm.AccordionDecorator",wm.LayersDecorator,{decorationClass:"wmaccordion",captionBorder:0,captionBorderColor:"",decorateLayer:function(_1,_2){
this.inherited(arguments);
this.createHeader(_1,_2);
},createHeader:function(_3,_4){
var _5=_3.parent.captionHeight;
var p=this.decoree.client;
var h=_3.header=new wm.Label({noSizeNode:true,caption:_3.caption,width:"100%",margin:"0,0,2,0",height:_5+"px",padding:"0,4,0,4",_classes:{domNode:["wmaccordion-header"]},showing:_3.showing,parent:p,owner:p,border:this.decoree.captionBorder!==undefined?this.decoree.captionBorder:this.captionBorder,borderColor:this.decoree.captionBorderColor!==undefined?this.decoree.captionBorderColor:this.captionBorderColor,onclick:dojo.hitch(this,"headerClicked",_3)});
p.moveControl(h,_4*2);
dojo.addClass(_3.domNode,"wmaccordion-content");
},headerClicked:function(_6,e){
var d=this.decoree;
if(d.isDesignLoaded()){
dojo.stopEvent(e);
}
d.setProp(_6.active&&(d.multiActive||d._allowClickClose)?"layerInactive":"layer",_6);
_6.focusFirstEditor();
},getNewLayerIndex:function(_7){
for(var i=0,_8=this.decoree.layers,l;(l=_8[i]);i++){
if(l!=_7&&l.active){
return i;
}
}
},deactivateLayer:function(_9){
if(_9.header){
var m=_9.header.marginExtents;
var _a=m.t+","+m.r+",2,"+m.l;
_9.header.setMargin(_a);
}
var _b=this.getNewLayerIndex(_9);
if(_b!=undefined||_9.parent.multiActive||_9.parent._allowClickClose){
this.setLayerActive(_9,false);
var d=this.decoree;
d.layerIndex=_b;
d.reflow();
}
},activateLayer:function(_c){
if(_c.header){
var m=_c.header.marginExtents;
var _d=m.t+","+m.r+",0,"+m.l;
_c.header.setMargin(_d);
}
var d=this.decoree;
if(d.multiActive&&!d._loading){
this.setLayerActive(_c,true);
d.reflow();
}else{
this.inherited(arguments);
}
},undecorateLayer:function(_e,_f){
_e.header.destroy();
dojo.removeClass(_e.domNode,"wmaccordion-content");
},setLayerShowing:function(_10,_11){
_10.header.setShowing(_11);
this.inherited(arguments);
_10.domNode.style.display=_10.active&&_10.showing?"":"none";
},setLayerActive:function(_12,_13){
dojo[_13?"removeClass":"addClass"](_12.header.domNode,"wmaccordion-collapsed");
this.inherited(arguments);
},applyLayerCaption:function(_14){
if(this.decoree.arrowsOnLeft){
_14.header.setCaption("<span class='accordionArrowNode accordionOnLeftArrowNode'></span>"+_14.caption);
}else{
_14.header.setCaption(_14.caption+"<span class='accordionArrowNode'></span>");
}
},moveLayerIndex:function(_15,_16){
var d=this.decoree,_17=d.client,l=d.getLayer(_15);
_17.removeControl(l);
_17.removeControl(l.header);
_17.insertControl(l.header,_15*2);
_17.insertControl(l,_15*2+1);
}});
}
if(!dojo._hasResource["wm.base.widget.AccordionLayers"]){
dojo._hasResource["wm.base.widget.AccordionLayers"]=true;
dojo.provide("wm.base.widget.AccordionLayers");
dojo.declare("wm.AccordionLayers",wm.Layers,{multiActive:false,themeStyleType:"ContentPanel",layersType:"Accordion",captionHeight:26,dndTargetName:"",arrowsOnLeft:false,setCaptionHeight:function(_18){
this.captionHeight=_18;
for(var i=0;i<this.layers.length;i++){
this.layers[i].header.setHeight(_18+"px");
}
},setBorderColor:function(_19){
this.inherited(arguments);
for(var i=0;i<this.layers.length;i++){
this.layers[i].setBorderColor(this.borderColor);
}
}});
}
