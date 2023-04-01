
import styles from '@/styles/Home.module.css'
import Component from 'components/login'
import Link from 'next/link'

export default function Home({taskLists}) {

  
  return (
    <div className={styles.main1}>

    <div>
    <Component/>
    </div>

    <div className={styles.title}>
    <h1>Ta-da List</h1>
    </div>


    <div className={styles.start}>  
        <div>    
        <Link href="/tasklist">START</Link>
        </div> 
    </div>


    </div>
    )
  }
