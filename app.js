
window.onload = ()=>{
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    if(token && user_id){
        console.log(token, user_id);
        document.getElementById("pro-log").style.display="block";
    }
    else{
        document.getElementById("log-reg").style.display="block";
    }
};


const handleSearch=(event)=>{
    event.preventDefault();
    const searchValue = document.getElementById("search-bar").value;
    console.log(searchValue);

    fetch(`https://recipe-api-rsl6.onrender.com/recipe/list/?search=${searchValue}`).then((res)=>res.json()).then((data)=>{
        console.log(data[0]);
        if(data.length==0){
            console.log(data.length);
            document.querySelector(".search-data-container").innerHTML="";
            document.querySelector(".no-data").style.display = "block";
        }
        else{
            console.log(data.length);
            const parent = document.querySelector(".search-data-container");
            parent.innerHTML="";
            document.querySelector(".no-data").style.display = "none";
            data.forEach((items)=>{
                console.log(items.id);
                const div = document.createElement("div");
                div.classList.add("searching-data");
                div.innerHTML = `
                    <h3>Title : ${items.title}</h3>
                    <img src="${items.image}" alt="recipe-image">
                    <a href="details.html?recipe_id=${items.id}">show more</a>
                `;
                parent.appendChild(div);
            })
        }

    })
};












const handleLogout=(event)=>{
    event.preventDefault();
    console.log("id");

    const token = localStorage.getItem("token");

    fetch("https://recipe-api-rsl6.onrender.com/account/logout/", {
        method:"POST",
        headers:{
            Authorization:`Token ${token}`,
            "Content-Type":"application/json",
        },
    }).then((res)=>res.json()).then((data)=>{
        console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href = "login.html";
    }).catch((err)=>console.error(err));
    console.log("logout Successfully.");
};