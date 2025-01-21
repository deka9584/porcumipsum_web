import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import porcumGenerator from "../../utils/porcumGenerator";
import LocalDataManager from "../../managers/LocalDataManager";
import { useTranslation } from "react-i18next";

function GeneratorForm ({ onResult, showHistory }) {
    const { t } = useTranslation();
    const [processing, setProcessing] = useState(false);
    const [errorMsg, setErrorMsg] = useState();

    const [inputData, setInputData] = useState({
        nPar: 5,
        minChars: 400,
        commas: true
    });

    const updateInputData = (key, value) => {
        setInputData(prev => ({ ...prev, [key]: value }));
    }

    const submit = (event) => {
        const { nPar, minChars, commas } = inputData;
        event.preventDefault();

        if (!nPar || nPar < 1 || !minChars || minChars < 1) {
            setErrorMsg(t("InvalidForm"));
            return;
        }

        if (nPar > 30 || minChars > 2000) {
            setErrorMsg(t("NumberTooHigh"));
            return;
        }

        setProcessing(true);

        porcumGenerator(nPar, minChars, commas)
            .then((result) => {
                LocalDataManager.addGeneratorHistory(result);

                if (typeof onResult === "function") {
                    onResult(result);
                }
            })
            .catch((error) => {
                console.error(error);
                setErrorMsg(t("GenericErrorMsg"));
            })
            .finally(() => {
                setProcessing(false);
            });
    }

    return (
        <Form onSubmit={submit}>
            {errorMsg && (
                <Alert variant="danger" onClose={() => setErrorMsg(null)} dismissible>
                    <span className="h4 fw-medium">{t("ErrorAlertTitle")}</span>
                    <p>{errorMsg}</p>
                </Alert>
            )}

            <div className="hstack gap-3 flex-wrap">
                <div className="flex-grow-1">
                    <Form.Label htmlFor="npar">
                        {t("GeneratorParNumber")}
                    </Form.Label>
                    <Form.Control
                        id="npar"
                        type="number"
                        placeholder={t("GeneratorParNumber")}
                        value={inputData.nPar}
                        onChange={e => updateInputData("nPar", e.target.value)}
                    />
                </div>
                <div className="flex-grow-1">
                    <Form.Label htmlFor="minchars">
                        {t("GeneratorMinChars")}
                    </Form.Label>
                    <Form.Control
                        id="minchars"
                        type="number"
                        placeholder={t("GeneratorMinChars")}
                        value={inputData.minChars}
                        onChange={e => updateInputData("minChars", e.target.value)}
                    />
                </div>
            </div>
            <div className="mt-3">
                <Form.Switch
                    id="commascheck"
                    label={t("GeneratorInsertCommas")}
                    checked={inputData.commas}
                    onChange={e => updateInputData("commas", e.target.checked)}
                />
            </div>
            <div className="hstack flex-wrap gap-3 mt-3">
                <Button type="submit" variant="primary" className="flex-1" disabled={processing}>
                    {processing ? t("GeneratorLoading") : t("GeneratorSubmit")}
                </Button>
                <Button type="button" variant="secondary" className="flex-1" onClick={showHistory}>
                    {t("History")}
                </Button>
            </div>
        </Form>
    );
}

export default GeneratorForm;