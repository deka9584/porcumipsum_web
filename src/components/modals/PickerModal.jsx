import { Modal } from "react-bootstrap";
import ModalNav from "../common/ModalNav";
import { useState } from "react";
import SaintsPicker from "../app/SaintsPicker";
import useModalSteps from "../../hooks/useModalSteps";
import QrCodeDisplay from "../app/QrCodeDisplay";
import { useTranslation } from "react-i18next";

function PickerModal ({ show, close }) {
    const { t } = useTranslation();
    const [result, setResult] = useState("");

    const { current, step, back, goTo } = useModalSteps([
        <SaintsPicker key={0} onUpdate={setResult} generateQRCode={() => goTo(1)}/>,
        <QrCodeDisplay key={1} qrText={result} back={() => back()}/>
    ]);

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header>
                <ModalNav onBack={back} onClose={close} allowBack={current > 0} allowClose/>
                <div className="flex-1 text-center">
                    <span className="h3">
                        {t("PickerLabel")}
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body>
                {step}
            </Modal.Body>
        </Modal>
    );
}

export default PickerModal;