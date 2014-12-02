dojo.declare("Maintenance", wm.Page, {
start: function() {
},
"preferredDevice": "desktop",
_end: 0
});

Maintenance.widgets = {
containertypesLiveVariable1: ["wm.LiveVariable", {"type":"com.myproddb.data.ContainerTypes"}, {}, {
liveView: ["wm.LiveView", {"dataType":"com.myproddb.data.ContainerTypes","view":[
{"caption":"ContainerType","sortable":true,"dataIndex":"containerType","type":"java.lang.String","displayType":"Text","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":0,"subType":null},
{"caption":"Description","sortable":true,"dataIndex":"description","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1,"subType":null},
{"caption":"InsideLength","sortable":true,"dataIndex":"insideLength","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":2,"subType":null},
{"caption":"InsideWidth","sortable":true,"dataIndex":"insideWidth","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":3,"subType":null},
{"caption":"InsideHeight","sortable":true,"dataIndex":"insideHeight","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":4,"subType":null},
{"caption":"DoorWidth","sortable":true,"dataIndex":"doorWidth","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":5,"subType":null},
{"caption":"DoorHeight","sortable":true,"dataIndex":"doorHeight","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":6,"subType":null},
{"caption":"Capacity","sortable":true,"dataIndex":"capacity","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":7,"subType":null},
{"caption":"TareWeight","sortable":true,"dataIndex":"tareWeight","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":8,"subType":null},
{"caption":"MaxCargoWeight","sortable":true,"dataIndex":"maxCargoWeight","type":"java.lang.Float","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":9,"subType":null}
]}, {}]
}],
containertypesDialog: ["wm.DesignableDialog", {"height":"340px","title":"containertypes","width":"500px","containerWidgetId":"containerWidget","buttonBarId":"buttonBar"}, {}, {
containerWidget: ["wm.Container", {"_classes":{"domNode":["wmdialogcontainer","MainContent"]},"autoScroll":true,"height":"100%","horizontalAlign":"left","padding":"5","verticalAlign":"top","width":"100%"}, {}, {
containertypesLiveForm1: ["wm.LiveForm", {"alwaysPopulateEditors":true,"fitToContentHeight":true,"height":"270px","horizontalAlign":"left","liveEditing":false,"margin":"4","verticalAlign":"top"}, {"onSuccess":"myproddbLivePanel.popupLiveFormSuccess"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"containertypesDojoGrid.selectedItem","targetProperty":"dataSet"}, {}]
}],
containerTypeEditor1: ["wm.Text", {"caption":"ContainerType","captionSize":"140px","changeOnKey":true,"emptyValue":"emptyString","formField":"containerType","height":"26px","maxChars":5,"required":true,"width":"237px"}, {}],
descriptionEditor1: ["wm.Text", {"caption":"Description","captionSize":"140px","changeOnKey":true,"emptyValue":"emptyString","formField":"description","height":"26px","maxChars":50,"width":"100%"}, {}],
insideLengthEditor1: ["wm.Number", {"caption":"Inside Length","captionSize":"140px","changeOnKey":true,"emptyValue":"zero","formField":"insideLength","height":"26px","width":"267px"}, {}],
insideWidthEditor1: ["wm.Number", {"caption":"Inside Width","captionSize":"140px","changeOnKey":true,"emptyValue":"zero","formField":"insideWidth","height":"26px","width":"267px"}, {}],
insideHeightEditor1: ["wm.Number", {"caption":"InsideH eight","captionSize":"140px","changeOnKey":true,"emptyValue":"zero","formField":"insideHeight","height":"26px","width":"267px"}, {}],
doorWidthEditor1: ["wm.Number", {"caption":"DoorWidth","captionSize":"140px","changeOnKey":true,"emptyValue":"zero","formField":"doorWidth","height":"26px","width":"267px"}, {}],
doorHeightEditor1: ["wm.Number", {"caption":"Door Height","captionSize":"140px","changeOnKey":true,"emptyValue":"zero","formField":"doorHeight","height":"26px","width":"267px"}, {}],
capacityEditor1: ["wm.Number", {"caption":"Capacity","captionSize":"140px","changeOnKey":true,"emptyValue":"zero","formField":"capacity","height":"26px","width":"267px"}, {}],
tareWeightEditor1: ["wm.Number", {"caption":"TareWeight","captionSize":"140px","changeOnKey":true,"emptyValue":"zero","formField":"tareWeight","height":"26px","width":"267px"}, {}],
maxCargoWeightEditor1: ["wm.Number", {"caption":"MaxCargoWeight","captionSize":"140px","changeOnKey":true,"emptyValue":"zero","formField":"maxCargoWeight","height":"26px","width":"267px"}, {}]
}]
}],
buttonBar: ["wm.ButtonBarPanel", {"border":"1,0,0,0","borderColor":"#333333","height":"33px"}, {}, {
containertypesSaveButton: ["wm.Button", {"caption":"Save","margin":"4"}, {"onclick":"containertypesLiveForm1.saveDataIfValid"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"source":"containertypesLiveForm1.invalid","targetId":null,"targetProperty":"disabled"}, {}]
}]
}],
containertypesCancelButton: ["wm.Button", {"caption":"Cancel","margin":"4"}, {"onclick":"containertypesDialog.hide","onclick1":"containertypesLiveForm1.cancelEdit"}]
}]
}],
layoutBox1: ["wm.Layout", {"horizontalAlign":"left","verticalAlign":"top"}, {}, {
tabLayers1: ["wm.TabLayers", {}, {}, {
Accounts: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"Accounts","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}],
Master_data: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"Master Data","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}, {
tabLayers2: ["wm.TabLayers", {}, {}, {
container_types: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"Container Types","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}, {
myproddbLivePanel: ["wm.LivePanel", {"autoScroll":false,"horizontalAlign":"left","verticalAlign":"top"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"source":"containertypesDialog","targetId":null,"targetProperty":"dialog"}, {}],
wire1: ["wm.Wire", {"source":"containertypesLiveForm1","targetId":null,"targetProperty":"liveForm"}, {}],
wire2: ["wm.Wire", {"source":"containertypesDojoGrid","targetId":null,"targetProperty":"dataGrid"}, {}],
wire3: ["wm.Wire", {"source":"containertypesSaveButton","targetId":null,"targetProperty":"saveButton"}, {}]
}],
containertypesDojoGrid: ["wm.DojoGrid", {"columns":[
{"show":true,"field":"containerType","title":"Type","width":"5%","align":"left","formatFunc":"","mobileColumn":false},
{"show":true,"field":"description","title":"Description","width":"20%","align":"left","formatFunc":"","mobileColumn":false},
{"show":true,"field":"insideLength","title":"Inside Length","width":"5%","align":"right","formatFunc":"wm_number_formatter","formatProps":{"dijits":2},"mobileColumn":false},
{"show":true,"field":"insideWidth","title":"Inside Width","width":"5%","align":"right","formatFunc":"wm_number_formatter","formatProps":{"dijits":2},"mobileColumn":false},
{"show":true,"field":"insideHeight","title":"Inside Height","width":"5%","align":"right","formatFunc":"wm_number_formatter","formatProps":{"dijits":2},"mobileColumn":false},
{"show":true,"field":"doorWidth","title":"Door Width","width":"5%","align":"right","formatFunc":"wm_number_formatter","formatProps":{"dijits":2},"mobileColumn":false},
{"show":true,"field":"doorHeight","title":"Door Height","width":"5%","align":"right","formatFunc":"wm_number_formatter","formatProps":{"dijits":2},"mobileColumn":false},
{"show":true,"field":"capacity","title":"Capacity","width":"5%","align":"right","formatFunc":"wm_number_formatter","mobileColumn":false},
{"show":true,"field":"tareWeight","title":"Tare Weight","width":"5%","align":"right","formatFunc":"wm_number_formatter","formatProps":{"dijits":3},"mobileColumn":false},
{"show":true,"field":"maxCargoWeight","title":"Max Cargo Weight","width":"5%","align":"right","formatFunc":"wm_number_formatter","formatProps":{"dijits":3},"mobileColumn":false},
{"show":false,"field":"PHONE COLUMN","title":"-","width":"100%","align":"left","expression":"\"<div class='MobileRowTitle'>\" +\n\"Type: \" + ${containerType} +\n\"</div>\"\n\n+ \"<div class='MobileRow'>\" +\n\"Description: \" + ${description}\n + \"</div>\"\n\n+ \"<div class='MobileRow'>\" +\n\"Inside Length: \" + ${wm.runtimeId}.formatCell(\"insideLength\", ${insideLength}, ${this}, ${wm.rowId})\n + \"</div>\"\n\n+ \"<div class='MobileRow'>\" +\n\"Inside Width: \" + ${wm.runtimeId}.formatCell(\"insideWidth\", ${insideWidth}, ${this}, ${wm.rowId})\n + \"</div>\"\n\n+ \"<div class='MobileRow'>\" +\n\"Inside Height: \" + ${wm.runtimeId}.formatCell(\"insideHeight\", ${insideHeight}, ${this}, ${wm.rowId})\n + \"</div>\"\n\n+ \"<div class='MobileRow'>\" +\n\"Door Width: \" + ${wm.runtimeId}.formatCell(\"doorWidth\", ${doorWidth}, ${this}, ${wm.rowId})\n + \"</div>\"\n\n+ \"<div class='MobileRow'>\" +\n\"Door Height: \" + ${wm.runtimeId}.formatCell(\"doorHeight\", ${doorHeight}, ${this}, ${wm.rowId})\n + \"</div>\"\n\n+ \"<div class='MobileRow'>\" +\n\"Capacity: \" + ${wm.runtimeId}.formatCell(\"capacity\", ${capacity}, ${this}, ${wm.rowId})\n + \"</div>\"\n\n+ \"<div class='MobileRow'>\" +\n\"Tare Weight: \" + ${wm.runtimeId}.formatCell(\"tareWeight\", ${tareWeight}, ${this}, ${wm.rowId})\n + \"</div>\"\n\n+ \"<div class='MobileRow'>\" +\n\"Max Cargo Weight: \" + ${wm.runtimeId}.formatCell(\"maxCargoWeight\", ${maxCargoWeight}, ${this}, ${wm.rowId})\n + \"</div>\"\n\n","mobileColumn":true}
],"dsType":"com.myproddb.data.ContainerTypes","height":"100%","localizationStructure":{},"margin":"4"}, {"onCellDblClick":"myproddbLivePanel.popupLivePanelEdit"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"containertypesLiveVariable1","targetProperty":"dataSet"}, {}]
}]
}],
containertypesGridButtonPanel: ["wm.Panel", {"desktopHeight":"32px","enableTouchHeight":true,"height":"32px","horizontalAlign":"right","layoutKind":"left-to-right","mobileHeight":"40px","verticalAlign":"top","width":"100%"}, {}, {
containertypesNewButton: ["wm.Button", {"caption":"New","margin":"4"}, {"onclick":"myproddbLivePanel.popupLivePanelInsert"}],
containertypesUpdateButton: ["wm.Button", {"caption":"Update","margin":"4"}, {"onclick":"myproddbLivePanel.popupLivePanelEdit"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"source":"containertypesDojoGrid.emptySelection","targetId":null,"targetProperty":"disabled"}, {}]
}]
}],
containertypesDeleteButton: ["wm.Button", {"caption":"Delete","margin":"4"}, {"onclick":"containertypesLiveForm1.deleteData"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"source":"containertypesDojoGrid.emptySelection","targetId":null,"targetProperty":"disabled"}, {}]
}]
}]
}]
}]
}],
layer2: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"Countries","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}],
layer1: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"Port Codes","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}],
layer3: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"Locations","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}]
}]
}],
Tariff_set_up: ["wm.Layer", {"border":"1","borderColor":"#999999","caption":"Tarrif Set-up","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}]
}]
}]
};

Maintenance.prototype._cssText = '';
Maintenance.prototype._htmlText = '';