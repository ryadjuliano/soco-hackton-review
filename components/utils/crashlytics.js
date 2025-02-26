/**
 * Crashlytics for logging and error recording.
 *
 * @returns {Object} An object containing logging and error recording methods.
 * @property {Function} log - A method to log messages.
 * @property {Function} recordError - A method to record errors.
 */
function crashlytics() {
  return {
    log: () => {},
    recordError: () => {},
  };
}

export default crashlytics;
