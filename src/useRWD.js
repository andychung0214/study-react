import { useState, useEffect } from 'react';

const useRWD=()=>{
    const [device, setDevice] = useState("Mobile");
    const handleRWD = () =>{
        if (window.innerWidth > 768) {
            setDevice("PC");
        }else if(window.innerWidth > 576){
            setDevice("Tablet");
        }else{
            setDevice("Mobile");
        }
    }

    useEffect(() =>{
        window.addEventListener('resize', handleRWD);
        handleRWD();
        return(() => {
            window.removeEventListener('resize', handleRWD);
        })
    },[])

    return device;
}

export default useRWD;