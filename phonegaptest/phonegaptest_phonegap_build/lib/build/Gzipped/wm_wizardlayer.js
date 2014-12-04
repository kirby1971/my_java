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

dojo.provide("wm.compressed.wm_wizardlayer");
if(!dojo._hasResource["wm.base.widget.Layers.WizardDecorator"]){
dojo._hasResource["wm.base.widget.Layers.WizardDecorator"]=true;
dojo.provide("wm.base.widget.Layers.WizardDecorator");
dojo.declare("wm.WizardDecorator",wm.TabsDecorator,{decorationClass:"wmwizardlayers",decoratorPadding:"2",buttonPanel:null,nextButton:null,prevButton:null,constructor:function(){
this.backCaption=wm.getDictionaryItem("wm.WizardDecorator.BACK");
this.nextCaption=wm.getDictionaryItem("wm.WizardDecorator.NEXT");
this.doneCaption=wm.getDictionaryItem("wm.WizardDecorator.DONE");
this.cancelCaption=wm.getDictionaryItem("wm.WizardDecorator.CANCEL");
},decorateContainer:function(){
this.inherited(arguments);
if(!this.wrapperContainer){
this.wrapperContainer=new wm.Panel({owner:this.decoree,name:"wizardWrapper",width:"100%",height:"100%",layoutKind:"top-to-bottom",flags:{notInspectable:true,bindInspectable:true}});
if(this.decoree.client){
this.setupWrapperContainer();
}
}
},setupWrapperContainer:function(){
this.decoree.client.setParent(this.wrapperContainer);
this.wrapperContainer.moveControl(this.decoree.client,0);
this.wrapperContainer.setParent(this.decoree);
},createTab:function(_1,_2,_3){
if(this.decoree.client&&!this.wrapperContainer.parent){
this.setupWrapperContainer();
}
this.inherited(arguments);
},undecorate:function(){
this.inherited(arguments);
if(this.buttonPanel){
this.buttonPanel.destroy();
}
this.buttonPanel=null;
this.nextButton=null;
this.prevButton=null;
},addFooter:function(){
if(this.buttonPanel){
this.buttonPanel.destroy();
}
var _4=this.decoree.bottomButtons?this.decoree.bottomButtons.split(/\s*,\s*/):[];
this.buttonPanel=new wm.Panel({name:"buttonPanel",parent:this.wrapperContainer,owner:this.decoree,showing:this.decoree.hasButtonBar,layoutKind:"left-to-right",height:wm.Button.prototype.height,width:"100%",freeze:true,lock:true,verticalAlign:"top",horizontalAlign:_4.length?"left":"right"});
var _5=this;
dojo.forEach(_4,function(_6,i){
var b=new wm.Button({name:"custom"+i,parent:_5.buttonPanel,owner:_5.decoree,width:"100px",height:"100%",caption:_6});
b.connect(b,"onclick",_5.decoree,"onBottom"+i+"Button");
});
if(_4.length){
new wm.Spacer({name:"spacer",parent:this.buttonPanel,owner:this.decoree,width:"100%"});
}
this.prevButton=new wm.Button({name:"prevButton",parent:this.buttonPanel,owner:this.decoree,width:"80px",height:"100%",caption:this.cancelCaption});
this.nextButton=new wm.Button({name:"nextButton",parent:this.buttonPanel,owner:this.decoree,width:"80px",height:"100%",caption:this.nextCaption});
dojo.connect(this.prevButton,"onclick",this,"backClick");
dojo.connect(this.nextButton,"onclick",this,"nextClick");
},setLayerActive:function(_7,_8){
this.inherited(arguments);
var i=_7.getIndex();
this.nextButton.setCaption(i<_7.decorator.decoree.layers.length-1?this.nextCaption:this.doneCaption);
this.prevButton.setCaption(i==0?this.cancelCaption:this.backCaption);
},nextClick:function(){
var i=this.decoree.layerIndex;
var _9=this.decoree.getActiveLayer();
var _a=this.validateCurrentLayer();
if(_a){
if(i==this.decoree.layers.length-1){
this.decoree.onDoneClick();
}else{
for(i=i+1;i<this.decoree.layers.length;i++){
if(this.decoree.layers[i].showing){
break;
}
}
this.decoree.setLayerIndex(i);
var _9=this.decoree.getActiveLayer();
_9.focusFirstEditor();
}
}
},validateCurrentLayer:function(_b){
var i=this.decoree.layerIndex;
var _c=this.decoree.getActiveLayer();
dojo.removeClass(this.btns[i],"done");
var _d=_c.getInvalidWidget();
if(_d&&!_b){
_d.focus();
_d.editor.displayMessage(_d.invalidMessage||wm.getDictionaryItem("wm.TabDecorator.VALIDATION_INVALID_INPUT"),true);
app.createToastDialog();
app.toastDialog.showToast(wm.getDictionaryItem("wm.WizardDecorator.TOAST_INVALID",{name:_d.caption||_d.name}),3000,"Warning","cc");
return false;
}
if(_d){
return false;
}
var _e={invalidMessage:null};
this.decoree.onLayerValidation(_c,_e);
if(_e.invalidMessage){
if(!_b){
app.alert(_e.invalidMessage);
}
return false;
}
if(_c.invalid){
if(!_b){
app.alert(wm.getDictionaryItem("wm.WizardDecorator.ALERT_INCOMPLETE"));
}
return false;
}
dojo.addClass(this.btns[i],"done");
return true;
},backClick:function(){
this.validateCurrentLayer(true);
var i=this.decoree.layerIndex;
if(i==0){
this.decoree.onCancelClick();
}else{
for(i=i-1;i>=0;i--){
if(this.decoree.layers[i].showing){
break;
}
}
this.decoree.setLayerIndex(i);
this.decoree.layers[i].focusFirstEditor();
}
},tabClicked:function(_f,e){
if(this.decoree.isDesignLoaded()){
return this.inherited(arguments);
}
var _10=this.decoree.getActiveLayer();
var _11=_10.getIndex();
var _12=_f.getIndex();
if(_11<_12&&!this.validateCurrentLayer()){
return;
}
if(_11+1==_12){
this.inherited(arguments);
this.decoree.getActiveLayer().focusFirstEditor();
return;
}
if(_11<_12){
for(var i=_11+1;i<_12;i++){
if(this.decoree.layers[i].invalid){
app.createToastDialog();
app.toastDialog.showToast(wm.getDictionaryItem("wm.WizardDecorator.TOAST_PLEASE_FILL",{name:this.decoree.layers[i].caption}),3000,"Warning","cc");
return;
}else{
if(!dojo.hasClass(this.btns[i],"done")){
app.createToastDialog();
app.toastDialog.showToast(wm.getDictionaryItem("wm.WizardDecorator.TOAST_SKIP_LAYER",{name:this.decoree.layers[i].caption}),3000,"Warning","cc");
return;
}
}
}
}else{
this.validateCurrentLayer(true);
}
this.inherited(arguments);
this.decoree.getActiveLayer().focusFirstEditor();
}});
}
if(!dojo._hasResource["wm.base.widget.WizardLayers"]){
dojo._hasResource["wm.base.widget.WizardLayers"]=true;
dojo.provide("wm.base.widget.WizardLayers");
dojo.declare("wm.WizardLayers",wm.Layers,{themeStyleType:"ContentPanel",layersType:"Wizard",transition:"fade",headerWidth:"50px",verticalButtons:false,bottomButtons:"",hasButtonBar:true,init:function(){
this.generateBottomButtonEvents();
this.inherited(arguments);
this.decorator.addFooter();
this.connect(this.domNode,"keydown",this,"keydown");
},generateBottomButtonEvents:function(){
var _13=this.bottomButtons?this.bottomButtons.split(/\s*,\s*/):[];
for(var i=0;i<_13.length;i++){
this["onBottom"+i+"Button"]=function(){
};
}
},keydown:function(e){
var _14=e.keyCode;
if(e.keyCode==dojo.keys.ENTER||e.keyCode==dojo.keys.NUMPAD_ENTER){
this.decorator.nextClick();
dojo.stopEvent(e);
return false;
}
return true;
},onCancelClick:function(){
},onDoneClick:function(){
},onLayerValidation:function(_15,_16){
}});
}
