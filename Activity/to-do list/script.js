// array to store objects of activity
let activities = [];

// Selecting DOM elements
const form = document.querySelector("#activity-form");
const activityField = form.querySelector('#activity');
const startField = form.querySelector('#start');
const endField = form.querySelector('#end');
const statusField = form.querySelector('#status');
const invalidActivity = form.querySelector('#invalid-activity');
const invalidDate = form.querySelector("#invalid-start");
const editButton = form.querySelector("input[value='EDIT']");
const addButton = form.querySelector('input[value="ADD"]');
const cancelButton = form.querySelector('input[value="CANCEL"]');
const resetButton = form.querySelector('input[value="RESET"]');
const serachField = document.querySelector('input[type="search"]');

// counter to keep trcak of new activities
let counter = 0;
let currentIndex = null;

// Function to retrieve data from form inputs and process it
const getData = () => {
    if (form.checkValidity() && statusField.value !== "") {
        invalidDate.innerHTML = "";
        document.querySelector(".table-container p").innerHTML = "";

        removeHighlight(activityField);
        removeHighlight(startField);
        removeHighlight(endField);
        removeHighlight(statusField);

        let activity = activityField.value.replace(/\s+/g, ' ').trim();
        let start = startField.value;
        let end = endField.value;
        let status = statusField.value;
        let obj = {
            counter,
            activity,
            start,
            end,
            status
        };
        activities.push(obj);
        counter += 1;
        displayTable(activities);
        form.reset();
    } else {
        if (activityField.value === "") {
            highlightRed(activityField);
        }
        if (startField.value === "") {
            highlightRed(startField);
        }
        if (endField.value === "") {
            highlightRed(endField);
        }
        if (statusField.value === "") {
            highlightRed(statusField);
        }
    }
};

const removeHighlight = (element) => {
    element.style.borderColor = "";
    element.style.backgroundColor = "";
};

const highlightRed = (element) => {
    element.style.borderColor = "red";
    element.style.backgroundColor = "#ffb3b3";
};

//Check Date and perform validations
const checkDate = () => {
    let todayDate = new Date();                 //Fri Jun 16 2023 07:02:45 GMT+0100 (British Summer Time)
    let startDate = new Date(startField.value); //Fri Jun 16 2023 01:00:00 GMT+0100 (British Summer Time) 
    let endDate = new Date(endField.value);     //Fri Jun 16 2023 01:00:00 GMT+0100 (British Summer Time)

    const startedOption = statusField.querySelector("option[value='started']");
    const notStartedOption = statusField.querySelector("option[value='not-started']");
    const inProgress = statusField.querySelector("option[value='in-progress']");
    const duePassed = statusField.querySelector("option[value='due-passed']");

    todayDate = getDate(todayDate); //16-06-2023 
    startDate = getDate(startDate); //16-06-2023 
    endDate = getDate(endDate);     //16-06-2023 

    if (todayDate == endDate) {
        addButton.disabled = false;
        editButton.disabled = false;
    } else if (todayDate > endDate) {
        startedOption.disabled = true;
        notStartedOption.disabled = true;
        inProgress.disabled = true;
        duePassed.disabled = false;
    } else if (todayDate < endDate) {
        startedOption.disabled = false;
        notStartedOption.disabled = false;
        inProgress.disabled = false;
        duePassed.disabled = true;
    }
    if (startDate > endDate) {
        addButton.disabled = true;
        editButton.disabled = true;
        document.querySelector("#activity-form p").style.display = "block";
        invalidDate.innerHTML = "End date must be after the start date.";
    } else {
        document.querySelector("#activity-form p").style.display = "none";
        invalidDate.innerHTML = "";
        addButton.disabled = false;
        editButton.disabled = false;
    }
};

const editFields = (index) => {
    activityField.value = activities[index].activity;
    startField.value = activities[index].start;
    endField.value = activities[index].end;
    statusField.value = "";
    addButton.style.display = "none";
    resetButton.style.display = "none";
    editButton.style.display = "inline-block";
    cancelButton.style.display = "inline-block";
    currentIndex = index;
};

const editData = () => {
    activities[currentIndex].activity = activityField.value.replace(/\s+/g, ' ').trim();
    activities[currentIndex].start = startField.value;
    activities[currentIndex].end = endField.value;
    activities[currentIndex].status = statusField.value;
    showHide();
    displayTable(activities);
    form.reset();
};

//delete data from activities
const deleteData = (index) => {
    activities.splice(index, 1);
    displayTable(activities);
};

//to get date in specified format
const getDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

//function for displaying add and reset button and remove edit and cancel button 
const showHide = () => {
    addButton.style.display = "inline-block";
    resetButton.style.display = "inline-block";
    editButton.style.display = "none";
    cancelButton.style.display = "none";
    form.reset()
};

// function to display table accourding to search input given by user 
const filtredData = () => {
    const userInput = String(serachField.value).replace(/\s+/g, ' ').trim();
    let v = activities.filter(element =>
        Object.values(element).some(value =>
            String(value).includes(userInput)
        )
    );
    displayTable(v);
};

// Check if activities array is empty and display appropriate message
if (activities.length === 0) {
    document.querySelector(".table-container p").style.display = "block";
    document.querySelector(".table-container p").innerHTML = "No Activities";
}

// Function to display table to user
const displayTable = (arr) => {
    if (arr.length === 0) {
        document.querySelector(".table-container p").style.display = "block";
        document.querySelector(".table-container p").innerHTML = "No Activities";
    }
    else{
        let tableData = `<th>Activity</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>`;
        arr.forEach((element, index) => {
            const strikeClass = (element.status === 'due-passed') ? 'strike-row' : '';
            const disabledAttribute = (element.status === 'due-passed') ? 'none' : '';
            tableData +=
                `<tr class="${strikeClass}">
                    <td>${element.activity}</td>
                    <td>${element.start}</td>
                    <td>${element.end}</td>
                    <td>${element.status}</td>
                    <td>
                        <input type="button" id="editButton" value="Update" onclick="editFields(${index})" style='display:${disabledAttribute}'>
                        <input type="button" id="deleteButton" value="Delete" onclick="deleteData(${index})" >
                    </td>
                </tr>`;
        });
        document.querySelector("table").innerHTML = tableData;
    }
};


// Event listeners
addButton.addEventListener('click', getData);
endField.addEventListener('input', checkDate);
startField.addEventListener('input', checkDate);
editButton.addEventListener('click', editData);
cancelButton.addEventListener('click', showHide);
serachField.addEventListener('input', filtredData)