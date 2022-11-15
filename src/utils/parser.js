export class Parser {
  static createDOM(HTMLText) {
    const parser = new DOMParser()
    const html = parser.parseFromString(HTMLText, 'text/html')
    return html
  }

  static selectTextContent(DOMElement) {
    return DOMElement.reduce((acc, elem) => {
      const titleContent = elem.querySelector('legend').textContent.trim()
      const tableRows = elem.querySelectorAll('div.tr')
      const filledData = Array.from(tableRows).reduce((array, elem) => {
        const obj = {}

        obj.subchapterName = elem.children[0].textContent.trim()
        obj.filledPercent = elem.children[1].textContent.trim()
        obj.noFilledFields = elem.children[2].textContent.trim()

        array.push(obj)
        return array
      }, [])

      acc.push({ titleContent, filledData })
      return acc
    }, [])
  }
}
