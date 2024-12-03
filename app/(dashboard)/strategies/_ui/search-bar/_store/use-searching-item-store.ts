import { create } from 'zustand'

import { AlgorithmItemType, RangeModel, SearchTermsModel } from '../_type/search'
import { isRangeModel } from '../_utils/type-validate'
import { PANEL_MAPPING } from '../panel-mapping'

interface StateModel {
  searchTerms: SearchTermsModel
  errOptions: (keyof SearchTermsModel)[] | null
}

interface ActionModel {
  setAlgorithm: (algorithm: AlgorithmItemType) => void
  setPanelItem: (key: keyof SearchTermsModel, item: string) => void
  setRangeValue: (key: keyof SearchTermsModel, type: keyof RangeModel, value: number) => void
  setSearchWord: (searchWord: string) => void
  resetState: () => void
  validateRangeValues: () => void
}

interface ActionsModel {
  actions: ActionModel
}

const initialState = {
  searchWord: null,
  tradeTypeNames: null,
  operationCycles: null,
  stockTypeNames: null,
  durations: null,
  profitRanges: null,
  principalRange: null,
  mddRange: null,
  smScoreRange: null,
  algorithmType: null,
}

const useSearchingItemStore = create<StateModel & ActionsModel>((set, get) => ({
  searchTerms: {
    ...initialState,
  },
  errOptions: null,

  actions: {
    setAlgorithm: (algorithm) =>
      set((state) => ({
        searchTerms: { ...state.searchTerms, algorithmType: algorithm },
      })),

    setPanelItem: (key, item) =>
      set((state) => {
        const mappingItem = PANEL_MAPPING[key]?.[item] || item
        const currentItems = state.searchTerms[key]
        if (Array.isArray(currentItems)) {
          const updatedItems = currentItems.includes(mappingItem)
            ? currentItems.filter((i) => i !== mappingItem)
            : [...currentItems, mappingItem]
          return { searchTerms: { ...state.searchTerms, [key]: [...updatedItems] } }
        }
        return { searchTerms: { ...state.searchTerms, [key]: [mappingItem] } }
      }),

    setRangeValue: (key, type, value) =>
      set((state) => ({
        searchTerms: {
          ...state.searchTerms,
          [key]: { ...(state.searchTerms[key] as RangeModel), [type]: value },
        },
      })),

    setSearchWord: (searchWord) =>
      set((state) => ({
        searchTerms: {
          ...state.searchTerms,
          searchWord,
        },
      })),

    resetState: () => set(() => ({ searchTerms: { ...initialState }, errOptions: [] })),

    validateRangeValues: () => {
      const { searchTerms } = get()
      const rangeOptions: (keyof SearchTermsModel)[] = [
        'principalRange',
        'mddRange',
        'smScoreRange',
      ]
      const errOptions = rangeOptions.filter((option) => {
        const value = searchTerms[option]
        if (value !== null && isRangeModel(value)) {
          return value.min > value.max
        }
        return false
      })
      set({ errOptions })
    },
  },
}))

export default useSearchingItemStore
