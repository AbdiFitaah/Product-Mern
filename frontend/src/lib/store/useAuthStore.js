import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const useAuthStore = create(
       
persist(
    (set, get) => ({
        user:null,
        token :null,
        isAuthenticated:false,


        // set user data and token after succsefully login

        setAuth: (userData,token) => set({
            user:userData,
            token,
            isAuthenticated : true ,

        }),

        // clear data after logout

        clearAuth: () => set({
            user:null,
            token :null,
            isAuthenticated:false,
        }),

        // get token for out side of the react component

        getToken: () => get().token,


    }),
    {
        name: 'auth-storage',
        getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
        partialize: (state) => {
            return {
                    user: state.user,
                    token: state.token,
                    isAuthenticated: state.isAuthenticated,
                }
        },
      }

)
)

export default useAuthStore 