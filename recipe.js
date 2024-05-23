

const handleRecipe=()=>{
    fetch("https://recipe-api-rsl6.onrender.com/recipe/list/").then((res)=>res.json()).then((data)=>{
        console.log(data);
        const parent = document.querySelector(".main-recipe-container");
        data.forEach((items)=>{
            const datetime = new Date(items.creation_date);
            console.log(datetime.toLocaleDateString());
            const div = document.createElement("div");
            div.classList.add("recipe")
            div.innerHTML = `
                <h2>Title: ${items.title}</h2>
                <h4>Ingredients: ${items.ingredients}</h4>
                <img src="${items.image}" alt="recipe-image">
                <h5>${datetime.toLocaleDateString()}</h5>
                <p>Instructions : ${items.instructions}</p>
                <a href="details.html?recipe_id=${items.id}">show more</a>
            `;
            parent.appendChild(div);
        });
        
    }).catch((err)=>console.error(err));
};





handleRecipe();