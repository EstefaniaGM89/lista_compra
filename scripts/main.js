document.addEventListener('DOMContentLoaded', () => {

  const inputValue = document.getElementById('value');
  const addButton = document.getElementById('addButton');
  const removeButton = document.getElementById('removeButton');
  const list = document.getElementById('list');
  const count = document.getElementById('count');

  const updateCount = () => {
    count.textContent = list.children.length;
  };

  const addItem = () => {   // Afegir un element nou a la llista
    const value = inputValue.value.trim();
    if (value !== '') {
      const newItem = document.createElement('li'); 
      newItem.textContent = value;
      list.insertBefore(newItem, list.firstChild);  // Afegir l'element al principi de la llista

      inputValue.value = '';  // Buidar contingut després d'afegir l'element
      updateCount(); // Actualitza el nombre d'elements
      inputValue.focus();  // Posar el focus a l'input després d'insertar o esborrar
    }
  };

  const clearList = (callback) => {
    const itemCount = list.children.length; // Comptar elements
    const confirmBox = window.confirm(`Vols buidar la llista? Hi ha ${itemCount} elements.`); // Mostrar diàleg amb el nombre d'elements
    if (confirmBox) {
      list.innerHTML = ''; // Eliminar tots els elements fent click al botó "Esborrar"
      updateCount();
      callback(); // Implemento un callback per tornar a posar el focus a l'input
    }
  };

  addButton.addEventListener('click', addItem);
  removeButton.addEventListener('click', () => clearList(() => inputValue.focus()));

  inputValue.addEventListener('keydown', (event) => {  // Evitar que refresqui la pàgina per defecte
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });
});