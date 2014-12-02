dojo.declare("Main_mobile", wm.Page, {
start: function() {
},
"preferredDevice": "phone",
_end: 0
});

Main_mobile.widgets = {
layoutBox1: ["wm.Layout", {"deviceSizes":["300"],"horizontalAlign":"left","verticalAlign":"top"}, {}, {
panel1: ["wm.Panel", {"height":"105px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
picture1: ["wm.Picture", {"height":"100%","source":"resources/images/imagelists/fox_mobile.jpg","width":"100%"}, {}]
}],
panel5: ["wm.Panel", {"deviceSizes":["300"],"deviceType":["phone"],"height":"100%","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
pageContainer1: ["wm.PageContainer", {"deferLoad":true,"pageName":"Body_Main_mobile","subpageEventlist":{},"subpageMethodlist":{},"subpageProplist":{}}, {}]
}]
}]
};

Main_mobile.prototype._cssText = '';
Main_mobile.prototype._htmlText = '';