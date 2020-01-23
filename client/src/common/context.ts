import { createContext } from 'react'
import { State, Action } from 'types'

export const StateContext = createContext({} as State)
export const DispatchContext = createContext({} as React.Dispatch<Action>)
