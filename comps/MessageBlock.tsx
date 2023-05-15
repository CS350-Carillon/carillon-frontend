import styles from "./MessageBlock.module.css"
import profilepic from "../public/defaultprofile.png"

export default function MessageBlock() {
    return (
        <div className={styles.format}>
            {/* <img src={profilepic} /> */}
            <div className={styles.text}>
                <div className={styles.block}>
                    <div style={{display:'flex', flexDirection:"row", gap:"10px"}}>
                        <div> Yumin </div>
                        <div> date </div>
                    </div>
                    <div> delete button </div>
                </div>
                <div> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </div>
                <div className={styles.block}>
                    <div> more responses</div>
                    <div> reaction</div>
                </div>
            </div>
        </div>
    )
}