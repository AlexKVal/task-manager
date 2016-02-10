import Ember from 'ember';

export default Ember.Component.extend({
  tasks: Ember.A(),

  init() {
    this._super(...arguments);

    this.get('taskManager').addListener('monitor', this);
  },

  willDestroyElement() {
    this.set('tasks', Ember.A());
    this.get('taskManager').destroyListener('monitor');
  },

  addTask(task) {
    this.get('tasks').pushObject(task);
  }
});
