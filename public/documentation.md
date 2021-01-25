# Student Information System
Description: ---

***
<br/>

# NOTE
This version does not contain any real database. All data is processed as a list in separate js files. When registering, refreshing the browser or returning to the login page will wipe out any new registers automatically.

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

### StudentDirectory.js
Displays List of Students from Department.
### Functions:
- backBtnClicked: goes back to previous page.
- toStudentIfoClicked: redirects to student info page.
- render: renders list of students.

***

### StudentInfo.js
Displays Student Information.
### Lifecycles:
- componentDidMount: stores student info if access is allowed
### Functions:
render: renders student info.

***
<br/>

## Additional Files:
<br/>
<br/>

## Data
### admins.js
In memory "database" of this system.<br/>
This contains name, id and password of admins.
Could serve as a test file (since this project does not contain actual database).

### students.js
Database for student info.
### subjects.js
Subjects info including name and reference to instructor database.
### schedules.js
Schedules info with a list of id references from subject schedules.
### instructors.js
Instructor info.
### subject_schedules.js
Subject schedules info including time & day of class and reference to subject database.
### grades.js
Grades info including reference to student id and subject id and prelim, midterm and final grades.

<br/>

***
## Scripts
### getRequests.js
Handles all get requests made by user. Functions include:
  - getSchedule
  - getGrades