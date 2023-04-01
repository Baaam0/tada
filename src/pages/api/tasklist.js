// import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
// import { authOptions } from "./auth/[...nextauth]"
// import { getSession } from 'next-auth/client'
// import { prisma } from '../../../server/db/client'


// async function taskList(req, res) {
//   const session = await getServerSession(req, res, authOptions)
//   if(!session) {
//     res.status(401).json({error: "Unauthorized"})
//     return
//   }


// const prismaUser = await prisma.user.findUnique({
//   where: { email: session.user.email },
//   include: { taskLists: true },
// })

// if (!prismaUser) {
//   res.status(404).json({ error: "User not found" })
//   return
// }

// const { title } = req.body
// const taskList = await prisma.taskList.create({
//   data: {
//     title,
//     userId: prismaUser.id,
//   },
// })
// res.status(201).json(taskList)
// }




export default async function postTaskList(req, res) {
  const { method } = req
  console.log(res);
  const { title } = req.body
  
  try {
    switch (method) {
      // case 'GET':
      //   // Get data from your database
      //   const taskLists = await prisma.taskList.findMany()
      //   res.status(200).json(taskLists)
      //   break
      case 'POST':
        // create data in your database
        // const title = req.body.title
        if (!title) {
          res.status(400).json({ error: "Title is required" });
          return;
        }
        const taskList = await prisma.taskList.create({
          data: {
            title,
          },
        })
        res.status(200).json(taskList)
        break
      default:
        res.setHeader('Allow',['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
   res.status(500).json({ error: error.message })
  }
}








// export default async function handler(req, res) {
//   const session = await getSession({ req })

//   if (!session) {
//     return res.status(401).json({ error: 'Unauthorized' })
//   }
// const { title } = req.body
// const { id, title: newTitle } = req.body

//   switch (req.method) {
//     case 'GET':
//       const taskLists = await prisma.taskList.findMany({
//         where: { userId: session.user.id },
//         include: { tasks: true },
//       })

//       res.status(200).json(taskLists)
//       break

//     case 'POST':
//       const taskList = await prisma.taskList.create({
//         data: {
//           title,
//           user: { connect: { id: session.user.id } },
//         },
//         include: { user: true },
//       })

//       res.status(201).json(taskList)
//       break

//     case 'PATCH':
//      const updatedTaskList = await prisma.taskList.update({
//         where: { id },
//         data: { title: newTitle },
//       })

//       res.status(200).json(updatedTaskList)
//       break

//     case 'DELETE':
//         await prisma.taskList.delete({ where: { id } })

//       res.status(204).json({})
//       break

//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
//       res.status(405).end(`Method ${req.method} Not Allowed`)
//   }
// }


// import { getServerSession } from 'next-auth'
// import { prisma } from '../../server/db/client'

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { title } = req.body
//     const newTaskList = await prisma.taskList.create({
//       data: {
//         title,
//       },
//     })
//     res.status(201).json(newTaskList)
//   } else {
//     res.status(405).json({ message: 'Method not allowed' })
//   }
// }

// import { prisma } from '../../server/db/client'
// import { getServerSession } from 'next-auth'
// import { authOptions } from './auth/[...nextauth]'

// async function handler(req, res) {
//   if (req.method === 'POST') {
//     const session = await getServerSession(req, res, authOptions)
//     if (!session) {
//       res.status(401).json({ error: 'Unauthorized' })
//       return
//     }
//     const { title } = req.body;
//     await prisma.taskList.create({
//       data: {
//         title,
//       },
//     })
//     res.status(201).json({ message: 'Task list created' })
//   } else {
//     res.status(405).json({ message: 'Method not allowed' })
//   }
// }

// export default handler