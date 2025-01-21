import { Fragment, useEffect, useState } from "react";
import fetchPorks from "../../utils/fetchPorks";
import Picker from "react-mobile-picker";
import { Button } from "react-bootstrap";
import pickRandom from "../../utils/pickRandom";
import { useTranslation } from "react-i18next";

function SaintsPicker ({ onUpdate, generateQRCode }) {
    const { t } = useTranslation();
    
    const [srcLists, setSrcLists] = useState({
        pre: [],
        saint: [],
        post: []
    })

    const [pickerValue, setPickerValue] = useState({
        pre: "",
        saint: "",
        post: ""
    });

    const pickerResult = `${pickerValue.pre} ${pickerValue.saint} ${pickerValue.post}`;

    const randomize = () => {
        setPickerValue({
            pre: pickRandom(srcLists.pre),
            saint: pickRandom(srcLists.saint),
            post: pickRandom(srcLists.post)
        });
    }

    useEffect(() => {
        fetchPorks("all")
            .then(lists => {
                setSrcLists({
                    pre: lists.preImprecazioni,
                    saint: lists.santi,
                    post: lists.postImprecazioni
                });

                setPickerValue(prev => {
                    if (Object.keys(prev).some((k) => !prev[k])) {
                        return {
                            pre: lists.preImprecazioni[0],
                            saint: lists.santi[0],
                            post: lists.postImprecazioni[0]
                        }
                    }

                    return prev;
                });
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    useEffect(() => {
        if (typeof onUpdate === "function") {
            onUpdate(pickerResult);
        }
    }, [onUpdate, pickerResult])

    return (
        <Fragment>
            <Picker value={pickerValue} onChange={setPickerValue} wheelMode="normal">
                {Object.keys(srcLists).map((name, i) => (
                    <Picker.Column key={i} name={name}>
                        {srcLists[name].map((option, j) => (
                            <Picker.Item key={j} value={option} className="text-center small">
                                {option}
                            </Picker.Item>
                        ))}
                    </Picker.Column>
                ))}
            </Picker>
            <div className="picker-result text-center">
                <span className="h4">{pickerResult}</span>
            </div>
            <div className="hstack flex-wrap gap-3 mt-3">
                <Button variant="primary" type="button" className="flex-1" onClick={randomize}>
                    {t("Randomize")}
                </Button>
                {generateQRCode && (
                    <Button variant="secondary" type="button" className="flex-1" onClick={() => generateQRCode(pickerResult)}>
                        {t("GenerateQR")}
                    </Button>
                )}
            </div>
        </Fragment>
    );
}

export default SaintsPicker;