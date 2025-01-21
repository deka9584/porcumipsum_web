import { useState } from "react";

function useModalSteps (steps = []) {
    const [stack, setStack] = useState([]);
    const [current, setCurrent] = useState(0);
    const step = steps.length > current ? steps[current] : null;

    const back = () => {
        const newStep = stack.pop();
        setCurrent(newStep);
        setStack(prev => prev.filter(s => s !== newStep));
    }

    const goTo = (key) => {
        const index = steps.findIndex(s => s.key === `${key}`);

        if (index === -1) {
            console.error("Unable to find element with key:", key);
            return;
        }

        if (steps.length > index) {
            setStack(prev => ([...prev, current]));
            setCurrent(index);
        }
    }

    const next = () => {
        const newStep = current + 1;

        if (steps.length > newStep) {
            setStack(prev => ([...prev, current]));
            setCurrent(newStep);
        }
    }

    return {
        stack,
        current,
        step,
        back,
        next,
        goTo
    }
}

export default useModalSteps;