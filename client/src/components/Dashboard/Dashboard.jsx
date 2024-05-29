import styles from './Dashboard.module.css'
import Sidebar from '../Sidebar/Sidebar'

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.dashboard}>
        <h1>Dashboard</h1>
        <p>This is the dashboard page</p>
      </div>
    </div>
  )
}

export default Dashboard