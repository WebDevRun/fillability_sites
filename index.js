'use strict'

const schoolsRequisites = [
  {
    name: 'МБОУ "Анчулская НОШ"',
    host: 'http://anchulschool.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБОУ "Малоарбатская СОШ"',
    host: 'https://malarbat.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБОУ "Большесейская СОШ"',
    host: 'https://bseya-sosh.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБОУ "Арбатская СОШ"',
    host: 'https://arbatschool.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБОУ "Бутрахтинская СОШ"',
    host: 'http://school-19-217.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБОУ "Верх-Таштыпская СОШ"',
    host: 'https://verhtashtip.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБОУ "Имекская СОШ"',
    host: 'https://school-imek.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБОУ "Матурская СОШ"',
    host: 'http://school-226.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБОУ "ТСШ №2"',
    host: 'http://tashtip-skola2.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБОУ "Таштыпская школа-интернат №1"',
    host: 'http://www.nashatoshi-1.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБОУ "Нижнесирская ООШ"',
    host: 'http://school-n-sir.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБДОУ детский сад "Рябинушка"',
    host: 'http://tashtyprjabinka.caduk.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБДОУ детский сад "Колосок"',
    host: 'http://kolosok-imek-moy.edusite.ru',
    path: '/sveden/stat.html'
  },
  {
    name: 'МБУ ДО "Таштыпский ЦДТ"',
    host: 'http://tashtyp-cdt.edusite.ru',
    path: '/sveden/stat.html'
  }
]

const usedPhrases = {
  author: 'Карамашев Леонид Петрович',
  createDate: '2022',
  filledIn: '100%'
}

const controlTools = [
  {
    name: 'select',
    classList: 'controlPanel__select',
    options: ['Все', 'Не заполненные', 'Заполненные'],
    selectText: 'Показать'
  }
]

const schoolsData = {}

class DataFromServer {
  static async getData (url) {
    try {
      const response = await fetch(url)
      if (response.ok) return await response.text()
      throw new Error(`${response.status}: ${response.statusText}`)
    } catch (error) {
      return new Error(`Нет доступа к сайту: ${url}`)
    }
  }
}

class Parser {
  static createDOM (HTMLText) {
    const parser = new DOMParser()
    const html = parser.parseFromString(HTMLText, 'text/html')
    return html
  }

  static selectTextContent (DOMElement) {
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

  static getPercentages (schoolData) {
    return schoolData.reduce((acc, item) => {
      item.filledData.forEach((elem) => {
        const percent = Number(elem.filledPercent.slice(0, -1))
        if (!isNaN(percent)) acc.push(percent)
      })
      return acc
    }, [])
  }
}

class CalcValues {
  constructor (array) {
    this.array = array
  }

  max () {
    return Math.max(...this.array)
  }

  avg (toFixedValue) {
    const sum = this.array.reduce((acc, value) => acc + value)
    const strValue = (sum / this.array.length).toFixed(toFixedValue)
    return Number(strValue)
  }

  min () {
    return Math.min(...this.array)
  }
}

class HTMLElement {
  static create (tagName = 'div', classList = '', text = '') {
    const tag = document.createElement(tagName)

    if (typeof classList === 'string') {
      tag.classList.add(classList)
    } else {
      classList.forEach((classItem) => tag.classList.add(classItem))
    }

    tag.textContent = text

    return tag
  }
}

class HTMLFragment extends HTMLElement {
  static createLoader (className = '', text) {
    return this.create('div', [className, 'loader'])
  }

  static createSelectTag (classNameSelect = '', optionValues) {
    const select = this.create(
      'select',
      classNameSelect
    )

    optionValues.forEach((value) => {
      const optionTag = this.create(
        'option',
        'controlPanel__option',
        value
      )

      select.appendChild(optionTag)
    })

    return select
  }

  static createControlPanel (classList = '', controlTools) {
    const controlPanel = this.create(
      'div',
      [classList, 'controlPanel']
    )

    controlTools.forEach((tool) => {
      let toolTag
      if (tool.name === 'select') {
        toolTag = this.createSelectTag(tool.classList, tool.options)
      }
      controlPanel.appendChild(toolTag)
    })

    return controlPanel
  }

  static createTable (classList = '', content) {
    const table = this.create('table', [classList, 'table'])
    const thead = this.create('thead', 'table__thead')
    const tbody = this.create('tbody', 'table__tbody')

    content.forEach((item, index) => {
      const tr = this.create('tr', 'teable__row')

      if (index === 0) {
        const thChapter = this.create(
          'th',
          'table__chapterName',
          item.subchapterName
        )
        const thFilledPercent = this.create(
          'th',
          'table__filledPercent',
          item.filledPercent
        )
        const thNoFilledFields = this.create(
          'th',
          'table__noFilledFields',
          item.noFilledFields
        )

        tr.appendChild(thChapter)
        tr.appendChild(thFilledPercent)
        tr.appendChild(thNoFilledFields)
        thead.appendChild(tr)
        return
      }

      const tdChapter = this.create(
        'td',
        'table__chapterName',
        item.subchapterName
      )
      const tdFilledPercent = this.create(
        'td',
        'table__filledPercent',
        item.filledPercent
      )
      const tdNoFiiledFields = this.create(
        'td',
        'table__noFilledFields',
        item.noFilledFields
      )

      tr.appendChild(tdChapter)
      tr.appendChild(tdFilledPercent)
      tr.appendChild(tdNoFiiledFields)
      tbody.appendChild(tr)
    })

    table.appendChild(thead)
    table.appendChild(tbody)

    return table
  }

