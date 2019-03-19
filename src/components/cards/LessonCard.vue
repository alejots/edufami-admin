<template>
  <v-card>
    <v-card-title v-for="(item,key) in lesson" :key="key">
      <div>
        <span class="grey--text">{{key}}</span>
        <br>
        <span>{{item}}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    lesson: Object
  }
};
</script>

