'use client'
import { useEffect, useState } from 'react'

interface Type_Livraison {
    code_type_livraison: string
    libelle: string
}

export default function Type_LivraisonsPage() {
    const [Type_Livraisons, setType_Livraisons] = useState<Type_Livraison[]>([])

    useEffect(() => {
        const fetchType_Livraisons = async () => {
            const res = await fetch(
                'http://localhost:3000/api/type-livraison',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Type_Livraisons: Type_Livraison[] = await res.json()
            setType_Livraisons(Type_Livraisons)
        }

        fetchType_Livraisons()
    }, [])

    return (
        <div>
            <h1>Type Livraison</h1>
            {Type_Livraisons.map(TypeLivraison => (
                <div key={TypeLivraison.code_type_livraison}>
                    <h2>{TypeLivraison.libelle}</h2>
                    <h2>{TypeLivraison.code_type_livraison}</h2>
                </div>
            ))}
        </div>
    )
}
