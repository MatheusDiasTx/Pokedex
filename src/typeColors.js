const typeColors = {
  Typeless: '#9e9e9e',
  Normal: '#a8a77a',
  Fire: '#ee8130',
  Water: '#6390f0',
  Grass: '#7ac74c',
  Electric: '#f7d02c',
  Ice: '#96d9d6',
  Fighting: '#c22e28',
  Poison: '#a33ea1',
  Ground: '#e2bf65',
  Flying: '#a98ff3',
  Psychic: '#f95587',
  Bug: '#a6b91a',
  Rock: '#b6a136',
  Ghost: '#735797',
  Dark: '#705746',
  Dragon: '#6f35fc',
  Steel: '#b7b7ce'
}

export function getTypeColor(name) {
  return typeColors[name] || '#9e9e9e'
}

export function getImageUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
}

export function formatId(id) {
  return '#' + String(id).padStart(3, '0')
}

export function getAnimatedUrl(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`
}
