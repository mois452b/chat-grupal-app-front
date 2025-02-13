import { CSSProperties } from "react";
import styles from "./button.module.css"

interface Props {
    text: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    style?: CSSProperties;
    disabled?: boolean;
}

export const Button = ({ text, onClick, className, style, disabled }: Props) => {
    return(
        <button
            onClick={onClick}
            className={`${styles.button} ${className}`}
            disabled={disabled}
            style={style}
        >
            {text}
        </button>
    )
}