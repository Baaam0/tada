
import { useEffect, useState } from 'react'
import axios from 'axios'
import Component from 'components/login'
import { prisma } from '../../../../server/db/client'
import styles from '@/styles/Home.module.css'


export default function Home({taskLists, tasks}) {
  const [title, setTitle] = useState("");
  const [showTasks, setShowTasks] = useState(tasks);
  const [showTaskLists, setShowTaskLists] = useState(taskLists);

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

    <div className={styles.title}>
      <h1>
        To-do List / Tasks
      </h1>
    </div>

    <div className={styles.tasklist}>
    <h1 style={{backgroundColor: "red"}}>{showTaskLists.map((taskList) => (
      <div key={taskList.id}>
        <h2>{taskList.title}</h2>
      </div>
    ))}
    </h1>
    </div>

    <div className={styles.input}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='task title' onChange={(e) => setTitle(e.target.value)}/>
        <button type='submit'>add</button>
      </form>
    </div> 

    <div className={styles.tasks}> 
      {showTasks.map((tasks) => (
        <div key={tasks.id}>
          <h2>{tasks.title}</h2>
          <h2>{tasks.priority}</h2>
          <h2>{tasks.userId}</h2>
          <h2>{tasks.description}</h2>
          <h2>{tasks.dueDate}</h2>
        </div>
      ))}
    </div>

    </div>
    )
  }

  
export async function getServerSideProps() {
  const tasks = await prisma.task.findMany()
  const tasklists = await prisma.taskList.findMany()

  return {
    props: {
      tasks: JSON.parse(JSON.stringify(tasks)),
      taskLists: JSON.parse(JSON.stringify(tasklists)),
    },
  }
}
