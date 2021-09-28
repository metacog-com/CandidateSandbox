<template>
  <div class="container">
    <div class="leftSide">
      <h2>Sessions</h2>

      <ul>
        <li v-for="session in sessions" :key="session.session_id">
          <a href="#" @click.prevent="selectSession(session)">{{ session.session_id }}</a>
        </li>
      </ul>
    </div>

    <div class="rightSide">
      <h2>Selected Session</h2>

      {{ selectedSession }}

      <p v-if="selectedSession">Loaded {{ events.length }} of {{ selectedSession.count }} events</p>

      <EventChart />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EventChart from "./EventChart";

export default {
  props: {},

  components: {
    EventChart
  },

  data() {
    return {
      sessions: [],
      events: [],
      selectedSession: null
    }
  },

  async created() {
    this.getSessions();
  },

  methods: {
    async getSessions() {
      const url = `https://sandbox.testapi.metacog.com/DataRequest/fd58fc79-9d7f-4b15-b057-8561a0080c49/sessions`;

      const response = await axios({
        method: "GET",
        headers: {
          publisher_id: 'sandbox',
          metacog_access_token: 'eyJraWQiOiJ4WnR6Q3VEZ203TkRVVVFvMjFuYXFmUmloS09SSm94eDQzalVaY3Y1VjZrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmMzkzZjMxMi0yYTRhLTQ2NmMtOTBhYi03OGRkMjYxNDgyZmYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8xVGNrT0Z0a3MiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0M3AzYzk1a2tvYm1kbmJoNnZsZHZlb3BlNCIsIm9yaWdpbl9qdGkiOiJlZWI1M2UzOC0zNTBlLTRjMWQtYTEzOS0wNDk4ZDdjMDM4NzAiLCJldmVudF9pZCI6IjYyNmQ0NWNkLWE5ODMtNDllOC05ZDQxLTRkZTdlNWNmZGVhYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2MzI4MzE4NjYsImV4cCI6MTYzMjg0NjI2NiwiaWF0IjoxNjMyODMxODY2LCJqdGkiOiIyNjdjYzM5Ny1mYzBjLTQ2ZjgtODU1Zi1jYWYwODQ5YWZiN2YiLCJ1c2VybmFtZSI6ImYzOTNmMzEyLTJhNGEtNDY2Yy05MGFiLTc4ZGQyNjE0ODJmZiJ9.lLeUyLMHtkDWH5x9We6g2f3kSaJDBGP7xHfzeTcsbV28yWJb3uHX2arRe90TqEopX9R4rAxeOgGbEqI85BZwYuJhKUlm9QH8P-1lKMpLLMSfm7kzE3_xsOs_MFjMu84EsfjAThg3sBXfiAdQZcHRuKt_AD8a8sjfw34B-kh-CspaVd5KfreX31C2Ei5pJc2nkDwUyxcymOvGnqwPEfjNS74YKdPbUCjtL-_cCcmwah1HecsGCoPRLwBmvYimhiSfKFokEUQDEYKeq9Gb0WJceqPkrDjZ9UMxllJFaEb-Mt6rpgWi9pgQOEWH6ZoY7CNWPJOM6RNyLtF5Acwye4f54w',
          application_id: 'fGDy7OOyxreBzrlZUFqXh1Xk4DVnsVHt'
        },
        url,
      });

      this.sessions = response.data.results;
    },

    async getEvents(sessionId) {
      const url = `https://sandbox.testapi.metacog.com/DataRequest/fd58fc79-9d7f-4b15-b057-8561a0080c49/events?session_id=${sessionId}&skip=0&size=1000`;

      const response = await axios({
        method: "GET",
        headers: {
          publisher_id: 'sandbox',
          metacog_access_token: 'eyJraWQiOiJ4WnR6Q3VEZ203TkRVVVFvMjFuYXFmUmloS09SSm94eDQzalVaY3Y1VjZrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmMzkzZjMxMi0yYTRhLTQ2NmMtOTBhYi03OGRkMjYxNDgyZmYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8xVGNrT0Z0a3MiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI0M3AzYzk1a2tvYm1kbmJoNnZsZHZlb3BlNCIsIm9yaWdpbl9qdGkiOiJlZWI1M2UzOC0zNTBlLTRjMWQtYTEzOS0wNDk4ZDdjMDM4NzAiLCJldmVudF9pZCI6IjYyNmQ0NWNkLWE5ODMtNDllOC05ZDQxLTRkZTdlNWNmZGVhYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2MzI4MzE4NjYsImV4cCI6MTYzMjg0NjI2NiwiaWF0IjoxNjMyODMxODY2LCJqdGkiOiIyNjdjYzM5Ny1mYzBjLTQ2ZjgtODU1Zi1jYWYwODQ5YWZiN2YiLCJ1c2VybmFtZSI6ImYzOTNmMzEyLTJhNGEtNDY2Yy05MGFiLTc4ZGQyNjE0ODJmZiJ9.lLeUyLMHtkDWH5x9We6g2f3kSaJDBGP7xHfzeTcsbV28yWJb3uHX2arRe90TqEopX9R4rAxeOgGbEqI85BZwYuJhKUlm9QH8P-1lKMpLLMSfm7kzE3_xsOs_MFjMu84EsfjAThg3sBXfiAdQZcHRuKt_AD8a8sjfw34B-kh-CspaVd5KfreX31C2Ei5pJc2nkDwUyxcymOvGnqwPEfjNS74YKdPbUCjtL-_cCcmwah1HecsGCoPRLwBmvYimhiSfKFokEUQDEYKeq9Gb0WJceqPkrDjZ9UMxllJFaEb-Mt6rpgWi9pgQOEWH6ZoY7CNWPJOM6RNyLtF5Acwye4f54w',
          application_id: 'fGDy7OOyxreBzrlZUFqXh1Xk4DVnsVHt'
        },
        url,
      });

      this.events = response.data.events;
    },

    selectSession(session) {
      this.selectedSession = session;

      this.getEvents(session.session_id);
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
}

.container > div {
  width: 46%;
  margin: 0 2%;
}
</style>
