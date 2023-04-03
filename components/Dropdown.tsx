const ALL = 'All';

function Dropdown({ regions }) {

    return (<select>
        {['All', ...regions].map(region => {
            const key = region.toLowerCase();
            return <option key={key} value={key}>{region}</option>
        })}
    </select>)
}

export default Dropdown;