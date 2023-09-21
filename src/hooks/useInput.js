import { useState } from 'react';

export default function useInput() {
    const [value, setValue] = useState('');
    
    const onChange = (text) => {
        setValue(text);
    }

    return {
        value,
        onChange
    }
} 