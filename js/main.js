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
    .then(filterEmployee)
   

    
  // ------------------------------------------
  //  HELPER FUNCTIONS
  // ------------------------------------------


//This function adds the employees onto the page
  function displayEmployees (employeeData) {
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

// This function call is located on 3 different listeners
// 1) grid container listener invokes this function when the user click any employee card on the page
// 2) 
function showModal(index){
//
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
  //created a variable to hold the HTML & string interpolated content that will show appear after a card is clicked
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
    //Remove the hidden class on the this selector to reveal the dark transparent overlay
    overlay.classList.remove("hidden");
    //Then assign the value of modalHTML so the all the HTML markup gets added to the DOM after user clicks  
    modal.innerHTML = modalHTML;
    
}; 

    

function filterEmployee(){
  //places the "employee" JSON data received from the server and stores the data into a the "filteredEmployees" varaible 
  //This filteredEmployees will now hold the data in a array
    filteredEmployees = employees;
  //create a variable to hold the value of the search field and change the input to lowercase
    let inputField = document.getElementById('search-field').value.toLowerCase();
  // checks to see if input value and arraylength are true. If true, it filters out the first names or last names
  // of what is typed
    if (inputField && inputField.length){
     filteredEmployees = filteredEmployees.filter((employee)=> 
     employee.name.first.indexOf(inputField) > -1 || employee.name.last.indexOf(inputField) > -1);
    }
  // If the "if statement" evaluates to false, then invoke the 
  //displayEmployees function and pass the stored JSON data to begin execution of the displayEmployees function 
  //To display this employee data to the page.
     displayEmployees(filteredEmployees); 
  }
// get the h2 data from modal card and returns the value to be used later in both arrow click event listeners
  function getModalCard(){
    return document.getElementById("modalCard");
  }
// gets the current index of the modal and returns the value to be used later in both arrow click event listeners
  function getCurrentIndex(modalCard){
    return modalCard.getAttribute('data-index');
  }
  
  // ------------------------------------------
  //  EVENT LISTENERS
  // ------------------------------------------
// when user clicks on an employee card, it grabs the the closet employee card and grads the number value from the
// The listener also passes a the indexed number value to the showModal function
  gridContainer.addEventListener("click", (event) =>{
    if(event.target !== gridContainer){
      const card = event.target.closest(".card");
      const index = card.getAttribute('data-index');
      showModal(index);
    }
  });
// when user clicks on left arrow it goes to the prev indexed person in the employee list and loops back to the start
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
// when user clicks on right arrow it goes to the next indexed person in the employee list and starts back around again
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
// when user clicks the close button it hides the modal/closes the modal compeletly
  closeModal.addEventListener("click", ()=>{
    overlay.classList.add("hidden");
  });
//When user keys in a value (letter) it filters through the employees and display the employees 
//that have with that value in their first & last name
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keyup", filterEmployee);
  


