import { useEffect, useState } from "react";
import LocalDataManager from "../../managers/LocalDataManager";
import { Alert, Button, ListGroup } from "react-bootstrap";
import TooltipBtn from "../common/TooltipBtn";
import { useTranslation } from "react-i18next";

function ParagraphsHistory ({ onSelect, show }) {
    const { t } = useTranslation();
    const [deleteItem, setDeleteItem] = useState();
    const [history, setHistory] = useState([]);

    const confirmDelete = () => {     
        LocalDataManager.saveGeneratorHistory(history.filter(item => item !== deleteItem));
        setHistory(LocalDataManager.getGeneratorHistory());
        setDeleteItem(null);
    }

    const cancelDelete = () => {
        setDeleteItem(null);
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    }

    useEffect(() => {
        setHistory(LocalDataManager.getGeneratorHistory());
    }, [show]);

    return (
        <div>
            {history.length === 0 && (
                <Alert variant="info">
                    <p>{t("NoItemsToDisplay")}</p>
                </Alert>
            )}

            {deleteItem && (
                <Alert variant="danger" onClose={cancelDelete} dismissible>
                    <p>{t("DeleteFromParHistory", { index: history.indexOf(deleteItem) + 1, date: formatDate(deleteItem.createdAt) })}</p>
                    <div className="hstack gap-2">
                        <Button variant="outline-danger" size="sm" type="button" onClick={confirmDelete}>
                            {t("Confirm")}
                        </Button>
                        <Button variant="outline-secondary" size="sm" type="button" onClick={cancelDelete}>
                            {t("Cancel")}
                        </Button>
                    </div>
                </Alert>
            )}

            <ListGroup>
                {history.map((item, index) => (
                    <ListGroup.Item key={index}>
                        <div className="hstack justify-content-between gap-2 mb-1">
                            <Button variant="link" className="p-0 text-decoration-none" onClick={() => onSelect(item.paragraphs)}>
                                #{index + 1} - {formatDate(item.createdAt)}
                            </Button>
                            <TooltipBtn variant="link" tooltipText={t("Delete")} className="p-0" onClick={() => setDeleteItem(item)}>
                                <i className="bi bi-trash text-danger"></i>
                            </TooltipBtn>
                        </div>
                        {item.paragraphs && item.paragraphs.length > 0 ? (
                            <p className="mb-0 paragraph-preview text-muted">
                                {item.paragraphs[0]}
                            </p>
                        ) : (
                            <p className="mb-0 text-danger">
                                {t("ParDisplayError")}
                            </p>
                        )}
                        
                        <Button variant="link" className="p-0 text-decoration-none" onClick={() => onSelect(item.paragraphs)}>
                            {t("ReadMore")}
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default ParagraphsHistory;