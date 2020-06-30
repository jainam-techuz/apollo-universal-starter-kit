import { VueConstructor } from 'vue';

import ClientModule, { ClientModuleShape } from '@gqlapp/module-client-vue';

export interface CounterModuleShape extends ClientModuleShape {
  counterComponent?: VueConstructor<any>[];
}

interface CounterModule extends CounterModuleShape {}

class CounterModule extends ClientModule {
  constructor(...modules: CounterModuleShape[]) {
    super(...modules);
  }
}

export default CounterModule;
