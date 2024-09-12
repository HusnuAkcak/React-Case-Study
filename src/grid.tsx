import * as React from 'react';
import { forwardRef } from 'react';
import { SubmitRecord } from "./submitRecord";

const Grid = forwardRef(function Grid(props: { source: Array<SubmitRecord>}, ref: React.MutableRefObject<any>) {
    return (
        <React.Fragment>
            <table ref={ref} id="submit-record-table">
                <tbody>{
                    props.source.map((item:SubmitRecord) => {
                        return convertSubmitRecordToTableRow(item);
                    })
                }</tbody>
            </table>
            
        </React.Fragment>
    )
})

function convertSubmitRecordToTableRow(item:SubmitRecord){
    return (
    <tr key={item.name + item.mailReceivedDate} 
        className = {item.isBackgroundColorRed ? 'red-background' : ''}>
        <td>{item.name}</td>
        <td>{item.mailReceivedDate}</td>
        <td>{item.solutionSentDate}</td>
    </tr>
    )
}

export default Grid;