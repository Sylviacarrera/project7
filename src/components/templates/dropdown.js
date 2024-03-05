import { dropdownDevicesCollapsed, dropdownIngredientsCollapsed, dropdownUstensilsCollapsed } from '../domLinker'

export const createItem = (data, parent) => {
  parent.innerHTML = ''

  data.forEach(item => {
    const article = document.createElement('article')
    article.textContent = item // Remplacez par la propriété de l'objet 'item' à afficher dans l'article
    parent.appendChild(article)
    article.addEventListener('click', () => {
      article.classList.toggle('yellow-background') // Ajoute ou retire la classe 'yellow-background' lorsque vous cliquez sur l'article
    })
  })
}

// Fonction pour créer un tag à partir d'un élément de liste cliqué
const createTag = (text, tagContainer) => {
  const tag = document.createElement('span')
  tag.textContent = text
  tag.classList.add('tag')
  tagContainer.appendChild(tag)
}

// Fonction pour gérer le clic sur les éléments de liste
const handleListClick = (listElement, tagContainer) => {
  listElement.addEventListener('click', event => {
    const clickedItem = event.target
    const clickedText = clickedItem.textContent

    // Créer un tag à partir du texte de l'article cliqué
    createTag(clickedText, tagContainer)
    console.log('Element cliqué:', clickedText)
  })
}

// Appel de la fonction pour gérer le clic sur les éléments de liste
handleListClick(dropdownIngredientsCollapsed, document.querySelector('.tags-container'))
handleListClick(dropdownDevicesCollapsed, document.querySelector('.tags-container'))
handleListClick(dropdownUstensilsCollapsed, document.querySelector('.tags-container'))
