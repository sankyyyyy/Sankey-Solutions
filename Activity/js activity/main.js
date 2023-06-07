async function users(){
try{
    
    const response = await fetch("https://run.mocky.io/v3/9b184f9d-bf48-4467-9d8f-137ea0eba817")
    let data = await response.json()
    data = data.data
    console.log(data)
    let tablele = ``;
    data.forEach(element => {
tablele +=`<tr>
        <td>${element.name}</td>
        <td>${element.office}</td>
        <td>${element.position}</td>
        <td>${element.salary}</td>
        </tr><br>`
    });
    document.getElementById("table").innerHTML = tablele;
}
    
catch(error){
    console.log(error)
}
}


users()