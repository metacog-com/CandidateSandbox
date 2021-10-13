<template>
  <Disclosure as="nav" class="bg-gray-200">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 flex items-center justify-left sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="block lg:hidden h-8 w-auto" src="https://www.metacog.com/hs-fs/hubfs/Metacog%20Logo%20w%20Tagline-01.png" alt="MetaCog" />
            <img class="hidden lg:block h-8 w-auto" src="https://www.metacog.com/hs-fs/hubfs/Metacog%20Logo%20w%20Tagline-01.png" alt="MetaCog" />
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <div class="sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a href="#" @click.prevent="unselectSession()" :class="['text-gray-700 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']">Sessions Plot Chart</a>
            </div>
          </div>
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton class="flex text-sm">
                <a href="#" :class="['text-gray-700 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']">View Sessions List &#8964; </a>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="text-center origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-for="session in currentSessions" :key="session.session_id">
                   <a href="#" @click.prevent="selectSession(session)"  :class="['block px-4 py-2 text-sm text-gray-700']">{{ session.session_id }}</a>
                </MenuItem>
                <Pagination 
                  :totalPages="Math.floor(sessions.length / perPage) "
                  :perPage="perPage"
                  :currentPage="currentPage"
                  @pagechanged="onPageChange"/>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script>
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import Pagination from './Pagination.vue'

export default {
  props: ['sessions'],
  components: {
    Disclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Pagination
  },
  methods: {
    selectSession(session) {
       this.$emit("selectSession", session);
    },
    unselectSession(session) {
       this.$emit("unselectSession", session);
    },
    onPageChange(page) {
      console.log(page)
      this.currentPage = page;
      if (page === 1){
        this.currentSessions = this.sessions.slice(0, this.perPage)
      } else {

        this.currentSessions = this.sessions.slice(page * this.perPage, page * this.perPage + this.perPage)
      }

    },
  },
  data () {
    return {
      currentPage: 1,
      perPage: 10,
      currentSessions: this.sessions.slice(0, 10)
    }
  },

}
</script>