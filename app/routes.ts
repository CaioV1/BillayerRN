import Route from "./models/interfaces/Route";
import { 
  BalanceHistoryScreen, 
  BalanceScreen, 
  CreateCategoryScreen, 
  CreateTransactionScreen, 
  DetailCategoryScreen, 
  DetailTransactionScreen, 
  TransactionsScreen 
} from "./screens";

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
    title: 'Transaction',
    component: CreateTransactionScreen
  },
  {
    name: 'CreateCategory',
    title: 'Category',
    component: CreateCategoryScreen
  },
  {
    name: 'BalanceHistory',
    title: 'Balance History',
    component: BalanceHistoryScreen
  },
  {
    name: 'DetailCategory',
    title: 'Detail Category',
    component: DetailCategoryScreen
  },
  {
    name: 'DetailTransaction',
    title: 'Detail Transaction',
    component: DetailTransactionScreen
  },
];

export default routes;