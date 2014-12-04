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

dojo.provide("wm.compressed.wm_editors_old");
if(!dojo._hasResource["wm.base.widget.Editors.Base"]){
dojo._hasResource["wm.base.widget.Editors.Base"]=true;
dojo.provide("wm.base.widget.Editors.Base");
wm.propertyIsChanged=function(_1,_2,_3){
var p=(_3||0).prototype;
return p&&p[_2]!==_1;
};
wm.defaultEmptyValue=function(_4){
switch(_4){
case "Text":
return "";
case "Number":
return 0;
}
};
wm.createFieldEditor=function(_5,_6,_7,_8,_9){
var _a=dojo.mixin({},wm.getFieldEditorProps(_6),_7);
var _b=wm.getValidJsName(_a.name||"editor1");
return _5.owner.loadComponent(_b,_5,_9||"wm._TextEditor1",_a,_8);
};
dojo.declare("wm._BaseEditor",wm.Widget,{classNames:"wmeditor",width:"100%",height:"100%",editorBorder:true,border:0,changeOnKey:false,changeOnEnter:false,required:false,showMessages:true,init:function(){
this._editorConnects=[];
this.name="editor";
this.setOwner(this.parent);
this.singleLine=this.owner.singleLine;
this.readonly=this.owner.readonly;
this.disabled=this.owner.disabled;
this.inherited(arguments);
},postInit:function(){
this.createEditor();
this.inherited(arguments);
},destroy:function(){
this.destroyEditor();
this.inherited(arguments);
},createEditor:function(_c){
this.destroyEditor();
var n=document.createElement("div");
this.domNode.appendChild(n);
this.startTimerWithName("CreateDijit",this.declaredClass);
this.editor=this._createEditor(n,_c);
this.stopTimerWithName("CreateDijit",this.declaredClass);
if(this.editor){
this.styleEditor();
if(this.validationEnabled()){
this.validatorNode=this._getValidatorNode();
}
this.sizeEditor();
this.connectEditor();
this.setRequired(this.required);
this.setInitialValue();
this.setReadonly(this.readonly);
}
this.editor.owner=this;
if(this.editor.displayMessage){
this.editor.displayMessage=function(_d){
if(!this.owner.showMessages){
return;
}
var o=dojo.getObject(this.declaredClass);
if(o){
o.prototype.displayMessage.apply(this,arguments);
}
};
}
return this.editor;
},validationEnabled:function(){
if(this.isLoading()){
return false;
}else{
return true;
}
},_createEditor:function(_e,_f){
return new dijit.form.TextBox(this.getEditorProps(_e,_f));
},destroyEditor:function(){
this.disconnectEditor();
wm.fire(this.editor,"destroy");
this.editor=null;
},styleEditor:function(){
},sizeEditor:function(){
if(this._cupdating){
return;
}
var e=this.editor;
if(e){
var _10=this.getContentBounds(),_11=_10.h?_10.h-2+"px":"",_12=_10.w?_10.w-4:"",d=e&&e.domNode,s=d.style,fc=d&&d.firstChild;
if(this._editorPaddingLeft){
_12-=this._editorPaddingLeft;
}
if(this._editorPaddingRight){
_12-=this._editorPaddingRight;
}
if(_12){
_12+="px";
}
if(!this.editorBorder){
s.border=0;
}
s.backgroundColor=this.editorBorder?"":"transparent";
s.backgroundImage=this.editorBorder?"":"none";
s.width=_12;
if(_11){
if(fc){
dojo.forEach(fc.childNodes,function(c){
if(c.style){
c.style.height=_11;
}
});
}
if(e.focusNode&&e.focusNode.style){
e.focusNode.style.height=_11;
}
}
}
},renderBounds:function(){
this.inherited(arguments);
this.sizeEditor();
},setEditorBorder:function(_13){
this.editorBorder=_13;
this.render();
},addEditorConnect:function(_14){
this._editorConnects.push(dojo.connect.apply(dojo,arguments));
},connectEditor:function(){
this.disconnectEditor();
this.addEditorConnect(this.editor,"onChange",this,"changed");
this.addEditorConnect(this.editor,"onBlur",this,"blurred");
this.addEditorConnect(this.editor,"_onFocus",this,"focused");
this.addEditorConnect(this.editor.domNode,"onkeypress",this,"keypressed");
this.addEditorConnect(this.editor.domNode,"onkeypress",this,"dokeypress");
if(this.validationEnabled()){
this.addEditorConnect(this.editor,"validate",this,"editorValidated");
}
},disconnectEditor:function(){
dojo.forEach(this._editorConnects,dojo.disconnect);
this._editorConnects=[];
},invalidate:function(){
delete this._isValid;
},keypressed:function(){
this.validate();
},blurred:function(){
this.validate();
this.owner.doOnblur();
},doOnblur:function(){
if(!this.disabled){
this.onblur();
}
},focused:function(){
this.owner.doOnfocus();
},changed:function(){
this.validate();
this.owner.doOnchange();
},_getValidatorNode:function(){
var n=this.editor&&this.editor.domNode.firstChild;
if(!n){
return null;
}
for(var i=0,c,_15=n.childNodes;c=_15[i];i++){
if(dojo.hasClass(c,"dijitValidationIcon")){
return c;
}
}
},editorValidated:function(){
if(this.validatorNode){
this.validatorNode.style.display=this.editor.state=="Error"?"":"none";
}
},validate:function(){
if(this.validationEnabled()){
this.invalidate();
}
wm.job(this.getRuntimeId(),25,dojo.hitch(this,function(){
wm.fire(this.owner,"validate");
}));
},getEditorProps:function(_16,_17){
return dojo.mixin({srcNodeRef:_16,owner:this,disabled:this.owner.disabled},_17||{});
},getInvalid:function(){
if(!this.validationEnabled()){
return false;
}
if(this.editor&&this.editor.isValid){
if(this._isValid===undefined){
this._isValid=this.editor.isValid();
}
return !(this.readonly||this._isValid);
}
},_getReadonlyValue:function(){
return this.getDisplayValue()||"";
},setReadonly:function(_18){
this.readonly=_18;
var dn=this.domNode,pn=this.editor.domNode.parentNode;
if(this.readonly){
if(pn==dn){
dn.removeChild(this.editor.domNode);
}
wm.fire(this.editor,"_hideTooltip");
}else{
if(pn!=dn){
dn.innerHTML="";
dn.appendChild(this.editor.domNode);
this.owner.reflow();
}
}
this.updateReadonlyValue();
},updateReadonlyValue:function(){
if(this.readonly&&(!this.editor.domNode.parentNode||!this.editor.domNode.parentNode.id)){
if(wm._CheckBoxEditor&&this instanceof wm._CheckBoxEditor){
this.setReadonlyValue();
}else{
this.domNode.innerHTML=this._getReadonlyValue();
}
}
},getDisplayValue:function(){
return this.editor&&this.editor.declaredClass&&this.editor.get&&this.editor.get("displayedValue")?this.editor.get("displayedValue")||"":this.getEditorValue()||"";
},makeEmptyValue:function(){
switch(this.owner.emptyValue){
case "null":
return null;
case "false":
return false;
case "emptyString":
return "";
case "zero":
return 0;
}
},getEditorValue:function(){
var v;
if(this.editor&&this.editor.get){
v=this.editor.get("value");
}
return (v||v===0)?v:this.makeEmptyValue();
},setEditorValue:function(_19){
if(this.editor&&this.editor.set){
_19=_19===undefined?null:_19;
var _1a=this.editor.get("value");
this.editor.set("value",_19,false);
if(_1a!=_19){
this.changed();
}
this.updateReadonlyValue();
}
},setDisplayValue:function(_1b){
this.setEditorValue(_1b);
},setRequired:function(_1c){
var _1d=this.required;
this.required=_1c;
if(this.editor){
this.editor.required=_1c;
if(this.required||_1d){
this.validate();
wm.fire(this.owner,"requireChanged");
}
}
},setInitialValue:function(){
var o=this.owner;
o.beginEditUpdate();
this.setEditorValue(wm.propertyIsChanged(o.dataValue,"dataValue",wm.Editor)?o.dataValue:o.displayValue);
o.endEditUpdate();
},setDisabled:function(_1e){
this.disabled=_1e;
if(this.editor&&this.editor.set){
this.editor.set("disabled",_1e);
}
},isReady:function(){
return Boolean(this.editor);
},focus:function(){
wm.fire(this.editor,"focus");
},reset:function(){
var e=this.editor;
if(e){
e._hasBeenBlurred=false;
wm.fire(e,"_hideTooltip");
}
},clear:function(){
this.reset();
this.setEditorValue(null);
},listOwnerProperties:function(){
var p=dojo.mixin({},wm.Component.prototype.listProperties.apply(this)||{});
for(var i in p){
if(!p[i].isOwnerProperty){
delete p[i];
}
}
return p;
},listProperties:function(){
var p=dojo.mixin({},this.inherited(arguments)||{});
for(var i in p){
if(p[i].isOwnerProperty){
delete p[i];
}
}
return p;
},valueChanged:function(_1f,_20){
if(this._updating){
return;
}
this.inherited(arguments);
},setValueAsEmpty:function(){
this.makeEmptyValue();
},isLoading:function(){
return this.owner._loading;
},dokeypress:function(_21){
if(this.changeOnKey||(this.changeOnEnter&&_21.keyCode==dojo.keys.ENTER)){
wm.onidle(this,"doChangeOnKey",arguments);
}
if(_21.keyCode==dojo.keys.ENTER){
wm.onidle(this,"onEnterKeyPress",[this]);
}
},doChangeOnKey:function(_22){
var e=this.editor;
this.changed();
},onEnterKeyPress:function(){
}});
wm.Object.extendSchema(wm._BaseEditor,{onEnterKeyPress:{ignore:1},name:{ignore:1},showing:{ignore:1},disabled:{ignore:1},singleLine:{ignore:1},readonly:{ignore:1},border:{ignore:1},borderColor:{ignore:1},margin:{ignore:1},padding:{ignore:1},scrollX:{ignore:1},scrollY:{ignore:1}});
}
if(!dojo._hasResource["wm.base.widget.Editor"]){
dojo._hasResource["wm.base.widget.Editor"]=true;
dojo.provide("wm.base.widget.Editor");
wm.getEditor=function(_23){
var c=_23||"Text";
if(c.slice(0,5)!="wm"){
c="wm._"+c+"Editor";
}
return dojo.getObject(c)||wm._BaseEditor;
};
wm.getDataSet=function(_24){
var w=_24;
while(w&&!w.dataSet){
w=w.parent;
}
if(w&&w.dataSet){
return w.dataSet;
}
};
wm.createFieldEditor=function(_25,_26,_27,_28,_29){
var _2a=dojo.mixin({},wm.getFieldEditorProps(_26),_27);
var _2b=wm.getValidJsName(_2a.name||"editor1");
return _25.owner.loadComponent(_2b,_25,_29||"wm.Editor",_2a,_28);
};
dojo.declare("wm.Editor",wm.Container,{height:"24px",width:"150px",padding:2,displayValue:"",saveDisplayValue:false,dataValue:null,horizontalAlign:"justified",verticalAlign:"justified",emptyValue:"unset",caption:"",lock:true,box:"h",captionSize:"50%",resizeToFit:"(Resize to Fit)",captionUnits:"flex",captionAlign:"right",captionPosition:"left",singleLine:true,display:"Text",readonly:false,subType:"",_updating:0,editingProps:{displayValue:1,dataValue:1,groupValue:1},init:function(){
this.inherited(arguments);
this.createCaption();
},postInit:function(){
this.startTimer("Editor.postInit",this.declaredClass);
this.startTimer("Editor.super.postInit",this.declaredClass);
this.inherited(arguments);
this.stopTimer("Editor.super.postInit",this.declaredClass);
this.startTimer("Editor.Misc.postInit",this.declaredClass);
if(String(this.captionSize).search(/\D/)==-1){
this.captionSize+=this.captionUnits;
}
var su=wm.splitUnits(this.captionSize);
if(su.units=="flex"){
this.captionSize=(su.value*10)+"%";
}
if(!this.$.editor){
this.setDisplay(this.display);
}else{
this.editor=this.$.editor;
}
wm.fire(this.editor,"ownerLoaded");
if(this.captionPosition!="left"){
this.setCaptionPosition(this.captionPosition);
}
this.stopTimer("Editor.Misc.postInit",this.declaredClass);
this.startTimer("editorChanged",this.declaredClass);
this.editorChanged();
this.stopTimer("editorChanged",this.declaredClass);
this.stopTimer("Editor.postInit",this.declaredClass);
},setDomNode:function(_2c){
this.inherited(arguments);
dojo.addClass(this.domNode,"wmeditor");
},createCaption:function(){
var cs=String(this.captionSize);
var _2d={domNode:["wmeditor-caption"].concat(this._classes.captionNode)};
this.captionLabel=new wm.Label({parent:this,width:cs,height:cs,_classes:_2d,singleLine:this.singleLine,caption:this.caption,showing:Boolean(this.caption),margin:"0,4,0,0",border:0,owner:this});
this.setCaptionAlign(this.captionAlign);
},getRequiredHtml:function(){
var e=this.editor;
if(!e){
e=this.$.editor;
}
return !this.readonly&&e&&e.required?"&nbsp;<span class=\"wmeditor-required\">*</span>":"";
},setDisplay:function(_2e){
this.display=_2e;
var e=this.editor||this.$.editor;
if(e){
e.destroy();
this.editor=null;
}
this.createEditor();
this.reflow();
},createEditor:function(){
var _2f=wm.getEditor(this.display);
var _30=dojo.mixin({name:"editor",owner:this,parent:this,border:0,readonly:this.readonly},this.editorInitProps||{});
this.editor=new _2f(_30);
this._editor=this.editor.editor;
},setDisplayValue:function(_31){
this.displayValue=_31;
wm.fire(this.editor,"setDisplayValue",[_31]);
},getDisplayValue:function(){
var v=this.getEditorIsReady()?this.editor.getDisplayValue():this.displayValue;
return (v===null||v===undefined||v===false)?"":v;
},getEditorIsReady:function(){
return this.editor&&this.editor.isReady();
},getDataValue:function(){
return this.getEditorIsReady()?this.editor.getEditorValue():this.dataValue;
},_getReadonlyValue:function(){
var v=this.editor&&this.editor._getReadonlyValue();
return v===undefined?"":v;
},setDataValue:function(_32){
if(_32===undefined){
_32=null;
}
this.dataValue=_32 instanceof wm.Variable?_32.getData():_32;
wm.fire(this.editor,"setEditorValue",[_32]);
},setCaption:function(_33){
var c=this.caption;
this.caption=_33;
this.captionLabel.setCaption(this.caption+this.getRequiredHtml());
this.captionLabel.setShowing(Boolean(this.caption));
if(Boolean(c)!=Boolean(this.caption)){
this.renderControls();
}
},setCaptionSize:function(_34){
this.captionLabel[this.layoutKind=="top-to-bottom"?"setHeight":"setWidth"](this.captionSize=_34);
this.reflow();
},setCaptionAlign:function(_35){
this.captionAlign=_35;
this.captionLabel.setAlign(this.captionAlign);
},setCaptionPosition:function(_36){
var cp=this.captionPosition=_36;
this.removeControl(this.captionLabel);
this.insertControl(this.captionLabel,(cp=="top"||cp=="left")?0:1);
this.setLayoutKind((cp=="top"||cp=="bottom")?"top-to-bottom":"left-to-right");
this.setCaptionSize(this.captionSize);
},setSingleLine:function(_37){
this.singleLine=_37;
this.captionLabel.setSingleLine(_37);
},setDisabled:function(_38){
var d=this.disabled;
this.inherited(arguments);
if(d!=this.disabled){
this.updateDisabled();
}
},updateDisabled:function(){
dojo[this.disabled?"addClass":"removeClass"](this.captionLabel.domNode,"wmeditor-caption-disabled");
wm.fire(this.editor,"setDisabled",[this.disabled]);
},setReadonly:function(_39){
var r=this.readonly;
this.readonly=_39;
if(r!=this.readonly){
this.setCaption(this.caption);
}
wm.fire(this.editor,"setReadonly",[_39]);
},setRequired:function(_3a){
wm.fire(this.editor,"setRequired",[_3a]);
},requireChanged:function(){
this.setCaption(this.caption);
},getInvalid:function(){
return wm.fire(this.editor,"getInvalid");
},isValid:function(){
return !this.getInvalid();
},validate:function(_3b){
wm.fire(this.parent,"validate");
this.valueChanged("invalid",this.getInvalid());
},getGroupValue:function(){
var e=this.editor;
return wm.fire(e,"getGroupValue");
},setGroupValue:function(_3c){
this.groupValue=_3c;
var e=this.editor;
wm.fire(e,"setGroupValue",[_3c]);
},getCheckedValue:function(){
return this.getDisplayValue();
},setCheckedValue:function(_3d){
this.setDisplayValue(_3d);
},editorChanged:function(){
this.valueChanged("displayValue",this.displayValue=this.getDisplayValue());
this.valueChanged("dataValue",this.dataValue=this.getDataValue());
wm.fire(this.editor,"ownerEditorChanged");
},isUpdating:function(){
return this._updating>0;
},beginEditUpdate:function(_3e){
this._updating++;
},endEditUpdate:function(_3f){
this._updating--;
},valueChanged:function(_40,_41){
if(this._updating){
return;
}
this.inherited(arguments);
},setValueAsEmpty:function(){
this.setDataValue(dojo.hitch(this.editor,"makeEmptyValue")());
},clear:function(){
this.dataValue=null;
this.beginEditUpdate();
wm.fire(this.editor,"clear");
this.endEditUpdate();
this.editorChanged();
},update:function(){
return wm.fire(this.editor,"update");
},canFocus:function(){
return !this.readonly;
},focus:function(){
this.editor.focus();
},doOnchange:function(){
this.editorChanged();
var e=this.editor;
if(!this._loading&&!this.isUpdating()&&!this.readonly&&e&&!e.isLoading()){
this.onchange(this.getDisplayValue(),this.getDataValue());
}
},doOnblur:function(){
if(!this.disabled){
this.onblur();
}
},doOnfocus:function(){
if(!this.disabled){
this.onfocus();
}
},onchange:function(_42,_43){
},onfocus:function(){
},onblur:function(){
}});
wm.Editor.description="A general purpose editor.";
wm.Editor.extend({themeable:false,scrim:true,listProperties:function(){
var e=this.editor,_44=dojo.mixin({},this.inherited(arguments),e?e.listOwnerProperties():{}),f=wm.getParentForm(this);
_44.formField.ignoretmp=!Boolean(f);
_44.displayValue.readonly=this.formField&&!this.saveDisplayValue;
_44.saveDisplayValue.ignoretmp=!this.formField;
return _44;
},afterPaletteDrop:function(){
this.setCaption(this.name);
},set_formField:function(_45){
if(!_45){
delete this.formField;
}else{
this.formField=_45;
}
var f=wm.getParentForm(this);
if(f){
var _46=f.addEditorToForm(this);
}
},resizeLabel:function(){
var _47=dojo.doc.createElement("span");
_47.style.padding="5px";
_47.innerHTML=this.captionLabel.caption;
document.body.appendChild(_47);
var _48=dojo.coords(_47);
var _49=_48.w;
_47.parentNode.removeChild(_47);
this.setCaptionSize("50%");
var _4a=_49*4;
this.setWidth(_4a+"px");
if(this.isDesignLoaded()&&dojo.indexOf(studio.designer.selected,this)!=-1){
setTimeout(dojo.hitch(studio.inspector,"reinspect"),100);
}
},makePropEdit:function(_4b,_4c,_4d){
switch(_4b){
case "formField":
return new wm.prop.FormFieldSelect(_4d);
case "display":
return new wm.SelectMenu(dojo.mixin(_4d,{options:wm.editors}));
}
return this.inherited(arguments);
},resizeToFit:function(){
this.resizeLabel();
},writeChildren:function(_4e,_4f,_50){
var s=this.inherited(arguments);
s.push(this.editor.write(_4f,_50));
return s;
},addUserClass:function(_51,_52){
this.inherited(arguments);
if(_52=="captionNode"){
this.captionLabel.addUserClass(_51,"domNode");
}
},removeUserClass:function(_53,_54){
this.inherited(arguments);
if(_54=="captionNode"){
this.captionLabel.removeUserClass(_53,"domNode");
}
}});
wm.FormEditor=wm.Editor;
dojo.declare("wm.TextEditor",wm.Editor,{});
dojo.declare("wm.DateEditor",wm.Editor,{display:"Date"});
dojo.declare("wm.TimeEditor",wm.Editor,{display:"Time"});
dojo.declare("wm.NumberEditor",wm.Editor,{display:"Number"});
dojo.declare("wm.CurrencyEditor",wm.Editor,{display:"Currency"});
dojo.declare("wm.SelectEditor",wm.Editor,{display:"Select"});
dojo.declare("wm.CheckBoxEditor",wm.Editor,{displayValue:1,display:"CheckBox",getChecked:function(){
return this.editor.getChecked();
},setChecked:function(_55){
this.editor.setChecked(_55);
}});
dojo.declare("wm.TextAreaEditor",wm.Editor,{display:"TextArea"});
wm.TextAreaEditor.extend({});
dojo.declare("wm.RadioButtonEditor",wm.Editor,{displayValue:1,display:"RadioButton"});
dojo.declare("wm.LookupEditor",wm.Editor,{display:"Lookup"});
dojo.declare("wm.SliderEditor",wm.Editor,{display:"Slider"});
wm.Object.extendSchema(wm.Editor,{disabled:{bindTarget:true,type:"Boolean",group:"common",order:40},formField:{group:"common",order:500},singleLine:{group:"display",order:200},box:{ignore:1},horizontalAlign:{ignore:1},verticalAlign:{ignore:1},layoutKind:{ignore:1},fitToContent:{ignore:1},scrollX:{ignore:1},scrollY:{ignore:1},lock:{ignore:1},imageList:{ignore:1},caption:{bindable:1,group:"display",type:"String",order:0,focus:1},readonly:{bindable:1,type:"Boolean",group:"display",order:5},captionSize:{group:"display",order:200,editor:"wm.prop.SizeEditor"},captionUnits:{ignore:1},captionAlign:{group:"display",order:210,options:["left","center","right"]},captionPosition:{group:"display",order:220,options:["top","left","bottom","right"]},display:{group:"editor",subgroup:"value",order:20},editor:{readonly:1,group:"editor",subgroup:"Sub Editor",editor:"wm.prop.SubComponentEditor"},displayValue:{bindable:1,group:"editor",subgroup:"value",order:40,type:"any"},dataValue:{ignore:1,bindable:1,group:"editor",order:45,simpleBindProp:true},emptyValue:{group:"editor",subgroup:"value",order:50,options:["unset","null","emptyString","false","zero"]},invalid:{ignore:1,bindSource:1,type:"boolean"},groupValue:{ignore:1},selectedItem:{ignore:1},resizeToFit:{group:"layout",order:200,operation:1},captionStyles:{ignore:1,categoryParent:"Styles",categoryProps:{content:"caption",nodeName:"captionNode",nodeClass:"wmeditor-caption"}}});
}
if(!dojo._hasResource["wm.base.widget.Editors._TextEditor"]){
dojo._hasResource["wm.base.widget.Editors._TextEditor"]=true;
dojo.provide("wm.base.widget.Editors._TextEditor");
dojo.declare("wm._TextEditor",wm._BaseEditor,{promptMessage:"",invalidMessage:"",password:false,maxChars:"",regExp:".*",_passwordChar:"&#8226;",tooltipDisplayTime:2000,getEditorProps:function(_56,_57){
var p=dojo.mixin(this.inherited(arguments),{promptMessage:this.promptMessage,invalidMessage:this.invalidMessage||"$_unset_$",regExp:this.regExp,value:this.owner.displayValue,required:this.required,tooltipDisplayTime:this.tooltipDisplayTime});
if(this.password){
p.type="password";
}
if(this.maxChars){
p.maxLength=this.maxChars;
}
return dojo.mixin(p,_57||{});
},validationEnabled:function(){
return (this.regExp&&this.regExp!=".*")||this.required;
},setPassword:function(_58){
this.password=_58;
this.createEditor();
},_createEditor:function(_59,_5a){
if(this.singleLine){
if(this.validationEnabled()||this.promptMessage){
return new dijit.form.ValidationTextBox(this.getEditorProps(_59,_5a));
}else{
return new dijit.form.TextBox(this.getEditorProps(_59,_5a));
}
}else{
return new dijit.form.SimpleTextarea(this.getEditorProps(_59,_5a));
}
},validator:function(_5b,_5c){
var l=Number(this.maxChars);
return this.maxChars!==""&&!isNaN(l)?_5b.length<=l:true;
},_getReadonlyValue:function(){
var v=this.inherited(arguments);
if(this.password){
for(var i=0,a=[],l=v.length;i<l;i++){
a.push(this._passwordChar);
}
v=a.join("");
}
return v;
}});
dojo.declare("wm._TextAreaEditor",wm._TextEditor,{_editorPaddingLeft:3,_editorPaddingRight:3,_createEditor:function(_5d,_5e){
return new dijit.form.SimpleTextarea(this.getEditorProps(_5d,_5e));
},sizeEditor:function(){
this.inherited(arguments);
this.domNode.style.height="";
this.domNode.style.lineHeight="";
}});
wm.Object.extendSchema(wm._TextAreaEditor,{changeOnEnter:{ignore:1},password:{ignore:1}});
}
if(!dojo._hasResource["dijit._Container"]){
dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_5f,_60){
var _61=this.containerNode;
if(_60&&typeof _60=="number"){
var _62=this.getChildren();
if(_62&&_62.length>=_60){
_61=_62[_60-1].domNode;
_60="after";
}
}
dojo.place(_5f.domNode,_61,_60);
if(this._started&&!_5f._started){
_5f.startup();
}
},removeChild:function(_63){
if(typeof _63=="number"){
_63=this.getChildren()[_63];
}
if(_63){
var _64=_63.domNode;
if(_64&&_64.parentNode){
_64.parentNode.removeChild(_64);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},destroyDescendants:function(_65){
dojo.forEach(this.getChildren(),function(_66){
_66.destroyRecursive(_65);
});
},_getSiblingOfChild:function(_67,dir){
var _68=_67.domNode,_69=(dir>0?"nextSibling":"previousSibling");
do{
_68=_68[_69];
}while(_68&&(_68.nodeType!=1||!dijit.byNode(_68)));
return _68&&dijit.byNode(_68);
},getIndexOfChild:function(_6a){
return dojo.indexOf(this.getChildren(),_6a);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_6b){
_6b.startup();
});
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_6c,_6d){
return new dojo.dnd.move.constrainedMoveable(_6d,_6c);
},constructor:function(_6e,_6f){
if(!_6f){
_6f={};
}
this.constraints=_6f.constraints;
this.within=_6f.within;
},onFirstMove:function(_70){
var c=this.constraintBox=this.constraints.call(this,_70);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_70.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_71,_72){
var c=this.constraintBox,s=_71.node.style;
this.onMoving(_71,_72);
_72.l=_72.l<c.l?c.l:c.r<_72.l?c.r:_72.l;
_72.t=_72.t<c.t?c.t:c.b<_72.t?c.b:_72.t;
s.left=_72.l+"px";
s.top=_72.t+"px";
this.onMoved(_71,_72);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_73,_74){
return new dojo.dnd.move.boxConstrainedMoveable(_74,_73);
},constructor:function(_75,_76){
var box=_76&&_76.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_77,_78){
return new dojo.dnd.move.parentConstrainedMoveable(_78,_77);
},constructor:function(_79,_7a){
var _7b=_7a&&_7a.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_7b=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_7b=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_7b=="padding"){
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
var _7c=this.dropDown,_7d=false;
if(e&&this._opened){
var c=dojo.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_7d){
if(dojo.hasClass(t,"dijitPopup")){
_7d=true;
}else{
t=t.parentNode;
}
}
if(_7d){
t=e.target;
if(_7c.onItemClick){
var _7e;
while(t&&!(_7e=dijit.byNode(t))){
t=t.parentNode;
}
if(_7e&&_7e.onClick&&_7e.getParent){
_7e.getParent().onItemClick(_7e,e);
}
}
return;
}
}
}
if(this._opened&&_7c.focus&&_7c.autoFocus!==false){
window.setTimeout(dojo.hitch(_7c,"focus"),1);
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
dojo.stopEvent(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _7f={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+_7f+"ArrowButton");
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
var d=this.dropDown,_80=e.target;
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
if(!this._opened&&(e.charOrCode==dojo.keys.DOWN_ARROW||((e.charOrCode==dojo.keys.ENTER||e.charOrCode==" ")&&((_80.tagName||"").toLowerCase()!=="input"||(_80.type&&_80.type.toLowerCase()!=="text"))))){
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
var _81=dijit._curFocus&&this.dropDown&&dojo.isDescendant(dijit._curFocus,this.dropDown.domNode);
this.closeDropDown(_81);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_82){
_82();
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
var _83=this.dropDown,_84=_83.domNode,_85=this._aroundNode||this.domNode,_86=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_84.style.width){
this._explicitDDWidth=true;
}
if(_84.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _87={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_87.width="";
}
if(!this._explicitDDHeight){
_87.height="";
}
dojo.style(_84,_87);
var _88=this.maxHeight;
if(_88==-1){
var _89=dojo.window.getBox(),_8a=dojo.position(_85,false);
_88=Math.floor(Math.max(_8a.y,_89.h-(_8a.y+_8a.h)));
}
if(_83.startup&&!_83._started){
_83.startup();
}
dijit.popup.moveOffScreen(_83);
var mb=dojo._getMarginSize(_84);
var _8b=(_88&&mb.h>_88);
dojo.style(_84,{overflowX:"hidden",overflowY:_8b?"auto":"hidden"});
if(_8b){
mb.h=_88;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_85.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_85.offsetWidth);
}else{
delete mb.w;
}
}
if(dojo.isFunction(_83.resize)){
_83.resize(mb);
}else{
dojo.marginBox(_84,mb);
}
}
var _8c=dijit.popup.open({parent:this,popup:_83,around:_85,orient:dijit.getPopupAroundAlignment((this.dropDownPosition&&this.dropDownPosition.length)?this.dropDownPosition:["below"],this.isLeftToRight()),onExecute:function(){
_86.closeDropDown(true);
},onCancel:function(){
_86.closeDropDown(true);
},onClose:function(){
dojo.attr(_86._popupStateNode,"popupActive",false);
dojo.removeClass(_86._popupStateNode,"dijitHasDropDownOpen");
_86._opened=false;
}});
dojo.attr(this._popupStateNode,"popupActive","true");
dojo.addClass(_86._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _8c;
},closeDropDown:function(_8d){
if(this._opened){
if(_8d){
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
for(var _8e=this.domNode;_8e.parentNode;_8e=_8e.parentNode){
var _8f=dijit.byNode(_8e);
if(_8f&&typeof _8f._onSubmit=="function"){
_8f._onSubmit(e);
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
},_fillContent:function(_90){
if(_90&&(!this.params||!("label" in this.params))){
this.set("label",_90.innerHTML);
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
dojo.toggleClass(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},onClick:function(e){
return true;
},_clicked:function(e){
},setLabel:function(_91){
dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_91);
},_setLabelAttr:function(_92){
this._set("label",_92);
this.containerNode.innerHTML=_92;
if(this.showLabel==false&&!this.params.title){
this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},_setIconClassAttr:function(val){
var _93=this.iconClass||"dijitNoIcon",_94=val||"dijitNoIcon";
dojo.replaceClass(this.iconNode,_94,_93);
this._set("iconClass",val);
}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container,dijit._HasDropDown],{baseClass:"dijitDropDownButton",templateString:dojo.cache("dijit.form","templates/DropDownButton.html","<span class=\"dijit dijitReset dijitInline\"\r\n\t><span class='dijitReset dijitInline dijitButtonNode'\r\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\" dojoAttachPoint=\"_buttonNode\"\r\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\r\n\t\t\tdojoAttachPoint=\"focusNode,titleNode,_arrowWrapperNode\"\r\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\r\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\r\n\t\t\t\tdojoAttachPoint=\"iconNode\"\r\n\t\t\t></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\r\n\t\t\t\tdojoAttachPoint=\"containerNode,_popupStateNode\"\r\n\t\t\t\tid=\"${id}_label\"\r\n\t\t\t></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\r\n\t\t></span\r\n\t></span\r\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\r\n\t\tdojoAttachPoint=\"valueNode\"\r\n/></span>\r\n"),_fillContent:function(){
if(this.srcNodeRef){
var _95=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,_95[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _96=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(_96);
delete this.dropDownContainer;
}
if(this.dropDown){
dijit.popup.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _97=this.dropDown;
return (!!_97&&(!_97.href||_97.isLoaded));
},loadDropDown:function(){
var _98=this.dropDown;
if(!_98){
return;
}
if(!this.isLoaded()){
var _99=dojo.connect(_98,"onLoad",this,function(){
dojo.disconnect(_99);
this.openDropDown();
});
_98.refresh();
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
},focus:function(_9a){
if(!this.disabled){
dijit.focus(_9a=="start"?this.titleNode:this._popupStateNode);
}
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{checked:"focusNode"}),_clicked:function(evt){
this.set("checked",!this.checked);
},_setCheckedAttr:function(_9b,_9c){
this._set("checked",_9b);
dojo.attr(this.focusNode||this.domNode,"checked",_9b);
dijit.setWaiState(this.focusNode||this.domNode,"pressed",_9b);
this._handleOnChange(_9b,_9c);
},setChecked:function(_9d){
dojo.deprecated("setChecked("+_9d+") is deprecated. Use set('checked',"+_9d+") instead.","","2.0");
this.set("checked",_9d);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
}
if(!dojo._hasResource["dojo.number"]){
dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.getObject("number",true,dojo);
dojo.number.format=function(_9e,_9f){
_9f=dojo.mixin({},_9f||{});
var _a0=dojo.i18n.normalizeLocale(_9f.locale),_a1=dojo.i18n.getLocalization("dojo.cldr","number",_a0);
_9f.customs=_a1;
var _a2=_9f.pattern||_a1[(_9f.type||"decimal")+"Format"];
if(isNaN(_9e)||Math.abs(_9e)==Infinity){
return null;
}
return dojo.number._applyPattern(_9e,_a2,_9f);
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(_a3,_a4,_a5){
_a5=_a5||{};
var _a6=_a5.customs.group,_a7=_a5.customs.decimal,_a8=_a4.split(";"),_a9=_a8[0];
_a4=_a8[(_a3<0)?1:0]||("-"+_a9);
if(_a4.indexOf("%")!=-1){
_a3*=100;
}else{
if(_a4.indexOf("‰")!=-1){
_a3*=1000;
}else{
if(_a4.indexOf("¤")!=-1){
_a6=_a5.customs.currencyGroup||_a6;
_a7=_a5.customs.currencyDecimal||_a7;
_a4=_a4.replace(/\u00a4{1,3}/,function(_aa){
var _ab=["symbol","currency","displayName"][_aa.length-1];
return _a5[_ab]||_a5.currency||"";
});
}else{
if(_a4.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _ac=dojo.number._numberPatternRE;
var _ad=_a9.match(_ac);
if(!_ad){
throw new Error("unable to find a number expression in pattern: "+_a4);
}
if(_a5.fractional===false){
_a5.places=0;
}
return _a4.replace(_ac,dojo.number._formatAbsolute(_a3,_ad[0],{decimal:_a7,group:_a6,places:_a5.places,round:_a5.round}));
};
dojo.number.round=function(_ae,_af,_b0){
var _b1=10/(_b0||10);
return (_b1*+_ae).toFixed(_af)/_b1;
};
if((0.9).toFixed()==0){
(function(){
var _b2=dojo.number.round;
dojo.number.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _b2(v,p,m)+(v>0?d:-d);
};
})();
}
dojo.number._formatAbsolute=function(_b3,_b4,_b5){
_b5=_b5||{};
if(_b5.places===true){
_b5.places=0;
}
if(_b5.places===Infinity){
_b5.places=6;
}
var _b6=_b4.split("."),_b7=typeof _b5.places=="string"&&_b5.places.indexOf(","),_b8=_b5.places;
if(_b7){
_b8=_b5.places.substring(_b7+1);
}else{
if(!(_b8>=0)){
_b8=(_b6[1]||[]).length;
}
}
if(!(_b5.round<0)){
_b3=dojo.number.round(_b3,_b8,_b5.round);
}
var _b9=String(Math.abs(_b3)).split("."),_ba=_b9[1]||"";
if(_b6[1]||_b5.places){
if(_b7){
_b5.places=_b5.places.substring(0,_b7);
}
var pad=_b5.places!==undefined?_b5.places:(_b6[1]&&_b6[1].lastIndexOf("0")+1);
if(pad>_ba.length){
_b9[1]=dojo.string.pad(_ba,pad,"0",true);
}
if(_b8<_ba.length){
_b9[1]=_ba.substr(0,_b8);
}
}else{
if(_b9[1]){
_b9.pop();
}
}
var _bb=_b6[0].replace(",","");
pad=_bb.indexOf("0");
if(pad!=-1){
pad=_bb.length-pad;
if(pad>_b9[0].length){
_b9[0]=dojo.string.pad(_b9[0],pad);
}
if(_bb.indexOf("#")==-1){
_b9[0]=_b9[0].substr(_b9[0].length-pad);
}
}
var _bc=_b6[0].lastIndexOf(","),_bd,_be;
if(_bc!=-1){
_bd=_b6[0].length-_bc-1;
var _bf=_b6[0].substr(0,_bc);
_bc=_bf.lastIndexOf(",");
if(_bc!=-1){
_be=_bf.length-_bc-1;
}
}
var _c0=[];
for(var _c1=_b9[0];_c1;){
var off=_c1.length-_bd;
_c0.push((off>0)?_c1.substr(off):_c1);
_c1=(off>0)?_c1.slice(0,off):"";
if(_be){
_bd=_be;
delete _be;
}
}
_b9[0]=_c0.reverse().join(_b5.group||",");
return _b9.join(_b5.decimal||".");
};
dojo.number.regexp=function(_c2){
return dojo.number._parseInfo(_c2).regexp;
};
dojo.number._parseInfo=function(_c3){
_c3=_c3||{};
var _c4=dojo.i18n.normalizeLocale(_c3.locale),_c5=dojo.i18n.getLocalization("dojo.cldr","number",_c4),_c6=_c3.pattern||_c5[(_c3.type||"decimal")+"Format"],_c7=_c5.group,_c8=_c5.decimal,_c9=1;
if(_c6.indexOf("%")!=-1){
_c9/=100;
}else{
if(_c6.indexOf("‰")!=-1){
_c9/=1000;
}else{
var _ca=_c6.indexOf("¤")!=-1;
if(_ca){
_c7=_c5.currencyGroup||_c7;
_c8=_c5.currencyDecimal||_c8;
}
}
}
var _cb=_c6.split(";");
if(_cb.length==1){
_cb.push("-"+_cb[0]);
}
var re=dojo.regexp.buildGroupRE(_cb,function(_cc){
_cc="(?:"+dojo.regexp.escapeString(_cc,".")+")";
return _cc.replace(dojo.number._numberPatternRE,function(_cd){
var _ce={signed:false,separator:_c3.strict?_c7:[_c7,""],fractional:_c3.fractional,decimal:_c8,exponent:false},_cf=_cd.split("."),_d0=_c3.places;
if(_cf.length==1&&_c9!=1){
_cf[1]="###";
}
if(_cf.length==1||_d0===0){
_ce.fractional=false;
}else{
if(_d0===undefined){
_d0=_c3.pattern?_cf[1].lastIndexOf("0")+1:Infinity;
}
if(_d0&&_c3.fractional==undefined){
_ce.fractional=true;
}
if(!_c3.places&&(_d0<_cf[1].length)){
_d0+=","+_cf[1].length;
}
_ce.places=_d0;
}
var _d1=_cf[0].split(",");
if(_d1.length>1){
_ce.groupSize=_d1.pop().length;
if(_d1.length>1){
_ce.groupSize2=_d1.pop().length;
}
}
return "("+dojo.number._realNumberRegexp(_ce)+")";
});
},true);
if(_ca){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_d2,_d3,_d4,_d5){
var _d6=["symbol","currency","displayName"][_d4.length-1],_d7=dojo.regexp.escapeString(_c3[_d6]||_c3.currency||"");
_d3=_d3?"[\\s\\xa0]":"";
_d5=_d5?"[\\s\\xa0]":"";
if(!_c3.strict){
if(_d3){
_d3+="*";
}
if(_d5){
_d5+="*";
}
return "(?:"+_d3+_d7+_d5+")?";
}
return _d3+_d7+_d5;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_c7,decimal:_c8,factor:_c9};
};
dojo.number.parse=function(_d8,_d9){
var _da=dojo.number._parseInfo(_d9),_db=(new RegExp("^"+_da.regexp+"$")).exec(_d8);
if(!_db){
return NaN;
}
var _dc=_db[1];
if(!_db[1]){
if(!_db[2]){
return NaN;
}
_dc=_db[2];
_da.factor*=-1;
}
_dc=_dc.replace(new RegExp("["+_da.group+"\\s\\xa0"+"]","g"),"").replace(_da.decimal,".");
return _dc*_da.factor;
};
dojo.number._realNumberRegexp=function(_dd){
_dd=_dd||{};
if(!("places" in _dd)){
_dd.places=Infinity;
}
if(typeof _dd.decimal!="string"){
_dd.decimal=".";
}
if(!("fractional" in _dd)||/^0/.test(_dd.places)){
_dd.fractional=[true,false];
}
if(!("exponent" in _dd)){
_dd.exponent=[true,false];
}
if(!("eSigned" in _dd)){
_dd.eSigned=[true,false];
}
var _de=dojo.number._integerRegexp(_dd),_df=dojo.regexp.buildGroupRE(_dd.fractional,function(q){
var re="";
if(q&&(_dd.places!==0)){
re="\\"+_dd.decimal;
if(_dd.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_dd.places+"}";
}
}
return re;
},true);
var _e0=dojo.regexp.buildGroupRE(_dd.exponent,function(q){
if(q){
return "([eE]"+dojo.number._integerRegexp({signed:_dd.eSigned})+")";
}
return "";
});
var _e1=_de+_df;
if(_df){
_e1="(?:(?:"+_e1+")|(?:"+_df+"))";
}
return _e1+_e0;
};
dojo.number._integerRegexp=function(_e2){
_e2=_e2||{};
if(!("signed" in _e2)){
_e2.signed=[true,false];
}
if(!("separator" in _e2)){
_e2.separator="";
}else{
if(!("groupSize" in _e2)){
_e2.groupSize=3;
}
}
var _e3=dojo.regexp.buildGroupRE(_e2.signed,function(q){
return q?"[-+]":"";
},true);
var _e4=dojo.regexp.buildGroupRE(_e2.separator,function(sep){
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
var grp=_e2.groupSize,_e5=_e2.groupSize2;
if(_e5){
var _e6="(?:0|[1-9]\\d{0,"+(_e5-1)+"}(?:["+sep+"]\\d{"+_e5+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-_e5)>0)?"(?:"+_e6+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_e6;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _e3+_e4;
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
var _e7=dojo.position(this.sliderBarContainer,true);
var _e8=e[this._mousePixelCoord]-_e7[this._startingPixelCoord];
this._setPixelValue(this._isReversed()?(_e7[this._pixelCount]-_e8):_e8,_e7[this._pixelCount],true);
this._movable.onMouseDown(e);
},_setPixelValue:function(_e9,_ea,_eb){
if(this.dynamicSlider){
var now=new Date().getTime();
if(!this._dynamicSliderTimestamp||this._dynamicSliderTimestamp+100<now){
_eb=true;
this._dynamicSliderTimestamp=now;
if(this.domNode&&this.domNode.id){
wm.cancelJob(this.domNode.id+"._setPixelValue");
}
}else{
if(this.domNode&&this.domNode.id){
var _ec=this;
wm.job(this.domNode.id+"._setPixelValue",60,function(){
_ec._setValueAttr((this.maximum-this.minimum)*_ed/_ee+this.minimum,true);
});
}
}
}
if(this.disabled||this.readOnly){
return;
}
_e9=_e9<0?0:_ea<_e9?_ea:_e9;
var _ee=this.discreteValues;
if(_ee<=1||_ee==Infinity){
_ee=_ea;
}
_ee--;
var _ef=_ea/_ee;
var _ed=Math.round(_e9/_ef);
this._setValueAttr((this.maximum-this.minimum)*_ed/_ee+this.minimum,_eb);
},_setValueAttr:function(_f0,_f1){
this._set("value",_f0);
this.valueNode.value=_f0;
dijit.setWaiState(this.focusNode,"valuenow",_f0);
this.inherited(arguments);
var _f2=(_f0-this.minimum)/(this.maximum-this.minimum);
var _f3=(this._descending===false)?this.remainingBar:this.progressBar;
var _f4=(this._descending===false)?this.progressBar:this.remainingBar;
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
if(_f1&&this.slideDuration>0&&_f3.style[this._progressPixelSize]){
var _f5=this;
var _f6={};
var _f7=parseFloat(_f3.style[this._progressPixelSize]);
var _f8=this.slideDuration*(_f2-_f7/100);
if(_f8==0){
return;
}
if(_f8<0){
_f8=0-_f8;
}
_f6[this._progressPixelSize]={start:_f7,end:_f2*100,units:"%"};
this._inProgressAnim=dojo.animateProperty({node:_f3,duration:_f8,onAnimate:function(v){
_f4.style[_f5._progressPixelSize]=(100-parseFloat(v[_f5._progressPixelSize]))+"%";
},onEnd:function(){
delete _f5._inProgressAnim;
},properties:_f6});
this._inProgressAnim.play();
}else{
_f3.style[this._progressPixelSize]=(_f2*100)+"%";
_f4.style[this._progressPixelSize]=((1-_f2)*100)+"%";
}
},_bumpValue:function(_f9,_fa){
if(this.disabled||this.readOnly){
return;
}
var s=dojo.getComputedStyle(this.sliderBarContainer);
var c=dojo._getContentBox(this.sliderBarContainer,s);
var _fb=this.discreteValues;
if(_fb<=1||_fb==Infinity){
_fb=c[this._pixelCount];
}
_fb--;
var _fc=(this.value-this.minimum)*_fb/(this.maximum-this.minimum)+_f9;
if(_fc<0){
_fc=0;
}
if(_fc>_fb){
_fc=_fb;
}
_fc=_fc*(this.maximum-this.minimum)/_fb+this.minimum;
this._setValueAttr(_fc,_fa);
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
var _fd=!dojo.isMozilla;
var _fe=evt[(_fd?"wheelDelta":"detail")]*(_fd?1:-1);
this._bumpValue(_fe<0?-1:1,true);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_ff){
if(this[_ff.container]!=this.containerNode){
this[_ff.container].appendChild(_ff.domNode);
}
},this);
this.inherited(arguments);
},_typematicCallback:function(_100,_101,e){
if(_100==-1){
this._setValueAttr(this.value,true);
}else{
this[(_101==(this._descending?this.incrementButton:this.decrementButton))?"decrement":"increment"](e);
}
},buildRendering:function(){
this.inherited(arguments);
if(this.showButtons){
this.incrementButton.style.display="";
this.decrementButton.style.display="";
}
var _102=dojo.query("label[for=\""+this.id+"\"]");
if(_102.length){
_102[0].id=(this.id+"_label");
dijit.setWaiState(this.focusNode,"labelledby",_102[0].id);
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
var _103=dojo.declare(dijit.form._SliderMover,{widget:this});
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:_103});
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
var _104=this.widget;
var _105=_104._abspos;
if(!_105){
_105=_104._abspos=dojo.position(_104.sliderBarContainer,true);
_104._setPixelValue_=dojo.hitch(_104,"_setPixelValue");
_104._isReversed_=_104._isReversed();
}
var _106=e.touches?e.touches[0]:e,_107=_106[_104._mousePixelCoord]-_105[_104._startingPixelCoord];
_104._setPixelValue_(_104._isReversed_?(_105[_104._pixelCount]-_107):_107,_105[_104._pixelCount],false);
},onMouseUp:function(e){
this.inherited(arguments);
this.destroy();
},destroy:function(e){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _108=this.widget;
_108._abspos=null;
_108._setValueAttr(_108.value,true);
}});
}
if(!dojo._hasResource["dijit.form.VerticalSlider"]){
dojo._hasResource["dijit.form.VerticalSlider"]=true;
dojo.provide("dijit.form.VerticalSlider");
dojo.declare("dijit.form.VerticalSlider",dijit.form.HorizontalSlider,{templateString:dojo.cache("dijit.form","templates/VerticalSlider.html","<table class=\"dijit dijitReset dijitSlider dijitSliderV\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" dojoAttachEvent=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderIncrementIconV\" style=\"display:none\" dojoAttachPoint=\"decrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper\" dojoAttachEvent=\"onmousedown:_onClkIncBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td dojoAttachPoint=\"leftDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV\"></td\r\n\t\t><td class=\"dijitReset dijitSliderDecorationC\" style=\"height:100%;\"\r\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\r\n\t\t\t/><center class=\"dijitReset dijitSliderBarContainerV\" role=\"presentation\" dojoAttachPoint=\"sliderBarContainer\"\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV\" dojoAttachEvent=\"onmousedown:_onBarClick\"><!--#5629--></div\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV\" dojoAttachEvent=\"onmousedown:_onBarClick\"\r\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableV\" style=\"vertical-align:top;\"\r\n\t\t\t\t\t\t><div dojoAttachPoint=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleV\" dojoAttachEvent=\"onmousedown:_onHandleClick\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint=\"containerNode,rightDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper\" dojoAttachEvent=\"onmousedown:_onClkDecBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderDecrementIconV\" style=\"display:none\" dojoAttachPoint=\"incrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n></table>\r\n"),_mousePixelCoord:"pageY",_pixelCount:"h",_startingPixelCoord:"y",_startingPixelCount:"t",_handleOffsetCoord:"top",_progressPixelSize:"height",_descending:true,_isReversed:function(){
return this._descending;
}});
}
if(!dojo._hasResource["wm.base.widget.Editors._NumberEditor"]){
dojo._hasResource["wm.base.widget.Editors._NumberEditor"]=true;
dojo.provide("wm.base.widget.Editors._NumberEditor");
dojo.declare("wm._NumberEditor",wm._TextEditor,{minimum:"",maximum:"",places:"",_messages:{rangeMin:"Minimum number must be less than the maximum setting of ${0}.",rangeMax:"Maximum number must be greater than the minimum setting of ${0}."},rangeMessage:"",getEditorProps:function(_109,_10a){
var _10b={},v=this.owner.displayValue;
if(this.minimum){
_10b.min=Number(this.minimum);
}
if(this.maximum){
_10b.max=Number(this.maximum);
}
if(this.places){
var _10c=this._getPlaces();
if(_10c&&_10c!=""){
_10b.places=_10c;
}
}
_10b.pattern=this._getPattern();
return dojo.mixin(this.inherited(arguments),{constraints:_10b,editPattern:_10b.pattern,rangeMessage:this.rangeMessage,required:this.required,value:v?Number(v):""},_10a||{});
},_getPlaces:function(){
return "";
},_createEditor:function(_10d,_10e){
return new dijit.form.NumberTextBox(this.getEditorProps(_10d,_10e));
},_getPattern:function(){
var p=this.places!==""?Number(this.places):20,n="#",d=".",_10f=[n];
if(p){
_10f.push(d);
}
for(var i=0;i<p;i++){
_10f.push(n);
}
return _10f.join("");
},setMaximum:function(_110){
var v=Number(_110);
if(this.minimum===""||this.minimum<v){
this.maximum=v;
if(this.editor){
this.editor.constraints.max=v;
}
}else{
if(this.isDesignLoaded()){
app.alert(dojo.string.substitute(this._messages.rangeMax,[this.minimum]));
}
}
},setMinimum:function(_111){
var v=Number(_111);
if(this.maximum===""||v<this.maximum){
this.minimum=v;
if(this.editor){
this.editor.constraints.min=v;
}
}else{
if(this.isDesignLoaded()){
app.alert(dojo.string.substitute(this._messages.rangeMin,[this.maximum]));
}
}
},_getReadonlyValue:function(){
return dojo.number.format(this.owner.dataValue,this.getFormatProps());
},getFormatProps:function(){
var _112={};
if(this.places&&this.places!=""){
_112.places=Number(this.places);
}
return _112;
}});
dojo.declare("wm._CurrencyEditor",wm._NumberEditor,{currency:"USD",getEditorProps:function(_113,_114){
var prop=this.inherited(arguments);
if(prop.constraints){
delete prop.constraints.pattern;
}
return dojo.mixin(prop,{currency:this.currency},_114||{});
},_createEditor:function(_115,_116){
return new dijit.form.CurrencyTextBox(this.getEditorProps(_115,_116));
},_getReadonlyValue:function(){
return dojo.currency.format(this.owner.dataValue,{currency:this.currency,places:this.places});
},_getPlaces:function(){
return this.places;
}});
dojo.declare("wm._SliderEditor",wm._BaseEditor,{minimum:0,maximum:100,showButtons:true,discreteValues:"",verticalSlider:false,reflow:function(){
},setVerticalSlider:function(_117){
this.verticalSlider=_117;
if(this.editor){
this.createEditor();
}
},getEditorProps:function(_118,_119){
var v=this.owner.displayValue;
var minV=Number(this.minimum)?Number(this.minimum):0;
if(!v||(Number(v)<minV)){
v=this.owner.displayValue=minV;
}
return dojo.mixin(this.inherited(arguments),{minimum:Number(this.minimum),maximum:Number(this.maximum),showButtons:Boolean(this.showButtons),discreteValues:Number(this.discreteValues)||Infinity,value:v},_119||{});
},_createEditor:function(_11a,_11b){
if(this.verticalSlider){
return new dijit.form.VerticalSlider(this.getEditorProps(_11a,_11b));
}else{
return new dijit.form.HorizontalSlider(this.getEditorProps(_11a,_11b));
}
},sizeEditor:function(){
if(this._cupdating){
return;
}
var e=this.editor;
if(e){
var _11c=this.getContentBounds(),_11d=_11c.h?_11c.h-2+"px":"",_11e=_11c.w?_11c.w-4+"px":"",d=e&&e.domNode,s=d.style,fc=d&&d.firstChild;
if(!this.editorBorder){
s.border=0;
}
s.backgroundColor=this.editorBorder?"":"transparent";
s.backgroundImage=this.editorBorder?"":"none";
s.width=_11e;
s.height=_11d;
if(this.verticalSlider){
this.editor.incrementButton.style.width="auto";
this.editor.decrementButton.style.width="auto";
}
}
}});
wm.Object.extendSchema(wm._NumberEditor,{regExp:{ignore:1},maxChars:{ignore:1}});
wm.Object.extendSchema(wm._SliderEditor,{changeOnKey:{ignore:1},changeOnEnter:{ignore:1}});
}
if(!dojo._hasResource["dijit.form.DropDownButton"]){
dojo._hasResource["dijit.form.DropDownButton"]=true;
dojo.provide("dijit.form.DropDownButton");
}
if(!dojo._hasResource["dijit.Calendar"]){
dojo._hasResource["dijit.Calendar"]=true;
dojo.provide("dijit.Calendar");
dojo.declare("dijit.Calendar",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/Calendar.html","<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" dojoAttachEvent=\"onkeypress: _onKeyPress\" aria-labelledby=\"${id}_year\">\r\n\t<thead>\r\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\r\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"decrementMonth\">\r\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"/>\r\n\t\t\t\t<span dojoAttachPoint=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\r\n\t\t\t</th>\r\n\t\t\t<!-- Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \r\n\t\t\t      WaveMaker: Moved year into header for cleaner mobile UI -->\r\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"decrementYear\">\r\n\t\t\t  <span dojoAttachPoint=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\"></span>\r\n\t\t\t</th>\r\n\r\n\t\t\t<th class='dijitReset' colspan=\"3\">\r\n\t\t\t\t<div dojoType=\"dijit.form.DropDownButton\" dojoAttachPoint=\"monthDropDownButton\"\r\n\t\t\t\t\tid=\"${id}_mddb\" tabIndex=\"-1\">\r\n\t\t\t\t</div>\r\n\t\t\t</th>\r\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"incrementYear\">\r\n\t\t\t  <span dojoAttachPoint=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\"></span>\r\n\t\t\t</th>\r\n\r\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"incrementMonth\">\r\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"/>\r\n\t\t\t\t<span dojoAttachPoint=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\"><span class=\"dijitCalendarDayLabel\"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent=\"onclick: _onDayClick, onmouseover: _onDayMouseOver, onmouseout: _onDayMouseOut, onmousedown: _onDayMouseDown, onmouseup: _onDayMouseUp\" class=\"dijitReset dijitCalendarBodyContainer\">\r\n\t\t<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">\r\n\t\t\t<td class=\"dijitReset dijitCalendarDateTemplate\" role=\"gridcell\"><span class=\"dijitCalendarDateLabel\"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<!-- Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \r\n\tWaveMaker: Moved year into header for cleaner mobile UI -->\r\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\" style='display:none'>\r\n\t\t<tr>\r\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\">\r\n\t\t\t\t<h3 class=\"dijitCalendarYearLabel\">\r\n\t\t\t\t<span dojoAttachPoint=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" id=\"${id}_year\"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\r\n"),widgetsInTemplate:true,value:new Date(""),datePackage:"dojo.date",dayWidth:"narrow",tabIndex:"0",currentFocus:new Date(),baseClass:"dijitCalendar",cssStateNodes:{"decrementMonth":"dijitCalendarArrow","incrementMonth":"dijitCalendarArrow","previousYearLabelNode":"dijitCalendarPreviousYear","nextYearLabelNode":"dijitCalendarNextYear"},_isValidDate:function(_11f){
return _11f&&!isNaN(_11f)&&typeof _11f=="object"&&_11f.toString()!=this.constructor.prototype.value.toString();
},setValue:function(_120){
dojo.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_120);
},_getValueAttr:function(){
var _121=new this.dateClassObj(this.value);
_121.setHours(0,0,0,0);
if(_121.getDate()<this.value.getDate()){
_121=this.dateFuncObj.add(_121,"hour",1);
}
return _121;
},_setValueAttr:function(_122,_123){
if(_122){
_122=new this.dateClassObj(_122);
}
if(this._isValidDate(_122)){
if(!this._isValidDate(this.value)||this.dateFuncObj.compare(_122,this.value)){
_122.setHours(1,0,0,0);
if(!this.isDisabledDate(_122,this.lang)){
this._set("value",_122);
var _124=dojo.query("[dijitDateValue="+_122.valueOf()+"]",this.domNode);
if(_124.length){
dojo.addClass(_124[0],"dijitCalendarSelectedDate");
}
this.set("currentFocus",_122);
if(_123||typeof _123=="undefined"){
this.onChange(this.get("value"));
this.onValueSelected(this.get("value"));
}
}
}
}else{
this._set("value",null);
this.set("currentFocus",this.currentFocus);
}
},_setText:function(node,text){
while(node.firstChild){
node.removeChild(node.firstChild);
}
node.appendChild(dojo.doc.createTextNode(text));
},_populateGrid:function(){
var _125=new this.dateClassObj(this.currentFocus);
_125.setDate(1);
var _126=_125.getDay(),_127=this.dateFuncObj.getDaysInMonth(_125),_128=this.dateFuncObj.getDaysInMonth(this.dateFuncObj.add(_125,"month",-1)),_129=new this.dateClassObj(),_12a=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(_12a>_126){
_12a-=7;
}
dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(_12b,i){
i+=_12a;
var date=new this.dateClassObj(_125),_12c,_12d="dijitCalendar",adj=0;
if(i<_126){
_12c=_128-_126+i+1;
adj=-1;
_12d+="Previous";
}else{
if(i>=(_126+_127)){
_12c=i-_126-_127+1;
adj=1;
_12d+="Next";
}else{
_12c=i-_126+1;
_12d+="Current";
}
}
if(adj){
date=this.dateFuncObj.add(date,"month",adj);
}
date.setDate(_12c);
if(!this.dateFuncObj.compare(date,_129,"date")){
_12d="dijitCalendarCurrentDate "+_12d;
}
if(this._isSelectedDate(date,this.lang)){
_12d="dijitCalendarSelectedDate "+_12d;
}
if(this.isDisabledDate(date,this.lang)){
_12d="dijitCalendarDisabledDate "+_12d;
}
var _12e=this.getClassForDate(date,this.lang);
if(_12e){
_12d=_12e+" "+_12d;
}
_12b.className=_12d+"Month dijitCalendarDateTemplate";
_12b.dijitDateValue=date.valueOf();
dojo.attr(_12b,"dijitDateValue",date.valueOf());
var _12f=dojo.query(".dijitCalendarDateLabel",_12b)[0],text=date.getDateLocalized?date.getDateLocalized(this.lang):date.getDate();
this._setText(_12f,text);
},this);
var _130=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_125);
this.monthDropDownButton.dropDown.set("months",_130);
var _131=this.dateLocaleModule.getNames("months","abbr","standAlone",this.lang,_125);
this.monthDropDownButton.containerNode.innerHTML=(dojo.isIE==6?"":"<div class='dijitSpacer'>"+this.monthDropDownButton.dropDown.domNode.innerHTML+"</div>")+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_131[_125.getMonth()]+" "+_125.getFullYear()+"</div>";
var y=_125.getFullYear()-1;
var d=new this.dateClassObj();
dojo.forEach(["previous","current","next"],function(name){
d.setFullYear(y++);
this._setText(this[name+"YearLabelNode"],this.dateLocaleModule.format(d,{selector:"year",locale:this.lang}));
},this);
},goToToday:function(){
this.set("value",new this.dateClassObj());
},constructor:function(args){
var _132=(args.datePackage&&(args.datePackage!="dojo.date"))?args.datePackage+".Date":"Date";
this.dateClassObj=dojo.getObject(_132,false);
this.datePackage=args.datePackage||this.datePackage;
this.dateFuncObj=dojo.getObject(this.datePackage,false);
this.dateLocaleModule=dojo.getObject(this.datePackage+".locale",false);
},postMixInProperties:function(){
if(isNaN(this.value)){
delete this.value;
}
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
dojo.setSelectable(this.domNode,false);
var _133=dojo.hitch(this,function(_134,n){
var _135=dojo.query(_134,this.domNode)[0];
for(var i=0;i<n;i++){
_135.parentNode.appendChild(_135.cloneNode(true));
}
});
_133(".dijitCalendarDayLabelTemplate",6);
_133(".dijitCalendarDateTemplate",6);
_133(".dijitCalendarWeekTemplate",5);
var _136=this.dateLocaleModule.getNames("days",this.dayWidth,"standAlone",this.lang);
var _137=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(_138,i){
this._setText(_138,_136[(i+_137)%7]);
},this);
var _139=new this.dateClassObj(this.currentFocus);
this.monthDropDownButton.dropDown=new dijit.Calendar._MonthDropDown({id:this.id+"_mdd",onChange:dojo.hitch(this,"_onMonthSelect")});
this.set("currentFocus",_139,false);
var _13a=this;
var _13b=function(_13c,_13d,adj){
_13a._connects.push(dijit.typematic.addMouseListener(_13a[_13c],_13a,function(_13e){
if(_13e>=0){
_13a._adjustDisplay(_13d,adj);
}
},0.8,500));
};
_13b("incrementMonth","month",1);
_13b("decrementMonth","month",-1);
_13b("nextYearLabelNode","year",1);
_13b("previousYearLabelNode","year",-1);
},_adjustDisplay:function(part,_13f){
this._setCurrentFocusAttr(this.dateFuncObj.add(this.currentFocus,part,_13f));
},_setCurrentFocusAttr:function(date,_140){
var _141=this.currentFocus,_142=_141?dojo.query("[dijitDateValue="+_141.valueOf()+"]",this.domNode)[0]:null;
date=new this.dateClassObj(date);
date.setHours(1,0,0,0);
this._set("currentFocus",date);
this._populateGrid();
var _143=dojo.query("[dijitDateValue="+date.valueOf()+"]",this.domNode)[0];
_143.setAttribute("tabIndex",this.tabIndex);
if(this._focused||_140){
_143.focus();
}
if(_142&&_142!=_143){
if(dojo.isWebKit){
_142.setAttribute("tabIndex","-1");
}else{
_142.removeAttribute("tabIndex");
}
}
},focus:function(){
this._setCurrentFocusAttr(this.currentFocus,true);
},_onMonthSelect:function(_144){
this.currentFocus=this.dateFuncObj.add(this.currentFocus,"month",_144-this.currentFocus.getMonth());
this._populateGrid();
},_onDayClick:function(evt){
dojo.stopEvent(evt);
for(var node=evt.target;node&&!node.dijitDateValue;node=node.parentNode){
}
if(node&&!dojo.hasClass(node,"dijitCalendarDisabledDate")){
this.set("value",node.dijitDateValue);
}
},_onDayMouseOver:function(evt){
var node=dojo.hasClass(evt.target,"dijitCalendarDateLabel")?evt.target.parentNode:evt.target;
if(node&&(node.dijitDateValue||node==this.previousYearLabelNode||node==this.nextYearLabelNode)){
dojo.addClass(node,"dijitCalendarHoveredDate");
this._currentNode=node;
}
},_onDayMouseOut:function(evt){
if(!this._currentNode){
return;
}
if(evt.relatedTarget&&evt.relatedTarget.parentNode==this._currentNode){
return;
}
var cls="dijitCalendarHoveredDate";
if(dojo.hasClass(this._currentNode,"dijitCalendarActiveDate")){
cls+=" dijitCalendarActiveDate";
}
dojo.removeClass(this._currentNode,cls);
this._currentNode=null;
},_onDayMouseDown:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue){
dojo.addClass(node,"dijitCalendarActiveDate");
this._currentNode=node;
}
},_onDayMouseUp:function(evt){
var node=evt.target.parentNode;
if(node&&node.dijitDateValue){
dojo.removeClass(node,"dijitCalendarActiveDate");
}
},handleKey:function(evt){
var dk=dojo.keys,_145=-1,_146,_147=this.currentFocus;
switch(evt.keyCode){
case dk.RIGHT_ARROW:
_145=1;
case dk.LEFT_ARROW:
_146="day";
if(!this.isLeftToRight()){
_145*=-1;
}
break;
case dk.DOWN_ARROW:
_145=1;
case dk.UP_ARROW:
_146="week";
break;
case dk.PAGE_DOWN:
_145=1;
case dk.PAGE_UP:
_146=evt.ctrlKey||evt.altKey?"year":"month";
break;
case dk.END:
_147=this.dateFuncObj.add(_147,"month",1);
_146="day";
case dk.HOME:
_147=new this.dateClassObj(_147);
_147.setDate(1);
break;
case dk.ENTER:
case dk.SPACE:
this.set("value",this.currentFocus);
break;
default:
return true;
}
if(_146){
_147=this.dateFuncObj.add(_147,_146,_145);
}
this._setCurrentFocusAttr(_147);
return false;
},_onKeyPress:function(evt){
if(!this.handleKey(evt)){
dojo.stopEvent(evt);
}
},onValueSelected:function(date){
},onChange:function(date){
},_isSelectedDate:function(_148,_149){
return this._isValidDate(this.value)&&!this.dateFuncObj.compare(_148,this.value,"date");
},isDisabledDate:function(_14a,_14b){
},getClassForDate:function(_14c,_14d){
}});
dojo.declare("dijit.Calendar._MonthDropDown",[dijit._Widget,dijit._Templated],{months:[],templateString:"<div class='dijitCalendarMonthMenu dijitMenu' "+"dojoAttachEvent='onclick:_onClick,onmouseover:_onMenuHover,onmouseout:_onMenuHover'></div>",_setMonthsAttr:function(_14e){
this.domNode.innerHTML=dojo.map(_14e,function(_14f,idx){
return _14f?"<div class='dijitCalendarMonthLabel' month='"+idx+"'>"+_14f+"</div>":"";
}).join("");
},_onClick:function(evt){
this.onChange(dojo.attr(evt.target,"month"));
},onChange:function(_150){
},_onMenuHover:function(evt){
dojo.toggleClass(evt.target,"dijitCalendarMonthLabelHover",evt.type=="mouseover");
}});
}
if(!dojo._hasResource["dijit.form._DateTimeTextBox"]){
dojo._hasResource["dijit.form._DateTimeTextBox"]=true;
dojo.provide("dijit.form._DateTimeTextBox");
new Date("X");
dojo.declare("dijit.form._DateTimeTextBox",[dijit.form.RangeBoundTextBox,dijit._HasDropDown],{templateString:dojo.cache("dijit.form","templates/DropDownBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\r\n\tid=\"widget_${id}\"\r\n\trole=\"combobox\"\r\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n\t\t>\r\n\t\t\t    <!-- Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0\r\n\t\t\t      WaveMaker: Unfortunate hack to replace input with span to avoid focus issues with mobile that cause keyboards to pop open -->\r\n<${buttonNodeType} class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t${_buttonInputDisabled}\r\n\t/></div\r\n\t><div class='dijitReset dijitValidationContainer'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t/></div\r\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n\t/></div\r\n></div>\r\n"),hasDownArrow:true,openOnClick:true,regExpGen:dojo.date.locale.regexp,datePackage:"dojo.date",compare:function(val1,val2){
var _151=this._isInvalidDate(val1);
var _152=this._isInvalidDate(val2);
return _151?(_152?0:-1):(_152?1:dojo.date.compare(val1,val2,this._selector));
},forceWidth:true,format:function(_153,_154){
if(!_153){
return "";
}
return this.dateLocaleModule.format(_153,_154);
},"parse":function(_155,_156){
return this.dateLocaleModule.parse(_155,_156)||(this._isEmpty(_155)?null:undefined);
},serialize:function(val,_157){
if(val.toGregorian){
val=val.toGregorian();
}
return dojo.date.stamp.toISOString(val,_157);
},dropDownDefaultValue:new Date(),value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(args){
var _158=args.datePackage?args.datePackage+".Date":"Date";
this.dateClassObj=dojo.getObject(_158,false);
this.value=new this.dateClassObj("");
this.datePackage=args.datePackage||this.datePackage;
this.dateLocaleModule=dojo.getObject(this.datePackage+".locale",false);
this.regExpGen=this.dateLocaleModule.regexp;
this._invalidDate=dijit.form._DateTimeTextBox.prototype.value.toString();
},buildRendering:function(){
this.inherited(arguments);
if(!this.hasDownArrow){
this._buttonNode.style.display="none";
}
if(this.openOnClick||!this.hasDownArrow){
this._buttonNode=this.domNode;
this.baseClass+=" dijitComboBoxOpenOnClick";
}
},_setConstraintsAttr:function(_159){
_159.selector=this._selector;
_159.fullYear=true;
var _15a=dojo.date.stamp.fromISOString;
if(typeof _159.min=="string"){
_159.min=_15a(_159.min);
}
if(typeof _159.max=="string"){
_159.max=_15a(_159.max);
}
this.inherited(arguments);
},_isInvalidDate:function(_15b){
return !_15b||isNaN(_15b)||typeof _15b!="object"||_15b.toString()==this._invalidDate;
},_setValueAttr:function(_15c,_15d,_15e){
if(_15c!==undefined){
if(typeof _15c=="string"){
_15c=dojo.date.stamp.fromISOString(_15c);
}
if(this._isInvalidDate(_15c)){
_15c=null;
}
if(_15c instanceof Date&&!(this.dateClassObj instanceof Date)){
_15c=new this.dateClassObj(_15c);
}
}
this.inherited(arguments);
if(this.dropDown){
this.dropDown.set("value",_15c,false);
}
},_set:function(attr,_15f){
if(attr=="value"&&this.value instanceof Date&&this.compare(_15f,this.value)==0){
return;
}
this.inherited(arguments);
},_setDropDownDefaultValueAttr:function(val){
if(this._isInvalidDate(val)){
val=new this.dateClassObj();
}
this.dropDownDefaultValue=val;
},openDropDown:function(_160){
if(this.dropDown){
this.dropDown.destroy();
}
var _161=dojo.getObject(this.popupClass,false),_162=this,_163=this.get("value");
this.dropDown=new _161({onChange:function(_164){
dijit.form._DateTimeTextBox.superclass._setValueAttr.call(_162,_164,true);
},id:this.id+"_popup",dir:_162.dir,lang:_162.lang,value:_163,currentFocus:!this._isInvalidDate(_163)?_163:this.dropDownDefaultValue,constraints:_162.constraints,filterString:_162.filterString,datePackage:_162.datePackage,isDisabledDate:function(date){
return !_162.rangeCheck(date,_162.constraints);
}});
this.inherited(arguments);
},_getDisplayedValueAttr:function(){
return this.textbox.value;
},_setDisplayedValueAttr:function(_165,_166){
this._setValueAttr(this.parse(_165,this.constraints),_166,_165);
}});
}
if(!dojo._hasResource["dijit.form.DateTextBox"]){
dojo._hasResource["dijit.form.DateTextBox"]=true;
dojo.provide("dijit.form.DateTextBox");
dojo.declare("dijit.form.DateTextBox",dijit.form._DateTimeTextBox,{baseClass:"dijitTextBox dijitComboBox dijitDateTextBox",popupClass:"dijit.Calendar",_selector:"date",value:new Date("")});
}
if(!dojo._hasResource["dijit._TimePicker"]){
dojo._hasResource["dijit._TimePicker"]=true;
dojo.provide("dijit._TimePicker");
dojo.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:dojo.cache("dijit","templates/TimePicker.html","<div id=\"widget_${id}\" class=\"dijitMenu\"\r\n    ><div dojoAttachPoint=\"upArrow\" class=\"dijitButtonNode dijitUpArrowButton\" dojoAttachEvent=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\r\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&nbsp;</div\r\n\t\t><div class=\"dijitArrowButtonChar\">&#9650;</div></div\r\n    ><div dojoAttachPoint=\"timeMenu,focusNode\" dojoAttachEvent=\"onclick:_onOptionSelected,onmouseover,onmouseout\"></div\r\n    ><div dojoAttachPoint=\"downArrow\" class=\"dijitButtonNode dijitDownArrowButton\" dojoAttachEvent=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\r\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&nbsp;</div\r\n\t\t><div class=\"dijitArrowButtonChar\">&#9660;</div></div\r\n></div>\r\n"),baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:dojo.date.stamp.toISOString,setValue:function(_167){
dojo.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_167);
},_setValueAttr:function(date){
this._set("value",date);
this._showText();
},_setFilterStringAttr:function(val){
this._set("filterString",val);
this._showText();
},isDisabledDate:function(_168,_169){
return false;
},_getFilteredNodes:function(_16a,_16b,_16c,_16d){
var _16e=[],_16f=_16d?_16d.date:this._refDate,n,i=_16a,max=this._maxIncrement+Math.abs(i),chk=_16c?-1:1,dec=_16c?1:0,inc=1-dec;
do{
i=i-dec;
n=this._createOption(i);
if(n){
if((_16c&&n.date>_16f)||(!_16c&&n.date<_16f)){
break;
}
_16e[_16c?"unshift":"push"](n);
_16f=n.date;
}
i=i+inc;
}while(_16e.length<_16b&&(i*chk)<max);
return _16e;
},_showText:function(){
var _170=dojo.date.stamp.fromISOString;
this.timeMenu.innerHTML="";
this._clickableIncrementDate=_170(this.clickableIncrement);
this._visibleIncrementDate=_170(this.visibleIncrement);
this._visibleRangeDate=_170(this.visibleRange);
var _171=function(date){
return date.getHours()*60*60+date.getMinutes()*60+date.getSeconds();
},_172=_171(this._clickableIncrementDate),_173=_171(this._visibleIncrementDate),_174=_171(this._visibleRangeDate),time=(this.value||this.currentFocus).getTime();
this._refDate=new Date(time-time%(_173*1000));
this._refDate.setFullYear(1970,0,1);
this._clickableIncrement=1;
this._totalIncrements=_174/_172;
this._visibleIncrement=_173/_172;
this._maxIncrement=(60*60*24)/_172;
var _175=this._getFilteredNodes(0,Math.min(this._totalIncrements>>1,10)-1),_176=this._getFilteredNodes(0,Math.min(this._totalIncrements,10)-_175.length,true,_175[0]);
dojo.forEach(_176.concat(_175),function(n){
this.timeMenu.appendChild(n);
},this);
},constructor:function(){
this.constraints={};
},postMixInProperties:function(){
this.inherited(arguments);
this._setConstraintsAttr(this.constraints);
},_setConstraintsAttr:function(_177){
dojo.mixin(this,_177);
if(!_177.locale){
_177.locale=this.lang;
}
},postCreate:function(){
this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
this._connects.push(dijit.typematic.addMouseListener(this.upArrow,this,"_onArrowUp",33,250));
this._connects.push(dijit.typematic.addMouseListener(this.downArrow,this,"_onArrowDown",33,250));
this.inherited(arguments);
},_buttonMouse:function(e){
dojo.toggleClass(e.currentTarget,e.currentTarget==this.upArrow?"dijitUpArrowHover":"dijitDownArrowHover",e.type=="mouseenter"||e.type=="mouseover");
},_createOption:function(_178){
var date=new Date(this._refDate);
var _179=this._clickableIncrementDate;
date.setHours(date.getHours()+_179.getHours()*_178,date.getMinutes()+_179.getMinutes()*_178,date.getSeconds()+_179.getSeconds()*_178);
if(this.constraints.selector=="time"){
date.setFullYear(1970,0,1);
}
var _17a=dojo.date.locale.format(date,this.constraints);
if(this.filterString&&_17a.toLowerCase().indexOf(this.filterString)!==0){
return null;
}
var div=dojo.create("div",{"class":this.baseClass+"Item"});
div.date=date;
div.index=_178;
dojo.create("div",{"class":this.baseClass+"ItemInner",innerHTML:_17a},div);
if(_178%this._visibleIncrement<1&&_178%this._visibleIncrement>-1){
dojo.addClass(div,this.baseClass+"Marker");
}else{
if(!(_178%this._clickableIncrement)){
dojo.addClass(div,this.baseClass+"Tick");
}
}
if(this.isDisabledDate(date)){
dojo.addClass(div,this.baseClass+"ItemDisabled");
}
if(this.value&&!dojo.date.compare(this.value,date,this.constraints.selector)){
div.selected=true;
dojo.addClass(div,this.baseClass+"ItemSelected");
if(dojo.hasClass(div,this.baseClass+"Marker")){
dojo.addClass(div,this.baseClass+"MarkerSelected");
}else{
dojo.addClass(div,this.baseClass+"TickSelected");
}
this._highlightOption(div,true);
}
return div;
},_onOptionSelected:function(tgt){
var _17b=tgt.target.date||tgt.target.parentNode.date;
if(!_17b||this.isDisabledDate(_17b)){
return;
}
this._highlighted_option=null;
this.set("value",_17b);
this.onChange(_17b);
},onChange:function(time){
},_highlightOption:function(node,_17c){
if(!node){
return;
}
if(_17c){
if(this._highlighted_option){
this._highlightOption(this._highlighted_option,false);
}
this._highlighted_option=node;
}else{
if(this._highlighted_option!==node){
return;
}else{
this._highlighted_option=null;
}
}
dojo.toggleClass(node,this.baseClass+"ItemHover",_17c);
if(dojo.hasClass(node,this.baseClass+"Marker")){
dojo.toggleClass(node,this.baseClass+"MarkerHover",_17c);
}else{
dojo.toggleClass(node,this.baseClass+"TickHover",_17c);
}
},onmouseover:function(e){
this._keyboardSelected=null;
var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
if(!dojo.hasClass(tgr,this.baseClass+"Item")){
return;
}
this._highlightOption(tgr,true);
},onmouseout:function(e){
this._keyboardSelected=null;
var tgr=(e.target.parentNode===this.timeMenu)?e.target:e.target.parentNode;
this._highlightOption(tgr,false);
},_mouseWheeled:function(e){
this._keyboardSelected=null;
dojo.stopEvent(e);
var _17d=(dojo.isIE?e.wheelDelta:-e.detail);
this[(_17d>0?"_onArrowUp":"_onArrowDown")]();
},_onArrowUp:function(_17e){
if(typeof _17e=="number"&&_17e==-1){
return;
}
if(!this.timeMenu.childNodes.length){
return;
}
var _17f=this.timeMenu.childNodes[0].index;
var divs=this._getFilteredNodes(_17f,1,true,this.timeMenu.childNodes[0]);
if(divs.length){
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(divs[0],this.timeMenu.childNodes[0]);
}
},_onArrowDown:function(_180){
if(typeof _180=="number"&&_180==-1){
return;
}
if(!this.timeMenu.childNodes.length){
return;
}
var _181=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var divs=this._getFilteredNodes(_181,1,false,this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
if(divs.length){
this.timeMenu.removeChild(this.timeMenu.childNodes[0]);
this.timeMenu.appendChild(divs[0]);
}
},handleKey:function(e){
var dk=dojo.keys;
if(e.charOrCode==dk.DOWN_ARROW||e.charOrCode==dk.UP_ARROW){
dojo.stopEvent(e);
if(this._highlighted_option&&!this._highlighted_option.parentNode){
this._highlighted_option=null;
}
var _182=this.timeMenu,tgt=this._highlighted_option||dojo.query("."+this.baseClass+"ItemSelected",_182)[0];
if(!tgt){
tgt=_182.childNodes[0];
}else{
if(_182.childNodes.length){
if(e.charOrCode==dk.DOWN_ARROW&&!tgt.nextSibling){
this._onArrowDown();
}else{
if(e.charOrCode==dk.UP_ARROW&&!tgt.previousSibling){
this._onArrowUp();
}
}
if(e.charOrCode==dk.DOWN_ARROW){
tgt=tgt.nextSibling;
}else{
tgt=tgt.previousSibling;
}
}
}
this._highlightOption(tgt,true);
this._keyboardSelected=tgt;
return false;
}else{
if(e.charOrCode==dk.ENTER||e.charOrCode===dk.TAB){
if(!this._keyboardSelected&&e.charOrCode===dk.TAB){
return true;
}
if(this._highlighted_option){
this._onOptionSelected({target:this._highlighted_option});
}
return e.charOrCode===dk.TAB;
}
}
}});
}
if(!dojo._hasResource["dijit.form.TimeTextBox"]){
dojo._hasResource["dijit.form.TimeTextBox"]=true;
dojo.provide("dijit.form.TimeTextBox");
dojo.declare("dijit.form.TimeTextBox",dijit.form._DateTimeTextBox,{baseClass:"dijitTextBox dijitComboBox dijitTimeTextBox",popupClass:"dijit._TimePicker",_selector:"time",value:new Date(""),_onKey:function(evt){
this.inherited(arguments);
switch(evt.keyCode){
case dojo.keys.ENTER:
case dojo.keys.TAB:
case dojo.keys.ESCAPE:
case dojo.keys.DOWN_ARROW:
case dojo.keys.UP_ARROW:
break;
default:
setTimeout(dojo.hitch(this,function(){
var val=this.get("displayedValue");
this.filterString=(val&&!this.parse(val,this.constraints))?val.toLowerCase():"";
if(this._opened){
this.closeDropDown();
}
this.openDropDown();
}),0);
}
}});
}
if(!dojo._hasResource["wm.base.widget.Editors._DateEditor"]){
dojo._hasResource["wm.base.widget.Editors._DateEditor"]=true;
dojo.provide("wm.base.widget.Editors._DateEditor");
dojo.declare("wm._DateEditor",wm._BaseEditor,{promptMessage:"",invalidMessage:"",minimum:"",maximum:"",format:"",dateEditorType:"DateTextBox",getEditorProps:function(_183,_184){
var _185={};
if(this.minimum){
_185.min=this.convertValue(this.minimum);
}
if(this.maximum){
_185.max=this.convertValue(this.maximum);
}
var prop=dojo.mixin(this.inherited(arguments),{promptMessage:this.promptMessage,invalidMessage:this.invalidMessage||"$_unset_$",constraints:_185,required:this.required,value:this.convertValue(this.owner.displayValue)},_184||{});
if(this.format!=""){
prop.lang=this.format;
}
return prop;
},_createEditor:function(_186,_187){
if(this.dateEditorType=="DualCalendar"){
dojo["require"]("wm.base.components.DualCalendar");
return new wm.DualCalendar(this.getEditorProps(_186,_187));
}else{
if(this.dateEditorType=="IslamicDateTextbox"){
dojo["require"]("wm.base.components.IslamicDateTextbox");
return new wm.IslamicDateTextbox(this.getEditorProps(_186,_187));
}else{
return new dijit.form.DateTextBox(this.getEditorProps(_186,_187));
}
}
},convertValue:function(_188){
return wm.convertValueToDate(_188);
},getEditorValue:function(){
var d=this.inherited(arguments);
return d&&d.getTime()||this.makeEmptyValue();
},setEditorValue:function(_189){
this.inherited(arguments,[this.convertValue(_189)]);
}});
dojo.declare("wm._TimeEditor",wm._DateEditor,{timePattern:"HH:mm a",getEditorProps:function(_18a,_18b){
var prop=dojo.mixin(this.inherited(arguments),{constraints:{timePattern:this.timePattern}},_18b||{});
return prop;
},convertValue:function(_18c){
return wm.convertValueToDate(_18c,{selector:"time"});
},_createEditor:function(_18d,_18e){
return new dijit.form.TimeTextBox(this.getEditorProps(_18d,_18e));
}});
wm.Object.extendSchema(wm._DateEditor,{changeOnKey:{ignore:1}});
wm.Object.extendSchema(wm._TimeEditor,{format:{ignore:1},timePattern:{options:["HH:mm","HH:mm:ss","HH:mm a","HH:mm:ss a"]}});
}
if(!dojo._hasResource["wm.base.widget.Editors._CheckBoxEditor"]){
dojo._hasResource["wm.base.widget.Editors._CheckBoxEditor"]=true;
dojo.provide("wm.base.widget.Editors._CheckBoxEditor");
dojo.declare("wm._CheckBoxEditor",wm._BaseEditor,{dataType:"string",startChecked:false,_hasReadonlyValue:false,_createEditor:function(_18f,_190){
return new dijit.form.CheckBox(this.getEditorProps(_18f,_190));
},setRequired:function(){
},connectEditor:function(){
this.inherited(arguments);
if(this.owner.captionLabel){
this.addEditorConnect(this.owner.captionLabel,"onclick",this,"captionClicked");
}
},styleEditor:function(){
this.inherited(arguments);
dojo.addClass(this.editor.domNode.parentNode,"wmeditor-cbeditor");
var n=this.owner.captionLabel.domNode;
if(n){
n.style.cursor="pointer";
dojo.setSelectable(n,false);
}
},sizeEditor:function(){
this.inherited(arguments);
this.editor.domNode.style.width="16px";
},renderBounds:function(){
this.inherited(arguments);
this.domNode.style.textAlign=(this.owner.captionPosition=="right")?"right":"";
},setInitialValue:function(){
this.owner.beginEditUpdate();
if(this.startChecked){
this.setChecked(true);
}
this.owner.endEditUpdate();
},getChecked:function(){
return Boolean(this.editor.checked);
},setChecked:function(_191){
this.editor.set("checked",_191);
},captionClicked:function(){
if(!this.owner.readonly&&!this.owner.disabled){
this.setChecked(!this.getChecked());
}
},getDisplayValue:function(){
return this.getTypedValue(this.owner.displayValue);
},setDisplayValue:function(_192){
},getEditorValue:function(){
var c=this.editor&&this.editor.checked,v=this.getDisplayValue();
if(v===undefined){
v=this.getTypedValue(1);
}
return c?v:this.makeEmptyValue();
},getTypedValue:function(_193){
var v=_193;
switch(this.dataType){
case "string":
v=v||v===0?v:"";
return String(v);
case "number":
var n=Number(v);
return isNaN(n)?Number(Boolean(v)):n;
default:
return Boolean(v);
}
},setEditorValue:function(_194){
if(_194==null){
_194=this.startChecked;
}
if(this.editor){
var t=(_194===this.getDisplayValue()),f=(_194===this.makeEmptyValue());
this._hasReadonlyValue=t||f;
this.editor.set("checked",t);
this.updateReadonlyValue();
}
},_getReadonlyValue:function(){
var v=this._hasReadonlyValue?this.getEditorValue():"";
return wm.capitalize(String(v));
},setReadonlyValue:function(){
if(!this.domNode){
return;
}
var v=this._hasReadonlyValue?this.getEditorValue():"";
var _195=new dijit.form.CheckBox({},dojo.doc.createElement("div"));
_195.set("checked",v);
_195.set("disabled",true);
while(this.domNode.childNodes.length>0){
this.domNode.removeChild(this.domNode.childNodes[0]);
}
this.domNode.appendChild(_195.domNode);
},setStartChecked:function(_196){
this.startChecked=_196;
this.createEditor();
},setDataType:function(_197){
this.dataType=_197;
if(_197=="boolean"){
this.owner.displayValue=true;
}
}});
wm.Object.extendSchema(wm._CheckBoxEditor,{changeOnKey:{ignore:1},changeOnEnter:{ignore:1},dataType:{options:["string","boolean","number"]},startChecked:{bindable:1,type:"Boolean"},displayValue:{isOwnerProperty:1,ignore:1,writeonly:1,type:"any"},checkedValue:{isOwnerProperty:1,readonly:1,bindable:1,group:"edit",order:40,type:"any"},required:{ignore:1}});
}
if(!dojo._hasResource["wm.base.widget.Editors._RadioButtonEditor"]){
dojo._hasResource["wm.base.widget.Editors._RadioButtonEditor"]=true;
dojo.provide("wm.base.widget.Editors._RadioButtonEditor");
dojo.declare("wm._RadioButtonEditor",wm._CheckBoxEditor,{radioGroup:"",_createEditor:function(_198,_199){
return new dijit.form.RadioButton(this.getEditorProps(_198,_199));
},getEditorProps:function(_19a,_19b){
return dojo.mixin(this.inherited(arguments),{name:this.radioGroup},_19b||{});
},captionClicked:function(){
if(!this.owner.readonly&&!this.owner.disabled){
this.setChecked(true);
}
},setEditorValue:function(){
this.inherited(arguments);
this.updateGroupValue();
},setRadioGroup:function(_19c){
this.radioGroup=_19c?wm.getValidJsName(_19c):"";
var _19d=this.getGroup();
if(_19d.length){
this.dataType=_19d[0].owner.dataType;
}
this.createEditor();
wm.fire(studio.inspector,"reinspect");
},getGroup:function(){
var _19e=[];
var _19f=dojo.query("input[type=radio][name="+this.radioGroup+"]");
_19f.forEach(function(_1a0,_1a1,_1a2){
_19e[_1a1]=dijit.getEnclosingWidget(_1a0);
});
return _19e;
},updateGroupValue:function(){
var _1a3=this.getGroup(),gv=this.getGroupValue();
for(var i=0,v,o;(v=_1a3[i]);i++){
o=(v.owner||0).owner;
if(o){
o.groupValue=gv;
o.valueChanged("groupValue",gv);
}
}
},setGroupValue:function(_1a4){
var _1a5=this.getGroup();
for(var i=0,v;(v=_1a5[i]);i++){
if(v.owner.getDisplayValue()===_1a4){
if(!v.checked){
v.owner.setChecked(true);
}
return;
}
}
for(var i=0,v;(v=_1a5[i]);i++){
if(v.checked){
v.owner.setChecked(false);
return;
}
}
},getGroupValue:function(){
var _1a6=this.getGroup();
for(var i=0,v;(v=_1a6[i]);i++){
if(v.checked){
return v.owner.getEditorValue();
}
}
for(var i=0,v;(v=_1a6[i]);i++){
return v.owner.makeEmptyValue();
}
},isLoading:function(){
var l=this.inherited(arguments);
if(!l){
var _1a7=this.getGroup();
for(var i=0,v,gl;(v=_1a7[i]);i++){
gl=v.owner.owner._rendering;
if(gl){
return true;
}
}
}
return l;
},setDataType:function(_1a8){
var _1a9=this.getGroup();
for(var i=0,v;(v=_1a9[i]);i++){
v.owner.dataType=_1a8;
}
},setStartChecked:function(_1aa){
if(_1aa){
var _1ab=this.getGroup();
for(var i=0,v,r;(v=_1ab[i]);i++){
if(v.owner!=this){
v.owner.setStartChecked(false);
}
}
}
this.inherited(arguments);
},ownerEditorChanged:function(){
this.updateGroupValue();
}});
wm.Object.extendSchema(wm._RadioButtonEditor,{groupValue:{isOwnerProperty:1,ignore:1,bindable:1,type:"any",group:"edit",order:50}});
}
if(!dojo._hasResource["dojo.data.util.sorter"]){
dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.getObject("data.util.sorter",true,dojo);
dojo.data.util.sorter.basicComparator=function(a,b){
var r=-1;
if(a===null){
a=undefined;
}
if(b===null){
b=undefined;
}
if(a==b){
r=0;
}else{
if(a>b||a==null){
r=1;
}
}
return r;
};
dojo.data.util.sorter.createSortFunction=function(_1ac,_1ad){
var _1ae=[];
function _1af(attr,dir,comp,s){
return function(_1b0,_1b1){
var a=s.getValue(_1b0,attr);
var b=s.getValue(_1b1,attr);
return dir*comp(a,b);
};
};
var _1b2;
var map=_1ad.comparatorMap;
var bc=dojo.data.util.sorter.basicComparator;
for(var i=0;i<_1ac.length;i++){
_1b2=_1ac[i];
var attr=_1b2.attribute;
if(attr){
var dir=(_1b2.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_1ae.push(_1af(attr,dir,comp,_1ad));
}
}
return function(rowA,rowB){
var i=0;
while(i<_1ae.length){
var ret=_1ae[i++](rowA,rowB);
if(ret!==0){
return ret;
}
}
return 0;
};
};
}
if(!dojo._hasResource["dojo.data.util.simpleFetch"]){
dojo._hasResource["dojo.data.util.simpleFetch"]=true;
dojo.provide("dojo.data.util.simpleFetch");
dojo.getObject("data.util.simpleFetch",true,dojo);
dojo.data.util.simpleFetch.fetch=function(_1b3){
_1b3=_1b3||{};
if(!_1b3.store){
_1b3.store=this;
}
var self=this;
var _1b4=function(_1b5,_1b6){
if(_1b6.onError){
var _1b7=_1b6.scope||dojo.global;
_1b6.onError.call(_1b7,_1b5,_1b6);
}
};
var _1b8=function(_1b9,_1ba){
var _1bb=_1ba.abort||null;
var _1bc=false;
var _1bd=_1ba.start?_1ba.start:0;
var _1be=(_1ba.count&&(_1ba.count!==Infinity))?(_1bd+_1ba.count):_1b9.length;
_1ba.abort=function(){
_1bc=true;
if(_1bb){
_1bb.call(_1ba);
}
};
var _1bf=_1ba.scope||dojo.global;
if(!_1ba.store){
_1ba.store=self;
}
if(_1ba.onBegin){
_1ba.onBegin.call(_1bf,_1b9.length,_1ba);
}
if(_1ba.sort){
_1b9.sort(dojo.data.util.sorter.createSortFunction(_1ba.sort,self));
}
if(_1ba.onItem){
for(var i=_1bd;(i<_1b9.length)&&(i<_1be);++i){
var item=_1b9[i];
if(!_1bc){
_1ba.onItem.call(_1bf,item,_1ba);
}
}
}
if(_1ba.onComplete&&!_1bc){
var _1c0=null;
if(!_1ba.onItem){
_1c0=_1b9.slice(_1bd,_1be);
}
_1ba.onComplete.call(_1bf,_1c0,_1ba);
}
};
this._fetchItems(_1b3,_1b8,_1b4);
return _1b3;
};
}
if(!dojo._hasResource["wm.base.data.SimpleStore"]){
dojo._hasResource["wm.base.data.SimpleStore"]=true;
dojo.provide("wm.base.data.SimpleStore");
dojo.declare("wm.base.data.SimpleStore",null,{constructor:function(_1c1,_1c2){
this.data=_1c1||[];
this.identity=_1c2;
},getCount:function(){
return this.data.length;
},_fetchItemByIdentity:function(_1c3){
var id=this.identity;
for(var i=0,data=this.data,l=this.getCount(),d;i<l&&(d=data[i]);i++){
if(d[id]===_1c3){
return d;
}
}
},_getQuery:function(_1c4){
var _1c5=_1c4.query;
if(dojo.isString(_1c5)){
var q=_1c5;
_1c5={};
_1c5[this.identity]=q;
}
return _1c5;
},_objectsMatch:function(inA,inB){
var ac=0,a=inA instanceof wm.Variable?inA.getData():inA,b=inB instanceof wm.Variable?inB.getData():inB;
for(var i in a){
if(dojo.isObject(a[i])){
continue;
}
ac++;
if(a[i]!=(b&&b[i])){
return;
}
}
var bc=0;
for(var i in b){
if(!dojo.isObject(b[i])){
bc++;
}
}
return ac==bc;
},_itemInQuery:function(_1c6,_1c7,_1c8,_1c9){
var d=_1c6,w="*",a,b,_1ca;
for(var i in _1c7){
a=d[i];
if(dojo.isString(a)){
a=a.replace(/\\([^\\])/g,"$1");
}
b=_1c7[i];
if(dojo.isString(b)){
b=b.replace(/\\([^\\])/g,"$1");
}
if(b==w){
continue;
}
_1ca=_1c9||(typeof b=="string"&&b.indexOf(w)==-1);
if(dojo.isString(a)&&dojo.isString(b)&&!_1ca){
if(b.charAt(b.length-1)==w){
b=b.slice(0,-1);
}
if(_1c8){
a=a.toLowerCase();
b=b.toLowerCase();
}
if(a.indexOf(b)!=0){
return;
}
}else{
if(dojo.isObject(a)&&dojo.isObject(b)){
return this._objectsMatch(a,b);
}else{
if(a!==b){
return;
}
}
}
}
return true;
},_fetchItems:function(_1cb,_1cc,_1cd){
var _1ce=this._getQuery(_1cb),opts=_1cb.queryOptions,_1cf=opts&&opts.ignoreCase,_1d0=opts&&opts.exactMatch,_1d1=[];
for(var i=0,data=this.data,l=this.getCount(),d;i<l&&(d=data[i]);i++){
if(this._itemInQuery(d,_1ce,_1cf,_1d0)){
_1d1.push(d);
if(_1d0){
break;
}
}
}
_1cc(_1d1,_1cb);
},_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error("Invalid item:",item);
}
},getValue:function(item,_1d2,_1d3){
this._assertIsItem(item);
var v=item[_1d2];
return v!==undefined?v:_1d3;
},getValues:function(item,_1d4){
var d=this.getValue(item,_1d4);
return d?[d]:[];
},getAttributes:function(item){
this._assertIsItem(item);
var _1d5=[];
for(var i in item){
_1d5.push(i);
}
return _1d5;
},hasAttribute:function(item,_1d6){
this._assertIsItem(item);
for(var i in item){
if(_1d6==i){
return true;
}
}
return false;
},containsValue:function(item,_1d7,_1d8){
this._assertIsItem(item);
return (this.getValue(item,_1d7)===_1d8);
},isItem:function(_1d9){
return _1d9&&dojo.isObject(_1d9);
},isItemLoaded:function(_1da){
return this.isItem(_1da);
},loadItem:function(_1db){
if(!this.isItemLoaded(_1db.item)){
throw new Error("Unimplemented API: dojo.data.api.Read.loadItem");
}
},getFeatures:function(){
return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
},close:function(_1dc){
},getLabel:function(item){
this._assertIsItem(item);
return (item||[]).toString();
},getLabelAttributes:function(item){
return this.getAttributes(item);
},getIdentity:function(item){
this._assertIsItem(item);
return item[this.identity]||null;
},getIdentityAttributes:function(item){
return this.identity;
},fetchItemByIdentity:function(_1dd){
var _1de=_1dd.identity;
if(_1de===undefined){
if(_1dd.onError){
_1dd.onError.call(_1df,"No item found");
}
return;
}
var item=this._fetchItemByIdentity(_1de),_1df=_1dd.scope?_1dd.scope:dojo.global;
if(item){
if(_1dd.onItem){
_1dd.onItem.call(_1df,item);
}
}else{
if(_1dd.onError){
_1dd.onError.call(_1df,"No item found");
}
}
}});
dojo.extend(wm.base.data.SimpleStore,dojo.data.util.simpleFetch);
}
if(!dojo._hasResource["wm.base.widget.Editors._SelectEditor"]){
dojo._hasResource["wm.base.widget.Editors._SelectEditor"]=true;
dojo.provide("wm.base.widget.Editors._SelectEditor");
dojo.declare("wm._SelectEditor",wm._BaseEditor,{options:"",displayField:"",dataField:"",displayExpression:"",lookupDisplay:"Text",pageSize:20,allowNone:false,autoComplete:true,hasDownArrow:true,startUpdate:false,_allFields:"All Fields",restrictValues:true,init:function(){
this.inherited(arguments);
this.owner.selectedItem=new wm.Variable({name:"selectedItem",owner:this.owner});
},ownerLoaded:function(){
if(this.startUpdate){
this.update();
}
},update:function(){
if(this.dataSet instanceof wm.ServiceVariable){
var d=this.dataSet.update();
return d;
}
},generateStore:function(){
this._initDataProps();
var d=this._getData();
return new wm.base.data.SimpleStore(d,"name",this);
},getEditorProps:function(_1e0,_1e1){
var _1e2=this.generateStore();
return dojo.mixin(this.inherited(arguments),{required:this.required,store:_1e2,autoComplete:this.autoComplete,hasDownArrow:this.hasDownArrow,searchAttr:"name",pageSize:this.pageSize?this.pageSize+1:Infinity},_1e1||{});
},createEditor:function(){
var _1e3=this.inherited(arguments);
if(this.isReflowEnabled()){
this.renderBounds();
}
return _1e3;
},_createEditor:function(_1e4,_1e5){
if(this.restrictValues){
return new dijit.form.FilteringSelect(this.getEditorProps(_1e4,_1e5));
}else{
return new dijit.form.ComboBox(this.getEditorProps(_1e4,_1e5));
}
},setRestrictValues:function(_1e6){
var _1e7=this.getEditorValue();
var _1e8=this.restrictValues;
this.restrictValues=_1e6;
if(this.editor&&_1e8!=_1e6){
this.createEditor();
this.setEditorValue(_1e7);
}
if(!_1e6&&this.dataField==this._allFields){
this.dataField="";
}
},sizeEditor:function(){
this.inherited(arguments);
this.domNode.style.height="";
this.domNode.style.lineHeight="";
if(this.editor&&this.editor.domNode){
this.editor.domNode.style.height=this.getContentBounds().h+"px";
if(this.editor.downArrowNode){
this.editor.downArrowNode.style.height=this.editor.domNode.style.height;
if(this.editor.downArrowNode.childNodes.length==1){
this.editor.downArrowNode.childNodes[0].style.height=this.editor.domNode.style.height;
}
}
if(dojo.isIE&&dojo.isIE<8){
var n=dojo.query(".dijitArrowButtonInner",this.domNode)[0];
var h=dojo.coords(this.editor.domNode).h;
var s=n.style;
var c=dojo.coords(n);
s.position="relative";
s.top=Math.floor((h-c.h)/2)+"px";
}
}
},hasValues:function(){
return (this.editor&&this.editor.store.getCount());
},getStoreItem:function(_1e9,_1ea){
if(!this.hasValues()){
return;
}
var _1eb,_1ec=function(item){
_1eb=item;
},_1ed={};
_1ed[_1ea]=_1e9;
this.editor.store.fetch({query:_1ed,queryOptions:{exactMatch:true},count:1,onItem:_1ec});
return _1eb;
},isAllDataFields:function(){
return (this.dataField==this._allFields);
},setInitialValue:function(){
this.owner.beginEditUpdate();
this.owner.selectedItem.setType(this.dataSet instanceof wm.Variable?this.dataSet.type:"AnyData");
var _1ee=this.owner.dataValue,_1ef=this.owner.displayValue;
if(wm.propertyIsChanged(_1ee,"dataValue",wm.Editor)){
this.setEditorValue(_1ee);
}else{
this.setDisplayValue(_1ef);
}
this.owner.endEditUpdate();
},setDisplayValue:function(_1f0){
var i=this.getStoreItem(_1f0,"name");
if(i!==undefined){
this._setEditorValue(this.editor.store.getValue(i,"name"));
}else{
this.clear();
}
},setEditorValue:function(_1f1){
var i;
if(this.isAllDataFields()&&_1f1 instanceof wm.Variable){
var v=this._getDisplayData(_1f1);
i=this.getStoreItem(v,"name");
}else{
i=this.getStoreItem(_1f1,"value");
}
if(i!==undefined){
this._setEditorValue(this.editor.store.getValue(i,"name"));
}else{
if(this.restrictValues){
this.clear();
}else{
this.editor.set("value",_1f1);
}
}
this.updateReadonlyValue();
},_setEditorValue:function(_1f2){
_1f2=String(_1f2);
delete this._isValid;
var e=this.editor;
e._isvalid=true;
if(this.restrictValues){
e.set("displayedValue",_1f2);
}else{
e.set("value",_1f2);
}
},getDisplayValue:function(){
if(this.hasValues()){
return this.inherited(arguments);
}
},getEditorValue:function(){
var v;
if(this.editor&&this.hasValues()){
var _1f3=this.editor.get("value"),i=_1f3&&this.getStoreItem(_1f3,"name");
if(i){
v=this.editor.store.getValue(i,"value");
v=v instanceof wm.Variable?v.getData():v;
}
}
if(!this.restrictValues&&_1f3&&!v){
return _1f3;
}
return (v||v===0)?v:this.makeEmptyValue();
},setDataField:function(_1f4){
this.dataField=_1f4;
},setDisplayField:function(_1f5){
this.displayField=_1f5;
},_getFirstDataField:function(){
if(!this.dataSet){
return;
}
var _1f6=this.dataSet._dataSchema;
for(var i in _1f6){
var ti=_1f6[i];
if(!ti.isList&&!ti.isObject){
return i;
}
}
},_initDataProps:function(){
if(this.dataSet){
var ff=this._getFirstDataField();
this._displayField=this.displayField||ff||"name";
this._dataField=this.dataField||ff||("dataValue" in this.dataSet._dataSchema?"dataValue":"value");
}else{
if(this.options){
this._displayField=this._dataField="name";
}
}
},_getOptionsData:function(){
var data=[];
if(!this.options){
return data;
}
for(var i=0,opts=this.options.split(","),l=opts.length,d;i<l;i++){
d=dojo.string.trim(opts[i]);
if(d!=""){
data[i]={dataValue:d};
}
}
return data;
},_getDisplayData:function(_1f7){
var de=this.displayExpression,v=_1f7;
var _1f8="";
if(de){
return wm.expression.getValue(de,v);
}else{
if(this.lookupDisplay&&this.lookupDisplay!="Text"){
return this.formatData(v.getValue(this._displayField));
}else{
return v.getValue(this._displayField);
}
}
},formatData:function(_1f9){
try{
if(this.formatter){
return this.formatter.format(_1f9);
}else{
if(this.lookupDisplay){
var ctor=wm.getFormatter(this.lookupDisplay);
this.formatter=new ctor({name:"format",owner:this});
return this.formatter.format(_1f9);
}else{
return _1f9;
}
}
}
catch(e){
}
},_getDataSetData:function(){
var _1fa=this.dataSet,data=[],_1fb=this._dataField,af=this.isAllDataFields();
for(var i=0,c=_1fa.getCount(),v;i<c&&(v=_1fa.getItem(i));i++){
data.push({name:this._getDisplayData(v),value:af?v.getData():v.getValue(_1fb)});
}
return data;
},_getData:function(){
var data=[];
if(this.dataSet){
data=this._getDataSetData();
}else{
if(this.options){
this.setOptionsVariable();
data=this._getDataSetData();
}
}
if(this.allowNone){
var o={name:"",value:null};
data.unshift(o);
}
return data;
},setDataSet:function(_1fc){
var ds=this.dataSet=_1fc;
if(!ds||!ds.data||!ds.data.list){
return;
}
this.createEditor();
if(_1fc&&_1fc.type&&_1fc.type!="any"&&_1fc.type!=this.owner.selectedItem.type){
this.owner.selectedItem.setType(_1fc.type);
}
},setOptionsVariable:function(){
var opts=this._getOptionsData();
var ds=this.dataSet=new wm.Variable({name:"optionsVar",owner:this,type:"StringData"});
ds.setData(opts);
this.displayField="dataValue";
this.dataField="dataValue";
},setOptions:function(_1fd){
this.options=_1fd;
this.setOptionsVariable();
this.createEditor();
},setOptionSet:function(_1fe){
if(_1fe==null||_1fe==undefined||_1fe.length==0){
return;
}
var obj=_1fe[0];
var keys=[];
for(var key in obj){
keys.push(key);
}
var _1ff={};
_1ff.name=this.owner.name+"Var";
_1ff.owner=this;
_1ff.type="EntryData";
var ds=this.dataSet=new wm.Variable(_1ff);
var ds=this.dataSet=new wm.Variable(_1ff);
ds.setData(_1fe);
this.displayField=keys[0];
this.dataField=keys[1];
this.createEditor();
},isReady:function(){
return this.inherited(arguments)&&this.hasValues();
},clear:function(){
this.reset();
if(this.editor&&this.hasValues()){
if(this.restrictValues){
try{
this.editor.set("value","");
}
catch(e){
}
}else{
this.editor.set("value",undefined);
}
}
},ownerEditorChanged:function(){
this.updateSelectedItem();
},updateSelectedItem:function(){
var v=this.getEditorValue();
this.owner.selectedItem.setData(v);
}});
dojo.declare("wm._LookupEditor",wm._SelectEditor,{dataField:"All Fields",autoDataSet:true,startUpdate:true,init:function(){
this.inherited(arguments);
if(this.autoDataSet){
this.createDataSet();
}
},createDataSet:function(){
wm.fire(this.$.liveVariable,"destroy");
var pf=wm.getParentForm(this.owner);
var v=wm.getFormLiveView(pf);
if(v){
var ff=wm.getFormField(this.owner);
v.addRelated(ff);
var lv=this.dataSet=new wm.LiveVariable({name:"liveVariable",owner:this,autoUpdate:false,startUpdate:false,_rootField:ff,liveView:v});
this.owner.selectedItem.setType(this.dataSet.type);
this.createDataSetWire(lv);
}else{
if(pf){
var evt2=pf._getEditorBindSourceId(pf.getSourceId())+"-created";
this._subscriptions.push(dojo.subscribe(evt2,this,"_onSourceCreated"));
}
}
},_onSourceCreated:function(){
try{
this.createDataSet();
this.update();
}
catch(e){
}
},createDataSetWire:function(_200){
var w=this._dataSetWire=new wm.Wire({name:"dataFieldWire",target:this,owner:this,source:_200.getId(),targetProperty:"dataSet"});
w.connectWire();
},setAutoDataSet:function(_201){
this.autoDataSet=_201;
if(this.autoDataSet){
this.createDataSet();
this.update();
}
},_getFormSource:function(_202){
var w=wm.data.getPropWire(_202,"dataSet");
return w&&w.source&&this.getRoot().getValueById(w.source);
},changed:function(){
if(this.owner.isUpdating()){
return;
}
this.inherited(arguments);
var f=wm.getParentForm(this.owner);
var s=this._getFormSource(f);
if(s){
this.owner.beginEditUpdate();
var v=this.owner.dataValue;
if(this.autoDataSet){
var i=this.dataSet.getItemIndex(v);
if(i>=0){
this.dataSet.cursor=i;
}
}
s.setData(v);
this.owner.endEditUpdate();
wm.fire(f,"populateEditors");
}
}});
wm._SelectEditor.extend({updateNow:"(updateNow)",set_dataSet:function(_203){
if(_203&&!(_203 instanceof wm.Variable)){
var ds=this.getValueById(_203);
if(ds){
this.components.binding.addWire("","dataSet",ds.getId());
}
}else{
this.setDataSet(_203);
}
},_addFields:function(_204,_205){
for(var i in _205){
var ti=_205[i];
if(!(ti||0).isList&&!wm.typeManager.isStructuredType((ti||0).type)){
_204.push(i);
}
}
},_listFields:function(){
var list=[""];
var _206=this.dataSet instanceof wm.LiveVariable?wm.typeManager.getTypeSchema(this.dataSet.type):(this.dataSet||0)._dataSchema;
var _206=(this.dataSet||0)._dataSchema;
this._addFields(list,_206);
return list;
},updateNow:function(){
return this.update();
}});
wm.Object.extendSchema(wm._SelectEditor,{changeOnKey:{ignore:1},changeOnEnter:{ignore:1},selectedItem:{ignore:true,isObject:true,bindSource:true,isOwnerProperty:1},dataSet:{readonly:true,group:"data",order:5,type:"wm.Variable",isList:true,bindTarget:true,editor:"wm.prop.DataSetSelect"},startUpdate:{group:"data",order:6},liveVariable:{ignore:1},formatter:{ignore:1},options:{group:"data",order:7},dataField:{group:"data",order:10,editor:"wm.prop.FieldSelect"},displayField:{group:"data",order:15,editor:"wm.prop.FieldSelect"},lookupDisplay:{group:"data",order:16,options:wm.selectDisplayTypes},displayExpression:{group:"data",order:20},hasDownArrow:{group:"editor",order:26},restrictValues:{type:"wm.Boolean",group:"data",order:40},pageSize:{order:0},updateNow:{group:"operation",operation:1},dataFieldWire:{ignore:1}});
wm._LookupEditor.extend({listProperties:function(){
var _207=this.inherited(arguments);
_207.dataSet.ignoretmp=this.autoDataSet;
_207.dataSet.bindTarget=!_207.dataSet.ignoretmp;
return _207;
}});
wm.Object.extendSchema(wm._LookupEditor,{autoDataSet:{group:"data",order:3},options:{ignore:1},dataField:{ignore:1}});
}
if(!dojo._hasResource["dijit.form._Spinner"]){
dojo._hasResource["dijit.form._Spinner"]=true;
dojo.provide("dijit.form._Spinner");
dojo.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,minimumTimeout:10,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:dojo.cache("dijit.form","templates/Spinner.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\r\n\tid=\"widget_${id}\" role=\"presentation\"\r\n\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\r\n\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t/><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\"\r\n\t\t\tdojoAttachPoint=\"upArrowNode\"\r\n\t\t\t><div class=\"dijitArrowButtonInner\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t></div\r\n\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\"\r\n\t\t\tdojoAttachPoint=\"downArrowNode\"\r\n\t\t\t><div class=\"dijitArrowButtonInner\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t></div\r\n\t></div\r\n\t><div class='dijitReset dijitValidationContainer'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t/></div\r\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class='dijitReset dijitInputInner' dojoAttachPoint=\"textbox,focusNode\" type=\"${type}\" dojoAttachEvent=\"onkeypress:_onKeyPress\"\r\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\r\n\t/></div\r\n></div>\r\n"),baseClass:"dijitTextBox dijitSpinner",cssStateNodes:{"upArrowNode":"dijitUpArrowButton","downArrowNode":"dijitDownArrowButton"},adjust:function(val,_208){
return val;
},_arrowPressed:function(_209,_20a,_20b){
if(this.disabled||this.readOnly){
return;
}
this._setValueAttr(this.adjust(this.get("value"),_20a*_20b),false);
dijit.selectInputText(this.textbox,this.textbox.value.length);
},_arrowReleased:function(node){
this._wheelTimer=null;
if(this.disabled||this.readOnly){
return;
}
},_typematicCallback:function(_20c,node,evt){
var inc=this.smallDelta;
if(node==this.textbox){
var k=dojo.keys;
var key=evt.charOrCode;
inc=(key==k.PAGE_UP||key==k.PAGE_DOWN)?this.largeDelta:this.smallDelta;
node=(key==k.UP_ARROW||key==k.PAGE_UP)?this.upArrowNode:this.downArrowNode;
}
if(_20c==-1){
this._arrowReleased(node);
}else{
this._arrowPressed(node,(node==this.upArrowNode)?1:-1,inc);
}
},_wheelTimer:null,_mouseWheeled:function(evt){
dojo.stopEvent(evt);
var _20d=evt.detail?(evt.detail*-1):(evt.wheelDelta/120);
if(_20d!==0){
var node=this[(_20d>0?"upArrowNode":"downArrowNode")];
this._arrowPressed(node,_20d,this.smallDelta);
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
dojo.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:dojo.number.regexp,value:NaN,editOptions:{pattern:"#.######"},_formatter:dojo.number.format,_setConstraintsAttr:function(_20e){
var _20f=typeof _20e.places=="number"?_20e.places:0;
if(_20f){
_20f++;
}
if(typeof _20e.max!="number"){
_20e.max=9*Math.pow(10,15-_20f);
}
if(typeof _20e.min!="number"){
_20e.min=-9*Math.pow(10,15-_20f);
}
this.inherited(arguments,[_20e]);
if(this.focusNode&&this.focusNode.value&&!isNaN(this.value)){
this.set("value",this.value);
}
},_onFocus:function(){
if(this.disabled){
return;
}
var val=this.get("value");
if(typeof val=="number"&&!isNaN(val)){
var _210=this.format(val,this.constraints);
if(_210!==undefined){
this.textbox.value=_210;
}
}
this.inherited(arguments);
},format:function(_211,_212){
var _213=String(_211);
if(typeof _211!="number"){
return _213;
}
if(isNaN(_211)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_211,_212))&&_212.exponent!==false&&/\de[-+]?\d/i.test(_213)){
return _213;
}
if(this.editOptions&&this._focused){
_212=dojo.mixin({},_212,this.editOptions);
}
return this._formatter(_211,_212);
},_parser:dojo.number.parse,parse:function(_214,_215){
var v=this._parser(_214,dojo.mixin({},_215,(this.editOptions&&this._focused)?this.editOptions:{}));
if(this.editOptions&&this._focused&&isNaN(v)){
v=this._parser(_214,_215);
}
return v;
},_getDisplayedValueAttr:function(){
var v=this.inherited(arguments);
return isNaN(v)?this.textbox.value:v;
},filter:function(_216){
return (_216===null||_216===""||_216===undefined)?NaN:this.inherited(arguments);
},serialize:function(_217,_218){
return (typeof _217!="number"||isNaN(_217))?"":this.inherited(arguments);
},_setBlurValue:function(){
var val=dojo.hitch(dojo.mixin({},this,{_focused:true}),"get")("value");
this._setValueAttr(val,true);
},_setValueAttr:function(_219,_21a,_21b){
if(_219!==undefined&&_21b===undefined){
_21b=String(_219);
if(typeof _219=="number"){
if(isNaN(_219)){
_21b="";
}else{
if(("rangeCheck" in this&&this.rangeCheck(_219,this.constraints))||this.constraints.exponent===false||!/\de[-+]?\d/i.test(_21b)){
_21b=undefined;
}
}
}else{
if(!_219){
_21b="";
_219=NaN;
}else{
_219=undefined;
}
}
}
this.inherited(arguments,[_219,_21a,_21b]);
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
},isValid:function(_21c){
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
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{adjust:function(val,_21d){
var tc=this.constraints,v=isNaN(val),_21e=!isNaN(tc.max),_21f=!isNaN(tc.min);
if(v&&_21d!=0){
val=(_21d>0)?_21f?tc.min:_21e?tc.max:0:_21e?this.constraints.max:_21f?tc.min:0;
}
var _220=val+_21d;
if(v||isNaN(_220)){
return val;
}
if(_21e&&(_220>tc.max)){
_220=tc.max;
}
if(_21f&&(_220<tc.min)){
_220=tc.min;
}
return _220;
},_onKeyPress:function(e){
if((e.charOrCode==dojo.keys.HOME||e.charOrCode==dojo.keys.END)&&!(e.ctrlKey||e.altKey||e.metaKey)&&typeof this.get("value")!="undefined"){
var _221=this.constraints[(e.charOrCode==dojo.keys.HOME?"min":"max")];
if(typeof _221=="number"){
this._setValueAttr(_221,false);
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
var _222={ADP:0,AFN:0,ALL:0,AMD:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,COP:0,CRC:0,DJF:0,ESP:0,GNF:0,GYD:0,HUF:0,IDR:0,IQD:0,IRR:3,ISK:0,ITL:0,JOD:3,JPY:0,KMF:0,KPW:0,KRW:0,KWD:3,LAK:0,LBP:0,LUF:0,LYD:3,MGA:0,MGF:0,MMK:0,MNT:0,MRO:0,MUR:0,OMR:3,PKR:0,PYG:0,RSD:0,RWF:0,SLL:0,SOS:0,STD:0,SYP:0,TMM:0,TND:3,TRL:0,TZS:0,UGX:0,UZS:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,YER:0,ZMK:0,ZWD:0};
var _223={CHF:5};
var _224=_222[code],_225=_223[code];
if(typeof _224=="undefined"){
_224=2;
}
if(typeof _225=="undefined"){
_225=0;
}
return {places:_224,round:_225};
};
}
if(!dojo._hasResource["dojo.currency"]){
dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.getObject("currency",true,dojo);
dojo.currency._mixInDefaults=function(_226){
_226=_226||{};
_226.type="currency";
var _227=dojo.i18n.getLocalization("dojo.cldr","currency",_226.locale)||{};
var iso=_226.currency;
var data=dojo.cldr.monetary.getData(iso);
dojo.forEach(["displayName","symbol","group","decimal"],function(prop){
data[prop]=_227[iso+"_"+prop];
});
data.fractional=[true,false];
return dojo.mixin(data,_226);
};
dojo.currency.format=function(_228,_229){
return dojo.number.format(_228,dojo.currency._mixInDefaults(_229));
};
dojo.currency.regexp=function(_22a){
return dojo.number.regexp(dojo.currency._mixInDefaults(_22a));
};
dojo.currency.parse=function(_22b,_22c){
return dojo.number.parse(_22b,dojo.currency._mixInDefaults(_22c));
};
}
if(!dojo._hasResource["dijit.form.CurrencyTextBox"]){
dojo._hasResource["dijit.form.CurrencyTextBox"]=true;
dojo.provide("dijit.form.CurrencyTextBox");
dojo.declare("dijit.form.CurrencyTextBox",dijit.form.NumberTextBox,{currency:"",baseClass:"dijitTextBox dijitCurrencyTextBox",regExpGen:function(_22d){
return "("+(this._focused?this.inherited(arguments,[dojo.mixin({},_22d,this.editOptions)])+"|":"")+dojo.currency.regexp(_22d)+")";
},_formatter:dojo.currency.format,_parser:dojo.currency.parse,parse:function(_22e,_22f){
var v=this.inherited(arguments);
if(isNaN(v)&&/\d+/.test(_22e)){
v=dojo.hitch(dojo.mixin({},this,{_parser:dijit.form.NumberTextBox.prototype._parser}),"inherited")(arguments);
}
return v;
},_setConstraintsAttr:function(_230){
if(!_230.currency&&this.currency){
_230.currency=this.currency;
}
this.inherited(arguments,[dojo.currency._mixInDefaults(dojo.mixin(_230,{exponent:false}))]);
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.Number"]){
dojo._hasResource["wm.base.widget.Editors.Number"]=true;
dojo.provide("wm.base.widget.Editors.Number");
dijit.form.NumberTextBox.extend({format:function(_231,_232){
var _233=String(_231);
if(typeof _231!="number"){
return _233;
}
if(isNaN(_231)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_231,_232))&&_232.exponent!==false&&/de[-+]?d/i.test(_233)){
return _233;
}
_232=dojo.mixin({},_232,this.editOptions);
if(!this._focused){
delete _232.pattern;
}
return this._formatter(_231,_232);
},_refreshState:function(){
var _234=this.get("displayedValue");
var _235=_234.indexOf(".");
if(this.editOptions.places&&this.editOptions.placeWhileTyping&&_235!=-1){
var _236=_234.substr(0,_235)+"."+_234.substr(_235+1,this.editOptions.places);
if(_236!=_234){
this.focusNode.value=_236;
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
var _237={};
if(!isNaN(parseInt(this.minimum))){
_237.min=Number(this.minimum);
}
if(!isNaN(parseInt(this.maximum))){
_237.max=Number(this.maximum);
}
return _237;
},getEditorProps:function(_238,_239){
var v=this.displayValue;
var _23a=this.getEditorConstraints();
var p=dojo.mixin(this.inherited(arguments),{constraints:_23a,rangeMessage:this.rangeMessage,required:this.required,value:v?Number(v):"",editOptions:dojo.clone(dijit.form.NumberTextBox.prototype.editOptions)},_239||{});
if(this.noFormatting){
p._formatter=function(_23b){
return _23b;
};
}
var _23c=this._getPlaces();
if(_23c!==""){
p.editOptions.places=_23c;
p.editOptions.placeWhileTyping=this.applyPlacesWhileTyping;
}
return p;
},_getPlaces:function(){
if(this.places===""){
return this.places;
}else{
return Number(this.places);
}
},_createEditor:function(_23d,_23e){
var e;
if(this.spinnerButtons&&!wm.isMobile){
e=new dijit.form.NumberSpinner(this.getEditorProps(_23d,_23e));
}else{
e=new dijit.form.NumberTextBox(this.getEditorProps(_23d,_23e));
}
return e;
},setMaximum:function(_23f){
var v=(_23f==="")?"":Number(_23f);
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
},setMinimum:function(_240){
var v=(_240==="")?"":Number(_240);
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
var _241={};
if(this.places&&this.places!=""){
_241.places=parseInt(this.places);
}
return _241;
},setSpinnerButtons:function(_242){
if(this.spinnerButtons!=_242){
this.spinnerButtons=_242;
this.createEditor();
}
},calcIsDirty:function(a,b){
if(a===0&&b===""||a===""&&b===0){
return false;
}
return a!==b;
}});
dojo.declare("wm.Currency",wm.Number,{currency:"",getEditorProps:function(_243,_244){
var prop=this.inherited(arguments);
if(prop.constraints){
delete prop.constraints.pattern;
}
return dojo.mixin(prop,{currency:this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD"},_244||{});
},_createEditor:function(_245,_246){
return new dijit.form.CurrencyTextBox(this.getEditorProps(_245,_246));
},_getReadonlyValue:function(){
return dojo.currency.format(this.dataValue,{currency:this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD",places:parseInt(this.places)});
},setEditorValue:function(_247){
var v=_247;
if(this.editor){
v=dojo.currency.parse(dojo.currency.format(String(v).replace(/[^0-9\-\.]/g,""),this.editor.constraints),this.editor.constraints);
}
wm.AbstractEditor.prototype.setEditorValue.call(this,v);
},getDataValue:function(){
return this.dataValue;
},editorChanged:function(){
var _248=this.dataValue;
this.dataValue=this.getEditorValue();
var _249=this.displayValue;
this.displayValue=this._getReadonlyValue();
var _24a=false;
if(_248!=this._lastValue){
this.valueChanged("dataValue",this.dataValue);
_24a=true;
}
if(_249!=this.displayValue){
this.valueChanged("displayValue",this.displayValue);
_24a=true;
}
if(_24a){
if(this._inPostInit){
this._lastValue=this.dataValue;
}
this.updateIsDirty();
}
return _24a;
},setCurrency:function(_24b){
this.currency=_24b;
this.createEditor();
}});
}
if(!dojo._hasResource["dojo.fx.Toggler"]){
dojo._hasResource["dojo.fx.Toggler"]=true;
dojo.provide("dojo.fx.Toggler");
dojo.declare("dojo.fx.Toggler",null,{node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,constructor:function(args){
var _24c=this;
dojo.mixin(_24c,args);
_24c.node=args.node;
_24c._showArgs=dojo.mixin({},args);
_24c._showArgs.node=_24c.node;
_24c._showArgs.duration=_24c.showDuration;
_24c.showAnim=_24c.showFunc(_24c._showArgs);
_24c._hideArgs=dojo.mixin({},args);
_24c._hideArgs.node=_24c.node;
_24c._hideArgs.duration=_24c.hideDuration;
_24c.hideAnim=_24c.hideFunc(_24c._hideArgs);
dojo.connect(_24c.showAnim,"beforeBegin",dojo.hitch(_24c.hideAnim,"stop",true));
dojo.connect(_24c.hideAnim,"beforeBegin",dojo.hitch(_24c.showAnim,"stop",true));
},show:function(_24d){
return this.showAnim.play(_24d||0);
},hide:function(_24e){
return this.hideAnim.play(_24e||0);
}});
}
if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
(function(){
var d=dojo,_24f={_fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,args||[]);
}
return this;
}};
var _250=function(_251){
this._index=-1;
this._animations=_251||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_250,{_onAnimate:function(){
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
},play:function(_252,_253){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_253&&this._current.status()=="playing"){
return this;
}
var _254=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_255=d.connect(this._current,"onBegin",this,function(arg){
this._fire("onBegin",arguments);
}),_256=d.connect(this._current,"onPlay",this,function(arg){
this._fire("onPlay",arguments);
d.disconnect(_254);
d.disconnect(_255);
d.disconnect(_256);
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
},gotoPercent:function(_257,_258){
this.pause();
var _259=this.duration*_257;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_259){
this._current=a;
return true;
}
_259-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_259/this._current.duration,_258);
}
return this;
},stop:function(_25a){
if(this._current){
if(_25a){
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
d.extend(_250,_24f);
dojo.fx.chain=function(_25b){
return new _250(_25b);
};
var _25c=function(_25d){
this._animations=_25d||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_25d,function(a){
var _25e=a.duration;
if(a.delay){
_25e+=a.delay;
}
if(this.duration<_25e){
this.duration=_25e;
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
d.extend(_25c,{_doAction:function(_25f,args){
d.forEach(this._animations,function(a){
a[_25f].apply(a,args);
});
return this;
},_onEnd:function(){
if(++this._finished>this._animations.length){
this._fire("onEnd");
}
},_call:function(_260,args){
var t=this._pseudoAnimation;
t[_260].apply(t,args);
},play:function(_261,_262){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_263,_264){
var ms=this.duration*_263;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_264);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_265){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_25c,_24f);
dojo.fx.combine=function(_266){
return new _25c(_266);
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
var _267=d.style(node,"height");
return Math.max(_267,1);
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
var _268=args.method||"chain";
if(!args.duration){
args.duration=500;
}
if(_268=="chain"){
args.duration=Math.floor(args.duration/2);
}
var top,_269,left,_26a,_26b,_26c=null;
var init=(function(n){
return function(){
var cs=dojo.getComputedStyle(n),pos=cs.position,w=cs.width,h=cs.height;
top=(pos==abs?n.offsetTop:parseInt(cs.top)||0);
left=(pos==abs?n.offsetLeft:parseInt(cs.left)||0);
_26b=(w=="auto"?0:parseInt(w));
_26c=(h=="auto"?0:parseInt(h));
_26a=left-Math.floor((args.width-_26b)/2);
_269=top-Math.floor((args.height-_26c)/2);
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
var _26d=dojo.animateProperty(dojo.mixin({properties:{height:function(){
init();
return {end:args.height||0,start:_26c};
},top:function(){
return {start:top,end:_269};
}}},args));
var _26e=dojo.animateProperty(dojo.mixin({properties:{width:function(){
return {start:_26b,end:args.width||0};
},left:function(){
return {start:left,end:_26a};
}}},args));
var anim=dojo.fx[(args.method=="combine"?"combine":"chain")]([_26d,_26e]);
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
var _26f=dojo.animateProperty(dojo.mixin({properties:{top:top+(args.top||0),left:left+(args.left||0)}},args));
dojo.connect(_26f,"beforeBegin",_26f,init);
return _26f;
};
dojox.fx.crossFade=function(args){
var _270=args.nodes[0]=dojo.byId(args.nodes[0]),op1=dojo.style(_270,"opacity"),_271=args.nodes[1]=dojo.byId(args.nodes[1]),op2=dojo.style(_271,"opacity");
var _272=dojo.fx.combine([dojo[(op1==0?"fadeIn":"fadeOut")](dojo.mixin({node:_270},args)),dojo[(op1==0?"fadeOut":"fadeIn")](dojo.mixin({node:_271},args))]);
return _272;
};
dojox.fx.highlight=function(args){
var node=args.node=dojo.byId(args.node);
args.duration=args.duration||400;
var _273=args.color||"#ffff99",_274=dojo.style(node,"backgroundColor");
if(_274=="rgba(0, 0, 0, 0)"){
_274="transparent";
}
var anim=dojo.animateProperty(dojo.mixin({properties:{backgroundColor:{start:_273,end:_274}}},args));
if(_274=="transparent"){
dojo.connect(anim,"onEnd",anim,function(){
node.style.backgroundColor=_274;
});
}
return anim;
};
dojox.fx.wipeTo=function(args){
args.node=dojo.byId(args.node);
var node=args.node,s=node.style;
var dir=(args.width?"width":"height"),_275=args[dir],_276={};
_276[dir]={start:function(){
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
},end:_275};
var anim=dojo.animateProperty(dojo.mixin({properties:_276},args));
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
var _277=function(a,b){
return b-a;
},_278=function(a,b){
return a-b;
};
dojo.declare("dojox.form._RangeSliderMixin",null,{value:[0,100],postMixInProperties:function(){
this.inherited(arguments);
this.value=dojo.map(this.value,function(i){
return parseInt(i,10);
});
},postCreate:function(){
this.inherited(arguments);
this.value.sort(this._isReversed()?_277:_278);
var _279=this;
var _27a=dojo.declare(dijit.form._SliderMoverMax,{constructor:function(){
this.widget=_279;
}});
this._movableMax=new dojo.dnd.Moveable(this.sliderHandleMax,{mover:_27a});
dijit.setWaiState(this.focusNodeMax,"valuemin",this.minimum);
dijit.setWaiState(this.focusNodeMax,"valuemax",this.maximum);
var _27b=dojo.declare(dijit.form._SliderBarMover,{constructor:function(){
this.widget=_279;
}});
this._movableBar=new dojo.dnd.Moveable(this.progressBar,{mover:_27b});
},destroy:function(){
this.inherited(arguments);
this._movableMax.destroy();
this._movableBar.destroy();
},_onKeyPress:function(e){
if(this.disabled||this.readOnly||e.altKey||e.ctrlKey){
return;
}
var _27c=e.currentTarget,_27d=false,_27e=false,k=dojo.keys;
if(_27c==this.sliderHandle){
_27d=true;
}else{
if(_27c==this.progressBar){
_27e=_27d=true;
}else{
if(_27c==this.sliderHandleMax){
_27e=true;
}
}
}
switch(e.keyCode){
case k.HOME:
this._setValueAttr(this.minimum,true,_27e);
break;
case k.END:
this._setValueAttr(this.maximum,true,_27e);
break;
case ((this._descending||this.isLeftToRight())?k.RIGHT_ARROW:k.LEFT_ARROW):
case (this._descending===false?k.DOWN_ARROW:k.UP_ARROW):
case (this._descending===false?k.PAGE_DOWN:k.PAGE_UP):
if(_27d&&_27e){
this._bumpValue([{"change":e.keyCode==k.PAGE_UP?this.pageIncrement:1,"useMaxValue":true},{"change":e.keyCode==k.PAGE_UP?this.pageIncrement:1,"useMaxValue":false}]);
}else{
if(_27d){
this._bumpValue(e.keyCode==k.PAGE_UP?this.pageIncrement:1,true);
}else{
if(_27e){
this._bumpValue(e.keyCode==k.PAGE_UP?this.pageIncrement:1);
}
}
}
break;
case ((this._descending||this.isLeftToRight())?k.LEFT_ARROW:k.RIGHT_ARROW):
case (this._descending===false?k.UP_ARROW:k.DOWN_ARROW):
case (this._descending===false?k.PAGE_UP:k.PAGE_DOWN):
if(_27d&&_27e){
this._bumpValue([{change:e.keyCode==k.PAGE_DOWN?-this.pageIncrement:-1,useMaxValue:false},{change:e.keyCode==k.PAGE_DOWN?-this.pageIncrement:-1,useMaxValue:true}]);
}else{
if(_27d){
this._bumpValue(e.keyCode==k.PAGE_DOWN?-this.pageIncrement:-1);
}else{
if(_27e){
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
},_bumpValue:function(_27f,_280){
var _281=dojo.isArray(_27f)?[this._getBumpValue(_27f[0].change,_27f[0].useMaxValue),this._getBumpValue(_27f[1].change,_27f[1].useMaxValue)]:this._getBumpValue(_27f,_280);
this._setValueAttr(_281,true,!dojo.isArray(_27f)&&((_27f>0&&!_280)||(_280&&_27f<0)));
},_getBumpValue:function(_282,_283){
var s=dojo.getComputedStyle(this.sliderBarContainer),c=dojo._getContentBox(this.sliderBarContainer,s),_284=this.discreteValues,_285=!_283?this.value[0]:this.value[1];
if(_284<=1||_284==Infinity){
_284=c[this._pixelCount];
}
_284--;
if((this._isReversed()&&_282<0)||(_282>0&&!this._isReversed())){
_285=!_283?this.value[1]:this.value[0];
}
var _286=(_285-this.minimum)*_284/(this.maximum-this.minimum)+_282;
if(_286<0){
_286=0;
}
if(_286>_284){
_286=_284;
}
return _286*(this.maximum-this.minimum)/_284+this.minimum;
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
var _287=dojo.coords(this.sliderBarContainer,true),bar=dojo.coords(this.progressBar,true),_288=e[this._mousePixelCoord]-_287[this._startingPixelCoord],_289=bar[this._startingPixelCount],_28a=_289+bar[this._pixelCount],_28b=this._isReversed()?_288<=_289:_288>=_28a,p=this._isReversed()?_287[this._pixelCount]-_288:_288;
this._setPixelValue(p,_287[this._pixelCount],true,_28b);
dojo.stopEvent(e);
},_setPixelValue:function(_28c,_28d,_28e,_28f){
if(this.dynamicSlider){
_28e=true;
}
if(this.disabled||this.readOnly){
return;
}
var _290=this._getValueByPixelValue(_28c,_28d);
this._setValueAttr(_290,_28e,_28f);
},_getValueByPixelValue:function(_291,_292){
_291=_291<0?0:_292<_291?_292:_291;
var _293=this.discreteValues;
if(_293<=1||_293==Infinity){
_293=_292;
}
_293--;
var _294=_292/_293;
var _295=Math.round(_291/_294);
return (this.maximum-this.minimum)*_295/_293+this.minimum;
},_setValueAttr:function(_296,_297,_298){
var _299=this.value;
if(!dojo.isArray(_299)){
_299=[0,0];
}
if(!dojo.isArray(_296)){
if(_298){
if(this._isReversed()){
_299[0]=_296;
}else{
_299[1]=_296;
}
}else{
if(this._isReversed()){
_299[1]=_296;
}else{
_299[0]=_296;
}
}
}else{
_299=_296;
}
this._lastValueReported="";
this.valueNode.value=this.value=_296=_299;
dijit.setWaiState(this.focusNode,"valuenow",_299[0]);
dijit.setWaiState(this.focusNodeMax,"valuenow",_299[1]);
this.value.sort(this._isReversed()?_277:_278);
dijit.form._FormValueWidget.prototype._setValueAttr.apply(this,arguments);
this._printSliderBar(_297,_298);
},_printSliderBar:function(_29a,_29b){
var _29c=(this.value[0]-this.minimum)/(this.maximum-this.minimum);
var _29d=(this.value[1]-this.minimum)/(this.maximum-this.minimum);
var _29e=_29c;
if(_29c>_29d){
_29c=_29d;
_29d=_29e;
}
var _29f=this._isReversed()?((1-_29c)*100):(_29c*100);
var _2a0=this._isReversed()?((1-_29d)*100):(_29d*100);
var _2a1=this._isReversed()?((1-_29d)*100):(_29c*100);
if(_29a&&this.slideDuration>0&&this.progressBar.style[this._progressPixelSize]){
var _2a2=_29b?_29d:_29c;
var _2a3=this;
var _2a4={};
var _2a5=parseFloat(this.progressBar.style[this._handleOffsetCoord]);
var _2a6=this.slideDuration/10;
if(_2a6===0){
return;
}
if(_2a6<0){
_2a6=0-_2a6;
}
var _2a7={};
var _2a8={};
var _2a9={};
_2a7[this._handleOffsetCoord]={start:this.sliderHandle.style[this._handleOffsetCoord],end:_29f,units:"%"};
_2a8[this._handleOffsetCoord]={start:this.sliderHandleMax.style[this._handleOffsetCoord],end:_2a0,units:"%"};
_2a9[this._handleOffsetCoord]={start:this.progressBar.style[this._handleOffsetCoord],end:_2a1,units:"%"};
_2a9[this._progressPixelSize]={start:this.progressBar.style[this._progressPixelSize],end:(_29d-_29c)*100,units:"%"};
var _2aa=dojo.animateProperty({node:this.sliderHandle,duration:_2a6,properties:_2a7});
var _2ab=dojo.animateProperty({node:this.sliderHandleMax,duration:_2a6,properties:_2a8});
var _2ac=dojo.animateProperty({node:this.progressBar,duration:_2a6,properties:_2a9});
var _2ad=dojo.fx.combine([_2aa,_2ab,_2ac]);
_2ad.play();
}else{
this.sliderHandle.style[this._handleOffsetCoord]=_29f+"%";
this.sliderHandleMax.style[this._handleOffsetCoord]=_2a0+"%";
this.progressBar.style[this._handleOffsetCoord]=_2a1+"%";
this.progressBar.style[this._progressPixelSize]=((_29d-_29c)*100)+"%";
}
}});
dojo.declare("dijit.form._SliderMoverMax",dijit.form._SliderMover,{onMouseMove:function(e){
var _2ae=this.widget;
var _2af=_2ae._abspos;
if(!_2af){
_2af=_2ae._abspos=dojo.coords(_2ae.sliderBarContainer,true);
_2ae._setPixelValue_=dojo.hitch(_2ae,"_setPixelValue");
_2ae._isReversed_=_2ae._isReversed();
}
var _2b0=e.touches?e.touches[0]:e;
var _2b1=_2b0[_2ae._mousePixelCoord]-_2af[_2ae._startingPixelCoord];
_2ae._setPixelValue_(_2ae._isReversed_?(_2af[_2ae._pixelCount]-_2b1):_2b1,_2af[_2ae._pixelCount],false,true);
},destroy:function(e){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _2b2=this.widget;
_2b2._abspos=null;
_2b2._setValueAttr(_2b2.value,true);
}});
dojo.declare("dijit.form._SliderBarMover",dojo.dnd.Mover,{onMouseMove:function(e){
var _2b3=this.widget;
if(_2b3.disabled||_2b3.readOnly){
return;
}
var _2b4=_2b3._abspos;
var bar=_2b3._bar;
var _2b5=_2b3._mouseOffset;
if(!_2b4){
_2b4=_2b3._abspos=dojo.coords(_2b3.sliderBarContainer,true);
_2b3._setPixelValue_=dojo.hitch(_2b3,"_setPixelValue");
_2b3._getValueByPixelValue_=dojo.hitch(_2b3,"_getValueByPixelValue");
_2b3._isReversed_=_2b3._isReversed();
}
if(!bar){
bar=_2b3._bar=dojo.coords(_2b3.progressBar,true);
}
var _2b6=e.touches?e.touches[0]:e;
if(!_2b5){
_2b5=_2b3._mouseOffset=_2b6[_2b3._mousePixelCoord]-_2b4[_2b3._startingPixelCoord]-bar[_2b3._startingPixelCount];
}
var _2b7=_2b6[_2b3._mousePixelCoord]-_2b4[_2b3._startingPixelCoord]-_2b5,_2b8=_2b7+bar[_2b3._pixelCount];
pixelValues=[_2b7,_2b8];
pixelValues.sort(_278);
if(pixelValues[0]<=0){
pixelValues[0]=0;
pixelValues[1]=bar[_2b3._pixelCount];
}
if(pixelValues[1]>=_2b4[_2b3._pixelCount]){
pixelValues[1]=_2b4[_2b3._pixelCount];
pixelValues[0]=_2b4[_2b3._pixelCount]-bar[_2b3._pixelCount];
}
var _2b9=[_2b3._getValueByPixelValue(_2b3._isReversed_?(_2b4[_2b3._pixelCount]-pixelValues[0]):pixelValues[0],_2b4[_2b3._pixelCount]),_2b3._getValueByPixelValue(_2b3._isReversed_?(_2b4[_2b3._pixelCount]-pixelValues[1]):pixelValues[1],_2b4[_2b3._pixelCount])];
_2b3._setValueAttr(_2b9,false,false);
},destroy:function(){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _2ba=this.widget;
_2ba._abspos=null;
_2ba._bar=null;
_2ba._mouseOffset=null;
_2ba._setValueAttr(_2ba.value,true);
}});
dojo.declare("dojox.form.HorizontalRangeSlider",[dijit.form.HorizontalSlider,dojox.form._RangeSliderMixin],{templateString:dojo.cache("dojox.form","resources/HorizontalRangeSlider.html","<table class=\"dijit dijitReset dijitSlider dijitSliderH dojoxRangeSlider\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" dojoAttachEvent=\"onkeypress:_onKeyPress,onkeyup:_onKeyUp\"\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t\t><td dojoAttachPoint=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\r\n\t\t\t><div class=\"dijitSliderDecrementIconH\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" dojoAttachEvent=\"onmousedown:_onClkDecBumper\"></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\r\n\t\t\t/><div role=\"presentation\" class=\"dojoxRangeSliderBarContainer\" dojoAttachPoint=\"sliderBarContainer\"\r\n\t\t\t\t><div dojoAttachPoint=\"sliderHandle\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableH\" dojoAttachEvent=\"onmousedown:_onHandleClick\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\r\n\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleH\"></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar,focusNode\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" dojoAttachEvent=\"onmousedown:_onBarClick\"></div\r\n\t\t\t\t><div dojoAttachPoint=\"sliderHandleMax,focusNodeMax\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableH\" dojoAttachEvent=\"onmousedown:_onHandleClickMax\" role=\"sliderMax\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\r\n\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleH\"></div\r\n\t\t\t\t></div\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" dojoAttachEvent=\"onmousedown:_onRemainingBarClick\"></div\r\n\t\t\t></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" dojoAttachEvent=\"onmousedown:_onClkIncBumper\"></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\r\n\t\t\t><div class=\"dijitSliderIncrementIconH\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\r\n\t\t></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t\t><td dojoAttachPoint=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\r\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\r\n\t></tr\r\n></table>\r\n")});
dojo.declare("dojox.form.VerticalRangeSlider",[dijit.form.VerticalSlider,dojox.form._RangeSliderMixin],{templateString:dojo.cache("dojox.form","resources/VerticalRangeSlider.html","<table class=\"dijitReset dijitSlider dijitSliderV dojoxRangeSlider\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\"\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderIncrementIconV\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"decrementButton\" dojoAttachEvent=\"onclick: increment\"><span class=\"dijitSliderButtonInner\">+</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper\" dojoAttachEvent=\"onclick:_onClkIncBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td dojoAttachPoint=\"leftDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV\" style=\"text-align:center;height:100%;\"></td\r\n\t\t><td class=\"dijitReset\" style=\"height:100%;\"\r\n\t\t\t><input dojoAttachPoint=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\r\n\t\t\t/><center role=\"presentation\" style=\"position:relative;height:100%;\" dojoAttachPoint=\"sliderBarContainer\"\r\n\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV\" dojoAttachEvent=\"onmousedown:_onRemainingBarClick\"\r\n\t\t\t\t\t><div dojoAttachPoint=\"sliderHandle\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableV\" dojoAttachEvent=\"onkeypress:_onKeyPress,onmousedown:_onHandleClick\" style=\"vertical-align:top;\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\r\n\t\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleV\"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t\t><div role=\"presentation\" dojoAttachPoint=\"progressBar,focusNode\" tabIndex=\"${tabIndex}\" class=\"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV\" dojoAttachEvent=\"onkeypress:_onKeyPress,onmousedown:_onBarClick\"\r\n\t\t\t\t\t></div\r\n\t\t\t\t\t><div dojoAttachPoint=\"sliderHandleMax,focusNodeMax\" tabIndex=\"${tabIndex}\" class=\"dijitSliderMoveable dijitSliderMoveableV\" dojoAttachEvent=\"onkeypress:_onKeyPress,onmousedown:_onHandleClickMax\" style=\"vertical-align:top;\" role=\"slider\" valuemin=\"${minimum}\" valuemax=\"${maximum}\"\r\n\t\t\t\t\t\t><div class=\"dijitSliderImageHandle dijitSliderImageHandleV\"></div\r\n\t\t\t\t\t></div\r\n\t\t\t\t></div\r\n\t\t\t></center\r\n\t\t></td\r\n\t\t><td dojoAttachPoint=\"containerNode,rightDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV\" style=\"text-align:center;height:100%;\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset\"\r\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper\" dojoAttachEvent=\"onclick:_onClkDecBumper\"></div></center\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n\t><tr class=\"dijitReset\"\r\n\t\t><td class=\"dijitReset\"></td\r\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\r\n\t\t\t><div class=\"dijitSliderDecrementIconV\" tabIndex=\"-1\" style=\"display:none\" dojoAttachPoint=\"incrementButton\" dojoAttachEvent=\"onclick: decrement\"><span class=\"dijitSliderButtonInner\">-</span></div\r\n\t\t></td\r\n\t\t><td class=\"dijitReset\"></td\r\n\t></tr\r\n></table>\r\n")});
})();
}
if(!dojo._hasResource["wm.base.widget.Editors.Slider"]){
dojo._hasResource["wm.base.widget.Editors.Slider"]=true;
dojo.provide("wm.base.widget.Editors.Slider");
dojo.declare("wm.Slider",wm.AbstractEditor,{minimum:0,maximum:100,showButtons:true,discreteValues:"",verticalSlider:false,editorBorder:false,integerValues:true,dynamicSlider:true,showToolTip:true,reflow:function(){
},setVerticalSlider:function(_2bb){
this.verticalSlider=_2bb;
if(this.editor){
this.createEditor();
}
if(this.verticalSlider){
this.editor.incrementButton.style.width="auto";
this.editor.decrementButton.style.width="auto";
}
},getEditorProps:function(_2bc,_2bd){
var v=this.dataValue;
var minV=Number(this.minimum)?Number(this.minimum):0;
if(!v||(Number(v)<minV)){
v=this.displayValue=minV;
}
return dojo.mixin(this.inherited(arguments),{dynamicSlider:this.dynamicSlider,minimum:Number(this.minimum),maximum:Number(this.maximum),showButtons:Boolean(this.showButtons),discreteValues:Number(this.discreteValues)||Infinity,value:v},_2bd||{});
},setMaximum:function(_2be){
this.maximum=(_2be==="")?100:Number(_2be);
if(this.editor){
this.editor.maximum=this.maximum;
this.editor._setValueAttr(this.dataValue,true);
}
},setMinimum:function(_2bf){
this.minimum=(_2bf==="")?0:Number(_2bf);
if(this.editor){
this.editor.minimum=this.minimum;
this.editor._setValueAttr(this.dataValue,true);
}
},_createEditor:function(_2c0,_2c1){
var div=dojo.create("div");
var _2c2;
if(this.verticalSlider){
_2c2=new dijit.form.VerticalSlider(this.getEditorProps(_2c0,_2c1));
}else{
_2c2=new dijit.form.HorizontalSlider(this.getEditorProps(_2c0,_2c1));
}
div.appendChild(_2c2.domNode);
_2c2.domNode=div;
return _2c2;
},sizeEditor:function(){
if(this._cupdating){
return;
}
this.inherited(arguments);
this.editor._setStyleAttr("height: "+this.editor.domNode.style.height+";width:"+this.editor.domNode.style.width);
},getEditorValue:function(){
var _2c3=this.inherited(arguments);
if(this.integerValues){
return Math.round(_2c3);
}else{
return _2c3;
}
},editorChanged:function(){
var _2c4=this.inherited(arguments);
if(_2c4){
if(this.showToolTip&&this.dynamicSlider&&!this._cupdating){
app.createToolTip(this.getDisplayValue(),this.domNode,null,this);
}
}
return _2c4;
}});
dojo.declare("wm.RangeSlider",wm.Slider,{init:function(){
this.inherited(arguments);
if(this.displayValue){
this.dataValue=this.displayValue.split(/,/);
}
wm.addStyleSheet("/wavemaker/lib/dojo/dojox/form/resources/RangeSlider.css");
},_createEditor:function(_2c5,_2c6){
var div=dojo.create("div");
var _2c7=new dojox.form.HorizontalRangeSlider(this.getEditorProps(_2c5,_2c6));
div.appendChild(_2c7.domNode);
_2c7.domNode=div;
return _2c7;
},getEditorValue:function(){
var _2c8=wm.AbstractEditor.prototype.getEditorValue.call(this);
if(this.integerValues){
_2c8[0]=Math.round(_2c8[0]);
_2c8[1]=Math.round(_2c8[1]);
}
return _2c8;
},getDisplayValue:function(){
var _2c9=this.getEditorValue();
return _2c9[0]+","+_2c9[1];
},getTopValue:function(){
return this.getEditorValue()[1];
},getBottomValue:function(){
return this.getEditorValue()[0];
},setDisplayValue:function(_2ca){
if(typeof _2ca=="string"){
_2ca=_2ca.split(/\s*,\s*/);
}
this.inherited(arguments,[_2ca]);
},setTopValue:function(_2cb){
this.setDataValue([this.getBottomValue(),_2cb]);
},setBottomValue:function(_2cc){
this.setDataValue([_2cc,this.getTopValue()]);
},calcIsDirty:function(_2cd,_2ce){
if(!_2cd&&_2ce||!_2ce&&_2cd){
return true;
}
return (_2cd[0]==_2ce[0]&&_2cd[1]==_2ce[1]);
},editorChanged:function(){
this.inherited(arguments);
var _2cf=this.getEditorValue();
this.valueChanged("bottomValue",_2cf[0]);
this.valueChanged("topValue",_2cf[1]);
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_editors_old",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
