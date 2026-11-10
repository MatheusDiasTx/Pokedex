import { getTypeColor } from '../typeColors'

function TypeBadge({ name }) {
  return (
    <span className="type-badge" style={{ backgroundColor: getTypeColor(name) }}>
      {name}
    </span>
  )
}

export default TypeBadge
