import React from 'react';
import ClientModule, { ClientModuleShape } from '@gqlapp/module-client-react';

export interface ReportModuleShape extends ClientModuleShape {
  reportComponent?: React.ReactElement<any>[];
}

interface ReportModule extends ReportModuleShape {}

class ReportModule extends ClientModule {
  public constructor(...modules: ReportModuleShape[]) {
    super(...modules);
  }
}

export default ReportModule;
