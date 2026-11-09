// First line is always a comment
const { AddonManager } = ChromeUtils.importESModule("resource://gre/modules/AddonManager.sys.mjs");
const { FileUtils } = ChromeUtils.importESModule("resource://gre/modules/FileUtils.sys.mjs");
const installExtension = (directory) => AddonManager.installTemporaryAddon(new FileUtils.File(directory));
try {
	Services.obs.addObserver({
		observe: ()  => {
			installExtension("D:\\src\\lightproxy");
			// Add more extensions here
		}
	}, "final-ui-startup", false);
} catch(ex) {
	Components.utils.reportError(`[userChrome.js] ${ex}`);
};
