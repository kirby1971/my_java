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

dojo.provide("wm.compressed.wm_list");
if(!dojo._hasResource["wm.base.widget.VirtualList"]){
dojo._hasResource["wm.base.widget.VirtualList"]=true;
dojo.provide("wm.base.widget.VirtualList");
dojo.declare("wm.VirtualListItem",wm.TouchMixin,{selected:false,className:"wmlist-item",getRuntimeId:function(){
return this.list.getRuntimeId()+"."+this.index;
},constructor:function(_1,_2,_3,_4,_5){
this.list=_1;
this.index=_5===undefined?this.list._formatIndex:_5;
this._connections=[];
this._subscriptions=[];
this._debugSubscriptions=[];
if(_4){
this.domNode=_4;
}else{
this.create();
}
this.setContent(_2,_3);
},subscribe:function(){
wm.Component.prototype.subscribe.apply(this,arguments);
},connect:function(){
wm.Component.prototype.connect.apply(this,arguments);
},disconnectEvent:function(){
wm.Component.prototype.disconnectEvent.apply(this,arguments);
},destroy:function(){
dojo.forEach(this._connections,function(_6){
dojo.disconnect(_6);
});
dojo.forEach(this._subscriptions,function(_7){
dojo.unsubscribe(_7);
});
},create:function(){
var n=this.domNode=document.createElement("div");
dojo.addClass(n,this.className);
this.makeConnections();
},makeConnections:function(){
if(!wm.isMobile){
this.connect(this.domNode,"mouseover",this,"mouseover"),this.connect(this.domNode,"mouseout",this,"mouseout");
this.connect(this.domNode,"click",this,function(_8){
wm.onidle(this,"click",{target:_8.target});
});
this.connect(this.domNode,"dblclick",this,function(_9){
wm.onidle(this,"dblclick",{target:_9.target});
});
}else{
this.addTouchListener();
}
},onTouchStart:function(_a){
if(!this.list._disabled&&!this.selected&&this.list._selectionMode!="none"||this.list._selectionMode=="multiple"){
if(this.selected){
this._deselectionIndicatorOnly=true;
this.deselect(true);
}else{
this._selectionIndicatorOnly=true;
this.select(true);
}
this.list._touchedItem=this;
}
this.list._ontouchstart(_a,this.index,this.getData?this.getData():null);
},onTouchMove:function(_b,_c,_d,_e){
if(this.list._touchedItem==this){
delete this.list._touchedItem;
if(this._selectionIndicatorOnly){
delete this._selectionIndicatorOnly;
this.deselect();
}else{
if(this._deselectionIndicatorOnly){
delete this._deselectionIndicatorOnly;
this.select();
}
}
}
this.list._ontouchmove(_b,_c,_d,_e);
},onTouchEnd:function(_f,_10){
delete this._selectionIndicatorOnly;
delete this._deselectionIndicatorOnly;
if(this.list._touchedItem==this){
this.list._touchedItem=null;
if(!_f){
_f={target:this.domNode};
}
this.click(_f);
}
this.list._ontouchend(_f);
},onLongTouch:function(_11,_12){
delete this._selectionIndicatorOnly;
delete this._deselectionIndicatorOnly;
this.list._touchedItem=null;
this.longClick();
},setContent:function(_13){
this.domNode.innerHTML=_13;
},getContent:function(){
return this.domNode.innerHTML;
},doOver:function(){
dojo.addClass(this.domNode,this.className+"-over");
},mouseover:function(e){
if(e&&e.currentTarget==this.domNode){
this.list._onmouseover(e,this);
}
},mouseout:function(e){
if(e.currentTarget==this.domNode){
dojo.removeClass(this.domNode,this.className+"-over");
}
},click:function(e){
this.list.onclick(e,this);
},longClick:function(){
this.list.onLongClick(this);
},dblclick:function(e){
this.list.ondblclick(e,this);
},select:function(_14){
if(!_14){
this.selected=true;
}
dojo.addClass(this.domNode,this.className+"-selected");
},deselect:function(_15){
if(!_15){
this.selected=false;
}
dojo.removeClass(this.domNode,this.className+"-selected");
}});
dojo.declare("wm.VirtualList",wm.Control,{manageHistory:true,headerVisible:true,toggleSelect:false,width:"250px",height:"150px",box:"v",selectionMode:"single",_selectionMode:"single",className:"wmlist",selectedItem:null,init:function(){
this.inherited(arguments);
this.items=[];
this.selection=[];
this.selectedItem=new wm.Variable({name:"selectedItem",owner:this,isList:this._selectionMode=="multiple"});
this.createHeaderNode();
this.createListNode();
this.domNode.appendChild(this.headerNode);
this.domNode.appendChild(this.listNodeWrapper||this.listNode);
this.setHeaderVisible(this.headerVisible);
if(this.onselect){
this.connect(this,"onSelect",this,"onselect");
}
if(this.ondeselect){
this.connect(this,"onDeselect",this,"ondeselect");
}
},postSetupScroller:function(){
var _16=this._listTouchScroll.scroller?this._listTouchScroll.scroller.outer:null;
if(_16){
_16.style.width="100%";
}
},dataSetToSelectedItem:function(_17){
this.selectedItem.setLiveView((_17||0).liveView);
this.selectedItem.setType(_17?_17.type:"any");
},getCount:function(){
return this.items.length;
},getItem:function(_18){
return this.items[_18];
},getItemByCallback:function(_19){
for(var i=0;i<this.getCount();i++){
var d=this.items[i].getData();
if(_19(d)){
return this.items[i];
}
}
},getItemByFieldName:function(_1a,_1b){
for(var i=0;i<this.getCount();i++){
var d=this.items[i].getData();
if(d[_1a]==_1b){
return this.items[i];
}
}
},createListNode:function(){
if(wm.isMobile){
this.listNodeWrapper=document.createElement("div");
dojo.addClass(this.listNodeWrapper,"wmlist-wrapper");
}
this.listNode=document.createElement("div");
this.listNode.flex=1;
dojo.addClass(this.listNode,"wmlist-list");
if(wm.isMobile){
this.listNodeWrapper.appendChild(this.listNode);
}
},createHeaderNode:function(){
this.headerNode=document.createElement("div");
dojo.addClass(this.headerNode,"wmlist-header");
},renderBounds:function(){
var _1c=this.inherited(arguments);
if(_1c){
var _1d=this.isAncestorHidden();
if(this.headerVisible&&!_1d){
wm.job(this.getRuntimeId()+".postRenderBounds",1,dojo.hitch(this,"postRenderBounds"));
}
}
return _1c;
},postRenderBounds:function(){
if(!this.isAncestorHidden()){
var _1e=(this.noHeader||!this.headerVisible)?{h:0}:dojo.marginBox(this.headerNode);
var _1f=this.getContentBounds().h-_1e.h;
(this.listNodeWrapper||this.listNode).style.height=Math.max(0,_1f)+"px";
}
},clear:function(_20){
this._setHeaderVisible(false);
while(this.getCount()){
this.removeItem(this.getCount()-1);
}
this.deselectAll(_20);
this._clearSelectedData();
},createItem:function(_21){
return new wm.VirtualListItem(this,_21);
},addItem:function(_22,_23){
var _24=this.createItem(_22);
var _25=this.listNode;
dojo.setSelectable(_24.domNode,false);
if(_23!=undefined){
this.items.splice(_23,0,_24);
_24.index=_23;
this.selection.splice(_23,0,false);
this.updateItemIndexes(_23+1,1);
var _26=_25.childNodes[_23];
if(_26){
_25.insertBefore(_24.domNode,_25.childNodes[_23]);
}else{
_25.appendChild(_24.domNode);
}
}else{
this.items.push(_24);
_24.index=this.items.length-1;
_25.appendChild(_24.domNode);
}
return _24;
},removeItem:function(_27){
var li=this.getItem(_27);
if(li){
if(li.domNode&&li.domNode.parentNode){
this.listNode.removeChild(li.domNode);
}
this.items.splice(_27,1);
this.selection.splice(_27,1);
this.updateItemIndexes(_27,-1);
li.destroy();
}
},updateItemIndexes:function(_28,_29){
for(var i=_28,l=this.getCount(),li;i<l&&(li=this.items[i]);i++){
li.index+=_29;
}
},removeItems:function(_2a){
for(var i=_2a.length,_2b;((_2b=_2a[i])!=undefined);i--){
this.removeItem(_2b);
}
},modifyItem:function(_2c,_2d){
var li=this.getItem(_2c);
(li?li.setContent(_2d):this.addItem(_2d));
},renderHeader:function(_2e){
this.headerNode.innerHTML=_2e;
},_setHeaderVisible:function(_2f){
this.headerNode.style.display=_2f?"":"none";
},setHeaderVisible:function(_30){
this.headerVisible=_30;
if(this.headerVisible){
this.renderHeader();
}
this._setHeaderVisible(this.headerVisible);
this.reflow();
},_addSelectedData:function(_31){
if(this._selectionMode=="multiple"){
if(!dojo.isArray(this.selected)){
this.selected=[];
}
if(_31&&dojo.indexOf(this.selected,_31.index)==-1){
this.selected.push(_31.index);
}
var _32=[];
dojo.forEach(this.selected,dojo.hitch(this,function(_33){
var v=this.getItemData(_33);
if(typeof v=="object"){
_32.push(v);
}else{
_32.push({dataValue:v});
}
}));
this.selectedItem.setData(_32);
this.setValue("emptySelection",this.selected.length==0);
this.setValue("isRowSelected",this.selected.length>0);
}else{
this.selected=_31;
var d=this.selected?this.selected.getData():{},s=this.selectedItem;
if(dojo.isObject(d)&&!wm.typeManager.getType(s.type)){
s.setDataSchema(d);
}
if(this.selected&&dojo.isObject(d)){
s.setData(d);
}else{
s.clearData();
}
this.setValue("emptySelection",Boolean(!this.selected));
this.setValue("isRowSelected",Boolean(this.selected));
}
},_removeSelectedData:function(_34){
if(this._selectionMode=="multiple"){
this.selected=wm.Array.removeElement(this.selected,_34.index);
}
this._addSelectedData(null);
},_clearSelectedData:function(){
this.selected=this._selectionMode=="multiple"?[]:null;
this.selectedItem.setData(null);
this.setValue("emptySelection",true);
this.setValue("isRowSelected",false);
},addToSelection:function(_35){
if(!_35){
return;
}
this.selection[_35.index]=true;
this.lastSelected=this.selected;
this._addSelectedData(_35);
_35.select();
},removeFromSelection:function(_36){
this.selection[_36.index]=false;
_36.deselect();
this._removeSelectedData(_36);
},deselectAll:function(_37){
dojo.forEach(this.items,function(i){
if(i){
i.deselect();
}
});
var _38=this.selection?this.selection.length:0;
this.selection=[];
this.selected=this._selectionMode=="multiple"?[]:null;
if(!_37&&_38){
this._clearSelectedData();
this.onSelectionChange();
}
},isSelected:function(_39){
return this.selection[_39.index];
},ctrlSelect:function(_3a){
if(this.isSelected(_3a)){
this.eventDeselect(_3a);
}else{
this.eventSelect(_3a);
}
},shiftSelect:function(_3b){
var t=s=(this.selected||this.lastSelected||0).index,e=_3b.index,t;
this.deselectAll();
if(s>e){
s=e;
e=t;
}
for(var i=s,li;i<=e&&(li=this.getItem(i));i++){
this.addToSelection(li);
}
},clickSelect:function(_3c,_3d){
if(this._selectionMode=="none"||this._disabled){
return;
}
var _3e=this.getSelectedIndex();
if(this._selectionMode=="multiple"&&(_3d.ctrlKey||_3d.shiftKey)){
if(_3d.ctrlKey){
this.ctrlSelect(_3c);
}else{
if(_3d.shiftKey){
this.shiftSelect(_3c);
}
}
}else{
if(this._selectionMode=="multiple"){
if(dojo.indexOf(this.selected,_3c.index)==-1){
this.eventSelect(_3c);
}else{
this.eventDeselect(_3c,false);
}
}else{
var s=this.selected,_3f=s&&s.index,_40=_3c.index;
if(_3f!==_40){
this.eventDeselect(_3c,true);
this.eventSelect(_3c);
}else{
if(this.toggleSelect){
this.eventDeselect(_3c);
}
}
}
}
if(!this._isDesignLoaded&&!this._handlingBack&&this.manageHistory&&!this.isNavigationMenu){
app.addHistory({id:this.getRuntimeId(),options:{selectedRow:_3e},title:"SelectionChange"});
}
},eventDeselect:function(_41,_42){
if(this._disabled){
return;
}
if(this._selectionMode=="multiple"){
this.removeFromSelection(_41);
}else{
this.deselectAll(_42);
}
if(!_42){
wm.job(this.getRuntimeId()+".eventSelect",0,dojo.hitch(this,function(){
this.onDeselect(_41);
this.onSelectionChange();
}));
}
},eventSelect:function(_43){
if(this._disabled){
return;
}
var _44={canSelect:true};
this._oncanselect(_43,_44);
if(_44.canSelect){
this.addToSelection(_43);
if(!this._cupdating){
wm.job(this.getRuntimeId()+".eventSelect",0,dojo.hitch(this,function(){
this.onSelect(_43);
this.onSelectionChange();
}));
}
}
},select:function(_45){
if(_45){
if(this._selectionMode!="multiple"){
this.deselectAll();
}
this.eventSelect(_45);
}
},selectByIndex:function(_46){
var i=this.getItem(_46);
if(i){
this.select(i);
}
},getSelectedIndex:function(){
if(this._selectionMode=="multiple"){
return this.selected;
}else{
return this.selected?this.selected.index:-1;
}
},handleBack:function(_47){
this._handlingBack=true;
try{
var _48=_47.selectedRow;
this.select(_48);
}
catch(e){
}
delete this._handlingBack;
return true;
},_oncanmouseover:function(_49,_4a,_4b){
},onLongClick:function(_4c){
},onclick:function(_4d,_4e){
var _4f=_4d.target;
if(_4f.firstChild&&dojo.attr(_4f.firstChild,"wmcontroller")){
_4f=_4f.firstChild;
}
if(_4f&&dojo.attr(_4f,"wmcontroller")){
if(_4f.type=="checkbox"){
if(!_4e.selected){
this.eventSelect(_4e);
}else{
this.eventDeselect(_4e);
}
if(_4d instanceof Event){
dojo.stopEvent(_4d);
}
}else{
if(_4f.type=="radio"){
var _50=this.toggleSelect;
this.toggleSelect=false;
this.clickSelect(_4e,_4d);
this.toggleSelect=_50;
dojo.stopEvent(_4d);
}else{
if(dojo.hasClass(_4f,"wmDeleteColumn")||dojo.hasClass(_4f,"wmDeleteColumnImage")){
this._deleteItem(_4e);
}
}
}
}else{
this.clickSelect(_4e,_4d);
}
},_deleteItem:function(_51){
if(this.deleteConfirm){
app.confirm(this.deleteConfirm,false,dojo.hitch(this,function(){
this.deleteItem(_51);
}));
}else{
this.deleteItem(_51);
}
},deleteItem:function(_52){
var _53=dojo.indexOf(this.items,_52);
wm.Array.removeElementAt(this.items,_53);
dojo.destroy(_52.domNode);
return _53;
},ondblclick:function(_54,_55){
},onSelectionChange:function(){
},onselect:function(_56){
},ondeselect:function(_57){
},onSelect:function(_58){
},onDeselect:function(_59){
},_oncanselect:function(_5a,_5b){
},_onmouseover:function(_5c,_5d){
var _5e={canMouseOver:true};
this._oncanmouseover(_5c,_5d,_5e);
if(_5e.canMouseOver){
_5d.doOver();
}
}});
}
if(!dojo._hasResource["wm.base.widget.Table.builder"]){
dojo._hasResource["wm.base.widget.Table.builder"]=true;
dojo.provide("wm.base.widget.Table.builder");
wm.getTr=function(_5f,_60){
return _5f&&((_5f.rows||0)[_60]||_5f.childNodes[_60]);
};
wm.getTd=function(_61,_62,_63){
return (wm.getTr(_61,_62)||0).childNodes[_63];
};
dojo.declare("wm.table.builder",null,{rowCount:0,colCount:0,constructor:function(_64,_65,_66){
this.className=_64||"";
this.rowClassName=_65||"";
this.columnClassName=_66||"";
},_table:["<table class=\"","","\" cellspacing=\"0\" cellpadding=\"0\">"],generateCell:function(_67,_68,_69){
var tag=(_69?"th":"td");
var _6a=["<",tag," "];
var s=this.getCellStyle&&this.getCellStyle(_67,_68);
var c=this.getCellClass&&this.getCellClass(_67,_68);
c=(c?c+" ":"")+this.columnClassName;
s&&_6a.push([" style=\"",s,"\""].join(""));
c&&_6a.push([" class=\"",c,"\""].join(""));
_6a.push(">");
_6a.push(this.getCellContent(_67,_68,_69));
_6a.push("</"+tag+">");
return _6a.join("");
},generateRow:function(_6b,_6c){
var s=(this.getRowStyle)&&this.getRowStyle(_6b),c=this.rowClassName||((this.getRowClass)&&this.getRowClass(_6b));
var _6d=["<tr"," style=\"",s,"\" class=\"",c,"\">"];
for(var i=0,l=this.colCount;i<l;i++){
_6d.push(this.generateCell(_6b,i,_6c));
}
_6d.push("</tr>");
return _6d.join("");
},generateTableStart:function(){
var _6e=this._table.concat([]);
_6e[1]=this.className;
return _6e.join("");
},generateTableEnd:function(){
return "</table>";
},generateHtml:function(){
result=[this.generateTableStart()];
for(var i=0,l=this.rowCount;i<l;i++){
result.push(this.generateRow(i));
}
result.push(this.generateTableEnd());
return result.join("");
},generateHeaderHtml:function(){
result=[this.generateTableStart()];
result.push(this.generateRow(-1,true));
result.push(this.generateTableEnd());
return result.join("");
},generateEmptyTable:function(){
return [this.generateTableStart(),this.generateTableEnd()].join("");
}});
}
if(!dojo._hasResource["wm.base.widget.List"]){
dojo._hasResource["wm.base.widget.List"]=true;
dojo.provide("wm.base.widget.List");
dojo.declare("wm.ListItem",wm.VirtualListItem,{top:0,create:function(){
this.inherited(arguments);
if(!this.domNode.id){
dojo.addClass(this.domNode,"wmlist-item");
this.rowId=this.list.nextRowId++;
this.domNode.id=this.list.getRuntimeId()+"_ITEM_"+this.rowId;
}
},format:function(_6f,_70){
this.list.inSetContent=true;
var _71=(this.list.format?this.list.format(_70,_6f):_6f);
delete this.list.inSetContent;
return _71;
},setContent:function(_72,_73){
var f=this.format(_72,this.index);
this.inherited(arguments,[f]);
this._data=this.getData();
},getData:function(){
return this.list.getItemData(this.index);
},update:function(){
var _74=this.format(this.getData(),this.index);
this.domNode.innerHTML=_74;
},getColumnFromNode:function(_75){
if(_75){
while(_75.tagName!="TD"){
_75=_75.parentNode;
}
var td=_75,tr=_75.parentNode;
for(var i=0,c;(c=tr.childNodes[i]);i++){
if(c==td){
return i;
}
}
}
return -1;
},select:function(_76){
this.inherited(arguments);
if(!_76&&this.list.columns&&(this.list.selectionMode=="checkbox"||this.list.selectionMode=="radio")){
wm.job(this.getRuntimeId()+"changeCheckedStatus",10,this,function(){
dojo.query("input",this.domNode)[0].checked=true;
});
}
},deselect:function(_77){
this.inherited(arguments);
if(!_77&&this.list.columns&&(this.list.selectionMode=="checkbox"||this.list.selectionMode=="radio")){
wm.job(this.getRuntimeId()+"changeCheckedStatus",10,this,function(){
dojo.query("input",this.domNode)[0].checked=false;
});
}
}});
wm.Object.extendSchema(wm.ListItem,{getData:{group:"method",returns:"Object"}});
dojo.declare("wm.List",wm.VirtualList,{scrollToTopOnDataChange:false,_regenerateOnDeviceChange:1,_scrollTop:0,styleAsGrid:true,rightNavArrow:false,selectFirstRow:false,scrollToSelection:false,renderVisibleRowsOnly:true,autoSizeHeight:false,nextRowId:0,query:{},width:"100%",height:"200px",minWidth:150,minHeight:60,deleteColumn:false,deleteConfirm:"Are you sure you want to delete this?",autoScroll:false,constructor:function(){
this._data=[];
},columnWidths:"",dataFields:"",classNames:"wmlist",columns:"",_columnsHash:"",getItemForNode:function(_78){
var _79=wm.Array.indexOf(this.items,_78.id.replace(/^.*_/,""),function(_7a,id){
return _7a&&_7a.rowId==id;
});
if(_79==-1){
return null;
}
return this.items[_79];
},deleteItem:function(_7b){
var _7c=this.inherited(arguments);
dojo.query(".wmlist-item.Odd",this.domNode).removeClass("Odd");
dojo.query(".wmlist-item:nth-child(odd)",this.domNode).addClass("Odd");
var _7d=this._data[_7c];
wm.Array.removeElementAt(this._data,_7c);
this.onRowDeleted(_7c,_7d);
},onRowDeleted:function(_7e,_7f){
},setColumns:function(_80){
this.columns=_80;
this._setSelectionColumn(this.selectionMode);
this._setDeleteColumn(this.deleteColumn);
this._setRightArrowColumn(this.rightNavArrow);
this._columnsHash={};
var _81=0;
for(var i=0;i<this.columns.length;i++){
var _82=this.columns[i];
this._columnsHash[_82.field||_82.id]=_82;
if(!_82.width){
_82.width="100%";
}
if(_82.width.match(/\%/)){
_81+=Number(_82.width);
}
if(_82.field=="PHONE COLUMN"&&!this._isDesignLoaded){
_82.expression=_82.expression.replace(/\$\{wm\.runtimeId\}/g,this.getRuntimeId()).replace(/wm\.List\.prototype\./g,"app.getValueById('"+this.getRuntimeId()+"').");
}
}
if(!this.isDesignLoaded()&&dojo.isIE<=10){
for(var i=0;i<this.columns.length;i++){
var _82=this.columns[i];
var w=_82.width;
if(w.match(/\%/)){
_82.width=(w*100/_81)+"%";
}
}
}
},setSelectionMode:function(_83){
this.selectionMode=_83;
if(_83=="checkbox"||_83=="extended"){
_83="multiple";
}else{
if(_83=="radio"){
_83="single";
}else{
if(_83=="extended"){
_83=this.selectionMode="multiple";
}
}
}
this._selectionMode=_83;
if(!this.columns){
this.convertToColumns();
}else{
this.setColumns(this.columns);
}
this._render();
},_setRightArrowColumn:function(_84){
if(this.columns){
for(var i=this.columns.length-1;i>=0;i--){
if(this.columns[i].controller=="rightarrow"){
wm.Array.removeElementAt(this.columns,i);
}
}
if(_84){
this.columns.push({show:true,controller:"rightarrow",width:"20px",title:"-",field:"_rightArrow",mobileColumn:true});
}
}
},_setSelectionColumn:function(){
if(this.columns){
var _85=false;
for(var i=0;i<this.columns.length;i++){
if(this.columns[i].controller=="radio"||this.columns[i].controller=="checkbox"){
_85=true;
if(this.selectionMode=="checkbox"||this.selectionMode=="radio"){
this.columns[i].controller=this.selectionMode;
}else{
wm.Array.removeElementAt(this.columns,i);
}
break;
}
}
if(!_85&&(this.selectionMode=="radio"||this.selectionMode=="checkbox")){
var _86=this.columns[0].controller?1:0;
wm.Array.insertElementAt(this.columns,{width:"25px",title:"-",controller:this.selectionMode,field:"_selector",show:true,mobileColumn:true},_86);
}
}
},convertToColumns:function(){
if(this.dataFields){
var _87=this.dataFields.split(/\s*,\s*/);
}else{
if(this.dataSet&&this.dataSet._dataSchema){
var _87=wm.typeManager.getSimplePropNames(this.dataSet._dataSchema);
}
}
if(_87&&_87.length){
this.columns=[];
for(var i=0;i<_87.length;i++){
this.columns.push({width:"100%",field:_87[i],show:true,title:wm.capitalize(_87[i])});
}
}
if(this.columns){
this.setColumns(this.columns);
}
},init:function(){
this.inherited(arguments);
this.setSelectionMode(this.selectionMode);
if(this.noHeader){
this.headerVisible=false;
}
if(!this.styleAsGrid&&(!this._classes||!this._classes.domNode||dojo.indexOf(this._classes.domNode,"MobileListStyle")==-1)){
this.addUserClass("MobileListStyle");
}else{
if(this.styleAsGrid&&(!this._classes||!this._classes.domNode||dojo.indexOf(this._classes.domNode,"GridListStyle")==-1)){
this.addUserClass("GridListStyle");
}
}
var _88=this.spacerNodeTop=document.createElement("div");
_88.className="wmlist-spacer";
this.listNode.appendChild(_88);
var _89=this.spacerNodeBottom=document.createElement("div");
_89.className="wmlist-spacer";
this.listNode.appendChild(_89);
this.createSelectedItem();
this.createBuilder();
if(!this.columns&&this.columnWidths&&this.dataFields.split(",").length!=this.columnWidths.split(",").length){
console.error("Column width count does not match field list count");
}
this._setDataFields(this.dataFields);
this.setColumnWidths(this.columnWidths);
this._render();
this.domNode.onboundschange=dojo.hitch(this,"updateHeaderWidth");
},postInit:function(){
this.inherited(arguments);
if(this.renderVisibleRowsOnly&&!this._isDesignLoaded){
this.connect(this.listNode,"onscroll",this,wm.isMobile?"blockScrolling":"_onScroll");
}
if(wm.isIOS){
this.connect(this.domNode,"ontouchstart",dojo,"stopEvent");
if(this.listNodeWrapper){
this.connect(this.listNodeWrapper,"ontouchstart",dojo,"stopEvent");
}
}
},setDisabled:function(_8a){
this.inherited(arguments);
dojo.toggleClass(this.domNode,"Disabled",this._disabled);
},_ontouchstart:function(e){
if(this._touchY&&this._touchY.animationId){
window.clearInterval(this._touchY.animationId);
}
this._touchY={time:new Date().getTime()};
if(this.listNode.clientHeight>this.listNodeWrapper.clientHeight){
dojo.stopEvent(e);
}
},_ontouchmove:function(e,_8b,_8c,_8d){
if(this.listNode.clientHeight<=this.listNodeWrapper.clientHeight||_8d>0&&this.getScrollTop()==0||_8d<0&&this.getScrollTop()>=Math.max(this.listNode.scrollHeight,this.listNodeWrapper.scrollHeight)){
return;
}
var _8e=new Date().getTime();
var _8f=_8e-this._touchY.time;
var _90=this._scrollTop;
var _91=_90-_8d;
if(_91<0){
_91=0;
}else{
if(_91>this.listNode.scrollHeight){
_91=this.listNode.scrollHeight;
}
}
this.setScrollTop(_91);
this._touchY={velocity:-_8d/_8f,time:new Date().getTime()};
dojo.stopEvent(e);
dojo.publish("wmTouchMove",[this]);
},_ontouchend:function(e,_92){
if(this.listNode.scrollHeight<=this.listNodeWrapper.clientHeight){
return;
}
if(this._touchedItem){
this._touchedItem.onTouchEnd();
}
if(this._touchY.velocity!=Infinity&&Math.abs(this._touchY.velocity)>0.01){
if(this._touchY.animationId){
window.clearInterval(this._touchY.animationId);
}
this._touchY.animationId=window.setInterval(dojo.hitch(this,"_onAnimateScroll"),50);
}
},_onAnimateScroll:function(){
this._touchY.velocity*=0.9;
var _93=this.spacerNodeBottom.offsetTop-this.listNodeWrapper.clientHeight;
var _94=(this._touchY.velocity==Infinity||Math.abs(this._touchY.velocity)<0.01||this.getScrollTop()>_93);
if(!_94){
var inc=Math.min(this._touchY.velocity*50,this.getListNodeHeight());
if(this._scrollTop+inc>_93){
inc=_93-this._scrollTop;
}
}
if(_94||!inc||Math.abs(inc)<=1){
window.clearInterval(this._touchY.animationId);
delete this._touchY.animationId;
return;
}
this.setScrollTop(this._scrollTop+inc);
this._onScroll();
},setScrollTop:function(_95){
var min=0;
var max=this.listNode.scrollHeight;
var top;
if(_95<min){
top=min;
}else{
if(_95>max){
top=max;
}else{
top=_95;
}
}
if(wm.isMobile){
var _96=this._scrollTop;
top=Math.min(top,Math.max(0,this.listNode.clientHeight-this.listNodeWrapper.clientHeight));
if(dojo.isWebKit){
this.listNode.style.WebkitTransform="translate(0,-"+top+"px)";
}else{
if(dojo.isMoz){
this.listNode.style.MozTransform="translate(0,-"+top+"px)";
}else{
if(dojo.isOpera){
this.listNode.style.OTransform="translate(0,-"+top+"px)";
}else{
if(dojo.isIE==8){
this.listNodeWrapper.scrollTop=top;
}else{
if(dojo.isIE){
this.listNode.style.MsTransform="translate(0,-"+top+"px)";
}
}
}
}
}
this.listNode.style.transform="translate(0,-"+top+"px)";
this._scrollTop=top;
if(!this._inScroll){
this._onScroll(top>_96?"down":"up");
}
}else{
this.listNode.scrollTop=top;
}
},isItemShowing:function(_97){
if(!_97.domNode.parentNode){
return 0;
}
var box={t:_97.domNode.offsetTop};
box.b=box.t+_97.domNode.clientHeight;
var _98=this.getScrollTop();
var _99=this.getListNodeHeight();
var _9a=_98+_99;
if(box.t>=_98&&box.b<=_9a){
return 2;
}else{
if(box.b>=_98&&box.t<_98){
return 1;
}else{
if(box.t<=_9a&&box.b>_9a){
return -1;
}else{
return 0;
}
}
}
},scrollToRow:function(_9b){
if(_9b>this._data.length){
_9b=this._data.length-1;
}
var _9c=Boolean(this.items[_9b]);
var _9d=this.getItem(_9b);
var top,_9e;
if(_9d.domNode.parentNode){
var box=dojo.marginBox(_9d.domNode);
_9e=box.h;
var _9f=box.t;
}else{
_9e=this.avgHeight;
}
var _a0=!_9c?0:this.isItemShowing(_9d);
switch(_a0){
case 2:
break;
case 1:
top=_9d.domNode.offsetTop;
this.setScrollTop(top-(_9e-_9d.domNode.clientHeight));
break;
case -1:
this.setScrollTop(_9f-this.getListNodeHeight()+_9e);
break;
default:
var _a1=this.getScrollTop();
var _a2=this.spacerNodeBottom.clientHeight+this.spacerNodeTop.clientHeight+this.getListNodeHeight();
if(_9d&&_9d.domNode.parentNode&&(_9b==0||this.items[_9b-1])){
top=_9d.domNode.offsetTop;
}else{
top=_9e*_9b;
}
var _a3=this.spacerNodeBottom.clientHeight;
var _a4=this.spacerNodeTop.clientHeight;
var _a5=top-_9e;
this.spacerNodeTop.style.height=_a5+"px";
this.spacerNodeBottom.style.height=(_a3-_a5+_a4)+"px";
this._inScroll=true;
this.setScrollTop(Math.max(0,top-15));
this._inScroll=false;
var _a6=this.getScrollTop()-_a1;
var _a7=this.listNode.childNodes;
var _a8=[];
for(var i=1;i<_a7.length-1;i++){
var _a9=_a7[i];
if(_a9.className.match(/wmlist-item/)){
_a8.push(_a9);
}
}
dojo.forEach(_a8,function(_aa){
_aa.parentNode.removeChild(_aa);
});
this.scrollDownAddItems(Math.max(0,_9b-1));
this._lastScrollTop=this.getScrollTop();
var _ab=this.items[this._data.length-1];
if(_ab&&this.isItemShowing(_ab)){
var box=dojo.marginBox(_ab.domNode);
var _ac=box.h;
var _ad=box.t;
this.setScrollTop(this.listNode.scrollHeight-_ac+this.getListNodeHeight());
this._lastScrollTop=this.getScrollTop();
}
}
},getItem:function(_ae){
if(!this.items[_ae]&&_ae<this._data.length){
this.addItem(this.getItemData(_ae),_ae);
}
return this.items[_ae];
},createSelectedItem:function(){
this.selectedItem=new wm.Variable({name:"selectedItem",owner:this});
},createBuilder:function(){
this.builder=new wm.table.builder(this.className+"-table",this.className+"-row",this.className+"-cell");
this.builder.getCellContent=dojo.hitch(this,"getCellContent");
this.builder.getCellStyle=dojo.hitch(this,"getCellStyle");
this.builder.getCellClass=dojo.hitch(this,"getCellClass");
},createItem:function(_af,_b0,_b1){
return new wm.ListItem(this,_af,null,_b0,_b1);
},getEmptySelection:function(){
return !this.hasSelection();
},hasSelection:function(){
if(dojo.isArray(this.selected)){
return this.selected.length>0;
}else{
return Boolean(this.selected);
}
},setDeleteColumn:function(_b2){
this.deleteColumn=_b2;
if(!this.columns){
this.convertToColumns();
}else{
this.setColumns(this.columns);
}
this._render();
},_setDeleteColumn:function(){
if(this.columns){
var _b3=false;
for(var i=0;i<this.columns.length;i++){
if(this.columns[i].controller=="deleteColumn"){
_b3=true;
if(!this.deleteColumn){
wm.Array.removeElementAt(this.columns,i);
}
break;
}
}
if(!_b3&&this.deleteColumn){
this.columns.unshift({width:"25px",title:"-",controller:"deleteColumn",field:"_deleteColumn",show:true,mobileColumn:true});
}
}
},_setDataFields:function(_b4){
if(!this.columns&&this.dataSet){
if(this._isDesignLoaded){
this.updateColumnData(false);
}else{
this.convertToColumns();
}
}
if(this.columns){
this._dataFields=[];
var _b5=false;
var _b6=(this._isDesignLoaded||window["studio"]&&this.isOwnedBy(studio.page));
var _b7=_b6?studio.currentDeviceType=="phone":wm.device=="phone";
var _b8=_b6?studio.currentDeviceType=="tablet":wm.device=="tablet";
var _b9=true;
if(_b7||_b8){
for(var i=0;i<this.columns.length;i++){
var c=this.columns[i];
if(c.mobileColumn&&!c.controller){
_b5=true;
}
if(!c.controller&&c.show){
_b9=false;
}
}
}
if(_b5&&(_b9||_b7||this.desktopWidthExcedesBounds())){
this._useMobileColumn=_b5;
}else{
this._useMobileColumn=_b5=false;
}
for(var i=0;i<this.columns.length;i++){
var c=this.columns[i];
var _ba=_b5&&c.mobileColumn||!_b5&&c.show||c.controller;
if(_ba){
this._dataFields.push(this.columns[i].field||this.columns[i].id);
}
}
}else{
var d=this.dataFields=_b4||"";
if(d){
var s=d.split(","),d=[];
for(var i=0,v,f;(f=s[i]);i++){
v=dojo.trim(f);
if(v){
d.push(v);
}
}
}else{
var _bb=(this.dataSet||0)._dataSchema;
if(_bb){
var d=[];
for(var i in _bb){
var ti=_bb[i];
if(!(ti||0).isList&&!wm.typeManager.isStructuredType((ti||0).type)){
d.push(i);
}
}
}else{
var row=this._data;
if(dojo.isArray(row)){
row=row[0];
}
if(dojo.isObject(row)&&!dojo.isArray(row)){
d=[];
for(var i in row){
if(!dojo.isObject(row[i])){
d.push(dojo.trim(i));
}
}
}
}
}
this.trimDataSetObjectFields(d);
this._dataFields=d;
}
},desktopWidthExcedesBounds:function(){
var _bc=20;
var _bd=0;
dojo.forEach(this.columns,function(_be){
if(_be.show){
_bd++;
var w=String(_be.width);
if(w.indexOf("%")!=-1){
_bc+=80;
}else{
var _bf=parseInt(w);
if(_bf){
_bc+=_bf;
}
}
}
});
var _c0=this.domNode.style.width||app.appRoot.bounds.w;
return (_bc>_c0)&&_bd>1;
},getDataSetObjectFields:function(){
var o={};
if(!this.dataSet){
return o;
}
var t=this.dataSet.type,tt=wm.typeManager.getTypeSchema(t)||{};
for(var i in tt){
if(wm.typeManager.isStructuredType(tt[i])){
o[i]=tt[i];
}
}
return o;
},trimDataSetObjectFields:function(_c1){
var f=this.getDataSetObjectFields();
for(var i in f){
for(var j=0,df;(df=_c1[j]);j++){
if(df==i){
_c1.splice(j,1);
break;
}
}
}
},setDataFields:function(_c2){
this._setDataFields(_c2);
this._render();
},setColumnWidths:function(_c3){
var c=this.columnWidths=_c3;
this._columnWidths=dojo.isArray(c)?c:c.split(",");
this._render();
},shouldShowHeader:function(){
var _c4=this._dataFields;
return (this.headerVisible&&(_c4||this._headerContent));
},getHeaderContent:function(){
return this._headerContent||this.builder.generateHeaderHtml();
},renderHeader:function(){
var s=this.shouldShowHeader();
this._setHeaderVisible(s);
if(s){
this.headerNode.innerHTML=this.getHeaderContent();
this.updateHeaderWidth();
}
},updateHeaderWidth:function(){
if(this.columns){
return;
}
var f=this.items&&this.items[0];
var n=f&&f.domNode.firstChild;
var b=n&&dojo.marginBox(n);
if(b&&this.headerNode.firstChild&&b.w){
dojo.marginBox(this.headerNode.firstChild,{w:b.w});
}
},_render:function(){
if(!this._cupdating){
if(this.dataSet){
this.renderDataSet(this.dataSet);
}else{
this.renderData(this._data);
}
}
},clear:function(_c5){
this._data=null;
this.inherited(arguments);
},getDataItemCount:function(){
return this._data?this._data.length:0;
},canSetDataSet:function(_c6){
return Boolean(_c6);
},setDataSet:function(_c7){
try{
var _c8=this.dataSet;
if(!this.canSetDataSet(_c7)){
this.dataSet="";
}else{
this.dataSet=_c7;
}
var t=(_c7||0).type||"AnyData";
if(this._paging==="inc"){
var _c9=this.getScrollTop();
if(this.loadingNode&&this.loadingNode.parentNode){
this.listNode.removeChild(this.loadingNode);
}
this._data=_c7.getData();
this.updateBottomSpacerHeight();
this.setScrollTop(_c9);
this.scrollDownAddItems();
delete this._paging;
}else{
if(this._isDesignLoaded&&this.columns&&this.columns.length&&_c7&&_c7.type){
if(this._typeChangedConnect){
dojo.disconnect(this._typeChangedConnect);
}
this._typeChangedConnect=this.connect(_c7,"typeChanged",this,function(){
this.updateColumnData(true);
this._render();
});
if(!_c8||!_c8.type||_c8.type==_c7.type){
this.updateColumnData(true);
}
}
this.setSelectedItemType(t);
this.dataSetToSelectedItem(_c7);
this.onsetdata(this.dataSet);
this.renderDataSet(this.dataSet);
}
}
catch(e){
alert(e.toString());
}
},setSelectedItemType:function(_ca){
this.selectedItem.dataSet="";
this.selectedItem.setType(_ca);
},update:function(){
var ds=this.getValueById((this.components.binding.wires["dataSet"]||0).source);
wm.fire(ds,"update");
},renderDataSet:function(_cb){
if(this.isAncestorHidden()&&!this._renderHiddenGrid&&!this._isDesignLoaded){
this._renderDojoObjSkipped=true;
return;
}
this._renderDojoObjSkipped=false;
var d=_cb instanceof wm.Variable?_cb.getData():[];
d=this.runQuery(d);
this.renderData(d);
},doAutoSize:function(){
},setAutoSizeHeight:function(_cc){
this.autoSizeHeight=_cc;
this._render();
},setBestHeight:function(){
if(this.autoSizeHeight){
this._doingAutoSize=true;
var _cd=0;
if(this.items.length){
var _ce=dojo.coords(this.items[this.items.length-1].domNode);
_cd+=_ce.h+_ce.t;
}
if(this.headerVisible){
var _ce=dojo.coords(this.headerNode);
_cd+=_ce.h+_ce.t;
}
_cd+=this.padBorderMargin.b+this.padBorderMargin.t+2;
this.setHeight(_cd+"px");
this._doingAutoSize=false;
}
},_onShowParent:function(){
if(this._renderDojoObjSkipped&&!this._headerRendered||this.spacerNodeTop.clientHeight){
wm.onidle(this,"_render");
}
if(this.isNavigationMenu){
this.deselectAll();
}
},setShowing:function(_cf){
var _d0=this.showing;
this.inherited(arguments);
if(!_d0&&_cf){
this._onShowParent();
}
},renderData_optimized:function(_d1){
var _d2=this.selectedItem.getData();
this.clear(true);
this._data=_d1;
if(!this.dataFields){
this._setDataFields();
}
this.updateBuilder();
if(!this._data){
return;
}
this.renderHeader();
this._headerRendered=true;
var i=0;
var f=dojo.hitch(this,function(_d3,_d4,_d5,_d6){
var max=Math.min(i+_d4,this.getDataItemCount());
for(;i<max;i++){
this.addItem(this.getItemData(i),i);
this._formatIndex=null;
}
if(i<this.getDataItemCount()){
wm.onidle(this,function(){
_d5(i,_d4,_d5,_d6);
});
}else{
_d6();
}
});
var _d7=dojo.hitch(this,function(){
dojo.query(".wmlist-item:nth-child(odd)",this.domNode).addClass("Odd");
this.reflow();
if(this._listTouchScroll&&!this._listTouchScroll.scrollers.outer.style.width){
wm.job(this.getRuntimeId()+"ListSetupScroller",1,dojo.hitch(this._listTouchScroll,"setupScroller"));
}
var _d8=dojo.isArray(_d2);
if(this.columns&&(_d8&&_d2.length||!_d8&&_d2||this.selectFirstRow)){
this.selectItemOnGrid(_d2);
}
this.onRenderData();
});
f(0,20,f,_d7);
},renderBounds:function(){
var h=parseInt(this.domNode.style.height);
if(this.inherited(arguments)&&this.renderVisibleRowsOnly&&!this._isDesignLoaded){
if(this._renderDojoObjSkipped){
this._render();
}else{
var _d9=this.listNode.childNodes.length>2?this.getItemForNode(this.listNode.childNodes[1]):null;
if(this.bounds.h>h){
this._onScroll("down");
}else{
this._onScroll("up");
}
}
}
},renderData:function(_da){
var _db=wm.device=="phone"?this.maxRenderedRowsPhone:this.maxRenderedRows;
if(this.selectedItem.type){
var _dc=this.selectedItem.getData();
}
this.clear(true);
if(this.scrollToTopOnDataChange){
this._inScroll=true;
this.setScrollTop(0);
delete this._inScroll;
}
this._data=_da;
if(!this.dataFields){
this._setDataFields();
}
this.updateBuilder();
this.renderHeader();
this.spacerNodeBottom.style.height="0px";
this.spacerNodeTop.style.height="0px";
if(!this._data){
return;
}
this._scrollDirection="down";
if(this.renderVisibleRowsOnly&&!this._isDesignLoaded){
if(!this.isAncestorHidden()&&this.getListNodeHeight()>0&&!this._loading){
this.scrollDownAddItems(0);
this.avgHeight=this.getAverageItemHeight();
this.updateBottomSpacerHeight();
var sc=this.getScrollTop();
if(sc>0){
this.setScrollTop(sc);
}
}else{
this._renderDojoObjSkipped=true;
}
}else{
var _dd=this.getDataItemCount();
for(var i=0;i<_dd;i++){
this.addItem(this.getItemData(i),i);
}
this.addOddClasses();
if(this.autoSizeHeight){
if(!this.isAncestorHidden()||this._isDesignLoaded){
this.setBestHeight();
}else{
this._renderDojoObjSkipped=true;
}
}
}
this.reflow();
var _de=dojo.isArray(_dc);
if(this.columns&&(_de&&_dc.length||!_de&&_dc||this.selectFirstRow)){
this.selectItemOnGrid(_dc);
}
this.onRenderData();
},_renderItem:function(i){
var _df=this.items[i];
if(_df){
if(!_df.domNode.parentNode||!_df.domNode.parentNode.tagName){
var _e0=this.listNode;
var _e1=this.findNextSiblingNode(i);
var _e2=this.spacerNodeBottom.offsetTop;
_e0.insertBefore(_df.domNode,_e1);
if(this._isScrolling){
if(this._scrollDirection=="down"){
this.updateBottomSpacerHeight();
if(_e1!=this.spacerNodeBottom){
this.spacerNodeTop.style.height=(this.spacerNodeTop.clientHeight-this.items[i].domNode.clientHeight)+"px";
}
}else{
var _e3=this.spacerNodeBottom.offsetTop-_e2;
this.spacerNodeTop.style.height=(this.spacerNodeTop.clientHeight-_e3)+"px";
}
}
}
}else{
var _e4=false;
this._formatIndex=i;
var _e2=this.spacerNodeBottom.offsetTop;
this.addItem(this.getItemData(i),i);
_df=this.items[i];
this._formatIndex=null;
if(this._isScrolling){
if(this._scrollDirection=="down"){
this.updateBottomSpacerHeight();
}else{
if(!_e4){
if(!_df.height){
_df.height=_df.domNode.clientHeight;
}
var _e3=this.spacerNodeBottom.offsetTop-_e2;
this.spacerNodeTop.style.height=(this.spacerNodeTop.clientHeight-_e3)+"px";
}
}
}
}
if(i==0){
this.spacerNodeTop.style.height="0px";
}else{
if(i==this.getDataItemCount()-1){
this.spacerNodeBottom.style.height="0px";
}
}
},getNodeFromItem:function(_e5){
if(_e5){
return _e5.domNode;
}else{
return null;
}
},findNextSiblingNode:function(_e6){
var _e7=this.listNode;
if(_e6==0){
return _e7.childNodes[1];
}
if(this.items[_e6-1]){
var _e8=this.getNodeFromItem(this.items[_e6-1]);
if(_e8.parentNode&&_e8.parentNode.tagName){
return _e7.childNodes[dojo.indexOf(_e7.childNodes,_e8)+1];
}
}
if(this.items[_e6+1]){
var _e9=this.getNodeFromItem(this.items[_e6+1]);
if(_e9.parentNode&&_e9.parentNode.tagName){
return _e9;
}
}
for(var i=_e6-2;i>=0;i--){
if(this.items[i]){
var _e9=this.getNodeFromItem(this.items[i]);
if(_e9.parentNode&&_e9.parentNode.tagName){
return _e7.childNodes[dojo.indexOf(_e7.childNodes,_e9)+1];
}
}
}
return _e7.childNodes[1];
},onStyleRow:function(_ea,_eb){
},_onStyleRowBeforeStart:1,addItem:function(_ec,_ed,_ee){
var _ef=this.createItem(_ec,_ee,_ed);
var _f0=this.listNode;
dojo.setSelectable(_ef.domNode,false);
if(_ed!=undefined){
this.items[_ed]=_ef;
var _f1=this.findNextSiblingNode(_ed);
if(_f1){
_f0.insertBefore(_ef.domNode,_f1);
}else{
_f0.insertBefore(_ef.domNode,this.spacerNodeBottom);
}
}else{
this.items.push(_ef);
_ef.index=this.items.length-1;
var _f1=(this.items.length==_ed+1)?this.spacerNodeBottom:_f0.childNodes[_ed+1];
_f0.insertBefore(_ef.domNode,_f1);
}
try{
var _f2=_ef.getData();
if(_f2){
var _f3={customClasses:"",customStyles:""};
this.onStyleRow(_f3,_f2);
if(_f3.customClasses){
dojo.addClass(_ef.domNode,_f3.customClasses);
}
if(_f3.customStyles){
_ef.domNode.style.cssText=_f3.customStyles;
}
}
}
catch(e){
}
return _ef;
},addSpacer:function(_f4,_f5){
var _f6=document.createElement("div");
_f6.className="wmlist-spacer";
_f6.style.height=_f5+"px";
var _f7=this.listNode.childNodes[_f4+1];
this.listNode.insertBefore(_f6,_f7);
this.items[_f4]=_f6;
},addVisibleItems:function(_f8){
var _f9=this.listNode;
var _fa=this.getDataItemCount();
if(_fa==0){
return;
}
var _fb=this.getScrollTop();
var _fc=this.getListNodeHeight()+_fb;
var _fd=this.avgHeight=this.getAverageItemHeight();
if(_f8===undefined){
_f8=Math.floor(_fb/_fd);
_f8=Math.max(0,_f8-10);
_f8=Math.min(_f8,_fa);
}
if(this._scrollDirection=="down"){
for(var i=0;i<_f8;i++){
if(!this.items[i]){
this.addSpacer(i,_fd);
_fe+=_fd;
}
}
}else{
var _ff=_f9.childNodes[1];
var _100=this.getItemForNode(_ff);
}
var _fe=_fc-1;
for(var i=_f8;i<_fa&&_fe<_fc;i++){
this._renderItem(i);
if(!this.items[i]){
this._renderItem(i);
}
_fe=this.items[i].domNode.offsetTop+this.items[i].domNode.clientHeight;
}
var _101=i+10;
for(;i<_fa&&i<_101;i++){
this._renderItem(i);
}
this.addOddClasses();
},updateTopSpacerHeight:function(){
var _102=this.listNode.childNodes[1];
if(!_102){
this.spacerNodeTop.style.height="0px";
}else{
var item=this.getItemForNode(_102);
var _103=dojo.indexOf(this.items,item);
var _104=_103*this.getAverageItemHeight();
this.spacerNodeTop.style.height=_104+"px";
}
},updateBottomSpacerHeight:function(){
var _105=this.getDataItemCount();
var rows=this.listNode.childNodes;
if(rows<=2){
this.spacerNodeBottom.style.height="0px";
return;
}
var _106=rows[rows.length-2];
var _107=this.getItemForNode(_106);
var _108=dojo.indexOf(this.items,_107);
var _109=_105-_108-1;
if(_109>0){
this.spacerNodeBottom.style.height=(_109*this.avgHeight)+"px";
}else{
this.spacerNodeBottom.style.height="0px";
}
},getListNodeHeight:function(){
return (this.listNodeWrapper||this.listNode).clientHeight;
},getScrollTop:function(){
if(wm.isMobile){
return this._scrollTop;
}else{
var _10a=this.listNode;
return _10a.scrollTop;
}
},updateAverageItemHeight:function(){
var h=0;
var _10b=0;
var rows=this.listNode.childNodes;
for(var i=1;i<rows.length-2;i++){
h+=rows[i].clientHeight;
}
if(h>0){
this.avgHeight=h/(rows.length-3);
}
return this.avgHeight;
},getAverageItemHeight:function(){
return this.avgHeight||20;
},blockScrolling:function(){
this.listNodeWrapper.scrollTop=0;
},_onScroll:function(_10c,_10d){
if(this._inScroll){
return;
}
this._inScroll=true;
try{
if(this._lastScrollTime&&(new Date().getTime()-this._lastScrollTime)<10){
return;
}
this._isScrolling=true;
var _10e=this.getScrollTop();
if(_10c=="down"||_10c!="up"&&(this._lastScrollTop===undefined||this._lastScrollTop<_10e)){
this._scrollDirection="down";
this.scrollDownRemoveItems();
this.scrollDownAddItems();
}else{
if(this._lastScrollTop>_10e){
this._scrollDirection="up";
this.scrollUpRemoveItems();
this.scrollUpAddItems();
wm.job(this.getRuntimeId()+".testScrollTop",200,this,"scrollUpAddItems");
}else{
this.scrollDownAddItems();
this.scrollUpAddItems();
}
}
}
catch(e){
}
finally{
this._lastScrollTop=_10e;
this._lastScrollTime=new Date().getTime();
this._isScrolling=false;
delete this._inScroll;
}
},_testScrollTop:function(){
this._onScroll(null,true);
},getLastItemNode:function(){
for(var i=this.listNode.childNodes.length-1;i>=0;i--){
if(this.listNode.childNodes[i].id){
return this.listNode.childNodes[i];
}
}
},scrollDownAddItems:function(_10f){
var _110=0;
var _111=this.listNode;
var _112=this.getDataItemCount();
if(_112==0){
return;
}
var _113=this.getScrollTop();
var _114=this.getListNodeHeight();
var _115=0;
var _116=_114+_113+this.spacerNodeTop.offsetTop;
dojo.forEach(this.listNode.childNodes,function(node){
node.style.border="";
});
if(_10f!==undefined){
_115=this.getScrollTop();
}else{
var _117=this.getLastItemNode();
if(_117){
var item=this.getItemForNode(_117);
var _118=dojo.indexOf(this.items,item);
_10f=_118+1;
_115=item.domNode.offsetTop+item.domNode.clientHeight;
}else{
_110=this.getAverageItemHeight();
_10f=Math.floor(_113/_110);
_115=this.spacerNodeTop.clientHeight;
}
if(_111.childNodes.length==2){
var _119=_110*_10f;
var _11a=this.spacerNodeTop.clientHeight;
var _11b=_119-_11a;
this.spacerNodeTop.style.height=_119+"px";
var _11c=this.spacerNodeBottom.clientHeight;
_11c=_11c-_11b;
this.spacerNodeBottom.style.height=_11c+"px";
}
}
var _11d=false;
for(var i=_10f;i<_112&&_115<_116;i++){
_11d=true;
this._renderItem(i);
if(!_110){
_110=this.items[i].domNode.clientHeight||22;
}
_115+=_110;
}
if(i<_112){
if(_11d){
this._renderItem(i);
}
}else{
if(!this._paging){
if(this.dataSet instanceof wm.LiveVariable&&this.dataSet.getPage()<this.dataSet.getTotalPages()-1){
this.dataSet._appendData=true;
this.dataSet.setNextPage();
this._paging="inc";
}else{
this.onScrollToBottom();
var svar=!this.dataSet||this.dataSet instanceof wm.ServiceVariable?this.dataSet:this.dataSet.isAncestorInstanceOf(wm.ServiceVariable);
if(svar&&svar._requester){
this._paging="inc";
}
}
if(this._paging){
var _111=this.listNode;
var node=this.loadingNode||dojo.create("div",{className:"wmlist-item wmlist-loading",innerHTML:"Loading..."});
_111.insertBefore(node,this.spacerNodeBottom);
this.loadingNode=node;
}
}
}
this.addOddClasses();
this.updateAverageItemHeight();
},onScrollToBottom:function(){
},addOddClasses:function(){
wm.job(this.getRuntimeId()+".addOddClasses",10,this,function(){
dojo.query(".wmlist-item",this.domNode).forEach(function(node){
var id=parseInt(node.id.replace(/^.*_/,""));
dojo.toggleClass(node,"Odd",Boolean(id%2));
});
});
},scrollDownRemoveItems:function(){
var _11e=this.getScrollTop();
var _11f=this.spacerNodeTop.clientHeight;
var _120=this.getAverageItemHeight();
var _121=_11e-_120;
var _11f=this.spacerNodeTop.clientHeight;
var rows=this.listNode.childNodes;
var _122=[];
for(var i=1;i<rows.length-1;i++){
var node=rows[i];
var h=node.clientHeight;
if(h+_11f<_121){
_122.push(node);
_11f+=h;
}else{
break;
}
}
this.spacerNodeTop.style.height=_11f+"px";
dojo.forEach(_122,function(node){
node.parentNode.removeChild(node);
});
},scrollUpRemoveItems:function(){
var _123=this.avgHeight=this.getAverageItemHeight();
var _124=this._listTouchScroll?this.listNode.parentNode:this.listNode;
var _125=this.getScrollTop()+this.getListNodeHeight()+this.spacerNodeTop.offsetTop;
var rows=this.listNode.childNodes;
var _126=parseInt(this.spacerNodeBottom.style.height)||0;
while(rows.length>2){
var row=rows[rows.length-2];
if(row.offsetTop>_125){
row.parentNode.removeChild(row);
}else{
break;
}
}
this.updateBottomSpacerHeight();
},scrollUpAddItems:function(){
var _127=this.listNode;
var _128=this.getDataItemCount();
if(_128==0){
return;
}
var _129=this.getScrollTop();
var _12a=this.getListNodeHeight()+_129+this.spacerNodeTop.offsetTop;
var _12b=this.getAverageItemHeight();
var _12c=_129;
var _12d;
if(this.listNode.childNodes.length>2){
var item=this.getItemForNode(this.getLastItemNode());
var _12e=dojo.indexOf(this.items,item);
_12d=_12e-1;
}else{
_12d=Math.floor(_12a/_12b);
}
var _12f=(_129&&_127.childNodes.length==2);
if(_12f){
this.spacerNodeBottom.style.height=_12b*(_128-_12d)+"px";
}
for(var i=_12d;i>=0;i--){
this._renderItem(i);
if(this.items[i].domNode.offsetTop+this.items[i].domNode.clientHeight<_12c){
break;
}
}
if(i>=0){
this._renderItem(i);
}
this.updateAverageItemHeight();
if(_129<=0){
this.spacerNodeTop.style.height="0px";
}else{
if(_12f){
this.spacerNodeTop.style.height=_12b*i+"px";
}
}
this.addOddClasses();
},onRenderData:function(){
},selectItemOnGrid:function(obj,_130){
if(obj instanceof wm.Variable){
obj=obj.getData();
}
if(obj===undefined||obj===null){
obj={};
}
var _131=[];
dojo.forEach(this.columns,function(col){
if(col.displayType=="Date"){
_131.push(col.field||col.id);
}
});
if(!_130){
_130=this.primaryKeyFields||this.dataSet?wm.data.getIncludeFields(this.dataSet.type):this._pkList||[];
}
if(_130.length==0&&this.dataSet){
var _132=wm.typeManager.getTypeSchema(this.dataSet.type);
for(var _133 in _132){
_130.push(_133);
}
}
var q={};
dojo.forEach(_130,function(f){
q[f]=obj[f];
if(dojo.indexOf(_131,f)!=-1){
q[f]=new Date(obj[f]);
}
});
var _134=this.runQuery(this._data,q);
if(_134.length<1){
if(this.selectFirstRow){
this.setSelectedRow(0);
}else{
this.deselectAll();
}
return;
}
if(_134[0]._rowNumber!=undefined){
this._cupdating=true;
this.setSelectedRow(_134[0]._rowNumber);
this._cupdating=false;
}else{
if(this.selectFirstRow){
this.setSelectedRow(0);
}else{
this.deselectAll();
}
}
},runQuery:function(_135,_136){
var _137=_136||this.query;
if(wm.isEmpty(_137)){
return _135;
}else{
var _138=[];
for(var i=0;i<_135.length;i++){
var d=_135[i];
if(this.queryItem(_137,d,i)){
d._rowNumber=i;
_138.push(d);
}
}
return _138;
}
},queryItem:function(_139,_13a,_13b){
var w="*";
var _13c=true;
for(var key in _139){
if(this._columnsHash&&this._columnsHash[key]&&this._columnsHash[key].isCustomField){
var col=this._columnsHash[key];
if(col.expression){
_13a[key]=wm.expression.getValue(col.expression,_13a,this.owner);
}else{
if(col.formatFunc){
switch(col.formatFunc){
case "wm_date_formatter":
case "Date (WaveMaker)":
case "wm_localdate_formatter":
case "Local Date (WaveMaker)":
case "wm_time_formatter":
case "Time (WaveMaker)":
case "wm_number_formatter":
case "Number (WaveMaker)":
case "wm_currency_formatter":
case "Currency (WaveMaker)":
case "wm_image_formatter":
case "Image (WaveMaker)":
case "wm_link_formatter":
case "Link (WaveMaker)":
break;
case "wm_array_formatter":
_13a[key]=this.arrayFormatter(key,col.formatProps,null,null,null,_13a[k]);
break;
default:
if(!this.isDesignLoaded()){
_13a[key]=dojo.hitch(this.owner,col.formatFunc)("",_13b,dojo.indexOf(this.columns,col),key,{customStyles:[],customClasses:[]},_13a);
}
}
}
}
}
var a=_13a[key];
if(dojo.isString(a)){
a=a.replace(/\\([^\\])/g,"$1");
}
var b=_139[key];
var _13d=true;
if(dojo.isString(b)){
b=b.replace(/\\([^\\])/g,"$1");
if(b.charAt(0)==w){
b=b.substring(1);
_13d=false;
}
}
if(b==w){
continue;
}
if(dojo.isString(a)&&dojo.isString(b)){
if(b.charAt(b.length-1)==w){
b=b.slice(0,-1);
}
a=a.toLowerCase();
b=b.toLowerCase();
var _13e=a.indexOf(b);
if(_13e==-1||_13e>0&&_13d){
_13c=false;
break;
}
}else{
if(a!==b){
_13c=false;
break;
}
}
}
return _13c;
},getHeading:function(_13f){
if(this.columns){
var _140=this._columnsHash[_13f];
var _141=_140.title;
return _141==null?"":_141;
}else{
var d=this._dataSource;
var s=d&&d.schema||0;
var si=s[_13f]||0;
if(si.label){
return wm.capitalize(si.label);
}else{
var _142=_13f.replace(/^.*\./,"");
return wm.capitalize(_142);
}
}
},getItemData:function(_143){
return this._data[_143];
},_getColumnDef:function(_144){
var _145=this._useMobileColumn;
var _146=dojo.some(this.columns,function(c){
return c.mobileColumn&&!c.controller;
});
var _147=-1;
for(var i=0;i<this.columns.length;i++){
if(_145&&this.columns[i].mobileColumn||(!_146||!_145)&&this.columns[i].show){
_147++;
}
if(_147==_144){
return this.columns[i];
}
}
},getCellContent:function(_148,_149,_14a,_14b){
var _14c=this._dataFields&&this._dataFields[_149];
var _14d;
var i=this._formatIndex!=null?this._formatIndex:this.getCount();
if(this._firstItemIndex!==undefined){
i+=this._firstItemIndex;
}
if(_14a){
_14d="<div>"+this.getHeading(_14c);
}else{
if(this.columns){
var _14e=this._getColumnDef(_149);
if(_14e.controller){
if(_14e.controller=="deleteColumn"){
_14d="<div wmcontroller='true' class='wmDeleteColumn'><div wmcontroller='true' class='wmDeleteColumnImage'/></div>";
}else{
if(_14e.controller=="rightarrow"){
_14d="<div class='mblArrowContainer'><div class='mblRightArrow mblArrow' /></div>";
}else{
_14d="<input wmcontroller='true' type='"+_14e.controller+"' />";
}
}
}else{
var _14f=this._data[i];
var _14d=_14f;
var _150=_14c.split(".");
for(var _151=0;_151<_150.length;_151++){
if(_14d&&typeof _14d=="object"){
_14d=_14d[_150[_151]];
}else{
_14d=null;
}
}
_14d=this.formatCell(_14c,_14d,_14f,i,_149);
}
}
}
if(_14d==undefined){
var d=this.getItemData(i);
f=wm.decapitalize(_14c);
_14d=_14c?d[_14c]:d;
}
var info={column:_149,data:_14d,header:_14a};
this.onformat(info,_149,_14d,_14a,_14f);
if(!this.inSetContent){
this._formatIndex=null;
}
if(_14d===undefined||_14d===null){
_14d="";
}
return "<div class='wmlist-content'>"+info.data+"</div>";
},getColWidth:function(_152){
if(this.columns){
return this.columns[_152].width;
}else{
var c=this._columnWidths;
if(!c||c.length==0||c.length==1&&!c[0]||c[_152]===undefined){
return Math.round(100/this.builder.colCount)+"%";
}else{
return c[_152];
}
}
},getCellStyle:function(_153,_154){
if(this.columns){
var text=[];
var _155=this._dataFields[_154];
var col=this._columnsHash[_155];
var _156=col.align;
if(_153!=-1){
_153=this._formatIndex!=null?this._formatIndex:this.getCount();
var data=this._data[_153];
if(col.backgroundColor){
var _157=wm.expression.getValue(col.backgroundColor,data,this.owner);
if(_157){
text.push("background-color:"+_157);
}
}
if(col.textColor){
var _158=wm.expression.getValue(col.textColor,data,this.owner);
if(_158){
text.push("color:"+_158);
}
}
}
var _159=col.width;
if(_159){
text.push("width:"+_159);
}
if(_156){
text.push("text-align:"+_156);
}
return text.join(";");
}else{
return "width: "+this.getColWidth(_154)+";";
}
},updateBuilder:function(){
this.builder.colCount=this._dataFields?this._dataFields.length:1;
this.builder.rowCount=1;
},format:function(_15a,_15b){
this._formatIndex=_15a;
return this.builder.generateHtml(_15b);
},_onformatBeforeStart:1,onformat:function(_15c,_15d,_15e,_15f,_160){
},onsetdata:function(_161){
}});
wm.List.extend({renderDojoObj:function(){
this._render();
},formatCell:function(_162,_163,_164,_165,_166){
var col;
if(!this._columnsHash||!this._columnsHash[_162]){
if(this.columns){
dojo.forEach(this.columns,function(c){
if(c.field==_162||c.id==_162){
col=c;
}
});
}
if(!col){
return _163;
}
}else{
col=this._columnsHash[_162];
}
var _167="";
if(col.expression){
var expr=col.expression;
try{
if(col.field=="PHONE COLUMN"){
expr=expr.replace(/\$\{wm\.rowId\}/g,_165);
}
if(expr.indexOf("${this}")!=-1){
expr=expr.replace(/\$\{this\}/g,dojo.toJson(_164));
}
if(this._isDesignLoaded){
expr=expr.replace(/\$\{wm\.runtimeId\}/g,this.getRuntimeId()).replace(/wm\.List\.prototype\./g,"app.getValueById('"+this.getRuntimeId()+"').");
}
_167=wm.expression.getValue(expr,_164,this.owner);
}
catch(e){
}
}else{
_167=_163;
}
if(col.formatFunc){
switch(col.formatFunc){
case "wm_date_formatter":
case "Date (WaveMaker)":
_167=this.dateFormatter(col.formatProps||{},null,null,null,_167);
break;
case "wm_localdate_formatter":
case "Local Date (WaveMaker)":
_167=this.localDateFormatter(col.formatProps||{},null,null,null,_167);
break;
case "wm_time_formatter":
case "Time (WaveMaker)":
_167=this.timeFormatter(col.formatProps||{},null,null,null,_167);
break;
case "wm_number_formatter":
case "Number (WaveMaker)":
_167=this.numberFormatter(col.formatProps||{},null,null,null,_167);
break;
case "wm_array_formatter":
_167=this.arrayFormatter(col.field||col.id,col.formatProps||{},null,null,null,_167);
break;
case "wm_currency_formatter":
case "Currency (WaveMaker)":
_167=this.currencyFormatter(col.formatProps||{},null,null,null,_167);
break;
case "wm_image_formatter":
case "Image (WaveMaker)":
_167=this.imageFormatter(col.formatProps||{},null,null,null,_167);
break;
case "wm_link_formatter":
case "Link (WaveMaker)":
_167=this.linkFormatter(col.formatProps||{},null,null,null,_167);
break;
case "wm_button_formatter":
_167=this.buttonFormatter(_162,col.formatProps||{},null,null,null,_167,_165);
break;
default:
if(!this.isDesignLoaded()){
if(this.owner[col.formatFunc]){
_167=dojo.hitch(this.owner,col.formatFunc)(_167,_165,_166,_162,{customStyles:[],customClasses:[]},_164);
}
}else{
_167="<i>runtime only...</i>";
}
break;
}
}
return _167;
},dateFormatter:function(_168,_169,_16a,_16b,_16c){
if(!_16c){
return _16c;
}else{
if(typeof _16c=="number"){
_16c=new Date(_16c);
}else{
if(_16c instanceof Date==false){
return _16c;
}
}
}
var _16d=_168.dateType||"date";
if(!_168.useLocalTime){
var _16e=_16d=="date"?360:0;
_16c.setHours(0,60*_16c.getHours()+_16c.getMinutes()+60*wm.timezoneOffset+_16e);
}
var _16f={fullYear:true,selector:_16d,formatLength:_168.formatLength||"short",locale:dojo.locale,datePattern:_168.datePattern,timePattern:_168.timePattern};
return dojo.date.locale.format(_16c,_16f);
},numberFormatter:function(_170,_171,_172,_173,_174){
var _175={places:_170.dijits||0,round:_170.round?0:-1,type:_170.numberType};
return dojo.number.format(_174,_175);
},arrayFormatter:function(_176,_177,_178,_179,_17a,_17b){
if(!_177.joinFieldName){
_177.joinFieldName="dataValue";
}
if(!_177.separator){
_177.separator=",";
}
var str="";
if(_17b){
dojo.forEach(_17b,function(item){
if(str){
str+=_177.separator+" ";
}
str+=item[_177.joinFieldName];
});
}
return str;
},currencyFormatter:function(_17c,_17d,_17e,_17f,_180){
var _181=false;
if(this instanceof wm.DojoGrid){
_181=this._isDesignLoaded;
}
return dojo.currency.format(_180,{currency:_17c.currency||(_181?studio.application.currencyLocale:app.currencyLocale)||"USD",places:_17c.dijits==undefined?2:_17c.dijits,round:_17c.round?0:-1});
},imageFormatter:function(_182,_183,_184,_185,_186){
if(_186&&_186!=""){
var _187=_182.width?" width=\""+_182.width+"px\"":"";
var _188=_182.height?" height=\""+_182.height+"px\"":"";
if(_182.prefix){
if(_182.prefix.match(/\/$/)&&_186.indexOf("/")==0){
_186=_186.substring(1);
}
_186=_182.prefix+_186;
}
if(_182.postfix){
_186=_186+_182.postfix;
}
return "<img "+_187+_188+" src=\""+_186+"\">";
}
return "";
},linkFormatter:function(_189,_18a,_18b,_18c,_18d){
if(_18d&&_18d!=""){
var _18e=String(_18d);
var _18f=String(_18d);
if(_189.prefix){
_18f=_189.prefix+_18f;
}
if(_189.postfix){
_18f=_18f+_189.postfix;
}
var _190=_189.target||"_NewWindow";
if(_18f.indexOf("://")==-1&&_18f.charAt(0)!="/"){
_18f="http://"+_18f;
}
return "<a href=\""+_18f+"\" target=\""+_190+"\">"+_18e+"</a>";
}
return _18d;
},buttonFormatter:function(_191,_192,_193,_194,_195,_196,_197,_198){
if(_196!==null&&_196!==undefined&&_196!==""){
var _199=_192.buttonclass?" class=\""+_192.buttonclass+"\" ":" class=\"wmbutton\" ";
var _19a=this.getRuntimeId()+".gridButtonClicked(event,\""+_191+"\","+_197+")' ";
if(wm.isMobile&&!wm.isFakeMobile){
_19a="ontouchstart='"+this.getRuntimeId()+".gridButtonTouchStart(event)' ontouchmove='"+this.getRuntimeId()+".gridButtonTouchMove(event)' ontouchend='"+_19a+"'";
}else{
_19a="onclick='"+_19a+"'";
}
return "<button "+_19a+_199+">"+_196+"</button>";
}
return _196;
},gridButtonTouchStart:function(_19b){
_19b=_19b||window.event;
dojo.stopEvent(_19b);
this._buttonTouchPos={y:_19b.targetTouches?_19b.targetTouches[0].clientY:_19b.clientY,x:_19b.targetTouches?_19b.targetTouches[0].clientX:_19b.clientX,isClick:true};
},gridButtonTouchMove:function(_19c){
_19c=_19c||window.event;
dojo.stopEvent(_19c);
if(this._buttonTouchPos.isClick){
var y=_19c.targetTouches?_19c.targetTouches[0].clientY:_19c.clientY;
var x=_19c.targetTouches?_19c.targetTouches[0].clientX:_19c.clientX;
this._buttonTouchPos.isClick=(Math.abs(y-this._buttonTouchPos.y)<5&&Math.abs(x-this._buttonTouchPos.x)<5);
}
},gridButtonClicked:function(_19d,_19e,_19f){
_19d=_19d||window.event;
dojo.stopEvent(_19d);
if(wm.isMobile&&!this._buttonTouchPos.isClick){
return;
}
var _1a0=this._data[_19f];
this.onGridButtonClick(_19e,_1a0,_19f);
},onGridButtonClick:function(_1a1,_1a2,_1a3){
},setSelectedRow:function(_1a4){
this.eventSelect(this.items[_1a4]);
},setSelectedItem:function(_1a5){
if(_1a5 instanceof wm.Variable){
_1a5=_1a5.getData();
}
if(!_1a5){
this.deselectAll();
return;
}
wm.forEachProperty(_1a5,function(_1a6,_1a7){
if(typeof _1a6=="object"){
delete _1a5[_1a7];
}
});
this.selectByQuery(_1a5);
},select:function(_1a8){
var _1a9;
var item;
if(_1a8===null){
_1a9=-1;
item=null;
}else{
if(typeof _1a8=="object"){
_1a9=_1a8.index;
item=_1a8;
}else{
_1a9=_1a8;
item=this.items[_1a9];
}
}
if((!this.isAncestorHidden()||this.renderVisibleRowsOnly)&&!this._isDesignLoaded){
var _1aa=this._renderHiddenGrid;
this._renderHiddenGrid=true;
this.scrollToRow(_1a9);
this._renderHiddenGrid=_1aa;
item=this.getItem(_1a9);
}
if(item){
this.inherited(arguments,[item]);
}
},selectByIndex:function(_1ab){
this.select(_1ab);
},selectByQuery:function(_1ac){
if(!this.dataSet){
return;
}
if(!_1ac){
this.deselectAll();
return;
}
var _1ad=this.dataSet.query(_1ac);
if(this.renderVisibleRowsOnly){
this.renderVisibleRowsOnly=false;
this._render();
this.renderVisibleRowsOnly=true;
}
this.deselectAll();
var _1ae=_1ad.getCount();
for(var i=0;i<_1ae;i++){
var item=_1ad.data._list[i];
this.addToSelection(this.items[dojo.indexOf(this.dataSet.data._list,item)]);
if(this._selectionMode=="single"){
break;
}
}
},getRow:function(_1af){
return this._data[_1af];
},findRowIndexByFieldValue:function(_1b0,_1b1){
var item;
for(var i=0;i<this._data.length;i++){
item=this._data[i];
if(item[_1b0]===_1b1){
return i;
}
}
return -1;
},getCell:function(_1b2,_1b3){
var row=this._data[_1b2];
if(row){
var col=this._columnsHash?this._columnsHash[_1b3]:null;
if(col&&col.isCustomField){
if(col.expression){
return wm.expression.getValue(col.expression,row,this.owner);
}else{
if(col.formatFunc){
switch(col.formatFunc){
case "wm_date_formatter":
case "Date (WaveMaker)":
case "wm_localdate_formatter":
case "Local Date (WaveMaker)":
case "wm_time_formatter":
case "Time (WaveMaker)":
case "wm_number_formatter":
case "Number (WaveMaker)":
case "wm_currency_formatter":
case "Currency (WaveMaker)":
case "wm_image_formatter":
case "Image (WaveMaker)":
case "wm_link_formatter":
case "Link (WaveMaker)":
return undefined;
default:
if(!this.isDesignLoaded()){
return dojo.hitch(this.owner,col.formatFunc)("",_1b2,dojo.indexOf(this.columns,col),_1b3,{customStyles:[],customClasses:[]},row);
}
}
}
}
return undefined;
}else{
return row[_1b3];
}
}
return "";
},setCell:function(_1b4,_1b5,_1b6,_1b7){
var item=this.dataSet.getItem(_1b4);
item.beginUpdate();
item.setValue(_1b5,_1b6);
item.endUpdate();
var row=this._data[_1b4];
if(row){
row[_1b5]=_1b6;
if(!_1b7){
this.items[_1b4].setContent(row);
}
}
},getIsRowSelected:function(){
return !this.getEmptySelection();
},deleteRow:function(_1b8){
this.dataSet.removeItem(_1b8);
this._render();
},getRowCount:function(){
return this.items.length;
},addRow:function(_1b9,_1ba){
if(this.getRowCount()==0&&this.variable){
this.dataSet.setData([_1b9]);
if(_1ba){
this.select(0);
}
return;
}
var data=dojo.clone(_1b9);
var v=new wm.Variable({type:this.dataSet.type});
v.setData(data);
var _1bb=this.dataSet.getCount();
this.dataSet.addItem(v);
this.dataSet.getItem(_1bb).data._new=true;
if(_1ba||_1ba===undefined){
this.select(_1bb);
}
},addEmptyRow:function(_1bc){
var obj={};
var _1bd=false;
for(var i=0;i<this.columns.length;i++){
var _1be=this.columns[i];
var _1bf=_1be.field||_1be.id;
var _1c0=_1bf.split(".");
var _1c1=this.dataSet.type;
var type=wm.typeManager.getType(_1c1);
for(var _1c2=0;_1c2<_1c0.length;_1c2++){
if(type&&type.fields){
var _1c3=type.fields[_1c0[_1c2]];
if(_1c3){
_1c1=type.fields[_1c0[_1c2]].type;
type=wm.typeManager.getType(_1c1);
}else{
type="java.lang.String";
}
}
}
var _1c4=null;
switch(_1c1){
case "java.lang.Integer":
case "java.lang.Double":
case "java.lang.Float":
case "java.lang.Short":
_1c4=0;
break;
case "java.lang.Date":
_1c4=new Date().getTime();
_1bd=true;
break;
case "java.lang.Boolean":
_1c4=false;
break;
default:
_1c4="";
_1bd=true;
}
var _1c5=obj;
for(var _1c2=0;_1c2<_1c0.length;_1c2++){
if(_1c2+1<_1c0.length){
if(!_1c5[_1c0[_1c2]]){
_1c5[_1c0[_1c2]]={};
}
_1c5=_1c5[_1c0[_1c2]];
}else{
_1c5[_1c0[_1c2]]=_1c4;
}
}
}
this.addRow(obj,_1bc);
},getDataSet:function(){
return this.dataSet;
},setSortIndex:function(){
console.warn("setSortIndex not implemented for wm.List");
},setSortField:function(){
console.warn("setSortField not implemented for wm.List");
},setQuery:function(_1c6){
this.query=_1c6;
this.renderDataSet(this.dataSet);
},getColumnIndex:function(_1c7){
for(var i=0;i<this.columns.length;i++){
if(this.columns[i].field==_1c7||this.columsn[i].id==_1c7){
return i;
}
}
return -1;
},getColumnShowing:function(_1c8,_1c9,_1ca){
var _1cb=this.getColumnIndex(_1c8);
if(_1cb!=-1){
var c=this.columns[_1cb];
var show=this._useMobileColumn&&c.mobileColumn||!this._useMobileColumn&&c.show;
return show;
}
},setColumnShowing:function(_1cc,_1cd,_1ce){
var _1cf=this.getColumnIndex(_1cc);
if(_1cf!=-1&&this.columns[_1cf].show!=_1cd){
this.columns[_1cf].show=_1cd;
this.setColumns(this.columns);
this._setDataFields();
if(!_1ce){
this._render();
}
}
},setColumnWidth:function(_1d0,_1d1,_1d2){
this._columnsHash[_1d0].width=_1d1;
if(!_1d2){
this._render();
}
},getCellClass:function(_1d3,_1d4){
if(!this.columns){
return;
}
if(_1d3!=-1){
_1d3=this._formatIndex!=null?this._formatIndex:this.getCount();
var _1d5=this._dataFields[_1d4];
var col=this._columnsHash[_1d5];
var data=this._data[_1d3];
if(col.cssClass){
return wm.expression.getValue(col.cssClass,data,this.owner);
}
}
return "";
}});
if(wm.isMobile){
wm.DojoGrid=wm.List;
}
wm.FocusablePanelRegistry=[];
dojo.declare("wm.FocusableList",wm.List,{init:function(){
this.inherited(arguments);
wm.FocusablePanelRegistry.push(this);
dojo.connect(document,"keydown",this,"keydown");
},nextFocus:null,nextFocusableItemField:null,priorFocus:null,hasFocus:false,focusOnStart:false,focusEventTime:0,defaultFocusListIndex:0,getNextFocus:function(){
if(!(this.nextFocus instanceof Object)){
this.setNextFocus(this.nextFocus);
}
return this.nextFocus;
},setNextFocus:function(_1d6){
if(!(_1d6 instanceof Object)){
var tmp=this.getRoot()[_1d6];
this.nextFocus=tmp||this.nextFocus;
}else{
this.nextFocus=_1d6;
}
},getPriorFocus:function(){
if(!(this.priorFocus instanceof Object)){
this.setPriorFocus(this.priorFocus);
}
return this.priorFocus;
},setPriorFocus:function(_1d7){
if(!(_1d7 instanceof Object)){
this.priorFocus=this.getRoot()[_1d7];
}else{
this.priorFocus=_1d7;
}
},setFocus:function(_1d8,e){
this.focusEventTime=(e)?e.timeStamp:0;
this.hasFocus=_1d8;
if(_1d8){
this.show();
dojo.addClass(this.domNode,"wmselectedlist");
this.setBorderColor("rgb(0,0,160)");
for(var i=0;i<wm.FocusablePanelRegistry.length;i++){
if(wm.FocusablePanelRegistry[i]!=this){
wm.FocusablePanelRegistry[i].setFocus(false,e);
}
}
if(this.getSelectedIndex()==-1){
this.deselectAll(true);
if(this.defaultFocusListIndex!=-1){
this.eventSelect(this.getItem(this.defaultFocusListIndex));
}
}
if(this.getNextFocus() instanceof Object){
this.getNextFocus().show();
}
}else{
dojo.removeClass(this.domNode,"wmselectedlist");
this.setBorderColor("transparent");
}
},show:function(){
this.inherited(arguments);
var _1d9=this.parent;
while(_1d9&&!(_1d9 instanceof wm.Layer)){
_1d9=_1d9.parent;
}
if(this.autoShowLayer){
if(_1d9&&(_1d9 instanceof wm.Layer)&&!_1d9.active){
_1d9.parent.setLayer(_1d9);
}
}
},onclick:function(_1da,_1db){
this.inherited(arguments);
this.setFocus(true,_1da);
},eventSelect:function(_1dc){
if(this.nextFocusableItemField){
var data=_1dc.getData();
var _1dd=new wm.Object();
_1dd.data=data;
var next=_1dd.getValue("data."+this.nextFocusableItemField);
if(next){
this.setNextFocus(next);
if(this.getNextFocus() instanceof Object){
this.getNextFocus().show();
}
}
}
this.inherited(arguments);
},keydown:function(e){
if(e.target&&e.target.nodeName.toLowerCase()=="input"){
return;
}
if(!this.hasFocus||this.focusEventTime==e.timeStamp){
return;
}
if(e.ctrlKey||e.shiftKey){
return;
}
if(e.keyCode==dojo.keys.UP_ARROW){
var _1de=this.getSelectedIndex();
_1de=_1de-1;
if(_1de<0){
_1de=this.getCount()+_1de;
}
_1de=_1de%this.getCount();
this.deselectAll(true);
this.eventSelect(this.getItem(_1de));
dojo.stopEvent(e);
}else{
if(e.keyCode==dojo.keys.DOWN_ARROW){
var _1de=this.getSelectedIndex();
_1de=(_1de+1)%this.getCount();
this.deselectAll(true);
this.eventSelect(this.getItem(_1de));
dojo.stopEvent(e);
}else{
if(e.keyCode==dojo.keys.RIGHT_ARROW&&this.nextFocus){
this.getNextFocus().setFocus(true,e);
dojo.stopEvent(e);
}else{
if(e.keyCode==dojo.keys.LEFT_ARROW&&this.priorFocus){
this.deselectAll();
this.getPriorFocus().setFocus(true,e);
dojo.stopEvent(e);
if(this.nextFocus){
this.getNextFocus().hideNextChain();
}
}
}
}
}
},setDataSet:function(_1df){
this.inherited(arguments);
if(this.focusOnStart){
this.setFocus(true,0);
window.focus();
}
this.focusOnStart=false;
},hideNextChain:function(){
this.hide();
if(this.nextFocus){
this.getNextFocus().hideNextChain();
}
}});
dojo.declare("wm.FocusablePanel",wm.Container,{init:function(){
this.inherited(arguments);
wm.FocusablePanelRegistry.push(this);
dojo.connect(document,"keydown",this,"keydown");
dojo.connect(this.domNode,"click",this,"onclick");
if(this.focusOnStart){
this.setFocus(true,0);
}
},autoShowLayer:false,autoFormFocus:null,nextFocus:null,priorFocus:null,hasFocus:false,focusOnStart:false,focusEventTime:0,getNextFocus:function(){
if(!(this.nextFocus instanceof Object)){
this.setNextFocus(this.nextFocus);
}
return this.nextFocus;
},setNextFocus:function(_1e0){
if(!(_1e0 instanceof Object)){
var tmp=this.getRoot()[_1e0];
this.nextFocus=tmp||this.nextFocus;
}else{
this.nextFocus=_1e0;
}
},getPriorFocus:function(){
if(!(this.priorFocus instanceof Object)){
this.setPriorFocus(this.priorFocus);
}
return this.priorFocus;
},setPriorFocus:function(_1e1){
if(!(this.priorFocus instanceof Object)){
this.priorFocus=this.getRoot()[_1e1];
}else{
this.priorFocus=_1e1;
}
},setFocus:function(_1e2,e){
this.focusEventTime=e.timeStamp;
this.hasFocus=_1e2;
if(_1e2){
this.show();
this.setBorderColor("rgb(0,0,160)");
if(this.autoFormFocus){
this.getRoot()[this.autoFormFocus].focus();
}
for(var i=0;i<wm.FocusablePanelRegistry.length;i++){
if(wm.FocusablePanelRegistry[i]!=this){
wm.FocusablePanelRegistry[i].setFocus(false,e);
}
}
if(this.getNextFocus() instanceof Object){
this.getNextFocus().show();
}
}else{
this.setBorderColor("transparent");
}
},show:function(){
this.inherited(arguments);
var _1e3=this.parent;
while(_1e3&&!(_1e3 instanceof wm.Layer)){
_1e3=_1e3.parent;
}
if(this.autoShowLayer){
if(_1e3&&(_1e3 instanceof wm.Layer)&&!_1e3.active){
_1e3.parent.setLayer(_1e3);
}
}
},onclick:function(_1e4,_1e5){
this.inherited(arguments);
this.setFocus(true,_1e4);
},keydown:function(e){
if(e.target&&e.target.nodeName.toLowerCase()=="input"){
return;
}
if(!this.hasFocus||this.focusEventTime==e.timeStamp){
return;
}
if(e.ctrlKey||e.shiftKey){
return;
}
if(e.keyCode==dojo.keys.RIGHT_ARROW&&this.nextFocus){
this.getNextFocus().setFocus(true,e);
dojo.stopEvent(e);
}else{
if(e.keyCode==dojo.keys.LEFT_ARROW&&this.priorFocus){
this.getPriorFocus().setFocus(true,e);
dojo.stopEvent(e);
if(this.nextFocus){
this.getNextFocus().hideNextChain();
}
}else{
if(e.keyCode==dojo.keys.ENTER||e.keyCode==dojo.keys.NUMPAD_ENTER){
this.ondblclick({},this.selectedItem);
}
}
}
},hideNextChain:function(){
this.hide();
if(this.nextFocus){
this.getNextFocus().hideNextChain();
}
}});
}
