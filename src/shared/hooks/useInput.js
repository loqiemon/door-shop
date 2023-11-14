import { useState } from 'react';

export function useInput(initState) {
    const [value, setValue] = useState(initState || '');

    const onChange = (text) => {
        setValue(text);
    }

    return {
        value,
        onChange
    }
} 