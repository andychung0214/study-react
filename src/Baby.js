import React, { useState, useEffect } from "react";

function Baby(props){
    const [isGetData, setGetData] = useState(false);
    const [Mom, setMom] = useState("");
    const [isRightDad, setRightDad] = useState(false);

    const ajaxSimulator=()=>{
        setTimeout(() => {
            setGetData((true));
            setMom("小美");
        }, 3000);
    }

    const checkDad=()=>{
        if (props.dad === "Chang") {
            setRightDad(true)
        }else{
            setRightDad(false);
        }
    }

    if (isRightDad === false) {
        return (<div>他的媽媽，是誰，干你屁事</div>)
    }
    else if (isGetData === false) {
        return (<div id="msg">Loading</div>)
    } else {
        return (<div id="msg">他的媽媽是{Mom}</div>)
    }

}

export default Baby