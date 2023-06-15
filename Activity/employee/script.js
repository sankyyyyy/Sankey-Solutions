// array of objects used to store record 
// let user = [{e_id: '3', name: 'sanket', age: '20', gender: 'male'},
// {e_id: '4', name: 'sam', age: '45', gender: 'male'}
// ]
let user = []
// let used_id = [16,87,1,3,4]
let used_id = []

let is_asec = false

function is_empty(){
    if (user.length===0){
        document.getElementById('show').innerHTML = '<p>No Employees Found</p>';
    }
}
is_empty()

function Add(){
    let e_id = document.getElementById('e_id').value
    let name = document.getElementById('name').value
    let age = document.getElementById('age').value
    let gender = document.getElementById('gender').value
    let invalid_data = document.getElementById("invalid_data")
    const obj = {
        e_id,
        name,
        age,
        gender
        // "e_id":e_id,
        // "name":name,
        // "age":age,
        // "gender":gender                
    }
    if (validate()===true){
        user.push(obj)
        invalid_data.innerHTML = ""
        console.log(user)
        used_id.push(parseInt(e_id))
        console.log(used_id)
        Show_users()
        reset()
    }
    else{
        invalid_data.innerHTML = "Enter Correct Details"
    }
}

function validate(){
    let invalid_data = document.getElementById("invalid_data")
    if (check_id()===true && check_name()===true && check_age()===true){
        invalid_data.innerHTML = ""
        return true
    }
    else{
        invalid_data.innerHTML = "Enter Correct Details"
        return false
    }
}

function Show_users(){
    table_heading = `<th>Id<button onclick="sort()" class="tooltip" id="desc_btn"><img src="icons8-sorting-arrows-20.png"><span class="tooltiptext">Ascending/Descending</span></button></th>
    <th>Name</th>
    <th>Age</th>
    <th>Gender</th>
    <th>Action</th>`
    tab = table_heading+``;
    user.forEach(user => {
        tab += `<tr><td>${user.e_id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td>${user.gender}</td>
                <td><input type="button" id="edit_btn" value="Edit" onclick="Edit(${user.e_id})">
                <input type="button" id="delete_btn" value="Delete" onclick="Delete(${user.e_id})"></td>
                </tr>
                `;
    })
    document.getElementById('show').innerHTML = tab;
    is_empty()
}

function check_age(){
        let age = document.getElementById("age")
        let invalid_age = document.getElementById("invalid_age")
        if(age.value ===  ''){
            invalid_age.innerHTML = "Age can't be empty"
            highlight_red(age)
            return false
        }
        const age_bool = is_inRange(age)
        return age_bool
    }

function check_name(){
    var regName = /^[A-Za-z]+\s[A-Za-z]+$/
    let name = document.getElementById("name")
    let inavlid_name = document.getElementById("invalid_name")
    console.log(typeof(name.value))
    console.log(name.value)
    if(name.value ===  ''){
        invalid_name.innerHTML = "Name can't be empty"
        highlight_red(name)
        return false
    }
    if(!regName.test(name.value)){
        inavlid_name.innerHTML = "Please Enter Full Name!<br>Firstname Surname"
        highlight_red(name)
        console.log('Invalid name given.');
        return false
    }else{
        remove_highlight(name)
        inavlid_name.innerHTML = ""
        console.log('Valid name given.');
        return true
    }
}


// use the delete operator on an array element, such as delete user[0], 
// it will remove the element at the specified index but keep the array length intact.
//  The element will become undefined, and the array will have a hole at that index.
function Delete(e_id){
    console.log(e_id)
    console.log(typeof(e_id))
    const index = user.findIndex(obj =>parseInt(obj.e_id) ===parseInt(e_id))
    console.log(index)
    if (index !== -1){
        user.splice(index,1)
        Show_users()

    }
    else{
        console.log("not deleted")
    }
}

function Edit(e_id) {
    const id = document.getElementById("e_id")
    const name = document.getElementById('name')
    const age =  document.getElementById('age')
    const gender = document.getElementById('gender')
    const record = user.find(obj => obj.e_id == e_id)
    id.value = record.e_id
    name.value = record.name
    age.value = record.age
    gender.value = record.gender
    remove_id(e_id)
    console.log(e_id,typeof(e_id))
    const btn = document.getElementById("btn")
    btn.style.display = "none"
    const editable_btn = document.getElementById("editable_btn")
    editable_btn.style.display = "block"
    editable_btn.innerHTML = `
    <input type="button" id="edit1_btn"  value="Edit" onclick="edit_values(${e_id})">
    <input type="button" id="cancel_btn" value="Cancel" onclick="cancel()">
  `
  }
  
function cancel(){
    const id = document.getElementById("e_id")
    const name = document.getElementById('name')
    const age =  document.getElementById('age')
    const gender = document.getElementById('gender')
    id.value = ""
    name.value = ""
    age.value = ""
    document.getElementById("editable_btn").style.display = "none"
    const btn = document.getElementById("btn")
    btn.style.display = "block"
}


function reset(){
    const id = document.getElementById("e_id")
    const name = document.getElementById('name')
    const age =  document.getElementById('age')
    const gender = document.getElementById('gender')
    id.value = ""
    name.value = ""
    age.value = ""
}