'use client'
import { useEffect, useState } from 'react'

interface ContactID {
    code_contact: number
    raison_sociale: string
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

export default function ContactPage({
    params,
}: {
    params: { societeID: string; entiteID: string; contactID: string }
}) {
    const [contact, setContact] = useState<ContactID[]>([])

    useEffect(() => {
        const fetchContact = async () => {
            if (!params.contactID) return

            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite/${params.entiteID}/contact/${params.contactID}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const contact: ContactID[] = await res.json()
            setContact(contact)
        }

        fetchContact()
    }, [params.contactID, params.societeID, params.entiteID])
    if (!contact || contact.length === 0) return <div>Loading...</div>

    return (
        <div>
            <h1>contact</h1>
            <p>{contact[0].code_contact}</p>
            <p>{contact[0].raison_sociale}</p>
            <p>{contact[0].civilite}</p>
            <p>{contact[0].nom}</p>
            <p>{contact[0].prenom}</p>
            <p>{contact[0].fonction}</p>
            <p>{contact[0].service}</p>
            <p>{contact[0].numero_fixe}</p>
            <p>{contact[0].numero_portable}</p>
            <p>{contact[0].adresse_mail}</p>
            <p>{contact[0].commentaires}</p>
            <p>
                {contact[0].date_arret_contact == null
                    ? ''
                    : contact[0].date_arret_contact.toString().split('T')[0]}
            </p>
        </div>
    )
}
