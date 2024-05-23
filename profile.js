

const profileHandle=()=>{
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    console.log(token, user_id);

    const parent = document.querySelector(".user-profile");

    fetch(`https://recipe-api-rsl6.onrender.com/user/${user_id}/`).then((res)=>res.json()).then((data)=>{
        // console.log(data);
        parent.innerHTML = `
            <h4>Username : ${data.username}</h4>
            <h2>Name : ${data.first_name} ${data.last_name}</h2>
            <h3>Email : ${data.email}</h3>
            <p id="bio">Bio: </p>
            <a href="">Update Profile</a>
        `;
    })

    fetch(`https://recipe-api-rsl6.onrender.com/account/list/?user_id=${user_id}`).then((res)=>res.json()).then((data)=>{
        console.log(data[0].bio);
        if(data[0].bio){
            document.getElementById("bio").innerText=`Bio : ${data[0].bio?data[0].bio:""}`;
        }
        // else{
        //     document.getElementById("bio").innerText="Bio : ";
        // }
        
        // bio.innerText = 
        
    });
};

const userhandel=()=>{
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    fetch(`https://recipe-api-rsl6.onrender.com/recipe/list/?user_id=${user_id}`).then((res)=>res.json()).then((data)=>{
        // console.log(data);
        const parent = document.querySelector(".user-recipe");
        data.forEach((recipe)=>{
            // console.log(recipe);
            const div = document.createElement("div");
            div.classList.add("profile-recipes")
            div.innerHTML = `
                <h3>Title : ${recipe.title}</h3>
                <img src="${recipe.image}" alt="recipe-image">
                <h4>Ingredients : ${recipe.ingredients}</h4>
                <p>Instructions : ${recipe.instructions}</p>
                <ul>
                    <li><a href="recipeEdit.html?recipe-edit=${recipe.id}">Edit</a></li>
                    <li onclick="handleDeleteRecipe(${recipe.id})"><a href="">Delete</a></li>
                </ul>
                
            `;
            parent.appendChild(div);
        });
    }).catch(err=>console.error(err))
};

const handleDeleteRecipe=(recipe_id)=>{
    console.log(recipe_id);
    fetch(`https://recipe-api-rsl6.onrender.com/recipe/list/${recipe_id}/`, {
        method:"DELETE",
    }).then((res)=>{
        console.log(res, "post deleted.")
        window.location.href = "recipe.html";
    }).catch((err)=>console.error("error", err));
    
};


userhandel();
profileHandle();