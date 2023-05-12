import React,{ useState, useEffect } from 'react'
import './App.css'
// ? Lapis
import {BsPencil} from "react-icons/bs";

//TODO: Cheack FaTrash BiPlusMedical
import {AiOutlineCheck} from "react-icons/ai";
import {FaTrash} from "react-icons/fa";
import {BiPlusMedical} from "react-icons/bi";
import Edit_task from "./edit_task";


const App = () => {
  const [task, setTask] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [modal, setModal] = useState(false);
  const [modalEditarTarefa, setModalEditarTarefa] = useState(false);
  
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('itemsList'));
    if (storedList) {
      setItemsList(storedList);
    }
  }, []);

  

  const handleChangeInput = (event) => {
    const inputTask  = event.target.value;
    setTask(inputTask);
  }

  const handleAddItemToList = (event) => {
    event.preventDefault(); 

    if (!task.trim()) { // <----- Se nao tiver vazio, nao faz nada
      alert("Escreva alguma coisa para adicionar  uma tarefa");
      return
    };

    const word ={
      task: task,
      id: Date.now(),
      completed: false
    }
    const newList = [...itemsList, word];
    setItemsList(newList);
    localStorage.setItem("itemsList", JSON.stringify(newList));
    setTask("");
    setModal(false);
  }
  const  handleDeleteItem = (id) => {
    const updatedItemsList = itemsList.filter((item) => item.id !== id);
    setItemsList(updatedItemsList);
    if (updatedItemsList.length === 0) {
      localStorage.removeItem("itemsList");
    } else {
      localStorage.setItem("itemsList", JSON.stringify(updatedItemsList));
    }
    
  }

const handleToggleCompleted = (itemId) => {
  const updatedItems = itemsList.map((item) => {
    if (item.id === itemId) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
  setItemsList(updatedItems);
  localStorage.setItem("itemsList", JSON.stringify(updatedItems)); // <--- adiciona essa linha
};


  const handleEditClick = (id, task) => {
    setEditTaskId(id);
    setModalEditarTarefa(true);
    //setTaskToEdit({ id: id, task: task });
  };
  

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const newTitle = document.querySelector('#newTitle').value;
    const newDescription = document.querySelector('#newDescription').value;
    const newDueDate = document.querySelector('#newDueDate').value;
    handleEditTask(editTaskId, newTitle, newDescription, newDueDate);
    fecharModalEditarTarefa();
  };
  
  const abrirModal  = () => {
      setModal(true);
  }

  const fecharModal  = () => {
    if (event.target.className === "backgroundModal") {
      setModal(false);
    }}  

const fecharModalEditarTarefa  = () => {
  if (event.target.className === "backgroundModal") {
  setModalEditarTarefa(false);
  }} 

  const handleEditTask = (taskId, newTitle, newDescription, newDueDate) => {
    setItemsList(prevList => {
      const updatedList = prevList.map(task => {
        if (task.id === taskId) {
          return { ...task, task: newTitle, description: newDescription, dueDate: newDueDate };
        } else {
          return task;
        }
      });
      localStorage.setItem("itemsList", JSON.stringify(updatedList)); // adiciona essa linha
      return updatedList;
    });
    setModalEditarTarefa(false);
  };
  

const handleSave = (newTitle, newDescription, newDueDate) => {
  handleEditTask(editTaskId, newTitle, newDescription, newDueDate);
 
};
  
  return (

      <div className='div'>
      <div className='divContat'>
      <h1 className='titleH1'>Tarefas do dia!</h1>           
      <div>
        <button onClick={abrirModal}
    className="btnAbrirModal">+</button>
      </div>
        
      <div>
    {Array.isArray(itemsList) && itemsList.map((item, index) => (
      
    <div key={index}
    className={item.completed ? "completed" : "incompleted"}> <span className='spanTask' 
    onClick={() => handleToggleCompleted(item.id)}>
    {item.task}</span>
    <div className='teste'>

    <span style={{marginRight:'30px', color:'red', cursor:'pointer'}} onClick={() => handleDeleteItem(item.id)}> 
    <FaTrash/>
    </span>
    
    <span style={{marginRight:'30px', color:'green', cursor:'pointer'}} onClick={() => handleToggleCompleted(item.id)}
>
    <AiOutlineCheck/>
    </span>
{/*     justify-content: space-between;
 className={item.completed ? "completed" : ""} */}
    <span onClick={() => handleEditClick(item.id, item.task)} style={{ color:'blue', cursor:'pointer'}}>
    <BsPencil/>
    </span>

    </div>

    </div>

    ))}
{
  modal?
  <div className='backgroundModal'  onClick={fecharModal} > 
    <div className='modal'>

    <form onSubmit={handleAddItemToList}>

  <input type="text" className='inputAdicionarTarefa' placeholder='Adicione uma tarefa' 
  onChange={handleChangeInput} value={task}  style={{color: 'black', backgroundColor:'white'}} />

  <br />

  <button className='btnAdicionarTarefa'>Adicionar uma tarefa</button>
</form>
</div>
</div>
  :
  itemsList.length <= 0?
  <div>
    <h1 className='h1TarefaN'>Nenhuma tarefa foi encontrada.</h1>
  </div>
  :

  modalEditarTarefa?
  
  <div className='backgroundModal' onClick={fecharModalEditarTarefa} >
  <div className='modal'>
<Edit_task
  modalEditarTarefa={modalEditarTarefa}
  fecharModalEditarTarefa={fecharModalEditarTarefa}
  onSave={handleSave}
  editTaskText={editTaskText}
/>
   
  </div>
  </div>

  :
  <div>
    <button onClick={abrirModal}
    className="btnAbrirModal">+</button>
  </div>
}
</div>


      </div>
    </div>
  )
}

export default App

