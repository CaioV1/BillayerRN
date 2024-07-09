export default interface Route {
  name: string;
  title: string;
  component: React.FC<any>;
  headerRight?: () => JSX.Element;
}