import { Alert, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import TooltipBtn from "../common/TooltipBtn";
import { useEffect, useState } from "react";
import LocalDataManager from "../../managers/LocalDataManager";
import { useTranslation } from "react-i18next";

function FavouritesList({ generateQr, show }) {
    const { t } = useTranslation();
    const [deleteItem, setDeleteItem] = useState(null);
    const [list, setList] = useState([]);

    const confirmDelete = () => {
        LocalDataManager.removeFavourite(deleteItem);
        setDeleteItem(null);
        setList(LocalDataManager.getFavourites());
    }

    useEffect(() => {
        setList(LocalDataManager.getFavourites());
    }, [show]);

    return (
        <div>
            {list.length === 0 && (
                <Alert variant="info">
                    <p>{t("NoItemsToDisplay")}</p>
                    <Link to="?m=picker" className="text-info">
                    {t("GoToPicker")}
                    </Link>
                </Alert>
            )}

            {deleteItem && (
                <Alert variant="danger" onClose={() => setDeleteItem(null)} dismissible>
                    <p>{t("DeleteFromFavourites", { item: deleteItem })}</p>
                    <div className="hstack gap-2">
                        <Button variant="outline-danger" size="sm" type="button" onClick={confirmDelete}>
                            {t("Confirm")}
                        </Button>
                        <Button variant="outline-secondary" size="sm" type="button" onClick={() => setDeleteItem(null)}>
                            {t("Cancel")}
                        </Button>
                    </div>
                </Alert>
            )}

            <ListGroup>
                {list.map((item, index) => (
                    <ListGroup.Item key={index} className="hstack gap-3">
                        <p className="mb-0 flex-1">
                            {item}
                        </p>
                        <div className="hstack gap-2">
                            <TooltipBtn variant="link" tooltipText={t("GenerateQR")} className="p-0" onClick={() => generateQr(item)}>
                                <i className="bi bi-qr-code-scan text-success"></i>
                            </TooltipBtn>
                            <TooltipBtn variant="link" tooltipText={t("Remove")} className="p-0" onClick={() => setDeleteItem(item)}>
                                <i className="bi bi-trash text-danger"></i>
                            </TooltipBtn>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default FavouritesList;