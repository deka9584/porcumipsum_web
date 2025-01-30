import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function LangDropdown () {
    const { i18n } = useTranslation();
    const languages = i18n.options.resources ? Object.keys(i18n.options.resources) : [];

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="link" className="text-body text-decoration-none text-uppercase">
                {i18n.language}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {languages.map((item, index) => (
                    <Dropdown.Item key={index} onClick={() => changeLang(item)} active={item === i18n.language}>
                        <span className="text-uppercase">{item}</span>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default LangDropdown;