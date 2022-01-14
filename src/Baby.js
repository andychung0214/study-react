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

    useEffect(()=>{
         /* 下面是 componentDidMount */
        ajaxSimulator();
         /* 上面是 componentDidMount */
        document.getElementById("talk").append('爸!')
        return (() =>{
             /* 下面是 componentWillUnmount */
            document.getElementById("talk").innerHTML = "";
             /* 上面是 componentWillUnmount */
        })
    }, []);

    useEffect(()=>{
        
        /* 下面是 componentDidMount和componentDidUpdate */    
        checkDad();
        /* 上面是 componentDidMount和componentDidUpdate */    
    }, [props.dad]);



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