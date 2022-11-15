import usedPhrases from '../utils/usedPhrases'
import headerStyles from './Header.module.scss'

function Header() {
  return (
    <header className={headerStyles.header}>
      <h1>{usedPhrases.header.h1}</h1>
    </header>
  )
}

export default Header
