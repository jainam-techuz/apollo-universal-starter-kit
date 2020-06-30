declare module '*.json' {
  const value: any;
  export = value;
}

declare module '*.scss' {
  const value: any;
  export = value;
}

declare module '@gqlapp/user-server-ts' {
  const scopes: any;
  const User: any;
  export = { scopes, User };
}

declare module '@gqlapp/authentication-client-react' {
  const authentication: any;
  export = authentication;
}
