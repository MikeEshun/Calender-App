<template>
  <div class="day-event" :style="getEventBackgroundColor">
    <div v-if="!event.edit">
      <span class="has-text-centered details">{{ event.details }}</span> 
      <div class="has-text-centered icons">
        <i class="fa fa-pencil-square edit-icon"
          @click="enableEventEdit(day.id, event.details)">
        </i> 
        <i class="fa fa-trash-o delete-icon" @click="deleteEvent(day.id, event.details)"></i>
      </div>
    </div>
    <div v-if="event.edit">
      <input type="text" :placeholder="event.details" v-model="newEvent"/>
      <div class="has-text-centered icons">
        <i class="fa fa-check" @click="updateEvent(day.id, event.details, newEvent)"></i>
      </div>
    </div>
  </div>
</template>

<script>

import { store } from '../store';

export default {
  name: "CalenderEvent",
  props: ["day", "event"],
  data: () => ({
    newEvent: ''
  }),
  computed: {
    getEventBackgroundColor() {
      const colors = ["#FF9999", "#85D6FF", "#99FF99"];
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      return `background-color: ${randomColor}`;
    }
  },
  methods: {
    enableEventEdit(id, eventDetails) {
      store.enableEventEdit(id, eventDetails);
    },
    updateEvent(dayId, oldEvent, newEvent) {
      if (newEvent === '') newEvent = oldEvent;
      store.updateEvent(dayId, oldEvent, newEvent);
      this.newEvent = '';
    },
    deleteEvent(dayId, eventDetails) {
      store.deleteEvent(dayId, eventDetails);
    },
  }
};
</script>

<style lang="scss" scoped>
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4c4c4c;
  padding: 5px;
  .details {
    display: block;
  }
  .icons .fa {
    padding: 0 2px;
  }
  input {
    background: none;
    border: 0;
    border-bottom: 1px solid #fff;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
}
</style>

