function component() {
  const element = document.createElement('div');
  element.innerHTML = ['Hello', 'world!', 'Employee'].join(' ');

  return element;
}

document.body.appendChild(component());
