# Live Weather App

A responsive weather application built with **JavaScript, HTML, CSS and Bootstrap** that retrieves live weather information from an external weather API.

The application allows users to search by **city/town and country**, displays current weather information and local time, and dynamically changes the visual background to represent the current weather conditions.

## Features

- Search for live weather by city or town
- Country verification for locations with the same name
- Retrieves live weather data from an external weather API
- Displays the current temperature
- Displays current weather conditions
- Displays the date and local/estimated time for the selected location
- Dynamically changes the background based on current weather conditions
- Uses animated/video weather backgrounds to create a more immersive interface
- Processes JSON data returned by the API
- Responsive user interface

## Dynamic Weather Visualisation

One of the main features of the application is its dynamic weather display.

The background changes according to the weather conditions returned by the API. Different visual effects are used for conditions including:

- ☀️ Clear / sunny weather
- ☁️ Cloudy / overcast weather
- 🌧️ Rain
- ⛈️ Storms
- 🌨️ Light snow
- ❄️ Heavy snow

Animated/video backgrounds are used to visually represent the current conditions rather than displaying weather information as text alone.

## Location Verification

Cities and towns can share the same name across different countries.

For example, searching for a city name alone may return a location in a different country than the user intended.

The application therefore allows the user to provide both:

- **City / Town**
- **Country**

This helps identify the intended location and retrieve the appropriate weather information.

## Weather Information

For the selected location, the application displays information including:

- Current temperature
- City / location
- Current weather conditions
- Current date
- Local / estimated time

## Technologies Used

- **JavaScript**
- **HTML5**
- **CSS3**
- **Bootstrap**
- **REST API**
- **JSON**
- **Git & GitHub**

## How It Works

1. The user enters a city or town.
2. A country can also be supplied to verify the intended location.
3. JavaScript sends a request to the external weather API.
4. The API returns live weather data in JSON format.
5. The application processes the response and updates the page dynamically.
6. Temperature, weather conditions, date and local time are displayed.
7. The background visual is selected according to the returned weather conditions.

## Running the Project

1. Clone this repository:

   ```bash
   git clone https://github.com/JohnBoyR1/WeatherApp.git
   ```

2. Open the project folder in Visual Studio Code.

3. Run the application using a local development server such as Live Server.

4. Open the application in your browser and search for a city/town and country.

> An internet connection is required to retrieve live weather information.

## What I Learned

This project gave me practical experience with:

- Consuming an external REST API
- Working with asynchronous JavaScript
- Processing JSON responses
- Dynamically manipulating the DOM
- Handling user input and location searches
- Working with dates and location-based time
- Creating condition-based application behaviour
- Integrating dynamic visual media into a web interface
- Responsive front-end development
- Git and GitHub version control

## Author

**Jeán Walton**  
BSc (Honours) Computer Science Student  
National College of Ireland  

GitHub: [JohnBoyR1](https://github.com/JohnBoyR1)
