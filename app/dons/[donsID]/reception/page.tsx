'use client'
import { useEffect, useState } from 'react'
import List from '../../../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import { useCallback } from 'react'
import withAuthorization from '@/components/withAuthorization'

interface Reception {
    numero_reception: number
    code_Don: number
    numero_livraison: number
    date_reception: Date
    heure_reception: string
    nombre_palettes_recues: number
    nombre_palettes_consignees_recues: number
    nombre_palettes_consignees_rendues: number
    nombre_cartons_recus: number
    poids_recu_kg: number
    produits_sur_palettes: string
    commentaires: string
    pieces_associees: Blob
}

function ReceptionsPage({ params }: { params: { donsID: string } }) {
    const [Receptions, setReceptions] = useState<Reception[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [checkboxChecked, setCheckboxChecked] = useState(false)
    const [selectedTypeMarchandise, setSelectedTypeMarchandise] =
        useState('ALI')
    const [lastSelectedTypeDon, setLastSelectedTypeDon] = useState('')
    const [selectedTypeDon, setSelectedTypeDon] = useState(
        lastSelectedTypeDon !== '' ? lastSelectedTypeDon : '',
    )
    const [fields, setFields] = useState<
        {
            id: string
            type: FieldType
            value: string | null
            url?: string
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
        }[]
    >([])

    const handleClose = () => {
        setIsPopUpOpen(false)
        setCheckboxChecked(false)
    }

    const handleTypeDonChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedTypeDon(event.target.value)
    }

    const handleMarchandiseChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedTypeMarchandise(event.target.value)
    }

    type FieldType =
        | 'number'
        | 'search'
        | 'date'
        | 'select'
        | 'input'
        | 'file'
        | 'checkbox'
        | 'enum'

    const generateFields = useCallback(
        (selectedTypeDon: string, selectedTypeMarchandise: string) => {
            const fields: {
                id: string
                type: FieldType
                value: string | null
                url?: string
                onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            }[] = [
                {
                    id: 'numero_reception',
                    type: 'number',
                    value: null,
                },
                {
                    id: 'numero_livraison',
                    type: 'select',
                    value: selectedTypeDon.toString(), // Convert the state value to a string
                    url: '../../api/select/dons/modalites-livraison',
                    onChange: handleTypeDonChange,
                },
                {
                    id: 'date_reception',
                    type: 'date',
                    value: null,
                },
                {
                    id: 'heure_reception',
                    type: 'input',
                    value: null,
                },
                {
                    id: 'nombre_palettes_recues',
                    type: 'number',
                    value: null,
                },
                {
                    id: 'nombre_palettes_consignees_recues',
                    type: 'number',
                    value: null,
                },
                {
                    id: 'nombre_palettes_consignees_rendues',
                    type: 'number',
                    value: null,
                },
                {
                    id: 'nombre_cartons_recus',
                    type: 'number',
                    value: null,
                },
                {
                    id: 'poids_recu_kg',
                    type: 'number',
                    value: null,
                },
                {
                    id: 'produits_sur_palettes',
                    type: 'input',
                    value: null,
                },
                {
                    id: 'commentaires',
                    type: 'input',
                    value: null,
                },
                {
                    id: 'pieces_associees',
                    type: 'file',
                    value: null,
                },
            ]

            if (selectedTypeDon === 'SIP') {
                console.log('SIP added')
                setLastSelectedTypeDon(selectedTypeDon)
                fields.push({
                    id: 'code_type_competences',
                    type: 'select',
                    value: '',
                    url: '../api/dons/type-competences',
                })
            }

            if (selectedTypeDon === 'MAR') {
                setLastSelectedTypeDon(selectedTypeDon)
                console.log('MAR added')
                fields.push({
                    id: 'code_type_produits',
                    type: 'select',
                    value: '',
                    url: '../api/dons/type-produits',
                    onChange: handleMarchandiseChange,
                })
            }

            if (
                selectedTypeDon === 'MAR' &&
                selectedTypeMarchandise === 'ALI'
            ) {
                console.log('ALI added')
                fields.push({
                    id: 'code_mode_conservation_produits',
                    type: 'select',
                    value: null,
                    url: '../api/dons/type-mode-conservations-produits',
                })
            }

            console.log(fields)
            return fields
        },
        [checkboxChecked],
    )

    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}/reception?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Reception[]; total: number } =
                await res.json()
            setReceptions(data)
            setTotalItems(total) // set the total items
            setFields(generateFields(selectedTypeDon, selectedTypeMarchandise))
        }

        fetchDons()
    }, [
        page,
        itemsPerPage,
        selectedTypeDon,
        selectedTypeMarchandise,
        generateFields,
        params.donsID, // Add params.donsID to the dependency array
    ])

    // add a function to handle page changes
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setPage(1) // reset page to 1 when items per page changes
    }

    return (
        <>
            <List
                items={Receptions.map(Reception => ({
                    value1: Reception.code_Don.toString(),
                    value2: Reception.numero_livraison.toString(),
                    value3: Reception.date_reception.toString().split('T')[0],
                    value4: Reception.nombre_palettes_recues.toString(),
                    value5: Reception.poids_recu_kg.toString(),
                }))}
            />
            <Pagination
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange} // pass the new prop here
                totalItems={totalItems} // use the total items from the state
                itemsPerPage={itemsPerPage}
                currentPage={page}
            />
            {''}
            <button onClick={() => setIsPopUpOpen(true)}>Open PopUp</button>
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url='http://localhost:3000/api/dons'
                    fields={fields} // Use the fields state here
                />
            )}
        </>
    )
}

export default withAuthorization(ReceptionsPage, ['AD', 'PR'])
