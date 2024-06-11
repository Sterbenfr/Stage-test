'use client'
import { useEffect, useState } from 'react'

interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    created_at: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('http://localhost:3000/api/users')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const users: User[] = await res.json()
            setUsers(users)
        }

        fetchUsers()
    }, [])

    return (
        <div>
            <h1>Users</h1>
            {users.map(user => (
                <div key={user.id}>
                    <h2>
                        {user.first_name} {user.last_name}
                    </h2>
                    <p>Email: {user.email}</p>
                    <p>Created at: {user.created_at}</p>
                </div>
            ))}
        </div>
    )
}
