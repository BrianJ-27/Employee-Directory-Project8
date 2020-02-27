// // --------------------------------------------------------------------//
// //  IMPORT CLASSES FROM RANDOMUSER.JS AND UI.JS
// // --------------------------------------------------------------------//
// // Our modules / classes
// import RandomUserAPI from './randomUser.js';
// import UI from './ui.js';

// --------------------------------------------------------------------//
//  GLOBAL VARIABLES
// --------------------------------------------------------------------//

// Stores an empty array that will hold the filtered employee values from the API
let filteredEmployees = [];

// Stores an empty array that will hold the values from the API
let employees = [];

// --------------------------------------------------------------------//
//  IMPORT CLASSES FROM RANDOMUSER.JS AND UI.JS
// --------------------------------------------------------------------//

// Init Classes in this file
const ui = new UI();
console.log(ui);
const randomUser = new RandomUserAPI();
console.log(randomUser);
randomUser.getRandomUser(`https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`)
.then(res => {
 let array = res.results;
 employees = array;
})
.then(ui.filterEmployee)
.catch(err => console.log(err));




