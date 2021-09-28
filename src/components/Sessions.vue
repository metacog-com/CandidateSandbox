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
          application_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
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
          application_id: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
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
