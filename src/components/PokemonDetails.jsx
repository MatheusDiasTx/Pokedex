import { useEffect } from 'react'
import TypeBadge from './TypeBadge'
import StatBar from './StatBar'
import { getTypeColor, getImageUrl, getAnimatedUrl, formatId } from '../typeColors'
import '../css/PokemonDetails.css'

function PokemonDetails({ pokemon, previous, next, onSelect, onClose }) {
  const color = getTypeColor(pokemon.types[0].name)
  const stats = pokemon.stats
  const total =
    stats.hp + stats.attack + stats.defense +
    stats.specialAttack + stats.specialDefense + stats.speed

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && previous) onSelect(previous)
      if (e.key === 'ArrowRight' && next) onSelect(next)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onSelect, previous, next])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {previous && (
          <button
            className="modal-nav left"
            onClick={() => onSelect(previous)}
            title={previous.name}
          >
            ‹
          </button>
        )}
        {next && (
          <button
            className="modal-nav right"
            onClick={() => onSelect(next)}
            title={next.name}
          >
            ›
          </button>
        )}

        <div className="modal-top" style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}>
          <span className="modal-id">{formatId(pokemon.id)}</span>
          <h2>{pokemon.name}</h2>
          <div className="pokemon-types">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.id} name={t.name} />
            ))}
          </div>
          <div className="modal-image">
            <img
              key={pokemon.id}
              src={getAnimatedUrl(pokemon.id)}
              alt={pokemon.name}
              onLoad={(e) => {
                if (e.target.src.endsWith('.gif')) {
                  e.target.style.width = e.target.naturalWidth * 2 + 'px'
                }
              }}
              onError={(e) => (e.target.src = getImageUrl(pokemon.id))}
            />
          </div>
        </div>

        <div className="modal-body">
          <h3>Atributos</h3>
          <StatBar label="HP" value={stats.hp} color={color} />
          <StatBar label="Ataque" value={stats.attack} color={color} />
          <StatBar label="Defesa" value={stats.defense} color={color} />
          <StatBar label="Ataque Especial" value={stats.specialAttack} color={color} />
          <StatBar label="Defesa Especial" value={stats.specialDefense} color={color} />
          <StatBar label="Velocidade" value={stats.speed} color={color} />
          <p className="stat-total">Total: <strong>{total}</strong></p>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
