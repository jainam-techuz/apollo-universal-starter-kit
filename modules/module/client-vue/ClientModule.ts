import { RouteConfig } from 'vue-router';

import BaseModule, { BaseModuleShape } from './BaseModule';

export interface ClientModuleShape extends BaseModuleShape {
  route?: RouteConfig[];
}

interface ClientModule extends ClientModuleShape {}

class ClientModule extends BaseModule {
  public constructor(...modules: ClientModuleShape[]) {
    super(...modules);
  }

  public get routes(): RouteConfig[] {
    return this.route || [];
  }
}

export default ClientModule;
