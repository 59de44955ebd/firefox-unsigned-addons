// First line is always a comment
const { AddonManager } = ChromeUtils.importESModule("resource://gre/modules/AddonManager.sys.mjs");
const { FileUtils } = ChromeUtils.importESModule("resource://gre/modules/FileUtils.sys.mjs");
const installAddon = (directory) => AddonManager.installTemporaryAddon(new FileUtils.File(directory));
try {
	Services.obs.addObserver({
		observe: ()  => {
			installAddon("D:\\src\\lightproxy");
			// Add more add-ons here
		}
	}, "final-ui-startup", false);
} catch(ex) {
	Components.utils.reportError(`[autoconfig.js] ${ex}`);
};
