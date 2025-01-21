import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import QRCode from "react-qr-code";
import LocalDataManager from "../../managers/LocalDataManager";
import serializeSvgElement from "../../utils/serializeSvgElement";
import ShareInput from "../common/ShareInput";
import { useTranslation } from "react-i18next";

function QrCodeDisplay ({ qrText, back }) {
    const { t } = useTranslation();
    const [isFavourite, setIsFavourite] = useState(false);
    const [svgDataUrl, setSvgDataUrl] = useState("");
    const [pngDataUrl, setPngDataUrl] = useState("");
    const [shareUrl, setShareUrl] = useState();
    const qrCodeSvgRef = useRef();

    const generateDownloadUrls = useCallback(() => {
        const svgString = serializeSvgElement(qrCodeSvgRef.current);
        const img = new Image();

        img.src = svgString;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = qrCodeSvgRef.current.getAttribute("width");
            canvas.height = qrCodeSvgRef.current.getAttribute("height");

            ctx.drawImage(img, 0, 0);
            setPngDataUrl(canvas.toDataURL("image/png"));
        }

        setSvgDataUrl(svgString);
    }, []);

    const addFavourite = () => {
        LocalDataManager.saveFavourite(qrText);
        setIsFavourite(true);
    }

    const createShareUrl = () => {
        const url = new URL(window.location.origin);

        url.searchParams.set("m", "qr");
        url.searchParams.set("qrtxt", qrText);

        return url.href;
    }

    const removeFavourite = () => {
        LocalDataManager.removeFavourite(qrText);
        setIsFavourite(false);
    }

    const toggleShareUrl = () => {
        setShareUrl(prev => !prev ? createShareUrl() : null);
    }

    useEffect(() => {
        setIsFavourite(LocalDataManager.isFavourite(qrText));
        generateDownloadUrls();
    }, [qrText, generateDownloadUrls]);

    return (
        <div className="text-center">
            <span className="h4 d-block mb-3">{qrText}</span>
            <div className="qr-display">
                <QRCode
                    ref={qrCodeSvgRef}
                    size={256}
                    value={qrText}
                    viewBox={`0 0 256 256`}
                    className="h-auto mw-100 w-100"
                />
            </div>
            
            <div className="hstack justify-content-center flex-wrap gap-3 mt-3">
                {isFavourite ? (
                    <Button variant="primary" type="button" onClick={removeFavourite}>
                        <i className="bi bi-star-fill"></i>
                        <span className="ms-2">{t("Remove")}</span>
                    </Button>
                ) : (
                    <Button variant="primary" type="button" onClick={addFavourite}>
                        <i className="bi bi-star"></i>
                        <span className="ms-2">{t("Add")}</span>
                    </Button>
                )}
                <Button variant="secondary" type="button" onClick={toggleShareUrl}>
                    <i className="bi bi-share"></i>
                    <span className="ms-2">{t("Share")}</span>
                </Button>
                <Dropdown>
                    <Dropdown.Toggle variant="success">
                        <i className="bi bi-save"></i>
                        <span className="ms-2">{t("Save")}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href={pngDataUrl} download={qrText + ".png"}>
                            {t("SaveOptPng")}
                        </Dropdown.Item>
                        <Dropdown.Item href={svgDataUrl} download={qrText + ".svg"}>
                            {t("SaveOptSvg")}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {shareUrl && (
                <ShareInput className="mt-3" text={shareUrl} close={toggleShareUrl}/>
            )}
            {back && (
                <div className="mt-3">
                    <Button variant="link" className="text-decoration-none" onClick={back}>
                        {t("Back")}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default QrCodeDisplay;