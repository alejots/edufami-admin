<template>
  <div id="pageTrainings">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <table-trainings></table-trainings>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-btn slot="activator" color="primary" dark fab fixed bottom right>
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-card>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-title>
              <span class="headline">Add Training</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="Training name*" hint="The name of the training that the user can read" v-model="training.name" :counter="55" :rules="rules.name"  required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea label="Description" hint="A short description that explains the content of the training" v-model="training.description" :counter="160" :rows="2" auto-grow></v-textarea>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="['Spanish', 'English', 'France']" label="Language" v-model="training.languageId"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-autocomplete :items="['Edufami', 'Nutrifami', 'Equfami', 'Climafami']" label="App"></v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" dark  @click="reset">Close</v-btn>
              <v-btn color="primary" dark @click="validate">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>

import TableTrainings from '@/components/widgets/tables/TableTrainings';
export default {
  components: {
    TableTrainings    
  },
  data: () => ({
    loading: false,
    dialog: false,
    valid: true,
    rules: {
      name: [
        v => !!v || 'Training name is required',
        v => (v && v.length <= 55) || 'Name must be less than 55 characters'
      ]
    },
    training: {
      name: '',
      description: ' ',
      "descriptionAudio": "string",
      "descriptionLong": "string",
      "descriptionLongAudio": "string",
      "zipFileUrl": "string",
      "active": true,
      "statusId": 0,
      "imageId": 0,
      languageId: '',
      "ownerId": 0
    }
  }),
  computed: {},
  methods: {
    reset () {
      this.$refs.form.reset()
      this.dialog = false
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.$store.dispatch('TRAININGS_POST', this.training).then(() => {
          this.loading = false
          window.getApp.$emit('SHOW_SNACKBAR', 'The training had been saved with success!!', 'green' );
          this.$refs.form.reset()
          this.dialog = false
        }).catch((err) => {
          this.loading = true
          window.getApp.$emit('SHOW_SNACKBAR', err.response.data.error.message, 'red' );
        })
      }
    }    
  },
  mounted () {
    this.loading = true
    this.$store.dispatch('TRAININGS_GET').then(() => {
        this.loading = false
      }).catch((err) => {
        this.loading = true
        window.getApp.$emit('SHOW_SNACKBAR', err.response.data.error.message, 'red' );
      })
  }
};
</script>
