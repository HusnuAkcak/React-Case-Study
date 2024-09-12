import * as React from 'react';
import './style.css';
import Grid from './grid';
import dataList from './data.json';

// NOTE: 
// Control part could be located as another component and date diff fucntion could be moved to a util file 
// Ids are given to elements that is possibly will be interacted in functional tests

export default function App() {
  let sourceProp = dataList;
  const [today, setToday] = React.useState(new Date());
  const [limit, setLimit] = React.useState(4);
  const [erroneousRowNumber, setErroneousRowNumber] = React.useState(0);
  const gridRef = React.useRef<HTMLTableElement>(null);

  return (
    <div>
      <h1>Dgpays Case Study </h1>
      <Grid ref={gridRef} source={sourceProp} /> 

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
        onClick={e => setErroneousRowNumber(control(gridRef, today, limit))}
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


function control(gridRef:React.MutableRefObject<HTMLTableElement>, today: Date, limit: number){
  
  var numberOfErrors = 0;
  const rows = gridRef.current.rows;
  
  for(let row of rows as HTMLCollectionOf<HTMLTableRowElement>){
    
    const name = row.cells[0].textContent;
    const mailReceivedDate = row.cells[1].textContent;
    const submitDate = (''!=row.cells[2].textContent) ? row.cells[2].textContent : today;  
    const diff = dateDiffInDays(new Date(mailReceivedDate), new Date(submitDate));
    if((diff > limit && 'red-background' != row.className) || 
       (diff <= limit && '' != row.className)
      ){
        ++numberOfErrors;
        console.log("Wrong row color: name"+ name +" | received: "+mailReceivedDate+" | submit: "+ submitDate+" | day diff: "+diff )
      }
      else {
        console.log("Correct row color: name"+ name +" | received: "+mailReceivedDate+" | submit: "+ submitDate+" | day diff: "+diff )
      }
  }
  return numberOfErrors;
}

// dateDiffInDays function is copied from stackoverflow
function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}