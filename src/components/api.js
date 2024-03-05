import { recipes } from '../data/recipes'
import { filterMainSearchBar, isLowerCaseIncluded } from './search'

export const tagsDefault = {
  ingredients: [],
  appliances: [],
  ustensils: []
}

/**
 * Get all recipes filtered by value and tags in param
 * @param {String} value - String to search
 * @param {Object} tags - tags filtered
 * @returns Array of object (recipes)
 */
export const getRecipes = (value = '', tags = tagsDefault) => {
  const result = value.length >= 3 ? filterMainSearchBar(recipes, value) : recipes
  // TODO return filterByTags(result, tags)
  return result
}

/**
 * Get Ingredients filtered
 * @param {*} main - String searched into main search bar
 * @param {*} value - String to search from input search bar ingredients
 * @param {*} tags - tags filtered
 * @returns Array of String (ingredients)
 */
export const getIngredients = (main = '', value = '', tags = tagsDefault) => {
  const recipes = getRecipes(main, tags)
  let ingredients = []
  // Get all unique ingredients
  recipes.forEach(recipe => {
    ingredients = [...new Set([...ingredients, ...recipe.ingredients.map(item => item.ingredient)])]
  })
  return value.length >= 3 ? ingredients.filter(item => isLowerCaseIncluded(item, value)) : ingredients
}

/**
 * Get Appliances filtered
 * @param {*} main - String searched into main search bar
 * @param {*} value - String to search from input search bar appliances
 * @param {*} tags - tags filtered
 * @returns Array of String (appliances)
 */
export const getDevices = (main = '', value = '', tags = tagsDefault) => {
  const recipes = getRecipes(main, tags)
  // Get all unique appliances
  const appliances = [...new Set(recipes.map(item => item.appliance))]
  return value.length >= 3 ? appliances.filter(item => isLowerCaseIncluded(item, value)) : appliances
}

/**
 * Get Ustensils filtered
 * @param {*} main - String searched into main search bar
 * @param {*} value - String to search from input search bar ustensils
 * @param {*} tags - tags filtered
 * @returns Array of String (ustensils)
 */
export const getUstensils = (main = '', value = '', tags = tagsDefault) => {
  const recipes = getRecipes(main, tags)
  let ustensils = []
  // Get all unique ustensils
  recipes.forEach(recipe => {
    ustensils = [...new Set([...ustensils, ...recipe.ustensils])]
  })
  return value.length >= 3 ? ustensils.filter(item => isLowerCaseIncluded(item, value)) : ustensils
}
