// Event listener for form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form input values
    const name = document.getElementById('studentName').value.trim();
    const studentID = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Regular expressions for validations
    const namePattern = /^[A-Za-z ]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const contactPattern = /^\d{10}$/;
    const contact1=/^[789]\d{9}$/;

    // Fetch the current list of students from localStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Validate student name (letters only)
    if (!namePattern.test(name)) {
        alert("Please enter a valid name (letters only).");
        return;
    }

    // Validate email (should end with @gmail.com)
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email ID ending with @gmail.com.");
        return;
    }

    // Validate contact number (should be exactly 10 digits)
    if (!contactPattern.test(contact)) {
        alert("Contact number must be exactly 10 digits.");
        return;
    }

    // Validate contact number (Enter only valid contact number)
    if (!contact1.test(contact)) {
        alert("Invalid contact number.");
        return;
    }
    // Check for unique student ID and contact number
    if (students.some(student => student.studentID === studentID || student.contact === contact)) {
        alert("A student with this ID or contact number already exists.");
        return;
    }

    // Add new student data
    const student = { name, studentID, email, contact };
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    // Reset the form and refresh the student list
    document.getElementById('registrationForm').reset();
    displayStudents();
});

// Function to display students from localStorage
function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentTableBody = document.querySelector('#studentTable tbody');

    // Clear the existing table content
    studentTableBody.innerHTML = '';

    // Add student entries to the table
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentID}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
}

// Toggle visibility of the student list
const viewStudentsBtn = document.getElementById('viewStudentsBtn');
const studentList = document.getElementById('studentList');
studentList.style.display = 'none'; // Start with the table hidden

viewStudentsBtn.addEventListener('click', function () {
    if (studentList.style.display === 'none') {
        studentList.style.display = 'block';
        viewStudentsBtn.textContent = 'Hide Registered Students';
        displayStudents();
    } else {
        studentList.style.display = 'none';
        viewStudentsBtn.textContent = 'View Registered Students';
    }
});

// Function to delete a student entry
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

// Function to edit a student entry
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    // Pre-fill form with selected student's data
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.studentID;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    // Remove the selected student from the list
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

// Display students when the page loads
window.onload = displayStudents;