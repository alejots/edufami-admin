<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">
        <app-drawer class="app--drawer"></app-drawer>
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <!--<page-header v-if="$route.meta.breadcrumb"></page-header>-->
          <!-- TODO - BREADCRUMB -->
          <div class="page-wrapper">
            <router-view></router-view>
          </div>
          <!-- App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer" fixed>
            <span class="caption">WFP &copy; {{ new Date().getFullYear() }}</span>
            <v-spacer></v-spacer>
            <span class="caption mr-1">Developed by Alejandro Tunaroza</span>
            <v-icon color="blue" small>star</v-icon>
          </v-footer>
        </v-content>
        <!-- Go to top -->
        <app-fab></app-fab>
        <!-- theme setting -->
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </template>
  </div>
</template>
<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import AppFab from "@/components/AppFab";
import PageHeader from "@/components/template/PageHeader";
// import menu from '@/api/menu';
export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader
  },
  data: () => ({
    expanded: true
  }),

  computed: {},

  created() {
    window.getApp = this;
  },
  methods: {}
};
</script>


<style lang="stylus" scoped>
</style>
