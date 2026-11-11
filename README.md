# firefox-unsigned-addons

This repository contains two small files that can be used to automatically load unsigned extensions (and possibly also other types of add-ons, not tested) into recent versions of [Mozilla Firefox](https://www.firefox.com/), by using a mechanism called [AutoConfig](https://support.mozilla.org/en-US/kb/customizing-firefox-using-autoconfig). The files are meant for people who know what they are doing, if you do not, don't use them.

As stated above, the files are meant for recent Firefox versions only and were tested in Firefox 153 and later.

The code is based on the work of [S.T. Tsao](https://github.com/tsaost/autoload-temporary-addon) and others.

## Usage

1. Open file [autoconfig.js](autoconfig.js) in a text editor and change example path `"D:\\src\\lightproxy"` (in line 8) to the absolute path of a local unsigned extension that you want to load automatically whenever Firefox is started. It must be an unpacked extension, i.e. a folder, *not* a `.zip` or `.xpi` archive. In Windows backslashes have to be doubled, in Linux/macOS use ordinary POSIX pathes like e.g. `"~/extensions/lightproxy"`.

   Add additional `installAddon(...)` lines below if you want to auto-load multiple unsigned extensions.

2. Copy the edited `autoconfig.js` into the Firefox program folder, which is by default:  

   * Windows: `C:\Program Files\Mozilla Firefox\`  
   * Linux (Debian): `/lib/firefox-esr/`  
   * macOS: `/Applications/Firefox.app/Contents/Resources/`

   *Note: this requires administrator privileges.*

3. Copy file [config-prefs.js](config-prefs.js) into the subfolder `defaults/pref/` inside the Firefox program folder, create the folder(s) yourself if needed. Default `pref` locations are: 

   * Windows: `C:\Program Files\Mozilla Firefox\defaults\pref\`  
   * Linux (Debian): `/lib/firefox-esr/defaults/pref/`  
   * macOS: `/Applications/Firefox.app/Contents/Resources/defaults/pref/`

   *Note: this requires administrator privileges.*

4. Restart Firefox. Your unsigned extension(s) should now be loaded. If not, check the browser console (Ctrl+Shift+J) for error messages.

## How it works

File `config-prefs.js` contains the following 3 lines:

1. `pref("general.config.filename", "autoconfig.js");`  
This line specifies that the `AutoConfig` file we want to load has the file name `autoconfig.js`. Paths are not supported, the corresponding file must be in the Firefox root folder.

2. `pref("general.config.obscure_value", 0);`  
This line specifies that our `autoconfig.js` is unencrypted plain text (otherwise Firefox would expect it to be `ROT13` encoded).

3. `pref("general.config.sandbox_enabled", false);`  
This line disables sandboxing (only) for the `AutoConfig` process.

In script `autoconfig.js` we then tell Firefox to load our unsigned extension(s) when the [final-ui-startup](https://firefox-source-docs.mozilla.org/browser/BrowserStartup.html) notification was received.
