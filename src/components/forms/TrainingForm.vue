<template>
  <v-layout row justify-center>
    <v-btn primary color="secondary" @click="dialog = true" small>{{this.label}}</v-btn>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title>
            <span class="headline">{{this.label}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 v-for="(item, key) in form" :key="key">
                  <v-text-field
                    :label="item.label"
                    :hint="item.hint"
                    :counter="item.counter"
                    :required="item.required"
                    :rules="item.rules"
                    v-model="formData[item.model]"
                  />
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" dark @click="handleClose">Close</v-btn>
            <v-btn color="primary" dark @click="handleSave">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    label: String
  },
  data: () => ({
    dialog: false,
    valid: false,
    form: [
      {
        model: "name",
        type: "text",
        label: "Training Name",
        hint: "The name of the training that the user can read",
        counter: 55,
        required: true,
        rules: [
          v => !!v || "Training name is required",
          v => (v && v.length <= 55) || "Name must be less than 55 characters"
        ]
      },
      {
        model: "description",
        type: "text",
        label: "Description",
        hint: "A short description that explains the content of the training",
        counter: 160,
        required: true
      }
    ],
    formData: {}
  }),
  computed: {},
  methods: {
    ...mapActions(["postTraining"]),
    handleSave() {
      if (this.$refs.form.validate()) {
        this.postTraining(this.formData).then(() => {
          this.handleClose();
        });
      }
    },
    handleClose() {
      this.$refs.form.reset();
      this.dialog = false;
    }
  }
};
</script>

