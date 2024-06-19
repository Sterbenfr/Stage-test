'use client'
import { useEffect, useState } from 'react'
import List from  '../../../../../components/list'

interface Contact {
    code_entite: number
    code_contact: number
    civilite: string
    nom: string
    prenom: string
    photo: Blob
    fonction: string
    service: string
    numero_fixe: string
    numero_portable: string
    adresse_mail: string
    commentaires: string
    date_arret_contact: Date
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([])

    useEffect(() => {
        const fetchContacts = async () => {
            const res = await fetch('http://localhost:3000/api/societe/entite/contact')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const contacts: Contact[] = await res.json()
            setContacts(contacts)
        }

        fetchContacts()
    }, [])

    return (
        <div>
            <h1>Contacts</h1>
            <List items={contacts.map(contact => ({
                value1: contact.code_contact.toString(),
                value2: contact.nom,
                value3: contact.numero_fixe,
                value4: contact.numero_portable,
                value5: contact.adresse_mail,
                value6: contact.date_arret_contact==null ? "" : contact.date_arret_contact.toString().split("T")[0]
            }))} />
        </div>
    )
}
