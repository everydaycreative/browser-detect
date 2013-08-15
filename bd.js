/*!
 *  browser-detect  version: 0.1
 *  Browser vendor, touch and retina conditional loading.
 *  http://github.com/everydaycreative/browser-detect
 *  Authors: @everydaycreative
 *  Copyright 2013 Everyday Creative. LGPL licensed.
 */
(function($jquery, win){
	var $ = ($jquery === undefined)?null:$jquery;

	var classes=["bdjs"];
	var bdetect = {
		touch: false,
		devices:{
			mobile: false,
			phone: false,
			tablet: false
		},

		dpi:{
			report: false,	//can't report 
			ldpi: false,	//0.75
			mdpi: false,	//1.0
			hdpi: false,	//1.5
			xhdpi: false 	//2.0
			/*
				it reports
				xhdpi for 2.0 pixel ratios
				hdpi

				if there is no report no-dpi
			*/
		},

		os:{
			android: false,
			blackberry: false,
			ios: false,
			linux: false,
			mac: false,
			win: false,
			winphone: false,
			x11: false
		},

		browser:{
			safari: false,
			firefox: false,
			chrome: false, 
			ie: false
		},

		bengine:{
			opera: false,
			webkit: false,
			gecko: false,
			trident: false
		}
	};

	var browser_detect = {
		test: null,
		report: null,
		detect: null,
		run: null,

		check: bdetect
	};


	win['bdjs'] = bdetect;

	var tests = [];
	//feature detection
	var detect_touch = function(){
		//http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
		if('ontouchstart' in window || 'onmsgesturechange' in window){
			classes.push('touch');
		}else{
			classes.push('no-touch');
		}
	};
	tests.push(detect_touch);

	var detect_dpi = function(){
		if('devicePixelRatio' in window){
			console.log("devicePixelRatio registered");
			bdetect.dpi.report = true;
			var dpi = parseFloat(window.devicePixelRatio);
			if(dpi < 1.0){
				bdetect.dpi.ldpi = true;
				classes.push("ldpi");
			}else if(dpi >= 1.0 && dpi < 1.5){
				bdetect.dpi.mdpi = true;
				classes.push("mdpi");
			}else if(dpi >= 1.5 && dpi < 2.0){
				bdetect.dpi.hdpi = true;
				classes.push("hdpi");
			}else if(dpi >= 2.0){
				bdetect.dpi.xhdpi = true;
				classes.push("xhdpi");
			}

		}else{
			bdetect.dpi.report = false;
			classes.push("no-dpi");
		}
	};
	tests.push(detect_dpi);

	var detect_device_type = function(){
		var ua = navigator.userAgent;
		var mobile_regexp = /(?:iPhone)|(?:iPad)|(?:Android)|(?:Windows Phone)|(?:Windows Mobile)|(?:BlackBerry)|(?:Mobile)|(?:tablet)|(?:phone)/i;
		var mobile = mobile_regexp.test(ua);
		if(mobile){
			bdetect.devices.mobile = true;
		}
		//run the check for android
		var test_android = /(?:Android)/i;
		var test_linux = /(?:Linux)/i;
		var test_iphone = /(?:iPhone)/i;
		var test_ipad = /(?:iPad)/i;

		var test_IEMobile = /(?:IEMobile)/i;
		var test_arm = /(?:ARM)/i;
		var test_windowsphone = /(?:Windows Phone)/i;
		var test_windowsmobile = /(?Windows Mobile)/i;


		//detect device and os
		if(test_android.test(ua)){
			bdetect.os.android = true;
			classes.push('android');
			//check if the user-agent string contains 'mobile'
			if(false/*mobile check*/){
				//then it is a phone
				bdetect.devices.phone = true;

			}else{
				//if no mobile string, it's a tablet
				bdetect.devices.tablet = true;
			}
		}else if(test_linux.test(ua) && !test_android.test(ua)){
			bdetect.os.linux = true;
		}else if(test_iphone.test(ua)){
			bdetect.os.ios = true;
			bdetect.devices.phone = true;
		}else if(test_ipad.test(ua)){
			bdetect.os.ios = true;
			bdetect.devices.tablet = true;
		}else if(/*blackberry*/){

		}else if(/*blackberry playbook*/){

		}else if(/*windows*/){

		}else if(/*windows mobile*/){

		}else if(/*windows phone*/){

		}

		//check if it is a phone, or tablet, or mobile
		//or not mobile
		if(bdetect.devices.phone){
			classes.push('phone');
		}else if(bdetect.devices.tablet){
			classes.push('tablet');
		}else{
			classes.push('pc');
		}

		if(bdetect.devices.mobile){
			classes.push('mobile');
		}else{
			classes.push('no-mobile')
		}

		if(bdetect.os.ios){
			classes.push('ios');
			if(bdetect.devices.phone)
			{
				classes.push('phone');
				classes.push('iphone');
			}else if(bdetect.devices.tablet){
				classes.push('tablet');
				classes.push('ipad');
			}
		}	

	}
	tests.push(detect_device_type);

	//exceute the test suites
	for(var k = 0; k < tests.length;k++){
		tests[k]();
	}

	var detect_jquery = function(){
		//check for jQuery
		if($jquery){
			classes.push("jq");
		}else{
			classes.push('no-jq');
		}
	};
	test.push(detect_jquery);

	//now add the css reporting
	(function(){

		//process existing classnames, remove no-js if it
		//exists
		var csn = document.documentElement.className.split(" ");
		var leftovers = "";
		
		//now combine the rest
		for(var x = 0; x < classes.length; x++){
			csn.push(classes[x]);
		}

		for(var x = 0; x < csn.length; x++){
			if(csn[x] != "no-js"){
				leftovers += (x <= 0)?csn[x]:" " + csn[x];
			}
		}


		document.documentElement.className = leftovers;

	})();


})(this.jQuery, window); //(typeof jQuery=="undefined"?undefined:jQuery)