// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Handle contact button click
    document.getElementById('contactBtn').addEventListener('click', () => {
        alert('For more information, contact us at toluchicks001@gmail.com or call 0701225572');
    });

    // Add event listener for submitting questions
    document.getElementById('submitQuestionBtn').addEventListener('click', (event) => {
        event.preventDefault();
        const emailInput = document.getElementById('exampleFormControlInput1').value.trim();
        const questionTextarea = document.getElementById('exampleFormControlTextarea1').value.trim();

        if (!validateEmail(emailInput) || !questionTextarea) {
            alert("Please enter a valid email and your question.");
            return;
        }

        // Send the question to the API
        submitQuestion({
            email: emailInput,
            question: questionTextarea
        });
    });

    // Add event listener for subscription form
    document.getElementById('subscribeForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value.trim();
        if (!validateEmail(email)) {
            alert("Please enter a valid email.");
            return;
        }

        // Send subscription email to the API
        subscribe({
            email: email
        });
    });

    // Fetch diseases from API
    fetchDiseases();
});

// Function to fetch diseases
async function fetchDiseases() {
    try {
        const response = await fetch('https://github.com/JOEL-GAYE/Marine/db.json'); // Replace with your actual API URL
        const data = await response.json();

        const tableBody = document.getElementById('diseaseTableBody');
        tableBody.innerHTML = ''; // Clear existing content

        // Populate the table with fetched data
        data.forEach(disease => {
            const row = `<tr>
                <td>${disease.name}</td>
                <td><img src="${disease.image}" alt="${disease.name}" width="100"></td>
                <td>${disease.symptoms}</td>
                <td>${disease.prevention}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching diseases:', error);
    }
}

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function to submit a question
async function submitQuestion(data) {
    try {
        const response = await fetch('https://example.com/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Your question has been submitted successfully!");
            // Optionally clear the form fields
            document.getElementById('exampleFormControlInput1').value = '';
            document.getElementById('exampleFormControlTextarea1').value = '';
        } else {
            alert("There was a problem submitting your question.");
        }
    } catch (error) {
        console.error('Error submitting question:', error);
    }
}

// Function to subscribe
async function subscribe(data) {
    try {
        const response = await fetch('https://example.com/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("You have been subscribed successfully!");
            // Optionally clear the email field
            document.getElementById('email').value = '';
        } else {
            alert("There was a problem subscribing.");
        }
    } catch (error) {
        console.error('Error subscribing:', error);
    }
}
