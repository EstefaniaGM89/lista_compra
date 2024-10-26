document.addEventListener('DOMContentLoaded', () => {
  const inputValue = document.getElementById('value');
  const addButton = document.getElementById('addButton');
  const removeButton = document.getElementById('removeButton');
  const list = document.getElementById('list');
  const count = document.getElementById('count');
  const maxItems = 10;
  const errorMsg = document.createElement('p');
  errorMsg.style.color = 'red';
  count.parentNode.insertAdjacentElement('afterend', errorMsg);

  const counterMsg = document.createElement('p');
  
  count.parentNode.insertAdjacentElement('afterend', counterMsg);

  const placeholders = ['Pa', 'Llet', 'Ous', 'Formatge', 'Tomàquets', 'Pasta', 'Aigua', 'Fruita', 'Arròs', 'Enciam'];

  const updateCount = () => {
    count.textContent = list.children.length;
    const counterItems = maxItems - list.children.length;
    counterMsg.textContent = `Queden ${counterItems} elements per afegir.`;

    addButton.disabled = counterItems === 0;
  };

  const updatePlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    inputValue.placeholder = `Exemple: ${placeholders[randomIndex]}...`;
  };

  const addItem = () => {
    const value = inputValue.value.trim();

    const isDuplicate = Array.from(list.children).some(item => item.firstChild.textContent === value);
    if (isDuplicate) {
      errorMsg.textContent = 'Error! Aquest element ja existeix.';
      return;
    } else {
      errorMsg.textContent = '';
    }

    if (value !== '' && list.children.length < maxItems) {
      const newItem = document.createElement('li'); 

      const itemText = document.createElement('span');
      itemText.textContent = value;
      newItem.appendChild(itemText);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.className = 'secondary';
      deleteButton.addEventListener('click', () => {
        list.removeChild(newItem);
        updateCount();
        addButton.disabled = list.children.length >= maxItems;
      });

      newItem.appendChild(deleteButton);
      list.insertBefore(newItem, list.firstChild);

      inputValue.value = '';
      updateCount();
      updatePlaceholder();
      inputValue.focus();

      itemText.addEventListener('click', () => {
        if (itemText.style.textDecoration === 'line-through') {
            itemText.style.textDecoration = '';
        } else {
            itemText.style.textDecoration = 'line-through';
            itemText.style.textDecorationColor = 'red';
        }
    });

      if (list.children.length >= maxItems) {
        addButton.disabled = true;
      }
    }
  };

  const clearList = (callback) => {
    const itemCount = list.children.length;
    const confirmBox = window.confirm(`Vols buidar la llista? Hi ha ${itemCount} elements.`);
    if (confirmBox) {
      list.innerHTML = '';
      updateCount();
      callback();
      addButton.disabled = false;
    }
  };

  addButton.addEventListener('click', addItem);
  removeButton.addEventListener('click', () => clearList(() => inputValue.focus()));

  inputValue.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  });
  
  updateCount();
  updatePlaceholder();
});
