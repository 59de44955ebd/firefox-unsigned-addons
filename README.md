# firefox-unsigned-addons

This repository contains two small files that can be used to automatically load local unsigned add-ons into recent versions of [Mozilla Firefox](https://www.firefox.com/), by using a mechanism called [AutoConfig](https://support.mozilla.org/en-US/kb/customizing-firefox-using-autoconfig). The files are meant for people who know what they are doing, if you do not, don't use them.

As stated above, the files are meant for recent Firefox versions only and were tested in Firefox 159.0.1 x64 in Windows 11.

The code is based on the work of [S.T. Tsao](https://github.com/tsaost/autoload-temporary-addon) and others.

## Usage

1. Open file [autoconfig.js](autoconfig.js) in a text editor and change example path `"D:\\src\\lightproxy"` (in line 8) to the absolute path of a local unsigned add-on that you want to load automatically whenever Firefox is started. It must be an unpacked add-on, i.e. a folder, *not* a `.zip` or `.xpi` archive.  
Add additional `installExtension(...)` lines below if you want to auto-load multiple unsigned add-ons.

2. Copy the edited `autoconfig.js` into `[Firefox program folder]`.  
  In Windows that's by default `C:\Program Files\Mozilla Firefox`.  
  *Note: this requires administrator privileges.*

3. Copy file [config-prefs.js](config-prefs.js) into `[Firefox program folder]/defaults/pref`.  
  In Windows that's by default `C:\Program Files\Mozilla Firefox\defaults\pref`.  
  *Note: this requires administrator privileges.*

4. Restart Firefox. Your unsigned add-on(s) should now be loaded. If not, check the browser console (Ctrl+Shift+J) for error messages.

## How it works

File `config-prefs.js` contains the following 3 lines:

1. `pref("general.config.filename", "autoconfig.js");`  
This line specifies that the `AutoConfig` file we want to load has the file name `autoconfig.js`. Paths are not supported, the corresponding file must be in the Firefox root folder.

2. `pref("general.config.obscure_value", 0);`  
This line specifies that our `autoconfig.js` is unscrambled plain text (otherwise Firefox would expect it to be `ROT13` encoded).

3. `pref("general.config.sandbox_enabled", false);`  
This line disables sandboxing (only) for the `AutoConfig` process.

In script `autoconfig.js` we then tell Firefox to load our unsigned add-on(s) when the [final-ui-startup](https://firefox-source-docs.mozilla.org/browser/BrowserStartup.html) notification was received.
