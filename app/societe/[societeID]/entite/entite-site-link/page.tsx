'use client'
import { useEffect, useState } from 'react'

interface ContactEntite {
    code_entite: number
    code_type_site: string
    code_site_suivi: number
    code_utilisateur_suivant: number
}

export default function ContactEntitePage({
    params,
}: {
    params: { societeID: string }
}) {
    const [contacts, setContacts] = useState<ContactEntite[]>([])

    useEffect(() => {
        const fetchContacts = async () => {
            const res = await fetch(`http://localhost:3000/api/societe/${params.societeID}/entite/entite-site-link`)

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const contacts: ContactEntite[] = await res.json()
            setContacts(contacts)
        }

        fetchContacts()
    }, [])

    return (
        <div>
            <h1>Contacts Entite</h1>
            {contacts.map(contact => (
                <div key={contact.code_entite}>
                    <h2>
                        {contact.code_entite} : {contact.code_type_site}
                    </h2>
                    <p>code_site_suivi: {contact.code_site_suivi}</p>
                    <p>code_utilisateur_suivant: {contact.code_utilisateur_suivant}</p>
                </div>
            ))}
        </div>
    )
}
