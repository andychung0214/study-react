
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './css/Breadcrumb.css';

function Breadcrumb(props) {
    // console.log(props.currentPage)
    const pathlist = [
        '/',
        '/about',
        '/search',
        '/categories',
        '/categories/greenTour',
        '/categories/restaurant',
        '/categories/accommodation',
        '/categories/greenProductSearch',
        '/categories/greenShopSearch',
        '/categories/green_office',
        '/categories/green_office/apply',
        '/categories/green_office/shared_articles',
        '/about/intro',
        '/searchEvent',
        '/knowledge',
        '/daily',
        '/member',
        "/daily/article",
        '/download',
        '/download/material',
        '/member/office_management',
        '/member/blog_management',
        '/member/activity_management',
        '/member/knowledge_management',
        '/signUp_options',
        '/signUp_options/organization_SignUp',
        '/member/point_mission',
        '/daily/score',
        '/member/click_record',
        '/daily/blog',
        '/green_point',
        '/greenLabel',
        '/greenPurChase',
        '/categories/GreenShopIntro',
        '/EmailService'

    ]
    const pathnames = ['首頁', '關於綠生活', '站內搜尋', '綠生活選擇', '綠色旅遊查詢', '綠色餐廳查詢', '環保旅宿查詢', '環保產品查詢', '綠色商店查詢', '響應綠色辦公', '選擇組織性質', '經驗分享-文章清單', '了解綠生活', '活動專區', '知識綠', '綠生活成果榜', '會員中心', '秀出我的綠', '下載專區', '圖文素材', '綠色辦公響應管理', '網誌管理', '活動管理', '知識綠管理', '選擇帳號類別', '選擇組織單位', '綠生活任務', '綠行動秘笈', '瀏覽量檢視', '網誌清單', '什麼是綠活島', '【標章及採購】環保標章', '【標章及採購】綠色採購', '綠色商店介紹', '平台客服專區']

    // 先找出對應的中文詞

    let locationPathname = props.location.pathname
    var split = locationPathname.split('/');
    var second = split[1]
    var third = split[2]
    var forth = split[3]

    let secParam = `/${second}`
    let thirdParam = `/${second}/${third}`
    let forthParam = `/${second}/${third}/${forth}`

    // console.log(split)
    // console.log(props)

    const index = pathlist.findIndex((v) => v === locationPathname)
    const index2 = pathlist.findIndex((v) => v === secParam)
    const index3 = pathlist.findIndex((v) => v === thirdParam)
    const index4 = pathlist.findIndex((v) => v === forthParam)


    // console.log(locationPathname)


    const detail = (
        <>
            <ol
                className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/about">首頁</Link>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                    <a
                        href={secParam}
                    >{pathnames[index2]}</a>
                </li>
                <li
                    className="breadcrumb-item active" aria-current="page">
                    {props.currentPage ? props.currentPage : pathnames[index]}
                </li>
            </ol>
        </>
    )


    const four = (
        <>
            <ol
                className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/about">首頁</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a
                        href={secParam}
                    >{pathnames[index2]}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a
                        href={thirdParam}
                    >{pathnames[index3]}</a>
                </li>
                <li
                    className="breadcrumb-item active" aria-current="page">
                    {props.currentPage ? props.currentPage : pathnames[index]}
                </li>
            </ol>
        </>
    )

    const five = (
        <>
            <ol
                className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/about">首頁</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a
                        href={secParam}
                    >{pathnames[index2]}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a
                        href={thirdParam}
                    >{pathnames[index3]}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    <a
                        href={forthParam}
                    >{pathnames[index4]}</a>
                </li>
                <li
                    className="breadcrumb-item active" aria-current="page">
                    {props.currentPage ? props.currentPage : pathnames[index]}
                </li>
            </ol>
        </>
    )

    const two = (
        <>
            <ol
                className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/about">首頁</Link>
                </li>

                <li
                    className="breadcrumb-item active" aria-current="page">
                    {props.currentPage ? props.currentPage : pathnames[index]}
                </li>
            </ol>
        </>
    )


    let display;

    switch (split.length) {
        case 1:
            display = two;
            break;
        case 2:
            display = two;
            break;
        case 3:
            display = detail;
            break;
        case 4:
            display = four;
            break;
        case 5:
            display = five;
            break;
        default:
            display = two;
    }




    return (
        <>
            <nav aria-label="breadcrumb">
                {display}
            </nav>
        </>
    )
}

export default withRouter(Breadcrumb)