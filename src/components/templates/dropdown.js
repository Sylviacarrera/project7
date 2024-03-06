import { dropdownDevicesCollapsed, dropdownIngredientsCollapsed, dropdownUstensilsCollapsed } from '../domLinker'

export const createItem = (data, parent) => {
  parent.innerHTML = ''

  data.forEach(item => {
    const article = document.createElement('article')
    article.textContent = item
    parent.appendChild(article)

    const closeIconItem = document.createElement('i')
    closeIconItem.classList.add('fa-solid', 'fa-circle-xmark', 'close-icon') // Ajouter les classes pour l'icône de croix
    article.appendChild(closeIconItem)

    article.addEventListener('click', () => {
      article.classList.toggle('yellow-background')// Ajoute ou retire la classe 'yellow-background' lorsque vous cliquez sur l'article
      closeIconItem.classList.toggle('visible') // Ajouter ou retirer la classe pour afficher ou masquer l'icône de croix
    })
  })
}

// Fonction pour créer un tag à partir d'un élément de liste cliqué
const createTag = (text, tagContainer) => {
  const tag = document.createElement('span')
  tag.className = 'tag'
  tag.innerHTML = `
    <span>${text}</span>
    <span class="close-icon">✖</span>
  `
  tag.querySelector('.close-icon').addEventListener('click', () => {
    tag.remove()
    clickedArticles.delete(text)
  })
  tagContainer.appendChild(tag)
}

// Variable pour stocker les articles déjà cliqués
const clickedArticles = new Set()

// Fonction pour gérer le clic sur les éléments de liste
const handleListClick = (listElement, tagContainer) => {
  listElement.addEventListener('click', event => {
    const clickedText = event.target.textContent.trim()
    if (clickedText && !clickedArticles.has(clickedText)) {
      clickedArticles.add(clickedText)
      createTag(clickedText, tagContainer)
      console.log('Element cliqué:', clickedText)
    }
  })
}

// Appel de la fonction pour gérer le clic sur les éléments de liste
handleListClick(dropdownIngredientsCollapsed, document.querySelector('.tags-container'))
handleListClick(dropdownDevicesCollapsed, document.querySelector('.tags-container'))
handleListClick(dropdownUstensilsCollapsed, document.querySelector('.tags-container'))
