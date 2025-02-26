import { Platform } from 'react-native';
import { SOC } from '~global/constants';
import crashlytics from './crashlytics';

class CustomErrorHandler {
  constructor(serverEndpoint) {
    this.serverEndpoint = serverEndpoint || null;
    this.platform = SOC[Platform.OS];
    // Capture errors for browsers
    if (
      typeof window !== 'undefined' &&
      'onerror' in window &&
      'addEventListener' in window
    ) {
      window.onerror = this.handleWindowError.bind(this);
      window.addEventListener(
        'unhandledrejection',
        this.handlePromiseRejection.bind(this),
      );
    }

    // Capture errors for Node.js
    if (typeof process !== 'undefined' && process.on) {
      process.on('uncaughtException', this.handleNodeError.bind(this));
      process.on('unhandledRejection', this.handlePromiseRejection.bind(this));
    }
  }

  handleWindowError(message, source, lineno, colno, error) {
    const errorMessage = {
      message,
      source,
      lineno,
      colno,
      stack: error ? error.stack : null,
      environment: this.platform,
    };
    this.logError(errorMessage);
    crashlytics().recordError(error);
    return true; // Prevents the default browser error handling
  }

  handleNodeError(error, context) {
    const errorMessage = {
      message: error?.message,
      stack: error?.stack,
      environment: this.platform,
      ...(error?.code ? { code: error.code } : {}),
      ...(error?.name ? { name: error.name } : {}),
      ...(error?.meta ? { meta: error.meta } : {}),
      ...(error?.type ? { type: error.type } : {}),
    };
    this.logError(errorMessage);

    if (error?.message && error?.stack) {
      if (!(error instanceof Error)) {
        error = new Error(error);
      }
      crashlytics().recordError(error);
    }

    if (context) {
      crashlytics().log(context);
    }
  }

  handlePromiseRejection(event) {
    const errorMessage = {
      message: event?.reason?.message || event.reason,
      stack: event?.reason?.stack || null,
      environment:
        typeof window !== 'undefined' ? this.platform : this.platform,
    };
    this.logError(errorMessage);
  }

  logError(error) {
    console.error('Lilla Error Log:', error);

    if (this.serverEndpoint) {
      this.sendErrorToServer(error);
    }
  }

  log(context) {
    if (!context) {
      throw new Error('Context is required!');
    }
    crashlytics().log(context);
  }

  async sendErrorToServer(error) {
    if (typeof fetch !== 'undefined') {
      try {
        const response = await fetch(this.serverEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(error),
        });
        const data = await response.json();
        console.log('Error logged on server:', data);
      } catch (error) {
        console.error('Error logging to server:', error);
      }
    } else {
      this.sendErrorToServerXHR(error);
    }
  }

  sendErrorToServerXHR(error) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.serverEndpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(error));
  }
}

export default CustomErrorHandler;
