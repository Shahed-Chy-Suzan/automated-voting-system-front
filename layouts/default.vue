<template>
  <v-app dark>
   
    <v-app-bar :clipped-left="clipped" fixed app flat>
      <v-toolbar-title v-text="title" />
      <v-spacer />
        <v-btn
          offset-y
          left
          color="success"
          to="/logout"
        >
        <v-icon class="mr-2">mdi-login-variant</v-icon>
        Log Out
        </v-btn>
      <!-- </v-menu> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Automated Voting System',
    }
  }
}
</script>
