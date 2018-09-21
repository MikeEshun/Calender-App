import { seedData } from './seed';

export const store = {
  state: {
    seedData
  },
  getActiveDay() {
    return this.state.seedData.find((day) => day.active);
  },
  setActiveDay(dayId) {
    this.state.seedData.map((dayObject) => {
      dayObject.id === dayId ? dayObject.active = true : dayObject.active = false;
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
  getEventObject(dayId, eventDetails) {
    const dayObject = this.getDayObject(dayId);

    return dayObject.events.find(
      event => event.details === eventDetails
    );

  },
  enableEventEdit(dayId, eventDetails) {
    const eventObj = this.getEventObject(dayId, eventDetails);
    
    return eventObj.edit = true;
  },
  updateEvent(dayId, oldEvent, newEvent) {
    const eventObj = this.getEventObject(dayId, oldEvent);

    if (newEvent === ' ') return eventObj.details = oldEvent;

    eventObj.details = newEvent;
    eventObj.edit = false;
  },
  deleteEvent(dayId, eventDetails) {
    const dayObject = this.getDayObject(dayId);
    
    const eventIndex = dayObject.events.findIndex(
      event => event.details === eventDetails
    );
    dayObject.events.splice(eventIndex, 1);
  }
}