# Pokédex com React + Vite

Atividade 03 da disciplina Desenvolvimento e Integração de Aplicações Web.

Pokédex interativa com os 493 Pokémon da 1ª à 4ª geração (Kanto, Johto, Hoenn e Sinnoh), com pesquisa por nome ou ID, filtro por tipo, detalhes com barras de atributos e uma área de treinadores.

## Integrantes

- Matheus Teixeira Dias de Andrade
- (nome da dupla)

## Funcionalidades

- Lista de Pokémon com ID, nome, tipos, HP, Ataque, Defesa, Ataque Especial, Defesa Especial e Velocidade
- Pesquisa por nome ou ID, atualizada enquanto o usuário digita
- Filtro por tipo usando os tipos presentes no `pokedex-data.json`
- Modal de detalhes com barras de progresso dos atributos e total (fecha no X, clicando fora ou com Esc)
- Área de treinadores separada por região (Kanto, Johto, Hoenn e Sinnoh), com líderes de ginásio (número do ginásio e cidade), Elite dos Quatro, campeão, quantidade de insígnias e Pokémon relacionados (clicando no Pokémon abre os detalhes)
- Imagem 3D nos cards e figura animada no modal de detalhes
- Botões de anterior e próximo no modal de detalhes (também funciona com as setas do teclado)
- Botão para voltar ao topo da página
- Aba de Cartas: mostra os Pokémon em formato de carta, com a mesma pesquisa e filtro por tipo; ao clicar, abre as cartas reais do Pokémon TCG daquele Pokémon, com filtro por raridade (Comum, Rara, Ilustração Rara Especial etc.) e zoom com coleção, ano e ilustrador
- Mensagem quando nenhum Pokémon é encontrado, com botão para limpar os filtros
- Cores por tipo, gradientes, animações, efeitos de hover e layout responsivo

## Como executar

Pré-requisito: Node.js instalado.

```bash
npm install
npm run dev
```

Depois, abra no navegador o endereço exibido no terminal, normalmente:

```
http://localhost:5173
```

## Dados

Os dados ficam em `src/data/pokedex-data.json` e são importados diretamente no `App.jsx`. O arquivo contém os tipos, os Pokémon com seus atributos e os treinadores com suas insígnias e Pokémon.

Os Pokémon de 1 a 151 e os 12 primeiros treinadores são os do arquivo original da atividade. Os Pokémon de 152 a 493 foram acrescentados no mesmo formato, com os dados da [PokéAPI](https://github.com/PokeAPI/pokeapi/tree/master/data/v2/csv), usando os tipos e atributos da 4ª geração (antes da criação do tipo Fairy, igual ao arquivo original).

Também foram acrescentados os líderes de ginásio, a Elite dos Quatro e os campeões de Kanto, Johto, Hoenn e Sinnoh. Cada treinador ganhou os campos:

- `region`: região do treinador
- `category`: `gym` (líder de ginásio), `elite4` (Elite dos Quatro), `champion` (campeão) ou `other` (outros, como Ash e Team Rocket)
- `position`: número do ginásio (1 a 8) ou posição na Elite dos Quatro (1 a 4)
- `city`: cidade do ginásio

Seguindo o padrão do arquivo original, as insígnias dos líderes indicam a ordem do ginásio e a Elite dos Quatro e os campeões têm 9.

O Mew está sem tipos no arquivo original, então a aplicação mostra ele como `Typeless`, que é o tipo de id 0 do próprio JSON.

## Imagens

As imagens 3D dos Pokémon (renders do Pokémon HOME) vêm do repositório de sprites da [PokéAPI](https://pokeapi.co/), usando o ID do Pokémon:

```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/{id}.png
```

No modal de detalhes é usada a figura animada (GIF do Pokémon Showdown), do mesmo repositório:

```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/{id}.gif
```

Todas as informações exibidas vêm do `pokedex-data.json`. Se a imagem não carregar, o restante da Pokédex continua funcionando normalmente.

## API de cartas (TCGdex)

A aba de Cartas usa a API pública e gratuita do [TCGdex](https://tcgdex.dev/), que não precisa de chave. A busca é feita pelo número da Pokédex usando o endpoint GraphQL:

```
POST https://api.tcgdex.net/v2/graphql
```

```graphql
{
  cards(filters: { dexId: 25 }) {
    id
    name
    image
    rarity
    illustrator
    set { id name }
  }
}
```

As imagens das cartas vêm de `{image}/low.webp` (miniatura) e `{image}/high.webp` (zoom). Cartas sem imagem e cartas do Pokémon TCG Pocket (coleções `A1`, `B1`, `P-A` etc.) são ignoradas. As cartas são ordenadas da raridade mais comum para a mais rara e cada Pokémon é buscado só uma vez por sessão.

Essa aba depende de internet. O restante da Pokédex continua funcionando apenas com o `pokedex-data.json`.

## Organização do projeto

```text
pokedex-react/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── TypeFilter.jsx
│   │   ├── TypeBadge.jsx
│   │   ├── PokemonList.jsx
│   │   ├── PokemonCard.jsx
│   │   ├── PokemonDetails.jsx
│   │   ├── StatBar.jsx
│   │   ├── TrainerList.jsx
│   │   ├── TrainerCard.jsx
│   │   ├── TcgPokemonList.jsx
│   │   ├── TcgPokemonCard.jsx
│   │   ├── TcgCardsModal.jsx
│   │   └── BackToTop.jsx
│   ├── css/
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── SearchBar.css
│   │   ├── TypeFilter.css
│   │   ├── PokemonList.css
│   │   ├── PokemonCard.css
│   │   ├── PokemonDetails.css
│   │   ├── TrainerList.css
│   │   ├── TcgCards.css
│   │   └── BackToTop.css
│   ├── data/
│   │   └── pokedex-data.json
│   ├── typeColors.js
│   ├── tcgService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

- `App.jsx`: guarda os estados (página, pesquisa, tipo selecionado e Pokémon selecionado) e faz a filtragem
- `components/`: componentes da interface, recebendo dados e funções por props
- `css/`: estilos de cada parte da aplicação
- `typeColors.js`: cores de cada tipo, URLs das imagens e formatação do ID
- `tcgService.js`: busca das cartas na API do TCGdex e nomes das raridades em português

## Tecnologias

- React
- Vite
- CSS
