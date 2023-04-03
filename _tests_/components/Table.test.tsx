
import '@testing-library/jest-dom';
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Table } from '../../components'
import { Row, Column } from '../../types'

const MOCK_COLUMNS: Column[] = [
    { headerName: 'Region', key: 'regionName' },
    { headerName: '2019-01-01', key: '2019-01-01' },
    { headerName: '2019-01-02', key: '2019-01-02' }
];
const MOCK_ROWS: Row[] = [{
    regionName: 'France',
    '2019-01-01': 1,
}, {
    regionName: 'Spain',
    '2019-01-02': 19,
}];

describe('Table component', () => {
    test.only('Render headers properly', () => {
        render(<Table rows={MOCK_ROWS} columns={MOCK_COLUMNS} />);
        MOCK_COLUMNS.forEach((column) => {
            expect(screen.getByText(column.headerName)).toBeInTheDocument();
        })
    });
    test('Render rows properly', () => {
        render(<Table rows={MOCK_ROWS} columns={MOCK_COLUMNS} />);
        expect(1).toBe(2);
        MOCK_ROWS.forEach((row) => {
            Object.values(row).forEach((cell) => {
                expect(screen.getByText(cell)).toBeInTheDocument();
            });
        })
    });


});