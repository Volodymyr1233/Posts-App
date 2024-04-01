import React, {useState} from 'react';
import { Option } from '../../../models/Options';

interface Props {
    options: Option[],
    defaultValue: string,
    value: string,
    onChange: (value: string) => void,
}

const MySelect = ({options, defaultValue, value, onChange}: Props) => {
    const [countOption, setCountOption] = useState<number>(0);
    return (
        <select
            value={value}
            onChange={e => {
                setCountOption(countOption + 1);
                onChange(e.target.value)
            }}
        >
            {countOption === 0
                ? <option value="">{defaultValue}</option>
                : <option disabled value="">{defaultValue}</option>}
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>)}
        </select>
    )
}

export default MySelect;