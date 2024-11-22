import { create } from 'zustand'

interface BienStore {
  item:any|null
  loading:boolean|null
  error:string|null
  setLoading: () => void
  setError: (error:string) => void
  setData: (item:any) => void
  clear: () => void
}

export const bienStore = create<BienStore>((set) => ({
  item:null,
  loading:null,
  error:null,
  setLoading: () => set({ loading: true, item:null, error:null}),
  setError: (error) => set({ error, loading:false, item:null }),
  setData: (item) => set({ item, loading:false, error:null }),
  clear: () => set({ item:null, loading:false, error:null })
}));