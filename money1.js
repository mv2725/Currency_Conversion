// Base URL with the new format for the API
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Get the dropdowns and buttons
const dropDowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const changeBtn = document.querySelector(".bt");
const msg1 = document.querySelector(".msg")
// Populate dropdowns with currency codes
for (let select of dropDowns) {
    for (currCodes in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCodes;
        newOption.value = currCodes;

        if (select.name === "from" && currCodes === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCodes === "INR") {
            newOption.selected = "selected";
        }

        select.appendChild(newOption);

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
}

// Update flag based on selected currency
const updateFlag = (element) => {
    let currCodes = element.value;
    let countryCode = countryList[currCodes];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Fetch exchange rate when the button is clicked
changeBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amval = amount.value;

    if (amval === "" || amval < 1) {
        amval = 1;
        amount.value = amval;
    }

    // Construct URL based on fromCurrency and toCurrency
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;  // Use new API format

    try {
        // Fetch data from the API
        let response = await fetch(URL);

        // Log the full response to the console
        console.log("API Response:", response);

        // Check if the response is ok (status code 200)
        if (!response.ok) {
            throw new Error("Error fetching data from the API");
        }

        // Parse the JSON data
        let data = await response.json();
        console.log("API Data:", data);  // Log the JSON response

        // Extract the rate for the toCurrency
        const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        console.log(`Exchange rate from ${fromCurr.value} to ${toCurr.value}: ${rate}`);
        let calcAmount= amount.value*rate;
        console.log("msg",msg1);
        msg1.innerText=`${amount.value} ${fromCurr.value} = ${calcAmount} ${toCurr.value}`

    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }
});
