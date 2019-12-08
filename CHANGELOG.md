# Changelog

All notable changes to this project will be documented in this file.

## [1.2.1] - 2019-12-08

### Changed

- The borderradius option is now an object which accepts inner and outer radius.

## [1.2.0] - 2019-12-08

### Added

- You can now press the selected color to unset the value.
- Implemented contrast checking to decorate low contrast colors with a more high contrast one.
- Added options for controlling decoration color values and when to apply it.
- Added a checkerbackground to items so that low opacity colors are perceived as having opacity.

### Changed

- Refactored a majority of the code to make it more readable as the complexity grew.

## [1.1.11] - 2019-12-02

### Added

- Transpiled schema.js to fix errors with the graphql deploy command.

## [1.1.1] - 2019-12-01

### Added

- New options setting 'borderradius' to allow some style customization.
- Now checks if the color is a white in a more stable manner.
- Version navigation.

### Changed

- The way white is displayed, now with a thinner border.
- Streamlined the code a lot for better readability/mutability.