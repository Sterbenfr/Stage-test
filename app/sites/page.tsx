'use client'
import { useEffect, useState } from 'react'

interface Sites {
    code_site: number
    designation_longue: string
    designation_courte: string
    adresse: string
    code_type_site: string
    date_ouverture: Date
    date_fermeture: Date
    numero_telephone: string
    adresse_mail: string
    commentaire: string
}

export default function SitesPage() {
    const [Sites, setSites] = useState<Sites[]>([])

    useEffect(() => {
        const fetchSites = async () => {
            const res = await fetch('http://localhost:3000/api/Sites')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Sites: Sites[] = await res.json()
            setSites(Sites)
        }

        fetchSites()
    }, [])

    return (
        <div>
            <h1>Sites</h1>
            {Sites.map(TypeSites => (
                <div key={TypeSites.code_site}>
                    <h2>{TypeSites.code_site}</h2>
                    <p>{TypeSites.designation_longue}</p>
                    <p>{TypeSites.designation_courte}</p>
                    <p>{TypeSites.adresse}</p>
                    <p>{TypeSites.code_type_site}</p>
                    <p>{TypeSites.date_ouverture.toString()}</p>
                    <p>{TypeSites.date_fermeture.toString()}</p>
                    <p>{TypeSites.numero_telephone}</p>
                    <p>{TypeSites.adresse_mail}</p>
                    <p>{TypeSites.commentaire}</p>
                </div>
            ))}
        </div>
    )
}
