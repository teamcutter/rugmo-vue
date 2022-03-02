import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuntificated: false,
    token: '',
    isLoading: false,
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }

      if (localStorage.getItem('token')){
        state.token = localStorage.getItem('token')
        state.isAuntificated = true
      } else {
        state.token = ''
        state.isAuntificated = false
      }
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)

      // if it's bigger than 0, it means that the item is already in the cart
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setIsLoading(state, status){
      state.isLoading = status
    },
    setToken(state, token){
      state.token = token
      state.isAuntificated = true
    },
    removeToken(state){
      state.token = ''
      state.isAuntificated = false
    },
  },
  actions: {
  },
  modules: {
  }
})
