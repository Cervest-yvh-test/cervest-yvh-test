import { Row } from "../types";

function calculateTotal(rows) {
    return rows.reduce((accum, row) => {
        const { regionName, ...rainByDate } = row;
        const singleRowSum = Object.values(rainByDate).reduce((accum: number, rain: number) => accum + rain, 0);
        return accum + singleRowSum;
    }, 0);
}

function calculateAverage(rows, total) {
    const numberOfValues = rows.reduce((accum, row) => {
        const { regionName, ...rainByDate } = row;
        return accum + Object.values(rainByDate).length;
    }, 0);
    return (total / numberOfValues).toFixed(2);
}

// NOTE: This assume that every date in the table is consecutive and count consecutive cells with a value greater than 10
function calculateConsecutive(rows) {
    let consecutive = 0;
    rows.forEach(row => {
        const { regionName, ...rainByDate } = row;
        const rainValues:number[] = Object.values(rainByDate);
        rainValues.forEach((value, index) => {
            if (value > 10 && rainValues[index + 1] > 10) consecutive++;
        });
    })
    return consecutive;
}


function Summary({ rows }: { rows: Row[] }) {
    const total = calculateTotal(rows);
    const average = calculateAverage(rows, total);
    const consecutive = calculateConsecutive(rows);

    return (
        <>
            <br />
            <p><u><b>Summary</b></u></p>
            <ul>
                <li>Total rainfall: <b>{total}</b></li>
                <li>Average rainfall: <b>{average} mm </b></li>
                <li>Consecutive days with rainfall greater than 10mm: <b>{consecutive}</b></li>
            </ul>
        </>

    )

}

export default Summary;