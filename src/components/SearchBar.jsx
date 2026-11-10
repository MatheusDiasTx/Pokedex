import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Pesquisar Pokémon por nome ou ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button onClick={() => onChange('')} title="Limpar">
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
