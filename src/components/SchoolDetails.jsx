import Descriptions from './Descriptions'
import schoolDetailsStyles from './SchoolDetails.module.scss'

function SchoolDetails({ schoolName, parsedPages }) {
  return (
    <details className={schoolDetailsStyles.details}>
      <summary
        className={`${schoolDetailsStyles.details__summary} ${schoolDetailsStyles.summary}`}
      >
        <h2>{schoolName}</h2>
      </summary>
      {parsedPages.map((page, index) => {
        return (
          <article key={index} className={schoolDetailsStyles.article}>
            <h3 className={schoolDetailsStyles.article__title}>
              {page.titleContent}
            </h3>
            <Descriptions descriptions={page.filledData} />
          </article>
        )
      })}
    </details>
  )
}

export default SchoolDetails
