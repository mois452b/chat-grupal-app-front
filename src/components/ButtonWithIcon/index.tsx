import styles from "./button.module.css"
import { Avatar } from "./icons/Avatar";
import { Back } from "./icons/Back";
import { Call } from "./icons/Call";
import { Send } from "./icons/Send";

interface Props {
    icon: "back" | "send" | "call" | "avatar";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    size?: number;
    color?: string;
}

export const ButtonWithIcon = ({ icon, onClick, className, disabled, style, size=24, color }: Props) => {
    return(
        <button
            onClick={onClick}
            className={`${styles.button} ${className}`}
            disabled={disabled}
            style={{
                ...style,
                width: size,
                height: size,
                color,
            }}
        >
            {icon === "call" && <Call />}
            {icon === "avatar" && <Avatar />}
            {icon === "back" && <Back />}
            {icon === "send" && <Send />}
        </button>
    )
}