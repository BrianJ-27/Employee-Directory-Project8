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
import RandomUserAPI from './randomUser.js';
import UI from './ui.js';

// --------------------------------------------------------------------//
//  INIT CLASSES FROM RANDOMUSER.JS AND UI.JS
// --------------------------------------------------------------------//

// Init Classes in this file
const ui = new UI();
const randomUser = new RandomUserAPI();

// Fetch data from API, then pass API array to "filter employee" function
  randomUser.getRandomUser()
    .then(ui.filterEmployee)
    .catch(err => console.log(err));






