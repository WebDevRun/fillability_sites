import descriptionsStyles from './Descriptions.module.scss'

function Descriptions({ descriptions }) {
  const [head, ...body] = descriptions

  return (
    <table className={descriptionsStyles.table}>
      <thead className={descriptionsStyles.table__head}>
        <tr>
          <th>{head.subchapterName}</th>
          <th>{head.filledPercent}</th>
          <th>{head.noFilledFields}</th>
        </tr>
      </thead>
      <tbody>
        {body.map((elems, index) => {
          return (
            <tr key={index}>
              <td>{elems.subchapterName}</td>
              <td>{elems.filledPercent}</td>
              <td>{elems.noFilledFields}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Descriptions
