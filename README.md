# API Test Suite

This repository contains an automated test suite for the Product Inventory API.

## 📌 Setup Instructions

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/your-repo.git

2. Install dependancies using ```npm install jest supertest dotenv```
   Jest is a popular JavaScript testing framework which : 
   - provides Test Runner, Discovers and executes your test files,
   - provides Assertion Libraries
   - npm test command in the package.json is configured to execute Jest.

   Supertest is a library specifically designed for testing HTTP APIs.
   - It allows Make HTTP requests (GET, POST, PUT, DELETE, etc.) to your API.
   - Set headers (like Authorization and Content-Type).
   - Send request bodies (for POST and PUT requests).
   - Assert on various aspects of the HTTP response  

   Dotenv is a small but crucial library that allows to load environment variables from a .env file into process.env
   
3. Set Environment Variables: Create a .env file (optional) or configure GitHub Secrets:
   - API_BASE_URL=https://sdet-challenge-rho.vercel.app
   - AUTH_TOKEN=your-auth-token

4. Run the Tests using the below commmand: 

    - npm test