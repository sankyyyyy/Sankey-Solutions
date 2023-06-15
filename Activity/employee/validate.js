

function is_used(e_id,invalid_id){
    if (used_id.includes(parseInt(e_id.value))){
        console.log(e_id)
        invalid_id.innerHTML = "Id is used"
        highlight_red(e_id)
        return false
    }
    else{
        console.log(e_id.value)
        invalid_id.innerHTML = ""
        remove_highlight(e_id)
        return true
    }
}
   
function is_inRange(age){
    if (age.value >= 18 && age.value <= 65){
        invalid_age.innerHTML = ""
        remove_highlight(age)
        return true
    }
    else{
        invalid_age.innerHTML = "Age should be between 18 to 65"
        highlight_red(age)
        return false
    }
}


function remove_highlight(element){
    element.style.borderColor = ""
    element.style.backgroundColor = ""
}

function highlight_red(element){
    element.style.borderColor = "red"
    element.style.backgroundColor = "#ffb3b3"
}


function remove_id(e_id){
    const index = used_id.indexOf(e_id)
    console.log(index)
    if (index !== -1){
        used_id.splice(index,1)
    }
    else{
        console.log("not deleted")
    }
}

function desc_sort(){
    user.sort((a,b)=>a.e_id - b.e_id)
    Show_users()
}

function aesc_sort(){
    user.sort((a,b)=>b.e_id - a.e_id)
    Show_users()
}

let flag = 0
function sort(){
    is_empty()
    if (flag === 0){
        flag = 1
        aesc_sort()
    }
    else{
        flag = 0
        desc_sort()
    }
}

function edit_values(e_id){
    if( validate()===true){
        const id = document.getElementById("e_id")
        const name = document.getElementById('name')
        const age =  document.getElementById('age')
        const gender = document.getElementById('gender')
    
        const record = user.findIndex(obj => obj.e_id == e_id)
        user[record].e_id = id.value
        user[record].name = name.value
        user[record].age = age.value
        user[record].gender = gender.value
        used_id.push(parseInt(id.value))
        Show_users()
        cancel()
        console.log(record)
    }
}