import styles from './Table.module.css'
import { Row, Column } from '../types';

function Table({ rows, columns }: { rows: Row[], columns: Column[] }) {
  return (<table className={styles.table}>
    <thead >
      <tr>
        {columns.map(column => (<th key={column.key}>{column.headerName}</th>))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.regionName}>
          {columns.map((column) => <td>{row[column.key]}</td>)}
        </tr>
      ))}
    </tbody>
  </table>)
}

export default Table;