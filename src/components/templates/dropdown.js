import { dropdownDevicesCollapsed, dropdownIngredientsCollapsed, dropdownUstensilsCollapsed } from '../domLinker'

export const createItem = (data, parent) => {
  parent.innerHTML = ''

  data.forEach(item => {
    const article = document.createElement('article')
    article.textContent = item
    parent.appendChild(article)

    const closeIconItem = document.createElement('i')
    closeIconItem.classList.add('fas', 'fa-circle-xmark', 'close-icon') // Ajouter les classes pour l'icône de croix
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
  tag.classList.add('tag')

  const tagContent = document.createElement('span')
  tagContent.textContent = text

  const closeIcon = document.createElement('span')
  closeIcon.textContent = '✖' // Ajoutez ici le symbole que vous souhaitez utiliser pour la croix
  closeIcon.classList.add('close-icon')

  // Ajouter un gestionnaire d'événements pour supprimer le tag lorsque la croix est cliquée
  closeIcon.addEventListener('click', () => {
    tag.remove()
    clickedArticles.delete(text)
  })

  tag.textContent = text
  tag.appendChild(closeIcon)

  tagContainer.appendChild(tag)
}

// Variable pour stocker les articles déjà cliqués
const clickedArticles = new Set()

// Fonction pour gérer le clic sur les éléments de liste
const handleListClick = (listElement, tagContainer) => {
  listElement.addEventListener('click', event => {
    const clickedItem = event.target
    const clickedText = clickedItem.textContent

    // Vérifier si le texte est vide
    if (clickedText === '') {
      return // Ne rien faire si le texte est vide
    }
    // Vérifier si l'article a déjà été cliqué
    if (clickedArticles.has(clickedText)) {
      // Ignorer le clic si l'article a déjà été cliqué
      return
    }
    // Ajouter l'article à la liste des articles cliqués
    clickedArticles.add(clickedText)

    // Créer un tag à partir du texte de l'article cliqué
    createTag(clickedText, tagContainer)
    console.log('Element cliqué:', clickedText)
  })
}

// Appel de la fonction pour gérer le clic sur les éléments de liste
handleListClick(dropdownIngredientsCollapsed, document.querySelector('.tags-container'))
handleListClick(dropdownDevicesCollapsed, document.querySelector('.tags-container'))
handleListClick(dropdownUstensilsCollapsed, document.querySelector('.tags-container'))
