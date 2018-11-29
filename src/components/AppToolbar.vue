<template>
  <VToolbar
    color="primary"
    fixed
    dark
    app
  >
    <VToolbarTitle class="ml-0 pl-3">
      <VToolbarSideIcon @click.stop="handleDrawerToggle" />
    </VToolbarTitle>
    <VTextField
      flat
      solo-inverted
      prepend-icon="search"
      label="Search"
      class="hidden-sm-and-down"
    />
    <VSpacer />
    <VBtn href="mailto:alejandro.tunaroza@gmail.com">
      Contact the Developer
    </VBtn>      
    <VBtn icon href="https://github.com/WFPColombia">
      <VIcon>fa fa-github</VIcon>
    </VBtn>
    <VBtn
      icon
      @click="handleFullScreen()"
    >
      <VIcon>fullscreen</VIcon>
    </VBtn>
    <VMenu
      offset-y
      origin="center center"
      class="elelvation-1"
      :nudge-bottom="14"
      transition="scale-transition"
    >
      <VBtn
        icon
        flat
        slot="activator"
      >
        <VBadge
          color="red"
          overlap
        >
          <span slot="badge">3</span>
          <VIcon medium>notifications</VIcon>
        </VBadge>
      </VBtn>
      <NotificationList />
    </VMenu>
    <VMenu
      offset-y
      origin="center center"
      :nudge-bottom="10"
      transition="scale-transition"
    >
      <VBtn
        icon
        large
        flat
        slot="activator"
      >
        <VAvatar size="30px">
          <VIcon>person</VIcon>
        </VAvatar>
      </VBtn>
      <VList class="pa-0">
        <VListTile
          v-for="(item,index) in items"
          :to="!item.href ? { name: item.name } : null"
          :href="item.href"
          @click="item.click"
          ripple="ripple"
          :disabled="item.disabled"
:target="item.target" rel="noopener" :key="index"
        >
          <VListTileAction v-if="item.icon">
            <VIcon>{{ item.icon }}</VIcon>
          </VListTileAction>
          <VListTileContent>
            <VListTileTitle>{{ item.title }}</VListTileTitle>
          </VListTileContent>
        </VListTile>
      </VList>
    </VMenu>
  </VToolbar>
</template>
<script>
import NotificationList from '@/components/widgets/list/NotificationList';
import Util from '@/util';
export default {
  name: 'AppToolbar',
  components: {
    NotificationList
  },
  data: () => ({
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          console.log(e)
          window.getApp.$emit('APP_LOGOUT');
        }
      }
    ],
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    }
  }
};
</script>
