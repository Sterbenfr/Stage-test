/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWT } from 'next-auth/jwt'
import { Session, User } from 'next-auth'

interface ExtendedUser extends User {
    id: string
    email: string
    role: string
    name: string
}

declare module 'next-auth' {
    interface User {
        id: string
        email: string
        role: string
        name: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        email: string
        role: string
        name: string
    }
}
