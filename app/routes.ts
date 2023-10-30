import Route from "./models/Route";
import { BalanceScreen, TransactionsScreen } from "./screens";

const routes: Array<Route> = [
  {
    name: 'Transactions',
    title: 'Transactions',
    component: TransactionsScreen
  },
  {
    name: 'Balance',
    title: 'Balance',
    component: BalanceScreen
  }
];

export default routes;