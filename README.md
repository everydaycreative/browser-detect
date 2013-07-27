browser-detect
==============

It simply detects from the user-agent the sort of browser being used, checking whether if it is a mobile version and gathering other assorted device information. It then reports what it detects by populating the HTML root element with classes and making avaliable the same information through an api. 


## Why ##

  Given rise of response, adaptive and fludic web techniques, designing for devices seem to be a faux-paus. 
  But here is the thing: these devices exist and they exist in 'families', and these families are different from each other in where we use them, how we use and how we interact them. A laptop is clearly a sit down device, and even though you can use your phone while sitting down, you will probably use your phone while on the bus rather than pulling out your laptop, especially if you are standing. 

## State of developement ##


## How is it currently being used? ##
  
  The developement of this library is spurred by a need that our practice faces in delivering a solution to our customers. 
  We are using it basically as a measure to create a 'degrading' gradient that isn't device specific, but rather specific to device families. The aim of creating a commonality of experience within a specific class of devices.
