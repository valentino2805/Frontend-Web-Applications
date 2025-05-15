
export default class User {
    constructor({ id = null, name, email, password, role = 'cliente' }) {
      this.id = id
      this.name = name
      this.email = email
      this.password = password
      this.role = role
    }
  }
  

