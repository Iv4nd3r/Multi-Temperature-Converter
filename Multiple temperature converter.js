let darkTheme = false; //let variable to track day / night darkTheme state
let customColor = false; //let variable to track custom font color usage
let component = ["body", "themeButton", "resetButton", "colorPicker"]; //List of component that used inside the body

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
    let labelID = item.id + "lbl"; //Creating text for labelID
    labelElement.innerText = item.prompt + " : "; //Set the text to show on the label
    labelElement.className = "day"; //Setting the same element ID for the label and the input
    labelElement.id = labelID; //Set the labelID
    labelElement.setAttribute("for", item.id); //Set the attribute for linking the label with the input
    component[component.length] = labelID; //Add the id to the component list
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
    component[component.length] = item.id;
    inputPar.appendChild(inputElement); //Add the element to the paragraph

    let symElement = document.createElement("label"); //Create another label to add the symbol of the scales
    let symID = item.id + "sym"; //Create symbol to add at the end of the input box
    let sym = item.prompt; //Add the scale name
    symElement.className = "day";
    symElement.id = symID;
    symElement.setAttribute("for", item.id);
    switch (sym) {
        case "Reaumur": //Case the scale was Reaumur which uses Re as the scale symbols
            sym = " °Re"
            symElement.innerText = sym;
            break;

        default:
            symElement.innerText = " °" + sym[0];
            break;
    }
    component[component.length] = symID;
    inputPar.appendChild(symElement);
    return inputPar; //Return the whole paragraph
}

//Function to get a number from the input element
function getNumberFromElement(id) {
    let elementIn = getElement(id) //Link input from HTML to JS
    let element = elementIn.value; //Get input from user
    let value = Number(element); //Convert input from text to number
    return value;
}

//Function to change the page darkTheme
function changeTheme(keys) {
    let body = getElement(0);
    let button = getElement(1);
    let fontColor = getElement(3);

    if (keys === 1) { //Case the change theme button was pressed
        if (darkTheme === false) { //If the page currently at day
            for (item of component) {
                setElement(item, "night", 1);
            }
            if (fontColor.value === "#000000" && customColor === true) { //Reset the font color if the font color makes the text unreadable (invicible)
                doReset(2);
            }
            darkTheme = true;
            button.value = "Night🌓";
        }
        else if (darkTheme === true) { //If the page currently at night
            for (item of component) {
                setElement(item, "day", 1);
            }
            if (fontColor.value === "#FFFFFF" && customColor === true) {
                doReset(2);
            }
            darkTheme = false;
            button.value = "Day🌗";
        }
    } else if (keys === 2) { //Case the custom color was selected by user trough color picker
        body.style.color = fontColor.value;
        let dayElement = document.querySelectorAll(".day");
        dayElement.forEach((element) => element.style.color = fontColor.value);
        let nightElement = document.querySelectorAll(".night");
        nightElement.forEach((element) => element.style.color = fontColor.value);
        customColor = true;
    }
}

