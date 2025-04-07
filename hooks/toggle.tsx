import { useState } from 'react';

export function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);

    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);
    const toggle = () => setValue(!value);

    return { value, setTrue, setFalse, toggle };
}

export default useToggle;
