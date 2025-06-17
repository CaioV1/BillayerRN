import Tab from "../../models/interfaces/Tab";

export const DETAIL_CATEGORY_TABS: Array<Tab> = [
  {
    id: 1,
    title: 'Resumed'
  },
  {
    id: 2,
    title: 'Detailed'
  },
];

export const SEARCH_TEXT_MINIMUM_LENGTH = 2;

export const DEFAULT_CATEGORY_ICONS = [
  { id: 1, category: 'Meal', name: 'fastfood' },
  { id: 2, category: 'Internet Services', name: 'network-check' },
  { id: 3, category: 'Fixed', name: 'event-repeat' },
  { id: 4, category: 'Personal Care', name: 'clean-hands' },
  { id: 6, category: 'Transport', name: 'directions-car-filled' },
  { id: 7, category: 'Unforseen', name: 'money-off' },
  { id: 8, category: 'Study', name: 'school' },
]