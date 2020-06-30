import { merge } from 'lodash';

import { GraphQLModule, GraphQLModuleShape } from '@gqlapp/module-common';

export interface BaseModuleShape extends GraphQLModuleShape {
  // TODO: Add proper type
  reducer?: { [key: string]: any }[];
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
