sap.ui.define([],function(){
	return {
		delivery: function(sWeightUnit, iWeight){
			var sDelivery = "";
			
			if(sWeightUnit === "G"){
				iWeight = iWeight/1000;
			}
			
			if(iWeight > 0.5){
				sDelivery = "Mail Delivery";
			}else {
				sDelivery = "Carrier Delivery";
			}
			return sDelivery;
		},
		
		premium: function(iPrice){
			var sPremium = "";
			if(iPrice > 500){
				sPremium = "Premium Product";
			}else {
				sPremium = "Regular Product";
			}
			return sPremium;
		}
	};
});