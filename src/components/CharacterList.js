import React, { useEffect, useState } from "react";
import Axios from "axios";
import SearchForm from './SearchForm';
import CharacterCard from './CharacterCard';

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import './CharacterList.css';

export default function CharacterList() {
  // TODO: Add useState to track data from useEffect
  const [characters, setCharacters] = useState(null);
  const [searchedCharacter, setSearchedCharacter] = useState(characters);
  const [searchPage, setSearchPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // TODO: Add API Request here - must run in `useEffect`
    //  Important: verify the 2nd `useEffect` parameter: the dependancies array!
    async function getCharacters() {
      const characters = await Axios.get(`https://rickandmortyapi.com/api/character/?page=${searchPage}`);
      setCharacters(characters.data.results);
      setTotalPages(characters.data.info.pages);
    }
    getCharacters();
  }, [searchPage]);

  if(!characters) {
    return <p>Loading characters. Please wait...<Spinner animation="border" variant="primary" /></p>
  }

  const handleNextPage = (event) => {
    if(searchPage >= 1 && searchPage < totalPages) {
      event.preventDefault();
      setSearchPage(searchPage+1);
    }
  }

  const handlePrevPage = (event) => {
    if(searchPage > 1) {
      event.preventDefault();
      setSearchPage(searchPage-1);
    }
  }

  const handleChange = (event) => {
    event.preventDefault();
    let searchedCharacter = event.target.value.toLowerCase();
    setSearchedCharacter(searchedCharacter);
  }

  if(searchedCharacter) {
    let charactersFiltered = characters.filter(character => {
      if(character.name.toLowerCase().includes(searchedCharacter)){
        return character;
      }
  }
  )

    return (
      <div className='characterListPage'>
      <SearchForm handleChange={handleChange} />
      <Button onClick={handlePrevPage}>Prev</Button>
      <Button onClick={handleNextPage}>Next</Button>
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
      <Button onClick={handlePrevPage}>Prev</Button>
      <Button onClick={handleNextPage}>Next</Button>
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
