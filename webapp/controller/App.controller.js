sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"opensap/myapp/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	], function(Controller, MessageToast, formatter, Filter, FilterOperator){
	return Controller.extend("opensap.myapp.controller.App", {
		
		formatter: formatter,
		
		onButtonClick :  function(){
			//alert("I am clicked!!");
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			//var sRecipient = this.getView.getModel("helloPanel").getProperty("/recipient/name");
			var msg = oBundle.getText("toastMessage");
			MessageToast.show(msg);
		},
		
		onProductSearch : function(searchEvent){
			var sQuery = searchEvent.getParameter("query");
			var aFilter = [];
			
			var aList = this.getView().byId("productList");
			var oBinding =  aList.getBinding("items");
			
			aFilter.push(new Filter("ProductID", FilterOperator.Contains, sQuery));
			oBinding.filter(aFilter);
		},
		
		onProductSelected : function(selectedEvent){
			var oSelectedProduct = selectedEvent.getSource();
			var oContext = oSelectedProduct.getBindingContext();
			var sPath = oContext.getPath();
			var oProductDetailsPanel = this.byId("productDetailsPanel");
			oProductDetailsPanel.bindElement({path:sPath});
			oProductDetailsPanel.setVisible(true);
			var sP = oProductDetailsPanel.getBindingContext().getPath();
			oSelectedProduct.bindElement({path:sP});
		},
		
		getSplitAppObj : function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		},
		
		onFriends : function(oEvent) {
			this.getSplitAppObj().to(this.createId("friends"));
		},
		
		onProfile : function(oEvent) {
			this.getSplitAppObj().to(this.createId("profile"));
		},
		
		onCommunities : function(oEvent) {
			this.getSplitAppObj().to(this.createId("communities"));
		},
		
		onMaster : function(oEvent) {
			this.getSplitAppObj().to(this.createId("master"));
		},
		
		onSearch : function (oEvent) {
				if (oEvent.getParameters().refreshButtonPressed) {
					// Search field's 'refresh' button has been pressed.
					// This is visible if you select any master list item.
					// In this case no new search is triggered, we only
					// refresh the list binding.
					this.onRefresh();
				} else {
					var aTableSearchState = [];
					var sQuery = oEvent.getParameter("query");
					var isFriendsSearch = oEvent.getSource().getId().toString().indexOf("friendsSearchField") !== -1;
					var filterField = isFriendsSearch ? "name/first" : "name";
					var oTable = isFriendsSearch ? this.byId("friendsTable") : this.byId("communitiesTable");
					
					if (sQuery && sQuery.length > 0) {
						aTableSearchState = [new Filter(filterField, FilterOperator.Contains, sQuery)];
					}
					oTable.getBinding("items").filter(aTableSearchState, "Application");
				}
		},
	});
});