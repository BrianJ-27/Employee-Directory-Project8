// --------------------------------------------------------------------//
//  IMPORT CLASSES FROM ALL OTHER COMPONENT FILES
// --------------------------------------------------------------------//

// Imported classes
import { randomUser } from './randomUser.js';
import { ui}  from './ui.js';

// 1) Fetch data from API,  
// 2) Store it into empty array variable of "employee data"
// 3) Then pass API array to "filter employee" function
  randomUser.getRandomUser()
    .then((response) => // step 1)
    {
      ui.employeeData = response.results; // step 2)
      ui.filterEmployee(); // step 3)
    }).catch(err => console.log(err));






