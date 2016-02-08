import Ember from 'ember';

export default Ember.Component.extend({
  alerts: Ember.A(),

  init() {
    this._super(...arguments);

    this.get('taskManager').addListener('alerter', this);
  },

  addAlert(alert) {
    this.get('alerts').pushObject(alert);
  },

  actions: {
    removeAlert(alert) {
      this.get('alerts').removeObject(alert);
    }
  }
});
