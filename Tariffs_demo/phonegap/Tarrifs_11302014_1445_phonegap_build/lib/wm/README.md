Studio's webapp/lib/wm folder
=========================

Root folder of the WaveMaker framework.  Everything important is in the folder "base".

Folders
-------
* base: Contains all WaveMaker widgets and components
* common: This folder is a template that is copied into Documents/WaveMaker any time a new user installs and runs WaveMaker.  It contains custom files that are shared between projects (Composites, themes, etc...)
* etc: Not used anymore.
* language: Contains localizations for widgets/components.  
** components.js: Put strings here that are needed at runtime; for example, the title for the alert dialog for each language.
** properties.js: Put default property values here.  In English, the default caption for a button is "Button", but in Japanese, it may be something else.

Files
-----
manifest.js: When running an application with ?debug in the url, this file is used to determine which libraries to load.  This is used instead of loading the compressed build files.
WMVersion.txt: Generated by the Maven build process.  Not the easiest way to find out what version of the framework a project was deployed with, but it is the most reliable.
