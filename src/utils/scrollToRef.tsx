import { createContext, RefObject } from 'react'

export const ScrollContext = createContext({
  ref: null,
  setRef: (ref: RefObject<HTMLElement>) => {},
})

const scrollToRef = (ref: RefObject<HTMLElement>) =>
  ref.current.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })

export default scrollToRef
