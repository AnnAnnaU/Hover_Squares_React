import React, { useEffect, useState } from 'react';
import { getKeys, getValues } from './api/api';
import './App.css';

function App() {
  const [modes, setModes] = useState([]);
  const [size, setSize] = useState([]);
  const [selectedMode, setSelectedMode] = useState(0);
  const [startOn, setStartOn] = useState(false);
  const [hoverSquares, setHoverSquares] = useState('');

  useEffect(() => {
    getKeys().then(setModes)
  }, [])

  useEffect(() => {
    getValues().then(setSize)
  }, [])

  const fields = size.map(fields => fields.field);

  const rows = [];
  for (let i = 0; i < fields[selectedMode - 1]; i++) {
    let rowId = `row ${i + 1}`
    let cell = []
    for (let idx = 0; idx < fields[selectedMode - 1]; idx++) {
      let cellId = `col ${idx + 1}`
      cell.push(<td key={cellId} id={cellId}></td>)
    }
    rows.push(<tr key={i} id={rowId}>{cell}</tr>)
  }

  const tableClick = ({ target }) => {
    if (target.tagName !== 'TD') {
      return;
    } else {
      if (startOn) {
        setHoverSquares(`${target.parentNode.id} ${target.id}`);
      }
    }

    highlight(target);
  };

  const highlight = (selectedTd) => {
    if (startOn) {
      selectedTd.classList.toggle('td-hover');
    }
  }

  const handleChange = ({ target }) => {
    setSelectedMode(target.value)
  }

  const buttonClick = () => {
    if (selectedMode !== 0) {
      setStartOn(true);
    }
  }

  const buttonReset = () => {
    setSelectedMode(0);
    setStartOn(false);
    setHoverSquares('');
  }

  return (
    <section>
      <select
        value={selectedMode}
        onChange={handleChange}
      >
        <option value="0">Pick mode</option>
        {modes.map((mode, index) => (
          <option key={mode} value={index + 1}>{mode}</option>
        ))}
      </select>
      <button
        onClick={() => buttonClick()}
      >
        Start
      </button>
      <button
        onClick={() => buttonReset()}
      >
        Reset
      </button>

      <div className="container">
        <table
          className="field"
          onMouseOver={(e) => tableClick(e)}
        >
          <tbody>
            {rows}
          </tbody>
        </table>

        {hoverSquares &&
          <div className="hover-squares__wrapper">
            <h1>Hover squares</h1>
            <div className="hover-squares">
              {hoverSquares}
            </div>
          </div>
        }
      </div>

    </section>
  )
}

export default App;