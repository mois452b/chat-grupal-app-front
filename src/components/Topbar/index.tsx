import { ButtonWithIcon } from "../ButtonWithIcon"
import styles from "./topbar.module.css"

interface Props {
    name: string;
}

export const Topbar = ({ name }: Props) => {
    return(
        <div className={styles.topbar}>
            <ButtonWithIcon icon="back" />

            <h3 className={styles.userName}>{name}</h3>

            <ButtonWithIcon icon="call" />

        </div>
    )
}