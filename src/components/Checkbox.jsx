import checkboxStyles from './Checkbox.module.scss'

function Checkbox({ checkedHandler }) {
  return (
    <>
      <label className={checkboxStyles.label}>
        <input
          onChange={() => checkedHandler()}
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
