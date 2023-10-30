import Category from "../../models/interfaces/Category";

export const categoryMock: Array<Category> = [
  {
    id: 1,
    name: 'Transport',
    icon: require('../../../public/transport.png'),
    budget: 100,
    totalExpense: 50
  },
  {
    id: 2,
    name: 'Meal',
    icon: require('../../../public/meal.png'),
    budget: 2500,
    totalExpense: 80
  },
  {
    id: 3,
    name: 'Streaming',
    icon: require('../../../public/streaming.png'),
    budget: 70,
    totalExpense: 90
  },
  {
    id: 4,
    name: 'Unforeseen',
    icon: require('../../../public/unforeseen.png'),
    budget: 600,
    totalExpense: 470
  },
  {
    id: 5,
    name: 'Fixed',
    icon: require('../../../public/fixed.png'),
    budget: 600,
    totalExpense: 470
  },
]