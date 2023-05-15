import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './SideBar.module.css'

export default function SideBar({ children }: { children: React.ReactNode }) {
  const [check, setCheck] = useState('false')

  useEffect(() => {
    if (check === 'false') {
      const dropdown = document.getElementsByClassName(styles['dropdown-btn'])
      const v = dropdown[0]

      v.addEventListener('click', () => {
        const dropdownContent = v.nextElementSibling as HTMLElement
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none'
        } else {
          dropdownContent.style.display = 'block'
        }
      })

      const dropdown2 = document.getElementsByClassName(styles['dropdown-btn2'])
      const v2 = dropdown2[0]

      dropdown2[0].addEventListener('click', () => {
        const dropdownContent2 = v2.nextElementSibling as HTMLElement
        if (dropdownContent2.style.display === 'block') {
          dropdownContent2.style.display = 'none'
        } else {
          dropdownContent2.style.display = 'block'
        }
      })

      const dropdown3 = document.getElementsByClassName(styles['dropdown-btn3'])
      const v3 = dropdown3[0]

      dropdown3[0].addEventListener('click', () => {
        const dropdownContent3 = v3.nextElementSibling as HTMLElement
        if (dropdownContent3.style.display === 'block') {
          dropdownContent3.style.display = 'none'
        } else {
          dropdownContent3.style.display = 'block'
        }
      })
    }
    setCheck('true')
  })

  return (
    <html lang="en-us">
      <body>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <Link className={styles['title']} href="/workspace">
              {' '}
              Carrilon{' '}
            </Link>
            <div className={styles['sidenav']}>
              <button type="button" className={styles['dropdown-btn2']}>
                Workspace
                <i className={styles['fa fa-caret-down']}></i>
              </button>
              <div className={styles['dropdown-container2']}>
                <Link href="/workspace/cs350" className={styles.content}>
                  CS350
                </Link>
              </div>

              <button type="button" className={styles['dropdown-btn3']}>
                Channel
                <i className={styles['fa fa-caret-down']}></i>
              </button>
              <div className={styles['dropdown-container3']}>
                <Link
                  href="/workspace/cs350/channel1"
                  className={styles.content}
                >
                  Channel1
                </Link>
              </div>

              <button type="button" className={styles['dropdown-btn']}>
                Direct Message
                <i className={styles['fa fa-caret-down']}></i>
              </button>
              <div className={styles['dropdown-container']}>
                <Link href="/workspace/cs350/Susan" className={styles.content}>
                  Sunsan
                </Link>
                <Link href="/workspace/cs350/Tom" className={styles.content}>
                  Tom
                </Link>
                <Link href="/workspace/cs350/Jimmy" className={styles.content}>
                  Jimmy
                </Link>
              </div>
              <Link href="/workspace/myinfo">My Information</Link>
            </div>
          </div>
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              marginTop: '60px',
              height: '85vh',
            }}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
