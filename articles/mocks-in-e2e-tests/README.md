<p align="center">
    <a href="https://www.angular.love/" target="_blank"><img src="https://www.angular.love/wp-content/uploads/2020/07/logo-angular.png" alt="angular love"/></a>
</p>

# Mocks in E2E tests

## Running

`npm run test:e2e` to run tests

## src/orders

Application code. Contains minimum functionality which connects to external service to fetch data via HTTP request.

## test/payment-gateway-fake

Imitation of third-party service which behaves as external service. Used within e2e tests of `src/orders` feature.

## test

`order-base-example-without-mock` contains skipped tests, as those do not mock anything under the hood. Treat is as an
example of test base which is modified to present different approaches.