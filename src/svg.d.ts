declare module "*.svg" {
  // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}
