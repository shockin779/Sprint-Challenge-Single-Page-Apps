import React, { useEffect, useState } from "react";
import Axios from "axios";
import { setState } from "expect/build/jestMatchersObject";
import SearchForm from './SearchForm';
import CharacterCard from './CharacterCard';

import './CharacterList.css';

export default function CharacterList() {
  // TODO: Add useState to track data from useEffect
  const [characters, setCharacters] = useState(null);
  const [searchedCharacter, setSearchedCharacter] = useState(characters);

  useEffect(() => {
    // TODO: Add API Request here - must run in `useEffect`
    //  Important: verify the 2nd `useEffect` parameter: the dependancies array!
    async function getCharacters() {
      const characters = await Axios.get('https://rickandmortyapi.com/api/character/');
      console.log(characters.data.results)
      setCharacters(characters.data.results);
    }
    getCharacters();
  }, []);

  if(!characters) {
    return <p>Loading characters. Please wait...</p>
  }

  const handleChange = (event) => {
    event.preventDefault();
    let searchedCharacter = event.target.value.toLowerCase();
    setSearchedCharacter(searchedCharacter);
  }

  if(searchedCharacter) {
    console.log(characters)
    let charactersFiltered = characters.filter(character => {
      if(character.name.toLowerCase().includes(searchedCharacter)){
        return character;
      }
  }
  )
  console.log(charactersFiltered);

    return (
      <div className='characterListPage'>
      <SearchForm handleChange={handleChange} />
      <section className="character-list">
        {
          charactersFiltered.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))
        }
      </section>
      </div>
    )
  }

  return (
    <div className='characterListPage'>
      <SearchForm handleChange={handleChange} />
      <section className="character-list">
        {
          characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))
        }
      </section>
    </div>
  );
}
