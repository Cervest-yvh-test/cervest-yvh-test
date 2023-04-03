import { ALL } from "../constants";

function Dropdown({ regions, onChange }) {

    return (<select onChange={onChange}>
        {[ALL, ...regions].map(region => {
            const key = region.toLowerCase();
            return <option key={key} value={key}>{region}</option>
        })}
    </select>)
}

export default Dropdown;