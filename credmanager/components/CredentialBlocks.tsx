import React, { useState } from "react";
import styles from "./CredentialBlock.module.css";

type Credential = {
    username: string;
    password: string;
};

type CredentialBlocksProps = {
    credentials: Credential[];
};

const copyToClipboard = async (text: string) => {
    if (navigator && "clipboard" in navigator) {
        await navigator.clipboard.writeText(text);
    }
};

const CredentialBlocks: React.FC<CredentialBlocksProps> = ({ credentials }) => {
    const [showPassword, setShowPassword] = useState<boolean[]>(credentials.map(() => false));

    const toggleShowPassword = (index: number) => {
        setShowPassword((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    return (
        <div className={styles.container}>
            {credentials.map((cred, index) => (
                <div key={index} className={styles.block}>
                    <div className={styles.label}>Username</div>
                    <div className={styles.row}>
                        <span className={styles.text}>{cred.username}</span>
                        <button
                            className={styles.copyBtn}
                            type="button"
                            onClick={() => copyToClipboard(cred.username)}
                        >
                            <span className={styles.copyBtnText}>Copy</span>
                        </button>
                    </div>
                    <div className={styles.label}>Password</div>
                    <div className={styles.row}>
                        <span className={styles.text}>
                            {showPassword[index] ? cred.password : "*".repeat(cred.password.length)}
                        </span>
                        <button
                            className={styles.copyBtn}
                            type="button"
                            onClick={() => copyToClipboard(cred.password)}
                        >
                            <span className={styles.copyBtnText}>Copy</span>
                        </button>
                        <button
                            className={styles.toggleBtn}
                            type="button"
                            onClick={() => toggleShowPassword(index)}
                        >
                            <span className={styles.toggleBtnText}>
                                {showPassword[index] ? "Hide" : "Show"}
                            </span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CredentialBlocks;
