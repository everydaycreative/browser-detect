/*!
 *  Browser-Detect  version: 0.5
 *  Reports browser vendor, touch and dpi checking upon loading.
 *  http://github.com/everydaycreative/browser-detect
 *  Authors: @everydaycreative (everydaycreative.ca)
 *  Copyright 2013 Everyday Creative, unless stated otherwise.
 *  LGPL licensed.
 */
(function($jquery, win, prefix){
	var copy_feature_tree = function(new_tree, tree){
		for(var x in tree){
			try{
				if(tree[x].constructor === Object){
					new_tree[x] = {};
					copy_feature_tree(new_tree[x], tree[x])
				}else{
					new_tree[x] = tree[x];
				}
			}catch(error){
				new_tree[x] = tree[x]
			}
		}
	};

	var reset_feature_tree = function(tree){
		for(var x in tree){
			try{
				if(tree[x].constructor === Object){
					reset_feature_tree(tree[x]);
				}else{
					tree[x] = false;
				}

			}catch (error){
				tree[x] = false;
			}
		}

	};

	var classname_from_feature = function(feature, state){
		if(feature.constructor === Array){
			if(state){
				return feature[0];
			}else{
				if(feature.length == 2){
					return feature[1];
				}
			}
		}
		return "";
	};

	var evaluate_features = function(states, features){
		var k;
		for(var x in states){
			try{
				if(states[x].constructor === Object){
					evaluate_features(states[x], features[x]);
				}else{
					k = classname_from_feature(features[x], states[x]);
					if(k != "")
						classes.push(k);
				}
			}catch(error){
				k = classname_from_feature(features[x], states[x]);
				if(k != "")
					classes.push(k);
			}
		}
	};

	var classes = classes_init = ['bdjs'];
	var tests = [];
	var feature_detect = {
		"touch": ['touch', 'no-touch'],
		"jq": ['jq', 'no-jq'],
		"devices":{
			"mobile": ['mobile', 'no-mobile'],
			"phone": ['phone'],
			"tablet": ['tablet'],
			"iphone": ['iphone'],
			"ipad": ['ipad'],
			"playbook": ['playbook'],
			"other": false
		},
		"dpi":{
			"report": false,	//can't report 
			"ldpi": ['ldpi'],	//0.75
			"mdpi": ['mdpi'],	//1.0
			"hdpi": ['hdpi'],	//1.5
			"xhdpi":['xhdpi'] 	//2.0
			/*
				it reports
				xhdpi for 2.0 pixel ratios
				hdpi

				if there is no report no-dpi
			*/
		},
		/*
			implementing the definition
			provided by android guide lines
			are not useful. The small, medium, large
			and xlarge classes for screens correspond
			basically to the land of mobile devices 
			with physical screen sizes of less than 10
			inches. 
		"screen":{
			"report": false,
			"small": ['small-screen'],
			"medium": ['medium-screen'],
			"large": ['large-screen'],
			"xlarge": ['xlarge-screen']
		}, */
		"os":{
			"android": ['android'],
			"blackberry": ['blackberry'],
			"ios": ['ios'],
			"linux": ['linux'],
			"mac": ['mac'],
			"win": ['win'],
			"winmobile": ['winmobile'],
			"winphone": ['winphone'],
			"x11": ['x11']
		}, 
		"browser":{
			"version": "",
			"safari": ['safari'],
			"safari_mobile": ['safari-mobile'],
			"firefox": ['ff'],
			"chrome": ['chrome'], 
			"ie": ['ie'],
			"ie_mobile": ['ie-mobile'],
			"opera": ['opera']
		},

		"bengine":{
			"presto": ['presto'],
			"webkit": ['webkit'],
			"gecko": ['gecko'],
			"trident": ['trident']
		}
	};

	var browser_detect = {
		"test": null,
		"report": null,
		"detect": feature_detect,
		"run": null
	};
	win['bdjs'] = browser_detect;
	var bdetect = feature_detect;
	var features = {};
	copy_feature_tree(features, feature_detect);
	reset_feature_tree(feature_detect);

	var test = function(){
		for(var k = 0; k < tests.length;k++){
			tests[k]();
		}
	};

	var report = function(pprefix){
		var dom = document.documentElement;
		var cint = classes_init;
		var prefix_label = (pprefix == true)?"bdjs-":"";
		//reset the registered classes 
		//for a fresh report.
		classes = cint.slice(0);
		//evaluate features-tree based on states-tree
		evaluate_features(feature_detect, features);
		//process existing classnames, remove no-js if it
		//exists
		var csn = dom.className.split(" ");
		var leftovers = "";
		var c,v=[];

		//prefix if necessary
		if(pprefix){
			for(var x = 0; x < classes.length; x++){
				c = classes[x];
		 		c = (cint.indexOf(c) == -1)?prefix_label+c:c;
		 		v.push(c);
			}
			classes = v;
		}

		//now combine the rest, and deduplicate
		for(var x = 0; x < classes.length; x++){
			c = classes[x];
			if(csn.indexOf(c) == -1){
				csn.push(c);
			}
		}

		var end_result = [];
		for(var x = 0; x < csn.length; x++){
			c = csn[x];
			if(c != "no-js" && c != ""){
				end_result.push(c);
			}
		}
		leftovers = end_result.join(" ");
		dom.className = leftovers;
	};

	var run = function(_prefix){
		test();
		report(_prefix);
	};

	browser_detect['report'] = report;
	browser_detect['run'] = run;
	browser_detect['test'] = test;

	var detect_touch = function(){
		//@Author: http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
		if('ontouchstart' in window || 'onmsgesturechange' in window){
			bdetect['touch'] = true;
		}
	};
	tests.push(detect_touch);

	var detect_dpi = function(){
		var odpi = bdetect['dpi'];
		if('devicePixelRatio' in window){
			//console.log("devicePixelRatio registered");
			odpi['report'] = true;
			var dpi = parseFloat(window.devicePixelRatio);
			if(dpi < 1.0){
				odpi['ldpi'] = true;
			}else if(dpi >= 1.0 && dpi < 1.5){
				odpi['mdpi'] = true;
			}else if(dpi >= 1.5 && dpi < 2.0){
				odpi['hdpi'] = true;
			}else if(dpi >= 2.0){
				odpi['xhdpi'] = true;
			}
		}
	};
	tests.push(detect_dpi);


	var detect_jquery = function(){
		//check for jQuery
		if($jquery){
			bdetect['jq'] = true;
		}
	};
	tests.push(detect_jquery);


	var regex_collection = function(){
		this.collection = [];
		this.add = function(p){
			this.collection.push(p);
		}
		this.test = function(s){
			var res = false, c = this.collection;
			for(var k = 0; k < c.length; k++){
				res = res || c[k].test(s);
			}
			return res;
		};
	};

	var recombine = function(rexp, collection){
		if(!(collection == null || collection === undefined)){
			collection.add(rexp);
		}
		return rexp;
	};

	var regex_device = function(exp){
		return new RegExp("(?:"+exp+")", "i");
	};

	var detect_device_type = function(){
		var ua = navigator.userAgent;
		var devices = bdetect['devices'];
		var os = bdetect['os'];

		var mobile_regexp = new regex_collection();
		var test_tablet = recombine(/(?:Tablet)/i, mobile_regexp);
		var test_phone = recombine(/(?:Phone)/i, mobile_regexp);
		var test_mobile_str = recombine(/(?:Mobile)/i, mobile_regexp);

		//run the check for android
		var test_android = recombine(/(?:Android)/i, mobile_regexp);
		var test_linux = /(?:Linux)/i;
		var test_iphone = recombine(/(?:iPhone)/i, mobile_regexp);
		var test_ipad = recombine(/(?:iPad)/i, mobile_regexp);
		var test_ipod = recombine(/(?:iPod)/i, mobile_regexp);

		//var test_IEMobile = recombine(/(?:IEMobile)/i, mobile_regexp);
		//var test_arm = /(?:ARM)/i;
		var test_windows = /(?:Windows NT)/i;
		var test_windowsphone = recombine(/(?:Windows Phone)/i, mobile_regexp);
		var test_windowsmobile = recombine(/(?:Windows Mobile)/i, mobile_regexp);

		var test_blackberry = recombine(/(?:BlackBerry)/i, mobile_regexp);
		var test_rim = regex_device("RIM Tablet");
		var test_playbook = regex_device("Playbook");
		var test_bbplaybook = new regex_collection();
		recombine(test_playbook, test_bbplaybook);
		recombine(test_rim, test_bbplaybook);
		recombine(test_bbplaybook, mobile_regexp)

		var test_macos = /(?:Mac Os X)/i;
		var test_macintosh = /(?:Macintosh)/i;

		var test_x11 = /(?:x11)/i;

		//test mobile
		//var mobile_regexp = /(?:iPhone)|(?:iPad)|(?:Android)|(?:Windows Phone)|(?:Playbook)|(?:Windows Mobile)|(?:BlackBerry)|(?:Mobile)|(?:tablet)|(?:phone)/i;
		var mobile = mobile_regexp.test(ua);
		if(mobile){
			devices['mobile'] = true;
		}

		//detect device and os
		//and also only report OS here,
		//not the device family because the device family
		//might change else where
		if(test_android.test(ua)){
			os['android'] = true;
			//check if the user-agent string contains 'mobile'
			if(test_mobile_str.test(ua)){
				//then it is a phone
				devices['phone'] = true;
			}else{
				//if no mobile string is present, it's a tablet
				devices['tablet'] = true;
			}
		}else if(test_linux.test(ua) && !test_android.test(ua))
		{
			os['linux'] = true; 
		}else if(test_iphone.test(ua) || test_ipod.test(ua))
		{
			//iphone or ipod
			os['ios'] = true;
			devices['phone'] = true;
			devices['iphone'] = true;

		}else if(test_ipad.test(ua)){
			//ipad
			os['ios'] = true;
			devices['tablet'] = true;
			devices['ipad'] = true;
		}else if(test_blackberry.test(ua)){
			//black berry
			os['blackberry'] = true;
			devices['phone'] = true;
		}else if(test_bbplaybook.test(ua)){
			//playbook
			os['blackberry'] = true;
			devices['tablet'] = true;
			devices['playbook'] = true;
		}else if(test_windows.test(ua) && !test_windowsmobile.test(ua) && !test_windowsphone.test(ua)){
			os['win'] = true;
			if(mobile){
				if(test_phone.test(ua)){
					devices['phone'] = true;
				}else if(test_tablet.test(ua)){
					devices['tablet'] = true;
				}
			}
		}else if(test_windowsmobile.test(ua)){
			os['winmobile'] = true;
		}else if(test_windowsphone.test(ua)){
			os['winphone'] = true;
			if(test_tablet.test(ua)){
				devices['tablet'] = true;
			}else{
				devices['phone'] = true;
			}
		}else if(!test_iphone.test(ua) && !test_ipad.test(ua) && test_macos.test(ua) && test_macintosh.test(ua)){
			os['mac'] = true;
		}else if(test_x11.test(ua) && !test_blackberry.test(ua)){
			os['x11'] = true;
		}

		//test if the UA is reporting tablet or phone, 
		//and overright the conditions above
		//if and only we didn't already registered it the 
		//opposite
		if(test_tablet.test(ua) && !devices['phone']){
			devices['tablet'] = true;
		}else if(test_phone.test(ua) && !devices['tablet']){
			devices['phone'] = true;
		}
	}
	tests.push(detect_device_type);

	/**
	var detect_screen = function(){
		var xlarge = [960,0];
	};**/

	var detect_browser = function(){
		var ua = navigator.userAgent;
		var browser = bdetect['browser'];
		var engine = bdetect['bengine'];

		var gen_renderexp = function(n){
			return new RegExp("(?:\\b"+n+"/[\\d]+[.]*[\\d]*[.]*[\\d]*)", "i");
		};

		var webkit = gen_renderexp("AppleWebKit");
		var gecko = gen_renderexp("Gecko");
		var presto = gen_renderexp("Presto");
		var trident = gen_renderexp("Trident");

		if(webkit.test(ua)){
			engine['webkit'] = true;
		}else if(gecko.test(ua)){
			engine['gecko'] = true;
		}else if(presto.test(ua)){
			engine['presto'] = true;
		}else if(trident.test(ua)){
			engine['trident'] = true;
		}

	}
	tests.push(detect_browser);
	run(prefix);
	
})(this.jQuery, window, false); //(typeof jQuery=="undefined"?undefined:jQuery)