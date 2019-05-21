const gallery = document.getElementById("gallery");
const dataLink = "https://randomuser.me/api/?results=12&nat=us";


// The Function below returns an Abreaviation based on corresponding state
function statesAbreviation(input, to){
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];
    if (to == 'abbr'){
      input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); // Select and capitalize the first letter of the string and set the rest to Lowercase
      for(i = 0; i < states.length; i++){
        if(states[i][0] == input){
          return(states[i][1]);
        }
      }    
    }
  }
  // Format the date Data received from the API
  const formatDate = function(dateArray, i){
    let dateOfBirth= new Date(dateArray[i].dob.date);
                let dd = dateOfBirth.getDate();
                let mm = dateOfBirth.getMonth() + 1;
                let year = dateOfBirth.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                  }
                if (mm < 10) {
                    mm = '0' + mm;
                  }
                let employeeDob = `${mm}/${dd}/${year}`;
                return employeeDob;
}
// Create search bar 
const searchContainer = document.getElementsByClassName ("search-container")[0];
searchContainer.innerHTML = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                            </form>`;

//Get the contact to display by Fetching Random user form randomuser.me
const fetchData = fetch(dataLink)
    .then(response => response.json()) 
    .catch(error => console.error('Error:', error))
    .then( function(data){
        const contactsArray = data.results;
        return contactsArray;
    })
    .then(function(data){
        for (let i = 0; i<data.length; i++){
            var card = document.createElement('div');
            card.className = "card";
            card.innerHTML = `<div class="card-img-container">
                              <img class="card-img" src= ${data[i].picture.large} alt="profile picture">    
                              </div>
                              <div class="card-info-container">
                              <h3 id="name" class="card-name cap">${data[i].name.first +" " +data[i].name.last}</h3>
                              <p class="card-text">${data[i].email}</p>
                            <p class="card-text cap">${data[i].location.city + ", "+data[i].location.state}</p>
                              </div>
                              </div>`
                gallery.appendChild(card);
        }
        return data;
    })
    .then(
      function(data){
        let cards = document.querySelectorAll(".card");
        for(let i = 0; i< cards.length; i++){
            let card = cards[i];
            card.addEventListener("click", function(){
              createModal(data, i);
            });
            card.addEventListener("mouseover", function(){
             card.style.backgroundColor = "#faf5ff";
              card.style.transform = "scale(1.05)";
            })
            card.addEventListener("mouseout", function(){
              card.style.backgroundColor = "rgba(245, 245, 245, 0.9)";
              card.style.transform = "scale(1.00)";
            })
        }
      }
    )
    .then(function(){ // add the search functionality using jQuery
      var searchEmployee=$("#search-input");
      searchEmployee.keyup(function(){
       var value = $(this).val().toLowerCase();
       $(".card-name").filter(function(){
            $(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1);
       });
      });
  });

    function createModal(data, i){
      const modalContainer = document.createElement("div");
      modalContainer.className = "modal-container";
          let employeeDob = formatDate(data, i);
          const modal = document.createElement('div');
          modal.className = "modal";
          modal.id = i;
          modal.innerHTML = ` <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                              <div class="modal-info-container">
                              <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                              <h3 id="name" class="modal-name cap">${data[i].name.first +" " +data[i].name.last}</h3>
                              <p class="modal-text">${data[i].email}</p>
                              <p class="modal-text cap">${data[i].location.city}</p>
                              <hr>
                              <p class="modal-text">${data[i].phone}</p>
                              <p class="modal-text">${data[i].location.street}, ${statesAbreviation(data[i].location.state , 'abbr')}  ${data[i].location.postcode}</p>
                              <p class="modal-text">Birthday: ${employeeDob} </p>
                              </div>
                              <div class="modal-btn-container">
                              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                              <button type="button" id="modal-next" class="modal-next btn">Next</button>
                              </div>`
          modalContainer.appendChild(modal);
          gallery.appendChild(modalContainer);
          
// used jQuery in this section to add function to the close, prev and next buttons.
     let close = $("#modal-close-btn");
     let prev  = $(".modal-prev");
     let next  = $(".modal-next");
     close.click(function(){ // remove the modal whe the X button is clicked
        console.log(parseInt(modal.id)); 
      gallery.removeChild(modalContainer);
       
     });

//Hide left button when employee profile is less than or = 0


      if(i>=11){
        next.remove();
      }

//Hide right button when employee profile is more than or equal to 11    
 
    if(i<=0){
        prev.remove();
      }
      let cardIndex=parseInt(modal.id);
      prev.click(function(){

      })

// conditionally add and remove Modal when left/right button is clicked  
    if(i>=0 ){
            $( document ).ready(function() {
            next.click(function(){
                    modalContainer.remove();
                    cardIndex=parseInt(modal.id);
                    cardIndex++;
                    createModal(data, cardIndex);
                   
            }); 
            });
            }

    if(i<=11 ){
              $( document ).ready(function() {
                prev.click(function(){
                      modalContainer.remove();
                      cardIndex=parseInt(modal.id);
                      cardIndex--;
                      createModal(data, cardIndex);
                }); 
              });
              }
    }