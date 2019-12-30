

const DEFAULT_URL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export default class Lazy {
  constructor({
      preLoad,
      error,
      preLoadTop,
      dispatchEvent,
      loading,
      attempt,
      silent = true,
      scale,
      adapter
    }) {
      this.ListenerQueue = []
      this.options = {
        preLoad: preLoad | 1.3,
        error: error || DEFAULT_URL,
      }
  }
}