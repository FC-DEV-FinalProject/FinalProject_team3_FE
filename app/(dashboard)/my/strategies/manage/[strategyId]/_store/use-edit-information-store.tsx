import { create } from 'zustand'

interface InformationModel {
  strategyName: string | null
  description: string | null
}

interface ProposalModel {
  proposalFile: File | null
  proposalModified: boolean
  proposalFileName: string
}

interface StateModel {
  information: InformationModel
  proposal: ProposalModel
}

interface ActionModel {
  actions: {
    setStrategyName: (name: string) => void
    setDescription: (description: string) => void
    setProposalFile: (file: File | null) => void
    setProposalModified: (modified: boolean) => void
    initializeProposal: (fileName: string) => void
  }
}

const initialState: StateModel = {
  information: {
    strategyName: null,
    description: null,
  },
  proposal: {
    proposalFile: null,
    proposalModified: false,
    proposalFileName: '',
  },
}

const useEditInformationStore = create<StateModel & ActionModel>((set) => ({
  ...initialState,

  actions: {
    setStrategyName: (name) =>
      set((state) => ({
        information: { ...state.information, strategyName: name },
      })),

    setDescription: (description) =>
      set((state) => ({
        information: { ...state.information, description },
      })),

    setProposalFile: (file) =>
      set((state) => ({
        proposal: {
          ...state.proposal,
          proposalFile: file,
          proposalFileName: file?.name || state.proposal.proposalFileName,
          proposalModified: true,
        },
      })),

    setProposalModified: (modified) =>
      set((state) => ({
        proposal: { ...state.proposal, proposalModified: modified },
      })),

    initializeProposal: (fileName) =>
      set((state) => ({
        proposal: {
          ...state.proposal,
          proposalFileName: fileName,
          proposalModified: false,
        },
      })),
  },
}))

export default useEditInformationStore
