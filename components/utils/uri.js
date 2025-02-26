/* eslint-disable no-useless-escape */

class URIUtils {
  constructor(url) {
    this.url = url;
  }

  getQueryStringValue(key) {
    const regex = new RegExp('[?&]' + key + '=([^&#]*)', 'i');
    const match = regex.exec(this.url);
    if (match) {
      return decodeURIComponent(match[1]);
    }
    return null;
  }

  getPath() {
    const regex = /^(?:https?:\/\/)?[^\/]+(\/[^?#]*)/;
    const match = this.url.match(regex);

    if (match) {
      const path = match[1];
      return path;
    } else {
      return '';
    }
  }
}

export default URIUtils;
