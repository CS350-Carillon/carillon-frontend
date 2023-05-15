import Link from 'next/link';
import styles from "./auth.module.css";

export default function Login() {
    return (
        <div className={styles.format}>
            <div className={styles.title}> Login </div>
            <form action="/send-data-here" method="post" className={styles.inputsection}>
                <div className={styles.inputoneline}>
                    <label >ID</label>
                    <input className={styles.inputstyle} type="text" placeholder="ID" id="id" name="id" />
                </div>
                <div className={styles.inputoneline}>
                    <label>Password</label>
                    <input className={styles.inputstyle} type="text" placeholder="Password" id="pwd" name="pwd" />
                </div>
                <button type="submit" className={styles.submitbutton}> Login </button>
                <Link href="/signup" className={styles.submitbutton}> SignUp </Link>
            </form >
            
        </div >
    )
}