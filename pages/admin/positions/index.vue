<template>
  <v-data-table
    :headers="headers"
    :items="positions"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat class="grey lighten-3">
        <v-toolbar-title>Position</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add Position
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="pa-3 grey lighten-3">
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text class="pa-0">
              <v-form ref="form">
                <v-container>
                  <v-row dense>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Position name"
                        outlined
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="300px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>

export default {
  layout: 'admin',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Bus name", value: "name" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
    positions: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Position" : "Edit Position";
    },

    searchQuery() {
      return "";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },

    searchQuery: {
      handler(nv, ov) {
        if (nv !== ov) {
          setTimeout(() => {
            this.initialize(this.searchQuery);
          }, 300);
        }
      },
      immediate: true,
      deep: true
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$axios
        .get("position")
        .then(response => {
          this.positions = response.data;
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        });
    },

    editItem(item) {
      this.editedIndex = this.positions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.positions.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$axios
        .delete("/position/" + this.editedItem.id)
        // this.$store
        //   .dispatch("bus/deleteBus", this.editedItem.id)
        .then(response => {
          this.$toast.success("Data has been Deleted");
          this.positions.splice(this.editedIndex, 1);
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        })
        .finally(() => {
          this.initialize();
          this.closeDelete();
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.form.reset();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          this.$axios
            .put('/position/' + this.editedItem.id, this.editedItem)
            .then((response) => {
              this.$toast.success("Data has been Updated");
                Object.assign(this.positions[this.editedIndex], this.editedItem);
                this.close();
            })
            .catch(error => {
              // this.setErrorMessages(error.response.data.errors)
              this.$toast.error(error.response.data.message)
              console.log(error);
            })
        } else {
          this.$axios
            .post('/position', this.editedItem)
            .then((response) => {
              this.$toast.success("Data has been saved");
                this.positions.push(response.data.data);
                this.close();
            })
            .catch(error => {
              // this.setErrorMessages(error.response.data.errors)
              this.$toast.error(error.response.data.message)
              console.log(error);
            })
        }
      } else {
        this.$toast.error("Please filled all required fields");
      }
    }
  }
};
</script>
