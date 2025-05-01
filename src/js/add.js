/** Moment 2 uppgift 2 DT207G
 * Av Ramona Reinholdz
 * rare2400
 */

const form = document.getElementById("add-experience");
const url = "http://localhost:3000/api/workexperience";

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newExperience = {
        companyName: form.companyName.value,
        jobTitle: form.jobTitle.value,
        location: form.location.value,
        startDate: form.startDate.value,
        endDate: form.endDate.value,
        description: form.description.value,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newExperience),
        });

        if (!response.ok) {
            throw new Error("Error adding experience: " + response.statusText);
        }

        const results = await response.json();
        console.log("Experience added successfully:", results);
        alert("Ny erfarenthet tillags!");
        form.reset();
    } catch (error) {
        console.error("Error:", error);
        alert("Något gick fel. Försök igen.");
    }
});