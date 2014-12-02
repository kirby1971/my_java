dojo.declare("tariffs", wm.Page, {
start: function() {
},
"preferredDevice": "desktop",
_end: 0
});

tariffs.widgets = {
usertariffsLiveVariableFCL: ["wm.LiveVariable", {"autoUpdate":false,"operation":"insert","startUpdate":false,"type":"com.myproddb.data.UserTariffs"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"FCL_Import_Form.dataOutput","targetProperty":"loadingDialog"}, {}]
}],
liveView: ["wm.LiveView", {"dataType":"com.myproddb.data.UserTariffs","related":["id"],"view":[
{"caption":"UserId","sortable":true,"dataIndex":"id.userId","type":"java.lang.String","displayType":"Text","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":0,"subType":null},
{"caption":"Id","sortable":true,"dataIndex":"id","type":"com.myproddb.data.UserTariffsId","displayType":"Text","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":0,"subType":null},
{"caption":"PortOfLoading","sortable":true,"dataIndex":"portOfLoading","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1,"subType":null},
{"caption":"TariffSeq","sortable":true,"dataIndex":"id.tariffSeq","type":"java.lang.Integer","displayType":"Number","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":1,"subType":null},
{"caption":"DataTime","sortable":true,"dataIndex":"id.dataTime","type":"java.util.Date","displayType":"Date","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":2,"subType":null},
{"caption":"Weight","sortable":true,"dataIndex":"weight","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":2,"subType":null},
{"caption":"FreightRateWm","sortable":true,"dataIndex":"freightRateWm","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":3,"subType":null},
{"caption":"Volume","sortable":true,"dataIndex":"volume","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":4,"subType":null},
{"caption":"ExpectedPallets","sortable":true,"dataIndex":"expectedPallets","type":"java.lang.Integer","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":5,"subType":null},
{"caption":"ExchangeRate","sortable":true,"dataIndex":"exchangeRate","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":6,"subType":null},
{"caption":"DeliveryLocationNl","sortable":true,"dataIndex":"deliveryLocationNl","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":7,"subType":null},
{"caption":"OceanfreightAmount","sortable":true,"dataIndex":"oceanfreightAmount","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":8,"subType":null},
{"caption":"CfsChargesDest","sortable":true,"dataIndex":"cfsChargesDest","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":9,"subType":null},
{"caption":"DelOrderFee","sortable":true,"dataIndex":"delOrderFee","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":10,"subType":null},
{"caption":"CustomsValue","sortable":true,"dataIndex":"customsValue","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":11,"subType":null},
{"caption":"TransportDestCosts","sortable":true,"dataIndex":"transportDestCosts","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":12,"subType":null},
{"caption":"DieselSurcharge","sortable":true,"dataIndex":"dieselSurcharge","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":13,"subType":null},
{"caption":"HandlingFeeLcl","sortable":true,"dataIndex":"handlingFeeLcl","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":14,"subType":null},
{"caption":"FclLcl","sortable":true,"dataIndex":"fclLcl","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":15,"subType":null},
{"caption":"ContainerType","sortable":true,"dataIndex":"containerType","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":16,"subType":null},
{"caption":"Distance","sortable":true,"dataIndex":"distance","type":"java.lang.Integer","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":17,"subType":null},
{"caption":"Range","sortable":true,"dataIndex":"range","type":"java.lang.Integer","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":18,"subType":null},
{"caption":"DeltaEuromax","sortable":true,"dataIndex":"deltaEuromax","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":19,"subType":null},
{"caption":"ThcChargesCarrier","sortable":true,"dataIndex":"thcChargesCarrier","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":20,"subType":null},
{"caption":"Isps","sortable":true,"dataIndex":"isps","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21,"subType":null},
{"caption":"DeliveryOrderFee","sortable":true,"dataIndex":"deliveryOrderFee","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":22,"subType":null},
{"caption":"ContainertransportToDestination","sortable":true,"dataIndex":"containertransportToDestination","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":23,"subType":null},
{"caption":"DeltaEuromaxSurcharge","sortable":true,"dataIndex":"deltaEuromaxSurcharge","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":24,"subType":null},
{"caption":"AllInHandlingFee","sortable":true,"dataIndex":"allInHandlingFee","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":25,"subType":null}
]}, {}]
}],
popupMenu1: ["wm.PopupMenu", {"fullStructure":[
{"label":"File","children":[
{"label":"Save"},
{"label":"Close"}
]},
{"label":"Edit","children":[
{"label":"Cut"},
{"label":"Copy"},
{"label":"Paste"}
]},
{"label":"Help"}
],"localizationStructure":{}}, {}],
layoutBox1: ["wm.Layout", {"horizontalAlign":"left","verticalAlign":"top"}, {}, {
tabLayers1: ["wm.TabLayers", {"width":"1357.4000000953674px"}, {}, {
FCL_Import_Layer: ["wm.Layer", {"border":"1","borderColor":"#333333","caption":"FCL Import Seafreight","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}, {
TitleBar: ["wm.Panel", {"_classes":{"domNode":["titlebar"]},"border":"0,0,4,0","height":"96px","horizontalAlign":"left","layoutKind":"left-to-right","padding":"8","verticalAlign":"top","width":"100%"}, {}, {
appNameLabel: ["wm.Label", {"_classes":{"domNode":["wm_FontSizePx_24px"]},"caption":"FCL Import Seafreight tariff calculator","height":"100%","padding":"4","width":"100%"}, {}],
panel3: ["wm.Panel", {"border":"1","height":"100%","width":"222px"}, {}]
}],
FCL_Import_Form: ["wm.LiveForm", {"desktopHeight":"256px","enableTouchHeight":true,"height":"256px","horizontalAlign":"left","mobileHeight":"295px","verticalAlign":"middle"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"usertariffsLiveVariableFCL","targetProperty":"dataSet"}, {}]
}],
pol1: ["wm.Number", {"caption":"Port of Loading","captionSize":"150px","desktopHeight":"26px","emptyValue":"emptyString","formField":"portOfLoading","height":"26px","width":"210px"}, {}],
cont_type: ["wm.Text", {"caption":"Container Type","captionSize":"150px","desktopHeight":"26px","emptyValue":"emptyString","formField":"containerType","height":"26px","width":"210px"}, {}],
del_location1: ["wm.Number", {"caption":"Delivery Location (NL)","captionSize":"145px","desktopHeight":"26px","emptyValue":"emptyString","formField":"deliveryLocationNl","height":"26px","width":"252px"}, {}],
exchange_rate1: ["wm.Currency", {"caption":"Exchange Rate","captionSize":"150px","desktopHeight":"26px","emptyValue":"emptyString","formField":"exchangeRate","height":"26px","readonly":true,"width":"209px"}, {}],
km1: ["wm.Number", {"caption":"KM","captionSize":"150px","dataValue":"","desktopHeight":"26px","displayValue":"","emptyValue":"emptyString","height":"26px","readonly":true,"width":"206px"}, {}],
range1: ["wm.Number", {"caption":"Range","captionSize":"150px","dataValue":"","desktopHeight":"26px","displayValue":"","emptyValue":"emptyString","height":"26px","readonly":true,"width":"204px"}, {}],
delta_euromax1: ["wm.Text", {"caption":"Delta\\Euromax","captionSize":"150px","dataValue":"","desktopHeight":"26px","displayValue":"","emptyValue":"emptyString","height":"26px","readonly":true,"width":"204px"}, {}],
panel5: ["wm.Panel", {"height":"48px","horizontalAlign":"center","layoutKind":"left-to-right","verticalAlign":"middle","width":"100%"}, {}, {
Calculate1: ["wm.Button", {"caption":"Calculate","margin":"4"}, {}]
}]
}]
}],
LCL_Import_Layer: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"LCL Import Seafreight","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}, {
TitleBar1: ["wm.Panel", {"_classes":{"domNode":["titlebar"]},"border":"0,0,4,0","height":"96px","horizontalAlign":"left","layoutKind":"left-to-right","padding":"8","verticalAlign":"top","width":"100%"}, {}, {
appNameLabel1: ["wm.Label", {"_classes":{"domNode":["wm_FontSizePx_24px"]},"caption":"LCL Import Seafreight tariff calculator","height":"100%","padding":"4","width":"100%"}, {}],
panel4: ["wm.Panel", {"border":"1","height":"100%","width":"222px"}, {}]
}],
FCL_Import_Form1: ["wm.LiveForm", {"desktopHeight":"256px","enableTouchHeight":true,"height":"256px","horizontalAlign":"left","mobileHeight":"295px","verticalAlign":"middle"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"usertariffsLiveVariableFCL","targetProperty":"dataSet"}, {}]
}],
pol: ["wm.Number", {"caption":"Port of Loading","captionSize":"150px","desktopHeight":"26px","emptyValue":"emptyString","formField":"portOfLoading","height":"26px","width":"210px"}, {}],
Weight: ["wm.Number", {"caption":"Weight (Kgs)","captionSize":"140px","desktopHeight":"26px","emptyValue":"emptyString","formField":"weight","height":"26px","width":"216px"}, {}],
volume: ["wm.Number", {"caption":"Volume (Cbm)","captionSize":"140px","desktopHeight":"26px","emptyValue":"emptyString","formField":"volume","height":"26px","width":"216px"}, {}],
del_location: ["wm.Number", {"caption":"Delivery Location (NL)","captionSize":"140px","desktopHeight":"26px","emptyValue":"emptyString","formField":"deliveryLocationNl","height":"26px","width":"279px"}, {}],
freight_rate_wm: ["wm.Text", {"caption":"Freight Rate w/m","captionSize":"150px","desktopHeight":"26px","emptyValue":"emptyString","formField":"freightRateWm","height":"26px","readonly":true,"width":"210px"}, {}],
expected_pallets: ["wm.Number", {"caption":"Expected # Pallets","captionSize":"150px","desktopHeight":"26px","emptyValue":"emptyString","formField":"expectedPallets","height":"26px","readonly":true,"width":"204px"}, {}],
exchange_rate2: ["wm.Number", {"caption":"ExchangeRate","captionSize":"150px","desktopHeight":"26px","emptyValue":"emptyString","formField":"exchangeRate","height":"26px","readonly":true,"width":"204px"}, {}],
panel6: ["wm.Panel", {"height":"48px","horizontalAlign":"center","layoutKind":"left-to-right","verticalAlign":"middle","width":"100%"}, {}, {
Calculate2: ["wm.Button", {"caption":"Calculate","margin":"4"}, {}]
}]
}]
}],
layer1: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"History","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}]
}]
}]
};

tariffs.prototype._cssText = '';
tariffs.prototype._htmlText = '';