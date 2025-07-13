import Category from "../../models/interfaces/Category";
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

export const DEFAULT_CATEGORY: Array<Category> = [
  { iconId: 1, name: 'Meal', iconName: 'fastfood', budget: 0 },
  { iconId: 2, name: 'Internet Services', iconName: 'network-check', budget: 0 },
  { iconId: 3, name: 'Fixed', iconName: 'event-repeat', budget: 0 },
  { iconId: 4, name: 'Personal Care', iconName: 'clean-hands', budget: 0 },
  { iconId: 6, name: 'Transport', iconName: 'directions-car-filled', budget: 0 },
  { iconId: 7, name: 'Unforseen', iconName: 'money-off', budget: 0 },
  { iconId: 8, name: 'Study', iconName: 'school', budget: 0 },
]