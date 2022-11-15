import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStatisticsPages } from '../store/schools'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import MainLayoutStyles from './MainLayout.module.scss'

function MainLayout() {
  const dispatch = useDispatch()
  const { schoolsPages, isLoading } = useSelector((state) => state.schools)

  useEffect(() => {
    dispatch(fetchStatisticsPages())
  }, [])

  return (
    <div className={MainLayoutStyles.wrapper}>
      <Header />
      <Main schoolsPages={schoolsPages} isLoading={isLoading} />
      <Footer />
    </div>
  )
}

export default MainLayout
