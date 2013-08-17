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
			"ie6": ['ie6'],
			"ie7": ['ie7'],
			"ie8": ['ie8'],
			"ie9": ['ie9'],
			"ie10": ['ie10'],
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
		"run": null,
		"ua": ""
	};
	win['bdjs'] = browser_detect;
	var bdetect = feature_detect;
	var features = {};
	copy_feature_tree(features, feature_detect);
	reset_feature_tree(feature_detect);

	var test = function(ua){
		browser_detect['ua'] = (ua === undefined)?navigator.userAgent:ua;
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

	var ua = function(k){
			return k.test(browser_detect['ua']);
	};
	this['ua'] = ua;

	var uax = function(k){
		return k.exec(browser_detect['ua']);
	};
	this['uax'] = uax;

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
		//var ua = navigator.userAgent;
		var devices = bdetect['devices'];
		var os = bdetect['os'];


		var mobile_regexp = new regex_collection();
		var regrcomb = function(exp){
			return recombine(regex_device(exp), mobile_regexp);
		}
		var test_tablet = regrcomb("Tablet");
		var test_phone = regrcomb("Phone");
		var test_mobile_str = regrcomb("Mobile");

		//run the check for android
		var test_android = regrcomb("Android");
		var test_linux = regex_device("Linux");
		var test_iphone = regrcomb("iPhone");
		var test_ipad = regrcomb("iPad");
		var test_ipod = regrcomb("iPod");

		//var test_IEMobile = recombine(/(?:IEMobile)/i, mobile_regexp);
		//var test_arm = /(?:ARM)/i;
		var test_windows = regex_device("Windows NT");
		var test_windowsphone = regrcomb("Windows Phone");
		var test_windowsmobile = regrcomb("Windows Mobile");

		var test_blackberry = regrcomb("BlackBerry");
		var test_rim = regex_device("RIM Tablet");
		var test_playbook = regex_device("Playbook");
		var test_bbplaybook = new regex_collection();
		recombine(test_playbook, test_bbplaybook);
		recombine(test_rim, test_bbplaybook);
		recombine(test_bbplaybook, mobile_regexp)

		var test_macos = regex_device("Mac Os X");
		var test_macintosh = regex_device("Macintosh");

		var test_x11 = regex_device("x11");

		//test mobile
		//var mobile_regexp = /(?:iPhone)|(?:iPad)|(?:Android)|(?:Windows Phone)|(?:Playbook)|(?:Windows Mobile)|(?:BlackBerry)|(?:Mobile)|(?:tablet)|(?:phone)/i;
		var mobile = ua(mobile_regexp);
		if(mobile){
			devices['mobile'] = true;
		}

		//detect device and os
		//and also only report OS here,
		//not the device family because the device family
		//might change else where
		if(ua(test_android)){
			os['android'] = true;
			//check if the user-agent string contains 'mobile'
			if(ua(test_mobile_str)){
				//then it is a phone
				devices['phone'] = true;
			}else{
				//if no mobile string is present, it's a tablet
				devices['tablet'] = true;
			}
		}else if(ua(test_linux) && !ua(test_android))
		{
			os['linux'] = true; 
		}else if(ua(test_iphone) || ua(test_ipod))
		{
			//iphone or ipod
			os['ios'] = true;
			devices['phone'] = true;
			devices['iphone'] = true;

		}else if(ua(test_ipad)){
			//ipad
			os['ios'] = true;
			devices['tablet'] = true;
			devices['ipad'] = true;
		}else if(ua(test_blackberry)){
			//black berry
			os['blackberry'] = true;
			devices['phone'] = true;
		}else if(ua(test_bbplaybook)){
			//playbook
			os['blackberry'] = true;
			devices['tablet'] = true;
			devices['playbook'] = true;
		}else if(ua(test_windows) && !ua(test_windowsmobile) && !ua(test_windowsphone)){
			os['win'] = true;
			if(mobile){
				if(ua(test_phone)){
					devices['phone'] = true;
				}else if(ua(test_tablet)){
					devices['tablet'] = true;
				}
			}
		}else if(ua(test_windowsmobile)){
			os['winmobile'] = true;
		}else if(ua(test_windowsphone)){
			os['winphone'] = true;
			if(ua(test_tablet)){
				devices['tablet'] = true;
			}else{
				devices['phone'] = true;
			}
		}else if(!ua(test_iphone) && !ua(test_ipad) && ua(test_macos) && ua(test_macintosh)){
			os['mac'] = true;
		}else if(ua(test_x11) && !ua(test_blackberry)){
			os['x11'] = true;
		}

		//test if the UA is reporting tablet or phone, 
		//and overright the conditions above
		//if and only we didn't already registered it the 
		//opposite
		if(ua(test_tablet) && !devices['phone']){
			devices['tablet'] = true;
			devices['mobile'] = true;
		}else if(ua(test_phone) && !devices['tablet']){
			devices['phone'] = true;
			devices['mobile'] = true;
		}
	}
	tests.push(detect_device_type);

	/**
	var detect_screen = function(){
		var xlarge = [960,0];
	};**/

	var detect_browser = function(){
		var browser = bdetect['browser'];
		var engine = bdetect['bengine'];

		var gen_renderexp = function(n){
			return new RegExp("(\\b"+n+")\/([\\d]+[.]*[\\d]*[.]*[\\d]*)", "i");
		};

		var webkit = gen_renderexp("AppleWebKit");
		var gecko = gen_renderexp("Gecko");
		var presto = gen_renderexp("Presto");
		var trident = gen_renderexp("Trident");

		if(ua(webkit)){
			engine['webkit'] = true;
		}else if(ua(gecko)){
			engine['gecko'] = true;
		}else if(ua(presto)){
			engine['presto'] = true;
		}else if(ua(trident)){
			engine['trident'] = true;
		}


		/*browser detect */
		var safari = gen_renderexp("Safari");
		var mobile = gen_renderexp("Mobile");
		var version = gen_renderexp("Version");
		var safari_mobile = gen_renderexp("Mobile Safari");
		var firefox = gen_renderexp("Firefox");
		var seamonkey = gen_renderexp("Seamonkey");
		var chrome = gen_renderexp("Chrome");
		var chromium = gen_renderexp("Chromium");
		var opera = gen_renderexp("Opera");
		var opera_15 = gen_renderexp("OPR");
		var opera_mini = gen_renderexp("Opera Mini");
		var opera_mobi = gen_renderexp("Opera Mobi");
		var ie = /(\bMSIE )([\d]+.[\d]*[\w]*)/i;
		var ie_mobile = gen_renderexp("IEMobile");

		var get_version = function(o){
			if(ua(o)){
				browser['version'] = uax(o)[2];
			}
		}
		if(ua(firefox) && !ua(seamonkey)){
			browser['firefox'] = true;
			//get version
			get_version(firefox);
		}else if(ua(chrome) && !ua(chromium)){
			browser['chrome'] = true;
			get_version(chrome);
		}else if(ua(safari) && !ua(chrome) && !ua(opera_15) && !ua(opera) && !ua(opera_mini)){
			//whether mobile or not, it's safair?
			browser['safari'] = true;

			if(ua(safari_mobile) || ua(mobile)){
				browser['safari_mobile'] = true;
			}else{
				//browser['safari'] = true;
			}
			//check if we can get version
			get_version(version);
		}else if(ua(opera)|| ua(opera_15) || ua(opera_mini) || ua(opera_mobi)){
			browser['opera'] = true;
			get_version(opera);
			get_version(opera_mini);
			get_version(opera_mobi);
			get_version(opera_15);
		}else if(ua(ie)){
			//IE
			if(ua(ie_mobile)){
				browser['ie_mobile'] = true;
				get_version(ie_mobile);
			}else{
				browser['ie'] = true;
				get_version(ie);
			}

			if(browser['version'] != ""){
				var n,s = browser['version'];
				var vs = s.split(".");
				if(vs.length >= 1){
					n = parseInt(vs[0]);
					if(!isNaN(n)){
						browser['ie'+n] = true;
					}
				}
			}
		} 
		
	}
	tests.push(detect_browser);
	run(prefix);
	
})(this['jQuery'], window, false); //(typeof jQuery=="undefined"?undefined:jQuery)


