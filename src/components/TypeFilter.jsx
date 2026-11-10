import { getTypeColor } from '../typeColors'
import '../css/TypeFilter.css'

function TypeFilter({ types, selectedType, onSelect }) {
  return (
    <div className="type-filter">
      <button
        className={selectedType === 'Todos' ? 'type-button selected' : 'type-button'}
        style={{ backgroundColor: '#555' }}
        onClick={() => onSelect('Todos')}
      >
        Todos
      </button>
      {types.map((type) => (
        <button
          key={type.id}
          className={selectedType === type.name ? 'type-button selected' : 'type-button'}
          style={{ backgroundColor: getTypeColor(type.name) }}
          onClick={() => onSelect(type.name)}
        >
          {type.name}
        </button>
      ))}
    </div>
  )
}

export default TypeFilter
