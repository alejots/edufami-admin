<template>
  <div id="pageTrainings">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <table-trainings></table-trainings>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

import TableTrainings from '@/components/widgets/tables/TableTrainings';
export default {
  components: {
    TableTrainings    
  },
  data: () => ({
    loading: false
  }),
  computed: {},
  methods: {
    ...mapActions([
      'TRAININGS_GET'
    ])
  },
  mounted () {
    this.loading = true
    this.TRAININGS_GET().then(() => {
        this.loading = false
      }).catch((err) => {
        this.loading = false
        window.getApp.$emit('SHOW_SNACKBAR', err.response.data.error.message, 'red' );
      })
  }
};
</script>
