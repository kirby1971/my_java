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

dojo.provide("wm.compressed.wm_gadgets");
if(!dojo._hasResource["wm.base.widget.IFrame"]){
dojo._hasResource["wm.base.widget.IFrame"]=true;
dojo.provide("wm.base.widget.IFrame");
dojo.declare("wm.IFrame",wm.Control,{scrim:true,source:"",build:function(){
this.frame=document.createElement("iframe");
this.domNode=dojo.byId(this.domNode||this.id||undefined);
if(!this.domNode){
this.domNode=this.frame;
}else{
this.domNode.appendChild(this.frame);
}
},init:function(){
dojo.addClass(this.domNode,"wmiframe");
this.inherited(arguments);
this.setSource(this.getSource());
},buildCssSetterObj:function(){
var _1=this.inherited(arguments);
_1.overflow="";
_1.overflowX="";
_1.overflowY="";
return _1;
},getSource:function(){
return this.source;
},setSource:function(_2){
if(!dojo.isString(_2)||_2=="undefined"){
_2="";
}
this.source=_2;
var _3=this.source.slice(0,4)!="http"&&this.source.slice(0,1)!="/"?this.getPath():"";
this.frame.src=this.source?_3+this.source:this.source;
this.valueChanged("source",this.source);
},toHtml:function(){
return "<iframe src='"+this.source+"'></iframe>";
}});
}
if(!dojo._hasResource["wm.base.widget.gadget.Gadget"]){
dojo._hasResource["wm.base.widget.gadget.Gadget"]=true;
dojo.provide("wm.base.widget.gadget.Gadget");
dojo.declare("wm.Gadget",wm.IFrame,{width:"268px",height:"246px",update:function(){
this.setSource(this.source);
}});
wm.Object.extendSchema(wm.Gadget,{source:{ignore:1}});
}
if(!dojo._hasResource["wm.base.widget.gadget.Stocks"]){
dojo._hasResource["wm.base.widget.gadget.Stocks"]=true;
dojo.provide("wm.base.widget.gadget.Stocks");
dojo.declare("wm.gadget.Stocks",wm.Gadget,{ticker:"GOOG",source:"http://gmodules.com/ig/ifr?url=http://www.tigersyard.com/gadgets/stock.xml&up_price1=200&up_refreshtime=1000&up_symbol1=GOOG&up_shares1=5&up_link=google&synd=open&w=320&h=190&title=Stocks&border=%23ffffff%7C3px%2C1px+solid+%23999999",setTicker:function(_4){
this.ticker=_4;
this.update();
},update:function(){
var rx=new RegExp("up_symbol1=[^&]*&","g");
this.source=this.source.replace(rx,"up_symbol1="+this.ticker+"&");
this.inherited(arguments);
}});
wm.Object.extendSchema(wm.gadget.Stocks,{ticker:{bindable:1,type:"String"}});
}
if(!dojo._hasResource["wm.base.widget.gadget.Weather"]){
dojo._hasResource["wm.base.widget.gadget.Weather"]=true;
dojo.provide("wm.base.widget.gadget.Weather");
dojo.declare("wm.gadget.Weather",wm.Gadget,{zip:"94105",source:"http://gmodules.com/ig/ifr?url=http://www.labpixies.com/campaigns/weather/weather.xml&up_degree_unit_type=0&up_city_code=none&up_zip_code=94105&synd=open&w=320&h=224&title=Live+Weather&border=%23ffffff%7C3px%2C1px+solid+%23999999",setZip:function(_5){
this.zip=_5;
this.update();
},update:function(){
var rx=new RegExp("up_zip_code=[^&]*&","g");
this.source=this.source.replace(rx,"up_zip_code="+this.zip+"&");
this.inherited(arguments);
}});
wm.Object.extendSchema(wm.gadget.Weather,{zip:{bindable:1,type:"String"}});
}
if(!dojo._hasResource["wm.base.widget.gadget.YouTube"]){
dojo._hasResource["wm.base.widget.gadget.YouTube"]=true;
dojo.provide("wm.base.widget.gadget.YouTube");
dojo.declare("wm.gadget.YouTube",wm.Gadget,{videoId:"https://youtu.be/Zmqu39fzPxY",autoScroll:true,build:function(){
this.inherited(arguments);
dojo.attr(this.domNode,"frameborder",0);
dojo.attr(this.domNode,"allowfullscreen","true");
},getSource:function(){
if(!this.videoId||this._isDesignLoaded){
return "";
}
var id=this.videoId||"";
id=id.replace(/^.*\//,"");
id=id.replace(/^watch\?v\=/,"");
return "https://www.youtube.com/embed/"+id;
},setVideoId:function(_6){
this.videoId=_6;
this.setSource(this.getSource());
}});
wm.Object.extendSchema(wm.gadget.YouTube,{videoId:{bindTarget:1,group:"display",subgroup:"behavior",requiredGroup:1}});
}
if(!dojo._hasResource["wm.base.widget.gadget.Facebook"]){
dojo._hasResource["wm.base.widget.gadget.Facebook"]=true;
dojo.provide("wm.base.widget.gadget.Facebook");
dojo.declare("wm.gadget.Facebook",wm.Gadget,{});
dojo.declare("wm.gadget.FacebookLikeButton",wm.gadget.Facebook,{width:"400px",height:"100px",base_source:"http://www.facebook.com/plugins/like.php",href:"",layout:"standard",show_faces:true,action:"like",font:"arial",colorscheme:"dark",ref:"",updateSource:function(){
var b=this.getContentBounds();
this._width=b.w;
this._height=b.h;
this.source=this.base_source+"?"+"href="+this.href+"&layout="+this.layout+"&show_faces="+this.show_faces+"&action="+this.action+"&font="+this.font+"&width="+this._width+"&height="+this._height+"&ref="+this.ref+"&colorscheme="+this.colorscheme;
this.setSource(this.source);
},renderBounds:function(){
this.inherited(arguments);
var b=this.getContentBounds();
if(b.w!=this._width||b.h!=this._height){
this.updateSource();
}
},setHref:function(_7){
this.href=_7;
this.updateSource();
},setLayout:function(_8){
this.layout=_8;
switch(_8){
case "box_count":
this.setWidth(87+this.padBorderMargin.r+this.padBorderMargin.l+"px");
this.setHeight(62+this.padBorderMargin.t+this.padBorderMargin.b+"px");
break;
case "button_count":
this.setWidth(70+this.padBorderMargin.r+this.padBorderMargin.l+"px");
this.setHeight(21+this.padBorderMargin.t+this.padBorderMargin.b+"px");
break;
case "standard":
if(this.bounds.w<150){
this.setWidth(400+this.padBorderMargin.r+this.padBorderMargin.l+"px");
}
if(this.bounds.h<50){
this.setHeight(80+this.padBorderMargin.t+this.padBorderMargin.b+"px");
}
break;
}
this.updateSource();
},setShow_Faces:function(_9){
this.show_faces=_9;
this.updateSource();
},setAction:function(_a){
this.action=_a;
this.updateSource();
},setFont:function(_b){
this.font=_b;
this.updateSource();
},setColorscheme:function(_c){
this.colorscheme=_c;
this.updateSource();
}});
dojo.declare("wm.gadget.FacebookActivityFeed",wm.gadget.Facebook,{width:"200px",height:"400px",base_source:"http://www.facebook.com/plugins/activity.php",site:"wavemaker.com",showHeader:true,font:"arial",colorscheme:"dark",showRecommendations:false,ref:"",updateSource:function(){
var b=this.getContentBounds();
this._width=b.w;
this._height=b.h;
this.source=this.base_source+"?"+"site="+this.site+"&header="+this.showHeader+"&recommendations="+this.showRecommendations+"&font="+this.font+"&width="+this._width+"&height="+this._height+"&ref="+this.ref+"&colorscheme="+this.colorscheme;
this.setSource(this.source);
},renderBounds:function(){
this.inherited(arguments);
var b=this.getContentBounds();
if(b.w!=this._width||b.h!=this._height){
this.updateSource();
}
},setSite:function(_d){
this.site=_d;
this.updateSource();
},setShowHeader:function(_e){
this.showHeader=_e;
this.updateSource();
},setShowRecommendations:function(_f){
this.showRecommendations=_f;
this.updateSource();
},setFont:function(_10){
this.font=_10;
this.updateSource();
},setColorscheme:function(_11){
this.colorscheme=_11;
this.updateSource();
}});
}
if(!dojo._hasResource["wm.base.widget.gadget.TwitterGadgets"]){
dojo._hasResource["wm.base.widget.gadget.TwitterGadgets"]=true;
dojo.provide("wm.base.widget.gadget.TwitterGadgets");
dojo.declare("wm.gadget.TwitterFollowButton",wm.Gadget,{scrim:true,autoScroll:false,width:"300px",height:"20px",screenName:"WaveMakerDev",showFollowerCount:true,buttonColor:"blue",linkColor:"",textColor:"",build:function(){
this.inherited(arguments);
dojo.attr(this.domNode,"frameborder",0);
dojo.attr(this.domNode,"scrolling","no");
dojo.attr(this.domNode,"allowtransparency","true");
},getSource:function(){
return "https://platform.twitter.com/widgets/follow_button.html?"+"screen_name="+this.screenName+"&button="+this.buttonColor+(this.linkColor?"&link_color="+this.linkColor.substring(1):"")+(this.textColor?"&text_color="+this.textColor.substring(1):"")+"&show_count="+this.showFollowerCount+"&lang="+dojo.locale;
},setScreenName:function(_12){
this.screenName=_12;
this.setSource(this.getSource());
},setButtonColor:function(_13){
this.buttonColor=_13;
this.setSource(this.getSource());
},setLinkColor:function(_14){
this.linkColor=_14;
this.setSource(this.getSource());
},setTextColor:function(_15){
this.textColor=_15;
this.setSource(this.getSource());
},setShowFollowerCount:function(_16){
this.showFollowerCount=Boolean(_16);
this.setSource(this.getSource());
}});
wm.Object.extendSchema(wm.gadget.TwitterFollowButton,{screenName:{bindTarget:1,group:"widgetName",subgroup:"data"},buttonColor:{group:"widgetName",subgroup:"style",options:["blue","grey"]},showFollowerCount:{group:"widgetName",subgroup:"layout",type:"Boolean"},linkColor:{group:"widgetName",subgroup:"style",editor:"wm.ColorPicker"},textColor:{group:"widgetName",subgroup:"style",editor:"wm.ColorPicker"}});
dojo.declare("wm.gadget.TwitterTweetButton",wm.Gadget,{scrim:true,autoScroll:false,width:"100px",height:"20px",url:"http://dev.wavemaker.com/",via:"",countPosition:"horizontal",build:function(){
this.inherited(arguments);
dojo.attr(this.domNode,"frameborder",0);
dojo.attr(this.domNode,"scrolling","no");
dojo.attr(this.domNode,"allowtransparency","true");
},getSource:function(){
return "https://platform.twitter.com/widgets/tweet_button.html?"+"url="+escape(this.url)+"&count="+this.countPosition+(this.via?"&via="+this.via:"");
},setUrl:function(_17){
this.url=_17;
this.setSource(this.getSource());
},setVia:function(_18){
this.via=_18;
this.setSource(this.getSource());
},setCountPosition:function(_19){
this.countPosition=_19;
this.setSource(this.getSource());
if(this._isDesignLoaded){
switch(_19){
case "vertical":
this.setWidth("56px");
this.setHeight("63px");
break;
case "horizontal":
this.setWidth("100px");
this.setHeight("20px");
break;
case "none":
this.setWidth("55px");
this.setHeight("20px");
break;
}
}
}});
wm.Object.extendSchema(wm.gadget.TwitterTweetButton,{url:{bindTarget:1,group:"widgetName",subgroup:"data"},via:{bindTarget:1,group:"widgetName",subgroup:"data"},countPosition:{group:"widgetName",subgroup:"layout",options:["none","horizontal","vertical"]}});
}
if(!dojo._hasResource["wm.base.widget.gadget.GoogleMap"]){
dojo._hasResource["wm.base.widget.gadget.GoogleMap"]=true;
dojo.provide("wm.base.widget.gadget.GoogleMap");
dojo.declare("wm.gadget.GoogleMap",wm.Control,{scrim:true,width:"100%",height:"100%",minHeight:"100",latitude:37.789607,longitude:-122.39984,zoom:17,mapType:"ROADMAP",dataSet:"",addressField:"",latitudeField:"",longitudeField:"",titleField:"",descriptionField:"",iconField:"",_map:"",_markers:"",_infoWindow:"",selectedItem:"",init:function(){
this._dataToGeocode=[];
if(!dojo.byId("GoogleMapsScript")){
var _1a=document.createElement("script");
_1a.type="text/javascript";
_1a.id="GoogleMapsScript";
_1a.src="https://maps.google.com/maps/api/js?sensor=false&callback=wm.gadget.GoogleMap.initialize";
document.body.appendChild(_1a);
}
this._markers=[];
this.inherited(arguments);
this.selectedItem=new wm.Variable({name:"selectedItem",owner:this});
if(!this._isDesignLoaded){
if(!this.latitudeField){
this.latitudeField="_latitude";
}
if(!this.longitudeField){
this.longitudeField="_longitude";
}
}
},postInit:function(){
this.inherited(arguments);
if(window.google&&window.google.maps){
this.initialize();
}else{
wm.gadget.GoogleMap.waitingForInitialize.push(this);
}
},initialize:function(){
var _1b=new google.maps.LatLng(this.latitude,this.longitude);
var _1c={zoom:this.zoom,center:_1b,mapTypeId:google.maps.MapTypeId[this.mapType]};
this._map=new google.maps.Map(this.domNode,_1c);
if(this.dataSet&&this.dataSet.getCount()){
this.generateMarkers();
}
this._infoWindow=new google.maps.InfoWindow();
},renderBounds:function(){
if(this.inherited(arguments)&&this._map){
google.maps.event.trigger(this._map,"resize");
}
},setZoom:function(_1d){
this.zoom=_1d;
if(this._map){
this._map.setZoom(Number(_1d));
}
},setLatitude:function(_1e){
this.latitude=_1e;
wm.onidle(this,function(){
if(this._map){
this._map.setCenter(new google.maps.LatLng(this.latitude,this.longitude));
}
});
},setLongitude:function(_1f){
this.longitude=_1f;
wm.onidle(this,function(){
if(this._map){
this._map.setCenter(new google.maps.LatLng(this.latitude,this.longitude));
}
});
},fitToMarkers:function(){
var _20=10000000;
var _21=10000000;
var _22=-1000000;
var _23=-1000000;
if(!this.dataSet){
return;
}
var _24=this.dataSet.getCount();
if(_24==0){
return;
}
for(var i=0;i<_24;i++){
var _25=this.dataSet.getItem(i);
var lat=_25.getValue(this.latitudeField);
var lon=_25.getValue(this.longitudeField);
if(lat<_20){
_20=lat;
}
if(lat>_22){
_22=lat;
}
if(lon<_21){
_21=lon;
}
if(lon>_23){
_23=lon;
}
}
var _26=new google.maps.LatLng(_22,_23);
var _27=new google.maps.LatLng(_20,_21);
this._map.fitBounds(new google.maps.LatLngBounds(_27,_26));
},setMapType:function(_28){
this.mapType=_28;
if(this._map){
this._map.setMapTypeId(google.maps.MapTypeId[this.mapType]);
}
},setDataSet:function(_29){
this.dataSet=_29;
if(_29){
this.selectedItem.setType(_29.type);
}
dojo.forEach(this._markers,function(m){
m.setMap(null);
});
this._markers=[];
if(this._map&&_29){
this.generateMarkers();
}
},onGeocodeError:function(_2a,_2b){
},geocode:function(_2c){
this._dataToGeocode.push(_2c);
this.geocodeNext();
},geocodeNext:function(){
if(this._geocoding){
return;
}
this._geocoding=true;
this.onIncrementGeocodeCount(this._dataToGeocode.length,this.dataSet.getCount());
this._geocode(this._dataToGeocode.shift(),this._dataToGeocode.length?dojo.hitch(this,"geocodeNext"):dojo.hitch(this,"onGeocodeComplete"));
},onIncrementGeocodeCount:function(_2d,_2e){
},onGeocodeComplete:function(){
},onGeocodeSuccess:function(_2f){
},onGeocodeError:function(_30,_31){
},_geocode:function(_32,_33){
var _34=this;
var _35;
if(!this.geocoder){
this.geocoder=new google.maps.Geocoder();
}
this.geocoder.geocode({"address":_32.getValue(this.addressField)},function(_36,_37){
_34._geocoding=false;
if(_37==google.maps.GeocoderStatus.OK){
var _38=_36[0].geometry.location;
_32.setValue(_34.latitudeField,_38.lat());
_32.setValue(_34.longitudeField,_38.lng());
_34.generateMarker(_32);
_34.onGeocodeSuccess(_32);
}else{
if(_37==google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
_34._dataToGeocode.push(_32);
wm.job("geocodeNext",500,dojo.hitch(_34,"geocodeNext"));
return;
}else{
console.error("Failed to geocode "+_32.getValue(_34.addressField)+"; "+_37);
_34.onGeocodeError(_37,_32);
}
}
if(_33){
_33();
}
});
},generateMarkers:function(){
var _39=this.dataSet.getCount();
if(_39){
for(var i=0;i<_39;i++){
var _3a=this.dataSet.getItem(i);
_3a._index=i+1;
this.generateMarker(_3a);
}
if(this._dataToGeocode.length){
this.geocodeNext();
}
}
},generateMarker:function(_3b){
var d=_3b.getData();
d._index=_3b._index;
var lat=d[this.latitudeField];
var lon=d[this.longitudeField];
var _3c=d[this.addressField];
var _3d=d[this.titleField];
var _3e=d[this.descriptionField];
var _3f=d[this.iconField];
if(!lat&&!lon){
if(_3c){
this._dataToGeocode.push(_3b);
}
return;
}
switch(_3f){
case "green":
_3f="http://gmaps-samples.googlecode.com/svn/trunk/markers/green/blank.png";
break;
case "blue":
_3f="http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png";
break;
case "red":
_3f="http://gmaps-samples.googlecode.com/svn/trunk/markers/red/blank.png";
break;
case "pink":
_3f="http://gmaps-samples.googlecode.com/svn/trunk/markers/pink/blank.png";
break;
case "orange":
_3f="http://gmaps-samples.googlecode.com/svn/trunk/markers/orange/blank.png";
break;
case "green1":
_3f="http://gmaps-samples.googlecode.com/svn/trunk/markers/green/marker"+d._index+".png";
break;
case "blue1":
_3f="http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/marker"+d._index+".png";
break;
case "red1":
_3f="http://gmaps-samples.googlecode.com/svn/trunk/markers/red/marker"+d._index+".png";
break;
case "pink1":
_3f="http://gmaps-samples.googlecode.com/svn/trunk/markers/pink/marker"+d._index+".png";
break;
case "orange1":
_3f="http://gmaps-samples.googlecode.com/svn/trunk/markers/orange/marker"+d._index+".png";
break;
}
var _40=new google.maps.Marker({icon:_3f,position:new google.maps.LatLng(lat,lon),map:this._map,title:_3d});
this._markers.push(_40);
google.maps.event.addListener(_40,"click",dojo.hitch(this,function(){
if(_3e){
this._infoWindow.setContent("<h3>"+_3d+"</h3>"+_3e);
this._infoWindow.open(this._map,_40);
}
this.selectedItem.setData(d);
this.onMarkerClick(d);
this.onMarkerChange(d);
}));
},selectMarkerByIndex:function(_41){
this._clickMarker(this._markers[_41],this.dataSet.getItem(_41));
},_clickMarker:function(_42,_43){
var _44="<h3 class='MapMarkerTitle'>"+_43.getValue(this.titleField)+"</h3><div class='MapMarkerDescription'>"+_43.getValue(this.descriptionField)+"</div>";
this._infoWindow.setContent(_44);
this._infoWindow.open(this._map,_42);
this.onMarkerChange(_43);
},onMarkerClick:function(_45){
},onMarkerChange:function(_46){
},_end:0});
wm.gadget.GoogleMap.waitingForInitialize=[];
wm.gadget.GoogleMap.initialize=function(){
dojo.forEach(wm.gadget.GoogleMap.waitingForInitialize,function(w){
w.initialize();
});
wm.gadget.GoogleMap.waitingForInitialize=[];
};
}
if(!dojo._hasResource["wm.base.widget.VirtualList"]){
dojo._hasResource["wm.base.widget.VirtualList"]=true;
dojo.provide("wm.base.widget.VirtualList");
dojo.declare("wm.VirtualListItem",wm.TouchMixin,{selected:false,className:"wmlist-item",getRuntimeId:function(){
return this.list.getRuntimeId()+"."+this.index;
},constructor:function(_47,_48,_49,_4a,_4b){
this.list=_47;
this.index=_4b===undefined?this.list._formatIndex:_4b;
this._connections=[];
this._subscriptions=[];
this._debugSubscriptions=[];
if(_4a){
this.domNode=_4a;
}else{
this.create();
}
this.setContent(_48,_49);
},subscribe:function(){
wm.Component.prototype.subscribe.apply(this,arguments);
},connect:function(){
wm.Component.prototype.connect.apply(this,arguments);
},disconnectEvent:function(){
wm.Component.prototype.disconnectEvent.apply(this,arguments);
},destroy:function(){
dojo.forEach(this._connections,function(_4c){
dojo.disconnect(_4c);
});
dojo.forEach(this._subscriptions,function(_4d){
dojo.unsubscribe(_4d);
});
},create:function(){
var n=this.domNode=document.createElement("div");
dojo.addClass(n,this.className);
this.makeConnections();
},makeConnections:function(){
if(!wm.isMobile){
this.connect(this.domNode,"mouseover",this,"mouseover"),this.connect(this.domNode,"mouseout",this,"mouseout");
this.connect(this.domNode,"click",this,function(evt){
wm.onidle(this,"click",{target:evt.target});
});
this.connect(this.domNode,"dblclick",this,function(evt){
wm.onidle(this,"dblclick",{target:evt.target});
});
}else{
this.addTouchListener();
}
},onTouchStart:function(evt){
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
this.list._ontouchstart(evt,this.index,this.getData?this.getData():null);
},onTouchMove:function(evt,_4e,_4f,_50){
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
this.list._ontouchmove(evt,_4e,_4f,_50);
},onTouchEnd:function(evt,_51){
delete this._selectionIndicatorOnly;
delete this._deselectionIndicatorOnly;
if(this.list._touchedItem==this){
this.list._touchedItem=null;
if(!evt){
evt={target:this.domNode};
}
this.click(evt);
}
this.list._ontouchend(evt);
},onLongTouch:function(_52,_53){
delete this._selectionIndicatorOnly;
delete this._deselectionIndicatorOnly;
this.list._touchedItem=null;
this.longClick();
},setContent:function(_54){
this.domNode.innerHTML=_54;
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
},select:function(_55){
if(!_55){
this.selected=true;
}
dojo.addClass(this.domNode,this.className+"-selected");
},deselect:function(_56){
if(!_56){
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
var _57=this._listTouchScroll.scroller?this._listTouchScroll.scroller.outer:null;
if(_57){
_57.style.width="100%";
}
},dataSetToSelectedItem:function(_58){
this.selectedItem.setLiveView((_58||0).liveView);
this.selectedItem.setType(_58?_58.type:"any");
},getCount:function(){
return this.items.length;
},getItem:function(_59){
return this.items[_59];
},getItemByCallback:function(_5a){
for(var i=0;i<this.getCount();i++){
var d=this.items[i].getData();
if(_5a(d)){
return this.items[i];
}
}
},getItemByFieldName:function(_5b,_5c){
for(var i=0;i<this.getCount();i++){
var d=this.items[i].getData();
if(d[_5b]==_5c){
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
var _5d=this.inherited(arguments);
if(_5d){
var _5e=this.isAncestorHidden();
if(this.headerVisible&&!_5e){
wm.job(this.getRuntimeId()+".postRenderBounds",1,dojo.hitch(this,"postRenderBounds"));
}
}
return _5d;
},postRenderBounds:function(){
if(!this.isAncestorHidden()){
var _5f=(this.noHeader||!this.headerVisible)?{h:0}:dojo.marginBox(this.headerNode);
var _60=this.getContentBounds().h-_5f.h;
(this.listNodeWrapper||this.listNode).style.height=Math.max(0,_60)+"px";
}
},clear:function(_61){
this._setHeaderVisible(false);
while(this.getCount()){
this.removeItem(this.getCount()-1);
}
this.deselectAll(_61);
this._clearSelectedData();
},createItem:function(_62){
return new wm.VirtualListItem(this,_62);
},addItem:function(_63,_64){
var _65=this.createItem(_63);
var _66=this.listNode;
dojo.setSelectable(_65.domNode,false);
if(_64!=undefined){
this.items.splice(_64,0,_65);
_65.index=_64;
this.selection.splice(_64,0,false);
this.updateItemIndexes(_64+1,1);
var _67=_66.childNodes[_64];
if(_67){
_66.insertBefore(_65.domNode,_66.childNodes[_64]);
}else{
_66.appendChild(_65.domNode);
}
}else{
this.items.push(_65);
_65.index=this.items.length-1;
_66.appendChild(_65.domNode);
}
return _65;
},removeItem:function(_68){
var li=this.getItem(_68);
if(li){
if(li.domNode&&li.domNode.parentNode){
this.listNode.removeChild(li.domNode);
}
this.items.splice(_68,1);
this.selection.splice(_68,1);
this.updateItemIndexes(_68,-1);
li.destroy();
}
},updateItemIndexes:function(_69,_6a){
for(var i=_69,l=this.getCount(),li;i<l&&(li=this.items[i]);i++){
li.index+=_6a;
}
},removeItems:function(_6b){
for(var i=_6b.length,_6c;((_6c=_6b[i])!=undefined);i--){
this.removeItem(_6c);
}
},modifyItem:function(_6d,_6e){
var li=this.getItem(_6d);
(li?li.setContent(_6e):this.addItem(_6e));
},renderHeader:function(_6f){
this.headerNode.innerHTML=_6f;
},_setHeaderVisible:function(_70){
this.headerNode.style.display=_70?"":"none";
},setHeaderVisible:function(_71){
this.headerVisible=_71;
if(this.headerVisible){
this.renderHeader();
}
this._setHeaderVisible(this.headerVisible);
this.reflow();
},_addSelectedData:function(_72){
if(this._selectionMode=="multiple"){
if(!dojo.isArray(this.selected)){
this.selected=[];
}
if(_72&&dojo.indexOf(this.selected,_72.index)==-1){
this.selected.push(_72.index);
}
var _73=[];
dojo.forEach(this.selected,dojo.hitch(this,function(_74){
var v=this.getItemData(_74);
if(typeof v=="object"){
_73.push(v);
}else{
_73.push({dataValue:v});
}
}));
this.selectedItem.setData(_73);
this.setValue("emptySelection",this.selected.length==0);
this.setValue("isRowSelected",this.selected.length>0);
}else{
this.selected=_72;
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
},_removeSelectedData:function(_75){
if(this._selectionMode=="multiple"){
this.selected=wm.Array.removeElement(this.selected,_75.index);
}
this._addSelectedData(null);
},_clearSelectedData:function(){
this.selected=this._selectionMode=="multiple"?[]:null;
this.selectedItem.setData(null);
this.setValue("emptySelection",true);
this.setValue("isRowSelected",false);
},addToSelection:function(_76){
if(!_76){
return;
}
this.selection[_76.index]=true;
this.lastSelected=this.selected;
this._addSelectedData(_76);
_76.select();
},removeFromSelection:function(_77){
this.selection[_77.index]=false;
_77.deselect();
this._removeSelectedData(_77);
},deselectAll:function(_78){
dojo.forEach(this.items,function(i){
if(i){
i.deselect();
}
});
var _79=this.selection?this.selection.length:0;
this.selection=[];
this.selected=this._selectionMode=="multiple"?[]:null;
if(!_78&&_79){
this._clearSelectedData();
this.onSelectionChange();
}
},isSelected:function(_7a){
return this.selection[_7a.index];
},ctrlSelect:function(_7b){
if(this.isSelected(_7b)){
this.eventDeselect(_7b);
}else{
this.eventSelect(_7b);
}
},shiftSelect:function(_7c){
var t=s=(this.selected||this.lastSelected||0).index,e=_7c.index,t;
this.deselectAll();
if(s>e){
s=e;
e=t;
}
for(var i=s,li;i<=e&&(li=this.getItem(i));i++){
this.addToSelection(li);
}
},clickSelect:function(_7d,_7e){
if(this._selectionMode=="none"||this._disabled){
return;
}
var _7f=this.getSelectedIndex();
if(this._selectionMode=="multiple"&&(_7e.ctrlKey||_7e.shiftKey)){
if(_7e.ctrlKey){
this.ctrlSelect(_7d);
}else{
if(_7e.shiftKey){
this.shiftSelect(_7d);
}
}
}else{
if(this._selectionMode=="multiple"){
if(dojo.indexOf(this.selected,_7d.index)==-1){
this.eventSelect(_7d);
}else{
this.eventDeselect(_7d,false);
}
}else{
var s=this.selected,_80=s&&s.index,_81=_7d.index;
if(_80!==_81){
this.eventDeselect(_7d,true);
this.eventSelect(_7d);
}else{
if(this.toggleSelect){
this.eventDeselect(_7d);
}
}
}
}
if(!this._isDesignLoaded&&!this._handlingBack&&this.manageHistory&&!this.isNavigationMenu){
app.addHistory({id:this.getRuntimeId(),options:{selectedRow:_7f},title:"SelectionChange"});
}
},eventDeselect:function(_82,_83){
if(this._disabled){
return;
}
if(this._selectionMode=="multiple"){
this.removeFromSelection(_82);
}else{
this.deselectAll(_83);
}
if(!_83){
wm.job(this.getRuntimeId()+".eventSelect",0,dojo.hitch(this,function(){
this.onDeselect(_82);
this.onSelectionChange();
}));
}
},eventSelect:function(_84){
if(this._disabled){
return;
}
var _85={canSelect:true};
this._oncanselect(_84,_85);
if(_85.canSelect){
this.addToSelection(_84);
if(!this._cupdating){
wm.job(this.getRuntimeId()+".eventSelect",0,dojo.hitch(this,function(){
this.onSelect(_84);
this.onSelectionChange();
}));
}
}
},select:function(_86){
if(_86){
if(this._selectionMode!="multiple"){
this.deselectAll();
}
this.eventSelect(_86);
}
},selectByIndex:function(_87){
var i=this.getItem(_87);
if(i){
this.select(i);
}
},getSelectedIndex:function(){
if(this._selectionMode=="multiple"){
return this.selected;
}else{
return this.selected?this.selected.index:-1;
}
},handleBack:function(_88){
this._handlingBack=true;
try{
var _89=_88.selectedRow;
this.select(_89);
}
catch(e){
}
delete this._handlingBack;
return true;
},_oncanmouseover:function(_8a,_8b,_8c){
},onLongClick:function(_8d){
},onclick:function(_8e,_8f){
var _90=_8e.target;
if(_90.firstChild&&dojo.attr(_90.firstChild,"wmcontroller")){
_90=_90.firstChild;
}
if(_90&&dojo.attr(_90,"wmcontroller")){
if(_90.type=="checkbox"){
if(!_8f.selected){
this.eventSelect(_8f);
}else{
this.eventDeselect(_8f);
}
if(_8e instanceof Event){
dojo.stopEvent(_8e);
}
}else{
if(_90.type=="radio"){
var _91=this.toggleSelect;
this.toggleSelect=false;
this.clickSelect(_8f,_8e);
this.toggleSelect=_91;
dojo.stopEvent(_8e);
}else{
if(dojo.hasClass(_90,"wmDeleteColumn")||dojo.hasClass(_90,"wmDeleteColumnImage")){
this._deleteItem(_8f);
}
}
}
}else{
this.clickSelect(_8f,_8e);
}
},_deleteItem:function(_92){
if(this.deleteConfirm){
app.confirm(this.deleteConfirm,false,dojo.hitch(this,function(){
this.deleteItem(_92);
}));
}else{
this.deleteItem(_92);
}
},deleteItem:function(_93){
var _94=dojo.indexOf(this.items,_93);
wm.Array.removeElementAt(this.items,_94);
dojo.destroy(_93.domNode);
return _94;
},ondblclick:function(_95,_96){
},onSelectionChange:function(){
},onselect:function(_97){
},ondeselect:function(_98){
},onSelect:function(_99){
},onDeselect:function(_9a){
},_oncanselect:function(_9b,_9c){
},_onmouseover:function(_9d,_9e){
var _9f={canMouseOver:true};
this._oncanmouseover(_9d,_9e,_9f);
if(_9f.canMouseOver){
_9e.doOver();
}
}});
}
if(!dojo._hasResource["wm.base.widget.Table.builder"]){
dojo._hasResource["wm.base.widget.Table.builder"]=true;
dojo.provide("wm.base.widget.Table.builder");
wm.getTr=function(_a0,_a1){
return _a0&&((_a0.rows||0)[_a1]||_a0.childNodes[_a1]);
};
wm.getTd=function(_a2,_a3,_a4){
return (wm.getTr(_a2,_a3)||0).childNodes[_a4];
};
dojo.declare("wm.table.builder",null,{rowCount:0,colCount:0,constructor:function(_a5,_a6,_a7){
this.className=_a5||"";
this.rowClassName=_a6||"";
this.columnClassName=_a7||"";
},_table:["<table class=\"","","\" cellspacing=\"0\" cellpadding=\"0\">"],generateCell:function(_a8,_a9,_aa){
var tag=(_aa?"th":"td");
var _ab=["<",tag," "];
var s=this.getCellStyle&&this.getCellStyle(_a8,_a9);
var c=this.getCellClass&&this.getCellClass(_a8,_a9);
c=(c?c+" ":"")+this.columnClassName;
s&&_ab.push([" style=\"",s,"\""].join(""));
c&&_ab.push([" class=\"",c,"\""].join(""));
_ab.push(">");
_ab.push(this.getCellContent(_a8,_a9,_aa));
_ab.push("</"+tag+">");
return _ab.join("");
},generateRow:function(_ac,_ad){
var s=(this.getRowStyle)&&this.getRowStyle(_ac),c=this.rowClassName||((this.getRowClass)&&this.getRowClass(_ac));
var _ae=["<tr"," style=\"",s,"\" class=\"",c,"\">"];
for(var i=0,l=this.colCount;i<l;i++){
_ae.push(this.generateCell(_ac,i,_ad));
}
_ae.push("</tr>");
return _ae.join("");
},generateTableStart:function(){
var _af=this._table.concat([]);
_af[1]=this.className;
return _af.join("");
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
},format:function(_b0,_b1){
this.list.inSetContent=true;
var _b2=(this.list.format?this.list.format(_b1,_b0):_b0);
delete this.list.inSetContent;
return _b2;
},setContent:function(_b3,_b4){
var f=this.format(_b3,this.index);
this.inherited(arguments,[f]);
this._data=this.getData();
},getData:function(){
return this.list.getItemData(this.index);
},update:function(){
var _b5=this.format(this.getData(),this.index);
this.domNode.innerHTML=_b5;
},getColumnFromNode:function(_b6){
if(_b6){
while(_b6.tagName!="TD"){
_b6=_b6.parentNode;
}
var td=_b6,tr=_b6.parentNode;
for(var i=0,c;(c=tr.childNodes[i]);i++){
if(c==td){
return i;
}
}
}
return -1;
},select:function(_b7){
this.inherited(arguments);
if(!_b7&&this.list.columns&&(this.list.selectionMode=="checkbox"||this.list.selectionMode=="radio")){
wm.job(this.getRuntimeId()+"changeCheckedStatus",10,this,function(){
dojo.query("input",this.domNode)[0].checked=true;
});
}
},deselect:function(_b8){
this.inherited(arguments);
if(!_b8&&this.list.columns&&(this.list.selectionMode=="checkbox"||this.list.selectionMode=="radio")){
wm.job(this.getRuntimeId()+"changeCheckedStatus",10,this,function(){
dojo.query("input",this.domNode)[0].checked=false;
});
}
}});
wm.Object.extendSchema(wm.ListItem,{getData:{group:"method",returns:"Object"}});
dojo.declare("wm.List",wm.VirtualList,{scrollToTopOnDataChange:false,_regenerateOnDeviceChange:1,_scrollTop:0,styleAsGrid:true,rightNavArrow:false,selectFirstRow:false,scrollToSelection:false,renderVisibleRowsOnly:true,autoSizeHeight:false,nextRowId:0,query:{},width:"100%",height:"200px",minWidth:150,minHeight:60,deleteColumn:false,deleteConfirm:"Are you sure you want to delete this?",autoScroll:false,constructor:function(){
this._data=[];
},columnWidths:"",dataFields:"",classNames:"wmlist",columns:"",_columnsHash:"",getItemForNode:function(_b9){
var _ba=wm.Array.indexOf(this.items,_b9.id.replace(/^.*_/,""),function(_bb,id){
return _bb&&_bb.rowId==id;
});
if(_ba==-1){
return null;
}
return this.items[_ba];
},deleteItem:function(_bc){
var _bd=this.inherited(arguments);
dojo.query(".wmlist-item.Odd",this.domNode).removeClass("Odd");
dojo.query(".wmlist-item:nth-child(odd)",this.domNode).addClass("Odd");
var _be=this._data[_bd];
wm.Array.removeElementAt(this._data,_bd);
this.onRowDeleted(_bd,_be);
},onRowDeleted:function(_bf,_c0){
},setColumns:function(_c1){
this.columns=_c1;
this._setSelectionColumn(this.selectionMode);
this._setDeleteColumn(this.deleteColumn);
this._setRightArrowColumn(this.rightNavArrow);
this._columnsHash={};
var _c2=0;
for(var i=0;i<this.columns.length;i++){
var _c3=this.columns[i];
this._columnsHash[_c3.field||_c3.id]=_c3;
if(!_c3.width){
_c3.width="100%";
}
if(_c3.width.match(/\%/)){
_c2+=Number(_c3.width);
}
if(_c3.field=="PHONE COLUMN"&&!this._isDesignLoaded){
_c3.expression=_c3.expression.replace(/\$\{wm\.runtimeId\}/g,this.getRuntimeId()).replace(/wm\.List\.prototype\./g,"app.getValueById('"+this.getRuntimeId()+"').");
}
}
if(!this.isDesignLoaded()&&dojo.isIE<=10){
for(var i=0;i<this.columns.length;i++){
var _c3=this.columns[i];
var w=_c3.width;
if(w.match(/\%/)){
_c3.width=(w*100/_c2)+"%";
}
}
}
},setSelectionMode:function(_c4){
this.selectionMode=_c4;
if(_c4=="checkbox"||_c4=="extended"){
_c4="multiple";
}else{
if(_c4=="radio"){
_c4="single";
}else{
if(_c4=="extended"){
_c4=this.selectionMode="multiple";
}
}
}
this._selectionMode=_c4;
if(!this.columns){
this.convertToColumns();
}else{
this.setColumns(this.columns);
}
this._render();
},_setRightArrowColumn:function(_c5){
if(this.columns){
for(var i=this.columns.length-1;i>=0;i--){
if(this.columns[i].controller=="rightarrow"){
wm.Array.removeElementAt(this.columns,i);
}
}
if(_c5){
this.columns.push({show:true,controller:"rightarrow",width:"20px",title:"-",field:"_rightArrow",mobileColumn:true});
}
}
},_setSelectionColumn:function(){
if(this.columns){
var _c6=false;
for(var i=0;i<this.columns.length;i++){
if(this.columns[i].controller=="radio"||this.columns[i].controller=="checkbox"){
_c6=true;
if(this.selectionMode=="checkbox"||this.selectionMode=="radio"){
this.columns[i].controller=this.selectionMode;
}else{
wm.Array.removeElementAt(this.columns,i);
}
break;
}
}
if(!_c6&&(this.selectionMode=="radio"||this.selectionMode=="checkbox")){
var _c7=this.columns[0].controller?1:0;
wm.Array.insertElementAt(this.columns,{width:"25px",title:"-",controller:this.selectionMode,field:"_selector",show:true,mobileColumn:true},_c7);
}
}
},convertToColumns:function(){
if(this.dataFields){
var _c8=this.dataFields.split(/\s*,\s*/);
}else{
if(this.dataSet&&this.dataSet._dataSchema){
var _c8=wm.typeManager.getSimplePropNames(this.dataSet._dataSchema);
}
}
if(_c8&&_c8.length){
this.columns=[];
for(var i=0;i<_c8.length;i++){
this.columns.push({width:"100%",field:_c8[i],show:true,title:wm.capitalize(_c8[i])});
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
var _c9=this.spacerNodeTop=document.createElement("div");
_c9.className="wmlist-spacer";
this.listNode.appendChild(_c9);
var _ca=this.spacerNodeBottom=document.createElement("div");
_ca.className="wmlist-spacer";
this.listNode.appendChild(_ca);
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
},setDisabled:function(_cb){
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
},_ontouchmove:function(e,_cc,_cd,_ce){
if(this.listNode.clientHeight<=this.listNodeWrapper.clientHeight||_ce>0&&this.getScrollTop()==0||_ce<0&&this.getScrollTop()>=Math.max(this.listNode.scrollHeight,this.listNodeWrapper.scrollHeight)){
return;
}
var _cf=new Date().getTime();
var _d0=_cf-this._touchY.time;
var _d1=this._scrollTop;
var _d2=_d1-_ce;
if(_d2<0){
_d2=0;
}else{
if(_d2>this.listNode.scrollHeight){
_d2=this.listNode.scrollHeight;
}
}
this.setScrollTop(_d2);
this._touchY={velocity:-_ce/_d0,time:new Date().getTime()};
dojo.stopEvent(e);
dojo.publish("wmTouchMove",[this]);
},_ontouchend:function(e,_d3){
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
var _d4=this.spacerNodeBottom.offsetTop-this.listNodeWrapper.clientHeight;
var _d5=(this._touchY.velocity==Infinity||Math.abs(this._touchY.velocity)<0.01||this.getScrollTop()>_d4);
if(!_d5){
var inc=Math.min(this._touchY.velocity*50,this.getListNodeHeight());
if(this._scrollTop+inc>_d4){
inc=_d4-this._scrollTop;
}
}
if(_d5||!inc||Math.abs(inc)<=1){
window.clearInterval(this._touchY.animationId);
delete this._touchY.animationId;
return;
}
this.setScrollTop(this._scrollTop+inc);
this._onScroll();
},setScrollTop:function(_d6){
var min=0;
var max=this.listNode.scrollHeight;
var top;
if(_d6<min){
top=min;
}else{
if(_d6>max){
top=max;
}else{
top=_d6;
}
}
if(wm.isMobile){
var _d7=this._scrollTop;
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
this._onScroll(top>_d7?"down":"up");
}
}else{
this.listNode.scrollTop=top;
}
},isItemShowing:function(_d8){
if(!_d8.domNode.parentNode){
return 0;
}
var box={t:_d8.domNode.offsetTop};
box.b=box.t+_d8.domNode.clientHeight;
var _d9=this.getScrollTop();
var _da=this.getListNodeHeight();
var _db=_d9+_da;
if(box.t>=_d9&&box.b<=_db){
return 2;
}else{
if(box.b>=_d9&&box.t<_d9){
return 1;
}else{
if(box.t<=_db&&box.b>_db){
return -1;
}else{
return 0;
}
}
}
},scrollToRow:function(_dc){
if(_dc>this._data.length){
_dc=this._data.length-1;
}
var _dd=Boolean(this.items[_dc]);
var _de=this.getItem(_dc);
var top,_df;
if(_de.domNode.parentNode){
var box=dojo.marginBox(_de.domNode);
_df=box.h;
var _e0=box.t;
}else{
_df=this.avgHeight;
}
var _e1=!_dd?0:this.isItemShowing(_de);
switch(_e1){
case 2:
break;
case 1:
top=_de.domNode.offsetTop;
this.setScrollTop(top-(_df-_de.domNode.clientHeight));
break;
case -1:
this.setScrollTop(_e0-this.getListNodeHeight()+_df);
break;
default:
var _e2=this.getScrollTop();
var _e3=this.spacerNodeBottom.clientHeight+this.spacerNodeTop.clientHeight+this.getListNodeHeight();
if(_de&&_de.domNode.parentNode&&(_dc==0||this.items[_dc-1])){
top=_de.domNode.offsetTop;
}else{
top=_df*_dc;
}
var _e4=this.spacerNodeBottom.clientHeight;
var _e5=this.spacerNodeTop.clientHeight;
var _e6=top-_df;
this.spacerNodeTop.style.height=_e6+"px";
this.spacerNodeBottom.style.height=(_e4-_e6+_e5)+"px";
this._inScroll=true;
this.setScrollTop(Math.max(0,top-15));
this._inScroll=false;
var _e7=this.getScrollTop()-_e2;
var _e8=this.listNode.childNodes;
var _e9=[];
for(var i=1;i<_e8.length-1;i++){
var _ea=_e8[i];
if(_ea.className.match(/wmlist-item/)){
_e9.push(_ea);
}
}
dojo.forEach(_e9,function(_eb){
_eb.parentNode.removeChild(_eb);
});
this.scrollDownAddItems(Math.max(0,_dc-1));
this._lastScrollTop=this.getScrollTop();
var _ec=this.items[this._data.length-1];
if(_ec&&this.isItemShowing(_ec)){
var box=dojo.marginBox(_ec.domNode);
var _ed=box.h;
var _ee=box.t;
this.setScrollTop(this.listNode.scrollHeight-_ed+this.getListNodeHeight());
this._lastScrollTop=this.getScrollTop();
}
}
},getItem:function(_ef){
if(!this.items[_ef]&&_ef<this._data.length){
this.addItem(this.getItemData(_ef),_ef);
}
return this.items[_ef];
},createSelectedItem:function(){
this.selectedItem=new wm.Variable({name:"selectedItem",owner:this});
},createBuilder:function(){
this.builder=new wm.table.builder(this.className+"-table",this.className+"-row",this.className+"-cell");
this.builder.getCellContent=dojo.hitch(this,"getCellContent");
this.builder.getCellStyle=dojo.hitch(this,"getCellStyle");
this.builder.getCellClass=dojo.hitch(this,"getCellClass");
},createItem:function(_f0,_f1,_f2){
return new wm.ListItem(this,_f0,null,_f1,_f2);
},getEmptySelection:function(){
return !this.hasSelection();
},hasSelection:function(){
if(dojo.isArray(this.selected)){
return this.selected.length>0;
}else{
return Boolean(this.selected);
}
},setDeleteColumn:function(_f3){
this.deleteColumn=_f3;
if(!this.columns){
this.convertToColumns();
}else{
this.setColumns(this.columns);
}
this._render();
},_setDeleteColumn:function(){
if(this.columns){
var _f4=false;
for(var i=0;i<this.columns.length;i++){
if(this.columns[i].controller=="deleteColumn"){
_f4=true;
if(!this.deleteColumn){
wm.Array.removeElementAt(this.columns,i);
}
break;
}
}
if(!_f4&&this.deleteColumn){
this.columns.unshift({width:"25px",title:"-",controller:"deleteColumn",field:"_deleteColumn",show:true,mobileColumn:true});
}
}
},_setDataFields:function(_f5){
if(!this.columns&&this.dataSet){
if(this._isDesignLoaded){
this.updateColumnData(false);
}else{
this.convertToColumns();
}
}
if(this.columns){
this._dataFields=[];
var _f6=false;
var _f7=(this._isDesignLoaded||window["studio"]&&this.isOwnedBy(studio.page));
var _f8=_f7?studio.currentDeviceType=="phone":wm.device=="phone";
var _f9=_f7?studio.currentDeviceType=="tablet":wm.device=="tablet";
var _fa=true;
if(_f8||_f9){
for(var i=0;i<this.columns.length;i++){
var c=this.columns[i];
if(c.mobileColumn&&!c.controller){
_f6=true;
}
if(!c.controller&&c.show){
_fa=false;
}
}
}
if(_f6&&(_fa||_f8||this.desktopWidthExcedesBounds())){
this._useMobileColumn=_f6;
}else{
this._useMobileColumn=_f6=false;
}
for(var i=0;i<this.columns.length;i++){
var c=this.columns[i];
var _fb=_f6&&c.mobileColumn||!_f6&&c.show||c.controller;
if(_fb){
this._dataFields.push(this.columns[i].field||this.columns[i].id);
}
}
}else{
var d=this.dataFields=_f5||"";
if(d){
var s=d.split(","),d=[];
for(var i=0,v,f;(f=s[i]);i++){
v=dojo.trim(f);
if(v){
d.push(v);
}
}
}else{
var _fc=(this.dataSet||0)._dataSchema;
if(_fc){
var d=[];
for(var i in _fc){
var ti=_fc[i];
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
var _fd=20;
var _fe=0;
dojo.forEach(this.columns,function(_ff){
if(_ff.show){
_fe++;
var w=String(_ff.width);
if(w.indexOf("%")!=-1){
_fd+=80;
}else{
var _100=parseInt(w);
if(_100){
_fd+=_100;
}
}
}
});
var _101=this.domNode.style.width||app.appRoot.bounds.w;
return (_fd>_101)&&_fe>1;
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
},trimDataSetObjectFields:function(_102){
var f=this.getDataSetObjectFields();
for(var i in f){
for(var j=0,df;(df=_102[j]);j++){
if(df==i){
_102.splice(j,1);
break;
}
}
}
},setDataFields:function(_103){
this._setDataFields(_103);
this._render();
},setColumnWidths:function(_104){
var c=this.columnWidths=_104;
this._columnWidths=dojo.isArray(c)?c:c.split(",");
this._render();
},shouldShowHeader:function(){
var _105=this._dataFields;
return (this.headerVisible&&(_105||this._headerContent));
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
},clear:function(_106){
this._data=null;
this.inherited(arguments);
},getDataItemCount:function(){
return this._data?this._data.length:0;
},canSetDataSet:function(_107){
return Boolean(_107);
},setDataSet:function(_108){
try{
var _109=this.dataSet;
if(!this.canSetDataSet(_108)){
this.dataSet="";
}else{
this.dataSet=_108;
}
var t=(_108||0).type||"AnyData";
if(this._paging==="inc"){
var _10a=this.getScrollTop();
if(this.loadingNode&&this.loadingNode.parentNode){
this.listNode.removeChild(this.loadingNode);
}
this._data=_108.getData();
this.updateBottomSpacerHeight();
this.setScrollTop(_10a);
this.scrollDownAddItems();
delete this._paging;
}else{
if(this._isDesignLoaded&&this.columns&&this.columns.length&&_108&&_108.type){
if(this._typeChangedConnect){
dojo.disconnect(this._typeChangedConnect);
}
this._typeChangedConnect=this.connect(_108,"typeChanged",this,function(){
this.updateColumnData(true);
this._render();
});
if(!_109||!_109.type||_109.type==_108.type){
this.updateColumnData(true);
}
}
this.setSelectedItemType(t);
this.dataSetToSelectedItem(_108);
this.onsetdata(this.dataSet);
this.renderDataSet(this.dataSet);
}
}
catch(e){
alert(e.toString());
}
},setSelectedItemType:function(_10b){
this.selectedItem.dataSet="";
this.selectedItem.setType(_10b);
},update:function(){
var ds=this.getValueById((this.components.binding.wires["dataSet"]||0).source);
wm.fire(ds,"update");
},renderDataSet:function(_10c){
if(this.isAncestorHidden()&&!this._renderHiddenGrid&&!this._isDesignLoaded){
this._renderDojoObjSkipped=true;
return;
}
this._renderDojoObjSkipped=false;
var d=_10c instanceof wm.Variable?_10c.getData():[];
d=this.runQuery(d);
this.renderData(d);
},doAutoSize:function(){
},setAutoSizeHeight:function(_10d){
this.autoSizeHeight=_10d;
this._render();
},setBestHeight:function(){
if(this.autoSizeHeight){
this._doingAutoSize=true;
var _10e=0;
if(this.items.length){
var _10f=dojo.coords(this.items[this.items.length-1].domNode);
_10e+=_10f.h+_10f.t;
}
if(this.headerVisible){
var _10f=dojo.coords(this.headerNode);
_10e+=_10f.h+_10f.t;
}
_10e+=this.padBorderMargin.b+this.padBorderMargin.t+2;
this.setHeight(_10e+"px");
this._doingAutoSize=false;
}
},_onShowParent:function(){
if(this._renderDojoObjSkipped&&!this._headerRendered||this.spacerNodeTop.clientHeight){
wm.onidle(this,"_render");
}
if(this.isNavigationMenu){
this.deselectAll();
}
},setShowing:function(_110){
var _111=this.showing;
this.inherited(arguments);
if(!_111&&_110){
this._onShowParent();
}
},renderData_optimized:function(_112){
var _113=this.selectedItem.getData();
this.clear(true);
this._data=_112;
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
var f=dojo.hitch(this,function(_114,_115,_116,_117){
var max=Math.min(i+_115,this.getDataItemCount());
for(;i<max;i++){
this.addItem(this.getItemData(i),i);
this._formatIndex=null;
}
if(i<this.getDataItemCount()){
wm.onidle(this,function(){
_116(i,_115,_116,_117);
});
}else{
_117();
}
});
var _118=dojo.hitch(this,function(){
dojo.query(".wmlist-item:nth-child(odd)",this.domNode).addClass("Odd");
this.reflow();
if(this._listTouchScroll&&!this._listTouchScroll.scrollers.outer.style.width){
wm.job(this.getRuntimeId()+"ListSetupScroller",1,dojo.hitch(this._listTouchScroll,"setupScroller"));
}
var _119=dojo.isArray(_113);
if(this.columns&&(_119&&_113.length||!_119&&_113||this.selectFirstRow)){
this.selectItemOnGrid(_113);
}
this.onRenderData();
});
f(0,20,f,_118);
},renderBounds:function(){
var h=parseInt(this.domNode.style.height);
if(this.inherited(arguments)&&this.renderVisibleRowsOnly&&!this._isDesignLoaded){
if(this._renderDojoObjSkipped){
this._render();
}else{
var _11a=this.listNode.childNodes.length>2?this.getItemForNode(this.listNode.childNodes[1]):null;
if(this.bounds.h>h){
this._onScroll("down");
}else{
this._onScroll("up");
}
}
}
},renderData:function(_11b){
var _11c=wm.device=="phone"?this.maxRenderedRowsPhone:this.maxRenderedRows;
if(this.selectedItem.type){
var _11d=this.selectedItem.getData();
}
this.clear(true);
if(this.scrollToTopOnDataChange){
this._inScroll=true;
this.setScrollTop(0);
delete this._inScroll;
}
this._data=_11b;
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
var _11e=this.getDataItemCount();
for(var i=0;i<_11e;i++){
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
var _11f=dojo.isArray(_11d);
if(this.columns&&(_11f&&_11d.length||!_11f&&_11d||this.selectFirstRow)){
this.selectItemOnGrid(_11d);
}
this.onRenderData();
},_renderItem:function(i){
var item=this.items[i];
if(item){
if(!item.domNode.parentNode||!item.domNode.parentNode.tagName){
var _120=this.listNode;
var _121=this.findNextSiblingNode(i);
var _122=this.spacerNodeBottom.offsetTop;
_120.insertBefore(item.domNode,_121);
if(this._isScrolling){
if(this._scrollDirection=="down"){
this.updateBottomSpacerHeight();
if(_121!=this.spacerNodeBottom){
this.spacerNodeTop.style.height=(this.spacerNodeTop.clientHeight-this.items[i].domNode.clientHeight)+"px";
}
}else{
var _123=this.spacerNodeBottom.offsetTop-_122;
this.spacerNodeTop.style.height=(this.spacerNodeTop.clientHeight-_123)+"px";
}
}
}
}else{
var _124=false;
this._formatIndex=i;
var _122=this.spacerNodeBottom.offsetTop;
this.addItem(this.getItemData(i),i);
item=this.items[i];
this._formatIndex=null;
if(this._isScrolling){
if(this._scrollDirection=="down"){
this.updateBottomSpacerHeight();
}else{
if(!_124){
if(!item.height){
item.height=item.domNode.clientHeight;
}
var _123=this.spacerNodeBottom.offsetTop-_122;
this.spacerNodeTop.style.height=(this.spacerNodeTop.clientHeight-_123)+"px";
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
},getNodeFromItem:function(_125){
if(_125){
return _125.domNode;
}else{
return null;
}
},findNextSiblingNode:function(_126){
var _127=this.listNode;
if(_126==0){
return _127.childNodes[1];
}
if(this.items[_126-1]){
var _128=this.getNodeFromItem(this.items[_126-1]);
if(_128.parentNode&&_128.parentNode.tagName){
return _127.childNodes[dojo.indexOf(_127.childNodes,_128)+1];
}
}
if(this.items[_126+1]){
var node=this.getNodeFromItem(this.items[_126+1]);
if(node.parentNode&&node.parentNode.tagName){
return node;
}
}
for(var i=_126-2;i>=0;i--){
if(this.items[i]){
var node=this.getNodeFromItem(this.items[i]);
if(node.parentNode&&node.parentNode.tagName){
return _127.childNodes[dojo.indexOf(_127.childNodes,node)+1];
}
}
}
return _127.childNodes[1];
},onStyleRow:function(_129,_12a){
},_onStyleRowBeforeStart:1,addItem:function(_12b,_12c,_12d){
var item=this.createItem(_12b,_12d,_12c);
var _12e=this.listNode;
dojo.setSelectable(item.domNode,false);
if(_12c!=undefined){
this.items[_12c]=item;
var _12f=this.findNextSiblingNode(_12c);
if(_12f){
_12e.insertBefore(item.domNode,_12f);
}else{
_12e.insertBefore(item.domNode,this.spacerNodeBottom);
}
}else{
this.items.push(item);
item.index=this.items.length-1;
var _12f=(this.items.length==_12c+1)?this.spacerNodeBottom:_12e.childNodes[_12c+1];
_12e.insertBefore(item.domNode,_12f);
}
try{
var _130=item.getData();
if(_130){
var _131={customClasses:"",customStyles:""};
this.onStyleRow(_131,_130);
if(_131.customClasses){
dojo.addClass(item.domNode,_131.customClasses);
}
if(_131.customStyles){
item.domNode.style.cssText=_131.customStyles;
}
}
}
catch(e){
}
return item;
},addSpacer:function(_132,_133){
var _134=document.createElement("div");
_134.className="wmlist-spacer";
_134.style.height=_133+"px";
var _135=this.listNode.childNodes[_132+1];
this.listNode.insertBefore(_134,_135);
this.items[_132]=_134;
},addVisibleItems:function(_136){
var _137=this.listNode;
var _138=this.getDataItemCount();
if(_138==0){
return;
}
var _139=this.getScrollTop();
var _13a=this.getListNodeHeight()+_139;
var _13b=this.avgHeight=this.getAverageItemHeight();
if(_136===undefined){
_136=Math.floor(_139/_13b);
_136=Math.max(0,_136-10);
_136=Math.min(_136,_138);
}
if(this._scrollDirection=="down"){
for(var i=0;i<_136;i++){
if(!this.items[i]){
this.addSpacer(i,_13b);
_13c+=_13b;
}
}
}else{
var _13d=_137.childNodes[1];
var _13e=this.getItemForNode(_13d);
}
var _13c=_13a-1;
for(var i=_136;i<_138&&_13c<_13a;i++){
this._renderItem(i);
if(!this.items[i]){
this._renderItem(i);
}
_13c=this.items[i].domNode.offsetTop+this.items[i].domNode.clientHeight;
}
var _13f=i+10;
for(;i<_138&&i<_13f;i++){
this._renderItem(i);
}
this.addOddClasses();
},updateTopSpacerHeight:function(){
var _140=this.listNode.childNodes[1];
if(!_140){
this.spacerNodeTop.style.height="0px";
}else{
var item=this.getItemForNode(_140);
var _141=dojo.indexOf(this.items,item);
var _142=_141*this.getAverageItemHeight();
this.spacerNodeTop.style.height=_142+"px";
}
},updateBottomSpacerHeight:function(){
var _143=this.getDataItemCount();
var rows=this.listNode.childNodes;
if(rows<=2){
this.spacerNodeBottom.style.height="0px";
return;
}
var _144=rows[rows.length-2];
var _145=this.getItemForNode(_144);
var _146=dojo.indexOf(this.items,_145);
var _147=_143-_146-1;
if(_147>0){
this.spacerNodeBottom.style.height=(_147*this.avgHeight)+"px";
}else{
this.spacerNodeBottom.style.height="0px";
}
},getListNodeHeight:function(){
return (this.listNodeWrapper||this.listNode).clientHeight;
},getScrollTop:function(){
if(wm.isMobile){
return this._scrollTop;
}else{
var _148=this.listNode;
return _148.scrollTop;
}
},updateAverageItemHeight:function(){
var h=0;
var _149=0;
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
},_onScroll:function(_14a,_14b){
if(this._inScroll){
return;
}
this._inScroll=true;
try{
if(this._lastScrollTime&&(new Date().getTime()-this._lastScrollTime)<10){
return;
}
this._isScrolling=true;
var _14c=this.getScrollTop();
if(_14a=="down"||_14a!="up"&&(this._lastScrollTop===undefined||this._lastScrollTop<_14c)){
this._scrollDirection="down";
this.scrollDownRemoveItems();
this.scrollDownAddItems();
}else{
if(this._lastScrollTop>_14c){
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
this._lastScrollTop=_14c;
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
},scrollDownAddItems:function(_14d){
var _14e=0;
var _14f=this.listNode;
var _150=this.getDataItemCount();
if(_150==0){
return;
}
var _151=this.getScrollTop();
var _152=this.getListNodeHeight();
var _153=0;
var _154=_152+_151+this.spacerNodeTop.offsetTop;
dojo.forEach(this.listNode.childNodes,function(node){
node.style.border="";
});
if(_14d!==undefined){
_153=this.getScrollTop();
}else{
var _155=this.getLastItemNode();
if(_155){
var item=this.getItemForNode(_155);
var _156=dojo.indexOf(this.items,item);
_14d=_156+1;
_153=item.domNode.offsetTop+item.domNode.clientHeight;
}else{
_14e=this.getAverageItemHeight();
_14d=Math.floor(_151/_14e);
_153=this.spacerNodeTop.clientHeight;
}
if(_14f.childNodes.length==2){
var _157=_14e*_14d;
var _158=this.spacerNodeTop.clientHeight;
var _159=_157-_158;
this.spacerNodeTop.style.height=_157+"px";
var _15a=this.spacerNodeBottom.clientHeight;
_15a=_15a-_159;
this.spacerNodeBottom.style.height=_15a+"px";
}
}
var _15b=false;
for(var i=_14d;i<_150&&_153<_154;i++){
_15b=true;
this._renderItem(i);
if(!_14e){
_14e=this.items[i].domNode.clientHeight||22;
}
_153+=_14e;
}
if(i<_150){
if(_15b){
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
var _14f=this.listNode;
var node=this.loadingNode||dojo.create("div",{className:"wmlist-item wmlist-loading",innerHTML:"Loading..."});
_14f.insertBefore(node,this.spacerNodeBottom);
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
var _15c=this.getScrollTop();
var _15d=this.spacerNodeTop.clientHeight;
var _15e=this.getAverageItemHeight();
var _15f=_15c-_15e;
var _15d=this.spacerNodeTop.clientHeight;
var rows=this.listNode.childNodes;
var _160=[];
for(var i=1;i<rows.length-1;i++){
var node=rows[i];
var h=node.clientHeight;
if(h+_15d<_15f){
_160.push(node);
_15d+=h;
}else{
break;
}
}
this.spacerNodeTop.style.height=_15d+"px";
dojo.forEach(_160,function(node){
node.parentNode.removeChild(node);
});
},scrollUpRemoveItems:function(){
var _161=this.avgHeight=this.getAverageItemHeight();
var _162=this._listTouchScroll?this.listNode.parentNode:this.listNode;
var _163=this.getScrollTop()+this.getListNodeHeight()+this.spacerNodeTop.offsetTop;
var rows=this.listNode.childNodes;
var _164=parseInt(this.spacerNodeBottom.style.height)||0;
while(rows.length>2){
var row=rows[rows.length-2];
if(row.offsetTop>_163){
row.parentNode.removeChild(row);
}else{
break;
}
}
this.updateBottomSpacerHeight();
},scrollUpAddItems:function(){
var _165=this.listNode;
var _166=this.getDataItemCount();
if(_166==0){
return;
}
var _167=this.getScrollTop();
var _168=this.getListNodeHeight()+_167+this.spacerNodeTop.offsetTop;
var _169=this.getAverageItemHeight();
var _16a=_167;
var _16b;
if(this.listNode.childNodes.length>2){
var item=this.getItemForNode(this.getLastItemNode());
var _16c=dojo.indexOf(this.items,item);
_16b=_16c-1;
}else{
_16b=Math.floor(_168/_169);
}
var _16d=(_167&&_165.childNodes.length==2);
if(_16d){
this.spacerNodeBottom.style.height=_169*(_166-_16b)+"px";
}
for(var i=_16b;i>=0;i--){
this._renderItem(i);
if(this.items[i].domNode.offsetTop+this.items[i].domNode.clientHeight<_16a){
break;
}
}
if(i>=0){
this._renderItem(i);
}
this.updateAverageItemHeight();
if(_167<=0){
this.spacerNodeTop.style.height="0px";
}else{
if(_16d){
this.spacerNodeTop.style.height=_169*i+"px";
}
}
this.addOddClasses();
},onRenderData:function(){
},selectItemOnGrid:function(obj,_16e){
if(obj instanceof wm.Variable){
obj=obj.getData();
}
if(obj===undefined||obj===null){
obj={};
}
var _16f=[];
dojo.forEach(this.columns,function(col){
if(col.displayType=="Date"){
_16f.push(col.field||col.id);
}
});
if(!_16e){
_16e=this.primaryKeyFields||this.dataSet?wm.data.getIncludeFields(this.dataSet.type):this._pkList||[];
}
if(_16e.length==0&&this.dataSet){
var _170=wm.typeManager.getTypeSchema(this.dataSet.type);
for(var _171 in _170){
_16e.push(_171);
}
}
var q={};
dojo.forEach(_16e,function(f){
q[f]=obj[f];
if(dojo.indexOf(_16f,f)!=-1){
q[f]=new Date(obj[f]);
}
});
var _172=this.runQuery(this._data,q);
if(_172.length<1){
if(this.selectFirstRow){
this.setSelectedRow(0);
}else{
this.deselectAll();
}
return;
}
if(_172[0]._rowNumber!=undefined){
this._cupdating=true;
this.setSelectedRow(_172[0]._rowNumber);
this._cupdating=false;
}else{
if(this.selectFirstRow){
this.setSelectedRow(0);
}else{
this.deselectAll();
}
}
},runQuery:function(_173,_174){
var _175=_174||this.query;
if(wm.isEmpty(_175)){
return _173;
}else{
var _176=[];
for(var i=0;i<_173.length;i++){
var d=_173[i];
if(this.queryItem(_175,d,i)){
d._rowNumber=i;
_176.push(d);
}
}
return _176;
}
},queryItem:function(_177,_178,_179){
var w="*";
var _17a=true;
for(var key in _177){
if(this._columnsHash&&this._columnsHash[key]&&this._columnsHash[key].isCustomField){
var col=this._columnsHash[key];
if(col.expression){
_178[key]=wm.expression.getValue(col.expression,_178,this.owner);
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
_178[key]=this.arrayFormatter(key,col.formatProps,null,null,null,_178[k]);
break;
default:
if(!this.isDesignLoaded()){
_178[key]=dojo.hitch(this.owner,col.formatFunc)("",_179,dojo.indexOf(this.columns,col),key,{customStyles:[],customClasses:[]},_178);
}
}
}
}
}
var a=_178[key];
if(dojo.isString(a)){
a=a.replace(/\\([^\\])/g,"$1");
}
var b=_177[key];
var _17b=true;
if(dojo.isString(b)){
b=b.replace(/\\([^\\])/g,"$1");
if(b.charAt(0)==w){
b=b.substring(1);
_17b=false;
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
var _17c=a.indexOf(b);
if(_17c==-1||_17c>0&&_17b){
_17a=false;
break;
}
}else{
if(a!==b){
_17a=false;
break;
}
}
}
return _17a;
},getHeading:function(_17d){
if(this.columns){
var _17e=this._columnsHash[_17d];
var _17f=_17e.title;
return _17f==null?"":_17f;
}else{
var d=this._dataSource;
var s=d&&d.schema||0;
var si=s[_17d]||0;
if(si.label){
return wm.capitalize(si.label);
}else{
var _180=_17d.replace(/^.*\./,"");
return wm.capitalize(_180);
}
}
},getItemData:function(_181){
return this._data[_181];
},_getColumnDef:function(_182){
var _183=this._useMobileColumn;
var _184=dojo.some(this.columns,function(c){
return c.mobileColumn&&!c.controller;
});
var _185=-1;
for(var i=0;i<this.columns.length;i++){
if(_183&&this.columns[i].mobileColumn||(!_184||!_183)&&this.columns[i].show){
_185++;
}
if(_185==_182){
return this.columns[i];
}
}
},getCellContent:function(_186,_187,_188,_189){
var _18a=this._dataFields&&this._dataFields[_187];
var _18b;
var i=this._formatIndex!=null?this._formatIndex:this.getCount();
if(this._firstItemIndex!==undefined){
i+=this._firstItemIndex;
}
if(_188){
_18b="<div>"+this.getHeading(_18a);
}else{
if(this.columns){
var _18c=this._getColumnDef(_187);
if(_18c.controller){
if(_18c.controller=="deleteColumn"){
_18b="<div wmcontroller='true' class='wmDeleteColumn'><div wmcontroller='true' class='wmDeleteColumnImage'/></div>";
}else{
if(_18c.controller=="rightarrow"){
_18b="<div class='mblArrowContainer'><div class='mblRightArrow mblArrow' /></div>";
}else{
_18b="<input wmcontroller='true' type='"+_18c.controller+"' />";
}
}
}else{
var _18d=this._data[i];
var _18b=_18d;
var _18e=_18a.split(".");
for(var _18f=0;_18f<_18e.length;_18f++){
if(_18b&&typeof _18b=="object"){
_18b=_18b[_18e[_18f]];
}else{
_18b=null;
}
}
_18b=this.formatCell(_18a,_18b,_18d,i,_187);
}
}
}
if(_18b==undefined){
var d=this.getItemData(i);
f=wm.decapitalize(_18a);
_18b=_18a?d[_18a]:d;
}
var info={column:_187,data:_18b,header:_188};
this.onformat(info,_187,_18b,_188,_18d);
if(!this.inSetContent){
this._formatIndex=null;
}
if(_18b===undefined||_18b===null){
_18b="";
}
return "<div class='wmlist-content'>"+info.data+"</div>";
},getColWidth:function(_190){
if(this.columns){
return this.columns[_190].width;
}else{
var c=this._columnWidths;
if(!c||c.length==0||c.length==1&&!c[0]||c[_190]===undefined){
return Math.round(100/this.builder.colCount)+"%";
}else{
return c[_190];
}
}
},getCellStyle:function(_191,_192){
if(this.columns){
var text=[];
var _193=this._dataFields[_192];
var col=this._columnsHash[_193];
var _194=col.align;
if(_191!=-1){
_191=this._formatIndex!=null?this._formatIndex:this.getCount();
var data=this._data[_191];
if(col.backgroundColor){
var _195=wm.expression.getValue(col.backgroundColor,data,this.owner);
if(_195){
text.push("background-color:"+_195);
}
}
if(col.textColor){
var _196=wm.expression.getValue(col.textColor,data,this.owner);
if(_196){
text.push("color:"+_196);
}
}
}
var _197=col.width;
if(_197){
text.push("width:"+_197);
}
if(_194){
text.push("text-align:"+_194);
}
return text.join(";");
}else{
return "width: "+this.getColWidth(_192)+";";
}
},updateBuilder:function(){
this.builder.colCount=this._dataFields?this._dataFields.length:1;
this.builder.rowCount=1;
},format:function(_198,_199){
this._formatIndex=_198;
return this.builder.generateHtml(_199);
},_onformatBeforeStart:1,onformat:function(_19a,_19b,_19c,_19d,_19e){
},onsetdata:function(_19f){
}});
wm.List.extend({renderDojoObj:function(){
this._render();
},formatCell:function(_1a0,_1a1,_1a2,_1a3,_1a4){
var col;
if(!this._columnsHash||!this._columnsHash[_1a0]){
if(this.columns){
dojo.forEach(this.columns,function(c){
if(c.field==_1a0||c.id==_1a0){
col=c;
}
});
}
if(!col){
return _1a1;
}
}else{
col=this._columnsHash[_1a0];
}
var _1a5="";
if(col.expression){
var expr=col.expression;
try{
if(col.field=="PHONE COLUMN"){
expr=expr.replace(/\$\{wm\.rowId\}/g,_1a3);
}
if(expr.indexOf("${this}")!=-1){
expr=expr.replace(/\$\{this\}/g,dojo.toJson(_1a2));
}
if(this._isDesignLoaded){
expr=expr.replace(/\$\{wm\.runtimeId\}/g,this.getRuntimeId()).replace(/wm\.List\.prototype\./g,"app.getValueById('"+this.getRuntimeId()+"').");
}
_1a5=wm.expression.getValue(expr,_1a2,this.owner);
}
catch(e){
}
}else{
_1a5=_1a1;
}
if(col.formatFunc){
switch(col.formatFunc){
case "wm_date_formatter":
case "Date (WaveMaker)":
_1a5=this.dateFormatter(col.formatProps||{},null,null,null,_1a5);
break;
case "wm_localdate_formatter":
case "Local Date (WaveMaker)":
_1a5=this.localDateFormatter(col.formatProps||{},null,null,null,_1a5);
break;
case "wm_time_formatter":
case "Time (WaveMaker)":
_1a5=this.timeFormatter(col.formatProps||{},null,null,null,_1a5);
break;
case "wm_number_formatter":
case "Number (WaveMaker)":
_1a5=this.numberFormatter(col.formatProps||{},null,null,null,_1a5);
break;
case "wm_array_formatter":
_1a5=this.arrayFormatter(col.field||col.id,col.formatProps||{},null,null,null,_1a5);
break;
case "wm_currency_formatter":
case "Currency (WaveMaker)":
_1a5=this.currencyFormatter(col.formatProps||{},null,null,null,_1a5);
break;
case "wm_image_formatter":
case "Image (WaveMaker)":
_1a5=this.imageFormatter(col.formatProps||{},null,null,null,_1a5);
break;
case "wm_link_formatter":
case "Link (WaveMaker)":
_1a5=this.linkFormatter(col.formatProps||{},null,null,null,_1a5);
break;
case "wm_button_formatter":
_1a5=this.buttonFormatter(_1a0,col.formatProps||{},null,null,null,_1a5,_1a3);
break;
default:
if(!this.isDesignLoaded()){
if(this.owner[col.formatFunc]){
_1a5=dojo.hitch(this.owner,col.formatFunc)(_1a5,_1a3,_1a4,_1a0,{customStyles:[],customClasses:[]},_1a2);
}
}else{
_1a5="<i>runtime only...</i>";
}
break;
}
}
return _1a5;
},dateFormatter:function(_1a6,_1a7,_1a8,_1a9,_1aa){
if(!_1aa){
return _1aa;
}else{
if(typeof _1aa=="number"){
_1aa=new Date(_1aa);
}else{
if(_1aa instanceof Date==false){
return _1aa;
}
}
}
var _1ab=_1a6.dateType||"date";
if(!_1a6.useLocalTime){
var _1ac=_1ab=="date"?360:0;
_1aa.setHours(0,60*_1aa.getHours()+_1aa.getMinutes()+60*wm.timezoneOffset+_1ac);
}
var _1ad={fullYear:true,selector:_1ab,formatLength:_1a6.formatLength||"short",locale:dojo.locale,datePattern:_1a6.datePattern,timePattern:_1a6.timePattern};
return dojo.date.locale.format(_1aa,_1ad);
},numberFormatter:function(_1ae,_1af,_1b0,_1b1,_1b2){
var _1b3={places:_1ae.dijits||0,round:_1ae.round?0:-1,type:_1ae.numberType};
return dojo.number.format(_1b2,_1b3);
},arrayFormatter:function(_1b4,_1b5,_1b6,_1b7,_1b8,_1b9){
if(!_1b5.joinFieldName){
_1b5.joinFieldName="dataValue";
}
if(!_1b5.separator){
_1b5.separator=",";
}
var str="";
if(_1b9){
dojo.forEach(_1b9,function(item){
if(str){
str+=_1b5.separator+" ";
}
str+=item[_1b5.joinFieldName];
});
}
return str;
},currencyFormatter:function(_1ba,_1bb,_1bc,_1bd,_1be){
var _1bf=false;
if(this instanceof wm.DojoGrid){
_1bf=this._isDesignLoaded;
}
return dojo.currency.format(_1be,{currency:_1ba.currency||(_1bf?studio.application.currencyLocale:app.currencyLocale)||"USD",places:_1ba.dijits==undefined?2:_1ba.dijits,round:_1ba.round?0:-1});
},imageFormatter:function(_1c0,_1c1,_1c2,_1c3,_1c4){
if(_1c4&&_1c4!=""){
var _1c5=_1c0.width?" width=\""+_1c0.width+"px\"":"";
var _1c6=_1c0.height?" height=\""+_1c0.height+"px\"":"";
if(_1c0.prefix){
if(_1c0.prefix.match(/\/$/)&&_1c4.indexOf("/")==0){
_1c4=_1c4.substring(1);
}
_1c4=_1c0.prefix+_1c4;
}
if(_1c0.postfix){
_1c4=_1c4+_1c0.postfix;
}
return "<img "+_1c5+_1c6+" src=\""+_1c4+"\">";
}
return "";
},linkFormatter:function(_1c7,_1c8,_1c9,_1ca,_1cb){
if(_1cb&&_1cb!=""){
var _1cc=String(_1cb);
var _1cd=String(_1cb);
if(_1c7.prefix){
_1cd=_1c7.prefix+_1cd;
}
if(_1c7.postfix){
_1cd=_1cd+_1c7.postfix;
}
var _1ce=_1c7.target||"_NewWindow";
if(_1cd.indexOf("://")==-1&&_1cd.charAt(0)!="/"){
_1cd="http://"+_1cd;
}
return "<a href=\""+_1cd+"\" target=\""+_1ce+"\">"+_1cc+"</a>";
}
return _1cb;
},buttonFormatter:function(_1cf,_1d0,_1d1,_1d2,_1d3,_1d4,_1d5,_1d6){
if(_1d4!==null&&_1d4!==undefined&&_1d4!==""){
var _1d7=_1d0.buttonclass?" class=\""+_1d0.buttonclass+"\" ":" class=\"wmbutton\" ";
var _1d8=this.getRuntimeId()+".gridButtonClicked(event,\""+_1cf+"\","+_1d5+")' ";
if(wm.isMobile&&!wm.isFakeMobile){
_1d8="ontouchstart='"+this.getRuntimeId()+".gridButtonTouchStart(event)' ontouchmove='"+this.getRuntimeId()+".gridButtonTouchMove(event)' ontouchend='"+_1d8+"'";
}else{
_1d8="onclick='"+_1d8+"'";
}
return "<button "+_1d8+_1d7+">"+_1d4+"</button>";
}
return _1d4;
},gridButtonTouchStart:function(_1d9){
_1d9=_1d9||window.event;
dojo.stopEvent(_1d9);
this._buttonTouchPos={y:_1d9.targetTouches?_1d9.targetTouches[0].clientY:_1d9.clientY,x:_1d9.targetTouches?_1d9.targetTouches[0].clientX:_1d9.clientX,isClick:true};
},gridButtonTouchMove:function(_1da){
_1da=_1da||window.event;
dojo.stopEvent(_1da);
if(this._buttonTouchPos.isClick){
var y=_1da.targetTouches?_1da.targetTouches[0].clientY:_1da.clientY;
var x=_1da.targetTouches?_1da.targetTouches[0].clientX:_1da.clientX;
this._buttonTouchPos.isClick=(Math.abs(y-this._buttonTouchPos.y)<5&&Math.abs(x-this._buttonTouchPos.x)<5);
}
},gridButtonClicked:function(_1db,_1dc,_1dd){
_1db=_1db||window.event;
dojo.stopEvent(_1db);
if(wm.isMobile&&!this._buttonTouchPos.isClick){
return;
}
var _1de=this._data[_1dd];
this.onGridButtonClick(_1dc,_1de,_1dd);
},onGridButtonClick:function(_1df,_1e0,_1e1){
},setSelectedRow:function(_1e2){
this.eventSelect(this.items[_1e2]);
},setSelectedItem:function(_1e3){
if(_1e3 instanceof wm.Variable){
_1e3=_1e3.getData();
}
if(!_1e3){
this.deselectAll();
return;
}
wm.forEachProperty(_1e3,function(_1e4,_1e5){
if(typeof _1e4=="object"){
delete _1e3[_1e5];
}
});
this.selectByQuery(_1e3);
},select:function(_1e6){
var _1e7;
var item;
if(_1e6===null){
_1e7=-1;
item=null;
}else{
if(typeof _1e6=="object"){
_1e7=_1e6.index;
item=_1e6;
}else{
_1e7=_1e6;
item=this.items[_1e7];
}
}
if((!this.isAncestorHidden()||this.renderVisibleRowsOnly)&&!this._isDesignLoaded){
var _1e8=this._renderHiddenGrid;
this._renderHiddenGrid=true;
this.scrollToRow(_1e7);
this._renderHiddenGrid=_1e8;
item=this.getItem(_1e7);
}
if(item){
this.inherited(arguments,[item]);
}
},selectByIndex:function(_1e9){
this.select(_1e9);
},selectByQuery:function(_1ea){
if(!this.dataSet){
return;
}
if(!_1ea){
this.deselectAll();
return;
}
var _1eb=this.dataSet.query(_1ea);
if(this.renderVisibleRowsOnly){
this.renderVisibleRowsOnly=false;
this._render();
this.renderVisibleRowsOnly=true;
}
this.deselectAll();
var _1ec=_1eb.getCount();
for(var i=0;i<_1ec;i++){
var item=_1eb.data._list[i];
this.addToSelection(this.items[dojo.indexOf(this.dataSet.data._list,item)]);
if(this._selectionMode=="single"){
break;
}
}
},getRow:function(_1ed){
return this._data[_1ed];
},findRowIndexByFieldValue:function(_1ee,_1ef){
var item;
for(var i=0;i<this._data.length;i++){
item=this._data[i];
if(item[_1ee]===_1ef){
return i;
}
}
return -1;
},getCell:function(_1f0,_1f1){
var row=this._data[_1f0];
if(row){
var col=this._columnsHash?this._columnsHash[_1f1]:null;
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
return dojo.hitch(this.owner,col.formatFunc)("",_1f0,dojo.indexOf(this.columns,col),_1f1,{customStyles:[],customClasses:[]},row);
}
}
}
}
return undefined;
}else{
return row[_1f1];
}
}
return "";
},setCell:function(_1f2,_1f3,_1f4,_1f5){
var item=this.dataSet.getItem(_1f2);
item.beginUpdate();
item.setValue(_1f3,_1f4);
item.endUpdate();
var row=this._data[_1f2];
if(row){
row[_1f3]=_1f4;
if(!_1f5){
this.items[_1f2].setContent(row);
}
}
},getIsRowSelected:function(){
return !this.getEmptySelection();
},deleteRow:function(_1f6){
this.dataSet.removeItem(_1f6);
this._render();
},getRowCount:function(){
return this.items.length;
},addRow:function(_1f7,_1f8){
if(this.getRowCount()==0&&this.variable){
this.dataSet.setData([_1f7]);
if(_1f8){
this.select(0);
}
return;
}
var data=dojo.clone(_1f7);
var v=new wm.Variable({type:this.dataSet.type});
v.setData(data);
var _1f9=this.dataSet.getCount();
this.dataSet.addItem(v);
this.dataSet.getItem(_1f9).data._new=true;
if(_1f8||_1f8===undefined){
this.select(_1f9);
}
},addEmptyRow:function(_1fa){
var obj={};
var _1fb=false;
for(var i=0;i<this.columns.length;i++){
var _1fc=this.columns[i];
var _1fd=_1fc.field||_1fc.id;
var _1fe=_1fd.split(".");
var _1ff=this.dataSet.type;
var type=wm.typeManager.getType(_1ff);
for(var _200=0;_200<_1fe.length;_200++){
if(type&&type.fields){
var _201=type.fields[_1fe[_200]];
if(_201){
_1ff=type.fields[_1fe[_200]].type;
type=wm.typeManager.getType(_1ff);
}else{
type="java.lang.String";
}
}
}
var _202=null;
switch(_1ff){
case "java.lang.Integer":
case "java.lang.Double":
case "java.lang.Float":
case "java.lang.Short":
_202=0;
break;
case "java.lang.Date":
_202=new Date().getTime();
_1fb=true;
break;
case "java.lang.Boolean":
_202=false;
break;
default:
_202="";
_1fb=true;
}
var _203=obj;
for(var _200=0;_200<_1fe.length;_200++){
if(_200+1<_1fe.length){
if(!_203[_1fe[_200]]){
_203[_1fe[_200]]={};
}
_203=_203[_1fe[_200]];
}else{
_203[_1fe[_200]]=_202;
}
}
}
this.addRow(obj,_1fa);
},getDataSet:function(){
return this.dataSet;
},setSortIndex:function(){
console.warn("setSortIndex not implemented for wm.List");
},setSortField:function(){
console.warn("setSortField not implemented for wm.List");
},setQuery:function(_204){
this.query=_204;
this.renderDataSet(this.dataSet);
},getColumnIndex:function(_205){
for(var i=0;i<this.columns.length;i++){
if(this.columns[i].field==_205||this.columsn[i].id==_205){
return i;
}
}
return -1;
},getColumnShowing:function(_206,_207,_208){
var _209=this.getColumnIndex(_206);
if(_209!=-1){
var c=this.columns[_209];
var show=this._useMobileColumn&&c.mobileColumn||!this._useMobileColumn&&c.show;
return show;
}
},setColumnShowing:function(_20a,_20b,_20c){
var _20d=this.getColumnIndex(_20a);
if(_20d!=-1&&this.columns[_20d].show!=_20b){
this.columns[_20d].show=_20b;
this.setColumns(this.columns);
this._setDataFields();
if(!_20c){
this._render();
}
}
},setColumnWidth:function(_20e,_20f,_210){
this._columnsHash[_20e].width=_20f;
if(!_210){
this._render();
}
},getCellClass:function(_211,_212){
if(!this.columns){
return;
}
if(_211!=-1){
_211=this._formatIndex!=null?this._formatIndex:this.getCount();
var _213=this._dataFields[_212];
var col=this._columnsHash[_213];
var data=this._data[_211];
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
},setNextFocus:function(_214){
if(!(_214 instanceof Object)){
var tmp=this.getRoot()[_214];
this.nextFocus=tmp||this.nextFocus;
}else{
this.nextFocus=_214;
}
},getPriorFocus:function(){
if(!(this.priorFocus instanceof Object)){
this.setPriorFocus(this.priorFocus);
}
return this.priorFocus;
},setPriorFocus:function(_215){
if(!(_215 instanceof Object)){
this.priorFocus=this.getRoot()[_215];
}else{
this.priorFocus=_215;
}
},setFocus:function(_216,e){
this.focusEventTime=(e)?e.timeStamp:0;
this.hasFocus=_216;
if(_216){
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
var _217=this.parent;
while(_217&&!(_217 instanceof wm.Layer)){
_217=_217.parent;
}
if(this.autoShowLayer){
if(_217&&(_217 instanceof wm.Layer)&&!_217.active){
_217.parent.setLayer(_217);
}
}
},onclick:function(_218,_219){
this.inherited(arguments);
this.setFocus(true,_218);
},eventSelect:function(_21a){
if(this.nextFocusableItemField){
var data=_21a.getData();
var _21b=new wm.Object();
_21b.data=data;
var next=_21b.getValue("data."+this.nextFocusableItemField);
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
var _21c=this.getSelectedIndex();
_21c=_21c-1;
if(_21c<0){
_21c=this.getCount()+_21c;
}
_21c=_21c%this.getCount();
this.deselectAll(true);
this.eventSelect(this.getItem(_21c));
dojo.stopEvent(e);
}else{
if(e.keyCode==dojo.keys.DOWN_ARROW){
var _21c=this.getSelectedIndex();
_21c=(_21c+1)%this.getCount();
this.deselectAll(true);
this.eventSelect(this.getItem(_21c));
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
},setDataSet:function(_21d){
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
},setNextFocus:function(_21e){
if(!(_21e instanceof Object)){
var tmp=this.getRoot()[_21e];
this.nextFocus=tmp||this.nextFocus;
}else{
this.nextFocus=_21e;
}
},getPriorFocus:function(){
if(!(this.priorFocus instanceof Object)){
this.setPriorFocus(this.priorFocus);
}
return this.priorFocus;
},setPriorFocus:function(_21f){
if(!(this.priorFocus instanceof Object)){
this.priorFocus=this.getRoot()[_21f];
}else{
this.priorFocus=_21f;
}
},setFocus:function(_220,e){
this.focusEventTime=e.timeStamp;
this.hasFocus=_220;
if(_220){
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
var _221=this.parent;
while(_221&&!(_221 instanceof wm.Layer)){
_221=_221.parent;
}
if(this.autoShowLayer){
if(_221&&(_221 instanceof wm.Layer)&&!_221.active){
_221.parent.setLayer(_221);
}
}
},onclick:function(_222,_223){
this.inherited(arguments);
this.setFocus(true,_222);
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
if(!dojo._hasResource["wm.base.widget.FeedList"]){
dojo._hasResource["wm.base.widget.FeedList"]=true;
dojo.provide("wm.base.widget.FeedList");
dojo.declare("wm.FeedList",wm.List,{url:"",dataFields:"title",title:"",expand:false,headerVisible:true,showLink:true,selectedLink:"",totalItems:"",onselect:null,ondeselect:null,classNames:"wmfeedlist",serviceName:"FeedService",registerFeedService:"registerFeedService",operation:"getFeed",init:function(){
this.inherited(arguments);
if(!dojo.byId("feedcss")){
var link=document.createElement("link");
link.rel="stylesheet";
link.href=dojo.moduleUrl("wm.base.widget.themes.default").path+"feedlist.css";
link.id="feedcss";
document.getElementsByTagName("head")[0].appendChild(link);
}
},postInit:function(){
this.inherited(arguments);
this._createGetFeedServiceVariable();
if(!this.isDesignLoaded()){
this.getFeed();
}
},prepare:function(){
this.inherited(arguments);
if(this.isDesignLoaded()&&!wm.services.byName[this.serviceName]){
if(studio.isJarMissing("wsdl4j.jar")){
wm.WebService.prototype.showJarDialog();
if(!studio.project.loadingPage){
this.destroy();
throw "Missing jar file";
return;
}
}else{
studio.webService.requestSync(this.registerFeedService,null,dojo.hitch(this,"registerFeedServiceSuccess"));
}
}
},createListNode:function(){
this.listNode=document.createElement("div");
this.listNode.flex=1;
dojo.addClass(this.listNode,"wmfeedlist-list");
},createHeaderNode:function(){
this.headerNode=document.createElement("div");
dojo.addClass(this.headerNode,"wmfeedlist-header");
},getHeaderContent:function(){
return "<div>"+this.title+"</div>";
},updateHeaderWidth:function(){
if(this.headerNode.firstChild){
dojo.marginBox(this.headerNode.firstChild,{w:this.width});
this.updateItemListHeight();
}
},updateItemListHeight:function(){
var _224=dojo.contentBox(this.domNode);
var _225=dojo.marginBox(this.headerNode);
var _226=_224.h-_225.h;
dojo.marginBox(this.listNode,{h:_226});
},getCellContent:function(_227,_228,_229){
var d=this.getItemData(this.getCount());
var _22a=d.title;
var _22b=d.link;
var _22c=d.description?d.description.value:"";
var info={column:_228,data:d,header:_229};
this.onformat(info,_228,d,_229);
var html=["<img class=\"feedlistexpander\" src=\""+this._getImageSrc(this.expand)+"\"/>"];
html.push(this.getFeedItemTitleContent(_22a,_22b));
html.push("<br>");
html.push("<div class=\"wmfeedlist-row-desc\" style=\"display: "+(this.expand?"":"none")+";\">"+_22c+"</div>");
return html.join("");
},getFeedItemTitleContent:function(_22d,_22e){
return "<a target=\"newpage\" href=\""+(this.showLink?_22e:"javascript:;")+"\">"+_22d+"</a>";
},setUrl:function(_22f){
this.url=_22f;
if(!this.isDesignLoaded()){
this.getFeed();
}
},setExpand:function(_230){
this.expand=_230;
this._render();
},setShowLink:function(_231){
this.showLink=_231;
this._render();
},setTotalItems:function(_232){
this.totalItems=parseInt(_232)||"";
this._render();
},getDataItemCount:function(){
var c=this.inherited(arguments);
if(c&&parseInt(this.totalItems)&&this.totalItems>-1&&c>this.totalItems){
return this.totalItems;
}else{
return c;
}
},_getImageSrc:function(_233){
return wm.theme.getImagesPath()+(_233?"feedlist_open.gif":"feedlist_closed.gif");
},_createGetFeedServiceVariable:function(){
if(this.$.getFeedServiceVariable){
this.getFeedServiceVariable=this.$.getFeedServiceVariable;
}else{
this.getFeedServiceVariable=new wm.ServiceVariable({name:"getFeedServiceVariable",owner:this,service:this.serviceName,operation:this.operation});
}
this.getFeedServiceVariable["setData"]=function(){
};
this.getFeedServiceVariable["onSuccess"]=dojo.hitch(this,"getFeedServiceVariableSuccess");
this.getFeedServiceVariable["onError"]=dojo.hitch(this,"getFeedServiceVariableFailure");
},registerFeedServiceSuccess:function(_234){
this._createGetFeedServiceVariable();
delete studio.application.serverComponents;
studio.updateServices();
},update:function(){
if(this.isDesignLoaded()&&!studio.isLiveLayoutReady()){
studio.refreshLiveData();
if(studio._deploying&&studio._deployer){
studio._deployer.addCallback(dojo.hitch(this,function(_235){
this.update();
}));
}
}else{
this.getFeed();
}
},getParamsForServiceVariable:function(){
return [this.url];
},validate:function(){
if(this.url&&this.url!==undefined){
return true;
}
return false;
},getFeed:function(){
if(this.validate()){
if(!this.getFeedServiceVariable){
this._createGetFeedServiceVariable();
}
this.getFeedServiceVariable.request(this.getParamsForServiceVariable());
}else{
this.clear();
}
},getFeedServiceVariableSuccess:function(_236){
this.title=_236.title;
this.renderData(_236.entries);
},getFeedServiceVariableFailure:function(_237){
this.title=_237.errorObject.error;
},onclick:function(_238,_239){
if(_238.target.tagName=="IMG"){
var _23a=_238.target.src.match("feedlist_closed.gif");
_238.target.src=this._getImageSrc(_23a);
_238.target.parentNode.lastChild.style.display=_23a?"":"none";
}else{
this.setValue("selectedLink",_239.getData().link);
}
},_onmouseover:function(_23b,_23c){
}});
wm.Object.extendSchema(wm.FeedList,{editColumns:{ignore:1},toggleSelect:{ignore:1},dataSet:{ignore:1},disabled:{ignore:1},columnWidths:{ignore:1},dataFields:{ignore:1},title:{ignore:1},url:{group:"widgetName",subgroup:"data",requiredGroup:1,type:"String",bindTarget:1},selectedLink:{ignore:1,bindSource:1,type:"String"},selectedItem:{ignore:1},showLink:{group:"widgetName",subgroup:"behavior"},totalItems:{group:"widgetName",subgroup:"behavior"},headerVisible:{group:"widgetName",subgroup:"layout"},expand:{group:"widgetName",subgroup:"behavior"}});
wm.FeedList.description="A feed list.";
dojo.extend(wm.FeedList,{themeable:false});
}
if(!dojo._hasResource["wm.base.widget.TwitterFeed"]){
dojo._hasResource["wm.base.widget.TwitterFeed"]=true;
dojo.provide("wm.base.widget.TwitterFeed");
dojo.declare("wm.TwitterFeed",wm.FeedList,{width:"100%",twitterId:"",consumerKey:"",consumerSecret:"",accessToken:"",accessTokenSecret:"",classNames:"wmfeedlist wmtwitterlist",serviceName:"TwitterFeedService",registerFeedService:"registerTwitterFeedService",init:function(){
this.inherited(arguments);
},build:function(){
this.inherited(arguments);
if(this.isDesignLoaded()){
studio.webService.requestAsync("getProperties",[this.serviceName],dojo.hitch(this,function(_23d){
this.consumerKey=_23d.OAuthConsumerKey?_23d.OAuthConsumerKey:"";
this.consumerSecret=_23d.OAuthConsumerSecret?_23d.OAuthConsumerSecret:"";
this.accessToken=_23d.OAuthAccessToken?_23d.OAuthAccessToken:"";
this.accessTokenSecret=_23d.OAuthAccessTokenSecret?_23d.OAuthAccessTokenSecret:"";
}));
}
},setConsumerKey:function(_23e){
this.consumerKey=_23e?_23e:"";
studio.webService.requestAsync("setProperty",[this.serviceName,"OAuthConsumerKey",this.consumerKey]);
},setConsumerSecret:function(_23f){
this.consumerSecret=_23f?_23f:"";
studio.webService.requestAsync("setProperty",[this.serviceName,"OAuthConsumerSecret",this.consumerSecret]);
},setAccessToken:function(_240){
this.accessToken=_240?_240:"";
studio.webService.requestAsync("setProperty",[this.serviceName,"OAuthAccessToken",this.accessToken]);
},setAccessTokenSecret:function(_241){
this.accessTokenSecret=_241?_241:"";
studio.webService.requestAsync("setProperty",[this.serviceName,"OAuthAccessTokenSecret",this.accessTokenSecret]);
},setTwitterId:function(_242){
this.twitterId=_242;
if(this.validate()){
this.update();
}else{
this.clear();
}
},designTimeMandatoryFields:function(){
return (this.consumerKey&&this.consumerKey!="")&&(this.consumerSecret&&this.consumerSecret!="")&&(this.accessToken&&this.accessToken!="")&&(this.accessTokenSecret&&this.accessTokenSecret!="");
},validate:function(){
if((this.twitterId&&this.twitterId!="")&&(!this.isDesignLoaded()||this.designTimeMandatoryFields())){
return true;
}
return false;
},getParamsForServiceVariable:function(){
return [this.twitterId];
},getFeedItemTitleContent:function(_243,_244){
return _243;
},onclick:function(_245,_246){
}});
wm.Object.extendSchema(wm.TwitterFeed,{url:{ignore:true,hidden:true,type:"String",bindTarget:1},twitterId:{bindable:1,group:"edit",order:30},consumerKey:{group:"Oauth Details",requiredGroup:1,order:30},consumerSecret:{group:"Oauth Details",requiredGroup:1,order:30},accessToken:{group:"Oauth Details",requiredGroup:1,order:30},accessTokenSecret:{group:"Oauth Details",requiredGroup:1,order:30}});
wm.TwitterFeed.description="A twitter feed.";
}
