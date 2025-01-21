import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TooltipBtn ({ tooltipText = "", type = "button", id, variant, className, href, onClick, children }) {
    const navigate = useNavigate();

    const tooltip = (
        <Tooltip>{tooltipText}</Tooltip>
    );

    const clickHandler = (event) => {
        if (typeof onClick === "function") {
            onClick(event);
        }

        if (href && href.trim() !== "") {
            navigate(href);
            event.currentTarget?.blur();
        }
    }

    return (
        <OverlayTrigger overlay={tooltip}>
            <Button id={id} variant={variant} className={className} type={type} onClick={clickHandler} aria-label={tooltipText}>
                {children}
            </Button>
        </OverlayTrigger>
    );
}

export default TooltipBtn;