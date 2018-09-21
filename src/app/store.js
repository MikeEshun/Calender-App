import { seedData } from './seed';

export const store = {
  state: {
    seedData
  },
  getActiveDay() {
    return this.state.seedData.find((day) => day.active);
  },
  setActiveDay(dayId) {
    this.state.seedData.map((dayObj) => {
      dayObj.id === dayId ? dayObj.active = true : dayObj.active = false;
    })
  },
  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay();
    activeDay.events.push({
      'details': eventDetails,
      'edit': false,
    });
  },
  getDayObject(dayId) {
    return this.state.seedData.find(
      day => day.id === dayId
    );
  },
  getEventObj(dayId, eventDetails) {
    const dayObj = this.getDayObject(dayId);

    return dayObj.events.find(
      event => event.details === eventDetails
    );

  },
  enableEventEdit(dayId, eventDetails) {
    const eventObj = this.getEventObj(dayId, eventDetails);
    
    return eventObj.edit = true;
  },
  updateEvent(dayId, oldEvent, newEvent) {
    const eventObj = this.getEventObj(dayId, oldEvent);

    if (newEvent === ' ') return eventObj.details = oldEvent;

    eventObj.details = newEvent;
    eventObj.edit = false;
  },
  deleteEvent(dayId, eventDetails) {
    const dayObj = this.getDayObject(dayId);
    
    const eventIndex = dayObj.events.findIndex(
      event => event.details === eventDetails
    );
    dayObj.events.splice(eventIndex, 1);
  }
}