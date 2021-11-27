import React, { useEffect, useState, useContext, createContext } from 'react'
import firebase from "firebase/compat/app"
import { auth } from "../../firebaseSetup"

export type AuthContextType = {
  user: firebase.User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const authContextDefaultValues: AuthContextType = {
  user: null,
  signIn: () => {return Promise.reject("Not implemented")},
  signOut: () => { return Promise.reject("Not implemented") },
}

export const AuthContext = createContext<AuthContextType>(authContextDefaultValues)

export const useAuth = () => {
  return useContext(AuthContext)
}

type Props = {
  children?: React.ReactNode
}

export const AuthProvider: React.FC = ({ children }: Props) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState(true)

  const signIn = async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error(error)
    }
  }

  const data = {
    user,
    signIn,
    signOut
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  return !loading ? <AuthContext.Provider value={data}>{children}</AuthContext.Provider> : null
}