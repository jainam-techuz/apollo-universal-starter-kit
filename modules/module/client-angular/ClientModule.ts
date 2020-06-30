import { Route, Routes } from '@angular/router';

import BaseModule, { BaseModuleShape } from './BaseModule';

export interface ClientModuleShape extends BaseModuleShape {
  module?: any;
  route?: Routes;
}

interface ClientModule extends ClientModuleShape {}

class ClientModule extends BaseModule {
  public constructor(...modules: ClientModuleShape[]) {
    super(...modules);
  }

  public get modules(): any {
    return (this.module || []).map((module: any) => module);
  }

  public get routes(): Routes {
    return (this.route || []).map((component: Route) => component);
  }
}

export default ClientModule;
