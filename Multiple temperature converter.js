let darkTheme = false; //let variable to track day / night darkTheme state
let customColor = false; //let variable to track custom font color usage

//Function to create the page
function buildPage(containerID, schema) {
    dataschema = schema; //Store schema

    let containerElement = document.getElementById(containerID); //Referencing to the container

    for (item of dataschema) {
        let itemElement = createElement(item); //Create a element for the item
        containerElement.appendChild(itemElement); //Add the element to the container
    }
}

//Function to create elements
function createElement(item) {
    let inputPar = document.createElement("p"); //Create a paragraph

    let labelElement = document.createElement("label"); //Create a label
    let labelID = item.id + "lbl"; //Creating tect for labelID
    labelElement.innerText = item.prompt + ":"; //Set the text to show on the label
    labelElement.className = "day"; //Setting the same element ID for the label and the input
    labelElement.id = labelID; //Set the labelID
    labelElement.setAttribute("for", item.id); //Set the attribute for linking the label with the input
    inputPar.appendChild(labelElement); //Adding the element to the paragraph

    switch (item.type) {
        case "input":
            var inputElement = document.createElement("input") //Create new input element
            inputElement.className = "day"; //Set the class of the input element
            break; //Can be added later for other element types
    }

    let key = "doCalculation(" + item.keys + ")"; //Create a string for adding actions for the input element
    inputElement.setAttribute("id", item.id); //Set the id for the element
    inputElement.setAttribute("value", "0"); //Set a initial value for the element
    inputElement.setAttribute("onkeyup", key); //Set the action to do when the input was finished
    inputPar.appendChild(inputElement); //Add the element to the paragraph
    return inputPar; //Return the whole paragraph
}

//Function to get a number from the input element
function getNumberFromElement(id) {
    let elementIn = document.getElementById(id); //Link input from HTML to JS
    let element = elementIn.value; //Get input from user
    let value = Number(element); //Convert input from text to number
    return value;
}

//Function to set the value to HTML element
function setValueToElement(value, id) {
    let elementIn = document.getElementById(id);
    elementIn.value = value;
}

//Function to change the page darkTheme
function changeTheme(keys) {

    let body = document.getElementById("body");
    let button = document.getElementById("themeButton");
    let fontColor = document.getElementById("colorPicker");
    let celciuslbl = document.getElementById("celciuslbl");
    let farenheitlbl = document.getElementById("farenheitlbl");
    let rankinelbl = document.getElementById("rankinelbl");
    let reaumurlbl = document.getElementById("reaumurlbl");
    let kelvinlbl = document.getElementById("kelvinlbl");
    let celciusIn = document.getElementById("celcius");
    let farenheitIn = document.getElementById("farenheit");
    let rankineIn = document.getElementById("rankine");
    let reaumurIn = document.getElementById("reaumur");
    let kelvinIn = document.getElementById("kelvin");

    if (keys === 1) { //Case the change theme button was pressed
        if (darkTheme === false) { //If the page currently at day
            body.className = "night";
            celciusIn.className = "night";
            farenheitIn.className = "night";
            rankineIn.className = "night";
            reaumurIn.className = "night";
            kelvinIn.className = "night";
            celciuslbl.className = "night";
            farenheitlbl.className = "night";
            rankinelbl.className = "night";
            reaumurlbl.className = "night";
            kelvinlbl.className = "night";
            if (fontColor.value === "#000000" && customColor === true) { //Reset the font color if the font color makes the text unreadable (invicible)
                doReset(2);
            }
            darkTheme = true;
            button.value = "Night🌓";
        }
        else if (darkTheme === true) { //If the page currently at night
            body.className = "day";
            celciusIn.className = "day";
            farenheitIn.className = "day";
            rankineIn.className = "day";
            reaumurIn.className = "day";
            kelvinIn.className = "day";
            celciuslbl.className = "day";
            farenheitlbl.className = "day";
            rankinelbl.className = "day";
            reaumurlbl.className = "day";
            kelvinlbl.className = "day";
            if (fontColor.value === "#FFFFFF" && customColor === true) {
                doReset(2);
            }
            darkTheme = false;
            button.value = "Day🌗";
        }
    } else if (keys === 2) { //Case the custom color was selected by user trough color picker
        body.style.color = fontColor.value;
        let dayElement = document.querySelectorAll(".day");
        dayElement.forEach(function (element) {
            element.style.color = fontColor.value;
        })
        let nightElement = document.querySelectorAll(".night");
        nightElement.forEach(function (element) {
            element.style.color = fontColor.value
        })
        customColor = true;
    }
}

