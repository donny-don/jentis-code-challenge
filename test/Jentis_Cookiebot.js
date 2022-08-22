/**
 * by Daniel Dorn
 * 
 * documentation:
 * Lorem Isum
 * 
 */

function showJentisCosentBar() 
{
	// show Jentis consent bar
	jentis.consent.engine.userShowSettings();
}

function denyAllCookies()
{
	var sConsentId = jentis.consent.engine.DenyAll();
}

function acceptCookies(cookiebot) 
{
	
	// array's are better
	let tmp_preferences = false;
	let tmp_statistic = false;
	let tmp_marketing = false;

	// Präferänzen
	if (cookiebot.preferences) {
		tmp_preferences = true;
		console.log("cookie: preferences");
	}

	// Statistic
	if (cookiebot.statistics) {
		console.log("cookie: statistics");
		tmp_statistic = true;
	}

	// Marketing
	if (cookiebot.marketing) {
		console.log("cookie: Marketing");
		tmp_marketing = true;
		// Marketing akzeptieren und an Jentis Engine schicken: 
	}


	if(tmp_preferences || tmp_marketing || tmp_statistic)
	{
		var consentData = {
			"ga": tmp_statistic, // JentisConsentEngine.js, line: 70
			"fb": tmp_marketing,
			"adformdmp": true,
			"adw": true // temporary solved
		};

		jentis.consent.engine.setNewVendorConsents(consentData);
	}

}

// ----- work:

function readJentisData() 
{
	//Create the DataLayer Object to push later with basic information
	// var vendorData = window.jentis.consent.engine.getVendorFullData();
	
	var jentisDataLayer = {};
	jentisDataLayer.consentid = window.jentis.consent.engine.getConsentId();
	jentisDataLayer.lastupdate = window.jentis.consent.engine.getLastUpdateTime();
	// aVendorData = window.jentis.consent.engine.getAllConsents();
}

function readJentisEngineData()        // TODO
{
	var vendorData = window.jentis.consent.engine.getVendorFullData();

	//document.getElementById("demo").innerHTML = JSON.stringify(vendorData["googleanalytics"]);
	//console.log(vendorData);

	// !!!  purpores.name .id don't work with Jentis Cosent Bar 
	//		becouse the data object has beend modified !!!
	var newVendorData = {};
	var aPurposes = {};
	for (var sVendorId in vendorData) 
	{
		var oLoopVendorData = vendorData[sVendorId];
		//vendorData[sVendorId].purposes[0].id
		//window.alert(oLoopVendorData.purposes);

		if (typeof oLoopVendorData.category.id === "undefined") {
			oLoopVendorData.category.id = "-";
		}
		if (typeof oLoopVendorData.category.name === "undefined") {
			oLoopVendorData.category.name = "-";
		}

		var sJustificationId = oLoopVendorData.justification.id;
		var sCategoryId = oLoopVendorData.category.id;

		for (const ii in oLoopVendorData.purposes) {
			// window.alert("asd");

			const element = oLoopVendorData.purposes[ii].name;
			document.getElementById("demo").innerHTML += element + "| ";
		}

		// document.getElementById("demo").innerHTML += oLoopVendorData.category.id + " :: ";
		document.getElementById("demo").innerHTML += oLoopVendorData.sPurposeId + " :: ";

		// from Jentis_Consentbar.js
		/*
		newVendorData[sJustificationId] = newVendorData[sJustificationId] || {};

		newVendorData[sJustificationId]["justificationname"] = oLoopVendorData.justification.name;
		newVendorData[sJustificationId]["justificationid"] = oLoopVendorData.justification.id;
		newVendorData[sJustificationId]["categories"] = newVendorData[sJustificationId]["categories"] || {};

		newVendorData[sJustificationId]["categories"][sCategoryId] = newVendorData[sJustificationId]["categories"][sCategoryId] || {};

		newVendorData[sJustificationId]["categories"][sCategoryId]["categoryname"] = oLoopVendorData.category.name
		newVendorData[sJustificationId]["categories"][sCategoryId]["categoryid"] = oLoopVendorData.category.id;

		newVendorData[sJustificationId]["categories"][sCategoryId]["vendors"] = newVendorData[sJustificationId]["categories"][sCategoryId]["vendors"] || {};
		newVendorData[sJustificationId]["categories"][sCategoryId]["vendors"][sVendorId] = oLoopVendorData;

		var sVendorPurposeText = "";
		// window.alert(oLoopVendorData.category.purposes);
		
		
		if(typeof oLoopVendorData.purposes != "undefined" && oLoopVendorData.purposes.length > 0)
		{
			for(var iPurposeLoop =0; iPurposeLoop < oLoopVendorData.purposes.length; iPurposeLoop ++)
			{
				var sPurposeId = oLoopVendorData.purposes[iPurposeLoop].id;
				var sPurposeName = oLoopVendorData.purposes[iPurposeLoop].name;
				
				//document.getElementById("demo").innerHTML += sPurposeId + "| ";
				
				if(aPurposes[sPurposeId] !== true)
				{
					//window.alert(sPurposeId);

					document.getElementById("demo").innerHTML += "<br>wow: "+sPurposeName+", ";
					aPurposes[sPurposeId] = true;
				}
				
				sVendorPurposeText += sPurposeName+", ";
			}
		}
		
		if(sVendorPurposeText.length > 0)
		{
			sVendorPurposeText.substr(0,sVendorPurposeText.length-2);
		}
		
		//newVendorData[sJustificationId]["categories"][sCategoryId]["vendors"][sVendorId]["purposes"] = sVendorPurposeText;
		
		*/
	}
}