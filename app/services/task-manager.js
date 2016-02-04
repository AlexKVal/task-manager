import Ember from 'ember';

export default Ember.Service.extend({
  tasks: Ember.A(),

  alerter: null,
  monitor: null,

  addListener(type, component) {
    this.set(type, component);
    if (component && type === 'monitor') { // TODO something is fishy here
      this.get('tasks').map( task => {
        component.addTask(task);
      });
    }
  },

  destroyListener(type) {
    this.set(type, null);
  },

  runTask(task) {
    this._taskStarted(task);

    task.run().then(() => {
      this._taskFinished(task);
    });
  },

  _taskStarted(task) {
    this.get('tasks').pushObject(task);

    const monitor = this.get('monitor');
    if (monitor) {
      monitor.addTask(task);
    }
  },

  _taskFinished(task) {
    task.set('finished', true);

    const alerter = this.get('alerter');
    if (alerter) {
      alerter.addAlert( task.get('alert') );
    }
  }
});
