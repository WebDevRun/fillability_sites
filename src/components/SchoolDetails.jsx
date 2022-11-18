import { useState } from 'react'
import Checkbox from './Checkbox'
import Chart from './Chart'
import Descriptions from './Descriptions'
import schoolDetailsStyles from './SchoolDetails.module.scss'

function SchoolDetails({ schoolName, parsedPages }) {
  const [checked, setChecked] = useState(false)
  const chartData = parsedPages.reduce(
    (acc, page) => {
      acc.labels.push(page.titleContent)
      acc.data.push(parseInt(page.filledData.at(-1).filledPercent))
      return acc
    },
    {
      labels: [],
      data: [],
    },
  )

  const checkedHandler = () => setChecked(!checked)

  return (
    <details className={schoolDetailsStyles.details}>
      <summary
        className={`${schoolDetailsStyles.details__summary} ${schoolDetailsStyles.summary}`}
      >
        <h2>{schoolName}</h2>
        <Checkbox checkedHandler={checkedHandler} />
      </summary>
      {checked ? (
        <Chart chartData={chartData} />
      ) : (
        parsedPages.map((page, index) => {
          return (
            <article key={index} className={schoolDetailsStyles.article}>
              <h3 className={schoolDetailsStyles.article__title}>
                {page.titleContent}
              </h3>
              <Descriptions descriptions={page.filledData} />
            </article>
          )
        })
      )}
    </details>
  )
}

export default SchoolDetails
