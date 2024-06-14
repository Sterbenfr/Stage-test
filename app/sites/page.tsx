'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'

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
            const res = await fetch('http://localhost:3000/api/sites')

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
        <List
            items={Sites.map(Sites => ({
                value1: Sites.designation_longue.toString(),
                value2: Sites.adresse.toString(),
                value3: Sites.date_ouverture.toString().split('T')[0],
                value4: Sites.numero_telephone.toString(),
                value5: Sites.adresse_mail.toString(),
            }))}
        />
    )
}
