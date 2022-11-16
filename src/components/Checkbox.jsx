import { useEffect, useState } from 'react'
import checkboxStyles from './Checkbox.module.scss'

function Checkbox({ checkedHandler }) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    checkedHandler(checked)
  }, [checked])

  return (
    <>
      <label className={checkboxStyles.label}>
        <input
          checked={checked}
          onChange={() => {
            setChecked(!checked)
          }}
          type="checkbox"
          name="switch"
          id="switch"
          className={checkboxStyles.switch}
        />
        <span className={checkboxStyles.slider}></span>
      </label>
    </>
  )
}

export default Checkbox
