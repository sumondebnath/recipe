

const recipeDetails=()=>{
    const recipe_id = new URLSearchParams(window.location.search).get("recipe_id");
    console.log(recipe_id);

    const parent = document.querySelector(".recipe-details-container");
    fetch(`https://recipe-api-rsl6.onrender.com/recipe/list/${recipe_id}/`).then((res)=>res.json()).then((data)=>{
        console.log(data);

        const datetime = new Date(data.creation_date);
        console.log(datetime.toLocaleDateString());

        const div = document.createElement("div");
        div.classList.add("recipe-details");
        div.innerHTML = `
            <h3>Title : ${data.title}</h3>
            <h4>Ingredients : ${data.ingredients}</h4>
            <img src="${data.image}" alt="recipe-image">
            <h5>${datetime.toLocaleDateString()}</h5>
            <p>Instructions : ${data.instructions}</p>
        `;
        parent.appendChild(div);
    });
};

const handleComment=()=>{
    // event.preventDefault();
    const recipe_id = new URLSearchParams(window.location.search).get("recipe_id");
    const user_id = localStorage.getItem("user_id");
    const comment = document.getElementById("comment").value;

    const parent = document.querySelector(".all-comments-section");
    parent.innerHTML = `
        <h2>All Comments:</h2>
    `;
    console.log(comment);
    fetch(`https://recipe-api-rsl6.onrender.com/comments/list/?recipe_id=${recipe_id}`).then((res)=>res.json()).then((data)=>{
        console.log(data);
        data.forEach((item)=>{
            console.log(item);
            fetch(`https://recipe-api-rsl6.onrender.com/user/${item.user}`).then((res)=>res.json()).then((user_data)=>{
                console.log(user_data);
                const div = document.createElement("div");
                div.classList.add("all-comment");
                div.innerHTML = `
                    <h4>${user_data.first_name} ${user_data.last_name}</h4>
                    <h5>${item.text}</h5>
                `;
                parent.appendChild(div);
            })
        })
        
    })
};

const handleCreateComment=(event)=>{
    event.preventDefault();
    const recipe_id = new URLSearchParams(window.location.search).get("recipe_id");
    const user_id = localStorage.getItem("user_id");
    const commentValue = document.getElementById("comment").value;
    // console.log(recipe_id, user_id, commentValue);

    const comments = {
        "text": commentValue,
        "is_liked": false,
        "user": user_id,
        "recipe": recipe_id
    };
    console.log(comments);

    fetch("https://recipe-api-rsl6.onrender.com/comments/list/", {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(comments),
    }).then((res)=>res.json()).then((data)=>{
        console.log("successfully comment.");
        console.log(data);
    })
};

window.onload=()=>{
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    if(token && user_id){
        document.getElementById("comment-block").style.display = "block";
    }
};


recipeDetails();
handleComment();