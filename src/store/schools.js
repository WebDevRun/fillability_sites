import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Parser } from '../utils/parser'
import schoolsRequisites from '../utils/schoolsRequisites'

export const fetchStatisticsPages = createAsyncThunk(
  'schools/fetchStatisticsPages',
  async () => {
    const statisticsPages = []
    const urls = schoolsRequisites.map((item) => item.host + item.path)
    const responses = await Promise.allSettled(urls.map((url) => fetch(url)))

    for (const response of responses) {
      if (response.status === 'fulfilled')
        statisticsPages.push(await response.value.text())
      if (response.status === 'rejected')
        statisticsPages.push({ errorMessage: response.reason.message })
    }

    return statisticsPages
  },
)

const schoolSlice = createSlice({
  name: 'schools',
  initialState: {
    schoolsPages: [],
    isLoading: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatisticsPages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchStatisticsPages.fulfilled, (state, action) => {
        const schoolsData = action.payload.map((item, index) => {
          let parsedPages

          if (item.errorMessage) parsedPages = item.errorMessage
          else {
            const htmlDOM = Parser.createDOM(item)
            const fieldsetNodes = htmlDOM.querySelectorAll('fieldset')
            const fieldsetArray = Array.from(fieldsetNodes)
            parsedPages = Parser.selectTextContent(fieldsetArray)
          }

          return {
            schoolName: schoolsRequisites[index].name,
            schoolUrl: `${schoolsRequisites[index].host}${schoolsRequisites[index].path}`,
            page: parsedPages,
          }
        })

        state.isLoading = false
        state.schoolsPages = schoolsData
      })
  },
})

export default schoolSlice.reducer
