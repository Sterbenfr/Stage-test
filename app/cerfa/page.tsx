'use client'
import { useEffect, useState } from 'react'
import List from '../../components/list'

interface Cerfa {
    numero_Cerfa: number
    code_Don: number
    montant_HT_Cerfa: number
    date_realisation_Cerfa: Date
    date_envoi_Cerfa: Date
    addresse_Cerfa: string
    civilite_destinataire_Cerfa: string
    nom_destinataire_Cerfa: string
    prenom_destinataire_Cerfa: string
    telephone_destinataire_Cerfa: string
    mail_destinataire_Cerfa: string
}

export default function CerfaPage() {
    const [cerfas, setCerfa] = useState<Cerfa[]>([])

    useEffect(() => {
        const fetchCerfas = async () => {
            const res = await fetch('http://localhost:3000/api/cerfa')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const cerfas: Cerfa[] = await res.json()
            setCerfa(cerfas)
        }

        fetchCerfas()
    }, [])

    return (
        <div>
            <h1>Cerfas</h1>
            <List
                items={cerfas.map(cerfa => ({
                    value1: cerfa.numero_Cerfa.toString(),
                    value2: cerfa.code_Don.toString(),
                    value3: cerfa.montant_HT_Cerfa.toString(),
                    value4: cerfa.nom_destinataire_Cerfa.toString(),
                    value5: cerfa.prenom_destinataire_Cerfa.toString(),
                }))}
            />
        </div>
    )
}
