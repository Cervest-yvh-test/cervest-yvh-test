import '@testing-library/jest-dom';
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Summary } from '../../components'
import { Row } from '../../types';

const MOCK_ROWS: Row[] = [{
  regionName: 'France',
  '2019-01-01': 1,
  '2019-01-02': 1,
}, {
  regionName: 'Spain',
  '2019-01-02': 19,
  '2019-01-03': 14,
}, {
  regionName: 'Ireland',
  '2019-01-03': 21,
  '2019-01-04': 21,
}];

describe('Summary component', () => {

  test('Shows the total rain', () => {
    const EXPECTED_TOTAL = 77;
    const EXPECTED_TEXT = new RegExp(`Total rainfall: ${EXPECTED_TOTAL}`);

    render(<Summary rows={MOCK_ROWS} />);

    expect(screen.getByText(EXPECTED_TEXT)).toBeInTheDocument();
  });
  test('Shows the average rainfall', () => {
    const EXPECTED_AVERAGE = 12.83;
    const EXPECTED_TEXT = new RegExp(`Average rainfall: ${EXPECTED_AVERAGE}`);

    render(<Summary rows={MOCK_ROWS} />);

    expect(screen.getByText(EXPECTED_TEXT)).toBeInTheDocument();
  });

  test('Shows the number of consecutive days with rainfall above 10mm ', () => {
    const EXPECTED_CONSECUTIVE = 2;
    const EXPECTED_TEXT = new RegExp(`Consecutive days with rainfall greater than 10mm: ${EXPECTED_CONSECUTIVE}`);

    render(<Summary rows={MOCK_ROWS} />);

    expect(screen.getByText(EXPECTED_TEXT)).toBeInTheDocument();
  });

});