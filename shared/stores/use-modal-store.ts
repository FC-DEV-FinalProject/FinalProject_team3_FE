import { create } from 'zustand'

interface ModalStoreModel {
  isModalOpen: boolean
  openModal: () => void
  onCloseModal: () => void
}

export const useModalStore = create<ModalStoreModel>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  onCloseModal: () => set({ isModalOpen: false }),
}))
