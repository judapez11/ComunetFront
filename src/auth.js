const TOKEN_KEY = 'comunet_token'
const USER_KEY = 'comunet_user'

export const auth = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  getUser() {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  },

  login(token, nombre) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify({ nombre }))
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  isAuthenticated() {
    return !!this.getToken()
  },
}
