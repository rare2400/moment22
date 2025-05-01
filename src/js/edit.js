/** Moment 2 uppgift 2 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */
"use strict";

window.onload = function () {
    //hämtar url för webbtjänsten och formuläret
    const url = "http://localhost:3000/api/workexperience";

    //anropar initForm-funktionen vid sidladdning
    initForm(url);
}

//initierar formuläret
async function initForm(url) {
    //hämtar redigeringsformuläret, urlParams-objekt som läser id:t och id från url:en
    const form = document.getElementById("edit-experience");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
        //finns det ett id sparas det till dataset och funktion anropas som fyller formuläret med datan
        form.dataset.editId = id;
        await getExperience(url, id, form);
    }

    //eventlyssnare för att lägga till uppdaterad data
    form.addEventListener("submit", function (event) {
        addUpdatedData(event, url, form);
    });
}

//hämtar data från webbtjänsten
async function getExperience(url, id, form) {
    try {
        //GET-anrop till API:et med id:t
        const response = await fetch(`${url}/${id}`);
        //felmeddelande om något går fel
        if (!response.ok) throw new Error("Kunde inte hämta data");

        //omvandlar svaret till JSON-format och skickar med det till fillForm-funktionen
        const data = await response.json();
        fillForm(data.result);

    } catch (err) {
        console.error("Error:", err);
        alert("Något gick fel. Försök igen.");
    }
}

//fyll formuläret med datan
function fillForm(experience) {
    //fyller i fälten i formuläret med datan som hämtats
    form.companyName.value = experience.companyName;
    form.jobTitle.value = experience.jobTitle;
    form.location.value = experience.location;
    form.startDate.value = experience.startDate;
    form.endDate.value = experience.endDate;
    form.description.value = experience.description;
}

//skickar uppdaterad data till webbtjänsten
async function addUpdatedData(event, url, form) {
    //förhindrar att sidan laddas om
    event.preventDefault();

    //hämtar id:t från dataset
    const editId = form.dataset.editId;

    //skapar objekt som lagrar datan från formuläret
    const updatedExperience = {
        companyName: form.companyName.value,
        jobTitle: form.jobTitle.value,
        location: form.location.value,
        startDate: form.startDate.value,
        endDate: form.endDate.value,
        description: form.description.value,
    };


    try {
        //PUT-anrop till API:et med den uppdaterade erfarenheten
        const response = await fetch(`${url}/${editId}`, {
            method: "PUT",
            //meddelar och omvandlar datan till JSON-format
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedExperience),
        });

        //felmeddelande om något går fel
        if (!response.ok) throw new Error("Kunde inte uppdatera data");

        //omvandlar svaret till JSON-format och loggar resultatet
        const results = await response.json();
        console.log("Experience updated:", results);

        //meddelar användaren att uppdateringen lyckades
        alert("Erfarenhet uppdaterad!");

        // Återställ formuläret
        form.reset();

        // Omdirigera till index.html
        window.location.href = "index.html";
    } catch (err) {
        console.error("Error:", err);
        alert("Något gick fel. Försök igen.");
    }

};