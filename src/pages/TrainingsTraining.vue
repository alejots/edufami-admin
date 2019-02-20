<template>
  <div id="pageTrainings">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
            <h3>Training: Nutrifami para todos</h3>
        </v-flex>
        <v-flex sm12>
            <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="Training name*" hint="The name of the training that the user can read" v-model="currentTraining.name" :counter="55" :rules="rules.name"  required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea label="Description" hint="A short description that explains the content of the training" v-model="currentTraining.description" :counter="160" :rows="2" auto-grow></v-textarea>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="['Spanish', 'English', 'France']" label="Language" v-model="currentTraining.languageId"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-autocomplete :items="['Edufami', 'Nutrifami', 'Equfami', 'Climafami']" label="App"></v-autocomplete>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark @click="validate">Update</v-btn>
          </v-form>
        </v-flex>
        <v-flex sm12>
            <h5>Units</h5>
        </v-flex>
        <v-flex lg3 sm12 v-for="(item,index) in users" :key=" 'bottom-nav' + index">
          <unit-card
            bottom-nav
            v-bind="item"
          >
          </unit-card>
        </v-flex>    
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import UnitCard from '@/components/widgets/card/UnitCard';

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
    users: [
      {
        jobTitle: '4 Lessons',
        name: 'Alimentación Saludable',
        cardBgImage: '/static/bg/1.jpg',
        dark: true,
        /*avatar: {
          src: 'https://randomuser.me/api/portraits/lego/1.jpg',
          size: '36'
        }*/  
      }       
    ]
  }),
  computed: {
    ...mapGetters({
      'currentTraining': 'getCurrentTraining'
    })
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
    validate () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.PUT_TRAINING_BY_ID({ id: this.$route.params.trainingId, data: this.training }).then(() => {
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
