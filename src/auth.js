const TOKEN_KEY = 'comunet_token'
const USER_KEY = 'comunet_user'

export const auth = {
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY)
  },

  getUser() {
    const raw = sessionStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  },

  login(token, nombre) {
    sessionStorage.setItem(TOKEN_KEY, token)
    sessionStorage.setItem(USER_KEY, JSON.stringify({ nombre }))
  },

  logout() {
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(USER_KEY)
  },

  isAuthenticated() {
    return !!this.getToken()
  },
}
