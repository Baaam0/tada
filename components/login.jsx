import { useSession, signIn, signOut } from "next-auth/react"
import styles from '@/styles/Home.module.css'

export default function Component() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
      <div className={styles.nav}>
        <img src={session.user.image} alt="user image" className={styles.img}/> <br />
        <div>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
      </>
    )
  }
  return (
    <>
    <div className={styles.nav}>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
    </>
  )
}

