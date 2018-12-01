<template>
  <v-card>
    <v-toolbar card dense color="transparent">
      <v-toolbar-title><h4>Trainings Available </h4></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <template>
        <v-data-table
          :headers="headers"
          :items="getTrainings"
          hide-actions
          class="elevation-0"
        >
          <template slot="items" slot-scope="props">
            <td>{{props.item.id}}</td>
            <td>
              <v-avatar size="36px">
                <img :src="props.item.avatar" :alt="props.item.username" />
              </v-avatar>
            </td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.description }}</td>
            <td class="text-xs-left"><v-chip label small :color="getColorByStatus('edufami')" text-color="white" >Edufami</v-chip> <v-chip label small :color="getColorByStatus('nutrifami')" text-color="white" >Nutrifami</v-chip></td>
            <td class="text-xs-left">{{ props.item.status }}</td>
            <td class="text-xs-left"><v-progress-linear :value="props.item.progress" height="5" :color="props.item.color"></v-progress-linear> </td>
            <td class="text-xs-left">{{ props.item.languageId }}</td>
            <td class="text-xs-right">
              <v-btn flat icon color="grey">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn flat icon color="grey">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </template>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        {
          text: 'Image',
          align: 'left',
          sortable: false,
          value: 'image'
        },
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Description', value: 'description' },
        {
          text: 'Apps',
          align: 'left',
          value: 'apps'
        },
        { text: 'Status', value: 'statusId' },
        { text: 'Progress', value: 'progress'},
       { text: 'Language', value: 'languageId' },
        { text: 'Action', value: 'action', align: 'right' },

      ],
      colors: {
        edufami: '#ff9800',
        nutrifami: '#00c97e',
        equifami: 'green',
        climafami: ''
      }
    };
  },
  computed: {
    ...mapGetters([
      'getTrainings'
    ])
  },
  methods: {
    getColorByStatus (app) {
      return this.colors[app];
    }
  }
};
</script>
