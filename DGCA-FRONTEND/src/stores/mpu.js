import { defineStore } from 'pinia'
import { request } from '../utils/api'

export const useMPUStore = defineStore({
  id: 'mpu-store',
  state: () => ({
    rawItems: [],
    rawDetails: []
  }),
  getters: {
    items: (state) => state.rawItems,
    details: (state) => state.rawDetails
  },
  actions: {
    async readItem(search_type, search_data, page_number, total_row_displayed) {
      try {
        const { data } = await request.get(
          `/mpu?search_type=${search_type}&search_data=${search_data}&page_number=${page_number}&total_row_displayed=${total_row_displayed}`
        )
        if (data.success) {
          this.rawItems = data.data.rows
          // this.rawDetails = data.data.outlet
          // return this.rawItems
          return data.data.total_pages
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async readDetail(id_mpu) {
      try {
        const { data } = await request.get(`/mpu/detail/${id_mpu}`)
        if (data.success) {
          this.rawDetails = data.data
          // this.rawDetails = data.data.outlet
          return this.rawDetails
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async addGet() {
      try {
        const { data } = await request.post('mpu/create')
        if (data.success) {
          return data.data[0]
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async saveItem(
      id_mpu,
      company_name,
      certificate_number,
      type_inspection,
      checklist,
      inspector,
      remark,
      date_time
    ) {
      const formData = new FormData()
      formData.append('id_mpu', id_mpu)
      formData.append('company_name', company_name)
      formData.append('certificate_number', certificate_number)
      formData.append('type_inspection', JSON.stringify(type_inspection))
      formData.append('checklist', JSON.stringify(checklist))
      formData.append('inspector', JSON.stringify(inspector))
      formData.append('remark', remark[0])
      formData.append('remark', remark[1])
      formData.append('date_time', date_time)
      const headers = { 'Content-Type': 'multipart/form-data' }
      try {
        const { data } = await request.post('mpu/savempu', formData, headers)

        if (data.success) {
          return data.success
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async removeItem(id_mpu) {
      try {
        //console.log(id_mpu, old_sign)
        this.rawItems = this.rawItems.filter((item) => item.id_mpu !== id_mpu)
        const { data } = await request.delete(`/mpu/deletempu/${id_mpu}`)
        if (data.success) {
          //console.log('removing item', data)
          return data.success
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }
})
