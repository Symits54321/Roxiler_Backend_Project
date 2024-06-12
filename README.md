# Roxiler Backend Challenge Project

This Node.js API allows you to retrieve product details with filtering options by month, search text, and page number. It also provides pie charts, bar graphs, and statistical details. Postman is recommended for sending requests to the API.

## Installation

1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the project:
    ```bash
    node index.js
    ```

## Initialization

Seed the data by sending a GET request:

GET http://localhost:8102/products/initialize

Data is fetched from:
[https://s3.amazonaws.com/roxiler.com/product_transaction.json](https://s3.amazonaws.com/roxiler.com/product_transaction.json)

## API Endpoints

### 1. Transaction Data
Retrieve transaction data with optional filters:

GET http://localhost:8102/products/transaction?month=3&page=1&search=

![Transaction Data Screenshot](./screenshot/transaction.jpg)

### 2. Statistics Data
Retrieve statistical data for a specific month:

GET http://localhost:8102/products/statistics?month=3

![Statistics Data Screenshot](./screenshot/statistics.jpg)

### 3. Pie Chart Data
Retrieve pie chart data for a specific month:

GET http://localhost:8102/products/piechart?month=3

![Pie Chart Data Screenshot](./screenshot/piechart.jpg)

### 4. Bar Chart Data
Retrieve bar chart data for a specific month:

GET http://localhost:8102/products/barchart?month=3

![Bar Chart Data Screenshot](./screenshot/barchart.jpg)

## Notes

- Use `month=0` to get data for all months.
- `month` must be between 1 and 12.
- `page` must be between 1 and the total number of pages.
- `search` text can be a number or text to filter by price, title, description, or category.

## Screenshots

Screenshots of the API responses are available in the `./screenshot` folder.




