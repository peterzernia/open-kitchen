import { createContext } from 'react'
import { State, Action } from 'types'

export const StateContext = createContext(null as unknown as State)
export const DispatchContext = createContext(null as unknown as React.Dispatch<Action>)
