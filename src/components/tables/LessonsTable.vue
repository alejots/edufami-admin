<template>
  <v-card>
    <v-card-text class="pa-0">
      <template>
        <v-data-table :headers="headers" :items="unitLessons" hide-actions class="elevation-0">
          <template slot="items" slot-scope="scope">
            <td v-for="(i,key) in headers" :key="key">
              <router-link
                v-if="i.value === 'name'"
                :to="`/trainings/${training.id}/${unit.id}/${scope.item.id}`"
              >{{scope.item[i.value]}}</router-link>
              <span v-else>{{scope.item[i.value]}}</span>
            </td>
          </template>
        </v-data-table>
      </template>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  props: {
    training: Object,
    unit: Object
  },
  data() {
    return {
      headers: [],
      items: []
    };
  },
  beforeMount() {
    this.headers = [
      { text: "ID", value: "id" },
      { text: "Name", value: "name" },
      { text: "Description", value: "description" }
    ];
  },
  computed: {
    ...mapGetters(["unitLessons"])
  },
  methods: {}
};
</script>
