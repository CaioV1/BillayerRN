import Route from "./models/interfaces/Route";
import { BalanceScreen, CreateTransactionScreen, TransactionsScreen } from "./screens";

const routes: Array<Route> = [
  {
    name: 'Balance',
    title: 'Balance',
    component: BalanceScreen
  },
  {
    name: 'Transactions',
    title: 'Transactions',
    component: TransactionsScreen
  },
  {
    name: 'CreateTransaction',
    title: 'Create Transaction',
    component: CreateTransactionScreen
  },
];

export default routes;