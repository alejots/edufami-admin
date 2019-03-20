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
    label: String,
    stepId: Number
  },
  data: () => ({
    dialog: false,
    valid: false,
    form: [
      /* {
        model: "order",
        type: "text",
        label: "Order",
        hint: "Order",
        counter: 55,
        required: true,
        rules: [v => !!v || "Order is required"]
      }, */
      {
        model: "text",
        type: "text",
        label: "Text",
        hint: "",
        counter: 300,
        required: true,
        rules: [
          v => !!v || "Text of the option is required",
          v =>
            (v && v.length <= 300) ||
            "Text of the option must be less than 300 characters"
        ]
      },
      {
        model: "feedback",
        type: "text",
        label: "Feedback",
        hint: "Feedback",
        counter: 1500,
        required: true,
        rules: [
          v => !!v || "Feedback is required",
          v => (v && v.length <= 1500) || "Name must be less than 55 characters"
        ]
      }
      /* {
        model: "column",
        type: "text",
        label: "Column",
        hint: "Column",
        counter: 1,
        required: true,
        rules: [
          v => !!v || "Column is required",
          v => (v && v.length <= 1) || "Name must be less than 1 characters"
        ]
      } */
    ],
    formData: {}
  }),
  computed: {},
  methods: {
    ...mapActions(["postOption"]),
    handleSave() {
      if (this.$refs.form.validate()) {
        this.formData["stepId"] = this.stepId;
        this.postOption(this.formData).then(() => {
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

