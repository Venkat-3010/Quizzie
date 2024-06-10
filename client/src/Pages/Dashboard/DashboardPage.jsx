import { useContext } from 'react'
import { QuizzieContext } from '../../App';
import styles from './Dashboard.module.css';
import Sidebar from '../../components/Sidebar/Sidebar'
import Dashboard from '../../components/Dashboard/Dashboard'

const DashboardPage = () => {

  const {selectedItem, setSelectedItem, setIsOpen} = useContext(QuizzieContext)

  return (
    <div className={styles.dashboardContainer}>
        <Sidebar
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onOpenModal={() => setIsOpen(true)}
        />
        <>
        {selectedItem === "Dashboard" && <Dashboard />}
        </>
    </div >
  )
}

export default DashboardPage