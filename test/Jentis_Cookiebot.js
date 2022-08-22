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

function updateConsentData(cookiebot)
{
	var consentDataLayer = {};
	consentDataLayer.consentid = window.jentis.consent.engine.getConsentId();
	consentDataLayer.lastupdate = window.jentis.consent.engine.getLastUpdateTime();

	var vendorData = window.jentis.consent.engine.getVendorFullData();
	for (const key in vendorData) 
	{
		let oVendorLoop = vendorData[key];

		if(oVendorLoop.vendor.id == "googleanalytics")
		{
			consentDataLayer["googleanalytics"] = cookiebot.statistics;
		}
		else if(oVendorLoop.vendor.id == "facebook")
		{
			consentDataLayer["facebook"] = cookiebot.marketing;
		}
		else
		{
			consentDataLayer[oVendorLoop.vendor.id] = cookiebot.preferences;
		}
	}
	
	console.log(consentDataLayer);
	jentis.consent.engine.setNewVendorConsents(consentDataLayer);

}
