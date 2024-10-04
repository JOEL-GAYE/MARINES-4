document.addEventListener("DOMContentLoaded", () => {
    // Grab all the necessary DOM elements
    const taskForm = document.getElementById("create-task-form");
    const taskInput = document.getElementById("new-task-description");
    const taskPriority = document.getElementById("priority");
    const taskList = document.getElementById("tasks");
  
    // Event listener for form submission
    taskForm.addEventListener("submit", (e) => {
      // Prevent the default form submission behavior (page reload)
      e.preventDefault();
  
      // Capture the task description and priority from the input fields
      const taskDescription = taskInput.value;
      const priority = taskPriority.value;
  
      // If the task description is empty, do not add it
      if (taskDescription === "") {
        alert("Please enter a task description.");
        return;
      }
  
      // Create a new list item (li) for the task
      const taskItem = document.createElement("li");
      taskItem.textContent = `${taskDescription}  ${priority}`;
  
      // Apply different colors based on priority
      if (priority === "high") {
        taskItem.style.color = "red";
      } else if (priority === "medium") {
        taskItem.style.color = "orange";
      } else {
        taskItem.style.color = "green";
      }
  
      // Create a delete button for each task
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      taskItem.appendChild(deleteButton);
  
      // Append the task item to the task list
      taskList.appendChild(taskItem);
  
      // Event listener for the delete button
      deleteButton.addEventListener("click", () => {
        taskItem.remove(); // Remove the task item from the DOM
      });
  
      // Clear the input fields after task is added
      taskForm.reset();
    });