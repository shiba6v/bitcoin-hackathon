export default (_controllers, _actions, proc) => {
  const [controller, action] = ['controller', 'action'].map(x =>
    document.body.attributes.getNamedItem(`data-${x}`).value
  );

  const pure = x => Array.isArray(x) ? x : [x];
  const [controllers, actions] = [_controllers, _actions].map(pure);

  if (controllers.includes(controller) && actions.includes(action)) {
    window.addEventListener('DOMContentLoaded', proc);
  }
};
