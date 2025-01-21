import { Alert, Modal } from "react-bootstrap";
import ModalNav from "../common/ModalNav";
import QrCodeDisplay from "../app/QrCodeDisplay";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function QrCodeModal ({ show, close }) {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const qrText = searchParams.get("qrtxt");

    const handleClose = () => {
        if (typeof close === "function") {
            close("qrtxt");
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <ModalNav onClose={handleClose} allowClose/>
                <div className="flex-1 text-center">
                    <span className="h3">
                        {t("QRCode")}
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body>
                {qrText ? (
                    <QrCodeDisplay qrText={qrText}/>
                ) : (
                    <Alert variant="info">
                        <p>{t("NoItemsToDisplay")}</p>
                        <Link to="?m=picker" className="text-info">{t("GoToPicker")}</Link>
                    </Alert>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default QrCodeModal;