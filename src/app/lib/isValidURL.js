export default async function isValidURL(url, disallowedDomains) {
    // Construct a regular expression pattern to match disallowed domains
    const disallowedPattern = `^https?:\\/\\/(?:${disallowedDomains.join('|')})\\b`;
    let disallowedRegex = new RegExp(disallowedPattern, 'i');
  
    // Regular expression pattern to match a URL (excluding localhost)
    const urlPattern = /^(https?:\/\/)?((?!localhost)[\w.-]+)\.([a-z]{2,})(:\d{1,5})?(\/.*)?$/i;
    let urlRegex = new RegExp(urlPattern);
  
    // Test the URL against both URL pattern and disallowed domain pattern
    return urlRegex.test(url) && !disallowedRegex.test(url);
  }