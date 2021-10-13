<template>
  <Nav v-if="sessions.length" class="mb-6" :sessions="sessions" @selectSession="selectSession" @unselectSession="unselectSession"/>
  <div class="container">
    <p v-if="errored">Sorry there was an error</p>
    <div v-if="loading" class="loader"></div>

    <div class="lineChartContainer" v-if="selectedSession">
      <h2>Session: {{ selectedSession.session_id }}</h2>
      <p v-if="selectedSession">Loaded {{ events.length }} of {{ selectedSession.count }} events</p>
      <EventChart :key="lineChartData" v-if="lineChartData.data" :data="lineChartData" />
    </div>

    <div class="plotChartContainer" v-if="!selectedSession">
      <SessionChart v-if="plotChartData.length" :data="plotChartData"/>
    </div>
  </div>
</template>

<script>
import EventChart from "./EventChart";
import SessionChart from "./SessionChart";
import Nav from './Nav'
import { chartJsHelpers } from "../utils/chartJsHelpers";
import { messages } from "./../lang/en/messages";
import { metaCogApi } from "./../services/metaCogApi";

export default {
  props: {},

  components: {
    EventChart,
    SessionChart,
    Nav
  },
  data() {
    return {
      sessions: [],
      events: [],
      lineChartData: {},
      plotChartData: [],
      selectedSession: null,
      errored: false,
      loading: true
    }
  },

  async created() {
    this.getSessions();
  },

  methods: {
    async getSessions() {
      this.loading = true
      try {
        const response = await metaCogApi.getSessions();
        this.plotChartData = chartJsHelpers.generatePlotChartData(response.data.results)
        this.sessions = response.data.results;
      } catch (e) {
        this.errored = messages.error;
      }
      this.loading = false
    },
    async getEvents(sessionId) {
      console.log(sessionId)
      this.loading = true
      try {
        const response = await metaCogApi.getEvents(sessionId, 0, 1000)
        this.lineChartData = chartJsHelpers.generateLineChartData(response.data.events)
        this.events = response.data.events;
      } catch (e) {
        this.errored = messages.error; 
      }
      this.loading = false
    },
    selectSession(session) {
      this.selectedSession = session;
      this.getEvents(session.session_id);
    },
    unselectSession(){
      this.selectedSession = null;
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  height: 80vh;
}

.container > .lineChartContainer, 
.container > .plotChartContainer{
  width: 80%;
  margin: 0 auto;
}

.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
