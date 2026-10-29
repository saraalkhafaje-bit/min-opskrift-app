<script setup>
import { ref } from 'vue'
import { searchMeals } from '../services/mealService'

const searchQuery = ref('')
const recipes = ref([])
const activeRecipeId = ref(null)
const emit = defineEmits(['add-to-favorites'])

async function handleSearch() {
  recipes.value = await searchMeals(searchQuery.value)
  activeRecipeId.value = null
}

function toggleInstructions(id) {
  activeRecipeId.value = activeRecipeId.value === id ? null : id
}

function addFavorite(meal) {
  emit('add-to-favorites', {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    instructions: meal.strInstructions || 'No instructions found.',
    note: ''
  })
}
</script>

<template>
  <div class="search-section">
    <h2>Search for recipes</h2>
    <div class="search-box">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search e.g. chicken, pasta..." 
        @keyup.enter="handleSearch"
      />
      <button @click="handleSearch">Search</button>
    </div>

    <div class="recipe-grid">
      <div v-for="meal in recipes" :key="meal.idMeal" class="recipe-card">
        <img :src="meal.strMealThumb" :alt="meal.strMeal" />
        <h3>{{ meal.strMeal }}</h3>
        
        <div class="card-buttons">
          <button class="info-btn" @click="toggleInstructions(meal.idMeal)">
            {{ activeRecipeId === meal.idMeal ? 'Hide recipe' : 'View instructions' }}
          </button>
          <button class="add-btn" @click="addFavorite(meal)">Add to favorites</button>
        </div>

        <div v-show="activeRecipeId === meal.idMeal" class="instructions-box">
          <p>{{ meal.strInstructions }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-section { margin-bottom: 30px; }
.search-box { display: flex; gap: 10px; margin-bottom: 20px; }
input { flex: 1; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; }
.search-box button { background-color: #3b82f6; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }

.recipe-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 15px; }
.recipe-card { border: 1px solid #e2e8f0; padding: 10px; border-radius: 8px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between; }
.recipe-card img { width: 100%; height: 130px; object-fit: cover; border-radius: 6px; margin-bottom: 8px; }
.recipe-card h3 { font-size: 0.85rem; margin-bottom: 8px; color: #1e293b; text-align: center; }

.card-buttons { display: flex; flex-direction: column; gap: 6px; }
button { border: none; padding: 6px 8px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; font-weight: 500; }

.info-btn { background-color: #e2e8f0; color: #334155; }
.info-btn:hover { background-color: #cbd5e1; }
.add-btn { background-color: #10b981; color: white; }
.add-btn:hover { background-color: #059669; }

.instructions-box {
  margin-top: 10px;
  background: white;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-size: 0.75rem;
  color: #334155;
  line-height: 1.3;
  max-height: 120px;
  overflow-y: auto;
  white-space: pre-line;
  text-align: left;
}
</style>