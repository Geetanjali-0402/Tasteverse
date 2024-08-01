const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer=document.querySelector('.recipe-container');
const foodcard=document.querySelector('.foodcard');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-closeBtn');

const fetchRecipes=async(query)=>{
    recipeContainer.innerHTML="<h1>Fetching Results...</h1>";
    try{
        const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response=await data.json();

        foodcard.innerHTML="";
        recipeContainer.innerHTML="";

        response.meals.forEach(meal => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span></p>
        `
        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);

        //Adding event listener to each recipe button
        button.addEventListener('click',()=>{
            openRecipePop(meal);
        })
        recipeContainer.appendChild(recipeDiv);
    });
    }
    catch(error)
    {
        recipeContainer.innerHTML="<h1>Recipe not available</h1>";
        //document.documentElement.innerHTML=foodcard.innerHTML;
    }
    //console.log(response);
}

const fetchIngredients=(meal)=>{
    let ingredientList="";
    for(let i=1;i<=20;i++){
        const ingredient =meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientList+=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const openRecipePop=(meal)=>{
    recipeDetailsContent.innerHTML=`
        <h2 class="RecipeName">${meal.strMeal}</h2>
        <h3>Ingredients: </h3>
        <ul class="List">${fetchIngredients(meal)}</ul>
        <div class="Instructions">
            <h3>Instruction: </h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
});
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    
    /*if(!searchInput)
    {
        recipeContainer.innerHTML="Search for your recipe";
        return;
    }*/
    fetchRecipes(searchInput);
});
