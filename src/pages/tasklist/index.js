
import { useEffect, useState } from 'react'
import axios from 'axios'
import Component from 'components/login'
import postTaskList from '../api/tasklist';
import { prisma } from '../../../server/db/client'
import styles from '@/styles/Home.module.css'
import React from 'react';



export default function Home({taskLists}) {
  const [title, setTitle] = useState("");
  const [showTaskLists, setShowTaskLists] = useState(taskLists);

  useEffect(() => {
    setShowTaskLists(taskLists)
  }, [taskLists])
  
  const handleSubmit = async (e) => {
    console.log(title);
    e.preventDefault();
    if (!title) {
      return;
    }
    try {
      const { data } = await postTaskList({ title }, {
      });
      setShowTaskLists([...showTaskLists, data]);
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className={styles.main}>
    <Component/>
    
    <div className={styles.title}>
    <h1>To-do List / Category</h1>
    </div>


    <div className={styles.input}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Type new task list' 
          
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type='submit'>Add New List</button>
      </form>
    </div>

    <div className={styles.tasklists}>
      {showTaskLists.map((tasklist) => (
        <a key={tasklist.id} href={`/tasklist/${tasklist.id}`} className={styles.tasklist}>
          <h2>{tasklist.title}</h2>
          <h2>{tasklist.userId}</h2>
          <h2>created : {new Date(tasklist.createdAt).toLocaleString()}</h2>
        </a>
      ))}
    </div>
    </div>
    )
  }

  export async function getServerSideProps() {
    const tasklists = await prisma.taskList.findMany()
    return {
      props: {
        taskLists: JSON.parse(JSON.stringify(tasklists)),
      },
    }
  }
