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

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

let filteredEmployees = [];

// Stores an empty array that will hold the values from the API
let employees = [];


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
    .then(res => {
      const results = res.results;
      console.log(results);
      employees = results;
    })
    .then(searchEmployee)
   

    
  // ------------------------------------------
  //  HELPER FUNCTIONS
  // ------------------------------------------



  function displayEmployees (employeeData ) {
    
   // storing an empty string into a variable so we can dynamically interpolate the HTML to it
   let employeeHTML = " ";
   //We are itering or looping over the 12 employees data array, 
   //using dot.notation to access the values inside the array and assign it to a variable
   //Then create the HTML tags and use string interpolation to access the and set the values to an attribute
   employeeData.forEach((employee, index) =>{
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


function showModal(index){
   employee = filteredEmployees[index]; 

  let name = employee.name;
  let dob = employee.dob;
  let phone = employee.phone;
  let email = employee.email;
  let city = employee.location.city;
  let street = employee.location.street;
  let state = employee.location.state;
  let postcode = employee.location.postcode;
  let picture = employee.picture.large;
  let date = new Date(dob.date);
  
  const modalHTML = ` 
  <img class="modal-avatar" src="${picture}" />
  <div class="modal-text-container">
      <h2 id= "modalCard" class="name" data-index="${index}" >${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr />
      <p class="phone">${phone}</p>
      <p class="address">${street} ${state}, ${postcode}</p>
      <p class= "bday">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    `
    overlay.classList.remove("hidden");
    modal.innerHTML = modalHTML;
    
}; 

    

function searchEmployee(){
    filteredEmployees = employees;
  //create a variable to hold the value of the search field and change the input to lowercase
    let inputField = document.getElementById('search-field').value.toLowerCase();
    if (inputField && inputField.length){
     filteredEmployees = filteredEmployees.filter((employee)=> employee.name.first.indexOf(inputField) > -1 || employee.name.last.indexOf(inputField) > -1);
    }
     displayEmployees(filteredEmployees); 
  }

  function getModalCard(){
    return document.getElementById("modalCard");
  }

  function getCurrentIndex(modalCard){
    return modalCard.getAttribute('data-index');
  }
  
  // ------------------------------------------
  //  EVENT LISTENERS
  // ------------------------------------------

  gridContainer.addEventListener("click", (event) =>{
    if(event.target !== gridContainer){
      const card = event.target.closest(".card");
      const index = card.getAttribute('data-index');
      showModal(index);
    }
  });

  leftArrow.addEventListener("click", (event)=>{
    let card = getModalCard();
    let currentIndex = +getCurrentIndex(card);
     currentIndex -=1;
     if(currentIndex < 0){
        currentIndex = filteredEmployees.length -1;
     }
     card.setAttribute('data-index', currentIndex)
     showModal(currentIndex);
  });

  rightArrow.addEventListener("click", (event)=>{
    let card = getModalCard();
    let currentIndex = +getCurrentIndex(card);
     currentIndex +=1;
     if(currentIndex >= filteredEmployees.length){
        currentIndex = 0;
     }
     card.setAttribute('data-index', currentIndex)
     showModal(currentIndex);
  });

  closeModal.addEventListener("click", ()=>{
    overlay.classList.add("hidden");
  });

  

  const searchBar = document.getElementById("searchBar");
  
  searchBar.addEventListener("keyup", searchEmployee);
  


