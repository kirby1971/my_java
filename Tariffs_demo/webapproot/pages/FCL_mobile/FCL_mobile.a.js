dojo.declare("FCL_mobile", wm.Page, {
start: function() {
},
"preferredDevice": "desktop",
_end: 0
});

FCL_mobile.widgets = {
usertariffsLiveVariable2: ["wm.LiveVariable", {"autoUpdate":false,"operation":"insert","startUpdate":false,"type":"com.myproddb.data.UserTariffs"}, {}, {
liveView: ["wm.LiveView", {"dataType":"com.myproddb.data.UserTariffs","related":["id","rel_port_of_loading","rel_container_type","rel_delivery_location_nl"],"view":[
{"caption":"PortOfLoading","sortable":true,"dataIndex":"portOfLoading","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1,"subType":null},
{"caption":"FreightRateWm","sortable":true,"dataIndex":"freightRateWm","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":2,"subType":null},
{"caption":"Volume","sortable":true,"dataIndex":"volume","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":3,"subType":null},
{"caption":"ExpectedPallets","sortable":true,"dataIndex":"expectedPallets","type":"java.lang.Integer","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":4,"subType":null},
{"caption":"ExchangeRate","sortable":true,"dataIndex":"exchangeRate","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":5,"subType":null},
{"caption":"DeliveryLocationNl","sortable":true,"dataIndex":"deliveryLocationNl","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":6,"subType":null},
{"caption":"OceanfreightAmount","sortable":true,"dataIndex":"oceanfreightAmount","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":7,"subType":null},
{"caption":"CfsChargesDest","sortable":true,"dataIndex":"cfsChargesDest","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":8,"subType":null},
{"caption":"DelOrderFee","sortable":true,"dataIndex":"delOrderFee","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":9,"subType":null},
{"caption":"CustomsValue","sortable":true,"dataIndex":"customsValue","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":10,"subType":null},
{"caption":"TransportDestCosts","sortable":true,"dataIndex":"transportDestCosts","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":11,"subType":null},
{"caption":"DieselSurcharge","sortable":true,"dataIndex":"dieselSurcharge","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":12,"subType":null},
{"caption":"HandlingFeeLcl","sortable":true,"dataIndex":"handlingFeeLcl","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21013,"subType":null,"widthUnits":"px"},
{"caption":"FclLcl","sortable":true,"dataIndex":"fclLcl","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21014,"subType":null,"widthUnits":"px"},
{"caption":"ContainerType","sortable":true,"dataIndex":"containerType","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21015,"subType":null,"widthUnits":"px"},
{"caption":"Distance","sortable":true,"dataIndex":"distance","type":"java.lang.Integer","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21016,"subType":null,"widthUnits":"px"},
{"caption":"Range","sortable":true,"dataIndex":"range","type":"java.lang.Integer","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21017,"subType":null,"widthUnits":"px"},
{"caption":"DeltaEuromax","sortable":true,"dataIndex":"deltaEuromax","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21018,"subType":null,"widthUnits":"px"},
{"caption":"ThcChargesCarrier","sortable":true,"dataIndex":"thcChargesCarrier","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21019,"subType":null,"widthUnits":"px"},
{"caption":"Isps","sortable":true,"dataIndex":"isps","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21020,"subType":null,"widthUnits":"px"},
{"caption":"DeliveryOrderFee","sortable":true,"dataIndex":"deliveryOrderFee","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21021,"subType":null,"widthUnits":"px"},
{"caption":"ContainertransportToDestination","sortable":true,"dataIndex":"containertransportToDestination","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21022,"subType":null,"widthUnits":"px"},
{"caption":"DeltaEuromaxSurcharge","sortable":true,"dataIndex":"deltaEuromaxSurcharge","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21023,"subType":null,"widthUnits":"px"},
{"caption":"AllInHandlingFee","sortable":true,"dataIndex":"allInHandlingFee","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21024,"subType":null,"widthUnits":"px"},
{"caption":"Status","sortable":true,"dataIndex":"status","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":21025,"subType":null,"widthUnits":"px"},
{"caption":"UserId","sortable":true,"dataIndex":"id.userId","type":"java.lang.String","displayType":"Text","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":22000,"subType":null,"widthUnits":"px"},
{"caption":"TariffSeq","sortable":true,"dataIndex":"id.tariffSeq","type":"java.lang.Integer","displayType":"Number","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":22001,"subType":null,"widthUnits":"px"},
{"caption":"DataTime","sortable":true,"dataIndex":"id.dataTime","type":"java.util.Date","displayType":"Date","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":22002,"subType":null,"widthUnits":"px"},
{"caption":"PortCode","sortable":true,"dataIndex":"rel_port_of_loading.portCode","type":"java.lang.String","displayType":"Text","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":23000,"subType":null,"widthUnits":"px"},
{"caption":"PortName","sortable":true,"dataIndex":"rel_port_of_loading.portName","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":23001,"subType":null,"widthUnits":"px"},
{"caption":"PortCountry","sortable":true,"dataIndex":"rel_port_of_loading.portCountry","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":23002,"subType":null,"widthUnits":"px"},
{"caption":"LoCode","sortable":true,"dataIndex":"rel_port_of_loading.loCode","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":23003,"subType":null,"widthUnits":"px"},
{"caption":"ContainerType","sortable":true,"dataIndex":"rel_container_type.containerType","type":"java.lang.String","displayType":"Text","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":24000,"subType":null,"widthUnits":"px"},
{"caption":"Description","sortable":true,"dataIndex":"rel_container_type.description","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":24001,"subType":null,"widthUnits":"px"},
{"caption":"InsideLength","sortable":true,"dataIndex":"rel_container_type.insideLength","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":24002,"subType":null,"widthUnits":"px"},
{"caption":"InsideWidth","sortable":true,"dataIndex":"rel_container_type.insideWidth","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":24003,"subType":null,"widthUnits":"px"},
{"caption":"InsideHeight","sortable":true,"dataIndex":"rel_container_type.insideHeight","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":24004,"subType":null,"widthUnits":"px"},
{"caption":"DoorWidth","sortable":true,"dataIndex":"rel_container_type.doorWidth","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":24005,"subType":null,"widthUnits":"px"},
{"caption":"DoorHeight","sortable":true,"dataIndex":"rel_container_type.doorHeight","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":24006,"subType":null,"widthUnits":"px"},
{"caption":"Capacity","sortable":true,"dataIndex":"rel_container_type.capacity","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":24007,"subType":null,"widthUnits":"px"},
{"caption":"TareWeight","sortable":true,"dataIndex":"rel_container_type.tareWeight","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":24008,"subType":null,"widthUnits":"px"},
{"caption":"MaxCargoWeight","sortable":true,"dataIndex":"rel_container_type.maxCargoWeight","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":24009,"subType":null,"widthUnits":"px"},
{"caption":"Code","sortable":true,"dataIndex":"rel_delivery_location_nl.code","type":"java.lang.String","displayType":"Text","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":25000,"subType":null,"widthUnits":"px"},
{"caption":"Name","sortable":true,"dataIndex":"rel_delivery_location_nl.name","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":25001,"subType":null,"widthUnits":"px"},
{"caption":"SubDivision","sortable":true,"dataIndex":"rel_delivery_location_nl.subDivision","type":"java.lang.String","displayType":"Text","required":true,"readonly":false,"includeLists":true,"includeForms":true,"order":25002,"subType":null,"widthUnits":"px"},
{"caption":"Status","sortable":true,"dataIndex":"rel_delivery_location_nl.status","type":"java.lang.String","displayType":"Text","required":true,"readonly":false,"includeLists":true,"includeForms":true,"order":25003,"subType":null,"widthUnits":"px"},
{"caption":"Date","sortable":true,"dataIndex":"rel_delivery_location_nl.date","type":"java.util.Date","displayType":"Date","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":25004,"subType":null,"widthUnits":"px"},
{"caption":"Iata","sortable":true,"dataIndex":"rel_delivery_location_nl.iata","type":"java.lang.String","displayType":"Text","required":true,"readonly":false,"includeLists":true,"includeForms":true,"order":25005,"subType":null,"widthUnits":"px"},
{"caption":"Coordinates","sortable":true,"dataIndex":"rel_delivery_location_nl.coordinates","type":"java.lang.String","displayType":"Text","required":true,"readonly":false,"includeLists":true,"includeForms":true,"order":25006,"subType":null,"widthUnits":"px"}
]}, {}]
}],
layoutBox1: ["wm.Layout", {"horizontalAlign":"left","verticalAlign":"top"}, {}, {
panel1: ["wm.Panel", {"height":"33%","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}],
panel3: ["wm.Panel", {"height":"33%","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
liveForm1: ["wm.LiveForm", {"desktopHeight":"155px","enableTouchHeight":true,"fitToContentHeight":true,"height":"155px","horizontalAlign":"center","mobileHeight":"1094px","readonly":true,"verticalAlign":"middle"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"usertariffsLiveVariable2","targetProperty":"dataSet"}, {}],
wire1: ["wm.Wire", {"expression":undefined,"source":"idRelatedEditor2.dataOutput","targetProperty":"dataOutput.id"}, {}]
}],
POL: ["wm.Lookup", {"caption":"POL","captionSize":"140px","dataType":"com.myproddb.data.PortCodes","desktopHeight":"35px","displayField":"portName","formField":"rel_port_of_loading","height":"35px","required":true,"width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
dataFieldWire: ["wm.Wire", {"source":"POL.liveVariable","targetProperty":"dataSet"}, {}]
}]
}],
rel_container_typeLookup2: ["wm.Lookup", {"caption":"Container Type","captionSize":"140px","dataType":"com.myproddb.data.ContainerTypes","desktopHeight":"35px","displayField":"description","formField":"rel_container_type","height":"35px","required":true,"width":"100%"}, {}],
rel_delivery_location_nlLookup2: ["wm.Lookup", {"caption":"Delivery location","captionSize":"140px","dataType":"com.myproddb.data.Locations","desktopHeight":"35px","displayField":"coordinates","formField":"rel_delivery_location_nl","height":"35px","required":true,"width":"100%"}, {}],
liveForm1EditPanel: ["wm.EditPanel", {"desktopHeight":"32px","height":"32px","liveForm":"liveForm1","operationPanel":"operationPanel1","savePanel":"savePanel1","showing":false}, {}, {
savePanel1: ["wm.Panel", {"height":"100%","horizontalAlign":"right","layoutKind":"left-to-right","showing":false,"verticalAlign":"top","width":"100%"}, {}, {
saveButton1: ["wm.Button", {"_classes":{"domNode":["SubmitButton"]},"caption":"Save","height":"100%","margin":"4"}, {"onclick":"liveForm1EditPanel.saveData"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"liveForm1EditPanel.formInvalid","targetProperty":"disabled"}, {}]
}]
}],
cancelButton1: ["wm.Button", {"caption":"Cancel","height":"100%","margin":"4"}, {"onclick":"liveForm1EditPanel.cancelEdit"}]
}],
operationPanel1: ["wm.Panel", {"height":"100%","horizontalAlign":"right","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
newButton1: ["wm.Button", {"caption":"New","height":"100%","margin":"4"}, {"onclick":"liveForm1EditPanel.beginDataInsert"}],
updateButton1: ["wm.Button", {"caption":"Update","height":"100%","margin":"4"}, {"onclick":"liveForm1EditPanel.beginDataUpdate"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"liveForm1EditPanel.formUneditable","targetProperty":"disabled"}, {}]
}]
}],
deleteButton1: ["wm.Button", {"caption":"Delete","height":"100%","margin":"4"}, {"onclick":"liveForm1EditPanel.deleteData"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"liveForm1EditPanel.formUneditable","targetProperty":"disabled"}, {}]
}]
}]
}]
}],
panel4: ["wm.Panel", {"height":"48px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
button1: ["wm.Button", {"caption":"Get Tariffs","height":"100%","margin":"4","width":"100%"}, {}]
}]
}]
}],
panel2: ["wm.Panel", {"height":"34%","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}]
}]
};

FCL_mobile.prototype._cssText = '';
FCL_mobile.prototype._htmlText = '';