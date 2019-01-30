<template>
  <div id="pageTrainings">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
            <h3>Unit: Alimentación Saludable</h3>
        </v-flex>
        <v-flex sm12>
          <v-widget title="Basic Usage">
            <div slot="widget-content">
              <v-container>
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Unit name</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      label="Add the Unit's name"
                      value="Alimentación Saludable"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>                
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Description</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      name="description"
                      label="Add the description of the training"
                      value="Capacitacion inicial, para participantes del PMA"
                      id="testing"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <!--<v-layout row>
                  <v-flex xs4>
                    <v-subheader>Long Description</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      name="long-description"
                      label="Add the long description of the training"
                      value=""
                    ></v-text-field>
                  </v-flex>
                </v-layout>-->
                <v-layout row>
                  <v-flex xs4>
                    <v-subheader>Learning Objective</v-subheader>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                      name="objective"
                      label="Add the general learning objective"
                      value=""
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
        <v-flex sm12>
            <h5>Lessons</h5>
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

import { mapActions } from 'vuex'
import UnitCard from '@/components/widgets/card/UnitCard';

export default {
  components: {
    UnitCard
  },
  data: () => ({
    loading: false,
    email: '',
    rules: {
      required: (value) => !!value || 'Required.',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      }    
    },
    users: [
        {
          jobTitle: '5 Lessons',
          name: 'La alimentación',
          cardBgImage: '/static/bg/1.jpg',
          dark: true,
          /*avatar: {
            src: 'https://randomuser.me/api/portraits/lego/1.jpg',
            size: '36'
          }*/  
        },
        {
          jobTitle: '5 Lessons',
          name: 'Los Alimentos',
          dark: true,
          cardBgImage: '/static/bg/16.jpg',
          /* avatar: {
            src: 'https://randomuser.me/api/portraits/lego/2.jpg',
            size: '36'
          }, */ 
        },
        {
          jobTitle: '5 Lessons',
          name: 'El plato saludable',
          dark: true,
          cardBgImage: '/static/bg/4.jpg',
          /* avatar: {
            src: 'https://randomuser.me/api/portraits/lego/3.jpg',
            size: '36'
          }, */ 
        },
        {
          jobTitle: '5 Lessons',
          name: 'Los colores de los alimentos',
          dark: true,
          cardBgImage: '/static/bg/14.jpg',
          /* avatar: {
            src: 'https://randomuser.me/api/portraits/lego/4.jpg',
            size: '36'
          }, */ 
        }     
      ]
  }),
  computed: {},
  methods: {
    ...mapActions([])
  },
  mounted () {}
};
</script>
