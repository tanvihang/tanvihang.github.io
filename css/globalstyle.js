export const globalStyles = new CSSStyleSheet();

async function loadStyles() {
  if(globalStyles.cssRules.length > 0){
    return;
  }

  const typographyResponse = await fetch('/css/typography.css');
  const colorResponse = await fetch('/css/color.css');

  if (!typographyResponse.ok || !colorResponse.ok) {
    throw new Error('Failed to load stylesheets.');
  }

  const typographyCSS = await typographyResponse.text();
  const colorCSS = await colorResponse.text();

  globalStyles.replaceSync(`
    ${typographyCSS}
    ${colorCSS}
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      // border: burlywood 1px solid;
    }
  `);
}

loadStyles();
