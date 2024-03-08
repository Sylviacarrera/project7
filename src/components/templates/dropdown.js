import { dropdownDevicesCollapsed, dropdownIngredientsCollapsed, dropdownUstensilsCollapsed } from '../domLinker'

export const createItem = (data, parent) => {
  // Construction d'une chaîne HTML pour tous les éléments
  const itemsHtml = data.map(item =>
    `<article>
       ${item}
       <i class="fa fa-circle-xmark close-icon"></i>
     </article>`).join('')

  // Définir innerHTML du parent pour tous les éléments à la fois
  parent.innerHTML = itemsHtml

  // Ajouter le gestionnaire d'événements click à chaque article après les avoir créés
  parent.querySelectorAll('article').forEach(article => {
    article.addEventListener('click', () => {
      article.classList.toggle('yellow-background')
      article.querySelector('.close-icon').classList.toggle('visible')
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

const handleListClick = (listElement, tagContainer) => {
  listElement.addEventListener('click', event => {
    // On s'assure que le clic vient de l'article lui-même, pas d'un enfant.
    if (event.target.matches('article')) {
      const clickedText = event.target.textContent.trim()
      if (!clickedArticles.has(clickedText)) {
        clickedArticles.add(clickedText)
        createTag(clickedText, tagContainer)
      }
    }
  })
}

// Appel de la fonction pour gérer le clic sur les éléments de liste
handleListClick(dropdownIngredientsCollapsed, document.querySelector('.tags-container'))
handleListClick(dropdownDevicesCollapsed, document.querySelector('.tags-container'))
handleListClick(dropdownUstensilsCollapsed, document.querySelector('.tags-container'))
