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

dojo.provide("wm.compressed.wm_trees");
if(!dojo._hasResource["wm.base.widget.Trees.Tree"]){
dojo._hasResource["wm.base.widget.Trees.Tree"]=true;
dojo.provide("wm.base.widget.Trees.Tree");
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
dojo.addOnLoad(function(){
wm.preloadImage(wm.theme.getImagesPath()+"tree_blank.gif");
});
wm.collapseNode=function(n,_1,_2,_3){
n.style.display="none";
return;
var v=_1||30,a=_2||5,i=_3||2,h=n._height=n.offsetHeight,s=n.style;
function _4(){
h-=(v+=a);
if(h<=0){
s.display="none";
s.height="";
}else{
s.height=h+"px";
setTimeout(_4,i);
}
};
_4();
};
wm.expandNode=function(n,_5,_6,_7){
if(n){
n.style.display="";
}
return;
var v=_5||30,a=_6||5,i=_7||2,h=0,s=n.style;
s.display="";
if(!n._height){
var ns=n.parentNode.style,o=ns.overflow;
ns.overflow="hidden";
n._height=n.offsetHeight;
s.height="1px";
ns.overflow=o;
}else{
s.height="1px";
}
function _8(){
h+=(v+=a);
s.height=h+"px";
if(n.offsetHeight+v>=n._height){
s.height="";
}else{
setTimeout(_8,i);
}
};
_8();
};
dojo.declare("wm.TreeNode",null,{images:{none:"tree_blank.gif",leaf:"tree_leaf.gif",closed:"tree_closed.gif",open:"tree_open.gif"},touchimages:{none:"tree_blank.gif",leaf:"tree_leaf.gif",closed:"touch_tree_closed.png",open:"touch_tree_open.png"},classes:{leaf:"wmtree-leaf",lastLeaf:"wmtree-last-leaf",lastItem:"wmtree-last-item",content:"wmtree-content",selected:"wmtree-selected",rootLeaf:"wmtree-root-leaf",rootLastLeaf:"wmtree-root-last-leaf",open:"wmtree-open"},closed:false,canSelect:true,constructor:function(_9,_a){
this.addParent(_9);
this.initProps(_a);
this.placeInParent();
if(!this.tree._updating){
this.render();
}
},destroy:function(){
this.forEachDescendant(function(n){
n._destroy();
});
this._destroy();
},destroy:function(){
if(this.isDestroyed){
return;
}
this.isDestroyed=true;
this.removeChildren();
if(this.tree.nodes[this.id]){
this.tree._removeNode(this);
}
if(this.parent){
if(this.parent instanceof wm.TreeNode){
this.parent.kids=wm.Array.removeElement(this.parent.kids,this);
delete this.parent;
}
wm.fire(this.parent,"_remove",[this]);
}
if(this!=this.tree.root){
var d=this.domNode;
dojo._destroyElement(d);
}
},addParent:function(_b){
this.parent=_b;
this.tree=_b.tree;
this.tree._addNode(this);
},initProps:function(_c){
_c=_c||{};
dojo.mixin(this,{kids:[],content:"",data:{},_data:{},imageRoot:this.tree._imageRoot},_c);
if(this.closed){
this._childrenRendered=false;
}
},placeInParent:function(){
var i=this.parentIndex;
if(i!==undefined){
this.parent.kids.splice(i,0,this);
}else{
this.parent.kids.push(this);
}
},render:function(){
this.createNode();
this.domNode.nodeId=this.id;
this.styleContent();
this.parent.renderChild(this);
if(this.selected){
this.tree.selected=this;
}
if(!this.closed){
this.initKids();
}
dojo.forEach(this.kids,dojo.hitch(function(_d,i){
var _e=_d.parentIndex;
if(_e!==undefined&&_e!==i){
if(_e>=this.domNode.childNodes.length){
this.domNode.appendChild(_d.domNode);
}else{
dojo.place(_d.domNode,this.domNode,"index");
}
}
}));
},createKidsNode:function(){
if(this.kidsNode){
return this.kidsNode;
}
var n=this.kidsNode=document.createElement("ul");
n.style.display=(this.closed?"none":"");
return n;
},formatImage:function(_f,_10){
_f=_f||this.image;
_10=_10||this.imageSize||16;
if(!_f||_f.indexOf(".")!=-1){
return _f?["<img src=\"",_f,"\" style=\"height: ",_10,"px; width: ",_10,"px;\">&nbsp;"].join(""):"";
}else{
return _f?["<img src=\"lib/wm/base/widget/themes/default/images/blank.gif\" class=\"",_f,"\" style=\"height: ",_10,"px; width: ",_10,"px;\">&nbsp;"].join(""):"";
}
},formatContent:function(){
var i=this.formatImage();
return [i,i?"&nbsp;":"",this.content].join("");
},createNode:function(){
var li=this.domNode=document.createElement("li");
li.innerHTML="<img/><span>"+this.formatContent()+"</span>";
this.btnNode=li.firstChild;
this.contentNode=this.btnNode.nextSibling;
},isLastChild:function(){
var k=this.parent.kids;
return this==k[k.length-1];
},isRoot:function(){
return (this.parent==this.tree.root)&&(this==this.tree.root.kids[0]);
},isSelected:function(){
return this==this.tree.selected;
},styleNode:function(){
var n=this.domNode,i=n.firstChild,_11=this.isLastChild(),_12=this.isRoot();
if(!n){
return;
}
var ic=(_11?this.classes.lastLeaf:this.classes.leaf);
if(_12){
ic=(_11?this.classes.rootLastLeaf:this.classes.rootLeaf);
}
if(i&&i.className!=ic){
i.className=ic;
}
var nc=(_11?this.classes.lastItem:"")+(this.closed?"":" "+this.classes.open);
if(n.className!=nc){
n.className=nc;
}
var _13=!this._childrenRendered&&(this.hasChildren||this._hasChildren||(this._data.children&&this._data.children.length));
this.styleContent();
this.parent.renderChild(this);
if(this.selected){
this.tree.selected=this.tree.multiSelect?[this]:this;
}
if(!this.closed){
this.initKids();
}
},createKidsNode:function(){
if(this.kidsNode){
return this.kidsNode;
}
var n=this.kidsNode=document.createElement("ul");
n.style.display=(this.closed?"none":"");
return n;
},formatImage:function(_14,_15){
_14=_14||this.image;
_15=_15||this.imageSize||16;
if(!_14||_14.indexOf(".")!=-1){
return _14?["<img src=\"",_14,"\" style=\"height: ",_15,"px; width: ",_15,"px;\">&nbsp;"].join(""):"";
}else{
return _14?["<img src=\"lib/wm/base/widget/themes/default/images/blank.gif\" class=\"",_14,"\" style=\"height: ",_15,"px; width: ",_15,"px;\">&nbsp;"].join(""):"";
}
},formatContent:function(){
var i=this.formatImage();
return [i,i?"&nbsp;":"",this.content].join("");
},createNode:function(){
var li=this.domNode=document.createElement("li");
li.innerHTML="<img/><span>"+this.formatContent()+"</span>";
this.btnNode=li.firstChild;
this.contentNode=this.btnNode.nextSibling;
},isLastChild:function(){
var k=this.parent.kids;
return this==k[k.length-1];
},isRoot:function(){
return (this.parent==this.tree.root)&&(this==this.tree.root.kids[0]);
},isSelected:function(){
return this.tree.multiSelect?dojo.indexOf(this.tree.selected,this)!=-1:this==this.tree.selected;
},styleNode:function(){
var n=this.domNode,i=n.firstChild,_16=this.isLastChild(),_17=this.isRoot();
if(!n){
return;
}
var ic=(_16?this.classes.lastLeaf:this.classes.leaf);
if(_17){
ic=(_16?this.classes.rootLastLeaf:this.classes.rootLeaf);
}
if(i&&i.className!=ic){
i.className=ic;
}
var nc=(_16?this.classes.lastItem:"")+(this.closed?"":" "+this.classes.open);
if(n.className!=nc){
n.className=nc;
}
var _18=!this._childrenRendered&&(this.hasChildren||this._hasChildren||(this._data.children&&this._data.children.length));
var img=!this.kids.length&&!_18?this.images.none:(this.closed?this.images.closed:this.images.open);
var s=this.imageRoot+img;
if(i&&i.src!=s){
i.src=s;
}
},styleNodeNoDom:function(){
var d=this.domNode,p=d.parentNode;
if(p){
p.removeChild(d);
}
this.styleNode();
if(p){
p.appendChild(d);
}
},renderChild:function(_19){
var i=dojo.indexOf(this.kids,_19);
if(i==-1){
_19.placeInParent(_19);
i=dojo.indexOf(this.kids,_19);
}
if(this.kids.length==1){
this.styleNode();
this.domNode.appendChild(this.createKidsNode());
}else{
if(i==this.kids.length-1){
var c=this.kids[this.kids.length-2];
c.styleNodeNoDom();
}else{
}
}
_19.styleNode();
dojo.setSelectable(_19.domNode,false);
if(i==this.kids.length-1){
this.createKidsNode().appendChild(_19.domNode);
}else{
this.createKidsNode().insertBefore(_19.domNode,this.kids[i+1].domNode);
}
},_findIndexInParent:function(_1a){
var _1b=_1a.parent;
if(_1b){
for(var i=0,l=_1b.kids.length,k;i<l&&(k=_1b.kids[i]);i++){
if(_1a==k){
return i;
}
}
}
return -1;
},remove:function(_1c){
_1c.destroy();
},_remove:function(_1d){
var i=this._findIndexInParent(_1d);
if(i>=0){
var _1e=(i==this.kids.length-1);
this.kids.splice(i,1);
if(_1e&&this.kids.length){
this.kids[this.kids.length-1].styleNode();
}
if(!this.kids.length){
this.styleNode();
}
return true;
}
},removeChildren:function(){
while(this.kids.length){
this.remove(this.kids[0]);
}
},initKids:function(){
if(!this._childrenRendered){
if(this.initNodeChildren){
this.initNodeChildren(this);
}else{
this.tree.initNodeChildren(this);
}
}
this._childrenRendered=true;
},setOpen:function(_1f){
this.initKids();
var c=this.closed;
this.closed=!_1f;
if(c!=this.closed&&this.kidsNode){
(this.closed?wm.collapseNode:wm.expandNode)(this.kidsNode);
}
this.styleNode();
},btnToggled:function(e){
this.tree.dispatchNodeEvent("Btnclick",this,e);
},mousedown:function(e){
},click:function(e){
if(e.target==this.btnNode){
this.btnToggled(e);
}else{
this.tree.dispatchNodeEvent("Click",this,e);
}
},dblclick:function(e){
this.tree.dispatchNodeEvent("Dblclick",this,e);
},styleContent:function(){
this.contentNode.className=this.classes.content;
if(this.selected){
this.contentNode.className+=" "+this.classes.selected;
}
},setContent:function(_20){
this.content=_20;
var c=this.formatContent(),n=this.contentNode;
if(n.nodeType==3){
n.nodeValue=c;
}else{
n.innerHTML=c;
}
},forEach:function(_21){
if(!_21){
return;
}
_21(this);
this.forEachDescendant(_21);
},forEachDescendant:function(_22){
for(var i=0,k,_23=this.kids;(k=_23[i]);i++){
k.forEach(_22);
}
},forEachChild:function(_24){
for(var i=0,k,_25=this.kids;(k=_25[i]);i++){
_24(k);
}
},hasDescendant:function(_26){
try{
if(_26(this)){
return true;
}
}
catch(e){
}
for(var i=0,k,_27=this.kids;(k=_27[i]);i++){
if(k.hasDescendant(_26)){
return true;
}
}
return false;
},findDescendant:function(_28){
try{
if(_28(this)){
return this;
}
}
catch(e){
}
for(var i=0,k,_29=this.kids;(k=_29[i]);i++){
var _2a=k.findDescendant(_28);
if(_2a){
return _2a;
}
}
return null;
},findChild:function(_2b){
for(var i=0,k,_2c=this.kids;(k=_2c[i]);i++){
if(_2b(k)){
return k;
}
}
return null;
},buildPathString:function(_2d){
if(this.parent==this.tree.root||this.parent==this.tree){
return "";
}
return this.parent.buildPathString(_2d)+"/"+this.data.getItemName();
},findDomNode:function(_2e){
if(this.domNode==_2e||this.contentNode==_2e){
return this;
}
for(var i=0;i<this.kids.length;i++){
var _2f=this.kids[i].findDomNode(_2e);
if(_2f){
return _2f;
}
}
return null;
}});
dojo.declare("wm.TreeCheckNode",wm.TreeNode,{checked:false,render:function(){
this.inherited(arguments);
this.setChecked(this.checked);
},createNode:function(){
var li=this.domNode=document.createElement("li");
li.innerHTML=["<img/><input type=\"checkbox\" style=\"margin: 0 4px 0 0; padding:0;\"",this.checked?" checked=\"yes\"":"","><span>"+this.formatContent()+"</span>"].join("");
this.btnNode=li.firstChild;
this.checkboxNode=this.btnNode.nextSibling;
this.contentNode=this.checkboxNode.nextSibling;
},click:function(e){
if(e.target==this.checkboxNode){
this.checkboxClick(e);
}else{
this.inherited(arguments);
}
},checkboxClick:function(e){
this.tree.dispatchNodeEvent("Checkboxclick",this,e);
},getChecked:function(_30){
return this.checkboxNode?this.checkboxNode.checked:this.checked;
},setChecked:function(_31){
this.checkboxNode.checked=_31;
},toggleChecked:function(){
this.setChecked(!this.checkBoxNode.checked);
}});
dojo.declare("wm.TreeRadioNode",wm.TreeCheckNode,{createNode:function(){
var li=this.domNode=document.createElement("li");
li.innerHTML=["<img/><input type=\"radio\" name=\""+this.tree.name+"\" style=\"margin: 0 4px 0 0; padding:0;\"",this.checked?" checked=\"yes\"":"","><span>"+this.formatContent()+"</span>"].join("");
this.btnNode=li.firstChild;
this.checkboxNode=this.btnNode.nextSibling;
this.contentNode=this.checkboxNode.nextSibling;
},click:function(e){
if(e.target==this.checkboxNode){
this.checkboxClick(e);
}else{
if(e.target==this.btnNode){
this.btnToggled(e);
}else{
this.checkboxNode.checked=true;
this.checkboxClick(e);
this.inherited(arguments);
}
}
}});
dojo.declare("wm.TreeTextNode",wm.TreeNode,{value:"",render:function(){
this.inherited(arguments);
},click:function(e){
if(e.target==this.inputNode){
this.inputNode.focus();
}else{
this.inherited(arguments);
}
},createNode:function(){
var li=this.domNode=document.createElement("li");
li.innerHTML=["<img/>","<span>"+this.formatContent()+"</span>","<input type=\"text\" style=\"margin: 0 4px 0 0; padding:0;\" value=\"",this.value,"\">"].join("");
this.btnNode=li.firstChild;
this.contentNode=this.btnNode.nextSibling;
this.inputNode=this.contentNode.nextSibling;
dojo.connect(this.inputNode,"onchange",this,"onChange");
},getValue:function(_32){
return this.inputNode?this.inputNode.value:this.value;
},setValue:function(_33){
this.inputNode.value=_33;
},onChange:function(){
}});
dojo.declare("wm.TreeRoot",wm.TreeNode,{render:function(_34){
this.domNode=this.tree.domNode;
},addParent:function(_35){
this.parent=this.tree=_35;
this.tree._addNode(this);
},styleNode:function(){
},placeInParent:function(){
}});
dojo.declare("wm.Tree",wm.Box,{width:"100%",height:"",connectors:true,selected:null,autoScroll:true,multiSelect:false,init:function(){
this.inherited(arguments);
if(this.multiSelect){
this.selected=[];
}
dojo.addClass(this.domNode,"wmtree");
this.setConnectors(this.connectors);
this._nodeId=0;
this.nodes=[];
this._imageRoot=wm.theme.getImagesPath();
this.root=new wm.TreeRoot(this,"");
this.connect(this.domNode,"onmousedown",this,"treeMouseDown");
this.connect(this.domNode,"onclick",this,"treeClick");
this.connect(this.domNode,"ondblclick",this,"treeDblClick");
},setConnectors:function(_36){
var c=this.connectors=_36;
dojo[c?"removeClass":"addClass"](this.domNode,"wmtree-noconnectors");
},setDisabled:function(_37){
this.inherited(arguments);
if(_37){
this.deselect();
}
dojo[_37?"addClass":"removeClass"](this.domNode,"wmtree-disabled");
},forEachNode:function(_38){
if(dojo.isFunction(_38)){
this.root.forEach(_38);
}
},clear:function(){
this._data={};
this._nodeId=0;
this.selected=this.multiSelect?[]:null;
this.domNode.innerHTML="";
this.nodes=[];
this.root.destroy();
this.root=new wm.TreeRoot(this,"");
},toggle:function(_39){
var old=this.selected,neo=this.selected=(old==_39?null:_39);
old&&old.styleContent();
(old!=neo)&&neo&&neo.styleContent();
},eventSelect:function(_3a,_3b,_3c){
var _3d={canSelect:true};
this._oncanselect(_3a,_3d);
if(_3a.canSelect&&_3d.canSelect){
this.select(_3a,_3b,_3c);
}
},addToSelection:function(_3e){
if(_3e){
var _3f=_3e.parent;
while(_3f&&_3f!=this.root){
if(_3f.closed){
_3f.setOpen(true);
}
_3f=_3f.parent;
}
if(this.multiSelect){
this.selected.push(_3e);
}else{
this.selected=_3e;
}
_3e.selected=true;
_3e.styleContent();
var n=_3e.domNode,d=this.domNode,fc=n.firstChild;
if(n&&d&&fc){
var _40=(n.offsetTop<d.scrollTop),_41=(n.offsetTop+fc.offsetHeight>d.scrollTop+d.offsetHeight);
if((_40||_41)&&wm.widgetIsShowing(this)){
n.scrollIntoView(false);
}
}
}
},_deselect:function(_42){
if(this.multiSelect){
if(_42){
wm.Array.removeElement(this.selected,_42);
_42.selected=null;
_42.styleContent();
}else{
dojo.forEach(this.selected,function(_43){
_43.selected=null;
_43.styleContent();
});
this.selected=[];
}
}else{
var old=this.selected;
if(old){
if(this.selected){
this.selected.selected=false;
}
this.selected=null;
old.styleContent();
}
}
},_select:function(_44){
this._deselect();
this.addToSelection(_44);
},deselect:function(_45,_46){
this._deselect(_45);
this.ondeselect(_45||this.selected,_46);
},select:function(_47,_48,_49){
if(this._inSelect){
return;
}
this._inSelect=true;
try{
if(!this.multiSelect){
if(this.selected!=_47){
this.deselect();
this.addToSelection(_47);
this.onselect(_47,_48,_49);
}else{
if(this.selected&&!this.selected.selected){
this.selected.selected=true;
this.selected.styleContent();
}
}
}else{
if(!_48&&!_49){
this.deselect();
}
var _4a=dojo.indexOf(this.selected,_47);
if((_48||_49)&&_4a!=-1){
this.deselect(_47,_48||_49);
}else{
if(_4a==-1){
if(_49||(!_49&&!_48)){
this.addToSelection(_47);
}else{
if(_48){
this._shiftSelect(_47);
}
}
this.onselect(_47,_48,_49);
}
}
}
}
catch(e){
console.error(e);
}
delete this._inSelect;
},_shiftSelect:function(_4b){
var _4c=_4b.parent;
var _4d=_4b._findIndexInParent(_4b);
var _4e=1000;
var _4f;
var _50=1000;
dojo.forEach(_4c.kids,function(kid,i){
if(dojo.indexOf(this.selected,kid)==-1){
return;
}
var _51=Math.abs(_4d-i);
if(_51<_50){
_4e=i;
_50=_51;
_4f=kid;
}
},this);
if(_4f){
for(var i=Math.min(_4e,_4d);i<=Math.max(_4e,_4d);i++){
var kid=_4c.kids[i];
if(dojo.indexOf(this.selected,kid)==-1){
this.addToSelection(kid);
}
}
}else{
this.addToSelection(_4b);
}
},initNodeChildren:function(_52){
this.oninitchildren(_52);
this.renderDataNode(_52,this.getNodeChildData(_52));
},getNodeChildData:function(_53){
return _53._data.children;
},_render:function(){
this.renderData(this._data);
},renderData:function(_54){
this.clear();
this._data=_54;
this.renderDataNode(this.root,this._data);
},renderDataNode:function(_55,_56){
if(!_56){
return;
}
_55._childrenRendered=true;
dojo.forEach(_56,dojo.hitch(this,function(d){
var p={data:d.data||d.content,_data:d,checked:d.checked,content:d.content,closed:d.closed,image:d.image,_childrenRendered:true},n=new wm[d.type=="checkbox"?"TreeCheckNode":"TreeNode"](_55,p);
if(d.children&&!d.closed){
this.renderDataNode(n,d.children);
}
}));
},_addNode:function(_57){
var id=this.makeNodeId();
_57.id=id;
this.nodes[id]=_57;
},_removeNode:function(_58){
this.nodes[_58.id]=null;
},makeNodeId:function(){
return this._nodeId++;
},findEventNode:function(e){
var n=e.target;
while(n.nodeId===undefined&&n!=this.domNode){
n=n.parentNode;
}
if(n.nodeId!==undefined){
return this.nodes[n.nodeId];
}
},treeMouseDown:function(e){
var n=this.findEventNode(e);
if(n){
n.mousedown(e);
this.onmousedown(e,n);
}
},treeClick:function(e){
var n=this.findEventNode(e);
if(n){
n.click(e);
}else{
this.deselect();
}
},treeDblClick:function(e){
var n=this.findEventNode(e);
if(n){
n.dblclick(e);
}
},dispatchNodeEvent:function(_59,_5a,_5b){
if(this.disabled){
_5b._treeHandled=true;
}else{
_5b.treeNode=_5a;
wm.fire(this,"node"+_59,[_5a,_5b]);
}
},nodeClick:function(_5c,_5d){
if(_5d._treeHandled){
return;
}
_5d._treeHandled=true;
this.eventSelect(_5c,_5d.shiftKey,_5d.ctrlKey||_5d.metaKey);
setTimeout(dojo.hitch(this,"onclick",_5c),1);
},nodeDblclick:function(_5e,_5f){
if(_5f._treeHandled){
return;
}
_5f._treeHandled=true;
wm.clearSelection();
this.ondblclick(_5e);
},nodeCheckboxclick:function(_60,_61){
if(_61._treeHandled){
return;
}
_61._treeHandled=true;
this.oncheckboxclick(_60,_61);
},nodeBtnclick:function(_62,_63){
if(_63._treeHandled){
return;
}
_63._treeHandled=true;
_62.setOpen(_62.closed);
},_nodeMatchesProps:function(_64,_65){
for(var i in _65){
if(_64[i]!=_65[i]){
return;
}
}
return true;
},findNode:function(_66,_67){
var n=_67||this.root;
for(var i=0,k,c;(k=n.kids[i]);i++){
if(this._nodeMatchesProps(k,_66)){
return k;
}else{
c=this.findNode(_66,k);
if(c){
return c;
}
}
}
},findTreeNode:function(_68,_69){
var n=_69||this.root;
for(var i=0,k,c;(k=n.kids[i]);i++){
if(_68==k.data){
return k;
}else{
c=this.findTreeNode(_68,k);
if(c){
return c;
}
}
}
},findNodeByCallback:function(_6a){
return this.root.findDescendant(_6a);
},findDomNode:function(_6b){
return this.root.findDomNode(_6b);
},onclick:function(_6c){
},_oncanselect:function(_6d,_6e){
},onmousedown:function(_6f){
},onselect:function(_70,_71,_72){
},ondeselect:function(_73,_74){
},oncheckboxclick:function(_75){
},ondblclick:function(_76){
},oninitchildren:function(_77){
}});
}
if(!dojo._hasResource["wm.base.widget.Trees.JSObjTreeNode"]){
dojo._hasResource["wm.base.widget.Trees.JSObjTreeNode"]=true;
dojo.provide("wm.base.widget.Trees.JSObjTreeNode");
dojo.declare("wm.JSObjTreeNode",wm.TreeNode,{closed:true,setContent:function(_78){
this.content=_78;
if(this.contentNode){
this.inherited(arguments);
}
},constructor:function(_79,_7a){
if(this.object!==undefined){
this.setObject(this.object);
}else{
this.setContent(this.prefix||"");
}
},setObject:function(_7b){
this.object=_7b;
var _7c=this.prefix;
_7c=(_7c)?_7c+":":"";
if(dojo.isArray(_7b)&&_7b.length==0){
this.setContent(_7c+"[]");
}else{
if(_7b===null||_7b===undefined){
this.setContent(_7c+""+String(_7b));
}else{
if(typeof _7b=="object"&&wm.isEmpty(_7b)){
this.setContent(_7c+"{}");
}else{
if(typeof _7b=="object"){
this.hasChildren=true;
var _7d="";
if(dojo.isArray(_7b)){
_7d="Array of length "+_7b.length;
}else{
try{
_7d=_7b instanceof wm.Component?_7b.getRuntimeId():_7b.toString();
}
catch(e){
_7d="{?}";
}
}
this.setContent(_7c+_7d);
this.styleNode();
}else{
this.setContent(_7c+_7b);
}
}
}
}
},initNodeChildren:function(_7e){
var _7f=this.object;
for(var i in _7f){
new wm.JSObjTreeNode(this,{prefix:i,object:_7f[i]});
}
}});
}
if(!dojo._hasResource["wm.base.widget.Trees.ObjectTree"]){
dojo._hasResource["wm.base.widget.Trees.ObjectTree"]=true;
dojo.provide("wm.base.widget.Trees.ObjectTree");
dojo.declare("wm.ObjectTree",wm.Tree,{data:null,postInit:function(){
this.inherited(arguments);
if(this.data){
this.setData(this.data);
}
},setData:function(_80){
if(dojo.isString(_80)){
_80=dojo.fromJson(_80);
}
this.data=_80;
this.root.destroy();
this.root=new wm.JSPrettyObjTreeRootNode(this,{prefix:"",object:_80});
this.root.setOpen(true);
},makePropEdit:function(_81,_82,_83){
switch(_81){
case "data":
if(!_82){
_82="";
}else{
if(!dojo.isString(_82)){
_82=dojo.toJson(_82);
}
}
return new wm.LargeTextArea(dojo.mixin(_83,{height:"300px",dataValue:_82}));
}
return this.inherited(arguments);
},onselect:function(_84,_85){
},select:function(_86){
if(this.selected!=_86){
this.deselect();
this.addToSelection(_86);
this.onselect(_86,_86.object||_86.content);
}
}});
dojo.declare("wm.JSPrettyObjTreeNode",wm.JSObjTreeNode,{setObject:function(_87){
this.object=_87;
var _88=this.prefix;
if(dojo.isArray(_87)&&_87.length==0){
this.setContent(_88+": none");
}else{
if(_87===null||_87===undefined){
this.setContent(_88+": none");
}else{
if(typeof _87=="object"&&wm.isEmpty(_87)){
this.setContent(_88+": none");
}else{
if(typeof _87=="object"){
this.hasChildren=true;
var _89="";
if(dojo.isArray(_87)){
_89="";
}
if(_89){
this.setContent(_88+": "+_89);
}else{
this.setContent(_88);
}
this.styleNode();
}else{
if(_88){
_88+=": ";
}
this.setContent(_88+_87);
}
}
}
}
},getPropertyCount:function(){
var i=0;
for(prop in this.object){
i++;
}
return i;
},initNodeChildren:function(_8a,_8b){
var _8c=this.object;
var _8d=dojo.isArray(_8c);
for(var i in _8c){
if(_8d&&dojo.isObject(_8c[i])){
var p=this.prefix;
this.object=_8c[i];
this.initNodeChildren(_8a,_8b||parseInt(i)+1);
this.object=_8c;
}else{
var _8e;
if(_8b){
_8e=_8b+": "+i;
_8b++;
}else{
if(_8d){
_8e=parseInt(i)+1;
}else{
_8e=i;
}
}
new wm.JSPrettyObjTreeNode(this,{prefix:_8e,object:_8c[i]});
}
}
}});
dojo.declare("wm.JSPrettyObjTreeRootNode",[wm.JSPrettyObjTreeNode,wm.TreeRoot],{});
wm.ObjectBrowserTree=wm.ObjectTree;
}
if(!dojo._hasResource["wm.base.widget.Trees.PropertyTree"]){
dojo._hasResource["wm.base.widget.Trees.PropertyTree"]=true;
dojo.provide("wm.base.widget.Trees.PropertyTree");
dojo.declare("wm.PropertyTree",wm.Tree,{dataSet:"",configJson:"",_treeConfig:null,selectedItem:null,init:function(){
this.inherited(arguments);
this.selectedItem=new wm.Variable({name:"selectedItem",owner:this});
this.setConfigJson(this.configJson);
this.setDataSet(this.dataSet);
},setConfigJson:function(_8f){
this.configJson=_8f;
try{
this._treeConfig=eval("("+_8f+")");
this.buildTree();
}
catch(e){
console.error("Json error in "+this.name+": "+e);
}
},setDataSet:function(_90){
this.dataSet=_90;
if(_90){
this.selectedItem.setType(_90.type);
}
this.buildTree();
},set_dataSet:function(_91){
if(_91&&!(_91 instanceof wm.Variable)){
var ds=this.getValueById(_91);
if(ds){
this.components.binding.addWire("","dataSet",ds.getId());
}
}else{
this.setDataSet(_91);
}
},clear:function(){
this.inherited(arguments);
this.selectedItem.clearData();
},buildTree:function(){
this.clear();
if(!this.dataSet||!this._treeConfig){
return;
}
var _92=this.dataSet.getCount();
for(var i=0;i<_92;i++){
var _93=this.dataSet.getItem(i);
var _94=this._treeConfig.childNodes;
var _95=!wm.isEmpty(_94);
var _96;
if(this._treeConfig.displayExpression){
_96=wm.expression.getValue(this._treeConfig.displayExpression,_93,this.owner);
}else{
_96=_93.getValue(this._treeConfig.displayField);
}
var _97=new wm.TreeNode(this.root,{closed:true,data:_93,dataValue:null,_nodeConfig:_94,content:_96});
if(_95){
var _98=new wm.TreeNode(_97,{close:true,content:"_PLACEHOLDER"});
}
}
},buildSubTree:function(_99){
var _9a=_99._nodeConfig;
for(var _9b in _9a){
var _9c=_99.data.getValue(_9b);
if(_9c instanceof wm.Variable){
var _9d=_9c;
var _9e=_9a[_9b];
var _9f=_9e.childNodes;
var _a0=!wm.isEmpty(_9f);
if(_9d.isList){
var _a1=_9d.getCount();
for(var i=0;i<_a1;i++){
var _a2=_9d.getItem(i);
var _a3;
if(_9e.displayExpression){
_a3=wm.expression.getValue(_9e.displayExpression,_a2,this.owner);
}else{
_a3=_a2.getValue(_9e.displayField);
}
var _a4=new wm.TreeNode(_99,{closed:true,data:_a2,propertyName:_9b,dataValue:null,_nodeConfig:_9f,content:_a3});
if(_a0){
var _a5=new wm.TreeNode(_a4,{close:true,content:"_PLACEHOLDER"});
}
}
}else{
var _a3;
var _a2=_9d;
if(_9e.displayExpression){
_a3=wm.expression.getValue(_9e.displayExpression,_a2);
}else{
_a3=_a2.getValue(_9e.displayField);
}
var _a4=new wm.TreeNode(_99,{closed:true,data:_9d,propertyName:_9b,dataValue:null,_nodeConfig:_9f,content:_a3});
if(_a0){
var _a5=new wm.TreeNode(_a4,{closed:true,content:"_PLACEHOLDER"});
}
}
}else{
var _a3;
if(_9a[_9b].displayExpression){
_a3=wm.expression.getValue(_9a[_9b].displayExpression,_99.data,this.owner);
}else{
_a3=_9c;
}
var _a4=new wm.TreeNode(_99,{closed:true,data:_99.data,propertyName:_9b,dataValue:_9c,content:_a3});
}
}
},initNodeChildren:function(_a6){
if(_a6.kids.length==1&&_a6.kids[0].content=="_PLACEHOLDER"){
_a6.remove(_a6.kids[0]);
this.buildSubTree(_a6);
}
},select:function(_a7){
if(this.selected!=_a7){
this.deselect();
this.addToSelection(_a7);
this.selectedItem.setData(_a7.data);
var _a8=[_a7.data];
var _a9=_a7.parent;
while(_a9!=this.root){
if(dojo.indexOf(_a8,_a9.data)==-1){
_a8.push(_a9.data);
}
_a9=_a9.parent;
}
this.onselect(_a7,_a8,_a7.propertyName,_a7.dataValue);
}
},onselect:function(_aa,_ab,_ac,_ad){
},_end:0});
}
if(!dojo._hasResource["wm.base.widget.Trees.DraggableTree"]){
dojo._hasResource["wm.base.widget.Trees.DraggableTree"]=true;
dojo.provide("wm.base.widget.Trees.DraggableTree");
dojo.declare("wm.DraggableTree",wm.Tree,{dragEnabled:true,classNames:"wmtree wmdraggabletree",dropBetweenNodes:false,init:function(){
this.inherited(arguments);
this.connect(this.domNode,"onmouseup",this,"treeMouseUp");
},postInit:function(){
this.inherited(arguments);
this.dragger=new wm.DraggableTreeMover();
this.dragger.ondrop=dojo.hitch(this,"nodeDrop");
this.dragger.manager=this;
},setNoDrop:function(_ae,_af){
_ae.noDrop=_af;
dojo.toggleClass(_ae.contentNode,"noDrop",_af);
},getNoDrop:function(_b0){
return _b0.noDrop;
},nodeDrop:function(){
dojo.query(".dndHover",this.root.domNode).removeClass("dndHover");
if(this.dropBetweenNodes){
dojo.query(".dndHoverTop",this.root.domNode).removeClass("dndHoverTop");
dojo.query(".dndHoverBottom",this.root.domNode).removeClass("dndHoverBottom");
}
this.dragger.mouseUp();
var _b1=!this.multiSelect||this.selected.length===0?this.draggedItem:this.selected;
if(_b1.length>1){
_b1=_b1.sort(dojo.hitch(this,function(a,b){
if(a.parent===b.parent){
return wm.data.compareNumbers(a._findIndexInParent(a),b._findIndexInParent(b));
}else{
return wm.data.compareNumbers(dojo.indexOf(this.selected,a),dojo.indexOf(this.selected,b));
}
}));
}
var _b2=this.dragger.target;
dojo.forEach(_b1,function(_b3){
if(!_b2||this.getNoDrop(_b2)&&!this.dropBetweenNodes){
return;
}
if(this.dropBetweenNodes){
var _b4=!this.getNoDrop(_b2.parent);
var _b5;
switch(this.dragger.targetArea){
case "top":
if(_b4){
_b5=dojo.indexOf(_b2.parent.kids,_b2);
_b2=_b2.parent;
}else{
if(!this.getNoDrop(_b2)){
_b5=_b2.kids.length;
}else{
return;
}
}
break;
case "mid":
if(!this.getNoDrop(_b2)){
_b5=_b2.kids.length;
}else{
_b5=dojo.indexOf(_b2.parent.kids,_b2)+1;
_b2=_b2.parent;
}
break;
case "bot":
if(!this.getNoDrop(_b2)&&!_b2.closed&&_b2.kids){
if(_b2.declaredClass=="wm.TreeNode"&&_b2.kids.length==0){
_b5=dojo.indexOf(_b2.parent.kids,_b2)+1;
_b2=_b2.parent;
}else{
_b5=0;
}
}else{
if(_b4){
_b5=dojo.indexOf(_b2.parent.kids,_b2)+1;
_b2=_b2.parent;
}else{
return;
}
}
}
_b3.parentIndex=_b5;
}
var _b6={result:true};
this.onCanDropNode(_b3,_b2,_b5,_b7,_b6);
if(!_b6.result){
return false;
}
var _b7=_b3.parent;
_b7._remove(_b3);
_b3.addParent(_b2);
_b2.renderChild(_b3);
this.onNodeDrop(_b3,_b2,_b5,_b7);
},this);
},onNodeDrop:function(_b8,_b9,_ba,_bb){
},onCanDropNode:function(_bc,_bd,_be,_bf,_c0){
},treeMouseDown:function(e){
var _c1=this.findEventNode(e);
if(_c1!=null&&!_c1.isRoot()){
this.drag(_c1,e);
}
},drag:function(_c2,_c3){
this.dragger.root=this.root;
this.draggedItem=_c2;
if(this.dragEnabled){
this.dragger.beginDrag(_c3,{caption:_c2.content,control:_c2});
}
},treeMouseUp:function(_c4,_c5,_c6){
this.dragger.drag();
},_end:0});
dojo.declare("wm.DraggableTreeMover",wm.DragDropper,{constructor:function(){
this.info={};
this.hoverStyleNodes=[];
},beginDrag:function(_c7,_c8){
this.info=_c8||this.info;
this.mousedown(_c7);
},initNodes:function(){
this.inherited(arguments);
this.markNode=document.createElement("div");
this.markNode.style.cssText="position: absolute; z-index: 2; border: 2px solid green;";
this.scrimNode.appendChild(this.markNode);
this.hSnapNode=document.createElement("div");
this.hSnapNode.style.cssText="position: absolute; z-index: 2; border: 1px dotted red; display: none;";
this.scrimNode.appendChild(this.hSnapNode);
this.vSnapNode=document.createElement("div");
this.vSnapNode.style.cssText="position: absolute; z-index: 2; border: 1px dotted red; display: none;";
this.scrimNode.appendChild(this.vSnapNode);
},start:function(e){
this.target=null;
kit._setMarginBox(this.markNode,0,0,0,0);
this.rootOffset=wm.calcOffset(this.root.domNode,this.scrimNode);
this.inherited(arguments);
this.setTarget(null);
},drag:function(e){
this.inherited(arguments);
if(!this.rootOffset){
return;
}
var r={l:this.pxp-this.rootOffset.x,t:this.pyp-this.rootOffset.y,w:0,h:0};
this.findTarget(r);
},mouseUp:function(){
if(this.target){
dojo.removeClass(this.target.domNode,"dndHover");
}
},drop:function(e){
dojo.query(".dndHover").removeClass("dndHover");
this.inherited(arguments);
},setTarget:function(_c9){
dojo.forEach(this.hoverStyleNodes,function(e){
dojo.removeClass(e,"dndHoverTop");
dojo.removeClass(e,"dndHoverBottom");
});
if(this.target){
dojo.removeClass(this.target.domNode,"dndHover");
}
this.target=_c9;
if(this.target&&(this.manager.dropBetweenNodes||!this.manager.getNoDrop(this.target))){
this.setCursor("move");
this.targetNode=this.target.domNode;
dojo.query(".dndHover",this.root.domNode).removeClass("dndHover");
dojo.addClass(this.target.domNode,"dndHover");
}else{
this.setCursor("no-drop");
this.targetNode=null;
dojo.query(".dndHover",this.root.domNode).removeClass("dndHover");
}
},setTargetArea:function(_ca){
if(!this.manager.dropBetweenNodes){
return;
}
this.targetArea=_ca;
dojo.forEach(this.hoverStyleNodes,function(e){
dojo.removeClass(e,"dndHoverTop");
dojo.removeClass(e,"dndHoverBottom");
});
this.hoverStyleNodes=[];
switch(_ca){
case "top":
dojo.addClass(this.target.domNode,"dndHover");
dojo.addClass(this.target.domNode,"dndHoverTop");
this.hoverStyleNodes.push(this.target.domNode);
break;
case "bot":
if(!this.target.closed&&this.target.kids&&this.target.kids.length&&!this.manager.getNoDrop(this.target)){
dojo.removeClass(this.target.domNode,"dndHover");
dojo.addClass(this.target.kids[0].domNode,"dndHoverTop");
this.hoverStyleNodes.push(this.target.kids[0].domNode);
}else{
dojo.addClass(this.target.domNode,"dndHover");
dojo.addClass(this.target.domNode,"dndHoverBottom");
this.hoverStyleNodes.push(this.target.domNode);
}
break;
case "mid":
dojo.addClass(this.target.domNode,"dndHover");
if(this.manager.getNoDrop(this.target)){
dojo.addClass(this.target.domNode,"dndHoverBottom");
this.hoverStyleNodes.push(this.target.domNode);
}
}
},updateAvatar:function(){
this.showHideAvatar(true);
if(!this.target){
this.setAvatarContent("Moving <b>"+this.info.caption+"</b>");
}else{
var dn=this.target.content;
var _cb="Drop <b>"+this.info.caption+"</b>";
if(!this.manager.dropBetweenNodes){
_cb+=" into ";
}else{
var _cc=!this.manager.getNoDrop(this.target.parent);
switch(this.targetArea){
case "top":
if(_cc){
var _cd=dojo.indexOf(this.target.parent.kids,this.target);
var _ce;
if(_cd>0){
_ce=this.target.parent.kids[_cd-1];
dn=_ce.content;
_cb+=" after ";
}else{
_ce=this.target.parent;
dn=_ce.content;
_cb+=" first child of ";
}
}else{
if(!this.manager.getNoDrop(this.target)){
_cb+=" into ";
}else{
this.setAvatarContent("Moving <b>"+this.info.caption+"</b>");
return;
}
}
break;
case "bot":
if(!this.target.closed&&!this.manager.getNoDrop(this.target)){
if(this.target.declaredClass=="wm.TreeNode"&&this.target.kids.length==0){
_cb+=" after ";
}else{
_cb+=" first child of ";
}
}else{
if(_cc){
_cb+=" after ";
}else{
this.setAvatarContent("Moving <b>"+this.info.caption+"</b>");
return;
}
}
break;
case "mid":
if(!this.manager.getNoDrop(this.target)){
_cb+=" into ";
}else{
if(_cc){
_cb+=" after ";
}else{
this.setAvatarContent("Moving <b>"+this.info.caption+"</b>");
return;
}
}
break;
}
}
this.setAvatarContent(_cb+" <b>"+dn+"</b>");
}
},findTarget:function(_cf){
var t;
if(this.targetInRoot(_cf)){
t=this._findTarget(_cf,this.root);
}else{
t=null;
}
if(t==this.manager.draggedItem){
t=null;
}
if(t!=this.target){
this.setTarget(t);
if(this.target){
this.setTargetArea(this._targetArea);
}
}else{
if(this.target&&this.targetArea!=this._targetArea){
this.setTargetArea(this._targetArea);
}
}
this.updateAvatar();
},_findTarget:function(_d0){
var _d1=dojo.query("#"+this.manager.domNode.id+" .wmtree-content").filter(dojo.hitch(this,function(_d2){
if(this.manager.dropBetweenNodes||!dojo.hasClass(_d2,"noDrop")){
var loc=dojo.coords(_d2);
var inY=loc.t<_d0.t&&loc.t+loc.h>_d0.t;
var inX=loc.l<_d0.l&&loc.l+loc.w>_d0.l;
return (inY&&inX);
}
}));
if(_d1.length==0){
return null;
}
var _d3=_d1[_d1.length-1];
var _d4=dojo.coords(_d3);
var _d5=Math.floor(_d4.h/3);
var y=_d0.t-_d4.t;
if(y<=_d5){
this._targetArea="top";
}else{
if(y<=_d5*2){
this._targetArea="mid";
}else{
this._targetArea="bot";
}
}
var _d6=this.root.findDomNode(_d3);
return _d6;
},targetInRoot:function(_d7){
var h=_d7;
var b=wm.calcOffset(this.draggedItem,this.manager.root.domNode);
var _d8=!(h.l<0||h.t<0||h.l>b.w||h.t>b.h);
return _d8;
}});
}
