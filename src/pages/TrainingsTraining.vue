<template>
  <div id="pageTrainings">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
            <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="Training name*" hint="The name of the training that the user can read" v-model="name" :counter="55" :rules="rules.name"  required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea label="Description" hint="A short description that explains the content of the training" v-model="description" :counter="160" :rows="2" auto-grow></v-textarea>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="['Spanish', 'English', 'France']" label="Language" v-model="languageId"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-autocomplete :items="['Edufami', 'Nutrifami', 'Equfami', 'Climafami']" label="App"></v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark @click="update">Update</v-btn>
          </v-form>
        </v-flex>
        <v-flex sm12>
            <h5>Units</h5>
        </v-flex>
        <v-flex lg3 sm6 v-for="(item,index) in currentUnits" :key=" 'bottom-nav' + index">
          <unit-card
            bottom-nav
            v-bind="item"
          >
          </unit-card>
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
              <span class="headline">Add Unit</span>
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

import { mapActions, mapGetters } from 'vuex'
import UnitCard from '@/components/widgets/card/UnitCard';

import { createHelpers } from 'vuex-map-fields';

// The getter and mutation types we're providing
// here, must be the same as the function names we've
// used in the store.
const { mapFields } = createHelpers({
  getterType: 'getCurrentTrainingField',
  mutationType: 'updateCurrentTrainingField',
});

export default {
  components: {
    UnitCard
  },
  data: () => ({
    loading: false,
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
  computed: {
    ...mapGetters({
      'currentTraining': 'getCurrentTraining',
      'currentUnits': 'getCurrentTrainingUnits'
    }),
    ...mapFields([
      'name',
      'description',
      'languageId'
    ]),
  },
  methods: {
    ...mapActions([
      'GET_TRAINING_DATA',
      'PUT_TRAINING_BY_ID'
    ]),
    reset () {
      this.$refs.form.reset()
      this.dialog = false
    },
    update () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.PUT_TRAINING_BY_ID(this.$route.params.trainingId).then(() => {
          this.loading = false
          window.getApp.$emit('SHOW_SNACKBAR', 'The training had been updated with success!!', 'green' );
        }).catch((err) => {
          this.loading = false
          window.getApp.$emit('SHOW_SNACKBAR', err.response.data.error.message, 'red' );
        })
      }
    }
  },
  mounted () {
    this.loading = true
    this.GET_TRAINING_DATA(this.$route.params.trainingId).then(() => {
      this.loading = false
    }).catch((err) => {
      this.loading = false
      window.getApp.$emit('SHOW_SNACKBAR', err.response.data.error.message, 'red' );
    })
  }
};
</script>
