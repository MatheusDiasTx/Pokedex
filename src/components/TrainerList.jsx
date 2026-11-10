import { useState } from 'react'
import TrainerCard from './TrainerCard'
import '../css/TrainerList.css'

const regions = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh']

const groups = [
  { category: 'gym', title: 'Líderes de Ginásio' },
  { category: 'elite4', title: 'Elite dos Quatro' },
  { category: 'champion', title: 'Campeão' },
  { category: 'other', title: 'Outros treinadores' }
]

function TrainerList({ trainers, pokemon, onSelect }) {
  const [region, setRegion] = useState('Kanto')

  const regionTrainers = trainers.filter((t) => t.region === region)

  return (
    <section>
      <h2 className="section-title">Treinadores</h2>

      <div className="region-filter">
        {regions.map((r) => (
          <button
            key={r}
            className={region === r ? 'region-button selected' : 'region-button'}
            onClick={() => setRegion(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {groups.map((group) => {
        const list = regionTrainers
          .filter((t) => t.category === group.category)
          .sort((a, b) => (a.position || 0) - (b.position || 0))

        if (list.length === 0) return null

        return (
          <div key={group.category} className="trainer-group">
            <h3 className="group-title">{group.title}</h3>
            <div className="trainer-list">
              {list.map((trainer) => (
                <TrainerCard
                  key={trainer.id}
                  trainer={trainer}
                  pokemon={pokemon}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default TrainerList
