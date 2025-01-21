import { useTranslation } from "react-i18next";
import PigIcon from "../components/app/PigIcon";
import TooltipBtn from "../components/common/TooltipBtn";

function Home () {
    const { t } = useTranslation();

    return (
        <main className="page-container">
            <div className="vstack gap-3 vh-100 justify-content-center align-items-center text-center p-3">
                <div className="pig-icon-container">
                    <PigIcon/>
                </div>
                <div className="hstack justify-content-center gap-3 flex-wrap">
                    <TooltipBtn href="?m=generator" tooltipText={t("GeneratorLabel")} variant="outline-info" className="fs-3 fold-mode-btn">
                        <i className="bi bi-text-paragraph"></i>
                    </TooltipBtn>
                    <TooltipBtn href="?m=picker" tooltipText={t("PickerLabel")} variant="info" className="fs-1 fold-mode-btn">
                        <i className="bi bi-shuffle"></i>
                    </TooltipBtn>
                    <TooltipBtn href="?m=favourites" tooltipText={t("FavouritesLabel")} variant="outline-info" className="fs-3 fold-mode-btn">
                        <i className="bi bi-star"></i>
                    </TooltipBtn>
                </div>
            </div>
        </main>
    );
}

export default Home;