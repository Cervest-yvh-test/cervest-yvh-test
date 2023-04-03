import { useState } from 'react';
import useSWR from 'swr'
import { Table } from '../components';
import Dropdown from '../components/Dropdown';
import { ALL } from '../constants';
import { Column, Row } from '../types';

const ENDPOINT = '/api/rainfall';
// @TODO: Adjust types
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

function filterRowsByRegion(rows, filter) {
  if (filter.toLowerCase() === ALL.toLowerCase()) return rows;
  return rows.filter(row => row.regionName.toLowerCase() === filter.toLowerCase());
}

function Index() {
  const [regionFilter, setRegionFilter] = useState<string>('');

  const { data } = useSWR(ENDPOINT, fetcher)
  if (!data) return null;
  const rows = getRows(data);
  const columns = getColumns(data);
  const regions = rows.map(r => r.regionName);

  const filteredRows = regionFilter ? filterRowsByRegion(rows, regionFilter) : rows;

  const onChangeRegion = (event) => {
    setRegionFilter(event.target.value);
  }

  return (
    <>
      <Dropdown regions={regions} onChange={onChangeRegion} />
      <Table rows={filteredRows} columns={columns} />
    </>
  );
}


export default Index;