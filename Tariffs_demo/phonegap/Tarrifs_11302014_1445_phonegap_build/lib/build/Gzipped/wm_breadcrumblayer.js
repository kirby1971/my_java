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

dojo.provide("wm.compressed.wm_breadcrumblayer");
if(!dojo._hasResource["wm.base.widget.Layers.BreadcrumbDecorator"]){
dojo._hasResource["wm.base.widget.Layers.BreadcrumbDecorator"]=true;
dojo.provide("wm.base.widget.Layers.BreadcrumbDecorator");
dojo.declare("wm.BreadcrumbDecorator",wm.TabsDecorator,{decorationClass:"wmbreadcrumblayers",decoratorPadding:"2",setLayerActive:function(_1,_2){
var _3=!_1._isShowing;
this.inherited(arguments);
if(_1._isDesignLoaded||this.decoree._cupdating){
return;
}
var _4=this.decoree.layers;
if(_2){
if(!_3){
var _5=_1.getIndex();
for(var i=_4.length-1;i>_5;i--){
if(_4[i].showing){
break;
}
}
if(i>_5&&!this.decoree._isDesignLoaded){
this.decoree.moveLayerIndex(_1,i+1);
}
_1.show();
if(_1.showing){
_1.domNode.style.display="";
_1.reflow();
}
}else{
for(var i=_1.getIndex()+1;i<_4.length;i++){
if(_4[i].showing){
_4[i].setShowing(false);
}
}
}
this.decoree.layerIndex=_1.getIndex();
var _6=this.decoree.layers.length;
for(var i=_1.getIndex()+1;i<_6;i++){
if(this.decoree.layers[i].showing){
this.decoree.layers[i].hide();
}
}
}
}});
}
if(!dojo._hasResource["wm.base.widget.BreadcrumbLayers"]){
dojo._hasResource["wm.base.widget.BreadcrumbLayers"]=true;
dojo.provide("wm.base.widget.BreadcrumbLayers");
dojo.declare("wm.BreadcrumbLayers",wm.Layers,{conditionalTabButtons:true,themeStyleType:"ContentPanel",layersType:"Breadcrumb",transition:"fade",headerWidth:"50px",postInit:function(){
this.inherited(arguments);
this._inBreadcrumbPostInit=true;
var _7=this.getActiveLayer();
if(!this._isDesignLoaded){
for(var i=0;i<this.layers.length;i++){
if(this.layers[i]!=_7){
this.layers[i].setShowing(false);
}
}
}
delete this._inBreadcrumbPostInit;
},oncanchange:function(_8){
var l=this.getLayer(_8.newIndex);
_8.canChange=l;
},addWidget:function(_9){
this.inherited(arguments);
if(!this._isDesignLoaded&&!this._loading&&_9 instanceof wm.Layer&&!_9.isActive()){
_9.setShowing(false);
}
},_setLayerIndex:function(_a){
var l=this.layers[_a];
if(l&&!l.showing){
l.setShowing(true);
l._isShowing=true;
}
this.inherited(arguments);
if(l){
delete l._isShowing;
}
}});
}
