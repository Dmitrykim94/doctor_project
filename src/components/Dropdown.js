import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const options = [
    { key: 1, text: '1', value: 1 },
    { key: 2, text: '2', value: 2 },
    { key: 3, text: '3', value: 3 },
    { key: 4, text: '4', value: 4 },
];

const options2 = [
    { key: 1, text: '+', value: 1 },
    { key: 2, text: '-', value: 2 },
];

const DropdownWrap = () => (

    <div>
        <Dropdown
            search
            selection
            wrapSelection={false}
            options={options}
            placeholder=''
        />
        <Dropdown
            search
            selection
            wrapSelection={false}
            options={options2}
            placeholder=''
        />

    </div>
)

export default DropdownWrap;