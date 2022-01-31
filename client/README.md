<p align="center">
  <a href="#">
    <img src="./assets/images/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h2 align="center">Dev.to Clone</h2>

  <p align="center">
    A Next js frontend for dev to clone
  </p>  
</p>

## Getting Started

#### Steps to start the client

1. Add environment files in frontend directory.
      `client/.env` file

      ```env
      NODE_ENV = "development"
      NEXT_APP_PRODUCTION_API_ENDPOINT = "production_url"
      NEXT_APP_DEVELOPMENT_API_ENDPOINT = "http://localhost:8000"
      ```

2. To install all the dependencies run the following command in root directory.

      ```sh
      yarn install
      ```

3. Run the following command in the root directory.

      ```sh
      yarn dev
      ```

5. Open <http://localhost:3000> to view it in the browser.