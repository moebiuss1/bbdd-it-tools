/// <reference path="../.astro/types.d.ts" />

declare module "*.yaml" {
  const value: any;
  export default value;
}

declare module "*.yml" {
  const value: any;
  export default value;
}
