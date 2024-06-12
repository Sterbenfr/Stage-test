'use client'
import { useEffect, useState } from 'react'

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
            const res = await fetch('http://localhost:3000/api/contact')

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
            {contacts.map(contact => (
                <div key={contact.code_contact}>
                    <h2>
                        {contact.code_entite} & {contact.code_contact}
                    </h2>
                    <p>Nom: {contact.nom}</p>
                    <p>Prenom: {contact.prenom}</p>
                    <p>Civilite: {contact.civilite}</p>
                    <p>Photo: <img src={URL.createObjectURL(contact.photo)} alt="Contact Photo" /></p>
                    <p>Fonction: {contact.fonction}</p>
                    <p>Service: {contact.service}</p>
                    <p>Numero Fixe: {contact.numero_fixe}</p>
                    <p>Numero Portable: {contact.numero_portable}</p>
                    <p>Adresse Mail: {contact.adresse_mail}</p>
                    <p>Commentaires: {contact.commentaires}</p>
                    <p>Date Arret Contact: {contact.date_arret_contact.toString()}</p>
                </div>
            ))}
        </div>
    )
}
