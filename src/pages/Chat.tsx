import { useEffect, useRef, useState } from "react";
import { Input } from "../components/Input";
import styles from "./chat.module.css";
import { Topbar } from "../components/Topbar";
import { ButtonWithIcon } from "../components/ButtonWithIcon";
import { useNavigate } from "react-router-dom";
import { MessageItem } from "../components/MessageItem";
import Session from "../tools/models/Session";
import Message from "../tools/models/Message";


function Chat() {
    const [messages, setMessages] = useState<typeMessage[]>([]);
    const [message, setMessage] = useState("");
    const [userName, setUserName] = useState("")

    const ref = useRef<HTMLElement>(null)

    const navigate = useNavigate()

    useEffect( () => {
        const username = sessionStorage.getItem("userName")
        if( !username ) {
            navigate("/")
            return
        };

        setUserName(username);

        (async ()=>{
            const [ user ] = await Session.search("username", username)
            if( user ) {
                await Session.put(user.id, { ...user, connected: true })
            }
            else {
                await Session.post({ username, connected: true })
            }
        })()
    }, [])

    useEffect(()=>{
        Session.onChange( (data:any) => {
            console.log( data )
        })
        Message.onChange( (data:any) => {
            setMessages( data )
        })
    },[])


    useEffect( () => {
        ref.current?.scrollTo( 0, ref.current?.scrollHeight );

    }, [messages])

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if( message === "" ) return
        await Message.post({
            content: message,
            date: Date(),
            time: Date.now(),
            username: userName
        })
        
        setMessage("")
    };

    const sortByDate = (msgA:typeMessage, msgB:typeMessage) => {
        return msgA.time > msgB.time ? 1 : -1
    }

    return (
        <div className={styles.container}>
            <section className={styles.chat} ref={ref}>

                <Topbar name={userName} />
                <ul className={styles.messages}>
                    {messages.sort( sortByDate ).map((message, index) => (
                        <MessageItem data={message} isMine={message.username === userName} key={index} />
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
