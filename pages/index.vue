<template>
  <div class="">
    <v-card
      class="mx-auto mb-10"
      outlined
      max-width="1200"
    >
      <v-card-title class="primary white--text">
        <h3 class=" text-center">Vote Your Favourite Candidates</h3>
      </v-card-title>
      <v-card-text class="pa-2">
        <div class="text-center">
          <h3 class="unique-text">
            <strong>
              <v-chip class="warning" small>
                Note
              </v-chip>
              You Can Votes A section Candidates only 
              <v-chip class="primary" small>Once</v-chip>
              !!
              <br> 
              And You Can votes by Click on 
              <v-chip class="success" small>Yes</v-chip>
              and 
              <v-chip class="red white--text" small>No</v-chip>
              Button
            </strong>
          </h3>
        </div>    
      </v-card-text>
    </v-card>

    <v-card 
      v-for="(position, i) in positions" 
      :key="i" 
      class="mx-auto mb-10"
      outlined
      max-width="1200" 
      >
      <v-card-title class="grey lighten-3">
        Cast your vote for a 
        <v-chip class="white--text ml-3" color="primary" label>{{position.name}}</v-chip>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="position.candidates"
        :disable-pagination="true"
        hide-default-footer
      >
        <template v-slot:item.actions="{ item }">
          <v-btn small color="success" class="mr-2">
            Yes
          </v-btn>
          <v-btn color="red" class="white--text" small>
            No
          </v-btn>
        </template>
        
        <template v-slot:no-data>
          <v-btn color="primary">
            Reload
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    
    <v-dialog v-model="votingDialog" max-width="300px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to vote this candidate?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text 
            >Yes
          </v-btn>
          <v-btn color="blue darken-1" text 
            >No
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import User from "@/static/helpers/User.js";
  export default {
    data() {
      return {
        votingDialog: false,
        positions: [],
        headers: [
          { text: "Icon", value: "iocn" },
          {
            text: "Candidate Name",
            align: "start",
            sortable: false,
            value: "name"
          },
          { text: "Team", value: "team" },
          { text: "Vote", value: "actions", sortable: false }
        ]
      }
    },
    
    mounted(){
      if (!User.loggedIn()) {
		    this.$router.push('/login')
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
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
