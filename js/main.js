// // --------------------------------------------------------------------//
// //  GLOBAL VARIABLES
// // --------------------------------------------------------------------//

// // Stores an empty array that will hold the filtered employee values from the API
// let filteredEmployees = [];

// //Stores an empty array that will hold the values from the API
// let employees = [];
// --------------------------------------------------------------------//
//  IMPORT CLASSES FROM RANDOMUSER.JS AND UI.JS
// --------------------------------------------------------------------//
// Our modules / classes
import { randomUser } from './randomUser.js';
import { ui}  from './ui.js';

// Fetch data from API, then pass API array to "filter employee" function
  randomUser.getRandomUser()
    .then(ui.filterEmployee)
    .catch(err => console.log(err));






