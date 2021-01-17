# Student Information System
Description: ---

***
<br/>

## General Information
This project is created with the React library.

### Packages:
- react-router-dom

***
<br/>

## Components:
### App.js
Main Component. Holds everything and every routers.

***

### Home.js
Displays login home page.
#### Functions:
- constructor: holds the state variables.
- inputChange: holds user entry to each text boxes (id and password).
- logIn: handles login process (approved or denied access to departments).
- render: renders the login form.

***

### Department.js
Displays Departments page.
### Lifecycles:
- componentDidMount: will either store admin info to admin state or not
- componentDidUpdate: updates page as necessary.
- backBtnClicked: returns to home page.

***
<br/>

## Additional Files:
### admins.js
In memory "database" of this system.<br/>
This contains name, id and password of admins.
Could serve as a test file (since this project does not contain actual database).