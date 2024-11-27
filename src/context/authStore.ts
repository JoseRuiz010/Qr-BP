import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  token: string|null
  user:any|null
  isAuth:boolean,
  loading:boolean,
  error:string|null
  setLoading: () => void
  setError: (error:string) => void
  login: (token:string, user:any) => void
  logout: () => void
}

export const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuth:false,
      loading: false,
      error: null,
      setLoading: () => set({ loading: true,isAuth:false, error: null }),
      setError: (error) => set({ error, loading: false }),
      login: (token, user) => set({ token, user,isAuth:true, loading: false }),
      logout: () => {
        set({ token: null, user:null, isAuth:false, loading: false });        
      },
    }),
    {
      name: 'auth-storage',
      //no guadar el usuario
       }
  )
);