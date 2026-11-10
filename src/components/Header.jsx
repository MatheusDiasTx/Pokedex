import '../css/Header.css'

function Header({ page, onChangePage }) {
  return (
    <header className="header">
      <div className="header-title">
        <span className="pokeball"></span>
        <h1>Pokédex</h1>
      </div>
      <nav className="header-nav">
        <button
          className={page === 'pokedex' ? 'active' : ''}
          onClick={() => onChangePage('pokedex')}
        >
          Pokémon
        </button>
        <button
          className={page === 'trainers' ? 'active' : ''}
          onClick={() => onChangePage('trainers')}
        >
          Treinadores
        </button>
        <button
          className={page === 'cards' ? 'active' : ''}
          onClick={() => onChangePage('cards')}
        >
          Cartas
        </button>
      </nav>
    </header>
  )
}

export default Header
