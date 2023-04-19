## Before You Begin

Before you begin i recommend you to read about the basic building blocks that assemble this application:

- PostgreSQL - Go through [PostgreSQL Official Website](https://www.postgresql.org/) and proceed to their [Official Manual](https://www.postgresql.org/docs), which should help you understand NoSQL and PostgreSQL better.
- Express - The best way to understand express is through it's [Official Website](https://expressjs.com/), which has a [Getting Started](https://expressjs.com/en/starter/installing.html) guide, as well as an [ExpressJS](https://expressjs.com/en/guide/routing.html) guide for general express topics.
- Vue.js - Vue [Official Website](https://vuejs.org/) is a great starting point.
- Node.js - Start by going through [Node.js Official Website](https://nodejs.org/en/) which should get you going with the Node.js platform.

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- NGINX - [Download & Install NGINX](https://www.nginx.com/), or Apache2 [Download & Install Apache](https://httpd.apache.org/) for running frontend.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- PM2 - [Download & Install PM2](https://pm2.keymetrics.io/) for running the backend/server/node js.
- PostgreSQL - [Download & Install PostgreSQL](https://www.postgresql.org/docs/index.html), and make sure it's running on the default port (27017).

## front-end

- VueJS (ES6)
- vue-router (_Single Page Application_)
- Pinia

_source files in `DGCA-FRONTEND/` folder._

## back-end

- NodeJS
- ExpressJS
- PostgreSQL

_source files in `DGCA-API/` folder_

## Quick Start

open terminal to run server and client,

```bash
# Clone or download the repository
git clone git@github.com:abaz1d/DGCA-App.git

# Go inside the directory
cd DGCA-App

_Please make sure you have installed postgresql and have restored the database that was prepared in file 'DGCA-API/dgca.backup'_

_and Please make sure your Database (PostgreSQL) and PM2 is running and installed_

_if you want, you can create user for login in table users in database and make sure you create user with role 'admin' for full acces this web app_

# Install dependencies for server
cd DGCA-API && npm install

# Setup database and backend/server
_Please setup connection database and connection backend/server in file 'DGCA-API/.env'_

# Start server with PM2
pm2 start npm --name "app name" -- start
# example: pm2 start npm --name "dgca-api" -- start
```

to run client

```bash
# Go inside the directory
cd DGCA-App/DGCA-FRONTEND

# Setup connection client to server
_Please setup connection client to server in file 'DGCA-FRONTEND/.env'_
_and Please make sure your NGINX/APACHE2 is running_

# Install dependencies for client
npm install

# Build the client
npm run build

# Start client
_Please move all file inside folder 'DGCA-FRONTEND/dist to your public directory nginx/apache2'_
```

this application should run on public IP/domain NGINX/APACHE2 , you can access it through browser, just go to IP/domain NGINX/APACHE2

### Default Admin

```sh
Email       :admin@gmail.com
Username    :admin
Password    :123
```

### Default guest

```sh
Email       :guest@gmail.com
Username    :guest
Password    :123
```
