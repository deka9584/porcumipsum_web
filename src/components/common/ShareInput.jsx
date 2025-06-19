import { useRef, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import TooltipBtn from "./TooltipBtn";
import { useTranslation } from "react-i18next";

function ShareInput ({ text, className, close }) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const inputRef = useRef();

    const clipboardCopy = () => {
        inputRef.current?.focus();
        inputRef.current?.select();
        
        if (navigator.clipboard) {
            setCopied(true);
            navigator.clipboard.writeText(text).then(onTextCopied);
            return;
        }

        try {
            if (document.execCommand("copy")) {
                setCopied(true);
                onTextCopied();
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const onTextCopied = () => {
        setTimeout(() => setCopied(false), 1000);
    }

    return (
        <InputGroup className={className}>
            <InputGroup.Text>
                <i className="bi bi-share-fill"></i>
            </InputGroup.Text>
            <FormControl
                ref={inputRef}
                name="share_input"
                defaultValue={text}
                readOnly
            />
            <InputGroup.Text className="p-0">
                <TooltipBtn type="button" variant="link" tooltipText={t("Copy")} onClick={clipboardCopy} disabled={copied}>
                    <i className="bi bi-copy"></i>
                </TooltipBtn>
            </InputGroup.Text>
            {close && (
                <InputGroup.Text className="p-0">
                    <TooltipBtn type="button" variant="link" tooltipText={t("Close")} onClick={close}>
                        <i className="bi bi-x-lg"></i>
                    </TooltipBtn>
                </InputGroup.Text>
            )}
        </InputGroup>
    );
}

export default ShareInput;