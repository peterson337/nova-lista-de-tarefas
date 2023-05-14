import React,{ useState, useEffect } from 'react'
import './App.css'
// ? Lapis
import {BsPencil} from "react-icons/bs";

//TODO: Cheack FaTrash BiPlusMedical
import {AiOutlineCheck} from "react-icons/ai";
import {FaTrash} from "react-icons/fa";
import Edit_task from "./edit_task";
import { collection, addDoc } from "firebase/firestore"; // importando a biblioteca
import {db} from "./firabse";


// criando uma referência para a coleção de tarefas
const tasksCollectionRef = collection(db, "tasks");

// escrevendo os dados da tarefa no Firestore
async function addTaskToFirestore(task) {
  try {
    const docRef = await addDoc(tasksCollectionRef, task);
    /* console.log("Task written with ID: ", docRef.id); */
  } catch (e) {
    console.error("Error adding task: ", e);
  }
}


const App = () => {
  const [task, setTask] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [modal, setModal] = useState(false);
  const [modalEditarTarefa, setModalEditarTarefa] = useState(false);
  const [editTask, setEditTask] = useState(null); // adicionar o estado editTask

  
  
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

  const handleAddItemToList = (event, id) => {
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
    addTaskToFirestore(word); // <- Chamando a função aqui
    const newList = [...itemsList, word];
    setItemsList(newList);
    localStorage.setItem("itemsList", JSON.stringify(newList));
    setTask("");
    const selectedTask = itemsList.find((item) => item.id === id); // encontra a tarefa selecionada
    setEditTask(selectedTask); // armazena a tarefa selecionada no estado editTask

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


  const handleEditClick = (id) => {
    const selectedTask = itemsList.find((item) => item.id === id); // encontrar a tarefa selecionada
    setEditTask(selectedTask);
    setEditTaskId(id);
    setModalEditarTarefa(true);
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
    setEditTask(null)
  };
  

const handleSave = (newTitle, newDescription, newDueDate) => {
  handleEditTask(editTaskId, newTitle, newDescription, newDueDate, editTask.id);
 
 
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
  setEditTask={setEditTask}
  taskText={editTask ? editTask.task : ""} // adiciona essa linha

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

