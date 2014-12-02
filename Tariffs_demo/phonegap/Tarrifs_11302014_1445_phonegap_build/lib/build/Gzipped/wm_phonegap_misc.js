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

dojo.provide("wm.compressed.wm_phonegap_misc");
if(!dojo._hasResource["wm.base.components.NavigationService"]){
dojo._hasResource["wm.base.components.NavigationService"]=true;
dojo.provide("wm.base.components.NavigationService");
dojo.declare("wm.NavigationService",wm.Service,{layer:"",layers:"",operation:"",_operations:{gotoLayer:{parameters:{layer:{type:"wm.Layer"},showOnlyParentLayer:{type:"boolean"}},returnType:"any",hint:"This operations displays the selected layer."},nextLayer:{parameters:{layers:{type:"wm.Layers"}},returnType:"any",hint:"The operation displays the next layer in the selected layers widget."},previousLayer:{parameters:{layers:{type:"wm.Layers"}},returnType:"any",hint:"The operation displays the previous layer in the selected layers widget."},gotoPage:{parameters:{pageName:{type:"string"}},returnType:"any",hint:"This operation displays a different page and requires a pageName."},gotoHomePage:{returnType:"any",hint:"This operation displays the home page."},gotoPageContainerPage:{parameters:{pageName:{type:"string"},pageContainer:{type:"wm.PageContainer"}},returnType:"any",hint:"This operation displays a page in a pageContainer and requires both a pageContainer and a pageName."},gotoDialogPage:{parameters:{pageName:{type:"string"},hideControls:{type:"boolean"},title:{type:"string"},modal:{type:"boolean"},width:{type:"number"},height:{type:"number"}},returnType:"any",hint:"This operation displays a page in a dialog."},showToast:{parameters:{content:{type:"string"},duration:{type:"number"},cssClasses:{type:"string"},dialogPosition:{type:"string"}},returnType:"any",hint:"This operation displays a page in a dialog."}},update:function(){
this[this.operation||"gotoLayer"]();
},invoke:function(_1,_2,_3){
var d=this._deferred=new dojo.Deferred(),m=this[_1];
if(m){
_2.push(_3);
m.apply(this,_2);
}else{
this.onError();
d.errback("operation: "+_1+" does not exist.");
}
return d;
},doResult:function(){
if(this._resultConnect){
dojo.disconnect(this._resultConnect);
this._resultConnect=null;
}
if(this._cancelConnect){
dojo.disconnect(this._cancelConnect);
this._cancelConnect=null;
}
this.onResult();
if(this._deferred&&this._deferred.fired==-1){
this._deferred.callback(true);
}
this._deferred=null;
},doError:function(){
if(this._resultConnect){
dojo.disconnect(this._resultConnect);
this._resultConnect=null;
}
if(this._cancelConnect){
dojo.disconnect(this._cancelConnect);
this._cancelConnect=null;
}
this.onError();
if(this._deferred&&this._deferred.fired==-1){
this._deferred.callback(true);
}
this._deferred=null;
},gotoLayer:function(_4,_5){
var l=_4 instanceof wm.Layer?_4:null;
if(l){
this.showLayer(l,_5);
}
this.doResult();
},nextLayer:function(_6){
var l=_6 instanceof wm.Layers?_6:null;
if(l){
l.setNext();
}
this.doResult();
},previousLayer:function(_7){
var l=_7 instanceof wm.Layers?_7:null;
if(l){
l.setPrevious();
}
this.doResult();
},showLayer:function(_8,_9){
var l=_8;
while(l){
wm.fire(l,"activate");
l=l.parent;
if(_9){
break;
}
}
},gotoPage:function(_a,_b){
var _c=_b==app?app._page:_b.getParentPage();
if(!app._page||!_c||_c==app._page){
this._resultConnect=dojo.connect(app,"onPageChanged",this,"doResult");
this._cancelConnect=dojo.connect(app.pageContainer,"pageChangeIgnored",this,"doError");
wm.job(this.getRuntimeId()+": PageChange",1,function(){
app.loadPage(_a);
});
}else{
if(_c.owner instanceof wm.PageContainer||_c.owner instanceof wm.PageContainerMixin){
this.gotoPageContainerPage(_a,_c.owner);
}
}
},gotoHomePage:function(_d){
this.gotoPage(app.main,_d);
},gotoPageContainerPage:function(_e,_f){
if(_f){
if(_e!=_f.pageName){
this._resultConnect=dojo.connect(_f,"onPageChanged",this,"doResult");
this._cancelConnect=dojo.connect(_f,"pageChangeIgnored",this,"doError");
_f.setPageName(_e);
}else{
this.doResult();
}
}else{
wm.logging&&undefined;
}
},gotoDialogPage:function(_10,_11,_12,_13,_14,_15){
this._resultConnect=dojo.connect(app.pageDialog,"onPageReady",this,"doResult");
app.pageDialog.showPage(_10,_11,String(_14||450)+"px",String(_15||300)+"px",_12,Boolean(_13));
},showToast:function(_16,_17,_18,_19){
app.createToastDialog();
app.toastDialog.showToast(_16,_17,_18,_19);
this._deferred.callback();
}});
wm.services.add({name:"navigationService",ctor:"wm.NavigationService",isClientService:true,clientHide:true});
dojo.declare("wm.NavigationCall",[wm.Component,wm.ServiceCall],{service:"navigationService",operation:"gotoLayer",processResult:function(_1a){
if(!this.owner){
return;
}
return this.inherited(arguments);
},processError:function(_1b){
if(!this.owner){
return;
}
return this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.components.NotificationService"]){
dojo._hasResource["wm.base.components.NotificationService"]=true;
dojo.provide("wm.base.components.NotificationService");
dojo.declare("wm.NotificationService",wm.Service,{operation:"",_operations:{alert:{parameters:{text:{type:"string"}},returnType:"any"},confirm:{parameters:{text:{type:"string"},OKButtonText:{type:"string"},CancelButtonText:{type:"string"}},returnType:"any"},prompt:{parameters:{text:{type:"string"},defaultValue:{type:"string"},OKButtonText:{type:"string"},CancelButtonText:{type:"string"}},returnType:"StringData"},warnOnce:{parameters:{text:{type:"string"},cookieName:{type:"string"}},returnType:"StringData"},toast:{parameters:{text:{type:"string"},duration:{type:"number"},cssClasses:{type:"string"},dialogPosition:{type:"string"}},returnType:"any",hint:"This operation displays a page in a dialog."}},update:function(){
this[this.operation]();
},invoke:function(_1c,_1d,_1e){
var m=this[_1c];
var d;
if(m){
_1d.push(_1e);
var _1f=m.apply(this,_1d);
if(_1f instanceof dojo.Deferred){
d=_1f;
}
}else{
this.onError();
d.errback("operation: "+_1c+" does not exist.");
}
this._deferred=d||new dojo.Deferred();
return this._deferred;
},alert:function(_20){
var d=new dojo.Deferred();
app.alert(_20);
this.connectOnce(app.alertDialog,"onClose",function(){
d.callback();
});
return d;
},confirm:function(_21,_22,_23){
var d=new dojo.Deferred();
var ok=_22||wm.getDictionaryItem("wm.Application.CAPTION_ALERT_OK");
var _24=_23||wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_CANCEL");
app.confirm(_21,false,function(){
d.callback(true);
},function(){
d.errback();
},ok,_24,false);
return d;
},prompt:function(_25,_26,_27,_28){
var d=new dojo.Deferred();
var ok=_27||wm.getDictionaryItem("wm.Application.CAPTION_ALERT_OK");
var _29=_28||wm.getDictionaryItem("wm.Application.CAPTION_CONFIRM_CANCEL");
app.prompt(_25,_26,function(_2a){
d.callback(_2a);
},function(){
d.errback();
},ok,_29);
return d;
},warnOnce:function(_2b,_2c){
var d=new dojo.Deferred();
if(!app.warnOnce(_2c,_2b)){
d.callback();
}else{
this.connectOnce(app.alertDialog,"onClose",function(){
d.callback();
});
}
return d;
},toast:function(_2d,_2e,_2f,_30){
var d=new dojo.Deferred();
app.createToastDialog();
app.toastDialog.showToast(_2d,_2e,_2f,_30);
d.callback();
return d;
}});
wm.services.add({name:"notificationService",ctor:"wm.NotificationService",isClientService:true,clientHide:true});
dojo.declare("wm.NotificationCall",[wm.Component,wm.ServiceCall],{service:"notificationService",operation:"alert",processResult:function(_31){
switch(this.operation){
case "alert":
case "confirm":
case "prompt":
case "warnOnce":
this.onOk(_31);
break;
}
this.onClose();
},processError:function(){
this.onCancel();
this.onClose();
},onCancel:function(){
},onOk:function(_32){
},onClose:function(){
}});
wm.Object.extendSchema(wm.NotificationCall,{owner:{group:"common",order:1,readonly:true,options:["Page","Application"]},service:{ignore:1,writeonly:1},operation:{group:"data",order:1},updateNow:{ignore:1},queue:{ignore:1},clearInput:{group:"operation",operation:1,order:30},input:{group:"data",order:3,putWiresInSubcomponent:"input",bindTarget:1,treeBindField:true,editor:"wm.prop.NavigationGroupEditor"},inFlightBehavior:{ignore:1},autoUpdate:{ignore:1},startUpdate:{ignore:1},onError:{ignore:1},onSuccess:{ignore:1},onBeforeUpdate:{ignore:1},onCanUpdate:{ignore:1},onResult:{ignore:1}});
}
if(!dojo._hasResource["wm.base.components.PhoneGapService"]){
dojo._hasResource["wm.base.components.PhoneGapService"]=true;
dojo.provide("wm.base.components.PhoneGapService");
dojo.declare("wm.PhoneGapService",wm.Service,{operation:"",_operations:{contacts_read:{parameters:{filter:{type:"string"}},returnType:"[phonegap.Contact]"},contacts_delete:{parameters:{id:{type:"number"}},returnType:"any"},contacts_save:{parameters:{contact:{type:"phonegap.Contact"}},returnType:"any"},notification_beep:{parameters:{times:{type:"number"}},returnType:"any"},notification_vibrate:{parameters:{miliseconds:{type:"number"}},returnType:"any"},capture_audio:{parameters:{},returnType:"StringData"},capture_picture:{parameters:{quality:{type:"number"},sourceType:{type:"string"},allowEdit:{type:"boolean"}},returnType:"StringData"},geolocation_getCurrentPosition:{parameters:{enableHighAccuracy:{type:"boolean"},timeout:{type:"number"},maximumAge:{type:"number"}},returnType:"phonegap.Coordinates"}},update:function(){
this[this.operation]();
},invoke:function(_33,_34,_35){
var d=this._deferred=new dojo.Deferred(),m=this[_33];
if(m){
_34.push(_35);
var _36=m.apply(this,_34);
if(_36 instanceof dojo.Deferred){
d=this._deferred=_36;
}
}else{
this.onError();
d.errback("operation: "+_33+" does not exist.");
}
return d;
},geolocation_getCurrentPosition:function(_37,_38,_39){
var d=new dojo.Deferred();
if(window["PhoneGap"]){
navigator.geolocation.getCurrentPosition(dojo.hitch(this,function(_3a){
d.callback(_3a.coords);
}),function(_3b){
d.errback(_3b);
},{enableHighAccuracy:_37||false,timeout:_38||5000,maximumAge:_39||1200000});
}
return d;
},capture_audio:function(){
var d=new dojo.Deferred();
if(window["PhoneGap"]){
navigator.device.capture.captureAudio(dojo.hitch(this,function(_3c){
var _3d=_3c[0].fullPath;
var _3e=_3c[0].name;
this.readDataUrl(_3d,d);
}),function(_3f){
this.handleCaptureError(_3f.code,d);
},{limit:1});
}
return d;
},capture_picture:function(_40,_41,_42){
var _43={destinationType:Camera.DestinationType.DATA_URL};
if(!_41){
_43.sourceType=Camera.PictureSourceType.CAMERA;
}else{
_43.sourceType=Camera.PictureSourceType[_41.toUpperCase()];
}
_43.allowEdit=Boolean(_42);
if(_40!==undefined&&_40!==null){
_43.quality=_40;
}
var d=new dojo.Deferred();
if(window["PhoneGap"]){
navigator.camera.getPicture(dojo.hitch(this,function(_44){
d.callback({dataValue:"data:image/jpeg;base64,"+_44});
}),dojo.hitch(this,function(_45){
this.handleCaptureError(_45.code,d);
}),_43);
}
return d;
},handleCaptureError:function(_46,d){
switch(_46){
case 20:
d.errback("CAPTURE_NOT_SUPPORTED");
break;
case 0:
d.errback("CAPTURE_INTERNAL_ERR");
break;
case 1:
d.errback("CAPTURE_APPLICATION_BUSY");
break;
case 2:
d.errback("CAPTURE_INVALID_ARGUMENT");
break;
case 3:
d.errback("CAPTURE_NO_MEDIA_FILES");
break;
default:
d.errback(_46);
}
},readDataUrl:function(_47,_48){
app.showLoadingDialog("Processing...");
var _49=new FileReader();
_49.onload=function(evt){
app.hideLoadingDialog();
_48.callback({dataValue:evt.target.result});
};
_49.onabort=_49.onerror=function(evt){
console.error("Reader Error:"+evt);
app.hideLoadingDialog();
_48.errback(evt);
};
_49.readAsDataURL(_47);
},notification_beep:function(_4a){
var d=new dojo.Deferred();
d.callback();
if(window["PhoneGap"]){
navigator.notification.beep(_4a||1);
}
return d;
},notification_vibrate:function(_4b){
var d=new dojo.Deferred();
d.callback();
if(window["PhoneGap"]){
navigator.notification.vibrate(_4b||100);
}
return d;
},contacts_delete:function(id){
var d=new dojo.Deferred();
if(window["PhoneGap"]){
var _4c=navigator.contacts.create();
_4c.id=id;
_4c.remove(function(_4d){
d.callback(_4d);
},function(_4e){
console.error("ERROR: "+_4e);
d.errback(_4e);
});
}
return d;
},contacts_save:function(_4f){
var d=new dojo.Deferred();
if(window["PhoneGap"]){
var _50=navigator.contacts.create();
for(var _51 in _4f){
if(typeof _4f[_51]!="object"){
_50[_51]=_4f[_51];
}
}
_50.name=new ContactName();
for(var _51 in _4f.name){
_50.name[_51]=_4f.name[_51];
}
_50.addresses=[];
dojo.forEach(_4f.address,function(_52){
var a=new ContactAddress();
for(var _53 in _52){
a[_53]=_52[_53];
}
_50.addresses.push(a);
});
_50.phoneNumbers=[];
dojo.forEach(_4f.phoneNumbers,function(_54){
var a=new ContactField(_54.name,_54.dataValue,false);
_50.phoneNumbers.push(a);
});
_50.emails=[];
dojo.forEach(_4f.emails,function(_55){
var a=new ContactField(_55.name,_55.dataValue,false);
_50.emails.push(a);
});
_50.urls=[];
dojo.forEach(_4f.urls,function(_56){
var a=new ContactField(_56.name,_56.dataValue,false);
_50.urls.push(a);
});
_50.organization=new ContactOrganization();
for(var _51 in _4f.organization){
_50.organization[_51]=_4f.organization[_51];
}
_50.rawId=Number(_50.id);
_50.save(function(_57){
d.callback(_57);
},function(_58){
console.error("ERROR: "+_58);
d.errback(_58);
});
}
return d;
},contacts_read:function(_59){
var d=new dojo.Deferred();
if(window["PhoneGap"]){
var _5a=new ContactFindOptions();
if(_59!=undefined&&_59!==""){
_5a.filter=_59;
}
_5a.multiple=true;
var _5b=["displayName","name","nickname","phoneNumbers","emails","addresses","ims","organizations","birthday","note","photos","categories","urls"];
navigator.contacts.find(_5b,function(_5c){
var _5d=function(_5e){
var _5f=[];
if(_5e){
dojo.forEach(_5e,function(_60){
_5f.push({name:_60.type,dataValue:_60.value});
});
}
return _5f;
};
for(var i=0;i<_5c.length;i++){
try{
_5c[i].phoneNumbers=_5d(_5c[i].phoneNumbers);
_5c[i].emails=_5d(_5c[i].emails);
_5c[i].urls=_5d(_5c[i].urls);
_5c[i].birthday=Number(_5c[i].birthday);
_5c[i].id=Number(_5c[i].id);
}
catch(e){
console.error(e);
}
}
d.callback(_5c);
},function(_61){
console.error("ERROR: "+_61);
d.errback(_61);
},_5a);
}
return d;
}});
wm.services.add({name:"phoneGapService",ctor:"wm.PhoneGapService",isClientService:true,clientHide:true});
wm.typeManager.addType("phonegap.Contact",{internal:false,fields:{id:{type:"number",order:1,"exclude":["insert"],"include":["delete","read","update"],"noChange":["delete","read","update"],required:true},name:{type:"phonegap.ContactName",required:true},nickname:{type:"string",order:4},phoneNumbers:{type:"EntryData",isList:true,order:5},emails:{type:"EntryData",isList:true,order:6,hidden:true},addresses:{type:"phonegap.Address",isList:true,order:7,hidden:true},ims:{type:"EntryData",isList:true,order:8,hidden:true},organizations:{type:"phonegap.ContactOrganization",isList:true,order:9,hidden:true},birthday:{type:"java.util.Date",order:10},note:{type:"string",order:11},photos:{type:"StringData",isList:true,order:12,hidden:true},categories:{type:"StringData",isList:true,order:13,hidden:true},urls:{type:"EntryData",isList:true,order:14,hidden:true}}});
wm.typeManager.addType("phonegap.Address",{internal:false,fields:{pref:{type:"boolean",order:1},type:{type:"string",order:2},formatter:{type:"string",order:3},streetAddress:{type:"string",order:4},locality:{type:"string",order:5},region:{type:"string",order:6},postalCode:{type:"string",order:7},country:{type:"string",order:8}}});
wm.typeManager.addType("phonegap.ContactOrganization",{internal:false,fields:{pref:{type:"boolean",order:1},type:{type:"string",order:2},name:{type:"string",order:3},department:{type:"string",order:4},title:{type:"string",order:5}}});
wm.typeManager.addType("phonegap.ContactName",{internal:false,fields:{formatted:{type:"string",order:1},familyName:{type:"string",order:2},givenName:{type:"string",order:3},middleName:{type:"string",order:4},honorificPrefix:{type:"string",order:5},honorificSuffix:{type:"string",order:6}}});
wm.typeManager.addType("phonegap.Coordinates",{internal:false,fields:{latitude:{type:"number",order:1},longitude:{type:"number",order:2},altitude:{type:"number",order:3},accuracy:{type:"number",order:4},altitudeAccuracy:{type:"number",order:5},heading:{type:"number",order:6},speed:{type:"number",order:7}}});
dojo.declare("wm.PhoneGapCall",[wm.ServiceVariable],{_deviceReady:false,service:"phoneGapService",operation:"contacts_read",postInit:function(){
this.inherited(arguments);
document.addEventListener("deviceready",dojo.hitch(this,"_onDeviceReady"),false);
},_onDeviceReady:function(){
this._deviceReady=true;
if(this.autoUpdate||this.startUpdate){
this.update();
}
},update:function(){
if(this._deviceReady){
return this.inherited(arguments);
}
},updateInternal:function(){
if(this._deviceReady){
return this.inherited(arguments);
}
}});
wm.Object.extendSchema(wm.PhoneGapCall,{owner:{group:"common",order:1,readonly:true,options:["Page","Application"]},service:{ignore:1,writeonly:1},operation:{group:"data",order:1},updateNow:{ignore:1},queue:{ignore:1},clearInput:{group:"operation",operation:1,order:30},input:{group:"data",order:3,putWiresInSubcomponent:"input",bindTarget:1,treeBindField:true,editor:"wm.prop.NavigationGroupEditor"}});
}
if(!dojo._hasResource["wm.base.components.XhrService"]){
dojo._hasResource["wm.base.components.XhrService"]=true;
dojo.provide("wm.base.components.XhrService");
dojo.declare("wm.XhrService",wm.Service,{noInspector:true,operation:"",_operations:{basicRequest:{parameters:{url:{type:"string"},headers:{type:"EntryData",isList:1},requestType:{type:"string"},contentType:{type:"string"},useProxy:{type:"boolean"},parameters:{type:"EntryData",isList:true}},returnType:"string"}},invoke:function(_62,_63,_64){
var op=this._operations[_62];
var _65,_66,_67,url,_68,_69;
if(!op){
return;
}
if(op==this._operations.basicRequest){
url=_63[0];
_67=_63[1];
_66=_63[2]||"GET";
_68=_63[3]||"application/x-www-form-urlencoded";
_69=_63[4]===undefined?true:_63[4];
_65=_63[5];
var _6a={};
dojo.forEach(_67,function(_6b){
_6a[_6b.name]=_6b.dataValue;
});
var _6c={};
dojo.forEach(_65,function(p){
_6c[p.name]=p.dataValue;
});
return this._invokeBasicRequest(url,_6a,_66,_68,_69,_6c,"string",_64);
}else{
var _6d=op.allParameters||op.parameters;
_65={};
var i=0;
wm.forEachProperty(op.parameters,function(_6e,_6f){
_65[_6f]=_63[i];
i++;
});
url=op.url;
url=url.replace(/\$\{.*?\}/g,function(){
var _70=arguments[0];
_70=_70.substring(2,_70.length-1);
var _71=_65[_70];
if(_71===undefined||_71===null){
_71=_6d[_70].defaultValue;
}
if(_71===undefined||_71===null){
_71="";
}
return _71;
});
if(op.requestType!==undefined){
_66=op.requestType;
}else{
if(_65.requestType){
_66=_65.requestType;
delete _65.requestType;
}else{
_66="GET";
}
}
if(op.contentType){
_68=op.contentType;
}else{
if(_65.contentType){
_68=_65.contentType;
delete _65.contentType;
}else{
_68="application/x-www-form-urlencoded";
}
}
if(op.useProxy!==undefined){
_69=op.useProxy;
}else{
_69=_65.useProxy;
delete _65.useProxy;
}
_67={};
var _72={};
wm.forEachProperty(_6d,function(_73,_74){
var _75=_65[_74];
if(_75===null||_75===undefined){
_75=_73.defaultValue;
if(_75===null||_75===undefined){
_75="";
}
}
if(_73.transmitType=="header"){
_67[_74]=_75;
}else{
if(_73.transmitType=="queryString"){
_72[_74]=typeof _75=="string"&&!_73.noEscape&&_66==="GET"?escape(_75):_75;
}
}
});
return this._invokeBasicRequest(url,_67,_66,_68,_69,_72,op.returnType,op,_64);
}
},_invokeBasicRequest:function(url,_76,_77,_78,_79,_7a,_7b,op,_7c){
var d=new dojo.Deferred();
if(wm.useProxyJsonServices!==undefined){
_79=wm.useProxyJsonServices;
}
_77=_77.toUpperCase();
var _7d;
switch(_78){
case "application/json":
_7d=_79?dojo.toJson(_7a):_7a;
break;
case "application/x-www-form-urlencoded":
if(!_79){
_7d=_7a;
}else{
_7d="";
wm.forEachProperty(_7a,function(_7e,key){
if(_7d){
_7d+="&";
}
_7d+=escape(key)+"="+escape(_7e);
});
}
break;
}
if(_79){
if(this.jsonRpcService&&!this.jsonRpcService._service){
this.jsonRpcService.destroy();
delete this.jsonRpcService;
}
if(!this.jsonRpcService){
this.jsonRpcService=new wm.JsonRpcService({owner:_7c,service:"waveMakerService"});
this.defaultHeaders=dojo.clone(this.jsonRpcService._service.requestHeaders);
}
this.jsonRpcService._service.requestHeaders=dojo.mixin(_76,this.defaultHeaders);
var _7f=this.jsonRpcService.requestAsync("remoteRESTCall",[url,_7d,_77,_78]);
}else{
var _80={headers:_76,handleAs:"text",contentType:_78,url:url};
if(_77=="GET"){
var _81="";
wm.forEachProperty(_7a,function(_82,_83){
if(_82!==null&&_82!==undefined){
if(_81){
_81+="&";
}
_81+=_83+"="+_82;
}
});
if(_81&&url.match(/\?/)){
url+="&"+_81;
}else{
url+="?"+_81;
}
_80.url=url;
}else{
_80.postData=dojo.toJson(_7a);
}
var _7f=this._deferred=dojo.xhr(_77,_80);
}
_7f.addCallbacks(dojo.hitch(this,"onResult",_7a,op,d),dojo.hitch(this,"onError",_7a,op,d));
return d;
},onResult:function(_84,_85,_86,_87){
var _88;
try{
if(_87&&_87.match(/^\s*[\{\[]/)){
_88=dojo.fromJson(_87);
}else{
_88={dataValue:_87};
}
}
catch(e){
_88=_87;
}
_86.callback(_88);
},onError:function(_89,_8a,_8b,_8c){
_8b.errback(_8c);
},addOperation:function(_8d){
if(_8d.useProxy===undefined){
_8d.parameters.useProxy=this._operations.basicRequest.parameters.useProxy;
}
if(!_8d.returnType){
_8d.returnType="string";
}
if(!_8d.contentType){
_8d.contentType="application/x-www-form-urlencoded";
}
this._operations[_8d.name]=_8d;
},removeOperation:function(_8e){
delete this._operations[_8e];
}});
wm.services.add({name:"xhrService",ctor:"wm.XhrService",isClientService:true,clientHide:false});
dojo.declare("wm.XhrDefinition",wm.Component,{noInspector:true,url:"",requestType:"GET",headers:null,useProxy:true,parameters:null,returnType:"string",contentType:"application/x-www-form-urlencoded",postInit:function(){
this.inherited(arguments);
this.initType();
},destroy:function(){
wm.XhrService.prototype.removeOperation(this.name);
this.inherited(arguments);
},initType:function(){
if(this.url){
var _8f=dojo.clone(this.parameters);
wm.forEachProperty(_8f,function(_90,_91){
if(_90.hidden){
delete _8f[_91];
}
});
wm.XhrService.prototype.addOperation({name:this.name,url:this.url,requestType:this.requestType,headers:this.headers,parameters:_8f,allParameters:this.parameters,useProxy:this.useProxy,contentType:this.contentType,returnType:this.returnType});
}
},designSelect:function(){
var d=studio.navGotoEditor("XHRServiceEditor",studio.webServiceTab,this.name+"Layer",this.name);
d.page.setService(this);
}});
wm.Object.extendSchema(wm.XhrDefinition,{returnType:{type:"string"},url:{type:"string"},useProxy:{type:"boolean"},requestType:{type:"string"},contentType:{type:"string"},parameters:{type:"any"},headers:{type:"any"}});
}
if(!dojo._hasResource["wm.base.components.Page"]){
dojo._hasResource["wm.base.components.Page"]=true;
dojo.provide("wm.base.components.Page");
dojo.connect(window,"onresize",function(){
dojo.publish("window-resize");
});
var wmObjectList=[];
wm.getObject=function(_92){
if(!wmObjectList[_92]){
wmObjectList[_92]=dojo.getObject(_92);
}
return wmObjectList[_92];
};
dojo.declare("wm.Page",wm.Component,{validateVisibleOnly:false,i18n:false,name:"",deletionDisabled:1,enableMobileFolding:false,create:function(){
this.inherited(arguments);
if(!this.name){
this.name=this.declaredClass.toLowerCase();
}
wm.Page.registerPage(this);
this.render();
},getMainPage:function(){
if(!this.owner){
return null;
}
var _93=this.owner;
while(_93.owner){
_93=_93.owner;
}
if(_93 instanceof wm.Application){
return _93;
}
},destroy:function(){
this._isUnloading=true;
wm.Page.deregisterPage(this);
var _94=this.getMainPage();
if(_94){
_94.subPageUnloaded(this);
}
if(window.app){
window.app.subPageUnloaded(this);
}
wm.fire(this.root,"destroy");
this.inherited(arguments);
delete this.app;
delete this.domNode;
delete this.root;
_94=null;
delete this._designee;
},init:function(){
this.app=window.app;
if(this.owner==app.pageContainer){
window[this.name]=this;
}
this.owner[this.name]=this;
this.inherited(arguments);
},forEachWidget:function(_95){
if(this.root){
return wm.forEachWidget(this.root,_95);
}
},render:function(){
var _96=(this.owner!=app.pageContainer);
var d=_96?this.domNode||document.body:app.appRoot.domNode;
var ds=d.style;
dojo.addClass(d,this.declaredClass);
var _97=ds.left;
if(_96){
ds.left="-100000px";
}
wm.timePage&&undefined;
this._loadingPage=true;
var _98=new Date().getTime();
var _99=this.constructor.widgets||this.widgets;
if(wm.isEmpty(_99)&&!this.isDesignLoaded()){
console.error("Page "+this.name+" has been corrupted, and no longer has a wm.Layout nor any widgets; please create a new project or edit "+this.name+".widgets.js by hand");
if(!wm.disablePageLoadingToast){
app.toastError(wm.getDictionaryItem("wm.Page.PAGE_ERRORS",{name:this.name}));
}
}
if(this.owner){
this.locationState=(this.owner==app.pageContainer)?app.locationState:this.owner._locationState;
}
if(wm.useDojoParser){
var _9a=wm._dojoParserCurrentOwner;
wm._dojoParserCurrentOwner=this;
var _9b=this.owner._pageLoader.htmlLoader.getHtmlNode();
while(_9b.childNodes.length){
if(_9b.firstChild){
this.domNode.appendChild(_9b.firstChild);
}else{
_9b.removeChild(_9b.firstChild);
}
}
var _9c=dojo.parser.parse(this.domNode);
wm._dojoParserCurrentOwner=_9a;
}else{
if(app.debugDialog){
this.debugId=app.debugDialog.newLogEvent({eventType:"loadComponents",sourceDescription:"Page Loading",resultDescription:this.name+" page's widgets and components initialized",method:"loadComponents",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId()});
}
this.loadComponents(_99,null);
if(this.debugId){
app.debugDialog.endLogEvent(this.debugId);
delete this.debugId;
}
}
wm.timePage&&undefined;
var _9d=this;
dojo.addOnLoad(dojo.hitch(this,function(){
this.postRender();
if(_96){
ds.left=_97;
}
if(!this.root.isAncestorHidden()){
this.onShow();
}
this.root.callOnShowParent();
}));
},postRender:function(){
wm.timePage&&undefined;
wm.fire(this.root,"reflow");
wm.timePage&&undefined;
wm.fire(this,"unloadSupport");
try{
this._loadingPage=false;
if(this.root){
this.reflow();
}
if(app.debugDialog){
this.debugId=app.debugDialog.newLogEvent({eventType:"start",sourceDescription:"",resultDescription:this.name+".start()",method:"start",affectedId:this.getRuntimeId(),firingId:this.getRuntimeId()});
}
var _9e=this.owner?this.owner._restoreBackState:undefined;
if(!window["studio"]||!studio.page||this!=studio.page&&!this.isAncestor(studio.page)){
this.start(_9e,this.locationState);
}
if(this.debugId){
app.debugDialog.endLogEvent(this.debugId);
delete this.debugId;
}
this._startCalled=true;
if(wm.debugPerformance){
var _9f=this.stopTimerWithName("LoadPage","wm.Layout");
}
this.onStart();
}
catch(e){
console.error("Failed to initialize page "+this.name+"; "+e);
}
},start:function(){
},reflow:function(){
wm.fire(this.root,"reflow");
},addComponent:function(_a0){
this[_a0.name]=_a0;
if(_a0 instanceof wm.Control){
if(this._designer&&dojo.isIE<=8){
var s=_a0.domNode&&dojo.getComputedStyle(_a0.domNode);
if(s&&s.backgroundImage=="none"){
_a0.domNode.style.backgroundImage="url(images/blank.gif)";
}
}
}
this.inherited(arguments);
},removeComponent:function(_a1){
delete this[_a1.name];
this.inherited(arguments);
},isDesignLoaded:function(){
return this.name=="wip";
},getRoot:function(){
return this;
},getId:function(_a2){
return _a2;
},getRuntimeId:function(_a3){
_a3=this.name+(_a3?"."+_a3:"");
return this.owner!=app.pageContainer?this.owner.getRuntimeId(_a3):_a3;
},getComponent:function(_a4){
return this.components[_a4]||this[_a4]||this.owner&&this.owner.getComponent(_a4);
},_create:function(_a5,_a6){
if(_a5.prototype instanceof dijit._Widget&&window.dijit){
return new wm.DijitWrapper(dojo.mixin(_a6||{},{dijitClass:_a5,publishClass:p.declaredClass}));
}
return this.inherited(arguments);
},warnDroppedWidgets:function(_a7,_a8,_a9,_aa){
if(_aa){
console.warn(_a7+" was not loaded because its parent was not loaded");
}else{
console.warn(_a7+" was not loaded because its deviceType property is "+_a8+" and app is running as "+wm.device);
}
if(_a9){
wm.forEachProperty(_a9,dojo.hitch(this,function(w,_ab){
if(_ab!="binding"){
this.warnDroppedWidgets(_ab,_a8,w[3],true);
}
}));
}
},loadComponent:function(_ac,_ad,_ae,_af,_b0,_b1,_b2){
if(!this._isDesignLoaded&&_af.deviceType&&wm.device&&dojo.indexOf(_af.deviceType,wm.device)==-1){
if(djConfig.isDebug){
this.warnDroppedWidgets(_ac,_af.deviceType.join(","),_b1);
}
return;
}
if(wm.debugPerformance){
if(_ae=="wm.Layout"){
if(dojo.isFF){
console.groupCollapsed("LOAD COMPONENT "+_ae+": "+_ac);
}else{
}
}
this.startTimerWithName("LoadComponent",_ae);
this.startTimerWithName("LoadPage",_ae);
}
var _b3=wm.getObject(_ae);
if(!_b3){
try{
wm.getComponentStructure(_ae);
_b3=dojo.getObject(_ae);
}
catch(e){
}
if(!_b3){
_b3=wm.Box;
}
}
var _b4={};
isWidget=(_b3.prototype instanceof wm.Control||_b3.prototype instanceof dijit._Widget);
if(isWidget){
var _b5=(_ad?_ad.containerNode||_ad.domNode:this.domNode);
_b4={owner:this,parent:_ad,domNode:_b5?null:document.body,parentNode:_b5};
}
if(!_b4.owner){
if(_ad&&_ad instanceof wm.Layout){
_b4.owner=_ad.owner;
}else{
if(_ad){
_b4.owner=_ad;
}else{
_b4.owner=this;
}
}
}
if(this[_ac] instanceof wm.Binding){
c=this[_ac];
}else{
_b4=dojo.mixin({},_af,{name:_b4.owner.getUniqueName(_ac),_designer:this._designer,_loading:true},_b4);
}
if(!c){
if(_af._isDesignLoaded===false){
delete _b4._designer;
}
if(this.isRelativePositioned&&_ae=="wm.Layout"){
_b4.isRelativePositioned=true;
}
if(!this.isDesignLoaded()){
for(var p in _b4){
if(p.indexOf("custom")==0&&dojo.isFunction(_b3.prototype[p])){
var _b6=_b4.owner;
_b4[p]=dojo.hitch(_b6,_b6[_b4[p]]);
}
}
}
var c=this._create(_b3,_b4);
if(!_ad&&isWidget){
c.moveable=false;
this.root=c;
}
}
this.makeEvents(_b0,c);
if(_b1){
this.loadComponents(_b1,c);
}
c.loaded();
var _b7=this.stopTimerWithName("LoadComponent",_ae);
if(wm.debugPerformance){
if(_ae=="wm.Layout"){
this.printPagePerformanceData();
}
}
return c;
},printPagePerformanceData:function(){
var _b8={};
for(var _b9 in wm.Component.timingByComponent){
var obj=wm.Component.timingByComponent[_b9];
var _ba=false;
for(var i in obj){
if(wm.sum(obj[i])>10){
_ba=true;
}
}
for(var i in obj){
if(!_b8[i]){
_b8[i]=0;
}
_b8[i]+=wm.sum(obj[i]);
}
}
for(var i in _b8){
}
},loadComponents:function(_bb,_bc){
for(var i in _bb){
try{
this.loadComponent(i,_bc,_bb[i][0],_bb[i][1]||{},_bb[i][2],_bb[i][3]);
}
catch(e){
console.error("FAILED TO LOAD "+"["+_bb[i][1].name+"] "+i+": ",e);
}
}
},onShow:function(){
},onStart:function(_bd){
},keydown:function(e){
for(var i=0;i<wm.dialog.showingList.length;i++){
if(wm.dialog.showingList[i].modal){
return;
}
}
if(this.owner!=app.pageContainer||this!=app._page){
return true;
}
var _be=(e.target.tagName=="INPUT");
var chr=app._keys[e.keyCode];
var _bf=chr&&chr.length>1;
if(e.keyCode==dojo.keys.ESCAPE){
this.onEscapeKey();
}else{
if(e.shiftKey){
if(e.keyCode!=dojo.keys.SHIFT&&!_be){
if(this.onShiftKey(chr)){
dojo.stopEvent(e);
}
}
}else{
if(e.ctrlKey){
if(e.keyCode!=dojo.keys.CTRL){
if(this.onCtrlKey(chr)){
dojo.stopEvent(e);
}
}
}else{
if(e.keyCode==dojo.keys.ENTER&&!_be){
if(this.onEnterKey()){
dojo.stopEvent(e);
}
}else{
if(!_be&&e.keyCode){
if(_bf){
if(this.onMiscKey(chr)){
dojo.stopEvent(e);
}
}else{
if(this.onLetterKey(chr)){
dojo.stopEvent(e);
}
}
}
}
}
}
}
},onEnterKey:function(){
},onShiftKey:function(_c0){
},onCtrlKey:function(_c1){
},onEscapeKey:function(){
},onLetterKey:function(_c2){
},onMiscKey:function(_c3){
},toString:function(_c4){
var t=_c4||"";
if(this._loadingPage){
t+="; PAGE LOADING";
}
return this.inherited(arguments,[t]);
},_end:0});
wm.Page.extend({designCreate:function(){
this.inherited(arguments);
this.app=this.isDesignLoaded()?studio.application:app;
},unloadSupport:function(){
if(!this.isDesignLoaded()&&window.studio&&window.studio._isWaveMakerStudio){
this.constructor._supported=false;
this.constructor.widgets={};
}
},generateEventName:function(_c5){
return _c5;
},_getProp:function(n){
if(window["studio"]&&this==studio.page&&this.isEventProp(n)){
return (getEvent(n,studio.getScript()))?n:"";
}
return this.inherited(arguments);
},writeComponents:function(){
var _c6=this.inherited(arguments);
var _c7=[];
var _c8=[];
dojo.forEach(_c6,function(_c9){
var _ca=_c9.indexOf("\"")+1;
var _cb=_c9.indexOf("\"",_ca);
var _cc=_c9.substring(_ca,_cb);
var obj=dojo.getObject(_cc);
if(obj&&obj.prototype instanceof wm.Control){
_c8.push(_c9);
}else{
_c7.push(_c9);
}
});
return _c7.concat(_c8);
},installDesignDictionary:function(_cd){
var _ce=studio.languageSelect.getDisplayValue();
var _cf=_ce==""||_ce=="default";
this._editLanguage=_ce;
var _d0=wm.listComponents([this],wm.Component,false);
for(var i=0;i<_d0.length;i++){
var c=_d0[i];
var _d1=c.listWriteableProperties();
for(var _d2 in _d1){
var _d3=c.getProp(_d2);
if(_d3===null||typeof _d3!="object"||_d3.declaredClass===undefined&&!wm.isNode(_d3)){
if(c["_original_i18n_"+_d2]!==undefined&&c["_original_i18n_"+_d2]!=_d3){
c.setProp(_d2,c["_original_i18n_"+_d2]);
_d3=c["_original_i18n_"+_d2];
delete c["_original_i18n_"+_d2];
}
if(!_cf){
c["_original_i18n_"+_d2]=(typeof _d3=="object")?dojo.clone(_d3):_d3;
}
}
}
}
this._designDictionary=_cd;
for(var _d4 in _cd){
var c=this[_d4];
if(c instanceof wm.Component){
var _d5=_cd[_d4];
for(var _d2 in _d5){
c.setProp(_d2,_d5[_d2]);
}
}
}
},getLanguageWidgets:function(){
var _d6={};
var _d7=wm.listComponents([this],wm.Component,false);
for(var i=0;i<_d7.length;i++){
var c=_d7[i];
var _d8=c.listWriteableProperties();
for(var _d9 in _d8){
if(c.hasLocalizedProp(_d9)){
if(!_d6[c.name]){
_d6[c.name]={};
}
_d6[c.name][_d9]=c.getProp(_d9);
}
}
}
return _d6;
},setPageProperty:function(_da,_db){
if(typeof _db=="string"){
_db="\""+_db+"\"";
}
var _dc=studio.getScript();
var _dd;
var _de=new RegExp("\""+_da+"\": .*,");
if(_dc.match(_de)){
_dd=_dc.replace(_de,"\""+_da+"\": "+_db+",");
}else{
_dd=_dc.replace(/\{(.*?)\n/,"{$1\n\t\""+_da+"\": "+_db+",\n");
}
if(_dd!=_dc){
studio.setScript(_dd);
}
},getPageProperty:function(_df){
if(typeof inValue=="string"){
inValue="\""+inValue+"\"";
}
var _e0=studio.getScript();
var _e1=new RegExp("\""+_df+"\": (.*),");
var _e2=_e0.match(_e1);
if(_e2){
var _e3=_e2[1];
_e3=_e3.replace(/^\"/,"").replace(/\"$/,"");
if(typeof this[_df]=="boolean"){
_e3=(_e3=="true");
}else{
if(typeof this[_df]=="number"){
_e3=parseInt(_e3);
}
}
return _e3;
}
},setI18n:function(_e4){
this.i18n=Boolean(_e4);
if(this._isDesignLoaded){
this.setPageProperty("i18n",this.i18n);
}
},getI18n:function(){
return this.getPageProperty("i18n");
},setPreferredDevice:function(_e5){
this.preferredDevice=_e5;
if(this._isDesignLoaded){
this.setPageProperty("preferredDevice",this.preferredDevice);
}
},getPreferredDevice:function(){
return this.getPageProperty("preferredDevice");
},setValidateVisibleOnly:function(_e6){
this.validateVisibleOnly=Boolean(_e6);
if(this._isDesignLoaded){
this.setPageProperty("validateVisibleOnly",this.validateVisibleOnly);
}
},getValidateVisibleOnly:function(){
return this.getPageProperty("validateVisibleOnly");
},set_enableMobileFolding:function(_e7){
this.enableMobileFolding=Boolean(_e7);
if(this._isDesignLoaded){
this.setPageProperty("enableMobileFolding",this.enableMobileFolding);
if(studio.currentDeviceType=="phone"){
studio.mobileFoldingToggleButton.setDisabled(!_e7);
}
}
},onMobileFolding:function(){
},onMobileUnfolding:function(){
}});
wm.Object.extendSchema(wm.Page,{onStart:{events:["js","disableNoEvent"]},onShow:{events:["js","disableNoEvent"]},onShiftKey:{events:["js","disableNoEvent"]},onCtrlKey:{events:["js","disableNoEvent"]},onEscapeKey:{},onEnterKey:{},onLetterKey:{events:["js","disableNoEvent"]},onMiscKey:{events:["js","disableNoEvent"]},i18n:{group:"widgetName"},preferredDevice:{hidden:1},validateVisibleOnly:{group:"widgetName"},enableMobileFolding:{group:"widgetName"}});
wm.Part=wm.Page;
dojo.mixin(wm.Page,{byName:{},getPage:function(_e8,_e9){
var _ea=wm.Page.byName[wm.capitalize(_e8)];
if(_ea&&_ea.length){
if(_e9===undefined){
_e9=_ea.length-1;
}
return _ea[_e9];
}
},getPages:function(_eb){
return wm.Page.byName[wm.capitalize(_eb)];
},registerPage:function(_ec){
if(!wm.Page.byName[_ec.declaredClass]){
wm.Page.byName[_ec.declaredClass]=[];
}
wm.Page.byName[_ec.declaredClass].push(_ec);
},deregisterPage:function(_ed){
var a=wm.Page.byName[_ed.declaredClass];
if(a){
wm.Array.removeElement(a,_ed);
}
}});
wm.getPage=wm.Page.getPage;
}
if(!dojo._hasResource["wm.base.components.HtmlLoader"]){
dojo._hasResource["wm.base.components.HtmlLoader"]=true;
dojo.provide("wm.base.components.HtmlLoader");
wm.getNodeIds=function(_ee){
var ids=[];
dojo.forEach(_ee.childNodes,function(n){
if(n.id){
ids.push(n.id);
}
});
return ids;
};
dojo.declare("wm.HtmlLoader",wm.Component,{url:"",html:"",relativeUrl:true,init:function(){
this.inherited(arguments);
this.inherited(arguments);
if(this.url){
this.setUrl(this.url);
}else{
this.setHtml(this.html);
}
},destroy:function(){
this.html=null;
dojo.destroy(this._htmlNode);
this._htmlNode=null;
this.inherited(arguments);
},setUrl:function(_ef){
this.url=_ef||"";
if(this.url){
var _f0=this.relativeUrl?this.getPath()+this.url:this.url;
this.setHtml(wm.load(_f0,true));
}
},setHtml:function(_f1){
this.clearHtml();
this.html=_f1||"";
if(this.html){
this.addHtml(this.html);
}
dojo.publish("wm-markupchanged");
},clearHtml:function(){
this.html="";
this.removeHtml();
},getHtmlNode:function(){
if(!this._htmlNode){
var n=this._htmlNode=document.createElement("div");
n.style.display="none";
document.body.appendChild(n);
}
return this._htmlNode;
},addHtml:function(_f2){
if(this.isDesignLoaded()){
var p=this.getPath();
_f2=_f2.replace(/<img([^>]*)src[^>]*=[^>]*(["'])([^(http:)\/][^>]*)\2/g,"<img$1src=\""+p+"$3\"");
}
var n=this.getHtmlNode();
n.innerHTML=[n.innerHTML,_f2].join("\n");
},removeHtml:function(){
var n=this.getHtmlNode();
if(n){
n.innerHTML="";
}
},getNodeIds:function(){
return wm.getNodeIds(this.getHtmlNode());
}});
}
if(!dojo._hasResource["wm.base.components.PageLoader"]){
dojo._hasResource["wm.base.components.PageLoader"]=true;
dojo.provide("wm.base.components.PageLoader");
wm.load=function(_f3,_f4,_f5){
if(djConfig.isDebug&&!dojo.isFF){
}
if(_f5){
var d=dojo.xhrGet({url:_f3,sync:false,preventCache:!_f4});
if(typeof _f5=="function"){
d.addCallback(_f5);
}
return d;
}else{
return dojo.xhrGet({url:_f3,sync:true,preventCache:!_f4}).results[0];
}
};
wm.dojoScriptLoader=function(uri){
try{
dojo._loadUri(uri);
}
catch(e){
console.error(e);
return false;
}
};
wm.gzScriptLoader=function(_f6){
try{
var _f7="resources/gzipped/";
dojo._loadUri(_f7+_f6.replace(/[.]/g,"/")+".js");
}
catch(e){
console.error("error while loading gzipped file ",e);
return false;
}
};
dojo.declare("wm.PageLoader",wm.Component,{init:function(){
this.randomNum=wm.saveTimestamp||Math.floor(Math.random()*1000000);
this.randomParam=window["PhoneGap"]?"":"?dojo.preventCache="+this.randomNum;
this.inherited(arguments);
this._pageConnections=[];
this.pageProps={};
this.cssLoader=new wm.CssLoader({owner:this,relativeUrl:false});
this.htmlLoader=new wm.HtmlLoader({owner:this,relativeUrl:false});
},pageConnect:function(){
var _f8=this.getPageCtor();
if(_f8){
var _f9=[_f8.prototype].concat(dojo._toArray(arguments));
this._pageConnections.push(dojo.connect.apply(dojo,_f9));
}
},_disconnectPage:function(){
dojo.forEach(this._pageConnections,dojo.disconnect);
},getPageCtor:function(){
return dojo.getObject(this.className||"");
},testForSecurityErrrors:function(_fa){
if(app.isSecurityEnabled){
try{
var _fb=dojo._getText(_fa);
if(_fb.match(/^\<\!DOCTYPE/)&&_fb.match(/new\s*wm\.Application\(/)){
this.isSecurityError=true;
throw "SecurityError";
}
}
catch(e){
}
}
},loadCombinedFiles:function(_fc,_fd){
var _fe=_fd+".a.js"+this.randomParam;
delete dojo._loadedUrls[_fe];
wm.dojoScriptLoader(_fe);
var _ff=dojo.getObject(_fc);
if(_ff){
this.cssLoader.setCss(_ff.prototype._cssText);
this.htmlLoader.setHtml(_ff.prototype._htmlText);
}else{
this.testForSecurityErrrors(_fe);
}
return _ff;
},loadController:function(_100,_101){
var ctor=dojo.getObject(_100);
if(!ctor&&!djConfig.isDebug){
ctor=this.loadCombinedFiles(_100,_101);
}
if(!ctor){
var _102=_101+".js"+this.randomParam;
delete dojo._loadedUrls[_102];
wm.dojoScriptLoader(_102);
ctor=dojo.getObject(_100);
}
if(!ctor){
this.testForSecurityErrrors(_102);
if(!wm.disablePageLoadingToast){
app.toastError(wm.getDictionaryItem("wm.Page.PAGE_ERRORS",{name:_100}));
}
console.error("Error parsing "+_101+".js");
this.onError("Error parsing "+_101+".js");
ctor=dojo.declare(_100,wm.Page);
}
return ctor;
},loadSupport:function(_103,_104){
if(!_103._supported){
this.cssLoader.setUrl(_104+".css"+this.randomParam);
_103.css=this.cssLoader.css;
this.htmlLoader.setUrl(_104+".html"+this.randomParam);
_103.html=this.htmlLoader.html;
_103.html=_103.css="";
var _105=_104+".widgets.js"+this.randomParam;
delete dojo._loadedUrls[_105];
wm.dojoScriptLoader(_105);
_103._supported=true;
}
},unloadSupport:function(ctor){
if(!ctor){
ctor=this.getPageCtor();
}
if(ctor){
ctor.css=ctor.html="";
ctor._supported=false;
}
},loadPageCode:function(_106){
var path=this.getPath()+wm.pagesFolder+_106+"/"+_106;
var ctor=dojo.getObject(_106);
if(!ctor){
ctor=this.loadController(_106,path);
}
if(ctor){
if(ctor.prototype._cssText===undefined||wm.isEmpty(ctor.widgets)){
this.loadSupport(ctor,path);
}
if(ctor.prototype.i18n){
try{
dojo["requireLocalization"]("language",_106);
ctor.prototype._i18nDictionary=dojo.i18n.getLocalization("language",_106);
}
catch(e){
}
}
}
return ctor;
},loadPage:function(_107,_108){
_108=_108||_107;
if(!_108){
wm.logging&&undefined;
return;
}
this.previousPage=this.page;
this.previousClassName=this.className;
this.className=_107;
try{
var ctor=this.loadPageCode(_107);
if(ctor){
this.onBeforeCreatePage();
this.createPage(ctor,_108);
this.pageChanged();
this.unloadSupport(ctor);
}else{
console.error("Page not found:",_107);
this.onError("Page not found:"+_107);
}
if(!this.page||!this.page.root){
console.error("Page not found:",_107);
this.onError("Page not loaded:"+_107);
}
}
catch(e){
if(this.isSecurityError){
delete this.isSecurityError;
app.onSessionExpiration();
}else{
console.error("Page not found:",_107);
this.onError(e);
}
}
},onError:function(_109){
},createPage:function(_10a,_10b){
var _10c=dojo.mixin({name:_10b,owner:this.owner,domNode:this.domNode,isRelativePositioned:this.isRelativePositioned},this.pageProps||{});
this.page=new _10a(_10c);
},destroyPage:function(_10d){
this._disconnectPage();
if(_10d){
wm.fire(_10d,"destroy");
}
},destroy:function(){
this.destroyPage();
delete this.cssLoader;
delete this.htmlLoader;
this.inherited(arguments);
if(this.domNode){
dojo.destroy(this.domNode);
this.domNode=null;
}
},pageChanged:function(){
this.onPageChanged(this.page,this.previousPage);
if(this.previousPage){
this.destroyPage(this.previousPage);
delete this.previousPage;
if(this.previousClassName){
try{
var _10e=dojo.getObject(this.previousClassName);
_10e._supported=false;
}
catch(e){
}
}
}
},onBeforeCreatePage:function(){
},onPageChanged:function(_10f,_110){
},isDesignLoaded:function(){
if(!window["studio"]){
return false;
}
if(this.inherited(arguments)){
return true;
}
var o=this.owner;
while(o&&o instanceof wm.Application==false&&o!=studio.page){
o=o.owner;
}
if(o==studio.page){
return true;
}
return false;
}});
}
if(!dojo._hasResource["wm.base.components.Property"]){
dojo._hasResource["wm.base.components.Property"]=true;
dojo.provide("wm.base.components.Property");
dojo.declare("wm.Property",wm.Component,{property:"",bindTarget:true,bindSource:true,isEvent:false,readonly:false,type:"",group:"",order:100,init:function(){
this.inherited(arguments);
if(this._isDesignLoaded&&this.owner===studio.page){
this.designTimeInit();
}
}});
}
if(!dojo._hasResource["wm.base.components.ImageList"]){
dojo._hasResource["wm.base.components.ImageList"]=true;
dojo.provide("wm.base.components.ImageList");
dojo.declare("wm.ImageList",wm.Component,{width:32,height:32,colCount:100,iconCount:100,url:"",postInit:function(){
this.inherited(arguments);
if(this.iconCount<this.colCount){
this.iconCount=this.colCount;
}
this.createStyleSheet();
},createStyleSheet:function(){
var id=this.getImageClass();
var _111=dojo.byId(id);
if(!_111){
_111=this.domNode=document.createElement("style");
_111.id=id;
_111.type="text/css";
document.getElementsByTagName("head")[0].appendChild(_111);
}
var url=this.url;
if(this.url.indexOf("lib/")==0){
url=dojo.moduleUrl("lib").path.replace(/lib\/$/,"")+url;
}else{
if(this.isDesignLoaded()&&this.owner!=studio){
url="/"+studio.project.getProjectPath()+"/"+url;
}
}
var text="";
for(var i=0;i<this.iconCount;i++){
if(text){
text+=",";
}
text+="."+id+"_"+i;
}
text+="{background-image: url("+url+") !important;background-repeat:no-repeat !important;width:"+this.width+"px;height: "+this.height+"px;}\n";
for(var i=0;i<this.iconCount;i++){
var col=i%this.colCount;
var row=Math.floor(i/this.colCount);
text+="."+id+"_"+i+" {background-position: -"+this.width*col+"px -"+(this.height*row)+"px !important;}\n";
}
setCss(_111,text);
},destroy:function(){
dojo.destroy(this.domNode);
this.inherited(arguments);
},getImageClass:function(_112){
var id="";
if(this.owner instanceof wm.Application){
id+="app";
}else{
if(this.isDesignLoaded()&&this.owner==studio.page){
id+=studio.project.pageName;
}else{
if(this.owner instanceof wm.Page){
id+=this.owner.declaredClass;
}else{
id+=this.owner.getRuntimeId().replace(/\./g,"_");
}
}
}
id+="_"+this.name;
if(_112==undefined){
return id;
}else{
return id+"_"+_112;
}
},getImageHtml:function(_113){
var col=_113%this.colCount;
var row=Math.floor(_113/this.colCount);
var url=this.url;
if(this.url.indexOf("lib/")==0){
url=dojo.moduleUrl("lib").path.replace(/lib\/$/,"")+url;
}else{
if(this.isDesignLoaded()&&this.owner!=studio){
if(url.match(/^resources/)){
url="projects/"+studio.project.projectName+"/"+url;
}else{
url="/"+studio.project.getProjectPath()+"/"+url;
}
}
}
return "<image src=\""+wm.theme.getImagesPath()+"blank.gif\""+" width=\""+this.width+"\""+" height=\""+this.height+"\""+" style=\""+"vertical-align: middle; "+"background:url("+url+") no-repeat "+(-this.width*col)+"px "+(-this.height*row)+"px;\""+">";
}});
}
if(!dojo._hasResource["wm.base.components.Binding"]){
dojo._hasResource["wm.base.components.Binding"]=true;
dojo.provide("wm.base.components.Binding");
dojo.declare("wm.Wire",wm.Component,{expression:"",source:"",targetProperty:"",targetId:"",destroy:function(){
this.disconnectWire();
this.inherited(arguments);
},setExpression:function(_114){
this.expression=_114||"";
this.connectWire();
},setSource:function(_115){
this.source=_115;
this.connectWire();
},setTargetProperty:function(_116){
this.targetProperty=_116;
this.connectWire();
},getFullTarget:function(){
return this.target.getId()+"."+this.targetProperty;
},canSetValue:function(){
if(this.expression){
var _117=wm.expression.getSources(this.expression),ft=this.getFullTarget();
for(var i=0,s;(s=_117[i]);i++){
if(s==ft){
wm.logging&&undefined;
return false;
}
}
}
return true;
},debugBindingEvent:function(_118){
try{
if(app.debugDialog&&!this.isAncestor(app.debugDialog)&&!this.owner._inRefresh&&(!this.expression||this.expression.match(/\$/))){
var _119="";
if(this.source&&!this.expression){
var _11a=this.source;
wm.disableLazyLoad=true;
var _11b=this.getValueById(_11a);
wm.disableLazyLoad=false;
while(_11a&&_11b instanceof wm.Component==false){
if(_11a.indexOf(".")!=-1){
_11a=_11a.substring(0,_11a.lastIndexOf("."));
_11b=this.getValueById(_11a);
}else{
break;
}
}
if(_11b){
_119=_11b.getRuntimeId();
}else{
_119=this.source+" not found";
}
}else{
if(this.expression){
_119="expression";
}
}
if(_118 instanceof wm.Component){
_118=_118.getRuntimeId();
}else{
if(typeof _118=="string"){
_118="\""+_118+"\"";
}else{
_118=String(_118);
}
}
this.debugId=app.debugDialog.newLogEvent({eventType:"binding",sourceDescription:this.owner._loading?"Binding initialized":(this.expression?"Bind expression has changed":this.source+" has changed"),resultDescription:this.target.getRuntimeId()+".setValue(\""+this.targetProperty+"\", "+_118+")",eventName:this.expression?"Bind expression has changed":this.source+" has changed",affectedId:this.target.getRuntimeId(),firingId:_119,boundProperty:this.targetProperty,boundValue:_118 instanceof wm.Component?"${"+_118.getRuntimeId()+"}":(typeof _118=="object"&&_118!==null&&_118.length)?"[ARRAY]":_118,boundSource:this.source,boundExpression:this.expression});
}
}
catch(e){
}
},endDebugBindingEvent:function(){
if(this.debugId){
app.debugDialog.endLogEvent(this.debugId);
delete this.debugId;
}
},_sourceValueChanged:function(_11c){
if(wm.bindingsDisabled){
return;
}
var r=this.getRoot();
_11c=this.expression?wm.expression.getValue(this.expression,r,r):_11c;
if(this.canSetValue()){
this.debugBindingEvent(_11c);
this.target.setValue(this.targetProperty,_11c);
this.endDebugBindingEvent();
}
},sourceValueChanged:function(_11d,inV2){
wm.logging&&undefined;
this._sourceValueChanged(_11d);
},sourceTopUpdated:function(_11e,inId){
wm.logging&&undefined;
this.refreshValue();
},sourceRootUpdated:function(){
wm.logging&&undefined;
if(this.source){
this.getValueById(this.source);
}
},refreshValue:function(){
try{
if(this._isDesignLoaded&&this.source&&this.source.indexOf("[")==0&&this.getValueById(this.source)===null){
return;
}
this._sourceValueChanged(this.source?this.getValueById(this.source):"");
}
catch(e){
}
},disconnectWire:function(){
this._disconnect();
this._unsubscribe();
},_watch:function(_11f,_120){
wm.logging&&undefined;
if(_11f.match(/^\[.*\]\./)){
var pre="";
_11f=_11f.replace(/^\[(.*?)\]/,"$1");
}else{
var pre=_11f.indexOf("app.")==0?"":_120;
}
if(_11f.indexOf(".owner.")!=-1||_11f.indexOf("owner.")==0){
var _121=this.getValueById(_11f);
var _122=false;
if(!_121){
_121=this.getValueById(_11f.substring(0,_11f.lastIndexOf(".")));
_122=true;
}
if(_121){
_11f=_121.getRuntimeId()+(_122?_11f.substring(_11f.lastIndexOf(".")):"");
}
pre="";
}
var _123=pre+_11f+"-changed";
this.subscribe(_123,this,"sourceValueChanged");
wm.logging&&undefined;
_123=pre+_11f+"-ownerChanged";
this.subscribe(_123,this,"refreshValue");
wm.logging&&undefined;
var oid=_11f.split(".");
oid.pop();
oid=oid.join(".");
if(oid&&oid!="app"){
_123=pre+oid+"-ownerChanged";
this.subscribe(_123,this,"sourceTopUpdated");
wm.logging&&undefined;
var p=_11f.split("."),_124=p.shift();
if(_124=="app"&&p.length){
_124+="."+p.shift();
}
if(_124!=oid){
_123=pre+_124+"-rootChanged";
this.subscribe(_123,this,"sourceRootUpdated");
wm.logging&&undefined;
}
}
},connectWire:function(){
this.disconnectWire();
this.target=this.target||(this.targetId?this.getRoot().getValueById(this.targetId):this.owner.owner);
if(!this.target){
this.bad=true;
return;
}
if(this.targetProperty&&(this.source||this.expression)){
this.subscribe("wmwidget-idchanged",this,"wireChanged");
var rid=this.getRootId();
if(this.expression){
dojo.forEach(wm.expression.getSources(this.expression),dojo.hitch(this,function(s){
this._watch(s,rid);
}));
}else{
this._watch(this.source,rid);
}
this.refreshValue();
}
},changeExpressionId:function(_125,_126){
var e=this.expression;
o="\\${"+_125.replace(new RegExp("\\.","g"),"\\.");
n="${"+_126,r=(e.match(o+"[\\.|}]"));
e=e.replace(new RegExp(o+"\\.","g"),n+".");
e=e.replace(new RegExp(o+"}","g"),n+"}");
this.expression=e;
return r;
},isPartialId:function(inId,_127){
return (inId.indexOf(_127)==0)&&(_127.length==inId.length||inId.charAt(_127.length)==".");
},isPartialRootId:function(inId,_128){
if(!inId){
return;
}
inId=inId.match("^app.")?inId:this.getRootId()+inId;
return this.isPartialId(inId,_128);
},getWireId:function(){
return (this.targetId?this.targetId+".":"")+this.targetProperty;
},wireChanged:function(_129,_12a,_12b,_12c){
var _12d,_12e=this.getWireId();
if(this.expression){
_12d=this.changeExpressionId(_129,_12a);
}
if(this.isPartialRootId(this.source,_12b)){
_12d=true;
this.source=_12a+this.source.slice(_129.length);
}
if(this.isPartialRootId(this.targetProperty,_12b)){
_12d=true;
this.targetProperty=_12a+this.targetProperty.slice(_129.length);
}
if(this.isPartialRootId(this.targetId,_12b)){
_12d=true;
this.targetId=_12a+this.targetId.slice(_129.length);
}
if(_12d){
this.connectWire();
if(this.owner&&this.owner.wires){
delete this.owner.wires[_12e];
this.owner.wires[this.getWireId()]=this;
}
}
}});
wm.Object.extendSchema(wm.Wire,{expression:{},source:{},targetProperty:{},targetId:{}});
dojo.declare("wm.Binding",wm.Component,{constructor:function(_12f){
this.wires={};
},destroy:function(){
this.removeWires();
this.inherited(arguments);
},loaded:function(){
for(var i in this.components){
var c=this.components[i];
this.wires[c.getWireId()]=c;
c.connectWire();
}
this.inherited(arguments);
},refresh:function(){
this._inRefresh=true;
wm.forEachProperty(this.wires,function(w){
w.refreshValue();
});
this._inRefresh=false;
},addWire:function(_130,_131,_132,_133){
var id=(_130?_130+".":"")+_131;
this.removeWire(id);
var _134={name:this.getUniqueName("wire"),owner:this,targetId:_130,targetProperty:_131,source:_132,expression:_133};
var wire=this.wires[id]=new wm.Wire(_134);
wire.connectWire();
return wire;
},removeWire:function(_135,_136,_137){
var wire=this.wires[_135];
if(wire){
var s=_136==undefined||_136==wire.source,e=_137==undefined||_137==wire.expression;
if(s&&e){
wire.destroy();
delete this.wires[_135];
}
}
},findWiresByProps:function(_138){
var _139=function(w){
for(var i in _138){
if(_138[i]!=w[i]){
return;
}
}
return true;
};
return this.findWires(_139);
},findWires:function(_13a){
var f=[];
if(_13a){
wm.forEachProperty(this.wires,function(w){
if(_13a(w)){
f.push(w);
}
});
}
return f;
},removeWireByProps:function(_13b){
var _13c=this.findWiresByProps(_13b);
this.removeWiresList(_13c);
},removeWireByProp:function(_13d){
var _13e=false;
wm.forEachProperty(this.wires,dojo.hitch(this,function(w){
if(w.targetProperty==_13d){
delete this.wires[_13d];
w.destroy();
_13e=true;
}
}));
return _13e;
},removeWireList:function(_13f){
dojo.forEach(_13f,dojo.hitch(this,function(w){
this.removeWire(w.getWireId());
}));
},removeWires:function(){
wm.forEachProperty(this.wires,function(w){
w.destroy();
});
this.wires={};
},write:function(_140){
return !wm.isEmpty(this.wires)?this.inherited(arguments):null;
}});
}
if(!dojo._hasResource["wm.base.components.TypeDefinition"]){
dojo._hasResource["wm.base.components.TypeDefinition"]=true;
dojo.provide("wm.base.components.TypeDefinition");
dojo.declare("wm.TypeDefinitionField",wm.Component,{fieldType:"String",isObject:false,isList:false,fieldName:"",toTypeObj:function(){
return {type:this.fieldType,isObject:this.isObject,isList:this.isList};
}});
dojo.declare("wm.TypeDefinition",wm.Component,{internal:false,collection:"Fields",fields:null,postInit:function(){
delete this.fields;
this.doAddType();
},doRemoveType:function(){
if(!this.internal){
wm.typeManager.removeType(this.name);
}
if(this._isDesignLoaded&&studio.application&&!studio.application._isDestroying){
studio.typesChanged();
}
},doAddType:function(){
this.fieldsAsTypes={};
for(var i in this.$){
this.fieldsAsTypes[this.$[i].fieldName]=this.$[i].toTypeObj();
}
wm.typeManager.addType(this.name,{internal:this.internal,fields:this.fieldsAsTypes});
if(this._isDesignLoaded&&studio.application&&!studio.application._isDestroying){
studio.typesChanged();
studio.refreshComponentTree();
}
},destroy:function(){
wm.typeManager.removeType(this.name);
this._isDestroying=true;
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.components.Security"]){
dojo._hasResource["wm.base.components.Security"]=true;
dojo.provide("wm.base.components.Security");
wm.disableUserPrincipalCookie=false;
wm.login=function(args,_141,_142,_143,_144){
if(_143===undefined||_143==null){
_143={j_username:args[0],j_password:args[1],hash:args[2]};
}
var _145=new dojo.Deferred();
var url=(_144?"/"+_144+"/":"")+"j_spring_security_check";
if(wm.xhrPath){
url=wm.xhrPath+url;
}
var def=dojo.xhrPost({url:url,content:_143,handleAs:"json"});
var _146=function(_147){
if(_142){
_142(_147.toString());
}
_145.errback(_147);
};
def.addErrback(_146);
var _148=function(_149){
if(app&&app._loginDialog&&app._loginDialog.showing){
app._loginDialog.hide();
}
_145.callback(_149);
var _14a=location.protocol+"//"+location.host+location.pathname+location.search;
if(dojo.cookie.isSupported()&&!wm.disableUserPrincipalCookie){
var p={username:_143.j_username,roles:wm.getUserRoles(true)};
wm.setUserPrincipal(p);
}else{
wm.roles=wm.getUserRoles(true);
}
dojo.publish("wmRbacUpdate");
if(window["PhoneGap"]&&wm.serverTimeOffset===undefined){
app.getServerTimeOffset();
}
if(_141){
_141(_149);
}else{
if(window["PhoneGap"]){
app.loadPage(app.pageContainer._initialPageName);
}else{
if(_14a!=_149){
location.href=_149;
}else{
if(app._page.name=="login"&&app.main!="login"){
app.loadPage(app.main);
}
}
}
}
};
def.addCallback(function(_14b,_14c){
if(_14b.url){
_148(_14b.url);
}else{
if(_14b.error){
_146(new Error(_14b.error));
}
}
});
return _145;
};
wm.getUserPrincipal=function(){
return wm.disableUserPrincipalCookie?{}:dojo.fromJson(dojo.cookie("wmUserPrincipal"))||{};
};
wm.setUserPrincipal=function(_14d){
dojo.cookie("wmUserPrincipal",dojo.toJson(_14d));
};
wm.clearUserPrincipal=function(){
dojo.cookie("wmUserPrincipal",null,{expires:-1});
};
wm.getUserRoles=function(_14e){
if(!_14e){
if(!wm.disableUserPrincipalCookie){
if(wm.getUserPrincipal().roles){
return wm.getUserPrincipal().roles;
}
}else{
if(wm.roles){
return wm.roles;
}
}
}
var s=wm.securityService||(wm.securityService=new wm.JsonRpcService({name:"securityService",sync:true}));
try{
if(s.ready){
s.request("getUserRoles",null);
if(s.result){
return s.result;
}
}
}
catch(x){
}
};
wm.logoutSuccess=function(){
if(dojo.cookie.isSupported()&&!wm.disableUserPrincipalCookie){
wm.clearUserPrincipal();
}else{
wm.roles=[];
}
dojo.publish("wmRbacUpdate");
};
wm.logout=function(){
var s=wm.securityService||(wm.securityService=new wm.JsonRpcService({name:"securityService",sync:true,errorLevel:2}));
try{
if(s.ready){
s.request("logout",null);
window.location.reload();
}
}
catch(x){
}
};
}
if(!dojo._hasResource["wm.base.widget.layout.Layout"]){
dojo._hasResource["wm.base.widget.layout.Layout"]=true;
dojo.provide("wm.base.widget.layout.Layout");
wm.inLayout=function(_14f){
if(!_14f){
return false;
}
var s=_14f.style;
return s&&s.zIndex>=0&&s.zIndex<=1&&s.display!="none"&&s.visibility!="hidden"&&_14f.tagName!="SCRIPT"&&_14f.nodeType==1;
};
dojo.declare("wm.layout.Base",null,{inFlow:function(_150){
return _150.showing&&(_150.inFlow!==false)&&(_150 instanceof wm.Dialog&&_150.docked||_150._forceShowing||wm.inLayout(_150.domNode));
},flow:function(_151){
},suggest:function(_152,_153,_154){
},suggestSize:function(_155,_156,_157){
},insert:function(_158,_159,_15a){
}});
dojo.mixin(wm.layout,{registry:{},cache:{},register:function(_15b,_15c){
this.registry[_15b]=_15c;
},addCache:function(_15d,_15e){
this.cache[_15d]=_15e;
},listLayouts:function(){
var list=[];
for(var n in this.registry){
list.push(n);
}
return list;
}});
}
if(!dojo._hasResource["wm.base.widget.layout.Box"]){
dojo._hasResource["wm.base.widget.layout.Box"]=true;
dojo.provide("wm.base.widget.layout.Box");
dojo.declare("wm.layout.Box",wm.layout.Base,{flow:function(_15f,_160){
if(this.direction=="h"){
this._flow(_15f,"l","t","w","h",_15f.horizontalAlign,_15f.verticalAlign,_160);
}else{
this._flow(_15f,"t","l","h","w",_15f.verticalAlign,_15f.horizontalAlign,_160);
}
if(!_160){
_15f.renderControls();
}
if(_15f._autoSizeList){
var c;
while(c=_15f._autoSizeList.pop()){
c.doAutoSize(1,1);
}
}
},_flow:function(_161,_162,_163,_164,_165,_166,_167,_168){
if(_161.fitToContentHeight){
if(_161.layoutKind=="top-to-bottom"){
_166="top";
}
}
if(_161.fitToContentWidth){
if(_161.layoutKind=="left-to-right"){
_166="left";
}
}
this.handleAutoSizingWidgets(_161);
if(_161.autoScroll){
this.handleAutoScrollBars(_161);
}
var b=_161.getContentBounds();
var _169=dojo.clone(b);
if(_161.autoScroll){
if(_161._preferredWidth>b.w){
b.w=_161._preferredWidth;
}
if(_161._preferredHeight>b.h){
b.h=_161._preferredHeight;
}
}
var _16a=this.calcFlexRatio(_161.c$,_164,b[_164]);
var _16b=b[_164];
var _16c=null;
if(_16a.free){
var free=_16a.free;
for(var i=0,c;c=_161.c$[i];i++){
if(this.inFlow(c)){
if(c._percEx[_164]){
var _16d=_16a.ratio*c._percEx[_164];
var size=Math.round(_16d);
_16c=c;
_16b-=size;
var _16e=_164=="w"?"minWidth":wm.isMobile?"minMobileHeight":"minHeight";
var min=c[_16e];
if(size<min){
size=min;
}
free-=size;
}else{
_16b-=c.bounds.w;
}
}
}
switch(_166){
case "bottom":
case "right":
b[_162]+=free;
break;
case "middle":
case "center":
b[_162]+=free/2;
if(b[_162]<0){
b[_162]=0;
}
break;
}
}
var _16f=b[_163];
var _170=b[_165];
var _171=0;
var _172=0;
for(var i=0,c;c=_161.c$[i];i++){
if(this.inFlow(c)){
var _173=c._percEx[_164]?Math.round(_16a.ratio*c._percEx[_164]):NaN;
if(c._percEx[_164]&&!isNaN(_173)){
if(_16c==c&&Math.abs(_16b)<=1){
_173+=_16b;
}
}
b[_164]=_173;
if(wm.isMobile&&isNaN(b.w)){
b.w=parseInt(c.width);
}
var _16e=_164=="w"?"minWidth":wm.isMobile?"minMobileHeight":"minHeight";
if(b[_164]<c[_16e]){
b[_164]=c[_16e];
}
var _174;
if(c._percEx[_165]){
_174=b[_165]=Math.min(100,c._percEx[_165])*_170*0.01;
}else{
_174=c.bounds[_165];
if(_165=="w"&&c.width&&parseInt(c.width)>_174){
_174=parseInt(c.width);
}
delete b[_165];
}
b[_163]=_16f;
if(c._percEx.h){
var _175=c.getMinHeightProp();
if(_175>b.h){
b.h=_175;
if(_165=="h"){
_174=b.h;
}
}
}
if(c._percEx.w){
var _176=c.getMinWidthProp();
if(_176>b.w){
b.w=_176;
if(_165=="w"){
_174=b.w;
}
}
}
switch(_167){
case "justified":
if(djConfig.isDebug&&!wm.isInstanceType(_161,wm.Editor)&&_161.isDesignedComponent()&&_165=="w"&&!wm.isInstanceType(_161,wm.Layers)&&!wm.isInstanceType(_161.owner,wm.Layers)){
dojo.deprecated("justified",_161.owner.toString()+":"+_161.toString()+"'s "+((_165=="w")?"horizontalAlign":"verticalAlign")+" is set to 'justified', which may yield unexpected behaviors; please change this alignment in the property editor");
}
b[_165]=_170;
break;
case "center":
case "middle":
if(_170>_174){
b[_163]=(_16f+_170-_174)/2;
}else{
b[_163]=_16f;
}
if(b[_163]<0){
b[_163]=0;
}
break;
case "bottom":
case "right":
b[_163]=Math.max(0,_16f+_170-_174);
break;
}
if(wm.isMobile&&(b.w>_169.w||isNaN(b.w)&&c.bounds.w>_169.w)){
b.w=_169.w;
}
c.setBounds(b.l,b.t,b.w,b.h);
c._renderEngineBoundsSet=true;
if(c.flow){
c.flow();
}
b[_162]+=Math.max(0,c.bounds[_164]);
_171=Math.max(_171,c.bounds[_165]);
wm.flowees++;
}
}
},handleAutoSizingWidgets:function(_177){
if(!_177.isAncestorHiddenLayer()&&_177.showing&&(!wm.isInstanceType(_177,wm.Layer)||_177.active)){
var _178;
var _179;
for(var i=0;i<_177.c$.length;i++){
var c=_177.c$[i];
if(c.showing){
if(c._needsAutoSize&&(c.autoSizeWidth||c.autoSizeHeight)){
var _17a=(c.owner instanceof wm.Page)?c.owner.root:c.owner;
if(!_17a._autoSizeList){
_17a._autoSizeList=[];
}
if(dojo.indexOf(_17a._autoSizeList,c)==-1){
_17a._autoSizeList.push(c);
}
}else{
if(c.fitToContent){
if(c.fitToContentHeight){
c.bounds.h=c.getPreferredFitToContentHeight();
}
if(c.fitToContentWidth){
c.bounds.w=c.getPreferredFitToContentWidth();
}
c.calcFitToContent();
if(c.fitToContentWidth){
_179=true;
}
if(c.fitToContentHeight){
_178=true;
}
}
}
}
}
}
},handleAutoScrollBars:function(_17b){
if(_17b.fitToContentHeight){
_17b._xscrollY=false;
_17c="hidden";
}else{
var _17d=_17b._preferredHeight=_17b.getPreferredFitToContentHeight();
var _17e=_17d>_17b.bounds.h;
var _17c=(_17e)?"auto":"hidden";
_17b._xscrollY=(_17c=="auto");
}
if(!wm.isFakeMobile&&_17b.domNode.style.overflowY!=_17c){
_17b.domNode.style.overflowY=_17c;
_17b.domNode.scrollTop=0;
}
if(_17b.fitToContentWidth){
_17b._xscrollX=false;
_17f="hidden";
}else{
var _180=_17b._preferredWidth=_17b.getPreferredFitToContentWidth();
var _181=_180>_17b.bounds.w;
var _17f=(_181)?"auto":"hidden";
}
_17b._xscrollX=(_17f=="auto");
if(!wm.isFakeMobile&&_17b.domNode.style.overflowX!=_17f){
_17b.domNode.style.overflowX=_17f;
_17b.domNode.scrollLeft=0;
}
},calcFlexRatio:function(inC$,_182,_183){
var flex=0;
var free=_183;
var _184=0;
var _185="getMin"+((_182=="h")?"Height":"Width")+"Prop";
var _186=0;
for(var i=0,c;c=inC$[i];i++){
if(this.inFlow(c)){
_186++;
}
}
for(var i=0,c;c=inC$[i];i++){
if(this.inFlow(c)){
if(c._percEx[_182]){
var _187=c[_185]();
var _188=(Number(c._percEx[_182])||0)/100*_183;
if(_186==1){
flex=100;
_184+=_187;
}else{
if(_187<_188){
flex+=Number(c._percEx[_182])||0;
_184+=_187;
}else{
free-=Math.max(c.bounds[_182],c[_185]());
}
}
}else{
free-=c.bounds[_182];
}
}
}
if(free-_184<0){
free-=_184;
}
if(flex&&flex<100){
flex=100;
}
var _189;
if(flex&&free>0){
_189=free/flex;
}else{
_189=0;
}
return {free:free,ratio:_189};
},getMaxFreeSpace:function(inC$,_18a,_18b){
var free=_18b;
var _18c=0;
var _18d="min"+((_18a=="h")?"Height":"Width");
for(var i=0,c;c=inC$[i];i++){
if(this.inFlow(c)){
if(c._percEx[_18a]){
if(c[_18d]){
_18c+=c[_18d];
}
}else{
free-=c.bounds[_18a];
}
}
}
if(free-_18c<0){
free-=_18c;
}
return free;
}});
dojo.declare("wm.layout.HBox",wm.layout.Box,{direction:"h",suggest:function(_18e,_18f,_190){
var x=0;
for(var i=0,c;c=_18e.c$[i];i++){
if(this.inFlow(c)){
if(_190.l<c.bounds.l+c.bounds.w/2){
x=c.bounds.l-1;
break;
}
x=c.bounds.r;
_190.control=c;
}
}
if(!_190.control){
_190.control=_18e;
}
var _191=dojo.coords(_18e.domNode);
var _192=dojo.coords(_190.control.domNode);
var _193=_18e.getStyleBounds();
if(_190.control==_18e){
_190.l=_192.x;
}else{
_190.l=_192.x+_192.w;
}
_190.t=_191.y;
_190.h=_193.h;
_190.i=i;
}});
dojo.declare("wm.layout.VBox",wm.layout.Box,{direction:"v",suggest:function(_194,_195,_196){
var y=0;
for(var i=0,c;c=_194.c$[i];i++){
if(this.inFlow(c)){
if(_196.t<c.bounds.t+c.bounds.h/2){
y=c.bounds.t-1;
break;
}
y=c.bounds.b;
_196.control=c;
}
}
if(!_196.control){
_196.control=_194;
}
var _197=dojo.coords(_194.domNode);
var _198=dojo.coords(_196.control.domNode);
var _199=_194.getStyleBounds();
_196.l=_197.x;
if(_196.control==_194){
_196.t=_198.y;
}else{
_196.t=_198.y+_198.h;
}
_196.w=_199.w;
_196.i=i;
}});
wm.layout.register("left-to-right",wm.layout.HBox);
wm.layout.register("top-to-bottom",wm.layout.VBox);
wm.layout.addCache("left-to-right",new wm.layout.HBox());
wm.layout.addCache("top-to-bottom",new wm.layout.VBox());
}
if(!dojo._hasResource["wm.base.widget.AppRoot"]){
dojo._hasResource["wm.base.widget.AppRoot"]=true;
dojo.provide("wm.base.widget.AppRoot");
dojo.declare("wm.AppRoot",wm.Container,{classNames:"wmapproot",width:"",height:"",deviceSize:"",create:function(){
this.inherited(arguments);
this.deviceSize=wm.deviceSize||this.calcDeviceSize(window.innerWidth||document.documentElement.clientWidth);
app.valueChanged("deviceSize",this.deviceSize);
},build:function(){
this.domNode=this.owner.domNode=dojo.byId(this.owner.domNode)||document.body;
this.domNode.style.cssText+=this.style+"overflow: hidden; position: relative;";
dojo.attr(this.domNode,"role","application");
},init:function(){
var _19a=this.domNode.id;
this.inherited(arguments);
this.domNode.id=_19a;
this._isOldAndroidBrowser=(navigator.vendor||"").match(/Google/i)&&navigator.userAgent.match(/android/i);
if(!this._isOldAndroidBrowser&&"onorientationchange" in window){
window.addEventListener("orientationchange",dojo.hitch(this,"resize"));
}else{
this.subscribe("window-resize",this,"resize");
}
},getRuntimeId:function(){
return "approot";
},_onOrientationChange:function(){
this._inResize=true;
var _19b=Math.min(screen.width,window.innerWidth);
var _19c=Math.min(screen.height,window.innerHeight);
var max=Math.max(_19b,_19c);
var min=Math.min(_19b,_19c);
switch(window.orientation){
case 90:
case -90:
case 270:
this.setBounds(null,null,max,min);
if(app.appTitleBar){
app.appTitleBar.hide();
}
break;
default:
this.setBounds(null,null,min,max);
if(app.appTitleBar){
app.appTitleBar.show();
}
}
app.valueChanged("deviceSize",this.deviceSize);
dojo.publish("deviceSizeRecalc");
this.reflow();
this._inResize=false;
},resize:function(){
this._inResize=true;
if(!wm.deviceSize){
var _19d=this.deviceSize;
this.updateBounds();
this.deviceSize=this.calcDeviceSize(this.bounds.w);
if(_19d!=this.deviceSize){
app.valueChanged("deviceSize",this.deviceSize);
dojo.publish("deviceSizeRecalc");
}
}
this.reflow();
if(this._isOldAndroidBrowser&&app.wmMinifiedDialogPanel){
app.wmMinifiedDialogPanel.hide();
wm.onidle(app.wmMinifiedDialogPanel,"show");
}
this._inResize=false;
},updateBounds:function(){
this._percEx={w:100,h:100};
var pn=this.domNode.parentNode;
var _19e,_19f;
if(window["PhoneGap"]){
_19f=Math.min(screen.height,window.innerHeight);
pn.style.height=_19f+"px";
_19e=Math.min(screen.width,window.innerWidth||20000);
}else{
if(wm.isIOS){
if(window.orientation==90||window.orientation==-90){
var min=Math.min(window.innerWidth,window.innerHeight);
var max=Math.max(window.innerWidth,window.innerHeight);
_19e=max;
_19f=min;
}else{
_19f=Math.max(window.innerHeight,window.innerWidth);
_19e=Math.min(window.innerHeight,window.innerWidth);
}
this.domNode.style.position="relative";
}else{
if(wm.device=="phone"){
}else{
if(wm.isMobile){
pn.style.height="100%";
}
}
}
}
if(wm.isMobile){
if(!_19e){
_19e=Math.min(screen.width,window.innerWidth||20000,pn.offsetWidth);
}
if(!_19f){
_19f=Math.min(screen.height,window.innerHeight||20000,pn.offsetHeight||1000);
}
}else{
_19e=pn.offsetWidth;
_19f=pn.offsetHeight;
}
this.setBounds(0,0,_19e,_19f);
},forceRerenderComponents:function(wIn){
wm.forEachWidget(wIn,function(w){
w.invalidCss=true;
w.renderCss();
});
},reflow:function(){
if(this._cupdating){
return;
}
if(!this._inResize){
this.updateBounds();
}
this.renderBounds();
if(window["getComputedStyle"]){
try{
this.domNode.style.borderRight="solid 1px transparent";
var _1a0=Number(window.getComputedStyle(this.domNode).getPropertyValue("border-right-width").replace(/px/,""));
var _1a1=app._currentZoomLevel;
app._currentZoomLevel=1/_1a0;
if(app._currentZoomLevel==1){
app._currentZoomLevel=0;
}
if(_1a1&&_1a1!=app._currentZoomLevel){
this.forceRerenderComponents(this);
var self=this;
wm.forEachProperty(app.$,function(c){
if(c instanceof wm.Dialog){
self.forceRerenderComponents(c);
}
});
wm.forEachProperty(wm.Page.byName,function(_1a2){
dojo.forEach(_1a2,function(page){
wm.forEachProperty(page.$,function(c){
if(c instanceof wm.Dialog){
self.forceRerenderComponents(c);
}
});
});
});
}
this.domNode.style.borderRight="solid 0px transparent";
dojo.publish("BrowserZoomed");
}
catch(e){
}
}
this.inherited(arguments);
},calcDeviceSize:function(_1a3){
if(_1a3>=1800){
return "1800";
}else{
if(_1a3>=1400){
return "1400";
}else{
if(_1a3>=1150){
return "1150";
}else{
if(_1a3>=900){
return "900";
}else{
if(_1a3>=650){
return "650";
}else{
if(_1a3>=450){
return "450";
}else{
if(_1a3>=300){
return "300";
}else{
return "200";
}
}
}
}
}
}
}
}});
}
if(!dojo._hasResource["wm.base.widget.Formatters"]){
dojo._hasResource["wm.base.widget.Formatters"]=true;
dojo.provide("wm.base.widget.Formatters");
wm.formatters=["Number","Date","Time","DateTime","Currency","Array","Percent"];
wm.getFormatter=function(_1a4){
var c=_1a4;
if(c.slice(0,5)!="wm"){
c="wm."+c+"Formatter";
}
return dojo.getObject(c)||wm.DataFormatter;
};
dojo.declare("wm.DataFormatter",wm.Component,{getColProps:function(){
return {formatter:this.format};
},format:function(_1a5){
return (_1a5!==undefined)?_1a5:"&nbsp;";
},valueChanged:function(_1a6,_1a7){
this.inherited(arguments);
if(_1a6){
wm.fire(this.owner,"formatChanged");
}
}});
dojo.declare("wm.NumberFormatter",wm.DataFormatter,{digits:0,locale:"",round:false,noFormat:false,format:function(_1a8){
return (_1a8===undefined)?"-":(this.wmNoFormat?_1a8:dojo.number.format(_1a8,this.getFormatProps()));
},getFormatProps:function(){
return {places:Number(this.digits),locale:this.locale,round:this.round?0:-1};
},getColProps:function(){
return {formatter:this.format,getFormatProps:dojo.hitch(this,"getFormatProps"),wmNoFormat:this.noFormat};
}});
dojo.declare("wm.CurrencyFormatter",wm.NumberFormatter,{digits:2,currency:"",format:function(_1a9){
return (_1a9==undefined)?"-":dojo.currency.format(_1a9,this.getFormatProps());
},getFormatProps:function(){
var p=this.inherited(arguments);
p.currency=this.currency=="$"?"USD":this.currency||(this._isDesignLoaded?studio.application.currencyLocale:app.currencyLocale)||"USD";
return p;
}});
dojo.declare("wm.ArrayFormatter",wm.DataFormatter,{separator:",",joinField:"dataValue",format:function(_1aa){
var str="";
if(_1aa){
if(_1aa instanceof wm.Variable){
_1aa.forEach(dojo.hitch(this,function(item){
if(str){
str+=this.separator+" ";
}
str+=item.getValue(this.joinField);
}));
}else{
dojo.forEach(_1aa,function(item){
if(str){
str+=this.separator+" ";
}
if(item instanceof wm.Variable){
str+=item.getValue(this.joinField);
}else{
str+=item[this.joinField];
}
},this);
}
}
return str;
}});
dojo.declare("wm.DateTimeFormatter",wm.DataFormatter,{useLocalTime:true,formatLength:"medium",_selector:"",datePattern:"",timePattern:"",locale:"",format:function(_1ab){
var opts={selector:this._selector,formatLength:this.formatLength,datePattern:this.datePattern,timePattern:this.timePattern,locale:this.locale};
var d=new Date(_1ab);
if(!this.useLocalTime){
var _1ac=this._selector=="date"?360:0;
d.setHours(0,60*d.getHours()+d.getMinutes()+60*wm.timezoneOffset+_1ac);
}
if(isNaN(d.getTime())){
d=new Date(Number(_1ab));
}
return (_1ab==undefined)||isNaN(d.getTime())?"-":dojo.date.locale.format(d,opts);
},getColProps:function(){
return {_selector:this._selector,formatLength:this.formatLength,datePattern:this.datePattern,timePattern:this.timePattern,locale:this.locale,formatter:this.format};
}});
dojo.declare("wm.DateFormatter",wm.DateTimeFormatter,{_selector:"date",useLocalTime:false});
dojo.declare("wm.TimeFormatter",wm.DateTimeFormatter,{_selector:"time"});
dojo.declare("wm.PercentFormatter",wm.NumberFormatter,{divideBy100:false,getFormatProps:function(){
var p=this.inherited(arguments);
p.type="percent";
return p;
},format:function(_1ad){
_1ad=Number(_1ad);
if(this.divideBy100){
_1ad=_1ad/100;
}
return this.inherited(arguments,[_1ad]);
}});
wm.Object.extendSchema(wm.DataFormatter,{name:{ignore:1},diagnostics:{ignore:1}});
wm.Object.extendSchema(wm.DateTimeFormatter,{formatLength:{options:["short","medium","long","full"]}});
wm.Object.extendSchema(wm.DateFormatter,{timePattern:{ignore:1},useLocalTime:{ignore:0}});
wm.Object.extendSchema(wm.TimeFormatter,{datePattern:{ignore:1}});
}
if(!dojo._hasResource["wm.base.widget.Label"]){
dojo._hasResource["wm.base.widget.Label"]=true;
dojo.provide("wm.base.widget.Label");
dojo.declare("wm.Label",[wm.Control,wm.TouchMixinOptional],{width:"200px",height:"24px",caption:"Label",link:"",display:"",padding:4,singleLine:true,align:"none",init:function(){
dojo.addClass(this.domNode,"wmlabel");
this.inherited(arguments);
if(!wm.isMobile){
this.connect(this.domNode,"onclick",this,"_onclick");
}
},build:function(){
this.inherited(arguments);
if(!this.noSizeNode){
this.sizeNode=document.createElement("div");
dojo.addClass(this.sizeNode,"wmSizeNode");
this.domNode.appendChild(this.sizeNode);
}else{
this.sizeNode=this.domNode;
}
},onTouchEnd:function(evt,_1ae){
if(_1ae){
return;
}
if(document.activeElement.tagName=="INPUT"){
var id=document.activeElement.id;
var d=dijit.byId(id);
if(d){
d._onBlur();
}else{
document.activeElement.blur();
}
}
if(!this._disabled){
this.click(evt);
}
},_onclick:function(_1af){
if(this.name=="label2"){
}
if(this._disabled){
return;
}
var _1b0=dojo.isIE&&_1af?{clientX:_1af.clientX,clientY:_1af.clientY,offsetX:_1af.offsetX,offsetY:_1af.offsetY,screenX:_1af.screenX,screenY:_1af.screenY,pageX:_1af.pageX,pageY:_1af.pageY,x:_1af.x,y:_1af.y,target:_1af.target,currentTarget:_1af.currentTarget,"type":_1af.type}:_1af||{};
window.setTimeout(dojo.hitch(this,"click",_1b0),5);
},click:function(e){
this.onclick(e);
},postInit:function(){
this.inherited(arguments);
this.caption=this.label||this.content||this.caption;
delete this.content;
delete this.label;
this.renderLabel();
this.valueChanged("caption",this.caption);
this.valueChanged("link",this.link);
if(this.onclick!=this.constructor.prototype.onclick){
dojo.addClass(this.domNode,"onClickEvent");
}
},renderLabel:function(){
if(this._loading){
return;
}
var c=this.caption;
if(this.$.format){
c=this.$.format.format(c);
}else{
if(this.display&&dojo.isFunction(this.owner[this.display])){
try{
c=this.owner[this.display](this,c);
}
catch(e){
console.error("Formatter error in "+this.toString()+": "+e);
}
}
}
if(this.link){
if(this._disabled){
c=["<a href=\"#\">",c,"</a>"].join("");
}else{
c=["<a ",(this.link.indexOf("#")==-1&&this.link.indexOf("javascript")==-1)?"target=\"_blank\" ":"","href=\"",this.link,"\">",c,"</a>"].join("");
}
}
if(this.domNode.innerHTML!=c){
this.sizeNode.innerHTML=c;
}
var _1b1=(this.singleLine||this.autoSizeWidth)?"nowrap":"normal";
if(this.domNode.style.whiteSpace!=_1b1){
this.domNode.style.whiteSpace=_1b1;
}
var _1b2=(this.align=="none")?"":this.align;
if(this._align!=_1b2&&(!this.styles||!this.styles.textAlign)){
this.domNode.style.textAlign=_1b2;
this._align=_1b2;
}
},setDisabled:function(_1b3){
this.inherited(arguments);
if(!this._cupdating){
this.renderLabel();
}
},setCaption:function(_1b4){
if(_1b4==undefined){
_1b4="";
}
var _1b5=this.sizeNode.innerHTML;
if(_1b4&&dojo.isArray(_1b4)){
_1b4=_1b4.join(", ");
}else{
if(_1b4&&dojo.isObject(_1b4)&&(!this.$.format||this.$.format instanceof wm.ArrayFormatter===false)){
_1b4="";
}
}
this.caption=_1b4;
this.renderLabel();
if(_1b5!=this.sizeNode.innerHTML&&(this.autoSizeHeight||this.autoSizeWidth)){
this.scheduleAutoSize();
}
this.valueChanged("caption",_1b4);
},scheduleAutoSize:function(){
this._needsAutoSize=true;
return wm.job(this.getRuntimeId()+": doAutoSize",10,dojo.hitch(this,function(){
this.doAutoSize(true,false);
}));
},_onShowParent:function(){
if(this._needsAutoSize){
this.scheduleAutoSize();
}
},doAutoSize:function(_1b6,_1b7){
if(this._doingAutoSize||!this.autoSizeHeight&&!this.autoSizeWidth){
return;
}
if(!_1b7&&!this._needsAutoSize){
return;
}
if(this.isAncestorHidden()){
return;
}
this._doingAutoSize=true;
this._needsAutoSize=false;
var _1b8=this.sizeNode;
var _1b9=_1b8.offsetHeight;
var _1ba=_1b8.offsetWidth;
if(this.autoSizeHeight){
var _1bb=_1b9+this.padBorderMargin.t+this.padBorderMargin.b;
if(_1bb<this.minHeight){
_1bb=this.minHeight;
}
if(_1ba>this.bounds.w){
_1bb+=17;
}
this.bounds.h=_1bb;
this.height=_1bb+"px";
var p=this.parent;
while(p.parent&&(p.autoSizeHeight||p.fitToContentHeight)){
p=p.parent;
}
p.delayedReflow();
}
if(this.autoSizeWidth){
var _1bc=_1ba+this.padBorderMargin.l+this.padBorderMargin.r;
if(_1b9>this.bounds.h){
_1bc+=17;
}
this.bounds.w=_1bc;
this.width=_1bc+"px";
var p=this.parent;
while(p.parent&&(p.autoSizeWidth||p.fitToContentWidth)){
p=p.parent;
}
p.delayedReflow();
}
if(this.isDesignLoaded()&&dojo.indexOf(studio.designer.selected,this)!=-1){
studio.inspector.reinspect();
}
this._doingAutoSize=false;
},setLink:function(_1bd){
var _1be=this.link;
this.link=_1bd;
this.renderLabel();
this.valueChanged("link",_1bd);
},setSingleLine:function(_1bf){
var _1c0=this.singleLine;
this.singleLine=_1bf;
if(_1c0!=_1bf){
this.domNode.style.lineHeight=(_1bf)?this.bounds.h+"px":"normal";
}
this.renderLabel();
if(_1bf&&this.autoSizeHeight){
this.autoSizeHeight=false;
}
if(_1bf!=_1c0&&(this.autoSizeHeight||this.autoSizeWidth)){
this.scheduleAutoSize();
}
},setAlign:function(_1c1){
this.align=_1c1;
this.renderLabel();
},formatChanged:function(){
this.renderLabel();
},onclick:function(_1c2){
},toHtml:function(){
var _1c3=this.toHtmlStyles();
return "<div "+_1c3+" style='text-align:"+(this.align||"left")+";' id='"+this.domNode.id+"'>"+(this.sizeNode.innerHTML)+"</div>";
}});
wm.Label.sizingNode=document.createElement("div");
}
if(!dojo._hasResource["wm.base.widget.Spacer"]){
dojo._hasResource["wm.base.widget.Spacer"]=true;
dojo.provide("wm.base.widget.Spacer");
dojo.declare("wm.Spacer",wm.Control,{classNames:"wmspacer",border:0,getMinWidthProp:function(){
return this.minWidth||0;
},getMinHeightProp:function(){
return this.minHeight||0;
}});
}
if(!dojo._hasResource["wm.base.widget.Panel"]){
dojo._hasResource["wm.base.widget.Panel"]=true;
dojo.provide("wm.base.widget.Panel");
dojo.declare("wm.Panel",wm.Container,{classNames:"wmcontainer wmpanel",setThemeStyleType:function(_1c4){
var _1c5=this.write("");
_1c5=dojo.fromJson(_1c5.replace(/^.*?\:/,""));
var name=this.name;
var _1c6=this.parent;
var _1c7=this.owner;
var _1c8=dojo.indexOf(this.parent.c$,this);
this.destroy();
var _1c9=_1c6.createComponent(name,"wm."+(_1c4||"")+"Panel",_1c5[1],_1c5[2],_1c5[3],_1c7);
_1c6.moveControl(_1c9,_1c8);
_1c6.reflow();
studio.refreshVisualTree();
studio.select(_1c9);
},getThemeStyleType:function(){
return this.declaredClass.replace(/^wm\.(.*)Panel/,"$1");
}});
dojo.declare("wm.MainContentPanel",wm.Panel,{classNames:"wmcontainer wmpanel MainContent"});
dojo.declare("wm.EmphasizedContentPanel",wm.Panel,{classNames:"wmcontainer wmpanel EmphasizedContent"});
dojo.declare("wm.HeaderContentPanel",wm.Panel,{classNames:"wmcontainer wmpanel HeaderContent"});
dojo.declare("wm.FancyPanel",wm.Panel,{freeze:true,classNames:"wmcontainer wmfancypanel",title:"Panel Heading",labelWidget:null,containerWidget:null,layoutKind:"top-to-bottom",innerLayoutKind:"top-to-bottom",innerHorizontalAlign:"left",innerVerticalAlign:"top",margin:"6",padding:"0",border:"0",innerBorder:"3",borderColor:"#404040",width:"100%",height:"100%",_topImgWidth:0,_bottomImgWidth:0,labelHeight:30,themeStyleType:"ContentPanel",init:function(){
if(!this.labelHeight){
this.labelHeight=30;
}
var _1ca=this._classes;
var _1cb={domNode:[]};
for(var i=_1ca.domNode.length-1;i>=0;i--){
if(_1ca.domNode[i].match(/^wm_Border_(Bottom|Drop)/)){
_1cb.domNode.push(_1ca.domNode[i]);
wm.Array.removeElementAt(_1ca.domNode,i);
}
}
try{
this.layout=wm.layout.cache["top-to-bottom"];
this.inherited(arguments);
this._isDesign=this.isDesignLoaded();
this.labelWidget=new wm.Label({border:this.innerBorder,borderColor:this.borderColor,showing:Boolean(this.title),_classes:_1ca,name:"labelWidget",caption:this.title,width:"100%",height:this.labelHeight+"px",padding:"0,0,0,10",owner:this,parent:this,flags:{notInspectable:true}});
var _1cc=String(this.innerBorder);
_1cc=this._parseExtents(_1cc);
this.containerWidget=new wm.Container({_classes:_1cb,name:"containerWidget",layoutKind:this.innerLayoutKind,width:"100%",height:"100%",owner:this,parent:this,noInspector:true,autoScroll:this.autoScroll,horizontalAlign:this.innerHorizontalAlign,verticalAlign:this.innerVerticalAlign,fitToContentHeight:this.fitToContentHeight,fitToContentWidth:this.fitToContentWidth,border:"0,"+_1cc.r+","+_1cc.b+","+_1cc.l,borderColor:this.borderColor,_assignChildrenToOwner:this.owner});
this.containerWidget.setLayoutKind(this.innerLayoutKind);
this.widgets.labelWidget=this.labelWidget;
this.widgets.containerWidget=this.containerWidget;
this.setTitle(this.title);
}
catch(e){
alert("PANEL:"+e);
}
},setFitToContentHeight:function(_1cd){
this.inherited(arguments);
if(this.containerWidget){
this.containerWidget.setFitToContentHeight(_1cd);
if(!_1cd){
this.containerWidget.setHeight("100%");
}
}
},setFitToContentWidth:function(_1ce){
this.inherited(arguments);
if(this.containerWidget){
this.containerWidget.setFitToContentWidth(_1ce);
if(!_1ce){
this.containerWidget.setWidth("100%");
}
}
},setBorder:function(_1cf){
wm.Control.prototype.setBorder.call(this,"0");
},setShowing:function(_1d0){
this.inherited(arguments);
if(dojo.isIE<9){
if(this._topLeftCornerImg){
this._topLeftCornerImg.style.display=(this.showing)?"block":"none";
this._topRightCornerImg.style.display=(this.showing)?"block":"none";
}
if(this._bottomLeftCornerImg){
this._bottomLeftCornerImg.style.display=(this.showing)?"block":"none";
this._bottomRightCornerImg.style.display=(this.showing)?"block":"none";
}
}
},getMinHeightProp:function(){
if(this.minHeight){
return Number(this.minHeight);
}
if(!this.containerWidget){
return this.inherited(arguments);
}
return this.containerWidget.getMinHeightProp()+((this.labelWidget&&this.labelWidget.showing)?this.labelWidget.bounds.h:0)+30;
},getPreferredFitToContentWidth:function(){
var _1d1=this.padBorderMargin.r+this.padBorderMargin.l;
var max=0;
var sum=0;
var v;
for(var i=0,c;c=this.c$[i];i++){
if(this.layout.inFlow(c)){
if(c instanceof wm.Container){
if(c.fitToContentWidth||c._percEx.w){
v=c.getPreferredFitToContentWidth();
}else{
v=c.bounds.w;
}
}else{
if(c._percEx.w){
v=c.getMinWidthProp();
}else{
v=c.bounds.w;
}
}
max=Math.max(max,v);
sum+=v;
}
}
var _1d2=((this.layoutKind=="top-to-bottom")?max:sum)+_1d1;
return Math.max(this.minWidth,Math.max(_1d2,30));
},getPreferredFitToContentHeight:function(){
var _1d3=this.padBorderMargin.t+this.padBorderMargin.b;
var max=0;
var sum=0;
var v;
for(var i=0,c;c=this.c$[i];i++){
if(this.layout.inFlow(c)){
if(c instanceof wm.Container){
if(c.fitToContentHeight||c._percEx.h){
v=c.getPreferredFitToContentHeight();
}else{
v=c.bounds.h;
}
}else{
if(c.fitToContentHeight||c._percEx.h){
v=c.getMinHeightProp();
}else{
v=c.bounds.h;
}
}
max=Math.max(max,v);
sum+=v;
}
}
var _1d4=((this.layoutKind=="left-to-right")?max:sum)+_1d3;
return Math.max(this.minHeight,Math.max(_1d4,15));
},destroy:function(){
if(dojo.isIE<9){
if(this._topLeftCornerImg){
dojo.destroy(this._topLeftCornerImg);
dojo.destroy(this._topRightCornerImg);
}
if(this._bottomLeftCornerImg){
dojo.destroy(this._bottomLeftCornerImg);
dojo.destroy(this._bottomRightCornerImg);
}
}
this.inherited(arguments);
},flow:function(){
this.inherited(arguments);
if(dojo.isIE<9){
this.renderCorners();
}
},renderCorners:function(){
if(!this._topLeftCornerImg){
return;
}
if(this._topLeftCornerImg.className.match(/px/)){
this._topLeftCornerImg.style.top=this._topRightCornerImg.style.top=(this.bounds.t+this.marginExtents.t)+"px";
this._topLeftCornerImg.style.left=(this.bounds.l+this.marginExtents.l)+"px";
this._topRightCornerImg.style.left=(this.bounds.r-this._topImgWidth-this.marginExtents.r)+"px";
}
if(this._bottomLeftCornerImg.className.match(/px/)){
this._bottomLeftCornerImg.style.top=this._bottomRightCornerImg.style.top=(this.bounds.b-this.marginExtents.b-this._bottomImgHeight)+"px";
this._bottomLeftCornerImg.style.left=(this.bounds.l+this.marginExtents.l)+"px";
this._bottomRightCornerImg.style.left=(this.bounds.r-this._bottomImgWidth-this.marginExtents.r)+"px";
}
},postInit:function(){
var _1d5=[];
for(var i=0;i<this.c$.length;i++){
var c=this.c$[i];
if(this.$[c.name]!=c&&c instanceof wm.Control){
_1d5.push(c);
}
}
for(var i=0;i<_1d5.length;i++){
var c=_1d5[i];
c.setParent(this.containerWidget);
if(c.designWrapper){
c.designWrapper.controlParentChanged();
}
}
this.inherited(arguments);
},writeComponents:function(_1d6,_1d7){
var _1d8=[];
if(this.containerWidget){
_1d8=_1d8.concat(this.containerWidget.writeComponents(_1d6,_1d7));
}
if(this.components.binding&&!wm.isEmpty(this.components.binding.$)){
_1d8=_1d8.concat(this.components.binding.write(_1d6,_1d7));
}
return _1d8;
},setInnerHorizontalAlign:function(_1d9){
this.innerHorizontalAlign=_1d9;
if(this.containerWidget){
this.containerWidget.setHorizontalAlign(_1d9);
}
},setInnerVerticalAlign:function(_1da){
this.innerVerticalAlign=_1da;
if(this.containerWidget){
this.containerWidget.setVerticalAlign(_1da);
}
},setInnerLayoutKind:function(_1db){
this.innerLayoutKind=_1db;
if(this.containerWidget){
this.containerWidget.setLayoutKind(_1db);
}
},setInnerBorder:function(_1dc){
_1dc=String(_1dc);
this.innerBorder=_1dc;
this.labelWidget.setBorder(_1dc);
var b=this._parseExtents(_1dc);
this.containerWidget.setBorder("0,"+b.r+","+b.b+","+b.l);
},setLayoutKind:function(_1dd){
wm.Panel.prototype.setLayoutKind.call(this,"top-to-bottom");
if(this.containerWidget){
this.setInnerLayoutKind(_1dd);
}
},setTitle:function(_1de){
var _1df=this.title;
this.title=_1de;
if(this.containerWidget){
this.labelWidget.setCaption(_1de);
this.labelWidget.setShowing(Boolean(_1de));
}
},setThemeStyleType:function(_1e0){
this.containerWidget.setThemeStyleType(_1e0);
this.themeStyleType=_1e0;
},setLabelHeight:function(_1e1){
this.labelHeight=_1e1;
this.labelWidget.setHeight(_1e1);
},toHtml:function(_1e2){
var _1e3=_1e2-12;
return "<div id='"+this.domNode.id+"' class='"+this.classNames+"'><div class='wmFancyPanel-labelWidget'>"+this.title+"</div><div class='wmFancyPanel-containerWidget'>"+this.containerWidget.toHtml(_1e3)+"</div></div>";
}});
}
if(!dojo._hasResource["wm.base.widget.Layout"]){
dojo._hasResource["wm.base.widget.Layout"]=true;
dojo.provide("wm.base.widget.Layout");
dojo.declare("wm.Layout",wm.Container,{mobileFoldingType:"wm.TabLayers",classNames:"wmlayout",autoScroll:true,fit:false,width:"100%",height:"100%",_mobileFolded:false,create:function(){
this.inherited(arguments);
},build:function(){
this.inherited(arguments);
this.domNode.style.cssText+=this.style+"overflow: hidden; position: relative;";
},init:function(){
if(this.isDesignLoaded()&&this.owner==studio.page){
this.parent=studio.designer;
}else{
if(this.owner&&this.owner.owner instanceof wm.PageContainer){
this.parent=this.owner.owner;
}
}
this.inherited(arguments);
this.subscribe("deviceSizeRecalc",this,"resize");
},postInit:function(){
this.inherited(arguments);
if(app.appRoot.deviceSize=="tiny"||app.appRoot.deviceSize=="300"){
this.foldUI();
}
},resize:function(){
if(app.appRoot.deviceSize=="tiny"||app.appRoot.deviceSize=="300"){
if(!this._mobileFolded){
this.foldUI();
}
}else{
if(this._mobileFolded){
this.unfoldUI();
}
}
},foldUI:function(){
if(!this.owner.enableMobileFolding){
return;
}
this._mobileFolded=true;
var _1e4;
var _1e5=[];
var _1e6=false;
wm.forEachWidget(this,function(w){
if(w._mobileFoldingParent){
}else{
if(w.mobileFolding){
_1e5.push(w);
w._mobileFoldingParentIndex=w.parent.indexOfControl(w);
_1e6=true;
}else{
if(w.isMobileFoldingParent&&!_1e4){
_1e4=w;
}
}
}
},true);
if(!_1e4){
_1e4=this;
}
if(_1e5.length>1||_1e4 instanceof wm.Layers&&_1e4.layers.length>=1&&_1e5.length>=1){
var _1e7;
if(!_1e4.showing){
_1e4.setShowing(true);
}
if(_1e4 instanceof wm.Layers==false){
var ctor=dojo.getObject(this.mobileFoldingType)||wm.TabLayers;
this.mobileFoldingLayers=new ctor({owner:this.owner,parent:_1e4,name:"_mobileLayers",width:"100%",height:"100%"});
this.mobileFoldingLayers.setIndexInParent(0);
_1e4=this.mobileFoldingLayers;
}else{
this.owner._mobileLayers=_1e4;
_1e4.setIndexInParent(_1e5[0].getIndexInParent());
}
var _1e8=_1e4.transition;
_1e4.transition="none";
_1e4._cupdating=true;
_1e5=_1e5.sort(function(a,b){
if(a.mobileFoldingIndex===b.mobileFoldingIndex||a.mobileFoldingIndex>b.mobileFoldingIndex){
return 1;
}else{
return -1;
}
});
for(var i=0;i<_1e5.length;i++){
_1e5[i]._mobileFoldingParent=_1e5[i].parent;
if(_1e5[i] instanceof wm.Layer==false){
_1e5[i]._mobileFoldingWidth=_1e5[i].width;
_1e5[i]._mobileFoldingHeight=_1e5[i].height;
var l=_1e4.addLayer(_1e5[i].mobileFoldingCaption,true);
_1e5[i].setParent(l);
_1e5[i].setWidth("100%");
_1e5[i].setHeight("100%");
l._mobileFoldingGenerated=true;
}else{
if(_1e5[i].parent!=_1e4){
var l=_1e5[i];
_1e5[i].setParent(_1e4);
}else{
var l=_1e5[i];
}
}
if(String(_1e5[i].mobileFoldingIndex).length){
_1e4.moveLayerIndex(_1e4.layers[_1e4.layers.length-1],Number(_1e5[i].mobileFoldingIndex));
if(_1e5[i].active){
_1e4.layerIndex=_1e5[i].getIndex();
}
}
}
_1e4._cupdating=false;
if(_1e7){
_1e7.activate();
}else{
_1e4.setLayerIndex(0);
}
_1e4.transition=_1e8;
if(this.mobileFoldingLayers){
for(var i=1;i<this.c$.length;i++){
var c=this.c$[i];
if(c.showing){
c.hide();
c._mobileFoldingShowing=true;
}
}
}
}
wm.fire(this.owner,"onMobileFolding");
},unfoldUI:function(){
if(!this.owner.enableMobileFolding){
return;
}
this._mobileFolded=false;
if(this.mobileFoldingLayers){
for(var i=1;i<this.c$.length;i++){
var c=this.c$[i];
if(c._mobileFoldingShowing){
c.setShowing(true);
delete c._mobileFoldingShowing;
}
}
}
var _1e9=[];
wm.forEachWidget(this,function(w){
if(w._mobileFoldingParent){
if(w.parent!=w._mobileFoldingParent){
w.setParent(w._mobileFoldingParent);
}
if(w instanceof wm.Layer){
w.parent.setLayerIndex(w,w._mobileFoldingParentIndex);
}else{
w.parent.moveControl(w,w._mobileFoldingParentIndex);
}
if(w._mobileFoldingWidth){
w.setWidth(w._mobileFoldingWidth);
w.setHeight(w._mobileFoldingHeight);
}
delete w._mobileFoldingParent;
delete w._mobileFoldingParentIndex;
}
if(w._mobileFoldingGenerated){
_1e9.push(w);
}
},true);
var _1ea;
var _1eb;
dojo.forEach(_1e9,function(w){
w._cupdating=true;
if(!_1eb){
_1eb=w.parent;
_1ea=_1eb.layerIndex;
}
if(w.getIndex()>=w.parent.layerIndex){
_1ea--;
}
w.destroy();
w._cupdating=false;
});
if(this.mobileFoldingLayers){
this.mobileFoldingLayers.destroy();
delete this.mobileFoldingLayers;
}
delete this.owner._mobileLayers;
if(_1eb&&!_1eb.isDestroyed){
_1eb.setLayerIndex(Math.max(0,_1ea));
}
wm.fire(this.owner,"onMobileUnfolding");
},updateBounds:function(){
this._percEx={w:100,h:100};
this.setBounds(this.parent.getContentBounds());
},reflow:function(){
if(this._cupdating||this.isDestroyed){
return;
}
this.updateBounds();
this.renderBounds();
this.inherited(arguments);
}});
wm.LayoutBox=wm.Layout;
}
if(!dojo._hasResource["wm.base.widget.Buttons.ToolButton"]){
dojo._hasResource["wm.base.widget.Buttons.ToolButton"]=true;
dojo.provide("wm.base.widget.Buttons.ToolButton");
dojo.declare("wm.ToolButton",[wm.Control,wm.TouchMixinOptional],{enableTouchHeight:true,mobileHeight:"40px",width:"80px",border:0,padding:"",margin:"",caption:"",classNames:"wmtoolbutton",iconUrl:"",iconWidth:"16px",iconHeight:"16px",iconMargin:"0 10px 0 0",clicked:false,build:function(){
if(!this.domNode){
this.domNode=document.createElement("button");
dojo.attr(this.domNode,"type","button");
}
this.btnNode=this.domNode;
},init:function(){
this.inherited(arguments);
if(!wm.isMobile){
this.connect(this.btnNode,"onclick",this,function(evt){
this.click(evt,true);
});
}
this.imageListChanged();
},onTouchStart:function(evt,_1ec){
dojo.addClass(this.btnNode,"Active");
},onTouchMove:function(){
dojo.removeClass(this.btnNode,"Active");
},onTouchEnd:function(evt,_1ed){
if(_1ed){
return;
}
dojo.removeClass(this.btnNode,"Active");
if(document.activeElement.tagName=="INPUT"){
var id=document.activeElement.id;
var d=dijit.byId(id);
if(d){
d._onBlur();
}else{
document.activeElement.blur();
}
}
this.click(evt,true);
},click:function(_1ee,_1ef){
if(!this._disabled){
if(!this.clicked){
this.setProp("clicked",true);
}
if(!_1ef){
this.onclick(_1ee,this);
}else{
var _1f0=dojo.isIE&&_1ee?{clientX:_1ee.clientX,clientY:_1ee.clientY,offsetX:_1ee.offsetX,offsetY:_1ee.offsetY,screenX:_1ee.screenX,screenY:_1ee.screenY,pageX:_1ee.pageX,pageY:_1ee.pageY,x:_1ee.x,y:_1ee.y,target:_1ee.target,currentTarget:_1ee.currentTarget,"type":_1ee.type}:_1ee||{};
wm.onidle(this,function(){
if(!this._isDestroyed){
this.onclick(_1f0,this);
}
});
}
if(app.toolTipDialog&&this==app.toolTipDialog.tipOwner){
app.toolTipDialog.hide();
}
}
},onclick:function(){
},setDisabled:function(_1f1){
var _1f2=this._disabled;
this.inherited(arguments);
var _1f3=this._disabled;
if(Boolean(_1f2)!=Boolean(_1f3)||this._cupdating){
this.btnNode.disabled=_1f3?"disabled":"";
dojo[_1f3?"addClass":"removeClass"](this.domNode,"wmbutton-disabled");
if(this._imageList&&parseInt(this.imageIndex)!=NaN&&this.imageIndex!=-1&&this.declaredClass=="wm.ToolButton"){
this.updateImageListButtonHtml();
}
}
},setSelected:function(_1f4){
this.selected=_1f4;
if(this._imageList&&this.imageIndex&&this.declaredClass=="wm.ToolButton"){
this.updateImageListButtonHtml();
}
},setCaption:function(_1f5){
this.caption=_1f5;
if(!this._cupdating){
this.invalidCss=true;
this.render(true,true);
}
this.valueChanged("caption",this.caption);
},setIconUrl:function(_1f6){
this.iconUrl=_1f6;
this.invalidCss=true;
this.render(true,true);
},setIconWidth:function(w){
this.iconWidth=w;
this.invalidCss=true;
this.render(true,true);
},setIconHeight:function(h){
this.iconHeight=h;
this.invalidCss=true;
this.render(true,true);
},setIconMargin:function(m){
this.iconMargin=m;
this.invalidCss=true;
this.render(true,true);
},setContent:function(_1f7){
this.setCaption(_1f7);
},imageListChanged:function(){
this.inherited(arguments);
this.invalidCss=true;
this.render(true,true);
},getCurrentImageIndex:function(){
if(this.declaredClass!="wm.ToolButton"){
return this.inherited(arguments);
}else{
if(this._disabled){
return this.imageIndex+this._imageList.colCount*2;
}
if(this.selected){
return this.imageIndex+this._imageList.colCount;
}
}
return this.imageIndex;
},updateImageListButtonHtml:function(){
var sl=this.singleLine?"line-height: "+this.height+"; ":"";
var _1f8=this.caption?"<span style=\"padding-left: 2px; "+sl+"\">"+(this.caption==undefined?"":this.caption)+"</span>":"";
var ii=this.getCurrentImageIndex();
this.btnNode.innerHTML=this._imageList.getImageHtml(ii)+_1f8;
},render:function(_1f9,_1fa){
if(!_1f9&&(!this.invalidCss||!this.isReflowEnabled())){
return;
}
if(!_1fa){
this.inherited(arguments);
}
var il=this._imageList;
if(il&&il.getImageHtml&&this.imageIndex>=0){
if(this.btnNode!=this.domNode){
this.btnNode.style.padding="0px";
}
this.updateImageListButtonHtml();
}else{
if(this.iconUrl){
var url=this.iconUrl;
var root;
if(url.indexOf("lib/")===0){
root=dojo.moduleUrl("lib").path.replace(/lib\/$/,"");
url=root+url;
}else{
root=this.getPath()||"";
}
var sl=this.singleLine?"line-height: "+this.height+"; ":"";
var _1fb=this.caption?"<span style=\"padding-left: 2px; "+sl+"\">"+(this.caption==undefined?"":this.caption)+"</span>":"";
this.btnNode.innerHTML="<img src='"+wm.theme.getImagesPath()+"blank.gif' style='margin: "+this.iconMargin+"; width: "+this.iconWidth+"; height: "+this.iconHeight+"; vertical-align: middle; background:url("+root+url+") no-repeat; background-color: transparent;' />"+_1fb;
if(this.btnNode!=this.domNode){
this.btnNode.style.padding="0px";
}
}else{
this.btnNode.innerHTML=this.caption;
if(this.btnNode!=this.domNode){
this.btnNode.style.padding="";
}
}
}
},renderBounds:function(){
this.inherited(arguments);
if(dojo.isIE&&dojo.isIE<9){
if(this.btnNode.firstChild&&this.btnNode.firstChild.style){
this.btnNode.firstChild.style.padding="1px";
wm.job(this.getRuntimeId()+".IEButtonTrick",5,dojo.hitch(this,function(){
this.btnNode.firstChild.style.padding="0px";
}));
}else{
this.btnNode.style.padding=this.padding=="1"?"2":"1";
wm.job(this.getRuntimeId()+".IEButtonTrick",5,dojo.hitch(this,function(){
this.btnNode.style.padding=this.paddingExtents.t+"px "+this.paddingExtents.r+"px "+this.paddingExtents.b+"px "+this.paddingExtents.l+"px";
}));
}
}
},destroy:function(){
if(this.btnNode){
dojo.destroy(this.btnNode);
this.btnNode=null;
}
if(this.domNode){
dojo.destroy(this.domNode);
this.domNode=null;
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.Buttons.Button"]){
dojo._hasResource["wm.base.widget.Buttons.Button"]=true;
dojo.provide("wm.base.widget.Buttons.Button");
dojo.declare("wm.Button",wm.ToolButton,{desktopHeight:"32px",height:"32px",border:1,borderColor:"#ABB8CF",margin:4,caption:"Button",classNames:"wmbutton"});
dojo.declare("wm.IconButton",wm.Button,{build:function(){
this.inherited(arguments);
var html="<table class='dijitMenuTable' style='width:100%'><tbody class='dijitReset'><tr class='dijitMenuItem dijitReset'><td class='dijitReset dijitMenuItemIconCell' style='width:"+(parseInt(this.iconWidth)+4)+"px;'><"+(this._useIconUrl?"img":"div")+" style='display:none;width:"+this.iconWidth+";height:"+this.iconHeight+";'/></td><td class='dijitReset dijitMenuItemLabel'>"+this.caption+"</td><td class='dijitReset dijitMenuArrow'><div class='popupIcon'/></td></tr></tbody></table>";
this.domNode.innerHTML=html;
},render:function(_1fc){
if(!_1fc&&(!this.invalidCss||!this.isReflowEnabled())){
return;
}
wm.Control.prototype.render.call(this,_1fc);
dojo.query(".dijitMenuItemLabel",this.domNode)[0].innerHTML=this.caption;
var img=this._iconImage=dojo.query(".dijitMenuItemIconCell "+(this._useIconUrl?"img":"div"),this.domNode)[0];
img.style.width=this.iconWidth;
img.style.height=this.iconHeight;
if(this.iconUrl){
img.src=this.iconUrl;
}
img.style.display=this.iconUrl||this.iconClass?"block":"none";
var _1fd=parseInt(this.iconWidth)||0;
img.parentNode.style.width=(_1fd+4)+"px";
}});
dojo.declare("wm.MobileIconButton",wm.ToolButton,{direction:"down",caption:"Back",height:"40px",displayWhenHistoryEmpty:"",historyEmptyIfLessThanOrEqualTo:0,classNames:"wmMobileButton",init:function(){
this.inherited(arguments);
if(!this._isDesignLoaded&&this.direction=="back"&&this.displayWhenHistoryEmpty){
this.connect(app,"_onBack",this,"updateEmptyState");
this.connect(app,"addHistory",this,"updateEmptyState");
this.updateEmptyState();
}
},updateEmptyState:function(){
var _1fe=app.history&&app.history.length>this.historyEmptyIfLessThanOrEqualTo;
switch(this.displayWhenHistoryEmpty){
case "hidden":
this.setShowing(_1fe);
break;
case "disabled":
this.setDisabled(!_1fe);
break;
}
},build:function(){
this.inherited(arguments);
if(this.direction=="back"){
var btn=dojo.create("DIV",{className:"mblArrowBackButton"},this.domNode,"first");
var head=dojo.create("DIV",{className:"mblArrowBackButtonHead"},btn);
var body=dojo.create("DIV",{className:"mblArrowBackButtonBody mblArrowButtonText",innerHTML:this.caption},btn);
this.captionNode=body;
dojo.addClass(this.domNode,"wmBackButton");
}else{
var icon=this.iconNode=document.createElement("div");
dojo.addClass(icon,"mblArrow "+"mbl"+wm.capitalize(this.direction)+"Arrow");
this.domNode.appendChild(icon);
}
},setCaption:function(_1ff){
this.caption=_1ff;
if(this.captionNode){
this.captionNode.innerHTML=_1ff;
}
},render:function(_200,_201){
wm.Control.prototype.render.call(this,_200);
}});
}
if(!dojo._hasResource["wm.base.widget.Buttons.ToggleButton"]){
dojo._hasResource["wm.base.widget.Buttons.ToggleButton"]=true;
dojo.provide("wm.base.widget.Buttons.ToggleButton");
dojo.declare("wm.ToggleButton",wm.ToolButton,{height:"32px",border:1,borderColor:"#ABB8CF",margin:4,captionUp:"Btn Up",captionDown:"Btn Down",classNames:"wmbutton wmtogglebutton",init:function(){
this.caption=this.captionUp;
this.inherited(arguments);
if(this.clicked){
this.setClicked(true);
}
},click:function(_202){
this.setProp("clicked",!this.clicked);
wm.onidle(this,function(){
this.onclick(_202,this);
});
},setClicked:function(_203){
if(_203!=this.clicked||this._cupdating){
this.clicked=_203;
this.valueChanged("clicked",_203);
this.setCaption(this.clicked?this.captionDown:this.captionUp);
dojo[this.clicked?"addClass":"removeClass"](this.domNode,"toggleButtonDown");
}
},setCaptionUp:function(_204){
this.captionUp=_204;
if(!this.clicked){
this.setCaption(_204);
}
},setCaptionDown:function(_205){
this.captionDown=_205;
if(this.clicked){
this.setCaption(_205);
}
}});
dojo.declare("wm.ToggleButtonPanel",wm.Container,{border:"1",buttonBorder:"0,1,0,0",lastButtonBorder:"0",manageURL:false,manageHistory:false,classNames:"wmtogglebuttonpanel",layoutKind:"left-to-right",currentButton:-1,currentButtonName:"",currentButtonCaption:"",height:"40px",enableTouchHeight:true,width:"100%",buttonMargins:"0",init:function(){
this._btns=[];
this.inherited(arguments);
},postInit:function(){
this.inherited(arguments);
if(this.manageURL&&this.owner.locationState){
this.restoreFromLocationHash(this.owner.locationState[this.getRuntimeId()]);
}
if(this.buttonBorder||this.lastButtonBorder){
dojo.forEach(this.c$,function(_206,i){
var _207=i==this.c$.length-1?this.lastButtonBorder||this.buttonBorder:this.buttonBorder;
if(_206.border!=_207){
_206.setBorder(_207);
}
},this);
}
if(this.buttonBorderColor){
dojo.forEach(this.c$,function(_208,i){
if(_208.borderColor!=this.buttonBorderColor){
_208.setBorderColor(this.buttonBorderColor);
}
},this);
}
},addWidget:function(_209){
this.inherited(arguments);
if(_209 instanceof wm.ToolButton){
_209.setHeight("100%");
this._btns.push(_209);
_209.connect(_209,"onclick",dojo.hitch(this,"changed",_209));
_209.setMargin(this.buttonMargins);
}
},removeWidget:function(_20a){
this.inherited(arguments);
wm.Array.removeElement(this._btns,_20a);
},changed:function(_20b){
var _20c=this.currentButton;
if(_20b instanceof wm.ToolButton){
this.currentButton=_20b;
this.currentButtonName=_20b.name;
this.currentButtonCaption=_20b.caption;
if(_20b){
dojo.addClass(_20b.domNode,"toggleButtonDown");
}
if(this.currentButton!==_20c){
if(_20c instanceof wm.ToolButton){
_20c.setValue("clicked",false);
}
this.valueChanged("currentButton",this.currentButton);
this.onChange(this.currentButton);
}
this.currentButton.clicked=true;
}else{
if(_20c instanceof wm.ToolButton){
_20c.setValue("clicked",false);
}
this.currentButton=null;
if(_20c instanceof wm.ToolButton){
this.valueChanged("currentButton",this.currentButton);
this.onChange(this.currentButton);
}
}
this.valueChanged("currentButtonName",this.currentButtonName);
this.valueChanged("currentButtonCaption",this.currentButtonCaption);
if(_20c instanceof wm.ToolButton&&_20c!=_20b){
dojo.removeClass(_20c.domNode,"toggleButtonDown");
if(!this._isDesignLoaded&&!this._inBack&&this.manageHistory&&_20b){
app.addHistory({id:this.getRuntimeId(),options:{name:_20c.name},title:_20b.caption+" Selected"});
}
}
},setCurrentButton:function(_20d){
var self=this;
wm.job(this.getRuntimeId()+".setCurrentButton",1,function(){
if(_20d instanceof wm.ToolButton){
_20d.click({type:"click"});
}else{
self.changed(null);
}
});
},onChange:function(_20e){
},handleBack:function(_20f){
this._inBack=true;
var name=_20f?_20f.name:null;
var _210=this.owner[name];
if(_210&&this.currentButton!=_210){
_210.click({type:"click"});
}
delete this._inBack;
return true;
},restoreFromLocationHash:function(_211){
this.manageHistory=false;
if(_211!==undefined){
if(this.owner[_211]){
this.setCurrentButton(this.owner[_211]);
}
}
this.manageHistory=true;
},generateStateUrl:function(_212){
if(this.currentButton){
_212[this.getRuntimeId()]=this.currentButton.name;
}
}});
}
if(!dojo._hasResource["wm.base.widget.Picture"]){
dojo._hasResource["wm.base.widget.Picture"]=true;
dojo.provide("wm.base.widget.Picture");
dojo.declare("wm.Picture",[wm.Control,wm.TouchMixinOptional],{aspect:"none",hint:"",width:"100px",height:"100px",link:"",source:"",init:function(){
this.inherited(arguments);
var d=this.domNode;
d.innerHTML="<a><img></a>";
dojo.addClass(d,"wmpicture");
this.linkNode=d.firstChild;
this._touchNode=this.img=this.linkNode.firstChild;
dojo.addClass(this.img,"wmpicture-image");
if(!wm.isMobile){
this.connect(this.img,"click",this,"_onclick");
this.connect(this.linkNode,"click",this,"_onclick");
}
this.setSource(this.source);
this.setAspect(this.aspect);
this.setLink(this.link);
if(this.imageList){
this.imageListChanged();
}
},postInit:function(){
this.inherited(arguments);
if(this.onclick!=this.constructor.prototype.onclick){
dojo.addClass(this.domNode,"onClickEvent");
}
},setSource:function(_213){
this.source=_213||"";
this.valueChanged("source",this.source);
this.img.style.display=this.source?"":"none";
var root;
if(this.source.slice(0,4)=="http"||this.source.slice(0,1)=="/"){
root="";
}else{
if(this.source.indexOf("lib/")==0){
root=dojo.moduleUrl("lib").path.replace(/lib\/$/,"");
}else{
root=this.getPath();
}
}
this.img.src=root+this.source;
},setAspect:function(_214){
var s=this.img.style,w="width",h="height",a=this.aspect=_214;
s.width=(a=="v"?"100%":"");
s.height=(a=="h"?"100%":"");
},setLink:function(_215){
this.link=_215;
if(_215){
this.linkNode.target="_blank";
this.linkNode.href=_215;
}else{
this.linkNode.removeAttribute("href");
}
this.valueChanged("link",_215);
},onTouchEnd:function(evt,_216){
if(_216){
return;
}
if(document.activeElement.tagName=="INPUT"){
var id=document.activeElement.id;
var d=dijit.byId(id);
if(d){
d._onBlur();
}else{
document.activeElement.blur();
}
}
if(!this._disabled){
this.onclick(evt);
}
},_onclick:function(_217){
dojo.stopEvent(_217);
if(this._disabled){
return;
}
var _218=dojo.isIE&&_217?{clientX:_217.clientX,clientY:_217.clientY,offsetX:_217.offsetX,offsetY:_217.offsetY,screenX:_217.screenX,screenY:_217.screenY,pageX:_217.pageX,pageY:_217.pageY,x:_217.x,y:_217.y,target:_217.target,currentTarget:_217.currentTarget,"type":_217.type}:_217||{};
window.setTimeout(dojo.hitch(this,"onclick",_218),5);
},onclick:function(){
},imageListChanged:function(){
this.inherited(arguments);
if(this._imageList){
this.linkNode.style.display="inline-block";
this.linkNode.className="wmpicture "+this._imageList.getImageClass(this.imageIndex);
}
},toHtml:function(){
var _219=this.toHtmlStyles();
return "<img "+_219+" class='wmpicture' style='width:"+this.bounds.w+"px;height:"+this.bounds.h+"px' src='"+this.img.src+"'/>";
}});
}
if(!dojo._hasResource["wm.base.widget.PageContainer"]){
dojo._hasResource["wm.base.widget.PageContainer"]=true;
dojo.provide("wm.base.widget.PageContainer");
wm.pagesFolder="pages/";
dojo.declare("wm.PageContainer",wm.Control,{manageHistory:false,manageURL:false,subpageProplist:null,subpageEventlist:null,subpageMethodlist:null,width:"100%",height:"100%",pageName:"",phonePageName:"",tabletPageName:"",deferLoad:false,loadParentFirst:true,classNames:"wmpagecontainer",init:function(){
this.pageLoadedList=[];
this.inherited(arguments);
this.createPageLoader();
this.pageLoadedDeferred=new dojo.Deferred();
this.updatePageName();
this._initialPageName=this._pageName;
if(this.manageURL&&app&&app.locationState&&app.locationState[this.getRuntimeId()]){
this.pageName=this._pageName=app.locationState[this.getRuntimeId()];
this._restoringLocationState=true;
}
if(app&&app.locationState){
this._locationState=app.locationState;
}
if(!this.deferLoad||!this.isAncestorHidden()){
this.loadPage(this._pageName);
}
dojo.addOnWindowUnload(this,"destroy");
if(this.subpageEventlist&&!this._isDesignLoaded){
for(var _21a in this.subpageEventlist){
if(this[_21a]===undefined){
this[_21a]=function(){
};
}
}
}
if(this.subpageMethodlist&&!this._isDesignLoaded){
wm.forEachProperty(this.subpageMethodlist,dojo.hitch(this,function(_21b,name){
this[name]=dojo.hitch(this,function(){
var w=this.page.getValueById(_21b.replace(/\..*?$/,""));
var f=w[_21b.replace(/^.*\./,"")];
f.apply(w,arguments);
});
}));
}
if(this._isDesignLoaded){
this.subscribe("deviceSizeRecalc",dojo.hitch(this,"updateDesignTimePageName"));
}
},updatePageName:function(){
var _21c=this._isDesignLoaded?studio.currentDeviceType:wm.device;
if(_21c=="phone"&&this.phonePageName){
this._pageName=this.phonePageName;
}else{
if(_21c=="tablet"&&this.tabletPageName){
this._pageName=this.tabletPageName;
}else{
this._pageName=this.pageName;
}
}
if(this._isDesignLoaded&&!this._cupdating){
this.loadPage(this._pageName);
}
},postInit:function(){
this.inherited(arguments);
if(this.isDesignedComponent()&&this.designWrapper){
dojo.addClass(this.designWrapper.domNode,"pageContainerDesignWrapper");
this.designWrapper.domNode.style.backgroundColor="white";
this.createOpenPageButton();
}
if(this.isDesignedComponent()&&this.getRoot() instanceof wm.Application){
this.subscribe("Page-Saved",dojo.hitch(this,function(){
if(this._pageName==studio.project.pageName){
this.forceReloadPage();
}
}));
}
},setBoundProp:function(_21d){
if(this["_inSetBoundProp_"+_21d]){
return;
}
this["_inSetBoundProp_"+_21d]=true;
try{
var _21e=this.getProp(_21d);
this[_21d]=_21e;
this.valueChanged(_21d,_21e);
if(_21e instanceof wm.Variable){
var id=this.getRuntimeId(_21d);
dojo.publish(id+"-ownerChanged");
}
}
catch(e){
}
delete this["_inSetBoundProp_"+_21d];
},setProp:function(_21f,_220){
if(this.subpageProplist!==null&&this.page&&this.subpageProplist[_21f]){
var prop=this.subpageProplist[_21f];
if(prop){
if(_220 instanceof wm.Component===false){
this[_21f]=_220;
}
if(prop.indexOf(".")==-1&&this.page.getValue(prop) instanceof wm.Variable){
return this.page.getValue(prop).setDataSet(_220);
}else{
return this.page.setValue(prop,_220);
}
}
}else{
if(this.subpageEventlist!==null&&this.page&&this.subpageEventlist[_21f]){
var prop=this.subpageEventlist[_21f];
if(prop){
if(this._isDesignLoaded){
return this.setEvent(_21f,_220);
}else{
return this.inherited(arguments);
}
}
}
}
return this.inherited(arguments);
},getProp:function(_221){
if(this.subpageProplist!==null&&this.page){
var prop=this.subpageProplist[_221];
if(prop){
return this.page.getValue(prop);
}
}
if(this._isDesignLoaded&&this.subpageEventlist!==null&&this.page){
var prop=this.subpageEventlist[_221];
if(prop){
return this._getProp(_221);
}
}
return this.inherited(arguments);
},onError:function(_222){
},createPageLoader:function(){
this._pageLoader=new wm.PageLoader({owner:this,domNode:this.domNode,isRelativePositioned:this.isRelativePositioned});
this._connections.push(this.connect(this._pageLoader,"onPageChanged",this,"pageChanged"));
this._connections.push(this.connect(this._pageLoader,"onError",this,"onError"));
},getMainPage:function(){
var _223=this.owner;
while(_223.owner){
_223=_223.owner;
}
if(_223 instanceof wm.Application){
return _223;
}
},destroy:function(){
if(this.isDestroyed){
return;
}
var _224=this.getMainPage();
if(_224){
_224.subPageUnloaded(this.page);
}
try{
this.inherited(arguments);
}
catch(e){
}
if(this._pageLoader){
this.destroyPreviousPage();
this._pageLoader.destroy();
this._pageLoader=null;
}
_224=null;
},destroyPreviousPage:function(){
for(var i=0;i<this.pageLoadedList.length;i++){
try{
this._pageLoader.destroyPage(this.pageLoadedList[i]);
}
catch(e){
}
}
this.pageLoadedList=[];
},pageChanged:function(_225,_226){
try{
this.destroyPreviousPage();
this.pageLoadedList.push(_225);
this.page=_225;
this[_225.name]=_225;
var _227=this.getMainPage();
if(_227){
_227.subPageLoaded(this.page);
}
if(this.page.root){
this.page.root.parent=this;
}
if(this.pageLoadedDeferred){
this.pageLoadedDeferred.callback({page:_225,previousPage:_226});
delete this.pageLoadedDeferred;
}
this.onPageChanged(_225,_226);
var o=(_226||0).name;
if(o&&this[o]){
delete this[o];
}
}
catch(e){
}
},loadPage:function(_228){
try{
if(!this.pageLoadedDeferred){
this.pageLoadedDeferred=new dojo.Deferred();
}
var d=this.isDesignLoaded(),s=wm.studioConfig;
if(d&&s&&s.preventSubPages){
return;
}
var _229=_228.charAt(0).toLowerCase()+_228.slice(1);
if(_229){
if(!d&&this.loadParentFirst){
var _22a=this.getParentPage();
}
if(!d&&this.loadParentFirst&&_22a&&_22a._loadingPage){
if(!this._pageLoaderConnectedToOwnerStart){
if(this._currentPageConnect){
dojo.disconnect(this._currentPageConnect);
}
this._currentPageConnect=this.owner.connect(this.owner,"onStart",dojo.hitch(this,"pageLoaderOnOwnerStart",_228,_229));
this._pageLoaderConnectedToOwnerStart=true;
}
}else{
this._pageLoader.loadPage(_228,_229);
if(this._currentPageConnect){
dojo.disconnect(this._currentPageConnect);
}
if(this._pageLoader.page._startCalled){
this.onStart();
}else{
this._currentPageConnect=this._pageLoader.page.connect(this._pageLoader.page,"onStart",this,"onStart");
}
}
}else{
this.destroyPreviousPage();
}
}
catch(e){
console.error("PageContainer page  '"+_228+"' failed to load: "+e);
}
},pageLoaderOnOwnerStart:function(_22b,_22c){
this._pageLoaderConnectedToOwnerStart=false;
this._pageLoader.loadPage(_22b,_22c);
this._pageLoader.page.connect(this._pageLoader.page,"onStart",this,"onStart");
},onStart:function(){
delete this._locationState;
if(this.parent&&this.page&&!dojo.coords(this.page.root.domNode).w){
this.parent.reflow();
}
if(this.subpageEventlist&&this.page){
for(var _22d in this.subpageEventlist){
var _22e=this.page[_22d];
if(_22e&&_22e.isEvent&&!this._isDesignLoaded){
var _22f=_22e.property.replace(/\..*?$/,"");
var _230=_22e.property.replace(/^.*\./,"");
var _231=this.page.getValue(_22f);
this.connect(_231,_230,this,_22d);
}
}
}
if(this.subpageProplist){
for(var _22d in this.subpageProplist){
var v=this[_22d];
if(v instanceof wm.Component&&v.isDestroyed){
v=this[_22d]=undefined;
}
if(v!==undefined){
this.setProp(_22d,this[_22d]);
}
var _232=this.page[_22d];
if(_232&&_232.bindSource){
var _233=this.page.getRuntimeId()+"."+_232.property;
this.subscribe(_233+"-changed",dojo.hitch(this,"setBoundProp",_22d));
var _234=_232.property.lastIndexOf(".");
if(_234!=-1){
_233=this.page.getRuntimeId()+"."+_232.property.substring(0,_234);
this.subscribe(_233+"-changed",dojo.hitch(this,"setBoundProp",_22d));
}
}
}
if(this.$.binding){
this.$.binding.refresh();
}
}
if(this._restoringLocationState||(this.manageHistory||this.manageURL)&&this._lastPageName&&this._lastPageName!=this._pageName&&!this._isDesignLoaded){
app.addHistory({id:app&&app.pageContainer==this?"app.pageContainer":this.getRuntimeId(),options:this._backState,title:"Show "+this._pageName},!this.manageHistory||this._restoringLocationState);
delete this._backState;
}
delete this._restoringLocationState;
},handleBack:function(_235){
if(!_235.pageName||_235.pageName==this._pageName){
return false;
}
this._restoreBackState=_235;
this.setPageName(_235.pageName);
delete this._restoreBackState;
return true;
},generateStateUrl:function(_236){
if(this.page&&this._pageName!==this._initialPageName){
_236[app&&app.pageContainer==this?"pageName":this.getRuntimeId()]=this._pageName;
}
if(this.page&&this.page.generateStateUrl){
this.page.generateStateUrl(_236);
}
},forEachWidget:function(_237){
if(this.page){
return this.page.forEachWidget(_237);
}
},setPageName:function(_238,_239){
if(this._pageLoading){
return;
}
if(this.manageHistory&&this._pageName!=_238&&!this._isDesignLoaded){
this._backState={pageName:this._pageName};
if(this.page&&this.page.generateBackState){
this.page.generateBackState(this._backState);
}
}
this._lastPageName=this._pageName;
if(this._designerOpenPageButton){
dojo[this._pageName?"addClass":"removeClass"](this._designerOpenPageButton,"hasPageName");
}
var o=this._pageName;
this._pageName=this[_239||"pageName"]=_238||"";
if(this.isDesignedComponent()&&this.designWrapper){
this.createOpenPageButton();
}
this.pageLoadedDeferred=new dojo.Deferred();
if(o!=this._pageName||!this.page){
this.loadPage(this._pageName);
}else{
this.pageChangeIgnored();
}
this.valueChanged("pageName",this._pageName);
},pageChangeIgnored:function(){
},forceReloadPage:function(){
var _23a=this._pageName;
this.setPageName(null);
delete window[_23a];
this.setPageName(_23a);
},onPageChanged:function(_23b,_23c){
},_onShowParent:function(){
this.revealed();
},_onHideParent:function(){
if(this.page){
wm.fire(this.page,"onHide");
this.page.root.callOnHideParent();
}
},revealed:function(){
if(!this.page){
this.loadPage(this._pageName);
}else{
this.page.onShow();
if(this.page.root){
this.page.root.callOnShowParent();
}
}
},flow:function(){
if(this._boundsDirty){
wm.fire(this.page,"reflow");
}
},reflow:function(){
this._boundsDirty=true;
this.flow();
},hasPageLoaded:function(_23d){
if(!_23d){
return Boolean(this.page);
}
return Boolean(this.page&&this.page.name==_23d);
},toHtml:function(){
if(this.page&&this.page.root){
return this.page.root.toHtml();
}else{
return "";
}
},updateIsDirty:function(){
this.setValue("isDirty",this.getIsDirty());
wm.fire(this.parent,"updateIsDirty");
},getIsDirty:function(){
if(this.page&&!this.page.isDestroyed){
return this.page.root.getIsDirty();
}
},getOrderedWidgets:function(){
if(this._isDesignLoaded){
return [];
}
if(this.page){
return [this.page.root];
}else{
return [];
}
}});
}
if(!dojo._hasResource["wm.base.widget.Scrim"]){
dojo._hasResource["wm.base.widget.Scrim"]=true;
dojo.provide("wm.base.widget.Scrim");
dojo.declare("wm.Scrim",wm.Widget,{_noAnimation:false,showing:false,waitCursor:true,init:function(){
if(this.owner&&this.owner.isDesignedComponent()){
studio.designer.domNode.appendChild(this.domNode);
}else{
document.body.appendChild(this.domNode);
}
this.inherited(arguments);
dojo.addClass(this.domNode,"wmscrim");
this.domNode.style.zIndex=20;
this.domNode.style.position="absolute";
if(this.waitCursor){
this.domNode.style.cursor="wait";
}
this.subscribe("window-resize",this,"resize");
},resize:function(){
wm.onidle(this,function(){
if(this.showing){
this.reflowParent();
}
});
},reflowParent:function(){
if(this.domNode.parentNode){
dojo.marginBox(this.domNode,dojo.contentBox(this.domNode.parentNode));
}
},scrimify:function(){
var f=dojo.hitch.apply(dojo,arguments);
this.setShowing(true);
try{
f();
}
finally{
this.setShowing(false);
}
},scrimOnIdle:function(){
this.setShowing(true);
var self=this,args=arguments;
setTimeout(function(){
self.scrimify.apply(self,args);
},100);
},setShowing:function(_23e){
if(this._cupdating||this._noAnimation){
return this.inherited(arguments);
}
var _23f=(this._cupdating||this.showing==_23e)?0:app.dialogAnimationTime;
if(_23e){
if(_23f){
if(this._hideAnimation){
this._hideAnimation.stop();
}
this._showAnimation=this._showAnimation||dojo.animateProperty({node:this.domNode,properties:{opacity:0.35},duration:_23f});
if(this._showAnimation.status()!="playing"){
this.domNode.style.opacity=0.01;
this.inherited(arguments);
this._showAnimation.play();
}
}else{
this.inherited(arguments);
}
}else{
if(_23f){
if(this._showAnimation){
this._showAnimation.stop();
}
this._hideAnimation=this._hideAnimation||dojo.animateProperty({node:this.domNode,properties:{opacity:0.01},duration:_23f,onEnd:dojo.hitch(this,function(){
if(!this.domNode){
return;
}
wm.Control.prototype.setShowing.call(this,false);
})});
if(this._hideAnimation.status()!="playing"){
this._hideAnimation.play();
}
}else{
this.inherited(arguments);
}
}
},scrimifyDeferred:function(_240){
this.setShowing(true);
_240.addCallback(dojo.hitch(this,this.setShowing,false));
}});
}
if(!dojo._hasResource["wm.base.components.Timer"]){
dojo._hasResource["wm.base.components.Timer"]=true;
dojo.provide("wm.base.components.Timer");
dojo.declare("wm.Timer",wm.Component,{delay:500,repeating:true,_timeoutId:0,_intervalId:0,autoStart:false,count:0,init:function(){
this.inherited(arguments);
if(this.autoStart){
this.startTimer();
}
},startTimer:function(){
this.stopTimer();
this.count=0;
if(this.repeating){
this._intervalId=window.setInterval(dojo.hitch(this,"onTimerFire"),this.delay);
}else{
this._timeoutId=window.setTimeout(dojo.hitch(this,"onTimerFire"),this.delay);
}
},stopTimer:function(){
if(this._timeoutId){
window.clearTimeout(this._timeoutId);
this._timeoutId=0;
}
if(this._intervalId){
window.clearInterval(this._intervalId);
this._intervalId=0;
}
},destroy:function(){
this.stopTimer();
this.inherited(arguments);
},onTimerFire:function(){
this.count++;
this.valueChanged("count",this.count);
},activate:function(){
this.startTimer();
},update:function(){
this.startTimer();
},setRepeating:function(_241){
var _242=this._timeoutId||this._intervalId;
if(_242){
this.stopTimer();
}
this.repeating=_241;
if(_242){
this.startTimer();
}
},setDelay:function(_243){
var _244=this._timeoutId||this._intervalId;
if(_244){
this.stopTimer();
}
this.delay=_243;
if(_244){
this.startTimer();
}
}});
wm.Object.extendSchema(wm.Timer,{owner:{group:"common",order:1,ignore:1,unwritable:true,options:["Page","Application"],doc:1},autoStart:{group:"widgetName",subgroup:"behavior",bindTarget:true},delay:{group:"widgetName",subgroup:"behavior",bindTarget:true},count:{group:"widgetName",subgroup:"behavior",bindSource:true,ignore:true},repeating:{group:"widgetName",subgroup:"behavior"},startTimer:{method:1,doc:1},stopTimer:{method:1,doc:1},setDelay:{method:1,doc:1}});
}
if(!dojo._hasResource["dijit._base.focus"]){
dojo._hasResource["dijit._base.focus"]=true;
dojo.provide("dijit._base.focus");
dojo.mixin(dijit,{_curFocus:null,_prevFocus:null,isCollapsed:function(){
return dijit.getBookmark().isCollapsed;
},getBookmark:function(){
var bm,rg,tg,sel=dojo.doc.selection,cf=dijit._curFocus;
if(dojo.global.getSelection){
sel=dojo.global.getSelection();
if(sel){
if(sel.isCollapsed){
tg=cf?cf.tagName:"";
if(tg){
tg=tg.toLowerCase();
if(tg=="textarea"||(tg=="input"&&(!cf.type||cf.type.toLowerCase()=="text"))){
sel={start:cf.selectionStart,end:cf.selectionEnd,node:cf,pRange:true};
return {isCollapsed:(sel.end<=sel.start),mark:sel};
}
}
bm={isCollapsed:true};
if(sel.rangeCount){
bm.mark=sel.getRangeAt(0).cloneRange();
}
}else{
rg=sel.getRangeAt(0);
bm={isCollapsed:false,mark:rg.cloneRange()};
}
}
}else{
if(sel){
tg=cf?cf.tagName:"";
tg=tg.toLowerCase();
if(cf&&tg&&(tg=="button"||tg=="textarea"||tg=="input")){
if(sel.type&&sel.type.toLowerCase()=="none"){
return {isCollapsed:true,mark:null};
}else{
rg=sel.createRange();
return {isCollapsed:rg.text&&rg.text.length?false:true,mark:{range:rg,pRange:true}};
}
}
bm={};
try{
rg=sel.createRange();
bm.isCollapsed=!(sel.type=="Text"?rg.htmlText.length:rg.length);
}
catch(e){
bm.isCollapsed=true;
return bm;
}
if(sel.type.toUpperCase()=="CONTROL"){
if(rg.length){
bm.mark=[];
var i=0,len=rg.length;
while(i<len){
bm.mark.push(rg.item(i++));
}
}else{
bm.isCollapsed=true;
bm.mark=null;
}
}else{
bm.mark=rg.getBookmark();
}
}else{
console.warn("No idea how to store the current selection for this browser!");
}
}
return bm;
},moveToBookmark:function(_245){
var _246=dojo.doc,mark=_245.mark;
if(mark){
if(dojo.global.getSelection){
var sel=dojo.global.getSelection();
if(sel&&sel.removeAllRanges){
if(mark.pRange){
var r=mark;
var n=r.node;
n.selectionStart=r.start;
n.selectionEnd=r.end;
}else{
sel.removeAllRanges();
sel.addRange(mark);
}
}else{
console.warn("No idea how to restore selection for this browser!");
}
}else{
if(_246.selection&&mark){
var rg;
if(mark.pRange){
rg=mark.range;
}else{
if(dojo.isArray(mark)){
rg=_246.body.createControlRange();
dojo.forEach(mark,function(n){
rg.addElement(n);
});
}else{
rg=_246.body.createTextRange();
rg.moveToBookmark(mark);
}
}
rg.select();
}
}
}
},getFocus:function(menu,_247){
var node=!dijit._curFocus||(menu&&dojo.isDescendant(dijit._curFocus,menu.domNode))?dijit._prevFocus:dijit._curFocus;
return {node:node,bookmark:(node==dijit._curFocus)&&dojo.withGlobal(_247||dojo.global,dijit.getBookmark),openedForWindow:_247};
},focus:function(_248){
if(!_248){
return;
}
var node="node" in _248?_248.node:_248,_249=_248.bookmark,_24a=_248.openedForWindow,_24b=_249?_249.isCollapsed:false;
if(node){
var _24c=(node.tagName.toLowerCase()=="iframe")?node.contentWindow:node;
if(_24c&&_24c.focus){
try{
_24c.focus();
}
catch(e){
}
}
dijit._onFocusNode(node);
}
if(_249&&dojo.withGlobal(_24a||dojo.global,dijit.isCollapsed)&&!_24b){
if(_24a){
_24a.focus();
}
try{
dojo.withGlobal(_24a||dojo.global,dijit.moveToBookmark,null,[_249]);
}
catch(e2){
}
}
},_activeStack:[],registerIframe:function(_24d){
return dijit.registerWin(_24d.contentWindow,_24d);
},unregisterIframe:function(_24e){
dijit.unregisterWin(_24e);
},registerWin:function(_24f,_250){
var _251=function(evt){
dijit._justMouseDowned=true;
setTimeout(function(){
dijit._justMouseDowned=false;
},0);
if(dojo.isIE&&evt&&evt.srcElement&&evt.srcElement.parentNode==null){
return;
}
dijit._onTouchNode(_250||evt.target||evt.srcElement,"mouse");
};
var doc=dojo.isIE?_24f.document.documentElement:_24f.document;
if(doc){
if(dojo.isIE){
_24f.document.body.attachEvent("onmousedown",_251);
var _252=function(evt){
if(evt.srcElement.tagName.toLowerCase()!="#document"&&dijit.isTabNavigable(evt.srcElement)){
dijit._onFocusNode(_250||evt.srcElement);
}else{
dijit._onTouchNode(_250||evt.srcElement);
}
};
doc.attachEvent("onactivate",_252);
var _253=function(evt){
dijit._onBlurNode(_250||evt.srcElement);
};
doc.attachEvent("ondeactivate",_253);
return function(){
_24f.document.detachEvent("onmousedown",_251);
doc.detachEvent("onactivate",_252);
doc.detachEvent("ondeactivate",_253);
doc=null;
};
}else{
doc.body.addEventListener("mousedown",_251,true);
var _254=function(evt){
dijit._onFocusNode(_250||evt.target);
};
doc.addEventListener("focus",_254,true);
var _255=function(evt){
dijit._onBlurNode(_250||evt.target);
};
doc.addEventListener("blur",_255,true);
return function(){
doc.body.removeEventListener("mousedown",_251,true);
doc.removeEventListener("focus",_254,true);
doc.removeEventListener("blur",_255,true);
doc=null;
};
}
}
},unregisterWin:function(_256){
_256&&_256();
},_onBlurNode:function(node){
dijit._prevFocus=dijit._curFocus;
dijit._curFocus=null;
if(dijit._justMouseDowned){
return;
}
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
}
dijit._clearActiveWidgetsTimer=setTimeout(function(){
delete dijit._clearActiveWidgetsTimer;
dijit._setStack([]);
dijit._prevFocus=null;
},100);
},_onTouchNode:function(node,by){
if(dijit._clearActiveWidgetsTimer){
clearTimeout(dijit._clearActiveWidgetsTimer);
delete dijit._clearActiveWidgetsTimer;
}
var _257=[];
try{
while(node){
var _258=dojo.attr(node,"dijitPopupParent");
if(_258){
node=dijit.byId(_258).domNode;
}else{
if(node.tagName&&node.tagName.toLowerCase()=="body"){
if(node===dojo.body()){
break;
}
node=dojo.window.get(node.ownerDocument).frameElement;
}else{
var id=node.getAttribute&&node.getAttribute("widgetId"),_259=id&&dijit.byId(id);
if(_259&&!(by=="mouse"&&_259.get("disabled"))){
_257.unshift(id);
}
node=node.parentNode;
}
}
}
}
catch(e){
}
dijit._setStack(_257,by);
},_onFocusNode:function(node){
if(!node){
return;
}
if(node.nodeType==9){
return;
}
dijit._onTouchNode(node);
if(node==dijit._curFocus){
return;
}
if(dijit._curFocus){
dijit._prevFocus=dijit._curFocus;
}
dijit._curFocus=node;
dojo.publish("focusNode",[node]);
},_setStack:function(_25a,by){
var _25b=dijit._activeStack;
dijit._activeStack=_25a;
for(var _25c=0;_25c<Math.min(_25b.length,_25a.length);_25c++){
if(_25b[_25c]!=_25a[_25c]){
break;
}
}
var _25d;
for(var i=_25b.length-1;i>=_25c;i--){
_25d=dijit.byId(_25b[i]);
if(_25d){
_25d._focused=false;
_25d.set("focused",false);
_25d._hasBeenBlurred=true;
if(_25d._onBlur){
_25d._onBlur(by);
}
dojo.publish("widgetBlur",[_25d,by]);
}
}
for(i=_25c;i<_25a.length;i++){
_25d=dijit.byId(_25a[i]);
if(_25d){
_25d._focused=true;
_25d.set("focused",true);
if(_25d._onFocus){
_25d._onFocus(by);
}
dojo.publish("widgetFocus",[_25d,by]);
}
}
}});
dojo.addOnLoad(function(){
var _25e=dijit.registerWin(window);
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
dijit.unregisterWin(_25e);
_25e=null;
});
}
});
}
if(!dojo._hasResource["dojo.AdapterRegistry"]){
dojo._hasResource["dojo.AdapterRegistry"]=true;
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_25f){
this.pairs=[];
this.returnWrappers=_25f||false;
};
dojo.extend(dojo.AdapterRegistry,{register:function(name,_260,wrap,_261,_262){
this.pairs[((_262)?"unshift":"push")]([name,_260,wrap,_261]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
}
if(!dojo._hasResource["dijit._base.place"]){
dojo._hasResource["dijit._base.place"]=true;
dojo.provide("dijit._base.place");
dijit.getViewport=function(){
return dojo.window.getBox();
};
dijit.placeOnScreen=function(node,pos,_263,_264){
var _265=dojo.map(_263,function(_266){
var c={corner:_266,pos:{x:pos.x,y:pos.y}};
if(_264){
c.pos.x+=_266.charAt(1)=="L"?_264.x:-_264.x;
c.pos.y+=_266.charAt(0)=="T"?_264.y:-_264.y;
}
return c;
});
return dijit._place(node,_265);
};
dijit._place=function(node,_267,_268,_269){
var view=dojo.window.getBox();
if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){
dojo.body().appendChild(node);
}
var best=null;
dojo.some(_267,function(_26a){
var _26b=_26a.corner;
var pos=_26a.pos;
var _26c=0;
var _26d={w:_26b.charAt(1)=="L"?(view.l+view.w)-pos.x:pos.x-view.l,h:_26b.charAt(1)=="T"?(view.t+view.h)-pos.y:pos.y-view.t};
if(_268){
var res=_268(node,_26a.aroundCorner,_26b,_26d,_269);
_26c=typeof res=="undefined"?0:res;
}
var _26e=node.style;
var _26f=_26e.display;
var _270=_26e.visibility;
_26e.visibility="hidden";
_26e.display="";
var mb=dojo.marginBox(node);
_26e.display=_26f;
_26e.visibility=_270;
var _271=Math.max(view.l,_26b.charAt(1)=="L"?pos.x:(pos.x-mb.w)),_272=Math.max(view.t,_26b.charAt(0)=="T"?pos.y:(pos.y-mb.h)),endX=Math.min(view.l+view.w,_26b.charAt(1)=="L"?(_271+mb.w):pos.x),endY=Math.min(view.t+view.h,_26b.charAt(0)=="T"?(_272+mb.h):pos.y),_273=endX-_271,_274=endY-_272;
_26c+=(mb.w-_273)+(mb.h-_274);
if(best==null||_26c<best.overflow){
best={corner:_26b,aroundCorner:_26a.aroundCorner,x:_271,y:_272,w:_273,h:_274,overflow:_26c,spaceAvailable:_26d};
}
return !_26c;
});
if(best.overflow&&_268){
_268(node,best.aroundCorner,best.corner,best.spaceAvailable,_269);
}
var l=dojo._isBodyLtr(),s=node.style;
s.top=best.y+"px";
s[l?"left":"right"]=(l?best.x:view.w-best.x-best.w)+"px";
return best;
};
dijit.placeOnScreenAroundNode=function(node,_275,_276,_277){
_275=dojo.byId(_275);
var _278=dojo.position(_275,true);
return dijit._placeOnScreenAroundRect(node,_278.x,_278.y,_278.w,_278.h,_276,_277);
};
dijit.placeOnScreenAroundRectangle=function(node,_279,_27a,_27b){
return dijit._placeOnScreenAroundRect(node,_279.x,_279.y,_279.width,_279.height,_27a,_27b);
};
dijit._placeOnScreenAroundRect=function(node,x,y,_27c,_27d,_27e,_27f){
var _280=[];
for(var _281 in _27e){
_280.push({aroundCorner:_281,corner:_27e[_281],pos:{x:x+(_281.charAt(1)=="L"?0:_27c),y:y+(_281.charAt(0)=="T"?0:_27d)}});
}
return dijit._place(node,_280,_27f,{w:_27c,h:_27d});
};
dijit.placementRegistry=new dojo.AdapterRegistry();
dijit.placementRegistry.register("node",function(n,x){
return typeof x=="object"&&typeof x.offsetWidth!="undefined"&&typeof x.offsetHeight!="undefined";
},dijit.placeOnScreenAroundNode);
dijit.placementRegistry.register("rect",function(n,x){
return typeof x=="object"&&"x" in x&&"y" in x&&"width" in x&&"height" in x;
},dijit.placeOnScreenAroundRectangle);
dijit.placeOnScreenAroundElement=function(node,_282,_283,_284){
return dijit.placementRegistry.match.apply(dijit.placementRegistry,arguments);
};
dijit.getPopupAroundAlignment=function(_285,_286){
var _287={};
dojo.forEach(_285,function(pos){
switch(pos){
case "after":
_287[_286?"BR":"BL"]=_286?"BL":"BR";
break;
case "before":
_287[_286?"BL":"BR"]=_286?"BR":"BL";
break;
case "below-alt":
_286=!_286;
case "below":
_287[_286?"BL":"BR"]=_286?"TL":"TR";
_287[_286?"BR":"BL"]=_286?"TR":"TL";
break;
case "above-alt":
_286=!_286;
case "above":
default:
_287[_286?"TL":"TR"]=_286?"BL":"BR";
_287[_286?"TR":"TL"]=_286?"BR":"BL";
break;
}
});
return _287;
};
}
if(!dojo._hasResource["dijit._base.window"]){
dojo._hasResource["dijit._base.window"]=true;
dojo.provide("dijit._base.window");
dijit.getDocumentWindow=function(doc){
return dojo.window.get(doc);
};
}
if(!dojo._hasResource["dijit._base.popup"]){
dojo._hasResource["dijit._base.popup"]=true;
dojo.provide("dijit._base.popup");
dijit.popup={_stack:[],_beginZIndex:1000,_idGen:1,_createWrapper:function(_288){
var _289=_288.declaredClass?_288._popupWrapper:(_288.parentNode&&dojo.hasClass(_288.parentNode,"dijitPopup")),node=_288.domNode||_288;
if(!_289){
_289=dojo.create("div",{"class":"dijitPopup",style:{display:"none"},role:"presentation"},dojo.body());
_289.appendChild(node);
var s=node.style;
s.display="";
s.visibility="";
s.position="";
s.top="0px";
if(_288.declaredClass){
_288._popupWrapper=_289;
dojo.connect(_288,"destroy",function(){
dojo.destroy(_289);
delete _288._popupWrapper;
});
}
}
return _289;
},moveOffScreen:function(_28a){
var _28b=this._createWrapper(_28a);
dojo.style(_28b,{visibility:"hidden",top:"-9999px",display:""});
},hide:function(_28c){
var _28d=this._createWrapper(_28c);
dojo.style(_28d,"display","none");
},getTopPopup:function(){
var _28e=this._stack;
for(var pi=_28e.length-1;pi>0&&_28e[pi].parent===_28e[pi-1].widget;pi--){
}
return _28e[pi];
},open:function(args){
var _28f=this._stack,_290=args.popup,_291=args.orient||((args.parent?args.parent.isLeftToRight():dojo._isBodyLtr())?{"BL":"TL","BR":"TR","TL":"BL","TR":"BR"}:{"BR":"TR","BL":"TL","TR":"BR","TL":"BL"}),_292=args.around,id=(args.around&&args.around.id)?(args.around.id+"_dropdown"):("popup_"+this._idGen++);
while(_28f.length&&(!args.parent||!dojo.isDescendant(args.parent.domNode,_28f[_28f.length-1].widget.domNode))){
dijit.popup.close(_28f[_28f.length-1].widget);
}
var _293=this._createWrapper(_290);
dojo.attr(_293,{id:id,style:{zIndex:this._beginZIndex+_28f.length},"class":"dijitPopup "+(_290.baseClass||_290["class"]||"").split(" ")[0]+"Popup",dijitPopupParent:args.parent?args.parent.id:""});
if(dojo.isIE||dojo.isMoz){
if(!_290.bgIframe){
_290.bgIframe=new dijit.BackgroundIframe(_293);
}
}
var best=_292?dijit.placeOnScreenAroundElement(_293,_292,_291,_290.orient?dojo.hitch(_290,"orient"):null):dijit.placeOnScreen(_293,args,_291=="R"?["TR","BR","TL","BL"]:["TL","BL","TR","BR"],args.padding);
_293.style.display="";
_293.style.visibility="visible";
_290.domNode.style.visibility="visible";
var _294=[];
_294.push(dojo.connect(_293,"onkeypress",this,function(evt){
if(evt.charOrCode==dojo.keys.ESCAPE&&args.onCancel){
dojo.stopEvent(evt);
args.onCancel();
}else{
if(evt.charOrCode===dojo.keys.TAB){
dojo.stopEvent(evt);
var _295=this.getTopPopup();
if(_295&&_295.onCancel){
_295.onCancel();
}
}
}
}));
if(_290.onCancel){
_294.push(dojo.connect(_290,"onCancel",args.onCancel));
}
_294.push(dojo.connect(_290,_290.onExecute?"onExecute":"onChange",this,function(){
var _296=this.getTopPopup();
if(_296&&_296.onExecute){
_296.onExecute();
}
}));
_28f.push({widget:_290,parent:args.parent,onExecute:args.onExecute,onCancel:args.onCancel,onClose:args.onClose,handlers:_294});
if(_290.onOpen){
_290.onOpen(best);
}
return best;
},close:function(_297){
var _298=this._stack;
while((_297&&dojo.some(_298,function(elem){
return elem.widget==_297;
}))||(!_297&&_298.length)){
var top=_298.pop(),_299=top.widget,_29a=top.onClose;
if(_299.onClose){
_299.onClose();
}
dojo.forEach(top.handlers,dojo.disconnect);
if(_299&&_299.domNode){
this.hide(_299);
}
if(_29a){
_29a();
}
}
}};
dijit._frames=new function(){
var _29b=[];
this.pop=function(){
var _29c;
if(_29b.length){
_29c=_29b.pop();
_29c.style.display="";
}else{
if(dojo.isIE<9){
var burl=dojo.config["dojoBlankHtmlUrl"]||(dojo.moduleUrl("dojo","resources/blank.html")+"")||"javascript:\"\"";
var html="<iframe src='"+burl+"'"+" style='position: absolute; left: 0px; top: 0px;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
_29c=dojo.doc.createElement(html);
}else{
_29c=dojo.create("iframe");
_29c.src="javascript:\"\"";
_29c.className="dijitBackgroundIframe";
dojo.style(_29c,"opacity",0.1);
}
_29c.tabIndex=-1;
dijit.setWaiRole(_29c,"presentation");
}
return _29c;
};
this.push=function(_29d){
_29d.style.display="none";
_29b.push(_29d);
};
}();
dijit.BackgroundIframe=function(node){
if(!node.id){
throw new Error("no id");
}
if(dojo.isIE||dojo.isMoz){
var _29e=(this.iframe=dijit._frames.pop());
node.appendChild(_29e);
if(dojo.isIE<7||dojo.isQuirks){
this.resize(node);
this._conn=dojo.connect(node,"onresize",this,function(){
this.resize(node);
});
}else{
dojo.style(_29e,{width:"100%",height:"100%"});
}
}
};
dojo.extend(dijit.BackgroundIframe,{resize:function(node){
if(this.iframe){
dojo.style(this.iframe,{width:node.offsetWidth+"px",height:node.offsetHeight+"px"});
}
},destroy:function(){
if(this._conn){
dojo.disconnect(this._conn);
this._conn=null;
}
if(this.iframe){
dijit._frames.push(this.iframe);
delete this.iframe;
}
}});
}
if(!dojo._hasResource["dijit._base.scroll"]){
dojo._hasResource["dijit._base.scroll"]=true;
dojo.provide("dijit._base.scroll");
dijit.scrollIntoView=function(node,pos){
dojo.window.scrollIntoView(node,pos);
};
}
if(!dojo._hasResource["dojo.uacss"]){
dojo._hasResource["dojo.uacss"]=true;
dojo.provide("dojo.uacss");
(function(){
var d=dojo,html=d.doc.documentElement,ie=d.isIE,_29f=d.isOpera,maj=Math.floor,ff=d.isFF,_2a0=d.boxModel.replace(/-/,""),_2a1={dj_ie:ie,dj_ie6:maj(ie)==6,dj_ie7:maj(ie)==7,dj_ie8:maj(ie)==8,dj_ie9:maj(ie)==9,dj_quirks:d.isQuirks,dj_iequirks:ie&&d.isQuirks,dj_opera:_29f,dj_khtml:d.isKhtml,dj_webkit:d.isWebKit,dj_safari:d.isSafari,dj_chrome:d.isChrome,dj_gecko:d.isMozilla,dj_ff3:maj(ff)==3};
_2a1["dj_"+_2a0]=true;
var _2a2="";
for(var clz in _2a1){
if(_2a1[clz]){
_2a2+=clz+" ";
}
}
html.className=d.trim(html.className+" "+_2a2);
dojo._loaders.unshift(function(){
if(!dojo._isBodyLtr()){
var _2a3="dj_rtl dijitRtl "+_2a2.replace(/ /g,"-rtl ");
html.className=d.trim(html.className+" "+_2a3);
}
});
})();
}
if(!dojo._hasResource["dijit._base.sniff"]){
dojo._hasResource["dijit._base.sniff"]=true;
dojo.provide("dijit._base.sniff");
}
if(!dojo._hasResource["dijit._base.typematic"]){
dojo._hasResource["dijit._base.typematic"]=true;
dojo.provide("dijit._base.typematic");
dijit.typematic={_fireEventAndReload:function(){
this._timer=null;
this._callback(++this._count,this._node,this._evt);
this._currentTimeout=Math.max(this._currentTimeout<0?this._initialDelay:(this._subsequentDelay>1?this._subsequentDelay:Math.round(this._currentTimeout*this._subsequentDelay)),this._minDelay);
this._timer=setTimeout(dojo.hitch(this,"_fireEventAndReload"),this._currentTimeout);
},trigger:function(evt,_2a4,node,_2a5,obj,_2a6,_2a7,_2a8){
if(obj!=this._obj){
this.stop();
this._initialDelay=_2a7||500;
this._subsequentDelay=_2a6||0.9;
this._minDelay=_2a8||10;
this._obj=obj;
this._evt=evt;
this._node=node;
this._currentTimeout=-1;
this._count=-1;
this._callback=dojo.hitch(_2a4,_2a5);
this._fireEventAndReload();
this._evt=dojo.mixin({faux:true},evt);
}
},stop:function(){
if(this._timer){
clearTimeout(this._timer);
this._timer=null;
}
if(this._obj){
this._callback(-1,this._node,this._evt);
this._obj=null;
}
},addKeyListener:function(node,_2a9,_2aa,_2ab,_2ac,_2ad,_2ae){
if(_2a9.keyCode){
_2a9.charOrCode=_2a9.keyCode;
dojo.deprecated("keyCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}else{
if(_2a9.charCode){
_2a9.charOrCode=String.fromCharCode(_2a9.charCode);
dojo.deprecated("charCode attribute parameter for dijit.typematic.addKeyListener is deprecated. Use charOrCode instead.","","2.0");
}
}
return [dojo.connect(node,"onkeypress",this,function(evt){
if(evt.charOrCode==_2a9.charOrCode&&(_2a9.ctrlKey===undefined||_2a9.ctrlKey==evt.ctrlKey)&&(_2a9.altKey===undefined||_2a9.altKey==evt.altKey)&&(_2a9.metaKey===undefined||_2a9.metaKey==(evt.metaKey||false))&&(_2a9.shiftKey===undefined||_2a9.shiftKey==evt.shiftKey)){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_2aa,node,_2ab,_2a9,_2ac,_2ad,_2ae);
}else{
if(dijit.typematic._obj==_2a9){
dijit.typematic.stop();
}
}
}),dojo.connect(node,"onkeyup",this,function(evt){
if(dijit.typematic._obj==_2a9){
dijit.typematic.stop();
}
})];
},addMouseListener:function(node,_2af,_2b0,_2b1,_2b2,_2b3){
var dc=dojo.connect;
return [dc(node,"mousedown",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.trigger(evt,_2af,node,_2b0,node,_2b1,_2b2,_2b3);
}),dc(node,"mouseup",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mouseout",this,function(evt){
dojo.stopEvent(evt);
dijit.typematic.stop();
}),dc(node,"mousemove",this,function(evt){
evt.preventDefault();
}),dc(node,"dblclick",this,function(evt){
dojo.stopEvent(evt);
if(dojo.isIE){
dijit.typematic.trigger(evt,_2af,node,_2b0,node,_2b1,_2b2,_2b3);
setTimeout(dojo.hitch(this,dijit.typematic.stop),50);
}
})];
},addListener:function(_2b4,_2b5,_2b6,_2b7,_2b8,_2b9,_2ba,_2bb){
return this.addKeyListener(_2b5,_2b6,_2b7,_2b8,_2b9,_2ba,_2bb).concat(this.addMouseListener(_2b4,_2b7,_2b8,_2b9,_2ba,_2bb));
}};
}
if(!dojo._hasResource["dijit._base.wai"]){
dojo._hasResource["dijit._base.wai"]=true;
dojo.provide("dijit._base.wai");
dijit.wai={onload:function(){
var div=dojo.create("div",{id:"a11yTestNode",style:{cssText:"border: 1px solid;"+"border-color:red green;"+"position: absolute;"+"height: 5px;"+"top: -999px;"+"background-image: url(\""+(dojo.config.blankGif||dojo.moduleUrl("dojo","resources/blank.gif"))+"\");"}},dojo.body());
var cs=dojo.getComputedStyle(div);
if(cs){
var _2bc=cs.backgroundImage;
var _2bd=(cs.borderTopColor==cs.borderRightColor)||(_2bc!=null&&(_2bc=="none"||_2bc=="url(invalid-url:)"));
dojo[_2bd?"addClass":"removeClass"](dojo.body(),"dijit_a11y");
if(dojo.isIE){
div.outerHTML="";
}else{
dojo.body().removeChild(div);
}
}
}};
if(dojo.isIE||dojo.isMoz){
dojo._loaders.unshift(dijit.wai.onload);
}
dojo.mixin(dijit,{hasWaiRole:function(elem,role){
var _2be=this.getWaiRole(elem);
return role?(_2be.indexOf(role)>-1):(_2be.length>0);
},getWaiRole:function(elem){
return dojo.trim((dojo.attr(elem,"role")||"").replace("wairole:",""));
},setWaiRole:function(elem,role){
dojo.attr(elem,"role",role);
},removeWaiRole:function(elem,role){
var _2bf=dojo.attr(elem,"role");
if(!_2bf){
return;
}
if(role){
var t=dojo.trim((" "+_2bf+" ").replace(" "+role+" "," "));
dojo.attr(elem,"role",t);
}else{
elem.removeAttribute("role");
}
},hasWaiState:function(elem,_2c0){
return elem.hasAttribute?elem.hasAttribute("aria-"+_2c0):!!elem.getAttribute("aria-"+_2c0);
},getWaiState:function(elem,_2c1){
return elem.getAttribute("aria-"+_2c1)||"";
},setWaiState:function(elem,_2c2,_2c3){
elem.setAttribute("aria-"+_2c2,_2c3);
},removeWaiState:function(elem,_2c4){
elem.removeAttribute("aria-"+_2c4);
}});
}
if(!dojo._hasResource["dijit._base"]){
dojo._hasResource["dijit._base"]=true;
dojo.provide("dijit._base");
}
if(!dojo._hasResource["dijit._Widget"]){
dojo._hasResource["dijit._Widget"]=true;
dojo.provide("dijit._Widget");
dojo.connect(dojo,"_connect",function(_2c5,_2c6){
if(_2c5&&dojo.isFunction(_2c5._onConnect)){
_2c5._onConnect(_2c6);
}
});
dijit._connectOnUseEventHandler=function(_2c7){
};
dijit._lastKeyDownNode=null;
if(dojo.isIE){
(function(){
var _2c8=function(evt){
dijit._lastKeyDownNode=evt.srcElement;
};
dojo.doc.attachEvent("onkeydown",_2c8);
dojo.addOnWindowUnload(function(){
dojo.doc.detachEvent("onkeydown",_2c8);
});
})();
}else{
dojo.doc.addEventListener("keydown",function(evt){
dijit._lastKeyDownNode=evt.target;
},true);
}
(function(){
dojo.declare("dijit._Widget",dijit._WidgetBase,{_deferredConnects:{onClick:"",onDblClick:"",onKeyDown:"",onKeyPress:"",onKeyUp:"",onMouseMove:"",onMouseDown:"",onMouseOut:"",onMouseOver:"",onMouseLeave:"",onMouseEnter:"",onMouseUp:""},onClick:dijit._connectOnUseEventHandler,onDblClick:dijit._connectOnUseEventHandler,onKeyDown:dijit._connectOnUseEventHandler,onKeyPress:dijit._connectOnUseEventHandler,onKeyUp:dijit._connectOnUseEventHandler,onMouseDown:dijit._connectOnUseEventHandler,onMouseMove:dijit._connectOnUseEventHandler,onMouseOut:dijit._connectOnUseEventHandler,onMouseOver:dijit._connectOnUseEventHandler,onMouseLeave:dijit._connectOnUseEventHandler,onMouseEnter:dijit._connectOnUseEventHandler,onMouseUp:dijit._connectOnUseEventHandler,create:function(_2c9,_2ca){
this._deferredConnects=dojo.clone(this._deferredConnects);
for(var attr in this.attributeMap){
delete this._deferredConnects[attr];
}
for(attr in this._deferredConnects){
if(this[attr]!==dijit._connectOnUseEventHandler){
delete this._deferredConnects[attr];
}
}
this.inherited(arguments);
if(this.domNode){
for(attr in this.params){
this._onConnect(attr);
}
}
},_onConnect:function(_2cb){
if(_2cb in this._deferredConnects){
var _2cc=this[this._deferredConnects[_2cb]||"domNode"];
this.connect(_2cc,_2cb.toLowerCase(),_2cb);
delete this._deferredConnects[_2cb];
}
},focused:false,isFocusable:function(){
return this.focus&&(dojo.style(this.domNode,"display")!="none");
},onFocus:function(){
},onBlur:function(){
},_onFocus:function(e){
this.onFocus();
},_onBlur:function(){
this.onBlur();
},setAttribute:function(attr,_2cd){
dojo.deprecated(this.declaredClass+"::setAttribute(attr, value) is deprecated. Use set() instead.","","2.0");
this.set(attr,_2cd);
},attr:function(name,_2ce){
if(dojo.config.isDebug){
var _2cf=arguments.callee._ach||(arguments.callee._ach={}),_2d0=(arguments.callee.caller||"unknown caller").toString();
if(!_2cf[_2d0]){
dojo.deprecated(this.declaredClass+"::attr() is deprecated. Use get() or set() instead, called from "+_2d0,"","2.0");
_2cf[_2d0]=true;
}
}
var args=arguments.length;
if(args>=2||typeof name==="object"){
return this.set.apply(this,arguments);
}else{
return this.get(name);
}
},nodesWithKeyClick:["input","button"],connect:function(obj,_2d1,_2d2){
var d=dojo,dc=d._connect,_2d3=this.inherited(arguments,[obj,_2d1=="ondijitclick"?"onclick":_2d1,_2d2]);
if(_2d1=="ondijitclick"){
if(d.indexOf(this.nodesWithKeyClick,obj.nodeName.toLowerCase())==-1){
var m=d.hitch(this,_2d2);
_2d3.push(dc(obj,"onkeydown",this,function(e){
if((e.keyCode==d.keys.ENTER||e.keyCode==d.keys.SPACE)&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
dijit._lastKeyDownNode=e.target;
if(!("openDropDown" in this&&obj==this._buttonNode)){
e.preventDefault();
}
}
}),dc(obj,"onkeyup",this,function(e){
if((e.keyCode==d.keys.ENTER||e.keyCode==d.keys.SPACE)&&e.target==dijit._lastKeyDownNode&&!e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey){
dijit._lastKeyDownNode=null;
return m(e);
}
}));
}
}
return _2d3;
},_onShow:function(){
this.onShow();
},onShow:function(){
},onHide:function(){
},onClose:function(){
return true;
}});
})();
}
if(!dojo._hasResource["dojo.cache"]){
dojo._hasResource["dojo.cache"]=true;
dojo.provide("dojo.cache");
var cache={};
dojo.cache=function(_2d4,url,_2d5){
if(typeof _2d4=="string"){
var _2d6=dojo.moduleUrl(_2d4,url);
}else{
_2d6=_2d4;
_2d5=url;
}
var key=_2d6.toString();
var val=_2d5;
if(_2d5!=undefined&&!dojo.isString(_2d5)){
val=("value" in _2d5?_2d5.value:undefined);
}
var _2d7=_2d5&&_2d5.sanitize?true:false;
if(typeof val=="string"){
val=cache[key]=_2d7?dojo.cache._sanitize(val):val;
}else{
if(val===null){
delete cache[key];
}else{
if(!(key in cache)){
val=dojo._getText(key);
cache[key]=_2d7?dojo.cache._sanitize(val):val;
}
val=cache[key];
}
}
return val;
};
dojo.cache._sanitize=function(val){
if(val){
val=val.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _2d8=val.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_2d8){
val=_2d8[1];
}
}else{
val="";
}
return val;
};
}
if(!dojo._hasResource["dijit._Templated"]){
dojo._hasResource["dijit._Templated"]=true;
dojo.provide("dijit._Templated");
dojo.declare("dijit._Templated",null,{templateString:null,templatePath:null,widgetsInTemplate:false,_skipNodeCache:false,_earlyTemplatedStartup:false,constructor:function(){
this._attachPoints=[];
this._attachEvents=[];
},_stringRepl:function(tmpl){
var _2d9=this.declaredClass,_2da=this;
return dojo.string.substitute(tmpl,this,function(_2db,key){
if(key.charAt(0)=="!"){
_2db=dojo.getObject(key.substr(1),false,_2da);
}
if(typeof _2db=="undefined"){
throw new Error(_2d9+" template:"+key);
}
if(_2db==null){
return "";
}
return key.charAt(0)=="!"?_2db:_2db.toString().replace(/"/g,"&quot;");
},this);
},buildRendering:function(){
var _2dc=dijit._Templated.getCachedTemplate(this.templatePath,this.templateString,this._skipNodeCache);
var node;
if(dojo.isString(_2dc)){
node=dojo._toDom(this._stringRepl(_2dc));
if(node.nodeType!=1){
throw new Error("Invalid template: "+_2dc);
}
}else{
node=_2dc.cloneNode(true);
}
this.domNode=node;
this.inherited(arguments);
this._attachTemplateNodes(node);
if(this.widgetsInTemplate){
var cw=(this._startupWidgets=dojo.parser.parse(node,{noStart:!this._earlyTemplatedStartup,template:true,inherited:{dir:this.dir,lang:this.lang},propsThis:this,scope:"dojo"}));
this._supportingWidgets=dijit.findWidgets(node);
this._attachTemplateNodes(cw,function(n,p){
return n[p];
});
}
this._fillContent(this.srcNodeRef);
},_fillContent:function(_2dd){
var dest=this.containerNode;
if(_2dd&&dest){
while(_2dd.hasChildNodes()){
dest.appendChild(_2dd.firstChild);
}
}
},_attachTemplateNodes:function(_2de,_2df){
_2df=_2df||function(n,p){
return n.getAttribute(p);
};
var _2e0=dojo.isArray(_2de)?_2de:(_2de.all||_2de.getElementsByTagName("*"));
var x=dojo.isArray(_2de)?0:-1;
for(;x<_2e0.length;x++){
var _2e1=(x==-1)?_2de:_2e0[x];
if(this.widgetsInTemplate&&(_2df(_2e1,"dojoType")||_2df(_2e1,"data-dojo-type"))){
continue;
}
var _2e2=_2df(_2e1,"dojoAttachPoint")||_2df(_2e1,"data-dojo-attach-point");
if(_2e2){
var _2e3,_2e4=_2e2.split(/\s*,\s*/);
while((_2e3=_2e4.shift())){
if(dojo.isArray(this[_2e3])){
this[_2e3].push(_2e1);
}else{
this[_2e3]=_2e1;
}
this._attachPoints.push(_2e3);
}
}
var _2e5=_2df(_2e1,"dojoAttachEvent")||_2df(_2e1,"data-dojo-attach-event");
if(_2e5){
var _2e6,_2e7=_2e5.split(/\s*,\s*/);
var trim=dojo.trim;
while((_2e6=_2e7.shift())){
if(_2e6){
var _2e8=null;
if(_2e6.indexOf(":")!=-1){
var _2e9=_2e6.split(":");
_2e6=trim(_2e9[0]);
_2e8=trim(_2e9[1]);
}else{
_2e6=trim(_2e6);
}
if(!_2e8){
_2e8=_2e6;
}
this._attachEvents.push(this.connect(_2e1,_2e6,_2e8));
}
}
}
var role=_2df(_2e1,"waiRole");
if(role){
dijit.setWaiRole(_2e1,role);
}
var _2ea=_2df(_2e1,"waiState");
if(_2ea){
dojo.forEach(_2ea.split(/\s*,\s*/),function(_2eb){
if(_2eb.indexOf("-")!=-1){
var pair=_2eb.split("-");
dijit.setWaiState(_2e1,pair[0],pair[1]);
}
});
}
}
},startup:function(){
dojo.forEach(this._startupWidgets,function(w){
if(w&&!w._started&&w.startup){
w.startup();
}
});
this.inherited(arguments);
},destroyRendering:function(){
dojo.forEach(this._attachPoints,function(_2ec){
delete this[_2ec];
},this);
this._attachPoints=[];
dojo.forEach(this._attachEvents,this.disconnect,this);
this._attachEvents=[];
this.inherited(arguments);
}});
dijit._Templated._templateCache={};
dijit._Templated.getCachedTemplate=function(_2ed,_2ee,_2ef){
var _2f0=dijit._Templated._templateCache;
var key=_2ee||_2ed;
var _2f1=_2f0[key];
if(_2f1){
try{
if(!_2f1.ownerDocument||_2f1.ownerDocument==dojo.doc){
return _2f1;
}
}
catch(e){
}
dojo.destroy(_2f1);
}
if(!_2ee){
_2ee=dojo.cache(_2ed,{sanitize:true});
}
_2ee=dojo.string.trim(_2ee);
if(_2ef||_2ee.match(/\$\{([^\}]+)\}/g)){
return (_2f0[key]=_2ee);
}else{
var node=dojo._toDom(_2ee);
if(node.nodeType!=1){
throw new Error("Invalid template: "+_2ee);
}
return (_2f0[key]=node);
}
};
if(dojo.isIE){
dojo.addOnWindowUnload(function(){
var _2f2=dijit._Templated._templateCache;
for(var key in _2f2){
var _2f3=_2f2[key];
if(typeof _2f3=="object"){
dojo.destroy(_2f3);
}
delete _2f2[key];
}
});
}
dojo.extend(dijit._Widget,{dojoAttachEvent:"",dojoAttachPoint:"",waiRole:"",waiState:""});
}
if(!dojo._hasResource["dijit._CssStateMixin"]){
dojo._hasResource["dijit._CssStateMixin"]=true;
dojo.provide("dijit._CssStateMixin");
dojo.declare("dijit._CssStateMixin",[],{cssStateNodes:{},hovering:false,active:false,_applyAttributes:function(){
this.inherited(arguments);
dojo.forEach(["onmouseenter","onmouseleave","onmousedown"],function(e){
this.connect(this.domNode,e,"_cssMouseEvent");
},this);
dojo.forEach(["disabled","readOnly","checked","selected","focused","state","hovering","active"],function(attr){
this.watch(attr,dojo.hitch(this,"_setStateClass"));
},this);
for(var ap in this.cssStateNodes){
this._trackMouseState(this[ap],this.cssStateNodes[ap]);
}
this._setStateClass();
},_cssMouseEvent:function(_2f4){
if(!this.disabled){
switch(_2f4.type){
case "mouseenter":
case "mouseover":
this._set("hovering",true);
this._set("active",this._mouseDown);
break;
case "mouseleave":
case "mouseout":
this._set("hovering",false);
this._set("active",false);
break;
case "mousedown":
this._set("active",true);
this._mouseDown=true;
var _2f5=this.connect(dojo.body(),"onmouseup",function(){
this._mouseDown=false;
this._set("active",false);
this.disconnect(_2f5);
});
break;
}
}
},_setStateClass:function(){
var _2f6=this.baseClass.split(" ");
function _2f7(_2f8){
_2f6=_2f6.concat(dojo.map(_2f6,function(c){
return c+_2f8;
}),"dijit"+_2f8);
};
if(!this.isLeftToRight()){
_2f7("Rtl");
}
if(this.checked){
_2f7("Checked");
}
if(this.state){
_2f7(this.state);
}
if(this.selected){
_2f7("Selected");
}
if(this.disabled){
_2f7("Disabled");
}else{
if(this.readOnly){
_2f7("ReadOnly");
}else{
if(this.active){
_2f7("Active");
}else{
if(this.hovering){
_2f7("Hover");
}
}
}
}
if(this._focused){
_2f7("Focused");
}
var tn=this.stateNode||this.domNode,_2f9={};
dojo.forEach(tn.className.split(" "),function(c){
_2f9[c]=true;
});
if("_stateClasses" in this){
dojo.forEach(this._stateClasses,function(c){
delete _2f9[c];
});
}
dojo.forEach(_2f6,function(c){
_2f9[c]=true;
});
var _2fa=[];
for(var c in _2f9){
_2fa.push(c);
}
var _2fb=_2fa.join(" ");
if(tn.className!=_2fb){
tn.className=_2fb;
}
this._stateClasses=_2f6;
},_trackMouseState:function(node,_2fc){
var _2fd=false,_2fe=false,_2ff=false;
var self=this,cn=dojo.hitch(this,"connect",node);
function _300(){
var _301=("disabled" in self&&self.disabled)||("readonly" in self&&self.readonly);
dojo.toggleClass(node,_2fc+"Hover",_2fd&&!_2fe&&!_301);
dojo.toggleClass(node,_2fc+"Active",_2fe&&!_301);
dojo.toggleClass(node,_2fc+"Focused",_2ff&&!_301);
};
cn("onmouseenter",function(){
_2fd=true;
_300();
});
cn("onmouseleave",function(){
_2fd=false;
_2fe=false;
_300();
});
cn("onmousedown",function(){
_2fe=true;
_300();
});
cn("onmouseup",function(){
_2fe=false;
_300();
});
cn("onfocus",function(){
_2ff=true;
_300();
});
cn("onblur",function(){
_2ff=false;
_300();
});
this.watch("disabled",_300);
this.watch("readOnly",_300);
}});
}
if(!dojo._hasResource["dijit.form._FormWidget"]){
dojo._hasResource["dijit.form._FormWidget"]=true;
dojo.provide("dijit.form._FormWidget");
dojo.declare("dijit.form._FormWidget",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{name:"",alt:"",value:"",type:"text",tabIndex:"0",disabled:false,intermediateChanges:false,scrollOnFocus:true,attributeMap:dojo.delegate(dijit._Widget.prototype.attributeMap,{value:"focusNode",id:"focusNode",tabIndex:"focusNode",alt:"focusNode",title:"focusNode"}),postMixInProperties:function(){
this.nameAttrSetting=this.name?("name=\""+this.name.replace(/'/g,"&quot;")+"\""):"";
this.inherited(arguments);
},postCreate:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmousedown","_onMouseDown");
},_setDisabledAttr:function(_302){
this._set("disabled",_302);
dojo.attr(this.focusNode,"disabled",_302);
if(this.valueNode){
dojo.attr(this.valueNode,"disabled",_302);
}
dijit.setWaiState(this.focusNode,"disabled",_302);
if(_302){
this._set("hovering",false);
this._set("active",false);
var _303="tabIndex" in this.attributeMap?this.attributeMap.tabIndex:"focusNode";
dojo.forEach(dojo.isArray(_303)?_303:[_303],function(_304){
var node=this[_304];
if(dojo.isWebKit||dijit.hasDefaultTabStop(node)){
node.setAttribute("tabIndex","-1");
}else{
node.removeAttribute("tabIndex");
}
},this);
}else{
if(this.tabIndex!=""){
this.focusNode.setAttribute("tabIndex",this.tabIndex);
}
}
},setDisabled:function(_305){
dojo.deprecated("setDisabled("+_305+") is deprecated. Use set('disabled',"+_305+") instead.","","2.0");
this.set("disabled",_305);
},_onFocus:function(e){
if(this.scrollOnFocus){
dojo.window.scrollIntoView(this.domNode);
}
this.inherited(arguments);
},isFocusable:function(){
return !this.disabled&&this.focusNode&&(dojo.style(this.domNode,"display")!="none");
},focus:function(){
if(!this.disabled){
dijit.focus(this.focusNode);
}
},compare:function(val1,val2){
if(typeof val1=="number"&&typeof val2=="number"){
return (isNaN(val1)&&isNaN(val2))?0:val1-val2;
}else{
if(val1>val2){
return 1;
}else{
if(val1<val2){
return -1;
}else{
return 0;
}
}
}
},onChange:function(_306){
},_onChangeActive:false,_handleOnChange:function(_307,_308){
if(_307===this._lastValueReported){
return;
}
if(this._lastValueReported==undefined&&(_308===null||!this._onChangeActive)){
this._resetValue=this._lastValueReported=_307;
}
this._pendingOnChange=this._pendingOnChange||(typeof _307!=typeof this._lastValueReported)||(this.compare(_307,this._lastValueReported)!=0);
if((this.intermediateChanges||_308||_308===undefined)&&this._pendingOnChange){
this._lastValueReported=_307;
this._pendingOnChange=false;
if(this._onChangeActive){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
}
this._onChangeHandle=setTimeout(dojo.hitch(this,function(){
this._onChangeHandle=null;
this.onChange(_307);
}),0);
}
}
},create:function(){
this.inherited(arguments);
this._onChangeActive=true;
},destroy:function(){
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
this.onChange(this._lastValueReported);
}
this.inherited(arguments);
},setValue:function(_309){
dojo.deprecated("dijit.form._FormWidget:setValue("+_309+") is deprecated.  Use set('value',"+_309+") instead.","","2.0");
this.set("value",_309);
},getValue:function(){
dojo.deprecated(this.declaredClass+"::getValue() is deprecated. Use get('value') instead.","","2.0");
return this.get("value");
},_onMouseDown:function(e){
if(!e.ctrlKey&&dojo.mouseButtons.isLeft(e)&&this.isFocusable()){
var _30a=this.connect(dojo.body(),"onmouseup",function(){
if(this.isFocusable()){
this.focus();
}
this.disconnect(_30a);
});
}
}});
dojo.declare("dijit.form._FormValueWidget",dijit.form._FormWidget,{readOnly:false,attributeMap:dojo.delegate(dijit.form._FormWidget.prototype.attributeMap,{value:"",readOnly:"focusNode"}),_setReadOnlyAttr:function(_30b){
dojo.attr(this.focusNode,"readOnly",_30b);
dijit.setWaiState(this.focusNode,"readonly",_30b);
this._set("readOnly",_30b);
},postCreate:function(){
this.inherited(arguments);
if(dojo.isIE<9||(dojo.isIE&&dojo.isQuirks)){
this.connect(this.focusNode||this.domNode,"onkeydown",this._onKeyDown);
}
if(this._resetValue===undefined){
this._lastValueReported=this._resetValue=this.value;
}
},_setValueAttr:function(_30c,_30d){
this._handleOnChange(_30c,_30d);
},_handleOnChange:function(_30e,_30f){
this._set("value",_30e);
this.inherited(arguments);
},undo:function(){
this._setValueAttr(this._lastValueReported,false);
},reset:function(){
this._hasBeenBlurred=false;
this._setValueAttr(this._resetValue,true);
},_onKeyDown:function(e){
if(e.keyCode==dojo.keys.ESCAPE&&!(e.ctrlKey||e.altKey||e.metaKey)){
var te;
if(dojo.isIE){
e.preventDefault();
te=document.createEventObject();
te.keyCode=dojo.keys.ESCAPE;
te.shiftKey=e.shiftKey;
e.srcElement.fireEvent("onkeypress",te);
}
}
},_layoutHackIE7:function(){
if(dojo.isIE==7){
var _310=this.domNode;
var _311=_310.parentNode;
var _312=_310.firstChild||_310;
var _313=_312.style.filter;
var _314=this;
while(_311&&_311.clientHeight==0){
(function ping(){
var _315=_314.connect(_311,"onscroll",function(e){
_314.disconnect(_315);
_312.style.filter=(new Date()).getMilliseconds();
setTimeout(function(){
_312.style.filter=_313;
},0);
});
})();
_311=_311.parentNode;
}
}
}});
}
if(!dojo._hasResource["dijit.form.TextBox"]){
dojo._hasResource["dijit.form.TextBox"]=true;
dojo.provide("dijit.form.TextBox");
dojo.declare("dijit.form.TextBox",dijit.form._FormValueWidget,{trim:false,uppercase:false,lowercase:false,propercase:false,maxLength:"",selectOnClick:false,placeHolder:"",templateString:dojo.cache("dijit.form","templates/TextBox.html","<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\r\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\"\r\n\t\t\t${!nameAttrSetting} type='${type}'\r\n\t/></div\r\n></div>\r\n"),_singleNodeTemplate:"<input class=\"dijit dijitReset dijitLeft dijitInputField\" dojoAttachPoint=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />",_buttonInputDisabled:dojo.isIE?"disabled":"",baseClass:"dijitTextBox",attributeMap:dojo.delegate(dijit.form._FormValueWidget.prototype.attributeMap,{maxLength:"focusNode"}),postMixInProperties:function(){
var type=this.type.toLowerCase();
if(this.templateString&&this.templateString.toLowerCase()=="input"||((type=="hidden"||type=="file")&&this.templateString==dijit.form.TextBox.prototype.templateString)){
this.templateString=this._singleNodeTemplate;
}
this.inherited(arguments);
},_setPlaceHolderAttr:function(v){
this._set("placeHolder",v);
if(!this._phspan){
this._attachPoints.push("_phspan");
this._phspan=dojo.create("span",{className:"dijitPlaceHolder dijitInputField"},this.textbox,"after");
}
this._phspan.innerHTML="";
this._phspan.appendChild(document.createTextNode(v));
this._updatePlaceHolder();
},_updatePlaceHolder:function(){
if(this._phspan){
this._phspan.style.display=(this.placeHolder&&!this._focused&&!this.textbox.value)?"":"none";
}
},_getValueAttr:function(){
return this.parse(this.get("displayedValue"),this.constraints);
},_setValueAttr:function(_316,_317,_318){
var _319;
if(_316!==undefined){
_319=this.filter(_316);
if(typeof _318!="string"){
if(_319!==null&&((typeof _319!="number")||!isNaN(_319))){
_318=this.filter(this.format(_319,this.constraints));
}else{
_318="";
}
}
}
if(_318!=null&&_318!=undefined&&((typeof _318)!="number"||!isNaN(_318))&&this.textbox.value!=_318){
this.textbox.value=_318;
this._set("displayedValue",this.get("displayedValue"));
}
this._updatePlaceHolder();
this.inherited(arguments,[_319,_317]);
},displayedValue:"",getDisplayedValue:function(){
dojo.deprecated(this.declaredClass+"::getDisplayedValue() is deprecated. Use set('displayedValue') instead.","","2.0");
return this.get("displayedValue");
},_getDisplayedValueAttr:function(){
return this.filter(this.textbox.value);
},setDisplayedValue:function(_31a){
dojo.deprecated(this.declaredClass+"::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.","","2.0");
this.set("displayedValue",_31a);
},_setDisplayedValueAttr:function(_31b){
if(_31b===null||_31b===undefined){
_31b="";
}else{
if(typeof _31b!="string"){
_31b=String(_31b);
}
}
this.textbox.value=_31b;
this._setValueAttr(this.get("value"),undefined);
this._set("displayedValue",this.get("displayedValue"));
},format:function(_31c,_31d){
return ((_31c==null||_31c==undefined)?"":(_31c.toString?_31c.toString():_31c));
},parse:function(_31e,_31f){
return _31e;
},_refreshState:function(){
},_onInput:function(e){
if(e&&e.type&&/key/i.test(e.type)&&e.keyCode){
switch(e.keyCode){
case dojo.keys.SHIFT:
case dojo.keys.ALT:
case dojo.keys.CTRL:
case dojo.keys.TAB:
return;
}
}
if(this.intermediateChanges){
var _320=this;
setTimeout(function(){
_320._handleOnChange(_320.get("value"),false);
},0);
}
this._refreshState();
this._set("displayedValue",this.get("displayedValue"));
},postCreate:function(){
if(dojo.isIE){
setTimeout(dojo.hitch(this,function(){
var s=dojo.getComputedStyle(this.domNode);
if(s){
var ff=s.fontFamily;
if(ff){
var _321=this.domNode.getElementsByTagName("INPUT");
if(_321){
for(var i=0;i<_321.length;i++){
_321[i].style.fontFamily=ff;
}
}
}
}
}),0);
}
this.textbox.setAttribute("value",this.textbox.value);
this.inherited(arguments);
if(dojo.isMoz||dojo.isOpera){
this.connect(this.textbox,"oninput","_onInput");
}else{
this.connect(this.textbox,"onkeydown","_onInput");
this.connect(this.textbox,"onkeyup","_onInput");
this.connect(this.textbox,"onpaste","_onInput");
this.connect(this.textbox,"oncut","_onInput");
}
},_blankValue:"",filter:function(val){
if(val===null){
return this._blankValue;
}
if(typeof val!="string"){
return val;
}
if(this.trim){
val=dojo.trim(val);
}
if(this.uppercase){
val=val.toUpperCase();
}
if(this.lowercase){
val=val.toLowerCase();
}
if(this.propercase){
val=val.replace(/[^\s]+/g,function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);
});
}
return val;
},_setBlurValue:function(){
this._setValueAttr(this.get("value"),true);
},_onBlur:function(e){
if(this.disabled){
return;
}
this._setBlurValue();
this.inherited(arguments);
if(this._selectOnClickHandle){
this.disconnect(this._selectOnClickHandle);
}
if(this.selectOnClick&&dojo.isMoz){
this.textbox.selectionStart=this.textbox.selectionEnd=undefined;
}
this._updatePlaceHolder();
},_onFocus:function(by){
if(this.disabled||this.readOnly){
return;
}
if(this.selectOnClick&&by=="mouse"){
this._selectOnClickHandle=this.connect(this.domNode,"onmouseup",function(){
this.disconnect(this._selectOnClickHandle);
var _322;
if(dojo.isIE){
var _323=dojo.doc.selection.createRange();
var _324=_323.parentElement();
_322=_324==this.textbox&&_323.text.length==0;
}else{
_322=this.textbox.selectionStart==this.textbox.selectionEnd;
}
if(_322){
dijit.selectInputText(this.textbox);
}
});
}
this._updatePlaceHolder();
this.inherited(arguments);
this._message="";
this._refreshState();
},reset:function(){
this.textbox.value="";
this.inherited(arguments);
}});
dijit.selectInputText=function(_325,_326,stop){
var _327=dojo.global;
var _328=dojo.doc;
_325=dojo.byId(_325);
if(isNaN(_326)){
_326=0;
}
if(isNaN(stop)){
stop=_325.value?_325.value.length:0;
}
dijit.focus(_325);
if(_328["selection"]&&dojo.body()["createTextRange"]){
if(_325.createTextRange){
var r=_325.createTextRange();
r.collapse(true);
r.moveStart("character",-99999);
r.moveStart("character",_326);
r.moveEnd("character",stop-_326);
r.select();
}
}else{
if(_327["getSelection"]){
if(_325.setSelectionRange){
_325.setSelectionRange(_326,stop);
}
}
}
};
}
if(!dojo._hasResource["dijit.Tooltip"]){
dojo._hasResource["dijit.Tooltip"]=true;
dojo.provide("dijit.Tooltip");
dojo.declare("dijit._MasterTooltip",[dijit._Widget,dijit._Templated],{duration:dijit.defaultDuration,templateString:dojo.cache("dijit","templates/Tooltip.html","<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\r\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" dojoAttachPoint=\"containerNode\" role='alert'></div\r\n\t><div class=\"dijitTooltipConnector\" dojoAttachPoint=\"connectorNode\"></div\r\n></div>\r\n"),postCreate:function(){
dojo.body().appendChild(this.domNode);
this.bgIframe=new dijit.BackgroundIframe(this.domNode);
this.fadeIn=dojo.fadeIn({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onShow")});
this.fadeOut=dojo.fadeOut({node:this.domNode,duration:this.duration,onEnd:dojo.hitch(this,"_onHide")});
},show:function(_329,_32a,_32b,rtl){
if(this.aroundNode&&this.aroundNode===_32a){
return;
}
this.domNode.width="auto";
if(this.fadeOut.status()=="playing"){
this._onDeck=arguments;
return;
}
this.containerNode.innerHTML=_329;
var pos=dijit.placeOnScreenAroundElement(this.domNode,_32a,dijit.getPopupAroundAlignment((_32b&&_32b.length)?_32b:dijit.Tooltip.defaultPosition,!rtl),dojo.hitch(this,"orient"));
dojo.style(this.domNode,"opacity",0);
this.fadeIn.play();
this.isShowingNow=true;
this.aroundNode=_32a;
},orient:function(node,_32c,_32d,_32e,_32f){
this.connectorNode.style.top="";
var _330=_32e.w-this.connectorNode.offsetWidth;
node.className="dijitTooltip "+{"BL-TL":"dijitTooltipBelow dijitTooltipABLeft","TL-BL":"dijitTooltipAbove dijitTooltipABLeft","BR-TR":"dijitTooltipBelow dijitTooltipABRight","TR-BR":"dijitTooltipAbove dijitTooltipABRight","BR-BL":"dijitTooltipRight","BL-BR":"dijitTooltipLeft"}[_32c+"-"+_32d];
this.domNode.style.width="auto";
var size=dojo.contentBox(this.domNode);
var _331=Math.min((Math.max(_330,1)),size.w);
var _332=_331<size.w;
this.domNode.style.width=_331+"px";
if(_332){
this.containerNode.style.overflow="auto";
var _333=this.containerNode.scrollWidth;
this.containerNode.style.overflow="visible";
if(_333>_331){
_333=_333+dojo.style(this.domNode,"paddingLeft")+dojo.style(this.domNode,"paddingRight");
this.domNode.style.width=_333+"px";
}
}
if(_32d.charAt(0)=="B"&&_32c.charAt(0)=="B"){
var mb=dojo.marginBox(node);
var _334=this.connectorNode.offsetHeight;
if(mb.h>_32e.h){
var _335=_32e.h-(_32f.h/2)-(_334/2);
this.connectorNode.style.top=_335+"px";
this.connectorNode.style.bottom="";
}else{
this.connectorNode.style.bottom=Math.min(Math.max(_32f.h/2-_334/2,0),mb.h-_334)+"px";
this.connectorNode.style.top="";
}
}else{
this.connectorNode.style.top="";
this.connectorNode.style.bottom="";
}
return Math.max(0,size.w-_330);
},_onShow:function(){
if(dojo.isIE){
this.domNode.style.filter="";
}
},hide:function(_336){
if(this._onDeck&&this._onDeck[1]==_336){
this._onDeck=null;
}else{
if(this.aroundNode===_336){
this.fadeIn.stop();
this.isShowingNow=false;
this.aroundNode=null;
this.fadeOut.play();
}else{
}
}
},_onHide:function(){
this.domNode.style.cssText="";
this.containerNode.innerHTML="";
if(this._onDeck){
this.show.apply(this,this._onDeck);
this._onDeck=null;
}
}});
dijit.showTooltip=function(_337,_338,_339,rtl){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.show(_337,_338,_339,rtl);
};
dijit.hideTooltip=function(_33a){
if(!dijit._masterTT){
dijit._masterTT=new dijit._MasterTooltip();
}
return dijit._masterTT.hide(_33a);
};
dojo.declare("dijit.Tooltip",dijit._Widget,{label:"",showDelay:400,connectId:[],position:[],_setConnectIdAttr:function(_33b){
dojo.forEach(this._connections||[],function(_33c){
dojo.forEach(_33c,dojo.hitch(this,"disconnect"));
},this);
var ary=dojo.isArrayLike(_33b)?_33b:(_33b?[_33b]:[]);
this._connections=dojo.map(ary,function(id){
var node=dojo.byId(id);
return node?[this.connect(node,"onmouseenter","_onTargetMouseEnter"),this.connect(node,"onmouseleave","_onTargetMouseLeave"),this.connect(node,"onfocus","_onTargetFocus"),this.connect(node,"onblur","_onTargetBlur")]:[];
},this);
this._set("connectId",_33b);
this._connectIds=ary;
},addTarget:function(node){
var id=node.id||node;
if(dojo.indexOf(this._connectIds,id)==-1){
this.set("connectId",this._connectIds.concat(id));
}
},removeTarget:function(node){
var id=node.id||node,idx=dojo.indexOf(this._connectIds,id);
if(idx>=0){
this._connectIds.splice(idx,1);
this.set("connectId",this._connectIds);
}
},buildRendering:function(){
this.inherited(arguments);
dojo.addClass(this.domNode,"dijitTooltipData");
},startup:function(){
this.inherited(arguments);
var ids=this.connectId;
dojo.forEach(dojo.isArrayLike(ids)?ids:[ids],this.addTarget,this);
},_onTargetMouseEnter:function(e){
this._onHover(e);
},_onTargetMouseLeave:function(e){
this._onUnHover(e);
},_onTargetFocus:function(e){
this._focus=true;
this._onHover(e);
},_onTargetBlur:function(e){
this._focus=false;
this._onUnHover(e);
},_onHover:function(e){
if(!this._showTimer){
var _33d=e.target;
this._showTimer=setTimeout(dojo.hitch(this,function(){
this.open(_33d);
}),this.showDelay);
}
},_onUnHover:function(e){
if(this._focus){
return;
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
this.close();
},open:function(_33e){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
dijit.showTooltip(this.label||this.domNode.innerHTML,_33e,this.position,!this.isLeftToRight());
this._connectNode=_33e;
this.onShow(_33e,this.position);
},close:function(){
if(this._connectNode){
dijit.hideTooltip(this._connectNode);
delete this._connectNode;
this.onHide();
}
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
},onShow:function(_33f,_340){
},onHide:function(){
},uninitialize:function(){
this.close();
this.inherited(arguments);
}});
dijit.Tooltip.defaultPosition=["after","before"];
}
if(!dojo._hasResource["dijit.form.ValidationTextBox"]){
dojo._hasResource["dijit.form.ValidationTextBox"]=true;
dojo.provide("dijit.form.ValidationTextBox");
dojo.declare("dijit.form.ValidationTextBox",dijit.form.TextBox,{templateString:dojo.cache("dijit.form","templates/ValidationTextBox.html","<div class=\"dijit dijitReset dijitInlineTable dijitLeft\"\r\n\tid=\"widget_${id}\" role=\"presentation\"\r\n\t><div class='dijitReset dijitValidationContainer'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t/></div\r\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\"\r\n\t\t\t${!nameAttrSetting} type='${type}'\r\n\t/></div\r\n></div>\r\n"),baseClass:"dijitTextBox dijitValidationTextBox",required:false,promptMessage:"",invalidMessage:"$_unset_$",missingMessage:"$_unset_$",message:"",constraints:{},regExp:".*",regExpGen:function(_341){
return this.regExp;
},state:"",tooltipPosition:[],_setValueAttr:function(){
this.inherited(arguments);
this.validate(this._focused);
},validator:function(_342,_343){
return (new RegExp("^(?:"+this.regExpGen(_343)+")"+(this.required?"":"?")+"$",_343.regExpOptions||"")).test(_342)&&(!this.required||!this._isEmpty(_342))&&(this._isEmpty(_342)||this.parse(_342,_343)!==undefined);
},_isValidSubset:function(){
return this.textbox.value.search(this._partialre)==0;
},isValid:function(_344){
var _345=this.validator(this.textbox.value,this.constraints);
if(!_345&&this._isEmpty(this.textbox.value)&&this.required&&_344){
return true;
}
return _345;
},_isEmpty:function(_346){
return (this.trim?/^\s*$/:/^$/).test(_346);
},getErrorMessage:function(_347){
return (this.required&&this._isEmpty(this.textbox.value))?this.missingMessage:this.invalidMessage;
},getPromptMessage:function(_348){
return this.promptMessage;
},_maskValidSubsetError:true,validate:function(_349){
var _34a="";
var _34b=this.disabled||this.isValid(_349);
if(_34b){
this._maskValidSubsetError=true;
}
var _34c=this._isEmpty(this.textbox.value);
var _34d=!_34b&&_349&&this._isValidSubset();
this._set("state",_34b?"":(((((!this._hasBeenBlurred||_349)&&_34c)||_34d)&&this._maskValidSubsetError)?"Incomplete":"Error"));
dijit.setWaiState(this.focusNode,"invalid",_34b?"false":"true");
if(this.state=="Error"){
this._maskValidSubsetError=_349&&_34d;
_34a=this.getErrorMessage(_349);
}else{
if(this.state=="Incomplete"){
_34a=this.getPromptMessage(_349);
this._maskValidSubsetError=!this._hasBeenBlurred||_349;
}else{
if(_34c&&_349){
_34a=this.getPromptMessage(_349);
}
}
}
if(_34a&&wm.isDomShowing(this.domNode)){
this.set("message",_34a);
}
return _34b;
},displayMessage:function(_34e){
dijit.hideTooltip(this.domNode);
if(_34e&&this._focused){
dijit.showTooltip(_34e,this.domNode,this.tooltipPosition,!this.isLeftToRight());
}
},_refreshState:function(){
this.validate(this._focused);
this.inherited(arguments);
},constructor:function(){
this.constraints={};
},_setConstraintsAttr:function(_34f){
if(!_34f.locale&&this.lang){
_34f.locale=this.lang;
}
this._set("constraints",_34f);
this._computePartialRE();
},_computePartialRE:function(){
var p=this.regExpGen(this.constraints);
this.regExp=p;
var _350="";
if(p!=".*"){
this.regExp.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g,function(re){
switch(re.charAt(0)){
case "{":
case "+":
case "?":
case "*":
case "^":
case "$":
case "|":
case "(":
_350+=re;
break;
case ")":
_350+="|$)";
break;
default:
_350+="(?:"+re+"|$)";
break;
}
});
}
try{
"".search(_350);
}
catch(e){
_350=this.regExp;
console.warn("RegExp error in "+this.declaredClass+": "+this.regExp);
}
this._partialre="^(?:"+_350+")$";
},postMixInProperties:function(){
this.inherited(arguments);
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
if(this.invalidMessage=="$_unset_$"){
this.invalidMessage=this.messages.invalidMessage;
}
if(!this.invalidMessage){
this.invalidMessage=this.promptMessage;
}
if(this.missingMessage=="$_unset_$"){
this.missingMessage=this.messages.missingMessage;
}
if(!this.missingMessage){
this.missingMessage=this.invalidMessage;
}
this._setConstraintsAttr(this.constraints);
},_setDisabledAttr:function(_351){
this.inherited(arguments);
this._refreshState();
},_setRequiredAttr:function(_352){
this._set("required",_352);
dijit.setWaiState(this.focusNode,"required",_352);
this._refreshState();
},_setMessageAttr:function(_353){
this._set("message",_353);
this.displayMessage(_353);
},reset:function(){
this._maskValidSubsetError=true;
this.inherited(arguments);
},_onBlur:function(){
this.displayMessage("");
this.inherited(arguments);
}});
dojo.declare("dijit.form.MappedTextBox",dijit.form.ValidationTextBox,{postMixInProperties:function(){
this.inherited(arguments);
this.nameAttrSetting="";
},serialize:function(val,_354){
return val.toString?val.toString():"";
},toString:function(){
var val=this.filter(this.get("value"));
return val!=null?(typeof val=="string"?val:this.serialize(val,this.constraints)):"";
},validate:function(){
this.valueNode.value=this.toString();
return this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
this.valueNode=dojo.place("<input type='hidden'"+(this.name?" name='"+this.name.replace(/'/g,"&quot;")+"'":"")+"/>",this.textbox,"after");
},reset:function(){
this.valueNode.value="";
this.inherited(arguments);
}});
dojo.declare("dijit.form.RangeBoundTextBox",dijit.form.MappedTextBox,{rangeMessage:"",rangeCheck:function(_355,_356){
return ("min" in _356?(this.compare(_355,_356.min)>=0):true)&&("max" in _356?(this.compare(_355,_356.max)<=0):true);
},isInRange:function(_357){
return this.rangeCheck(this.get("value"),this.constraints);
},_isDefinitelyOutOfRange:function(){
var val=this.get("value");
var _358=false;
var _359=false;
if("min" in this.constraints){
var min=this.constraints.min;
min=this.compare(val,((typeof min=="number")&&min>=0&&val!=0)?0:min);
_358=(typeof min=="number")&&min<0;
}
if("max" in this.constraints){
var max=this.constraints.max;
max=this.compare(val,((typeof max!="number")||max>0)?max:0);
_359=(typeof max=="number")&&max>0;
}
return _358||_359;
},_isValidSubset:function(){
return this.inherited(arguments)&&!this._isDefinitelyOutOfRange();
},isValid:function(_35a){
return this.inherited(arguments)&&((this._isEmpty(this.textbox.value)&&!this.required)||this.isInRange(_35a));
},getErrorMessage:function(_35b){
var v=this.get("value");
if(v!==null&&v!==""&&v!==undefined&&(typeof v!="number"||!isNaN(v))&&!this.isInRange(_35b)){
return this.rangeMessage;
}
return this.inherited(arguments);
},postMixInProperties:function(){
this.inherited(arguments);
if(!this.rangeMessage){
this.messages=dojo.i18n.getLocalization("dijit.form","validate",this.lang);
this.rangeMessage=this.messages.rangeMessage;
}
},_setConstraintsAttr:function(_35c){
this.inherited(arguments);
if(this.focusNode){
if(this.constraints.min!==undefined){
dijit.setWaiState(this.focusNode,"valuemin",this.constraints.min);
}else{
dijit.removeWaiState(this.focusNode,"valuemin");
}
if(this.constraints.max!==undefined){
dijit.setWaiState(this.focusNode,"valuemax",this.constraints.max);
}else{
dijit.removeWaiState(this.focusNode,"valuemax");
}
}
},_setValueAttr:function(_35d,_35e){
dijit.setWaiState(this.focusNode,"valuenow",_35d);
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.dijit"]){
dojo._hasResource["wm.base.widget.Editors.dijit"]=true;
dojo.provide("wm.base.widget.Editors.dijit");
dijit.form._FormWidget.prototype.destroy=function(){
try{
wm.fire(this,"_hideTooltip");
if(this._onChangeHandle){
clearTimeout(this._onChangeHandle);
}
dijit._Widget.prototype.destroy.call(this);
}
catch(e){
}
};
dijit.form.ValidationTextBox.prototype.validate=function(_35f){
var _360="";
var _361=this.isValid(_35f);
var _362=this._isEmpty(this.textbox.value);
this.state=(_35f||_361||(!this._hasBeenBlurred&&_362))?"":"Error";
this._setStateClass();
if(_361){
dijit.setWaiState(this.focusNode,"invalid",_361?"false":"true");
}
if(_35f&&_362){
_360=this.getPromptMessage(true);
}
if(!_35f&&this._hasBeenBlurred){
if(!_360&&this.state=="Error"){
_360=this.getErrorMessage(true);
}
}
if(_35f){
var _363=this.domNode;
while(_363&&!dojo.hasClass(_363,"dojoxGridRow")){
_363=_363.parentNode;
}
if(this.domNode.parentNode){
this._lastRow=_363;
this._lastCol=dojo.indexOf(this.domNode.parentNode.parentNode.parentNode.childNodes,this.domNode.parentNode.parentNode);
}else{
wm.job("GridValidationNode",20,this,function(){
if(this.domNode.parentNode){
this._lastRow=_363;
this._lastCol=dojo.indexOf(this.domNode.parentNode.parentNode.parentNode.childNodes,this.domNode.parentNode.parentNode);
}
});
}
}
this.displayMessage(_360);
return _35f||_361;
};
dijit.form.ValidationTextBox.prototype._defaultValidator=dijit.form.ValidationTextBox.prototype.validator;
dijit.form.ValidationTextBox.prototype.validator=function(_364,_365){
var _366=dijit.form.ValidationTextBox.prototype._defaultValidator,_367=_366.call(this,_364,_365);
return _367&&(this.owner&&this.owner.validator?this.owner.validator(_364,_365):true);
};
dijit.form.ValidationTextBox.prototype.displayMessage=function(_368){
if(this._message==_368){
return;
}
this._message=_368;
this._cancelHideTooltip();
dijit.hideTooltip(this.domNode);
if(_368&&this.inGrid&&!this.domNode.parentNode){
wm.job("GridValidationNode",20,dojo.hitch(this,function(){
dijit.showTooltip(_368,this.domNode.parentNode||this._lastRow.firstChild.firstChild.firstChild.childNodes[this._lastCol],this.tooltipPosition);
dijit._hideTooltipHandle=setTimeout(dojo.hitch(this,function(){
wm.fire(this,"_hideTooltip");
}),2500);
}));
}else{
if(_368&&(!this.owner||!this.owner.readonly)){
dijit.showTooltip(_368,this.domNode,this.tooltipPosition);
dijit._hideTooltipHandle=setTimeout(dojo.hitch(this,function(){
wm.fire(this,"_hideTooltip");
}),this.tooltipDisplayTime||2500);
}
}
};
dijit.form.ValidationTextBox.prototype._hideTooltip=function(){
this._cancelHideTooltip();
wm.hideToolTip();
};
dijit.form.ValidationTextBox.prototype._cancelHideTooltip=function(){
clearTimeout(dijit._hideTooltipHandle);
dijit._hideTooltipHandle=null;
};
}
if(!dojo._hasResource["wm.base.widget.Editors.AbstractEditor"]){
dojo._hasResource["wm.base.widget.Editors.AbstractEditor"]=true;
dojo.provide("wm.base.widget.Editors.AbstractEditor");
wm.propertyIsChanged=function(_369,_36a,_36b){
var p=(_36b||0).prototype;
return p&&p[_36a]!==_369;
};
wm.defaultEmptyValue=function(_36c){
switch(_36c){
case "Text":
return "";
case "Number":
return 0;
}
};
dojo.declare("wm.AbstractEditor",wm.Control,{_captionTagName:"div",changeKeycodes:[dojo.keys.ENTER,dojo.keys.NUMPAD_ENTER,dojo.keys.DELETE,dojo.keys.BACKSPACE],classNames:"wmeditor",dataValueBindingEvaluated:"onInsert",formatter:"",height:"24px",width:"300px",enableTouchHeight:true,mobileHeight:"35px",padding:"2",border:"0",editorBorder:true,dataValue:null,displayValue:null,emptyValue:"unset",required:false,readonly:false,ignoreParentReadonly:false,editorNode:null,isDirty:false,_lastValue:"",_lastValueReported:"",caption:"",captionPosition:"left",captionSize:"100px",captionNode:null,captionAlign:"right",singleLine:true,helpText:"",changeOnEnter:false,changeOnKey:false,_updating:0,scrim:true,init:function(){
this._editorConnects=[];
this.inherited(arguments);
},getMinHeightProp:function(){
if(this.minHeight){
return this.minHeight;
}
if(this.captionPosition=="left"||this.captionPosition=="right"||!this.caption){
return 20;
}else{
if(this.captionSize.match(/\%/)){
return 40;
}else{
return 20+parseInt(this.captionSize);
}
}
},getMinWidthProp:function(){
if(this.minWidth){
return this.minWidth;
}
if(this.captionPosition=="top"||this.captionPosition=="bottom"||!this.caption){
return 80;
}else{
if(this.captionSize.match(/\%/)){
return 120;
}else{
return 80+parseInt(this.captionSize);
}
}
},createCaption:function(){
var _36d=document.createElement(this._captionTagName);
var s=_36d.style;
s.padding="0px";
s.margin="0px";
dojo.addClass(_36d,"wmeditor-caption");
dojo.addClass(_36d,"wmlabel");
_36d.innerHTML=this.caption;
this.domNode.appendChild(_36d);
this.captionNode=_36d;
this.setCaptionAlign(this.captionAlign);
this.setSingleLine(this.singleLine);
},postInit:function(){
this.createEditor();
this.inherited(arguments);
wm.fire(this,"ownerLoaded");
if(this.captionPosition!="left"){
this.setCaptionPosition(this.captionPosition);
}
this._inPostInit=true;
this.displayValue=this.getDisplayValue();
this.dataValue=this.getDataValue();
this.valueChanged("displayValue",this.displayValue);
this.valueChanged("dataValue",this.dataValue);
delete this._inPostInit;
},setCaption:function(_36e){
var _36f=this.caption;
this.caption=_36e;
if(!this.captionNode){
return;
}
var cap=_36e+((this.required&&!this.readonly)?"&nbsp;<span class=\"wmeditor-required\">*</span>":"");
this.captionNode.innerHTML=cap;
if(_36f&&!_36e||!_36f&&_36e){
dojo.style(this.captionNode,"display",(_36e)?"block":"none");
this.sizeEditor();
}
},setCaptionSize:function(_370){
this.captionSize=_370;
this.sizeEditor();
},setCaptionAlign:function(_371){
this.captionAlign=_371;
if(this.captionNode){
dojo.style(this.captionNode,"textAlign",this.captionAlign);
}
},setCaptionPosition:function(pos){
var _372=this.captionPosition;
this.captionPosition=pos;
if((_372=="left"||_372=="right")&&(pos=="bottom"||pos=="top")){
if(this.height.match(/px/)&&parseInt(this.height)<48){
this.setValue("height","48px");
}
this.captionSize="28px";
}else{
if((pos=="left"||pos=="right")&&(_372=="bottom"||_372=="top")){
if(this.bounds.h>=48){
this.setValue("height",this.constructor.prototype.height);
}
if(this.captionSize.match(/px/)&&parseInt(this.captionSize)<100){
this.captionSize="100px";
}
}
}
this.sizeEditor();
},setCaptionPositionLF:function(_373,_374){
if(!_374){
_374=this.isAncestorInstanceOf(wm.LiveFormBase)||this.isAncestorInstanceOf(wm.FormPanel);
}
if(_374){
this.setCaptionPosition(_374.captionPosition);
this.setCaptionSize(_374.captionSize);
this.setCaptionAlign(_374.captionAlign);
if(this.constructor.prototype.height==wm.AbstractEditor.prototype.height){
this.setValue("height",_374.editorHeight);
}
}
this.sizeEditor();
},setSingleLine:function(_375){
this.singleLine=_375;
var s=this.captionNode.style;
s.whiteSpace=(_375)?"nowrap":"normal";
s.overflow="hidden";
s.lineHeight=(this.singleLine)?s.height:"normal";
if(this.readOnlyNode){
this.updateReadOnlyNodeStyle();
}
},setDisabled:function(_376){
this.inherited(arguments);
if(this.editor){
if(this.editor instanceof wm.Control){
dojo[this._disabled?"addClass":"removeClass"](this.captionNode,"wmeditor-caption-disabled");
}else{
if(!wm.isNode(this.editor)){
if(this._disabled!=this.editor.get("disabled")){
this.editor.set("disabled",Boolean(this._disabled));
dojo[this._disabled?"addClass":"removeClass"](this.captionNode,"wmeditor-caption-disabled");
}
}
}
}
},destroy:function(){
this.destroyEditor();
this.inherited(arguments);
},createHelpNode:function(){
this.helpNode=dojo.create("div",{className:"EditorHelpIcon"},this.domNode);
if(typeof this.helpText=="string"){
if(wm.isMobile){
this._helpTextTouchStartConnect=this.connect(this.helpNode,"ontouchstart",this,function(e){
this._helpTouchPos={x:e.targetTouches[0].clientX,y:e.targetTouches[0].clientY};
});
this._helpTextTouchMoveConnect=this.connect(this.helpNode,"ontouchmove",this,function(e){
if(!this._helpTouchPos){
return;
}
if(Math.abs(this._helpTouchPos.x-e.targetTouches[0].clientX)>=5||Math.abs(this._helpTouchPos.y-e.targetTouches[0].clientY)>=5){
delete this._helpTouchPos;
}
});
this._helpTextTouchEndConnect=this.connect(this.helpNode,"ontouchend",this,function(e){
if(!this._helpTouchPos){
return;
}
app.alert(this.helpText);
});
}else{
this._helpTextOverConnect=this.connect(this.helpNode,"onmouseover",this,function(e){
wm.job(this.getRuntimeId()+".helpText",100,dojo.hitch(this,function(){
var _377=dojo.coords(this.helpNode);
app.createToolTip(this.helpText,null,{mouseX:_377.x,mouseY:_377.y+_377.h});
}));
});
this._helpTextOutConnect=this.connect(this.helpNode,"onmouseout",this,function(){
wm.job(this.getRuntimeId()+".helpText",100,dojo.hitch(this,function(){
if(app.getToolTip()==this.helpText){
app.hideToolTip();
}
}));
});
}
}
this.connect(this.helpNode,"onclick",this,"onHelpClick");
},onHelpClick:function(){
},destroyHelpNode:function(){
dojo.destroy(this.helpNode);
wm.Array.removeElement(this._connections,this._helpTextOverConnect);
wm.Array.removeElement(this._connections,this._helpTextOutConnect);
wm.Array.removeElement(this._connections,this._helpTextTouchStartConnect);
wm.Array.removeElement(this._connections,this._helpTextTouchMoveConnect);
wm.Array.removeElement(this._connections,this._helpTextTouchEndConnect);
dojo.disconnect(this._helpTextOverConnect);
dojo.disconnect(this._helpTextOutConnect);
dojo.disconnect(this._helpTextStartConnect);
dojo.disconnect(this._helpTextMoveConnect);
dojo.disconnect(this._helpTextEndConnect);
},createEditor:function(_378){
if(!this.captionNode){
this.createCaption();
}
if(this.helpText&&!this.helpNode){
this.createHelpNode();
}
this.destroyEditor();
var n=document.createElement("div");
this.domNode.appendChild(n);
this.startTimerWithName("CreateDijit",this.declaredClass);
this.editor=this._createEditor(n,_378);
dojo.attr(this.captionNode,"for",this.editor.id);
this.editorNode=wm.isNode(this.editor)?this.editor:this.editor.domNode;
this.editorNode.style.margin="0";
this.editorNode.style.padding="0";
this.stopTimerWithName("CreateDijit",this.declaredClass);
if(this.editor){
if(this._disabled){
this.setDisabled(this.disabled);
}
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
if(this.editor&&this.editor.displayMessage&&this.editor instanceof dijit._WidgetBase){
this.editor.displayMessage=dojo.hitch(this,"_displayMessage");
}
return this.editor;
},_displayMessage:function(_379){
if(!this.showMessages){
return;
}
var o=dojo.getObject(this.editor.declaredClass);
if(o){
o.prototype.displayMessage.apply(this.editor,arguments);
}
},validationEnabled:function(){
return true;
},_createEditor:function(_37a,_37b){
return new dijit.form.TextBox(this.getEditorProps(_37a,_37b));
},destroyEditor:function(){
this.disconnectEditor();
wm.fire(this.editor,"destroy");
this.editor=null;
},styleEditor:function(){
if(this.isRelativePositioned){
if(this.captionNode){
dojo.addClass(this.captionNode,"wmInlineDiv");
}
return;
}
dojo.style(this.editorNode,{position:"absolute"});
if(this.captionNode){
dojo.style(this.captionNode,{position:"absolute"});
}
},sizeEditor:function(){
if(this._cupdating){
return;
}
var e=(this.readonly)?this.readOnlyNode:this.editor;
if(e){
var _37c=this.getContentBounds();
var _37d=this.captionPosition;
var _37e=(_37d=="left"||_37d=="right")?wm.AbstractEditor.captionPaddingWidth:wm.AbstractEditor.captionPaddingHeight;
var w=_37c.w;
var h=_37c.h;
var _37f;
var _380;
var _381=_37c.h;
var _382;
var _383;
var _384=16;
var _385=4;
var _386=Boolean(this.helpText);
if(!this.caption||this.captionSize=="0px"||this.captionSize=="0%"){
_37f=0;
_380=w;
_383=h;
}else{
if(_37d=="left"||_37d=="right"){
if(this.fixedEditorWidth&&_37d=="right"){
_380=this.fixedEditorWidth;
_37f=w-_380-(this.helpText?_384+_385:0);
_386=false;
}else{
var _387=this.minEditorWidth||wm.isMobile?32:16;
var _388=(this.captionSize.match(/px/))?parseInt(this.captionSize):Math.floor(parseInt(this.captionSize)*w/100);
if(w-_388<(_387||0)){
_380=_387;
_37f=w-_380-(this.helpText?_384+_385:0);
_386=false;
}else{
_37f=_388;
_380=w-_37f;
}
}
_382=(_381)?_381:"";
_383=_382;
}else{
_382=(this.captionSize.match(/px/))?parseInt(this.captionSize):Math.floor(parseInt(this.captionSize)*_381/100);
if(_382>_381){
_382=_381-16;
}
_383=(_381-_382);
_37f=(w)?w:"";
_380=_37f;
if(this.helpText){
_37f-=_384+_385;
}
}
}
_37f=Math.round(_37f);
_380=Math.round(_380);
if(_386){
if(this.captionPosition=="left"||!this.caption){
_380-=_384+_385;
}else{
_37f-=_384+_385;
}
}
if(this._editorPaddingLeft&&_37f){
_380-=this._editorPaddingLeft;
}
if(this._editorPaddingRight&&_37f){
_380-=this._editorPaddingRight;
}
var s=this.captionNode.style;
var _389=(_37f-((_37d=="right"||_37d=="left")?_37e:0));
_389=(_389)?_389:0;
if(_389<0){
_389=0;
}
var form=wm.FormPanel&&this.isAncestorInstanceOf(wm.FormPanel);
if(!this.maxCaptionWidth&&(!form||!form.autoSizeCaption||form.autoSizeCaption&&this._isMaxEditor===false)){
s.width=_389+"px";
}else{
s.display="inline-block";
}
s.height=((_382&&_382>0)?_382:0)+"px";
s.lineHeight=(s.lineHeight!="normal")?s.height:"normal";
var _38a=(_37d=="right")?(_37c.l+_380+_37e):_37c.l;
if(_37d=="right"&&_386){
_38a-=_384+_385;
}
s.left=_38a+"px";
s.top=(_37d=="bottom")?(_383+_37c.t-_37e)+"px":_37c.t+"px";
var b={w:_380,h:_383,l:((_37d=="left"&&_37f)?_37f:0)+_37c.l,t:((_37d=="top"&&_382)?_382:0)+_37c.t};
if(!b.w||b.w<0){
b.w=0;
}
if(!b.h||b.h<0){
b.h=0;
}
if(e instanceof wm.Control){
var _38b=e._cupdating;
e._cupdating=true;
e.setBorder((this.editorBorder)?"1":"0");
e.setBounds(b);
e._cupdating=_38b;
if(e.invalidCss){
e.render();
}else{
e.renderBounds();
}
e.reflow();
}else{
var _38c=(e["domNode"])?e.domNode:e;
var s=_38c.style;
if(this.editorBorder&&b.w&&b.h){
s.borderWidth="1px";
if(!this._editorBackgroundColor){
s.backgroundColor="";
}
s.backgroundImage="";
b.w-=2;
b.h-=2;
if(s.lineHeight!="normal"){
s.lineHeight=(b.h)+"px";
}
}else{
s.borderWidth="0px";
if(!this._editorBackgroundColor){
s.backgroundColor="transparent";
}
s.backgroundImage="none";
if(s.lineHeight!="normal"&&b.h){
s.lineHeight=b.h+"px";
}
}
s.width=b.w+"px";
s.height=b.h+"px";
s.left=b.l+"px";
s.top=b.t+"px";
}
if(e==this.readOnlyNode){
this.updateReadOnlyNodeStyle(b.h);
}
this._editorHeight=b.h;
this._editorWidth=b.w;
}
if(this.helpText&&this.helpNode){
var s=this.helpNode.style;
s.top=(this.caption)?(parseInt(this.captionNode.style.top)+(this.captionPosition=="bottom"?5:0))+"px":b.t+"px";
s.left=(this.getContentBounds().w-16)+"px";
}
},setHelpText:function(_38d){
var _38e=this.helpText;
this.helpText=_38d;
if(_38d&&!this.helpNode){
this.createHelpNode();
this.sizeEditor();
}else{
if(!_38d&&this.helpNode){
this.destroyHelpNode();
this.sizeEditor();
}else{
if(_38d&&!_38e){
this.sizeEditor();
}
}
}
},updateReadOnlyNodeStyle:function(h){
var s=this.readOnlyNode.style;
var _38f=this.getReadOnlyNodeOverflow();
if(s.overflow!=_38f){
s.overflow=_38f;
}
var _390=this.getReadOnlyNodeLineHeight();
if(s.lineHeight!=_390){
s.lineHeight=(_390=="normal")?_390:_390+"px";
}
var _391=this.getReadOnlyNodeWhiteSpace();
if(s.whiteSpace!=_391){
s.whiteSpace=_391;
}
var _392=this.getReadOnlyNodeWordWrap();
if(s.wordWrap!=_392){
s.wordWrap=_392;
}
},getReadOnlyNodeLineHeight:function(){
if(this.singleLine){
return parseInt(this.readOnlyNode.style.height)+((this.editorBorder)?2:0);
}else{
return "normal";
}
},getReadOnlyNodeOverflow:function(){
return "hidden";
},getReadOnlyNodeWhiteSpace:function(){
return this.singleLine?"nowrap":"";
},getReadOnlyNodeWordWrap:function(){
return "normal";
},adjustCaptionPositionForMobile:function(){
if(this.isAncestorHidden()){
return;
}
if(this.captionPosition=="left"||this.captionPosition=="right"){
var _393=this.getMinWidthProp();
if(_393>this.parent.getContentBounds().w){
this._captionPosition=this.captionPosition;
this._captionAlign=this.captionAlign;
this._captionSize=this.captionSize;
this._editorHeight=this.height;
this.captionPosition="top";
this.setCaptionAlign("left");
var _394=parseInt(this.height);
this.captionSize="20px";
this.bounds.h=_394+20;
this.setBounds(this.bounds);
wm.job(this.parent.getRuntimeId()+".adjustForMobileEditorCaption",1,this.parent,function(){
if(!this.isDestroyed){
this.setBestHeight();
this._heightAdjustedForMobileCaption=true;
if(this.bounds.h>this.parent.bounds.h){
this.setAutoScroll(true);
}
}
});
}
}else{
if(this._captionPosition){
this.captionPosition=this._captionPosition;
var _395=this.captionSize;
this.captionSize=this._captionSize;
var _393=this.getMinWidthProp(true);
this.captionPosition="top";
this.captionSize=_395;
if(_393<=this.parent.getContentBounds().w){
this.captionPosition=this._captionPosition;
delete this._captionPosition;
this.setCaptionAlign(this._captionAlign);
delete this._captionAlign;
this.captionSize=this._captionSize;
delete this._captionSize;
this.bounds.h=this._editorHeight;
delete this._editorHeight;
this.setBounds(this.bounds);
wm.job(this.parent.getRuntimeId()+".adjustForMobileEditorCaption",1,this.parent,function(){
if(!this.isDestroyed&&this._heightAdjustedForMobileCaption){
this.setBestHeight();
}
});
}
}
}
},renderBounds:function(){
if(!this._initializing&&wm.device=="phone"&&this.parent.layoutKind=="top-to-bottom"&&!this._percEx.h){
this.adjustCaptionPositionForMobile();
}
this.inherited(arguments);
this.sizeEditor();
},setEditorBorder:function(_396){
this.editorBorder=_396;
this.sizeEditor();
},addEditorConnect:function(_397){
this._editorConnects.push(dojo.connect.apply(dojo,arguments));
},connectEditor:function(){
this.disconnectEditor();
this.addEditorConnect(this.editor,"onChange",this,"changed");
this.addEditorConnect(this.editor,"onBlur",this,"blurred");
this.addEditorConnect(this.editor,"_onFocus",this,"focused");
var _398=this.editor.focusNode||this.editor.domNode||this.editor;
this.addEditorConnect(_398,"onkeypress",this,"keypressed");
if(_398.tagName=="INPUT"){
try{
this.addEditorConnect(_398,"oncut",this,"keypressed");
this.addEditorConnect(_398,"onpaste",this,"keypressed");
}
catch(e){
}
}
if(this.validationEnabled()){
this.addEditorConnect(this.editor,"validate",this,"editorValidated");
}
},disconnectEditor:function(){
dojo.forEach(this._editorConnects,dojo.disconnect);
this._editorConnects=[];
},invalidate:function(){
delete this._isValid;
},keypressed:function(_399){
if(_399.type=="cut"||_399.type=="paste"||wm.isMobile||_399.charCode||_399.keyCode==dojo.keys.BACKSPACE||_399.keyCode==dojo.keys.DELETE||dojo.indexOf(this.changeKeycodes,_399.keyCode)!=-1){
this.validate();
this.dokeypress(_399);
}
},blurred:function(){
this.validate();
this.doOnblur();
},focused:function(){
dojo.publish("wm.AbstractEditor-focused",[this]);
this.doOnfocus();
},doOnblur:function(){
if(!this.disabled){
wm.onidle(this,function(){
this.onblur();
});
}
},onblur:function(){
},doOnfocus:function(){
if(!this.disabled){
wm.onidle(this,function(){
this.onfocus();
});
}
},onfocus:function(){
},changed:function(){
this.validate();
this.doOnchange();
},doOnchange:function(){
if(this.editorChanged()){
var e=this.editor;
if(!this._loading&&!this.isUpdating()&&!this.readonly&&e&&!this.isLoading()){
this.onchange(this.getDisplayValue(),this.getDataValue(),this._inSetDataValue);
}
}
},onchange:function(_39a,_39b,_39c){
},_getValidatorNode:function(){
var n=this.editor&&this.editor instanceof dijit._WidgetBase&&this.editor.domNode.firstChild;
if(!n){
return null;
}
for(var i=0,c,_39d=n.childNodes;c=_39d[i];i++){
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
wm.job(this.getRuntimeId()+"_validate",25,dojo.hitch(this,function(){
if(!this.isDestroyed){
if(this.parent){
wm.fire(this.parent,"validate");
}
this.valueChanged("invalid",this.getInvalid());
}
}));
},getEditorProps:function(_39e,_39f){
return dojo.mixin({srcNodeRef:_39e,owner:this,disabled:this.disabled},_39f||{});
},isValid:function(){
return !this.getInvalid();
},getInvalid:function(){
var _3a0=this.validationEnabled();
if(_3a0&&this.editor&&this.editor.isValid){
if(this._isValid===undefined){
this._isValid=this.editor.isValid();
}
return !(this.readonly||this._isValid);
}else{
if(this.required&&!this.readonly){
var _3a1=this.getDataValue();
if(_3a1===undefined||_3a1===null||_3a1===""){
return true;
}
}
}
},setInvalid:function(_3a2){
if(_3a2===undefined){
_3a2=true;
}
this._isValid=false;
if(this.editor instanceof dijit._WidgetBase){
this.editor.set("state",_3a2?"Error":"");
}
this.editorValidated();
this.valueChanged("invalid",Boolean(_3a2));
},_getReadonlyValue:function(){
return this.getDisplayValue()||"";
},createReadOnlyNode:function(){
var node=dojo.create("div");
dojo.addClass(node,"wmeditor-readonlyNode");
dojo.attr(node,"role","textbox");
dojo.attr(node,"aria-readonly",true);
dojo.attr(node,"aria-labelledby",this.domNode.id);
var _3a3=node.style;
_3a3.lineHeight="normal";
_3a3.position="absolute";
_3a3.whiteSpace=(this.singleLine)?"nowrap":"normal";
return node;
},setReadonly:function(_3a4,_3a5){
var r=this.readonly;
this.readonly=_3a4;
if(r!=this.readonly){
this.setCaption(this.caption);
}
var _3a6=this.domNode;
if(!this.readOnlyNode&&this.readonly){
this.readOnlyNode=this.createReadOnlyNode();
}
if(this.readOnlyNode){
if(this.readonly&&this.readOnlyNode.parentNode!=_3a6){
dojo.place(this.readOnlyNode,_3a6,"last");
}else{
if(!this.readonly&&this.readOnlyNode.parentNode==_3a6){
_3a6.removeChild(this.readOnlyNode);
}
}
}
if(_3a5){
if(this.readonly){
this.editorNode.style.display="none";
}else{
this.editorNode.style.display="block";
}
}else{
if(!this.readonly&&this.editorNode.parentNode!=_3a6){
dojo.place(this.editorNode,_3a6,"last");
}else{
if(this.readonly&&this.editorNode.parentNode==_3a6){
_3a6.removeChild(this.editorNode);
}
}
}
this.invalidCss=true;
this.render();
if(this.readonly){
wm.fire(this.editor,"_hideTooltip");
}
this.updateReadonlyValue();
},updateReadonlyValue:function(_3a7){
if(this.readonly&&this.readOnlyNode){
var _3a8;
if(this.$.format&&this.$.format.declaredClass!="wm.DataFormatter"){
_3a8=this.$.format.format(_3a7||this.getDataValue());
}else{
if(this.formatter&&dojo.isFunction(this.owner[this.formatter])){
try{
_3a8=this.owner[this.formatter](this,_3a7||this.getDataValue());
}
catch(e){
console.error("Formatter error in "+this.toString()+": "+e);
}
}
}
if(_3a8===undefined){
_3a8=_3a7||this._getReadonlyValue();
}
this.readOnlyNode.innerHTML=_3a8;
}
},getDisplayValue:function(){
return this.editor&&this.editor.declaredClass&&this.editor.get&&this.editor.get("displayedValue")?this.editor.get("displayedValue")||"":this.getEditorValue()||"";
},makeEmptyValue:function(){
if(this.emptyValue=="unset"&&this.display){
return wm.defaultEmptyValue(this.display);
}
switch(this.emptyValue){
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
if(this.editor){
v=this.editor.get("value");
}
return (v||v===0)?v:this.makeEmptyValue();
},normalizeDataValue:function(_3a9){
return _3a9;
},setEditorValue:function(_3aa){
if(this.editor){
_3aa=_3aa===undefined?null:_3aa;
_3aa=this.normalizeDataValue(_3aa);
var _3ab=this.editor.get("value");
this.editor.set("value",_3aa,false);
this.editor._lastValueReported=_3aa?_3aa:"";
if(_3ab!=_3aa){
this.changed();
}else{
if((typeof _3aa!="object"||_3aa===null)&&this.dataValue!==_3aa){
this.displayValue=this.getDisplayValue();
this.dataValue=this.getDataValue();
}
}
this.updateReadonlyValue();
}else{
this.dataValue=_3aa;
}
},setDisplayValue:function(_3ac){
this.setEditorValue(_3ac);
},setRequired:function(_3ad){
var _3ae=this.required;
this.required=_3ad;
if(this.editor){
this.editor.required=_3ad;
if(this.required||_3ae){
this.validate();
this.setCaption(this.caption);
}
}
},getRequired:function(){
return this.required;
},beginEditUpdate:function(_3af){
this._updating++;
},endEditUpdate:function(_3b0){
this._updating--;
},requireChanged:function(){
this.setCaption(this.caption);
},setInitialValue:function(){
this.beginEditUpdate();
try{
this.setEditorValue(wm.propertyIsChanged(this.dataValue,"dataValue",this.constructor)?this.dataValue:this.displayValue);
}
catch(e){
}
this.endEditUpdate();
this.clearDirty(true);
},editorChanged:function(){
var _3b1=this.getDisplayValue();
var _3b2=false;
if(this.displayValue!=_3b1){
this.valueChanged("displayValue",this.displayValue=_3b1);
_3b2=true;
}
var _3b3=this.getDataValue();
if(this.calcIsDirty(_3b3,this._lastValueReported)){
this.valueChanged("dataValue",this.dataValue=_3b3);
_3b2=true;
}else{
this.dataValue=_3b3;
}
if(_3b2){
if(this._inPostInit){
this._lastValue=this.dataValue;
}
this.updateIsDirty();
}
return _3b2;
},calcIsDirty:function(val1,val2){
if(val1===undefined||val1===null){
val1="";
}
if(val2===undefined||val2===null){
val2="";
}
return val1!=val2;
},clearDirty:function(_3b4){
this._lastValueReported=this._lastValue=this.dataValue==null?this.makeEmptyValue():this.dataValue;
this.updateIsDirty();
},updateIsDirty:function(){
var _3b5=this.isDirty;
var _3b6=true;
if(this._initializing){
_3b6=false;
this._lastValueReported=this._lastValue=this.dataValue==null?this.makeEmptyValue():this.dataValue;
}else{
if(!this.calcIsDirty(this.dataValue,this._lastValue)){
_3b6=false;
}else{
if((this.dataValue===""||this.dataValue===null||this.dataValue===undefined)&&(this._lastValue===""||this._lastValue===null||this._lastValue===undefined)){
_3b6=false;
}
}
}
this.valueChanged("isDirty",this.isDirty=_3b6);
if(_3b5!=this.isDirty){
dojo.toggleClass(this.domNode,"isDirty",this.isDirty);
}
if(!app.disableDirtyEditorTracking){
wm.fire(this.parent,"updateIsDirty");
}
},getDataValue:function(){
if(this.isReady()){
return this.getEditorValue();
}else{
if(this.dataValue===null||this.dataValue===undefined||this.dataValue===""){
return this.makeEmptyValue();
}else{
return this.dataValue;
}
}
},setDataValue:function(_3b7){
this._inSetDataValue=true;
if(_3b7===undefined){
_3b7=null;
}
this.setEditorValue(_3b7);
if(_3b7===""||_3b7===null){
this.resetState();
}
if(!this.isUpdating()){
this.clearDirty();
}
delete this._inSetDataValue;
},isUpdating:function(){
return this._updating>0;
},isReady:function(){
return Boolean(this.editor);
},canFocus:function(){
return !this.readonly;
},focus:function(){
wm.fire(this.editor,"focus");
},reset:function(){
this.setDataValue(this._lastValue);
this.resetState();
},resetState:function(){
this.invalidate();
var e=this.editor;
if(e&&e instanceof dijit._WidgetBase){
e._hasBeenBlurred=false;
wm.fire(e,"_hideTooltip");
if(this.validatorNode&&!this.getDisplayValue()){
this.validatorNode.style.display="none";
e.set("state","Normal");
e._setStateClass();
}
}
},clear:function(){
this._lastValue=this.makeEmptyValue();
this.setDataValue(null);
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
},valueChanged:function(_3b8,_3b9){
if(this._updating&&(_3b8=="dataValue"||_3b8=="isDirty"||_3b8=="displayValue"||_3b8=="invalid")){
return;
}
if(_3b8=="dataValue"){
this._lastValueReported=_3b9;
}
this.inherited(arguments);
},isLoading:function(){
return this._loading;
},dokeypress:function(_3ba){
if(this.changeOnKey||(this.changeOnEnter&&_3ba.keyCode==dojo.keys.ENTER)){
wm.onidle(this,"doChangeOnKey",_3ba);
}
if(_3ba.keyCode==dojo.keys.ENTER){
wm.onidle(this,"onEnterKeyPress",[this]);
}
},doChangeOnKey:function(_3bb){
var e=this.editor;
this.changed();
},setDefaultOnInsert:function(){
if(this.editor&&this.defaultInsert!==undefined){
if(this.$.binding&&this.$.binding.wires.defaultInsert){
this.$.binding.wires.defaultInsert.refreshValue();
}
this.editor.set("value",this.defaultInsert,false);
this.invalidate();
}
},onEnterKeyPress:function(){
},toHtml:function(_3bc){
var _3bd=_3bc-4;
var _3be="2px 4px 2px 4px";
_3bd-=8;
_3bd-=2;
var _3bf=125;
var _3c0=(_3bd-_3bf<100||this.captionPosition=="top"||this.captionPosition=="bottom");
var _3c1=this.toHtmlStyles();
if(this.caption&&this.captionSize!="0px"&&this.captionSize!="0%"&&!_3c0){
var _3c2=4;
var _3c3=_3bd-_3bf;
return "<div "+_3c1+" class='wmeditor' id='"+this.domNode.id+"' style='margin: "+_3be+";'><div class='wmeditor-label' style='width:"+(_3bf-_3c2)+"px;padding-right:"+_3c2+"px;display:inline-block;'>"+this.caption+"</div><div class='wmeditor-value' style='display: inline-block;width:"+_3c3+"px'>"+(this.getDisplayValue()||"&nbsp;")+"</div></div>";
}else{
var html=[];
html.push("<div "+_3c1+" class='wmeditor' id='"+this.domNode.id+"' style='margin: "+_3be+";'>");
if(this.caption&&this.captionSize!="0px"&&this.captionSize!="0%"){
html.push("<div class='wmeditor-label' >"+this.caption+"</div>");
}
html.push("<div class='wmeditor-value'>"+(this.getDisplayValue()||"&nbsp;")+"</div>");
html.push("</div>");
return html.join("\n");
}
}});
wm.AbstractEditor.captionPaddingWidth=8;
wm.AbstractEditor.captionPaddingHeight=2;
dojo.declare("wm.AbstractEditorContainer",wm.AbstractEditor,{containerLayoutKind:"left-to-right",editorBorder:false,_createEditor:function(_3c4,_3c5){
this.editor=new wm.Container({owner:this,parent:this,name:"editContainer",width:"100%",height:"100%",padding:"0",margin:"0",layoutKind:this.containerLayoutKind,verticalAlign:"top",horizontalAlign:"left"});
return this.editor;
},_onShowParent:function(){
if(this.editor){
this.editor.callOnShowParent();
}
},_onHideParent:function(){
if(this.editor){
this.editor.callOnHideParent();
}
},sizeEditor:function(){
this.inherited(arguments);
this.flow();
},flow:function(){
if(this.editor){
this.editor.flow();
}
},setDisabled:function(_3c6){
wm.Control.prototype.setDisabled.call(this,_3c6);
},focus:function(_3c7){
},blur:function(_3c8){
},_getValidatorNode:function(){
return null;
},setEditorValue:function(_3c9){
this.dataValue=_3c9;
},getEditorValue:function(){
return this.dataValue;
}});
}
if(!dojo._hasResource["dijit.form.SimpleTextarea"]){
dojo._hasResource["dijit.form.SimpleTextarea"]=true;
dojo.provide("dijit.form.SimpleTextarea");
dojo.declare("dijit.form.SimpleTextarea",dijit.form.TextBox,{baseClass:"dijitTextBox dijitTextArea",attributeMap:dojo.delegate(dijit.form._FormValueWidget.prototype.attributeMap,{rows:"textbox",cols:"textbox"}),rows:"3",cols:"20",templateString:"<textarea ${!nameAttrSetting} dojoAttachPoint='focusNode,containerNode,textbox' autocomplete='off'></textarea>",postMixInProperties:function(){
if(!this.value&&this.srcNodeRef){
this.value=this.srcNodeRef.value;
}
this.inherited(arguments);
},buildRendering:function(){
this.inherited(arguments);
if(dojo.isIE&&this.cols){
dojo.addClass(this.textbox,"dijitTextAreaCols");
}
},filter:function(_3ca){
if(_3ca){
_3ca=_3ca.replace(/\r/g,"");
}
return this.inherited(arguments);
},_previousValue:"",_onInput:function(e){
if(this.maxLength){
var _3cb=parseInt(this.maxLength);
var _3cc=this.textbox.value.replace(/\r/g,"");
var _3cd=_3cc.length-_3cb;
if(_3cd>0){
if(e){
dojo.stopEvent(e);
}
var _3ce=this.textbox;
if(_3ce.selectionStart){
var pos=_3ce.selectionStart;
var cr=0;
if(dojo.isOpera){
cr=(this.textbox.value.substring(0,pos).match(/\r/g)||[]).length;
}
this.textbox.value=_3cc.substring(0,pos-_3cd-cr)+_3cc.substring(pos-cr);
_3ce.setSelectionRange(pos-_3cd,pos-_3cd);
}else{
if(dojo.doc.selection){
_3ce.focus();
var _3cf=dojo.doc.selection.createRange();
_3cf.moveStart("character",-_3cd);
_3cf.text="";
_3cf.select();
}
}
}
this._previousValue=this.textbox.value;
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.Editors.Text"]){
dojo._hasResource["wm.base.widget.Editors.Text"]=true;
dojo.provide("wm.base.widget.Editors.Text");
dojo.declare("wm.ResizableEditor",wm.AbstractEditor,{maxHeight:96,getReadOnlyNodeLineHeight:function(){
if(this.autoSizeHeight){
return "normal";
}else{
return this.inherited(arguments);
}
},getReadOnlyNodeWhiteSpace:function(){
if(this.autoSizeWidth){
return "nowrap";
}else{
if(this.autoSizeHeight){
return "normal";
}else{
return this.singleLine?"nowrap":"normal";
}
}
},getReadOnlyNodeOverflow:function(){
if(dojo.marginBox(this.readOnlyNode).h<40){
return "hidden";
}
if(this.autoSizeHeight||this.autoSizeWidth){
return (this._autoSizeNeedsOverflow)?"auto":"hidden";
}else{
return "hidden";
}
},updateReadonlyValue:function(_3d0){
this.inherited(arguments);
if(this.readonly&&this.readOnlyNode&&this.readOnlyNode.style.width&&(this.autoSizeHeight||this.autoSizeWidth)){
this.doAutoSize(1,1);
}
},_onShowParent:function(){
if(this._needsAutoSize){
wm.job(this.getRuntimeId()+".autoSize",1,dojo.hitch(this,"doAutoSize"));
}
},doAutoSize:function(_3d1,_3d2){
if(!this.readonly){
return;
}
if(this._doingAutoSize||!this.autoSizeHeight&&!this.autoSizeWidth){
return;
}
if(!_3d2&&!this._needsAutoSize){
return;
}
if(this.isAncestorHidden()){
return;
}
this._doingAutoSize=true;
this._needsAutoSize=false;
var _3d3=this.readOnlyNode.style;
var _3d4=wm.Label.sizingNode;
_3d4.innerHTML=this.readOnlyNode.innerHTML;
_3d4.className=this.readOnlyNode.className;
var s=_3d4.style;
s.position="absolute";
s.paddingRight="5px";
s.paddingTop="5px";
s.lineHeight=_3d3.lineHeight;
s.whiteSpace=_3d3.whiteSpace;
this.domNode.appendChild(_3d4);
if(this.autoSizeHeight&&!this._percEx.h){
s.height="";
s.width=_3d3.width;
var _3d5=_3d4.clientHeight;
var _3d6=_3d5;
if(this.caption){
if(this.captionPosition=="top"||this.captionPosition=="bottom"){
_3d6+=parseInt(this.captionNode.style.height)+wm.AbstractEditor.captionPaddingHeight;
}
}
var _3d7=this.getMinHeightProp();
if(_3d7>_3d6){
_3d6=_3d7;
}
if(this.maxHeight&&this.maxHeight<_3d6&&(dojo.marginBox(this.readOnlyNode).h>40)){
_3d6=this.maxHeight;
_3d3.overflow="auto";
this._autoSizeNeedsOverflow=true;
}else{
_3d3.overflow="hidden";
this._autoSizeNeedsOverflow=false;
}
if(_3d1){
this.setHeight(_3d6+"px");
}else{
this.bounds.h=_3d6;
this.height=_3d6+"px";
}
}else{
if(this.autoSizeWidth&&!this._percEx.w){
var _3d8;
if(this.parent.layoutKind=="left-to-right"){
_3d8=this.parent.layout.getMaxFreeSpace(this.parent.c$,"w",this.parent.bounds.w);
_3d8+=this.bounds.w;
}else{
_3d8=this.parent.getCurrentMaxWidth();
}
s.height=_3d3.height;
s.width="";
var _3d9=_3d4.clientWidth;
var _3da=_3d9;
if(this.caption){
if(this.captionPosition=="left"||this.captionPosition=="right"){
_3da+=parseInt(this.captionNode.style.width)+wm.AbstractEditor.captionPaddingWidth;
}
}
if(_3da>_3d8){
_3da=_3d8;
_3d3.overflow="auto";
this._autoSizeNeedsOverflow=true;
}else{
_3d3.overflow="hidden";
this._autoSizeNeedsOverflow=false;
}
var _3db=this.getMinWidthProp();
if(_3db>_3da){
_3da=_3db;
}
if(_3d1){
this.setWidth(_3da+"px");
}else{
this.bounds.w=_3da;
this.width=_3da+"px";
}
}
}
_3d4.parentNode.removeChild(_3d4);
this.disruptChromeOverflow("readOnlyNode");
this.updateReadOnlyNodeStyle();
this._doingAutoSize=false;
},setAutoSizeWidth:function(_3dc){
this.inherited(arguments);
if(this.readOnlyNode&&this.readonly){
this.updateReadOnlyNodeStyle();
}
},setAutoSizeHeight:function(_3dd){
this.inherited(arguments);
if(this.readOnlyNode&&this.readonly){
this.updateReadOnlyNodeStyle();
}
},setMaxHeight:function(_3de){
this.inherited(arguments);
if(!this.maxHeight&&this.readOnlyNode){
this.readOnlyNode.style.overflow="hidden";
}
if(this.readOnlyNode){
this.updateReadOnlyNodeStyle();
this.doAutoSize(1,1);
}
},addUserClass:function(_3df,_3e0){
this.inherited(arguments);
if((this.autoSizeHeight||this.autoSizeWidth)&&this.isDesignLoaded()){
this.doAutoSize(1,1);
}
},getAutoSize:function(_3e1){
return this.autoSizeHeight?"height":this.autoSizeWidth?"width":"none";
},setAutoSize:function(_3e2){
if(_3e2=="none"){
if(this.autoSizeHeight){
this.setAutoSizeHeight(false);
}
if(this.autoSizeWidth){
this.setAutoSizeWidth(false);
}
}else{
if(_3e2=="width"){
if(this.autoSizeHeight){
this.setAutoSizeHeight(false);
}
if(!this.autoSizeWidth){
this.setAutoSizeWidth(true);
}
}else{
if(_3e2=="height"){
if(!this.autoSizeHeight){
this.setAutoSizeHeight(true);
}
if(this.autoSizeWidth){
this.setAutoSizeWidth(false);
}
}
}
}
}});
dojo.declare("wm.Text",wm.ResizableEditor,{selectOnClick:false,resetButton:false,placeHolder:"",changeOnKey:false,changeOnEnter:true,showMessages:true,promptMessage:"",invalidMessage:"",password:false,maxChars:"",regExp:".*",_passwordChar:"&#8226;",tooltipDisplayTime:2000,getEditorProps:function(_3e3,_3e4){
var p=dojo.mixin(this.inherited(arguments),{selectOnClick:this.selectOnClick,promptMessage:this.promptMessage,invalidMessage:this.invalidMessage||"$_unset_$",placeHolder:this.placeHolder,regExp:this.regExp,constraints:{regExpOptions:this.regExpOptions},value:this.displayValue,required:this.required,tooltipDisplayTime:this.tooltipDisplayTime});
if(this.password){
p.type="password";
}
if(this.maxChars){
p.maxLength=this.maxChars;
}
return dojo.mixin(p,_3e4||{});
},_onDijitFocus:function(){
if(this.disabled){
return;
}
var val=this.editor.get("value");
if(val){
var _3e5=this.editor.format(val);
if(_3e5!==undefined){
this.editor.textbox.value=_3e5;
}
}
this.inherited(arguments);
},validationEnabled:function(){
return (this.regExp&&this.regExp!=".*")||this.required;
},setSelectOnClick:function(_3e6){
this.selectOnClick=_3e6;
if(this.editor){
this.editor.attr("selectOnClick",_3e6);
}
},setPlaceHolder:function(_3e7){
this.placeHolder=_3e7;
if(this.editor){
this.editor.attr("placeHolder",_3e7);
}
},setPassword:function(_3e8){
this.password=_3e8;
this.createEditor();
var pos=this.captionPosition;
this.captionPosition="";
this.setCaptionPosition(pos);
},setRegExp:function(_3e9){
this.regExp=_3e9;
if(!this._cupdating){
this.createEditor();
}
},selectText:function(){
dijit.selectInputText(this.editor.focusNode);
},_createEditor:function(_3ea,_3eb){
var _3ec;
if(this.validationEnabled()||this.promptMessage){
_3ec=new dijit.form.ValidationTextBox(this.getEditorProps(_3ea,_3eb));
}else{
_3ec=new dijit.form.TextBox(this.getEditorProps(_3ea,_3eb));
}
if(this.resetButton){
dojo.addClass(this.domNode,"wmreseteditor");
if(wm.isMobile){
this._resetButtonNode=document.createElement("span");
this._resetButtonNode.innerHTML="X";
var s=this._resetButtonNode.style;
s.position="absolute";
s.fontWeight="bold";
s.top="1px";
s.right="1px";
s.width="16px";
s.textShadow="1px 1px #aaa";
}else{
this._resetButtonNode=document.createElement("img");
this._resetButtonNode.src=this._resetButtonUrl||dojo.moduleUrl("lib.images.boolean.Signage")+"Close_gray.png";
var s=this._resetButtonNode.style;
s.position="absolute";
s.width="16px";
s.height="16px";
s.top="1px";
s.right="1px";
}
_3ec.domNode.appendChild(this._resetButtonNode);
this._resetButtonConnect=dojo.connect(this._resetButtonNode,"onclick",this,function(){
wm.onidle(this,function(){
this._onResetClick();
this.setDataValue("");
});
});
}
return _3ec;
},_onResetClick:function(){
},sizeEditor:function(){
this.inherited(arguments);
if(this._cupdating){
return;
}
if(dojo.isFF||dojo.isIE){
var _3ed=dojo.query("input.dijitInputInner",this.domNode)[0];
if(_3ed){
_3ed.style.height=this.editorNode.style.height;
_3ed.style.lineHeight=this.editorNode.style.lineHeight;
}
}
},destroy:function(){
if(this._resetButtonNode){
dojo.destroy(this._resetButtonNode);
}
if(this._resetButtonConnect){
dojo.disconnect(this._resetButtonConnect);
}
this.inherited(arguments);
},validator:function(_3ee,_3ef){
var l=Number(this.maxChars);
return this.maxChars!==""&&!isNaN(l)?_3ee.length<=l:true;
},_getReadonlyValue:function(){
var v=this.inherited(arguments);
if(this.password){
for(var i=0,a=[],l=v.length;i<l;i++){
a.push(this._passwordChar);
}
v=a.join("");
}
return v;
},setResetButton:function(_3f0){
if(this._resetButtonConnect){
dojo.disconnect(this._resetButtonConnect);
delete this._resetButtonConnect;
}
this.resetButton=_3f0;
dojo[_3f0?"addClass":"removeClass"](this.domNode,"wmreseteditor");
this.createEditor();
},getCursorPosition:function(){
var _3f1=0;
var ctrl=this.editor?this.editor.focusNode||this.editor:null;
if(document.selection){
this.focus();
var Sel=document.selection.createRange();
Sel.moveStart("character",-ctrl.value.length);
_3f1=Sel.text.length;
}else{
if(ctrl.selectionStart||ctrl.selectionStart=="0"){
_3f1=ctrl.selectionStart;
}
}
return (_3f1);
},getCursorLength:function(){
var _3f2=0;
var ctrl=this.editor?this.editor.focusNode||this.editor:null;
if(document.selection){
this.focus();
var Sel=document.selection.createRange();
Sel.moveStart("character",-ctrl.value.length);
_3f2=Sel.text.length;
}else{
if(ctrl.selectionStart||ctrl.selectionStart=="0"){
return ctrl.selectionStart-ctrl.selectionEnd;
}
}
},setCursorPosition:function(pos){
var ctrl=this.editor?this.editor.focusNode||this.editor:null;
if(ctrl.setSelectionRange){
this.focus();
ctrl.setSelectionRange(pos,pos);
}else{
if(ctrl.createTextRange){
var _3f3=ctrl.createTextRange();
_3f3.collapse(true);
_3f3.moveEnd("character",pos);
_3f3.moveStart("character",pos);
_3f3.select();
}
}
},afterPaletteDrop:function(){
this.inherited(arguments);
var _3f4=this.getParentForm();
if(_3f4){
this.emptyValue="emptyString";
}
}});
dojo.declare("wm.LargeTextArea",wm.Text,{_editorPaddingLeft:3,_editorPaddingRight:3,showMessages:false,width:"300px",height:"96px",captionSize:"24px",captionPosition:"top",captionAlign:"left",singleLine:false,changeOnEnter:false,normalizeDataValue:function(_3f5){
if(_3f5===undefined||_3f5===null){
return "";
}else{
return String(_3f5);
}
},_createEditor:function(_3f6,_3f7){
var _3f8=new dijit.form.SimpleTextarea(this.getEditorProps(_3f6,_3f7));
_3f8.domNode.style.lineHeight="normal";
return _3f8;
},validationEnabled:function(){
return false;
},sizeEditor:function(){
this.inherited(arguments);
},setSingleLine:function(_3f9){
this.inherited(arguments);
this.captionNode.style.lineHeight="normal";
},getReadOnlyNodeLineHeight:function(){
return "normal";
},getReadOnlyNodeWhiteSpace:function(){
if(this.autoSizeWidth){
return this.inherited(arguments);
}else{
return "normal";
}
},getReadOnlyNodeOverflow:function(){
if(this.autoSizeWidth||this.autoSizeHeight){
return this.inherited(arguments);
}else{
return "auto";
}
},getMinHeightProp:function(){
return this.minHeight||80;
}});
}
if(!dojo._hasResource["wm.base.components.LiveView"]){
dojo._hasResource["wm.base.components.LiveView"]=true;
dojo.provide("wm.base.components.LiveView");
wm.getViewField=function(_3fa,_3fb){
if(_3fa){
var _3fc=wm.typeManager.getPropertyInfoFromSchema(_3fa,_3fb);
return {caption:wm.capitalize(_3fb.split(".").pop()),sortable:true,dataIndex:_3fb,type:_3fc.type,displayType:wm.getDisplayType(_3fc),required:_3fc.required,readonly:dojo.indexOf(_3fc.noChange||[],"read")>=0,includeLists:true,includeForms:true,order:_3fc.fieldOrder,subType:_3fc.fieldSubType};
}
};
wm.getDefaultView=function(_3fd,_3fe){
_3fe=_3fe||"";
var v=[],tm=wm.typeManager,_3ff=tm.getTypeSchema(_3fd),_400=_3fe?tm.getTypeSchema(tm.getPropertyInfoFromSchema(_3ff,_3fe).type):_3ff,_401=wm.typeManager.getSimplePropNames(_400);
wm.forEach(_401,function(f){
v.push(wm.getViewField(_3ff,(_3fe?_3fe+".":"")+f));
});
_401=wm.typeManager.getStructuredPropNames(_400);
wm.forEach(_401,function(_402){
var type=_400[_402].type;
var _403=wm.typeManager.getType(type);
if(_403&&!_403.liveService){
v.push(wm.getViewField(_3ff,(_3fe?_3fe+".":"")+_402));
var _404=wm.typeManager.getSimplePropNames(_403.fields);
wm.forEach(_404,function(f){
var path=(_3fe?_3fe+".":"")+_402+"."+f;
v.push(wm.getViewField(_3ff,path));
});
}
});
return v;
};
dojo.declare("wm.LiveView",wm.Component,{service:"",dataType:"",related:[],view:[],constructor:function(){
this.related=[];
this.view=[];
},init:function(){
this.inherited(arguments);
this.setDataType(this.dataType);
},loaded:function(){
this.inherited(arguments);
this.viewChanged();
},viewChanged:function(){
dojo.publish(this.getRuntimeId()+"-viewChanged",[this.getId()]);
},createDefaultView:function(){
this.setFields(this.related||[],wm.getDefaultView(this.dataType));
},getRelatedFields:function(){
if(!this.related||this.related.length==0){
this.related=this.getRequiredRelatedFields();
}
return this.related||[];
},getRequiredRelatedFields:function(){
try{
var ts=[];
var _405=wm.typeManager.getTypeSchema(this.dataType);
for(var i in _405){
var _406=_405[i];
var _407=wm.typeManager.isStructuredType(_406.type);
if(_407&&_406.required){
if(_406.type=="com.sforce.soap.enterprise.salesforceservice.QueryResultType"){
continue;
}
this.addRelated(i);
ts.push(i);
}
}
return ts;
}
catch(e){
}
return [];
},setFields:function(_408,_409){
this.related=_408;
this._sortView(_409);
this.view=_409;
},getFieldIndex:function(_40a){
var di=dojo.isObject(_40a)?_40a.dataIndex:_40a;
for(var i=0,view=this.view,f;f=view[i];i++){
if(f.dataIndex==di){
return i;
}
}
return -1;
},hasField:function(_40b){
return (this.getFieldIndex(_40b)>-1);
},getRelatedIndex:function(_40c){
for(var i=0,_40d=this.related,r;r=_40d[i];i++){
if(r==_40c){
return i;
}
}
return -1;
},hasRelated:function(_40e){
return (this.getRelatedIndex(_40e)>-1);
},addField:function(_40f){
var f=_40f&&wm.getViewField(wm.typeManager.getTypeSchema(this.dataType),_40f);
if(f&&!this.hasField(f)){
this.view.push(f);
this._sortView(this.view);
}
return f;
},removeField:function(_410){
var i=this.getFieldIndex(_410);
if(i>-1){
this.view.splice(i,1);
}
},addRelated:function(_411){
if(_411&&!this.hasRelated(_411)){
this.related.push(_411);
this.addRelatedDefaultView(_411);
}
},removeRelated:function(_412){
var i=this.getRelatedIndex(_412);
if(i>-1){
this.related.splice(i,1);
}
},addRelatedDefaultView:function(_413){
var _414=wm.getDefaultView(this.dataType,_413);
dojo.forEach(_414,function(f){
if(!this.hasField(f)){
this.view.push(f);
}
},this);
this._sortView();
},_sortView:function(_415){
if(dojo.isArray(_415)){
var t=this.dataType;
_415.sort(function(a,b){
if(wm.isNumber(a.order)||wm.isNumber(b.order)){
return wm.data.compareNumbers(a.order,b.order);
}else{
a=a.dataIndex;
b=b.dataIndex;
var al=a.split(".").length,bl=b.split(".").length;
return al==bl?wm.data.compare(a,b):wm.data.compareNumbers(al,bl);
}
});
}
},_copyView:function(_416){
var view=[];
for(var i=0,v;(v=_416[i]);i++){
view.push(dojo.mixin({},v));
}
return view;
},getViewById:function(_417){
if(_417 instanceof wm.LiveView){
return _417;
}else{
if(_417){
return this.getRoot().app.getValueById(_417);
}
}
},copyLiveView:function(_418){
var lv=this.getViewById(_418);
if(lv){
this.setService(lv.service);
this.setDataType(lv.dataType);
var v=this._copyView(lv.view);
this.setFields(lv.related,v);
}else{
this.clearView();
}
},clearView:function(){
this.setService("");
this.setDataType("");
this.setFields([],[]);
},setService:function(_419){
this.service=_419;
},setDataType:function(_41a){
var t=this.dataType;
this.dataType=_41a;
if(t!=this.dataType){
this.dataTypeChanged();
}
if(this._defaultView){
this.createDefaultView();
}
if(this._isDesignLoaded&&this.owner instanceof wm.Variable){
var _41b=wm.typeManager.getType(this.dataType);
if(_41b){
if(this.view){
for(var i=this.view.length-1;i>=0;i--){
if(this.view[i].dataIndex.indexOf(".")==-1){
if(!_41b.fields[this.view[i].dataIndex]){
wm.Array.removeElementAt(this.view,i);
}
}
}
if(this.owner instanceof wm.LiveVariable){
wm.forEachProperty(_41b.fields,dojo.hitch(this,function(_41c,_41d){
if(!wm.typeManager.isStructuredType(_41c.type)){
if(!dojo.some(this.view,function(_41e){
return _41e.dataIndex==_41d;
})){
this.addField(_41d);
}
}
}));
}
}
}
}
},dataTypeChanged:function(){
this.related=[];
this.view=[];
},hasRelatedProp:function(_41f){
for(var i=0,_420=this.related,r;(r=_420[i]);i++){
if(r==_41f){
return true;
}
}
},getListView:function(_421){
var _422=wm.typeManager.getTypeSchema(this.getSubType(_421));
return dojo.filter(this.getSubView(_421),function(v){
return !wm.typeManager.isPropInList(_422,v.dataIndex);
});
},getSubType:function(_423){
if(_423){
var _424=wm.typeManager.getTypeSchema(this.dataType);
return (_424&&(wm.typeManager.getPropertyInfoFromSchema(_424,_423)||0).type)||this.dataType;
}else{
return this.dataType;
}
},getSubRelated:function(_425){
_425=_425?_425+".":"";
if(_425){
var list=[],l=_425.length;
dojo.forEach(this.related,function(r){
if(r.indexOf(_425)==0){
list.push(r.substring(l));
}
});
return list;
}else{
return this.related;
}
},getSubView:function(_426){
if(this._isDesignLoaded&&this.owner instanceof wm.Variable&&this.view.length==0){
this.createDefaultView();
}
_426=_426?_426+".":"";
var view=this._copyView(this.view);
if(_426){
var list=[],l=_426.length;
dojo.forEach(view,function(v){
if(v.dataIndex.indexOf(_426)==0){
v.dataIndex=v.dataIndex.substring(l);
list.push(v);
}
});
return list;
}else{
return view;
}
},pickListExists:function(){
var _427=false;
if(SALESFORCE_SERVICE==this.service){
for(var i=0;i<this.view.length;i++){
var e=this.view[i];
if("picklist"==e.subType){
_427=true;
break;
}
}
}
return _427;
}});
wm.Object.extendSchema(wm.LiveView,{related:{ignore:1,writeonly:1},view:{ignore:1,writeonly:1},service:{ignore:1,writeonly:1},dataType:{ignore:1,writeonly:1}});
}
if(!dojo._hasResource["wm.base.components.LiveVariable"]){
dojo._hasResource["wm.base.components.LiveVariable"]=true;
dojo.provide("wm.base.components.LiveVariable");
dojo.declare("wm.LiveVariable",wm.ServiceVariable,{autoUpdate:true,startUpdate:true,operation:"read",firstRow:0,sourceData:null,matchMode:"start",ignoreCase:false,orderBy:"",liveSource:null,refireOnDbChange:false,maxResults:500,_rootField:"",destroy:function(){
this._unsubscribeLiveView();
this.inherited(arguments);
},init:function(){
this.inherited(arguments);
this.filter=new wm.Variable({name:"filter",owner:this,type:this.type||"any"});
this.sourceData=new wm.Variable({name:"sourceData",owner:this,type:this.type||"any"});
this.setupSubscriptions();
if(this.isList===undefined&&this.operation=="read"){
this.isList=true;
}
},setupSubscriptions:function(){
this.subscribe(this.filter.getRuntimeId()+"-changed",this,"filterChanged");
this.subscribe(this.sourceData.getRuntimeId()+"-changed",this,"sourceDataChanged");
},postInit:function(){
this._inLVPostInit=true;
this.inherited(arguments);
if(this.$.liveView){
this.setLiveView(this.$.liveView);
}else{
if(this.liveSource&&this.liveSource!="app"){
this.setLiveSource(this.liveSource);
}else{
this.setLiveView(this.liveView||this.createLiveView(this.type));
}
}
this._inPostInit=true;
this.doAutoUpdate();
this._inPostInit=false;
this._inLVPostInit=false;
},_subscribeLiveView:function(){
this._unsubscribeLiveView();
if(this.liveView){
this._liveViewSubscription=dojo.subscribe(this.liveView.getRuntimeId()+"-viewChanged",dojo.hitch(this,"_liveViewChanged"));
}
},_unsubscribeLiveView:function(){
dojo.unsubscribe(this._liveViewSubscription);
this._liveViewSubscription=null;
},isLiveType:function(){
return wm.typeManager.getLiveService(this.type);
},doAutoUpdate:function(){
if(this.isLiveType()){
this.inherited(arguments);
}
},filterChanged:function(){
if(this.autoUpdate){
if(djConfig.isDebug){
this.log("autoUpdate");
}
this.doAutoUpdate();
if(djConfig.isDebug){
this.endLog("autoUpdate");
}
}
},sourceDataChanged:function(){
if(this.autoUpdate){
if(djConfig.isDebug){
this.log("autoUpdate");
}
this.doAutoUpdate();
if(djConfig.isDebug){
this.endLog("autoUpdate");
}
}
},setFilter:function(_428){
if((_428||0).type==this.type){
this.filter.setDataSet(_428);
}
},setOrderBy:function(_429){
this.orderBy=_429;
this.doAutoUpdate();
},setSourceData:function(_42a){
var _42b=this.isLiveType();
if(!_42b||(this.type&&_42a&&!_42a.declaredClass)||(_42a||0).type==this.type){
this.sourceData.setDataSet(_42a);
if(!_42b){
this._updating++;
if(_42a.liveView&&_42a.liveView.getId().match(/^app\./)){
this.setLiveSource(this.sourceData.type);
}else{
if(!this.liveView){
this.liveView=this.createLiveView();
}
this.liveView.setDataType(_42a.liveView.dataType);
this.liveView.related=dojo.clone(_42a.liveView.related);
this.liveView.service=_42a.liveView.service;
this.liveView.view=dojo.clone(_42a.liveView.view);
this.setLiveView(this.liveView);
}
this._updating--;
}
}else{
if(!_42a){
this.sourceData.setDataSet(null);
}
}
},setLiveSource:function(_42c){
var s=this.liveSource=_42c;
var v;
try{
if(this._isDesignLoaded){
v=studio.application.getValueById(s);
}else{
v=app.getValueById(s);
}
}
catch(e){
}
if(!v){
v=this.createLiveView(s);
}
if(v){
this.setLiveView(v);
}
if(!this._inLVPostInit){
this.doAutoUpdate();
}
},setLiveView:function(_42d){
this.clearData();
this.liveView=_42d;
if(this._isDesignLoaded){
this._subscribeLiveView();
}
this.setType(this.getViewType());
},createLiveView:function(_42e){
return new wm.LiveView({name:"liveView",owner:this,dataType:_42e,_defaultView:true});
},setType:function(_42f){
var _430=this.sourceData.type+"|"+dojo.toJson(this.sourceData._dataSchema);
var _431=this.filter.type+"|"+dojo.toJson(this.filter._dataSchema);
this.inherited(arguments);
var _432=this._hasChanged;
if(this.operation=="read"&&wm.isEmpty(this.getData())){
this.isList=true;
}
this.filter.setType(this.type);
this.sourceData.setType(this.type);
if(this.liveView&&this.liveView.owner==this&&(this.liveView.dataType!=this.type||_432)){
this.liveView.setDataType(this.type);
this.liveView.createDefaultView();
}
var _433=this.sourceData.type+"|"+dojo.toJson(this.sourceData._dataSchema);
var _434=this.filter.type+"|"+dojo.toJson(this.filter._dataSchema);
if(!this._updating&&!this._inLVPostInit&&this.$.binding&&(_432||_430!=_433||_431!=_434)){
this.$.binding.refresh();
}
if(this.refireOnDbChange){
if(this._updateOnDbSubscribe){
dojo.unsubscribe(this._updateOnDbSubscribe);
}
if(this.type){
this._updateOnDbSubscribe=this.subscribe(this.type+"-server-changed",this,"updateOnDbChange");
}
}
},_liveViewChanged:function(){
this.setType(this.liveView.dataType);
if(this.isDesignLoaded()){
this.doAutoUpdate();
}
},operationChanged:function(){
},updateOnDbChange:function(_435){
if(_435===this){
return;
}
if(djConfig.isDebug){
this.log("autoUpdate","updateOnDbChange");
}
this.update();
},_update:function(){
if(this._designTime){
this._service=wm.getRuntimeServiceDesignTime(this);
}else{
this._service=wm.getRuntimeService(this);
}
return this.inherited(arguments);
},getArgs:function(){
wm.getDataConvertDates=true;
var d=this.sourceData.getData(true),t=this.sourceData.type||this.type,s=wm.typeManager.getService(this.type),args=[s,t,wm.isEmpty(d)?null:d];
if(this.operation=="read"){
args=args.concat(this._getReadArguments());
}
delete wm.getDataConvertDates;
return args;
},getDebugArgs:function(){
if(this.operation=="read"){
return this.filter.getData();
}else{
return this.sourceData.getData();
}
},_getReadArguments:function(){
var _436={properties:this._getEagerProps(this),filters:this._getFilters(),matchMode:this.matchMode,ignoreCase:this.ignoreCase},_437=this.orderBy?{orderBy:(this.orderBy||"").split(",")}:{},max=this.isDesignLoaded()?this.designMaxResults:this.maxResults,_438=max?{maxResults:max,firstResult:this.firstRow}:{};
dojo.mixin(_437,_438);
return [_436,_437];
},_getFilters:function(){
return this._getFilterValues(this.filter.getData());
},_getFilterValues:function(_439,_43a){
var f=[],d,p;
for(var i in _439){
d=_439[i];
p=(_43a?(_43a||"")+".":"")+i;
if(dojo.isObject(d)&&d!==null){
f=f.concat(this._getFilterValues(d,p));
}else{
if(p!==undefined&&d!==undefined&&d!==null){
f.push(p+"="+d);
}
}
}
return f;
},_isSourceDataBound:function(){
var _43b=this.$.binding.wires,w;
for(var i in _43b){
w=_43b[i];
if((w.targetProperty||"").indexOf("sourceData")==0){
return true;
}
}
},processResult:function(_43c){
this.dataSetCount=this._service.fullResult?this._service.fullResult.dataSetSize:0;
if(this._appendData){
_43c=this.data._list.concat(_43c);
delete this._appendData;
}
this.inherited(arguments);
if(this.operation!="read"){
dojo.publish(this.type+"-server-changed",[this]);
}
},getPage:function(){
return Math.floor(this.firstRow/(this.maxResults||1));
},getTotalPages:function(){
return Math.ceil((this.dataSetCount||1)/(this.maxResults||1));
},setPage:function(_43d){
_43d=Math.max(0,Math.min(this.getTotalPages()-1,_43d));
this.firstRow=_43d*(this.maxResults||0);
this.update();
},setNextPage:function(){
this.setPage(this.getPage()+1);
},setPreviousPage:function(){
this.setPage(this.getPage()-1);
},setFirstPage:function(){
this.setPage(0);
},setLastPage:function(){
this.setPage(this.getTotalPages()-1);
}});
}
if(!dojo._hasResource["wm.base.components.LogoutVariable"]){
dojo._hasResource["wm.base.components.LogoutVariable"]=true;
dojo.provide("wm.base.components.LogoutVariable");
dojo.declare("wm.LogoutVariable",wm.ServiceVariable,{service:"securityService",operation:"logout",autoUpdate:0,startUpdate:0,clearDataOnLogout:true,logoutNavCall:null,init:function(){
this.inherited(arguments);
if(!this.clearDataOnLogout||window["PhoneGap"]){
this.logoutNavCall=new wm.NavigationCall({name:"logoutNavCall",owner:this,operation:"gotoPage"});
this.logoutNavCall.input.setData({pageName:"Login"});
}
},onSuccess:function(_43e){
if(window["PhoneGap"]){
window.localStorage.clear();
}
if(!this.clearDataOnLogout||window["PhoneGap"]){
this.logoutNavCall.update();
}else{
window.location.reload();
}
},onError:function(_43f){
this.inherited(arguments);
app.alert(wm.getDictionaryItem("wm.LogoutVariable.FAILED",{error:_43f}));
},_end:0});
dojo.declare("wm.LoginVariable",wm.ServiceVariable,{useDefaultSuccessHandler:true,service:"securityService",operation:"login",_setOperation:function(_440){
this._service._operations.login={name:"login",parameters:{username:{type:"string"},password:{type:"string"},hash:{type:"string"}},returnType:"java.lang.String"};
this.inherited(arguments);
},request:function(){
var user=this.input.getValue("username");
var pass=this.input.getValue("password");
var hash=this.input.getValue("hash");
if(!user||!pass){
var d=new dojo.Deferred();
var e=new Error("Username and Password are required");
d.errback(e);
this.onResult();
this.onError(e);
return d;
}
var _441=wm.login([user,pass,hash],this.useDefaultSuccessHandler?null:function(){
});
_441.addCallbacks(dojo.hitch(this,function(){
this.onResult();
this.onSuccess();
}),dojo.hitch(this,function(e){
this.onResult();
this.onError(e);
}));
return _441;
}});
}
if(!dojo._hasResource["wm.base.widget.Bevel"]){
dojo._hasResource["wm.base.widget.Bevel"]=true;
dojo.provide("wm.base.widget.Bevel");
dojo.declare("wm.Bevel",wm.Widget,{className:"wmbevel",flex:0,bevelSize:4,init:function(){
this.inherited(arguments);
},getOrientedStyleName:function(){
return this.className+" "+this.className+(this.vertical?"-h":"-v");
},addOrientation:function(){
dojo.addClass(this.domNode,this.getOrientedStyleName());
},removeOrientation:function(){
dojo.removeClass(this.domNode,this.getOrientedStyleName());
},updateSize:function(){
var h=(this.parent||0).layoutKind=="left-to-right",d=this.bevelSize+"px";
this.setWidth(h?d:"100%");
this.setHeight(h?"100%":d);
},setParent:function(){
this.inherited(arguments);
this.addOrientation();
this.updateSize();
},toHtml:function(){
return "<hr/>";
}});
}
if(!dojo._hasResource["wm.base.drag.capture"]){
dojo._hasResource["wm.base.drag.capture"]=true;
dojo.provide("wm.base.drag.capture");
kit=dojo;
kit.declare("wm.Capture",null,{isCaptured:false,setEvents:function(){
this.events={};
kit.forEach(arguments,kit.hitch(this,"addEvent"));
},addEvent:function(_442){
if(!this[_442]){
this[_442]=function(){
};
}
this.events[_442]=kit.hitch(this,_442);
},capture:function(){
if(this.isCaptured){
return;
}
this.doCapture();
this.isCaptured=true;
},release:function(){
if(!this.isCaptured){
return;
}
this.doRelease();
this.isCaptured=false;
}});
if(kit.isIE){
wm.Capture.extend({_bind:function(_443,_444,_445){
var on="on"+_444,old=_443[on];
_443[on]=function(){
_445(kit.fixEvent());
};
return old;
},_unbind:function(_446,_447,_448){
var on="on"+_447;
_446[on]=_448;
},doCapture:function(){
var n=document.body,e,oldf,newf;
n.setCapture(true);
this._captures={};
for(var i in this.events){
if(!(0)[i]){
this._captures[i]=this._bind(n,i,this.events[i]);
}
}
},doRelease:function(){
var n=document.body;
for(var i in this._captures){
if(!(0)[i]){
this._unbind(n,i,this._captures[i]);
}
}
this._captures=null;
n.releaseCapture(true);
}});
}else{
wm.Capture.extend({doCapture:function(_449){
for(var i in this.events){
if(!(0)[i]){
document.addEventListener(i,this.events[i],true);
}
}
},doRelease:function(){
for(var i in this.events){
if(!(0)[i]){
document.removeEventListener(i,this.events[i],true);
}
}
this.isCaptured=false;
}});
}
kit.declare("wm.MouseCapture",wm.Capture,{constructor:function(){
this.setEvents("mousemove","mouseup","mouseout","click");
},mousedown:function(e){
kit.stopEvent(e);
this.capture();
},mousemove:function(e){
},mouseout:function(e){
},mouseup:function(e){
this.release();
kit.stopEvent(e);
},click:function(e){
alert("MouseCapture saw a click!");
}});
}
if(!dojo._hasResource["wm.base.drag.drag"]){
dojo._hasResource["wm.base.drag.drag"]=true;
dojo.provide("wm.base.drag.drag");
dojo.declare("wm.Drag",null,{hysteresis:4,dx:0,dy:0,px:0,py:0,constructor:function(){
this.initNodes();
},initNodes:function(){
this.scrimNode=document.createElement("div");
var css="position: absolute; z-index: 200; width: 100%; height: 100%; top: 0; left: 0; display: none;";
css+="background-color: transparent;";
this.scrimNode.style.cssText=css;
document.body.appendChild(this.scrimNode);
},setCursor:function(_44a){
if(!this.avatarNode){
this.scrimNode.style.cursor=_44a;
return;
}
if(_44a=="no-drop"){
dojo.addClass(this.avatarNode,"invalidDropCSS");
}else{
dojo.removeClass(this.avatarNode,"invalidDropCSS");
}
this.scrimNode.style.cursor="default";
},mousedown:function(e){
this.inherited(arguments);
this.mouseIsDown=true;
this.dragging=false;
this.dx=0;
this.dy=0;
this.px=e.pageX;
this.py=e.pageY;
if(this.scrimEarly){
}
},mouseout:function(e){
if(this.mouseIsDown&&!this.dragging){
this.start(e);
}
},mousemove:function(e){
if(this.mouseIsDown){
this.dx=e.pageX-this.px;
this.dy=e.pageY-this.py;
if(this.dragging){
this.drag(e);
}else{
if(Math.sqrt(this.dx*this.dx+this.dy*this.dy)>this.hysteresis){
this.start(e);
}
}
}
},start:function(e){
this.dragging=true;
wm.showHideNode(this.scrimNode,true);
this.onstart(e);
},drag:function(e){
this.ondrag(e);
},mouseup:function(e){
this.inherited(arguments);
this.mouseIsDown=false;
this.finish();
if(this.dragging){
this.dragging=false;
this.drop();
}
},drop:function(){
this.ondrop();
},finish:function(){
wm.showHideNode(this.scrimNode,false);
},onstart:function(e){
},ondrag:function(e){
},ondrop:function(){
}});
dojo.declare("wm.MouseDrag",[wm.MouseCapture,wm.Drag],{});
dojo.declare("wm.DragDropper",wm.MouseDrag,{initNodes:function(){
this.inherited(arguments);
this.avatarNode=document.createElement("div");
dojo.addClass(this.avatarNode,"dragAvatarCSS");
this.avatarNode.style.cssText="display: none;";
this.avatarNode.innerHTML="(control)";
this.scrimNode.appendChild(this.avatarNode);
},showHideAvatar:function(_44b){
wm.showHideNode(this.avatarNode,_44b);
},setAvatarContent:function(_44c){
this.avatarNode.innerHTML=_44c;
},update:function(e){
this.pxp=this.px+this.dx;
this.pyp=this.py+this.dy;
dojo._setMarginBox(this.avatarNode,this.pxp+12,this.pyp+16);
},start:function(e){
this.inherited(arguments);
this.update();
wm.showHideNode(this.avatarNode,true);
},drag:function(){
this.inherited(arguments);
this.update();
},finish:function(){
wm.showHideNode(this.avatarNode,false);
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.Splitter"]){
dojo._hasResource["wm.base.widget.Splitter"]=true;
dojo.provide("wm.base.widget.Splitter");
dojo.declare("wm.SplitterResize",wm.MouseDrag,{beginResize:function(e,_44d){
this.splitter=_44d;
this.setCursor(this.splitter.vertical?"w-resize":"n-resize");
this.mousedown(e);
},drag:function(){
this.inherited(arguments);
this.splitter.drag(this.dx,this.dy);
},finish:function(){
this.inherited(arguments);
this.splitter.drop();
}});
dojo.declare("wm.Splitter",wm.Bevel,{className:"wmsplitter",minimum:-1,maximum:-1,mode:dojo.isMoz<4||dojo.isIE<9?2:0,layout:"",constructor:function(){
wm.Splitter.resizer=wm.Splitter.resizer||new wm.SplitterResize();
},init:function(){
this.inherited(arguments);
this.splitterWidget=this.parentIsSplitter?this.parent:this;
this.findLayout();
this.connectEvents(this.domNode,["mousedown","dblclick"]);
},findLayout:function(){
var v=this.splitterWidget.parent.layoutKind=="left-to-right";
var p=this.splitterWidget.parent.prevSibling(this.splitterWidget,true);
if(p){
var l=v?(p.width=="100%"?"right":"left"):(p.height=="100%"?"bottom":"top");
this.setLayout(l);
}
},updateSize:function(){
if(this._isDestroying){
return;
}
var _44e=this.parentIsSplitter?this.parent:this;
var h=(_44e.parent||0).layoutKind=="left-to-right",d=this.bevelSize+"px";
this.setWidth(h?d:"100%");
this.setHeight(h?"100%":d);
},setLayout:function(_44f){
this.layout=_44f;
this.removeOrientation();
this.vertical=this.layout=="left"||this.layout=="right";
this.addOrientation();
this.updateSize();
},getSizeControl:function(){
var _450=this.splitterWidget;
switch(this.layout){
case "left":
case "top":
this.percentSizeControl=_450.parent.nextSibling(_450,true);
return _450.parent.prevSibling(_450,true);
case "right":
case "bottom":
this.percentSizeControl=_450.parent.prevSibling(_450,true);
return _450.parent.nextSibling(_450,true);
}
},getPosition:function(){
return {top:this.splitterWidget.bounds.t,left:this.splitterWidget.bounds.l};
},mousedown:function(e){
this.sizeControl=this.getSizeControl();
if(!this.sizeControl){
return;
}
var _451=this.sizeControl.getIndexInParent()>this.getIndexInParent()?this.sizeControl.parent.c$[this.sizeControl.getIndexInParent()-2]:this.sizeControl.parent.c$[this.sizeControl.getIndexInParent()+2];
this.size=this.sizeControl.cloneBounds();
this.containerSize=this.sizeControl.parent.cloneBounds();
this.initialPosition=this.getPosition();
this.position=this.getPosition();
wm.Splitter.resizer.beginResize(e,this);
switch(this.layout){
case "top":
case "bottom":
this._boundsMax=this.sizeControl.parent.bounds.h-_451.getPreferredFitToContentHeight()+this.sizeControl.bounds.h;
this._boundsMin=this.sizeControl.getPreferredFitToContentHeight?this.sizeControl.getPreferredFitToContentHeight():this.sizeControl.getMinHeightProp();
break;
case "left":
case "right":
this._boundsMax=this.sizeControl.parent.bounds.w-_451.getPreferredFitToContentWidth()+this.sizeControl.bounds.w;
this._boundsMin=this.sizeControl.getPreferredFitToContentWidth?this.sizeControl.getPreferredFitToContentWidth():this.sizeControl.getMinWidthProp();
break;
}
},drag:function(inDx,inDy){
if(this.vertical){
this.moveX(inDx);
}else{
this.moveY(inDy);
}
this.changing();
},drop:function(){
this.change();
},changing:function(){
this._collapsed=false;
switch(this.mode){
case 0:
this.adjustSize();
break;
default:
break;
}
},change:function(){
this.adjustSize();
},boundValue:function(_452){
var _453=this.splitterWidget;
var x=_452;
if(this.minimum!=-1){
_452=Math.max(this.minimum,_452);
}
if(this.maximum!=-1){
_452=Math.min(this.maximum,_452);
}
var _454=_453.parent.getContentBounds();
if(_452<this._boundsMin){
_452=this._boundsMin;
}else{
if(_452>this._boundsMax){
_452=this._boundsMax;
}
}
this.atLimit=(x!=_452);
return _452;
},adjustSize:function(){
var dx=this.position.left-this.initialPosition.left;
var dy=this.position.top-this.initialPosition.top;
var w=this.size.w+(this.layout=="right"?-dx:dx);
var h=this.size.h+(this.layout=="bottom"?-dy:dy);
if(this.layout=="top"||this.layout=="bottom"){
this.sizeControl.setHeight(h+"px");
}else{
this.sizeControl.setWidth(w+"px");
}
},move:function(inD,_455,_456){
if(inD==0){
return;
}
this.position[_455]=this.initialPosition[_455]+inD;
if(this.layout==_455){
this.position[_455]=this.boundValue(this.position[_455]);
}else{
var e=this.containerSize[_456];
this.position[_455]=e-this.boundValue(e-this.position[_455]);
}
this.splitterWidget.domNode.style[_455]=this.position[_455]+"px";
},moveX:function(inDx){
this.move(inDx,"left","w");
},moveY:function(inDy){
this.move(inDy,"top","h");
},dblclick:function(){
if(this._collapsed){
this.expand();
}else{
this.collapse();
}
},collapse:function(){
this._collapsed=true;
this.initialPosition=this.getPosition();
this._expandedPosition=dojo.mixin({},this.initialPosition);
switch(this.layout){
case "left":
this.position.left=0;
break;
case "top":
this.position.top=0;
break;
case "right":
this.position.left=this.boundValue(this.position.left+this.size.w);
break;
case "bottom":
this.position.top=this.boundValue(this.position.top+this.size.h);
break;
}
this.change();
},expand:function(){
this._collapsed=false;
this.initialPosition=this.getPosition();
dojo.mixin(this.position,this._expandedPosition);
this.change();
}});
}
if(!dojo._hasResource["wm.base.widget.Html"]){
dojo._hasResource["wm.base.widget.Html"]=true;
dojo.provide("wm.base.widget.Html");
dojo.declare("wm.Html",wm.Control,{minHeight:15,width:"100%",height:"200px",html:"",htmlIsResource:false,autoScroll:true,allowScriptTags:false,init:function(){
dojo.addClass(this.domNode,"wmhtml");
this.inherited(arguments);
this.connect(this.domNode,"onclick",this,function(evt){
wm.onidle(this,"onclick",evt);
});
if(this.html&&String(this.html).indexOf("resources/")===0){
this.htmlIsResource=true;
}
this.setHtml(this.html);
},build:function(){
this.inherited(arguments);
this.sizeNode=document.createElement("div");
dojo.addClass(this.sizeNode,"wmSizeNode");
this.domNode.appendChild(this.sizeNode);
},getHtml:function(){
return this.sizeNode.innerHTML;
},setHtml:function(_457){
var _458=this.sizeNode.innerHTML;
if(_457&&this.htmlIsResource){
if(!this.htmlLoader){
this.htmlLoader=new wm.HtmlLoader({owner:this,relativeUrl:true});
}
this.htmlLoader._htmlNode=this.sizeNode;
this.htmlLoader.setUrl(_457);
this.html=_457;
this.valueChanged("html",_457);
if(_458!=this.sizeNode.innerHTML&&(this.autoSizeHeight||this.autoSizeWidth)){
this.scheduleAutoSize();
}
return;
}
if(_457&&dojo.isArray(_457)){
_457=_457.join("");
}
if(_457&&_457.value){
_457=_457.value;
}
this.html=this.sizeNode.innerHTML=(_457==undefined?"":_457);
this.valueChanged("html",this.inHtml);
if(_458!=this.sizeNode.innerHTML&&(this.autoSizeHeight||this.autoSizeWidth)){
this.scheduleAutoSize();
}
if(this.allowScriptTags){
this.processScriptTags();
}
},processScriptTags:function(){
var _459=dojo.query("script",main.html1.domNode);
var _45a=document.createElement("div");
dojo.forEach(_459,function(node){
var _45b=node.parentNode;
var _45c=dojo.indexOf(_45b.childNodes,node);
_45a.appendChild(node);
var _45d=_45a.innerHTML;
var n=document.createElement("script");
var _45e={};
var _45f=_45d.replace(/\<script\s*/,"").replace(/\>.*/,"").split(/\s+/);
var _460="";
var _461="";
for(var i=0;i<_45f.length;i++){
var part=_45f[i];
if(!_461){
var _462=part.match(/^(.*?)\s*\=\s*(.*)\s*$/);
if(_462){
var name=_462[1];
var _463=_462[2];
}
}else{
_463=_461+" "+part;
_461="";
}
if(_463){
_463=_463.replace(/^"(.*)"/,"$1");
_463=_463.replace(/^'(.*)'/,"$1");
if(_463.match(/^['"]/)){
_461=_463;
_460=name;
}else{
dojo.attr(n,name,_463);
}
}
}
try{
n.innerText=node.innerText;
}
catch(e){
}
try{
n.textContent=node.textContent;
}
catch(e){
}
dojo.destroy(node);
dojo.place(n,_45b,_45c);
},this);
},scheduleAutoSize:function(){
this._needsAutoSize=true;
return wm.job(this.getRuntimeId()+": doAutoSize",10,dojo.hitch(this,function(){
this.doAutoSize(true,true);
}));
},_onShowParent:function(){
if(this._needsAutoSize){
this.scheduleAutoSize();
}
},doAutoSize:function(_464,_465){
if(this._doingAutoSize||!this.autoSizeHeight&&!this.autoSizeWidth){
return;
}
if(!_465&&!this._needsAutoSize){
return;
}
if(this.isAncestorHidden()){
return;
}
this._doingAutoSize=true;
this._needsAutoSize=false;
var _466=this.sizeNode;
var _467=_466.offsetHeight;
var _468=_466.offsetWidth;
if(this.autoSizeHeight){
var _469=_467+this.padBorderMargin.t+this.padBorderMargin.b;
if(_469<this.minHeight){
_469=this.minHeight;
}
if(_468>this.bounds.w){
_469+=17;
}
this.bounds.h=_469;
this.height=_469+"px";
var p=this.parent;
while(p.parent&&(p.autoSizeHeight||p.fitToContentHeight)){
p=p.parent;
}
p.delayedReflow();
}
if(this.autoSizeWidth){
var _46a=_468+this.padBorderMargin.l+this.padBorderMargin.r;
if(_467>this.bounds.h){
_46a+=17;
}
this.bounds.w=_46a;
this.width=_46a+"px";
var p=this.parent;
while(p.parent&&(p.autoSizeWidth||p.fitToContentWidth)){
p=p.parent;
}
p.delayedReflow();
}
if(this.isDesignLoaded()&&dojo.indexOf(studio.designer.selected,this)!=-1){
studio.inspector.reinspect();
}
this._doingAutoSize=false;
},appendHtml:function(_46b){
if(_46b&&dojo.isArray(_46b)){
_46b=_46b.join("");
}
if(_46b&&_46b.value){
_46b=_46b.value;
}
this.sizeNode.innerHTML+=(_46b==undefined?"":_46b);
this.html=this.sizeNode.innerHTML;
this.valueChanged("html",this.inHtml);
},onclick:function(){
},addUserClass:function(_46c,_46d){
this.inherited(arguments);
if(this.isDesignLoaded()){
if(this.autoSizeHeight||this.autoSizeWidth){
this.doAutoSize(1,1);
}
}
},getAutoSize:function(){
if(this.autoSizeWidth){
return "width";
}
if(this.autoSizeHeight){
return "height";
}
return "none";
},setAutoSize:function(_46e){
if(_46e=="none"){
if(this.autoSizeWidth){
this.setAutoSizeWidth(false);
}
if(this.autoSizeHeight){
this.setAutoSizeHeight(false);
}
}else{
if(_46e=="width"){
if(!this.autoSizeWidth){
this.setAutoSizeWidth(true);
}
if(this.autoSizeHeight){
this.setAutoSizeHeight(false);
}
}else{
if(_46e=="height"){
if(this.autoSizeWidth){
this.setAutoSizeWidth(false);
}
if(!this.autoSizeHeight){
this.setAutoSizeHeight(true);
}
}
}
}
},toHtml:function(){
return this.html;
}});
}
if(!dojo._hasResource["dojo.dnd.Mover"]){
dojo._hasResource["dojo.dnd.Mover"]=true;
dojo.provide("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Mover",null,{constructor:function(node,e,host){
this.node=dojo.byId(node);
var pos=e.touches?e.touches[0]:e;
this.marginBox={l:pos.pageX,t:pos.pageY};
this.mouseButton=e.button;
var h=(this.host=host),d=node.ownerDocument;
this.events=[dojo.connect(d,"onmousemove",this,"onFirstMove"),dojo.connect(d,"ontouchmove",this,"onFirstMove"),dojo.connect(d,"onmousemove",this,"onMouseMove"),dojo.connect(d,"ontouchmove",this,"onMouseMove"),dojo.connect(d,"onmouseup",this,"onMouseUp"),dojo.connect(d,"ontouchend",this,"onMouseUp"),dojo.connect(d,"ondragstart",dojo.stopEvent),dojo.connect(d.body,"onselectstart",dojo.stopEvent)];
if(h&&h.onMoveStart){
h.onMoveStart(this);
}
},onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox,pos=e.touches?e.touches[0]:e;
this.host.onMove(this,{l:m.l+pos.pageX,t:m.t+pos.pageY},e);
dojo.stopEvent(e);
},onMouseUp:function(e){
if(dojo.isWebKit&&dojo.isMac&&this.mouseButton==2?e.button==0:this.mouseButton==e.button){
this.destroy();
}
dojo.stopEvent(e);
},onFirstMove:function(e){
var s=this.node.style,l,t,h=this.host;
switch(s.position){
case "relative":
case "absolute":
l=Math.round(parseFloat(s.left))||0;
t=Math.round(parseFloat(s.top))||0;
break;
default:
s.position="absolute";
var m=dojo.marginBox(this.node);
var b=dojo.doc.body;
var bs=dojo.getComputedStyle(b);
var bm=dojo._getMarginBox(b,bs);
var bc=dojo._getContentBox(b,bs);
l=m.l-(bc.l-bm.l);
t=m.t-(bc.t-bm.t);
break;
}
this.marginBox.l=l-this.marginBox.l;
this.marginBox.t=t-this.marginBox.t;
if(h&&h.onFirstMove){
h.onFirstMove(this,e);
}
dojo.disconnect(this.events.shift());
dojo.disconnect(this.events.shift());
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
var h=this.host;
if(h&&h.onMoveStop){
h.onMoveStop(this);
}
this.events=this.node=this.host=null;
}});
}
if(!dojo._hasResource["dojo.dnd.Moveable"]){
dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(node,_46f){
this.node=dojo.byId(node);
if(!_46f){
_46f={};
}
this.handle=_46f.handle?dojo.byId(_46f.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_46f.delay>0?_46f.delay:0;
this.skip=_46f.skip;
this.mover=_46f.mover?_46f.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ontouchstart",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_470,node){
return new dojo.dnd.Moveable(node,_470);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"),dojo.connect(this.handle,"ontouchmove",this,"onMouseMove"),dojo.connect(this.handle,"onmouseup",this,"onMouseUp"),dojo.connect(this.handle,"ontouchend",this,"onMouseUp"));
var pos=e.touches?e.touches[0]:e;
this._lastX=pos.pageX;
this._lastY=pos.pageY;
}else{
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseMove:function(e){
var pos=e.touches?e.touches[0]:e;
if(Math.abs(pos.pageX-this._lastX)>this.delay||Math.abs(pos.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
dojo.disconnect(this.events.pop());
}
dojo.stopEvent(e);
},onSelectStart:function(e){
if(!this.skip||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_471){
dojo.publish("/dnd/move/start",[_471]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_472){
dojo.publish("/dnd/move/stop",[_472]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_473,e){
},onMove:function(_474,_475,e){
this.onMoving(_474,_475);
var s=_474.node.style;
s.left=_475.l+"px";
s.top=_475.t+"px";
this.onMoved(_474,_475);
},onMoving:function(_476,_477){
},onMoved:function(_478,_479){
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.Dialog"]){
dojo._hasResource["wm.base.widget.Dialogs.Dialog"]=true;
dojo.provide("wm.base.widget.Dialogs.Dialog");
wm.dialog={showingList:[],tabIndexChanges:{}};
wm.dialog.getNextZIndex=function(_47a,_47b){
var _47c=30;
if(!wm.dialog.showingList.length){
return _47c;
}
for(var i=0;i<wm.dialog.showingList.length;i++){
if(!_47a||_47a&&wm.dialog.showingList[i]._isDesignLoaded){
if(wm.dialog.showingList[i] instanceof wm.Toast==false&&!wm.dialog.showingList[i].docked){
if(!_47b||wm.dialog.showingList[i]!=this){
_47c=Math.max(_47c,wm.dialog.showingList[i].domNode.style.zIndex);
}
}
}
}
return _47c+5;
};
wm.dismiss=function(_47d,_47e){
var o=_47d;
while(o&&!dojo.isFunction(o.dismiss)){
o=o.owner;
}
wm.fire(o,"dismiss",[_47e]);
};
wm.bgIframe={create:function(){
var html=["<iframe src='javascript:\"\"'"," style='position: absolute; left: 0px; top: 0px;"," z-index: 2; filter:Alpha(Opacity=\"0\");'>"].join(""),f=this.domNode=(dojo.isIE&&dojo.isIE<9)?document.createElement(html):document.createElement("IFRAME");
app.appRoot.domNode.appendChild(f);
f.style.display="none";
if(dojo.isMoz){
f.style.position="absolute";
f.style.left=f.style.top="0px";
f.style.opacity=0;
f.style.zIndex=2;
}
dojo.subscribe("window-resize",this,"size");
},setShowing:function(_47f,_480){
if(!this.domNode){
return;
}
if(_480||_47f!=this.showing){
this.domNode.style.display=_47f?"":"none";
this.showing=_47f;
}
if(_47f){
this.size();
}
},size:function(_481){
if(!this.domNode||!this.showing){
return;
}
if(_481){
this.sizeNode=_481;
}
var _482=this.sizeNode||document.body;
dojo.marginBox(this.domNode,dojo.contentBox(_482));
}};
dojo.addOnLoad(function(){
if((dojo.isIE&&dojo.isIE<7)||(dojo.isFF&&dojo.isFF<4&&navigator.userAgent.indexOf("Macintosh")!=-1)){
wm.bgIframe.create();
}
});
dojo.declare("wm.DialogResize",wm.MouseDrag,{beginResize:function(e,_483){
this.dialog=_483;
this.mousedown(e);
},drag:function(){
this.inherited(arguments);
this.dialog.drag(this.dx,this.dy);
},finish:function(){
this.inherited(arguments);
this.dialog.drop();
}});
dojo.declare("wm.Dialog",wm.Container,{manageHistory:true,manageURL:false,enableTouchHeight:true,titlebarButtons:"",containerClass:"MainContent",corner:"cc",scrim:true,useContainerWidget:false,useButtonBar:false,_minified:false,_maxified:false,noEscape:false,noMinify:false,noMaxify:false,layoutKind:"top-to-bottom",horizontalAlign:"left",verticalAlign:"top",border:2,borderColor:"rgb(80,80,80)",titlebarBorder:"1",titlebarBorderColor:"black",titlebarHeight:"23",mobileTitlebarHeight:"35",titleBarButtonsOnRight:false,footerBorder:"1,0,0,0",containerPadding:"5",margin:"3",width:"640px",height:"400px",showing:false,dialogScrim:null,modal:true,showTitleButtonsWhenDocked:false,noLeftRightDocking:true,noTopBottomDocking:true,constructor:function(){
wm.Dialog.resizer=wm.Dialog.resizer||new wm.DialogResize();
},init:function(){
if(wm.isMobile){
this.titlebarHeight=this.mobileTitlebarHeight;
}
this.inherited(arguments);
if(this._isDesignLoaded){
this.flags.noModelDrop=true;
}
if(!this.docked){
if(this._isDesignLoaded){
studio.designer.domNode.appendChild(this.domNode);
}else{
app.appRoot.domNode.appendChild(this.domNode);
}
}
this.dialogScrim=new wm.Scrim({owner:this,_classes:{domNode:["wmdialog-scrim"]},waitCursor:false});
this.createTitle();
if(!this._isDesignLoaded){
this.connectEvents(this.domNode,["mousedown"]);
}
},postInit:function(){
this.inherited(arguments);
this._animEnabled=true;
if(dojo.isIE<=9||wm.isAndroid<=3||this._noAnimation){
this._animEnabled=false;
}
if(this._animEnabled){
var _484;
if(dojo.isWebKit){
_484="webkitAnimationEnd";
}else{
if(dojo.isIE){
_484="MSAnimationEnd";
}else{
if(dojo.isOpera){
_484="oanimationend";
}else{
_484="animationend";
}
}
}
this.domNode.addEventListener(_484,dojo.hitch(this,"animEnd"),false);
}
dojo.addClass(this.domNode,"wmdialog");
this.domNode.style.position="absolute";
if(!this.docked){
this.domNode.style.zIndex=wm.dialog.getNextZIndex(this._isDesignLoaded);
}
if(this.designWrapper){
this.designWrapper.domNode.style.zIndex=this.domNode.style.zIndex+1;
}
if(!this.docked){
this.domNode.style.display="none";
}
this._connections.push(this.connect(document,"keydown",this,"keydown"));
this._subscriptions.push(dojo.subscribe("window-resize",this,"windowResize"));
this.setModal(this.modal);
this.setTitlebarBorder(this.titlebarBorder);
this.setTitlebarBorderColor(this.titlebarBorderColor);
var _485,_486;
var _487=(this.declaredClass=="wm.Dialog"||this._pageOwnsWidgets)?this.owner:this;
if(this.containerWidgetId!==undefined){
if(this.containerWidgetId){
_485=this.owner.getValueById(this.containerWidgetId);
if(!_485){
return;
}
_486=_485.domNode;
}
}else{
if(this.c$.length==1){
if(this.useContainerWidget){
_485=this.containerWidget||new wm.Container({_classes:{domNode:["wmdialogcontainer",this.containerClass]},name:_487.getUniqueName("containerWidget"),parent:this,owner:_487,layoutKind:"top-to-bottom",padding:this.containerPadding,fitToContentHeight:this.fitToContentHeight,margin:"0",border:"0",width:"100%",height:"100%",horizontalAlign:"left",verticalAlign:"top",autoScroll:true});
_486=_485.domNode;
}else{
_486=this.domNode;
}
}else{
_485=this.c$[1];
}
}
if(this.buttonBarId!==undefined){
if(this.buttonBarId){
this.buttonBar=this.owner.getValueById(this.buttonBarId);
}
}else{
if(this.c$.length<3){
if(this.useButtonBar&&this.useContainerWidget){
this.createButtonBar();
}
}else{
this.buttonBar=this.c$[2];
}
}
if(_485){
this.containerWidget=_485;
}
this.containerNode=_486;
if(this.docked){
this.show();
}
},setUseButtonBar:function(_488){
this.useButtonBar=_488;
if(_488&&!this.buttonBar){
this.createButtonBar();
this.reflow();
}else{
if(!_488&&this.buttonBar){
this.buttonBar.destroy();
delete this.buttonBar;
this.reflow();
}
}
},createButtonBar:function(){
var _489=(this.declaredClass=="wm.Dialog"||this instanceof wm.DesignableDialog)?this.owner:this;
this.buttonBar=new wm.ButtonBarPanel({name:"buttonBar",owner:_489,parent:this,border:this.footerBorder,borderColor:this.titlebarBorderColor});
this.reflow();
},setTitlebarBorder:function(_48a){
this.titlebarBorder=_48a;
var _48b=(String(_48a).match(","))?_48a:"0,0,"+_48a+",0";
this.titleBar.setBorder(_48b);
this.titleBar.setHeight((parseInt(this.titlebarHeight)+this.titleBar.padBorderMargin.t+this.titleBar.padBorderMargin.b)+"px");
},setTitlebarBorderColor:function(_48c){
this.titlebarBorderColor=_48c;
this.titleBar.setBorderColor(_48c);
},setFooterBorder:function(_48d){
this.footerBorder=_48d;
if(this.buttonBar){
this.buttonBar.setBorder(_48d);
}
},setFooterBorderColor:function(_48e){
this.footerBorderColor=_48e;
if(this.buttonBar){
this.buttonBar.setBorderColor(_48e);
}
},setModal:function(_48f){
dojo[_48f?"removeClass":"addClass"](this.domNode,"nonmodaldialog");
this.modal=(_48f===undefined||_48f===null)?true:_48f;
if(this.dojoMoveable){
this.dojoMoveable.destroy();
this.dojoMoveable=null;
}
if(!_48f&&!this.dojoMoveable){
this.dojoMoveable=new dojo.dnd.Moveable(this.domNode,{handle:this.titleLabel.domNode});
this.connect(this.dojoMoveable,"onMouseDown",this,function(){
if(!this.modal){
if(this.docked){
this._userSized=true;
this.setDocked(false);
}
var _490=wm.dialog.getNextZIndex(this._isDesignLoaded,this);
this.domNode.style.zIndex=_490;
}
});
this.connect(this.dojoMoveable,"onMoveStop",this,function(){
if(this._openingTitleBarMenu){
return;
}
this._userSized=true;
this.bounds.l=parseInt(this.domNode.style.left);
this.bounds.t=parseInt(this.domNode.style.top);
if(!this._maxified){
if(!this.insureDialogVisible(true)){
if(this.bounds.t<0&&!this.noTopBottomDocking||this.bounds.t+this.bounds.h>app.appRoot.bounds.b&&!this.noTopBottomDocking||this.bounds.l<0&&!this.noLeftRightDocking||this.bounds.w+this.bounds.l>app.appRoot.bounds.r&&!this.noLeftRightDocking){
this.setDocked(true);
}
}
}
this.setBounds(this.bounds);
if(!this.docked){
var _491=false;
if(this.bounds.l>app.appRoot.bounds.r){
this.bounds.l=app.appRoot.bounds.r-100;
_491=true;
}
if(this.bounds.r<0){
this.bounds.l=-this.bounds.w+100;
_491=true;
}
if(this.bounds.t>app.appRoot.bounds.b){
this.bounds.t=app.appRoot.bounds.b-100;
_491=true;
}
if(this.bounds.t<0){
this.bounds.t=0;
_491=true;
}
if(_491){
this.setBounds(this.bounds);
wm.Control.prototype.renderBounds.call(this);
}
}
});
}
if(this.showing&&!this._isDesignLoaded){
this.dialogScrim.setShowing(this.modal);
wm.bgIframe.setShowing(!this.modal&&!this.isDesignedComponent());
}
this.titleButtonPanel.setShowing(!this.modal&&(!this.docked||this.showTitleButtonsWhenDocked));
},setNoEscape:function(_492){
this.noEscape=_492;
this.titleClose.setShowing(!this.modal&&!this.noEscape&&!wm.isMobile);
},setDocked:function(_493,_494,_495){
if(this._isDesignLoaded){
return;
}
var _496=this.docked;
if(Boolean(_496)==Boolean(_493)){
return;
}
this.docked=_493;
if(_493){
this._dock(_494,_495);
dojo.addClass(this.domNode,"Docked");
}else{
this._undock();
dojo.removeClass(this.domNode,"Docked");
}
},_dock:function(_497,edge){
var _498=this.border;
var _499=this.margin;
if(!edge){
if(this.bounds.t<0&&!this.noTopBottomDocking){
edge="t";
}else{
if(this.bounds.t+this.bounds.h>app.appRoot.bounds.b&&!this.noTopBottomDocking){
edge="b";
}else{
if(this.bounds.l<0&&!this.noLeftRightDocking){
edge="l";
}else{
if(!this.noLeftRightDocking){
edge="r";
}
}
}
}
}
if(!this.showTitleButtonsWhenDocked){
this.titleButtonPanel.hide();
}
this._dockData=dojo.clone(this.bounds);
this._dockData.edge=edge;
this._dockData.border=_498;
this._dockData.margin=_499;
this.setBorder("0");
this.setMargin("0");
if(!_497){
if(edge=="t"&&app.dockTop&&!app.dockTop.parent.isAncestorHidden()){
_497=app.dockTop;
}else{
if(edge=="b"&&app.dockBottom&&!app.dockBottom.parent.isAncestorHidden()){
_497=app.dockBottom;
}else{
if(edge=="l"&&app.dockLeft&&!app.dockLeft.parent.isAncestorHidden()){
_497=app.dockLeft;
}else{
if(edge=="r"&&app.dockRight&&!app.dockRight.parent.isAncestorHidden()){
_497=app.dockRight;
}else{
_497=app.appRoot;
}
}
}
}
}
if(!_497.showing){
_497.setShowing(true);
}
if(_497==app.appRoot){
app.dockDialog(this,edge);
}else{
this.setParent(_497);
this.setWidth("100%");
this.setHeight("100%");
_497.show();
_497.reflow();
}
this.onDock();
},onDock:function(){
},_undock:function(){
this.docked=false;
if(!wm.isMobile){
this.titleButtonPanel.show();
}
if(!this._dockData){
this._dockData=dojo.clone(this.bounds);
}
if(this._dockData.edge=="t"||this._dockData.edge=="b"){
this._dockData.t=Math.floor(dojo.coords(this.domNode).y);
}else{
this._dockData.l=Math.floor(dojo.coords(this.domNode).x);
}
this._cupdating=true;
if(this._dockData.border!==undefined){
this.setBorder(this._dockData.border);
}else{
this.setBorder(wm.Dialog.prototype.border);
}
if(this._dockData.margin!==undefined){
this.setMargin(this._dockData.margin);
}else{
this.setMargin(wm.Dialog.prototype.margin);
}
this.setWidth(((this._dockData.w||this.bounds.w)-20)+"px");
this.setHeight(((this._dockData.h||this.bounds.h)-20)+"px");
this.setBounds({t:this._dockData.t||this.bounds.t,l:this._dockData.l||this.bounds.l});
this._cupdating=false;
delete this._dockData;
var _49a=this.parent;
app.removeDockedDialog(this);
if(this._isDesignLoaded){
studio.designer.domNode.appendChild(this.domNode);
}else{
app.appRoot.domNode.appendChild(this.domNode);
}
this.render();
this.flow();
if(_49a.dockRight||_49a.dockLeft||_49a.dockTop||_49a.dockBottom){
if(_49a.c$.length==0){
_49a.hide();
}else{
_49a.reflow();
}
}else{
app.reflow();
}
this.onUndock();
},onUndock:function(){
},minify:function(){
this._minified=true;
this.setShowing(false);
if(!app.wmMinifiedDialogPanel){
app.createMinifiedDialogPanel();
}
this.minifiedLabel=app.createMinifiedDialogLabel(this.title);
this.minifiedLabel.connect(this.minifiedLabel,"onclick",this,function(){
app.removeMinifiedDialogLabel(this.minifiedLabel);
delete this.minifiedLabel;
app.wmMinifiedDialogPanel.reflow();
this._minified=false;
this.setShowing(true);
});
app.wmMinifiedDialogPanel.reflow();
},unminify:function(_49b,_49c){
if(!this._minified){
return;
}
app.removeMinifiedDialogLabel(this.minifiedLabel);
delete this.minifiedLabel;
app.wmMinifiedDialogPanel.reflow();
this._minified=false;
if(!_49c){
this.show();
}
},maxify:function(){
if(this.docked){
this._undock();
}
if(this._maxified){
this._maxified=false;
dojo.removeClass(this.domNode,"wmDialogMaxify");
this.bounds.h=parseInt(this.height);
this.bounds.w=parseInt(this.width);
}else{
this._maxified=true;
dojo.addClass(this.domNode,"wmDialogMaxify");
}
this.renderBounds();
this.reflow();
},windowResize:function(){
this.reflow();
this.delayedRenderBounds();
},reflowParent:function(){
if(this.docked&&this.parent){
this.parent.reflow();
}else{
this.renderBounds();
this.reflow();
}
},dismiss:function(e){
this.setShowing(false,false,true);
var why=""||dojo.isString(e)?e:e&&e.target&&e.target.innerHTML;
this.onClose(why);
why=null;
},destroy:function(){
this._destroying=true;
if(this._minified){
app.removeMinifiedDialogLabel(this.minifiedLabel);
delete this.minifiedLabel;
}
if(this.showing){
this.dismiss();
}
if(this.dialogScrim){
this.dialogScrim.destroy();
}
if(this.minifiedLabel){
this.minfiedLabel.destroy();
}
this.inherited(arguments);
},flow:function(){
if(this.showing){
this.renderBounds();
this.inherited(arguments);
if(dojo.isChrome&&this.buttonBar&&!this._chromeButtonBarHack){
this._chromeButtonBarHack=true;
this.buttonBar.bounds.h++;
this.buttonBar.renderBounds();
}
this.dialogScrim.reflowParent();
}
},getPreferredFitToContentHeight:function(){
var _49d=this.inherited(arguments);
var min=this.minHeight;
return Math.max(min,_49d);
},getPreferredFitToContentWidth:function(){
var _49e=this.inherited(arguments);
var min=this.minWidth;
return Math.max(min,_49e);
},setFitToContentWidth:function(_49f){
this.inherited(arguments);
this.reflow();
},setFitToContentHeight:function(_4a0){
this.inherited(arguments);
this.reflow();
},delayedRenderBounds:function(){
wm.job(this.getRuntimeId()+".renderBounds",5,dojo.hitch(this,function(){
var _4a1=dojo.clone(this.bounds);
this.renderBounds();
if(_4a1.w!=this.bounds.w||_4a1.h!=this.bounds.h){
this.reflow();
}
}));
},renderBounds:function(){
if(this.docked){
return this.inherited(arguments);
}
if(this.showing){
if(this.fitToContentHeight&&!this._userSized){
this.bounds.h=this.getPreferredFitToContentHeight();
this.height=this.bounds.h+"px";
}
if(this.fitToContentWidth&&!this._userSized){
this.bounds.w=this.getPreferredFitToContentWidth();
this.width=this.bounds.w+"px";
}
if(this._minified){
var _4a2=app.appRoot.bounds;
var t=_4a2.h-30;
var l=_4a2.w-200;
this.setBounds(l,t,200,30);
}else{
if(this._maxified){
var _4a2=app.appRoot.bounds;
this.setBounds(20,20,_4a2.w-40,_4a2.h-40);
}else{
if(this._userSized){
this.insureDialogVisible();
}else{
if(!this.fixPositionNode&&this.positionNear){
var _4a3=this.owner.getValueById(this.positionNear);
if(_4a3){
this.fixPositionNode=_4a3.domNode;
}
}
if(this.fixPositionNode){
this.renderBoundsByPositionNode();
}else{
if(!this._fixPosition){
this.renderBoundsByCorner();
}else{
this.insureDialogVisible();
}
}
wm.bgIframe.size();
}
}
}
return this.inherited(arguments);
}
},setCorner:function(_4a4){
this.corner=_4a4.replace(/top/,"t").replace(/bottom/,"b").replace(/left/,"l").replace(/right/,"r").replace(/center/,"c").replace(/ /,"");
if(this.positionNear){
this.renderBoundsByPositionNode();
}else{
this.renderBoundsByCorner();
}
},insureDialogVisible:function(_4a5){
if(!this.showing){
return;
}
var w=this.bounds.w;
var h=this.bounds.h;
var _4a6=this._isDesignLoaded;
var W=(_4a6)?studio.designer.bounds.w:(app._page)?app._page.root.bounds.w:window.clientWidth;
var H=(_4a6)?studio.designer.bounds.h:(app._page)?app._page.root.bounds.h:window.clientHeight;
if(this.bounds.t+this.bounds.h>H){
if(_4a5){
return false;
}else{
this.bounds.t=H-this.bounds.h;
}
}
if(this.bounds.l+this.bounds.w>W){
if(_4a5){
return false;
}else{
this.bounds.l=W-this.bounds.w;
}
}
if(this.bounds.t<0){
if(_4a5){
return false;
}else{
this.bounds.t=0;
}
}
if(this.bounds.l<0){
if(_4a5){
return false;
}else{
this.bounds.l=0;
}
}
if(!_4a5){
wm.Control.prototype.renderBounds.call(this);
}
return true;
},renderBoundsByPositionNode:function(){
if(!this.fixPositionNode){
return;
}
var o=dojo._abs(this.fixPositionNode);
if(this._isDesignLoaded){
var _4a7=dojo._abs(studio.designer.domNode);
o.x-=_4a7.x;
o.y-=_4a7.y;
}
var _4a8=this.corner||"bc";
var top=_4a8.substring(0,1);
var left=_4a8.substring(1,2);
switch(left){
case "l":
this.bounds.l=o.x-this.bounds.w;
break;
case "r":
this.bounds.l=o.x+o.w;
break;
case "c":
this.bounds.l=o.x+(o.w-this.bounds.w)/2;
}
switch(top){
case "t":
this.bounds.t=o.y-this.bounds.h;
break;
case "b":
this.bounds.t=o.y+o.h;
break;
case "c":
this.bounds.t=o.y+(o.h-this.bounds.h)/2;
}
this.insureDialogVisible();
this.setBounds(this.bounds);
},renderBoundsByCorner:function(){
if(!this.showing){
return;
}
var w=this.width;
var h=this.height;
var _4a9=this._isDesignLoaded;
var W=(_4a9)?studio.designer.bounds.w:this.domNode.parentNode.clientWidth;
var H=(_4a9)?studio.designer.bounds.h:this.domNode.parentNode.clientHeight;
if(String(w).match(/\%/)){
w=W*parseInt(w)/100;
}else{
w=parseInt(w);
}
if(String(h).match(/\%/)){
h=H*parseInt(h)/100;
}else{
h=parseInt(h);
}
var _4aa=10;
if(w>W-_4aa*2){
w=W-_4aa*2;
}
if(h>H-_4aa*2){
h=H-_4aa*2;
}
var t,l;
var top=this.corner.substring(0,1);
var left=this.corner.substring(1,2);
var _4ab=[];
var _4ac=this.getOwnerApp();
if(!this._percEx.h&&!this._percEx.w){
for(var i=0;i<wm.dialog.showingList.length;i++){
if(wm.dialog.showingList[i]!=this&&wm.dialog.showingList[i].getOwnerApp()==_4ac&&(!window["studio"]||this!=window["studio"].dialog)){
_4ab.push(wm.dialog.showingList[i]);
}
}
h=parseInt(h);
var last=wm.Array.last(_4ab);
}
switch(left){
case "l":
l=_4aa;
break;
case "r":
l=W-w-_4aa;
break;
case "c":
l=Math.floor((W-w)/2);
if(last&&last.corner==this.corner){
l+=25;
}
break;
}
switch(top){
case "t":
t=_4aa;
break;
case "b":
t=H-h-_4aa;
break;
case "c":
t=Math.floor((H-h)/2);
if(last&&last.corner==this.corner){
t+=25;
}
break;
}
this.setBounds(l,t,w,h);
wm.Control.prototype.renderBounds.call(this);
},setContent:function(_4ad){
this.containerNode.innerHTML=_4ad;
},animEnd:function(){
if(this.showing){
}else{
if(this.docked){
this.setDocked(false);
}
this.domNode.style.display="none";
}
},setShowing:function(_4ae,_4af,_4b0){
if(app.debugDialog){
var _4b1=["_setValue","setProp","setValue"];
}
wm.Array.removeElement(wm.dialog.showingList,this);
if(!this.docked&&_4ae&&(!window["studio"]||this!=window["studio"].dialog)){
var _4b2=wm.dialog.getNextZIndex(this._isDesignLoaded);
wm.dialog.showingList.push(this);
this.domNode.style.zIndex=_4b2;
if(this.modal){
this.dialogScrim.domNode.style.zIndex=_4b2-1;
}
}
if(_4ae&&this._minified){
this.unminify(null,true);
delete this.showing;
}
wm.bgIframe.setShowing(_4ae&&this.modal&&!this.isDesignedComponent());
if(_4ae!=this.showing&&this.modal&&!this._isDesignLoaded){
this.dialogScrim.setShowing(_4ae);
}
var _4b3=this.showing;
var _4b4=Boolean(this.showing)!=Boolean(_4ae);
if(_4b4&&this._animEnabled){
dojo.removeClass(this.domNode,["fadeInAnim","fadeOutAnim"]);
}
if(_4ae&&_4b4){
if(this._animEnabled){
this.domNode.opacity=0.01;
}
this.inherited(arguments);
if(this._animEnabled){
dojo.addClass(this.domNode,"fadeInAnim");
}else{
this.animEnd();
}
if(this.modal&&!this._noAutoFocus){
this.domNode.tabIndex=-1;
this.domNode.focus();
}
if(app.debugDialog&&this!=app.debugDialog){
var i=0;
var _4b5=arguments.callee.caller;
_4b1.push("show");
while(_4b5&&dojo.indexOf(_4b1,_4b5.nom)!=-1&&i<15){
_4b5=_4b5.caller;
i++;
}
var _4b6=app.debugDialog.newLogEvent({eventType:"dialog",sourceDescription:(_4b5&&_4b5.nom?_4b5.nom+"()":""),resultDescription:"Showing dialog: "+this.getRuntimeId()+".setShowing(true)",firingId:this.getRuntimeId(),affectedId:this.getRuntimeId(),method:"show"});
}
this.callOnShowParent();
this.onShow();
if(_4b6){
app.debugDialog.endLogEvent(_4b6);
}
}else{
if(!_4ae&&_4b4){
this.callOnHideParent();
this.showing=Boolean(_4ae);
if(this._animEnabled){
dojo.addClass(this.domNode,"fadeOutAnim");
}else{
this.animEnd();
}
this.showing=false;
if(app.debugDialog&&this!=app.debugDialog){
var i=0;
var _4b5=arguments.callee.caller;
_4b1.push("hide");
while(_4b5&&dojo.indexOf(_4b1,_4b5.nom)!=-1&&i<15){
_4b5=_4b5.caller;
i++;
}
var _4b6=app.debugDialog.newLogEvent({eventType:"dialog",sourceDescription:(_4b5&&_4b5.nom?_4b5.nom+"()":""),resultDescription:"Hiding dialog: "+this.getRuntimeId()+".setShowing(false)",firingId:this.getRuntimeId(),affectedId:this.getRuntimeId(),method:"hide"});
}
if(!_4b0&&!this._minified){
this.onClose("");
}
if(_4b6){
app.debugDialog.endLogEvent(_4b6);
}
}
}
if(this.designWrapper){
this.designWrapper.setShowing(_4ae);
}
if(_4ae&&this.modal&&app&&app._page&&wm.isEmpty(wm.dialog.tabIndexChanges)){
dojo.query("input, button",app._page.root.domNode).forEach(function(_4b7){
wm.dialog.tabIndexChanges[_4b7.id]=_4b7.tabIndex;
_4b7.tabIndex=-1;
});
}else{
if(!_4ae&&this.modal){
wm.forEachProperty(wm.dialog.tabIndexChanges,function(_4b8,inId){
var node=dojo.byId(inId);
if(node){
node.tabIndex=_4b8||0;
}
});
wm.dialog.tabIndexChanges={};
}
}
if(!this._initializing&&!this._isDesignLoaded&&_4b4&&this.manageHistory){
app.addHistory({id:this.getRuntimeId(),options:{},title:"Hide "+this.title});
}
},canProcessKeyboardEvent:function(_4b9){
if(!this.showing||this.docked){
return false;
}
var _4ba=dojo.query(".wmdialog");
var _4bb=parseInt(this.domNode.style.zIndex);
for(var i=0;i<_4ba.length;i++){
if(_4ba[i].style.display!="none"&&parseInt(_4ba[i].style.zIndex)>_4bb){
return false;
}
}
return true;
},_onEsc:function(){
},keydown:function(_4bc){
if(!this.canProcessKeyboardEvent(_4bc)){
return true;
}
if(_4bc.keyCode==dojo.keys.ESCAPE&&!this.noEscape){
if(this._isDesignLoaded&&studio.selected.getParentDialog()==this){
return;
}
if(this.showing){
this.callOnHideParent();
this._onEsc();
this.setShowing(false);
this.onClose("cancel");
if(!this._isDesignLoaded){
_4bc._wmstop=true;
}
dojo.stopEvent(_4bc);
}
}else{
if(_4bc.keyCode==dojo.keys.ENTER){
if(this.$.textInput&&this.$.textInput.getDataValue){
this.onEnterKeyPress(this.$.textInput.getDataValue(),_4bc);
}else{
this.onEnterKeyPress("",_4bc);
}
}
}
return true;
},onEnterKeyPress:function(_4bd){
},onShow:function(){
},onClose:function(_4be){
},handleBack:function(_4bf){
if(!this.showing&&!this._showAnimation){
return false;
}
this.hide();
return true;
},restoreFromLocationHash:function(_4c0){
this.show();
},generateStateUrl:function(_4c1){
if(this.showing||this._showAnimation&&!this._isDesignLoaded){
_4c1[this.getRuntimeId()]=1;
}
},setTitlebarHeight:function(_4c2){
this.titlebarHeight=_4c2;
if(this.titleBar){
this.titleBar.setHeight(_4c2+"px");
}
},createTitle:function(){
var _4c3=(String(this.titlebarBorder).match(","))?this.titlebarBorder:"0,0,"+this.titlebarBorder+",0";
this.titleBar=new wm.Container({_classes:{domNode:["dialogtitlebar"]},showing:this.title,name:"titleBar",parent:this,owner:this,width:"100%",desktopHeight:this.titlebarHeight+"px",mobileHeight:this.mobileTitlebarHeight+"px",margin:"0",padding:"0",border:_4c3,borderColor:this.titlebarBorderColor,verticalAlign:"middle",layoutKind:"left-to-right",flags:{notInspectable:true}});
var _4c4=this.titleButtonPanel=new wm.Panel({parent:this.titleBar,owner:this,name:"titleButtonBar",width:wm.isMobile?this.mobileTitlebarHeight+"px":(!this.noEscape?20:0)+(!this.noMinify?20:0)+(!this.noMaxify?20:0)+"px",height:"100%",layoutKind:"left-to-right",horizontalAlign:"left",verticalAlign:"top",showing:!this.modal&&(!this.docked||this.showTitleButtonsWhenDocked)});
if(wm.isMobile){
this.menuButton=new wm.MobileIconButton({direction:"down",noInspector:true,name:"menuButton",width:this.mobileTitlebarHeight+"px",height:"100%",margin:"0",parent:_4c4,owner:this,onclick:dojo.hitch(this,function(_4c5){
this.setShowing(false);
})});
}
this.titleClose=new wm.ToolButton({_classes:{domNode:["dialogclosebutton"]},noInspector:true,name:"titleClose",hint:wm.getDictionaryItem("wm.Dialog.HINT_CLOSE"),width:"19px",height:"19px",margin:"3,0,0,3",parent:_4c4,owner:this,showing:!this.noEscape&&!wm.isMobile});
this.titleMinify=new wm.ToolButton({_classes:{domNode:["dialogminifybutton"]},noInspector:true,hint:wm.getDictionaryItem("wm.Dialog.HINT_MINIFY"),name:"titleMinify",width:"19px",height:"19px",margin:"3,0,0,3",parent:_4c4,owner:this,showing:!this.noMinify&&!wm.isMobile});
this.titleMaxify=new wm.ToolButton({_classes:{domNode:["dialogmaxifybutton"]},noInspector:true,hint:wm.getDictionaryItem("wm.Dialog.HINT_MAXIFY"),name:"titleMinify",caption:" ",width:"19px",height:"19px",margin:"3,0,0,3",parent:_4c4,owner:this,showing:!this.noMaxify&&!wm.isMobile});
this.titleLabel=new wm.Label({noInspector:true,name:"dialogTitleLabel",parent:this.titleBar,owner:this,caption:this.title,showing:Boolean(this.title),margin:"3,3,0,10",width:"100%",height:"100%"});
this.connect(this.titleClose,"onclick",this,"dismiss");
this.connect(this.titleMinify,"onclick",this,"minify");
this.connect(this.titleMaxify,"onclick",this,"maxify");
if(this.titlebarButtons&&!wm.isMobile){
var _4c6=this.titlebarButtons.split(/\s*,\s*/);
for(var i=0;i<_4c6.length;i++){
new wm.ToolButton({_classes:{domNode:[_4c6[i]]},noInspector:true,name:_4c6[i],caption:" ",width:"19px",height:"19px",margin:"3,0,0,3",parent:this.titleBar,owner:this,onclick:dojo.hitch(this,"onMiscButtonClick",_4c6[i])});
}
new wm.Spacer({owner:this,parent:this.titleBar,width:"5px"});
}
if(this.titleBarButtonsOnRight){
this.titleBar.c$.reverse();
_4c4.c$.reverse();
}
},onMiscButtonClick:function(_4c7){
},setTitlebarButtons:function(_4c8){
this.titlebarButtons=_4c8;
this.titleBar.destroy();
this.createTitle();
this.moveControl(this.titleBar,0);
this.reflow();
},setNoMinify:function(val){
this.noMinify=val;
if(this.titleMinify){
this.titleMinify.setShowing(!val&&!wm.isMobile);
}
},setNoMaxify:function(val){
this.noMaxify=val;
if(this.titleMaxify){
this.titleMaxify.setShowing(!val&&!wm.isMobile);
}
},setTitle:function(_4c9){
this.title=_4c9;
if(this.titleLabel){
this.titleLabel.setCaption(_4c9);
this.titleLabel.setShowing(true);
}
if(this.titleBar){
this.titleBar.setShowing(Boolean(_4c9));
}
},setSizeProp:function(n,v,_4ca){
this.inherited(arguments);
if(v&&v.match("%")){
}
if(this.docked){
return;
}
if(this.isReflowEnabled()){
this.renderBounds();
}
if(this.designWrapper){
this.designWrapper.controlBoundsChange();
this.designWrapper.renderBounds();
}
this.reflow();
},update:function(){
this.show();
},activate:function(){
this.show();
},deactivate:function(){
this.hide();
},mousedown:function(e){
if(!this.modal&&!this.docked){
var _4cb=wm.dialog.getNextZIndex(this._isDesignLoaded,this);
this.domNode.style.zIndex=_4cb;
}
if(!this.modal&&!this.noMaxify&&e.target==this.domNode){
this._initialPosition=dojo.clone(this.bounds);
var _4cc=e.clientX-this.marginExtents.l-this.borderExtents.l;
var _4cd=e.clientX;
var _4ce=e.clientY-this.marginExtents.t-this.borderExtents.t;
var _4cf=e.clientY;
if(_4cc-12<=this.bounds.l&&_4cc+12>=this.bounds.l){
this._dragBorderX="left";
}else{
if(_4cd-12<=this.bounds.r&&_4cd+12>=this.bounds.r){
this._dragBorderX="right";
}else{
this._dragBorderX="";
}
}
if(_4ce-12<=this.bounds.t&&_4ce+12>=this.bounds.t){
this._dragBorderY="top";
}else{
if(_4cf-12<=this.bounds.b&&_4cf+12>=this.bounds.b){
this._dragBorderY="bottom";
}else{
this._dragBorderY="";
}
}
switch(this._dragBorderX+this._dragBorderY){
case "lefttop":
wm.Dialog.resizer.setCursor("nw-resize");
break;
case "leftbottom":
wm.Dialog.resizer.setCursor("sw-resize");
break;
case "righttop":
wm.Dialog.resizer.setCursor("ne-resize");
break;
case "rightbottom":
wm.Dialog.resizer.setCursor("se-resize");
break;
case "top":
wm.Dialog.resizer.setCursor("n-resize");
break;
case "bottom":
wm.Dialog.resizer.setCursor("s-resize");
break;
case "left":
wm.Dialog.resizer.setCursor("w-resize");
break;
case "right":
wm.Dialog.resizer.setCursor("e-resize");
break;
}
wm.Dialog.resizer.beginResize(e,this);
}
},drag:function(inDx,inDy){
this._userSized=true;
if(this._dragBorderX=="left"){
this.setBounds(this._initialPosition.l+inDx,NaN,this._initialPosition.w-inDx,NaN);
}else{
if(this._dragBorderX=="right"){
this.setBounds(NaN,NaN,this._initialPosition.r-this._initialPosition.l+inDx,NaN);
}
}
if(this._dragBorderY=="top"){
this.setBounds(NaN,this._initialPosition.t+inDy,NaN,this._initialPosition.h-inDy,NaN);
}else{
if(this._dragBorderY=="bottom"){
this.setBounds(NaN,NaN,NaN,this._initialPosition.b-this._initialPosition.t+inDy);
}
}
this.renderBounds();
if(!dojo.isIE||dojo.isIE>=9){
if(this.docked){
app.reflow();
}else{
this.reflow();
}
}
},drop:function(){
this.reflow();
},setPositionNear:function(_4d0){
if(_4d0 instanceof wm.Component){
this.positionNear=_4d0.getId();
this.fixPositionNode=_4d0.domNode;
}else{
this.positionNear=_4d0;
var _4d1=this.owner.getValueById(_4d0);
this.fixPositionNode=_4d1?_4d1.domNode:null;
}
this.renderBounds();
},adjustFlowForMobile:function(){
}});
dojo.declare("wm.ButtonBarPanel",wm.Panel,{classNames:"wmcontainer wmpanel dialogfooter",width:"100%",height:(wm.isMobile?wm.Button.prototype.mobileHeight:wm.Button.prototype.desktopHeight)||wm.Button.prototype.height,padding:"0",desktopHeight:wm.Button.prototype.desktopHeight||wm.Button.prototype.height,mobileHeight:wm.Button.prototype.mobileHeight||wm.Button.prototype.height,enableTouchHeight:true,horizontalAlign:"right",verticalAlign:"top",fitToContentHeight:true,layoutKind:"left-to-right",init:function(){
this.inherited(arguments);
var d=this.isAncestorInstanceOf(wm.Dialog);
if(d&&(!d.buttonBar||d.buttonBar.isDestroyed)){
d.buttonBar=this;
}
},destroy:function(){
var d=this.isAncestorInstanceOf(wm.Dialog);
if(d&&d.buttonBar==this){
delete d.buttonBar;
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.LoadingDialog"]){
dojo._hasResource["wm.base.widget.Dialogs.LoadingDialog"]=true;
dojo.provide("wm.base.widget.Dialogs.LoadingDialog");
dojo.declare("wm.LoadingDialog",wm.Dialog,{caption:"Loading...",captionWidth:"60px",image:"",imageWidth:"20px",imageHeight:"20px",containerClass:"",widgetToCover:null,serviceVariableToTrack:null,classNames:"wmloadingdialog wm_FontColor_White",useContainerWidget:true,modal:false,noMinify:true,noMaxify:true,noEscape:true,border:0,title:"",_noAnimation:true,postInit:function(){
this.inherited(arguments);
dojo.removeClass(this.domNode,"wmdialog");
this.containerWidget.setLayoutKind("left-to-right");
this.containerWidget.setVerticalAlign("middle");
this.containerWidget.setHorizontalAlign("center");
this.containerWidget.setFitToContentHeight();
this.setImage(this.image);
this.setCaption(this.caption);
this.setServiceVariableToTrack(this.serviceVariableToTrack);
},setServiceVariableToTrack:function(_4d2){
if(this._isDesignLoaded){
return;
}
if(_4d2&&_4d2.length){
_4d2=dojo.map(_4d2,function(_4d3){
if(dojo.isString(_4d3)){
return this.owner.getValueById(_4d3);
}else{
return _4d3;
}
},this);
}
if(_4d2&&!dojo.isArray(_4d2)){
_4d2=[_4d2];
}
this.serviceVariableToTrack=_4d2;
if(this._onResultConnect){
dojo.forEach(this._onResultConnect,function(c){
dojo.disconnect(c);
wm.Array.removeElement(this._connections,c);
},this);
dojo.forEach(this._onRequestConnect,function(c){
dojo.disconnect(c);
wm.Array.removeElement(this._connections,c);
},this);
}
this._onResultConnect=[];
this._onRequestConnect=[];
if(this.serviceVariableToTrack&&this.serviceVariableToTrack.length){
dojo.forEach(this.serviceVariableToTrack,function(svar){
this._onResultConnect.push(this.connect(svar,"onResult",dojo.hitch(this,"svarDone",svar)));
this._onRequestConnect.push(this.connect(svar,"request",dojo.hitch(this,"svarStart",svar)));
},this);
}
},svarDone:function(svar){
if(!this._currentSVars){
this._currentSVars=[];
}
wm.Array.removeElement(this._currentSVars,svar);
if(this._currentSVars.length==0){
this.hide();
}
},svarStart:function(svar){
if(!this._currentSVars){
this._currentSVars=[];
}
this._currentSVars.push(svar);
if(!this.showing){
this.show();
}
},show:function(){
this._getWidgetToCover();
if(this.widgetToCover&&this.widgetToCover instanceof wm.Control&&!this.widgetToCover.isAncestorHidden()){
this.inherited(arguments);
}
},setImage:function(_4d4){
var _4d5=this.image=_4d4;
if(!_4d5){
_4d5=dojo.moduleUrl("lib.images.common").toString()+"loadingThrobber.gif";
}
this._setImage(_4d5);
},_setImage:function(_4d6){
if(!this._picture){
this._picture=new wm.Picture({owner:this,parent:this.containerWidget,name:"loadingPicture",source:_4d6,width:this.imageWidth,height:this.imageHeight});
}else{
this._picture.setSource(_4d6);
}
},setImageWidth:function(_4d7){
this.imageWidth=_4d7;
if(this._picture){
this._picture.setWidth(_4d7);
}
},setImageHeight:function(_4d8){
this.imageHeight=_4d8;
if(this._picture){
this._picture.setHeight(_4d8);
}
},setCaption:function(_4d9){
this.caption=_4d9;
if(!this.caption){
return;
}
if(!this._label){
this._label=new wm.Label({owner:this,parent:this.containerWidget,name:"loadingLabel",width:this.captionWidth,height:"20px",caption:_4d9,singleLine:false,autoSizeHeight:true});
}else{
this._label.setCaption(this.caption);
}
},setShowing:function(_4da,_4db,_4dc){
this.inherited(arguments);
if(_4da){
this._getWidgetToCover();
if(this.widgetToCover){
this.setMargin(this.widgetToCover.margin);
var node=this.widgetToCover.domNode;
if(window.getComputedStyle){
var _4dd,_4de,_4df,_4e0,_4e1;
var _4e2=window.getComputedStyle(node);
_4dd=_4e2.getPropertyValue("border-radius")||_4e2.getPropertyValue("-webkit-border-radius")||_4e2.getPropertyValue("-moz-border-radius")||_4e2.getPropertyValue("-ms-border-radius")||_4e2.getPropertyValue("-o-border-radius");
if(_4dd){
this.domNode.style.borderRadius=_4dd;
if(dojo.isWebKit){
this.domNode.style.WebkitBorderRadius=_4dd;
}else{
if(dojo.isFF){
this.domNode.style.MozBorderRadius=_4dd;
}
}
}else{
this.domNode.style.borderTopLeftRadius=_4e2.getPropertyValue("border-top-left-radius");
this.domNode.style.borderTopRightRadius=_4e2.getPropertyValue("border-top-right-radius");
this.domNode.style.borderBottomLeftRadius=_4e2.getPropertyValue("border-bottom-left-radius");
this.domNode.style.borderBottomRightRadius=_4e2.getPropertyValue("border-bottom-right-radius");
}
}
var _4e3=node.style.zIndex||0;
while(node.parentNode&&node.parentNode.tagName!="BODY"){
node=node.parentNode;
if(node.style.zIndex){
_4e3=Math.max(_4e3,node.style.zIndex);
}
}
this.domNode.style.zIndex=_4e3+1;
}
}
},_getWidgetToCover:function(){
if(this.widgetToCover){
if(dojo.isString(this.widgetToCover)){
this.widgetToCover=this.owner.getValueById(this.widgetToCover);
}
}
return this.widgetToCover;
},renderBounds:function(){
this._getWidgetToCover();
if(this.widgetToCover){
try{
var _4e4=this.widgetToCover.domNode.parentNode;
if(this.domNode.parentNode!=_4e4){
_4e4.appendChild(this.domNode);
}
var b=dojo.clone(this.widgetToCover.bounds);
b.l-=this.widgetToCover.borderExtents.l;
b.r+=this.widgetToCover.borderExtents.r;
b.w=b.r-b.l;
b.t-=this.widgetToCover.borderExtents.t;
b.b+=this.widgetToCover.borderExtents.b;
b.h=b.b-b.t;
this.setBounds(b);
wm.Control.prototype.renderBounds.call(this);
}
catch(e){
}
}
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.WidgetsJsDialog"]){
dojo._hasResource["wm.base.widget.Dialogs.WidgetsJsDialog"]=true;
dojo.provide("wm.base.widget.Dialogs.WidgetsJsDialog");
dojo.declare("wm.WidgetsJsDialog",wm.Dialog,{margin:"0,4,4,0",useContainerWidget:true,widgets_data:null,widgets_json:"",width:"400px",height:"150px",setShowing:function(_4e5,_4e6){
this.inherited(arguments);
if(this.isReflowEnabled()&&!this._rendered){
this.leafFirstRenderCss();
this._rendered=true;
}
},postInit:function(){
this.inherited(arguments);
if(!this.widgets_data){
this.setWidgetsJson(this.widgets_json);
}
this.generateContents();
this.containerWidget.setPadding("0");
this.renderBounds();
this.reflow();
},setWidgetsJson:function(_4e7){
try{
this.widgets_json=_4e7;
this.widgets_data=dojo.fromJson(this.widgets_json);
if(!this._cupdating){
this.generateContents();
}
}
catch(e){
console.error(e);
}
},generateContents:function(){
if(this._generated){
return;
}
this._generated=true;
this.containerWidget._cupdating=true;
this.containerWidget.createComponents(this.widgets_data,this);
this.containerWidget._cupdating=false;
this.containerWidget.reflow();
if(this.button_data){
if(!this.buttonBar){
var _4e8=this.containerWidget;
var _4e9=this.containerNode;
delete this.containerWidget;
delete this.containerNode;
this.createButtonBar();
this.containerWidget=_4e8;
this.containerNode=_4e9;
}
this.buttonBar.createComponents(this.button_data,this);
}
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.Toast"]){
dojo._hasResource["wm.base.widget.Dialogs.Toast"]=true;
dojo.provide("wm.base.widget.Dialogs.Toast");
dojo.declare("wm.Toast",wm.WidgetsJsDialog,{autoSetBorderColor:true,manageHistory:false,manageURL:false,classNames:"wmtoast wmtoastExtraSpecific",title:"",modal:false,useContainerWidget:true,_timeoutId:0,duration:5000,content:"Toast",height:"100px",width:"350px",corner:"br",border:"2",margin:"0",imgHeight:"100%",imgWidth:"30px",imgMargin:"4,0,0,4",prepare:function(){
this.inherited(arguments);
this.widgets_data={img:["wm.Picture",{_classes:{domNode:["ToastLeft"]},width:this.imgWidth,height:this.imgHeight,margin:this.imgMargin}],rightColumn:["wm.Panel",{layoutKind:"top-to-bottom",width:"100%",height:"100%",fitToContentHeight:true,padding:"0"},{},{title:["wm.Label",{_classes:{domNode:["wmtoasttitle"]},height:"20px",width:"100%",singleLine:true}],message:["wm.Label",{_classes:{domNode:["wmtoastmessage"]},height:"100px",width:"100%",singleLine:false,autoSizeHeight:true}]}]};
},postInit:function(){
this.inherited(arguments);
this.containerWidget.setLayoutKind("left-to-right");
this.containerWidget.setPadding("4");
this.img=this.containerWidget.c$[0];
this.title=this.containerWidget.c$[1].c$[0];
this.message=this.containerWidget.c$[1].c$[1];
this.setContent(this.content);
this.connectEvents(this.domNode,["click"]);
},click:function(){
this.hide();
this.onToastClick();
},onToastClick:function(){
},setShowing:function(_4ea,_4eb){
if(!_4ea){
window.clearTimeout(this._timeoutId);
delete this._timeoutId;
}
this.inherited(arguments);
if(_4ea){
this.renderBounds();
this.domNode.style.zIndex=1000;
}
},renderBounds:function(){
this.renderBoundsByCorner();
},setContent:function(_4ec){
this.content=_4ec;
if(this.message){
this.message.setCaption(_4ec);
}
},setTitle:function(_4ed){
if(this.title){
this.title.setCaption(_4ed);
}
},showToast:function(_4ee,_4ef,_4f0,_4f1,_4f2){
if(_4ee instanceof Error){
_4ee=_4ee.toString();
}
if(!_4f0){
_4f0="Info";
}
if(_4f1){
_4f1=_4f1.replace(/top/,"t").replace(/bottom/,"b").replace(/left/,"l").replace(/right/,"r").replace(/center/,"c").replace(/ /,"");
}
this.corner=_4f1||app.toastPosition||"br";
if(this._timeoutId){
window.clearTimeout(this._timeoutId);
this.hide();
this._timeoutId=0;
}
var _4f3=wm.getDictionaryItem("wm.Toast.STATUS_"+(_4f0||"").toUpperCase())||"";
this.setTitle(_4f2||_4f3||_4f0);
_4f0=_4f0||"Info";
this._toastType=_4f0=_4f0||"Info";
var _4f4=(_4f0)?_4f0.split(" "):[];
if(this.autoSetBorderColor){
if(dojo.indexOf(_4f4,"Success")!=-1){
this.setBorderColor("rgb(0,120,0)");
}else{
if(dojo.indexOf(_4f4,"Error")!=-1){
this.setBorderColor("rgb(120,0,0)");
}else{
if(dojo.indexOf(_4f4,"Warning")!=-1){
this.setBorderColor("#f9a215");
}else{
this.setBorderColor("rgb(0,0,0)");
}
}
}
}
this.message.autoSizeHeight=false;
this.setContent(_4ee);
this.message.autoSizeHeight=true;
this.duration=_4ef||this.duration;
this.domNode.className=this.classNames+" "+((_4f0)?_4f0:"");
this.show();
this.message.doAutoSize(true,true);
this.containerWidget.removeDelayedReflow();
this.containerWidget.reflow();
this.setHeight((this.containerWidget.padBorderMargin.t+this.containerWidget.padBorderMargin.b+this.message.parent.bounds.h+this.padBorderMargin.t+this.padBorderMargin.b)+"px");
this._timeoutId=window.setTimeout(dojo.hitch(this,"hide"),this.duration);
},update:function(){
this.showToast(this.content,this.duration,this.domNode.className);
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.GenericDialog"]){
dojo._hasResource["wm.base.widget.Dialogs.GenericDialog"]=true;
dojo.provide("wm.base.widget.Dialogs.GenericDialog");
dojo.declare("wm.GenericDialog",wm.WidgetsJsDialog,{manageHistory:false,manageURL:false,enterKeyIsButton:1,noEscape:true,title:"Generic Dialog",footerBorder:"",footerBorderColor:"",padding:"0",regExp:".*",button1Caption:"",button2Caption:"",button3Caption:"",button4Caption:"",button1Close:false,button2Close:false,button3Close:false,button4Close:false,userPrompt:"Testing...",showInput:false,prepare:function(){
this.inherited(arguments);
if("enterKeyIsButton1" in this){
this.enterKeyIsButton=this.enterKeyIsButton1?1:0;
delete this.enterKeyIsButton1;
}
this.widgets_data={genericInfoPanel:["wm.Panel",{layoutKind:"top-to-bottom",width:"100%",height:"100%",horizontalAlign:"left",verticalAlign:"top",autoScroll:true,fitToContentHeight:true,padding:"10,5,10,5"},{},{userQuestionLabel:["wm.Html",{autoScroll:false,"height":"25px",autoSizeHeight:true,"width":"100%",html:""}],textInput:["wm.Text",{"width":"100%","captionSize":"0%","showing":false},{},{}]}]};
this.button_data={button4:["wm.Button",{"width":"130px","showing":false},{"onclick":"buttonClick"}],button3:["wm.Button",{"width":"130px","showing":false},{"onclick":"buttonClick"}],button2:["wm.Button",{"width":"130px","showing":false},{"onclick":"buttonClick"}],button1:["wm.Button",{"width":"130px","showing":false},{"onclick":"buttonClick"}]};
},postInit:function(){
this.inherited(arguments);
this.containerWidget=this.c$[1];
this.containerWidget.flags.notInspectable=true;
if(!this.buttonBar){
this.buttonBar=this.containerWidget.c$[this.containerWidget.c$.length-1];
this.buttonBar.flags.notInspectable=true;
this.setFooterBorder(this.footerBorder);
this.setFooterBorderColor(this.footerBorderColor);
}
if(this.regExp!=".*"){
this.$.textInput.setRegExp(this.regExp);
}
var _4f5=false;
for(var i=1;i<=6;i++){
var _4f6=this["button"+i+"Caption"];
var _4f7=this.$["button"+i];
if(_4f6){
_4f5=true;
_4f7.setCaption(_4f6);
if(this["button"+i+"Close"]){
_4f7.addUserClass("SubmitButton");
}
_4f7.show();
}
if(this.buttonBar){
this.buttonBar.setShowing(_4f5);
}
this.setShowInput(this.showInput);
}
if(this.$.userQuestionLabel){
this.$.userQuestionLabel.setHtml(this.userPrompt);
}
this.containerWidget.setFitToContentHeight(true);
},setFooterBorder:function(_4f8){
this.footerBorder=_4f8;
if(this.buttonBar){
this.buttonBar.setBorder(_4f8);
this.buttonBar.setHeight((34+this.buttonBar.padBorderMargin.t+this.buttonBar.padBorderMargin.b)+"px");
}
},setFooterBorderColor:function(_4f9){
this.footerBorderColor=_4f9;
if(this.buttonBar){
this.buttonBar.setBorderColor(_4f9);
}
},reflow:function(){
try{
if(this._userSized){
return this.inherited(arguments);
}else{
if(!this._settingHeight){
var _4fa=this.getPreferredFitToContentHeight();
if(dojo.isChrome){
_4fa--;
}
this._settingHeight=true;
this.setHeight(_4fa+"px");
this._settingHeight=false;
this.inherited(arguments);
}
}
}
catch(e){
this._settingHeight=false;
}
},setShowing:function(_4fb,_4fc){
this.inherited(arguments);
if(_4fb){
if(this.$.userQuestionLabel){
this.$.userQuestionLabel.doAutoSize(true,true);
}
if(this.showInput&&this.$.textInput&&this.$.textInput.focus){
this.$.textInput.focus();
}
wm.onidle(this,"reflow");
}
},setShowInput:function(_4fd){
this.showInput=_4fd;
if(this.$.textInput){
this.$.textInput.setShowing(_4fd);
}
},setInputDataValue:function(_4fe){
if(this.$.textInput){
this.$.textInput.setDataValue(_4fe);
}
},getInputDataValue:function(_4ff){
var _500;
if(this.$.textInput){
_500=this.$.textInput.getDataValue();
if(dojo.isString(_500)){
_500=dojo.trim(_500);
}
return _500;
}
},setUserPrompt:function(_501){
this.userPrompt=_501;
if(this.$.userQuestionLabel){
this.$.userQuestionLabel.setHtml(_501);
}
},setButton1Caption:function(_502){
this.setButtonCaption(1,_502);
},setButton2Caption:function(_503){
this.setButtonCaption(2,_503);
},setButton3Caption:function(_504){
this.setButtonCaption(3,_504);
},setButton4Caption:function(_505){
this.setButtonCaption(4,_505);
},setButtonCaption:function(_506,_507){
var _508=this.$["button"+_506];
this["button"+_506+"Caption"]=_507;
if(!_508){
return;
}
if(_507){
_508.setCaption(_507);
_508.show();
}else{
_508.hide();
}
if(this.buttonBar){
this.buttonBar.setShowing(this.button1Caption||this.button2Caption||this.button3Caption||this.button4Caption);
}
},onEnterKeyPress:function(_509,_50a){
if(this.enterKeyIsButton){
this.buttonClick(this.$["button"+this.enterKeyIsButton]);
dojo.stopEvent(_50a);
}
},buttonClick:function(_50b){
var name=_50b.name;
var id=parseInt(name.match(/\d+/)[0]);
if(this["button"+id+"Close"]){
this.dismiss();
}
var text=(this.$.textInput)?this.$.textInput.getDataValue():"";
switch(id){
case 1:
this.onButton1Click(_50b,text);
break;
case 2:
this.onButton2Click(_50b,text);
break;
case 3:
this.onButton3Click(_50b,text);
break;
case 4:
this.onButton4Click(_50b,text);
break;
}
},onButton1Click:function(_50c,_50d){
},onButton2Click:function(_50e,_50f){
},onButton3Click:function(_510,_511){
},onButton4Click:function(_512,_513){
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.PageDialog"]){
dojo._hasResource["wm.base.widget.Dialogs.PageDialog"]=true;
dojo.provide("wm.base.widget.Dialogs.PageDialog");
dojo.declare("wm.pageContainerMixin",null,{pageName:"",hideControls:false,pageProperties:null,deferLoad:false,initPageContainer:function(){
this.pageContainer=new wm.PageContainer({loadParentFirst:false,deferLoad:false,parent:this,owner:this,flex:1,pageProperties:this.pageProperties});
this._connections.push(this.connect(this.pageContainer,"onPageChanged",this,"_pageChanged"));
this._connections.push(this.connect(this.pageContainer,"onError",this,"onError"));
this.pageContainer.dismiss=dojo.hitch(this,"dismiss");
if(this.pageName&&!this.deferLoad){
this.setPage(this.pageName);
}else{
this.pageContainer._pageName=this.pageName;
}
this.createControls();
},onError:function(_514){
},setPage:function(_515){
if(_515){
if(this.pageContainer.pageName!=_515){
if(this.page){
this.page.root.hide();
}
this.pageContainer.setPageName(_515);
}else{
this.onPageReady();
}
}
},showPage:function(_516,_517,_518,_519,_51a,_51b){
if(_51a!==undefined){
this.setTitle(_51a);
}
if(_51b!==undefined){
this.setModal(_51b);
}
this.setContainerOptions(_517,_518,_519);
this.setShowing(true);
this.setPage(_516);
this.reflow();
},setContainerOptions:function(_51c,_51d,_51e){
this.setHideControls(_51c);
},_pageChanged:function(){
this.page=this.pageContainer.page;
this[this.page.name]=this.page;
this.onPageReady();
this.reflow();
wm.focusContainer(this.page.root);
},onPageReady:function(){
},forEachWidget:function(_51f){
return this.pageContainer.forEachWidget(_51f);
},createControls:function(){
var cp=this.controlsPanel=new wm.ButtonBarPanel({parent:this,owner:this,layoutKind:"top-to-bottom",horizontalAlign:"left",verticalAlign:"top",height:"40px",width:"100%",border:this.footerBorder||"",borderColor:this.footerBorderColor||"",flags:{notInspectable:true}});
if(!this.noBevel){
this.controlsBevel=new wm.Bevel({parent:cp,owner:this});
}
var bp=this.buttonPanel=new wm.Panel({parent:cp,owner:this,width:"100%",height:"100%",layoutKind:"left-to-right",horizontalAlign:"right",fitToContentHeight:true});
dojo.addClass(bp.domNode,"wmpagedialog-controlspanel");
this.closeButton=new wm.Button({parent:bp,owner:this,caption:wm.getDictionaryItem("wm.PageDialog.CAPTION_CLOSE"),width:"80px"});
this._connections.push(this.connect(this.closeButton,"onclick",this,"dismiss"));
cp.setShowing(!this.hideControls);
cp=null;
bp=null;
},setHideControls:function(_520){
if(_520!==undefined){
this.hideControls=_520;
this.controlsPanel.setShowing(!_520);
}
},destroy:function(){
if(this.controlsPanel){
this.controlsPanel.destroy();
this.controlsPanel=null;
}
if(this.closeButton){
this.closeButton.destroy();
this.closeButton=null;
}
if(this.controlsBevel){
this.controlsBevel.destroy();
this.controlsBevel=null;
}
if(this.buttonPanel){
this.buttonPanel.destroy();
this.buttonPanel=null;
}
if(this.pageContainer){
this.pageContainer.dismiss=null;
this.pageContainer.destroy();
this.pageContainer=null;
}
this.inherited(arguments);
}});
dojo.declare("wm.PageDialog",[wm.Dialog,wm.pageContainerMixin],{noBevel:false,footerBorder:"",footerBorderColor:"",postInit:function(){
this.inherited(arguments);
this.initPageContainer();
},setPageName:function(_521){
if(this._pageLoading){
return;
}
if(this.isDesignLoaded()){
var _522=studio.getDictionaryItem("wm.PageContainer.NEW_PAGE_OPTION");
if(_521==_522){
return this.pageContainer.createNewPage();
}
}
return this.setPage(_521);
},setPage:function(_523){
this.pageName=_523;
if(_523&&this.pageContainer.pageName!=_523){
this.showLoadingIndicator();
}
this.inherited(arguments);
},setContainerOptions:function(_524,_525,_526){
_525=_525||wm.Dialog.prototype.contentWidth;
_526=_526||wm.Dialog.prototype.contentHeight;
if(!dojo.isString(_525)){
_525+="px";
}
if(!dojo.isString(_526)){
_526+="px";
}
this.setWidth(_525);
this.setHeight(_526);
this.inherited(arguments);
},hideLoadingIndicator:function(){
if(this._loader){
dojo._destroyElement(this._loader);
delete this._loader;
}
},showLoadingIndicator:function(){
if(this.width<150||this.height<80){
return;
}
var text="&nbsp;Loading...";
var _527=wm.theme.getImagesPath()+"loadingThrobber.gif";
this._loader=wm.createElement("div",{id:"_wm_loading_"+this.id,innerHTML:"<div class=\"_wm_loading\" style=\"position: absolute; font-weight: bold; font-size: 10pt; z-index: 100; top: 40%; left: 40%;\"><img alt=\"loading\" style=\"vertical-align: middle\" src=\""+_527+"\" />"+text+"</div>"});
this.domNode.appendChild(this._loader);
},onPageReady:function(){
this.hideLoadingIndicator();
},destroy:function(){
this.inherited(arguments);
if(this.containerNode){
dojo.destroy(this.containerNode);
this.containerNode=null;
}
this.c$=[];
},keydown:function(_528){
if(!this.canProcessKeyboardEvent(_528)){
return true;
}
if(_528.keyCode==dojo.keys.ESCAPE&&this.page&&this.page.onEscapeKey){
this.page.onEscapeKey();
}
this.inherited(arguments);
}});
}
if(!dojo._hasResource["wm.base.widget.Dialogs.DesignableDialog"]){
dojo._hasResource["wm.base.widget.Dialogs.DesignableDialog"]=true;
dojo.provide("wm.base.widget.Dialogs.DesignableDialog");
dojo.declare("wm.DesignableDialog",wm.Dialog,{_pageOwnsWidgets:true,useButtonBar:false,border:"1",borderColor:"black",titlebarBorder:"1",titlebarBorderColor:"black",footerBorderColor:"black",scrim:false,useContainerWidget:true,title:"Dialog",postInit:function(){
this.inherited(arguments);
delete this.containerNode;
}});
}
dojo.i18n._preloadLocalizations("dojo.nls.wm_phonegap_misc",["ROOT","ar","ca","cs","da","de","de-de","el","en","en-au","en-gb","en-us","es","es-es","fi","fi-fi","fr","fr-fr","he","he-il","hu","it","it-it","ja","ja-jp","ko","ko-kr","nb","nl","nl-nl","pl","pt","pt-br","pt-pt","ru","sk","sl","sv","th","tr","xx","zh","zh-cn","zh-tw"]);