//Function to convert betwween scales
function doCalculation(keys) {
    //Calling getNumberFromElement function to get the value from HTML element
    celciusDeg = getNumberFromElement(5);
    farenheitDeg = getNumberFromElement(8);
    rankineDeg = getNumberFromElement(11);
    reaumurDeg = getNumberFromElement(14);
    kelvinDeg = getNumberFromElement(17);

    //If the user input in Celcius value
    if (keys === 1) {
        let celciusTofarenheit = celciusDeg * 1.8 + 32;
        let celciusTorankine = celciusDeg * 1.8 + 491.67;
        let celciusToreaumur = celciusDeg * 0.8;
        let celciusTokelvin = celciusDeg + 273.15;

        setElement(8, celciusTofarenheit.toFixed(2), 2);
        setElement(11, celciusTorankine.toFixed(2), 2);
        setElement(14, celciusToreaumur.toFixed(2), 2);
        setElement(17, celciusTokelvin.toFixed(2), 2);
    }

    //If the user input in Farenheit value
    if (keys === 2) {
        let farenheitTocelcius = farenheitDeg * 0.5555560000 - 17.777778;
        let farenheitTorankine = farenheitDeg + 459.67;
        let farenheitToreaumur = farenheitDeg * 0.4444440000 - 14.22222222;
        let farenheitTokelvin = farenheitDeg * 0.5555557778 + 255.3722222;

        setElement(5, farenheitTocelcius.toFixed(2), 2);
        setElement(11, farenheitTorankine.toFixed(2), 2);
        setElement(14, farenheitToreaumur.toFixed(2), 2);
        setElement(17, farenheitTokelvin.toFixed(2), 2);
    }

    //If the user input in Rankine value
    if (keys === 3) {
        let rankineTocelcius = rankineDeg * 0.5555560000 - 273.15;
        let rankineTofarenheit = rankineDeg - 459.67;
        let rankineToreaumur = rankineDeg * 0.4444440000 - 218.52;
        let rankineTokelvin = rankineDeg * 0.5555555556;

        setElement(5, rankineTocelcius.toFixed(2), 2);
        setElement(8, rankineTofarenheit.toFixed(2), 2);
        setElement(14, rankineToreaumur.toFixed(2), 2);
        setElement(17, rankineTokelvin.toFixed(2), 2);
    }

    //If the user input in Reaumur value
    if (keys === 4) {
        let reaumurTocelcius = reaumurDeg * 1.25;
        let reaumurTofarenheit = reaumurDeg * 2.25 + 32;
        let reaumurTorankine = reaumurDeg * 2.25 + 491.67;
        let reaumurTokelvin = reaumurDeg * 1.25 + 273.15;

        setElement(5, reaumurTocelcius.toFixed(2), 2);
        setElement(8, reaumurTofarenheit.toFixed(2), 2);
        setElement(11, reaumurTorankine.toFixed(2), 2);
        setElement(17, reaumurTokelvin.toFixed(2), 2);
    }

    //If the user input in Kelvin value
    if (keys === 5) {
        let kelvinTocelcius = kelvinDeg - 273.15;
        let kelvinTofarenheit = kelvinDeg * 1.8 - 459.67;
        let kelvinTorankine = kelvinDeg * 1.8;
        let kelvinToreaumur = kelvinDeg * 0.8 - 218.52;

        setElement(5, kelvinTocelcius.toFixed(2), 2);
        setElement(8, kelvinTofarenheit.toFixed(2), 2);
        setElement(11, kelvinTorankine.toFixed(2), 2);
        setElement(14, kelvinToreaumur.toFixed(2), 2);
    }

}

//Reset converter after use
function doReset(keys) {
    if (keys === 1) { //Case for reseting the value
        setElement(5, 0, 2);
        setElement(8, 0, 2);
        setElement(11, 0, 2);
        setElement(14, 0, 2);
        setElement(17, 0, 2);
        doReset(2); //Calling the theme resets too
    } else if (keys === 2) { //Case for reseting the theme
        let body = getElement(0);
        let colorPicker = getElement(3);

        colorPicker.value = "#000000";
        body.removeAttribute("style");
        let dayElement = document.querySelectorAll(".day");
        let nightElement = document.querySelectorAll(".night");
        dayElement.forEach((element) => element.removeAttribute("style"));
        nightElement.forEach((element) => element.removeAttribute("style"));
        customColor = false;
    }
}

//Function to set element of the argument component
function setElement(part, input, keys) {
    let partElement = getElement(part); //Calling the getElement function

    switch (keys) {
        case 1:
            partElement.className = input; //Set the style specified for the theme
            break;
        case 2:
            partElement.value = input; //Set the value of the calculation to the input box
            break;
    }

}

//Function to get a argument element
function getElement(part) {
    let numChk = Number(part); //Check if the input was a number or not
    if (isNaN(numChk) == false) {
        part = component[numChk]; //If it was a number get the name from the component list that was referenced by the number
    }
    return document.getElementById(part); //Return reference
}