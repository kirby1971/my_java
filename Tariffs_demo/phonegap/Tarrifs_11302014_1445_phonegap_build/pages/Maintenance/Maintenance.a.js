dojo.declare("Maintenance", wm.Page, {
start: function() {
},
"preferredDevice": "desktop",
_end: 0
});

Maintenance.widgets = {
layoutBox1: ["wm.Layout", {"horizontalAlign":"left","verticalAlign":"top"}, {}, {
tabLayers1: ["wm.TabLayers", {}, {}, {
Accounts: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"Accounts","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}],
Master_data: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"Master Data","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}],
Tariff_set_up: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"Tarrif Set-up","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}]
}]
}]
};

Maintenance.prototype._cssText = '';
Maintenance.prototype._htmlText = '';