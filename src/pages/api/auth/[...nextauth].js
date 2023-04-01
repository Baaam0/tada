import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { Prisma } from "../../../../server/db/client"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
//   secret: process.env.SECRET, 
//   callbacks: {
//     async signIn(user, account, profile) {
//       const existingUser = await Prisma.user.findUnique({
//         where: {
//           email: user.email,
//         },
//       })
//       if (existingUser) {
//         await Prisma.user.update({
//           where: {
//             email: user.email,
//           },
//           data: {
//             name: user.name,
//             image: user.image,
//           },
//         })
//       } else {
//         await Prisma.user.create({
//           data: {
//             email: user.email,
//             name: user.name,
//             image: user.image,
//           },
//         })  
//       }
//   }
// }
  
}


export default NextAuth(authOptions)