import React, { useState, useEffect } from 'react';
import { ArrowRight, Search } from 'react-bootstrap-icons';

import Datatable from '../datatable';
import './styles.css';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default function App() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState([
    'name',
    'birth_year',
  ]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }

  const columns = data[0] && Object.keys(data[0]);
  return (
    <div className='container mt-5'>
      <div className='mb-5 d-flex align-items-center search w-auto'>
        <input
          type='text'
          placeholder='Search'
          className="form-control me-2 w-auto" 
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Search ></Search>
      </div>
      <div>
        <Datatable data={search(data)} />
      </div>
    </div>
  );
}
