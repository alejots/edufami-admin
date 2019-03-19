<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg10 sm10 xs10>
        <h4>Training</h4>
      </v-flex>
      <v-flex lg2 sm2 xs2></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex lg12>
        <TrainingCard/>
        <TrainingForm :data="training" label="Edit Training"/>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex lg12>
        <UnitsTable/>
        <UnitForm :training="training" label="Add Unit"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TrainingCard from "@/components/cards/TrainingCard";
import TrainingForm from "@/components/forms/TrainingForm";
import UnitsTable from "@/components/tables/UnitsTable";
import UnitForm from "@/components/forms/UnitForm";

export default {
  components: {
    TrainingCard,
    TrainingForm,
    UnitsTable,
    UnitForm
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["training"])
  },
  methods: {
    ...mapActions(["getTraining", "getUnitsbyTraining"])
  },
  beforeMount() {
    console.log("Training - BeforeMount");
    const { trainingId } = this.$route.params;
    this.loading = true;
    this.getTraining(trainingId);
    this.getUnitsbyTraining(trainingId);
  }
};
</script>
