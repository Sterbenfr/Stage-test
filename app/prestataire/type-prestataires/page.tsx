'use client'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Prestataire {
    code_type_de_Prestataire: string
    libelle: string
}

function PrestatairesPage() {
    const [Prestataires, setPrestataires] = useState<Prestataire[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchPrestataires = async () => {
            const res = await fetch(
                'http://localhost:3000/api/prestataire/type-prestataires',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Prestataires: Prestataire[] = await res.json()
            setPrestataires(Prestataires)
        }

        fetchPrestataires()
    }, [])

    return (
        <>
            <div>
                <h1>Type Prestataires</h1>
                {Prestataires.map(TypePrestataires => (
                    <div key={TypePrestataires.code_type_de_Prestataire}>
                        <h2>{TypePrestataires.libelle}</h2>
                        <h2>{TypePrestataires.code_type_de_Prestataire}</h2>
                    </div>
                ))}
            </div>
            <button onClick={() => setIsPopUpOpen(true)}>Open PopUp</button>
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url='http://localhost:3000/api/prestataire/type-prestataires'
                    fields={[
                        {
                            id: 'code_type_de_Prestataire',
                            type: 'input',
                            value: null,
                        },
                        {
                            id: 'libelle',
                            type: 'input',
                            value: null,
                        },
                    ]}
                />
            )}
        </>
    )
}
export default withAuthorization(PrestatairesPage, ['AD', 'PR'])
