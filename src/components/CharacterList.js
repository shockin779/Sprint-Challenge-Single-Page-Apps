import React, { useEffect, useState } from "react";
import Axios from "axios";
import { setState } from "expect/build/jestMatchersObject";
import CharacterCard from './CharacterCard';

export default function CharacterList() {
  // TODO: Add useState to track data from useEffect
  const [characters, setCharacters] = useState(null);

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

  return (
    <section className="character-list">
      {
        characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))
      }
    </section>
  );
}
