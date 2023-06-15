let activities = []

const form = document.querySelector("#activity-form")

const activityField = form.querySelector('#activity')
const startField = form.querySelector('#start')
const endField = form.querySelector('#end')
const statusField = form.querySelector('#status')

const invalidActivity = form.querySelector('#invalid-activity')
const invalidDate = form.querySelector("#invalid-start")
const editButton = form.querySelector("input[value='EDIT']")
const addButton = form.querySelector('input[value="ADD"]')
const cancelButton = form.querySelector('input[value="CANCEL"]')
const resetButton = form.querySelector('input[value="RESET"]')

let counter = 0
let currentIndex = null;

// Function to retrieve data from form inputs and process it
const getData = () => {
    if (form.checkValidity() && statusField.value !== ""){
        invalidDate.innerHTML = ""
        document.querySelector(".table-container p").innerHTML = ""

        removeHighlight(activityField)
        removeHighlight(startField)
        removeHighlight(endField)
        removeHighlight(statusField)
        
        console.log(activityField.value,startField.value,endField.value,statusField.value)
        let obj = {
            counter,
            activity:activityField.value,
            start:startField.value,
            end:endField.value,
            status:statusField.value
        }
        activities.push(obj)
        counter +=1
        console.log(activities)
        showData()
        form.reset()
    }
    else{
        console.log(activityField.value,startField.value,endField.value,statusField.value)
        if (activityField.value === ""){
            highlightRed(activityField)
        }
        if (startField.value === ""){
            highlightRed(startField)
        }
        if (endField.value === ""){
            highlightRed(endField)
        }
        if (statusField.value === ""){
            highlightRed(statusField)
        }


    }
}

const removeHighlight = (element)=>{
    element.style.borderColor = ""
    element.style.backgroundColor = ""
}

const highlightRed = (element)=>{
    element.style.borderColor = "red"
    element.style.backgroundColor = "#ffb3b3"
}


const showData = () => {
    let tableData = `<th>Activity</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Status</th>
        <th>Action</th>`

    activities.forEach((element, index) => {
        const strikeClass = element.status === 'due-passed' ? 'strike-row' : '';
        const disabledAttribute = element.status === 'due-passed' ? 'disabled' : '';
        tableData +=
            `<tr class="${strikeClass}">
                <td>${element.activity}</td>
                <td>${element.start}</td>
                <td>${element.end}</td>
                <td>${element.status}</td>
                <td>
                    <input type="button" id="editButton" value="Update" onclick="editFields(${index})" ${disabledAttribute}>
                    <input type="button" id="deleteButton" value="Delete" onclick="deleteData(${index})" ${disabledAttribute}>
                </td>
            </tr>`
    })

    document.querySelector("table").innerHTML = tableData
}


const handleDate = () =>{
    let todayDate = new Date()
    let startDate = new Date(startField.value)
    let endDate = new Date(endField.value)

    const startedOption = statusField.querySelector("option[value='started']")
    const notStartedOption = statusField.querySelector("option[value='not-started']")
    const inProgress = statusField.querySelector("option[value='in-progress']")
    const duePassed = statusField.querySelector("option[value='due-passed']")

    todayDate = getDate(todayDate)
    startDate = getDate(startDate)
    endDate = getDate(endDate)

    console.log(typeof(endDate),"\n",typeof(startDate),"\n",todayDate)
    if (todayDate == endDate){
        addButton.disabled = false
        editButton.disabled = false
    }
    else if (todayDate > endDate){
        console.log(startedOption)
        startedOption.disabled = true
        notStartedOption.disabled = true
        inProgress.disabled = true
        duePassed.disabled = false
    }
    else if (todayDate < endDate){
        startedOption.disabled = false
        notStartedOption.disabled = false
        inProgress.disabled = false
        duePassed.disabled = true
    }
    if (startDate > endDate){
        addButton.disabled = true
        editButton.disabled = true
        document.querySelector("#activity-form p").style.display = "block"
        invalidDate.innerHTML = "End date must be after the start date."
    }
    else{
        document.querySelector("#activity-form p").style.display = "none"
        invalidDate.innerHTML = ""
        addButton.disabled = false
        editButton.disabled = false
    }
}

const editFields = (index) => {
    console.log(activityField,addButton)
    activityField.value = activities[index].activity
    startField.value = activities[index].start
    endField.value = activities[index].end
    statusField.value = activities[index].status
    addButton.style.display = "none"
    editButton.style.display = "inline-block"
    cancelButton.style.display = "inline-block"
    resetButton.style.display = "none" 
    currentIndex = index
}

const editData = () =>{
    activities[currentIndex].activity = activityField.value
    activities[currentIndex].start = startField.value
    activities[currentIndex].end = endField.value
    activities[currentIndex].status = statusField.value
    addButton.style.display = "inline-block"
    editButton.style.display = "none"
    cancelButton.style.display = "none"
    resetButton.style.display = "inline-block" 
    showData()
    form.reset()
}

const deleteData = (index) => {
    activities.splice(index,1)
    showData()
}

const getDate = (date) =>{
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth() + 1).padStart(2,'0')
    const year = date.getFullYear()
    console.log(day,month,year)
    return `${day}-${month}-${year}`
}

const showHide = () =>{
    addButton.style.display = "inline-block"
    editButton.style.display = "none"
    cancelButton.style.display = "none"
    resetButton.style.display = "inline-block" 
}

addButton.addEventListener('click',getData)
endField.addEventListener('input', handleDate)
startField.addEventListener('input',handleDate)
editButton.addEventListener('click',editData)
cancelButton.addEventListener('click', showHide)

if (activities.length===0){
    document.querySelector(".table-container p").style.display = "block"
    document.querySelector(".table-container p").innerHTML = "No Activities"
}

