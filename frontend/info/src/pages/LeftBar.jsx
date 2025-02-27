import "./css/left_bar.css";
import PagesSection from "./pages/PagesSection.jsx";
import Section from "./reusable/Section.jsx";
import Services from "./services/Services.jsx";

export default function LeftBar(props) {
    return (
        <div className="pages-leftBar">
            {/* Левая панель содержит секции страниц и сервисов */}
            <Section text="Pages" content={<PagesSection setContent={props.setContent} setRightContent={props.setRightContent}/>}/>
            <Section text="Services" content={<Services setContent={props.setContent}/>}/>
        </div>
    );
}