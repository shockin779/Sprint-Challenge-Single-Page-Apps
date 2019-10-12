import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

export default function SearchForm(props) {
 
  return (
    <section className="search-form">
      <Form>
        <Form.Control type='text' placeholder='Search for character' onChange={props.handleChange} />
      </Form>
    </section>
  );
}
