# Changelog

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