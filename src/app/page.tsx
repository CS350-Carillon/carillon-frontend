import Link from 'next/link'
import styles from '../pages/auth.module.css'

export default function MainPage() {
  return (
    <div className={styles.format}>
      <div className={styles.title}>Carrillon</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Link href="/login" className={styles.button}>
          {' '}
          Login{' '}
        </Link>
        <Link href="/signup" className={styles.button}>
          {' '}
          SignUp
        </Link>
      </div>
    </div>
  )
}
