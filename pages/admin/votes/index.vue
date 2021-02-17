<template>
  <v-data-table
    :headers="headers"
    :items="votes"
    sort-by="calories"
    class="elevation-1"
  >
  </v-data-table>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  layout: 'admin',
  data: () => ({
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Voter Id", value: "voter_id" },
      { text: "Candidate Id", value: "candidate_id" },
      { text: "Status", value: "status" },
    ],

    votes: [],
    // users: [],
  }),

  created() {
    this.initialize();
    // this.getUsers();
  },

  methods: {
    initialize() {
      this.$axios
        .get("/vote")
        .then(response => {
          this.votes = response.data;
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        });
    },

  }
};
</script>
