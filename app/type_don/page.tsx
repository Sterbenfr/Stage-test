'use client'
import { useEffect, useState } from 'react'

interface User {
    code_type_don: string
    libelle: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('http://localhost:3000/api/type_don')

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
            <h1>Types de Dons</h1>
            {users.map(user => (
                <div key={user.code_type_don}>
                    <p>Code Type Don: {user.code_type_don}</p>
                    <p>Libelle: {user.libelle}</p>
                </div>
            ))}
        </div>
    )
}
