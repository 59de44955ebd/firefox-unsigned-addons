# firefox-unsigned-addons

This repository contains two small files that can be used to automatically load local unsigned add-ons into recent versions of [Mozilla Firefox](https://www.firefox.com/), by using a mechanism called [AutoConfig](https://support.mozilla.org/en-US/kb/customizing-firefox-using-autoconfig). It's meant for people who know what they are doing, if you do not, don't use it.

As stated above, it's meant for recent Firefox versions only and was tested in Firefox 159.0.1 x64 in Windows 11.

The code is based on the work of [S.T. Tsao](https://github.com/tsaost/autoload-temporary-addon) and others.

## Usage

1. Open file [autoconfig.js](autoconfig.js) in a text editor and change `"D:\\src\\lightproxy"` (in line 8) to the absolute path of a local unsigned add-on that you want to load automatically whenever Firefox is started. It must be an unpacked add-on, i.e. a folder, *not* a `.zip` or `.xpi` archive.  
Add additional `installExtension(...)` lines below if you want to load multiple add-ons.

2. Copy the edited `autoconfig.js` into folder `[Firefox program folder]`.  
  In Windows that's by default `C:\Program Files\Mozilla Firefox`.  
  *Note: this requires administrator privileges.*

3. Copy file [config-prefs.js](config-prefs.js) into folder `[Firefox program folder]/defaults/pref`.  
  In Windows that's by default `C:\Program Files\Mozilla Firefox\defaults\pref`.  
  *Note: this requires administrator privileges.*

4. Restart Firefox. Your unsigned add-on(s) should now be loaded. If not, check the browser console (Ctrl+Shift+J).
