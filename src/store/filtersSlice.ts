import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type ToneFilter = 'all' | 'dark' | 'light'

type FiltersState = {
  shapes: {
    circle: boolean
    square: boolean
  }
  colors: {
    red: boolean
    green: boolean
    blue: boolean
    yellow: boolean
  }
  tone: ToneFilter
  columns: number
}

const initialState: FiltersState = {
  shapes: {
    circle: true,
    square: true,
  },
  colors: {
    red: true,
    green: true,
    blue: true,
    yellow: true,
  },
  tone: 'all',
  columns: 4,
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleShape(state, action: PayloadAction<'circle' | 'square'>) {
      state.shapes[action.payload] = !state.shapes[action.payload]
    },
    toggleColor(state, action: PayloadAction<'red' | 'green' | 'blue' | 'yellow'>) {
      state.colors[action.payload] = !state.colors[action.payload]
    },
    setTone(state, action: PayloadAction<ToneFilter>) {
      state.tone = action.payload
    },
    setColumns(state, action: PayloadAction<number>) {
      const next = Math.max(1, Math.min(8, action.payload))
      state.columns = Number.isFinite(next) ? next : 1
    },
  },
})

export const { toggleShape, toggleColor, setTone, setColumns } = filtersSlice.actions

export default filtersSlice.reducer
