
//BaseURL for ergast API
let baseURL = "https://ergast.com/api/f1/";
//console.log(baseURL); // checking to make sure script file connected to HTML
let seasonNumber;
let url;



//declaring DOM elements to be manipulated
const qSeason = document.getElementById('inputF1Season');
const queryForm = document.querySelector('form');
const para = document.getElementById('error');

//add eventlistner to the form
queryForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
    e.preventDefault();
    //console.log('you clicked me');

        // storing input value of Season field as a variable
        if(qSeason.value != '') {
            seasonNumber=qSeason.value;
        } else{
            seasonNumber = '';
        }
        //console.log("season", seasonNumber);
       
        //updating the base url with season variable
        if(seasonNumber === '' ){
            url=`${baseURL}drivers.json`
        } else {
            url=`${baseURL}${seasonNumber}/drivers.json`
        }
        console.log("URL", url);

     fetch(url)
        .then (function(result) {
            //console.log("Result:", result);
            return result.json();
        })
        .then (function(json) {
            //console.log("JSON: ", json);
            displayResults(json);
        });
    };
        
    function displayResults(json) {
        let driver = json.MRData.DriverTable.Drivers;
        console.log("Drivers:", driver);
         
        if(driver.length === 0) {
            //console.log("No Results");
            para.innerHTML = "Please enter a four digit year later than 1940";
            } else { 
                /*for(let i = 0; i < driver.length; i++) { 
                    //console.log(i); // checking to see loop is working
                    let current = driver[i]; // each time the index is incrememted, it is set as current.
                    console.log("Current:", current);
                    let id = Object.driverID;
                        console.log(id);}*/

                let table = document.querySelector("table");
                const data = Object.keys(driver[0]);
                console.log("old: ", data);

                
                function generateTableHead(table, data) {
                    let thead = table.createTHead();
                    let row = thead.insertRow();
                            for(let key of data){     
                            let th = document.createElement("th");
                            th.setAttribute('class', 'driverHeader');
                            let text = document.createTextNode(key);
                            th.appendChild(text);
                            row.appendChild(th);
                        };
                    };  
                        
                function generateTable(table, data) {                    
                        for(let element of data){
                            let row = table.insertRow();
                            row.setAttribute('Class', 'tableRow');
                            for (key in element) {
                                let cell = row.insertCell();
                                let text = document.createTextNode(element[key]);
                                cell.appendChild(text);
                            };
                        }; 
                    };

                generateTable(table, driver);                
                generateTableHead(table, data);
                };
    };              
