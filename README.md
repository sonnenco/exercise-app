# exercise-app
A full stack [MERN](https://www.mongodb.com/resources/languages/mern-stack) application that tracks exercises completed by a user. Uses React for the frontend UI and a REST API using Node and Express for the backend web service. MongoDB is used for persistence with CRUD operations performed via [Mongoose](https://www.npmjs.com/package/mongoose?azure-portal=true). Written as a portfolio project for CS290 (Web Development) at Oregon State University.

![Model](https://github.com/sonnenco/exercise-app/blob/e28743f3ff43d84de3ead5dd6a43ff827caf5019/homepage.png)

### Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup Rest API](#setup-rest-api)
3. [Setup React Application](#setup-react-application)
4. [Architecture](#architecture)

## Prerequisites

1. Node.js: [Installation instructions linked here](https://nodejs.org/en/download/package-manager). 
2. npm (Node Package Manager - included in Node.js)
3. Git (optional, for cloning the repository)

#### Clone this repository using Git:

```bash
git clone https://github.com/sonnenco/exercise-app.git
cd exercise-app
```

## Setup REST API

#### 1. Create MongoDB database
Data for this application persists in MongoDB with the following attributes:
```bash
Database Name : exercise_app_db
Database Collection : exercises
```
You will need to create a database and collection in MongoDB which matches these attributes.  This can be hosted locally (such as the VS Code MongoDB extension) or in the cloud (such as MongoDB Atlas free tier).

Copy your MongoDB connection string for use in setup step #2.

#### 2. Update .env file
REST API uses a .env file with 2 variables.
```bash
MONGODB_CONNECT_STRING='insert your connection string here'
PORT=3000
```
Paste in your connection string into /exercise-rest/.env and save the file to ensure consistent use of the attributes across the application.

#### 3. Start the REST API
Navigate to /exercise-rest directory and run these commands sequentially:
```bash
npm install
npm start
```
This will start the API using the attributes in the .env file.

API runs independently of the React application. See /exercise-rest/test-requests.http for test requests.  These can be executed using a local REST extension for your IDE to verify CRUD operations are working as intended.

## Setup React Application

#### 1. Start the React app
Navigate to /exercise-ui directory and run these commands sequentially:
```bash
npm install
npm run dev
```
This will start the React application on localhost:5173 in your web browser.  This application will then leverage the REST API running on local port 3000.

## Architecture

#### Data for the Application
| Property | Data Type | Comments |
| -------- | --------- | ----------- |
| name     | string    | Name of the exercise |
| reps     | integer   | Greater than 0 |
| weight   | integer   | Greater than 0 |
| unit     | string    | kgs or lbs     |
| date     | string    | MM-DD-YY       |
| _id      | object    | Automatically generated when document created in MongoDB |

#### REST API Details

Model and controller are separated (model.mjs vs controller.mjs) [per MVC design](https://www.geeksforgeeks.org/mvc-framework-introduction/).  Mongoose is used to interact with MongoDB to perform the CRUD operations.

1. Create using POST /exercises
```bash
Request : JSON object, no path parameters, must contain all 5 properties and meet minimum property requirements.
Response : Success code 201, Failure code 400.
```
  
2. Read using GET / exercises
```bash
Request : No path parameter, no request body.
Response : Success code 200 + JSON body containing the entire collection.
```

3. GET using GET /exercises/:_id
```bash
Request : Path parameter contains ID of the document, no request body.
Response : Success code 200 + JSON body containing document with that ID, Failure code 404. 
```

4. Update using PUT /exercises/:_id
```bash
Request : JSON object and path parameter contains ID of the document.
Response : Success code 200 + JSON body with all properties of the updated document.
```

6. DELETE using DELETE /exercises/:_id
```bash
Request : Path parameter contains ID of the document, no request body.
Response : Success code 204, Failure code 404.
```

#### React UI
Contains three pages inside the Single Page Application (SPA):
1. Home page
2. Edit Exercise page
3. Create Exercise page
