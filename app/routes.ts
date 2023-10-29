import Route from "./models/Route";

import Balance from "./screens/balance";
import TransactionsScreen from "./screens/transactions";

const routes: Array<Route> = [
  {
    name: 'Transactions',
    title: 'Transactions',
    component: TransactionsScreen
  },
  {
    name: 'Balance',
    title: 'Balance',
    component: Balance
  }
];

export default routes;