// Variables 
var searchControl = $(".searchButton");

var api = "a74aaab810fba43e1745cdd1b4523381";


for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);

    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}

var keyCount = 0;

// Seach Button Section
searchControl.click(function () {

var searchDisplay = $(".searchDisplay").val();

// Present Weather Functions
var urlNow = "https://api.openweathermap.org/data/2.5/weather?q=" + {cityName} + "&appid=" + {api};
   
var url5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchDisplay + "&Appid=" + api + "&units=imperial";


    if (searchDisplay == "") {
        console.log(searchDisplay);
    } else {
        $.ajax({
            url: urlNow,
            method: "GET"
        }).then(function (response) {
            
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            // Local storage
            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;

            
            var currentBoard = $(".currentBoard").append("<div>").addClass("card-body");
            currentBoard.empty();
            var presentName = currentBoard.append("<p>");
           
            currentBoard.append(presentName);

            // Date & Time
            var timeUTC = new Date(response.dt * 1000);
            presentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            presentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            
            // Temperature
            var presentTemp = presentName.append("<p>");
            
            presentName.append(presentTemp);
            presentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            // Humidity
            presentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            // // Wind Speed 
            presentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // UV Index URL
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                var nowUV = presentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                nowUV.addClass("UV");
                presentTemp.append(nowUV);
            });

        });

        
        $.ajax({
            url: url5Day,
            method: "GET"
        }).then(function (response) {

            // Array 
            var day = [0, 8, 16, 24, 32];
            var fiveDayBoard = $(".fiveDayBoard").addClass("card-body");
            var fiveDayTag = $(".fiveBoxes").addClass("card-text");
            fiveDayTag.empty();

            // 5 Day Funtion
            day.forEach(function (i) {
                var fiveDayTime = new Date(response.list[i].dt * 1000);
                fiveDayTime = fiveDayTime.toLocaleDateString("en-US");

                fiveDayTag.append("<div class=daysColour>" + "<p>" + fiveDayTime + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


            })

        });
    }
});