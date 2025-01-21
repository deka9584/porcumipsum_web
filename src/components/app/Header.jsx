import { useTranslation } from "react-i18next";
import ThemeDropdown from "../dropdowns/ThemeDropdown";
import LangDropdown from "../dropdowns/LangDropdown";

function Header () {
    const { t } = useTranslation();

    return (
        <header className="position-fixed w-100">
            <nav className="app-navbar">
                <h1 className="fs-3 flex-1 mb-0 text-uppercase">
                    {t("appName")}
                </h1>
                <div className="hstack">
                    <LangDropdown/>
                    <ThemeDropdown/>
                </div>
            </nav>
        </header>
    );
}

export default Header;