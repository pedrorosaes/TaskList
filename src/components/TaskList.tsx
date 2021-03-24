import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task{
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');


  function handleCreateNewTask() {
    //  Caso a string esteja vazia ele para a excução e emite o Alert
   if (!newTaskTitle) {
     alert('Digite algo')
   return }
   // Cria um novo objeto que recebe os valores id, title e isComplete e os adiciona a array tasks
    const newTasks= {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };
    setTasks(useState => [...useState,newTasks]);
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    //  Alterando valor do isComplete a partir do mapeamento das Ids da array Tasks. O task.map percorre a array buscando a task.id igual a id.
    const completedTasks = tasks.map (tasks => tasks.id === id ? {
      ...tasks, isComplete : !tasks.isComplete
    }: tasks)
    setTasks(completedTasks)
  }

  function handleRemoveTask(id: number) {
    // Adicionamos todos os objetos que possuem ids diferente a id recebida pelo onClick={() => handleRemoveTask(task.id)}> e repassamos a nova array formada para o Tasks
   const filterTaskRemove = tasks.filter(tasks => tasks.id !== id)
  setTasks(filterTaskRemove);

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}