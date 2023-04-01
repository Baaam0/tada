
import { useEffect, useState } from 'react'
import axios from 'axios'
import Component from 'components/login'
import { prisma } from '../../../../server/db/client'
import styles from '@/styles/Home.module.css'
import MyComponent from 'components/back'


export default function Home({taskLists, tasks}) {
  
  const [title, setTitle] = useState("");
  const [showTasks, setShowTasks] = useState(tasks);
  const [showTaskLists, setShowTaskLists] = useState(taskLists);
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setShowTasks(tasks)
  }, [tasks])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(title)
    const { data } = await axios.post("api/task", { title })
    console.log(data);
  }

  return (
    <div className={styles.main}>
    <Component/>
    <MyComponent/>

    <div className={styles.title}>
      <h1>
        To-do List / Tasks
      </h1>
    </div>

    <div className={styles.tasklist}>
    <h1>{showTaskLists.map((tasks) => (
      <div key={tasks.id}>
        <h2>{tasks.title}</h2>
      </div>
    ))}
    </h1>
    </div>

    <div className={styles.addTask}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='task title' onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder='priority' onChange={(e) => setPriority(e.target.value)}/>
        <input type="date" placeholder='due date' onChange={(e) => setDueDate(e.target.value)}/>
        <textarea placeholder='description' onChange={(e) => setDescription(e.target.value)}></textarea>
        <button type='submit'>add task</button>
      </form>
    </div> 

    <div className={styles.tasks}> 
      {showTasks.map((tasks) => (
        <div key={tasks.id} className={styles.task}>
          <div className={styles.cont1}>
            <h2>{tasks.title}</h2>
              <div className={styles.cont2}>
                <h2>Priority: {tasks.priority}</h2>   
                <h2>Due date: {new Date(tasks.dueDate).toLocaleString('en-CA')}</h2>
              </div>
          </div>
          <h2>{tasks.description}</h2>
        </div>
      ))}
    </div>

    </div>
    )
  }

  
export async function getServerSideProps(context) {
  const {tasklistId} = context.params;
  console.log(tasklistId)
 
  const tasks = await prisma.task.findMany({
    where: {
      taskListId: parseInt(tasklistId),
  }
  })

  const tasklists = await prisma.taskList.findMany({
    where: {
      id: parseInt(tasklistId),
    },  
  })

  return {
    props: {
      tasks: JSON.parse(JSON.stringify(tasks)),
      taskLists: JSON.parse(JSON.stringify(tasklists)),
    },
  }
}
