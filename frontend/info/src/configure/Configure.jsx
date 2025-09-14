import { useEffect, useContext, useState, } from "react";

import { AppContext } from "../AppProvider.jsx";
import { getConfigurationText } from "../getText.js";
import './css/configure.css';
import "./css/usersCentral.css";
import renderHeader from "../header/renderHeader.js";
import getLang from "../getLang.js";
import UsersCentral from "./users/UsersCentral.jsx";

export default function Configure() {
    const {user, logout, updateUser, updateTitle} = useContext(AppContext);
    const [content, setContent] = useState(<UsersCentral/>)

    useEffect(() => {
        renderHeader(updateUser(), logout, updateTitle(), "config");
    }, []);

    const text = getConfigurationText(getLang());

    return (
        <>
            {(user.role === "ADMIN" || user.role == "EXTERNAL_ADMIN") ?
                <div className="configure-content">
                    <div className="sideBar" id="sideBar">
                        <div onClick={() => setContent(<UsersCentral/>)} className="section">
                            <svg className="section-ico" viewBox="0 0 24 24" fill="none">
                                <path d="M4 21C4 17.134 7.13401 14 11 14C11.3395 14 11.6734 14.0242 12 14.0709M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7ZM12.5898 21L14.6148 20.595C14.7914 20.5597 14.8797 20.542 14.962 20.5097C15.0351 20.4811 15.1045 20.4439 15.1689 20.399C15.2414 20.3484 15.3051 20.2848 15.4324 20.1574L19.5898 16C20.1421 15.4477 20.1421 14.5523 19.5898 14C19.0376 13.4477 18.1421 13.4477 17.5898 14L13.4324 18.1574C13.3051 18.2848 13.2414 18.3484 13.1908 18.421C13.1459 18.4853 13.1088 18.5548 13.0801 18.6279C13.0478 18.7102 13.0302 18.7985 12.9948 18.975L12.5898 21Z" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <label id="config-section-users" className="section-title">{text.users}</label>
                        </div>
                        <div className="section">
                            <svg className="section-ico" viewBox="0 0 512 512" version="1.1">
                                <path fillRule="evenodd" stroke="none" strokeWidth="1" transform="translate(42.666667, 85.333333)" d="M341.333333,1.42108547e-14 L426.666667,85.3333333 L426.666667,341.333333 L3.55271368e-14,341.333333 L3.55271368e-14,1.42108547e-14 L341.333333,1.42108547e-14 Z M330.666667,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,96 L330.666667,42.6666667 Z M106.666667,85.3333333 L106.666,234.666 L341.333333,234.666667 L341.333333,256 L85.3333333,256 L85.3333333,85.3333333 L106.666667,85.3333333 Z M170.666667,149.333333 L170.666667,213.333333 L128,213.333333 L128,149.333333 L170.666667,149.333333 Z M234.666667,106.666667 L234.666667,213.333333 L192,213.333333 L192,106.666667 L234.666667,106.666667 Z M298.666667,170.666667 L298.666667,213.333333 L256,213.333333 L256,170.666667 L298.666667,170.666667 Z" id="Combined-Shape">
                                </path>
                            </svg>
                            <label id="config-section-reports" className="section-title">{text.reports}</label>
                        </div>
                        <div className="section">
                            <svg className="section-ico" viewBox="0 0 24 24" fill="none">
                                <path d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H15M8 21V18M16.5 17V15M16.5 19.2V19M16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5ZM12.309 21H20.691C21.0627 21 21.3044 20.6088 21.1382 20.2764L16.9472 11.8944C16.763 11.5259 16.237 11.5259 16.0528 11.8944L11.8618 20.2764C11.6956 20.6088 11.9373 21 12.309 21Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            </svg>
                            <label id="config-section-list" className="section-title">{text.list}</label>
                        </div>
                        <div className="section">
                            <svg className="section-ico" viewBox="0 0 24 24">
                                <path d="M11 19.913c-4.966-.084-8-1.388-8-2.334v-6.248C4.643 12.429 8.082 13 11.5 13s6.857-.57 8.5-1.67V14h1V5c0-1.97-4.78-3-9.5-3S2 3.03 2 5v12.58c0 2.116 4.448 3.255 9 3.333zM11.5 3C17 3 20 4.321 20 5s-3 2-8.5 2S3 5.679 3 5s3-2 8.5-2zM3 6.411C4.643 7.457 8.082 8 11.5 8s6.857-.543 8.5-1.589v3.437C20 10.726 16.689 12 11.5 12S3 10.726 3 9.848zM18 15l-1-1h-3l-1 1h-1v8h11v-8zm4 7h-9v-4h9zm-9-5v-1h.414l1-1h2.172l1 1H22v1z"/>
                            </svg>
                            <label id="config-section-data" className="section-title">{text.data}</label>
                        </div>
                        <div className="section">
                            <svg className="section-ico" viewBox="0 0 24 24" fill="none" strokeMiterlimit="10" strokeWidth="1">
                                <path className="cls-1" d="M9.07,13.84H5.16L1.25,18.73h0a3.91,3.91,0,0,0,3.91,3.91H18.84a3.91,3.91,0,0,0,3.91-3.91h0l-3.91-4.89H14.93"/><line className="cls-1" x1="1.25" y1="18.73" x2="22.75" y2="18.73"/><line className="cls-1" x1="12" y1="15.8" x2="12" y2="10.91"/><polygon className="cls-1" points="12 11.59 16.89 9.14 16.89 3.77 12 1.36 7.12 3.77 7.12 9.14 12 11.59"/><polyline className="cls-1" points="7.12 3.76 7.13 3.76 12 6.16 12 11.59"/><polyline className="cls-1" points="12 11.59 12 6.16 16.87 3.76 16.88 3.76"/><polyline className="cls-1" points="16.88 3.76 16.87 3.76 12 6.16 7.13 3.76 7.12 3.76"/>
                            </svg>
                            <label id="config-section-pages" className="section-title">{text.pages}</label>
                        </div>
                    </div>
                    <div className="central" id="central">
                        {content}
                    </div>
                </div>
            :
                <h1 id="config-error" style={{width: '100%', height: '100%', paddingTop: '20%', paddingLeft: '20%'}}>
                    {text.error}
                </h1>
            }
        </>
    );
}