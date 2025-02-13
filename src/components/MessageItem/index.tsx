import { Message } from "../../pages/Chat"
import "./message.css"

interface Props {
    data: Message;
    isMine: boolean;
}

export const MessageItem = ({ data: { date, userName, message }, isMine }: Props) => {

    const parseDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    return(
        <li 
            className={`message ${isMine ? "right" : ""}`}
        >
            <small className="name" >{userName}</small>
            <p>{message}</p>
            <small className="time">{parseDate(date)}</small>
        </li>
    )
}