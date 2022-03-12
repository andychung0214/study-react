import React, { useEffect, useRef } from 'react';
import useState from 'react-usestateref' 
// import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import '../src/GreenProduct/GreenProductReport.scss'
import '../src/GreenOffice/greenOffice.scss';

import markBannerSmall from '../src/images/banner_mark_small.jpg';

// import CustomModal from '../Components/CustomModal';

// const Loader = React.lazy(() => import('../src/Components/Loader'));
// const BreadCrumb = '../src/Components/BreadCrumb';
// const Footer = '../src/Components/Footer';
// const Loader = '../src/Components/Loader';

function GreenProductReport(props){

    const [loading, setLoading] = useState(false);
    let today = new Date();
    let currentMonth = today.getMonth() + 1;
    const [year, setYear] = useState(new Date());
    const [month, setMonth] = useState("");


    const [listActiveCount, setListActiveCount, listActiveCountRef] = useState([]);
    const [objCounter, setObjCounter] = useState([]);

    const [arrTable, setArrTable, arrTableRef] = useState([]);

    const [objectTable, setObjectTable] = useState({});
    const [showAPI, setShowAPI] = useState(false);

    const handleShowAPIClose = () => setShowAPI(false);
    const handleShowAPIShow = () => setShowAPI(true);

    const [pctn, setPctn, pctnRef] = useState(0);

    const [categoryName, setCategoryName] = useState("");
    const [totalActiveCount, setTotalActiveCount] = useState(0);
    const [totalHomeCount, setTotalHomeCount] = useState(0);
    const [totalPassCount, setTotalPassCount] = useState(0);
    const [firstLoad, setFirstLoad] = useState(false);

    const [arrHomeDetail, setArrHomeDetail, arrHomeDetailRef] = useState([]);
    const [arrPassDetail, setArrPassDetail, arrPassDetailRef] = useState([]);

    const [arrDetailTable, setArrDetailTable, arrDetailTableRef] = useState([]);

    const [searched, setSearched, searchedRef] = useState(false);
    
    const productCategory = ["資源回收產品類", "清潔產品類", "資訊產品類", "家電產品類",
    "省水產品類", "省電產品類", "(OA)辦公室用具產品類", "可分解產品類",
    "有機資材類", "建材類", "日常用品類", "工業類",
    "利用太陽能資源", "服務類"];

    const [listCriteriaType, setListCriteriaType, listCriteriaTypeRef] = useState([]);
    const [listCriteriaTypeLength, setListCriteriaTypeLength, listCriteriaTypeLengthRef] = useState(0);

    let arrProductTable = [];
    let arrActiveCount = [];
    let subHomeArray = [];
    let subPassArray = [];
    let tempArray = [];

    const [reportElement, setReportElement] = useState({
        arrHome: [],
        arrPass: [],
        arrDetail: [],
        arrOutdoor: [],
        arrIndoor: {}
    });

    const reset = () =>{
        setYear("")
        setMonth("0")
    }
    
    let SSL = "https:";
    let domainFormal = "greenliving.epa.gov.tw/newPublic";
    const inputYearRef = useRef(null);
    const inputMonthRef = useRef(null);


    const tableData = (
       
        arrTableRef.current.map((data, index) => {
            const { category, homeCount, passCount, activeCount } = data
            return (
                <tr key={index}>
                    <td data-title="產品類別" className="list-date">{category}</td>
                    <td data-title="家次*" className="list-date">{homeCount}</td>
                    <td data-title="通過數*" className="download-time">{passCount}</td>
                    <td data-title="有效數*" className="table-align-left">{activeCount}</td>
                    <td data-title="展開/收合" className="table-align-left">
                        <a>
                            
                            <div className="servicebtn div-flex" title="展開細項" 
                                onClick={() => {
                                    setPctn(index + 1)
                                    // Toggle()
                                    clickShow(index, homeCount, passCount, activeCount)
                                }}
                                >
                                <span>展開/收合</span>
                            </div>
                        </a>
                    </td>
                </tr>
            )
        })
    );

    const tableDetailData = (
        <>
            {arrDetailTableRef.current.map((data, index) => {
                const { standardNum, category, homeCount, passCount, activeCount } = data
                return (
                    <tr key={index}>
                        <td data-title="規格標準編號" className="list-date">{standardNum}</td>
                        <td data-title="產品類別" className="list-date">{category}</td>
                        <td data-title="家次*" className="list-date">{homeCount ? homeCount : 0}</td>
                        <td data-title="通過數*" className="download-time">{passCount ? passCount : 0}</td>
                        <td data-title="有效數*" className="table-align-left">{activeCount ? activeCount : 0}</td>
                    </tr>
                )
            })}
            <tr>
                <td></td>
                <td>小計</td>
                <td>{totalHomeCount}</td>
                <td>{totalPassCount}</td>
                <td>{totalActiveCount}</td>
            </tr>
        </>
    );
    function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject  = {};
    
        for(var i in originalArray) {
           lookupObject[originalArray[i][prop]] = originalArray[i];
        }
    
        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
         return newArray;
   }

   const getPromiseHomeNumber = (ctn) => {
     let apiUrl = '';

     const yearValue = inputYearRef.current.input.value;
     const monthValue = inputMonthRef.current.value;

     if (yearValue !== '' && monthValue !== 0) {
       apiUrl = `${SSL}//${domainFormal}/APIs/ProductsQueryAll?ctn=${ctn}&y=${yearValue}&m=${monthValue}`;
     } else {
       apiUrl = `${SSL}//${domainFormal}/APIs/ProductsQueryAll?ctn=${ctn}`;
     }
     return fetch(apiUrl)
       .then((response) => response.json())
       .then((result) => {
         let tempHomeCounter = [];
         if (result.Detail.length > 0) {
           // 依Criteria分組
           const groupByCriteria = groupByProduct(['Criteria']);

           // 家次各類細項加總
           let removeDoubleData = removeDuplicates(result.Detail, 'CorpName');
           for (let [groupName, values] of Object.entries(
             groupByCriteria(removeDoubleData)
           )) {
             tempHomeCounter[groupName] = values.length;
           }

           subHomeArray.push(tempHomeCounter);
         }
         return {
           arrHome: subHomeArray,
         };
       });
   };

    const getPromisePassNumber = (ctn) => {
      let apiUrl = '';

      const yearValue = inputYearRef.current.input.value;
      const monthValue = inputMonthRef.current.value;

      if (yearValue !== '' && monthValue !== 0) {
        apiUrl = `${SSL}//${domainFormal}/APIs/ProductsQueryAll?ctn=${ctn}&y=${yearValue}&m=${monthValue}`;
      } else {
        apiUrl = `${SSL}//${domainFormal}/APIs/ProductsQueryAll?ctn=${ctn}`;
      }

      return fetch(apiUrl)
        .then((response) => response.json())
        .then((result) => {
          let tempCounter = [];
          if (result.Detail.length > 0) {
            // 依Criteria分組
            const groupByCriteria = groupByProduct(['Criteria']);

            // 通過數各類細項加總
            for (let [groupName, values] of Object.entries(
              groupByCriteria(result.Detail)
            )) {
              tempCounter[groupName] = values.length;
            }

            subPassArray.push(tempCounter);
          }
          return {
            arrPass: subPassArray,
          };
        });
    };

    const getPromiseDetailTable = (ctn) => {
      //產品分類代碼
      ctn += 1;

      let detailUrl = `${SSL}//${domainFormal}/APIs/CriteriaList/${ctn}`;

      return fetch(detailUrl)
        .then((response) => response.json())
        .then((result) => {
          arrDetailTable.length = 0;
          if (result.Detail.length > 0) {
            for (let index = 0; index < result.Detail.length; index++) {
              let dObject = {};
              dObject.standardNum = result.Detail[index].CriteriaNo;
              dObject.category = result.Detail[index].Criteria;

              if (arrHomeDetailRef.current.length > 0) {
                for (const key in arrHomeDetailRef.current[0]) {
                  if (
                    Object.hasOwnProperty.call(arrHomeDetailRef.current[0], key)
                  ) {
                    if (dObject.category === key) {
                      dObject.homeCount = arrHomeDetailRef.current[0][key];
                    }
                  }
                }
              } else {
                setArrHomeDetail([]);
              }

              // let passCountSum = 0;
              if (arrPassDetail.length > 0) {
                Object.keys(arrPassDetail[0]).forEach((key) => {
                  if (dObject.category === key) {
                    dObject.passCount = arrPassDetail[0][key];
                    // passCountSum = arrPassDetail[0][key];
                  }
                });
              }

              if (arrPassDetailRef.current.length > 0) {
                for (const passKey in arrPassDetailRef.current[0]) {
                  if (
                    Object.hasOwnProperty.call(
                      arrPassDetailRef.current[0],
                      passKey
                    )
                  ) {
                    if (dObject.category === passKey) {
                      dObject.passCount = arrPassDetailRef.current[0][passKey];
                    }
                  }
                }
              } else {
                setArrPassDetail([]);
              }

              if (objCounter.length > 0) {
                for (let index = 0; index < objCounter.length; index++) {
                  const prdocutIdx = objCounter[index].Idx;
                  if (ctn === prdocutIdx) {
                    const element = objCounter[index].arrActiveCount;

                    for (const key in element[0]) {
                      if (Object.hasOwnProperty.call(element[0], key)) {
                        if (dObject.category === key) {
                          dObject.activeCount = element[0][key];
                        }
                      }
                    }
                  }
                }
              } else {
                setObjCounter({});
              }

            //   setObjectDetailTable(dObject);

              arrDetailTable.push(dObject);
              setArrDetailTable(arrDetailTable);
            }
          }

          return {
            arrDetail: arrDetailTable,
          };
        });
    };

    function fetchHomePassNumber(ctn){
        let apiUrl = "";
        
        const yearValue = inputYearRef.current.input.value;
        const monthValue = inputMonthRef.current.value;
        
        if (yearValue !== "" && monthValue !== 0) {
            apiUrl = `${SSL}//${domainFormal}/APIs/ProductsQueryAll?ctn=${ctn}&y=${yearValue}&m=${monthValue}`;
        }else{
            apiUrl = `${SSL}//${domainFormal}/APIs/ProductsQueryAll?ctn=${ctn}`;
        }

        fetch(apiUrl, {
            method: 'GET'
        }).then(res =>{
            return res.json();
        }).then(result =>{
            if (result.Result === "Success"){
                let tempHomeCounter = [];
                let tempCounter = [];

                arrHomeDetail.length = 0;
                setArrHomeDetail(arrHomeDetail);
                arrPassDetail.length = 0;
                setArrPassDetail(arrPassDetail);

                if (result.Detail.length > 0) {

                    // 依Criteria分組
                    const groupByCriteria = groupByProduct(["Criteria"]);

                    // 家次各類細項加總
                    let removeDoubleData = removeDuplicates(result.Detail, "CorpName");
                    for (let [groupName, values] of Object.entries(groupByCriteria(removeDoubleData))) {
                        tempHomeCounter[groupName] = values.length;
                    }

                    subHomeArray.push(tempHomeCounter);
                    setArrHomeDetail(subHomeArray);

                    // 通過數各類細項加總
                    for (let [groupName, values] of Object.entries(groupByCriteria(result.Detail))) {
                        tempCounter[groupName] = values.length;
                    }

                    subPassArray.push(tempCounter);
                    setArrPassDetail(subPassArray);
                }
            }else{
                setArrHomeDetail(subHomeArray);
                setArrPassDetail(subPassArray);
            }
        })
    }

    function getDetailTable(ctn) {
        let detailUrl = `${SSL}//${domainFormal}/APIs/CriteriaList/${ctn}`;

        fetch(detailUrl, {
            method: 'GET'
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.Result === "Success") {
                arrDetailTable.length = 0;
                if (result.Detail.length > 0) {

                    for (let index = 0; index < result.Detail.length; index++) {

                        let dObject = {};
                        dObject.standardNum = result.Detail[index].CriteriaNo;
                        dObject.category = result.Detail[index].Criteria;

                        if (arrHomeDetailRef.current.length > 0) {
                            for (const key in arrHomeDetailRef.current[0]) {
                                if (Object.hasOwnProperty.call(arrHomeDetailRef.current[0], key)) {
                                    if (dObject.category === key) {
                                        dObject.homeCount = arrHomeDetailRef.current[0][key];
                                    }
                                }
                            }
                        }else{
                            setArrHomeDetail([]);
                        }

                        // let passCountSum = 0;
                        if (arrPassDetailRef.current.length > 0) {
                            for (const passKey in arrPassDetailRef.current[0]) {
                                if (Object.hasOwnProperty.call(arrPassDetailRef.current[0], passKey)) {
                                    if (dObject.category === passKey) {
                                        dObject.passCount = arrPassDetailRef.current[0][passKey];
                                    }
                                }
                            }
                        }else{
                            setArrPassDetail([]);
                        }

                        if (objCounter.length > 0) {
                            for (let index = 0; index < objCounter.length; index++) {
                                const prdocutIdx = objCounter[index].Idx;
                                if (ctn === prdocutIdx) {

                                    const element = objCounter[index].arrActiveCount;

                                    for (const key in element[0]) {
                                        if (Object.hasOwnProperty.call(element[0], key)) {
                                            if (dObject.category === key) {
                                                dObject.activeCount = element[0][key];
                                            }
                                        }
                                    }
                                }
                            }
                        }else{
                            setObjCounter({});
                        }

                        arrDetailTable.push(dObject);
                        setArrDetailTable(arrDetailTable);
                    }
                }
            }
        })
    }

    function clickShow(index, homeCount, passCount, activeCount) {

        let productName = productCategory[index];
        setCategoryName(productName);

        index += 1;
        console.log("****執行clickshow START****");

        setTotalHomeCount(homeCount);
        setTotalPassCount(passCount);
        setTotalActiveCount(activeCount);
      
        fetchHomePassNumber(index);
        getDetailTable(index);

        // const fetchData = async () =>{
        //     const [listHomeCount, listPassCount, listDetailTable] = await Promise.all([
        //         getPromiseHomeNumber(index),
        //         getPromisePassNumber(index),
        //         getPromiseDetailTable(index)
        //     ])

        //     setReportElement({
        //         ...listHomeCount,
        //         ...listPassCount,
        //         ...listDetailTable
        //       });

        //     setArrHomeDetail(listHomeCount['arrHome']);
        //     setArrPassDetail(listPassCount['arrPass']);
        //     setArrDetailTable(listDetailTable['arrDetail']);
        // };

        // fetchData();

        //顯示Modal
        setShowAPI(true);
    }

    // 每一次 render 後會執行
    useEffect(() =>{
        listActiveCount.sort(function (a, b){
            return a.Idx - b.Idx;
        });
        arrTable.sort(function (a, b) {
            return a.Idx - b.Idx;
        });
    });

    function initFetchData(){
        let apiUrl = `${SSL}//${domainFormal}/APIs/CriteriaTypeList`;

        fetch(apiUrl, {
            method: 'GET'
        }).then(res =>{
            return res.json();
        }).then(result =>{
            if (result.Result === "Success"){
                setListCriteriaTypeLength(result.RowsCount);
                setListCriteriaType(result.Detail);
            }
        });
    }
    
    function getOutdoorActivyData(){
        let categoryIdx = 1;
        for (let Idx = 0; Idx < productCategory.length; Idx++) {

            let apiUrl = `${SSL}//${domainFormal}/APIs/ProductsQuery?sta=1&ctn=${categoryIdx}`;
            fetch(apiUrl, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result.Result === "Success"){
                    let updateObjectTable = {};
                    updateObjectTable.Idx = Idx;

                    // for (const key in listCriteriaTypeRef.current) {
                    //     if (Object.hasOwnProperty.call(listCriteriaTypeRef.current, key)) {
                    //         updateObjectTable.categoryName = listCriteriaTypeRef.current[key - 1];
                    //     }
                    // }

                    updateObjectTable.categoryName = productCategory[Idx];

                    updateObjectTable.num = result.RowsCount;
    
                    arrActiveCount.push(updateObjectTable);
                    setListActiveCount(arrActiveCount);


                }
            });
            categoryIdx++;
        }
    }

    function getIndoorActivityData(){
        for (let productIndex = 0; productIndex < productCategory.length; productIndex++) {

            let apiUrl = `${SSL}//${domainFormal}/APIs/ProductsQueryAll?ctn=${(productIndex + 1)}`;

            fetch(apiUrl, {
                method: 'GET'
            }).then(allRes => {
                return allRes.json();
            }).then(allResult => {
                if (allResult.Result === "Success") {

                    if (allResult.Detail.length > 0) {
                        let tempObj = {};
                        let tempCounter = {};
                        let subArray = [];

                        tempObj.Idx = productIndex + 1;

                        if (subArray.length <= 0) {

                            const groupByCriteria = groupByProduct(["Criteria"]);
                            for (let [groupName, values] of Object.entries(groupByCriteria(allResult.Detail))) {
                                tempCounter[groupName] = values.length;
                            }
                            subArray.push(tempCounter);
                        }

                        tempObj.arrActiveCount = subArray;
                        tempObj.TotalCount = allResult.RowsCount;
                        tempArray.push(tempObj);
                        setObjCounter(tempArray);
                    }
                }
            });
        }
    }

    // 只有在第一次 render 後執行
    useEffect(() => {
        // console.log("只有在第一次 render 後執行");

        getOutdoorActivyData();
        getIndoorActivityData();
        
        // console.log("只有在第一次 render 後執行activeCount=", listActiveCount);
        // console.log("只有在第一次 render 後執行objCounter=", objCounter);

    }, [])

    // useEffect(() => {
    //     fetchHomePassNumber(pctnRef.current);
    //     return ()=>{
    //         fetchHomePassNumber(pctnRef.current);
    //     }
    // }, [])

    useEffect(() => {
        // getOutdoorActivyData();
        // getOurdoorActivityData();

        fetchHomePassNumber(pctnRef.current);
        getDetailTable(pctnRef.current);

        // const fetchData = async () =>{
        //     const [listHomeCount, listPassCount, listDetailTable] = await Promise.all([
        //         getPromiseHomeNumber(pctnRef.current),
        //         getPromisePassNumber(pctnRef.current),
        //         getPromiseDetailTable(pctnRef.current)
        //     ])

        //     setReportElement({
        //         ...listHomeCount,
        //         ...listPassCount,
        //         ...listDetailTable
        //       });

        //     setArrHomeDetail(listHomeCount['arrHome']);
        //     setArrPassDetail(listPassCount['arrPass']);
        //     setArrDetailTable(listDetailTable['arrDetail']);
        // };

        // fetchData();

    }, [pctnRef.current, arrDetailTableRef.current])


    useEffect(() => {
        // initFetchData();
        getOutdoorActivyData();
        getIndoorActivityData();
        fetchReportData();
        setFirstLoad(true);
    }, [SSL, domainFormal])

    function fetchReportData(){
        setLoading(true);
        let productCTN = 1;
        
        for (let Idx = 0; Idx < productCategory.length; Idx++) {
            const yearValue = inputYearRef.current.input.value;
            const monthValue = inputMonthRef.current.value;

            let getConditionUrl = "";
            let getAllUrl = "";

            // 初次Render畫面
            if (!searchedRef.current) {
                let currentYear = today.getFullYear();
                setYear(currentYear);
                getAllUrl= `${SSL}//${domainFormal}/APIs/ProductsQuery?sta=1&k=&crn=&t=&ctn=${productCTN}&cn=&y=${currentYear}&m=${currentMonth}`;
            }

            if (yearValue === "" || monthValue ===0) {
                getConditionUrl = `${SSL}//${domainFormal}/APIs/ProductsQuery?sta=1&k=&crn=&t=&ctn=${productCTN}&cn=`;

            }else{
                getConditionUrl = `${SSL}//${domainFormal}/APIs/ProductsQuery?sta=1&k=&crn=&t=&ctn=${productCTN}&cn=&y=${yearValue}&m=${monthValue}`;
            }

            productCTN++;

            fetch(searchedRef.current? getConditionUrl : getAllUrl, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result.resultObject)
                if (result.Result === "Success") {
                    let updateObjectTable = {};
                    updateObjectTable.Idx = Idx;

                    updateObjectTable.category = productCategory[Idx];

                    let arrCorpName = [];

                    if (result.Detail.length > 0) {
                     
                        for (let index = 0; index < result.Detail.length; index++) {
                            const element = result.Detail[index].CorpName;
                            arrCorpName.push(element);
                        }
                        var delDuplate = [...new Set(arrCorpName)];
                        updateObjectTable.homeCount = delDuplate.length;

                    }else{
                        updateObjectTable.homeCount = 0;

                    }
                    

                    updateObjectTable.passCount = result.RowsCount;


                    updateObjectTable.activeCount = listActiveCountRef.current[Idx].num;

                    setObjectTable(updateObjectTable);


                    arrProductTable.push(updateObjectTable);
                    setArrTable(arrProductTable);

                    setLoading(false);

                }
                
            });
        }
    }

    const submit = () =>{
        setLoading(true);
        setSearched(true);

        // initFetchData();
        fetchReportData();
    }

    const groupByProduct = (keys) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = keys.map((key) => obj[key]).join("-");
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

    return (
        <>
            {/* <BreadCrumb currentPage="環保標章產品審查通過及有效數報表" /> */}

            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="環保標章產品審查通過及有效數報表" /></div>
            <div className="">{/* container */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">

                        <div className="row leftbtn justify-content-between">
                            {/* <Link to={`/categories/GreenProductReport`} className="leftbtnFocus" title="環保標章產品審查通過及有效數報表"><div className="col-12 col-md-6 col-lg-12">環保標章產品審查通過及有效數報表</div></Link>
                            <Link to={`/categories/GreenProductCount`}><div className="col-12 col-md-6 col-lg-12" title="廠商獲頒產品數統計">廠商獲頒產品數統計</div></Link>
                            <Link to={`/categories/GreenCountry`}><div className="col-12 col-md-6 col-lg-12" title="廠商獲頒產品數統計">圖表</div></Link> */}
                        </div>

                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>環保標章產品審查通過及有效數報表</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                            <Form.Label htmlFor="startDate">通過年度：</Form.Label>
                                <DatePicker
                                    onChange={date => {
                                        setFirstLoad(false)
                                        setYear(date)
                                    }}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    placeholderText="年份"
                                    selected={
                                        firstLoad?
                                        today:
                                        year
                                    }
                                    className="form-control"
                                    id="日期區間"
                                    title="日期區間"
                                    ref={inputYearRef}
                                    style={{'width': 'auto'}}
                                />
                                <Form.Label htmlFor="month">通過月份：</Form.Label>
                                
                                <Form.Control name="month" as="select" style={{'width': 'auto','display': 'inline'}} defaultValue={currentMonth} 
                                onChange={e => {
                                    setMonth(e.target.value)
                                }}
                                ref={inputMonthRef}
                                aria-label="選擇月份"
                                >
                                    <option value="0">月份</option>
                                    <option value="1">1月</option>
                                    <option value="2">2月</option>
                                    <option value="3">3月</option>
                                    <option value="4">4月</option>
                                    <option value="5">5月</option>
                                    <option value="6">6月</option>
                                    <option value="7">7月</option>
                                    <option value="8">8月</option>
                                    <option value="9">9月</option>
                                    <option value="10">10月</option>
                                    <option value="11">11月</option>
                                    <option value="12">12月</option>
                                </Form.Control>
                                
                            <input id="btnSearch" className='btn btn-success' style={{'background': '#6cb15e', 'color': 'white'}} value="開始查詢" 
                                        type="submit" onClick={submit} />
                                        
                            <input id="btnReset" className='btn btn-success' style={{'background': '#6cb15e', 'color': 'white'}} value="重新設定" 
                    type="button" onClick={reset} />
                                <div className="table-outter-wrapper">
                                {
                                arrTable.length === 0 
                                ?
                                <h6>查無搜尋結果</h6>
                                    : <table className="review-card rwd-table">
                                        <thead className="text-content-wrapper text-content-wrapper-darkgreen" style={{'text-align': 'center'}}>
                                            <tr>
                                                <th>產品類別</th>
                                                <th>家次*</th>
                                                <th>通過數*</th>
                                                <th>有效數*</th>
                                                <th>展開/收合</th>
                                            </tr>
                                        </thead>
                                        <tbody className="card-content-office card-content-darkgreen">
                                            {tableData}
                                        </tbody>
                                    </table>}
                            </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             {/* API服務說明 */}
             {
                 arrDetailTable.length === 0?
                 ""
                 :
                 <div>
                     <table className="review-card rwd-table">
                                        <thead className="text-content-wrapper text-content-wrapper-darkgreen" style={{'text-align': 'center'}}>
                                            <tr>
                                            <th>規格標準編號</th>
                                     <th>產品類別</th>
                                     <th>家次*</th>
                                     <th>通過數*</th>
                                     <th>有效數*</th>
                                            </tr>
                                        </thead>
                                        <tbody className="card-content-office card-content-darkgreen">
                                            {tableDetailData}
                                        </tbody>
                                    </table>
                 {/* <Modal show={showAPI} onHide={handleShowAPIClose} size="xl" centered="true">
                     <Modal.Header closeButton>
                         <Modal.Title>{categoryName}</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                         <table className="table table-responsive-md">
                             <thead>
                                 <tr>
                                     <th>規格標準編號</th>
                                     <th>產品類別</th>
                                     <th>家次*</th>
                                     <th>通過數*</th>
                                     <th>有效數*</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 {tableDetailData}
                             </tbody>
                         </table>
                     </Modal.Body>
                     <Modal.Footer>
                         <Button variant="success" onClick={handleShowAPIClose}>關閉</Button>
                     </Modal.Footer>
                 </Modal> */}
                 
             </div>

             }
            {/* <Footer /> */}
        </>
    );
}

export default GreenProductReport;
