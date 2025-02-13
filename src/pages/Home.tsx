import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import styles from "./home.module.css"
import { useNavigate } from "react-router-dom"

function Home() {
    const [name, setName] = useState("")
    const navigate = useNavigate()

    useEffect( () => {
        const userName = sessionStorage.getItem("userName")
        if( userName ) {
            navigate("/chat")
        }
    }, [])

    const onSubmit: React.FormEventHandler = (event) => {
        event.preventDefault()
        sessionStorage.setItem("userName", name)
        navigate("/chat")
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.welcomeText}>Welcome to YourChat</div>
                <div className={styles.welcomeText}>an app for chat with any people on the world</div>
            </div>
            
            <form className={styles.form} onSubmit={onSubmit} >
                <Input placeholder="enter your username" value={name} onChange={(e) => setName(e.target.value)} />
                <Button text="Enter" disabled={name.trim() === ""} />
            </form>
            
        </div>
    )
}

export default Home
