import usedPhrases from '../utils/usedPhrases'
import footerStyles from './Footer.module.scss'

function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footer__author}>
        {usedPhrases.footer.author}
      </div>
      <div>{usedPhrases.footer.createDate}</div>
    </footer>
  )
}

export default Footer
