export function hexColorsToNumberArray(hexColors) {
  return hexColors.map((hex) => parseInt(hex.replace(/^#/, ""), 16));
}