  static createDetails (classList = '', content) {
    const { schoolName, schoolData } = content
    const percentages = Parser.getPercentages(schoolData)
    const details = this.create(
      'details',
      [classList, 'details']
    )
    const summary = this.create(
      'summary',
      ['details__summary', 'summary']
    )
    const schoolNameTag = this.create(
      'p',
      'summary__schoolName',
      schoolName
    )
    const percentagesStatusBar = this.createPercentagesStatus(
      'summary__statusBar',
      percentages
    )

    summary.appendChild(schoolNameTag)
    summary.appendChild(percentagesStatusBar)
    details.appendChild(summary)

    schoolData.forEach((schoolInfomation) => {
      const { titleContent, filledData } = schoolInfomation
      const detailChapter = this.create(
        'div',
        ['details_chapter', 'chapter']
      )
      const headText = this.create(
        'p',
        'chapter__titleContent',
        titleContent
      )
      const tableFragment = this.createTable('chapter__table', filledData)

      detailChapter.appendChild(headText)
      detailChapter.appendChild(tableFragment)
      details.appendChild(detailChapter)
    })

    return details
  }

  static createPercentagesStatus (classList = '', values) {
    const calcValues = new CalcValues(values)
    const calcTag = this.create('div', [classList, 'statusBar'])
    const maxTag = this.create(
      'p',
      'statusBar__max',
      `макс: ${calcValues.max()}%`
    )
    const avgTag = this.create(
      'p',
      'statusBar__avg',
      `ср: ${calcValues.avg(2)}%`
    )
    const minTag = this.create(
      'p',
      'statusBar__min',
      `мин: ${calcValues.min()}%`
    )

    calcTag.appendChild(maxTag)
    calcTag.appendChild(avgTag)
    calcTag.appendChild(minTag)

    return calcTag
  }
}

class DetailElement {
  static getFilledInElements (schoolsData, param, isInversion = false) {
    const filledInSchoolData = {}

    for (const schoolData in schoolsData) {
      filledInSchoolData[schoolData] = schoolsData[schoolData]
        .map((chapter) => {
          const filledInData = chapter.filledData.filter((subchapter, index) => {
            if (!index) return true
            if (isInversion) return subchapter.filledPercent !== param
            return subchapter.filledPercent === param
          })

          return { titleContent: chapter.titleContent, filledData: filledInData }
        })
        .filter((chapter) => chapter.filledData.length > 1)
    }

    return filledInSchoolData
  }
}

window.addEventListener('load', async () => {
  const footer = document.querySelector('.footer')
  const main = document.querySelector('.main')
  const loader = HTMLFragment.createLoader('main__loader')
  main.append(loader)

  const footerText = HTMLElement.create(
    'p',
    ['footer__text', 'text'],
    `${usedPhrases.author}, ${usedPhrases.createDate}-${new Date().getFullYear()}`
  )

  footer.append(footerText)

  const cloneMain = main.cloneNode(false)
  const controlFragment = HTMLFragment.createControlPanel(
    'main__controlPanel',
    controlTools
  )

  cloneMain.append(controlFragment)

  const detailsWrapper = HTMLElement.create(
    'div',
    ['main_detailsWrapper', 'detailsWrapper']
  )

  for await (const school of schoolsRequisites) {
    const htmlString = await DataFromServer.getData(
          `${school.host}${school.path}`
    )

    if (htmlString instanceof Error) {
      const errorMessageTag = HTMLElement.create(
        'p',
        'main__error',
            `${school.name}. ${htmlString.message}`
      )

      main.appendChild(errorMessageTag)
      return
    }

    const htmlDOM = Parser.createDOM(htmlString)
    const fieldsetNodes = htmlDOM.querySelectorAll('fieldset')
    const fieldsetArray = Array.from(fieldsetNodes)
    const schoolData = Parser.selectTextContent(fieldsetArray)
    schoolsData[school.name] = schoolData
    const details = HTMLFragment.createDetails(
      'detailsWrapper__details',
      { schoolName: school.name, schoolData }
    )

    detailsWrapper.append(details)
  }

  cloneMain.append(detailsWrapper)
  main.replaceWith(cloneMain)

  const selectTag = cloneMain.querySelector('select.controlPanel__select')
  const [all, unfilled, filledIn] = controlTools[0].options

  selectTag.addEventListener('change', (event) => {
    let findSchoolsData

    switch (event.target.value) {
      case unfilled: {
        findSchoolsData = DetailElement.getFilledInElements(
          schoolsData,
          usedPhrases.filledIn,
          true
        )
        break
      }
      case filledIn: {
        findSchoolsData = DetailElement.getFilledInElements(
          schoolsData,
          usedPhrases.filledIn
        )
        break
      }
      case all:
      default:
        findSchoolsData = schoolsData
        break
    }

    const cloneDetailsWrapper = detailsWrapper.cloneNode(false)

    for (const school in findSchoolsData) {
      const details = HTMLFragment.createDetails(
        'detailsWrapper__details',
        { schoolName: school, schoolData: findSchoolsData[school] }
      )

      cloneDetailsWrapper.append(details)
    }

    cloneMain.lastChild.replaceWith(cloneDetailsWrapper)
  })
})
