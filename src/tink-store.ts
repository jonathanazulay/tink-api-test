import { readable } from "svelte/store"

interface APIResult<T> {
  success: boolean
  data?: T
}

export const transactionsByMerchants = readable<APIResult<any>>(undefined, (set) => {
  fetch('/api/data')
    .then(async r => {
      if (r.status !== 200) { throw new Error() }
      set({
        success: true,
        data: await r.json()
      })
    })
    .catch(r => {
      set({
        success: false,
      })
    })
  return function () { }
})