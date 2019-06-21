export default {
  data () {
    return {
      dom: '',

      width: 0,
      height: 0,

      debounceInitWHFun: '',

      domObserver: ''
    }
  },
  methods: {
    async autoResizeMixinInit () {
      const { initWH, getDebounceInitWHFun, bindDomResizeCallback, afterAutoResizeMixinInit } = this

      await initWH()

      getDebounceInitWHFun()

      bindDomResizeCallback()

      if (typeof afterAutoResizeMixinInit === 'function') afterAutoResizeMixinInit()
    },
    initWH () {
      const { $nextTick, $refs, ref, onResize } = this

      return new Promise(resolve => {
        $nextTick(e => {
          const dom = this.dom = $refs[ref]

          this.width = dom.clientWidth
          this.height = dom.clientHeight

          if (typeof onResize === 'function') onResize()

          resolve()
        })
      })
    },
    getDebounceInitWHFun () {
      const { debounce, initWH } = this

      this.debounceInitWHFun = debounce(100, initWH)
    },
    bindDomResizeCallback () {
      const { dom, debounceInitWHFun, observerDomResize } = this

      this.domObserver = observerDomResize(dom, debounceInitWHFun)

      window.addEventListener('resize', debounceInitWHFun)
    },
    unbindDomResizeCallback () {
      const { domObserver, debounceInitWHFun } = this

      domObserver.disconnect()
      domObserver.takeRecords()
      domObserver = null

      window.removeEventListener('resize', debounceInitWHFun)
    }
  },
  mounted () {
    const { autoResizeMixinInit } = this

    autoResizeMixinInit()
  },
  beforeDestroyed () {
    const { unbindDomResizeCallback } = this

    unbindDomResizeCallback()
  }
}