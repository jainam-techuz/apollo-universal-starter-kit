try {
  const modules = require('./modules').default;
  modules.createApp(module);
} catch (e) {
  if (typeof ErrorUtils !== 'undefined') {
    // eslint-disable-next-line no-undef
    (ErrorUtils as any).reportFatalError(e);
  } else {
    console.error(e);
  }
}
