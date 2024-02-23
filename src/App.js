import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);

  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    if (pokemonName === "") {
      alert("Please enter a Pokémon name");
      return;
    }
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      .then((response) => {
        console.log(response);
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat,
          type: response.data.types[0].type.name,
          pokedex: response.data.id,
        });
        setPokemonChosen(true);
      })
      .catch((error) => {
        console.error("There was an error fetching the Pokémon data:", error);
        alert(
          "Failed to find Pokémon. Please double check the name and try again"
        );
        return;
      });
  };
  return (
    <div className="App flex flex-col">
      <div className="flex bg-emerald-500 w-full text-center flex-col items-center">
        <h1 className="text-6xl py-10">PokéFilter</h1>
        <input
          className="pl-2.5 mb-2 w-52 h-20 border-2 rounded border-emerald-600 focus:border-emerald-400 outline-none"
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button
          className="w-52 h-20 mb-2 rounded bg-emerald-600 hover:bg-emerald-300 pointer-events-auto"
          onClick={searchPokemon}
        >
          Gotta Find 'Em All
        </button>
      </div>
      <div className="flex flex-col items-center text-center">
        {!pokemonChosen ? (
          <h1> Please choose a Pokémon</h1>
        ) : (
          <>
            <h1 className="text-7xl font-semibold">{pokemon.name}</h1>
            <img
              className="w-52 h-auto"
              src={pokemon.img}
              alt="Pokemon Sprite"
            />
            <h2>
              <strong>Species</strong>: {pokemon.species}
            </h2>
            <h2>
              <strong>HP</strong>: {pokemon.hp}
            </h2>
            <h2>
              <strong>Attack</strong>: {pokemon.attack}
            </h2>
            <h2>
              <strong>Defense</strong>: {pokemon.defense}
            </h2>
            <h2>
              <strong>Speed</strong>: {pokemon.speed}
            </h2>
            <h2>
              <strong>Type</strong>: {pokemon.type}
            </h2>
            <h2>
              <strong>National Pokédex Entry</strong>: {pokemon.pokedex}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
