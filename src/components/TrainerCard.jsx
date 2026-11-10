import { getImageUrl } from '../typeColors'

function getRole(trainer) {
  if (trainer.category === 'gym') return `${trainer.position}º Ginásio · ${trainer.city}`
  if (trainer.category === 'elite4') return `Elite dos Quatro · ${trainer.position}º membro`
  if (trainer.category === 'champion') return `Campeão de ${trainer.region}`
  return 'Treinador'
}

function TrainerCard({ trainer, pokemon, onSelect }) {
  const trainerPokemon = trainer.pokemonIds.map((id) =>
    pokemon.find((p) => p.id === id)
  )

  return (
    <div className={'trainer-card ' + trainer.category}>
      <div className="trainer-header">
        <div className="trainer-avatar">
          {trainer.category === 'gym' ? trainer.position : trainer.name.charAt(0)}
        </div>
        <div>
          <h3>{trainer.name}</h3>
          <p className="trainer-role">{getRole(trainer)}</p>
          <p className="trainer-badges">🏅 {trainer.badges} insígnia(s)</p>
        </div>
      </div>
      <p className="trainer-subtitle">Pokémon ({trainerPokemon.length})</p>
      <div className="trainer-pokemon">
        {trainerPokemon.map((p, index) =>
          p ? (
            <button key={index} className="trainer-poke" onClick={() => onSelect(p)}>
              <img
                src={getImageUrl(p.id)}
                alt={p.name}
                loading="lazy"
                onError={(e) => (e.target.style.visibility = 'hidden')}
              />
              <span>{p.name}</span>
            </button>
          ) : null
        )}
      </div>
    </div>
  )
}

export default TrainerCard
