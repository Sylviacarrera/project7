import { recipes } from '../data/recipes'
import { filterMainSearchBar, isLowerCaseIncluded } from './search'

const tagsDefault = {
  ingredients: [],
  appliances: [],
  ustensils: []
}

// Fonction pour filtrer les recettes en fonction des tags
const filterByTags = (recipes, tags) => {
  return recipes.filter(recipe => {
    // Vérifie si la recette contient tous les tags sélectionnés
    return tags.ingredients.every(ingredient => recipe.ingredients.includes(ingredient)) &&
           tags.appliances.every(appliance => recipe.appliance === appliance) &&
           tags.ustensils.every(ustensil => recipe.ustensils.includes(ustensil))
  })
}
console.log(filterByTags)

/**
 * Get all recipes filtered by value and tags in param
 * @param {String} value - String to search
 * @param {Object} tags - tags filtered
 * @returns Array of object (recipes)
 */
export const getRecipes = (value = '', tags = tagsDefault) => {
  const result = value.length >= 3 ? filterMainSearchBar(recipes, value) : recipes
  const filteredByTags = filterByTags(result, tags)
  return filteredByTags
}

/**
* Get Ingredients filtered
 * @param {*} main - String searched into main search bar
 * @param {*} value - String to search from input search bar ingredients
 * @param {*} tags - tags filtered
 * @returns Array of String (ingredients)
 */
export const getIngredients = (main = '', value = '', tags = tagsDefault) => {
  return Array.from(new Set(getRecipes(main, tags)
    .flatMap(recipe => recipe.ingredients.map(item => item.ingredient.toLowerCase()))
    .filter(ingredient => value.length < 3 || isLowerCaseIncluded(ingredient, value))))
}
/**
 * Get Appliances filtered
 * @param {*} main - String searched into main search bar
 * @param {*} value - String to search from input search bar appliances
 * @param {*} tags - tags filtered
 * @returns Array of String (appliances)
 */
export const getDevices = (main = '', value = '', tags = tagsDefault) => {
  return Array.from(new Set(getRecipes(main, tags)
    .map(recipe => recipe.appliance.toLowerCase())
  )).filter(appliance => value.length < 3 || appliance.includes(value.toLowerCase()))
}

/**
 * Get Ustensils filtered
 * @param {*} main - String searched into main search bar
 * @param {*} value - String to search from input search bar ustensils
 * @param {*} tags - tags filtered
 * @returns Array of String (ustensils)
 */
export const getUstensils = (main = '', value = '', tags = tagsDefault) => {
  // Une expression régulière qui trouve des parenthèses avec des chiffres à l'intérieur
  const regex = /\s*\(\d+\)/
  return Array.from(new Set(getRecipes(main, tags)
    .flatMap(recipe => recipe.ustensils.map(ustensil =>
      ustensil.toLowerCase().replace(regex, '').trim()))
  )).filter(ustensil => value.length < 3 || ustensil.includes(value.toLowerCase()))
}
