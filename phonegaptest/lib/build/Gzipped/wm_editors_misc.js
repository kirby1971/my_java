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

dojo.provide("wm.compressed.wm_editors_misc");
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
var _1=this.dataSet;
if(!_1&&this.formField){
var _2=this.getParentForm();
if(_2){
_1=_2.dataSet;
}
if(_1){
var _3=_1._dataSchema;
var _4=_3[this.formField];
if(_4){
var _5=_4.type;
var _6=wm.typeManager.getDisplayField(_5);
}else{
if(this.formField&&app.debugDialog){
app.toastError(this.formField+" is an invalid formField for "+this.getRuntimeId());
}
}
}
}else{
if(_1&&_1.type){
var _5=_1.type;
var _6=wm.typeManager.getDisplayField(_5);
}
}
if(_6){
return this.setDisplayField(_6);
}
},update:function(){
if(this.dataSet instanceof wm.ServiceVariable){
if(app.debugDialog){
var _7=this.dataSet.log("update",this.getRuntimeId()+".update()");
}
var d=this.dataSet.updateInternal();
if(_7){
app.debugDialog.endLogEvent(_7);
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
var _8=this.dataValue;
var _9=this.displayValue;
if(this.dataValue!==null&&wm.propertyIsChanged(_8,"dataValue",wm.AbstractEditor)){
this.setEditorValue(_8);
}else{
this.setDisplayValue(_9);
}
this.endEditUpdate();
if(!this._cupdating){
var _9=this.getDisplayValue();
if(_9!=this.displayValue){
this.changed();
}
}
},formatData:function(_a){
try{
if(this._formatter){
return this._formatter.format(_a);
}else{
if(this.displayType){
var _b=wm.getFormatter(this.displayType);
this._formatter=new _b({name:"format",owner:this});
return this._formatter.format(_a);
}else{
return _a;
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
},setDataSet:function(_c){
this.dataSet=_c;
if(_c&&_c.type!=this.selectedItem.type){
this.selectedItem.setType(_c.type);
}
var _d=this.dataValue;
this.updateIsDirty();
},setDisplayField:function(_e){
this.displayField=_e;
if(!this._cupdating){
this.createEditor();
}
},setDisplayExpression:function(_f){
this.displayExpression=_f;
if(!this._cupdating){
this.createEditor();
}
},setDataField:function(_10){
if(_10=="All Fields"){
this.dataField="";
}else{
this.dataField=_10;
}
},clear:function(){
this.inherited(arguments);
this.selectedItem.clearData();
},_getOptionsData:function(){
var _11=[];
if(!this.options){
return _11;
}
var _12=dojo.isArray(this.options)?this.options:this.options.split(",");
for(var i=0,l=_12.length,d;i<l;i++){
d=dojo.string.trim(String(_12[i]));
_11[i]={name:d,dataValue:d};
}
return _11;
},setOptionsVariable:function(){
var _13=this._getOptionsData();
var ds=this.dataSet=new wm.Variable({name:"optionsVar",owner:this,type:"StringData"});
ds.setData(_13);
if(this._isDesignLoaded){
this.displayField="dataValue";
this.dataField="dataValue";
}
},setOptions:function(_14){
var _15=this._cupdating;
this._cupdating=true;
if(_14){
if(this.$.binding&&this.$.binding.wires.dataSet){
this.$.binding.removeWireByProp("dataSet");
}
if(!this.displayField){
this.displayField="dataValue";
if(!this.dataField){
this.dataField="dataValue";
}
}
this.options=_14;
this.setOptionsVariable();
this.setDataSet(this.dataSet);
}else{
var _16=this.options;
this.options="";
if(this.dataSet&&this.dataSet.owner==this&&_16){
this.dataSet.clearData();
this.setDataSet(this.dataSet);
}
}
if(!_15){
this._cupdating=false;
if(!this.invalidCss){
this.sizeEditor();
}else{
this.render();
}
}
},_getDisplayData:function(_17){
var _18;
if(wm.isInstanceType(_17,wm.Variable)){
_18=_17;
}else{
_18=new wm.Variable({_temporaryComponent:true});
if(this.dataSet){
_18.setType(this.dataSet.type);
}
_18.setData(dojo.clone(_17));
}
var de=this.displayExpression,v=_18;
var _19=de?wm.expression.getValue(de,v,this.owner):_18.getValue(this.displayField);
if(this.displayType&&this.displayType!="Text"){
_19=this.formatData(_19);
}
return _19==null?"":String(_19);
},calcIsDirty:function(_1a,_1b){
var _1c="";
var _1d="";
if(this.dataField){
_1c=dojo.isArray(_1a)?_1a.join(","):String(_1a||"");
_1d=dojo.isArray(_1b)?_1b.join(","):String(_1b||"");
return _1c!=_1d;
}
if(_1a instanceof wm.Variable&&_1a.isList||dojo.isArray(_1a)){
var _1e=_1a instanceof wm.Variable?_1a.getCount():_1a.length;
for(var i=0;i<_1e;i++){
if(i){
_1c+=",";
}
_1c+=this._getDisplayData(_1a instanceof wm.Variable?_1a.getItem(i):_1a[i]);
}
}else{
if(_1a!==null&&typeof _1a=="object"){
_1c=this._getDisplayData(_1a);
}else{
if(_1a==null){
_1c="";
}else{
_1c=_1a;
}
}
}
if(_1b instanceof wm.Variable&&_1b.isList||dojo.isArray(_1b)){
var _1e=_1b instanceof wm.Variable?_1b.getCount():_1b.length;
for(var i=0;i<_1e;i++){
if(i){
_1d+=",";
}
_1d+=this._getDisplayData(_1b instanceof wm.Variable?_1b.getItem(i):_1b[i]);
}
}else{
if(_1b!==null&&typeof _1b=="object"){
_1d=this._getDisplayData(_1b);
}else{
if(_1b==null){
_1d="";
}else{
_1d=_1b;
}
}
}
return _1c!=_1d;
},setEditorValue:function(_1f){
this._setEditorValue(_1f,false);
this.updateReadonlyValue();
},setDisplayValue:function(_20){
this._setEditorValue(_20,true);
this.updateReadonlyValue();
this.clearDirty();
},_setEditorValue:function(_21,_22){
var _23=this;
if(!this.selectedItem||!this.dataSet){
this.dataValue=_21;
return;
}
this.beginEditUpdate();
try{
var _24=this._lastValue;
var _25=this._cupdating;
this._cupdating=true;
this.deselectAll();
this._cupdating=_25;
this._lastValue=_24;
if(_21 instanceof wm.Variable){
_21=_21.getData();
}
var _26;
if(!_22&&this.dataField){
_26=this.dataField;
}else{
if(!this.displayExpression){
_26=this.displayField;
}
}
if(_26||this.displayExpression){
if(!dojo.isArray(_21)){
_21=_21===undefined||_21===null?[]:[_21];
}
var _27;
_27=_21.length;
var _28=this.dataSet.getCount();
if(_28==0){
this.dataValue=this._multiSelect?_21:_21[0];
}else{
for(var i=0;i<_27;i++){
var _29=dojo.isArray(_21)?_21[i]:_21;
var _2a;
if(_26&&_29!==null&&typeof _29=="object"){
_2a=_29 instanceof wm.Variable?_29.getValue(_26):_29[_26];
}else{
if(!_26&&_29!==null&&typeof _29=="object"){
_2a=this._getDisplayData(_29);
}else{
_2a=_29;
}
}
var _2b=false;
for(var j=0;j<_28;j++){
var _2c=this.dataSet.isList?this.dataSet.getItem(j):this.dataSet;
var _2d=_26?_2c.getValue(_26):this._getDisplayData(_2c);
if(_2d==_2a){
_2b=true;
this.selectItem(j);
break;
}
}
if(!_2b){
this._onSetEditorValueFailed(_21);
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
},isDataSetValueValid:function(_2e){
if(dojo.isArray(_2e)){
for(var i=0;i<_2e.length;i++){
if(_2e[i] instanceof wm.Component){
return false;
}
}
return true;
}else{
return !(_2e instanceof wm.Component);
}
},_onSetEditorValueFailed:function(_2f){
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
var _30=[];
if(this.dataField){
var _31=this.selectedItem.getCount();
for(var i=0;i<_31;i++){
_30.push(this.selectedItem.isList?this.selectedItem.getItem(i).getValue(this.dataField):this.selectedItem.getValue(this.dataField));
}
}else{
_30=this.selectedItem.getData();
if(_30!==null&&!dojo.isArray(_30)){
_30=[_30];
}
}
if(!this._multiSelect&&_30){
var _30=_30[0];
return (_30||_30===0)?_30:this.makeEmptyValue();
}else{
return _30;
}
},validationEnabled:function(){
return false;
},getDisplayValue:function(){
var _32="";
var _33=this.selectedItem.getCount();
for(var i=0;i<_33;i++){
if(i){
_32+=", ";
}
_32+=this._getDisplayData(this.selectedItem.isList?this.selectedItem.getItem(i):this.selectedItem);
}
return _32;
},deselectAll:function(){
this.clear();
}});
dojo.declare("wm.CheckboxSet",[wm.DataSetEditor,wm.TouchScrollMixinOptional],{singleLine:false,_multiSelect:true,_focused:false,height:"100px",mobileHeight:"150px",editors:null,_dijitClass:"dijit.form.CheckBox",postInit:function(){
this.inherited(arguments);
},setDataSet:function(_34){
this.inherited(arguments);
this.createEditor();
},connectEditor:function(){
},destroyEditor:function(){
var _35=this.editor;
if(this.dijits){
var _36=this;
dojo.forEach(this.dijits,function(d){
d.destroy();
});
}
this.dijits=[];
this.inherited(arguments);
dojo.destroy(_35);
},_createEditor:function(_37){
this.editor=_37;
this.readOnlyNode=_37;
this.editor.className="wmCheckboxSet";
var _38="";
if(this.dataSet){
var _39=this.dataSet.getCount();
for(var i=0;i<_39;i++){
var _3a=this.dataSet.getItem(i);
var id=this.getRuntimeId().replace(/\./g,"__")+"__"+i;
_38+="<div class='wmCheckboxSetItem'><input id='"+id+"' name='"+this.getRuntimeId().replace(".","_")+"' dojoType='"+this._dijitClass+"' value='"+i+"'>";
if(wm.isMobile){
_38+="<label class='wmeditor-caption'>"+this._getDisplayData(_3a)+"</label></div>";
}else{
_38+="<label class='wmeditor-caption' for='"+id+"'>"+this._getDisplayData(_3a)+"</label></div>";
}
}
this.editor.innerHTML=_38;
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
var _3b=this;
dojo.forEach(this.dijits,function(_3c){
_3b.connect(_3c,"onChange",_3b,"changed");
_3b.connect(_3c,"onFocus",_3b,"_onEditorFocused");
_3b.connect(_3c,"onBlur",_3b,"_onEditorBlurred");
_3c.domNode.style.lineHeight="normal";
});
}
this._scrollNode=this.editor;
return this.editor;
},_getTouchNode:function(_3d){
var _3e=_3d.touches?_3d.touches[0].target:_3d.target;
while(_3e&&_3e!=this.domNode&&!dojo.hasClass(_3e,"wmCheckboxSetItem")){
_3e=_3e.parentNode;
}
if(!_3e||_3e==this.domNode){
return;
}
return _3e;
},onTouchStart:function(_3f){
this.inherited(arguments);
var _40=this._touchCheckboxNode=this._getTouchNode(_3f);
if(_40&&dojo.hasClass(_40,"wmCheckboxSetItem")){
dojo.addClass(_40.firstChild,"dijitCheckBoxActive");
}
},onTouchMove:function(_41,_42,_43,_44,_45,_46,_47){
this.inherited(arguments);
if(this._touchCheckboxNode&&(Math.abs(_43)>5||Math.abs(_46)>5)){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
delete this._touchCheckboxNode;
}
},onTouchEnd:function(_48,_49){
this.inherited(arguments);
if(!_49&&this._touchCheckboxNode&&this.dijits){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
var _4a=dojo.indexOf(dojo.query(".wmCheckboxSetItem",this.domNode),this._touchCheckboxNode);
if(_4a!=-1){
this.dijits[_4a].set("checked",!this.dijits[_4a].get("checked"));
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
var _4b=[];
for(var i=0;i<this.dijits.length;i++){
if(this.dijits[i].checked){
_4b.push(this.dataSet.getItem(i));
}
}
this._dataValueValid=false;
this.selectedItem.setData(_4b);
this.inherited(arguments);
this._dataValueValid=true;
},destroy:function(){
this.inherited(arguments);
},updateReadonlyValue:function(){
if(this.readonly){
this.setReadonly(true);
}
},setReadonly:function(_4c){
var _4d=this.readonly;
this.readonly=Boolean(_4c);
if(!this.dijits){
return;
}
for(var i=0;i<this.dijits.length;i++){
var e=this.dijits[i];
var _4e=e.get("checked");
e.set("disabled",this.readonly||this._disabled);
if(!_4e){
e.domNode.parentNode.style.display=this.readonly?"none":"";
}else{
if(_4d){
e.domNode.parentNode.style.display="";
}
}
}
},setDisabled:function(_4f){
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
},selectItem:function(_50){
if(!this.dijits){
return;
}
this.dijits[_50].set("checked",true,false);
this.dijits[_50]._lastValueReported=true;
},getReadOnlyNodeOverflow:function(){
return "auto";
}});
dojo.declare("wm.ListSet",wm.DataSetEditor,{renderVisibleRowsOnly:true,singleLine:false,showSearchBar:true,selectionMode:"multiple",height:"100px",mobileHeight:"150px",editors:null,deleteColumn:false,deleteConfirm:"Are you sure you want to delete this?",prepare:function(_51){
if(_51&&_51.readonly){
delete _51.readonly;
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
this.inherited(arguments);
},setSelectionMode:function(_52){
this.selectionMode=_52;
if(this.grid){
this.grid.setSelectionMode(_52);
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
},setOptions:function(_53){
this._typeWas=this.dataSet?this.dataSet.type:"";
this.inherited(arguments);
if(this._typeWas!=this.type){
this.grid.setColumns([{show:true,width:"100%",isCustomField:Boolean(this.displayExpression),mobileColumn:true,field:this.displayExpression?"_name":this.displayField||"_name",expression:this.displayExpression}]);
this.grid.renderDojoObj();
this.setEditorValue(this.dataValue);
}
delete this._typeWas;
},setDataSet:function(_54){
var _55;
if(this._typeWas){
_55=this._typeWas;
}else{
_55=this.dataSet?this.dataSet.type:"";
}
this.inherited(arguments);
if(this.grid){
if(_54&&_54.type!=_55){
this.createEditor();
}
var _56=this.dataValue;
this.grid.setDataSet(_54);
this._inSetDataValue=true;
this.setEditorValue(_56);
delete this._inSetDataValue;
}
},changed:function(){
var _57=this.dataValue;
if(_57&&typeof _57=="object"){
_57=dojo.toJson(_57);
}
this.selectedItem.setDataSet(this.grid.selectedItem);
var _58=this.getDataValue();
if(_58&&typeof _58=="object"){
_58=dojo.toJson(_58);
}
if(_57!==_58){
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
},setShowSearchBar:function(_59){
this.showSearchBar=Boolean(_59);
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
},filterList:function(_5a,_5b){
var _5c=this.grid.getRowCount();
var _5d={};
if(_5a){
for(var i=0;i<this.grid.columns.length&&this.grid.columns[i].controller;i++){
}
_5d[this.grid.columns[i].field]="*"+_5a+"*";
}
this.grid.setQuery(_5d);
},_createEditor:function(_5e){
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
},setReadonly:function(_5f){
},setDeleteColumn:function(_60){
this.deleteColumn=_60;
if(this.grid){
this.grid.setDeleteColumn(_60);
}
},setDeleteConfirm:function(_61){
this.deleteConfirm=_61;
if(this.grid){
this.grid.deleteConfirm=_61;
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
},selectItem:function(_62){
this.grid.setSelectedRow(_62);
},onRowDeleted:function(_63,_64){
}});
}
if(!dojo._hasResource["dijit._Container"]){
dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_65,_66){
var _67=this.containerNode;
if(_66&&typeof _66=="number"){
var _68=this.getChildren();
if(_68&&_68.length>=_66){
_67=_68[_66-1].domNode;
_66="after";
}
}
dojo.place(_65.domNode,_67,_66);
if(this._started&&!_65._started){
_65.startup();
}
},removeChild:function(_69){
if(typeof _69=="number"){
_69=this.getChildren()[_69];
}
if(_69){
var _6a=_69.domNode;
if(_6a&&_6a.parentNode){
_6a.parentNode.removeChild(_6a);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},destroyDescendants:function(_6b){
dojo.forEach(this.getChildren(),function(_6c){
_6c.destroyRecursive(_6b);
});
},_getSiblingOfChild:function(_6d,dir){
var _6e=_6d.domNode,_6f=(dir>0?"nextSibling":"previousSibling");
do{
_6e=_6e[_6f];
}while(_6e&&(_6e.nodeType!=1||!dijit.byNode(_6e)));
return _6e&&dijit.byNode(_6e);
},getIndexOfChild:function(_70){
return dojo.indexOf(this.getChildren(),_70);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_71){
_71.startup();
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
var _72=this.dropDown,_73=false;
if(e&&this._opened){
var c=dojo.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_73){
if(dojo.hasClass(t,"dijitPopup")){
_73=true;
}else{
t=t.parentNode;
}
}
if(_73){
t=e.target;
if(_72.onItemClick){
var _74;
while(t&&!(_74=dijit.byNode(t))){
t=t.parentNode;
}
if(_74&&_74.onClick&&_74.getParent){
_74.getParent().onItemClick(_74,e);
}
}
return;
}
}
}
if(this._opened&&_72.focus&&_72.autoFocus!==false){
window.setTimeout(dojo.hitch(_72,"focus"),1);
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
dojo.stopEvent(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _75={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+_75+"ArrowButton");
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
var d=this.dropDown,_76=e.target;
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
if(!this._opened&&(e.charOrCode==dojo.keys.DOWN_ARROW||((e.charOrCode==dojo.keys.ENTER||e.charOrCode==" ")&&((_76.tagName||"").toLowerCase()!=="input"||(_76.type&&_76.type.toLowerCase()!=="text"))))){
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
var _77=dijit._curFocus&&this.dropDown&&dojo.isDescendant(dijit._curFocus,this.dropDown.domNode);
this.closeDropDown(_77);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_78){
_78();
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
var _79=this.dropDown,_7a=_79.domNode,_7b=this._aroundNode||this.domNode,_7c=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_7a.style.width){
this._explicitDDWidth=true;
}
if(_7a.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _7d={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_7d.width="";
}
if(!this._explicitDDHeight){
_7d.height="";
}
dojo.style(_7a,_7d);
var _7e=this.maxHeight;
if(_7e==-1){
var _7f=dojo.window.getBox(),_80=dojo.position(_7b,false);
_7e=Math.floor(Math.max(_80.y,_7f.h-(_80.y+_80.h)));
}
if(_79.startup&&!_79._started){
_79.startup();
}
dijit.popup.moveOffScreen(_79);
var mb=dojo._getMarginSize(_7a);
var _81=(_7e&&mb.h>_7e);
dojo.style(_7a,{overflowX:"hidden",overflowY:_81?"auto":"hidden"});
if(_81){
mb.h=_7e;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_7b.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_7b.offsetWidth);
}else{
delete mb.w;
}
}
if(dojo.isFunction(_79.resize)){
_79.resize(mb);
}else{
dojo.marginBox(_7a,mb);
}
}
var _82=dijit.popup.open({parent:this,popup:_79,around:_7b,orient:dijit.getPopupAroundAlignment((this.dropDownPosition&&this.dropDownPosition.length)?this.dropDownPosition:["below"],this.isLeftToRight()),onExecute:function(){
_7c.closeDropDown(true);
},onCancel:function(){
_7c.closeDropDown(true);
},onClose:function(){
dojo.attr(_7c._popupStateNode,"popupActive",false);
dojo.removeClass(_7c._popupStateNode,"dijitHasDropDownOpen");
_7c._opened=false;
}});
dojo.attr(this._popupStateNode,"popupActive","true");
dojo.addClass(_7c._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _82;
},closeDropDown:function(_83){
if(this._opened){
if(_83){
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
for(var _84=this.domNode;_84.parentNode;_84=_84.parentNode){
var _85=dijit.byNode(_84);
if(_85&&typeof _85._onSubmit=="function"){
_85._onSubmit(e);
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
},_fillContent:function(_86){
if(_86&&(!this.params||!("label" in this.params))){
this.set("label",_86.innerHTML);
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
dojo.toggleClass(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},onClick:function(e){
return true;
},_clicked:function(e){
},setLabel:function(_87){
dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_87);
},_setLabelAttr:function(_88){
this._set("label",_88);
this.containerNode.innerHTML=_88;
if(this.showLabel==false&&!this.params.title){
this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},_setIconClassAttr:function(val){
var _89=this.iconClass||"dijitNoIcon",_8a=val||"dijitNoIcon";
dojo.replaceClass(this.iconNode,_8a,_89);
this._set("iconClass",val);
}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container,dijit._HasDropDown],{baseClass:"dijitDropDownButton",templateString:dojo.cache("dijit.form","templates/DropDownButton.html","<span class=\"dijit dijitReset dijitInline\"\r\n\t><span class='dijitReset dijitInline dijitButtonNode'\r\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\" dojoAttachPoint=\"_buttonNode\"\r\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\r\n\t\t\tdojoAttachPoint=\"focusNode,titleNode,_arrowWrapperNode\"\r\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\r\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\r\n\t\t\t\tdojoAttachPoint=\"iconNode\"\r\n\t\t\t></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\r\n\t\t\t\tdojoAttachPoint=\"containerNode,_popupStateNode\"\r\n\t\t\t\tid=\"${id}_label\"\r\n\t\t\t></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\r\n\t\t></span\r\n\t></span\r\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\r\n\t\tdojoAttachPoint=\"valueNode\"\r\n/></span>\r\n"),_fillContent:function(){
if(this.srcNodeRef){
var _8b=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,_8b[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _8c=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(_8c);
delete this.dropDownContainer;
}
if(this.dropDown){
dijit.popup.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _8d=this.dropDown;
return (!!_8d&&(!_8d.href||_8d.isLoaded));
},loadDropDown:function(){
var _8e=this.dropDown;
if(!_8e){
return;
}
if(!this.isLoaded()){
var _8f=dojo.connect(_8e,"onLoad",this,function(){
dojo.disconnect(_8f);
this.openDropDown();
});
_8e.refresh();
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
},focus:function(_90){
if(!this.disabled){
dijit.focus(_90=="start"?this.titleNode:this._popupStateNode);
}
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{checked:"focusNode"}),_clicked:function(evt){
this.set("checked",!this.checked);
},_setCheckedAttr:function(_91,_92){
this._set("checked",_91);
dojo.attr(this.focusNode||this.domNode,"checked",_91);
dijit.setWaiState(this.focusNode||this.domNode,"pressed",_91);
this._handleOnChange(_91,_92);
},setChecked:function(_93){
dojo.deprecated("setChecked("+_93+") is deprecated. Use set('checked',"+_93+") instead.","","2.0");
this.set("checked",_93);
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
dojo.declare("dijit.form.CheckBox",dijit.form.ToggleButton,{templateString:dojo.cache("dijit.form","templates/CheckBox.html","<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\r\n\t><input\r\n\t \t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\r\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\r\n\t\tdojoAttachPoint=\"focusNode\"\r\n\t \tdojoAttachEvent=\"onclick:_onClick\"\r\n/></div>\r\n"),baseClass:"dijitCheckBox",type:"checkbox",value:"on",readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{readOnly:"focusNode"}),_setReadOnlyAttr:function(_94){
this._set("readOnly",_94);
dojo.attr(this.focusNode,"readOnly",_94);
dijit.setWaiState(this.focusNode,"readonly",_94);
},_setValueAttr:function(_95,_96){
if(typeof _95=="string"){
this._set("value",_95);
dojo.attr(this.focusNode,"value",_95);
_95=true;
}
if(this._created){
this.set("checked",_95,_96);
}
},_getValueAttr:function(){
return (this.checked?this.value:false);
},_setLabelAttr:undefined,postMixInProperties:function(){
if(this.value==""){
this.value="on";
}
this.checkedAttrSetting=this.checked?"checked":"";
this.inherited(arguments);
},_fillContent:function(_97){
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
dojo.declare("dijit.form.RadioButton",dijit.form.CheckBox,{type:"radio",baseClass:"dijitRadio",_setCheckedAttr:function(_98){
this.inherited(arguments);
if(!this._created){
return;
}
if(_98){
var _99=this;
dojo.query("INPUT[type=radio]",this.focusNode.form||dojo.doc).forEach(function(_9a){
if(_9a.name==_99.name&&_9a!=_99.focusNode&&_9a.form==_99.focusNode.form){
var _9b=dijit.getEnclosingWidget(_9a);
if(_9b&&_9b.checked){
_9b.set("checked",false);
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
if(!dojo._hasResource["wm.base.widget.Editors.Checkbox"]){
dojo._hasResource["wm.base.widget.Editors.Checkbox"]=true;
dojo.provide("wm.base.widget.Editors.Checkbox");
dojo.declare("wm.Checkbox",wm.AbstractEditor,{_captionTagName:"label",classNames:"wmeditor wmeditor-cbeditor",width:"180px",dataType:"boolean",startChecked:false,checkedValue:true,fixedEditorWidth:wm.isMobile?32:16,touchStart:function(){
if(this._disabled){
return;
}
this._touched=true;
this.editorNode.style.backgroundColor="black";
if(this.getChecked()){
this.editorNode.style.color="white";
}
wm.job(this.getRuntimeId()+"."+".touch",app.touchToClickDelay,dojo.hitch(this,"touchEnd"));
},touchMove:function(){
if(this._touched){
wm.cancelJob(this.getRuntimeId()+"."+".touch");
this.editorNode.style.backgroundColor="";
this.editorNode.style.color="";
this._touched=false;
}
},touchEnd:function(evt){
if(this._touched){
wm.cancelJob(this.getRuntimeId()+"."+".touch");
this.editorNode.style.backgroundColor="";
this.editorNode.style.color="";
this.setChecked(!this.getChecked(),true);
this._touched=false;
}
},_createEditor:function(_9c,_9d){
var e=new dijit.form.CheckBox(this.getEditorProps(_9c,_9d));
if(wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop"){
e._connects.forEach(function(c){
dojo.disconnect(c[0]);
});
e._connects=[];
var a=document.createElement("div");
a.className="wmcheckbox_x";
a.innerHTML="X";
e.domNode.appendChild(a);
dojo.connect(this.domNode,wm.isFakeMobile?"onmousedown":"ontouchstart",this,"touchStart");
dojo.connect(this.domNode,wm.isFakeMobile?"onmousemove":"ontouchmove",this,"touchMove");
dojo.connect(this.domNode,wm.isFakeMobile?"onmouseup":"ontouchend",this,"touchEnd");
}
return e;
},setRequired:function(){
},connectEditor:function(){
this.inherited(arguments);
},sizeEditor:function(){
if(this._cupdating){
return;
}
this.inherited(arguments);
var _9e=this.editorNode;
var _9f=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop"?32:16;
_9e.style.width=_9f+"px";
_9e.style.height=_9f+"px";
var _a0=parseInt(_9e.style.lineHeight);
_9e.style.marginTop=(Math.floor(_a0-_9f)/2)+"px";
},styleEditor:function(){
this.inherited(arguments);
var n=this.captionNode;
if(n){
dojo.setSelectable(n,false);
}
},render:function(){
this.inherited(arguments);
this.domNode.style.textAlign=(this.captionPosition=="right")?"right":"";
},setInitialValue:function(){
this.beginEditUpdate();
if(this.startChecked&&!this._setEditorValueCalled||Boolean(this.dataValue)){
this.setChecked(true);
}
this.endEditUpdate();
},editorChanged:function(){
if(this.inherited(arguments)){
this.valueChanged("checked",this.getChecked());
return true;
}
return false;
},changed:function(){
if(this.editor){
this.editor._lastValueReported=this.getChecked();
}
this.inherited(arguments);
this.valueChanged("checked",this.getChecked());
},getChecked:function(){
if(this.editor){
return Boolean(this.editor.checked);
}else{
return Boolean(this.dataValue);
}
},setChecked:function(_a1,_a2){
if(!_a2){
this._inSetDataValue=true;
}
try{
this.editor.set("checked",_a1,false);
if(!this._cupdating){
this.changed();
}
this._lastValue=this.getEditorValue();
}
catch(e){
}
delete this._inSetDataValue;
},getDisplayValue:function(){
return this.getDataValue();
},setDisplayValue:function(_a3){
},getEditorValue:function(){
var c=this.editor&&this.editor.checked;
var v=this.checkedValue;
if(v===undefined){
v=this.getTypedValue(1);
}else{
v=this.getTypedValue(v);
}
return c?v:this.makeEmptyValue();
},makeEmptyValue:function(){
return this.getTypedValue(this.inherited(arguments));
},getTypedValue:function(_a4){
var v=_a4;
switch(this.dataType){
case "string":
if(v===false){
v="false";
}else{
if(v===0){
v="0";
}else{
if(!v){
v="";
}else{
v=String(v);
}
}
}
return v;
case "number":
var n=Number(v);
return isNaN(n)?Number(Boolean(v)):n;
default:
return Boolean(v);
}
},setEditorValue:function(_a5){
this._setEditorValueCalled=true;
if(this.editor){
var _a6=this.getChecked();
this.editor.set("checked",Boolean(_a5),false);
if(_a6!=Boolean(_a5)){
this.changed();
}
}
},updateReadonlyValue:function(){
},setStartChecked:function(_a7){
this.startChecked=_a7;
this.createEditor();
},set_startChecked:function(_a8){
this.dataValue=Boolean(_a8);
this.setStartChecked(_a8);
},setDataType:function(_a9){
this.dataType=_a9;
if(_a9=="boolean"){
this.displayValue=true;
}
switch(_a9){
case "string":
break;
case "number":
if(typeof this.checkedValue=="number"){
}else{
if(String(this.checkedValue).match(/^[0-9.]+$/)){
}else{
app.toastWarning(studio.getDictionaryItem("wm.Checkbox.TOAST_WARN_CHECKED_VALUE_NOT_A_NUMBER"));
}
}
break;
case "boolean":
if(typeof this.checkedValue=="boolean"){
}else{
if(this.checkedValue=="true"){
this.checkedValue=true;
}else{
if(this.checkedValue=="false"){
this.checkedValue=false;
}else{
app.toastWarning(studio.getDictionaryItem("wm.Checkbox.TOAST_WARN_CHECKED_VALUE_NOT_A_BOOLEAN"));
}
}
}
break;
}
},setDisabled:function(_aa){
this.inherited(arguments);
if(!this.editor){
return;
}
this.editor.set("disabled",this.readonly||this._disabled);
},setReadonly:function(_ab){
this.readonly=_ab;
if(!this.editor){
return;
}
if(!this.readOnlyNode){
this.readOnlyNode=this.editor;
}
this.editor.set("disabled",this.readonly||this._disabled);
},getMinWidthProp:function(){
if(this.minWidth){
return this.minWidth;
}
var _ac=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop"?32:16;
var _ad=64;
if(this.captionPosition=="top"||this.captionPosition=="bottom"||!this.caption){
return 40;
}else{
if(this.captionSize.match(/\%/)){
return _ac+_ad;
}else{
return _ac+4+parseInt(this.captionSize);
}
}
}});
}
if(!dojo._hasResource["dijit.form.RadioButton"]){
dojo._hasResource["dijit.form.RadioButton"]=true;
dojo.provide("dijit.form.RadioButton");
}
if(!dojo._hasResource["wm.base.widget.Editors.Radiobutton"]){
dojo._hasResource["wm.base.widget.Editors.Radiobutton"]=true;
dojo.provide("wm.base.widget.Editors.Radiobutton");
dojo.declare("wm.RadioSet",wm.CheckboxSet,{singleLine:false,_multiSelect:false,_dijitClass:"dijit.form.RadioButton",setDataSet:function(_ae){
this.inherited(arguments);
this.createEditor();
},changed:function(){
if(!this.dijits){
return;
}
var _af=[];
for(var i=0;i<this.dijits.length;i++){
if(this.dijits[i].checked){
this.selectedItem.setData(this.dataSet.getItem(i));
this._dataValueValid=false;
wm.AbstractEditor.prototype.changed.call(this);
this._dataValueValid=true;
return;
}
}
}});
dojo.declare("wm.RadioButton",wm.Checkbox,{radioGroup:"default",dataType:"string",_createEditor:function(_b0,_b1){
var e=new dijit.form.RadioButton(this.getEditorProps(_b0,_b1));
if(wm.isMobile){
}
return e;
},getEditorProps:function(_b2,_b3){
return dojo.mixin(this.inherited(arguments),{name:this.radioGroup},_b3||{});
},connectEditor:function(){
this.inherited(arguments);
this.addEditorConnect(this.domNode,"ondblclick",this,function(){
this.onDblClick();
});
},setInitialValue:function(){
this.beginEditUpdate();
var _b4=false;
var g=this.getGroup();
for(var i=0;i<g.length;i++){
var o=g[i].owner;
if(o._setEditorValueCalled){
_b4=true;
this.valueChanged("groupValue",this.groupValue=o.groupValue);
break;
}else{
wm.job(this.radioGroup+".setInitialValue",1,this,"updateLastValueForGroup");
}
}
if(this.startChecked&&!_b4||this.groupValue==this.checkedValue){
this.setChecked(true);
}
this.endEditUpdate();
},getChecked:function(){
if(this.editor){
return Boolean(this.editor.checked);
}else{
return this.groupValue==this.checkedValue;
}
},setEditorValue:function(_b5){
if(_b5==this.checkedValue){
if(this.editor){
this.editor.set("checked",true);
this.updateGroupValue();
this._lastValue=this.checkedValue;
}else{
this.groupValue=this.checkedValue;
this._lastValue=this.checkedValue;
}
this.updateLastValueForGroup();
}else{
var _b6=false;
var _b7=this.getGroup(),gv=this.getGroupValue();
for(var i=0,v,o;(v=_b7[i]);i++){
if(v){
o=v.owner;
if(o.checkedValue==_b5){
o.setEditorValue(_b5);
o._lastValue=_b5;
_b6=true;
break;
}else{
o._lastValue=this.makeEmptyValue();
}
}
}
if(!_b6){
for(var i=0,v,o;(v=_b7[i]);i++){
if(v){
o=v.owner;
if(o.getChecked()){
o.setChecked(false);
this.updateGroupValue();
return;
}
}
}
}
}
this._setEditorValueCalled=true;
},setRadioGroup:function(_b8){
this.radioGroup=_b8?wm.getValidJsName(_b8):"";
var _b9=this.getGroup();
if(_b9.length){
this.dataType=_b9[0].dataType;
}
this.createEditor();
wm.fire(studio.inspector,"reinspect");
},getGroup:function(){
var _ba=[];
var _bb=dojo.query("input[type=radio][name="+(this.radioGroup||"default")+"]");
_bb.forEach(function(_bc,_bd,_be){
_ba[_bd]=dijit.getEnclosingWidget(_bc);
});
return _ba;
},updateGroupValue:function(){
var _bf=this.getGroup(),gv=this.getGroupValue();
for(var i=0,v,o;(v=_bf[i]);i++){
if(v){
o=v.owner;
if(o){
if(o.groupValue!==gv){
o.groupValue=gv;
o.valueChanged("groupValue",gv);
o.onGroupValueChange(gv);
}
}
}
}
},onGroupValueChange:function(_c0){
},setGroupValue:function(_c1){
this.setEditorValue(_c1);
},getGroupValue:function(){
var _c2=this.getGroup();
for(var i=0,v;(v=_c2[i]);i++){
if(v.checked){
return v.owner.checkedValue;
}
}
for(var i=0,v;(v=_c2[i]);i++){
return v.owner.makeEmptyValue();
}
},isLoading:function(){
var l=this.inherited(arguments);
if(!l){
var _c3=this.getGroup();
for(var i=0,v,gl;(v=_c3[i]);i++){
gl=v.owner._rendering;
if(gl){
return true;
}
}
}
return l;
},setDataType:function(_c4){
this.inherited(arguments);
var _c5=this.getGroup();
for(var i=0,v;(v=_c5[i]);i++){
v.dataType=_c4;
}
},setStartChecked:function(_c6){
if(_c6){
var _c7=this.getGroup();
for(var i=0,v,r;(v=_c7[i]);i++){
if(v!=this){
v.owner.setStartChecked(false);
}
}
}
this.inherited(arguments);
},setChecked:function(_c8,_c9){
this.inherited(arguments);
if(_c8){
this.updateGroupValue();
this._setEditorValueCalled=true;
}
this.updateLastValueForGroup();
},updateLastValueForGroup:function(){
var _ca=this.getGroup();
var _cb=this.getGroupValue();
for(var i=0,v,o;(v=_ca[i]);i++){
if(v.owner&&v.owner!=this){
v.owner._lastValue=_cb;
}
}
},editorChanged:function(){
this.inherited(arguments);
this.updateGroupValue();
return true;
},onDblClick:function(){
}});
}
if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_cc,_cd){
return new dojo.dnd.move.constrainedMoveable(_cd,_cc);
},constructor:function(_ce,_cf){
if(!_cf){
_cf={};
}
this.constraints=_cf.constraints;
this.within=_cf.within;
},onFirstMove:function(_d0){
var c=this.constraintBox=this.constraints.call(this,_d0);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_d0.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_d1,_d2){
var c=this.constraintBox,s=_d1.node.style;
this.onMoving(_d1,_d2);
_d2.l=_d2.l<c.l?c.l:c.r<_d2.l?c.r:_d2.l;
_d2.t=_d2.t<c.t?c.t:c.b<_d2.t?c.b:_d2.t;
s.left=_d2.l+"px";
s.top=_d2.t+"px";
this.onMoved(_d1,_d2);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_d3,_d4){
return new dojo.dnd.move.boxConstrainedMoveable(_d4,_d3);
},constructor:function(_d5,_d6){
var box=_d6&&_d6.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_d7,_d8){
return new dojo.dnd.move.parentConstrainedMoveable(_d8,_d7);
},constructor:function(_d9,_da){
var _db=_da&&_da.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_db=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_db=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_db=="padding"){
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
if(!dojo._hasResource["dojo.number"]){
dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.getObject("number",true,dojo);
dojo.number.format=function(_dc,_dd){
_dd=dojo.mixin({},_dd||{});
var _de=dojo.i18n.normalizeLocale(_dd.locale),_df=dojo.i18n.getLocalization("dojo.cldr","number",_de);
_dd.customs=_df;
var _e0=_dd.pattern||_df[(_dd.type||"decimal")+"Format"];
if(isNaN(_dc)||Math.abs(_dc)==Infinity){
return null;
}
return dojo.number._applyPattern(_dc,_e0,_dd);
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(_e1,_e2,_e3){
_e3=_e3||{};
var _e4=_e3.customs.group,_e5=_e3.customs.decimal,_e6=_e2.split(";"),_e7=_e6[0];
_e2=_e6[(_e1<0)?1:0]||("-"+_e7);
if(_e2.indexOf("%")!=-1){
_e1*=100;
}else{
if(_e2.indexOf("‰")!=-1){
_e1*=1000;
}else{
if(_e2.indexOf("¤")!=-1){
_e4=_e3.customs.currencyGroup||_e4;
_e5=_e3.customs.currencyDecimal||_e5;
_e2=_e2.replace(/\u00a4{1,3}/,function(_e8){
var _e9=["symbol","currency","displayName"][_e8.length-1];
return _e3[_e9]||_e3.currency||"";
});
}else{
if(_e2.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _ea=dojo.number._numberPatternRE;
var _eb=_e7.match(_ea);
if(!_eb){
throw new Error("unable to find a number expression in pattern: "+_e2);
}
if(_e3.fractional===false){
_e3.places=0;
}
return _e2.replace(_ea,dojo.number._formatAbsolute(_e1,_eb[0],{decimal:_e5,group:_e4,places:_e3.places,round:_e3.round}));
};
dojo.number.round=function(_ec,_ed,_ee){
var _ef=10/(_ee||10);
return (_ef*+_ec).toFixed(_ed)/_ef;
};
if((0.9).toFixed()==0){
(function(){
var _f0=dojo.number.round;
dojo.number.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _f0(v,p,m)+(v>0?d:-d);
};
})();
}
dojo.number._formatAbsolute=function(_f1,_f2,_f3){
_f3=_f3||{};
if(_f3.places===true){
_f3.places=0;
}
if(_f3.places===Infinity){
_f3.places=6;
}
var _f4=_f2.split("."),_f5=typeof _f3.places=="string"&&_f3.places.indexOf(","),_f6=_f3.places;
if(_f5){
_f6=_f3.places.substring(_f5+1);
}else{
if(!(_f6>=0)){
_f6=(_f4[1]||[]).length;
}
}
if(!(_f3.round<0)){
_f1=dojo.number.round(_f1,_f6,_f3.round);
}
var _f7=String(Math.abs(_f1)).split("."),_f8=_f7[1]||"";
if(_f4[1]||_f3.places){
if(_f5){
_f3.places=_f3.places.substring(0,_f5);
}
var pad=_f3.places!==undefined?_f3.places:(_f4[1]&&_f4[1].lastIndexOf("0")+1);
if(pad>_f8.length){
_f7[1]=dojo.string.pad(_f8,pad,"0",true);
}
if(_f6<_f8.length){
_f7[1]=_f8.substr(0,_f6);
}
}else{
if(_f7[1]){
_f7.pop();
}
}
var _f9=_f4[0].replace(",","");
pad=_f9.indexOf("0");
if(pad!=-1){
pad=_f9.length-pad;
if(pad>_f7[0].length){
_f7[0]=dojo.string.pad(_f7[0],pad);
}
if(_f9.indexOf("#")==-1){
_f7[0]=_f7[0].substr(_f7[0].length-pad);
}
}
var _fa=_f4[0].lastIndexOf(","),_fb,_fc;
if(_fa!=-1){
_fb=_f4[0].length-_fa-1;
var _fd=_f4[0].substr(0,_fa);
_fa=_fd.lastIndexOf(",");
if(_fa!=-1){
_fc=_fd.length-_fa-1;
}
}
var _fe=[];
for(var _ff=_f7[0];_ff;){
var off=_ff.length-_fb;
_fe.push((off>0)?_ff.substr(off):_ff);
_ff=(off>0)?_ff.slice(0,off):"";
if(_fc){
_fb=_fc;
delete _fc;
}
}
_f7[0]=_fe.reverse().join(_f3.group||",");
return _f7.join(_f3.decimal||".");
};
dojo.number.regexp=function(_100){
return dojo.number._parseInfo(_100).regexp;
};
dojo.number._parseInfo=function(_101){
_101=_101||{};
var _102=dojo.i18n.normalizeLocale(_101.locale),_103=dojo.i18n.getLocalization("dojo.cldr","number",_102),_104=_101.pattern||_103[(_101.type||"decimal")+"Format"],_105=_103.group,_106=_103.decimal,_107=1;
if(_104.indexOf("%")!=-1){
_107/=100;
}else{
if(_104.indexOf("‰")!=-1){
_107/=1000;
}else{
var _108=_104.indexOf("¤")!=-1;
if(_108){
_105=_103.currencyGroup||_105;
_106=_103.currencyDecimal||_106;
}
}
}
var _109=_104.split(";");
if(_109.length==1){
_109.push("-"+_109[0]);
}
var re=dojo.regexp.buildGroupRE(_109,function(_10a){
_10a="(?:"+dojo.regexp.escapeString(_10a,".")+")";
return _10a.replace(dojo.number._numberPatternRE,function(_10b){
var _10c={signed:false,separator:_101.strict?_105:[_105,""],fractional:_101.fractional,decimal:_106,exponent:false},_10d=_10b.split("."),_10e=_101.places;
if(_10d.length==1&&_107!=1){
_10d[1]="###";
}
if(_10d.length==1||_10e===0){
_10c.fractional=false;
}else{
if(_10e===undefined){
_10e=_101.pattern?_10d[1].lastIndexOf("0")+1:Infinity;
}
if(_10e&&_101.fractional==undefined){
_10c.fractional=true;
}
if(!_101.places&&(_10e<_10d[1].length)){
_10e+=","+_10d[1].length;
}
_10c.places=_10e;
}
var _10f=_10d[0].split(",");
if(_10f.length>1){
_10c.groupSize=_10f.pop().length;
if(_10f.length>1){
_10c.groupSize2=_10f.pop().length;
}
}
return "("+dojo.number._realNumberRegexp(_10c)+")";
});
},true);
if(_108){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_110,_111,_112,_113){
var prop=["symbol","currency","displayName"][_112.length-1],_114=dojo.regexp.escapeString(_101[prop]||_101.currency||"");
_111=_111?"[\\s\\xa0]":"";
_113=_113?"[\\s\\xa0]":"";
if(!_101.strict){
if(_111){
_111+="*";
}
if(_113){
_113+="*";
}
return "(?:"+_111+_114+_113+")?";
}
return _111+_114+_113;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_105,decimal:_106,factor:_107};
};
dojo.number.parse=function(_115,_116){
var info=dojo.number._parseInfo(_116),_117=(new RegExp("^"+info.regexp+"$")).exec(_115);
if(!_117){
return NaN;
}
var _118=_117[1];
if(!_117[1]){
if(!_117[2]){
return NaN;
}
_118=_117[2];
info.factor*=-1;
}
_118=_118.replace(new RegExp("["+info.group+"\\s\\xa0"+"]","g"),"").replace(info.decimal,".");
return _118*info.factor;
};
dojo.number._realNumberRegexp=function(_119){
_119=_119||{};
if(!("places" in _119)){
_119.places=Infinity;
}
if(typeof _119.decimal!="string"){
_119.decimal=".";
}
if(!("fractional" in _119)||/^0/.test(_119.places)){
_119.fractional=[true,false];
}
if(!("exponent" in _119)){
_119.exponent=[true,false];
}
if(!("eSigned" in _119)){
_119.eSigned=[true,false];
}
var _11a=dojo.number._integerRegexp(_119),_11b=dojo.regexp.buildGroupRE(_119.fractional,function(q){
var re="";
if(q&&(_119.places!==0)){
re="\\"+_119.decimal;
if(_119.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_119.places+"}";
}
}
return re;
},true);
var _11c=dojo.regexp.buildGroupRE(_119.exponent,function(q){
if(q){
return "([eE]"+dojo.number._integerRegexp({signed:_119.eSigned})+")";
}
return "";
});
var _11d=_11a+_11b;
if(_11b){
_11d="(?:(?:"+_11d+")|(?:"+_11b+"))";
}
return _11d+_11c;
};
dojo.number._integerRegexp=function(_11e){
_11e=_11e||{};
if(!("signed" in _11e)){
_11e.signed=[true,false];
}
if(!("separator" in _11e)){
_11e.separator="";
}else{
if(!("groupSize" in _11e)){
_11e.groupSize=3;
}
}
var _11f=dojo.regexp.buildGroupRE(_11e.signed,function(q){
return q?"[-+]":"";
},true);
var _120=dojo.regexp.buildGroupRE(_11e.separator,function(sep){
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
var grp=_11e.groupSize,grp2=_11e.groupSize2;
if(grp2){
var _121="(?:0|[1-9]\\d{0,"+(grp2-1)+"}(?:["+sep+"]\\d{"+grp2+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-grp2)>0)?"(?:"+_121+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_121;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _11f+_120;
};
}
if(!dojo._hasResource["dijit.form.HorizontalSlider"]){
dojo._hasResource["dijit.form.HorizontalSlider"]=true;
dojo.provide("dijit.form.HorizontalSlider");
dojo.declare("dijit.form.HorizontalSlider",[dijit.form._FormValueWidget,dijit._Container],{templateString:dojo.cache("dijit.form","templates/HorizontalSlider.html","<table class=\"dijit dijitReset dijitSlider dijitSliderH\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" dojoAttachEvent=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t\t><td dojoAttachPoint=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\r\n\t\t\t><div class=\"dijitSliderDecrementIconH\" style=\"display:none\" dojoAttachPoint=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" dojoAttachEvent=\"onmousedown:_onClkDecBumper\"></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\r\n\t\t\t/><div class=\"dijitReset dijitSliderBarContainerH\" role=\"presentation\" dojoAttachPoint=\"sliderBarContainer\"\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" dojoAttachEvent=\"onmousedown:_onBarClick\"\r\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableH\"\r\n\t\t\t\t\t\t><div dojoAttachPoint=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleH\" dojoAttachEvent=\"onmousedown:_onHandleClick\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" dojoAttachEvent=\"onmousedown:_onBarClick\"></div\r\n\t\t\t></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" dojoAttachEvent=\"onmousedown:_onClkIncBumper\"></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\r\n\t\t\t><div class=\"dijitSliderIncrementIconH\" style=\"display:none\" dojoAttachPoint=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t\t><td dojoAttachPoint=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t></tr\r\n></table>\r\n"),value:0,showButtons:true,minimum:0,maximum:100,discreteValues:Infinity,pageIncrement:2,clickSelect:true,slideDuration:dijit.defaultDuration,widgetsInTemplate:true,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{id:""}),baseClass:"dijitSlider",cssStateNodes:{incrementButton:"dijitSliderIncrementButton",decrementButton:"dijitSliderDecrementButton",focusNode:"dijitSliderThumb"},_mousePixelCoord:"pageX",_pixelCount:"w",_startingPixelCoord:"x",_startingPixelCount:"l",_handleOffsetCoord:"left",_progressPixelSize:"width",dynamicSlider:false,_onKeyUp:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey||e.metaKey){
return;
}
this._setValueAttr(this.value,true);
},_onKeyPress:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey||e.metaKey){
return;
}
switch(e.charOrCode){
case dojo.keys.HOME:
this._setValueAttr(this.minimum,false);
break;
case dojo.keys.END:
this._setValueAttr(this.maximum,false);
break;
case ((this._descending||this.isLeftToRight())?dojo.keys.RIGHT_ARROW:dojo.keys.LEFT_ARROW):
case (this._descending===false?dojo.keys.DOWN_ARROW:dojo.keys.UP_ARROW):
case (this._descending===false?dojo.keys.PAGE_DOWN:dojo.keys.PAGE_UP):
this.increment(e);
break;
case ((this._descending||this.isLeftToRight())?dojo.keys.LEFT_ARROW:dojo.keys.RIGHT_ARROW):
case (this._descending===false?dojo.keys.UP_ARROW:dojo.keys.DOWN_ARROW):
case (this._descending===false?dojo.keys.PAGE_UP:dojo.keys.PAGE_DOWN):
this.decrement(e);
break;
default:
return;
}
dojo.stopEvent(e);
},_onHandleClick:function(e){
if(this.disabled||this.readOnly){
return;
}
if(!dojo.isIE){
dijit.focus(this.sliderHandle);
}
dojo.stopEvent(e);
},_isReversed:function(){
return !this.isLeftToRight();
},_onBarClick:function(e){
if(this.disabled||this.readOnly||!this.clickSelect){
return;
}
dijit.focus(this.sliderHandle);
dojo.stopEvent(e);
var _122=dojo.position(this.sliderBarContainer,true);
var _123=e[this._mousePixelCoord]-_122[this._startingPixelCoord];
this._setPixelValue(this._isReversed()?(_122[this._pixelCount]-_123):_123,_122[this._pixelCount],true);
this._movable.onMouseDown(e);
},_setPixelValue:function(_124,_125,_126){
if(this.dynamicSlider){
var now=new Date().getTime();
if(!this._dynamicSliderTimestamp||this._dynamicSliderTimestamp+100<now){
_126=true;
this._dynamicSliderTimestamp=now;
if(this.domNode&&this.domNode.id){
wm.cancelJob(this.domNode.id+"._setPixelValue");
}
}else{
if(this.domNode&&this.domNode.id){
var self=this;
wm.job(this.domNode.id+"._setPixelValue",60,function(){
self._setValueAttr((this.maximum-this.minimum)*_127/_128+this.minimum,true);
});
}
}
}
if(this.disabled||this.readOnly){
return;
}
_124=_124<0?0:_125<_124?_125:_124;
var _128=this.discreteValues;
if(_128<=1||_128==Infinity){
_128=_125;
}
_128--;
var _129=_125/_128;
var _127=Math.round(_124/_129);
this._setValueAttr((this.maximum-this.minimum)*_127/_128+this.minimum,_126);
},_setValueAttr:function(_12a,_12b){
this._set("value",_12a);
this.valueNode.value=_12a;
dijit.setWaiState(this.focusNode,"valuenow",_12a);
this.inherited(arguments);
var _12c=(_12a-this.minimum)/(this.maximum-this.minimum);
var _12d=(this._descending===false)?this.remainingBar:this.progressBar;
var _12e=(this._descending===false)?this.progressBar:this.remainingBar;
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
if(_12b&&this.slideDuration>0&&_12d.style[this._progressPixelSize]){
var _12f=this;
var _130={};
var _131=parseFloat(_12d.style[this._progressPixelSize]);
var _132=this.slideDuration*(_12c-_131/100);
if(_132==0){
return;
}
if(_132<0){
_132=0-_132;
}
_130[this._progressPixelSize]={start:_131,end:_12c*100,units:"%"};
this._inProgressAnim=dojo.animateProperty({node:_12d,duration:_132,onAnimate:function(v){
_12e.style[_12f._progressPixelSize]=(100-parseFloat(v[_12f._progressPixelSize]))+"%";
},onEnd:function(){
delete _12f._inProgressAnim;
},properties:_130});
this._inProgressAnim.play();
}else{
_12d.style[this._progressPixelSize]=(_12c*100)+"%";
_12e.style[this._progressPixelSize]=((1-_12c)*100)+"%";
}
},_bumpValue:function(_133,_134){
if(this.disabled||this.readOnly){
return;
}
var s=dojo.getComputedStyle(this.sliderBarContainer);
var c=dojo._getContentBox(this.sliderBarContainer,s);
var _135=this.discreteValues;
if(_135<=1||_135==Infinity){
_135=c[this._pixelCount];
}
_135--;
var _136=(this.value-this.minimum)*_135/(this.maximum-this.minimum)+_133;
if(_136<0){
_136=0;
}
if(_136>_135){
_136=_135;
}
_136=_136*(this.maximum-this.minimum)/_135+this.minimum;
this._setValueAttr(_136,_134);
},_onClkBumper:function(val){
if(this.disabled||this.readOnly||!this.clickSelect){
return;
}
this._setValueAttr(val,true);
},_onClkIncBumper:function(){
this._onClkBumper(this._descending===false?this.minimum:this.maximum);
},_onClkDecBumper:function(){
this._onClkBumper(this._descending===false?this.maximum:this.minimum);
},decrement:function(e){
this._bumpValue(e.charOrCode==dojo.keys.PAGE_DOWN?-this.pageIncrement:-1);
},increment:function(e){
this._bumpValue(e.charOrCode==dojo.keys.PAGE_UP?this.pageIncrement:1);
},_mouseWheeled:function(evt){
dojo.stopEvent(evt);
var _137=!dojo.isMozilla;
var _138=evt[(_137?"wheelDelta":"detail")]*(_137?1:-1);
this._bumpValue(_138<0?-1:1,true);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_139){
if(this[_139.container]!=this.containerNode){
this[_139.container].appendChild(_139.domNode);
}
},this);
this.inherited(arguments);
},_typematicCallback:function(_13a,_13b,e){
if(_13a==-1){
this._setValueAttr(this.value,true);
}else{
this[(_13b==(this._descending?this.incrementButton:this.decrementButton))?"decrement":"increment"](e);
}
},buildRendering:function(){
this.inherited(arguments);
if(this.showButtons){
this.incrementButton.style.display="";
this.decrementButton.style.display="";
}
var _13c=dojo.query("label[for=\""+this.id+"\"]");
if(_13c.length){
_13c[0].id=(this.id+"_label");
dijit.setWaiState(this.focusNode,"labelledby",_13c[0].id);
}
dijit.setWaiState(this.focusNode,"valuemin",this.minimum);
dijit.setWaiState(this.focusNode,"valuemax",this.maximum);
},postCreate:function(){
this.inherited(arguments);
if(this.showButtons){
this._connects.push(dijit.typematic.addMouseListener(this.decrementButton,this,"_typematicCallback",25,500));
this._connects.push(dijit.typematic.addMouseListener(this.incrementButton,this,"_typematicCallback",25,500));
}
this.connect(this.domNode,!dojo.isMozilla?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
var _13d=dojo.declare(dijit.form._SliderMover,{widget:this});
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:_13d});
this._layoutHackIE7();
},destroy:function(){
this._movable.destroy();
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
this._supportingWidgets=dijit.findWidgets(this.domNode);
this.inherited(arguments);
}});
dojo.declare("dijit.form._SliderMover",dojo.dnd.Mover,{onMouseMove:function(e){
var _13e=this.widget;
var _13f=_13e._abspos;
if(!_13f){
_13f=_13e._abspos=dojo.position(_13e.sliderBarContainer,true);
_13e._setPixelValue_=dojo.hitch(_13e,"_setPixelValue");
_13e._isReversed_=_13e._isReversed();
}
var _140=e.touches?e.touches[0]:e,_141=_140[_13e._mousePixelCoord]-_13f[_13e._startingPixelCoord];
_13e._setPixelValue_(_13e._isReversed_?(_13f[_13e._pixelCount]-_141):_141,_13f[_13e._pixelCount],false);
},onMouseUp:function(e){
this.inherited(arguments);
this.destroy();
},destroy:function(e){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _142=this.widget;
_142._abspos=null;
_142._setValueAttr(_142.value,true);
}});
}
if(!dojo._hasResource["dijit.form.VerticalSlider"]){
dojo._hasResource["dijit.form.VerticalSlider"]=true;
dojo.provide("dijit.form.VerticalSlider");
dojo.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:dojo.cache("dijit.form","templates/VerticalSlider.html","<table class=\"dijit dijitReset dijitSlider dijitSliderV\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" dojoAttachEvent=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderIncrementIconV\" style=\"display:none\" dojoAttachPoint=\"decrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper\" dojoAttachEvent=\"onmousedown:_onClkIncBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td dojoAttachPoint=\"leftDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV\"></td\r\n\t\t><td class=\"dijitReset dijitSliderDecorationC\" style=\"height:100%;\"\r\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\r\n\t\t\t/><center class=\"dijitReset dijitSliderBarContainerV\" role=\"presentation\" dojoAttachPoint=\"sliderBarContainer\"\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV\" dojoAttachEvent=\"onmousedown:_onBarClick\"><!--#5629--></div\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV\" dojoAttachEvent=\"onmousedown:_onBarClick\"\r\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableV\" style=\"vertical-align:top;\"\r\n\t\t\t\t\t\t><div dojoAttachPoint=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleV\" dojoAttachEvent=\"onmousedown:_onHandleClick\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint=\"containerNode,rightDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper\" dojoAttachEvent=\"onmousedown:_onClkDecBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderDecrementIconV\" style=\"display:none\" dojoAttachPoint=\"incrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n></table>\r\n"),_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_descending:true,_isReversed:function(){
return this._descending;
}});
}
if(!dojo._hasResource["dijit.form._Spinner"]){
dojo._hasResource["dijit.form._Spinner"]=true;
dojo.provide("dijit.form._Spinner");
dojo.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,minimumTimeout:10,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:dojo.cache("dijit.form","templates/Spinner.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\r\n\tid=\"widget_${id}\" role=\"presentation\"\r\n\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\r\n\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t/><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\"\r\n\t\t\tdojoAttachPoint=\"upArrowNode\"\r\n\t\t\t><div class=\"dijitArrowButtonInner\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t></div\r\n\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\"\r\n\t\t\tdojoAttachPoint=\"downArrowNode\"\r\n\t\t\t><div class=\"dijitArrowButtonInner\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t></div\r\n\t></div\r\n\t><div class='dijitReset dijitValidationContainer'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t/></div\r\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class='dijitReset dijitInputInner' dojoAttachPoint=\"textbox,focusNode\" type=\"${type}\" dojoAttachEvent=\"onkeypress:_onKeyPress\"\r\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\r\n\t/></div\r\n></div>\r\n"),baseClass:"dijitTextBox dijitSpinner",cssStateNodes:{"upArrowNode":"dijitUpArrowButton","downArrowNode":"dijitDownArrowButton"},adjust:function(val,_143){
return val;
},_arrowPressed:function(_144,_145,_146){
if(this.disabled||this.readOnly){
return;
}
this._setValueAttr(this.adjust(this.get("value"),_145*_146),false);
dijit.selectInputText(this.textbox,this.textbox.value.length);
},_arrowReleased:function(node){
this._wheelTimer=null;
if(this.disabled||this.readOnly){
return;
}
},_typematicCallback:function(_147,node,evt){
var inc=this.smallDelta;
if(node==this.textbox){
var k=dojo.keys;
var key=evt.charOrCode;
inc=(key==k.PAGE_UP||key==k.PAGE_DOWN)?this.largeDelta:this.smallDelta;
node=(key==k.UP_ARROW||key==k.PAGE_UP)?this.upArrowNode:this.downArrowNode;
}
if(_147==-1){
this._arrowReleased(node);
}else{
this._arrowPressed(node,(node==this.upArrowNode)?1:-1,inc);
}
},_wheelTimer:null,_mouseWheeled:function(evt){
dojo.stopEvent(evt);
var _148=evt.detail?(evt.detail*-1):(evt.wheelDelta/120);
if(_148!==0){
var node=this[(_148>0?"upArrowNode":"downArrowNode")];
this._arrowPressed(node,_148,this.smallDelta);
if(!this._wheelTimer){
clearTimeout(this._wheelTimer);
}
this._wheelTimer=setTimeout(dojo.hitch(this,"_arrowReleased",node),50);
}
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,!dojo.isMozilla?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
this._connects.push(dijit.typematic.addListener(this.upArrowNode,this.textbox,{charOrCode:dojo.keys.UP_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
this._connects.push(dijit.typematic.addListener(this.downArrowNode,this.textbox,{charOrCode:dojo.keys.DOWN_ARROW,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
this._connects.push(dijit.typematic.addListener(this.upArrowNode,this.textbox,{charOrCode:dojo.keys.PAGE_UP,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
this._connects.push(dijit.typematic.addListener(this.downArrowNode,this.textbox,{charOrCode:dojo.keys.PAGE_DOWN,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false},this,"_typematicCallback",this.timeoutChangeRate,this.defaultTimeout,this.minimumTimeout));
}});
}
if(!dojo._hasResource["dijit.form.NumberTextBox"]){
dojo._hasResource["dijit.form.NumberTextBox"]=true;
dojo.provide("dijit.form.NumberTextBox");
dojo.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:dojo.number.regexp,value:NaN,editOptions:{pattern:"#.######"},_formatter:dojo.number.format,_setConstraintsAttr:function(_149){
var _14a=typeof _149.places=="number"?_149.places:0;
if(_14a){
_14a++;
}
if(typeof _149.max!="number"){
_149.max=9*Math.pow(10,15-_14a);
}
if(typeof _149.min!="number"){
_149.min=-9*Math.pow(10,15-_14a);
}
this.inherited(arguments,[_149]);
if(this.focusNode&&this.focusNode.value&&!isNaN(this.value)){
this.set("value",this.value);
}
},_onFocus:function(){
if(this.disabled){
return;
}
var val=this.get("value");
if(typeof val=="number"&&!isNaN(val)){
var _14b=this.format(val,this.constraints);
if(_14b!==undefined){
this.textbox.value=_14b;
}
}
this.inherited(arguments);
},format:function(_14c,_14d){
var _14e=String(_14c);
if(typeof _14c!="number"){
return _14e;
}
if(isNaN(_14c)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_14c,_14d))&&_14d.exponent!==false&&/\de[-+]?\d/i.test(_14e)){
return _14e;
}
if(this.editOptions&&this._focused){
_14d=dojo.mixin({},_14d,this.editOptions);
}
return this._formatter(_14c,_14d);
},_parser:dojo.number.parse,parse:function(_14f,_150){
var v=this._parser(_14f,dojo.mixin({},_150,(this.editOptions&&this._focused)?this.editOptions:{}));
if(this.editOptions&&this._focused&&isNaN(v)){
v=this._parser(_14f,_150);
}
return v;
},_getDisplayedValueAttr:function(){
var v=this.inherited(arguments);
return isNaN(v)?this.textbox.value:v;
},filter:function(_151){
return (_151===null||_151===""||_151===undefined)?NaN:this.inherited(arguments);
},serialize:function(_152,_153){
return (typeof _152!="number"||isNaN(_152))?"":this.inherited(arguments);
},_setBlurValue:function(){
var val=dojo.hitch(dojo.mixin({},this,{_focused:true}),"get")("value");
this._setValueAttr(val,true);
},_setValueAttr:function(_154,_155,_156){
if(_154!==undefined&&_156===undefined){
_156=String(_154);
if(typeof _154=="number"){
if(isNaN(_154)){
_156="";
}else{
if(("rangeCheck" in this&&this.rangeCheck(_154,this.constraints))||this.constraints.exponent===false||!/\de[-+]?\d/i.test(_156)){
_156=undefined;
}
}
}else{
if(!_154){
_156="";
_154=NaN;
}else{
_154=undefined;
}
}
}
this.inherited(arguments,[_154,_155,_156]);
},_getValueAttr:function(){
var v=this.inherited(arguments);
if(isNaN(v)&&this.textbox.value!==""){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)&&(new RegExp("^"+dojo.number._realNumberRegexp(dojo.mixin({},this.constraints))+"$").test(this.textbox.value))){
var n=Number(this.textbox.value);
return isNaN(n)?undefined:n;
}else{
return undefined;
}
}else{
return v;
}
},isValid:function(_157){
if(!this._focused||this._isEmpty(this.textbox.value)){
return this.inherited(arguments);
}else{
var v=this.get("value");
if(!isNaN(v)&&this.rangeCheck(v,this.constraints)){
if(this.constraints.exponent!==false&&/\de[-+]?\d/i.test(this.textbox.value)){
return true;
}else{
return this.inherited(arguments);
}
}else{
return false;
}
}
}});
dojo.declare("dijit.form.NumberTextBox",[dijit.form.RangeBoundTextBox,dijit.form.NumberTextBoxMixin],{baseClass:"dijitTextBox dijitNumberTextBox"});
}
if(!dojo._hasResource["dijit.form.NumberSpinner"]){
dojo._hasResource["dijit.form.NumberSpinner"]=true;
dojo.provide("dijit.form.NumberSpinner");
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{adjust:function(val,_158){
var tc=this.constraints,v=isNaN(val),_159=!isNaN(tc.max),_15a=!isNaN(tc.min);
if(v&&_158!=0){
val=(_158>0)?_15a?tc.min:_159?tc.max:0:_159?this.constraints.max:_15a?tc.min:0;
}
var _15b=val+_158;
if(v||isNaN(_15b)){
return val;
}
if(_159&&(_15b>tc.max)){
_15b=tc.max;
}
if(_15a&&(_15b<tc.min)){
_15b=tc.min;
}
return _15b;
},_onKeyPress:function(e){
if((e.charOrCode==dojo.keys.HOME||e.charOrCode==dojo.keys.END)&&!(e.ctrlKey||e.altKey||e.metaKey)&&typeof this.get("value")!="undefined"){
var _15c=this.constraints[(e.charOrCode==dojo.keys.HOME?"min":"max")];
if(typeof _15c=="number"){
this._setValueAttr(_15c,false);
}
dojo.stopEvent(e);
}
}});
}
if(!dojo._hasResource["dojo.cldr.monetary"]){
dojo._hasResource["dojo.cldr.monetary"]=true;
dojo.provide("dojo.cldr.monetary");
dojo.getObject("cldr.monetary",true,dojo);
dojo.cldr.monetary.getData=function(code){
var _15d={ADP:0,AFN:0,ALL:0,AMD:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,COP:0,CRC:0,DJF:0,ESP:0,GNF:0,GYD:0,HUF:0,IDR:0,IQD:0,IRR:3,ISK:0,ITL:0,JOD:3,JPY:0,KMF:0,KPW:0,KRW:0,KWD:3,LAK:0,LBP:0,LUF:0,LYD:3,MGA:0,MGF:0,MMK:0,MNT:0,MRO:0,MUR:0,OMR:3,PKR:0,PYG:0,RSD:0,RWF:0,SLL:0,SOS:0,STD:0,SYP:0,TMM:0,TND:3,TRL:0,TZS:0,UGX:0,UZS:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,YER:0,ZMK:0,ZWD:0};
var _15e={CHF:5};
var _15f=_15d[code],_160=_15e[code];
if(typeof _15f=="undefined"){
_15f=2;
}
if(typeof _160=="undefined"){
_160=0;
}
return {places:_15f,round:_160};
};
}
if(!dojo._hasResource["dojo.currency"]){
dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.getObject("currency",true,dojo);
dojo.currency._mixInDefaults=function(_161){
_161=_161||{};
_161.type="currency";
var _162=dojo.i18n.getLocalization("dojo.cldr","currency",_161.locale)||{};
var iso=_161.currency;
var data=dojo.cldr.monetary.getData(iso);
dojo.forEach(["displayName","symbol","group","decimal"],function(prop){
data[prop]=_162[iso+"_"+prop];
});
data.fractional=[true,false];
return dojo.mixin(data,_161);
};
dojo.currency.format=function(_163,_164){
return dojo.number.format(_163,dojo.currency._mixInDefaults(_164));
};
dojo.currency.regexp=function(_165){
return dojo.number.regexp(dojo.currency._mixInDefaults(_165));
};
dojo.currency.parse=function(_166,_167){
return dojo.number.parse(_166,dojo.currency._mixInDefaults(_167));
};
}
if(!dojo._hasResource["dijit.form.CurrencyTextBox"]){
dojo._hasResource["dijit.form.CurrencyTextBox"]=true;
dojo.provide("dijit.form.CurrencyTextBox");
dojo.declare("dijit.form.CurrencyTextBox",dijit.form.NumberTextBox,{currency:"",baseClass:"dijitTextBox dijitCurrencyTextBox",regExpGen:function(_168){
return "("+(this._focused?this.inherited(arguments,[dojo.mixin({},_168,this.editOptions)])+"|":"")+dojo.currency.regexp(_168)+")";
},_formatter:dojo.currency.format,_parser:dojo.currency.parse,parse:function(_169,_16a){
var v=this.inherited(arguments);
if(isNaN(v)&&/\d+/.test(_169)){
v=dojo.hitch(dojo.mixin({},this,{_parser:dijit.form.NumberTextBox.prototype._parser}),"inherited")(arguments);
}
return v;
},_setConstraintsAttr:function(_16b){
if(!_16b.currency&&this.currency){
_16b.currency=this.currency;
}
this.inherited(arguments,[dojo.currency._mixInDefaults(dojo.mixin(_16b,{exponent:false}))]);
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.Number"]){
dojo._hasResource["wm.base.widget.Editors.Number"]=true;
dojo.provide("wm.base.widget.Editors.Number");
dijit.form.NumberTextBox.extend({format:function(_16c,_16d){
var _16e=String(_16c);
if(typeof _16c!="number"){
return _16e;
}
if(isNaN(_16c)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_16c,_16d))&&_16d.exponent!==false&&/de[-+]?d/i.test(_16e)){
return _16e;
}
_16d=dojo.mixin({},_16d,this.editOptions);
if(!this._focused){
delete _16d.pattern;
}
return this._formatter(_16c,_16d);
},_refreshState:function(){
var _16f=this.get("displayedValue");
var _170=_16f.indexOf(".");
if(this.editOptions.places&&this.editOptions.placeWhileTyping&&_170!=-1){
var _171=_16f.substr(0,_170)+"."+_16f.substr(_170+1,this.editOptions.places);
if(_171!=_16f){
this.focusNode.value=_171;
}
}
this.inherited(arguments);
}});
dojo.declare("wm.Number",wm.Text,{spinnerButtons:false,minimum:"",maximum:"",places:"",noFormatting:false,applyPlacesWhileTyping:false,_messages:{rangeMin:"Minimum number must be less than the maximum setting of ${0}.",rangeMax:"Maximum number must be greater than the minimum setting of ${0}."},rangeMessage:"",validationEnabled:function(){
return true;
},connectEditor:function(){
this.inherited(arguments);
if(this.spinnerButtons){
this.addEditorConnect(this.editor,"onClick",this,"changed");
}
},getEditorConstraints:function(){
var _172={};
if(!isNaN(parseInt(this.minimum))){
_172.min=Number(this.minimum);
}
if(!isNaN(parseInt(this.maximum))){
_172.max=Number(this.maximum);
}
return _172;
},getEditorProps:function(_173,_174){
var v=this.displayValue;
var _175=this.getEditorConstraints();
var p=dojo.mixin(this.inherited(arguments),{constraints:_175,rangeMessage:this.rangeMessage,required:this.required,value:v?Number(v):"",editOptions:dojo.clone(dijit.form.NumberTextBox.prototype.editOptions)},_174||{});
if(this.noFormatting){
p._formatter=function(_176){
return _176;
};
}
var _177=this._getPlaces();
if(_177!==""){
p.editOptions.places=_177;
p.editOptions.placeWhileTyping=this.applyPlacesWhileTyping;
}
return p;
},_getPlaces:function(){
if(this.places===""){
return this.places;
}else{
return Number(this.places);
}
},_createEditor:function(_178,_179){
var e;
if(this.spinnerButtons&&!wm.isMobile){
e=new dijit.form.NumberSpinner(this.getEditorProps(_178,_179));
}else{
e=new dijit.form.NumberTextBox(this.getEditorProps(_178,_179));
}
return e;
},setMaximum:function(_17a){
var v=(_17a==="")?"":Number(_17a);
if(this.minimum===""||this.minimum<v||v===""){
this.maximum=v;
if(this.editor){
this.editor._setConstraintsAttr(this.getEditorConstraints());
this.editor.validate();
}
}else{
if(this.isDesignLoaded()&&!(this.$.binding&&this.$.binding.wires.maximum)){
app.alert(dojo.string.substitute(this._messages.rangeMax,[this.minimum]));
}
}
},setMinimum:function(_17b){
var v=(_17b==="")?"":Number(_17b);
if(this.maximum===""||v<this.maximum||v===""){
this.minimum=v;
if(this.editor){
this.editor._setConstraintsAttr(this.getEditorConstraints());
this.editor.validate();
}
}else{
if(this.isDesignLoaded()&&!(this.$.binding&&this.$.binding.wires.minimum)){
app.alert(dojo.string.substitute(this._messages.rangeMin,[this.maximum]));
}
}
},_getReadonlyValue:function(){
return dojo.number.format(this.getDataValue(),this.getFormatProps());
},getFormatProps:function(){
var _17c={};
if(this.places&&this.places!=""){
_17c.places=parseInt(this.places);
}
return _17c;
},setSpinnerButtons:function(_17d){
if(this.spinnerButtons!=_17d){
this.spinnerButtons=_17d;
this.createEditor();
}
},calcIsDirty:function(a,b){
if(a===0&&b===""||a===""&&b===0){
return false;
}
return a!==b;
}});
dojo.declare("wm.Currency",wm.Number,{currency:"",getEditorProps:function(_17e,_17f){
var prop=this.inherited(arguments);
if(prop.constraints){
delete prop.constraints.pattern;
}
return dojo.mixin(prop,{currency:this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD"},_17f||{});
},_createEditor:function(_180,_181){
return new dijit.form.CurrencyTextBox(this.getEditorProps(_180,_181));
},_getReadonlyValue:function(){
return dojo.currency.format(this.dataValue,{currency:this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD",places:parseInt(this.places)});
},setEditorValue:function(_182){
var v=_182;
if(this.editor){
v=dojo.currency.parse(dojo.currency.format(String(v).replace(/[^0-9\-\.]/g,""),this.editor.constraints),this.editor.constraints);
}
wm.AbstractEditor.prototype.setEditorValue.call(this,v);
},getDataValue:function(){
return this.dataValue;
},editorChanged:function(){
var _183=this.dataValue;
this.dataValue=this.getEditorValue();
var _184=this.displayValue;
this.displayValue=this._getReadonlyValue();
var _185=false;
if(_183!=this._lastValue){
this.valueChanged("dataValue",this.dataValue);
_185=true;
}
if(_184!=this.displayValue){
this.valueChanged("displayValue",this.displayValue);
_185=true;
}
if(_185){
if(this._inPostInit){
this._lastValue=this.dataValue;
}
this.updateIsDirty();
}
return _185;
},setCurrency:function(_186){
this.currency=_186;
this.createEditor();
}});
}
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(args){
var _187=this;
dojo.mixin(_187,args);
_187.node=args.node;
_187._showArgs=dojo.mixin({},args);
_187._showArgs.node=_187.node;
_187._showArgs.duration=_187.showDuration;
_187.showAnim=_187.showFunc(_187._showArgs);
_187._hideArgs=dojo.mixin({},args);
_187._hideArgs.node=_187.node;
_187._hideArgs.duration=_187.hideDuration;
_187.hideAnim=_187.hideFunc(_187._hideArgs);
dojo.connect(_187.showAnim,"beforeBegin",dojo.hitch(_187.hideAnim,"stop",true));
dojo.connect(_187.hideAnim,"beforeBegin",dojo.hitch(_187.showAnim,"stop",true));
},show:function(_188){
return this.showAnim.play(_188||0);
},hide:function(_189){
return this.hideAnim.play(_189||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_18a={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _18b=function(_18c){
this._index=-1;
this._animations=_18c||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_18b,{_onAnimate:function(){
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
},play:function(_18d,_18e){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_18e&&this._current.status()=="playing"){
return this;
}
var _18f=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_190=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_191=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_18f);
d.disconnect(_190);
d.disconnect(_191);
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
},gotoPercent:function(_192,_193){
this.pause();
var _194=this.duration*_192;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_194){
this._current=a;
return true;
}
_194-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_194/this._current.duration,_193);
}
return this;
},stop:function(_195){
if(this._current){
if(_195){
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
d.extend(_18b,_18a);
dojo.fx.chain=function(_196){
return new _18b(_196);
};
var _197=function(_198){
this._animations=_198||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_198,function(a){
var _199=a.duration;
if(a.delay){
_199+=a.delay;
}
if(this.duration<_199){
this.duration=_199;
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
d.extend(_197,{_doAction:function(_19a,args){
d.forEach(this._animations,function(a){
a[_19a].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_19b,args){
var t=this._pseudoAnimation;
t[_19b].apply(t,args);
},play:function(_19c,_19d){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_19e,_19f){
var ms=this.duration*_19e;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_19f);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_1a0){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_197,_18a);
dojo.fx.combine=function(_1a1){
return new _197(_1a1);
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
var _1a2=d.style(node,"height");
return Math.max(_1a2,1);
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
if(!dojo._hasResource["dojox.fx._base"]){
dojo._hasResource["dojox.fx._base"]=true;
dojo.provide("dojox.fx._base");
dojo.mixin(dojox.fx,{anim:dojo.anim,animateProperty:dojo.animateProperty,fadeTo:dojo._fade,fadeIn:dojo.fadeIn,fadeOut:dojo.fadeOut,combine:dojo.fx.combine,chain:dojo.fx.chain,slideTo:dojo.fx.slideTo,wipeIn:dojo.fx.wipeIn,wipeOut:dojo.fx.wipeOut});
dojox.fx.sizeTo=function(args){
var node=args.node=dojo.byId(args.node),abs="absolute";
var _1a3=args.method||"chain";
if(!args.duration){
args.duration=500;
}
if(_1a3=="chain"){
args.duration=Math.floor(args.duration/2);
}
var top,_1a4,left,_1a5,_1a6,_1a7=null;
var init=(function(n){
return function(){
var cs=dojo.getComputedStyle(n),pos=cs.position,w=cs.width,h=cs.height;
top=(pos==abs?n.offsetTop:parseInt(cs.top)||0);
left=(pos==abs?n.offsetLeft:parseInt(cs.left)||0);
_1a6=(w=="auto"?0:parseInt(w));
_1a7=(h=="auto"?0:parseInt(h));
_1a5=left-Math.floor((args.width-_1a6)/2);
_1a4=top-Math.floor((args.height-_1a7)/2);
if(pos!=abs&&pos!="relative"){
var ret=dojo.coords(n,true);
top=ret.y;
left=ret.x;
n.style.position=abs;
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
var _1a8=dojo.animateProperty(dojo.mixin({properties:{height:function(){
init();
return {end:args.height||0,start:_1a7};
},top:function(){
return {start:top,end:_1a4};
}}},args));
var _1a9=dojo.animateProperty(dojo.mixin({properties:{width:function(){
return {start:_1a6,end:args.width||0};
},left:function(){
return {start:left,end:_1a5};
}}},args));
var anim=dojo.fx[(args.method=="combine"?"combine":"chain")]([_1a8,_1a9]);
return anim;
};
dojox.fx.slideBy=function(args){
var node=args.node=dojo.byId(args.node),top,left;
var init=(function(n){
return function(){
var cs=dojo.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=dojo.coords(n,true);
top=ret.y;
left=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=left+"px";
}
};
})(node);
init();
var _1aa=dojo.animateProperty(dojo.mixin({properties:{top:top+(args.top||0),left:left+(args.left||0)}},args));
dojo.connect(_1aa,"beforeBegin",_1aa,init);
return _1aa;
};
dojox.fx.crossFade=function(args){
var _1ab=args.nodes[0]=dojo.byId(args.nodes[0]),op1=dojo.style(_1ab,"opacity"),_1ac=args.nodes[1]=dojo.byId(args.nodes[1]),op2=dojo.style(_1ac,"opacity");
var _1ad=dojo.fx.combine([dojo[(op1==0?"fadeIn":"fadeOut")](dojo.mixin({node:_1ab},args)),dojo[(op1==0?"fadeOut":"fadeIn")](dojo.mixin({node:_1ac},args))]);
return _1ad;
};
dojox.fx.highlight=function(args){
var node=args.node=dojo.byId(args.node);
args.duration=args.duration||400;
var _1ae=args.color||"#ffff99",_1af=dojo.style(node,"backgroundColor");
if(_1af=="rgba(0, 0, 0, 0)"){
_1af="transparent";
}
var anim=dojo.animateProperty(dojo.mixin({properties:{backgroundColor:{start:_1ae,end:_1af}}},args));
if(_1af=="transparent"){
dojo.connect(anim,"onEnd",anim,function(){
node.style.backgroundColor=_1af;
});
}
return anim;
};
dojox.fx.wipeTo=function(args){
args.node=dojo.byId(args.node);
var node=args.node,s=node.style;
var dir=(args.width?"width":"height"),_1b0=args[dir],_1b1={};
_1b1[dir]={start:function(){
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s[dir]="1px";
s.display="";
s.visibility="";
return 1;
}else{
var now=dojo.style(node,dir);
return Math.max(now,1);
}
},end:_1b0};
var anim=dojo.animateProperty(dojo.mixin({properties:_1b1},args));
return anim;
};
}
if(!dojo._hasResource["dojox.fx"]){
dojo._hasResource["dojox.fx"]=true;
dojo.provide("dojox.fx");
}
if(!dojo._hasResource["dojox.form.RangeSlider"]){
dojo._hasResource["dojox.form.RangeSlider"]=true;
dojo.provide("dojox.form.RangeSlider");
(function(){
var _1b2=function(a,b){
return b-a;
},_1b3=function(a,b){
return a-b;
};
dojo.declare("dojox.form._RangeSliderMixin",null,{value:[0,100],postMixInProperties:function(){
this.inherited(arguments);
this.value=dojo.map(this.value,function(i){
return parseInt(i,10);
});
},postCreate:function(){
this.inherited(arguments);
this.value.sort(this._isReversed()?_1b2:_1b3);
var _1b4=this;
var _1b5=dojo.declare(dijit.form._SliderMoverMax,{constructor:function(){
this.widget=_1b4;
}});
this._movableMax=new dojo.dnd.Moveable(this.sliderHandleMax,{mover:_1b5});
dijit.setWaiState(this.focusNodeMax,"valuemin",this.minimum);
dijit.setWaiState(this.focusNodeMax,"valuemax",this.maximum);
var _1b6=dojo.declare(dijit.form._SliderBarMover,{constructor:function(){
this.widget=_1b4;
}});
this._movableBar=new dojo.dnd.Moveable(this.progressBar,{mover:_1b6});
},destroy:function(){
this.inherited(arguments);
this._movableMax.destroy();
this._movableBar.destroy();
},_onKeyPress:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey){
return;
}
var _1b7=e.currentTarget,_1b8=false,_1b9=false,k=dojo.keys;
if(_1b7==this.sliderHandle){
_1b8=true;
}else{
if(_1b7==this.progressBar){
_1b9=_1b8=true;
}else{
if(_1b7==this.sliderHandleMax){
_1b9=true;
}
}
}
switch(e.keyCode){
case k.HOME:
this._setValueAttr(this.minimum,true,_1b9);
break;
case k.END:
this._setValueAttr(this.maximum,true,_1b9);
break;
case ((this._descending||this.isLeftToRight())?k.RIGHT_ARROW:k.LEFT_ARROW):
case (this._descending===false?k.DOWN_ARROW:k.UP_ARROW):
case (this._descending===false?k.PAGE_DOWN:k.PAGE_UP):
if(_1b8&&_1b9){
this._bumpValue([{"change":e.keyCode==k.PAGE_UP?this.pageIncrement:1,"useMaxValue":true},{"change":e.keyCode==k.PAGE_UP?this.pageIncrement:1,"useMaxValue":false}]);
}else{
if(_1b8){
this._bumpValue(e.keyCode==k.PAGE_UP?this.pageIncrement:1,true);
}else{
if(_1b9){
this._bumpValue(e.keyCode==k.PAGE_UP?this.pageIncrement:1);
}
}
}
break;
case ((this._descending||this.isLeftToRight())?k.LEFT_ARROW:k.RIGHT_ARROW):
case (this._descending===false?k.UP_ARROW:k.DOWN_ARROW):
case (this._descending===false?k.PAGE_UP:k.PAGE_DOWN):
if(_1b8&&_1b9){
this._bumpValue([{change:e.keyCode==k.PAGE_DOWN?-this.pageIncrement:-1,useMaxValue:false},{change:e.keyCode==k.PAGE_DOWN?-this.pageIncrement:-1,useMaxValue:true}]);
}else{
if(_1b8){
this._bumpValue(e.keyCode==k.PAGE_DOWN?-this.pageIncrement:-1);
}else{
if(_1b9){
this._bumpValue(e.keyCode==k.PAGE_DOWN?-this.pageIncrement:-1,true);
}
}
}
break;
default:
dijit.form._FormValueWidget.prototype._onKeyPress.apply(this,arguments);
this.inherited(arguments);
return;
}
dojo.stopEvent(e);
},_onHandleClickMax:function(e){
if(this.disabled||this.readOnly){
return;
}
if(!dojo.isIE){
dijit.focus(this.sliderHandleMax);
}
dojo.stopEvent(e);
},_onClkIncBumper:function(){
this._setValueAttr(this._descending===false?this.minimum:this.maximum,true,true);
},_bumpValue:function(_1ba,_1bb){
var _1bc=dojo.isArray(_1ba)?[this._getBumpValue(_1ba[0].change,_1ba[0].useMaxValue),this._getBumpValue(_1ba[1].change,_1ba[1].useMaxValue)]:this._getBumpValue(_1ba,_1bb);
this._setValueAttr(_1bc,true,!dojo.isArray(_1ba)&&((_1ba>0&&!_1bb)||(_1bb&&_1ba<0)));
},_getBumpValue:function(_1bd,_1be){
var s=dojo.getComputedStyle(this.sliderBarContainer),c=dojo._getContentBox(this.sliderBarContainer,s),_1bf=this.discreteValues,_1c0=!_1be?this.value[0]:this.value[1];
if(_1bf<=1||_1bf==Infinity){
_1bf=c[this._pixelCount];
}
_1bf--;
if((this._isReversed()&&_1bd<0)||(_1bd>0&&!this._isReversed())){
_1c0=!_1be?this.value[1]:this.value[0];
}
var _1c1=(_1c0-this.minimum)*_1bf/(this.maximum-this.minimum)+_1bd;
if(_1c1<0){
_1c1=0;
}
if(_1c1>_1bf){
_1c1=_1bf;
}
return _1c1*(this.maximum-this.minimum)/_1bf+this.minimum;
},_onBarClick:function(e){
if(this.disabled||this.readOnly){
return;
}
if(!dojo.isIE){
dijit.focus(this.progressBar);
}
dojo.stopEvent(e);
},_onRemainingBarClick:function(e){
if(this.disabled||this.readOnly){
return;
}
if(!dojo.isIE){
dijit.focus(this.progressBar);
}
var _1c2=dojo.coords(this.sliderBarContainer,true),bar=dojo.coords(this.progressBar,true),_1c3=e[this._mousePixelCoord]-_1c2[this._startingPixelCoord],_1c4=bar[this._startingPixelCount],_1c5=_1c4+bar[this._pixelCount],_1c6=this._isReversed()?_1c3<=_1c4:_1c3>=_1c5,p=this._isReversed()?_1c2[this._pixelCount]-_1c3:_1c3;
this._setPixelValue(p,_1c2[this._pixelCount],true,_1c6);
dojo.stopEvent(e);
},_setPixelValue:function(_1c7,_1c8,_1c9,_1ca){
if(this.dynamicSlider){
_1c9=true;
}
if(this.disabled||this.readOnly){
return;
}
var _1cb=this._getValueByPixelValue(_1c7,_1c8);
this._setValueAttr(_1cb,_1c9,_1ca);
},_getValueByPixelValue:function(_1cc,_1cd){
_1cc=_1cc<0?0:_1cd<_1cc?_1cd:_1cc;
var _1ce=this.discreteValues;
if(_1ce<=1||_1ce==Infinity){
_1ce=_1cd;
}
_1ce--;
var _1cf=_1cd/_1ce;
var _1d0=Math.round(_1cc/_1cf);
return (this.maximum-this.minimum)*_1d0/_1ce+this.minimum;
},_setValueAttr:function(_1d1,_1d2,_1d3){
var _1d4=this.value;
if(!dojo.isArray(_1d4)){
_1d4=[0,0];
}
if(!dojo.isArray(_1d1)){
if(_1d3){
if(this._isReversed()){
_1d4[0]=_1d1;
}else{
_1d4[1]=_1d1;
}
}else{
if(this._isReversed()){
_1d4[1]=_1d1;
}else{
_1d4[0]=_1d1;
}
}
}else{
_1d4=_1d1;
}
this._lastValueReported="";
this.valueNode.value=this.value=_1d1=_1d4;
dijit.setWaiState(this.focusNode,"valuenow",_1d4[0]);
dijit.setWaiState(this.focusNodeMax,"valuenow",_1d4[1]);
this.value.sort(this._isReversed()?_1b2:_1b3);
dijit.form._FormValueWidget.prototype._setValueAttr.apply(this,arguments);
this._printSliderBar(_1d2,_1d3);
},_printSliderBar:function(_1d5,_1d6){
var _1d7=(this.value[0]-this.minimum)/(this.maximum-this.minimum);
var _1d8=(this.value[1]-this.minimum)/(this.maximum-this.minimum);
var _1d9=_1d7;
if(_1d7>_1d8){
_1d7=_1d8;
_1d8=_1d9;
}
var _1da=this._isReversed()?((1-_1d7)*100):(_1d7*100);
var _1db=this._isReversed()?((1-_1d8)*100):(_1d8*100);
var _1dc=this._isReversed()?((1-_1d8)*100):(_1d7*100);
if(_1d5&&this.slideDuration>0&&this.progressBar.style[this._progressPixelSize]){
var _1dd=_1d6?_1d8:_1d7;
var _1de=this;
var _1df={};
var _1e0=parseFloat(this.progressBar.style[this._handleOffsetCoord]);
var _1e1=this.slideDuration/10;
if(_1e1===0){
return;
}
if(_1e1<0){
_1e1=0-_1e1;
}
var _1e2={};
var _1e3={};
var _1e4={};
_1e2[this._handleOffsetCoord]={start:this.sliderHandle.style[this._handleOffsetCoord],end:_1da,units:"%"};
_1e3[this._handleOffsetCoord]={start:this.sliderHandleMax.style[this._handleOffsetCoord],end:_1db,units:"%"};
_1e4[this._handleOffsetCoord]={start:this.progressBar.style[this._handleOffsetCoord],end:_1dc,units:"%"};
_1e4[this._progressPixelSize]={start:this.progressBar.style[this._progressPixelSize],end:(_1d8-_1d7)*100,units:"%"};
var _1e5=dojo.animateProperty({node:this.sliderHandle,duration:_1e1,properties:_1e2});
var _1e6=dojo.animateProperty({node:this.sliderHandleMax,duration:_1e1,properties:_1e3});
var _1e7=dojo.animateProperty({node:this.progressBar,duration:_1e1,properties:_1e4});
var _1e8=dojo.fx.combine([_1e5,_1e6,_1e7]);
_1e8.play();
}else{
this.sliderHandle.style[this._handleOffsetCoord]=_1da+"%";
this.sliderHandleMax.style[this._handleOffsetCoord]=_1db+"%";
this.progressBar.style[this._handleOffsetCoord]=_1dc+"%";
this.progressBar.style[this._progressPixelSize]=((_1d8-_1d7)*100)+"%";
}
}});
dojo.declare("dijit.form._SliderMoverMax",dijit.form._SliderMover,{onMouseMove:function(e){
var _1e9=this.widget;
var _1ea=_1e9._abspos;
if(!_1ea){
_1ea=_1e9._abspos=dojo.coords(_1e9.sliderBarContainer,true);
_1e9._setPixelValue_=dojo.hitch(_1e9,"_setPixelValue");
_1e9._isReversed_=_1e9._isReversed();
}
var _1eb=e.touches?e.touches[0]:e;
var _1ec=_1eb[_1e9._mousePixelCoord]-_1ea[_1e9._startingPixelCoord];
_1e9._setPixelValue_(_1e9._isReversed_?(_1ea[_1e9._pixelCount]-_1ec):_1ec,_1ea[_1e9._pixelCount],false,true);
},destroy:function(e){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _1ed=this.widget;
_1ed._abspos=null;
_1ed._setValueAttr(_1ed.value,true);
}});
dojo.declare("dijit.form._SliderBarMover",dojo.dnd.Mover,{onMouseMove:function(e){
var _1ee=this.widget;
if(_1ee.disabled||_1ee.readOnly){
return;
}
var _1ef=_1ee._abspos;
var bar=_1ee._bar;
var _1f0=_1ee._mouseOffset;
if(!_1ef){
_1ef=_1ee._abspos=dojo.coords(_1ee.sliderBarContainer,true);
_1ee._setPixelValue_=dojo.hitch(_1ee,"_setPixelValue");
_1ee._getValueByPixelValue_=dojo.hitch(_1ee,"_getValueByPixelValue");
_1ee._isReversed_=_1ee._isReversed();
}
if(!bar){
bar=_1ee._bar=dojo.coords(_1ee.progressBar,true);
}
var _1f1=e.touches?e.touches[0]:e;
if(!_1f0){
_1f0=_1ee._mouseOffset=_1f1[_1ee._mousePixelCoord]-_1ef[_1ee._startingPixelCoord]-bar[_1ee._startingPixelCount];
}
var _1f2=_1f1[_1ee._mousePixelCoord]-_1ef[_1ee._startingPixelCoord]-_1f0,_1f3=_1f2+bar[_1ee._pixelCount];
pixelValues=[_1f2,_1f3];
pixelValues.sort(_1b3);
if(pixelValues[0]<=0){
pixelValues[0]=0;
pixelValues[1]=bar[_1ee._pixelCount];
}
if(pixelValues[1]>=_1ef[_1ee._pixelCount]){
pixelValues[1]=_1ef[_1ee._pixelCount];
pixelValues[0]=_1ef[_1ee._pixelCount]-bar[_1ee._pixelCount];
}
var _1f4=[_1ee._getValueByPixelValue(_1ee._isReversed_?(_1ef[_1ee._pixelCount]-pixelValues[0]):pixelValues[0],_1ef[_1ee._pixelCount]),_1ee._getValueByPixelValue(_1ee._isReversed_?(_1ef[_1ee._pixelCount]-pixelValues[1]):pixelValues[1],_1ef[_1ee._pixelCount])];
_1ee._setValueAttr(_1f4,false,false);
},destroy:function(){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _1f5=this.widget;
_1f5._abspos=null;
_1f5._bar=null;
_1f5._mouseOffset=null;
_1f5._setValueAttr(_1f5.value,true);
}});
dojo.declare("dojox.form.HorizontalRangeSlider",[dijit.form.HorizontalSlider,dojox.form._RangeSliderMixin],{templateString:dojo.cache("dojox.form","resources/HorizontalRangeSlider.html","<table class=\"dijit dijitReset dijitSlider dijitSliderH dojoxRangeSlider\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" dojoAttachEvent=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t\t><td dojoAttachPoint=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\r\n\t\t\t><div class=\"dijitSliderDecrementIconH\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" dojoAttachEvent=\"onmousedown:_onClkDecBumper\"></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\r\n\t\t\t/><div role=\"presentation\" class=\"dojoxRangeSliderBarContainer\" dojoAttachPoint=\"sliderBarContainer\"\r\n\t\t\t\t><div dojoAttachPoint=\"sliderHandle\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableH\" dojoAttachEvent=\"onmousedown:_onHandleClick\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\r\n\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleH\"></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar,focusNode\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" dojoAttachEvent=\"onmousedown:_onBarClick\"></div\r\n\t\t\t\t><div dojoAttachPoint=\"sliderHandleMax,focusNodeMax\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableH\" dojoAttachEvent=\"onmousedown:_onHandleClickMax\" role=\"sliderMax\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\r\n\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleH\"></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" dojoAttachEvent=\"onmousedown:_onRemainingBarClick\"></div\r\n\t\t\t></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" dojoAttachEvent=\"onmousedown:_onClkIncBumper\"></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\r\n\t\t\t><div class=\"dijitSliderIncrementIconH\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t\t><td dojoAttachPoint=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t></tr\r\n></table>\r\n")});
dojo.declare("dojox.form.VerticalRangeSlider",[dijit.form.VerticalSlider,dojox.form._RangeSliderMixin],{templateString:dojo.cache("dojox.form","resources/VerticalRangeSlider.html","<table class=\"dijitReset dijitSlider dijitSliderV dojoxRangeSlider\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\"\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderIncrementIconV\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"decrementButton\" dojoAttachEvent=\"onclick: increment\"><span class=\"dijitSliderButtonInner\">+</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper\" dojoAttachEvent=\"onclick:_onClkIncBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td dojoAttachPoint=\"leftDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV\" style=\"text-align:center;height:100%;\"></td\r\n\t\t><td class=\"dijitReset\" style=\"height:100%;\"\r\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\r\n\t\t\t/><center role=\"presentation\" style=\"position:relative;height:100%;\" dojoAttachPoint=\"sliderBarContainer\"\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV\" dojoAttachEvent=\"onmousedown:_onRemainingBarClick\"\r\n\t\t\t\t\t><div dojoAttachPoint=\"sliderHandle\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableV\" dojoAttachEvent=\"onkeypress:_onKeyPress,onmousedown:_onHandleClick\" style=\"vertical-align:top;\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\r\n\t\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleV\"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar,focusNode\" tabIndex=\"${tabIndex}\" class=\"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV\" dojoAttachEvent=\"onkeypress:_onKeyPress,onmousedown:_onBarClick\"\r\n\t\t\t\t\t></div\r\n\t\t\t\t\t><div dojoAttachPoint=\"sliderHandleMax,focusNodeMax\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableV\" dojoAttachEvent=\"onkeypress:_onKeyPress,onmousedown:_onHandleClickMax\" style=\"vertical-align:top;\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\r\n\t\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleV\"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint=\"containerNode,rightDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV\" style=\"text-align:center;height:100%;\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper\" dojoAttachEvent=\"onclick:_onClkDecBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderDecrementIconV\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"incrementButton\" dojoAttachEvent=\"onclick: decrement\"><span class=\"dijitSliderButtonInner\">-</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n></table>\r\n")});
})();
}
if(!dojo._hasResource["wm.base.widget.Editors.Slider"]){
dojo._hasResource["wm.base.widget.Editors.Slider"]=true;
dojo.provide("wm.base.widget.Editors.Slider");
dojo.declare("wm.Slider",wm.AbstractEditor,{minimum:0,maximum:100,showButtons:true,discreteValues:"",verticalSlider:false,editorBorder:false,integerValues:true,dynamicSlider:true,showToolTip:true,reflow:function(){
},setVerticalSlider:function(_1f6){
this.verticalSlider=_1f6;
if(this.editor){
this.createEditor();
}
if(this.verticalSlider){
this.editor.incrementButton.style.width="auto";
this.editor.decrementButton.style.width="auto";
}
},getEditorProps:function(_1f7,_1f8){
var v=this.dataValue;
var minV=Number(this.minimum)?Number(this.minimum):0;
if(!v||(Number(v)<minV)){
v=this.displayValue=minV;
}
return dojo.mixin(this.inherited(arguments),{dynamicSlider:this.dynamicSlider,minimum:Number(this.minimum),maximum:Number(this.maximum),showButtons:Boolean(this.showButtons),discreteValues:Number(this.discreteValues)||Infinity,value:v},_1f8||{});
},setMaximum:function(_1f9){
this.maximum=(_1f9==="")?100:Number(_1f9);
if(this.editor){
this.editor.maximum=this.maximum;
this.editor._setValueAttr(this.dataValue,true);
}
},setMinimum:function(_1fa){
this.minimum=(_1fa==="")?0:Number(_1fa);
if(this.editor){
this.editor.minimum=this.minimum;
this.editor._setValueAttr(this.dataValue,true);
}
},_createEditor:function(_1fb,_1fc){
var div=dojo.create("div");
var _1fd;
if(this.verticalSlider){
_1fd=new dijit.form.VerticalSlider(this.getEditorProps(_1fb,_1fc));
}else{
_1fd=new dijit.form.HorizontalSlider(this.getEditorProps(_1fb,_1fc));
}
div.appendChild(_1fd.domNode);
_1fd.domNode=div;
return _1fd;
},sizeEditor:function(){
if(this._cupdating){
return;
}
this.inherited(arguments);
this.editor._setStyleAttr("height: "+this.editor.domNode.style.height+";width:"+this.editor.domNode.style.width);
},getEditorValue:function(){
var _1fe=this.inherited(arguments);
if(this.integerValues){
return Math.round(_1fe);
}else{
return _1fe;
}
},editorChanged:function(){
var _1ff=this.inherited(arguments);
if(_1ff){
if(this.showToolTip&&this.dynamicSlider&&!this._cupdating){
app.createToolTip(this.getDisplayValue(),this.domNode,null,this);
}
}
return _1ff;
}});
dojo.declare("wm.RangeSlider",wm.Slider,{init:function(){
this.inherited(arguments);
if(this.displayValue){
this.dataValue=this.displayValue.split(/,/);
}
wm.addStyleSheet("/wavemaker/lib/dojo/dojox/form/resources/RangeSlider.css");
},_createEditor:function(_200,_201){
var div=dojo.create("div");
var _202=new dojox.form.HorizontalRangeSlider(this.getEditorProps(_200,_201));
div.appendChild(_202.domNode);
_202.domNode=div;
return _202;
},getEditorValue:function(){
var _203=wm.AbstractEditor.prototype.getEditorValue.call(this);
if(this.integerValues){
_203[0]=Math.round(_203[0]);
_203[1]=Math.round(_203[1]);
}
return _203;
},getDisplayValue:function(){
var _204=this.getEditorValue();
return _204[0]+","+_204[1];
},getTopValue:function(){
return this.getEditorValue()[1];
},getBottomValue:function(){
return this.getEditorValue()[0];
},setDisplayValue:function(_205){
if(typeof _205=="string"){
_205=_205.split(/\s*,\s*/);
}
this.inherited(arguments,[_205]);
},setTopValue:function(_206){
this.setDataValue([this.getBottomValue(),_206]);
},setBottomValue:function(_207){
this.setDataValue([_207,this.getTopValue()]);
},calcIsDirty:function(_208,_209){
if(!_208&&_209||!_209&&_208){
return true;
}
return (_208[0]==_209[0]&&_208[1]==_209[1]);
},editorChanged:function(){
this.inherited(arguments);
var _20a=this.getEditorValue();
this.valueChanged("bottomValue",_20a[0]);
this.valueChanged("topValue",_20a[1]);
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_editors_misc",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
