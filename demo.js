import * as R from 'ramda'

const createElement = R.curry((tag, contenu) => {
  const el = document.createElement(tag)
  el.innerHTML = contenu
  return el
})

const createLink = createElement('a')

createLink('texte du lien')

createElement('a', 'texte du lien')