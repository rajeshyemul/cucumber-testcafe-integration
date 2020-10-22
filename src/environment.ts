const DEFAULT_BROWSER = 'chrome';
export const BROWSER = process.env.BROWSER || DEFAULT_BROWSER;
export const GENERATE_CUCUMBER_HTML_REPORT = process.env.GENERATE_HTML_REPORT !== 'true';