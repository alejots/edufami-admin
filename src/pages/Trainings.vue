<template>
  <div id="pageTrainings">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg10 sm10 xs10>
          <h4>Trainings</h4>
        </v-flex>
        <v-flex lg2 sm2 xs2>
          <TrainingForm label="Add Training"/>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <TrainingsTable/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TrainingsTable from "@/components/tables/TrainingsTable";
import TrainingForm from "@/components/forms/TrainingForm";

export default {
  components: {
    TrainingsTable,
    TrainingForm
  },

  beforeMount() {
    this.getTrainings();
  },

  methods: {
    ...mapActions(["getTrainings"])
  }
};
</script>
