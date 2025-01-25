import Route from "./models/interfaces/Route";
import { 
  BalanceHistoryScreen, 
  BalanceScreen, 
  CreateCategoryScreen, 
  CreateTransactionScreen, 
  DetailCategoryScreen, 
  DetailTransactionScreen, 
  TransactionsScreen,
  SearchTransactionScreen,
  FilterTransactionScreen
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
  {
    name: 'SearchTransaction',
    title: 'Search Transaction',
    component: SearchTransactionScreen
  },
  {
    name: 'FilterTransaction',
    title: 'Filter',
    component: FilterTransactionScreen
  },
];

export default routes;