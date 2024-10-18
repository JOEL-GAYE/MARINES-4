document.addEventListener("DOMContentLoaded", () => {
  const diseaseTableBody = document.getElementById("diseaseTableBody");
  const addDiseaseForm = document.getElementById("addDiseaseForm");

  // Function to remove a row from the table and delete from the server
  function deleteDiseaseRow(button, diseaseId) {
    const row = button.parentElement.parentElement; // Get the parent row of the clicked button
    fetch(`https://my-json-server.typicode.com/JOEL-GAYE/Marine/diseases/${diseaseId}`, { method: "DELETE" }) // Delete from server
      .then((response) => {
        if (response.ok) {
          row.remove(); // Remove the row from the table
        } else {
          console.error("Error deleting disease:", response);
        }
      })
      .catch((error) => console.error("Error deleting disease:", error));
  }

  // Fetch existing diseases from the server
  function fetchDiseases() {
    fetch("https://my-json-server.typicode.com/JOEL-GAYE/Marine/diseases") // Fetch from JSON Server
      .then((response) => response.json())
      .then((data) => {
        data.forEach((disease) => {
          const diseaseRow = `
                        <tr>
                            <td>${disease.name}</td>
                            <td><img src="${disease.image}" alt="${disease.name}" width="100"></td>
                            <td>${disease.symptoms}</td>
                            <td>${disease.prevention}</td>
                            <td><button class="btn btn-danger delete-btn" data-id="${disease.id}">Delete</button></td>
                        </tr>`;
          diseaseTableBody.innerHTML += diseaseRow;
        });

        // Add event listener to each delete button after diseases are loaded
        document.querySelectorAll(".delete-btn").forEach((button) => {
          button.addEventListener("click", function () {
            const diseaseId = this.getAttribute("data-id");
            deleteDiseaseRow(button, diseaseId);
          });
        });
      })
      .catch((error) => console.error("Error fetching diseases:", error));
  }

  // Add new disease to the table and save to server
  addDiseaseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const diseaseName = document.getElementById("diseaseName").value;
    const diseaseImageUrl = document.getElementById("diseaseImageUrl").value;
    const diseaseSymptoms = document.getElementById("diseaseSymptoms").value;
    const diseasePrevention =
      document.getElementById("diseasePrevention").value;

    if (
      diseaseName &&
      diseaseImageUrl &&
      diseaseSymptoms &&
      diseasePrevention
    ) {
      const newDisease = {
        name: diseaseName,
        image: diseaseImageUrl,
        symptoms: diseaseSymptoms,
        prevention: diseasePrevention,
      };

      // Save new disease to db.json via JSON Server
      fetch("https://my-json-server.typicode.com/JOEL-GAYE/Marine/diseases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDisease),
      })
        .then((response) => response.json())
        .then((data) => {
          // Clear the form fields
          addDiseaseForm.reset();

          // Add the new disease row to the table
          const diseaseRow = `
                    <tr>
                        <td>${data.name}</td>
                        <td><img src="${data.image}" alt="${data.name}" width="100"></td>
                        <td>${data.symptoms}</td>
                        <td>${data.prevention}</td>
                        <td><button class="btn btn-danger delete-btn" data-id="${data.id}">Delete</button></td>
                    </tr>`;
          diseaseTableBody.innerHTML += diseaseRow;

          // Add event listener to the newly created delete button
          const newDeleteButton =
            diseaseTableBody.lastElementChild.querySelector(".delete-btn");
          newDeleteButton.addEventListener("click", function () {
            deleteDiseaseRow(newDeleteButton, data.id);
          });
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          alert(
            "There was a problem saving your disease. Please try again later."
          );
        });
    }
  });

  fetchDiseases(); // Fetch diseases on page load
});
// Subscription form handling
document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.getElementById("subscribeForm");
  const emailInput = document.getElementById("email");

  subscribeForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = emailInput.value.trim();

    if (email) {
      // Save email to db.json via JSON Server
      fetch("https://my-json-server.typicode.com/JOEL-GAYE/Marine/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Clear the input field
          emailInput.value = "";

          // Alert user about successful subscription
          alert("Thank you for subscribing! We will keep you updated.");
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          alert(
            "There was a problem saving your email. Please try again later."
          );
        });
    } else {
      alert("Please enter a valid email address.");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const submitQuestionBtn = document.getElementById("submitQuestionBtn");
  const emailInput = document.getElementById("emailInput");
  const questionTextarea = document.getElementById("questionTextarea");

  submitQuestionBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = emailInput.value.trim();
    const question = questionTextarea.value.trim();

    // Validate email and question
    if (email && question) {
      // Save question to db.json via JSON Server
      fetch("https://my-json-server.typicode.com/JOEL-GAYE/Marine/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, question: question }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Clear the input fields
          emailInput.value = "";
          questionTextarea.value = "";

          // Alert user about successful submission
          alert(
            "Thank you for your question! We will get back to you shortly."
          );
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          alert(
            "There was a problem saving your question. Please try again later."
          );
        });
    } else {
      alert("Please fill out both fields.");
    }
  });
});
document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();  // Prevent the form from submitting
  const query = document.getElementById("searchInput").value.toLowerCase();
  
  // Get all disease rows from the table
  const diseaseRows = document.querySelectorAll("#diseaseTableBody tr");

  // Clear any previous search results and remove previous highlights
  diseaseRows.forEach(row => {
      row.style.display = "";  // Reset visibility of all rows
      
      // Remove existing highlight spans
      row.querySelectorAll('span.highlight').forEach(span => {
          const parent = span.parentNode;
          parent.replaceChild(document.createTextNode(span.textContent), span);
          parent.normalize();  // Combine adjacent text nodes
      });
  });

  // Check if the search query matches any disease names, symptoms, or prevention
  let found = false;
  diseaseRows.forEach(row => {
      const diseaseNameCell = row.querySelector("td:nth-child(1)");
      const symptomsCell = row.querySelector("td:nth-child(3)");
      const preventionCell = row.querySelector("td:nth-child(4)");

      const diseaseName = diseaseNameCell.textContent.toLowerCase();
      const symptoms = symptomsCell.textContent.toLowerCase();
      const prevention = preventionCell.textContent.toLowerCase();

      // Highlight function to wrap the matching text
      const highlightMatch = (cell, text, query) => {
          const innerHTML = text.replace(new RegExp(query, 'gi'), match => {
              return `<span class="highlight">${match}</span>`;
          });
          cell.innerHTML = innerHTML;
      };
      
      if (diseaseName.includes(query) || symptoms.includes(query) || prevention.includes(query)) {
          found = true; // If match found, leave row visible
          if (diseaseName.includes(query)) {
              highlightMatch(diseaseNameCell, diseaseNameCell.textContent, query);
          }
          if (symptoms.includes(query)) {
              highlightMatch(symptomsCell, symptomsCell.textContent, query);
          }
          if (prevention.includes(query)) {
              highlightMatch(preventionCell, preventionCell.textContent, query);
          }
      } else {
          row.style.display = "none";  // Hide row if no match
      }
  });

  // If no match is found
  if (!found) {
      alert("No matching vaccines or diseases found");
  }

  // Clear the search form
  document.getElementById("searchInput").value = "";
});
