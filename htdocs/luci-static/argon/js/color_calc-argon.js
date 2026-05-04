/*
 *  The background color of the [Light Mode] subtabs follow the custom primary color and reduce its transparency
 *  Author: SpeedPartner
 */

/*
 *  Get hex for the [Light mode] Primary Color ,then reduce it to 25% transparency and convert it to RGBA value
 */
	const hexColor_primary_light = getComputedStyle(document.documentElement).getPropertyValue('--primary').replace(/\s/, "");
	const hexToRgba_primary_light = (hex) => {
  		const r = parseInt(hex.substring(1, 3), 16);
  		const g = parseInt(hex.substring(3, 5), 16);
  		const b = parseInt(hex.substring(5, 7), 16);
  		const a = 0.15
  		return [r, g, b].map(x => x.toFixed()).concat(a);
	};
	const rgbaColor_primary_light = hexToRgba_primary_light(hexColor_primary_light);

/*
 *  Constitute a css color variable named light-subtabs-background
 */
	document.documentElement.style.setProperty('--light-subtabs-background', `rgba(`+rgbaColor_primary_light+`)`);
