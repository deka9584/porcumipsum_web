import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function ParagraphsDisplay({ paragraphs, back }) {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className="text-center mb-3">
                <span className="h4">
                    {t("GeneratedParTitle")}
                </span>
            </div>
            <div className="par-display">
                {paragraphs.map((par, index) => (
                    <p key={index}>{par}</p>
                ))}
            </div>
            <div className="text-center">
                <Button type="button" variant="link text-decoration-none" onClick={back}>
                    {t("GenerateNew")}
                </Button>
            </div>
        </Fragment>
    );
}

export default ParagraphsDisplay;