import errorElementStyles from './ErrorElement.module.scss'

function ErrorElement({ errorMessage }) {
  return <p className={errorElementStyles.main__error}>{errorMessage}</p>
}

export default ErrorElement
