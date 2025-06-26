// Import recipes data
import recipes from './recipes.mjs';

// Random number functions
function getRandomNum(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    const randomIndex = getRandomNum(list.length);
    return list[randomIndex];
}

// Template functions
function tagsTemplate(tags) {
    return tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('');
}

function ratingTemplate(rating) {
    let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars"
>`;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += '<span aria-hidden="true" class="icon-star">⭐</span>';
        } else {
            html += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
        }
    }
    
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `<article class="recipe-card">
	<img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
	<div class="recipe-content">
		<div class="recipe-tags">
			${tagsTemplate(recipe.tags)}
		</div>
		<h2>${recipe.name}</h2>
		<p class="recipe-description">${recipe.description}</p>
		<div class="recipe-meta">
			<div class="rating-container">
				${ratingTemplate(recipe.rating)}
			</div>
		</div>
	</div>
</article>`;
}

function renderRecipes(recipeList) {
    const recipeContainer = document.querySelector('.recipe-section');
    const recipeHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    recipeContainer.innerHTML = recipeHTML;
}

function filterRecipes(query) {
    return recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        (recipe.tags && recipe.tags.find(tag => tag.toLowerCase().includes(query))) ||
        (recipe.ingredients && recipe.ingredients.find(ingredient => ingredient.toLowerCase().includes(query)))
    ).sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
    event.preventDefault();
    const query = document.getElementById('recipe-search').value.toLowerCase();
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

// DOM elements
const searchInput = document.getElementById('recipe-search');
const searchForm = document.querySelector('.search-form');
const recipeSection = document.querySelector('.recipe-section');

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span aria-hidden="true" class="icon-star">⭐</span>';
        } else {
            stars += '<span aria-hidden="true" class="icon-star-empty">☆</span>';
        }
    }
    return `
        <span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">
            ${stars}
        </span>
        <span class="rating-text">${rating}/5</span>
    `;
}

// Create recipe card HTML
function createRecipeCard(recipe) {
    const tagsHTML = recipe.tags ? recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('') : '';
    
    return `
        <article class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
            <div class="recipe-content">
                <div class="recipe-tags">
                    ${tagsHTML}
                </div>
                <h2>${recipe.name}</h2>
                <p class="recipe-description">${recipe.description}</p>
                
                <div class="recipe-meta">
                    <div class="rating-container">
                        ${generateStarRating(recipe.rating)}
                    </div>
                    
                    <div class="recipe-stats">
                        <span class="prep-time">⏱️ ${recipe.prepTime}</span>
                        <span class="difficulty">👨‍🍳 ${recipe.difficulty}</span>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// Display recipes
function displayRecipes(recipesToShow = recipes) {
    recipeSection.innerHTML = recipesToShow.map(recipe => createRecipeCard(recipe)).join('');
}

// Event listeners
searchForm.addEventListener('submit', searchHandler);

// Initialize page
init();

