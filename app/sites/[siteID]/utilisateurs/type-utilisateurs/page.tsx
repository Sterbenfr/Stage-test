'use client'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface type_utilisateur {
    code_type_utilisateur: string
    libelle: string
}

function UtilisateursPage({ params }: { params: { siteID: string } }) {
    const [Utilisateurs, setUtilisateurs] = useState<type_utilisateur[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchUtilisateurs = async () => {
            if (!params.siteID) return
            const res = await fetch(
                `http://localhost:3000/api/sites/${params.siteID}/utilisateurs/type-utilisateurs`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Utilisateurs: type_utilisateur[] = await res.json()
            setUtilisateurs(Utilisateurs)
        }

        fetchUtilisateurs()
    }, [params.siteID])

    return (
        <>
            <div>
                <h1>Type Utilisateur</h1>
                {Utilisateurs.map(TypeUtilisateur => (
                    <div key={TypeUtilisateur.code_type_utilisateur}>
                        <h2>{TypeUtilisateur.libelle}</h2>
                        <h2>{TypeUtilisateur.code_type_utilisateur}</h2>
                    </div>
                ))}
            </div>
            <button onClick={() => setIsPopUpOpen(true)}>Open PopUp</button>
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url={`http://localhost:3000/api/${params.siteID}/utilisateurs/type-utilisateurs`}
                    fields={[
                        {
                            id: 'code_type_utilisateur',
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

export default withAuthorization(UtilisateursPage, ['AD', 'PR'])
