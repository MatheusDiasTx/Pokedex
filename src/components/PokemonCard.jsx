import TypeBadge from './TypeBadge'
import { getTypeColor, getImageUrl, formatId } from '../typeColors'
import '../css/PokemonCard.css'

function PokemonCard({ pokemon, onSelect }) {
  const color = getTypeColor(pokemon.types[0].name)
  const stats = pokemon.stats

  return (
    <div
      className="pokemon-card"
      style={{ background: `linear-gradient(160deg, ${color}55, var(--card-bg) 60%)` }}
      onClick={() => onSelect(pokemon)}
    >
      <span className="pokemon-id">{formatId(pokemon.id)}</span>
      <img
        src={getImageUrl(pokemon.id)}
        alt={pokemon.name}
        loading="lazy"
        onError={(e) => (e.target.style.visibility = 'hidden')}
      />
      <h3>{pokemon.name}</h3>
      <div className="pokemon-types">
        {pokemon.types.map((t) => (
          <TypeBadge key={t.id} name={t.name} />
        ))}
      </div>
      <ul className="pokemon-stats">
        <li><span>HP</span><strong>{stats.hp}</strong></li>
        <li><span>Ataque</span><strong>{stats.attack}</strong></li>
        <li><span>Defesa</span><strong>{stats.defense}</strong></li>
        <li><span>Atq. Esp.</span><strong>{stats.specialAttack}</strong></li>
        <li><span>Def. Esp.</span><strong>{stats.specialDefense}</strong></li>
        <li><span>Velocidade</span><strong>{stats.speed}</strong></li>
      </ul>
    </div>
  )
}

export default PokemonCard
