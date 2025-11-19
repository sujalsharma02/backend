## Video:  Can,t make video because i have sore throat from some day.
## Git Repository: https://github.com/sujalsharma02/backend
# Topic Explorer API

This is a Next.js application that provides a simple API to retrieve, search, and sort a list of topics. It features a clean, interactive user interface to demonstrate the API's capabilities.

## Features

- **Topic Retrieval**: Fetches a list of topics from a local JSON data source.
- **Search**: Filters topics by name based on a search query (case-insensitive).
- **Sort**: Sorts topics by name in ascending alphabetical order.
- **Interactive UI**: A user-friendly interface to test the API endpoints live.
- **API Documentation**: Clear documentation on how to use the API.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1.  Clone the repository (or download the source code).
2.  Navigate to the project directory:
    ```bash
    cd <project-folder>
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the application on `http://localhost:9002`. Open this URL in your browser to see the application.

## API Documentation

The application exposes a single API endpoint to fetch topics.

### Endpoint: `GET /api/topics`

This endpoint retrieves a list of topics. It supports optional query parameters for searching and sorting.

#### Query Parameters

-   `search` (string, optional): Filters the topics where the name contains the search string. The search is case-insensitive.
-   `sort` (string, optional): If set to `name`, it sorts the topics by name in ascending order. Any other value will result in an error.

#### Responses

-   `200 OK`: Successful request. Returns a JSON array of topic objects.
-   `400 Bad Request`: Invalid query parameter (e.g., `sort=date`).
-   `500 Internal Server Error`: An error occurred on the server (e.g., data file not found).

#### Example Usage with cURL

1.  **Get all topics:**
    ```bash
    curl http://localhost:9002/api/topics
    ```

2.  **Search for topics containing "js":**
    ```bash
    curl "http://localhost:9002/api/topics?search=js"
    ```

3.  **Sort all topics by name:**
    ```bash
    curl "http://localhost:9002/api/topics?sort=name"
    ```

4.  **Search for "python" and sort by name:**
    ```bash
    curl "http://localhost:9002/api/topics?search=python&sort=name"
    ```

## Code Structure

-   `src/app/page.tsx`: The main landing page of the application.
-   `src/components/TopicExplorer.tsx`: A client-side React component that contains the interactive UI for demonstrating the API.
-   `src/app/api/topics/route.ts`: The Next.js API route handler that implements the topic retrieval logic.
-   `src/lib/data/topics.json`: The JSON file containing the source data for the topics.
-   `src/app/globals.css`: Contains the global styles and theme variables for the application.
-   `tailwind.config.ts`: Tailwind CSS configuration, including custom fonts and colors.
