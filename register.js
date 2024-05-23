

const handleRegister = (event)=>{
    event.preventDefault();

    const username = document.getElementById("username").value;
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    const register = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password
    }
    console.log(register);

    if(password === confirm_password){
        if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
            fetch("https://recipe-api-rsl6.onrender.com/account/registration/", {
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(register)
            }).then((res)=>res.json()).then((data)=>{
                console.log(data);
                if(data.username && data.username.length>0){
                    document.getElementById("error").innerText = data.username[0];
                    }
                else if(data.error){
                    document.getElementById("error").innerText = data.error;
                }
                else{
                    console.log(data);
                    document.getElementById("error").innerText = data;
                }
            }).catch((err)=>console.error(err));
        }
        else{
            document.getElementById("error").innerText="Password Must be Minimum eight characters, at least one letter and one number";
        }
    }
    else{
        document.getElementById("error").innerText = "Password and Confirm Password Does Not Match.";
    }
    
};