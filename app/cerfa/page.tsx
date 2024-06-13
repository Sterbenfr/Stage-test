'use client'
import { useEffect, useState } from 'react'

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
            {cerfas.map(cerfa => (
                <div key={cerfa.numero_Cerfa}>
                    <h2>
                        {cerfa.code_Don} : {cerfa.montant_HT_Cerfa}
                    </h2>
                    <p>date_realisation_Cerfa: {cerfa.date_realisation_Cerfa.toString()}</p>
                    <p>date_envoi_Cerfa: {cerfa.date_envoi_Cerfa.toString()}</p>
                    <p>addresse_Cerfa: {cerfa.addresse_Cerfa}</p>
                    <p>civilite_destinataire_Cerfa: {cerfa.civilite_destinataire_Cerfa}</p>
                    <p>nom_destinataire_Cerfa: {cerfa.nom_destinataire_Cerfa}</p>
                    <p>prenom_destinataire_Cerfa: {cerfa.prenom_destinataire_Cerfa}</p>
                    <p>telephone_destinataire_Cerfa: {cerfa.telephone_destinataire_Cerfa}</p>
                    <p>mail_destinataire_Cerfa: {cerfa.mail_destinataire_Cerfa}</p>
                </div>
            ))}
        </div>
    )
}
