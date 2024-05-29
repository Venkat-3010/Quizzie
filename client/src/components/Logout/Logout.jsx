import styles from './Logout.module.css';

const Logout = ({onClick}) => {
  return (
    <div className={styles.logoutContainer} onClick={onClick}>
      <b className={styles.logout}>Logout</b>
    </div>
  )
}

export default Logout