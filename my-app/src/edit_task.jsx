import React, { useState } from 'react';
const Edit_task = ({ task, onSave, onCancel }) => {
const { title = '', description = '', dueDate = '', id } = task || {};

const [newTitle, setNewTitle] = useState(title);
const [newDescription, setNewDescription] = useState(description);
const [newDueDate, setNewDueDate] = useState(dueDate);

return (
  <form onSubmit={(e) => {
      e.preventDefault();
      onSave(newTitle, newDescription, newDueDate);
    }}
  >
    <label htmlFor="newTitle"></label>
    <input
      type="text"
      id="newTitle"
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      style={{backgroundColor: 'white', color: 'black'}}
      className='inputAdicionarTarefa'
      placeholder="Editar a sua tarefa!"
    />

    <button type="submit" className=" btnAdicionarTarefa">Salvar tarefa editada!</button>
  </form>
);
};

export default Edit_task;