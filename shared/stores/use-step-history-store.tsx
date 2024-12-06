import { create } from 'zustand'

interface StateModel {
  stepHistory: string[]
}

interface ActionModel {
  addStep: (step: string) => void
  removeStep: () => void
}
interface ActionsModel {
  actions: ActionModel
}

const useStepHistoryStore = create<StateModel & ActionsModel>((set) => ({
  stepHistory: [],
  actions: {
    addStep: (step) => set((state) => ({ ...state, stepHistory: [...state.stepHistory, step] })),
    removeStep: () => set((state) => ({ ...state, stepHistory: state.stepHistory.slice(1) })),
  },
}))

export default useStepHistoryStore
