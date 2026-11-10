import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({ pokemon, onSelect, onClear }) {
  if (pokemon.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">?</p>
        <h2>Nenhum Pokémon encontrado</h2>
        <p>Tente pesquisar outro nome, ID ou escolher outro tipo.</p>
        <button onClick={onClear}>Limpar filtros</button>
      </div>
    )
  }

  return (
    <div className="pokemon-list">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default PokemonList
