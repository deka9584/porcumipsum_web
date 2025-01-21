import { Button } from "react-bootstrap";

function ModalNav({ allowBack = false, allowClose = false, onBack, onClose }) {
    return (
        <div className="position-absolute d-flex justify-content-between start-0 end-0">
            <Button type="button" variant="link" onClick={onBack} className="modal-nav-btn" disabled={!allowBack}>
                <i className="bi bi-arrow-left fs-3"></i>
            </Button>
            <Button type="button" variant="link" onClick={onClose} className="modal-nav-btn" disabled={!allowClose}>
                <i className="bi bi-x-lg fs-3"></i>
            </Button>
        </div>
    );
}

export default ModalNav;