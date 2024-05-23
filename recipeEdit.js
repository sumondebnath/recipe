

const EditRecipe=(event)=>{
    event.preventDefault();
    const recipe_id = new URLSearchParams(window.location.search).get("recipe-edit");
    
    const user_id = localStorage.getItem("user_id");
    console.log(recipe_id, user_id);

    const title = document.getElementById("title").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const image = document.getElementById("image").files[0]

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions)
    formData.append("image", image);
    formData.append("user", user_id);

    fetch(`https://recipe-api-rsl6.onrender.com/recipe/list/${recipe_id}/`, {
        method:"PUT", 
        body:formData,
    }).then((res)=>res.json()).then((data)=>{
        console.log(data);
        window.location.href = "profile.html";
    });
};

const formInstance=(recipe)=>{
    document.getElementById("title").value = recipe.title;
    document.getElementById("ingredients").value = recipe.ingredients;
    document.getElementById("instructions").value = recipe.instructions;
};

const getrecipeValue = (recipe_id) => {
    fetch(`https://recipe-api-rsl6.onrender.com/recipe/list/${recipe_id}/`).then((res)=>res.json()).then((data)=>{
        formInstance(data);
    }).catch((err)=>console.error("get blog data", err));
};

window.onload=()=>{
    const recipe_id = new URLSearchParams(window.location.search).get("recipe-edit");
    getrecipeValue(recipe_id);
};