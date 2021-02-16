<template>
  <div class="">
    <v-card
      class="mx-auto"
      flat
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

    <v-card-text>
       <v-data-table
        :headers="headers"
        :items="candidates"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat class="grey lighten-3">
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
          </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn small color="success" class="mr-2">
            Yes
          </v-btn>
          <v-btn color="red" small>
            No
          </v-btn>
        </template>
        
        <template v-slot:no-data>
          <v-btn color="primary">
            Reload
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
      
    </v-card>
  </div>
</template>

<script>
import User from "@/static/helpers/User.js";
  export default {
    data() {
      return {
        votingDialog: false,
        candidates: [],
        headers: [
          { text: "Icon", value: "team" },
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
    }
  }
</script>

<style lang="scss" scoped>

</style>
