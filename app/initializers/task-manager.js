export function initialize(application) {
  application.inject('route', 'taskManager', 'service:task-manager');
  application.inject('component', 'taskManager', 'service:task-manager');
}

export default {
  name: 'task-manager',
  initialize
};
