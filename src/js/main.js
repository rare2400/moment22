/** Moment 2 uppgift 2 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */

//hämtar url för webbtjänsten
const url = "http://127.0.0.1:3000/api/workexperience";

getData();

//hämtar data från webbtjänsten
async function getData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching data: " + response.statusText);
        }
        const data = await response.json();
        displayCV(data.results);
    }
    catch (err) {
        console.error("Error:", err);
    }
}

//skriver ut data i lista
function displayCV(workexperience) {
    const experienceList = document.getElementById("cv-list");

    //tömmer lista
    experienceList.innerHTML = "";

    if(workexperience.length === 0) {
        const errMessage = document.createElement("p");
        errMessage.textContent = "Det finns inga erfarenheter att visa.";
        experienceList.appendChild(errMessage);
        return;
    }

    workexperience.forEach((experience) => {
        const experienceItem = document.createElement("div");
        experienceItem.classList.add("experience-item");

        const title = document.createElement("h3");
        title.textContent = `${experience.jobTitle} - ${experience.companyName}`;

        const location = document.createElement("p");
        location.textContent = `Plats: ${experience.location}`;

        const period = document.createElement("p");
        period.textContent = `Period: ${experience.startDate} - ${experience.endDate}`;

        const description = document.createElement("p");
        description.textContent = `Arbetsbeskrivning: ${experience.description}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Ta bort";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
                deleteExperience(experience.id);
        });

        //lägger till allt i div-elementet
        experienceItem.appendChild(title);
        experienceItem.appendChild(location);
        experienceItem.appendChild(period);
        experienceItem.appendChild(description);
        experienceItem.appendChild(deleteButton);

        //lägger till div-elementet i listan
        experienceList.appendChild(experienceItem);
    });
}


//radera en erfarenhet
async function deleteExperience(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error deleting experience: " + response.statusText);
        }
        const results = await response.json();
        console.log("Experience deleted:", results);
        alert("Erfarenhet raderad!");
        getData();
    } catch (error) {
        console.error("Error:", error);
    }
}