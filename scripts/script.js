document.addEventListener('DOMContentLoaded', () => {

  const inputValue = document.getElementById('value');
  const addButton = document.getElementById('addButton');
  const removeButton = document.getElementById('removeButton');
  const list = document.getElementById('list');
  const count = document.getElementById('count');
  const maxItems = 10;
  const placeholders = ['Formatge', 'Pa', 'Llet', 'Tomàquets', 'Ous', 'Enciam', 'Pasta', 'Arròs', 'Pollastre', 'Fruita']; // Llista predefinida per al placeholder

  // Actualitza el comptador d'elements
  const updateCount = () => {
    count.textContent = list.children.length;
    addButton.disabled = list.children.length >= maxItems; // Deshabilitar botó si el límit s'ha assolit
  };

  // Funció per canviar el placeholder de l'input de forma aleatòria
  const changePlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    inputValue.placeholder = `Exemple: ${placeholders[randomIndex]} ...`;
  };

  // Comprova si l'element ja existeix a la llista
  const isDuplicate = (value) => {
    return Array.from(list.children).some(item => item.textContent.replace('Eliminar', '').trim() === value);
  };

  // Afegeix un nou element a la llista
  const addItem = () => {
    const value = inputValue.value.trim();
    if (value === '') return;

    if (isDuplicate(value)) {
      alert('Aquest element ja existeix!'); // Mostrar missatge d'error si és un duplicat
      return;
    }

    const newItem = document.createElement('li'); 
    newItem.textContent = value;

    // Afegir botó d'eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'secondary';
    deleteButton.addEventListener('click', () => {
      list.removeChild(newItem);
      updateCount();
    });

    newItem.appendChild(deleteButton);
    list.insertBefore(newItem, list.firstChild);

    // Marcar com a comprat o descomptat
    newItem.addEventListener('click', () => {
      newItem.style.textDecoration = newItem.style.textDecoration === 'line-through' ? '' : 'line-through';
    });

    inputValue.value = '';
    updateCount();
    inputValue.focus();
    changePlaceholder(); // Canviar el placeholder després d'afegir l'element
  };

  // Buidar la llista
  const clearList = (callback) => {
    const itemCount = list.children.length;
    const confirmBox = window.confirm(`Vols buidar la llista? Hi ha ${itemCount} elements.`);
    if (confirmBox) {
      list.innerHTML = '';
      updateCount();
      callback();
    }
  };

  addButton.addEventListener('click', addItem);
  removeButton.addEventListener('click', () => clearList(() => inputValue.focus()));

  inputValue.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });

  // Inicia el placeholder de manera aleatòria
  changePlaceholder();
});