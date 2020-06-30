import { merge } from 'lodash';
import { ActionReducerMap } from '@ngrx/store';

import { GraphQLModule, GraphQLModuleShape } from '@gqlapp/module-common';

export interface BaseModuleShape extends GraphQLModuleShape {
  reducer?: ActionReducerMap<any, any>[];
}

interface BaseModule extends BaseModuleShape {}

class BaseModule extends GraphQLModule {
  public constructor(...modules: BaseModuleShape[]) {
    super(...modules);
  }

  public get reducers() {
    return merge({}, ...(this.reducer || []));
  }
}

export default BaseModule;
