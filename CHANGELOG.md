# Changelog

<!-- ## [Unreleased]

### Added

### Changed

### Removed -->

## [1.7.0] - 2025-07-14

### Added

- Instaled icons lib react-native-vector-icons

### Changed

- Mapped current icons with react-native-vector-icons
- Category schema with iconName
- Update create category screen with search icon field

### Removed

- Base64 list icons

## [1.6.1] - 2025-06-09

### Changed

- Persist theme color (dark mode) into the realm database

## [1.6.0] - 2025-06-08

### Added

- Dark mode theme

## [1.5.0] - 2025-01-24

### Added

- Filter transactions screen.

### Changed

- Fix the bug of showing two flat list in transaction screen when search all;
- Fix bug of not initialize app config state in context;
- Implement useBalance hook in create transaction to unifying the feature.

## [1.4.3] - 2024-07-10

### Changed

- Close button option in search component;
- Revert flast list data order in search component;
- Fix margin bottom in the flat list from search component;

## [1.4.2] - 2024-07-09

### Changed

- Implement search component in transactions screen;
- Remove search screen from menu.

## [1.4.1] - 2024-07-09

### Changed

- Fix error in delete transaction feature;
- Fix input props at search component.

## [1.4.0] - 2024-07-09

### Added

- Create search component;
- Create search transaction screen;
- Implement search component in create transaction screen.

## [1.3.0] - 2024-07-08

### Added

- Organize the data at list transaction screen by section;
- Create useTransaction hook to reuse transaction states.

### Changed

- Fix the flat list layout scroll at resumed category tab;
- Sorted the categories at the initial screen.

## [1.2.3] - 2024-03-07

### Changed

- Apply the react compound components pattern into the tab component;
- Changed the detailed category to include redirections to transaction screens.

## [1.2.2] - 2024-02-13

### Changed

- Fix error that do not create balance if there is no transactions for it at import balances feature.

## [1.2.1] - 2023-12-14

### Changed

- Fix date config in import feature.
- Fix data insertion in import feature.

## [1.2.0] - 2023-12-12

### Added

- Export data feature through React Native default share method.
- Import data feature through react-native-document-picker and react-native-fs libs.

## [1.1.1] - 2023-11-20

### Changed

- Fix layout bug from list in detail category screen.
- Fix list ordenation in detail category screen.

## [1.1.0] - 2023-11-14

### Added

- Tabs on detail category screen to visualize detailed or resumed transaction data.

### Changed

- Budget will also be saved in balance entity to preserve past budget. Now when the category budget is updated only the current balance budget will be updated.

## [1.0.1] - 2023-11-11

### Changed

- Fix bug of deleting category. Now deletes all the category's balances instead of just the current.
- Fix bug about the float value and comma char at the input number.
- Fix the lists ordenation and hide edit button of past transactions.

## [1.0.0] - 2023-11-10

### Added

- First release of the project.