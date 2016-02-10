import Ember from 'ember';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Task = Ember.Object.extend({
  finished: false,
  name: null,
  run: null,
  alert: null
});

const Alert = Ember.Object.extend({
  message: null
});

export default Ember.Route.extend({
  clicks: 0,

  _createTask(name) {
    const rand = getRandomInt(1, 10);

    return Task.create({
      name,
      run() {
        return new Ember.RSVP.Promise(resolve => {
          Ember.run.later(function() {
            resolve();
          }, rand * 1000);
        });
      },
      alert: Alert.create({
        message: `Task ${this.incrementProperty('clicks')} "${name}" finished after ${rand} seconds.`
      })
    });
  },

  actions: {
    runTask() {
      const name = this.get('controller.name');
      this.get('taskManager').runTask(this._createTask(name));
    }
  }
});
