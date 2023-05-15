import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import styles from './SideBar.module.css';

export default function SideBar({ children }: { children: React.ReactNode }) {
    const [check, setCheck] = useState("false");
    useEffect(() => {
        if (check == "false") {
            var dropdown = document.getElementsByClassName(styles["dropdown-btn"]);
            var v = dropdown[0]

            v.addEventListener("click", () => {
                var dropdownContent = v.nextElementSibling as HTMLElement;
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                } else {
                    dropdownContent.style.display = "block";
                }
            });


            var dropdown2 = document.getElementsByClassName(styles["dropdown-btn2"]);

            var v2 = dropdown2[0]
            dropdown2[0].addEventListener("click", () => {
                var dropdownContent2 = v2.nextElementSibling as HTMLElement;
                if (dropdownContent2.style.display === "block") {
                    dropdownContent2.style.display = "none";
                } else {
                    dropdownContent2.style.display = "block";
                }
            });

            var dropdown3 = document.getElementsByClassName(styles["dropdown-btn3"]);
            var v3 = dropdown3[0]
            dropdown3[0].addEventListener("click", () => {
                var dropdownContent3 = v3.nextElementSibling as HTMLElement;
                if (dropdownContent3.style.display === "block") {
                    dropdownContent3.style.display = "none";
                } else {
                    dropdownContent3.style.display = "block";
                }
            });
        }
        setCheck("true")
    })


    return (
        <html>
            <body>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <Link className={styles["title"]} href="/workspace"> Carrilon </Link>
                        <div className={styles["sidenav"]}>
                            <button className={styles["dropdown-btn2"]}>
                                Workspace
                                <i className={styles["fa fa-caret-down"]}></i>
                            </button>
                            <div className={styles["dropdown-container2"]}>
                                <a href="/workspace/cs350" className={styles.content}>CS350</a>
                            </div>

                            <button className={styles["dropdown-btn3"]}>
                                Channel
                                <i className={styles["fa fa-caret-down"]}></i>
                            </button>
                            <div className={styles["dropdown-container3"]}>
                                <a href="/workspace/cs350/channel1" className={styles.content}>Channel1</a>
                            </div>

                            <button className={styles["dropdown-btn"]}>
                                Direct Message
                                <i className={styles["fa fa-caret-down"]}></i>
                            </button>
                            <div className={styles["dropdown-container"]}>
                                <a href="/workspace/cs350/Susan" className={styles.content}>Sunsan</a>
                                <a href="/workspace/cs350/Tom" className={styles.content}>Tom</a>
                                <a href="/workspace/cs350/Jimmy" className={styles.content}>Jimmy</a>
                            </div>
                            <a href="/workspace/myinfo">My Information</a>
                        </div>
                    </div>
                    <div style={{ position: 'relative', width: '100%', display: 'flex', marginTop: '60px', height: "85vh" }}>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    )
}