//Function to convert betwween scales
function doCalculation(keys) {
    //Calling getNumberFromElement function to get the value from HTML element
    celciusDeg = getNumberFromElement("celcius");
    farenheitDeg = getNumberFromElement("farenheit");
    rankineDeg = getNumberFromElement("rankine");
    reaumurDeg = getNumberFromElement("reaumur");
    kelvinDeg = getNumberFromElement("kelvin");

    //If the user input in Celcius value
    if (keys === 1) {
        let celciusTofarenheit = celciusDeg * 1.8 + 32;
        let celciusTorankine = celciusDeg * 1.8 + 491.67;
        let celciusToreaumur = celciusDeg * 0.8;
        let celciusTokelvin = celciusDeg + 273.15;

        setValueToElement(celciusTofarenheit.toFixed(2), "farenheit");
        setValueToElement(celciusTorankine.toFixed(2), "rankine");
        setValueToElement(celciusToreaumur.toFixed(2), "reaumur");
        setValueToElement(celciusTokelvin.toFixed(2), "kelvin");
    }

    //If the user input in Farenheit value
    if (keys === 2) {
        let farenheitTocelcius = farenheitDeg * 0.5555560000 - 17.777778;
        let farenheitTorankine = farenheitDeg + 459.67;
        let farenheitToreaumur = farenheitDeg * 0.4444440000 - 14.22222222;
        let farenheitTokelvin = farenheitDeg * 0.5555557778 + 255.3722222;

        setValueToElement(farenheitTocelcius.toFixed(2), "celcius");
        setValueToElement(farenheitTorankine.toFixed(2), "rankine");
        setValueToElement(farenheitToreaumur.toFixed(2), "reaumur");
        setValueToElement(farenheitTokelvin.toFixed(2), "kelvin");
    }

    //If the user input in Rankine value
    if (keys === 3) {
        let rankineTocelcius = rankineDeg * 0.5555560000 - 273.15;
        let rankineTofarenheit = rankineDeg - 459.67;
        let rankineToreaumur = rankineDeg * 0.4444440000 - 218.52;
        let rankineTokelvin = rankineDeg * 0.5555555556;

        setValueToElement(rankineTocelcius.toFixed(2), "celcius");
        setValueToElement(rankineTofarenheit.toFixed(2), "farenheit");
        setValueToElement(rankineToreaumur.toFixed(2), "reaumur");
        setValueToElement(rankineTokelvin.toFixed(2), "kelvin");
    }

    //If the user input in Reaumur value
    if (keys === 4) {
        let reaumurTocelcius = reaumurDeg * 1.25;
        let reaumurTofarenheit = reaumurDeg * 2.25 + 32;
        let reaumurTorankine = reaumurDeg * 2.25 + 491.67;
        let reaumurTokelvin = reaumurDeg * 1.25 + 273.15;

        setValueToElement(reaumurTocelcius.toFixed(2), "celcius");
        setValueToElement(reaumurTofarenheit.toFixed(2), "farenheit");
        setValueToElement(reaumurTorankine.toFixed(2), "rankine");
        setValueToElement(reaumurTokelvin.toFixed(2), "kelvin");
    }

    //If the user input in Kelvin value
    if (keys === 5) {
        let kelvinTocelcius = kelvinDeg - 273.15;
        let kelvinTofarenheit = kelvinDeg * 1.8 - 459.67;
        let kelvinTorankine = kelvinDeg * 1.8;
        let kelvinToreaumur = kelvinDeg * 0.8 - 218.52;

        setValueToElement(kelvinTocelcius.toFixed(2), "celcius");
        setValueToElement(kelvinTofarenheit.toFixed(2), "farenheit");
        setValueToElement(kelvinTorankine.toFixed(2), "rankine");
        setValueToElement(kelvinToreaumur.toFixed(2), "reaumur");
    }

}

//Reset converter after use
function doReset(keys) {
    if (keys === 1) { //Case for reseting the value
        setValueToElement(0, "celcius");
        setValueToElement(0, "farenheit");
        setValueToElement(0, "rankine");
        setValueToElement(0, "reaumur");
        setValueToElement(0, "kelvin");
        doReset(2); //Calling the theme resets too
    } else if (keys === 2) { //Case for reseting the theme
        let body = document.getElementById("body");
        let button = document.getElementById("colorPicker");

        button.value = "#000000";
        body.removeAttribute("style");
        let dayElement = document.querySelectorAll(".day");
        let nightElement = document.querySelectorAll(".night");
        dayElement.forEach(function (element) {
            element.removeAttribute("style");
        })
        nightElement.forEach(function (element) {
            element.removeAttribute("style");
        })
        customColor = false;
    }
}