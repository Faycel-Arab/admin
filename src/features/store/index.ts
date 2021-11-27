import { firestore } from "../../firebaseSetup"

export type Response = {
  success: boolean
  data: Restaurant | any | boolean | null
  error?: string | null
}

export type Params = {
  size: number
  orderBy: string
  order: 'asc' | 'desc'
  startAfter?: any
  endBefore?: any
  search?: string
  filters: any
}

export type Restaurant = {
  id?: string
  name: string
  description: string
  verified: boolean
  _public: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type StoreType = {
  get: (col: string, id: string) => Promise<Response>
  set: (col: string, values: Restaurant | any) => Promise<Response>
  getAll: (col: string, params?: Params) => Promise<Response>
  delete: (col: string, id: string) => Promise<Response>
  update: (col: string, id: string, values: Restaurant | any) => Promise<Response>
  db: typeof firestore
}

export const store: StoreType = {
  get: async(col: string, id: string) => {

    let res: Response = {
      success: false,
      data: null,
      error: null
    }

    try {
      const record = await firestore.collection(col).doc(id).get()
      res.success = true
      res.data = record.data()
    } catch (error: any) {
      res.error = error.message
    }

    return res
  },

  set: async(col: string, values: Restaurant | any) => {

    let res: Response = {
      success: false,
      data: null,
      error: null
    }

    try {
      const record = await firestore.collection(col).add(values)
      res.success = true
      res.data = record.id
    } catch (error: any) {
      res.error = error.message
    }

    return res
  },

  getAll: async(col: string, params: Params = {orderBy: "createdAt", order: "desc", size: 10, filters: {}}) => {

    let res: Response = {
      success: false,
      data: null,
      error: null
    }

    try {
      // grab and cache collection
      let ref: any = await firestore.collection(col)

      // apply filters
      if(params.filters.field) ref = ref.where(params.filters.field, '==', params.filters.value)

      // apply order
      ref = ref.orderBy(params.orderBy, params.order)

      // go to next page
      if(params.startAfter) ref = ref.startAfter(params.startAfter[params.orderBy]).limit(params.size)

      // go to previous page
      else if(params.endBefore) ref = ref.endBefore(params.endBefore[params.orderBy]).limitToLast(params.size)

      // set limit only
      else ref = ref.limit(params.size)

      // grab data
      const req = await ref.get()
      res.success = true
      res.data = req.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
    } catch (error: any) {
      console.log('error', error)
      res.error = error.message
    }

    return res
  },

  delete: async(col: string, id: string) => {

    let res: Response = {
      success: false,
      data: null,
      error: null
    }

    try {
      await firestore.collection(col).doc(id).delete()
      res.success = true
      res.data = true
    } catch (error: any) {
      res.error = error.message
    }

    return res
  },

  update: async(col: string, id: string, values: any) => {

      let res: Response = {
        success: false,
        data: null,
        error: null
      }

      try {
        await firestore.collection(col).doc(id).update(values)
        res.success = true
        res.data = true
      } catch (error: any) {
        res.error = error.message
      }

      return res
  },

  db: firestore
}