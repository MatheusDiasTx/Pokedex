const API_URL = 'https://api.tcgdex.net/v2/graphql'

const cache = {}

const pocketRarities = [
  'One Diamond',
  'Two Diamond',
  'Three Diamond',
  'Four Diamond',
  'One Star',
  'Two Star',
  'Three Star',
  'Crown',
  'One Shiny',
  'Two Shiny'
]

function isPocketCard(card) {
  return pocketRarities.includes(card.rarity) || /^(A|B)\d+[a-z]?$|^P-[A-Z]$/.test(card.set.id)
}

const rarityOrder = [
  'Common',
  'Uncommon',
  'Rare',
  'Rare Holo',
  'Holo Rare',
  'Rare Holo LV.X',
  'Rare PRIME',
  'LEGEND',
  'Rare Shining',
  'Prism Star',
  'Amazing Rare',
  'Radiant Rare',
  'Double rare',
  'Holo Rare V',
  'Holo Rare VMAX',
  'Holo Rare VSTAR',
  'Ultra Rare',
  'Triple Rare',
  'ACE SPEC Rare',
  'Illustration rare',
  'Character Rare',
  'Full Art Trainer',
  'Special illustration rare',
  'Character Super Rare',
  'Shiny rare',
  'Shiny rare V',
  'Shiny rare VMAX',
  'Shiny Ultra Rare',
  'Hyper rare',
  'Secret Rare',
  'Mega Hyper Rare',
  'Black White Rare',
  'Classic Collection',
  'Promo',
  'None'
]

const rarityNames = {
  'Common': 'Comum',
  'Uncommon': 'Incomum',
  'Rare': 'Rara',
  'Rare Holo': 'Rara Holo',
  'Holo Rare': 'Rara Holo',
  'Rare Shining': 'Rara Brilhante',
  'Amazing Rare': 'Rara Incrível',
  'Radiant Rare': 'Rara Radiante',
  'Double rare': 'Rara Dupla',
  'Ultra Rare': 'Ultra Rara',
  'Triple Rare': 'Rara Tripla',
  'Illustration rare': 'Ilustração Rara',
  'Special illustration rare': 'Ilustração Rara Especial',
  'Shiny rare': 'Rara Brilhante',
  'Shiny Ultra Rare': 'Ultra Rara Brilhante',
  'Hyper rare': 'Hiper Rara',
  'Secret Rare': 'Rara Secreta',
  'Promo': 'Promocional',
  'None': 'Sem raridade'
}

export function getRarityName(rarity) {
  return rarityNames[rarity] || rarity
}

export function getRarityRank(rarity) {
  const index = rarityOrder.indexOf(rarity)
  return index === -1 ? rarityOrder.length : index
}

export function getCardImage(card, quality) {
  return `${card.image}/${quality}.webp`
}

export async function getCardsByPokemon(id) {
  if (cache[id]) return cache[id]

  const query = `{
    cards(filters: { dexId: ${id} }) {
      id
      name
      image
      rarity
      illustrator
      set { id name }
    }
  }`

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query })
  })

  if (!response.ok) throw new Error('Erro ao buscar cartas')

  const json = await response.json()

  if (!json.data) throw new Error('Resposta inválida da API')

  const cards = (json.data.cards || [])
    .filter((card) => card && card.image && card.set && !isPocketCard(card))
    .sort((a, b) => getRarityRank(a.rarity) - getRarityRank(b.rarity))

  cache[id] = cards
  return cards
}
