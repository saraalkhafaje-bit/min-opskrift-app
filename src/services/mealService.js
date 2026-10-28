export async function searchMeals(query = '') {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const data = await response.json()
    return data.meals || []
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return []
  }
}

// Fetches the full recipe including instructions (strInstructions)
export async function getMealDetails(id) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await response.json()
    return data.meals ? data.meals[0] : null
  } catch (error) {
    console.error("Error fetching recipe details:", error)
    return null
  }
}