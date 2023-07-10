import * as React from 'react';
import './style.css';
import Grid from './grid';
import dataList from './data.json';

function control(today: Date, limit: number){
  return 0;
}

export default function App() {
  let sourceProp = dataList;
  const [today, setToday] = React.useState(new Date());
  const [limit, setLimit] = React.useState(4);
  const [erroneousRowNumber, setErroneousRowNumber] = React.useState(0);

  return (
    <div>
      <h1>Dgpays Case Study </h1>
      <Grid source={sourceProp} /> 

      <br/>
      <label>
        Today: &emsp;
        <input 
          id="today" 
          type="date" 
          onChange={e => setToday(new Date(e.target.value))}>
        </input>
      </label>

      <br></br>
      <br></br>

      <label>
        Limit: &emsp;
        <input 
          id="input-limit" 
          type="number" 
          onChange={e => setLimit(Number(e.target.value))}>
        </input>
      </label>

      <br></br>
      <br></br>

      <button 
        id="calculate-erroneous-row-number"
        onClick={e => setErroneousRowNumber(control(today, limit))}
        >
          Calculate Erroneous Row Number
      </button>

      <br></br>
      <br></br>

      <label>
        Number of rows that are marked with the wrong color is {erroneousRowNumber}
      </label>
    </div>
  );
}
