import React, { useState, useEffect } from 'react';
import '../GreenTour.scss';
import './css/Footer.css'
import facebookIcon from '../images1/footer/fb.svg';
import insIcon from '../images1/footer/ig.svg';
import youtubeIcon from '../images1/footer/youtube.svg';

function Footer() {

    let SSL = window.location.hostname === "localhost" ? "https:" : window.location.protocol
    let domain = window.location.hostname === "localhost" ? 'greenlife.eri.com.tw' : window.location.hostname === "greenlife.eri.com.tw" ? "greenlife.eri.com.tw" : 'greenlife.epa.gov.tw'

    var serialize = require('serialize-javascript');

    //紀錄瀏覽人次API
    useEffect(() => {
        fetch(`${SSL}//${domain}/api/api/Common/VisitRecord`, {
            method: 'POST',
            body: serialize({
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    }, [SSL, domain, serialize]);

    //取得瀏覽人次API
    const [visitedCount, setVisitedCount] = useState([]);
    // https://cors-anywhere.herokuapp.com/
    useEffect(() => {
        const uri = `${SSL}//${domain}/api/api/Common/VisitCount`;
        fetch(uri, {
            method: 'GET'
        })
            .then(res => {
                return res.json();
            }).then(result => {
                setVisitedCount(result.resultObject)
            });

    }, [SSL, domain]);


    //系統資訊API
    const [siteInfo, setSiteInfo] = useState([]);
    const [items, setItems] = useState([]);

    const type = "Index";
    const code = "Footer";

    useEffect(() => {

        const uri = `${SSL}//${domain}/api/api/Common/SystemInfo`;
        fetch(uri, {
            method: 'POST',
            body: serialize({
                Type: type,
                Code: code
            }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => {
                return res.json();
            }).then(result => {
                // console.log(result)
                setItems(result.resultObject[0].item5.split('<br>'))
                if (result.isSucess) {
                    setSiteInfo(result.resultObject[0]);
                }
            });
    }, [SSL, domain, serialize]);


    return (


        <div className="site-footer">
            <div className="container-fluid">
                <div className="row footer-wrapper">
                    <div className="offset-lg-1 col-lg-6 col-md-8 col-sm-12">
                        <p className="footer-text-site">{siteInfo.item1}</p>
                        {/* 網站維護：{siteInfo.item2}<br /> */}
                        <p className="footer-text-site">{siteInfo.item3}</p>
                        <p className="footer-text-site">電話：{siteInfo.item4}</p>
                        <div>{items.map((items, index) =>
                            <p className="footer-text-site" key={index}>{items}</p>
                        )}</div>
                        {/* 1.若您有本網系統操作問題，請撥打諮詢專線 ，或來信詢問系統操作問題。<br />
                                                    2.若您有其他環保污染相關問題，請至首長信箱發表，感謝您的寶貴建議。<br />
                                                        3.若您有環保標章相關問題，請撥打驗證單位。<br /> */}
                        <br />
                        {/* <a className="skip-nav" href="#" aria-label="頁尾網站資訊">:::</a> */}

                        {/* <div className="form-link">
                            <a className="link-with-border" href="https://docs.google.com/forms/d/e/1FAIpQLSfs0eoJ3-B6klu3KaKP28uSAsfQnCyqAShnyr_3Qd0_CY0Vew/viewform"
                                target="_blank" rel="noreferrer noopener">我要填寫客服需求單</a>
                        </div> */}
                        <div>
                            <a className="link-with-border" href={String(siteInfo.item10).split(",")[1]} title="網站政策及宣告鏈結">{String(siteInfo.item10).split(",")[0]}</a>
                            <a className="link-with-border" href={String(siteInfo.item7).split(",")[1]} title="意見信箱鏈結">{String(siteInfo.item7).split(",")[0]}</a><br />
                        </div>

                    </div>
                    <div className="offset-lg-1 col-lg-5 col-md-6 col-sm-12">
                        <div className="footer-icons-wrapper">
                            <div className="type-icons-wrapper">
                                <p className="footer-icons-label">綠色生活</p>
                                <a className="social-icons" title="綠色生活facebook連結(另開視窗)" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/greenlife123/?ref=nf"><img className="footer-social-icon" src={facebookIcon} alt="綠色生活facebook連結" aria-label="綠色生活facebook連結" /></a>
                            </div>
                            <div className="type-icons-wrapper">
                                <p className="footer-icons-label">環保署</p>
                                <a className="social-icons" title="環保署facebook連結(另開視窗)" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/MOENR.TW/"><img className="footer-social-icon" src={facebookIcon} alt="環保署facebook連結" aria-label="環保署facebook連結" /></a>
                                <a className="social-icons" title="環保署youtube連結(另開視窗)" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/TaiwanEpa"><img className="footer-social-icon" src={youtubeIcon} alt="環保署youtube連結" aria-label="環保署youtube連結" /></a>
                                <a className="social-icons" title="環保署instagram連結(另開視窗)" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/epa.tw/"><img className="footer-social-icon" src={insIcon} alt="環保署instagram連結" aria-label="環保署instagram連結" /></a>
                            </div>
                        </div>
                    </div>


                </div>

                <hr className="style-two" />

                <div className="row">
                    <div className="offset-lg-1 col-lg-5 col-md-6 col-sm-12">{siteInfo.item8}
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12">
                        <ul className="social">
                            <li>更新日期: {siteInfo.item9}</li>
                            <li>瀏覽人次: {visitedCount}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
}

export default Footer;