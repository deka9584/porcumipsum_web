import { Modal } from "react-bootstrap";
import GeneratorForm from "../app/GeneratorForm";
import { useState } from "react";
import ModalNav from "../common/ModalNav";
import useModalSteps from "../../hooks/useModalSteps";
import ParagraphsDisplay from "../app/ParagraphsDisplay";
import ParagraphsHistory from "../app/ParagraphsHistory";
import { useTranslation } from "react-i18next";

function GeneratorModal ({ show, close }) {
    const [paragraphs, setPragraphs] = useState([]);
    const { t } = useTranslation();

    const { current, step, back, goTo } = useModalSteps([
        <GeneratorForm key={0} onResult={(p) => displayParagraphs(p)} showHistory={() => goTo(2)}/>,
        <ParagraphsDisplay key={1} paragraphs={paragraphs} back={() => back()}/>,
        <ParagraphsHistory key={2} onSelect={(p) => displayParagraphs(p)} show={show}/>
    ])

    const displayParagraphs = (paragraphs) => {
        setPragraphs(paragraphs);
        goTo(1);
    }

    return (
        <Modal show={show} onHide={close}>
            <Modal.Header>
                <ModalNav onBack={back} onClose={close} allowBack={current > 0} allowClose/>
                <div className="flex-1 text-center">
                    <span className="h3">
                        {t("GeneratorLabel")}
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body>
                {step}
            </Modal.Body>
        </Modal>
    );
}

export default GeneratorModal;