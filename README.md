#Cookstove Management System - Fullstack CRUD Application
The Cookstove Management System is a comprehensive Fullstack CRUD application designed to streamline the process of managing cookstoves. This project showcases my skills a junior Node-React developer in building a robust solution for tracking and updating cookstove information.


This project is a Fullstack CRUD application built to manage cookstoves. The application features a backend developed with Node.js(server-side) , Express and  utilizing PostgreSQL as the database. The frontend is developed using React to provide a user interface for interacting with cookstove data, Additionally I added some features, The application also integrates the management of workers who feed the system with relevant information for cookstove management. The code is designed to be simple to read and understand.



Met requirements Backend (Node.js with Express):RESTful API for managing cookstoves. Implement CRUD operations (Create, Read, Update, Delete) for cookstoves. Use PostgreSQL as the database to store cookstove information. Use environment variables for sensitive information (e.g., database connection details). Frontend (React): Create a user interface to interact with the cookstove data. Display a list of cookstoves with their details. Implement a form for adding new cookstoves. Enable the user to edit existing cookstove information. Provide a delete option for each cookstove. Integration: Connect the frontend and backend to ensure proper data flow. Make API calls from React components to perform CRUD operations. Code Quality: Follow best practices for code organization and structure. Include comments for clarity and documentation where necessary. Use meaningful variable and function names.



Database Structure The PostgreSQL database for this project includes the following tables: admin category cookstove employee 


#Cookstove Management System
The system uses vite + react ,variant JavaScript framework
How to 
1.Install node js and Install postgres table structure provided at the end.
2.extract the zip file.
3.open VScode and add the folder -->Cookstove Management System.
4.open the terminal and cd to client> cd .\Client\
5. then> npm run dev
6. add another terminal tab and cd server> cd .\Server\
7. then> npm run start 

Run the commands and create a relationship between table category id and table employee category id.


CREATE TABLE admin (
id SERIAL PRIMARY KEY,
email varchar(50) NOT NULL,
password varchar(200) NOT NULL
);



CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name varchar(30) NOT NULL
);


CREATE TABLE cookstove (
  id SERIAL PRIMARY KEY,
  ModelName varchar(50) NOT NULL,
  Location varchar(40) NOT NULL,
  Manufacturer varchar(150) NOT NULL,
  FuelType varchar(50) NOT NULL,
  InstallationDate varchar(50) NOT NULL,
  Category_Id int NOT NULL,
  Image varchar(150) NOT NULL
);



CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  name varchar(30) NOT NULL,
  email varchar(40) NOT NULL,
  password varchar(150) NOT NULL,
  salary int NOT NULL,
  address varchar(30) NOT NULL,
  image varchar(60) NOT NULL,
  category_id int NOT NULL
)