# Private Club - Node.js and MongoDB
This is a simple web application built with Node.js and MongoDB that allows users to sign up, create messages, and become members of a private club by entering a secret passcode.
- The secret passcode is `theodinproject`
## Getting Started
### Installing
1. Clone the repository
2. Install dependencies with npm install
3. Start the server with npm start
4. Access the application at http://localhost:3000
### Live [Demo]()
## Features
- Sign up form with field validation and password encryption using bcrypt
- Secret passcode page to become a member
- Login form using passport.js
- Create message form
- Display all member messages on the home page, but only show the author and date of the messages to other club-members
- Admin user with the ability to delete messages