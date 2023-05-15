import styles from './auth.module.css'

export default function SignUp() {
  return (
    <div className={styles.format}>
      <div className={styles.title}> SignUp </div>
      <form
        action="/send-data-here"
        method="post"
        className={styles.inputsection}
      >
        <div className={styles.inputoneline}>
          <label for="first">ID</label>
          <input
            className={styles.inputstyle}
            type="text"
            placeholder="ID"
            id="first"
            name="id"
          />
        </div>
        <div className={styles.inputoneline}>
          <label for="first">Password</label>
          <input
            className={styles.inputstyle}
            type="text"
            placeholder="Password"
            id="first"
            name="pwd"
          />
        </div>
        <div className={styles.inputoneline}>
          <label for="first">Name</label>
          <input
            className={styles.inputstyle}
            type="text"
            placeholder="Name"
            id="first"
            name="name"
          />
        </div>
        <button type="submit" className={styles.submitbutton}>
          {' '}
          SignUp{' '}
        </button>
      </form>
    </div>
  )
}
