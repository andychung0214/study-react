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
    
    const productCategory = ["?????????????????????", "???????????????", "???????????????", "???????????????",
    "???????????????", "???????????????", "(OA)????????????????????????", "??????????????????",
    "???????????????", "?????????", "???????????????", "?????????",
    "?????????????????????", "?????????"];

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
                    <td data-title="????????????" className="list-date">{category}</td>
                    <td data-title="??????*" className="list-date">{homeCount}</td>
                    <td data-title="?????????*" className="download-time">{passCount}</td>
                    <td data-title="?????????*" className="table-align-left">{activeCount}</td>
                    <td data-title="??????/??????" className="table-align-left">
                        <a>
                            
                            <div className="servicebtn div-flex" title="????????????" 
                                onClick={() => {
                                    setPctn(index + 1)
                                    // Toggle()
                                    clickShow(index, homeCount, passCount, activeCount)
                                }}
                                >
                                <span>??????/??????</span>
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
                        <td data-title="??????????????????" className="list-date">{standardNum}</td>
                        <td data-title="????????????" className="list-date">{category}</td>
                        <td data-title="??????*" className="list-date">{homeCount ? homeCount : 0}</td>
                        <td data-title="?????????*" className="download-time">{passCount ? passCount : 0}</td>
                        <td data-title="?????????*" className="table-align-left">{activeCount ? activeCount : 0}</td>
                    </tr>
                )
            })}
            <tr>
                <td></td>
                <td>??????</td>
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
           // ???Criteria??????
           const groupByCriteria = groupByProduct(['Criteria']);

           // ????????????????????????
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
            // ???Criteria??????
            const groupByCriteria = groupByProduct(['Criteria']);

            // ???????????????????????????
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
      //??????????????????
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

                    // ???Criteria??????
                    const groupByCriteria = groupByProduct(["Criteria"]);

                    // ????????????????????????
                    let removeDoubleData = removeDuplicates(result.Detail, "CorpName");
                    for (let [groupName, values] of Object.entries(groupByCriteria(removeDoubleData))) {
                        tempHomeCounter[groupName] = values.length;
                    }

                    subHomeArray.push(tempHomeCounter);
                    setArrHomeDetail(subHomeArray);

                    // ???????????????????????????
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
        console.log("****??????clickshow START****");

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

        //??????Modal
        setShowAPI(true);
    }

    // ????????? render ????????????
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

    // ?????????????????? render ?????????
    useEffect(() => {
        // console.log("?????????????????? render ?????????");

        getOutdoorActivyData();
        getIndoorActivityData();
        
        // console.log("?????????????????? render ?????????activeCount=", listActiveCount);
        // console.log("?????????????????? render ?????????objCounter=", objCounter);

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

            // ??????Render??????
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
            {/* <BreadCrumb currentPage="????????????????????????????????????????????????" /> */}

            <div className=""><img src={markBannerSmall} className="w-100 banner" alt="????????????????????????????????????????????????" /></div>
            <div className="">{/* container */}
                <div className="div-flex-wrap green-row mt-2 justify-content-center">
                    <div className="col-lg-2 col-md-12 col-12">

                        <div className="row leftbtn justify-content-between">
                            {/* <Link to={`/categories/GreenProductReport`} className="leftbtnFocus" title="????????????????????????????????????????????????"><div className="col-12 col-md-6 col-lg-12">????????????????????????????????????????????????</div></Link>
                            <Link to={`/categories/GreenProductCount`}><div className="col-12 col-md-6 col-lg-12" title="???????????????????????????">???????????????????????????</div></Link>
                            <Link to={`/categories/GreenCountry`}><div className="col-12 col-md-6 col-lg-12" title="???????????????????????????">??????</div></Link> */}
                        </div>

                    </div>

                    <div className="col-lg-9 col-md-12">
                        <div className="row ">
                            <div className="col-12 greenbar">
                                <h5>????????????????????????????????????????????????</h5>
                            </div>
                            <div className="col-12 bluebar mt-2 mb-2">
                            <Form.Label htmlFor="startDate">???????????????</Form.Label>
                                <DatePicker
                                    onChange={date => {
                                        setFirstLoad(false)
                                        setYear(date)
                                    }}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    placeholderText="??????"
                                    selected={
                                        firstLoad?
                                        today:
                                        year
                                    }
                                    className="form-control"
                                    id="????????????"
                                    title="????????????"
                                    ref={inputYearRef}
                                    style={{'width': 'auto'}}
                                />
                                <Form.Label htmlFor="month">???????????????</Form.Label>
                                
                                <Form.Control name="month" as="select" style={{'width': 'auto','display': 'inline'}} defaultValue={currentMonth} 
                                onChange={e => {
                                    setMonth(e.target.value)
                                }}
                                ref={inputMonthRef}
                                aria-label="????????????"
                                >
                                    <option value="0">??????</option>
                                    <option value="1">1???</option>
                                    <option value="2">2???</option>
                                    <option value="3">3???</option>
                                    <option value="4">4???</option>
                                    <option value="5">5???</option>
                                    <option value="6">6???</option>
                                    <option value="7">7???</option>
                                    <option value="8">8???</option>
                                    <option value="9">9???</option>
                                    <option value="10">10???</option>
                                    <option value="11">11???</option>
                                    <option value="12">12???</option>
                                </Form.Control>
                                
                            <input id="btnSearch" className='btn btn-success' style={{'background': '#6cb15e', 'color': 'white'}} value="????????????" 
                                        type="submit" onClick={submit} />
                                        
                            <input id="btnReset" className='btn btn-success' style={{'background': '#6cb15e', 'color': 'white'}} value="????????????" 
                    type="button" onClick={reset} />
                                <div className="table-outter-wrapper">
                                {
                                arrTable.length === 0 
                                ?
                                <h6>??????????????????</h6>
                                    : <table className="review-card rwd-table">
                                        <thead className="text-content-wrapper text-content-wrapper-darkgreen" style={{'text-align': 'center'}}>
                                            <tr>
                                                <th>????????????</th>
                                                <th>??????*</th>
                                                <th>?????????*</th>
                                                <th>?????????*</th>
                                                <th>??????/??????</th>
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
             {/* API???????????? */}
             {
                 arrDetailTable.length === 0?
                 ""
                 :
                 <div>
                     <table className="review-card rwd-table">
                                        <thead className="text-content-wrapper text-content-wrapper-darkgreen" style={{'text-align': 'center'}}>
                                            <tr>
                                            <th>??????????????????</th>
                                     <th>????????????</th>
                                     <th>??????*</th>
                                     <th>?????????*</th>
                                     <th>?????????*</th>
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
                                     <th>??????????????????</th>
                                     <th>????????????</th>
                                     <th>??????*</th>
                                     <th>?????????*</th>
                                     <th>?????????*</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 {tableDetailData}
                             </tbody>
                         </table>
                     </Modal.Body>
                     <Modal.Footer>
                         <Button variant="success" onClick={handleShowAPIClose}>??????</Button>
                     </Modal.Footer>
                 </Modal> */}
                 
             </div>

             }
            {/* <Footer /> */}
        </>
    );
}

export default GreenProductReport;
