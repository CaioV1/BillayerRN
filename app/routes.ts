import Route from "./models/interfaces/Route";
import { BalanceScreen, CreateCategoryScreen, CreateTransactionScreen, TransactionsScreen } from "./screens";

const routes: Array<Route> = [
  {
    name: 'Balance',
    title: 'Billayer',
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
  {
    name: 'CreateCategory',
    title: 'Create Category',
    component: CreateCategoryScreen
  },
];

export default routes;