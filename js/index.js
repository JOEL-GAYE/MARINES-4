// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the button and the table body elements
    const addDiseaseButton = document.querySelector('.add');
    const diseaseTableBody = document.querySelector('.disease tbody');

    // Function to add a new disease
    function addDisease() {
        // Prompt the user for disease details
        const diseaseName = prompt("Enter the Disease Name:");
        const diseaseImage = prompt("Enter the Disease Image URL ");
        const diseaseSymptoms = prompt("Enter the Disease Symptoms ");
        const diseasePrevention = prompt("Enter the Disease Prevention Measures:");

        // Check if all values are provided
        if (diseaseName && diseaseImage && diseaseSymptoms && diseasePrevention) {
            // Create a new row element
            const newRow = document.createElement('tr');

            // Create new columns and fill them with the user input
            newRow.innerHTML = `
                <td>${diseaseName}</td>
                <td><img src="${diseaseImage}" alt="${diseaseName}" style="width: 100px; height: auto;"></td>
                <td>${diseaseSymptoms.split(',').map(symptom => symptom.trim()).join(', ')}</td>
                <td>${diseasePrevention}</td>
            `;

            // Append the new row to the table body
            diseaseTableBody.appendChild(newRow);

            alert(`${diseaseName} has been successfully added to the disease list.`);
        } else {
            alert('All fields are required to add a new disease.');
        }
    }

    // Attach the addDisease function to the button's click event
    addDiseaseButton.addEventListener('click', addDisease);
});
