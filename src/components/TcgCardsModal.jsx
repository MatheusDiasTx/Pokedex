import { useEffect, useState } from 'react'
import { getCardsByPokemon, getRarityName, getRarityRank, getCardImage } from '../tcgService'
import { formatId } from '../typeColors'
import '../css/TcgCards.css'

function TcgCardsModal({ pokemon, onClose }) {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [rarity, setRarity] = useState('Todas')
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setRarity('Todas')
    getCardsByPokemon(pokemon.id)
      .then((data) => setCards(data))
      .catch((err) => {
        console.error(err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [pokemon.id])

  useEffect(() => {
    function handleKey(e) {
      if (e.key !== 'Escape') return
      if (selectedCard) setSelectedCard(null)
      else onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedCard, onClose])

  const rarities = [...new Set(cards.map((c) => c.rarity))]
    .sort((a, b) => getRarityRank(a) - getRarityRank(b))

  const filteredCards = rarity === 'Todas' ? cards : cards.filter((c) => c.rarity === rarity)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="tcg-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="tcg-modal-header">
          <span>{formatId(pokemon.id)}</span>
          <h2>Cartas de {pokemon.name}</h2>
          {!loading && !error && <p>{cards.length} carta(s) encontrada(s)</p>}
        </div>

        {loading && (
          <div className="tcg-message">
            <span className="tcg-loading"></span>
            <p>Carregando cartas...</p>
          </div>
        )}

        {error && (
          <div className="tcg-message">
            <p>Não foi possível carregar as cartas. Verifique sua conexão e tente novamente.</p>
          </div>
        )}

        {!loading && !error && cards.length === 0 && (
          <div className="tcg-message">
            <p>Nenhuma carta encontrada para este Pokémon.</p>
          </div>
        )}

        {!loading && !error && cards.length > 0 && (
          <>
            <div className="rarity-filter">
              <button
                className={rarity === 'Todas' ? 'rarity-button selected' : 'rarity-button'}
                onClick={() => setRarity('Todas')}
              >
                Todas ({cards.length})
              </button>
              {rarities.map((r) => (
                <button
                  key={r}
                  className={rarity === r ? 'rarity-button selected' : 'rarity-button'}
                  onClick={() => setRarity(r)}
                >
                  {getRarityName(r)} ({cards.filter((c) => c.rarity === r).length})
                </button>
              ))}
            </div>

            <div className="tcg-grid">
              {filteredCards.map((card) => (
                <button key={card.id} className="tcg-card" onClick={() => setSelectedCard(card)}>
                  <img src={getCardImage(card, 'low')} alt={card.name} loading="lazy" />
                  <span className="tcg-card-rarity">{getRarityName(card.rarity)}</span>
                  <span className="tcg-card-set">{card.set.name}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {selectedCard && (
          <div className="tcg-zoom" onClick={() => setSelectedCard(null)}>
            <img src={getCardImage(selectedCard, 'high')} alt={selectedCard.name} />
            <div className="tcg-zoom-info">
              <h3>{selectedCard.name}</h3>
              <p><strong>Raridade:</strong> {getRarityName(selectedCard.rarity)}</p>
              <p><strong>Coleção:</strong> {selectedCard.set.name}</p>
              {selectedCard.illustrator && (
                <p><strong>Ilustrador:</strong> {selectedCard.illustrator}</p>
              )}
              <p className="tcg-zoom-hint">Clique para fechar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TcgCardsModal
