

const handleLogin=(event)=>{
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password);

    fetch("https://recipe-api-rsl6.onrender.com/account/login/", {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({username, password})
        }).then((res)=>res.json()).then((data)=>{
        console.log(data);
        if(data.token && data.user_id){
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            window.location.href = "profile.html";
        }
    }).catch((err)=>console.error(err));
};