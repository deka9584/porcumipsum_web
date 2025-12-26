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
                    <p className="m-0">{t("NoItemsToDisplay")}</p>
                </Alert>
            )}

            <ListGroup>
                {history.map((item, index) => (
                    <ListGroup.Item key={index}>
                        <div className="hstack justify-content-between gap-2 mb-1">
                            <Button variant="link" className="p-0 text-decoration-none" onClick={() => onSelect(item.paragraphs)}>
                                #{index + 1} - {formatDate(item.createdAt)}
                            </Button>
                            {item === deleteItem ? (
                                <div className="d-flex align-items-center gap-1">
                                    <div className="d-flex flex-wrap flex-column flex-sm-row align-items-center gap-sm-1">
                                        <Button type="button" variant="link" className="p-0 text-decoration-none" onClick={confirmDelete}>
                                            <small className="text-danger">{t("Delete")}</small>
                                        </Button>
                                        <Button type="button" variant="link" className="p-0 text-decoration-none" onClick={() => setDeleteItem(null)}>
                                            <small className="text-secondary">{t("Cancel")}</small>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <TooltipBtn variant="link" tooltipText={t("Remove")} className="p-0" onClick={() => setDeleteItem(item)}>
                                    <i className="bi bi-trash text-danger"></i>
                                </TooltipBtn>
                            )}
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