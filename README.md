# Web Engineering Technical Test: Solution

Solution from the Cervest Web Technical
[test](https://cervest.notion.site/Technical-Test-13f478366c6c43b3baac9506365e97b8).

## Setup

Install the necessary packages with `npm install`

## Tests

Basic unit tests can be run with `npm run test`

## Next steps

Assuming more time, some steps that could have been done to improve the app:

- Extend tests to test the functionality of the filter.
- Add e2e tests using [playwright](https://playwright.dev/) or a similar
  framework.
- Write a function to determine if two dates are consecutive (right now we
  naively assume they always are).
- Adjust the layout to make it responsive/mobile friendly.
- Finetune the data fetch logic:
  - Better error messages (and traces) to the user if there is an error
    retrieving the data.
  - Show something while the data is loading.
