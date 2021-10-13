// imports
import axios from "axios";

class MetaCogApi {
  #base_url;
  #application_id;
  #publisher_id;

  constructor(token, application_id, publisher_id) {
    console.log(publisher_id)
    this.#base_url = `https://sandbox.testapi.metacog.com/DataRequest/${token}`;
    this.#application_id = application_id;
    this.#publisher_id = publisher_id;
  }

  get application_id() {
    return this.#application_id;
  }

  get publisher_id() {
    return this.#publisher_id;
  }

  get base_url() {
    return this.#base_url;
  }

  // get all sessions 
  getSessions() {
    const url = `${this.#base_url}/sessions`;
    return axios({
      method: "GET",
      headers: {
        publisher_id: this.#publisher_id,
        application_id: this.#application_id
      },
      url,
    });
  }

  // get all events for a session
  // skip and size can be used for pagination
  getEvents(sessionId, skip, size) {
    const url = `${this.#base_url}/events?session_id=${sessionId}&skip=${skip}&size=${size}`;
    return axios({
      method: "GET",
      headers: {
        publisher_id: this.#publisher_id,
        application_id: this.#application_id
      },
      url,
    })
  }
}

// .env variables
const token = process.env.VUE_APP_META_COG_API_TOKEN;
const application_id = process.env.VUE_APP_META_COG_APPLICATION_ID;
const publisher_id = process.env.VUE_APP_META_COG_PUBLISHER_ID;

// export metaCogApi instance
export const metaCogApi = new MetaCogApi(token, application_id, publisher_id)