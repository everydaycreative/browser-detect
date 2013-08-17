browser-detect (ALPHA+DRAFT)
==============

__Browser-detect__  simply detects from the user-agent the sort of browser being used, checking whether if it is a mobile version of a browser and gathering other assorted device information that are useful. It then reports what it detects by populating the HTML root element with classes and also by making avaliable the same information through an object accessible through browserdetect. 

### How ###

Just add bd.min.js to your site, and it shall populate for you all the features it can detect as classes to your html element. Also you can access and check what features it detected in javascript via the bdjs object through bdjs.detect

#### What it detects ####

Operating systems:
	* android
	* blackberry
	* ios
	* linux
	* mac
	* windows
	* windows mobile
	* x11
through: bdjs.detect.os

Browsers:
	* safari, and it's mobile version
	* firefox
	* chrome
	* internet explorer and its versions from 6 to 10
	* internet explorer mobile
	* opera
through: bdjs.detect.browsers

Browser rendering engines:
	* webkit
	* gecko
	* presto
	* trident
through: bdjs.detect.bengine

Device pixel density:
	* ldpi (< 0.75)
	* mdpi (1.0)
	* hdpi (1.5)
	* xhdpi (2.0), aka retina
through: bdjs.detect.dpi

Device families, using some 'heuristic':
	* tablet
	* phone
	* iphone
	* ipad
	* playbook
	* mobile, if it being reported as a mobile device in its UA string.
through: bdjs.detect.devices

Touch detection through: bdjs.detect.touch

and jQuery detection through: bdjs.detect.jq



### Why ###

Given the rise of responsive, adaptive and fludic web techniques, designing for devices seem to be a faux-paus. 
But here is the thing: devices exist and they exist in 'families', and these families are different from each other in not only how we use them, but also in the ways we interact them and where use them. A laptop is clearly a sit down device, and even though you can use your phone while sitting down, you will probably also use your phone while on the bus instead of than pulling out your laptop, especially if you are standing. For us web creators, we do not really know much about the device or how it is used. This is different for the creators of these devices, they design the device in varying respects 

#### Area of concerns: the seperation of screen and device ####
It also allows for a separation of concerns in designing where you can separete concerns revolving around screen sizes into a separate area that is independent of anything device specific (as currently done through media queries), and the other area of concern being device relevant.   

#### How is it different from conditionizr?####
	
Conditionizr is great, but it does not provide a way to report if the browser detected is a mobile version, or whether it is installed on a phone, tablet, or some other device. 

#### How is it currently being used? ####
  
The developement of this library was spurred by a need that our practice faces in delivering solutions to our clients. We are using it basically as a means to create a gradient of experiences that isn't device specific, but rather specific to device families. The aim is in creating a commonality of experience within a specific class of devices.

	
### State of developement: ###

At this stage, browser-detect is not mature, not stable, and not really anything yet. If you want to use it for your next project, just drop in it and it will populate your HTML element with classes that reflect properties of the user-agent.
	
#### feature creep and the future of development: ####
 
* touch detection reporting
* crystalize the pattern used in development and add the ability to drop tests.
* add detection of device pixel density according to [Android's guide on support screen sizes](http://developer.android.com/guide/practices/screens_support.html) and report them as such.
* conditional loading.

### Credits ## 
* Touch detect that works with Windows Surface devices came from: http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript

