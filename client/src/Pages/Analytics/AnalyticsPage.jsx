import { useContext } from 'react'
import { QuizzieContext } from '../../App';
import styles from './Analytics.module.css';
import Sidebar from '../../components/Sidebar/Sidebar'
import Analytics from '../../components/Analytics/Analytics'

const AnalyticsPage = () => {
    
  const {selectedItem, setSelectedItem, setIsOpen, quizType, quiz_id} = useContext(QuizzieContext);

  return (
    <div className={styles.dashboardContainer}>
        <Sidebar
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onOpenModal={() => setIsOpen(true)}
        />
        <>
        {selectedItem === "Analytics" && (
            <Analytics
              quizType={quizType}
              quiz_id={quiz_id}
            />
          )}
        </>
    </div>
  )
}

export default AnalyticsPage