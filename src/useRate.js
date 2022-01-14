import { useState, useEffect, useRef } from "react";

const useRate = (value) => {
    const [rate, setRate] = useState(0);

    const mounted = useRef();
    const tm = useRef();
    const tmTwo = useRef();

    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            setRate(value); 
            mounted.current = true;
        }else{ //componentDidUpdate
            if (rate > value) {
                if (tm.current) 
                    clearTimeout(tm.current)
                tmTwo.current =setTimeout(()=>{setRate(rate-1)},20);
            }else if(rate < value){
                if (tmTwo.current) {
                    clearTimeout(tmTwo.current)
                }
                tm.current = setTimeout(()=>{setRate(rate+1)},20);
            }
        }
    },[value, rate])

    return rate;
}

export default useRate