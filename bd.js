/*!
 *  browser-detect  version: 0.1
 *  Browser vendor, touch and retina conditional loading.
 *  http://github.com/everydaycreative/browser-detect
 *  Authors: @everydaycreative
 *  Copyright 2013 Everyday Creative. LGPL licensed.
 */
(function($jquery, win){
	var $ = ($jquery === undefined)?null:$jquery;

	var bdetect = {
		touch: false,
		devices:{
			mobile: false,
			phone: false,
			tablet: false,
		},

		dpi{
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

		os{
			android: false,
			blackberry: false,
			ios: false,
			linux: false,
			mac: false,
			win: false,
			winphone: false,
			x11: false
		}
	};
	window['brswrdetct'] = bdetect;

	var tests = [];
	//feature detection
	var detect_touch = function(){

	};
	test.push(detect_touch);

	var detect_dpi = function(){
		if('devicePixelRatio' in window){
			console.log("devicePixelRatio registered");
			bdetect.dpi.report = true;
			var dpi = parseFloat(window.devicePixelRatio);
			if(dpi < 1.0){
				bdetect.dpi.ldpi = true;
			}else if(dpi >= 1.0 && dpi < 1.5){
				bdetect.dpi.mdpi = true;
			}else if(dpi >= 1.5 && dpi < 2.0){
				bdetect.dpi.hdpi = true;
			}else if(dpi >= 2.0){
				bdetect.dpi.xhdpi = true;
			}

		}else{
			bdetect.dpi.report = false;
		}
	};
	tests.push(detect_dpi);


	//exceute the test suites
	for(var k = 0; k < tests.length;k++){
		test[k]();
	}

	//check for jQuery
	if($jquery){

	}

	//now add the css reporting

})(jQuery, window);