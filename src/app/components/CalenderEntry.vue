<template>
  <div id="calendar-entry">
    <div class="calendar-entry-note">
      <input type="text" placeholder="New Event" v-model="newEventEntry" required/>
      <p class="calendar-entry-day">
        Day of event: <span class="bold"> {{ titleOfActiveDay }}</span>
      </p>
      <a class="button is-primary is-small is-outlined" @click="submitEvent(newEventEntry)">
        Submit
      </a>
    </div>
    <p class="display-error" v-if="error">
      Please enter an entry first!
    </p>
  </div>
</template>

<script>

import { store } from "../store";

export default {
  name: 'CalenderEntry',
  data: () => ({
    newEventEntry: '',
    error: false
  }) ,
  computed: {
    titleOfActiveDay() {
      // this.newEventEntry == '' ? this.error = false : this.error = true;
      if (this.newEventEntry == '') this.error = false;
      return store.getActiveDay().fullTitle;
    }
  },
  methods: {
    submitEvent(eventDetails) {
      if (eventDetails === '') return this.error = true;

      store.submitEvent(eventDetails);
      this.newEventEntry = '';
      this.error = false
    }
  }
}
</script>

<style lang="scss" scoped>
#calendar-entry {
  background: #FFF;
  border: 1px solid #42b883;
  border-radius: 10px;
  max-width: 300px;
  margin-top: 50px;
  padding: 20px;

  .calendar-entry-note {
    input {
      width: 200px;
      font-weight: 600;
      border: 0;
      border-bottom: 1px solid #CCC;
      font-size: 15px;
      height: 30px;
      margin-bottom: 10px;

      &:focus {
        outline: none;
      }
    }

    .calendar-entry-day {
      color: #42b883;
      font-size: 12px;
      margin-bottom: 10px;
      padding-bottom: 5px;

      .bold {
        font-weight: 600;
      }
    }

    .submit {
      display: block;
      margin: 0 auto;
    }
  }

  .display-error {
    color: red;
    font-size: 13px;
  }
}
</style>
