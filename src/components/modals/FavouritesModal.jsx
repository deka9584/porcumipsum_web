import { useState } from "react";
import { Modal } from "react-bootstrap";
import ModalNav from "../common/ModalNav";
import useModalSteps from "../../hooks/useModalSteps";
import FavouritesList from "../app/FavouritesList";
import QrCodeDisplay from "../app/QrCodeDisplay";
import { useTranslation } from "react-i18next";

function FavouritesModal ({ show, close }) {
    const { t } = useTranslation();
    const [qrText, setQrText] = useState("");

    const { current, step, back, next } = useModalSteps([
        <FavouritesList key={0} generateQr={(txt) => generateQr(txt)} show={show}/>,
        <QrCodeDisplay key={1} qrText={qrText} back={() => back()}/>
    ]);

    const generateQr = (text) => {
        setQrText(text);
        next();
    }

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header>
                <ModalNav onBack={back} onClose={close} allowBack={current > 0} allowClose/>
                <div className="flex-1 text-center">
                    <span className="h3">
                        {t("FavouritesLabel")}
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body>
                {step}
            </Modal.Body>
        </Modal>
    );
}

export default FavouritesModal;