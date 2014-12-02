dojo.declare("Body_Main_mobile", wm.Page, {
start: function() {
},
"preferredDevice": "phone",
_end: 0
});

Body_Main_mobile.widgets = {
navigationCall_FCL_mobile: ["wm.NavigationCall", {"operation":"gotoPage"}, {}, {
input: ["wm.ServiceInput", {"type":"gotoPageInputs"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":"\"FCL_mobile\"","targetProperty":"pageName"}, {}]
}]
}]
}],
layoutBox1: ["wm.Layout", {"horizontalAlign":"left","verticalAlign":"middle"}, {}, {
FCL_button: ["wm.Button", {"caption":"Get FCL Rates","desktopHeight":"100px","deviceSizes":["300"],"deviceType":["phone"],"height":"100px","margin":"4","mobileHeight":"100px","width":"100%"}, {"onclick":"navigationCall_FCL_mobile"}],
LCL_button: ["wm.Button", {"caption":"Get LCL Rates","desktopHeight":"100px","height":"100px","margin":"4","mobileHeight":"100px","width":"100%"}, {"onclick":"navigationCall1"}]
}]
};

Body_Main_mobile.prototype._cssText = '';
Body_Main_mobile.prototype._htmlText = '';