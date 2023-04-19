import { defineStore } from 'pinia'
import { request } from '../utils/api'

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => ({
    rawItems: []
  }),
  getters: {
    items: (state) => state.rawItems
  },
  actions: {
    async readItem() {
      try {
        const { data } = await request.get('users')
        if (data.success) {
          this.rawItems = data.data
          this.rawOutlets = data.data.regions
          return this.rawItems
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async addItem(username, email_user, role, password) {
      const id_user = Date.now()
      this.rawItems.push({
        id_user,
        username,
        email_user,
        role,
        password
      })
      try {
        const { data } = await request.post('users/add', {
          username,
          email_user,
          role,
          password
        })
        if (data.success) {
          this.rawItems = this.rawItems.map((item) => {
            if (item.id_user === id_user) {
              return data.data.data
            }
            return item
          })
        }
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    async removeItem(id_user) {
      try {
        this.rawItems = this.rawItems.filter((item) => item.id_user !== id_user)
        request
          .delete(`users/delete/${id_user}`)
          .then((data) => {
            if (data.success) {
              return data.success
            }
          })
          .catch((error) => console.error(error))
      } catch (error) {
        throw new Error(error)
      }
    },
    async updateItem(user) {
      try {
        let item
        let id_user = user.id_user
        let username = user.username
        let email_user = user.email_user
        let role = user.role
        let password = user.password

        if (password === '') {
          item = { username, email_user, role }
        } else {
          item = { username, email_user, role, password }
        }
        const { data } = await request.put(`users/edit/${id_user}`, item)
        if (data.success) {
          this.rawItems = this.rawItems.map((item) => {
            if (item.id_user === id_user) {
              return data.data.data
            }
            return item
          })
        }
        return data
      } catch (error) {
        throw new Error(error)
      }
    }
  }
})
