import { create } from 'zustand'

interface AuthStore {
  token: string|null
  user:any|null
  loading:boolean
  error:string|null
  setLoading: () => void
  setError: (error:string) => void
  login: (token:string, user:any) => void
  logout: () => void
}

export const authStore = create<AuthStore>((set) => ({
  token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo3LCJub21icmUiOiJBRE1JTklORiIsImFwZWxsaWRvIjoiSU5GT1JNQVRJQ0EiLCJ1c2VybmFtZSI6IkFETUlOSU5GIiwiZXNJbmZvcm1hdGljbyI6dHJ1ZSwicm9sZSI6eyJkZXNjcmlwY2lvbiI6IkFETUlOX1RPRE8iLCJwZXJtaXNvcyI6WyJPQlRFTkVSX1RPRE9TX0FTSUdOQUNJT04iLCJPQlRFTkVSX1VOX0FTSUdOQUNJT04iLCJFRElUQVJfQVNJR05BQ0lPTiIsIkNSRUFSX0FTSUdOQUNJT04iLCJFTElNSU5BUl9BU0lHTkFDSU9OIiwiT0JURU5FUl9UT0RPU19BVURJVE9SSUEiLCJPQlRFTkVSX1RPRE9TX0JJRU4iLCJPQlRFTkVSX1VOX0JJRU4iLCJFRElUQVJfQklFTiIsIkNSRUFSX0JJRU4iLCJFTElNSU5BUl9CSUVOIiwiT0JURU5FUl9UT0RPU19DQVRFR09SSUEiLCJPQlRFTkVSX1VOX0NBVEVHT1JJQSIsIkVESVRBUl9DQVRFR09SSUEiLCJDUkVBUl9DQVRFR09SSUEiLCJFTElNSU5BUl9DQVRFR09SSUEiLCJPQlRFTkVSX1RPRE9TX0RFVEFMTEVfQklFTiIsIk9CVEVORVJfVU5fREVUQUxMRV9CSUVOIiwiRURJVEFSX0RFVEFMTEVfQklFTiIsIkNSRUFSX0RFVEFMTEVfQklFTiIsIkVMSU1JTkFSX0RFVEFMTEVfQklFTiIsIk9CVEVORVJfVE9ET1NfRURJRklDSU8iLCJPQlRFTkVSX1VOX0VESUZJQ0lPIiwiRURJVEFSX0VESUZJQ0lPIiwiQ1JFQVJfRURJRklDSU8iLCJFTElNSU5BUl9FRElGSUNJTyIsIk9CVEVORVJfVE9ET1NfRVNUQURPX0FTSUdOQUNJT04iLCJPQlRFTkVSX1VOX0VTVEFET19BU0lHTkFDSU9OIiwiRURJVEFSX0VTVEFET19BU0lHTkFDSU9OIiwiQ1JFQVJfRVNUQURPX0FTSUdOQUNJT04iLCJFTElNSU5BUl9FU1RBRE9fQVNJR05BQ0lPTiIsIk9CVEVORVJfVE9ET1NfTE9DQUxJREFEIiwiT0JURU5FUl9VTl9MT0NBTElEQUQiLCJFRElUQVJfTE9DQUxJREFEIiwiQ1JFQVJfTE9DQUxJREFEIiwiRUxJTUlOQVJfTE9DQUxJREFEIiwiT0JURU5FUl9JTkZPUk1FX1RYVCIsIk9CVEVORVJfVU5fSU5GT1JNRSIsIk9CVEVORVJfVE9ET1NfRkFDVFVSQSIsIk9CVEVORVJfVU5fRkFDVFVSQSIsIkVESVRBUl9GQUNUVVJBIiwiQ1JFQVJfRkFDVFVSQSIsIkVMSU1JTkFSX0ZBQ1RVUkEiLCJPQlRFTkVSX1RPRE9TX01BUkNBIiwiT0JURU5FUl9VTl9NQVJDQSIsIkVESVRBUl9NQVJDQSIsIkNSRUFSX01BUkNBIiwiRUxJTUlOQVJfTUFSQ0EiLCJPQlRFTkVSX1RPRE9TX01PREVMTyIsIk9CVEVORVJfVU5fTU9ERUxPIiwiRURJVEFSX01PREVMTyIsIkNSRUFSX01PREVMTyIsIkVMSU1JTkFSX01PREVMTyIsIk9CVEVORVJfVE9ET1NfT0ZJQ0lOQSIsIk9CVEVORVJfVU5fT0ZJQ0lOQSIsIkVESVRBUl9PRklDSU5BIiwiQ1JFQVJfT0ZJQ0lOQSIsIkVMSU1JTkFSX09GSUNJTkEiLCJPQlRFTkVSX1RPRE9TX05PTUVOQ0xBRE9SIiwiT0JURU5FUl9VTl9OT01FTkNMQURPUiIsIkVESVRBUl9OT01FTkNMQURPUiIsIkNSRUFSX05PTUVOQ0xBRE9SIiwiRUxJTUlOQVJfTk9NRU5DTEFET1IiLCJPQlRFTkVSX1RPRE9TX1BFUk1JU08iLCJPQlRFTkVSX1VOX1BFUk1JU08iLCJFRElUQVJfUEVSTUlTTyIsIkNSRUFSX1BFUk1JU08iLCJFTElNSU5BUl9QRVJNSVNPIiwiT0JURU5FUl9UT0RPU19QUk9WRUVET1JFUyIsIk9CVEVORVJfVU5fUFJPVkVFRE9SRVMiLCJFRElUQVJfUFJPVkVFRE9SRVMiLCJDUkVBUl9QUk9WRUVET1JFUyIsIkVMSU1JTkFSX1BST1ZFRURPUkVTIiwiT0JURU5FUl9UT0RPU19QUk9WSU5DSUEiLCJPQlRFTkVSX1VOX1BST1ZJTkNJQSIsIkVESVRBUl9QUk9WSU5DSUEiLCJDUkVBUl9QUk9WSU5DSUEiLCJFTElNSU5BUl9QUk9WSU5DSUEiLCJPQlRFTkVSX1RPRE9TX1JPTF9VU1VBUklPIiwiT0JURU5FUl9VTl9ST0xfVVNVQVJJTyIsIkVESVRBUl9ST0xfVVNVQVJJTyIsIkNSRUFSX1JPTF9VU1VBUklPIiwiRUxJTUlOQVJfUk9MX1VTVUFSSU8iLCJFTElNSU5BUl9QRVJNSVNPIiwiT0JURU5FUl9UT0RPU19SVUJST1MiLCJPQlRFTkVSX1VOX1JVQlJPUyIsIkVESVRBUl9SVUJST1MiLCJDUkVBUl9SVUJST1MiLCJFTElNSU5BUl9SVUJST1MiLCJPQlRFTkVSX1RPRE9TX1RJUE9fQVNJR05BQ0lPTiIsIk9CVEVORVJfVU5fVElQT19BU0lHTkFDSU9OIiwiRURJVEFSX1RJUE9fQVNJR05BQ0lPTiIsIkNSRUFSX1RJUE9fQVNJR05BQ0lPTiIsIkVMSU1JTkFSX1RJUE9fQVNJR05BQ0lPTiIsIk9CVEVORVJfVE9ET1NfVFJBTlNGRVJFTkNJQSIsIk9CVEVORVJfVU5fVFJBTlNGRVJFTkNJQSIsIkVESVRBUl9UUkFOU0ZFUkVOQ0lBIiwiQ1JFQVJfVFJBTlNGRVJFTkNJQSIsIkVMSU1JTkFSX1RSQU5TRkVSRU5DSUEiLCJPQlRFTkVSX1RPRE9TX1VTVUFSSU9TIiwiT0JURU5FUl9VTl9VU1VBUklPUyIsIkVESVRBUl9VU1VBUklPUyIsIkNSRUFSX1VTVUFSSU9TIiwiRUxJTUlOQVJfVVNVQVJJT1MiLCJSRVNFVF9QQVNTV09SRF9VU0VSIiwiUkVTVE9SRV9VU0VSIiwiTElTVEFfQklFTiIsIkxJU1RBX0JJRU5fUEFUUklNT05JQUxFUyIsIkxJU1RBX0JJRU5fSU5GT1JNQVRJQ08iLCJMSVNUQV9PUEVSQUNJT05FUyIsIkxJU1RBX1VCSUNBQ0lPTiIsIkxJU1RBX1BST1ZFRURPUkVTIiwiTElTVEFfVVNVQVJJT1MiLCJMSVNUQV9BVURJVE9SSUEiLCJDRVJSQVJfU0VTSU9OIiwiQ1JFQVJfUVIiLCJHRU5FUkFSX1FSIiwiT0JURU5FUl9VTl9RUiIsIk9CVEVORVJfVE9ET1NfRVFVSVBPUyIsIk9CVEVORVJfVU5fRVFVSVBPIiwiRURJVEFSX0VRVUlQTyIsIkNSRUFSX0VRVUlQTyIsIkVMSU1JTkFSX0VRVUlQTyIsIkFHUkVHQVJfQ09NUE9ORU5URVMiLCJNT1ZFUl9DT01QT05FTlRFUyIsIk1PVkVSX1BVRVNUT19UUkFCQUpPIiwiT0JURU5FUl9UT0RPU19QVUVTVE9fVFJBQkFKTyIsIk9CVEVORVJfVU5fUFVFU1RPX1RSQUJBSk8iLCJFRElUQVJfUFVFU1RPX1RSQUJBSk8iLCJDUkVBUl9QVUVTVE9fVFJBQkFKTyIsIkVMSU1JTkFSX1BVRVNUT19UUkFCQUpPIiwiT0JURU5FUl9UT0RPU19VU1VBUklPU19JTkZPUk1BVElDT1MiLCJPQlRFTkVSX1VOX1VTVUFSSU9TX0lORk9STUFUSUNPUyIsIkVESVRBUl9VU1VBUklPU19JTkZPUk1BVElDT1MiLCJDUkVBUl9VU1VBUklPU19JTkZPUk1BVElDT1MiLCJFTElNSU5BUl9VU1VBUklPU19JTkZPUk1BVElDT1MiLCJBR1JFR0FSX1BVRVNUT19UUkFCQUpPX0lORk9STUFUSUNPUyIsIlFVSVRBUl9QVUVTVE9fVFJBQkFKT19JTkZPUk1BVElDT1MiXX19LCJpYXQiOjE3MzIyODYxMDcsImV4cCI6MTczMjI5NjkwN30.owUSCWuPgUxHa5EA6dULCBby53F1teqLd1vyFAePzUo",
  user:null,
  loading:false,
  error:null,
  setLoading: () => set({token:null, loading: true, error: null}),
  setError: (error:string) => set({ error, loading: false, token: null }),
  login: (token:string ,user:any ) => {
    localStorage.setItem('token', token) // Guardamos el token en localStorage
    return set({ token,user })
  },
  logout: () => {
    localStorage.removeItem('token');
     return set({ token: null });
  }
}));