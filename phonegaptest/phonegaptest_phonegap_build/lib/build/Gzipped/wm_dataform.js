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

dojo.provide("wm.compressed.wm_dataform");
if(!dojo._hasResource["wm.base.widget.DataForm"]){
dojo._hasResource["wm.base.widget.DataForm"]=true;
dojo.provide("wm.base.widget.DataForm");
wm.getMatchingFormWidgets=function(_1,_2){
var _3=[];
wm.forEach(_1.widgets,function(w){
if(_2(w)){
_3.push(w);
}
if(w instanceof wm.Container&&!wm.isInstanceType(w,[wm.LiveFormBase,wm.DataForm])){
_3=_3.concat(wm.getMatchingFormWidgets(w,_2));
}
});
return _3;
};
wm.getDataFormLiveView=function(_4){
var lv=_4&&(_4.findLiveVariable&&_4.findLiveVariable()||_4.getDataSetServiceVariable&&_4.getDataSetServiceVariable());
return lv&&lv.liveView;
};
dojo.declare("wm.FormPanel",wm.Container,{type:"",margin:"0",padding:"2",enableTouchHeight:true,editorHeight:"26px",editorWidth:"100%",captionSize:"120px",autoSizeCaption:false,_minEditorSizeForAutoSize:60,captionAlign:"right",captionPosition:"left",height:"250px",width:"100%",layoutKind:"top-to-bottom",readonly:false,verticalAlign:"top",horizontalAlign:"left",init:function(){
if(this.type==this.declaredClass){
this.type="";
}
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
this.updateCaptionSizes();
},updateCaptionSizes:function(){
if(this.autoSizeCaption){
wm.job(this.getRuntimeId()+".updateCaptionSizes",10,this,"_updateCaptionSizes");
}
},renderBounds:function(){
if(this.inherited(arguments)){
var _5=this.getEditorsArray();
dojo.forEach(_5,function(e){
e.captionNode.style.maxWidth="";
});
this.updateCaptionSizes();
}
},_updateCaptionSizes:function(){
if(this._isDestroyed){
return;
}
var _6=this.getEditorsArray();
var _7=0;
var _8;
dojo.forEach(_6,function(e){
if(e.showing&&e.parent.showing&&e.captionNode&&e.captionSize!="100%"&&e.captionPosition=="left"){
var w=Math.min(e.captionNode.clientWidth,e.bounds.w-this._minEditorSizeForAutoSize);
if(w>_7){
_7=w;
_8=e;
}
}
},this);
_7+=5;
if(_7>this.bounds.w/2){
_7=Math.floor(this.bounds.w/2);
}
this.captionSize=_7+"px";
dojo.forEach(_6,dojo.hitch(this,function(e){
if(e.captionSize!="100%"&&e.captionPosition=="left"){
e.setCaptionSize(this.captionSize);
if(e.captionNode.clientWidth>_7){
e.captionNode.style.maxWidth=_7+"px";
}
e._isMaxEditor=_8?(e==_8):undefined;
}
}));
},addWidget:function(_9){
this.inherited(arguments);
if(_9 instanceof wm.AbstractEditor){
this.updateCaptionSizes();
}
},removeControl:function(_a){
this.inherited(arguments);
if(_a instanceof wm.AbstractEditor){
this.updateCaptionSizes();
}
},getEditorsArray:function(){
return wm.getMatchingFormWidgets(this,function(w){
return w instanceof wm.AbstractEditor;
});
},canChangeEditorReadonly:function(_b,_c,_d){
if(_b.ignoreParentReadonly){
return false;
}
var c=dojo.isFunction(_d);
return !c||_d(_b,this,_c);
},_setReadonly:function(_e,_f){
dojo.forEach(this.getEditorsArray(),function(e){
if(!e.ignoreParentReadonly){
if(this.canChangeEditorReadonly(e,_e,_f)){
e.setReadonly(_e);
}else{
e.setReadonly(!_e);
}
}
},this);
},setReadonly:function(_10){
this.readonly=_10;
this._setReadonly(_10);
},setCaptionSize:function(_11){
var _12=this.captionSize;
this.captionSize=_11;
dojo.forEach(this.getEditorsArray(),function(e){
if((e.captionPosition=="top"||e.captionPosition=="bottom")&&_11>40){
return;
}
if(e.isAncestorInstanceOf(wm.FormPanel)!=this){
return;
}
e.setCaptionSize(_11);
},this);
wm.forEachWidget(this,dojo.hitch(this,function(c){
if(c!=this&&c instanceof wm.FormPanel&&c.captionSize===_12&&c.captionPosition==this.captionPosition){
c.setCaptionSize(_11);
}
}),true);
},setCaptionAlign:function(_13){
this.captionAlign=_13;
dojo.forEach(this.getEditorsArray(),function(e){
if(e.isAncestorInstanceOf(wm.FormPanel)!=this){
return;
}
e.setCaptionAlign(_13);
},this);
wm.forEachWidget(this,dojo.hitch(this,function(c){
if(c!=this&&c instanceof wm.FormPanel&&c.captionSize===this.captionSize&&c.captionPosition==this.captionPosition){
c.setCaptionAlign(_13);
}
}),true);
},setCaptionPosition:function(pos){
var _14=this.captionPosition;
var _15=this.captionSize;
this.captionPosition=pos;
if((_14=="left"||_14=="right")&&(pos=="bottom"||pos=="top")){
if(this.editorHeight.match(/px/)&&parseInt(this.editorHeight)<54){
this.editorHeight="54px";
}
this.captionSize="28px";
}else{
if((pos=="left"||pos=="right")&&(_14=="bottom"||_14=="top")){
if(this.editorHeight.match(/px/)&&parseInt(this.editorHeight)>=54){
this.editorHeight=wm.AbstractEditor.prototype.height;
}
if(this.captionSize.match(/px/)&&parseInt(this.captionSize)<100){
this.captionSize="100px";
}
}
}
dojo.forEach(this.getEditorsArray(),function(e){
if(e.isAncestorInstanceOf(wm.FormPanel)!=this){
return;
}
e.setCaptionPositionLF(pos,this);
},this);
wm.forEachWidget(this,dojo.hitch(this,function(c){
if(c!=this&&c instanceof wm.FormPanel&&c.captionSize===_15&&c.captionPosition==_14){
c.setCaptionPosition(pos);
}
}),true);
},setEditorWidth:function(_16){
this.editorWidth=_16;
dojo.forEach(this.getEditorsArray(),function(e){
if(e.isAncestorInstanceOf(wm.FormPanel)!=this){
return;
}
if(e.parent.horizontalAlign!="justified"){
e.setWidth(_16);
}
},this);
wm.forEachWidget(this,dojo.hitch(this,function(c){
if(c!=this&&c instanceof wm.FormPanel){
c.setEditorWidth(_16);
}
}),true);
},setEditorHeight:function(_17){
this.editorHeight=_17;
dojo.forEach(this.getEditorsArray(),function(e){
if(e.isAncestorInstanceOf(wm.FormPanel)!=this){
return;
}
e.setValue("height",_17);
},this);
wm.forEachWidget(this,function(c){
if(c!=this&&c instanceof wm.FormPanel){
c.setEditorHeight(_17);
}
},true);
},getEditorParent:function(){
return this;
},_end:0});
dojo.declare("wm.DataForm",wm.FormPanel,{dataSet:null,dataOutput:null,type:"",setReadonlyOnPrimaryKeys:true,confirmChangeOnDirty:"Unsaved changes will be lost; continue?",noDataSet:true,generateInputBindings:false,generateOutputBindings:false,init:function(){
this.dataOutput=new wm.Variable({name:"dataOutput",owner:this,type:this.type,_allowLazyLoad:false});
this.dataSet=new wm.Variable({name:"dataSet",owner:this,type:this.type});
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
if(wm.pasting){
wm.fire(this,"designPasted");
}
if(!this.generateInputBindings){
this.populateEditors();
var _18=this.getEditorsArray();
dojo.forEach(_18,function(e){
e.connect(e,"onchange",this,"_onEditorChange");
},this);
}
},_onEditorChange:function(){
if(!this._inDataSet){
this.populateDataOutput();
}
var _19=this.getParentForm();
if(_19){
_19._onEditorChange();
}
},_setReadonly:function(_1a,_1b){
this.inherited(arguments);
dojo.forEach(this.getRelatedEditorsArray(),function(e){
e.setReadonly(_1a);
});
},doConfirmChangeOnDirty:function(_1c){
if(!this._isDesignLoaded&&!this._skipChangeOnDirty&&this.confirmChangeOnDirty&&this.getIsDirty()){
app.confirm(this.confirmChangeOnDirty,false,dojo.hitch(this,function(){
this.clearDirty();
this.setDataSet(_1c);
}));
return true;
}
return false;
},setDataOutput:function(_1d){
if(this.dataOutput){
this.dataOutput.setDataSet(_1d);
}
},setDataSet:function(_1e){
this._inDataSet=true;
try{
if(this.doConfirmChangeOnDirty(_1e)){
return;
}
if(_1e){
this.onDataSetChanging(_1e.getCursorItem().getData());
}
this.dataSet.setDataSet(_1e?_1e.getCursorItem():null);
if(_1e&&this.dataOutput.type!=_1e.type){
this.dataOutput.setType(this.dataSet.type);
}
var d=this.dataSet;
if(!this.generateInputBindings){
this.beginEditUpdate();
this.populateEditors();
this.endEditUpdate();
this.liveFormChanged();
}
if(!this.generateOutputBindings){
this.populateDataOutput();
}
this.valueChanged("noDataSet",this.noDataSet=d.isEmpty());
this.onDataSetChanged(this.dataSet.getData());
}
catch(e){
}
finally{
delete this._inDataSet;
}
},onDataSetChanged:function(_1f){
},onDataSetChanging:function(_20){
},clearData:function(){
this._skipChangeOnDirty=true;
this.beginEditUpdate();
this.dataOutput.setData({});
this.inherited(arguments);
this.endEditUpdate();
this._skipChangeOnDirty=false;
},beginEditUpdate:function(){
this.dataOutput.beginUpdate();
dojo.forEach(this.getEditorsArray(),function(e){
wm.fire(e,"beginEditUpdate");
});
},endEditUpdate:function(){
this.dataOutput.endUpdate();
dojo.forEach(this.getEditorsArray(),function(e){
wm.fire(e,"endEditUpdate");
});
},liveFormChanged:function(){
dojo.forEach(this.getEditorsArray(),function(e){
if(e.changed){
e._inSetDataValue=true;
e.changed();
e._inSetDataValue=false;
}
if(e.clearDirty){
e.clearDirty();
}
});
},populateEditors:function(){
var _21=this.dataSet;
var _22=_21?_21.getData():null;
if(!_22){
_22={};
}
var _23=this.getEditorsArray();
dojo.forEach(_23,dojo.hitch(this,function(e){
if(wm.OneToMany&&e instanceof wm.OneToMany){
e.setDataSet(this.dataSet.getValue(e.formField));
}else{
if(wm.Lookup&&e instanceof wm.Lookup&&(!e.dataSet||!e.dataSet.type)){
e.setAutoDataSet(e.autoDataSet);
}
wm.fire(e,"setDataValue",[e.formField&&_22?_22[e.formField]:_22]);
}
}));
dojo.forEach(this.getRelatedEditorsArray(),dojo.hitch(this,function(e){
if(!this._operationSucceeded){
e.setDataSet(this.dataSet.getValue(e.formField));
}
}));
},applyDataValueBindings:function(_24){
var _25=this.getEditorsArray();
dojo.forEach(_25,dojo.hitch(this,function(e){
if(e.$.binding){
if(e.$.binding.wires.dataValue&&(e.dataValueBindingEvaluated=="onInsert"&&_24=="insert"||e.dataValueBindingEvaluated=="onUpdate"&&_24=="update"||e.dataValueBindingEvaluated=="both")){
e.$.binding.wires.dataValue.refreshValue();
}
}
}));
var _26=this.getRelatedEditorsArray();
dojo.forEach(_26,function(e){
e.applyDataValueBindings(_24);
});
},populateDataOutput:function(){
var d=this.dataOutput||this.$.dataOutput;
if(this._inPopulateDataOutput){
return d;
}
this._inPopulateDataOutput=true;
try{
dojo.forEach(this.getEditorsArray(),dojo.hitch(this,function(e){
if(e instanceof wm.DataForm||e instanceof wm.SubForm||wm.isInstanceType(e,wm.SubForm)){
}else{
if(e.formField){
d.setValue(e.formField,e.getDataValue());
}
}
}));
dojo.forEach(this.getRelatedEditorsArray(),dojo.hitch(this,function(_27){
_27.populateDataOutput();
d.setValue(_27.formField,_27.dataOutput);
}));
if(this.$.binding){
var _28=this.$.binding.findWires(function(_29){
return (_29.targetProperty=="dataOutput"||_29.targetProperty.indexOf("dataOutput.")==0);
});
dojo.forEach(_28,function(_2a){
_2a.refreshValue();
});
}
wm.forEachProperty(d._dataSchema,dojo.hitch(this,function(_2b,_2c){
var _2d=d.getValue(_2c);
if(_2d instanceof wm.Variable&&_2d.isList&&!_2b.isList){
d.setValue(_2c,_2d.getItem(0));
}
}));
}
finally{
delete this._inPopulateDataOutput;
}
return d;
},getDataOutput:function(){
if(!this.generateOutputBindings&&!this._inGetDataOutput){
this._inGetDataOutput=true;
this.populateDataOutput();
delete this._inGetDataOutput;
}
return this.dataOutput;
},getEditorsArray:function(_2e){
return wm.getMatchingFormWidgets(this,function(w){
return (w instanceof wm.AbstractEditor||_2e&&wm.isInstanceType(w,[wm.SubForm,wm.OneToMany]))&&(w.formField!==undefined);
});
},getRelatedEditorsArray:function(){
return wm.getMatchingFormWidgets(this,function(w){
return (wm.isInstanceType(w,wm.SubForm)&&w.formField);
});
},valueChanged:function(_2f,_30){
if(this[_2f] instanceof wm.Variable){
return;
}else{
this.inherited(arguments);
}
},editNewObject:function(){
this.beginEditUpdate();
this.clearDirty();
this.setDataSet(null);
this.endEditUpdate();
this.applyDataValueBindings("insert");
if(this.readonly||this.setReadonlyOnPrimaryKeys){
this.readonly=false;
this._setReadonly(false,dojo.hitch(this,"_canChangeEditorReadonly",["insert"]));
}
this.liveFormChanged();
this.onEditNewObject();
wm.onidle(this,"focusFirstEditor");
},onEditNewObject:function(){
},editCurrentObject:function(){
if(this.readonly||this.setReadonlyOnPrimaryKeys){
this._setReadonly(false,dojo.hitch(this,"_canChangeEditorReadonly",["update"]));
}
this.applyDataValueBindings("update");
this.onEditCurrentObject();
wm.onidle(this,"focusFirstEditor");
},onEditCurrentObject:function(){
},setDefaultOnInsert:function(){
dojo.forEach(this.getEditorsArray(),function(e){
wm.fire(e,"setDefaultOnInsert");
});
},_canChangeEditorReadonly:function(_31,_32,_33,_34){
if(!this.setReadonlyOnPrimaryKeys){
return true;
}
var _35=wm.typeManager.getType(this.type);
var _36=_35&&_35.liveService;
if(wm.isInstanceType(_32,wm.AbstractEditor)&&_32.formField&&_36){
var _37=_32.formField;
var _38=_33.type;
var _35=wm.typeManager.getType(_38);
if(_35){
var _39=_35.fields;
}
var _3a=wm.typeManager.getPropertyInfoFromSchema(_39,_37);
var ops=_31;
if(!_37){
return true;
}
var _3b=_3a&&dojo.some(_3a.noChange,function(i){
return (dojo.indexOf(ops,i)>-1);
}),_3c=_3a&&dojo.some(_3a.exclude,function(i){
return (dojo.indexOf(ops,i)>-1);
});
if(!_34&&(_3b||_3c)){
return false;
}
}
return true;
},cancelEdit:function(){
this.clearDirty();
if(this.$.binding&&this.$.binding.wires.dataSet){
this.$.binding.wires.dataSet.refreshValue();
}
this.onCancelEdit();
},onCancelEdit:function(){
},beginDataInsert:function(){
this.editNewObject();
},beginDataUpdate:function(){
this.editCurrentObject();
},getFormEditorsArray:function(){
return this.getEditorsArray();
},findLiveVariable:function(){
var s=this.dataSet.dataSet;
if(!s){
var _3d=this.$.binding&&this.$.binding.wires.dataSet?this.$.binding.wires.dataSet.source:"";
if(_3d){
_3d=this.owner.getValueById(_3d);
}
s=_3d;
}
var o=s&&s.owner;
var ds=null;
o=o&&!(wm.isInstanceType(o,wm.Variable))?o:null;
if(o){
try{
if(wm.isInstanceType(o,wm.DojoGrid)){
ds=o.variable;
}else{
ds=o.dataSet;
}
}
catch(e){
ds=o.dataSet;
}
}
if(o&&ds&&wm.isInstanceType(ds,wm.LiveVariable)){
return ds;
}
while(s){
if(wm.isInstanceType(s,wm.LiveVariable)){
return s;
}
s=s.owner;
if(!(wm.isInstanceType(s.owner,wm.Variable))){
break;
}
}
},_end:0});
dojo.declare("wm.SubForm",wm.DataForm,{formField:"",_getFormField:function(_3e){
if(_3e.indexOf(".")==-1){
return _3e;
}
var f=this._getRelativeFormField(_3e);
if(f&&f.indexOf(".")==-1){
return f;
}
},_getRootFormField:function(){
var a=[];
var w=this;
while(w){
if(w.formField){
a.unshift(w.formField);
}
w=w.getParentForm();
}
return a.join(".");
},_getRelativeFormField:function(_3f){
var _40=this._getRootFormField();
if(_3f.indexOf(_40)==0){
return _3f.substring(_40.length);
}
},getViewDataIndex:function(_41){
var r=this._getRootFormField();
return (r?r+".":"")+_41;
}});
dojo.declare("wm.DBForm",wm.DataForm,{noDataSet:true,useLoadingDialog:true,formBehavior:"standard",serviceVariable:null,deleteConfirmation:"Are you sure you want to delete this data?",readonlyManager:false,insertOp:"insert",updateOp:"update",deleteOp:"delete",init:function(){
this.inherited(arguments);
this.initServiceVariable();
},postInit:function(){
this.inherited(arguments);
if(!this.readonlyManager&&this.servicevariable){
this._editSomeObject();
}
if(this.useLoadingDialog){
this._loadingDialog=new wm.LoadingDialog({owner:this,name:"_loadingDialog",caption:"Saving..."});
this._loadingDialog.widgetToCover=this;
this._loadingDialog.setServiceVariableToTrack(this.serviceVariable);
}
},setDataSet:function(_42){
if(this._updating){
return;
}
this.inherited(arguments);
if(_42&&_42.liveSource){
this.serviceVariable.setLiveSource(_42.liveSource);
}
if(!this.readonlyManager&&!this._isDesignLoaded){
this._editSomeObject();
}
},initServiceVariable:function(){
if(this.type){
this.serviceVariable=new wm.LiveVariable({name:"serviceVariable",owner:this,type:this.type,liveView:this.getSourceLiveView(),operation:this.operation||"insert",autoUpdate:false});
this.insertOp="insert";
this.updateOp="update";
this.deleteOp="delete";
}
var _43=this.serviceVariable;
this.connect(_43,"onSuccess",this,"operationSucceeded");
this.connect(_43,"onResult",this,"operationResult");
this.connect(_43,"onError",this,"operationFailed");
},getSourceLiveView:function(){
if(!this.dataSet){
return;
}
var _44=this.dataSet.dataSet||this.dataSet;
var _45=this.dataSet;
while(_45&&(_45.owner instanceof wm.Variable&&_45.owner instanceof wm.LiveVariable==false||_45.owner instanceof wm.Control)){
if(_45==this){
break;
}else{
if(_45.owner instanceof wm.Variable){
_45=_45.owner;
}else{
if(_45.owner instanceof wm.Control&&_45.owner.dataSet&&_45.owner.dataSet!=this.dataSet){
_45=_45.owner.dataSet;
}else{
break;
}
}
}
}
if(_45 instanceof wm.Control){
_45=null;
}
if(_45 instanceof wm.LiveVariable){
return _45.liveView;
}
},cancelEdit:function(){
this.inherited(arguments);
this.endEdit();
},_editSomeObject:function(){
if(this._inEditSomeObject){
return;
}
this._inEditSomeObject=true;
try{
switch(this.formBehavior){
case "insertOnly":
this.editNewObject();
break;
case "updateOnly":
this.editCurrentObject();
break;
default:
if(this.noDataSet){
this.editNewObject();
}else{
this.editCurrentObject();
}
}
}
catch(e){
}
delete this._inEditSomeObject;
},editNewObject:function(){
this.operation=this.insertOp;
this.serviceVariable.setOperation(this.operation);
this.inherited(arguments);
this.updateButtonShowingState(true);
return true;
},editCurrentObject:function(){
this.operation=this.updateOp;
this.serviceVariable.setOperation(this.operation);
this.inherited(arguments);
this.updateButtonShowingState(true);
return true;
},updateButtonShowingState:function(_46){
if(this.readonlyManager){
if(this.saveButton&&this.saveButton.isAncestor(this)){
this.saveButton.setShowing(_46);
}
if(this.cancelButton&&this.cancelButton.isAncestor(this)){
this.cancelButton.setShowing(_46);
}
if(this.editButton&&this.editButton.isAncestor(this)){
this.editButton.setShowing(!_46);
}
if(this.deleteButton&&this.deleteButton.isAncestor(this)){
this.deleteButton.setShowing(!_46);
}
if(this.newButton&&this.newButton.isAncestor(this)){
this.newButton.setShowing(!_46);
}
}else{
if(this.newButton&&this.newButton.isAncestor(this)){
this.newButton.setShowing(this.operation!="insert");
}
if(this.deleteButton&&this.deleteButton.isAncestor(this)){
this.deleteButton.setShowing(this.operation!="insert");
}
}
},endEdit:function(){
this.updateButtonShowingState(false);
if(this.readonlyManager){
this.setReadonly(true);
}else{
if(this.formBehavior=="insertOnly"){
this.editNewObject();
}
}
},saveData:function(_47){
if(_47!==true){
var _48=this.getInvalidWidget();
if(_48){
this.onSaveInvalidated(_48);
return;
}
}
switch(this.formBehavior){
case "insertOnly":
this.operation="insert";
break;
case "updateOnly":
this.operation="update";
break;
}
if(this.operation!=this.insertOp&&this.operation!=this.updateOp){
if(djConfig.isDebug){
app.toastError("Operation of '"+this.operation+"' is not valid");
return;
}
}
this.doOperation(this.operation);
},saveDataGuessOperation:function(){
var _49="update";
if(!this.generateOutputBindings){
this.populateDataOutput();
}
var _4a=this.dataOutput.getData();
var _4b=wm.typeManager.getType(this.type).fields;
for(var _4c in _4b){
if(_4b[_4c].exclude&&dojo.indexOf(_4b[_4c].exclude,"insert")!=-1&&!_4a[_4c]){
_49="insert";
}
}
this.operation=_49;
},onSaveInvalidated:function(_4d){
},deleteData:function(){
var _4e=dojo.hitch(this,function(){
return this.doOperation("delete");
});
this.operation="delete";
if(!this.deleteConfirmation){
_4e();
}else{
app.confirm(this.deleteConfirmation,false,_4e,dojo.hitch(this,function(){
this.onCancelDelete();
}));
}
},onCancelDelete:function(){
},doOperation:function(_4f){
if(!this.generateOutputBindings){
this.populateDataOutput();
}
var _50=this.dataOutput.getData();
var _51=this.serviceVariable;
_51.setOperation(_4f);
switch(this.operation){
case this.insertOp:
this.onBeforeInsertCall(_50);
break;
case this.updateOp:
this.onBeforeUpdateCall(_50);
break;
case this.deleteOp:
this.onBeforeDeleteCall(_50);
break;
}
var _52=false;
if(this.operation=="update"){
var _53=this.getRelatedEditorsArray();
dojo.forEach(_53,dojo.hitch(this,function(_54){
var _55=wm.typeManager.getType(this.type);
if(_55){
var _56=_55.fields[_54.formField];
}
if(_56){
var _57=_56.type;
}
if(_57){
var _58=wm.typeManager.getType(_57);
}
if(_58&&_55&&_55.liveService&&!_58.liveService&&_54.getIsDirty()){
_52=true;
}
}));
}
this.setServerParams(_50);
if(!_52){
this.serviceVariable.update();
}else{
this._disableEventHandling=true;
this.serviceVariable.setOperation("delete");
this.serviceVariable.sourceData.setData(this.dataSet);
var def=this.serviceVariable.update();
def.addCallbacks(dojo.hitch(this,function(){
this.setServerParams(_50);
this.serviceVariable.setOperation("insert");
this.serviceVariable.update();
wm.onidle(this,function(){
delete this._disableEventHandling;
this.serviceVariable.setOperation("update");
});
}),dojo.hitch(this,function(){
wm.onidle(this,function(){
delete this._disableEventHandling;
this.serviceVariable.setOperation("update");
});
}));
}
},setServerParams:function(_59){
this.serviceVariable.sourceData.setData(_59);
},onBeforeInsertCall:function(_5a){
},onBeforeUpdateCall:function(_5b){
},onBeforeDeleteCall:function(_5c){
},operationSucceeded:function(_5d){
if(this._disableEventHandling){
return;
}
if(dojo.isArray(_5d)){
_5d=_5d[0];
}
var op=this.serviceVariable.operation;
var _5e=this.canApplyReturnedData();
if(_5e){
this.applyReturnedData(this.dataSet,_5d);
}
switch(op){
case this.insertOp:
this.onInsertSuccess(_5d);
break;
case this.updateOp:
this.onUpdateSuccess(_5d);
break;
case this.deleteOp:
this.setDataSet(null);
this.onDeleteSuccess(_5d);
break;
}
this.onSuccess(_5d);
this.endEdit();
},canApplyReturnedData:function(){
return true;
},applyReturnedData:function(_5f,_60){
try{
this.clearDirty();
_5f.beginUpdate();
var _61=this.serviceVariable._dataSchema;
for(var _62 in _60){
if(!wm.typeManager.isStructuredType(_61[_62].type)){
_5f.setValue(_62,_60[_62]);
}else{
_5f.setValue(_62,this.dataOutput.getValue(_62));
}
}
_5f.endUpdate();
_5f.notify();
if(_5f.owner==this){
this.setDataSet(_5f);
}
var d=this.dataSet.getData();
}
catch(e){
}
if(this.$.binding&&this.$.binding.wires.dataSet){
var _63=this.owner.getValueById(this.$.binding.wires.dataSet.source);
if(_63&&wm.isInstanceType(_63,wm.Variable)){
if(d){
this._updating=true;
_63.getCursorItem().setData(d);
this._updating=false;
}
if(_63.owner&&_63.owner instanceof wm.Control&&_63.owner.dataSet instanceof wm.Variable&&_63!=_63.owner.dataSet){
var _64=_63.owner.dataSet;
}
}
}
if(_64){
this._updating=true;
try{
var op=this.serviceVariable.operation;
switch(op){
case this.insertOp:
if(d){
_64.addItem(d,0);
}
break;
case this.updateOp:
if(d){
var _65=this.getRelatedEditorsArray();
var _66=_64.getItem(_63.dataSet.itemIndex);
_66.beginUpdate();
_66.setData(d);
_66.endUpdate();
_64.notify();
}
break;
case this.deleteOp:
_64.removeItem(_63.dataSet.itemIndex);
this.onDeleteSuccess(_60);
break;
}
}
catch(e){
console.error(e);
}
this._updating=false;
}
},onInsertSuccess:function(_67){
},onUpdateSuccess:function(_68){
},onDeleteSuccess:function(_69){
},onSuccess:function(_6a){
},onResult:function(_6b){
},operationResult:function(_6c){
if(this._disableEventHandling){
return;
}
this.onResult(_6c);
},operationFailed:function(_6d){
switch(this.operation){
case this.insertOp:
this.onInsertError(_6d);
break;
case this.updateOp:
this.onUpdateError(_6d);
break;
case this.deleteOp:
this.clearData();
this.onDeleteError(_6d);
break;
}
this.onError(_6d);
},onInsertError:function(_6e){
},onUpdateError:function(_6f){
},onDeleteError:function(_70){
},onError:function(_71){
},_end:0});
dojo.declare("wm.ServiceForm",wm.DBForm,{saveData:function(_72){
if(_72!==true){
var _73=this.getInvalidWidget();
if(_73){
this.onSaveInvalidated(_73);
return;
}
}
if(this.formBehavior=="updateOnly"&&this.noDataSet){
return app.toastError("Can not insert with an updateOnly form");
}
if(this.operation!=this.insertOp&&this.operation!=this.updateOp){
if(djConfig.isDebug){
app.toastError("Operation of '"+this.operation+"' is not valid");
}
}
this.doOperation(this.operation);
},_end:0});
dojo.declare("wm.ServiceInputForm",wm.DataForm,{serviceVariable:null,setReadonlyOnPrimaryKeys:false,generateInputBindings:false,generateOutputBindings:true,populateEditors:function(){
},getTypeDef:function(){
if(this.serviceVariable&&this.serviceVariable.input){
return {fields:this.serviceVariable.input._dataSchema};
}
return null;
},init:function(){
this.inherited(arguments);
this.dataOutput.destroy();
this.dataOutput=new wm.ServiceInput({name:"dataOutput",owner:this});
},setServiceVariable:function(_74){
this.serviceVariable=_74;
if(_74){
this.dataOutput.operationChanged(_74.operation,_74._operationInfo.parameters);
}
},_end:0});
}
if(!dojo._hasResource["wm.base.widget.Editors.DataSetEditor"]){
dojo._hasResource["wm.base.widget.Editors.DataSetEditor"]=true;
dojo.provide("wm.base.widget.Editors.DataSetEditor");
dojo.declare("wm.DataSetEditor",wm.AbstractEditor,{_multiSelect:false,dataSet:null,options:"",displayType:"Text",dataField:"",displayField:"",displayExpression:"",startUpdate:false,_allFields:"All Fields",selectedItem:null,init:function(){
this.inherited(arguments);
this.selectedItem=new wm.Variable({name:"selectedItem",owner:this});
if(this._multiSelect){
this.selectedItem.setIsList(true);
}
},postInit:function(){
if(this.options){
this.setOptionsVariable();
}
if(!this.displayField){
this._setDisplayField();
if(!this.dataField&&this.dataSet&&this.dataSet.type&&wm.defaultTypes[this.dataSet.type]){
this.dataField="dataValue";
}
}
this.inherited(arguments);
if(this.startUpdate){
this.update();
}
},_setDisplayField:function(){
var _75=this.dataSet;
if(!_75&&this.formField){
var _76=this.getParentForm();
if(_76){
_75=_76.dataSet;
}
if(_75){
var _77=_75._dataSchema;
var _78=_77[this.formField];
if(_78){
var _79=_78.type;
var _7a=wm.typeManager.getDisplayField(_79);
}else{
if(this.formField&&app.debugDialog){
app.toastError(this.formField+" is an invalid formField for "+this.getRuntimeId());
}
}
}
}else{
if(_75&&_75.type){
var _79=_75.type;
var _7a=wm.typeManager.getDisplayField(_79);
}
}
if(_7a){
return this.setDisplayField(_7a);
}
},update:function(){
if(this.dataSet instanceof wm.ServiceVariable){
if(app.debugDialog){
var _7b=this.dataSet.log("update",this.getRuntimeId()+".update()");
}
var d=this.dataSet.updateInternal();
if(_7b){
app.debugDialog.endLogEvent(_7b);
}
return d;
}
},hasValues:function(){
return (this.options||this.dataSet&&!this.dataSet.isEmpty());
},isAllDataFields:function(){
return (this.dataField==this._allFields||this.dataField=="");
},setDefaultOnInsert:function(){
if(this.editor&&this.defaultInsert){
if(this.$.binding&&this.$.binding.wires.defaultInsert){
this.$.binding.wires.defaultInsert.refreshValue();
}
this.setEditorValue(this.defaultInsert);
this.changed();
}
},setInitialValue:function(){
this.beginEditUpdate();
this.selectedItem.setType(this.dataSet instanceof wm.Variable?this.dataSet.type:"AnyData");
var _7c=this.dataValue;
var _7d=this.displayValue;
if(this.dataValue!==null&&wm.propertyIsChanged(_7c,"dataValue",wm.AbstractEditor)){
this.setEditorValue(_7c);
}else{
this.setDisplayValue(_7d);
}
this.endEditUpdate();
if(!this._cupdating){
var _7d=this.getDisplayValue();
if(_7d!=this.displayValue){
this.changed();
}
}
},formatData:function(_7e){
try{
if(this._formatter){
return this._formatter.format(_7e);
}else{
if(this.displayType){
var _7f=wm.getFormatter(this.displayType);
this._formatter=new _7f({name:"format",owner:this});
return this._formatter.format(_7e);
}else{
return _7e;
}
}
}
catch(e){
}
},isReady:function(){
return this.inherited(arguments)&&this.hasValues();
},editorChanged:function(){
if(this.dataSet&&this.dataSet.getCount()){
return this.inherited(arguments);
}else{
if(this.isDirty){
this.clearDirty();
}
}
},isAllDataFields:function(){
return (this.dataField==this._allFields||this.dataField=="");
},setDataSet:function(_80){
this.dataSet=_80;
if(_80&&_80.type!=this.selectedItem.type){
this.selectedItem.setType(_80.type);
}
var _81=this.dataValue;
this.updateIsDirty();
},setDisplayField:function(_82){
this.displayField=_82;
if(!this._cupdating){
this.createEditor();
}
},setDisplayExpression:function(_83){
this.displayExpression=_83;
if(!this._cupdating){
this.createEditor();
}
},setDataField:function(_84){
if(_84=="All Fields"){
this.dataField="";
}else{
this.dataField=_84;
}
},clear:function(){
this.inherited(arguments);
this.selectedItem.clearData();
},_getOptionsData:function(){
var _85=[];
if(!this.options){
return _85;
}
var _86=dojo.isArray(this.options)?this.options:this.options.split(",");
for(var i=0,l=_86.length,d;i<l;i++){
d=dojo.string.trim(String(_86[i]));
_85[i]={name:d,dataValue:d};
}
return _85;
},setOptionsVariable:function(){
var _87=this._getOptionsData();
var ds=this.dataSet=new wm.Variable({name:"optionsVar",owner:this,type:"StringData"});
ds.setData(_87);
if(this._isDesignLoaded){
this.displayField="dataValue";
this.dataField="dataValue";
}
},setOptions:function(_88){
var _89=this._cupdating;
this._cupdating=true;
if(_88){
if(this.$.binding&&this.$.binding.wires.dataSet){
this.$.binding.removeWireByProp("dataSet");
}
if(!this.displayField){
this.displayField="dataValue";
if(!this.dataField){
this.dataField="dataValue";
}
}
this.options=_88;
this.setOptionsVariable();
this.setDataSet(this.dataSet);
}else{
var _8a=this.options;
this.options="";
if(this.dataSet&&this.dataSet.owner==this&&_8a){
this.dataSet.clearData();
this.setDataSet(this.dataSet);
}
}
if(!_89){
this._cupdating=false;
if(!this.invalidCss){
this.sizeEditor();
}else{
this.render();
}
}
},_getDisplayData:function(_8b){
var _8c;
if(wm.isInstanceType(_8b,wm.Variable)){
_8c=_8b;
}else{
_8c=new wm.Variable({_temporaryComponent:true});
if(this.dataSet){
_8c.setType(this.dataSet.type);
}
_8c.setData(dojo.clone(_8b));
}
var de=this.displayExpression,v=_8c;
var _8d=de?wm.expression.getValue(de,v,this.owner):_8c.getValue(this.displayField);
if(this.displayType&&this.displayType!="Text"){
_8d=this.formatData(_8d);
}
return _8d==null?"":String(_8d);
},calcIsDirty:function(_8e,_8f){
var _90="";
var _91="";
if(this.dataField){
_90=dojo.isArray(_8e)?_8e.join(","):String(_8e||"");
_91=dojo.isArray(_8f)?_8f.join(","):String(_8f||"");
return _90!=_91;
}
if(_8e instanceof wm.Variable&&_8e.isList||dojo.isArray(_8e)){
var _92=_8e instanceof wm.Variable?_8e.getCount():_8e.length;
for(var i=0;i<_92;i++){
if(i){
_90+=",";
}
_90+=this._getDisplayData(_8e instanceof wm.Variable?_8e.getItem(i):_8e[i]);
}
}else{
if(_8e!==null&&typeof _8e=="object"){
_90=this._getDisplayData(_8e);
}else{
if(_8e==null){
_90="";
}else{
_90=_8e;
}
}
}
if(_8f instanceof wm.Variable&&_8f.isList||dojo.isArray(_8f)){
var _92=_8f instanceof wm.Variable?_8f.getCount():_8f.length;
for(var i=0;i<_92;i++){
if(i){
_91+=",";
}
_91+=this._getDisplayData(_8f instanceof wm.Variable?_8f.getItem(i):_8f[i]);
}
}else{
if(_8f!==null&&typeof _8f=="object"){
_91=this._getDisplayData(_8f);
}else{
if(_8f==null){
_91="";
}else{
_91=_8f;
}
}
}
return _90!=_91;
},setEditorValue:function(_93){
this._setEditorValue(_93,false);
this.updateReadonlyValue();
},setDisplayValue:function(_94){
this._setEditorValue(_94,true);
this.updateReadonlyValue();
this.clearDirty();
},_setEditorValue:function(_95,_96){
var _97=this;
if(!this.selectedItem||!this.dataSet){
this.dataValue=_95;
return;
}
this.beginEditUpdate();
try{
var _98=this._lastValue;
var _99=this._cupdating;
this._cupdating=true;
this.deselectAll();
this._cupdating=_99;
this._lastValue=_98;
if(_95 instanceof wm.Variable){
_95=_95.getData();
}
var _9a;
if(!_96&&this.dataField){
_9a=this.dataField;
}else{
if(!this.displayExpression){
_9a=this.displayField;
}
}
if(_9a||this.displayExpression){
if(!dojo.isArray(_95)){
_95=_95===undefined||_95===null?[]:[_95];
}
var _9b;
_9b=_95.length;
var _9c=this.dataSet.getCount();
if(_9c==0){
this.dataValue=this._multiSelect?_95:_95[0];
}else{
for(var i=0;i<_9b;i++){
var _9d=dojo.isArray(_95)?_95[i]:_95;
var _9e;
if(_9a&&_9d!==null&&typeof _9d=="object"){
_9e=_9d instanceof wm.Variable?_9d.getValue(_9a):_9d[_9a];
}else{
if(!_9a&&_9d!==null&&typeof _9d=="object"){
_9e=this._getDisplayData(_9d);
}else{
_9e=_9d;
}
}
var _9f=false;
for(var j=0;j<_9c;j++){
var _a0=this.dataSet.isList?this.dataSet.getItem(j):this.dataSet;
var _a1=_9a?_a0.getValue(_9a):this._getDisplayData(_a0);
if(_a1==_9e){
_9f=true;
this.selectItem(j);
break;
}
}
if(!_9f){
this._onSetEditorValueFailed(_95);
}
}
}
}
}
catch(e){
console.error(e);
}
this.endEditUpdate();
this.changed();
if(this.isDataSetValueValid(this.dataValue)){
this._lastValue=dojo.clone(this.dataValue);
}else{
this.dataValue="";
}
},isDataSetValueValid:function(_a2){
if(dojo.isArray(_a2)){
for(var i=0;i<_a2.length;i++){
if(_a2[i] instanceof wm.Component){
return false;
}
}
return true;
}else{
return !(_a2 instanceof wm.Component);
}
},_onSetEditorValueFailed:function(_a3){
},getEditorValue:function(){
if(!this.selectedItem){
return null;
}
if(this._dataValueValid){
return this.dataValue;
}
if(!this.dataSet||this.dataSet.getCount()==0){
return this.dataValue;
}
var _a4=[];
if(this.dataField){
var _a5=this.selectedItem.getCount();
for(var i=0;i<_a5;i++){
_a4.push(this.selectedItem.isList?this.selectedItem.getItem(i).getValue(this.dataField):this.selectedItem.getValue(this.dataField));
}
}else{
_a4=this.selectedItem.getData();
if(_a4!==null&&!dojo.isArray(_a4)){
_a4=[_a4];
}
}
if(!this._multiSelect&&_a4){
var _a4=_a4[0];
return (_a4||_a4===0)?_a4:this.makeEmptyValue();
}else{
return _a4;
}
},validationEnabled:function(){
return false;
},getDisplayValue:function(){
var _a6="";
var _a7=this.selectedItem.getCount();
for(var i=0;i<_a7;i++){
if(i){
_a6+=", ";
}
_a6+=this._getDisplayData(this.selectedItem.isList?this.selectedItem.getItem(i):this.selectedItem);
}
return _a6;
},deselectAll:function(){
this.clear();
}});
dojo.declare("wm.CheckboxSet",[wm.DataSetEditor,wm.TouchScrollMixinOptional],{singleLine:false,_multiSelect:true,_focused:false,height:"100px",mobileHeight:"150px",editors:null,_dijitClass:"dijit.form.CheckBox",postInit:function(){
this.inherited(arguments);
},setDataSet:function(_a8){
this.inherited(arguments);
this.createEditor();
},connectEditor:function(){
},destroyEditor:function(){
var _a9=this.editor;
if(this.dijits){
var _aa=this;
dojo.forEach(this.dijits,function(d){
d.destroy();
});
}
this.dijits=[];
this.inherited(arguments);
dojo.destroy(_a9);
},_createEditor:function(_ab){
this.editor=_ab;
this.readOnlyNode=_ab;
this.editor.className="wmCheckboxSet";
var _ac="";
if(this.dataSet){
var _ad=this.dataSet.getCount();
for(var i=0;i<_ad;i++){
var _ae=this.dataSet.getItem(i);
var id=this.getRuntimeId().replace(/\./g,"__")+"__"+i;
_ac+="<div class='wmCheckboxSetItem'><input id='"+id+"' name='"+this.getRuntimeId().replace(".","_")+"' dojoType='"+this._dijitClass+"' value='"+i+"'>";
if(wm.isMobile){
_ac+="<label class='wmeditor-caption'>"+this._getDisplayData(_ae)+"</label></div>";
}else{
_ac+="<label class='wmeditor-caption' for='"+id+"'>"+this._getDisplayData(_ae)+"</label></div>";
}
}
this.editor.innerHTML=_ac;
this.dijits=dojo.parser.parse(this.editor);
if(wm.isMobile){
dojo.forEach(this.dijits,dojo.hitch(this,function(e,i){
var a=document.createElement("div");
a.className="wmcheckbox_x";
a.innerHTML="X";
a.id=this.getRuntimeId()+"_x_"+i;
e.domNode.appendChild(a);
}));
}
var _af=this;
dojo.forEach(this.dijits,function(_b0){
_af.connect(_b0,"onChange",_af,"changed");
_af.connect(_b0,"onFocus",_af,"_onEditorFocused");
_af.connect(_b0,"onBlur",_af,"_onEditorBlurred");
_b0.domNode.style.lineHeight="normal";
});
}
this._scrollNode=this.editor;
return this.editor;
},_getTouchNode:function(_b1){
var _b2=_b1.touches?_b1.touches[0].target:_b1.target;
while(_b2&&_b2!=this.domNode&&!dojo.hasClass(_b2,"wmCheckboxSetItem")){
_b2=_b2.parentNode;
}
if(!_b2||_b2==this.domNode){
return;
}
return _b2;
},onTouchStart:function(_b3){
this.inherited(arguments);
var _b4=this._touchCheckboxNode=this._getTouchNode(_b3);
if(_b4&&dojo.hasClass(_b4,"wmCheckboxSetItem")){
dojo.addClass(_b4.firstChild,"dijitCheckBoxActive");
}
},onTouchMove:function(_b5,_b6,_b7,_b8,_b9,_ba,_bb){
this.inherited(arguments);
if(this._touchCheckboxNode&&(Math.abs(_b7)>5||Math.abs(_ba)>5)){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
delete this._touchCheckboxNode;
}
},onTouchEnd:function(_bc,_bd){
this.inherited(arguments);
if(!_bd&&this._touchCheckboxNode&&this.dijits){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
var _be=dojo.indexOf(dojo.query(".wmCheckboxSetItem",this.domNode),this._touchCheckboxNode);
if(_be!=-1){
this.dijits[_be].set("checked",!this.dijits[_be].get("checked"));
}
}
},_onEditorFocused:function(){
if(!this._focused){
this._focused=true;
this.focused();
}
},_onEditorBlurred:function(){
wm.job(this.getRuntimeId()+".Blurred",100,dojo.hitch(this,function(){
if(this._focused&&!dojo.isDescendant(document.activeElement,this.domNode)){
this._focused=false;
this.blurred();
}
}));
},changed:function(){
if(!this.dijits){
return;
}
var _bf=[];
for(var i=0;i<this.dijits.length;i++){
if(this.dijits[i].checked){
_bf.push(this.dataSet.getItem(i));
}
}
this._dataValueValid=false;
this.selectedItem.setData(_bf);
this.inherited(arguments);
this._dataValueValid=true;
},destroy:function(){
this.inherited(arguments);
},updateReadonlyValue:function(){
if(this.readonly){
this.setReadonly(true);
}
},setReadonly:function(_c0){
var _c1=this.readonly;
this.readonly=Boolean(_c0);
if(!this.dijits){
return;
}
for(var i=0;i<this.dijits.length;i++){
var e=this.dijits[i];
var _c2=e.get("checked");
e.set("disabled",this.readonly||this._disabled);
if(!_c2){
e.domNode.parentNode.style.display=this.readonly?"none":"";
}else{
if(_c1){
e.domNode.parentNode.style.display="";
}
}
}
},setDisabled:function(_c3){
this.inherited(arguments);
var d=this._disabled;
if(!this.dijits){
return;
}
for(var i=0;i<this.dijits.length;i++){
var e=this.dijits[i];
e.set("disabled",this._disabled||this.readonly);
}
},deselectAll:function(){
if(!this.dijits){
return;
}
for(var i=0;i<this.dijits.length;i++){
this.dijits[i].set("checked",false,false);
this.dijits[i]._lastValueReported=false;
}
},selectItem:function(_c4){
if(!this.dijits){
return;
}
this.dijits[_c4].set("checked",true,false);
this.dijits[_c4]._lastValueReported=true;
},getReadOnlyNodeOverflow:function(){
return "auto";
}});
dojo.declare("wm.ListSet",wm.DataSetEditor,{renderVisibleRowsOnly:true,singleLine:false,showSearchBar:true,selectionMode:"multiple",height:"100px",mobileHeight:"150px",editors:null,deleteColumn:false,deleteConfirm:"Are you sure you want to delete this?",prepare:function(_c5){
if(_c5&&_c5.readonly){
delete _c5.readonly;
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
this.inherited(arguments);
},setSelectionMode:function(_c6){
this.selectionMode=_c6;
if(this.grid){
this.grid.setSelectionMode(_c6);
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
},setOptions:function(_c7){
this._typeWas=this.dataSet?this.dataSet.type:"";
this.inherited(arguments);
if(this._typeWas!=this.type){
this.grid.setColumns([{show:true,width:"100%",isCustomField:Boolean(this.displayExpression),mobileColumn:true,field:this.displayExpression?"_name":this.displayField||"_name",expression:this.displayExpression}]);
this.grid.renderDojoObj();
this.setEditorValue(this.dataValue);
}
delete this._typeWas;
},setDataSet:function(_c8){
var _c9;
if(this._typeWas){
_c9=this._typeWas;
}else{
_c9=this.dataSet?this.dataSet.type:"";
}
this.inherited(arguments);
if(this.grid){
if(_c8&&_c8.type!=_c9){
this.createEditor();
}
var _ca=this.dataValue;
this.grid.setDataSet(_c8);
this._inSetDataValue=true;
this.setEditorValue(_ca);
delete this._inSetDataValue;
}
},changed:function(){
var _cb=this.dataValue;
if(_cb&&typeof _cb=="object"){
_cb=dojo.toJson(_cb);
}
this.selectedItem.setDataSet(this.grid.selectedItem);
var _cc=this.getDataValue();
if(_cc&&typeof _cc=="object"){
_cc=dojo.toJson(_cc);
}
if(_cb!==_cc){
this.doOnchange();
}
},doOnchange:function(){
var e=this.editor;
if(!this._loading&&!this.isUpdating()&&!this.readonly&&e&&!this.isLoading()){
this.displayValue=this.getDisplayValue();
this.dataValue=this.getDataValue();
this.valueChanged("displayValue",this.displayValue);
this.valueChanged("dataValue",this.dataValue);
this.onchange(this.getDisplayValue(),this.getDataValue(),this._inSetDataValue);
}
},_onShowParent:function(){
if(this.grid){
this.grid.renderDojoObj();
}
},flow:function(){
if(this.editor){
this.editor.flow();
}
},setShowSearchBar:function(_cd){
this.showSearchBar=Boolean(_cd);
if(this.showSearchBar){
if(!this.searchBar){
this.createSearchBar();
this.editor.moveControl(this.searchBar,0);
}else{
this.searchBar.show();
}
}else{
if(this.searchBar){
this.searchBar.hide();
}
}
},createSearchBar:function(){
this.searchBar=new wm.Text({owner:this,parent:this.editor,width:"100%",caption:"",changeOnKey:true,emptyValue:"emptyString",name:"searchBar"});
if(!this._noFilter){
this.connect(this.searchBar,"onchange",this,"filterList");
}
},filterList:function(_ce,_cf){
var _d0=this.grid.getRowCount();
var _d1={};
if(_ce){
for(var i=0;i<this.grid.columns.length&&this.grid.columns[i].controller;i++){
}
_d1[this.grid.columns[i].field]="*"+_ce+"*";
}
this.grid.setQuery(_d1);
},_createEditor:function(_d2){
this.editor=new wm.Container({owner:this,parent:this,name:"ListSetContainer",width:"100%",height:"100%",layoutKind:"top-to-bottom",verticalAlign:"top",horizontalAlign:"left"});
if(this.showSearchBar){
this.createSearchBar();
}
wm.require("wm.List");
this.grid=new wm.List({renderVisibleRowsOnly:this.renderVisibleRowsOnly,owner:this,parent:this.editor,name:"grid",width:"100%",height:"100%",noHeader:true,margin:"0",padding:"0",border:"0",minWidth:10,deleteColumn:this.deleteColumn,deleteConfirm:this.deleteConfirm,selectionMode:this.selectionMode});
this.grid.connect(this.grid,"renderDojoObj",this,"renderGrid");
this.grid.connect(this.grid,"onRowDeleted",this,"onRowDeleted");
this.grid._isDesignLoaded=false;
this.grid.setColumns([{show:true,width:"100%",isCustomField:Boolean(this.displayExpression),mobileColumn:true,field:this.displayExpression?"_name":this.displayField||"_name",formatFunc:this.displayType!="Text"?"wm_"+this.displayType.toLowerCase()+"_formatter":"",expression:this.displayExpression}]);
if(this.dataSet){
this.grid.setDataSet(this.dataSet);
}
return this.editor;
},setReadonly:function(_d3){
},setDeleteColumn:function(_d4){
this.deleteColumn=_d4;
if(this.grid){
this.grid.setDeleteColumn(_d4);
}
},setDeleteConfirm:function(_d5){
this.deleteConfirm=_d5;
if(this.grid){
this.grid.deleteConfirm=_d5;
}
},renderGrid:function(){
if(this.grid.dojoObj){
this.grid.dojoObj.scroller.contentNodes[0].parentNode.style.overflowX="hidden";
}
},connectEditor:function(){
if(!this.$.binding){
new wm.Binding({name:"binding",owner:this});
}
this.selectedItem.$.binding.addWire("","dataSet",this.name+".editor.selectedItem");
this.connect(this.grid,"onSelectionChange",this,"changed");
},deselectAll:function(){
this.grid.deselectAll();
},selectItem:function(_d6){
this.grid.setSelectedRow(_d6);
},onRowDeleted:function(_d7,_d8){
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.OneToMany"]){
dojo._hasResource["wm.base.widget.Editors.OneToMany"]=true;
dojo.provide("wm.base.widget.Editors.OneToMany");
dojo.declare("wm.OneToMany",wm.ListSet,{minHeight:100,relationshipName:"",_multiSelect:false,showSearchBar:false,dataField:"",startUpdate:true,deleteColumn:false,noItemsLabel:"No data",setEditorValue:function(_d9){
},calcIsDirty:function(){
return false;
},_createEditor:function(_da){
var e=this.inherited(arguments);
var _db=this.dataSet&&!this.dataSet.isEmpty();
this.grid.setShowing(_db);
this.noRelatedObjectsLabel=new wm.Label({parent:e,owner:this,showing:!_db,caption:this.noItemsLabel,width:"100%"});
return e;
},setDataSet:function(_dc){
if(this.grid){
if(_dc&&_dc.getCount()){
this.grid.show();
this.noRelatedObjectsLabel.hide();
}else{
this.grid.hide();
this.noRelatedObjectsLabel.show();
}
}
this.inherited(arguments);
},onRowDeleted:function(_dd,_de){
this.selectedItem.setData(_de);
}});
}
