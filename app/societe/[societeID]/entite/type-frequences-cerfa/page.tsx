'use client'
import { useEffect, useState } from 'react'

interface Frequence_cerfa {
    code_frequence_cerfa: string
    libelle: string
}

export default function Frequences_cerfaPage({
    params,
}: {
    params: { societeID: string }
}) {
    const [Frequences_cerfa, setFrequences_cerfa] = useState<Frequence_cerfa[]>([])

    useEffect(() => {
        const fetchFrequences_cerfa = async () => {
            const res = await fetch(
                `http://localhost:3000/api/societe/${params.societeID}/entite/type-frequences-cerfa`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Frequences_cerfa: Frequence_cerfa[] = await res.json()
            setFrequences_cerfa(Frequences_cerfa)
        }

        fetchFrequences_cerfa()
    }, [params.societeID])

    return (
        <div>
            <h1>Types Frequences Cerfa</h1>
            {Frequences_cerfa.map(TypesFrequences_cerfa => (
                <div key={TypesFrequences_cerfa.code_frequence_cerfa}>
                    <h2>{TypesFrequences_cerfa.libelle}</h2>
                    <h2>{TypesFrequences_cerfa.code_frequence_cerfa}</h2>
                </div>
            ))}
        </div>
    )
}
