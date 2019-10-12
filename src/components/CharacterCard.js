import React from "react";
import Card from 'react-bootstrap/Card';

import './CharacterCard.css';

export default function CharacterCard(props) {
  let character = props.character;
  return (
    <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src={character.image} />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
