'use client'
import { useEffect, useState } from 'react'

interface ContactSociete {
    code_Societe: number
    code_type_de_Site: string
    code_site_suivi: number
    code_utilisateur_suivant: number
}

export default function ContactSocietePage() {
    const [contacts, setContacts] = useState<ContactSociete[]>([])

    useEffect(() => {
        const fetchContacts = async () => {
            const res = await fetch('http://localhost:3000/api/societe-site-link')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const contacts: ContactSociete[] = await res.json()
            setContacts(contacts)
        }

        fetchContacts()
    }, [])

    return (
        <div>
            <h1>Contacts Societe</h1>
            {contacts.map(ContactSociete => (
                <div key={ContactSociete.code_Societe}>
                    <h2>
                        {ContactSociete.code_Societe} : {ContactSociete.code_type_de_Site}
                    </h2>
                    <p>code_site_suivi: {ContactSociete.code_site_suivi}</p>
                    <p>code_utilisateur_suivant: {ContactSociete.code_utilisateur_suivant}</p>
                </div>
            ))}
        </div>
    )
}
