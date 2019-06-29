// ------------------------------------------
//  GLOBAL VARIABLES
// ------------------------------------------

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
      .catch(error => console.log('Please check your code. Something is not right.', error))
  }
  
  //invoking the fetch function
    fetchData(urlAPI)
    .then(res => res.results)
    .then(displayEmployees)
  
  // ------------------------------------------
  //  HELPER FUNCTIONS
  // ------------------------------------------

  function displayEmployees (employeeData) {
    // we are storing the 12 employee data into the empty array
   let employees = employeeData;
   // storing an empty string into a variable so we can dynamically interpolate the HTML to it
   let employeeHTML = " ";
   //We are itering or looping over the 12 employees data array, 
   //using dot.notation to access the values inside the array and assign it to a variable
   //Then create the HTML tags and use string interpolation to access the and set the values to an attribute
   employees.forEach((employee, index) =>{
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
        <section class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </section>
         `;
   }
   ); 
   //Then we are taking our new dynamic content and assigning to gridContainer variable
   //Then we are adding the .innerHTML() to the grid container variable to add it dynamically to the page!! :)
   // We then call this function in our then() so the code inside this function can execute
   gridContainer.innerHTML = employeeHTML;
   
}

function showModal (employeeIndex){
  let modalContact = employees[employeeIndex]; 

  let name = modalContact.name;
  let dob = modalContact.dob;
  let phone = modalContact.phone;
  let email = modalContact.email;
  let city = modalContact.location.city;
  let street = modalContact.location.street;
  let state = modalContact.location.state;
  let postcode = modalContact.location.postcode;
  let picture = modalContact.picture.large;
  let date = new Date(dob.date);
  
  const modalHTML = ` 
  <img class="avatar" src="${picture}" />
  <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p>${phone}</p>
      <p class="address">${street} ${state} ${postcode}</p>
      <p>Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    `
    overlay.className = "hidden";
    modal.innerHTML = modalHTML;
}; 

  // ------------------------------------------
  //  EVENT LISTENERS
  // ------------------------------------------

  gridContainer.addEventListener("click", (event) =>{
    if(event.target !== gridContainer){
      const card = e.target.closest(".card");
      const index = card.getAttribute('data-index');
      showModal(employeeIndex);
    }
  });

