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

dojo.provide("wm.compressed.wm_livepanel");
if(!dojo._hasResource["wm.base.widget.LiveForm"]){
dojo._hasResource["wm.base.widget.LiveForm"]=true;
dojo.provide("wm.base.widget.LiveForm");
wm.getLiveForms=function(_1){
var _2=[];
wm.forEachWidget(_1.root,function(w){
if(wm.isInstanceType(w,wm.LiveForm)){
_2.push(w);
}
});
return _2;
};
wm.getMatchingFormWidgets=function(_3,_4){
var _5=[];
wm.forEach(_3.widgets,function(w){
if(_4(w)){
_5.push(w);
}
if((wm.isInstanceType(w,wm.Container)&&!(wm.isInstanceType(w,wm.LiveFormBase)))){
_5=_5.concat(wm.getMatchingFormWidgets(w,_4));
}
});
return _5;
};
dojo.declare("wm.LiveFormBase",wm.Container,{editorHeight:"26px",editorWidth:"100%",captionSize:"140px",captionAlign:"right",captionPosition:"left",height:"228px",width:"100%",layoutKind:"top-to-bottom",readonly:false,dataSet:null,dataOutput:null,init:function(){
this.dataOutput=new wm.Variable({name:"dataOutput",owner:this});
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
this.dataOutput=this.$.dataOutput;
if(wm.pasting){
wm.fire(this,"designPasted");
}
this.populateEditors();
},setDataSet:function(_6){
if(this.parent&&this.parent.operation&&this.editingMode!="lookup"){
return;
}
this.beginEditUpdate();
this.dataSet=_6;
var d=this.getItemData();
this.populateEditors();
this.endEditUpdate();
this.setDataOutput(d);
this.liveFormChanged();
},getSourceId:function(){
try{
return this.components.binding.wires.dataSet.source;
}
catch(e){
}
return "";
},setDataOutput:function(_7){
this.dataOutput.setDataSet(_7);
},clearDataOutput:function(){
dojo.forEach(this.getRelatedEditorsArray(),function(e){
e.clearDataOutput();
});
this.dataOutput.setData({});
},getItemData:function(){
return wm.fire(this.dataSet,"getCursorItem");
},_getDataType:function(){
var t=(this.dataSet||0).type;
if(!wm.typeManager.isStructuredType(t)){
var v=this.findLiveVariable();
t=v&&v.type;
}
if(wm.typeManager.isStructuredType(t)){
return t;
}
},findLiveVariable:function(){
var s=this.dataSet,o=s&&s.owner,ds=null;
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
},beginEditUpdate:function(){
this.dataOutput.beginUpdate();
dojo.forEach(this.getFormEditorsArray(),function(e){
wm.fire(e,"beginEditUpdate");
});
},endEditUpdate:function(){
this.dataOutput.endUpdate();
dojo.forEach(this.getFormEditorsArray(),function(e){
wm.fire(e,"endEditUpdate");
});
},liveFormChanged:function(){
dojo.forEach(this.getFormEditorsArray(),function(e){
if(e.changed){
e._inSetDataValue=true;
wm.fire(e,"doOnchange");
e._inSetDataValue=false;
}
wm.fire(e,"clearDirty");
});
},populateEditors:function(){
var i=this.getItemData(),_8=i?i.getData():null;
dojo.forEach(this.getFormEditorsArray(),dojo.hitch(this,function(e){
if(wm.isInstanceType(e,wm.LiveFormBase)){
if(e.editingMode!="lookup"||!this._operationSucceeded){
wm.fire(e,"populateEditors");
}
}else{
if(wm.isInstanceType(e,wm.OneToMany)){
if(e.formField&&_8){
e.setDataSet(i.getValue(e.formField));
}
}else{
if(wm.isInstanceType(e,wm.Lookup)&&(!e.dataSet||!e.dataSet.type)){
e.setAutoDataSet(e.autoDataSet);
}
wm.fire(e,"setDataValue",[e.formField&&_8?_8[e.formField]:_8]);
}
}
}));
},updateDataOutputType:function(){
var _9;
if(this.dataSet){
_9=this.dataSet.type;
}else{
var p=this.getParentForm();
var _a=p&&p.dataOutput?p.dataOutput._dataSchema:null;
var _b=_a&&_a[this.formField];
if(_b&&_b.type){
_9=_b.type;
}
}
if(_9&&this.dataOutput.type!=_9){
this.dataOutput.setType(_9);
}
},populateDataOutput:function(){
this.updateDataOutputType();
if(this.dataSet&&this.dataOutput.type!=this.dataSet.type){
this.dataOutput.setType(this.dataSet.type);
}
var d=this.dataOutput;
d.setIsList(false);
dojo.forEach(this.getFormEditorsArray(),dojo.hitch(this,function(e){
if(wm.isInstanceType(e,wm.LiveFormBase)){
wm.fire(e,"populateDataOutput");
}else{
if(e.formField){
d.setValue(e.formField,e.getDataValue());
}else{
if(wm.isInstanceType(this,wm.RelatedEditor)){
d.setData(e.getDataValue());
}
}
}
}));
return this.dataOutput;
},editStarting:function(){
dojo.forEach(this.getFormEditorsArray(),function(e){
wm.fire(e,"editStarting");
});
},editCancelling:function(){
dojo.forEach(this.getFormEditorsArray(),function(e){
wm.fire(e,"editCancelling");
});
},clearData:function(){
dojo.forEach(this.getFormEditorsArray(),function(e){
wm.fire(e,"clear");
});
dojo.forEach(this.getRelatedEditorsArray(),function(e){
wm.fire(e,"clearData");
});
},setDefaultOnInsert:function(){
dojo.forEach(this.getFormEditorsArray(),function(e){
wm.fire(e,"setDefaultOnInsert");
});
},getEditorsArray:function(){
return wm.getMatchingFormWidgets(this,function(w){
return (wm.isInstanceType(w,[wm.Editor,wm.AbstractEditor]));
});
},getRelatedEditorsArray:function(_c){
return wm.getMatchingFormWidgets(this,function(w){
return (wm.RelatedEditor&&wm.isInstanceType(w,wm.RelatedEditor));
});
},getFormEditorsArray:function(){
return wm.getMatchingFormWidgets(this,function(w){
return (w.formField!==undefined);
});
},_getEditorBindSourceId:function(_d){
var _e=(_d||"").split(".");
_e.pop();
return _e.join(".");
},_getEditorBindSource:function(_f){
var _10=(_f||"").split(".");
_10.pop();
var s=_10.join("."),v=this.getValueById(s);
if(wm.isInstanceType(v,[wm.Editor,wm.RelatedEditor])){
return v;
}
},getBoundEditorsArray:function(){
var _11=[];
var _12=this.$.binding.wires;
for(var i in _12){
w=_12[i];
if(!w.targetId&&w.targetProperty.indexOf("dataOutput")==0){
e=this._getEditorBindSource(w.source);
if(e){
_11.push(e);
}
}
}
return _11;
},canChangeEditorReadonly:function(_13,_14,_15){
if(wm.isInstanceType(_13,wm.AbstractEditor)&&_13.ignoreParentReadonly){
return false;
}
if(wm.isInstanceType(_13,wm.RelatedEditor)&&_13.ignoreParentReadonly&&_13.editingMode=="editable subform"){
var _16=wm.typeManager.getType(_13.dataSet.type);
return (!_16||!_16.liveService);
}
var c=dojo.isFunction(_15);
return !c||_15(_13,this,_14);
},_setReadonly:function(_17,_18){
dojo.forEach(this.getFormEditorsArray(),function(e){
if(this.canChangeEditorReadonly(e,_17,_18)){
e.setReadonly(_17);
}
},this);
dojo.forEach(this.getRelatedEditorsArray(),function(e){
if(this.canChangeEditorReadonly(e,_17,_18)){
e._setReadonly(_17,_18);
}
},this);
},setReadonly:function(_19){
this.readonly=_19;
this._setReadonly(_19);
},setCaptionSize:function(_1a){
this.captionSize=_1a;
dojo.forEach(this.getEditorsArray(),function(e){
e.setCaptionSize(_1a);
});
dojo.forEach(this.getRelatedEditorsArray(),function(e){
e.setCaptionSize(_1a);
});
},setCaptionUnits:function(_1b){
this.captionUnits=_1b;
dojo.forEach(this.getEditorsArray(),function(e){
e.setCaptionUnits(_1b);
});
},setCaptionAlign:function(_1c){
this.captionAlign=_1c;
dojo.forEach(this.getEditorsArray(),function(e){
e.setCaptionAlign(_1c);
});
},setCaptionPosition:function(pos){
var _1d=this.captionPosition;
this.captionPosition=pos;
if((_1d=="left"||_1d=="right")&&(pos=="bottom"||pos=="top")){
if(this.editorHeight.match(/px/)&&parseInt(this.editorHeight)<48){
this.editorHeight="48px";
}
this.captionSize="28px";
}else{
if((pos=="left"||pos=="right")&&(_1d=="bottom"||_1d=="top")){
if(this.editorHeight.match(/px/)&&parseInt(this.editorHeight)>=48){
this.editorHeight=wm.AbstractEditor.prototype.height;
}
if(this.captionSize.match(/px/)&&parseInt(this.captionSize)<100){
this.captionSize="100px";
}
}
}
dojo.forEach(this.getEditorsArray(),function(e){
e.setCaptionPositionLF(pos,this);
},this);
},setEditorWidth:function(_1e){
this.editorWidth=_1e;
dojo.forEach(this.getEditorsArray(),function(e){
if(e.parent.horizontalAlign!="justified"){
e.setWidth(_1e);
}
});
dojo.forEach(this.getRelatedEditorsArray(),function(e){
e.setWidth(_1e);
});
},setEditorHeight:function(_1f){
this.editorHeight=_1f;
dojo.forEach(this.getEditorsArray(),function(e){
e.setHeight(_1f);
});
},valueChanged:function(_20,_21){
if(wm.isInstanceType(this[_20],wm.Variable)){
return;
}else{
this.inherited(arguments);
}
},getViewDataIndex:function(_22){
return _22;
},validateData:function(){
var _23=this.getInvalidWidget();
if(!_23){
return true;
}
app.alert(wm.getDictionaryItem("wm.LiveForm.INVALID_EDITOR",{caption:_23.caption}));
return true;
},getRecordCount:function(){
return wm.fire(this.getDataSource(),"getCount");
},getDataSource:function(){
if(!this._dataSource){
var b=this.$&&this.$.binding,v=(b&&b.wires["dataSet"]||0).source;
this._dataSource=v&&this.getValueById(v);
}
return this._dataSource;
},setRecord:function(_24){
wm.fire(this.getDataSource(),"setCursor",[_24]);
},setNext:function(){
wm.fire(this.getDataSource(),"setNext");
},setPrevious:function(){
wm.fire(this.getDataSource(),"setPrevious");
},setFirst:function(){
wm.fire(this.getDataSource(),"setFirst");
},setLast:function(){
wm.fire(this.getDataSource(),"setLast");
},getIndex:function(){
return (this.getDataSource()||0).cursor||0;
}});
dojo.declare("wm.SimpleForm",wm.LiveFormBase,{});
dojo.declare("wm.LiveForm",wm.LiveFormBase,{saveOnEnterKey:true,alwaysPopulateEditors:false,margin:"0",defaultButton:"",displayErrors:true,liveEditing:true,liveSaving:true,liveVariable:null,liveDataSourceClass:null,confirmDelete:"Are you sure you want to delete this data?",_controlSubForms:false,destroy:function(){
this._cancelOnEnterKey();
this.inherited(arguments);
},init:function(){
this.connect(this.domNode,"keypress",this,"formkeypress");
this.canBeginEdit=this.hasEditableData;
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
this.initLiveVariable();
if(String(this.captionSize).search(/\D/)==-1){
this.captionSize+=this.captionUnits;
}
if(String(this.editorSize).search(/\D/)==-1){
this.editorSize+=this.editorSizeUnits;
}
if(this.liveEditing&&!this.isDesignLoaded()){
this.setReadonly(this.readonly);
}
},initLiveVariable:function(){
var lv=this.liveVariable=new wm.LiveVariable({name:"liveVariable",owner:this,liveSource:(this.dataSet||0).type,autoUpdate:false});
this.connect(lv,"onBeforeUpdate",this,"beforeOperation");
this.connect(lv,"onSuccess",this,"operationSucceeded");
this.connect(lv,"onResult",this,"onResult");
this.connect(lv,"onError",this,"onError");
},setLiveEditing:function(_25){
this.liveEditing=_25;
},setDataSet:function(_26){
if(this.dataSet&&this.operation&&!this.alwaysPopulateEditors){
return;
}
if(this.liveVariable&&_26&&_26.type){
this.liveVariable.setLiveSource(_26.type);
this.updateDataOutputType();
}
this._cancelOnEnterKey();
this.inherited(arguments,[_26]);
if(!this.readonly){
wm.getMatchingFormWidgets(this,function(w){
if(wm.isInstanceType(w,wm.Editor)||wm.isInstanceType(w,wm.AbstractEditor)||wm.isInstanceType(w,wm.RelatedEditor)){
w.validate();
}
});
}
},beginDataInsert:function(){
this.clearDataOutput();
this.beginEditUpdate();
this.clearData();
this.endEditUpdate();
this.beginEdit("insert");
this.setDefaultOnInsert();
this.onBeginInsert();
this.validate();
return true;
},beginDataUpdate:function(){
this.beginEdit("update");
this.populatePickList();
this.onBeginUpdate();
return true;
},beginEdit:function(_27){
this.editStarting();
this.operation=_27;
if(this.liveEditing){
if(this.hasLiveService()){
this._setReadonly(false,dojo.hitch(this,"_canChangeEditorReadonly",[_27]));
}else{
this.setReadonly(false);
}
}
},endEdit:function(){
if(this.liveEditing){
this.setReadonly(true);
}
this.operation=null;
},cancelEdit:function(){
this.operation=null;
this.editCancelling();
var d=this.getItemData();
this.beginEditUpdate();
this.dataOutput.setData(d);
this.endEditUpdate();
this.setDataSet(this.dataSet);
this.onCancelEdit();
this.endEdit();
},_canChangeEditorReadonly:function(_28,_29,_2a,_2b){
if(wm.isInstanceType(_29,wm.RelatedEditor)&&_29.editingMode=="editable subform"&&_29.ignoreParentReadonly){
return false;
}
if(wm.isInstanceType(_29,[wm.Editor,wm.AbstractEditor])&&_29.formField){
var f=_29.formField,dt=_2a.dataSet.type,s=wm.typeManager.getTypeSchema(dt),pi=wm.typeManager.getPropertyInfoFromSchema(s,f),ops=_28;
if(!f){
return true;
}
var _2c=pi&&dojo.some(pi.noChange,function(i){
return (dojo.indexOf(ops,i)>-1);
}),_2d=pi&&dojo.some(pi.exclude,function(i){
return (dojo.indexOf(ops,i)>-1);
});
if(!_2b&&(_2c||_2d)){
return false;
}
}
return true;
},hasLiveService:function(){
return Boolean(wm.typeManager.getLiveService((this.dataSet||0).type));
},hasEditableData:function(){
var v=this.dataOutput;
return !this.liveEditing||(v&&wm.typeManager.getLiveService(v.type)&&wm.data.hasIncludeData(v.type,v.getData()));
},_getDeferredSuccess:function(){
var d=new dojo.Deferred();
d.callback(true);
return d;
},saveDataIfValid:function(){
if(this.getInvalid()){
return;
}
return this.saveData();
},saveData:function(){
if(this.operation=="insert"){
return this.insertData();
}
if(this.operation=="update"){
return this.updateData();
}
},insertData:function(){
var _2e=this.debugForm("insertData");
var _2f=this.doOperation("insert");
if(_2e){
app.debugDialog.endLogEvent(_2e);
}
return _2f;
},updateData:function(){
var _30=this.debugForm("updateData");
var _31=this.doOperation("update");
if(_30){
app.debugDialog.endLogEvent(_30);
}
return _31;
},deleteData:function(){
var f=dojo.hitch(this,function(){
this.onBeginDelete();
this.operation="delete";
var _32=this.debugForm("deleteData");
var _33=this.doOperation("delete");
if(_32){
app.debugDialog.endLogEvent(_32);
}
return _33;
});
if(!this.confirmDelete){
f();
}else{
app.confirm(this.confirmDelete,false,f,dojo.hitch(this,function(){
this.cancelEdit();
}));
}
},debugForm:function(_34){
if(app.debugDialog){
var _35=app.debugDialog.newLogEvent({eventType:"form",sourceDescription:"",resultDescription:this.getRuntimeId()+"."+_34+"() has been called",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId(),method:_34});
return _35;
}
},doOperation:function(_36){
this.populateDataOutput();
var _37=this.dataOutput.getData();
this.onBeforeServiceCall(_36,_37);
if(this.liveSaving){
var lv=this.liveVariable;
if(lv.type!=this.dataOutput.type){
lv.setLiveSource(this.dataOutput.type);
}
lv.setOperation(_36);
lv.sourceData.setData(_37);
return lv.update();
}else{
switch(this.operation){
case "insert":
this.onInsertData();
break;
case "update":
this.onUpdateData();
break;
case "delete":
this.onDeleteData();
break;
}
this.endEdit();
return this._getDeferredSuccess();
}
},onBeforeServiceCall:function(_38,_39){
},operationSucceeded:function(_3a){
if(dojo.isArray(_3a)){
_3a=_3a[0];
}
var op=this.liveVariable.operation;
if(op=="insert"||op=="delete"){
this.dataSet.cursor=0;
}
if(op=="insert"||op=="update"){
var _3b=this.getItemData();
this._operationSucceeded=true;
try{
wm.fire(_3b,"setData",[_3a]);
}
catch(e){
}
delete this._operationSucceeded;
if(_3b!=this.dataSet){
wm.fire(this.dataSet,"notify");
}
}
switch(op){
case "insert":
this.onInsertData(_3a);
break;
case "update":
this.onUpdateData(_3a);
break;
case "delete":
this.beginEditUpdate();
this.clearData();
this.endEditUpdate();
this.onDeleteData(_3a);
break;
}
this.onSuccess(_3a);
this.endEdit();
},beforeOperation:function(){
this.onBeforeOperation(this.liveVariable.operation);
},getSubFormsArray:function(){
var _3c=[],w;
for(var i in this.widgets){
w=this.widgets[i];
if(wm.isInstanceType(w,wm.LiveForm)){
_3c.push(w);
_3c=_3c.concat(w.getSubFormsArray());
}
}
return _3c;
},clearData:function(){
this.inherited(arguments);
if(this._controlSubForms){
dojo.forEach(this.getSubFormsArray(),function(f){
f.clearData();
});
}
},_setReadonly:function(_3d,_3e){
this.inherited(arguments);
if(this._controlSubForms){
dojo.forEach(this.getSubFormsArray(),function(f){
f.setReadonly(_3d);
});
}
},forceValidation:function(){
dojo.forEach(this.getEditorsArray(),function(e){
wm.fire(e.editor,"changed");
});
this.validate();
},formkeypress:function(e){
if(e.keyCode==dojo.keys.ENTER&&e.target.tagName!="TEXTAREA"){
this._onEnterKeyHandle=setTimeout(dojo.hitch(this,function(){
this._onEnterKeyHandle=null;
this._doOnEnterKey();
}),50);
}
},_doOnEnterKey:function(){
var d=this.defaultButton;
if(d){
this.forceValidation();
if(!d.disabled){
wm.fire(d,"onclick");
}
}
if(this.saveOnEnterKey){
if(app.debugDialog){
var _3f=app.debugDialog.newLogEvent({eventType:"componentEvent",sourceDescription:this.getRuntimeId()+" ENTER key pressed",resultDescription:this.getRuntimeId()+".saveIfValid()",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId(),method:"saveDataIfValid"});
}
this.saveDataIfValid();
if(_3f){
app.debugDialog.endLogEvent(_3f);
}
}
},_cancelOnEnterKey:function(){
if(this._onEnterKeyHandle){
clearTimeout(this._onEnterKeyHandle);
this._onEnterKeyHandle=null;
}
},populatePickList:function(){
var _40={};
var _41=[];
wm.forEach(this.widgets,function(e){
if(e.subType!=null&&e.subType!=undefined&&(e.subType=="picklist"||e.subType=="boolean")){
_41.push(e);
var val=e.getDataValue();
_40[e.formField]=val;
}
});
if(!wm.isEmpty(_40)){
var _42=this.getParentPage();
try{
_42.sforceRuntimeService.requestSync("getPickLists",[this.liveDataSourceClass,_40],dojo.hitch(this,"updatePickList",_41),dojo.hitch(this,"sforceRuntimeServiceError"));
}
catch(e){
console.error("ERROR IN populatePickList: "+e);
}
}
},updatePickList:function(_43,_44){
dojo.forEach(_43,function(e){
if(e.subType=="picklist"){
var _45=_44[e.formField];
e.editor.setOptionSet(_45.options);
e.setDataValue(_45["default"].dataValue);
}
});
},sforceRuntimeServiceError:function(_46){
app.alert("sforceRuntimeServiceError error = "+_46);
},onBeginInsert:function(){
},onInsertData:function(){
},onBeginUpdate:function(){
},onUpdateData:function(){
},onBeginDelete:function(){
},onDeleteData:function(){
},onCancelEdit:function(){
},onBeforeOperation:function(_47){
},onSuccess:function(_48){
},onResult:function(_49){
},onError:function(_4a){
wm.logging&&console.error(_4a);
if(this.displayErrors&&!_4a.toString().match(/ status\:403/)){
app.alert(wm.getDictionaryItem("wm.LiveForm.ONERROR",{error:dojo.isString(_4a)?_4a:_4a.message||"??"}));
}
}});
}
if(!dojo._hasResource["wm.base.widget.RelatedEditor"]){
dojo._hasResource["wm.base.widget.RelatedEditor"]=true;
dojo.provide("wm.base.widget.RelatedEditor");
dojo.declare("wm.RelatedEditor",wm.LiveFormBase,{ignoreParentReadonly:true,height:"26px",editingMode:"lookup",_lookupCache:null,canChangeEditorReadonly:function(_4b,_4c,_4d){
var m=this.editingMode;
switch(m){
case "readonly":
if(this.parent&&this.parent.operation&&this.parent.operation=="insert"){
return _4c||((_4b==this.findLookup()&&this.inherited(arguments)));
}else{
return _4c;
}
case "lookup":
return _4c||((_4b==this.findLookup()&&this.inherited(arguments)));
default:
return this.inherited(arguments);
}
},findLookup:function(){
var _4e=this.getFormEditorsArray();
for(var i=0,e;(e=_4e[i]);i++){
if(wm.Lookup&&(e.display=="Lookup"||e instanceof wm.Lookup)){
return e;
}
}
},findLiveVariable:function(){
var f=this._getLiveForm();
return f&&f.findLiveVariable();
},_getLiveForm:function(){
var p=wm.getParentForm(this);
while(p&&!(wm.isInstanceType(p,wm.LiveForm))){
p=wm.getParentForm(p);
}
return p;
},_getRelativeFormField:function(_4f){
var _50=wm.getFormField(this)+".";
if(_4f.indexOf(_50)==0){
return _4f.substring(_50.length);
}
},getViewDataIndex:function(_51){
var r=wm.getFormField(this);
return (r?r+".":"")+_51;
},validate:function(){
this.inherited(arguments);
wm.fire(this.parent,"validate");
},editStarting:function(){
if(this.editingMode=="lookup"){
this._lookupCache=this.dataOutput.getData();
}
this.inherited(arguments);
},editCancelling:function(){
if(this.editingMode=="lookup"&&this._lookupCache!==undefined){
this.dataSet.beginUpdate();
this.dataSet.setData(this._lookupCache);
this.dataSet.endUpdate();
this._lookupCache=undefined;
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.LivePanel"]){
dojo._hasResource["wm.base.widget.LivePanel"]=true;
dojo.provide("wm.base.widget.LivePanel");
dojo.declare("wm.LivePanel",wm.Panel,{height:"100%",width:"100%",layoutKind:"top-to-bottom",liveDataName:"",autoScroll:true,popupLiveFormSuccess:function(){
if(this.dialog){
this.dialog.hide();
}else{
if(this.gridLayer){
this.dataGrid.deselectAll();
this.gridLayer.activate();
}
}
this.dataGrid.getDataSet().update();
},popupLivePanelEdit:function(){
this.liveForm.beginDataUpdate();
dojo.forEach(this.liveForm.getFormEditorsArray(),dojo.hitch(this.liveForm,function(e){
if(e.ignoreParentReadonly){
return;
}
if(this._canChangeEditorReadonly(["update"],e,this,false)){
if(e.readonly){
e.setReadonly(false);
}
}else{
if(!e.readonly){
e.setReadonly(true);
}
}
}));
if(this.dialog){
this.dialog.show();
}else{
if(this.detailsLayer){
this.detailsLayer.activate();
}
}
},popupLivePanelInsert:function(){
this.liveForm.beginDataInsert();
dojo.forEach(this.liveForm.getFormEditorsArray(),dojo.hitch(this.liveForm,function(e){
if(e.ignoreParentReadonly){
return;
}
if(this._canChangeEditorReadonly(["insert"],e,this,false)){
if(e.readonly){
e.setReadonly(false);
}
}else{
if(!e.readonly){
e.setReadonly(true);
}
}
}));
if(this.dialog){
this.dialog.show();
}else{
if(this.detailsLayer){
this.detailsLayer.activate();
}
}
}});
}
if(!dojo._hasResource["wm.base.widget.EditPanel"]){
dojo._hasResource["wm.base.widget.EditPanel"]=true;
dojo.provide("wm.base.widget.EditPanel");
dojo.declare("wm.EditPanel",wm.Panel,{border:"0",operationPanel:"",savePanel:"",liveForm:"",layoutKind:"top-to-bottom",verticalAlign:"top",horizontalAlign:"right",lock:true,formUneditable:false,formInvalid:true,width:"100%",height:"40px",mobileHeight:"40px",enableTouchHeight:true,editPanelStyle:"wm.Button",isCustomized:false,destroy:function(){
this._unsubscribeLiveForm();
this.inherited(arguments);
},init:function(){
this.inherited(arguments);
this.setLiveForm(this.liveForm);
this.updateControlsStatus();
},setLock:function(_52){
this.inherited(arguments);
if(!_52){
this.isCustomized=true;
}
},loaded:function(){
this.inherited(arguments);
if(wm.pasting){
wm.fire(this,"designPasted");
}
},setLiveForm:function(_53){
if(_53 instanceof wm.Component){
_53=_53.getId();
}
this.liveForm=_53;
this._subscribeLiveForm();
},_subscribeLiveForm:function(){
this._unsubscribeLiveForm();
var c=this._liveFormSubscriptions=[];
var w=this._liveFormWires=[];
if(this.liveForm){
var _54=this.getValueById(this.liveForm);
c.push(dojo.connect(_54,"setDataSet",this,"updateControlsStatus"));
c.push(dojo.connect(_54,"beginEdit",this,"_beginEdit"));
c.push(dojo.connect(_54,"endEdit",this,"_endEdit"));
w.push(new wm.Wire({owner:this,targetId:this.getId(),targetProperty:"formInvalid",source:[this.liveForm,"invalid"].join(".")}).connectWire());
}
},_unsubscribeLiveForm:function(){
dojo.forEach(this._liveFormSubscriptions,dojo.disconnect);
dojo.forEach(this._liveFormWires,function(w){
wm.fire(w,"destroy");
});
},_beginEdit:function(){
this._toggleEdit(true);
},_endEdit:function(){
this._toggleEdit(false);
},_toggleEdit:function(_55){
wm.fire(this.getValueById(this.operationPanel),"setShowing",[!_55]);
wm.fire(this.getValueById(this.savePanel),"setShowing",[_55]);
},updateControlsStatus:function(){
this.setValue("formUneditable",!wm.fire(this.getValueById(this.liveForm),"hasEditableData"));
},beginDataInsert:function(){
wm.fire(this.getValueById(this.liveForm),"beginDataInsert");
},beginDataUpdate:function(){
wm.fire(this.getValueById(this.liveForm),"beginDataUpdate");
},deleteData:function(){
wm.fire(this.getValueById(this.liveForm),"deleteData");
},saveData:function(){
wm.fire(this.getValueById(this.liveForm),"saveData");
},cancelEdit:function(){
wm.fire(this.getValueById(this.liveForm),"cancelEdit");
},setThemeStyleType:function(_56){
return wm.Container.prototype.setThemeStyleType.call(this,_56);
},getThemeStyleType:function(_57){
return wm.Container.prototype.getThemeStyleType.call(this,_57);
}});
}
if(!dojo._hasResource["wm.base.widget.DataNavigator"]){
dojo._hasResource["wm.base.widget.DataNavigator"]=true;
dojo.provide("wm.base.widget.DataNavigator");
dojo.declare("wm.DataNavigator",wm.Panel,{classNames:"wmdatanavigator",box:"h",lock:true,byPage:true,border:0,height:"36px",_buttonWidth:"46px",layoutKind:"left-to-right",horizontalAlign:"right",verticalAlign:"middle",liveSource:"",init:function(){
this.inherited(arguments);
this.createNavComponents();
this.connectNavComponents();
},createNavComponents:function(){
this.readComponents(this.getTemplate());
dojo.mixin(this,this.widgets);
},connectNavComponents:function(){
this.connect(this.firstButton,"onclick",this,"setFirst");
this.connect(this.prevButton,"onclick",this,"setPrevious");
this.connect(this.nextButton,"onclick",this,"setNext");
this.connect(this.lastButton,"onclick",this,"setLast");
this.connect(this.recordEditor,"onchange",this,"recordEdited");
},getTemplate:function(){
return ["{","firstButton: [\"wm.Button\", {caption: \"&nbsp&laquo;&nbsp;\", width: \"",this._buttonWidth,"\", height: \"100%\"}, {}],","prevButton: [\"wm.Button\", {caption: \"&nbsp&lt;&nbsp;\", width: \"",this._buttonWidth,"\", height: \"100%\"}, {}],","recordEditor: [\"wm.Number\", {caption: \"\", width: \"65px\", margin: 4, height: \"100%\"}],","totalLabel: [\"wm.Label\", {caption: \"/ 0\", width: \"50px\", border: 0, height: \"100%\"}, {}, {","format: [\"wm.DataFormatter\", {}, {}]","}],","nextButton: [\"wm.Button\", {caption: \"&nbsp&gt;&nbsp;\", width: \"",this._buttonWidth,"\", height: \"100%\"}, {}],","lastButton: [\"wm.Button\", {caption: \"&nbsp&raquo;&nbsp;\", width: \"",this._buttonWidth,"\", height: \"100%\"}, {}]","}"].join("");
},setFirst:function(){
wm.fire(this.liveSource,this.byPage?"setFirstPage":"setFirst");
this.update();
},setPrevious:function(){
wm.fire(this.liveSource,this.byPage?"setPreviousPage":"setPrevious");
this.update();
},setNext:function(){
wm.fire(this.liveSource,this.byPage?"setNextPage":"setNext");
this.update();
},setLast:function(){
wm.fire(this.liveSource,this.byPage?"setLastPage":"setLast");
this.update();
},recordEdited:function(){
var r=this.recordEditor;
if(r.isValid()&&!this._updating){
wm.fire(this.liveSource,this.byPage?"setPage":"setCursor",[this.recordEditor.getValue("dataValue")-1]);
}
this._updating=false;
},update:function(_58){
var ls=this.liveSource;
if(!ls){
return;
}
var c=(this.byPage?ls.getPage():ls.cursor)+1,d=this.liveSource.getCursorItem().getData(),t=(this.byPage?ls.getTotalPages():ls.getCount())||1;
r=this.recordEditor;
this._updating=c!=r.getValue("dataValue");
if(c>t){
c=t;
}
r.setValue("dataValue",c);
this.totalLabel.setValue("caption","/ "+t);
this._doSetRecord(d,c);
},setLiveSource:function(_59){
var s=_59;
if(dojo.isString(s)&&s){
this.components.binding.addWire("","liveSource",s);
return;
}
s=wm.isInstanceType(s,[wm.LiveForm,wm.DataForm])?s.dataSet:s;
if(s instanceof wm.LiveVariable){
this.liveSource=s;
this.connect(this.liveSource,"onSuccess",this,"update");
this.update();
}else{
this.liveSource="";
}
},getLiveSource:function(){
return this.liveSource&&this.liveSource.getId();
},setLiveForm:function(_5a){
this.setLiveSource(_5a);
},_doSetRecord:function(_5b,_5c){
if(_5c!=this._lastRecord){
this.onsetrecord(_5b,_5c);
}
this._lastRecord=_5c;
},onsetrecord:function(_5d,_5e){
},adjustChildProps:function(_5f,_60){
this.inherited(arguments);
dojo.mixin(_60,{owner:this});
}});
}
