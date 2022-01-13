import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

function handleCreateNewTask() {
  if (!newTaskTitle) {
    return ''; // definido que se nao tiver task retorne string vazia
  }

  const submittedTasks = {
    id: Math.random(), // Gerado um number randomico
    title: newTaskTitle, // Setando o title como as novas tasks
    isComplete: false // Seria estranho o inicio da aplicacao já existir uma task feita
  }

  setTasks(submittedState => [...submittedState, submittedTasks]);
  setNewTaskTitle(newTaskTitle);
}

  function handleToggleTaskCompletion(id: number) {
    const doneTasks = tasks.map(task => task.id === id ? { // se a task id for igual a id retorna objeto
      ...task, // todos os dados da task
      isComplete: !task.isComplete  // setando o isComplete para o seu valor contrario (se tiver incompleto fica completo e vice versa)
    } : task ); // caso o id for diferente de task.id, só fica o valor original mesmo

    setTasks(doneTasks); // e aí seto as informacoes no estado
  }

  function handleRemoveTask(id: number) {
    const filterTasks = tasks.filter(task => task.id !== id); // filtrando apenas o id da task selecionada nao excluindo as outras
    setTasks(filterTasks); // setando essas informacoes para o estado
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