import useSWR from 'swr'

const ENDPOINT = '/api/rainfall';
// @TODO: Adjust types

type Row = { [headerName: string]: string };
type Column = {
  headerName: string;
  key: string;
}

const fetcher = (endpoint) => fetch(endpoint).then(res => res.json())

const parseDate = (date = '') => date.split('T')[0]; // As we don't need hours, minutes and so on
function getRainByRegionAndDate(data = []) {
  const rainByRegionAndDate = {};
  data.forEach((entry) => {
    const parsedDate = parseDate(entry.date);
    entry.data.forEach(e => {
      rainByRegionAndDate[e.regionName] = rainByRegionAndDate[e.regionName] || {};
      rainByRegionAndDate[e.regionName][parsedDate] = e.value;
    })
  });
  return rainByRegionAndDate;
}


const REGION_COLUMN: Column = {
  headerName: 'Region',
  key: 'regionName',
}

function getColumns(data = []): Column[] {
  const dates: { [key: string]: string } = {};
  for (const entry of data) {
    const parsedDate = parseDate(entry.date);
    dates[parsedDate] = parsedDate;
  }
  const DATE_COLUMNS: Column[] = Object.values(dates).map(date => {
    return { headerName: date, key: date }
  })
  return [REGION_COLUMN, ...DATE_COLUMNS];
};

function getRows(data): Row[] {
  const rainByRegionAndDate = getRainByRegionAndDate(data);
  const rows: any[] = Object.keys(rainByRegionAndDate).map(region => {
    const row = { regionName: region };
    Object.entries(rainByRegionAndDate[region]).forEach(([date, rainValue]) => {
      row[date] = rainValue;
    })
    return row;
  });
  return rows;
}

export default function Index() {
  const { data } = useSWR(ENDPOINT, fetcher)
  if (!data) return null;
  const rows = getRows(data);
  const columns = getColumns(data);

  return (
    <table>
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
    </table>
  );
}


