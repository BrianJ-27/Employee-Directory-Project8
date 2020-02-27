 class UI{
  constructor(){
    // Stores the main element with is the main-container of all the employees
    this.gridContainer = document.querySelector(".grid-container");
    // Stores the div element that acts as the dark overlay for the modal
    this.overlay = document.querySelector(".overlay");
    // Stores the div element that hold the modal information
    this.modal = document.querySelector(".modal-info");
    // Stores the the div element that is the modal's close button
    this.closeModal = document.querySelector(".modal-close");
    // Stores the a element that is the left arrow
    this.leftArrow = document.getElementById("leftArrow");
    // Stores the a element that is the right arrow
    this.rightArrow = document.getElementById("rightArrow");
    //stores the form element that holds the input field
    this.searchBar = document.getElementById("searchBar");
    this.events();
  }

  events(){
    this.gridContainer.addEventListener("click", (event) =>{
          if(event.target !== this.gridContainer){
            const card = event.target.closest(".card");
            const index = card.getAttribute('data-index');
            ui.showModal(index);
          }
        });
    /* When a user keys in a value (letter) it filters through the employees and display 
   the employees that have the matching value in their first or last name */
    this.searchBar.addEventListener("keyup", this.filterEmployee);

     // when user clicks the close button on the modal card it closes the modal compeletly
     this.closeModal.addEventListener("click", ()=>{
      this.overlay.classList.add("hidden");
    });

    // when user clicks on left arrow, it goes to the next indexed person
    this.leftArrow.addEventListener("click", (event)=>{
      let card = ui.getModalCard();
      let currentIndex = +ui.getCurrentIndex(card);
       currentIndex -=1;
       if(currentIndex < 0){
          currentIndex = filteredEmployees.length -1;
       }
       card.setAttribute('data-index', currentIndex);
       this.showModal(currentIndex);
    });
  // when user clicks on right arrow, it goes to the next indexed person
    this.rightArrow.addEventListener("click", (event)=>{
      let card = ui.getModalCard();
      let currentIndex = +ui.getCurrentIndex(card);
       currentIndex +=1;
       if(currentIndex >= filteredEmployees.length){
          currentIndex = 0;
       }
       card.setAttribute('data-index', currentIndex);
       this.showModal(currentIndex);
    });
  }

  // display employee data to the page
  displayEmployees(employeeData){
    let employeeHTML = " "; 
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
   this.gridContainer.innerHTML = employeeHTML;
  }

  // filters employee data, then evals to "true" and 
  //passes it into the "displayEmployee" func
  filterEmployee(){
    filteredEmployees = employees; // holds the array employees data
    let inputField = document.getElementById('search-field').value.toLowerCase();
    if (inputField && inputField.length){
      filteredEmployees = filteredEmployees.filter((employee)=> 
      employee.name.first.indexOf(inputField) > -1 && employee.name.last.indexOf(inputField) > -1);
    }
    ui.displayEmployees(filteredEmployees);
  }

  

  // will dispay the modal that is clicked on
  showModal(index){
   let employees = filteredEmployees; 
   employees = filteredEmployees[index]; 
   let name = employees.name;
   let dob = employees.dob;
   let phone = employees.phone;
   let email = employees.email;
   let city = employees.location.city;
   let street = employees.location.street;
   let state = employees.location.state;
   let postcode = employees.location.postcode;
   let picture = employees.picture.large;
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
     `;
     this.overlay.classList.remove("hidden"); // will reveal the overlay  
     this.modal.innerHTML = modalHTML; // add modal to screenS
  }

    getModalCard(){
      return document.getElementById("modalCard");
    }

    getCurrentIndex(modalCard){
      return modalCard.getAttribute('data-index');
    }

}