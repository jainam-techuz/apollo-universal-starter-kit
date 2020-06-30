import { ApolloClient } from 'apollo-client';

import ClientModule, { ClientModuleShape } from '@gqlapp/module-client-react';

export interface AccessModuleShape extends ClientModuleShape {
  login?: ((client: ApolloClient<any>) => Promise<void>)[];
  logout?: ((client: ApolloClient<any>) => Promise<void>)[];
}

interface AccessModule extends AccessModuleShape {}

class AccessModule extends ClientModule {
  public constructor(...modules: AccessModuleShape[]) {
    super(...modules);
  }

  public async doLogin(client: ApolloClient<any>) {
    for (const login of this.login) {
      await login(client);
    }
  }

  public async doLogout(client?: ApolloClient<any>) {
    for (const logout of this.logout) {
      await logout(client);
    }
  }
}

export default AccessModule;
