import React, { useState } from 'react';
const Edit_task = ({ task, onSave, onCancel, props, taskText  }) => {

const { title = ''} = task || {};

const [newTitle, setNewTitle] = useState(title);
const [editTask, setEditTask] = useState({ task: "" });


return (
  <form onSubmit={(e) => {
      e.preventDefault();
      onSave(newTitle);
    }}
  >
    <label htmlFor="newTitle"></label>
<input
  type="text"
  name="newTitle"
  id="newTitle"
  defaultValue={taskText} required
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