import branch from 'react-native-branch';

const Config = require('~config/default.env').default;

class BranchUrlGenerator {
  constructor(config = Config) {
    this.config = config;
  }

  async getUrl(data) {
    const title = data?.title || 'Share - Lilla';
    const branchParams = data?.branchParams || {};
    const linkProps = data?.linkProps;
    const deepParams = {
      $deeplink_path: true,
      $uri_redirect_mode: 1,
      $ios_redirect_timeout: 0,
      $android_redirect_timeout: 0,
      ...branchParams,
    };

    const branchUniversalObject = await branch.createBranchUniversalObject(
      this.config.LULLA_WEB_URL,
      {
        locallyIndex: true,
        title: title,
        contentDescription: title,
      },
    );

    const { url } = await branchUniversalObject.generateShortUrl(
      linkProps,
      deepParams,
    );

    return {
      url,
      title,
    };
  }
}

export default BranchUrlGenerator;
