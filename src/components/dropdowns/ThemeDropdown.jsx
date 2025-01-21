import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import themeValues from "../../resources/themeValues.json";
import getClientTheme from "../../utils/getClientTheme";

function ThemeDropdown () {
    const [selTheme, setSelTheme] = useState("");
    const currentTheme = themeValues.find(t => t.value === selTheme) ?? themeValues[0];

    const changeTheme = (newTheme) => {
        const themeAttr = newTheme === "default" ? getClientTheme() : newTheme;
        document.documentElement.setAttribute("data-bs-theme", themeAttr);
        setSelTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    useEffect(() => {
        const curTh = localStorage.getItem("theme") ?? document.documentElement.getAttribute("data-bs-theme");

        if (curTh) {
            setSelTheme(curTh);
        }
    }, []);

    return (
        <Dropdown>
            <Dropdown.Toggle variant="link text-body">
                {currentTheme && (
                    <i className={currentTheme.icon} aria-label={currentTheme.label}></i>
                )}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {themeValues.map((item, index) => (
                    <Dropdown.Item key={index} onClick={() => changeTheme(item.value)} active={item.value === selTheme}>
                        <i className={item.icon}></i>
                        <span className="ms-2">{item.label}</span>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ThemeDropdown;