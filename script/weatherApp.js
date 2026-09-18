document.addEventListener("DOMContentLoaded", function () {

   //API keys, URL
   //country codes to look up correct location with weather API
   const codeUrl = "/data_json/country_codes.json";
   //weather API Key
   const apiKey = "YOUR_OPENWEATHER_API_KEY";

   //create a function to update time constantly
   function updateTimeCons() {
      //retrieving time from local computer to calculate time zones
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");

      //local day date year
      const d = now.getDay(); //returns a number from 0 to 6
      const day = now.getDate();         //retrieves day date
      const month = now.getMonth() + 1; //0 - 11 
      const year = now.getFullYear();  // full year
      
      //create an array of names of the weeks
      const nameDay = [
         "Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday",
      ];

      dayOfWeek = nameDay[d];//return the day associated with the index
      
      //creating variable to display local time on the HTML (UI)
      const date = document.getElementById("date");
      const date2 = document.getElementById("date2");
      const date3 = document.getElementById("date3");

      //locations id=date of how the local time will be displayed
      date.innerHTML = `${hours}:${minutes}:${seconds}`;
      //location id=date2 of the day of the week
      date2.innerHTML = `${dayOfWeek}`;
      //location id=date3 the 12-October-2025 
      date3.innerHTML = `${day}-${month}-${year}`
   }

   //data Input CITY/TOWN 
   const userInput_place = document.getElementById("input_place");
   //button search base on data in placeholders
   const searchBtn = document.getElementById("search-btn");
   //data collected and assigning to the HTML (UI)
   const tempShow = document.getElementById("temp");
   //location details shown HTML card below the temperature (UI)
   const placeShow = document.getElementById("place");
   //below the date is a description of the the weather "few clouds"
   const descriptionShow = document.getElementById("description");
   //the suggested locations to under input label
   const sug = document.querySelectorAll(".suggestion");
   //background video 
   const video = document.getElementById("video");
   //drop down menu for the country
   const countryMenuDropDown = document.getElementById("countryDropMenu");
   //the time of area of enquiry (if search New York it will display that area time)
   const location_time = document.getElementById("location_time");

   //global variables
   // country code for example I.E is code for Ireland
   let code = "";
   
   //loop through suggestion class in html
   sug.forEach((item) => {
      //for each item that exist it will loop through
      item.onclick = () => { 
         //if item was clicked the text of item will be assigned to user Input
         userInput_place.value = item.textContent; 
         //simulates a click on the search button
         searchBtn.click(); 
      };
   });

   //calling the date/time function created above
   updateTimeCons();

   //keepin local time updated constantly
   setInterval(updateTimeCons, 1000); //every second

   //async function for to retrieve (ISO 3166-1 alpha-2 codes) from a local json file

   //retrieving the associated country codes to look up weatherAPI with better accuracy
   async function countryCode(codeUrl){// for own json file that contains the country the associated code.
      try {
            //fetch data 
            const response = await fetch(codeUrl); //"/data_json/country_codes.json"
            //verify fetch data
            if (!response.ok) {
               throw new Error(`API error: ${response.status}`);
            }
            //fetched data being parsed to a string format
            const code_data = await response.json();
            //Only reaches here if the reponse is OK and JSON  was parsed successfully

            //https://www.geeksforgeeks.org/javascript/how-to-create-a-dropdown-list-with-array-values-using-javascript/ 
            

            //sorting array of country names on the name which are the keys in a alphabetical order for the drop down menu 
            const sorted_country = Object.keys(code_data.countryNames).sort();

            //populating data in the drop down menu
            sorted_country.forEach(country => {
               const option = document.createElement("option");
               option.value = code_data.countryNames[country]; //this is the code in .json country(value)
               option.textContent = country; // this is the country name assigned to the textContent in HTML
               countryMenuDropDown.appendChild(option); //populating the drop down menu 
            })
            //data is fetched and parsed yet there is fault this is to prevent and trouble shoot faults
            } catch (error) {
            console.error("Error fetching country code data:", error);
         }
   }
   //load the country drop down menu as soon as page loads
   //this important as user wants immediate access to countries in drop down menu
   countryCode(codeUrl);

   //search button 
   searchBtn.addEventListener("click", async function (event) {
      //stops form from reloading on submit
      event.preventDefault();

       //input field being trimmed and set to uppercase
      const place = userInput_place.value.trim().toUpperCase();
      //clear input fields values
      userInput_place.value = "";
      

      //condition if a city/town name must consist with [A-Za-z]
      if(place === ""){
         alert(document.title + ": City/Town Input field cannot be empty");
         return;
      }else if (! /^[\p{L}\s.'-]+$/u.test(place)){//regex 
         alert("only alphabetic characters from any language, hyphens, apostrophes, periods, and paces are allowed.");
         return;    
      }
      //this is the code for the country name (avoid stall data ,resets and sanitise states)
      if (code !== ""){  
         code = "";
         code = await (countryMenuDropDown.options[countryMenuDropDown.selectedIndex].value); 
      }else{
         code = await (countryMenuDropDown.options[countryMenuDropDown.selectedIndex].value); 
      } 
      //url for weather API place = city/town input & code = value of country in json file IRELAND : IE
      const apiUrl = 
         "https://api.openweathermap.org/data/2.5/weather?q=" +
         place + "," + code +                                    
         "&appid=675ccbfe2cbca33c2a8f7101a6f1c579&units=metric";

         
      // fetch the weather API using(apiUrl)
      async function fetchWeather(apiUrl) {
            try {
               const response = await fetch(apiUrl);

               if (!response.ok) {
                  throw new Error(`API error: ${response.status}`);
               }

               const data = await response.json();
               //Only reaches here if the reponse is OK and JSON  was parsed successfully

               //assigning JSON data to variables
               const name = data.name;
               //assigning temp celsius
               const tempCal = data.main.temp;
               //description of the weather
               const description = data.weather[0].description;
               //this is a code of weather condition/ night or day
               const icon = data.weather[0].icon; 
               //this converts to a string single decimal point
               const temp = Number(tempCal.toFixed(1)); //this converts to a string 2 decimal point
               //logging for error handling 
               console.log(name, temp, description);
               //time zones times display on search... new Date converts unix timestap into readable data
               const localTime = new Date((data.dt + data.timezone) * 1000);//data.dt and data.timezone is from the weatherAPI
              
               //time for area queried in a hr,min format 
               const formattedTime = localTime.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "UTC"
               });

               //now to display on HTML(UI)
               //temp in degrees
               tempShow.innerHTML = temp + "&nbsp;&deg;" + "C";
               //name of town/city , country code
               placeShow.innerHTML = name+", " + code;
               //description of the weather condition 
               descriptionShow.innerHTML = "&nbsp;" + description;
               //time of queried location  
               location_time.innerHTML = name + " estimated time: "+ formattedTime;
               

               //icon is the code given for weather conditions base of the code the background changes 
               //to reflect the weather condition 
               switch (icon) {
                  case "01d":  //clear day 
                     video.innerHTML = '<source src="../images/clear_days.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  case "01n": //clear night
                     video.innerHTML = '<source src="../images/clear_night_sky.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  case "02d": //cloudy or overcast day
                  case "03d": 
                  case "04d":
                     video.innerHTML = '<source src="../images/cloudy_2k.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  case "02n": //cloudy or overcast night
                  case "03n":
                  case "04n":
                     video.innerHTML = '<source src="images/over_cast_night.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  case "09d": // light to heavy rain day
                  case "10d":
                     video.innerHTML = '<source src="../images/rain_umbrella.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  case "09n": // light to heavy rain night
                  case "10n":
                     video.innerHTML = '<source src="../images/raining_at_night.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  case "11d": // storm day
                     video.innerHTML = '<source src="../images/thunder_storms.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  case "11n": //storm night
                     video.innerHTML = '<source src="../images/thunder_storm_at_night.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  case "13d": //snow day
                     video.innerHTML = '<source src="../images/snow.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  case "13n": //snow night
                     video.innerHTML = '<source src="../images/snowing_at_night.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  case "50d": //mist day
                     video.innerHTML = '<source src="../images/mist.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  case "50n": //mist night
                     video.innerHTML = '<source src="../images/mist_at_night.mp4" type="video/mp4" />';
                     video.load();
                     break;
                  default:  // default to clouds day 
                     video.innerHTML = '<source src="../images/cloudy_2k.mp4" type="video/mp4" />';
                     video.load();
                     break;
               }
            } catch (error) {
               console.error("Error fetching weather data:", error);
            }
         //clears drop down menu after weather information is returned  
         countryMenuDropDown.value = ""; 
      }
      //calling the API
      fetchWeather(apiUrl);
      
   });
});

