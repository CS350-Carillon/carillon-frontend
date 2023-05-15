import styles from './LeftBar.module.css';
import React, { useEffect } from 'react';

export default function SideBar() {
    useEffect(() => {
        if (typeof document !== 'undefined') {
            var dropdown = document.getElementsByClassName(styles["dropdown-btn"]);
            var i;

            for (i = 0; i < dropdown.length; i++) {
                console.log(dropdown[i])
                var v = dropdown[i]
                dropdown[i].addEventListener("click", () => {
                    var dropdownContent = v.nextElementSibling;
                    if (dropdownContent.style.display === "block") {
                        dropdownContent.style.display = "none";
                    } else {
                        dropdownContent.style.display = "block";
                    }
                });
            }
        }
        
        if (typeof document !== 'undefined') {
            var dropdown2 = document.getElementsByClassName(styles["dropdown-btn2"]);
            var i;

            for (i = 0; i < dropdown2.length; i++) {
                console.log(dropdown2[i])
                var v2 = dropdown2[i]
                dropdown2[i].addEventListener("click", () => {
                    var dropdownContent2 = v2.nextElementSibling;
                    if (dropdownContent2.style.display === "block") {
                        dropdownContent2.style.display = "none";
                    } else {
                        dropdownContent2.style.display = "block";
                    }
                });
            }
        }

        if (typeof document !== 'undefined') {
            var dropdown3 = document.getElementsByClassName(styles["dropdown-btn3"]);
            var i;

            for (i = 0; i < dropdown3.length; i++) {
                console.log(dropdown3[i])
                var v3 = dropdown3[i]
                dropdown3[i].addEventListener("click", () => {
                    var dropdownContent3 = v3.nextElementSibling;
                    if (dropdownContent3.style.display === "block") {
                        dropdownContent3.style.display = "none";
                    } else {
                        dropdownContent3.style.display = "block";
                    }
                });
            }
        }
    })


    return (
        <div>
            <div className={styles["title"]}> Carrilon </div>
            <div className={styles["sidenav"]}>
                <button className={styles["dropdown-btn2"]}>
                    Workspace
                    <i className={styles["fa fa-caret-down"]}></i>
                </button>
                <div className={styles["dropdown-container2"]}>
                    <a href="#cs350" className={styles.content}>CS350</a>
                </div>

                <button className={styles["dropdown-btn3"]}>
                    Channel
                    <i className={styles["fa fa-caret-down"]}></i>
                </button>
                <div className={styles["dropdown-container3"]}>
                    <a href="#cs350/channel1" className={styles.content}>Channel1</a>
                </div>

                <button className={styles["dropdown-btn"]}>
                    Direct Message
                    <i className={styles["fa fa-caret-down"]}></i>
                </button>
                <div className={styles["dropdown-container"]}>
                    <a href="#cs350/Susan" className={styles.content}>Sunsan</a>
                    <a href="#cs350/Tom" className={styles.content}>Tom</a>
                    <a href="#cs350/Jimmy" className={styles.content}>Jimmy</a>
                </div>
                <a href="#contact">My Information</a>
            </div>
        </div>
    )
}