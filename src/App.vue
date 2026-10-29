<script setup>
import { ref, watch, onMounted } from 'vue'
import RecipeSearch from './components/RecipeSearch.vue'
import FavoriteItem from './components/FavoriteItem.vue'

const favorites = ref([]) // gør data reaktiv og holder styr på favoritterne

onMounted(() => { // henter gemte favoritter fra localStorage ved komponentens montering. altså efter dom'en er klar
  const saved = localStorage.getItem('my_favorites')
  if (saved) {
    favorites.value = JSON.parse(saved) // konverterer den gemte JSON-streng tilbage til et JavaScript-array
  }
})

watch(favorites, (newVal) => { //holder øje --> localStorage
  localStorage.setItem('my_favorites', JSON.stringify(newVal)) // gemmer de opdaterede favoritter i localStorage i tekstformat(strings)
}, { deep: true })

function addFavorite(recipe) {
  if (!favorites.value.some(f => f.id === recipe.id)) {
    favorites.value.push(recipe) //push er en array-metode, der tilføjer et element til slutningen af arrayet. vue opdager metoden fordi listen er reaktiv
  }
}

function updateNote(id, newNote) {
  const item = favorites.value.find(f => f.id === id)
  if (item) {
    item.note = newNote
  }
}

function removeFavorite(id) {
  favorites.value = favorites.value.filter(f => f.id !== id)
}
</script>

<template>
  <main class="container">
    <h1>Recipe Finder</h1>

    <section class="guide" aria-labelledby="guide-title">
      <h2 id="guide-title">Quick Guide</h2>
      <ol>
        <li>Search for a recipe by clicking Search or pressing Enter.</li>
        <li>Find a recipe you like in the search results.</li>
        <li>View the instructions or add the recipe to your favorites.</li>
        <li>Under My Favorites &amp; Notes, add notes to your favorite recipes.</li>
      </ol>
    </section>

    <RecipeSearch @add-to-favorites="addFavorite" />

    <hr />
    <!-- My Favorites & Notes section og håndtering af ændringer i favoritterne -->
    <h2>My Favorites &amp; Notes</h2> 
    <div v-if="favorites.length > 0"> <!-- viser listen af favoritter, hvis der er nogen -->
      <FavoriteItem 
        v-for="item in favorites"
        :key="item.id"
        :item="item"      
        @remove="removeFavorite" 
        @update-note="updateNote"
      />
    </div>
    <p v-else class="empty">You haven't added any favorites yet.</p>
  </main>
</template>

<style scoped>
.container { 
  max-width: 800px; 
  margin: 40px auto; 
  background: white; 
  padding: 30px; 
  border-radius: 12px; 
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); 
}
h1 { font-size: 1.8rem; color: #0f172a; margin-bottom: 20px; text-align: center; }
h2 { font-size: 1.3rem; color: #334155; margin-bottom: 15px; }
.guide { margin-bottom: 30px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; color: #475569; }
.guide h2 { font-size: 1rem; margin-bottom: 8px; }
.guide ol { margin: 0; padding-left: 24px; line-height: 1.6; }
hr { margin: 30px 0; border: 0; border-top: 1px solid #e2e8f0; }
.empty { color: #64748b; font-style: italic; text-align: center; padding: 20px 0; }
</style>