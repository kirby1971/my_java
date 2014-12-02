Main.widgets = {
	varTemplateLogout: ["wm.LogoutVariable", {}, {}, {
		input: ["wm.ServiceInput", {"type":"logoutInputs"}, {}]
	}],
	navigationCall1: ["wm.NavigationCall", {"operation":"gotoPageContainerPage"}, {}, {
		input: ["wm.ServiceInput", {"type":"gotoPageContainerPageInputs"}, {}, {
			binding: ["wm.Binding", {}, {}, {
				wire: ["wm.Wire", {"expression":"\"tariffs\"","targetProperty":"pageName"}, {}],
				wire1: ["wm.Wire", {"expression":undefined,"source":"pageContainer1","targetProperty":"pageContainer"}, {}]
			}]
		}]
	}],
	navigationCall2: ["wm.NavigationCall", {"operation":"gotoPageContainerPage"}, {}, {
		input: ["wm.ServiceInput", {"type":"gotoPageContainerPageInputs"}, {}, {
			binding: ["wm.Binding", {}, {}, {
				wire: ["wm.Wire", {"expression":"\"Maintenance\"","targetProperty":"pageName"}, {}],
				wire1: ["wm.Wire", {"expression":undefined,"source":"pageContainer1","targetProperty":"pageContainer"}, {}]
			}]
		}]
	}],
	layoutBox1: ["wm.Layout", {"horizontalAlign":"center","layoutKind":"left-to-right","verticalAlign":"top"}, {}, {
		panel1: ["wm.Panel", {"border":"0,1,0,0","borderColor":"#999999","height":"100%","horizontalAlign":"left","minDesktopHeight":600,"minHeight":600,"minWidth":900,"verticalAlign":"top","width":"75%"}, {}, {
			panel2: ["wm.HeaderContentPanel", {"border":"0,0,1,0","height":"148px","horizontalAlign":"left","layoutKind":"left-to-right","padding":"0,10,0,10","styles":{},"verticalAlign":"middle","width":"100%"}, {}, {
				picture1: ["wm.Picture", {"height":"125px","link":"http://www.foxgl.nl","source":"resources/images/imagelists/fox.jpg","width":"363px"}, {}],
				label3: ["wm.Label", {"caption":"Get your Tariffs","height":"35px","padding":"4","width":"100%"}, {}],
				logoutButton: ["wm.Button", {"caption":"Logout","height":"40px","margin":"4"}, {"onclick":"varTemplateLogout"}]
			}],
			panel3: ["wm.Panel", {"height":"100%","horizontalAlign":"left","layoutKind":"left-to-right","styles":{},"verticalAlign":"top","width":"100%"}, {}, {
				panel5: ["wm.Panel", {"height":"100%","horizontalAlign":"left","styles":{"fontSize":"12px","fontWeight":"bold","color":"#ffffff","fontFamily":"Arial"},"verticalAlign":"top","width":"120px"}, {}, {
					dojoMenu1: ["wm.DojoMenu", {"_classes":{"domNode":["ClickableDojoMenu"]},"border":"0,0,0,0","fullStructure":[
{"label":"Tariffs","separator":undefined,"defaultLabel":"Tariffs","iconClass":"app_silkIconList_23","imageList":"app.silkIconList","idInPage":undefined,"isCheckbox":false,"onClick":"navigationCall1","children":[]},
{"label":"History","separator":undefined,"defaultLabel":"History","iconClass":"app_silkIconList_74","imageList":"app.silkIconList","idInPage":undefined,"isCheckbox":false,"onClick":undefined,"children":[]},
{"label":"Settings","separator":undefined,"defaultLabel":"Settings","iconClass":"app_silkIconList_18","imageList":"app.silkIconList","idInPage":undefined,"isCheckbox":false,"onClick":undefined,"children":[]}
],"height":"115px","localizationStructure":{},"margin":"0,0,0,0","openOnHover":true,"styles":{"color":"#0a0000","backgroundColor":"#003366"},"transparent":false,"vertical":true}, {}],
					dojoMenu2: ["wm.DojoMenu", {"fullStructure":[
{"label":"Maintenance","separator":undefined,"defaultLabel":"Maintenance","iconClass":"app_silkIconList_58","imageList":"app.silkIconList","idInPage":undefined,"isCheckbox":false,"onClick":"navigationCall2","children":[]}
],"height":"417px","localizationStructure":{},"openOnHover":true,"roles":["administrator"],"styles":{"backgroundColor":"#003366","borderRadius":"0px","fontSize":"12px","color":"#ffffff","fontWeight":"bold","fontFamily":"Arial"},"vertical":true}, {}]
				}],
				panel4: ["wm.MainContentPanel", {"height":"562px","horizontalAlign":"left","layoutKind":"left-to-right","styles":{},"verticalAlign":"top","width":"100%"}, {}, {
					pageContainer1: ["wm.PageContainer", {"deferLoad":true,"styles":{"borderRadius":"0px"}}, {}]
				}]
			}],
			panel6: ["wm.HeaderContentPanel", {"height":"24px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
				picture2: ["wm.Picture", {"height":"100%","source":"lib/wm/base/widget/themes/default/images/wmSmallLogo.png","width":"24px"}, {}],
				label2: ["wm.Label", {"_classes":{"domNode":["wm_FontSizePx_10px"]},"caption":"Powered by WaveMaker","height":"100%","padding":"4","styles":{}}, {}],
				label1: ["wm.Label", {"_classes":{"domNode":["wm_FontSizePx_10px"]},"align":"right","caption":"Copyright 2014 [company name]","height":"100%","padding":"4","width":"100%"}, {}]
			}]
		}]
	}]
}