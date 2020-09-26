//BaseURL for ergast API
let baseURL = "http://ergast.com/api/f1/drivers.json";
//console.log(baseURL); // checking to make sure script file connected to HTML

const qSeries = document.getElementById('inputF1Series');
const qSeason = document.getElementById('inputF1Season');
const qDriver = document.getElementById('inputF1Driver');
const queryForm = document.querySelector('form');


//add eventlistner to the form
queryForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
    e.preventDefault();
    console.log('you clicked me');

    //set default value of series to f1 because it is required in url
    let qSeries = 'f1';
    console.log('Series: ', qSeries);

     fetch(baseURL)
        .then (function(result) {
            //console.log("Result:", result);
            return result.json();
        })
        .then (function(json) {
            console.log("JSON: ", json);
            displayResults(json);
        });

        function displayResults(json) {
            let driver = json.MRData.DriverTable;
            console.log("Drivers:", driver);
            };
        };

   
