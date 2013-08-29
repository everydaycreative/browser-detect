# TODO:

* Conditional loading based upon the eval of the feature tree
* Test units to test the regexp expression for variations 

* pull browser version information so it can correspond to the format presented and reported in caniuse. An example would be .safarimobile4-2 to represent that the browser is safari on iOS and its version is 4.2. This needs to be worked on, perhaps incorporating a way, a class really, to inform states like the states less than, and greater than conditionals. Maybe something like this .sfmlte3-0 would appear... but this would be a bad solution because we would have to maintain on chain of versions for every browser and report all the conditionals that are true. like for safari mobile 4.2, an less than condition would report: .sfmlt4-3, .sfmlt-5, .sfmlt5-1, .sfmlt6, .sfmlt6-1. This seems to suggest that we want a system that can select a range. 

  <pre>
    .sfmlt4-3.sfmgte4{
      /* this encapsulate the ranges of version 4 to 4.3 for safari mobile. if a version is less than 4, this selector             wouldn't hold, and if it is greater than 4.3, it would also not hold.
      */
    }
  </pre>
  
  If this is implemented, it means that there needs to be maintainance in keping up with, at least, canusei table.
  If that is going to happen than the versions to keep track of and report (the generation of the classname can be procedural) needs to exist as a separate file, and perhaps using grunt to bring them together upon release.

Tasks for future maintainers: 

* Update and add test case/detec every quarter to keep abreast with browser development.
