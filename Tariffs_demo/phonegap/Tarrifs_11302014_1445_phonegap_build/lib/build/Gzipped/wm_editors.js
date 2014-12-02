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

dojo.provide("wm.compressed.wm_editors");
if(!dojo._hasResource["dijit._Container"]){
dojo._hasResource["dijit._Container"]=true;
dojo.provide("dijit._Container");
dojo.declare("dijit._Container",null,{isContainer:true,buildRendering:function(){
this.inherited(arguments);
if(!this.containerNode){
this.containerNode=this.domNode;
}
},addChild:function(_1,_2){
var _3=this.containerNode;
if(_2&&typeof _2=="number"){
var _4=this.getChildren();
if(_4&&_4.length>=_2){
_3=_4[_2-1].domNode;
_2="after";
}
}
dojo.place(_1.domNode,_3,_2);
if(this._started&&!_1._started){
_1.startup();
}
},removeChild:function(_5){
if(typeof _5=="number"){
_5=this.getChildren()[_5];
}
if(_5){
var _6=_5.domNode;
if(_6&&_6.parentNode){
_6.parentNode.removeChild(_6);
}
}
},hasChildren:function(){
return this.getChildren().length>0;
},destroyDescendants:function(_7){
dojo.forEach(this.getChildren(),function(_8){
_8.destroyRecursive(_7);
});
},_getSiblingOfChild:function(_9,_a){
var _b=_9.domNode,_c=(_a>0?"nextSibling":"previousSibling");
do{
_b=_b[_c];
}while(_b&&(_b.nodeType!=1||!dijit.byNode(_b)));
return _b&&dijit.byNode(_b);
},getIndexOfChild:function(_d){
return dojo.indexOf(this.getChildren(),_d);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_e){
_e.startup();
});
this.inherited(arguments);
}});
}
if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_f,_10){
return new dojo.dnd.move.constrainedMoveable(_10,_f);
},constructor:function(_11,_12){
if(!_12){
_12={};
}
this.constraints=_12.constraints;
this.within=_12.within;
},onFirstMove:function(_13){
var c=this.constraintBox=this.constraints.call(this,_13);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo._getMarginSize(_13.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_14,_15){
var c=this.constraintBox,s=_14.node.style;
this.onMoving(_14,_15);
_15.l=_15.l<c.l?c.l:c.r<_15.l?c.r:_15.l;
_15.t=_15.t<c.t?c.t:c.b<_15.t?c.b:_15.t;
s.left=_15.l+"px";
s.top=_15.t+"px";
this.onMoved(_14,_15);
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_16,_17){
return new dojo.dnd.move.boxConstrainedMoveable(_17,_16);
},constructor:function(_18,_19){
var box=_19&&_19.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_1a,_1b){
return new dojo.dnd.move.parentConstrainedMoveable(_1b,_1a);
},constructor:function(_1c,_1d){
var _1e=_1d&&_1d.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_1e=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_1e=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_1e=="padding"){
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
var _1f=this.dropDown,_20=false;
if(e&&this._opened){
var c=dojo.position(this._buttonNode,true);
if(!(e.pageX>=c.x&&e.pageX<=c.x+c.w)||!(e.pageY>=c.y&&e.pageY<=c.y+c.h)){
var t=e.target;
while(t&&!_20){
if(dojo.hasClass(t,"dijitPopup")){
_20=true;
}else{
t=t.parentNode;
}
}
if(_20){
t=e.target;
if(_1f.onItemClick){
var _21;
while(t&&!(_21=dijit.byNode(t))){
t=t.parentNode;
}
if(_21&&_21.onClick&&_21.getParent){
_21.getParent().onItemClick(_21,e);
}
}
return;
}
}
}
if(this._opened&&_1f.focus&&_1f.autoFocus!==false){
window.setTimeout(dojo.hitch(_1f,"focus"),1);
}
},_onDropDownClick:function(e){
if(this._stopClickEvents){
dojo.stopEvent(e);
}
},buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this._buttonNode||this.focusNode||this.domNode;
this._popupStateNode=this._popupStateNode||this.focusNode||this._buttonNode;
var _22={"after":this.isLeftToRight()?"Right":"Left","before":this.isLeftToRight()?"Left":"Right","above":"Up","below":"Down","left":"Left","right":"Right"}[this.dropDownPosition[0]]||this.dropDownPosition[0]||"Down";
dojo.addClass(this._arrowWrapperNode||this._buttonNode,"dijit"+_22+"ArrowButton");
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
var d=this.dropDown,_23=e.target;
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
if(!this._opened&&(e.charOrCode==dojo.keys.DOWN_ARROW||((e.charOrCode==dojo.keys.ENTER||e.charOrCode==" ")&&((_23.tagName||"").toLowerCase()!=="input"||(_23.type&&_23.type.toLowerCase()!=="text"))))){
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
var _24=dijit._curFocus&&this.dropDown&&dojo.isDescendant(dijit._curFocus,this.dropDown.domNode);
this.closeDropDown(_24);
this.inherited(arguments);
},isLoaded:function(){
return true;
},loadDropDown:function(_25){
_25();
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
var _26=this.dropDown,_27=_26.domNode,_28=this._aroundNode||this.domNode,_29=this;
if(!this._preparedNode){
this._preparedNode=true;
if(_27.style.width){
this._explicitDDWidth=true;
}
if(_27.style.height){
this._explicitDDHeight=true;
}
}
if(this.maxHeight||this.forceWidth||this.autoWidth){
var _2a={display:"",visibility:"hidden"};
if(!this._explicitDDWidth){
_2a.width="";
}
if(!this._explicitDDHeight){
_2a.height="";
}
dojo.style(_27,_2a);
var _2b=this.maxHeight;
if(_2b==-1){
var _2c=dojo.window.getBox(),_2d=dojo.position(_28,false);
_2b=Math.floor(Math.max(_2d.y,_2c.h-(_2d.y+_2d.h)));
}
if(_26.startup&&!_26._started){
_26.startup();
}
dijit.popup.moveOffScreen(_26);
var mb=dojo._getMarginSize(_27);
var _2e=(_2b&&mb.h>_2b);
dojo.style(_27,{overflowX:"hidden",overflowY:_2e?"auto":"hidden"});
if(_2e){
mb.h=_2b;
if("w" in mb){
mb.w+=16;
}
}else{
delete mb.h;
}
if(this.forceWidth){
mb.w=_28.offsetWidth;
}else{
if(this.autoWidth){
mb.w=Math.max(mb.w,_28.offsetWidth);
}else{
delete mb.w;
}
}
if(dojo.isFunction(_26.resize)){
_26.resize(mb);
}else{
dojo.marginBox(_27,mb);
}
}
var _2f=dijit.popup.open({parent:this,popup:_26,around:_28,orient:dijit.getPopupAroundAlignment((this.dropDownPosition&&this.dropDownPosition.length)?this.dropDownPosition:["below"],this.isLeftToRight()),onExecute:function(){
_29.closeDropDown(true);
},onCancel:function(){
_29.closeDropDown(true);
},onClose:function(){
dojo.attr(_29._popupStateNode,"popupActive",false);
dojo.removeClass(_29._popupStateNode,"dijitHasDropDownOpen");
_29._opened=false;
}});
dojo.attr(this._popupStateNode,"popupActive","true");
dojo.addClass(_29._popupStateNode,"dijitHasDropDownOpen");
this._opened=true;
return _2f;
},closeDropDown:function(_30){
if(this._opened){
if(_30){
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
for(var _31=this.domNode;_31.parentNode;_31=_31.parentNode){
var _32=dijit.byNode(_31);
if(_32&&typeof _32._onSubmit=="function"){
_32._onSubmit(e);
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
},_fillContent:function(_33){
if(_33&&(!this.params||!("label" in this.params))){
this.set("label",_33.innerHTML);
}
},_setShowLabelAttr:function(val){
if(this.containerNode){
dojo.toggleClass(this.containerNode,"dijitDisplayNone",!val);
}
this._set("showLabel",val);
},onClick:function(e){
return true;
},_clicked:function(e){
},setLabel:function(_34){
dojo.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.","","2.0");
this.set("label",_34);
},_setLabelAttr:function(_35){
this._set("label",_35);
this.containerNode.innerHTML=_35;
if(this.showLabel==false&&!this.params.title){
this.titleNode.title=dojo.trim(this.containerNode.innerText||this.containerNode.textContent||"");
}
},_setIconClassAttr:function(val){
var _36=this.iconClass||"dijitNoIcon",_37=val||"dijitNoIcon";
dojo.replaceClass(this.iconNode,_37,_36);
this._set("iconClass",val);
}});
dojo.declare("dijit.form.DropDownButton",[dijit.form.Button,dijit._Container,dijit._HasDropDown],{baseClass:"dijitDropDownButton",templateString:dojo.cache("dijit.form","templates/DropDownButton.html","<span class=\"dijit dijitReset dijitInline\"\r\n\t><span class='dijitReset dijitInline dijitButtonNode'\r\n\t\tdojoAttachEvent=\"ondijitclick:_onButtonClick\" dojoAttachPoint=\"_buttonNode\"\r\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\r\n\t\t\tdojoAttachPoint=\"focusNode,titleNode,_arrowWrapperNode\"\r\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\r\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\r\n\t\t\t\tdojoAttachPoint=\"iconNode\"\r\n\t\t\t></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\r\n\t\t\t\tdojoAttachPoint=\"containerNode,_popupStateNode\"\r\n\t\t\t\tid=\"${id}_label\"\r\n\t\t\t></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\r\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\r\n\t\t></span\r\n\t></span\r\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\r\n\t\tdojoAttachPoint=\"valueNode\"\r\n/></span>\r\n"),_fillContent:function(){
if(this.srcNodeRef){
var _38=dojo.query("*",this.srcNodeRef);
dijit.form.DropDownButton.superclass._fillContent.call(this,_38[0]);
this.dropDownContainer=this.srcNodeRef;
}
},startup:function(){
if(this._started){
return;
}
if(!this.dropDown&&this.dropDownContainer){
var _39=dojo.query("[widgetId]",this.dropDownContainer)[0];
this.dropDown=dijit.byNode(_39);
delete this.dropDownContainer;
}
if(this.dropDown){
dijit.popup.hide(this.dropDown);
}
this.inherited(arguments);
},isLoaded:function(){
var _3a=this.dropDown;
return (!!_3a&&(!_3a.href||_3a.isLoaded));
},loadDropDown:function(){
var _3b=this.dropDown;
if(!_3b){
return;
}
if(!this.isLoaded()){
var _3c=dojo.connect(_3b,"onLoad",this,function(){
dojo.disconnect(_3c);
this.openDropDown();
});
_3b.refresh();
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
},focus:function(_3d){
if(!this.disabled){
dijit.focus(_3d=="start"?this.titleNode:this._popupStateNode);
}
}});
dojo.declare("dijit.form.ToggleButton",dijit.form.Button,{baseClass:"dijitToggleButton",checked:false,attributeMap:dojo.mixin(dojo.clone(dijit.form.Button.prototype.attributeMap),{checked:"focusNode"}),_clicked:function(evt){
this.set("checked",!this.checked);
},_setCheckedAttr:function(_3e,_3f){
this._set("checked",_3e);
dojo.attr(this.focusNode||this.domNode,"checked",_3e);
dijit.setWaiState(this.focusNode||this.domNode,"pressed",_3e);
this._handleOnChange(_3e,_3f);
},setChecked:function(_40){
dojo.deprecated("setChecked("+_40+") is deprecated. Use set('checked',"+_40+") instead.","","2.0");
this.set("checked",_40);
},reset:function(){
this._hasBeenBlurred=false;
this.set("checked",this.params.checked||false);
}});
}
if(!dojo._hasResource["dojo.number"]){
dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.getObject("number",true,dojo);
dojo.number.format=function(_41,_42){
_42=dojo.mixin({},_42||{});
var _43=dojo.i18n.normalizeLocale(_42.locale),_44=dojo.i18n.getLocalization("dojo.cldr","number",_43);
_42.customs=_44;
var _45=_42.pattern||_44[(_42.type||"decimal")+"Format"];
if(isNaN(_41)||Math.abs(_41)==Infinity){
return null;
}
return dojo.number._applyPattern(_41,_45,_42);
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(_46,_47,_48){
_48=_48||{};
var _49=_48.customs.group,_4a=_48.customs.decimal,_4b=_47.split(";"),_4c=_4b[0];
_47=_4b[(_46<0)?1:0]||("-"+_4c);
if(_47.indexOf("%")!=-1){
_46*=100;
}else{
if(_47.indexOf("‰")!=-1){
_46*=1000;
}else{
if(_47.indexOf("¤")!=-1){
_49=_48.customs.currencyGroup||_49;
_4a=_48.customs.currencyDecimal||_4a;
_47=_47.replace(/\u00a4{1,3}/,function(_4d){
var _4e=["symbol","currency","displayName"][_4d.length-1];
return _48[_4e]||_48.currency||"";
});
}else{
if(_47.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _4f=dojo.number._numberPatternRE;
var _50=_4c.match(_4f);
if(!_50){
throw new Error("unable to find a number expression in pattern: "+_47);
}
if(_48.fractional===false){
_48.places=0;
}
return _47.replace(_4f,dojo.number._formatAbsolute(_46,_50[0],{decimal:_4a,group:_49,places:_48.places,round:_48.round}));
};
dojo.number.round=function(_51,_52,_53){
var _54=10/(_53||10);
return (_54*+_51).toFixed(_52)/_54;
};
if((0.9).toFixed()==0){
(function(){
var _55=dojo.number.round;
dojo.number.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _55(v,p,m)+(v>0?d:-d);
};
})();
}
dojo.number._formatAbsolute=function(_56,_57,_58){
_58=_58||{};
if(_58.places===true){
_58.places=0;
}
if(_58.places===Infinity){
_58.places=6;
}
var _59=_57.split("."),_5a=typeof _58.places=="string"&&_58.places.indexOf(","),_5b=_58.places;
if(_5a){
_5b=_58.places.substring(_5a+1);
}else{
if(!(_5b>=0)){
_5b=(_59[1]||[]).length;
}
}
if(!(_58.round<0)){
_56=dojo.number.round(_56,_5b,_58.round);
}
var _5c=String(Math.abs(_56)).split("."),_5d=_5c[1]||"";
if(_59[1]||_58.places){
if(_5a){
_58.places=_58.places.substring(0,_5a);
}
var pad=_58.places!==undefined?_58.places:(_59[1]&&_59[1].lastIndexOf("0")+1);
if(pad>_5d.length){
_5c[1]=dojo.string.pad(_5d,pad,"0",true);
}
if(_5b<_5d.length){
_5c[1]=_5d.substr(0,_5b);
}
}else{
if(_5c[1]){
_5c.pop();
}
}
var _5e=_59[0].replace(",","");
pad=_5e.indexOf("0");
if(pad!=-1){
pad=_5e.length-pad;
if(pad>_5c[0].length){
_5c[0]=dojo.string.pad(_5c[0],pad);
}
if(_5e.indexOf("#")==-1){
_5c[0]=_5c[0].substr(_5c[0].length-pad);
}
}
var _5f=_59[0].lastIndexOf(","),_60,_61;
if(_5f!=-1){
_60=_59[0].length-_5f-1;
var _62=_59[0].substr(0,_5f);
_5f=_62.lastIndexOf(",");
if(_5f!=-1){
_61=_62.length-_5f-1;
}
}
var _63=[];
for(var _64=_5c[0];_64;){
var off=_64.length-_60;
_63.push((off>0)?_64.substr(off):_64);
_64=(off>0)?_64.slice(0,off):"";
if(_61){
_60=_61;
delete _61;
}
}
_5c[0]=_63.reverse().join(_58.group||",");
return _5c.join(_58.decimal||".");
};
dojo.number.regexp=function(_65){
return dojo.number._parseInfo(_65).regexp;
};
dojo.number._parseInfo=function(_66){
_66=_66||{};
var _67=dojo.i18n.normalizeLocale(_66.locale),_68=dojo.i18n.getLocalization("dojo.cldr","number",_67),_69=_66.pattern||_68[(_66.type||"decimal")+"Format"],_6a=_68.group,_6b=_68.decimal,_6c=1;
if(_69.indexOf("%")!=-1){
_6c/=100;
}else{
if(_69.indexOf("‰")!=-1){
_6c/=1000;
}else{
var _6d=_69.indexOf("¤")!=-1;
if(_6d){
_6a=_68.currencyGroup||_6a;
_6b=_68.currencyDecimal||_6b;
}
}
}
var _6e=_69.split(";");
if(_6e.length==1){
_6e.push("-"+_6e[0]);
}
var re=dojo.regexp.buildGroupRE(_6e,function(_6f){
_6f="(?:"+dojo.regexp.escapeString(_6f,".")+")";
return _6f.replace(dojo.number._numberPatternRE,function(_70){
var _71={signed:false,separator:_66.strict?_6a:[_6a,""],fractional:_66.fractional,decimal:_6b,exponent:false},_72=_70.split("."),_73=_66.places;
if(_72.length==1&&_6c!=1){
_72[1]="###";
}
if(_72.length==1||_73===0){
_71.fractional=false;
}else{
if(_73===undefined){
_73=_66.pattern?_72[1].lastIndexOf("0")+1:Infinity;
}
if(_73&&_66.fractional==undefined){
_71.fractional=true;
}
if(!_66.places&&(_73<_72[1].length)){
_73+=","+_72[1].length;
}
_71.places=_73;
}
var _74=_72[0].split(",");
if(_74.length>1){
_71.groupSize=_74.pop().length;
if(_74.length>1){
_71.groupSize2=_74.pop().length;
}
}
return "("+dojo.number._realNumberRegexp(_71)+")";
});
},true);
if(_6d){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_75,_76,_77,_78){
var _79=["symbol","currency","displayName"][_77.length-1],_7a=dojo.regexp.escapeString(_66[_79]||_66.currency||"");
_76=_76?"[\\s\\xa0]":"";
_78=_78?"[\\s\\xa0]":"";
if(!_66.strict){
if(_76){
_76+="*";
}
if(_78){
_78+="*";
}
return "(?:"+_76+_7a+_78+")?";
}
return _76+_7a+_78;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_6a,decimal:_6b,factor:_6c};
};
dojo.number.parse=function(_7b,_7c){
var _7d=dojo.number._parseInfo(_7c),_7e=(new RegExp("^"+_7d.regexp+"$")).exec(_7b);
if(!_7e){
return NaN;
}
var _7f=_7e[1];
if(!_7e[1]){
if(!_7e[2]){
return NaN;
}
_7f=_7e[2];
_7d.factor*=-1;
}
_7f=_7f.replace(new RegExp("["+_7d.group+"\\s\\xa0"+"]","g"),"").replace(_7d.decimal,".");
return _7f*_7d.factor;
};
dojo.number._realNumberRegexp=function(_80){
_80=_80||{};
if(!("places" in _80)){
_80.places=Infinity;
}
if(typeof _80.decimal!="string"){
_80.decimal=".";
}
if(!("fractional" in _80)||/^0/.test(_80.places)){
_80.fractional=[true,false];
}
if(!("exponent" in _80)){
_80.exponent=[true,false];
}
if(!("eSigned" in _80)){
_80.eSigned=[true,false];
}
var _81=dojo.number._integerRegexp(_80),_82=dojo.regexp.buildGroupRE(_80.fractional,function(q){
var re="";
if(q&&(_80.places!==0)){
re="\\"+_80.decimal;
if(_80.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_80.places+"}";
}
}
return re;
},true);
var _83=dojo.regexp.buildGroupRE(_80.exponent,function(q){
if(q){
return "([eE]"+dojo.number._integerRegexp({signed:_80.eSigned})+")";
}
return "";
});
var _84=_81+_82;
if(_82){
_84="(?:(?:"+_84+")|(?:"+_82+"))";
}
return _84+_83;
};
dojo.number._integerRegexp=function(_85){
_85=_85||{};
if(!("signed" in _85)){
_85.signed=[true,false];
}
if(!("separator" in _85)){
_85.separator="";
}else{
if(!("groupSize" in _85)){
_85.groupSize=3;
}
}
var _86=dojo.regexp.buildGroupRE(_85.signed,function(q){
return q?"[-+]":"";
},true);
var _87=dojo.regexp.buildGroupRE(_85.separator,function(sep){
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
var grp=_85.groupSize,_88=_85.groupSize2;
if(_88){
var _89="(?:0|[1-9]\\d{0,"+(_88-1)+"}(?:["+sep+"]\\d{"+_88+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-_88)>0)?"(?:"+_89+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_89;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _86+_87;
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
var _8a=dojo.position(this.sliderBarContainer,true);
var _8b=e[this._mousePixelCoord]-_8a[this._startingPixelCoord];
this._setPixelValue(this._isReversed()?(_8a[this._pixelCount]-_8b):_8b,_8a[this._pixelCount],true);
this._movable.onMouseDown(e);
},_setPixelValue:function(_8c,_8d,_8e){
if(this.dynamicSlider){
var now=new Date().getTime();
if(!this._dynamicSliderTimestamp||this._dynamicSliderTimestamp+100<now){
_8e=true;
this._dynamicSliderTimestamp=now;
if(this.domNode&&this.domNode.id){
wm.cancelJob(this.domNode.id+"._setPixelValue");
}
}else{
if(this.domNode&&this.domNode.id){
var _8f=this;
wm.job(this.domNode.id+"._setPixelValue",60,function(){
_8f._setValueAttr((this.maximum-this.minimum)*_90/_91+this.minimum,true);
});
}
}
}
if(this.disabled||this.readOnly){
return;
}
_8c=_8c<0?0:_8d<_8c?_8d:_8c;
var _91=this.discreteValues;
if(_91<=1||_91==Infinity){
_91=_8d;
}
_91--;
var _92=_8d/_91;
var _90=Math.round(_8c/_92);
this._setValueAttr((this.maximum-this.minimum)*_90/_91+this.minimum,_8e);
},_setValueAttr:function(_93,_94){
this._set("value",_93);
this.valueNode.value=_93;
dijit.setWaiState(this.focusNode,"valuenow",_93);
this.inherited(arguments);
var _95=(_93-this.minimum)/(this.maximum-this.minimum);
var _96=(this._descending===false)?this.remainingBar:this.progressBar;
var _97=(this._descending===false)?this.progressBar:this.remainingBar;
if(this._inProgressAnim&&this._inProgressAnim.status!="stopped"){
this._inProgressAnim.stop(true);
}
if(_94&&this.slideDuration>0&&_96.style[this._progressPixelSize]){
var _98=this;
var _99={};
var _9a=parseFloat(_96.style[this._progressPixelSize]);
var _9b=this.slideDuration*(_95-_9a/100);
if(_9b==0){
return;
}
if(_9b<0){
_9b=0-_9b;
}
_99[this._progressPixelSize]={start:_9a,end:_95*100,units:"%"};
this._inProgressAnim=dojo.animateProperty({node:_96,duration:_9b,onAnimate:function(v){
_97.style[_98._progressPixelSize]=(100-parseFloat(v[_98._progressPixelSize]))+"%";
},onEnd:function(){
delete _98._inProgressAnim;
},properties:_99});
this._inProgressAnim.play();
}else{
_96.style[this._progressPixelSize]=(_95*100)+"%";
_97.style[this._progressPixelSize]=((1-_95)*100)+"%";
}
},_bumpValue:function(_9c,_9d){
if(this.disabled||this.readOnly){
return;
}
var s=dojo.getComputedStyle(this.sliderBarContainer);
var c=dojo._getContentBox(this.sliderBarContainer,s);
var _9e=this.discreteValues;
if(_9e<=1||_9e==Infinity){
_9e=c[this._pixelCount];
}
_9e--;
var _9f=(this.value-this.minimum)*_9e/(this.maximum-this.minimum)+_9c;
if(_9f<0){
_9f=0;
}
if(_9f>_9e){
_9f=_9e;
}
_9f=_9f*(this.maximum-this.minimum)/_9e+this.minimum;
this._setValueAttr(_9f,_9d);
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
var _a0=!dojo.isMozilla;
var _a1=evt[(_a0?"wheelDelta":"detail")]*(_a0?1:-1);
this._bumpValue(_a1<0?-1:1,true);
},startup:function(){
if(this._started){
return;
}
dojo.forEach(this.getChildren(),function(_a2){
if(this[_a2.container]!=this.containerNode){
this[_a2.container].appendChild(_a2.domNode);
}
},this);
this.inherited(arguments);
},_typematicCallback:function(_a3,_a4,e){
if(_a3==-1){
this._setValueAttr(this.value,true);
}else{
this[(_a4==(this._descending?this.incrementButton:this.decrementButton))?"decrement":"increment"](e);
}
},buildRendering:function(){
this.inherited(arguments);
if(this.showButtons){
this.incrementButton.style.display="";
this.decrementButton.style.display="";
}
var _a5=dojo.query("label[for=\""+this.id+"\"]");
if(_a5.length){
_a5[0].id=(this.id+"_label");
dijit.setWaiState(this.focusNode,"labelledby",_a5[0].id);
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
var _a6=dojo.declare(dijit.form._SliderMover,{widget:this});
this._movable=new dojo.dnd.Moveable(this.sliderHandle,{mover:_a6});
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
var _a7=this.widget;
var _a8=_a7._abspos;
if(!_a8){
_a8=_a7._abspos=dojo.position(_a7.sliderBarContainer,true);
_a7._setPixelValue_=dojo.hitch(_a7,"_setPixelValue");
_a7._isReversed_=_a7._isReversed();
}
var _a9=e.touches?e.touches[0]:e,_aa=_a9[_a7._mousePixelCoord]-_a8[_a7._startingPixelCoord];
_a7._setPixelValue_(_a7._isReversed_?(_a8[_a7._pixelCount]-_aa):_aa,_a8[_a7._pixelCount],false);
},onMouseUp:function(e){
this.inherited(arguments);
this.destroy();
},destroy:function(e){
dojo.dnd.Mover.prototype.destroy.apply(this,arguments);
var _ab=this.widget;
_ab._abspos=null;
_ab._setValueAttr(_ab.value,true);
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
dojo.declare("dijit.form._Spinner",dijit.form.RangeBoundTextBox,{defaultTimeout:500,minimumTimeout:10,timeoutChangeRate:0.9,smallDelta:1,largeDelta:10,templateString:dojo.cache("dijit.form","templates/Spinner.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\r\n\tid=\"widget_${id}\" role=\"presentation\"\r\n\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\r\n\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t/><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\"\r\n\t\t\tdojoAttachPoint=\"upArrowNode\"\r\n\t\t\t><div class=\"dijitArrowButtonInner\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t></div\r\n\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\"\r\n\t\t\tdojoAttachPoint=\"downArrowNode\"\r\n\t\t\t><div class=\"dijitArrowButtonInner\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t\t\t${_buttonInputDisabled}\r\n\t\t\t/></div\r\n\t\t></div\r\n\t></div\r\n\t><div class='dijitReset dijitValidationContainer'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t/></div\r\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class='dijitReset dijitInputInner' dojoAttachPoint=\"textbox,focusNode\" type=\"${type}\" dojoAttachEvent=\"onkeypress:_onKeyPress\"\r\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\r\n\t/></div\r\n></div>\r\n"),baseClass:"dijitTextBox dijitSpinner",cssStateNodes:{"upArrowNode":"dijitUpArrowButton","downArrowNode":"dijitDownArrowButton"},adjust:function(val,_ac){
return val;
},_arrowPressed:function(_ad,_ae,_af){
if(this.disabled||this.readOnly){
return;
}
this._setValueAttr(this.adjust(this.get("value"),_ae*_af),false);
dijit.selectInputText(this.textbox,this.textbox.value.length);
},_arrowReleased:function(_b0){
this._wheelTimer=null;
if(this.disabled||this.readOnly){
return;
}
},_typematicCallback:function(_b1,_b2,evt){
var inc=this.smallDelta;
if(_b2==this.textbox){
var k=dojo.keys;
var key=evt.charOrCode;
inc=(key==k.PAGE_UP||key==k.PAGE_DOWN)?this.largeDelta:this.smallDelta;
_b2=(key==k.UP_ARROW||key==k.PAGE_UP)?this.upArrowNode:this.downArrowNode;
}
if(_b1==-1){
this._arrowReleased(_b2);
}else{
this._arrowPressed(_b2,(_b2==this.upArrowNode)?1:-1,inc);
}
},_wheelTimer:null,_mouseWheeled:function(evt){
dojo.stopEvent(evt);
var _b3=evt.detail?(evt.detail*-1):(evt.wheelDelta/120);
if(_b3!==0){
var _b4=this[(_b3>0?"upArrowNode":"downArrowNode")];
this._arrowPressed(_b4,_b3,this.smallDelta);
if(!this._wheelTimer){
clearTimeout(this._wheelTimer);
}
this._wheelTimer=setTimeout(dojo.hitch(this,"_arrowReleased",_b4),50);
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
dojo.declare("dijit.form.NumberTextBoxMixin",null,{regExpGen:dojo.number.regexp,value:NaN,editOptions:{pattern:"#.######"},_formatter:dojo.number.format,_setConstraintsAttr:function(_b5){
var _b6=typeof _b5.places=="number"?_b5.places:0;
if(_b6){
_b6++;
}
if(typeof _b5.max!="number"){
_b5.max=9*Math.pow(10,15-_b6);
}
if(typeof _b5.min!="number"){
_b5.min=-9*Math.pow(10,15-_b6);
}
this.inherited(arguments,[_b5]);
if(this.focusNode&&this.focusNode.value&&!isNaN(this.value)){
this.set("value",this.value);
}
},_onFocus:function(){
if(this.disabled){
return;
}
var val=this.get("value");
if(typeof val=="number"&&!isNaN(val)){
var _b7=this.format(val,this.constraints);
if(_b7!==undefined){
this.textbox.value=_b7;
}
}
this.inherited(arguments);
},format:function(_b8,_b9){
var _ba=String(_b8);
if(typeof _b8!="number"){
return _ba;
}
if(isNaN(_b8)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_b8,_b9))&&_b9.exponent!==false&&/\de[-+]?\d/i.test(_ba)){
return _ba;
}
if(this.editOptions&&this._focused){
_b9=dojo.mixin({},_b9,this.editOptions);
}
return this._formatter(_b8,_b9);
},_parser:dojo.number.parse,parse:function(_bb,_bc){
var v=this._parser(_bb,dojo.mixin({},_bc,(this.editOptions&&this._focused)?this.editOptions:{}));
if(this.editOptions&&this._focused&&isNaN(v)){
v=this._parser(_bb,_bc);
}
return v;
},_getDisplayedValueAttr:function(){
var v=this.inherited(arguments);
return isNaN(v)?this.textbox.value:v;
},filter:function(_bd){
return (_bd===null||_bd===""||_bd===undefined)?NaN:this.inherited(arguments);
},serialize:function(_be,_bf){
return (typeof _be!="number"||isNaN(_be))?"":this.inherited(arguments);
},_setBlurValue:function(){
var val=dojo.hitch(dojo.mixin({},this,{_focused:true}),"get")("value");
this._setValueAttr(val,true);
},_setValueAttr:function(_c0,_c1,_c2){
if(_c0!==undefined&&_c2===undefined){
_c2=String(_c0);
if(typeof _c0=="number"){
if(isNaN(_c0)){
_c2="";
}else{
if(("rangeCheck" in this&&this.rangeCheck(_c0,this.constraints))||this.constraints.exponent===false||!/\de[-+]?\d/i.test(_c2)){
_c2=undefined;
}
}
}else{
if(!_c0){
_c2="";
_c0=NaN;
}else{
_c0=undefined;
}
}
}
this.inherited(arguments,[_c0,_c1,_c2]);
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
},isValid:function(_c3){
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
dojo.declare("dijit.form.NumberSpinner",[dijit.form._Spinner,dijit.form.NumberTextBoxMixin],{adjust:function(val,_c4){
var tc=this.constraints,v=isNaN(val),_c5=!isNaN(tc.max),_c6=!isNaN(tc.min);
if(v&&_c4!=0){
val=(_c4>0)?_c6?tc.min:_c5?tc.max:0:_c5?this.constraints.max:_c6?tc.min:0;
}
var _c7=val+_c4;
if(v||isNaN(_c7)){
return val;
}
if(_c5&&(_c7>tc.max)){
_c7=tc.max;
}
if(_c6&&(_c7<tc.min)){
_c7=tc.min;
}
return _c7;
},_onKeyPress:function(e){
if((e.charOrCode==dojo.keys.HOME||e.charOrCode==dojo.keys.END)&&!(e.ctrlKey||e.altKey||e.metaKey)&&typeof this.get("value")!="undefined"){
var _c8=this.constraints[(e.charOrCode==dojo.keys.HOME?"min":"max")];
if(typeof _c8=="number"){
this._setValueAttr(_c8,false);
}
dojo.stopEvent(e);
}
}});
}
if(!dojo._hasResource["dojo.cldr.monetary"]){
dojo._hasResource["dojo.cldr.monetary"]=true;
dojo.provide("dojo.cldr.monetary");
dojo.getObject("cldr.monetary",true,dojo);
dojo.cldr.monetary.getData=function(_c9){
var _ca={ADP:0,AFN:0,ALL:0,AMD:0,BHD:3,BIF:0,BYR:0,CLF:0,CLP:0,COP:0,CRC:0,DJF:0,ESP:0,GNF:0,GYD:0,HUF:0,IDR:0,IQD:0,IRR:3,ISK:0,ITL:0,JOD:3,JPY:0,KMF:0,KPW:0,KRW:0,KWD:3,LAK:0,LBP:0,LUF:0,LYD:3,MGA:0,MGF:0,MMK:0,MNT:0,MRO:0,MUR:0,OMR:3,PKR:0,PYG:0,RSD:0,RWF:0,SLL:0,SOS:0,STD:0,SYP:0,TMM:0,TND:3,TRL:0,TZS:0,UGX:0,UZS:0,VND:0,VUV:0,XAF:0,XOF:0,XPF:0,YER:0,ZMK:0,ZWD:0};
var _cb={CHF:5};
var _cc=_ca[_c9],_cd=_cb[_c9];
if(typeof _cc=="undefined"){
_cc=2;
}
if(typeof _cd=="undefined"){
_cd=0;
}
return {places:_cc,round:_cd};
};
}
if(!dojo._hasResource["dojo.currency"]){
dojo._hasResource["dojo.currency"]=true;
dojo.provide("dojo.currency");
dojo.getObject("currency",true,dojo);
dojo.currency._mixInDefaults=function(_ce){
_ce=_ce||{};
_ce.type="currency";
var _cf=dojo.i18n.getLocalization("dojo.cldr","currency",_ce.locale)||{};
var iso=_ce.currency;
var _d0=dojo.cldr.monetary.getData(iso);
dojo.forEach(["displayName","symbol","group","decimal"],function(_d1){
_d0[_d1]=_cf[iso+"_"+_d1];
});
_d0.fractional=[true,false];
return dojo.mixin(_d0,_ce);
};
dojo.currency.format=function(_d2,_d3){
return dojo.number.format(_d2,dojo.currency._mixInDefaults(_d3));
};
dojo.currency.regexp=function(_d4){
return dojo.number.regexp(dojo.currency._mixInDefaults(_d4));
};
dojo.currency.parse=function(_d5,_d6){
return dojo.number.parse(_d5,dojo.currency._mixInDefaults(_d6));
};
}
if(!dojo._hasResource["dijit.form.CurrencyTextBox"]){
dojo._hasResource["dijit.form.CurrencyTextBox"]=true;
dojo.provide("dijit.form.CurrencyTextBox");
dojo.declare("dijit.form.CurrencyTextBox",dijit.form.NumberTextBox,{currency:"",baseClass:"dijitTextBox dijitCurrencyTextBox",regExpGen:function(_d7){
return "("+(this._focused?this.inherited(arguments,[dojo.mixin({},_d7,this.editOptions)])+"|":"")+dojo.currency.regexp(_d7)+")";
},_formatter:dojo.currency.format,_parser:dojo.currency.parse,parse:function(_d8,_d9){
var v=this.inherited(arguments);
if(isNaN(v)&&/\d+/.test(_d8)){
v=dojo.hitch(dojo.mixin({},this,{_parser:dijit.form.NumberTextBox.prototype._parser}),"inherited")(arguments);
}
return v;
},_setConstraintsAttr:function(_da){
if(!_da.currency&&this.currency){
_da.currency=this.currency;
}
this.inherited(arguments,[dojo.currency._mixInDefaults(dojo.mixin(_da,{exponent:false}))]);
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.Number"]){
dojo._hasResource["wm.base.widget.Editors.Number"]=true;
dojo.provide("wm.base.widget.Editors.Number");
dijit.form.NumberTextBox.extend({format:function(_db,_dc){
var _dd=String(_db);
if(typeof _db!="number"){
return _dd;
}
if(isNaN(_db)){
return "";
}
if(!("rangeCheck" in this&&this.rangeCheck(_db,_dc))&&_dc.exponent!==false&&/de[-+]?d/i.test(_dd)){
return _dd;
}
_dc=dojo.mixin({},_dc,this.editOptions);
if(!this._focused){
delete _dc.pattern;
}
return this._formatter(_db,_dc);
},_refreshState:function(){
var _de=this.get("displayedValue");
var _df=_de.indexOf(".");
if(this.editOptions.places&&this.editOptions.placeWhileTyping&&_df!=-1){
var _e0=_de.substr(0,_df)+"."+_de.substr(_df+1,this.editOptions.places);
if(_e0!=_de){
this.focusNode.value=_e0;
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
var _e1={};
if(!isNaN(parseInt(this.minimum))){
_e1.min=Number(this.minimum);
}
if(!isNaN(parseInt(this.maximum))){
_e1.max=Number(this.maximum);
}
return _e1;
},getEditorProps:function(_e2,_e3){
var v=this.displayValue;
var _e4=this.getEditorConstraints();
var p=dojo.mixin(this.inherited(arguments),{constraints:_e4,rangeMessage:this.rangeMessage,required:this.required,value:v?Number(v):"",editOptions:dojo.clone(dijit.form.NumberTextBox.prototype.editOptions)},_e3||{});
if(this.noFormatting){
p._formatter=function(_e5){
return _e5;
};
}
var _e6=this._getPlaces();
if(_e6!==""){
p.editOptions.places=_e6;
p.editOptions.placeWhileTyping=this.applyPlacesWhileTyping;
}
return p;
},_getPlaces:function(){
if(this.places===""){
return this.places;
}else{
return Number(this.places);
}
},_createEditor:function(_e7,_e8){
var e;
if(this.spinnerButtons&&!wm.isMobile){
e=new dijit.form.NumberSpinner(this.getEditorProps(_e7,_e8));
}else{
e=new dijit.form.NumberTextBox(this.getEditorProps(_e7,_e8));
}
return e;
},setMaximum:function(_e9){
var v=(_e9==="")?"":Number(_e9);
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
},setMinimum:function(_ea){
var v=(_ea==="")?"":Number(_ea);
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
var _eb={};
if(this.places&&this.places!=""){
_eb.places=parseInt(this.places);
}
return _eb;
},setSpinnerButtons:function(_ec){
if(this.spinnerButtons!=_ec){
this.spinnerButtons=_ec;
this.createEditor();
}
},calcIsDirty:function(a,b){
if(a===0&&b===""||a===""&&b===0){
return false;
}
return a!==b;
}});
dojo.declare("wm.Currency",wm.Number,{currency:"",getEditorProps:function(_ed,_ee){
var _ef=this.inherited(arguments);
if(_ef.constraints){
delete _ef.constraints.pattern;
}
return dojo.mixin(_ef,{currency:this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD"},_ee||{});
},_createEditor:function(_f0,_f1){
return new dijit.form.CurrencyTextBox(this.getEditorProps(_f0,_f1));
},_getReadonlyValue:function(){
return dojo.currency.format(this.dataValue,{currency:this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD",places:parseInt(this.places)});
},setEditorValue:function(_f2){
var v=_f2;
if(this.editor){
v=dojo.currency.parse(dojo.currency.format(String(v).replace(/[^0-9\-\.]/g,""),this.editor.constraints),this.editor.constraints);
}
wm.AbstractEditor.prototype.setEditorValue.call(this,v);
},getDataValue:function(){
return this.dataValue;
},editorChanged:function(){
var _f3=this.dataValue;
this.dataValue=this.getEditorValue();
var _f4=this.displayValue;
this.displayValue=this._getReadonlyValue();
var _f5=false;
if(_f3!=this._lastValue){
this.valueChanged("dataValue",this.dataValue);
_f5=true;
}
if(_f4!=this.displayValue){
this.valueChanged("displayValue",this.displayValue);
_f5=true;
}
if(_f5){
if(this._inPostInit){
this._lastValue=this.dataValue;
}
this.updateIsDirty();
}
return _f5;
},setCurrency:function(_f6){
this.currency=_f6;
this.createEditor();
}});
}
if(!dojo._hasResource["dijit.form.DropDownButton"]){
dojo._hasResource["dijit.form.DropDownButton"]=true;
dojo.provide("dijit.form.DropDownButton");
}
if(!dojo._hasResource["dijit.Calendar"]){
dojo._hasResource["dijit.Calendar"]=true;
dojo.provide("dijit.Calendar");
dojo.declare("dijit.Calendar",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{templateString:dojo.cache("dijit","templates/Calendar.html","<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" dojoAttachEvent=\"onkeypress: _onKeyPress\" aria-labelledby=\"${id}_year\">\r\n\t<thead>\r\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\r\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"decrementMonth\">\r\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"/>\r\n\t\t\t\t<span dojoAttachPoint=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\r\n\t\t\t</th>\r\n\t\t\t<!-- Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \r\n\t\t\t      WaveMaker: Moved year into header for cleaner mobile UI -->\r\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"decrementYear\">\r\n\t\t\t  <span dojoAttachPoint=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\"></span>\r\n\t\t\t</th>\r\n\r\n\t\t\t<th class='dijitReset' colspan=\"3\">\r\n\t\t\t\t<div dojoType=\"dijit.form.DropDownButton\" dojoAttachPoint=\"monthDropDownButton\"\r\n\t\t\t\t\tid=\"${id}_mddb\" tabIndex=\"-1\">\r\n\t\t\t\t</div>\r\n\t\t\t</th>\r\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"incrementYear\">\r\n\t\t\t  <span dojoAttachPoint=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\"></span>\r\n\t\t\t</th>\r\n\r\n\t\t\t<th class='dijitReset dijitCalendarArrow' dojoAttachPoint=\"incrementMonth\">\r\n\t\t\t\t<img src=\"${_blankGif}\" alt=\"\" class=\"dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"/>\r\n\t\t\t\t<span dojoAttachPoint=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\"><span class=\"dijitCalendarDayLabel\"></span></th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody dojoAttachEvent=\"onclick: _onDayClick, onmouseover: _onDayMouseOver, onmouseout: _onDayMouseOut, onmousedown: _onDayMouseDown, onmouseup: _onDayMouseUp\" class=\"dijitReset dijitCalendarBodyContainer\">\r\n\t\t<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">\r\n\t\t\t<td class=\"dijitReset dijitCalendarDateTemplate\" role=\"gridcell\"><span class=\"dijitCalendarDateLabel\"></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<!-- Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0 \r\n\tWaveMaker: Moved year into header for cleaner mobile UI -->\r\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\" style='display:none'>\r\n\t\t<tr>\r\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\">\r\n\t\t\t\t<h3 class=\"dijitCalendarYearLabel\">\r\n\t\t\t\t<span dojoAttachPoint=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" id=\"${id}_year\"></span>\r\n\t\t\t\t</h3>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tfoot>\r\n</table>\r\n"),widgetsInTemplate:true,value:new Date(""),datePackage:"dojo.date",dayWidth:"narrow",tabIndex:"0",currentFocus:new Date(),baseClass:"dijitCalendar",cssStateNodes:{"decrementMonth":"dijitCalendarArrow","incrementMonth":"dijitCalendarArrow","previousYearLabelNode":"dijitCalendarPreviousYear","nextYearLabelNode":"dijitCalendarNextYear"},_isValidDate:function(_f7){
return _f7&&!isNaN(_f7)&&typeof _f7=="object"&&_f7.toString()!=this.constructor.prototype.value.toString();
},setValue:function(_f8){
dojo.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_f8);
},_getValueAttr:function(){
var _f9=new this.dateClassObj(this.value);
_f9.setHours(0,0,0,0);
if(_f9.getDate()<this.value.getDate()){
_f9=this.dateFuncObj.add(_f9,"hour",1);
}
return _f9;
},_setValueAttr:function(_fa,_fb){
if(_fa){
_fa=new this.dateClassObj(_fa);
}
if(this._isValidDate(_fa)){
if(!this._isValidDate(this.value)||this.dateFuncObj.compare(_fa,this.value)){
_fa.setHours(1,0,0,0);
if(!this.isDisabledDate(_fa,this.lang)){
this._set("value",_fa);
var _fc=dojo.query("[dijitDateValue="+_fa.valueOf()+"]",this.domNode);
if(_fc.length){
dojo.addClass(_fc[0],"dijitCalendarSelectedDate");
}
this.set("currentFocus",_fa);
if(_fb||typeof _fb=="undefined"){
this.onChange(this.get("value"));
this.onValueSelected(this.get("value"));
}
}
}
}else{
this._set("value",null);
this.set("currentFocus",this.currentFocus);
}
},_setText:function(_fd,_fe){
while(_fd.firstChild){
_fd.removeChild(_fd.firstChild);
}
_fd.appendChild(dojo.doc.createTextNode(_fe));
},_populateGrid:function(){
var _ff=new this.dateClassObj(this.currentFocus);
_ff.setDate(1);
var _100=_ff.getDay(),_101=this.dateFuncObj.getDaysInMonth(_ff),_102=this.dateFuncObj.getDaysInMonth(this.dateFuncObj.add(_ff,"month",-1)),_103=new this.dateClassObj(),_104=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
if(_104>_100){
_104-=7;
}
dojo.query(".dijitCalendarDateTemplate",this.domNode).forEach(function(_105,i){
i+=_104;
var date=new this.dateClassObj(_ff),_106,_107="dijitCalendar",adj=0;
if(i<_100){
_106=_102-_100+i+1;
adj=-1;
_107+="Previous";
}else{
if(i>=(_100+_101)){
_106=i-_100-_101+1;
adj=1;
_107+="Next";
}else{
_106=i-_100+1;
_107+="Current";
}
}
if(adj){
date=this.dateFuncObj.add(date,"month",adj);
}
date.setDate(_106);
if(!this.dateFuncObj.compare(date,_103,"date")){
_107="dijitCalendarCurrentDate "+_107;
}
if(this._isSelectedDate(date,this.lang)){
_107="dijitCalendarSelectedDate "+_107;
}
if(this.isDisabledDate(date,this.lang)){
_107="dijitCalendarDisabledDate "+_107;
}
var _108=this.getClassForDate(date,this.lang);
if(_108){
_107=_108+" "+_107;
}
_105.className=_107+"Month dijitCalendarDateTemplate";
_105.dijitDateValue=date.valueOf();
dojo.attr(_105,"dijitDateValue",date.valueOf());
var _109=dojo.query(".dijitCalendarDateLabel",_105)[0],text=date.getDateLocalized?date.getDateLocalized(this.lang):date.getDate();
this._setText(_109,text);
},this);
var _10a=this.dateLocaleModule.getNames("months","wide","standAlone",this.lang,_ff);
this.monthDropDownButton.dropDown.set("months",_10a);
var _10b=this.dateLocaleModule.getNames("months","abbr","standAlone",this.lang,_ff);
this.monthDropDownButton.containerNode.innerHTML=(dojo.isIE==6?"":"<div class='dijitSpacer'>"+this.monthDropDownButton.dropDown.domNode.innerHTML+"</div>")+"<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>"+_10b[_ff.getMonth()]+" "+_ff.getFullYear()+"</div>";
var y=_ff.getFullYear()-1;
var d=new this.dateClassObj();
dojo.forEach(["previous","current","next"],function(name){
d.setFullYear(y++);
this._setText(this[name+"YearLabelNode"],this.dateLocaleModule.format(d,{selector:"year",locale:this.lang}));
},this);
},goToToday:function(){
this.set("value",new this.dateClassObj());
},constructor:function(args){
var _10c=(args.datePackage&&(args.datePackage!="dojo.date"))?args.datePackage+".Date":"Date";
this.dateClassObj=dojo.getObject(_10c,false);
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
var _10d=dojo.hitch(this,function(_10e,n){
var _10f=dojo.query(_10e,this.domNode)[0];
for(var i=0;i<n;i++){
_10f.parentNode.appendChild(_10f.cloneNode(true));
}
});
_10d(".dijitCalendarDayLabelTemplate",6);
_10d(".dijitCalendarDateTemplate",6);
_10d(".dijitCalendarWeekTemplate",5);
var _110=this.dateLocaleModule.getNames("days",this.dayWidth,"standAlone",this.lang);
var _111=dojo.cldr.supplemental.getFirstDayOfWeek(this.lang);
dojo.query(".dijitCalendarDayLabel",this.domNode).forEach(function(_112,i){
this._setText(_112,_110[(i+_111)%7]);
},this);
var _113=new this.dateClassObj(this.currentFocus);
this.monthDropDownButton.dropDown=new dijit.Calendar._MonthDropDown({id:this.id+"_mdd",onChange:dojo.hitch(this,"_onMonthSelect")});
this.set("currentFocus",_113,false);
var _114=this;
var _115=function(_116,_117,adj){
_114._connects.push(dijit.typematic.addMouseListener(_114[_116],_114,function(_118){
if(_118>=0){
_114._adjustDisplay(_117,adj);
}
},0.8,500));
};
_115("incrementMonth","month",1);
_115("decrementMonth","month",-1);
_115("nextYearLabelNode","year",1);
_115("previousYearLabelNode","year",-1);
},_adjustDisplay:function(part,_119){
this._setCurrentFocusAttr(this.dateFuncObj.add(this.currentFocus,part,_119));
},_setCurrentFocusAttr:function(date,_11a){
var _11b=this.currentFocus,_11c=_11b?dojo.query("[dijitDateValue="+_11b.valueOf()+"]",this.domNode)[0]:null;
date=new this.dateClassObj(date);
date.setHours(1,0,0,0);
this._set("currentFocus",date);
this._populateGrid();
var _11d=dojo.query("[dijitDateValue="+date.valueOf()+"]",this.domNode)[0];
_11d.setAttribute("tabIndex",this.tabIndex);
if(this._focused||_11a){
_11d.focus();
}
if(_11c&&_11c!=_11d){
if(dojo.isWebKit){
_11c.setAttribute("tabIndex","-1");
}else{
_11c.removeAttribute("tabIndex");
}
}
},focus:function(){
this._setCurrentFocusAttr(this.currentFocus,true);
},_onMonthSelect:function(_11e){
this.currentFocus=this.dateFuncObj.add(this.currentFocus,"month",_11e-this.currentFocus.getMonth());
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
var dk=dojo.keys,_11f=-1,_120,_121=this.currentFocus;
switch(evt.keyCode){
case dk.RIGHT_ARROW:
_11f=1;
case dk.LEFT_ARROW:
_120="day";
if(!this.isLeftToRight()){
_11f*=-1;
}
break;
case dk.DOWN_ARROW:
_11f=1;
case dk.UP_ARROW:
_120="week";
break;
case dk.PAGE_DOWN:
_11f=1;
case dk.PAGE_UP:
_120=evt.ctrlKey||evt.altKey?"year":"month";
break;
case dk.END:
_121=this.dateFuncObj.add(_121,"month",1);
_120="day";
case dk.HOME:
_121=new this.dateClassObj(_121);
_121.setDate(1);
break;
case dk.ENTER:
case dk.SPACE:
this.set("value",this.currentFocus);
break;
default:
return true;
}
if(_120){
_121=this.dateFuncObj.add(_121,_120,_11f);
}
this._setCurrentFocusAttr(_121);
return false;
},_onKeyPress:function(evt){
if(!this.handleKey(evt)){
dojo.stopEvent(evt);
}
},onValueSelected:function(date){
},onChange:function(date){
},_isSelectedDate:function(_122,_123){
return this._isValidDate(this.value)&&!this.dateFuncObj.compare(_122,this.value,"date");
},isDisabledDate:function(_124,_125){
},getClassForDate:function(_126,_127){
}});
dojo.declare("dijit.Calendar._MonthDropDown",[dijit._Widget,dijit._Templated],{months:[],templateString:"<div class='dijitCalendarMonthMenu dijitMenu' "+"dojoAttachEvent='onclick:_onClick,onmouseover:_onMenuHover,onmouseout:_onMenuHover'></div>",_setMonthsAttr:function(_128){
this.domNode.innerHTML=dojo.map(_128,function(_129,idx){
return _129?"<div class='dijitCalendarMonthLabel' month='"+idx+"'>"+_129+"</div>":"";
}).join("");
},_onClick:function(evt){
this.onChange(dojo.attr(evt.target,"month"));
},onChange:function(_12a){
},_onMenuHover:function(evt){
dojo.toggleClass(evt.target,"dijitCalendarMonthLabelHover",evt.type=="mouseover");
}});
}
if(!dojo._hasResource["dijit.form._DateTimeTextBox"]){
dojo._hasResource["dijit.form._DateTimeTextBox"]=true;
dojo.provide("dijit.form._DateTimeTextBox");
new Date("X");
dojo.declare("dijit.form._DateTimeTextBox",[dijit.form.RangeBoundTextBox,dijit._HasDropDown],{templateString:dojo.cache("dijit.form","templates/DropDownBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\r\n\tid=\"widget_${id}\"\r\n\trole=\"combobox\"\r\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n\t\t>\r\n\t\t\t    <!-- Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0\r\n\t\t\t      WaveMaker: Unfortunate hack to replace input with span to avoid focus issues with mobile that cause keyboards to pop open -->\r\n<${buttonNodeType} class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t${_buttonInputDisabled}\r\n\t/></div\r\n\t><div class='dijitReset dijitValidationContainer'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t/></div\r\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n\t/></div\r\n></div>\r\n"),hasDownArrow:true,openOnClick:true,regExpGen:dojo.date.locale.regexp,datePackage:"dojo.date",compare:function(val1,val2){
var _12b=this._isInvalidDate(val1);
var _12c=this._isInvalidDate(val2);
return _12b?(_12c?0:-1):(_12c?1:dojo.date.compare(val1,val2,this._selector));
},forceWidth:true,format:function(_12d,_12e){
if(!_12d){
return "";
}
return this.dateLocaleModule.format(_12d,_12e);
},"parse":function(_12f,_130){
return this.dateLocaleModule.parse(_12f,_130)||(this._isEmpty(_12f)?null:undefined);
},serialize:function(val,_131){
if(val.toGregorian){
val=val.toGregorian();
}
return dojo.date.stamp.toISOString(val,_131);
},dropDownDefaultValue:new Date(),value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(args){
var _132=args.datePackage?args.datePackage+".Date":"Date";
this.dateClassObj=dojo.getObject(_132,false);
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
},_setConstraintsAttr:function(_133){
_133.selector=this._selector;
_133.fullYear=true;
var _134=dojo.date.stamp.fromISOString;
if(typeof _133.min=="string"){
_133.min=_134(_133.min);
}
if(typeof _133.max=="string"){
_133.max=_134(_133.max);
}
this.inherited(arguments);
},_isInvalidDate:function(_135){
return !_135||isNaN(_135)||typeof _135!="object"||_135.toString()==this._invalidDate;
},_setValueAttr:function(_136,_137,_138){
if(_136!==undefined){
if(typeof _136=="string"){
_136=dojo.date.stamp.fromISOString(_136);
}
if(this._isInvalidDate(_136)){
_136=null;
}
if(_136 instanceof Date&&!(this.dateClassObj instanceof Date)){
_136=new this.dateClassObj(_136);
}
}
this.inherited(arguments);
if(this.dropDown){
this.dropDown.set("value",_136,false);
}
},_set:function(attr,_139){
if(attr=="value"&&this.value instanceof Date&&this.compare(_139,this.value)==0){
return;
}
this.inherited(arguments);
},_setDropDownDefaultValueAttr:function(val){
if(this._isInvalidDate(val)){
val=new this.dateClassObj();
}
this.dropDownDefaultValue=val;
},openDropDown:function(_13a){
if(this.dropDown){
this.dropDown.destroy();
}
var _13b=dojo.getObject(this.popupClass,false),_13c=this,_13d=this.get("value");
this.dropDown=new _13b({onChange:function(_13e){
dijit.form._DateTimeTextBox.superclass._setValueAttr.call(_13c,_13e,true);
},id:this.id+"_popup",dir:_13c.dir,lang:_13c.lang,value:_13d,currentFocus:!this._isInvalidDate(_13d)?_13d:this.dropDownDefaultValue,constraints:_13c.constraints,filterString:_13c.filterString,datePackage:_13c.datePackage,isDisabledDate:function(date){
return !_13c.rangeCheck(date,_13c.constraints);
}});
this.inherited(arguments);
},_getDisplayedValueAttr:function(){
return this.textbox.value;
},_setDisplayedValueAttr:function(_13f,_140){
this._setValueAttr(this.parse(_13f,this.constraints),_140,_13f);
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
dojo.declare("dijit._TimePicker",[dijit._Widget,dijit._Templated],{templateString:dojo.cache("dijit","templates/TimePicker.html","<div id=\"widget_${id}\" class=\"dijitMenu\"\r\n    ><div dojoAttachPoint=\"upArrow\" class=\"dijitButtonNode dijitUpArrowButton\" dojoAttachEvent=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\r\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&nbsp;</div\r\n\t\t><div class=\"dijitArrowButtonChar\">&#9650;</div></div\r\n    ><div dojoAttachPoint=\"timeMenu,focusNode\" dojoAttachEvent=\"onclick:_onOptionSelected,onmouseover,onmouseout\"></div\r\n    ><div dojoAttachPoint=\"downArrow\" class=\"dijitButtonNode dijitDownArrowButton\" dojoAttachEvent=\"onmouseenter:_buttonMouse,onmouseleave:_buttonMouse\"\r\n\t\t><div class=\"dijitReset dijitInline dijitArrowButtonInner\" role=\"presentation\">&nbsp;</div\r\n\t\t><div class=\"dijitArrowButtonChar\">&#9660;</div></div\r\n></div>\r\n"),baseClass:"dijitTimePicker",clickableIncrement:"T00:15:00",visibleIncrement:"T01:00:00",visibleRange:"T05:00:00",value:new Date(),_visibleIncrement:2,_clickableIncrement:1,_totalIncrements:10,constraints:{},serialize:dojo.date.stamp.toISOString,setValue:function(_141){
dojo.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.","","2.0");
this.set("value",_141);
},_setValueAttr:function(date){
this._set("value",date);
this._showText();
},_setFilterStringAttr:function(val){
this._set("filterString",val);
this._showText();
},isDisabledDate:function(_142,_143){
return false;
},_getFilteredNodes:function(_144,_145,_146,_147){
var _148=[],_149=_147?_147.date:this._refDate,n,i=_144,max=this._maxIncrement+Math.abs(i),chk=_146?-1:1,dec=_146?1:0,inc=1-dec;
do{
i=i-dec;
n=this._createOption(i);
if(n){
if((_146&&n.date>_149)||(!_146&&n.date<_149)){
break;
}
_148[_146?"unshift":"push"](n);
_149=n.date;
}
i=i+inc;
}while(_148.length<_145&&(i*chk)<max);
return _148;
},_showText:function(){
var _14a=dojo.date.stamp.fromISOString;
this.timeMenu.innerHTML="";
this._clickableIncrementDate=_14a(this.clickableIncrement);
this._visibleIncrementDate=_14a(this.visibleIncrement);
this._visibleRangeDate=_14a(this.visibleRange);
var _14b=function(date){
return date.getHours()*60*60+date.getMinutes()*60+date.getSeconds();
},_14c=_14b(this._clickableIncrementDate),_14d=_14b(this._visibleIncrementDate),_14e=_14b(this._visibleRangeDate),time=(this.value||this.currentFocus).getTime();
this._refDate=new Date(time-time%(_14d*1000));
this._refDate.setFullYear(1970,0,1);
this._clickableIncrement=1;
this._totalIncrements=_14e/_14c;
this._visibleIncrement=_14d/_14c;
this._maxIncrement=(60*60*24)/_14c;
var _14f=this._getFilteredNodes(0,Math.min(this._totalIncrements>>1,10)-1),_150=this._getFilteredNodes(0,Math.min(this._totalIncrements,10)-_14f.length,true,_14f[0]);
dojo.forEach(_150.concat(_14f),function(n){
this.timeMenu.appendChild(n);
},this);
},constructor:function(){
this.constraints={};
},postMixInProperties:function(){
this.inherited(arguments);
this._setConstraintsAttr(this.constraints);
},_setConstraintsAttr:function(_151){
dojo.mixin(this,_151);
if(!_151.locale){
_151.locale=this.lang;
}
},postCreate:function(){
this.connect(this.timeMenu,dojo.isIE?"onmousewheel":"DOMMouseScroll","_mouseWheeled");
this._connects.push(dijit.typematic.addMouseListener(this.upArrow,this,"_onArrowUp",33,250));
this._connects.push(dijit.typematic.addMouseListener(this.downArrow,this,"_onArrowDown",33,250));
this.inherited(arguments);
},_buttonMouse:function(e){
dojo.toggleClass(e.currentTarget,e.currentTarget==this.upArrow?"dijitUpArrowHover":"dijitDownArrowHover",e.type=="mouseenter"||e.type=="mouseover");
},_createOption:function(_152){
var date=new Date(this._refDate);
var _153=this._clickableIncrementDate;
date.setHours(date.getHours()+_153.getHours()*_152,date.getMinutes()+_153.getMinutes()*_152,date.getSeconds()+_153.getSeconds()*_152);
if(this.constraints.selector=="time"){
date.setFullYear(1970,0,1);
}
var _154=dojo.date.locale.format(date,this.constraints);
if(this.filterString&&_154.toLowerCase().indexOf(this.filterString)!==0){
return null;
}
var div=dojo.create("div",{"class":this.baseClass+"Item"});
div.date=date;
div.index=_152;
dojo.create("div",{"class":this.baseClass+"ItemInner",innerHTML:_154},div);
if(_152%this._visibleIncrement<1&&_152%this._visibleIncrement>-1){
dojo.addClass(div,this.baseClass+"Marker");
}else{
if(!(_152%this._clickableIncrement)){
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
var _155=tgt.target.date||tgt.target.parentNode.date;
if(!_155||this.isDisabledDate(_155)){
return;
}
this._highlighted_option=null;
this.set("value",_155);
this.onChange(_155);
},onChange:function(time){
},_highlightOption:function(node,_156){
if(!node){
return;
}
if(_156){
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
dojo.toggleClass(node,this.baseClass+"ItemHover",_156);
if(dojo.hasClass(node,this.baseClass+"Marker")){
dojo.toggleClass(node,this.baseClass+"MarkerHover",_156);
}else{
dojo.toggleClass(node,this.baseClass+"TickHover",_156);
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
var _157=(dojo.isIE?e.wheelDelta:-e.detail);
this[(_157>0?"_onArrowUp":"_onArrowDown")]();
},_onArrowUp:function(_158){
if(typeof _158=="number"&&_158==-1){
return;
}
if(!this.timeMenu.childNodes.length){
return;
}
var _159=this.timeMenu.childNodes[0].index;
var divs=this._getFilteredNodes(_159,1,true,this.timeMenu.childNodes[0]);
if(divs.length){
this.timeMenu.removeChild(this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
this.timeMenu.insertBefore(divs[0],this.timeMenu.childNodes[0]);
}
},_onArrowDown:function(_15a){
if(typeof _15a=="number"&&_15a==-1){
return;
}
if(!this.timeMenu.childNodes.length){
return;
}
var _15b=this.timeMenu.childNodes[this.timeMenu.childNodes.length-1].index+1;
var divs=this._getFilteredNodes(_15b,1,false,this.timeMenu.childNodes[this.timeMenu.childNodes.length-1]);
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
var _15c=this.timeMenu,tgt=this._highlighted_option||dojo.query("."+this.baseClass+"ItemSelected",_15c)[0];
if(!tgt){
tgt=_15c.childNodes[0];
}else{
if(_15c.childNodes.length){
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
if(!dojo._hasResource["wm.base.widget.Editors.Date"]){
dojo._hasResource["wm.base.widget.Editors.Date"]=true;
dojo.provide("wm.base.widget.Editors.Date");
dojo.declare("wm.Date",wm.Text,{openOnClick:true,useLocalTime:false,promptMessage:"",invalidMessage:"",minimum:"",maximum:"",dateMode:"Date",formatLength:"short",datePattern:"",validationEnabled:function(){
return true;
},getEditorConstraints:function(){
var _15d={};
if(this.minimum){
_15d.min=this.convertValue(this.minimum);
}
if(this.maximum){
_15d.max=this.convertValue(this.maximum);
}
if(this.datePattern){
_15d.datePattern=this.datePattern;
}
if(this.timePattern){
_15d.timePattern=this.timePattern;
}
return _15d;
},getEditorProps:function(_15e,_15f){
var _160=this.getEditorConstraints();
var prop=dojo.mixin(this.inherited(arguments),{promptMessage:this.promptMessage,invalidMessage:this.invalidMessage||"$_unset_$",constraints:_160,required:this.required,openOnClick:this.openOnClick,value:this.convertValue(this.displayValue)},_15f||{});
return prop;
},_createEditor:function(_161,_162){
var e=new wm.form.DateTextBox(this.getEditorProps(_161,_162));
if(wm.isMobile){
var self=this;
dojo.query("input",e.domNode).forEach(function(node){
dojo.attr(node,"readonly",true);
});
}
return e;
},convertValue:function(_163){
return wm.convertValueToDate(_163,{selector:this.dateMode.toLowerCase(),formatLength:this.formatLength,timePattern:this.use24Time?"HH:mm":"hh:mm a",datePattern:this.datePattern||undefined});
},getEditorValue:function(){
var d=this.inherited(arguments);
if(d){
if(!this.useLocalTime){
var _164=(this.owner instanceof wm.DateTime==false||this.owner.dateMode=="Date")?120:0;
d.setHours(0,-60*wm.timezoneOffset+_164,0,0);
}
return d.getTime();
}
return this.makeEmptyValue();
},setDisplayValue:function(_165){
var tmp=this.useLocalTime;
this.useLocalTime=true;
this.setEditorValue(_165);
this.useLocalTime=tmp;
},setEditorValue:function(_166){
if(_166===""){
_166=null;
}
if(_166===null||_166===undefined){
return this.inherited(arguments);
}
var v=this.convertValue(_166);
v=new Date(v);
v.setHours(0,0);
if(!this.useLocalTime&&v){
var _167=(this.owner instanceof wm.DateTime==false||this.owner.dateMode=="Date")?120:0;
v.setHours(0,60*v.getHours()+v.getMinutes()+60*wm.timezoneOffset+_167);
}
this.inherited(arguments,[v]);
},setDefaultOnInsert:function(){
if(this.defaultInsert){
if(this.$.binding&&this.$.binding.wires.defaultInsert){
this.$.binding.wires.defaultInsert.refreshValue();
}
this.setDataValue(this.defaultInsert);
this.invalidate();
}
},calcDisplayValue:function(_168){
var d=_168;
if(d instanceof Date==false){
d=new Date(_168);
}
return dojo.date.locale.format(d,{formatLength:this.formatLength,fullYear:true,selector:this.dateMode.toLowerCase(),timePattern:this.use24Time?"HH:mm":"hh:mm a",datePattern:this.datePattern||undefined});
},getDisplayValue:function(){
if(this.editor){
return this.editor.get("displayedValue");
}else{
if(this.dataValue){
return this.calcDisplayValue(this.dataValue);
}else{
return "";
}
}
},setMaximum:function(_169){
if(!_169){
this.maximum=null;
}else{
this.maximum=_169;
}
if(this.editor){
this.editor._setConstraintsAttr(this.getEditorConstraints());
this.editor.validate();
}
},setMinimum:function(_16a){
if(!_16a){
this.minimum=null;
}else{
this.minimum=_16a;
}
if(this.editor){
this.editor._setConstraintsAttr(this.getEditorConstraints());
this.editor.validate();
}
},calcIsDirty:function(val1,val2){
if(val1===undefined||val1===null){
val1=0;
}
if(val2===undefined||val2===null){
val2=0;
}
if(val1 instanceof Date==false){
val1=new Date(val1);
}
if(val2 instanceof Date==false){
var val2=new Date(val2);
}
if(val1&&val2&&val1.getTime()==val2.getTime()){
return false;
}
val1=dojo.date.locale.format(val1,{formatLength:this.formatLength||"short",selector:this.dateMode.toLowerCase(),timePattern:this.use24Time?"HH:mm":"hh:mm a",datePattern:this.datePattern||undefined});
val2=dojo.date.locale.format(val2,{formatLength:this.formatLength||"short",selector:this.dateMode.toLowerCase(),timePattern:this.use24Time?"HH:mm":"hh:mm a",datePattern:this.datePattern||undefined});
return val1!=val2;
}});
dojo.declare("wm.Time",wm.Date,{useLocalTime:true,use24Time:false,timePattern:"hh:mm a",useWMDropDown:false,init:function(){
this.inherited(arguments);
if(this.use24Time){
this.timePattern=this.timePattern.replace(/h/g,"H").replace(/ a/,"");
}
},setDataValue:function(_16b){
if(_16b){
var d=new Date(_16b);
d.setYear(1970);
d.setMonth(0);
d.setDate(1);
}
this.inherited(arguments,[_16b?d.getTime():null]);
},getEditorProps:function(_16c,_16d){
var prop=dojo.mixin(this.inherited(arguments),{use24Time:this.use24Time,constraints:{timePattern:this.timePattern}},_16d||{});
return prop;
},convertValue:function(_16e){
return wm.convertValueToDate(_16e,{selector:"time"});
},_createEditor:function(_16f,_170){
var e;
if(this.useWMDropDown){
e=new wm.form.TimeTextBox(this.getEditorProps(_16f,_170));
}else{
e=new dijit.form.TimeTextBox(this.getEditorProps(_16f,_170));
}
if(wm.isMobile){
var self=this;
dojo.query("input",e.domNode).forEach(function(node){
dojo.attr(node,"readonly",true);
});
}
return e;
},getEditorValue:function(){
var d=wm.Text.prototype.getEditorValue.call(this);
if(d){
if(!this.useLocalTime&&(this.owner instanceof wm.DateTime===false)){
d.setHours(0,60*d.getHours()+d.getMinutes()+60*wm.timezoneOffset,0);
}
return d.getTime();
}
return this.makeEmptyValue();
},setEditorValue:function(_171){
if(_171===""){
_171=null;
}
if(_171===null||_171===undefined){
return wm.AbstractEditor.prototype.setEditorValue.call(this,null);
}else{
if(this.useLocalTime){
return wm.AbstractEditor.prototype.setEditorValue.call(this,new Date(_171));
}
}
var v=new Date(_171);
if(!this.useLocalTime&&v&&(this.owner instanceof wm.DateTime==false||this.owner.dateMode!="Date")){
v.setHours(0,60*v.getHours()+v.getMinutes()+60*wm.timezoneOffset);
}
return wm.AbstractEditor.prototype.setEditorValue.call(this,new Date(v));
},calcIsDirty:function(val1,val2){
if(val1===undefined||val1===null){
val1=0;
}
if(val2===undefined||val2===null){
val2=0;
}
if(val1 instanceof Date==false){
val1=new Date(val1);
}
if(val2 instanceof Date==false){
var val2=new Date(val2);
}
if(val1&&val2&&val1.getTime()==val2.getTime()){
return false;
}
val1=dojo.date.locale.format(val1,{timePattern:this.timePattern,selector:"time"});
val2=dojo.date.locale.format(val2,{timePattern:this.timePattern,selector:"time"});
return val1!=val2;
}});
dojo.declare("wm.DateTime",wm.Date,{editorBorder:false,use24Time:false,formatLength:"short",dateMode:"Date and Time",editorSpacing:"2",_createEditor:function(_172,_173){
this.containerWidget=new wm.Container({width:"100%",height:"100%",layoutKind:"left-to-right",horizontalAlign:"left",verticalAlign:"top",name:"containerWidget",owner:this,domNode:_172});
this.dateEditor=new wm.Date({owner:this,parent:this.containerWidget,name:"date",showing:this.dateMode!="Time",width:"100%",height:"100%",padding:"0",margin:this.dateMode=="Date and Time"?"0,"+this.editorSpacing+",0,0":"0",openOnClick:this.openOnClick,useLocalTime:this.useLocalTime,formatLength:this.formatLength,datePattern:this.datePattern,required:this.required,maximum:this.maximum,minimum:this.minimum,minHeight:8,onchange:dojo.hitch(this,"changed")});
this.timeEditor=new wm.Time({owner:this,useWMDropDown:true,name:"time",parent:this.containerWidget,showing:this.dateMode!="Date",width:"100%",height:"100%",padding:"0",openOnClick:this.openOnClick,useLocalTime:this.useLocalTime,formatLength:this.formatLength,use24Time:this.use24Time,timePattern:this.timePattern||wm.Time.prototype.timePattern,required:this.required,minHeight:8,onchange:dojo.hitch(this,"changed")});
if(this._disabled){
this.setDisabled(this.disabled);
}
return this.containerWidget;
},flow:function(){
if(this.containerWidget&&!this.containerWidget.isDestroyed){
this.containerWidget.flow();
}
},sizeEditor:function(){
this.inherited(arguments);
this.flow();
},setDisabled:function(_174){
wm.Control.prototype.setDisabled.call(this,_174);
if(this.containerWidget){
this.containerWidget._parentDisabled=this._disabled;
this.containerWidget.setDisabled(_174);
}
},focus:function(_175){
if(!this.editor){
return;
}
switch(this.dateMode){
case "Date and Time":
case "Date":
this.dateEditor.focus();
break;
case "Time":
this.timeEditor.focus();
break;
}
},_getValidatorNode:function(){
return null;
},setEditorValue:function(_176){
if(!this.editor){
this.dataValue=_176;
return;
}
var d;
if(_176 instanceof Date){
d=new Date(_176);
}else{
if(String(_176).match(/^\d+$/)){
d=new Date(_176);
}else{
if(_176){
d=wm.convertValueToDate(_176,{formatLength:this.formatLength,selector:this.dateMode.toLowerCase(),timePattern:this.use24Time?"HH:mm":"hh:mm a",datePattern:this.datePattern||undefined});
}
}
}
this.timeEditor.setDataValue(d);
this.dateEditor.setDataValue(d);
this.updateReadonlyValue();
},setDisplayValue:function(_177){
var tmp=this.useLocalTime;
this.useLocalTime=true;
this.dateEditor.useLocalTime=true;
this.timeEditor.useLocalTime=true;
this.setEditorValue(_177);
this.useLocalTime=tmp;
this.dateEditor.useLocalTime=tmp;
this.timeEditor.useLocalTime=tmp;
},getEditorValue:function(_178){
var d=new Date(0);
if(this.dateMode=="Date"||this.dateMode=="Date and Time"){
var v=this.dateEditor.getDataValue();
if(v){
d=new Date(v);
}else{
return null;
}
}
if(this.dateMode=="Time"||this.dateMode=="Date and Time"){
var v=this.timeEditor.getDataValue();
if(v){
var _179=new Date(v);
if(this.useLocalTime){
d.setHours(_179.getHours(),_179.getMinutes(),_179.getSeconds());
}else{
d.setHours(0,(_179.getHours()+d.getHours())*60+d.getMinutes()+_179.getMinutes(),_179.getSeconds());
}
}else{
if(this.useLocalTime){
d.setHours(0,0,0);
}
}
}
return d.getTime();
},setDateMode:function(_17a){
var _17b=this.getDataValue();
this.dateMode=_17a;
if(this.editor){
switch(this.dateMode){
case "Date and Time":
this.dateEditor.show();
this.timeEditor.show();
break;
case "Date":
this.dateEditor.show();
this.timeEditor.hide();
break;
case "Time":
this.dateEditor.hide();
this.timeEditor.show();
break;
}
}
this.setDataValue(_17b);
},_getReadonlyValue:function(){
var d=this.getDataValue();
if(d){
d=new Date(d);
if(!this.useLocalTime){
var _17c=(this.dateMode=="Date")?120:0;
d.setHours(0,60*d.getHours()+d.getMinutes()+60*wm.timezoneOffset+_17c);
}
}
return d===null||d===undefined?"":this.calcDisplayValue(d);
},getDisplayValue:function(){
var v=this.getDataValue();
if(v===null||v===undefined){
return "";
}
return this.calcDisplayValue(this.getDataValue());
},setMaximum:function(_17d){
this.maximum=_17d;
this.dateEditor.setMaximum(_17d);
},setMinimum:function(_17e){
this.minimum=_17e;
this.dateEditor.setMinimum(_17e);
},getInvalid:function(){
return this.editor?this.editor.getInvalid():false;
},connectEditor:function(){
this.disconnectEditor();
this.timeEditor.onChange=this.dateEditor.onChange=dojo.hitch(this,"changed");
this.timeEditor.onblur=this.dateEditor.onblur=dojo.hitch(this,"onblur");
this.timeEditor.onfocus=this.dateEditor.onfocus=dojo.hitch(this,"onfocus");
}});
dojo.declare("wm.form.DateTextBox",dijit.form.DateTextBox,{autoWidth:!Boolean(wm.isMobile),forceWidth:false,openDropDown:function(_17f){
this.inherited(arguments);
if(wm.device=="phone"){
var _180=5;
var h=app.appRoot.bounds.h-_180*2;
var w=app.appRoot.bounds.w-_180*2;
dojo.marginBox(this.dropDown.domNode.parentNode,{l:3,t:3,w:app.appRoot.bounds.w,h:app.appRoot.bounds.h});
dojo.marginBox(this.dropDown.domNode,{l:0,t:0,w:w-8,h:h-5});
if(!this.xNode){
var x=this.xNode=document.createElement("span");
x.innerHTML="X";
dojo.addClass(x,"CalendarCloseButton");
this.dropDown.domNode.appendChild(x);
this.owner.connect(x,wm.isFakeMobile?"onclick":"onclick",this,function(){
this.closeDropDown(false);
});
}else{
this.dropDown.domNode.appendChild(this.xNode);
}
}
}});
dojo.declare("wm.form.TimeTextBox",dijit.form.TimeTextBox,{forceWidth:false,autoWidth:false,popupClass:"wm.TimePicker",openDropDown:function(_181){
try{
this._openningDropDown=true;
if(!wm.TimePicker.dialog){
wm.TimePicker.dialog=new wm.TimePicker({owner:this,name:"DateTimePopup"});
}
if(this.dropDown&&this.dropDown._popupWrapper&&!this.dropDown._popupWrapper.style.display){
return;
}
var _182=Number(app.appRoot.deviceSize)<=450;
this.dropDown=wm.TimePicker.dialog;
this.dropDown._cupdating=true;
this.dropDown.okButton.setCaption("OK");
this.dropDown.cancelButton.setCaption("Cancel");
this.dropDown._updating=true;
this.dropDown.setUse24Time(this.use24Time);
this.dropDown._currentDijit=this;
this._aroundNode=app.appRoot.domNode;
this._preparedNode=true;
var _183=dijit._HasDropDown.prototype.openDropDown.call(this,_181);
var _184=false;
if(_182){
_184=true;
var _185=5;
var h=app.appRoot.bounds.h-_185*2;
var w=app.appRoot.bounds.w-_185*2;
dojo.marginBox(this.dropDown.domNode.parentNode,{l:5,t:5,w:w,h:h});
this.dropDown.setWidth(w+"px");
this.dropDown.setHeight(h+"px");
}else{
if(wm.isMobile){
this.dropDown.setHeight("350px");
this.dropDown.setWidth("253px");
}else{
this.dropDown.setHeight("240px");
this.dropDown.setWidth("260px");
}
}
if(!_184){
var _186=dojo.coords(this.owner.editor.domNode);
var _187={h:this.dropDown.bounds.h,w:this.dropDown.bounds.w};
if(_186.y+_186.h+_187.h<app.appRoot.bounds.h){
_187.t=_186.y+_186.h;
}else{
if(_187.h<_186.y){
_187.t=_186.y-_187.h;
}else{
_187.t=0;
}
}
_187.l=_186.x;
if(_187.l+_187.w>app.appRoot.bounds.w){
_187.l=app.appRoot.bounds.w-_187.w;
}
dojo.marginBox(this.dropDown.domNode.parentNode,_187);
}
this.dropDown.buttonPanel.setShowing(wm.isMobile);
this.dropDown.callOnShowParent();
this.dropDown.setDataValue(this.get("value"));
this.dropDown._updating=false;
app.addHistory({id:this.owner.getRuntimeId(),options:{},title:"Hide Popup"});
this.dropDown._cupdating=false;
wm.onidle(this.dropDown,"showContents");
return _183;
}
finally{
this.dropDown.reflow();
this._openningDropDown=false;
}
}});
dojo.declare("wm.TimePicker",wm.Container,{use24Time:false,border:"1",borderColor:"#333",height:"452px",width:"220px",padding:"0",margin:"0",classNames:"wmdialog MainContent",horizontalAlign:"left",verticalAlign:"top",dataValue:null,prepare:function(_188){
_188.owner=app;
this.inherited(arguments);
},setUse24Time:function(_189){
this.use24Time=_189;
this.ampm.setShowing(!_189);
if(this.hours.showing){
var _18a=[];
for(var i=_189?0:1;i<=(_189?23:12);i++){
_18a.push({dataValue:i});
}
this.hours.renderData(_18a);
}
},hideContents:function(){
this.mainPanel.setShowing(false);
},showContents:function(){
if(!this.mainPanel.showing){
this._cupdating=true;
this.mainPanel.setShowing(true);
this.hours.renderDojoObj();
this.minutes.renderDojoObj();
this._cupdating=false;
this.reflow();
this.renderBounds();
}
},postInit:function(){
var _18b=dojo.hitch(this,"changed");
this.mainPanel=new wm.Panel({owner:this,parent:this,showing:false,name:"mainDateTimePickerPanel",layoutKind:"left-to-right",horizontalAlign:"left",verticalAlign:"center",width:"100%",height:"100%"});
wm.require("wm.List");
this.hours=new wm.List({owner:this,parent:this.mainPanel,selectionMode:wm.isMobile?"radio":"single",name:"hours",columns:[{"show":true,"title":"Hour","width":"100%","align":"left","field":"dataValue",mobileColumn:1}],_pkList:["dataValue"],height:"100%",padding:"2",width:"100%",minWidth:100,border:"0,2,0,0",padding:"0",margin:"0",onSelect:_18b});
this.hours.selectedItem.setType("NumberData");
var _18c=[];
for(var i=0;i<12;i++){
_18c.push({dataValue:i});
}
this.hours.renderData(_18c);
this.minutes=new wm.List({owner:this,parent:this.mainPanel,selectionMode:wm.isMobile?"radio":"single",name:"minutes",columns:[{"show":true,"title":"Minute","width":"100%","align":"left","field":"dataValue",mobileColumn:1}],_pkList:["dataValue"],height:"100%",padding:"2",width:"100%",minWidth:100,border:"0,2,0,0",padding:"0",margin:"0",onSelect:_18b});
this.minutes.selectedItem.setType("NumberData");
var _18d=[];
for(var i=0;i<60;i+=5){
_18d.push({dataValue:i});
}
this.minutes.renderData(_18d);
this.ampm=new wm.ToggleButtonPanel({owner:this,parent:this.mainPanel,name:"ampm",height:"90px",desktopHeight:"90px",width:"60px",layoutKind:"top-to-bottom",verticalAlign:"middle",margin:"0,7,0,3",onChange:_18b});
this.amButton=new wm.Button({owner:this,parent:this.ampm,height:"100%",desktopHeight:"100%",caption:"AM",name:"amButton"});
this.pmButton=new wm.Button({owner:this,parent:this.ampm,height:"100%",desktopHeight:"100%",caption:"PM",name:"pmButton"});
this.buttonPanel=new wm.Panel({owner:this,parent:this,_classes:{domNode:["dialogfooter"]},showing:wm.isMobile,name:"dateTimePickerButtonPanel",layoutKind:"left-to-right",horizontalAlign:"right",verticalAlign:"bottom",width:"100%",mobileHeight:"45px",desktopHeight:"32px"});
this.okButton=new wm.Button({owner:this,parent:this.buttonPanel,name:"okButton",caption:"OK",width:"80px",height:"100%",onclick:dojo.hitch(this,"onOkClick")});
this.cancelButton=new wm.Button({owner:this,parent:this.buttonPanel,name:"cancelButton",caption:"Cancel",width:"80px",height:"100%",onclick:dojo.hitch(this,"onCancelClick")});
this.inherited(arguments);
},changed:function(){
if(this._updating){
return;
}
var date=new Date(0);
var hour=this.hours.selectedItem.getValue("dataValue");
if(hour==12&&!this.use24Time){
hour=0;
}
var _18e=this.minutes.selectedItem.getValue("dataValue");
var isPM=this.pmButton.clicked;
date.setHours(hour+((isPM&&!this.use24Time)?12:0),_18e);
this.dataValue=date;
if(this._currentDijit){
var tp=this._currentDijit.constraints.timePattern;
if(isPM&&!this.use24Time){
this._currentDijit.constraints.timePattern="hh:mm a";
}
this._currentDijit.set("value",date);
}
},set:function(_18f,_190){
},destroyRecursive:function(){
},reflowParent:function(){
this.reflow();
this.renderBounds();
},getContentBounds:function(){
var b=this.inherited(arguments);
b.l+=this.borderExtents.l;
b.t+=this.borderExtents.t;
return b;
},setDataValue:function(_191){
this._initialValue=_191;
var _192;
if(_191 instanceof Date){
_192=_191;
}else{
if(!_191){
_192="";
}else{
_192=wm.convertValueToDate(_191);
}
}
this.dataValue=_192;
if(_192){
var time=dojo.date.locale.format(_192,{selector:"time",timePattern:this.use24Time?"HH:mm":"hh:mm a"});
if(this.use24Time){
var _193=time.match(/^(\d\d)\:(\d\d)$/);
}else{
var _193=time.match(/^(\d\d)\:(\d\d) (.*)$/);
}
var _194=Number(_193[2].replace(/^0*/,""));
this.minutes.deselectAll();
this.minutes.selectItemOnGrid({dataValue:_194},["dataValue"]);
var hour;
if(this.use24Time){
hour=Number(_193[1]);
}else{
var isPM=_193[3].toLowerCase()=="pm";
hour=Number(_193[1].replace(/^0*/,""));
if(isPM){
this.pmButton.onclick(this.pmButton);
}else{
this.amButton.onclick(this.amButton);
}
}
this.hours.deselectAll();
this.hours.selectItemOnGrid({dataValue:hour},["dataValue"]);
}
},onOkClick:function(){
this._currentDijit._opened=true;
this._currentDijit.closeDropDown();
},onCancelClick:function(){
this._currentDijit._opened=true;
this._currentDijit.closeDropDown();
this._currentDijit.set("value",this._initialValue);
},onChange:function(_195){
}});
}
if(!dojo._hasResource["wm.base.widget.dijit.Dijit"]){
dojo._hasResource["wm.base.widget.dijit.Dijit"]=true;
dojo.provide("wm.base.widget.dijit.Dijit");
dojo.addOnLoad(function(){
var _196=function(inId){
var n=dojo.byId(inId);
n&&(n.style.visibility="hidden");
};
_196("a11yTestNode");
});
dojo.declare("wm.Dijit",wm.Control,{dijitClass:null,nonDijitProps:{name:1,flex:1,box:1,left:1,top:1,width:1,height:1,owner:1,parent:1,publishClass:1,dijitClass:1,domNode:1,id:1},prepare:function(_197){
this.dijitProps={};
for(var i in _197){
if(!(i in this.nonDijitProps)){
this.dijitProps[i]=_197[i];
}
}
this.inherited(arguments);
},destroy:function(){
if(this.dijit){
this.dijit.destroy();
}
this.inherited(arguments);
},setDomNode:function(_198){
_198=this.initDijit(_198);
this.inherited(arguments);
},initDijit:function(_199){
if(this.dijitClass){
if(typeof this.dijitClass=="string"){
dojo["require"](this.dijitClass);
}
var n=document.createElement("div");
_199.appendChild(n);
var p=dojo.mixin({srcNodeRef:n},this.getProperties());
var _19a=typeof this.dijitClass=="string"?dojo.getObject(this.dijitClass):this.dijitClass;
try{
this.dijit=_19a?new _19a(p):null;
this.setEvents();
}
catch(e){
console.error(e);
}
}
return _199;
},getProperties:function(){
return this.dijitProps;
},setEvents:function(){
for(var n in this.dijit){
if(!n.indexOf("on")){
var e="_"+n;
if(!this[e]){
e=n;
}
if(this[e]){
this.connect(this.dijit,n,this,e);
}
}
}
}});
wm.Object.extendSchema(wm.Dijit,{box:{ignore:1}});
dojo.declare("wm.DijitWrapper",wm.Dijit,{});
dojo.declare("wm.CustomDijit",wm.Dijit,{scrim:true,renderBoundsX:true,renderBoundsY:true,renderBounds:function(){
this.inherited(arguments);
if(this.dijit){
var b=this.getStyleBounds();
if(!this.renderBoundsX){
delete b.w;
}
if(!this.renderBoundsY){
delete b.h;
}
dojo.marginBox(this.dijit.domNode,b);
}
}});
dojo.declare("wm.DijitDesigner",wm.CustomDijit,{dijitPropList:"",dijitClass:"",setProp:function(_19b,_19c){
if(_19b.indexOf("wmdijit")==0){
this[_19b]=_19c;
this.dijitSet(_19b,_19c);
}else{
this.inherited(arguments);
}
},dijitSet:function(_19d,_19e){
if(_19d.indexOf("wmdijit")==0){
_19d=wm.decapitalize(_19d.substring(7));
}
if(this.dijit["set"+wm.capitalize(_19d)]){
this.dijit["set"+wm.capitalize(_19d)](_19e);
}else{
this.dijit.set(_19d,_19e);
}
},getProp:function(_19f){
if(_19f.indexOf("wmdijit")==0){
return this.dijitGet(_19f);
}else{
return this.inherited(arguments);
}
},dijitGet:function(_1a0){
var _1a1=null;
try{
if(_1a0.indexOf("wmdijit")==0){
_1a0=wm.decapitalize(_1a0.substring(7));
}
if(this.dijit["get"+wm.capitalize(_1a0)]){
_1a1=this.dijit["get"+wm.capitalize(_1a0)]();
}else{
_1a1=this.dijit.get(_1a0);
}
if(_1a1 instanceof Date){
_1a1=this._isDesignLoaded?dojo.date.locale.format(_1a1,{formatLength:"short"}):_1a1.getTime();
}else{
if(wm.isNode(_1a1)){
_1a1=_1a1.id;
}
}
}
catch(e){
}
return _1a1;
},getProperties:function(){
var _1a2={};
var _1a3=this.dijitPropList.split(/,/);
for(var i=0;i<_1a3.length;i++){
var _1a4=_1a3[i];
if(_1a4.indexOf("wmdijit")==0){
_1a2[wm.decapitalize(_1a4.substring(7))]=this[_1a4];
}else{
_1a2[_1a4]=this[_1a4];
}
}
return _1a2;
},setEvents:function(){
for(var _1a5 in this.dijit){
if(_1a5.indexOf("on")==0&&!_1a5.match(/(Mouse|Key)/)){
var _1a6="onDijit"+_1a5.substring(2);
if(!this[_1a6]){
this[_1a6]=function(){
};
}
this.connect(this.dijit,_1a5,this,_1a6);
}
}
},_end:0});
}
if(!dojo._hasResource["wm.base.widget.dijit.Calendar"]){
dojo._hasResource["wm.base.widget.dijit.Calendar"]=true;
dojo.provide("wm.base.widget.dijit.Calendar");
dojo.extend(dijit.Calendar,{specialDates:null,getClassForDate:function(date){
if(!this.specialDatesHash){
return;
}
var _1a7=this.owner.cssClassField;
var key=wm.dijit.Calendar.getDateKey(date);
if(this.specialDatesHash&&this.specialDatesHash[key]){
var _1a8="";
for(var i=0;i<this.specialDatesHash[key].length;i++){
var _1a9=this.specialDatesHash[key][i][_1a7];
if(typeof _1a9=="number"){
_1a9="class"+_1a9;
}
_1a8+=((_1a8)?" ":"")+_1a9;
}
return _1a8;
}
}});
dojo.declare("wm.dijit.Calendar",wm.Dijit,{minimum:"",maximum:"",useLocalTime:false,displayDate:"",dijitClass:dijit.Calendar,width:"360px",height:"160px",mobileHeight:"210px",enableTouchHeight:true,dialog:null,useDialog:true,specialDates:null,dateField:null,startDateField:null,endDateField:null,cssClassField:null,desciptionField:null,setSpecialDates:function(_1aa){
if(!_1aa){
this.specialDates=null;
this.specialDatesHash={};
this.refreshCalendar();
return;
}
var _1ab={};
if(this.isDesignLoaded()){
if(!(_1aa instanceof wm.Variable)){
var ds=this.getValueById(_1aa);
if(ds){
this.components.binding.addWire("","specialDates",ds.getId());
return;
}
}
}
if(dojo.isString(_1aa)){
_1aa=this.owner.getValue(_1aa);
}
this.specialDates=_1aa;
if(_1aa instanceof wm.Variable){
_1aa=_1aa.getData();
}
for(var i=0;i<_1aa.length;i++){
var data=_1aa[i];
if(!data.date&&data.dataValue){
data=data.dataValue;
}
var date=data[this.dateField];
if(date instanceof Date===false){
date=new Date(date);
}
var key=wm.dijit.Calendar.getDateKey(date);
if(!_1ab[key]){
_1ab[key]=[];
}
_1ab[key].push(data);
}
this.specialDatesHash=_1ab;
this.refreshCalendar();
},getProperties:function(){
var _1ac=this.inherited(arguments);
_1ac.owner=this;
if(this.dateValue){
_1ac.currentFocus=_1ac.value=new Date(this.dateValue);
}
return _1ac;
},renderBounds:function(){
this.inherited(arguments);
this.dijit._setStyleAttr({width:this.bounds.w+"px",height:this.bounds.h+"px"});
},focus:function(){
this.dijit.focus();
},refreshCalendar:function(){
this.dijitProps.specialDatesHash=this.specialDatesHash;
if(this.dijit){
this.dijit.destroy();
this.initDijit(this.domNode);
this.dijit._setStyleAttr({width:this.bounds.w+"px",height:this.bounds.h+"px"});
}
},initDijit:function(_1ad){
var _1ae=this.inherited(arguments);
dojo.query(".dijitButtonNode",this.domNode).addClass("wmbutton");
return _1ae;
},prepare:function(){
this.inherited(arguments);
if(this.specialDates){
this.setSpecialDates(this.specialDates);
}
},init:function(){
this.dijitProps.isDisabledDate=dojo.hitch(this,"isDisabledDate");
this.setMinimum(this.minimum);
this.setMaximum(this.maximum);
this.inherited(arguments);
if(this.dateValue){
this.setDateValue(this.dateValue);
}
if(this.useDialog){
this.dialog=new wm.WidgetsJsDialog({width:200,height:160,modal:false,owner:this,corner:"cr",fixPositionNode:this.domNode,widgets_data:{startContainer:["wm.Panel",{height:"20px",width:"100%",layoutKind:"left-to-right",horizontalAlign:"left",verticalAlign:"top"},{},{startHeading:["wm.Label",{width:"40px",height:"100%",caption:"FROM:"}],startDate:["wm.Label",{width:"100%",height:"100%"}]}],endContainer:["wm.Panel",{height:"20px",width:"100%",layoutKind:"left-to-right",horizontalAlign:"left",verticalAlign:"top"},{},{endHeading:["wm.Label",{width:"40px",height:"100%",caption:"TO:"}],endDate:["wm.Label",{width:"100%",height:"100%"}]}],description:["wm.Label",{width:"100%",height:"20px",autoSizeHeight:true,singleLine:false}]}});
this.dialog.titleMinify.hide();
this.dialog.titleMaxify.hide();
}
},setMinimum:function(_1af){
if(this._isDesignLoaded){
if(_1af instanceof Date){
this.minimum=_1af.getTime();
}else{
if(!_1af){
this.minimum="";
}else{
this.minimum=_1af;
}
}
}else{
if(_1af instanceof Date){
this.minimum=_1af;
}else{
if(!_1af){
this.minimum="";
}else{
this.minimum=wm.convertValueToDate(_1af);
}
}
if(this.dijit){
var _1b0=this.dijit.value;
var _1b1=this.dijit.currentFocus;
this.dijit.destroy();
this.initDijit(this.domNode);
this.renderBounds();
this.dijit.set("currentFocus",_1b1);
this.setDate(_1b0);
}
}
},setMaximum:function(_1b2){
if(this._isDesignLoaded){
if(_1b2 instanceof Date){
this.maximum=_1b2.getTime();
}else{
if(!_1b2){
this.maximum="";
}else{
this.maximum=_1b2;
}
}
}else{
if(_1b2 instanceof Date){
this.maximum=_1b2;
}else{
if(!_1b2){
this.maximum="";
}else{
this.maximum=wm.convertValueToDate(_1b2);
}
}
if(this.dijit){
var _1b3=this.dijit.value;
var _1b4=this.dijit.currentFocus;
this.dijit.destroy();
this.initDijit(this.domNode);
this.renderBounds();
this.dijit.set("currentFocus",_1b4);
this.setDate(_1b3);
}
}
},setDomNode:function(){
this.inherited(arguments);
var s=this.dijit.domNode.style;
s.width=s.height="100%";
},setDate:function(_1b5){
var d=wm.convertValueToDate(_1b5);
if(d&&!this.useLocalTime){
d.setHours(0,60*d.getHours()+d.getMinutes()+60*wm.timezoneOffset);
}
this.dijit.set("value",d);
},getDisplayDate:function(){
if(!this.dijit||this.dijit.value instanceof Date==false){
return "";
}
return dojo.date.locale.format(this.dijit.value,{selector:"date"});
},setDisplayDate:function(_1b6){
this.setDate(_1b6);
},getDateValue:function(){
var d=this.dijit.value;
if(d instanceof Date){
var _1b7=360;
if(!this.useLocalTime){
d.setHours(0,-60*wm.timezoneOffset+_1b7,0);
}else{
d.setHours(0,0,0);
}
return d.getTime();
}
return null;
},setDateValue:function(_1b8){
this.setDate(_1b8);
},_onValueSelected:function(_1b9){
if(this._cupdating){
return;
}
this.onValueSelected(_1b9);
},onValueSelected:function(_1ba){
var key=wm.dijit.Calendar.getDateKey(_1ba);
if(this.useDialog&&this.specialDatesHash&&this.specialDatesHash[key]){
var data=this.specialDatesHash[key][0];
this.dialog.setTitle(key);
this.dialog.show();
this.dialog.$.startContainer.setShowing(Boolean(data[this.startDateField]));
this.dialog.$.endContainer.setShowing(Boolean(data[this.endDateField]));
this.dialog.$.startDate.setCaption(wm.dijit.Calendar.getTime(data[this.startDateField]));
this.dialog.$.endDate.setCaption(wm.dijit.Calendar.getTime(data[this.endDateField]));
this.dialog.$.description.setCaption(data[this.descriptionField]);
}else{
if(this.useDialog&&this.dialog.showing){
this.dialog.dismiss();
}
}
this.valueChanged("dateValue",_1ba instanceof Date?_1ba.getTime():null);
},isDisabledDate:function(date){
if(this.minimum){
if(dojo.date.compare(date,this.minimum,"date")<0){
return true;
}
}
if(this.maximum){
if(dojo.date.compare(date,this.maximum,"date")>0){
return true;
}
}
return false;
}});
wm.dijit.Calendar.getTime=function(date){
if(date instanceof Date===false){
date=new Date(date);
}
var hour=date.getHours();
var ampm="am";
if(hour==0){
hour=12;
}else{
if(hour==12){
ampm="pm";
}else{
if(hour>12){
hour=hour%12;
ampm="pm";
}
}
}
return hour+":"+date.getMinutes()+" "+ampm;
};
wm.dijit.Calendar.getDateKey=function(date){
return (date.getYear()+1900)+"-"+(date.getMonth()+1)+"-"+date.getDate();
};
wm.dijit.Calendar.description="A monthly calendar.";
}
if(!dojo._hasResource["dijit.form.ToggleButton"]){
dojo._hasResource["dijit.form.ToggleButton"]=true;
dojo.provide("dijit.form.ToggleButton");
}
if(!dojo._hasResource["dijit.form.CheckBox"]){
dojo._hasResource["dijit.form.CheckBox"]=true;
dojo.provide("dijit.form.CheckBox");
dojo.declare("dijit.form.CheckBox",dijit.form.ToggleButton,{templateString:dojo.cache("dijit.form","templates/CheckBox.html","<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\r\n\t><input\r\n\t \t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\r\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\r\n\t\tdojoAttachPoint=\"focusNode\"\r\n\t \tdojoAttachEvent=\"onclick:_onClick\"\r\n/></div>\r\n"),baseClass:"dijitCheckBox",type:"checkbox",value:"on",readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{readOnly:"focusNode"}),_setReadOnlyAttr:function(_1bb){
this._set("readOnly",_1bb);
dojo.attr(this.focusNode,"readOnly",_1bb);
dijit.setWaiState(this.focusNode,"readonly",_1bb);
},_setValueAttr:function(_1bc,_1bd){
if(typeof _1bc=="string"){
this._set("value",_1bc);
dojo.attr(this.focusNode,"value",_1bc);
_1bc=true;
}
if(this._created){
this.set("checked",_1bc,_1bd);
}
},_getValueAttr:function(){
return (this.checked?this.value:false);
},_setLabelAttr:undefined,postMixInProperties:function(){
if(this.value==""){
this.value="on";
}
this.checkedAttrSetting=this.checked?"checked":"";
this.inherited(arguments);
},_fillContent:function(_1be){
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
dojo.declare("dijit.form.RadioButton",dijit.form.CheckBox,{type:"radio",baseClass:"dijitRadio",_setCheckedAttr:function(_1bf){
this.inherited(arguments);
if(!this._created){
return;
}
if(_1bf){
var _1c0=this;
dojo.query("INPUT[type=radio]",this.focusNode.form||dojo.doc).forEach(function(_1c1){
if(_1c1.name==_1c0.name&&_1c1!=_1c0.focusNode&&_1c1.form==_1c0.focusNode.form){
var _1c2=dijit.getEnclosingWidget(_1c1);
if(_1c2&&_1c2.checked){
_1c2.set("checked",false);
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
},_createEditor:function(_1c3,_1c4){
var e=new dijit.form.CheckBox(this.getEditorProps(_1c3,_1c4));
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
var node=this.editorNode;
var size=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop"?32:16;
node.style.width=size+"px";
node.style.height=size+"px";
var _1c5=parseInt(node.style.lineHeight);
node.style.marginTop=(Math.floor(_1c5-size)/2)+"px";
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
},setChecked:function(_1c6,_1c7){
if(!_1c7){
this._inSetDataValue=true;
}
try{
this.editor.set("checked",_1c6,false);
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
},setDisplayValue:function(_1c8){
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
},getTypedValue:function(_1c9){
var v=_1c9;
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
},setEditorValue:function(_1ca){
this._setEditorValueCalled=true;
if(this.editor){
var _1cb=this.getChecked();
this.editor.set("checked",Boolean(_1ca),false);
if(_1cb!=Boolean(_1ca)){
this.changed();
}
}
},updateReadonlyValue:function(){
},setStartChecked:function(_1cc){
this.startChecked=_1cc;
this.createEditor();
},set_startChecked:function(_1cd){
this.dataValue=Boolean(_1cd);
this.setStartChecked(_1cd);
},setDataType:function(_1ce){
this.dataType=_1ce;
if(_1ce=="boolean"){
this.displayValue=true;
}
switch(_1ce){
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
},setDisabled:function(_1cf){
this.inherited(arguments);
if(!this.editor){
return;
}
this.editor.set("disabled",this.readonly||this._disabled);
},setReadonly:function(_1d0){
this.readonly=_1d0;
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
var _1d1=wm.isMobile||this._isDesignLoaded&&studio.currentDeviceType!="desktop"?32:16;
var _1d2=64;
if(this.captionPosition=="top"||this.captionPosition=="bottom"||!this.caption){
return 40;
}else{
if(this.captionSize.match(/\%/)){
return _1d1+_1d2;
}else{
return _1d1+4+parseInt(this.captionSize);
}
}
}});
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
var _1d3=this.dataSet;
if(!_1d3&&this.formField){
var form=this.getParentForm();
if(form){
_1d3=form.dataSet;
}
if(_1d3){
var _1d4=_1d3._dataSchema;
var _1d5=_1d4[this.formField];
if(_1d5){
var type=_1d5.type;
var _1d6=wm.typeManager.getDisplayField(type);
}else{
if(this.formField&&app.debugDialog){
app.toastError(this.formField+" is an invalid formField for "+this.getRuntimeId());
}
}
}
}else{
if(_1d3&&_1d3.type){
var type=_1d3.type;
var _1d6=wm.typeManager.getDisplayField(type);
}
}
if(_1d6){
return this.setDisplayField(_1d6);
}
},update:function(){
if(this.dataSet instanceof wm.ServiceVariable){
if(app.debugDialog){
var _1d7=this.dataSet.log("update",this.getRuntimeId()+".update()");
}
var d=this.dataSet.updateInternal();
if(_1d7){
app.debugDialog.endLogEvent(_1d7);
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
var _1d8=this.dataValue;
var _1d9=this.displayValue;
if(this.dataValue!==null&&wm.propertyIsChanged(_1d8,"dataValue",wm.AbstractEditor)){
this.setEditorValue(_1d8);
}else{
this.setDisplayValue(_1d9);
}
this.endEditUpdate();
if(!this._cupdating){
var _1d9=this.getDisplayValue();
if(_1d9!=this.displayValue){
this.changed();
}
}
},formatData:function(_1da){
try{
if(this._formatter){
return this._formatter.format(_1da);
}else{
if(this.displayType){
var ctor=wm.getFormatter(this.displayType);
this._formatter=new ctor({name:"format",owner:this});
return this._formatter.format(_1da);
}else{
return _1da;
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
},setDataSet:function(_1db){
this.dataSet=_1db;
if(_1db&&_1db.type!=this.selectedItem.type){
this.selectedItem.setType(_1db.type);
}
var _1dc=this.dataValue;
this.updateIsDirty();
},setDisplayField:function(_1dd){
this.displayField=_1dd;
if(!this._cupdating){
this.createEditor();
}
},setDisplayExpression:function(_1de){
this.displayExpression=_1de;
if(!this._cupdating){
this.createEditor();
}
},setDataField:function(_1df){
if(_1df=="All Fields"){
this.dataField="";
}else{
this.dataField=_1df;
}
},clear:function(){
this.inherited(arguments);
this.selectedItem.clearData();
},_getOptionsData:function(){
var data=[];
if(!this.options){
return data;
}
var opts=dojo.isArray(this.options)?this.options:this.options.split(",");
for(var i=0,l=opts.length,d;i<l;i++){
d=dojo.string.trim(String(opts[i]));
data[i]={name:d,dataValue:d};
}
return data;
},setOptionsVariable:function(){
var opts=this._getOptionsData();
var ds=this.dataSet=new wm.Variable({name:"optionsVar",owner:this,type:"StringData"});
ds.setData(opts);
if(this._isDesignLoaded){
this.displayField="dataValue";
this.dataField="dataValue";
}
},setOptions:function(_1e0){
var _1e1=this._cupdating;
this._cupdating=true;
if(_1e0){
if(this.$.binding&&this.$.binding.wires.dataSet){
this.$.binding.removeWireByProp("dataSet");
}
if(!this.displayField){
this.displayField="dataValue";
if(!this.dataField){
this.dataField="dataValue";
}
}
this.options=_1e0;
this.setOptionsVariable();
this.setDataSet(this.dataSet);
}else{
var _1e2=this.options;
this.options="";
if(this.dataSet&&this.dataSet.owner==this&&_1e2){
this.dataSet.clearData();
this.setDataSet(this.dataSet);
}
}
if(!_1e1){
this._cupdating=false;
if(!this.invalidCss){
this.sizeEditor();
}else{
this.render();
}
}
},_getDisplayData:function(_1e3){
var _1e4;
if(wm.isInstanceType(_1e3,wm.Variable)){
_1e4=_1e3;
}else{
_1e4=new wm.Variable({_temporaryComponent:true});
if(this.dataSet){
_1e4.setType(this.dataSet.type);
}
_1e4.setData(dojo.clone(_1e3));
}
var de=this.displayExpression,v=_1e4;
var _1e5=de?wm.expression.getValue(de,v,this.owner):_1e4.getValue(this.displayField);
if(this.displayType&&this.displayType!="Text"){
_1e5=this.formatData(_1e5);
}
return _1e5==null?"":String(_1e5);
},calcIsDirty:function(val1,val2){
var _1e6="";
var _1e7="";
if(this.dataField){
_1e6=dojo.isArray(val1)?val1.join(","):String(val1||"");
_1e7=dojo.isArray(val2)?val2.join(","):String(val2||"");
return _1e6!=_1e7;
}
if(val1 instanceof wm.Variable&&val1.isList||dojo.isArray(val1)){
var _1e8=val1 instanceof wm.Variable?val1.getCount():val1.length;
for(var i=0;i<_1e8;i++){
if(i){
_1e6+=",";
}
_1e6+=this._getDisplayData(val1 instanceof wm.Variable?val1.getItem(i):val1[i]);
}
}else{
if(val1!==null&&typeof val1=="object"){
_1e6=this._getDisplayData(val1);
}else{
if(val1==null){
_1e6="";
}else{
_1e6=val1;
}
}
}
if(val2 instanceof wm.Variable&&val2.isList||dojo.isArray(val2)){
var _1e8=val2 instanceof wm.Variable?val2.getCount():val2.length;
for(var i=0;i<_1e8;i++){
if(i){
_1e7+=",";
}
_1e7+=this._getDisplayData(val2 instanceof wm.Variable?val2.getItem(i):val2[i]);
}
}else{
if(val2!==null&&typeof val2=="object"){
_1e7=this._getDisplayData(val2);
}else{
if(val2==null){
_1e7="";
}else{
_1e7=val2;
}
}
}
return _1e6!=_1e7;
},setEditorValue:function(_1e9){
this._setEditorValue(_1e9,false);
this.updateReadonlyValue();
},setDisplayValue:function(_1ea){
this._setEditorValue(_1ea,true);
this.updateReadonlyValue();
this.clearDirty();
},_setEditorValue:function(_1eb,_1ec){
var self=this;
if(!this.selectedItem||!this.dataSet){
this.dataValue=_1eb;
return;
}
this.beginEditUpdate();
try{
var _1ed=this._lastValue;
var _1ee=this._cupdating;
this._cupdating=true;
this.deselectAll();
this._cupdating=_1ee;
this._lastValue=_1ed;
if(_1eb instanceof wm.Variable){
_1eb=_1eb.getData();
}
var _1ef;
if(!_1ec&&this.dataField){
_1ef=this.dataField;
}else{
if(!this.displayExpression){
_1ef=this.displayField;
}
}
if(_1ef||this.displayExpression){
if(!dojo.isArray(_1eb)){
_1eb=_1eb===undefined||_1eb===null?[]:[_1eb];
}
var _1f0;
_1f0=_1eb.length;
var _1f1=this.dataSet.getCount();
if(_1f1==0){
this.dataValue=this._multiSelect?_1eb:_1eb[0];
}else{
for(var i=0;i<_1f0;i++){
var _1f2=dojo.isArray(_1eb)?_1eb[i]:_1eb;
var _1f3;
if(_1ef&&_1f2!==null&&typeof _1f2=="object"){
_1f3=_1f2 instanceof wm.Variable?_1f2.getValue(_1ef):_1f2[_1ef];
}else{
if(!_1ef&&_1f2!==null&&typeof _1f2=="object"){
_1f3=this._getDisplayData(_1f2);
}else{
_1f3=_1f2;
}
}
var _1f4=false;
for(var j=0;j<_1f1;j++){
var item=this.dataSet.isList?this.dataSet.getItem(j):this.dataSet;
var _1f5=_1ef?item.getValue(_1ef):this._getDisplayData(item);
if(_1f5==_1f3){
_1f4=true;
this.selectItem(j);
break;
}
}
if(!_1f4){
this._onSetEditorValueFailed(_1eb);
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
},isDataSetValueValid:function(_1f6){
if(dojo.isArray(_1f6)){
for(var i=0;i<_1f6.length;i++){
if(_1f6[i] instanceof wm.Component){
return false;
}
}
return true;
}else{
return !(_1f6 instanceof wm.Component);
}
},_onSetEditorValueFailed:function(_1f7){
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
var _1f8=[];
if(this.dataField){
var _1f9=this.selectedItem.getCount();
for(var i=0;i<_1f9;i++){
_1f8.push(this.selectedItem.isList?this.selectedItem.getItem(i).getValue(this.dataField):this.selectedItem.getValue(this.dataField));
}
}else{
_1f8=this.selectedItem.getData();
if(_1f8!==null&&!dojo.isArray(_1f8)){
_1f8=[_1f8];
}
}
if(!this._multiSelect&&_1f8){
var _1f8=_1f8[0];
return (_1f8||_1f8===0)?_1f8:this.makeEmptyValue();
}else{
return _1f8;
}
},validationEnabled:function(){
return false;
},getDisplayValue:function(){
var _1fa="";
var _1fb=this.selectedItem.getCount();
for(var i=0;i<_1fb;i++){
if(i){
_1fa+=", ";
}
_1fa+=this._getDisplayData(this.selectedItem.isList?this.selectedItem.getItem(i):this.selectedItem);
}
return _1fa;
},deselectAll:function(){
this.clear();
}});
dojo.declare("wm.CheckboxSet",[wm.DataSetEditor,wm.TouchScrollMixinOptional],{singleLine:false,_multiSelect:true,_focused:false,height:"100px",mobileHeight:"150px",editors:null,_dijitClass:"dijit.form.CheckBox",postInit:function(){
this.inherited(arguments);
},setDataSet:function(_1fc){
this.inherited(arguments);
this.createEditor();
},connectEditor:function(){
},destroyEditor:function(){
var _1fd=this.editor;
if(this.dijits){
var self=this;
dojo.forEach(this.dijits,function(d){
d.destroy();
});
}
this.dijits=[];
this.inherited(arguments);
dojo.destroy(_1fd);
},_createEditor:function(_1fe){
this.editor=_1fe;
this.readOnlyNode=_1fe;
this.editor.className="wmCheckboxSet";
var html="";
if(this.dataSet){
var _1ff=this.dataSet.getCount();
for(var i=0;i<_1ff;i++){
var item=this.dataSet.getItem(i);
var id=this.getRuntimeId().replace(/\./g,"__")+"__"+i;
html+="<div class='wmCheckboxSetItem'><input id='"+id+"' name='"+this.getRuntimeId().replace(".","_")+"' dojoType='"+this._dijitClass+"' value='"+i+"'>";
if(wm.isMobile){
html+="<label class='wmeditor-caption'>"+this._getDisplayData(item)+"</label></div>";
}else{
html+="<label class='wmeditor-caption' for='"+id+"'>"+this._getDisplayData(item)+"</label></div>";
}
}
this.editor.innerHTML=html;
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
var self=this;
dojo.forEach(this.dijits,function(_200){
self.connect(_200,"onChange",self,"changed");
self.connect(_200,"onFocus",self,"_onEditorFocused");
self.connect(_200,"onBlur",self,"_onEditorBlurred");
_200.domNode.style.lineHeight="normal";
});
}
this._scrollNode=this.editor;
return this.editor;
},_getTouchNode:function(_201){
var node=_201.touches?_201.touches[0].target:_201.target;
while(node&&node!=this.domNode&&!dojo.hasClass(node,"wmCheckboxSetItem")){
node=node.parentNode;
}
if(!node||node==this.domNode){
return;
}
return node;
},onTouchStart:function(_202){
this.inherited(arguments);
var node=this._touchCheckboxNode=this._getTouchNode(_202);
if(node&&dojo.hasClass(node,"wmCheckboxSetItem")){
dojo.addClass(node.firstChild,"dijitCheckBoxActive");
}
},onTouchMove:function(_203,_204,_205,_206,_207,_208,_209){
this.inherited(arguments);
if(this._touchCheckboxNode&&(Math.abs(_205)>5||Math.abs(_208)>5)){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
delete this._touchCheckboxNode;
}
},onTouchEnd:function(_20a,_20b){
this.inherited(arguments);
if(!_20b&&this._touchCheckboxNode&&this.dijits){
dojo.removeClass(this._touchCheckboxNode.firstChild,"dijitCheckBoxActive");
var _20c=dojo.indexOf(dojo.query(".wmCheckboxSetItem",this.domNode),this._touchCheckboxNode);
if(_20c!=-1){
this.dijits[_20c].set("checked",!this.dijits[_20c].get("checked"));
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
var data=[];
for(var i=0;i<this.dijits.length;i++){
if(this.dijits[i].checked){
data.push(this.dataSet.getItem(i));
}
}
this._dataValueValid=false;
this.selectedItem.setData(data);
this.inherited(arguments);
this._dataValueValid=true;
},destroy:function(){
this.inherited(arguments);
},updateReadonlyValue:function(){
if(this.readonly){
this.setReadonly(true);
}
},setReadonly:function(_20d){
var _20e=this.readonly;
this.readonly=Boolean(_20d);
if(!this.dijits){
return;
}
for(var i=0;i<this.dijits.length;i++){
var e=this.dijits[i];
var _20f=e.get("checked");
e.set("disabled",this.readonly||this._disabled);
if(!_20f){
e.domNode.parentNode.style.display=this.readonly?"none":"";
}else{
if(_20e){
e.domNode.parentNode.style.display="";
}
}
}
},setDisabled:function(_210){
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
},selectItem:function(_211){
if(!this.dijits){
return;
}
this.dijits[_211].set("checked",true,false);
this.dijits[_211]._lastValueReported=true;
},getReadOnlyNodeOverflow:function(){
return "auto";
}});
dojo.declare("wm.ListSet",wm.DataSetEditor,{renderVisibleRowsOnly:true,singleLine:false,showSearchBar:true,selectionMode:"multiple",height:"100px",mobileHeight:"150px",editors:null,deleteColumn:false,deleteConfirm:"Are you sure you want to delete this?",prepare:function(_212){
if(_212&&_212.readonly){
delete _212.readonly;
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
this.inherited(arguments);
},setSelectionMode:function(_213){
this.selectionMode=_213;
if(this.grid){
this.grid.setSelectionMode(_213);
}
this._multiSelect=this.selectionMode=="multiple"||this.selectionMode=="checkbox";
},setOptions:function(_214){
this._typeWas=this.dataSet?this.dataSet.type:"";
this.inherited(arguments);
if(this._typeWas!=this.type){
this.grid.setColumns([{show:true,width:"100%",isCustomField:Boolean(this.displayExpression),mobileColumn:true,field:this.displayExpression?"_name":this.displayField||"_name",expression:this.displayExpression}]);
this.grid.renderDojoObj();
this.setEditorValue(this.dataValue);
}
delete this._typeWas;
},setDataSet:function(_215){
var _216;
if(this._typeWas){
_216=this._typeWas;
}else{
_216=this.dataSet?this.dataSet.type:"";
}
this.inherited(arguments);
if(this.grid){
if(_215&&_215.type!=_216){
this.createEditor();
}
var _217=this.dataValue;
this.grid.setDataSet(_215);
this._inSetDataValue=true;
this.setEditorValue(_217);
delete this._inSetDataValue;
}
},changed:function(){
var _218=this.dataValue;
if(_218&&typeof _218=="object"){
_218=dojo.toJson(_218);
}
this.selectedItem.setDataSet(this.grid.selectedItem);
var _219=this.getDataValue();
if(_219&&typeof _219=="object"){
_219=dojo.toJson(_219);
}
if(_218!==_219){
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
},setShowSearchBar:function(_21a){
this.showSearchBar=Boolean(_21a);
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
},filterList:function(_21b,_21c){
var _21d=this.grid.getRowCount();
var _21e={};
if(_21b){
for(var i=0;i<this.grid.columns.length&&this.grid.columns[i].controller;i++){
}
_21e[this.grid.columns[i].field]="*"+_21b+"*";
}
this.grid.setQuery(_21e);
},_createEditor:function(_21f){
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
},setReadonly:function(_220){
},setDeleteColumn:function(_221){
this.deleteColumn=_221;
if(this.grid){
this.grid.setDeleteColumn(_221);
}
},setDeleteConfirm:function(_222){
this.deleteConfirm=_222;
if(this.grid){
this.grid.deleteConfirm=_222;
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
},selectItem:function(_223){
this.grid.setSelectedRow(_223);
},onRowDeleted:function(_224,_225){
}});
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
dojo.data.util.sorter.createSortFunction=function(_226,_227){
var _228=[];
function _229(attr,dir,comp,s){
return function(_22a,_22b){
var a=s.getValue(_22a,attr);
var b=s.getValue(_22b,attr);
return dir*comp(a,b);
};
};
var _22c;
var map=_227.comparatorMap;
var bc=dojo.data.util.sorter.basicComparator;
for(var i=0;i<_226.length;i++){
_22c=_226[i];
var attr=_22c.attribute;
if(attr){
var dir=(_22c.descending)?-1:1;
var comp=bc;
if(map){
if(typeof attr!=="string"&&("toString" in attr)){
attr=attr.toString();
}
comp=map[attr]||bc;
}
_228.push(_229(attr,dir,comp,_227));
}
}
return function(rowA,rowB){
var i=0;
while(i<_228.length){
var ret=_228[i++](rowA,rowB);
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
dojo.data.util.simpleFetch.fetch=function(_22d){
_22d=_22d||{};
if(!_22d.store){
_22d.store=this;
}
var self=this;
var _22e=function(_22f,_230){
if(_230.onError){
var _231=_230.scope||dojo.global;
_230.onError.call(_231,_22f,_230);
}
};
var _232=function(_233,_234){
var _235=_234.abort||null;
var _236=false;
var _237=_234.start?_234.start:0;
var _238=(_234.count&&(_234.count!==Infinity))?(_237+_234.count):_233.length;
_234.abort=function(){
_236=true;
if(_235){
_235.call(_234);
}
};
var _239=_234.scope||dojo.global;
if(!_234.store){
_234.store=self;
}
if(_234.onBegin){
_234.onBegin.call(_239,_233.length,_234);
}
if(_234.sort){
_233.sort(dojo.data.util.sorter.createSortFunction(_234.sort,self));
}
if(_234.onItem){
for(var i=_237;(i<_233.length)&&(i<_238);++i){
var item=_233[i];
if(!_236){
_234.onItem.call(_239,item,_234);
}
}
}
if(_234.onComplete&&!_236){
var _23a=null;
if(!_234.onItem){
_23a=_233.slice(_237,_238);
}
_234.onComplete.call(_239,_23a,_234);
}
};
this._fetchItems(_22d,_232,_22e);
return _22d;
};
}
if(!dojo._hasResource["wm.base.data.SimpleStore"]){
dojo._hasResource["wm.base.data.SimpleStore"]=true;
dojo.provide("wm.base.data.SimpleStore");
dojo.declare("wm.base.data.SimpleStore",null,{constructor:function(_23b,_23c){
this.data=_23b||[];
this.identity=_23c;
},getCount:function(){
return this.data.length;
},_fetchItemByIdentity:function(_23d){
var id=this.identity;
for(var i=0,data=this.data,l=this.getCount(),d;i<l&&(d=data[i]);i++){
if(d[id]===_23d){
return d;
}
}
},_getQuery:function(_23e){
var _23f=_23e.query;
if(dojo.isString(_23f)){
var q=_23f;
_23f={};
_23f[this.identity]=q;
}
return _23f;
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
},_itemInQuery:function(_240,_241,_242,_243){
var d=_240,w="*",a,b,_244;
for(var i in _241){
a=d[i];
if(dojo.isString(a)){
a=a.replace(/\\([^\\])/g,"$1");
}
b=_241[i];
if(dojo.isString(b)){
b=b.replace(/\\([^\\])/g,"$1");
}
if(b==w){
continue;
}
_244=_243||(typeof b=="string"&&b.indexOf(w)==-1);
if(dojo.isString(a)&&dojo.isString(b)&&!_244){
if(b.charAt(b.length-1)==w){
b=b.slice(0,-1);
}
if(_242){
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
},_fetchItems:function(_245,_246,_247){
var _248=this._getQuery(_245),opts=_245.queryOptions,_249=opts&&opts.ignoreCase,_24a=opts&&opts.exactMatch,_24b=[];
for(var i=0,data=this.data,l=this.getCount(),d;i<l&&(d=data[i]);i++){
if(this._itemInQuery(d,_248,_249,_24a)){
_24b.push(d);
if(_24a){
break;
}
}
}
_246(_24b,_245);
},_assertIsItem:function(item){
if(!this.isItem(item)){
throw new Error("Invalid item:",item);
}
},getValue:function(item,_24c,_24d){
this._assertIsItem(item);
var v=item[_24c];
return v!==undefined?v:_24d;
},getValues:function(item,_24e){
var d=this.getValue(item,_24e);
return d?[d]:[];
},getAttributes:function(item){
this._assertIsItem(item);
var _24f=[];
for(var i in item){
_24f.push(i);
}
return _24f;
},hasAttribute:function(item,_250){
this._assertIsItem(item);
for(var i in item){
if(_250==i){
return true;
}
}
return false;
},containsValue:function(item,_251,_252){
this._assertIsItem(item);
return (this.getValue(item,_251)===_252);
},isItem:function(_253){
return _253&&dojo.isObject(_253);
},isItemLoaded:function(_254){
return this.isItem(_254);
},loadItem:function(_255){
if(!this.isItemLoaded(_255.item)){
throw new Error("Unimplemented API: dojo.data.api.Read.loadItem");
}
},getFeatures:function(){
return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
},close:function(_256){
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
},fetchItemByIdentity:function(_257){
var _258=_257.identity;
if(_258===undefined){
if(_257.onError){
_257.onError.call(_259,"No item found");
}
return;
}
var item=this._fetchItemByIdentity(_258),_259=_257.scope?_257.scope:dojo.global;
if(item){
if(_257.onItem){
_257.onItem.call(_259,item);
}
}else{
if(_257.onError){
_257.onError.call(_259,"No item found");
}
}
}});
dojo.extend(wm.base.data.SimpleStore,dojo.data.util.simpleFetch);
}
if(!dojo._hasResource["dojo.data.util.filter"]){
dojo._hasResource["dojo.data.util.filter"]=true;
dojo.provide("dojo.data.util.filter");
dojo.getObject("data.util.filter",true,dojo);
dojo.data.util.filter.patternToRegExp=function(_25a,_25b){
var rxp="^";
var c=null;
for(var i=0;i<_25a.length;i++){
c=_25a.charAt(i);
switch(c){
case "\\":
rxp+=c;
i++;
rxp+=_25a.charAt(i);
break;
case "*":
rxp+=".*";
break;
case "?":
rxp+=".";
break;
case "$":
case "^":
case "/":
case "+":
case ".":
case "|":
case "(":
case ")":
case "{":
case "}":
case "[":
case "]":
rxp+="\\";
default:
rxp+=c;
}
}
rxp+="$";
if(_25b){
return new RegExp(rxp,"mi");
}else{
return new RegExp(rxp,"m");
}
};
}
if(!dojo._hasResource["dijit.form.ComboBox"]){
dojo._hasResource["dijit.form.ComboBox"]=true;
dojo.provide("dijit.form.ComboBox");
dojo.declare("dijit.form.ComboBoxMixin",dijit._HasDropDown,{item:null,pageSize:Infinity,store:null,fetchProperties:{},query:{},autoComplete:true,highlightMatch:"first",searchDelay:100,searchAttr:"name",labelAttr:"",labelType:"text",queryExpr:"${0}*",ignoreCase:true,hasDownArrow:true,templateString:dojo.cache("dijit.form","templates/DropDownBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\r\n\tid=\"widget_${id}\"\r\n\trole=\"combobox\"\r\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n\t\t>\r\n\t\t\t    <!-- Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0\r\n\t\t\t      WaveMaker: Unfortunate hack to replace input with span to avoid focus issues with mobile that cause keyboards to pop open -->\r\n<${buttonNodeType} class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t${_buttonInputDisabled}\r\n\t/></div\r\n\t><div class='dijitReset dijitValidationContainer'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t/></div\r\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n\t/></div\r\n></div>\r\n"),baseClass:"dijitTextBox dijitComboBox",dropDownClass:"dijit.form._ComboBoxMenu",cssStateNodes:{"_buttonNode":"dijitDownArrowButton"},maxHeight:-1,_stopClickEvents:false,_getCaretPos:function(_25c){
var pos=0;
if(typeof (_25c.selectionStart)=="number"){
pos=_25c.selectionStart;
}else{
if(dojo.isIE){
var tr=dojo.doc.selection.createRange().duplicate();
var ntr=_25c.createTextRange();
tr.move("character",0);
ntr.move("character",0);
try{
ntr.setEndPoint("EndToEnd",tr);
pos=String(ntr.text).replace(/\r/g,"").length;
}
catch(e){
}
}
}
return pos;
},_setCaretPos:function(_25d,_25e){
_25e=parseInt(_25e);
dijit.selectInputText(_25d,_25e,_25e);
},_setDisabledAttr:function(_25f){
this.inherited(arguments);
dijit.setWaiState(this.domNode,"disabled",_25f);
},_abortQuery:function(){
if(this.searchTimer){
clearTimeout(this.searchTimer);
this.searchTimer=null;
}
if(this._fetchHandle){
if(this._fetchHandle.abort){
this._fetchHandle.abort();
}
this._fetchHandle=null;
}
},_onInput:function(evt){
if(!this.searchTimer&&(evt.type=="paste"||evt.type=="input")&&this._lastInput!=this.textbox.value){
this.searchTimer=setTimeout(dojo.hitch(this,function(){
this._onKey({charOrCode:229});
}),100);
}
this.inherited(arguments);
},_onKey:function(evt){
var key=evt.charOrCode;
if(evt.altKey||((evt.ctrlKey||evt.metaKey)&&(key!="x"&&key!="v"))||key==dojo.keys.SHIFT){
return;
}
var _260=false;
var pw=this.dropDown;
var dk=dojo.keys;
var _261=null;
this._prev_key_backspace=false;
this._abortQuery();
this.inherited(arguments);
if(this._opened){
_261=pw.getHighlightedOption();
}
switch(key){
case dk.PAGE_DOWN:
case dk.DOWN_ARROW:
case dk.PAGE_UP:
case dk.UP_ARROW:
if(this._opened){
this._announceOption(_261);
}
dojo.stopEvent(evt);
break;
case dk.ENTER:
if(_261){
if(_261==pw.nextButton){
this._nextSearch(1);
dojo.stopEvent(evt);
break;
}else{
if(_261==pw.previousButton){
this._nextSearch(-1);
dojo.stopEvent(evt);
break;
}
}
}else{
this._setBlurValue();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
}
if(this._opened||this._fetchHandle){
evt.preventDefault();
}
case dk.TAB:
var _262=this.get("displayedValue");
if(pw&&(_262==pw._messages["previousMessage"]||_262==pw._messages["nextMessage"])){
break;
}
if(_261){
this._selectOption();
}
if(this._opened){
this._lastQuery=null;
this.closeDropDown();
}
break;
case " ":
if(_261){
dojo.stopEvent(evt);
this._selectOption();
this.closeDropDown();
}else{
_260=true;
}
break;
case dk.DELETE:
case dk.BACKSPACE:
this._prev_key_backspace=true;
_260=true;
break;
default:
_260=typeof key=="string"||key==229;
}
if(_260){
this.item=undefined;
this.searchTimer=setTimeout(dojo.hitch(this,"_startSearchFromInput"),1);
}
},_autoCompleteText:function(text){
var fn=this.focusNode;
dijit.selectInputText(fn,fn.value.length);
var _263=this.ignoreCase?"toLowerCase":"substr";
if(text[_263](0).indexOf(this.focusNode.value[_263](0))==0){
var cpos=this._getCaretPos(fn);
if((cpos+1)>fn.value.length){
fn.value=text;
dijit.selectInputText(fn,cpos);
}
}else{
fn.value=text;
dijit.selectInputText(fn);
}
},_openResultList:function(_264,_265){
this._fetchHandle=null;
if(this.disabled||this.readOnly||(_265.query[this.searchAttr]!=this._lastQuery)){
return;
}
var _266=this.dropDown._highlighted_option&&dojo.hasClass(this.dropDown._highlighted_option,"dijitMenuItemSelected");
this.dropDown.clearResultList();
if(!_264.length&&!this._maxOptions){
this.closeDropDown();
return;
}
_265._maxOptions=this._maxOptions;
var _267=this.dropDown.createOptions(_264,_265,dojo.hitch(this,"_getMenuLabelFromItem"));
this._showResultList();
if(_265.direction){
if(1==_265.direction){
this.dropDown.highlightFirstOption();
}else{
if(-1==_265.direction){
this.dropDown.highlightLastOption();
}
}
if(_266){
this._announceOption(this.dropDown.getHighlightedOption());
}
}else{
if(this.autoComplete&&!this._prev_key_backspace&&!/^[*]+$/.test(_265.query[this.searchAttr])){
this._announceOption(_267[1]);
}
}
},_showResultList:function(){
this.closeDropDown(true);
this.displayMessage("");
this.openDropDown();
dijit.setWaiState(this.domNode,"expanded","true");
},loadDropDown:function(_268){
this._startSearchAll();
},isLoaded:function(){
return false;
},closeDropDown:function(){
this._abortQuery();
if(this._opened){
this.inherited(arguments);
dijit.setWaiState(this.domNode,"expanded","false");
dijit.removeWaiState(this.focusNode,"activedescendant");
}
},_setBlurValue:function(){
var _269=this.get("displayedValue");
var pw=this.dropDown;
if(pw&&(_269==pw._messages["previousMessage"]||_269==pw._messages["nextMessage"])){
this._setValueAttr(this._lastValueReported,true);
}else{
if(typeof this.item=="undefined"){
this.item=null;
this.set("displayedValue",_269);
}else{
if(_269===""){
this.item=null;
this.set("displayedValue",_269);
}else{
if(this.value!=this._lastValueReported){
dijit.form._FormValueWidget.prototype._setValueAttr.call(this,this.value,true);
}
this._refreshState();
}
}
}
},_onBlur:function(){
this.closeDropDown();
this.inherited(arguments);
},_setItemAttr:function(item,_26a,_26b){
if(!_26b){
_26b=this.store.getValue(item,this.searchAttr);
}
var _26c=this._getValueField()!=this.searchAttr?this.store.getIdentity(item):_26b;
this._set("item",item);
dijit.form.ComboBox.superclass._setValueAttr.call(this,_26c,_26a,_26b);
},_announceOption:function(node){
if(!node){
return;
}
var _26d;
if(node==this.dropDown.nextButton||node==this.dropDown.previousButton){
_26d=node.innerHTML;
this.item=undefined;
this.value="";
}else{
_26d=this.store.getValue(node.item,this.searchAttr).toString();
this.set("item",node.item,false,_26d);
}
this.focusNode.value=this.focusNode.value.substring(0,this._lastInput.length);
dijit.setWaiState(this.focusNode,"activedescendant",dojo.attr(node,"id"));
this._autoCompleteText(_26d);
},_selectOption:function(evt){
if(evt){
this._announceOption(evt.target);
}
this.closeDropDown();
this._setCaretPos(this.focusNode,this.focusNode.value.length);
dijit.form._FormValueWidget.prototype._setValueAttr.call(this,this.value,true);
},_startSearchAll:function(){
this._startSearch("");
},_startSearchFromInput:function(){
this._startSearch(this.focusNode.value.replace(/([\\\*\?])/g,"\\$1"));
},_getQueryString:function(text){
return dojo.string.substitute(this.queryExpr,[text]);
},_startSearch:function(key){
if(!this.dropDown){
var _26e=this.id+"_popup",_26f=dojo.getObject(this.dropDownClass,false);
this.dropDown=new _26f({onChange:dojo.hitch(this,this._selectOption),id:_26e,dir:this.dir});
dijit.removeWaiState(this.focusNode,"activedescendant");
dijit.setWaiState(this.textbox,"owns",_26e);
}
var _270=dojo.clone(this.query);
this._lastInput=key;
this._lastQuery=_270[this.searchAttr]=this._getQueryString(key);
this.searchTimer=setTimeout(dojo.hitch(this,function(_271,_272){
this.searchTimer=null;
var _273={queryOptions:{ignoreCase:this.ignoreCase,deep:true},query:_271,onBegin:dojo.hitch(this,"_setMaxOptions"),onComplete:dojo.hitch(this,"_openResultList"),onError:function(_274){
_272._fetchHandle=null;
console.error("dijit.form.ComboBox: "+_274);
_272.closeDropDown();
},start:0,count:this.pageSize};
dojo.mixin(_273,_272.fetchProperties);
this._fetchHandle=_272.store.fetch(_273);
var _275=function(_276,_277){
_276.start+=_276.count*_277;
_276.direction=_277;
this._fetchHandle=this.store.fetch(_276);
this.focus();
};
this._nextSearch=this.dropDown.onPage=dojo.hitch(this,_275,this._fetchHandle);
},_270,this),this.searchDelay);
},_setMaxOptions:function(size,_278){
this._maxOptions=size;
},_getValueField:function(){
return this.searchAttr;
},constructor:function(){
this.query={};
this.fetchProperties={};
},postMixInProperties:function(){
if(!this.store){
var _279=this.srcNodeRef;
this.store=new dijit.form._ComboBoxDataStore(_279);
if(!("value" in this.params)){
var item=(this.item=this.store.fetchSelectedItem());
if(item){
var _27a=this._getValueField();
this.value=this.store.getValue(item,_27a);
}
}
}
this.inherited(arguments);
},postCreate:function(){
var _27b=dojo.query("label[for=\""+this.id+"\"]");
if(_27b.length){
_27b[0].id=(this.id+"_label");
dijit.setWaiState(this.domNode,"labelledby",_27b[0].id);
}
this.inherited(arguments);
},_setHasDownArrowAttr:function(val){
this.hasDownArrow=val;
this._buttonNode.style.display=val?"":"none";
},_getMenuLabelFromItem:function(item){
var _27c=this.labelFunc(item,this.store),_27d=this.labelType;
if(this.highlightMatch!="none"&&this.labelType=="text"&&this._lastInput){
_27c=this.doHighlight(_27c,this._escapeHtml(this._lastInput));
_27d="html";
}
return {html:_27d=="html",label:_27c};
},doHighlight:function(_27e,find){
var _27f=(this.ignoreCase?"i":"")+(this.highlightMatch=="all"?"g":""),i=this.queryExpr.indexOf("${0}");
find=dojo.regexp.escapeString(find);
return this._escapeHtml(_27e).replace(new RegExp((i==0?"^":"")+"("+find+")"+(i==(this.queryExpr.length-4)?"$":""),_27f),"<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
},_escapeHtml:function(str){
str=String(str).replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
return str;
},reset:function(){
this.item=null;
this.inherited(arguments);
},labelFunc:function(item,_280){
return _280.getValue(item,this.labelAttr||this.searchAttr).toString();
}});
dojo.declare("dijit.form._ComboBoxMenu",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{templateString:"<ul class='dijitReset dijitMenu' dojoAttachEvent='onmousedown:_onMouseDown,onmouseup:_onMouseUp,onmouseover:_onMouseOver,onmouseout:_onMouseOut' style='overflow: \"auto\"; overflow-x: \"hidden\";'>"+"<li class='dijitMenuItem dijitMenuPreviousButton' dojoAttachPoint='previousButton' role='option'></li>"+"<li class='dijitMenuItem dijitMenuNextButton' dojoAttachPoint='nextButton' role='option'></li>"+"</ul>",_messages:null,baseClass:"dijitComboBoxMenu",postMixInProperties:function(){
this.inherited(arguments);
this._messages=dojo.i18n.getLocalization("dijit.form","ComboBox",this.lang);
},buildRendering:function(){
this.inherited(arguments);
this.previousButton.innerHTML=this._messages["previousMessage"];
this.nextButton.innerHTML=this._messages["nextMessage"];
},_setValueAttr:function(_281){
this.value=_281;
this.onChange(_281);
},onChange:function(_282){
},onPage:function(_283){
},onClose:function(){
this._blurOptionNode();
},_createOption:function(item,_284){
var _285=dojo.create("li",{"class":"dijitReset dijitMenuItem"+(this.isLeftToRight()?"":" dijitMenuItemRtl"),role:"option"});
var _286=_284(item);
if(_286.html){
_285.innerHTML=_286.label;
}else{
_285.appendChild(dojo.doc.createTextNode(_286.label));
}
if(_285.innerHTML==""){
_285.innerHTML="&nbsp;";
}
_285.item=item;
return _285;
},createOptions:function(_287,_288,_289){
this.previousButton.style.display=(_288.start==0)?"none":"";
dojo.attr(this.previousButton,"id",this.id+"_prev");
dojo.forEach(_287,function(item,i){
var _28a=this._createOption(item,_289);
if(item.indent){
dojo.addClass(_28a,"indentOption"+((item.indent===true)?"":item.indent));
}
dojo.attr(_28a,"id",this.id+i);
this.domNode.insertBefore(_28a,this.nextButton);
},this);
var _28b=false;
if(_288._maxOptions&&_288._maxOptions!=-1){
if((_288.start+_288.count)<_288._maxOptions){
_28b=true;
}else{
if((_288.start+_288.count)>_288._maxOptions&&_288.count==_287.length){
_28b=true;
}
}
}else{
if(_288.count==_287.length){
_28b=true;
}
}
this.nextButton.style.display=_28b?"":"none";
dojo.attr(this.nextButton,"id",this.id+"_next");
return this.domNode.childNodes;
},clearResultList:function(){
while(this.domNode.childNodes.length>2){
this.domNode.removeChild(this.domNode.childNodes[this.domNode.childNodes.length-2]);
}
this._blurOptionNode();
},_onMouseDown:function(evt){
dojo.stopEvent(evt);
},_onMouseUp:function(evt){
if(evt.target===this.domNode||!this._highlighted_option){
return;
}else{
if(evt.target==this.previousButton){
this._blurOptionNode();
this.onPage(-1);
}else{
if(evt.target==this.nextButton){
this._blurOptionNode();
this.onPage(1);
}else{
var tgt=evt.target;
while(!tgt.item){
tgt=tgt.parentNode;
}
this._setValueAttr({target:tgt},true);
}
}
}
},_onMouseOver:function(evt){
if(evt.target===this.domNode){
return;
}
var tgt=evt.target;
if(!(tgt==this.previousButton||tgt==this.nextButton)){
while(!tgt.item){
tgt=tgt.parentNode;
}
}
this._focusOptionNode(tgt);
},_onMouseOut:function(evt){
if(evt.target===this.domNode){
return;
}
this._blurOptionNode();
},_focusOptionNode:function(node){
if(this._highlighted_option!=node){
this._blurOptionNode();
this._highlighted_option=node;
dojo.addClass(this._highlighted_option,"dijitMenuItemSelected");
}
},_blurOptionNode:function(){
if(this._highlighted_option){
dojo.removeClass(this._highlighted_option,"dijitMenuItemSelected");
this._highlighted_option=null;
}
},_highlightNextOption:function(){
if(!this.getHighlightedOption()){
var fc=this.domNode.firstChild;
this._focusOptionNode(fc.style.display=="none"?fc.nextSibling:fc);
}else{
var ns=this._highlighted_option.nextSibling;
if(ns&&ns.style.display!="none"){
this._focusOptionNode(ns);
}else{
this.highlightFirstOption();
}
}
dojo.window.scrollIntoView(this._highlighted_option);
},highlightFirstOption:function(){
var _28c=this.domNode.firstChild;
var _28d=_28c.nextSibling;
this._focusOptionNode(_28d.style.display=="none"?_28c:_28d);
dojo.window.scrollIntoView(this._highlighted_option);
},highlightLastOption:function(){
this._focusOptionNode(this.domNode.lastChild.previousSibling);
dojo.window.scrollIntoView(this._highlighted_option);
},_highlightPrevOption:function(){
if(!this.getHighlightedOption()){
var lc=this.domNode.lastChild;
this._focusOptionNode(lc.style.display=="none"?lc.previousSibling:lc);
}else{
var ps=this._highlighted_option.previousSibling;
if(ps&&ps.style.display!="none"){
this._focusOptionNode(ps);
}else{
this.highlightLastOption();
}
}
dojo.window.scrollIntoView(this._highlighted_option);
},_page:function(up){
var _28e=0;
var _28f=this.domNode.scrollTop;
var _290=dojo.style(this.domNode,"height");
if(!this.getHighlightedOption()){
this._highlightNextOption();
}
while(_28e<_290){
if(up){
if(!this.getHighlightedOption().previousSibling||this._highlighted_option.previousSibling.style.display=="none"){
break;
}
this._highlightPrevOption();
}else{
if(!this.getHighlightedOption().nextSibling||this._highlighted_option.nextSibling.style.display=="none"){
break;
}
this._highlightNextOption();
}
var _291=this.domNode.scrollTop;
_28e+=(_291-_28f)*(up?-1:1);
_28f=_291;
}
},pageUp:function(){
this._page(true);
},pageDown:function(){
this._page(false);
},getHighlightedOption:function(){
var ho=this._highlighted_option;
return (ho&&ho.parentNode)?ho:null;
},handleKey:function(evt){
switch(evt.charOrCode){
case dojo.keys.DOWN_ARROW:
this._highlightNextOption();
return false;
case dojo.keys.PAGE_DOWN:
this.pageDown();
return false;
case dojo.keys.UP_ARROW:
this._highlightPrevOption();
return false;
case dojo.keys.PAGE_UP:
this.pageUp();
return false;
default:
return true;
}
}});
dojo.declare("dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit.form.ComboBoxMixin],{_setValueAttr:function(_292,_293,_294){
this._set("item",null);
var self=this;
this.store.fetchItemByIdentity({identity:_292,onItem:function(item){
self._set("item",item);
}});
if(!_292){
_292="";
}
dijit.form.ValidationTextBox.prototype._setValueAttr.call(this,_292,_293,_294);
}});
dojo.declare("dijit.form._ComboBoxDataStore",null,{constructor:function(root){
this.root=root;
if(root.tagName!="SELECT"&&root.firstChild){
root=dojo.query("select",root);
if(root.length>0){
root=root[0];
}else{
this.root.innerHTML="<SELECT>"+this.root.innerHTML+"</SELECT>";
root=this.root.firstChild;
}
this.root=root;
}
dojo.query("> option",root).forEach(function(node){
node.innerHTML=dojo.trim(node.innerHTML);
});
},getValue:function(item,_295,_296){
return (_295=="value")?item.value:(item.innerText||item.textContent||"");
},isItemLoaded:function(_297){
return true;
},getFeatures:function(){
return {"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
},_fetchItems:function(args,_298,_299){
if(!args.query){
args.query={};
}
if(!args.query.name){
args.query.name="";
}
if(!args.queryOptions){
args.queryOptions={};
}
var _29a=dojo.data.util.filter.patternToRegExp(args.query.name,args.queryOptions.ignoreCase),_29b=dojo.query("> option",this.root).filter(function(_29c){
return (_29c.innerText||_29c.textContent||"").match(_29a);
});
if(args.sort){
_29b.sort(dojo.data.util.sorter.createSortFunction(args.sort,this));
}
_298(_29b,args);
},close:function(_29d){
return;
},getLabel:function(item){
return item.innerHTML;
},getIdentity:function(item){
return dojo.attr(item,"value");
},fetchItemByIdentity:function(args){
var item=dojo.query("> option[value='"+args.identity+"']",this.root)[0];
args.onItem(item);
},fetchSelectedItem:function(){
var root=this.root,si=root.selectedIndex;
return typeof si=="number"?dojo.query("> option:nth-child("+(si!=-1?si+1:1)+")",root)[0]:null;
}});
dojo.extend(dijit.form._ComboBoxDataStore,dojo.data.util.simpleFetch);
}
if(!dojo._hasResource["dijit.form.FilteringSelect"]){
dojo._hasResource["dijit.form.FilteringSelect"]=true;
dojo.provide("dijit.form.FilteringSelect");
dojo.declare("dijit.form.FilteringSelect",[dijit.form.MappedTextBox,dijit.form.ComboBoxMixin],{required:true,_lastDisplayedValue:"",_isValidSubset:function(){
return this._opened;
},isValid:function(){
return this.item||(!this.required&&this.get("displayedValue")=="");
},_refreshState:function(){
if(!this.searchTimer){
this.inherited(arguments);
}
},_callbackSetLabel:function(_29e,_29f,_2a0){
if((_29f&&_29f.query[this.searchAttr]!=this._lastQuery)||(!_29f&&_29e.length&&this.store.getIdentity(_29e[0])!=this._lastQuery)){
return;
}
if(!_29e.length){
this.valueNode.value="";
dijit.form.TextBox.superclass._setValueAttr.call(this,"",_2a0||(_2a0===undefined&&!this._focused));
this._set("item",null);
this.validate(this._focused);
}else{
this.set("item",_29e[0],_2a0);
}
},_openResultList:function(_2a1,_2a2){
if(_2a2.query[this.searchAttr]!=this._lastQuery){
return;
}
dijit.form.ComboBoxMixin.prototype._openResultList.apply(this,arguments);
if(this.item===undefined){
this.validate(true);
}
},_getValueAttr:function(){
return this.valueNode.value;
},_getValueField:function(){
return "value";
},_setValueAttr:function(_2a3,_2a4){
if(!this._onChangeActive){
_2a4=null;
}
this._lastQuery=_2a3;
if(_2a3===null||_2a3===""){
this._setDisplayedValueAttr("",_2a4);
return;
}
var self=this;
this.store.fetchItemByIdentity({identity:_2a3,onItem:function(item){
self._callbackSetLabel(item?[item]:[],undefined,_2a4);
}});
},_setItemAttr:function(item,_2a5,_2a6){
this.inherited(arguments);
this.valueNode.value=this.value;
this._lastDisplayedValue=this.textbox.value;
},_getDisplayQueryString:function(text){
return text.replace(/([\\\*\?])/g,"\\$1");
},_setDisplayedValueAttr:function(_2a7,_2a8){
if(_2a7==null){
_2a7="";
}
if(!this._created){
if(!("displayedValue" in this.params)){
return;
}
_2a8=false;
}
if(this.store){
this.closeDropDown();
var _2a9=dojo.clone(this.query);
this._lastQuery=_2a9[this.searchAttr]=this._getDisplayQueryString(_2a7);
this.textbox.value=_2a7;
this._lastDisplayedValue=_2a7;
this._set("displayedValue",_2a7);
var _2aa=this;
var _2ab={query:_2a9,queryOptions:{ignoreCase:this.ignoreCase,deep:true},onComplete:function(_2ac,_2ad){
_2aa._fetchHandle=null;
dojo.hitch(_2aa,"_callbackSetLabel")(_2ac,_2ad,_2a8);
},onError:function(_2ae){
_2aa._fetchHandle=null;
console.error("dijit.form.FilteringSelect: "+_2ae);
dojo.hitch(_2aa,"_callbackSetLabel")([],undefined,false);
}};
dojo.mixin(_2ab,this.fetchProperties);
this._fetchHandle=this.store.fetch(_2ab);
}
},undo:function(){
this.set("displayedValue",this._lastDisplayedValue);
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.Select"]){
dojo._hasResource["wm.base.widget.Editors.Select"]=true;
dojo.provide("wm.base.widget.Editors.Select");
dojo.declare("wm.SelectMenu",wm.DataSetEditor,{indentField:"",placeHolder:"",_storeNameField:"_selectMenuName",pageSize:20,allowNone:false,autoComplete:true,hasDownArrow:true,restrictValues:true,_selectedData:null,displayMenuExpression:"",init:function(){
if(wm.isMobile){
this.manageHistory=true;
}
this.inherited(arguments);
},handleBack:function(_2af){
this.editor.closeDropDown();
this.editor.dropDown.hide();
return true;
},generateStore:function(){
if(wm.isMobile){
return;
}
var data=[];
if(this.dataSet){
var _2b0=this.dataSet.getCount();
for(var i=0;i<_2b0;i++){
var v=this.dataSet.getItem(i);
var item={id:i,name:this._getDisplayData(v)};
if(this.displayMenuExpression){
item.menuField=wm.expression.getValue(this.displayMenuExpression,v,this.owner);
}
if(this.indentField){
item.indent=Boolean(this.dataSet.getItem(i).getValue(this.indentField));
}
data.push(item);
}
}
if(this.allowNone){
data.unshift({id:-1,name:""});
}
return new wm.base.data.SimpleStore(data,"name",this);
},getEditorProps:function(_2b1,_2b2){
var _2b3=this.generateStore();
return dojo.mixin(this.inherited(arguments),{placeHolder:this.placeHolder,required:this.required,store:_2b3,autoComplete:this.autoComplete,hasDownArrow:this.hasDownArrow,searchAttr:"name",labelAttr:this.displayMenuExpression?"menuField":null,labelType:this.displayMenuExpression?"html":"text",pageSize:this.pageSize?this.pageSize:Infinity},_2b2||{});
},_createEditor:function(_2b4,_2b5){
var e;
if(wm.isMobile){
e=new wm.dijit.form.ComboBox(this.getEditorProps(_2b4,_2b5));
e.owner=this;
dojo.attr(e.focusNode,"readonly",true);
}else{
if(this.restrictValues){
e=new dijit.form.FilteringSelect(this.getEditorProps(_2b4,_2b5));
}else{
e=new dijit.form.ComboBox(this.getEditorProps(_2b4,_2b5));
}
}
return e;
},showPopup:function(){
if(this.editor){
this.editor.openDropDown();
}
},setPlaceHolder:function(_2b6){
this.placeHolder=_2b6;
if(this.editor){
this.editor.attr("placeHolder",_2b6);
}
},setRestrictValues:function(_2b7){
var _2b8=this.getEditorValue();
var _2b9=this.restrictValues;
this.restrictValues=_2b7;
if(this.editor&&_2b9!=_2b7){
this.createEditor();
this.setEditorValue(_2b8);
}
},_onSetEditorValueFailed:function(_2ba){
if(!this.restrictValues){
this.editor.set("displayedValue",_2ba);
}
},setDataSet:function(_2bb,_2bc){
this._inSetDataSet=true;
this.inherited(arguments);
if(this.editor){
this.editor.set("store",this.generateStore());
if(!_2bc){
this.setEditorValue(this.dataValue);
}
}
delete this._inSetDataSet;
},clear:function(){
if(this.editor){
var _2bd=this.editor.get("displayedValue");
if(this.restrictValues){
this.editor.set("value","",false);
}else{
this.editor.set("value",undefined,false);
}
this.editor.item=null;
this.selectedItem.clearData();
this._lastValue=this.makeEmptyValue();
if(!this._inSetDataSet){
this.displayValue="";
this.dataValue=null;
this.editor._lastValueReported="";
this.updateReadonlyValue();
this.resetState();
}
if(!this._cupdating&&_2bd&&this.hasValues()){
this.changed();
}
}else{
this.resetState();
}
},validationEnabled:function(){
return this.restrictValues||this.required;
},_getValidatorNode:function(){
var _2be=dojo.query(".dijitValidationContainer",this.editor.domNode)[0];
_2be.firstChild.value="";
return _2be;
},blurred:function(){
this.inherited(arguments);
var _2bf=this.displayValue;
if(this.getDisplayValue()!=_2bf){
this.doOnchange();
}
},getInvalid:function(){
if(!this.validationEnabled()){
if(this.required&&!this.getDataValue()){
return true;
}
return false;
}
var _2c0;
if(!this.editor||this.editor._focused){
_2c0=true;
}else{
var _2c1=this.getDataValue();
var _2c2=Boolean(_2c1);
var _2c3=this.getDisplayValue();
this._isValid=(!this.restrictValues||(_2c3&&_2c2||!_2c3));
if(this.readonly){
_2c0=true;
}else{
if(this.required){
if(!this.restrictValues&&!_2c3){
_2c0=false;
}else{
if(this.restrictValues&&!_2c2){
_2c0=false;
}else{
_2c0=true;
}
}
}else{
if(this.restrictValues&&_2c3&&!_2c2){
_2c0=false;
}else{
_2c0=true;
}
}
}
}
if(_2c0){
this.validatorNode.style.display="none";
}
return !_2c0;
},getSelectedIndex:function(){
if(this.editor.item){
return this.editor.item.id;
}
return -1;
},getEditorValue:function(){
var _2c4=this.inherited(arguments);
if(!_2c4&&!this.restrictValues){
_2c4=this.editor.get("displayedValue");
}
return (_2c4||_2c4===0)?_2c4:this.makeEmptyValue();
},getDisplayValue:function(){
if(this.editor){
return this.editor.get("displayedValue");
}
return null;
},blurred:function(){
this.changed();
this.doOnblur();
},changed:function(){
if(wm.isMobile&&this.editor&&this.editor.focusNode==document.activeElement){
this.editor.focusNode.blur();
return;
}
var item;
var _2c5;
if(this.editor){
item=this.editor.get("item");
}
var _2c6=null;
if(this.editor){
var _2c7=this.editor.get("displayedValue");
}
if(item&&wm.isMobile){
this.selectedItem.setData(item);
}else{
if(item&&_2c7==item.name){
_2c5=item.id;
var _2c6=this.dataSet?this.dataSet.getItem(_2c5):null;
this.selectedItem.setData(_2c6);
}else{
this.selectedItem.setData(null);
}
}
if(this.editor&&this.editor._lastValueReported===""&&_2c7!==""){
this.editor._lastValueReported=_2c7;
}
return this.inherited(arguments);
},selectItem:function(_2c8){
if(!this.editor){
return;
}
var item=this.dataSet.getItem(_2c8);
this.selectedItem.setData(item);
this.editor.set("value",this._getDisplayData(item),false);
if(wm.isMobile){
this.editor.item=item.getData();
}
}});
dojo.declare("wm.Lookup",wm.SelectMenu,{dataType:"",dataField:"",autoDataSet:true,startUpdate:true,maxResults:500,ignoreCase:true,postInit:function(){
if(this.autoDataSet&&this.formField){
this.createDataSet();
}else{
if(!this.autoDataSet){
this.startUpdate=false;
}
}
this.inherited(arguments);
},createDataSet:function(){
wm.fire(this.$.liveVariable,"destroy");
var _2c9=this.getParentForm();
if(_2c9){
if(wm.isInstanceType(_2c9,wm.LiveForm)&&!_2c9.dataSet){
return;
}
if(wm.isInstanceType(_2c9,wm.DataForm)&&!_2c9.dataSet&&!_2c9.type){
return;
}
if(!wm.getFormLiveView||!wm.getFormField){
return;
}
var view=wm.getFormLiveView(_2c9);
var _2ca=wm.isInstanceType(_2c9,wm.DataForm)?_2c9.type:_2c9.dataSet&&_2c9.dataSet.type;
var ff=wm.getFormField(this);
try{
var _2cb;
if(this.dataType){
_2cb=this.dataType;
}else{
if(_2c9 instanceof wm.ServiceInputForm){
var _2cc=_2c9.dataOutput._dataSchema;
if(_2cc){
_2cb=_2cc[ff]?_2cc[ff].type:null;
}
}else{
if(_2ca&&_2ca!="any"){
_2cb=wm.typeManager.getType(_2ca).fields[ff].type;
}else{
_2cb="string";
}
}
}
}
catch(e){
}
if(view){
view.addRelated(ff);
}
var lv=this.dataSet=new wm.LiveVariable({name:"liveVariable",owner:this,autoUpdate:false,startUpdate:false,_rootField:view?ff:null,liveView:view,liveSource:_2cb,maxResults:this.maxResults,ignoreCase:this.ignoreCase,refireOnDbChange:true,orderBy:this.orderBy});
this.selectedItem.setType(this.dataSet.type);
this.createDataSetWire(lv);
}
},createDataSetWire:function(_2cd){
if(!this.$.binding){
new wm.Binding({name:"binding",owner:this});
}
var w=this._dataSetWire=new wm.Wire({name:"dataFieldWire",target:this,owner:this.$.binding,source:_2cd.getId(),targetProperty:"dataSet"});
w.connectWire();
},setAutoDataSet:function(_2ce){
this.autoDataSet=_2ce;
if(this.autoDataSet){
this.createDataSet();
if(this.dataSet){
var _2cf=this.debugAutoSetData();
this.update();
if(_2cf){
app.debugDialog.endLogEvent(_2cf);
}
}
}
},debugAutoSetData:function(){
if(app.debugDialog){
var _2d0=app.debugDialog.newLogEvent({eventType:"update",sourceDescription:"Initializing "+this.getRuntimeId(),resultDescription:this.getRuntimeId()+".setAutoDataSet() called to populate Lookup editor from server",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId(),method:"update"});
return _2d0;
}
},_getFormSource:function(_2d1){
if(this.isAncestorInstanceOf(wm.RelatedEditor)){
var w=wm.data.getPropWire(_2d1,"dataSet");
return w&&w.source&&this.getRoot().getValueById(w.source);
}else{
var lf=this.isAncestorInstanceOf(wm.LiveForm)||this.isAncestorInstanceOf(wm.DataForm);
if(lf&&this.formField){
return lf.dataSet.getValue(this.formField);
}
}
},changed:function(){
if(this.isUpdating()){
return;
}
this.inherited(arguments);
if(wm.getParentForm){
var f=wm.getParentForm(this);
}
if(this.relationshipName&&!this.selectedItem.isEmpty()){
var _2d2=this.getParentForm();
var _2d3=_2d2.getParentForm();
_2d3.dataOutput.setValue(this.relationshipName,this.selectedItem);
}
}});
if(wm.isMobile){
wm.Lookup.extend({_createEditor:function(){
var e=this.inherited(arguments);
this.connect(e,"openDropDown",this,"_onOpenDropDown");
return e;
},_onOpenDropDown:function(){
this.inherited(arguments);
}});
}
dojo.declare("wm.FilteringLookup",wm.Lookup,{startUpdate:false,restrictValues:true,changeOnKey:true,pageSize:25,autoComplete:true,hasDownArrow:false,placeHolder:"Start typing to find matches",filterField:"",prepare:function(){
this.inherited(arguments);
this.maxResults=this.pageSize;
this.filterField=this.displayField;
this.orderBy="asc: "+this.displayField;
if(!this.autoDataSet){
this.changeOnKey=true;
}
},_onchange:function(_2d4){
if(this.disabled||this.readonly||!this.isActive()){
return;
}
var _2d5=this.autoDataSet&&this.getParentForm();
var _2d6=_2d4||this.editor.get("displayedValue");
if(_2d5){
var _2d7=this.dataSet.filter.getValue(this.filterField);
}
if(!this.editor.get("item")){
this.dataValue="";
}
if(_2d6!=this._lastQueryValue){
this._lastQueryValue=_2d6;
if(_2d5){
this.dataSet.filter.setValue(this.filterField,_2d6);
if(_2d6===undefined||_2d6===null||_2d6===""){
this.dataSet.setData([]);
}else{
this.dataSet.update();
}
}else{
this.displayValue=_2d6;
this.valueChanged("displayValue",_2d6);
this.dataSet.update();
}
}
},getDisplayValue:function(){
if(this.editor){
return this.editor.get("displayedValue");
}else{
return this.inherited(arguments);
}
},setDataValue:function(_2d8){
if(this.dataSet&&_2d8){
this.dataSet.setData(_2d8?[_2d8]:null);
}
this.inherited(arguments);
},setPageSize:function(_2d9){
this.maxResults=this.pageSize=_2d9;
},isActive:function(){
return this.editor._focused||this.editor.dropDown&&this.editor.dropDown.domNode.parentNode&&this.editor.dropDown.domNode.parentNode.style.display!="none";
}});
if(!wm.isMobile){
wm.FilteringLookup.extend({getEditorProps:function(_2da,_2db){
var p=this.inherited(arguments);
p.queryExpr="*";
return p;
},setDataSet:function(_2dc){
this.inherited(arguments,[_2dc,true]);
if(this.dataSet&&!this.dataSet.isEmpty()&&this.isActive()){
wm.job(this.getRuntimeId()+".handleSetDataSet",1,dojo.hitch(this,function(){
if(this.editor.declaredClass!="wm.dijit.form.ComboBox"){
var item=this.editor.get("item");
if(item){
if(item[this._storeNameField]!=this.editor.get("displayedValue")){
item=null;
}
}
if(!item&&this.editor.get("displayedValue")){
this.editor._startSearchFromInput();
}
this._onchange();
}
}));
}
},doOnchange:function(){
this._onchange();
if(this.editor.get("item")){
this.inherited(arguments);
}
},_end:0});
}else{
wm.FilteringLookup.extend({getEditorProps:function(_2dd,_2de){
var p=this.inherited(arguments);
p.noFilter=true;
delete p.placeHolder;
return p;
},setDataSet:function(_2df){
this.inherited(arguments,[_2df,true]);
if(this.dataSet){
if(this.editor&&this.editor.dropDown){
this.editor.listSet.setDataSet(this.dataSet);
}
}
},_onOpenDropDown:function(){
var l=this.editor.listSet;
l.searchBar.setPlaceHolder(this.placeHolder);
if(this._searchBarChangeConnect){
dojo.disconnect(this._searchBarChangeConnect);
wm.Array.removeElement(this._connections,this._searchBarChangeConnect);
}
this._searchBarChangeConnect=l.searchBar.connect(l.searchBar,"onchange",this,function(_2e0,_2e1){
this._onchange(_2e0);
});
},_end:0});
}
dojo.declare("wm.dijit.form.ComboBox",[dijit.form.ValidationTextBox,dijit._HasDropDown],{baseClass:"dijitTextBox dijitComboBox",popupClass:"wm.ListSet",forceWidth:false,autoWidth:false,value:"",noFilter:false,templateString:dojo.cache("dijit.form","templates/DropDownBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\r\n\tid=\"widget_${id}\"\r\n\trole=\"combobox\"\r\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\r\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\r\n\t\t>\r\n\t\t\t    <!-- Copyright (C) 2012-2013 CloudJee, Inc. All rights reserved. Licensed under the Apache License 2.0 - http://www.apache.org/licenses/LICENSE-2.0\r\n\t\t\t      WaveMaker: Unfortunate hack to replace input with span to avoid focus issues with mobile that cause keyboards to pop open -->\r\n<${buttonNodeType} class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t\t${_buttonInputDisabled}\r\n\t/></div\r\n\t><div class='dijitReset dijitValidationContainer'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t/></div\r\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\r\n\t\t\tdojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"\r\n\t/></div\r\n></div>\r\n"),hasDownArrow:true,openOnClick:true,buildRendering:function(){
this.inherited(arguments);
this._buttonNode=this.domNode;
},createDropDown:function(){
this.dropDown=new wm.Dialog({owner:this.owner,corner:wm.device=="phone"?"cc":"cc",fixPositionNode:wm.device=="tablet"?this.focusNode:undefined,width:wm.device=="phone"?"100%":"350px",height:wm.device=="phone"?"100%":"600px",border:"1",borderColor:"#666",useContainerWidget:true,padding:"0",margin:"10",title:"",destroyRecursive:function(){
if(!this.isDestroyed){
this.destroy();
}
}});
this.dropDown.dialogScrim.connect(this.dropDown.dialogScrim.domNode,wm.isFakeMobile?"onclick":"ontouchstart",this.dropDown,"hide");
var c=this.dropDown.containerWidget;
c.setPadding("0");
c.setMargin("0");
this.listSet=wm.ListSet({owner:this.dropDown,parent:c,_noFilter:this.noFilter,selectionMode:"radio",captionAlign:"left",captionPosition:"top",caption:"",border:"0",editorBorder:false,padding:"0",width:"100%",height:"100%",onchange:dojo.hitch(this,function(_2e2,_2e3,_2e4){
if(this._cupdating||_2e4){
return;
}
var data=this.owner.allowNone&&this.listSet.grid.getSelectedIndex()==0?null:this.listSet.grid.selectedItem.getData();
var _2e5=data?this.owner._getDisplayData(data):null;
if(data||this.listSet.grid.getSelectedIndex()==0){
this.set("value",_2e5);
if(data){
data.name=this.listSet.grid.getCell(this.listSet.grid.getSelectedIndex(),"name");
}
this.set("item",data);
this.displayedValue=_2e5;
this.owner.changed();
this.closeDropDown();
this.dropDown.hide();
}
})});
this.listSet.grid.setSelectionMode("radio");
this.closeButton=new wm.ToolButton({owner:this.owner,name:"closeButton",border:"1",borderColor:"#222",_classes:{domNode:["SelectCloseButton"]},width:"30px",height:"100%",margin:"4",padding:"0 4 0 4",parent:this.dropDown.titleBar,caption:"X",onclick:dojo.hitch(this,function(){
this.closeDropDown();
this.dropDown.hide();
})});
},openDropDown:function(_2e6){
app.addHistory({id:this.owner.getRuntimeId(),options:{},title:"Hide Popup"});
if(!this.dropDown){
this.createDropDown();
}
this.listSet.setShowing(false);
this._cupdating=true;
this.dropDown.setTitle(this.owner.caption);
this.listSet.setDataSet(null);
this.dropDown.setShowing(true);
if(this.owner.displayExpression||this.owner.displayMenuExpression){
this.listSet.setDisplayField("");
this.listSet.setDisplayExpression(this.owner.displayMenuExpression||this.owner.displayExpression);
}else{
this.listSet.setDisplayExpression("");
this.listSet.setDisplayField(this.owner.displayField);
}
if(this.owner.allowNone){
if(!this.owner._dataSet){
this.owner._dataSet=new wm.Variable();
}
this.owner._dataSet.setDataSet(this.owner.dataSet);
var _2e7={};
for(var _2e8 in this.owner._dataSet._dataSchema){
_2e7[_2e8]="";
}
this.owner._dataSet.addItem(_2e7,0);
this.listSet.setDataSet(this.owner._dataSet);
}else{
this.listSet.setDataSet(this.owner.dataSet);
}
wm.onidle(this,function(){
this.listSet.setShowing(true);
this.listSet.grid._render();
this._cupdating=true;
this.listSet.grid._cupdating=true;
this.listSet.setDataValue(this.owner.dataValue);
this.listSet.grid._cupdating=false;
this._cupdating=false;
});
this._opened=true;
return true;
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_editors",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
