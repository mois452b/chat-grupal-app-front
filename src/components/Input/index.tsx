import { CSSProperties } from "react";
import styles from "./input.module.css"

interface Props {
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
    style?: CSSProperties;
    placeholder?: string;
}

export const Input = ({ value, onChange, className, style, placeholder }: Props) => {
    return(
        <input 
            value={value}
            onChange={onChange}
            className={`${styles.input} ${className}`}
            style={style}
            placeholder={placeholder}
        />
    )
}