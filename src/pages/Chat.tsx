import { useEffect, useRef, useState } from "react";
import { Input } from "../components/Input";
import styles from "./chat.module.css";
import { Topbar } from "../components/Topbar";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import { MessageItem } from "../components/MessageItem";

interface User {
    userId: string;
    userName: string;
}

export interface Message {
    message: string;
    date: string;
    userId: string;
    userName: string
}

function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");
    const [userName, setUserName] = useState("")
    const [_, setUsers] = useState<User[]>([])

    const ref = useRef<HTMLElement>(null)

    const navigate = useNavigate()

    useEffect( () => {
        const userName = sessionStorage.getItem("userName")
        if( !userName ) {
            navigate("/")
            return
        }
        setUserName(userName)

        socket.emit("user-connected", { userName })
    }, [])

    useEffect( () => {
        socket.on("user-connected", async ({ userId, userName, allUsersInChat }) => {
            setUsers( prev => [...prev, { userId, userName }])
            if( userId === socket.id ) {
                setUsers( prev => [...prev, ...allUsersInChat])
            }
        })

        socket.on("user-disconnected", ({ userId }) => {
            setUsers( prevUsers => prevUsers.filter( user => user.userId !== userId ) )
        })

        socket.on("message", ({ message, date, userId, userName }: Message) => {
            setMessages((prev) => [
                ...prev, 
                { 
                    message, 
                    date, 
                    userId, 
                    userName
                }
            ])
        })

        return () => {
            socket.off("user-connected")
            socket.off("user-disconnected")
            socket.off("message")
        }
    }, [])

    useEffect( () => {
        ref.current?.scrollTo( 0, ref.current?.scrollHeight );

    }, [messages])

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if( message === "" ) return
        socket.emit("message", { message, date: Date(), userId: socket.id, userName })
        setMessage("")
    };

    return (
        <div className={styles.container}>
            <section className={styles.chat} ref={ref}>

                <Topbar name={userName} />
                <ul className={styles.messages}>
                    {messages.map((message, index) => (
                        <MessageItem data={message} isMine={message.userId === socket.id} key={index} />
                    ))}
                </ul>
                <form className={styles.form} onSubmit={onSubmit}>
                    <Input
                        placeholder="message"
                        className={styles.input}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <ButtonWithIcon icon="send" size={40} color="white" style={{ backgroundColor: "green", padding: 8 }} />
                </form>
            </section>
        </div>
    );
}

export default Chat;
