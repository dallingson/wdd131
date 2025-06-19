// Import recipes data
import recipes from './recipes.mjs';

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

// Search functionality
function searchRecipes(searchTerm) {
    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayRecipes(filteredRecipes);
}

// Event listeners
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        searchRecipes(searchTerm);
    } else {
        displayRecipes();
    }
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    if (searchTerm === '') {
        displayRecipes();
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayRecipes();
});