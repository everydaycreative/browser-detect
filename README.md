browser-detect
==============

__Browser-detect__  simply detects from the user-agent the sort of browser being used, checking whether if it is a mobile version and gathering other assorted device information that are useful. It then reports what it detects by populating the HTML root element with classes and also by making avaliable the same information through an object accessible through browserdetect. 

### How ###


### Why ###

Given rise of responsive, adaptive and fludic web techniques, designing for devices seem to be a faux-paus. 
But here is the thing: devices exist and they exist in 'families', and these families are different from each other in not only how we use, but also in where use them and the ways we interact them. A laptop is clearly a sit down device, and even though you can use your phone while sitting down, you will probably use your phone while on the bus rather than pulling out your laptop, especially if you are standing. 

#### How is it different from conditionizr?####
	
Conditionizr is great, but it does not provide a way to report if the browser detected is a mobile version, and whether it is installed on a phone, tablet, or some other device. 

#### How is it currently being used? ####
  
The developement of this library is spurred by a need that our practice faces in delivering a solution to our clients. 
We are using it basically as a means to create a 'degrading' gradient that of experience isn't device specific, but rather specific to device families. The aim of creating a commonality of experience within a specific class of devices.

	
### State of developement: ###

At this stage, browser-detect is not mature, not stable, and not yet anything really. If you want to use it for your next project, just drop in it and it will populate your HTML element with classes that reflect properties of the user-agent.
	
#### feature creep and the future of development: ####
 
* touch detection reporting
* crystalize the pattern used in development and add the ability to drop tests.
