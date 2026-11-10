import TypeBadge from './TypeBadge'
import { getTypeColor, getImageUrl, formatId } from '../typeColors'
import '../css/TcgCards.css'

function TcgPokemonCard({ pokemon, onSelect }) {
  const color = getTypeColor(pokemon.types[0].name)

  return (
    <div className="tcg-pokemon-card" onClick={() => onSelect(pokemon)}>
      <div className="tcg-inner" style={{ background: `linear-gradient(160deg, ${color}, ${color}66)` }}>
        <div className="tcg-top">
          <strong>{pokemon.name}</strong>
          <span>HP {pokemon.stats.hp}</span>
        </div>
        <div className="tcg-art">
          <img
            src={getImageUrl(pokemon.id)}
            alt={pokemon.name}
            loading="lazy"
            onError={(e) => (e.target.style.visibility = 'hidden')}
          />
        </div>
        <div className="tcg-bottom">
          <span className="tcg-id">{formatId(pokemon.id)}</span>
          <div className="pokemon-types">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.id} name={t.name} />
            ))}
          </div>
        </div>
        <p className="tcg-hint">Ver cartas</p>
      </div>
    </div>
  )
}

export default TcgPokemonCard
