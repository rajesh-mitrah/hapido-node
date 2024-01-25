# hapido-node

# Create a .env file and add below data in that file.(below are the sample data)
 JWT_SECRET=THISISJWTSECRET
 DB_HOST=localhost
 DB_USERNAME=root
 DB_PASSWORD=''
 DB_NAME=hapido_database
 SESSION_SECRET=keyboardcat

 use "npm i" comment to install all needed packages.

 use "npm start" comment to run the application.

 create the database with the name(hapido_database) that mentioned in the .env data.

 Run all the sql queries(table scripts) that provided in the schema.sql file for the sample database.

# user API URLs
 http://localhost:8000/api/register
 http://localhost:8000/api/login

 fetch all users - get - http://localhost:8000/api/user/get_all_users
 add user - post - http://localhost:8000/api/register
 fetch a user by id - get - http://localhost:8000/api/get_user_by_id/:id
 update a user - put - http://localhost:8000/api/update_user/:id

# company APIs
 fetch all companies - get - http://localhost:8000/api/
 add comapony - post - http://localhost:8000/api/
 fetch a company - get - http://localhost:8000/api/:id
 update a company - put - http://localhost:8000/api/:id