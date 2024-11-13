// 'use client'
// import { useRef } from 'react'
// import { Provider } from 'react-redux'
// import { makeStore } from '../lib/store'

// export default function StoreProvider({ children }) {
//   const storeRef = useRef()
//   if (!storeRef.current) {
//     // Create the store instance the first time this renders
//     storeRef.current = makeStore()
//   }

//   return <Provider store={storeRef.current}>{children}</Provider>
// }
// 'use client'
// import { useRef } from 'react'
// import { Provider } from 'react-redux'
// import { makeStore } from '../lib/store'
// import { initializeCount } from '../lib/features/counter/counterSlice'

// export default function StoreProvider({ count, children }) {
//   const storeRef = useRef(null)
//   if (!storeRef.current) {
//     storeRef.current = makeStore()
//     storeRef.current.dispatch(initializeCount(count))
//   }

//   return <Provider store={storeRef.current}>{children}</Provider>
// }
'use client'
import { Provider } from "react-redux";
// import store from "../store/store";
import store from "@/Store/store";
 
function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
 
export default Providers;