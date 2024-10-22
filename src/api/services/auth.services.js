import http from '../http-common'

class AuthService {
  // Login user
  login(credentials) {
    return http.post('/auth/login', credentials)
  }
  logout() {
    return http.post('/auth/logout')
  }
}

export default new AuthService()
