'use client'
import { useEffect, useState } from 'react'
import List from '../../../../../components/list'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Frequence_cerfa {
    id: string
    label: string
}

function Frequences_cerfaPage({
    params,
}: {
    params: { societeID: string }
}) {
    const [Frequences_cerfa, setFrequences_cerfa] = useState<Frequence_cerfa[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

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
            <List
                items={Frequences_cerfa.map(TypesFrequences_cerfa => ({
                    value1: TypesFrequences_cerfa.id.toString(),
                    value2: TypesFrequences_cerfa.id.toString(),
                    value3: TypesFrequences_cerfa.label
                }))}
            />
            <button onClick={() => setIsPopUpOpen(true)}>Open PopUp</button>
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url={`http://localhost:3000/api/societe/${params.societeID}/entite/type-frequences-cerfa`}
                    fields={[
                        {
                            id: 'code_type_frequences_cerfa',
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
        </div>
    )
}

export default withAuthorization(Frequences_cerfaPage, ['AD', 'PR']);
