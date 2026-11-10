import { useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import TcgPokemonList from './components/TcgPokemonList'
import TcgCardsModal from './components/TcgCardsModal'
import BackToTop from './components/BackToTop'
import './css/App.css'

const pokemonList = data.pokemon.map((p) =>
  p.types.length > 0 ? p : { ...p, types: [data.types[0]] }
)

function App() {
  const [page, setPage] = useState('pokedex')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('Todos')
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [cardsPokemon, setCardsPokemon] = useState(null)

  const types = data.types.filter((type) =>
    pokemonList.some((p) => p.types.some((t) => t.name === type.name))
  )

  const filteredPokemon = pokemonList.filter((p) => {
    const text = search.trim().toLowerCase()
    const matchSearch =
      text === '' ||
      p.name.toLowerCase().includes(text) ||
      String(p.id) === text.replace('#', '').replace(/^0+/, '')
    const matchType =
      selectedType === 'Todos' || p.types.some((t) => t.name === selectedType)
    return matchSearch && matchType
  })

  const selectedIndex = selectedPokemon
    ? pokemonList.findIndex((p) => p.id === selectedPokemon.id)
    : -1
  const previousPokemon = selectedIndex > 0 ? pokemonList[selectedIndex - 1] : null
  const nextPokemon =
    selectedIndex >= 0 && selectedIndex < pokemonList.length - 1
      ? pokemonList[selectedIndex + 1]
      : null

  function clearFilters() {
    setSearch('')
    setSelectedType('Todos')
  }

  function changePage(newPage) {
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">
      <Header page={page} onChangePage={changePage} />

      <main className="content">
        {page === 'trainers' ? (
          <TrainerList
            trainers={data.trainers}
            pokemon={pokemonList}
            onSelect={setSelectedPokemon}
          />
        ) : (
          <>
            {page === 'cards' && (
              <div className="page-intro">
                <h2>Cartas do Pokémon TCG</h2>
                <p>Escolha um Pokémon para ver as cartas dele, separadas por raridade.</p>
              </div>
            )}
            <SearchBar value={search} onChange={setSearch} />
            <TypeFilter
              types={types}
              selectedType={selectedType}
              onSelect={setSelectedType}
            />
            <p className="result-count">
              {filteredPokemon.length} Pokémon encontrado(s)
            </p>
            {page === 'pokedex' ? (
              <PokemonList
                pokemon={filteredPokemon}
                onSelect={setSelectedPokemon}
                onClear={clearFilters}
              />
            ) : (
              <TcgPokemonList
                pokemon={filteredPokemon}
                onSelect={setCardsPokemon}
                onClear={clearFilters}
              />
            )}
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          previous={previousPokemon}
          next={nextPokemon}
          onSelect={setSelectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      {cardsPokemon && (
        <TcgCardsModal
          pokemon={cardsPokemon}
          onClose={() => setCardsPokemon(null)}
        />
      )}

      <BackToTop />

      <footer className="footer">Pokédex React + Vite</footer>
    </div>
  )
}

export default App
