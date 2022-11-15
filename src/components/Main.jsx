import ErrorElement from './ErrorElement'
import SchoolDetails from './SchoolDetails'
import usedPhrases from '../utils/usedPhrases'
import mainStyles from './Main.module.scss'

function Main({ schoolsPages, isLoading }) {
  if (isLoading) {
    return (
      <main className={mainStyles.main}>
        <div className={mainStyles.loader}>
          <div className={mainStyles.loader__round}></div>
        </div>
      </main>
    )
  }

  return (
    <main className={mainStyles.main}>
      {schoolsPages.map((schoolPage, index) => {
        if (!Array.isArray(schoolPage.page))
          return (
            <ErrorElement
              key={index}
              errorMessage={`${usedPhrases.error.notLinked} ${schoolPage.schoolName}: ${schoolPage.schoolUrl}`}
            />
          )
        return (
          <SchoolDetails
            key={index}
            schoolName={schoolPage.schoolName}
            parsedPages={schoolPage.page}
          />
        )
      })}
    </main>
  )
}

export default Main
