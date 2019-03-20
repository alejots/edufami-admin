<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg10 sm10 xs10>
        <h4>Step</h4>
      </v-flex>
      <v-flex lg2 sm2 xs2></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex lg12>
        <StepCard :step="step"/>
        <StepForm label="Edit Form"/>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex lg12>
        <OptionsTable/>
        <OptionForm :stepId="step.id" label="Add Option"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import StepCard from "@/components/cards/StepCard";
import StepForm from "@/components/forms/StepForm";
import OptionsTable from "@/components/tables/OptionsTable";
import OptionForm from "@/components/forms/OptionForm";

export default {
  components: {
    StepCard,
    StepForm,
    OptionsTable,
    OptionForm
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["step"])
  },
  methods: {
    ...mapActions(["getStep", "getOptionsbyStep"])
  },
  beforeMount() {
    const { stepId } = this.$route.params;
    this.getStep(stepId);
    this.getOptionsbyStep(stepId);
  }
};
</script>
