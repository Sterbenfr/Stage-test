import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { findUser, verifyPassword } from '../../../../utils/auth'
import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'

interface ExtendedUser extends User {
    role: string
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                console.log('Authorizing:', credentials)
                if (!credentials) {
                    throw new Error('No credentials provided')
                }
                const user = await findUser(credentials.email)
                console.log('User:', user)
                if (!user) {
                    throw new Error('No user found')
                }
                const isValid = await verifyPassword(
                    credentials.password,
                    user.password,
                )
                console.log('Password is valid:', isValid)
                if (!isValid) {
                    throw new Error('Invalid password')
                }
                // Return the user object with all required properties
                return { id: user.id, email: user.email, role: user.role }
            },
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User | AdapterUser }) {
            if (user) {
                token.id = user.id
                token.email = user.email
                token.role = user.role
            }
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                    role: token.role,
                } as ExtendedUser
            }
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
