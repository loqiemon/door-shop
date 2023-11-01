import { useState } from 'react';

export default function useInput(initState) {
    const [value, setValue] = useState(initState || '');
    
    const onChange = (text) => {
        setValue(text);
    }

    return {
        value,
        onChange
    }
} 