function validate() {
    const user = {
        email:"sanket@gmail.com",
        password : "1234"
    }
    let email = document.getElementById('email').value
    let pwd = document.getElementById('password').value
    if (!email || !pwd){
        window.document.getElementById('success-msg').innerHTML = '';
        document.getElementById('error-msg').innerHTML = "Email or Password can't be empty!";
    }
    else if(email !== user.email || pwd!== user.password){
        document.getElementById('success-msg').innerHTML = '';
        document.getElementById('error-msg').innerHTML = "invalid credentials! please check your email or password and try again!";
        console.log(()=>document.getElementById('error-msg').innerHTML)
    }
    else{
        document.getElementById('error-msg').innerHTML = ''
        document.getElementById('success-msg').innerHTML = "login Succesfull!"
    }
}

