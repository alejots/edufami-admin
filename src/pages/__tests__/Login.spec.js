import { shallowMount, createLocalVue } from '@vue/test-utils'

import Vuex from 'vuex'
import userAccount from '@/store/modules/userAccount.js'

import Login from '@/pages/Login'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Login.vue', () => {

	let store

	beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        userAccount
      }
    })
  })

  it('testing credentials', () => {
    const wrapper = shallowMount(Login, {store, localVue})
    wrapper.vm.model.username = 'admin'
    wrapper.vm.model.password = 'qwe123'
    expect(wrapper.vm.model.username).toBe('admin')
    expect(wrapper.vm.model.password).toBe('qwe123')
  })
})
