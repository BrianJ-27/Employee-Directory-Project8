// Stores the URL of the randomUser API & the options connected to the API
const urlAPI = `https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob&noinfo&nat=US`

// Stores the main element with is the main-container of all the employees
const gridContainer = document.querySelector(".grid-container");
// Stores the div element that acts as the dark overlay for the modal
const overlay = document.querySelector(".overlay");
// Stores the div element that hold the modal information
const modal = document.querySelector(".modal-info");
// Stores the the div element that is the modal's close button
const closeModal = document.querySelector(".modal-close");
// Stores an empty array that will hold the values from the API
const employees = [];


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url){
    return fetch(url)
      .then(res => res.json())
      .catch(error => console.log('Looks like there was a problem!', error))
  }
  
  //invoking the fetch function
    fetchData(urlAPI)
    .then(res => res.results)
    .then(displayEmployees)
  // ------------------------------------------
  //  HELPER FUNCTIONS
  // ------------------------------------------
  function displayEmployees (employeeData) {
   let employees = employeeData;
   let employeeHTML = " ";

   employees.forEach((employee, index) =>{
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
         `
   }); 
   gridContainer.innerHTML = employeeHTML;
}
  
  // ------------------------------------------
  //  EVENT LISTENERS
  // ------------------------------------------


