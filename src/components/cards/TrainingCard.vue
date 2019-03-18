<template>
  <v-card>
    <v-card-title v-for="(item,key) in training" :key="key">
      <div>
        <span class="grey--text">{{key}}</span>
        <br>
        <span>{{item}}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["training"])
  }
};
</script>

