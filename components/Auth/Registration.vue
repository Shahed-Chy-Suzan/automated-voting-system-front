<template>
  <div>
    <v-card flat outlined class="text-center" align="center">
      <v-toolbar dark class="text-center" flat>
        <v-spacer />
        <v-toolbar-title
          class="text-uppercase text-center font-weight-bold"
        >
          Voter Registration
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="voter_name"
                color="secondary"
                outlined
                label="Voter Name"
                hide-details="auto"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="age"
                color="secondary"
                outlined
                label="Age"
                hide-details="auto"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="nid"
                outlined
                color="secondary"
                label="Voter NID Number"
                hide-details="auto"
                required
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="user_name"
                outlined
                color="secondary"
                label="User Name"
                hide-details="auto"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn
                depressed
                color="success"
                :loading="isLoading"
                @click="scanFinger()"
              >
                Scan Finger
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="finger_print_id"
                outlined
                color="secondary"
                label="Finger Print Id"
                hide-details="auto"
                required
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions class="mb-5">
        <v-btn
          text
          small
          class="pl-0 text-capitalize"
          color="primary"
          router
          to="login"
        >Sign in instead?
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          :loading="isLoading"
          @click="login()"
        >Sign up
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      :color="errorColor"
      top
      right
    >
      {{ errorMessage }}
      <template>
        <v-btn
          color="white"
          text
          @click="false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import User from "@/static/helpers/User.js";

export default {
  props: {
    isDialog: {
      type: Boolean,
      required: false,
      default () {
        return false
      }
    }
  },

  data: () => ({
    isLoading: false,
    valid: true,

    voter_name: '',
    age: '',
    nid: '',
    user_name: '',
    finger_print_id: '',

    isLoggedIn: false,
    snackbar: false,
    errorMessage: '',
    errorColor: ''
  }),

  created(){
    if (User.loggedIn()) {
        this.$router.push('/')
    }
  },

  computed: {
    loginInfo () {
      return {
        voter_name: this.voter_name,
        age: this.age,
        nid: this.nid,
        user_name: this.user_name,
        finger_print_id: this.finger_print_id,
      }
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    },

    // goToSourceDestination () {
    //   if (this.isDialog) {
    //     this.$emit('closeAuthentication')
    //   } else {
    //     this.$router.push('/')
    //   }
    // },

    login () {
      this.isLoading = true
      if (!this.$refs.form.validate()) {
        this.errorMessage = 'Please input valid data'
        this.errorColor = 'error'
        this.snackbar = true
        this.isLoading = false
      } else {
        this.resetValidation()

        // this.$store.dispatch('auth/signup', this.loginInfo)
        this.$axios.post('/auth/signup',this.loginInfo)
          .then((response) => {
            User.responseAfterLogin(response)
            this.$toast.success("Registration Successful!");
            this.$router.push("/");
            // this.goToSourceDestination()
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            this.errorMessage = 'Invalid Credentials'
            this.errorColor = 'error'
            this.snackbar = true
            // eslint-disable-next-line no-console
            // console.log(error)
            // console.log(error.response.data.errors)
            // this.$toast.error("error.response.data.errors");
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },

    // checkAuth (next, path) {
    //   // only admin-group has the access to any property without association
    //   if (this.authToken !== null) {
    //     this.$router.push('/')
    //   } else {
    //     this.$router.push('/auth')
    //   }
    // }
  }
}
</script>
