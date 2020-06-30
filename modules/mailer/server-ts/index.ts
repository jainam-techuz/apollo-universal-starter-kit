import ServerModule from '@module/module-server-ts';

import mailer from './mailer';

export { mailer };

export default new ServerModule({
  createContextFunc: [() => ({ mailer })]
});
