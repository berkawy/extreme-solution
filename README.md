# Web App displays github users with add to favorites and search feature
## Steps to run:
### 1- Clone the repo
### 2- run npm install
### 3- Add a github token in a .env file
### 4- Run npm run dev

## Design:
### Developed a home and favorites pages
### Each page has a nav bar component and UsersComponent
### nav bar components contains search bar and buttons for navigation with button to change to light/dark mode
### Created redux store and favorites slice to persist add to favorites button: users added to favorites stay persisted in local storage using redux state
### Created theme context using context api to handle colors and fonts
