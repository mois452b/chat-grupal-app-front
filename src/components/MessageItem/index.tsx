import "./message.css"

type Props = {
    data: typeMessage;
    isMine: boolean;
}

export const MessageItem = ({ data: { date, username, content }, isMine }: Props) => {

    const parseDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    return(
        <li 
            className={`message ${isMine ? "right" : ""}`}
        >
            <small className="name" >{username}</small>
            <p>{content}</p>
            <small className="time">{parseDate(date)}</small>
        </li>
    )
}