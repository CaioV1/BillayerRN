import Transaction from "../../models/interfaces/Transaction";

export const transactionsMock: Array<Transaction> = [
  {
    id: 1,
    name: 'Uber',
    value: 20.99,
    categoryId: 1,
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Spoletto',
    value: 20.99,
    categoryId: 2,
    createdAt: new Date()
  },
  {
    id: 3,
    name: 'HBO',
    value: 20.99,
    categoryId: 3,
    createdAt: new Date()
  },
  {
    id: 4,
    name: 'Camisa',
    value: 20.99,
    categoryId: 4,
    createdAt: new Date()
  },
  {
    id: 5,
    name: 'Internet',
    value: 20.99,
    categoryId: 5,
    createdAt: new Date()
  },
]