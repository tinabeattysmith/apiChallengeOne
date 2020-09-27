//BaseURL for ergast API
let baseURL = "http://ergast.com/api/f1";
//console.log(baseURL); // checking to make sure script file connected to HTML
let seasonNumber;
let url;

//declaring DOM elements to be manipulated
const qSeason = document.getElementById('inputF1Season');
const queryForm = document.querySelector('form');

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
            url=`${baseURL}/drivers.json`
        } else {
            url=`${baseURL}/${seasonNumber}/drivers.json`
        }
        //console.log("URL", url);

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
        let table = document.querySelector("table");

  
        if(driver.length === 0) {
            console.log("No Results");

            } else {    
                for(let i = 0; i < driver.length; i++) { 
                //console.log(i); // checking to see loop is working
                let current = driver[i]; // each time the index is incrememted, it is set as current.
                console.log("Current:", current);
                let data = Object.keys(driver[0]);
                            
                function generateTableHead(table, data) {
                    let thead = table.createTHead();
                    let row = thead.insertRow();
                        for(let key of data){     

                            let th = document.createElement("th"); 
                            let text = document.createTextNode(key);
                            th.appendChild(text);
                            row.appendChild(th);
                        };
                    };   
                    
                function generateTable(table, data) {                    
                        for(let element of data){
                            let row = table.insertRow();
                            for (key in element) {
                                let cell = row.insertCell();
                                let text = document.createTextNode(element[key]);
                                cell.appendChild(text);
                        };
                    }; 
                };
                                    
                    generateTableHead(table, data);
                    generateTable(table, driver);
                    
                };
            };            
        };