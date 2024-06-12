'use client'
import { useEffect, useState } from 'react'

interface TypeActiviteSociete {
    code: string
    libelle: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<TypeActiviteSociete[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('http://localhost:3000/api/activite-societe')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const users: TypeActiviteSociete[] = await res.json()
            setUsers(users)
        }

        fetchUsers()
    }, [])

    return (
        <div>
            <h1>Type activite societe</h1>
            {users.map(TypeActiviteSociete => (
                <div key={TypeActiviteSociete.code}>
                    <h2>
                        {TypeActiviteSociete.code}
                    </h2>
                    <p>Libelle: {TypeActiviteSociete.libelle}</p>
                </div>
            ))}
        </div>
    )
}
