'use client'
import { useEffect, useState } from 'react'

interface Cerfa {
    numero_Cerfa: number
    code_don: number
    montant_HT_Cerfa: number
    date_realisation_Cerfa: Date
    date_envoi_Cerfa: Date
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
                        {cerfa.code_don} : {cerfa.montant_HT_Cerfa}
                    </h2>
                    <p>date_realisation_Cerfa: {cerfa.date_realisation_Cerfa.toString()}</p>
                    <p>date_envoi_Cerfa: {cerfa.date_envoi_Cerfa.toString()}</p>
                </div>
            ))}
        </div>
    )
}
