

const createRecipe=(event)=>{
    event.preventDefault();

    const title = document.getElementById("title").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const image = document.getElementById("image").files[0];

    const user_id = localStorage.getItem("user_id");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("image", image);
    formData.append("user", user_id);

    console.log(formData);

    fetch("https://recipe-api-rsl6.onrender.com/recipe/list/", {
        method:"POST",
        body:formData,
    }).then((res)=>res.json()).then((data)=>{
        console.log(data);
        window.location.href = "recipe.html";
    });
};