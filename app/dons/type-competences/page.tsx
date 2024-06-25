'use client'
import List from '../../../components/list'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Competence {
    id: string
    label: string
}

function TypeCompetencePage() {
    const [competences, setCompetence] = useState<Competence[]>([])
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const handleClose = () => {
        setIsPopUpOpen(false);
    };

    useEffect(() => {
        const fetchCompetences = async () => {
            const res = await fetch(
                'http://localhost:3000/api/dons/type-competences',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const competences: Competence[] = await res.json()
            setCompetence(competences)
        }

        fetchCompetences()
    }, [])

    return (
        <>
            <List
                items={competences.map(typeCompetence => ({
                    value1: typeCompetence.id.toString(),
                    value2: typeCompetence.id.toString(),
                    value3: typeCompetence.label
                }))}
                functions={{
                    fonc1: () => {
                        isPopUpOpen ? setIsPopUpOpen(false) : setIsPopUpOpen(true)
                    },
                    fonc2: () => {
                        console.log('fonc2')
                    },
                }}
            />
            <button onClick={() => setIsPopUpOpen(true)}>Open PopUp</button>
                {isPopUpOpen && (
                    <PopUp
                        onClose={handleClose}
                        url='http://localhost:3000/api/dons/type-competences'
                        fields={[
                            { id: "id", type: 'input', value: null},
                            { id: "label", type: 'input', value: null},
                        ]}
                    />
                )}
        </>
    )
}
export default withAuthorization(TypeCompetencePage, ['AD', 'PR']);
