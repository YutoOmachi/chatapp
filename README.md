# chatapp

## Description
This is a chatapp allows users to send real time messages between browsers.
The UI resembles WhatsApp and it identifies the message is sent by you or other users.

## Tech Stack
* node.js
* express
* mysql
* socket.io

## Prerequisite
* You must have node and mysql downloaded to your machine.

## How To Use
1. Open terminal and cd to the path of this project
2. Create .env file with the following variables
  - PORT=yourportnum
  - DB_HOST=your host name for Data Base (localhost)
  - DB_USER=your user name for Data Base (root)
  - DB_PASS=your password for DB_USER
  - DB_NAME=name of data base (chatappDB)
3. Excute 'npm intall' to install all the neccesary packages for this project.
4. Excute 'node server/app.js' on terminal and open 'http://[hostname]:[port]' on your prefered browser. (default is http://localhost:3000/)
5. Now you can simply follow the intruction on the page. Enjoy!
