import React, {useState} from "react";

const LoginForm=()=>{
    const [account, setAccount] = useState("快來輸入我");
    const [nowSelect,setNowSelect]=useState("789");
    const [isCheck,setIsCheck]=useState(false);
    return (
        <div>
            <input type="text" defaultValue={account} disabled={true} onChange={(e) => {setAccount(e.target.value)}} />
            <div>
                目前account:{account}
            </div>
            <button onClick={()=>{setAccount("")}}>用按鍵取得新的account</button>
            <select value={nowSelect} onChange={(e)=>{setNowSelect(e.target.value)}}>
                <option value="123">123</option>
                <option value="456">456</option>
            </select>
            <div>
                目前select:{nowSelect}
            </div>
            <button onClick={(e)=>{setNowSelect("789")}}>改變為789</button>

            <input type="radio" value="123" checked={isCheck} onChange={(e)=>{setIsCheck(true)}} />123<br/>
<input type="radio" value="456" checked={!isCheck} onChange={(e)=>{setIsCheck(false)}} />456
{/* <form onSubmit={this.handleSubmit}>
      <input type="submit" value="Submit" />
 </form> */}
        </div>
    )
}
export default LoginForm;