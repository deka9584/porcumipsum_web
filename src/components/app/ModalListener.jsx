import { useSearchParams } from "react-router-dom";
import GeneratorModal from "../modals/GeneratorModal";
import { Fragment } from "react";
import PickerModal from "../modals/PickerModal";
import FavouritesModal from "../modals/FavouritesModal";
import QrCodeModal from "../modals/QrCodeModal";

function ModalListener () {
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get("m");

    const closeModal = (removeParams) => {
        setSearchParams(prev => {
            prev.delete("m");
            
            if (typeof removeParams === "string") {
                prev.delete(removeParams);
            }
            else if (Array.isArray(removeParams)) {
                removeParams.forEach(rmpar => prev.delete(rmpar));
            }

            return prev;
        });
    }

    return (
        <Fragment>
            <GeneratorModal show={mode === "generator"} close={closeModal}/>
            <PickerModal show={mode === "picker"} close={closeModal}/>
            <FavouritesModal show={mode === "favourites"} close={closeModal}/>
            <QrCodeModal show={mode === "qr"} close={closeModal}/>
        </Fragment>
    );
}

export default ModalListener;