<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex lg10 sm10 xs10>
        <h4>Lesson</h4>
      </v-flex>
      <v-flex lg2 sm2 xs2></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex lg4>
        <UnitCard :unit="unit"/>
        <UnitForm label="Edit Unit"/>
      </v-flex>
      <v-flex lg8>
        <LessonsTable :training="training" :unit="unit"/>
        <LessonForm :unit="unit" label="Add Lesson"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UnitCard from "@/components/cards/UnitCard";
import UnitForm from "@/components/forms/UnitForm";
import LessonsTable from "@/components/tables/LessonsTable";
import LessonForm from "@/components/forms/LessonForm";

export default {
  components: {
    UnitCard,
    UnitForm,
    LessonsTable,
    LessonForm
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["unit", "training"])
  },
  methods: {
    ...mapActions(["getUnit", "getLessonsbyUnit"])
  },
  beforeMount() {
    const { unitId } = this.$route.params;
    this.getUnit(unitId);
    this.getLessonsbyUnit(unitId);
  }
};
</script>
