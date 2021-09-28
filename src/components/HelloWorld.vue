<template>
  <div class="container">
    <div class="leftSide">
      <h2>Sessions</h2>

      <ul>
        <li v-for="session in sessions" :key="session.session_id" @click.prevent="selectSession(session)">
          {{ session.session_id }}
        </li>
      </ul>
    </div>

    <div class="rightSide">
      <h2>Selected Session</h2>

      {{ selectedSession }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  props: {},

  data() {
    return {
      sessions: [],
      selectedSession: null
    }
  },

  async created() {
    const url = `https://sandbox.testapi.metacog.com/DataRequest/fd58fc79-9d7f-4b15-b057-8561a0080c49/sessions`;

    const response = await axios({
      method: "GET",
      headers: {
        publisher_id: 'sandbox',
        metacog_access_token: 'eyJraWQiOiJ4WnR6Q3VEZ203TkRVVVFvMjFuYXFmUmloS09SSm94eDQzalVaY3Y1VjZrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmMzkzZjMxMi0yYTRhLTQ2NmMtOTBhYi03OGRkMjYxNDgyZmYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8xVGNrT0Z0a3MiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0M3AzYzk1a2tvYm1kbmJoNnZsZHZlb3BlNCIsIm9yaWdpbl9qdGkiOiI4OWY1Y2Q0Zi1hMGI3LTRiNjEtYTlmZC03NDNkMDQwNTkzY2QiLCJldmVudF9pZCI6IjA1ZmNiZWI2LTVmNWYtNDExZC1hNzgzLTIyOGE1MWU0OTc3MCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2MzI2OTE4NDcsImV4cCI6MTYzMjcwNjI0NywiaWF0IjoxNjMyNjkxODQ3LCJqdGkiOiJmMjMyNWU3MC0wMzE0LTRkNDEtYmMwZC1iNzkzNWU4OTgwYjEiLCJ1c2VybmFtZSI6ImYzOTNmMzEyLTJhNGEtNDY2Yy05MGFiLTc4ZGQyNjE0ODJmZiJ9.uvULSTsgOBwiFRP3LYAihKE77qnfKVj8wWhDrzFuu6kMy2oxT9R82_niw1UpCdmWwLTMYpnfdXpSvNh6nIH06U0e8naowFEtR4hk3NgdtZIasLT2JOeh1DM3Z_5nD9RlAWK8XWrWh-fRmJB7BJ9jG83H2XbnEGwnB8X7fbh0wFxHK5wiwSEqToh9PMzZC5ntBf-KJ9jJ64qFpTW7y9geHkh1TPDw8cdXPE6C63r8s5hNn_a0EGocoEyA2CD08dPPzeQB3qvgkm3giPwC49C14dzfvB1t7C2-oiybJkx6bq-MZ366-dB_2CH7QMRXWmo3BU295Kt2ohd03sbwetj7Uw',
        application_id: 'fGDy7OOyxreBzrlZUFqXh1Xk4DVnsVHt'
      },
      url,
    });

    this.sessions = response.data.results;
  },

  methods: {
    selectSession(session) {
      this.selectedSession = session;
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
}

.container > div {
  width: 50%;
}
</style>
