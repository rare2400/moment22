/** Moment 2 uppgift 2 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */
"use strict";

//hämtar url för webbtjänsten
const url = "http://127.0.0.1:3000/api/workexperience";

//kör funktion för att hämta data
getData();

//hämtar cv-datan från webbtjänsten
async function getData() {
    try {
        //hämtar data från webbtjänsten
        const response = await fetch(url);

        //felmeddelande om något går fel
        if (!response.ok) {
            throw new Error("Error fetching data: " + response.statusText);
        }
        //omvandlar svaret till JSON-format och skickar med det till displayCV
        const data = await response.json();
        displayCV(data.results);
    } catch (err) {
        console.error("Error:", err);
    }
}

//skriver ut data i lista
function displayCV(workexperience) {
    //hämtar elementet där listan ska skrivas ut
    const experienceList = document.getElementById("cv-list");

    //tömmer lista
    experienceList.innerHTML = "";

    //visar felmeddelande för användaren om det inte finns erfarenheter
    if (workexperience.length === 0) {
        const errMessage = document.createElement("p");
        errMessage.textContent = "Det finns inga erfarenheter att visa.";
        experienceList.appendChild(errMessage);
        return;
    }

    //loopar igenom varje erfarenhet och skapar ett div-element för varje
    workexperience.forEach((experience) => {
        const experienceItem = document.createElement("div");
        experienceItem.classList.add("experience-item");

        //skapar rubrik för erfarenheten
        const title = document.createElement("h3");
        title.textContent = `${experience.jobTitle} - ${experience.companyName}`;

        //skapar p-element för erfarenhetens information (plats, period och beskrivning)
        const location = document.createElement("p");
        location.textContent = `Plats: ${experience.location}`;

        const period = document.createElement("p");
        period.textContent = `Period: ${experience.startDate} - ${experience.endDate}`;

        const description = document.createElement("p");
        description.textContent = `Arbetsbeskrivning: ${experience.description}`;

        //skapar div-container för knapparna
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        //knapp med eventlyssnare för att redigera en erfarenhet på edit.html sida
        const changeButton = document.createElement("button");
        changeButton.textContent = "Redigera";
        changeButton.classList.add("change-button");
        changeButton.addEventListener("click", () => {
            window.location.href = `edit.html?id=${experience.id}`;
        });

        //knapp med eventlyssnare för att radera en erfarenhet
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Ta bort";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            deleteExperience(experience.id);
        });

        //lägger till knapparna i div-container
        buttonContainer.appendChild(changeButton);
        buttonContainer.appendChild(deleteButton);

        //lägger till allt i div-elementet
        experienceItem.appendChild(title);
        experienceItem.appendChild(location);
        experienceItem.appendChild(period);
        experienceItem.appendChild(description);
        experienceItem.appendChild(buttonContainer);

        //lägger till div-elementet i listan
        experienceList.appendChild(experienceItem);
    });
}


//radera en erfarenhet
async function deleteExperience(id) {
    try {
        //skickar DELETE-anrop till API:et med id:t för erfarenheten som ska raderas
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE",
        });
        //felmeddelande om något går fel
        if (!response.ok) {
            throw new Error("Error deleting experience: " + response.statusText);
        }

        //skickar lyckat resultat till användaren
        alert("Erfarenhet raderad!");
        //hämtar uppdaterad data från webbtjänsten
        getData();
    } catch (error) {
        console.error("Error:", error);
    }
}