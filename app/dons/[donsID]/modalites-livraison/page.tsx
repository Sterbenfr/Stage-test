'use client'
import { useCallback, useEffect, useState } from 'react'
import List from '../../../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../styles/components.module.css'

export interface ModalitesLivraison {
    numero_livraison: number
    code_Don: number
    code_type_livraison: string
    date_prevue_livraison: Date
    adresse_enlevement: string
    civilite_contact_enlevement: string
    nom_contact_enlevement: string
    prenom_contact_enlevement: string
    telephone_contact_enlevement: string
    mail_contact_enlevement: string
    code_Prestataire_transporteur: number
    adresse_livraison: string
    civilite_contact_livraison: string
    nom_contact_livraison: string
    prenom_contact_livraison: string
    telephone_contact_livraison: string
    mail_contact_livraison: string
    nombre_palettes_prevu: number
    nombre_palettes_consignees_prevu: number
    nombre_cartons_prevu: number
    poids_prevu_kg: number
    produits_sur_palettes: string
    temperature_conserv_produits: number
    commentaires: string
    pieces_associees: Blob
}

function ModalitesLivraisonPage({ params }: { params: { donsID: string } }) {
    const [ModalitesLivraisons, setModalitesLivraison] = useState<
        ModalitesLivraison[]
    >([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const [fields, setFields] = useState<
        {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[]
    >([])

    const [numeroLivraison, setNumeroLivraison] = useState('')
    const [codeDon, setCodeDon] = useState('')
    const [codeTypeLivraison, setCodeTypeLivraison] = useState('')
    const [datePrevueLivraison, setDatePrevueLivraison] = useState(new Date())
    const [heurePrevueLivraison, setHeurePrevueLivraison] = useState('')
    const [adresseEnlevement, setAdresseEnlevement] = useState('')
    const [civiliteContactEnlevement, setCiviliteContactEnlevement] =
        useState('')
    const [nomContactEnlevement, setNomContactEnlevement] = useState('')
    const [prenomContactEnlevement, setPrenomContactEnlevement] = useState('')
    const [telephoneContactEnlevement, setTelephoneContactEnlevement] =
        useState('')
    const [mailContactEnlevement, setMailContactEnlevement] = useState('')
    const [codePrestataireTransporteur, setCodePrestataireTransporteur] =
        useState('')
    const [adresseLivraison, setAdresseLivraison] = useState('')
    const [civiliteContactLivraison, setCiviliteContactLivraison] = useState('')
    const [nomContactLivraison, setNomContactLivraison] = useState('')
    const [prenomContactLivraison, setPrenomContactLivraison] = useState('')
    const [telephoneContactLivraison, setTelephoneContactLivraison] =
        useState('')
    const [mailContactLivraison, setMailContactLivraison] = useState('')
    const [nombrePalettesPrevu, setNombrePalettesPrevu] = useState('')
    const [nombrePalettesConsigneesPrevu, setNombrePalettesConsigneesPrevu] =
        useState('')
    const [nombreCartonsPrevu, setNombreCartonsPrevu] = useState('')
    const [poidsPrevuKg, setPoidsPrevuKg] = useState('')
    const [produitsSurPalettes, setProduitsSurPalettes] = useState('')
    const [temperatureConservProduits, setTemperatureConservProduits] =
        useState('')
    const [commentaires, setCommentaires] = useState('')
    const [piecesAssociees, setPiecesAssociees] = useState<Blob>()

    const handleNumeroLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNumeroLivraison(event.target.value)
    }
    const handleCodeDon = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCodeDon(event.target.value)
    }
    const handleCodeTypeLivraison = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCodeTypeLivraison(event.target.value)
    }
    const handleDatePrevueLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDatePrevueLivraison(new Date(event.target.value))
    }
    const handleHeurePrevueLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setHeurePrevueLivraison(event.target.value)
    }
    const handleAdresseEnlevement = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAdresseEnlevement(event.target.value)
    }
    const handleCiviliteContactEnlevement = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCiviliteContactEnlevement(event.target.value)
    }
    const handleNomContactEnlevement = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNomContactEnlevement(event.target.value)
    }
    const handlePrenomContactEnlevement = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPrenomContactEnlevement(event.target.value)
    }
    const handleTelephoneContactEnlevement = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTelephoneContactEnlevement(event.target.value)
    }
    const handleMailContactEnlevement = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMailContactEnlevement(event.target.value)
    }
    const handleCodePrestataireTransporteur = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setCodePrestataireTransporteur(event.target.value)
    }
    const handleAdresseLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAdresseLivraison(event.target.value)
    }
    const handleCiviliteContactLivraison = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCiviliteContactLivraison(event.target.value)
    }
    const handleNomContactLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNomContactLivraison(event.target.value)
    }
    const handlePrenomContactLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setPrenomContactLivraison(event.target.value)
    }
    const handleTelephoneContactLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTelephoneContactLivraison(event.target.value)
    }
    const handleMailContactLivraison = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMailContactLivraison(event.target.value)
    }
    const handleNombrePalettesPrevu = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNombrePalettesPrevu(event.target.value)
    }
    const handleNombrePalettesConsigneesPrevu = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNombrePalettesConsigneesPrevu(event.target.value)
    }
    const handleNombreCartonsPrevu = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNombreCartonsPrevu(event.target.value)
    }
    const handlePoidsPrevuKg = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoidsPrevuKg(event.target.value)
    }
    const handleProduitsSurPalettes = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setProduitsSurPalettes(event.target.value)
    }
    const handleTemperatureConservProduits = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setTemperatureConservProduits(event.target.value)
    }
    const handleCommentaires = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentaires(event.target.value)
    }
    const handlePiecesAssociees = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.files) {
            setPiecesAssociees(event.target.files[0])
        }
    }

    const handleClose = () => {
        setIsPopUpOpen(false)
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

    const generateFields = useCallback(() => {
        const fields: {
            id: string
            type: FieldType
            value: string | null
            placeholder?: string
            url?: string
            onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
            onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
        }[] = [
            {
                id: 'numero_livraison',
                type: 'number',
                value: numeroLivraison,
                onInputChange: handleNumeroLivraison,
            },
            {
                id: 'code_Don',
                type: 'search',
                value: codeDon,
                url: '../../api/select/dons/select-dons',
                onInputChange: handleCodeDon,
            },
            {
                id: 'code_type_livraison',
                type: 'select',
                value: codeTypeLivraison,
                url: `../../api/dons/${params.donsID}/modalites-livraison/type-livraison`,
                onChange: handleCodeTypeLivraison,
            },
            {
                id: 'date_prevue_livraison',
                type: 'date',
                value: datePrevueLivraison.toISOString().split('T')[0],
                onInputChange: handleDatePrevueLivraison,
            },
            {
                id: 'heure_prevue_livraison',
                type: 'input',
                value: heurePrevueLivraison,
                onInputChange: handleHeurePrevueLivraison,
            },
            {
                id: 'adresse_enlevement',
                type: 'input',
                value: adresseEnlevement,
                onInputChange: handleAdresseEnlevement,
            },
            {
                id: 'civilite_contact_enlevement',
                type: 'select',
                value: civiliteContactEnlevement,
                url: '../../api/select/genre',
                onChange: handleCiviliteContactEnlevement,
            },
            {
                id: 'nom_contact_enlevement',
                type: 'input',
                value: nomContactEnlevement,
                onInputChange: handleNomContactEnlevement,
            },
            {
                id: 'prenom_contact_enlevement',
                type: 'input',
                value: prenomContactEnlevement,
                onInputChange: handlePrenomContactEnlevement,
            },
            {
                id: 'telephone_contact_enlevement',
                type: 'input',
                value: telephoneContactEnlevement,
                onInputChange: handleTelephoneContactEnlevement,
            },
            {
                id: 'mail_contact_enlevement',
                type: 'input',
                value: mailContactEnlevement,
                onInputChange: handleMailContactEnlevement,
            },
            {
                id: 'adresse_livraison',
                type: 'input',
                value: adresseLivraison,
                onInputChange: handleAdresseLivraison,
            },
            {
                id: 'civilite_contact_livraison',
                type: 'select',
                value: civiliteContactLivraison,
                url: '../../api/select/genre',
                onChange: handleCiviliteContactLivraison,
            },
            {
                id: 'nom_contact_livraison',
                type: 'input',
                value: nomContactLivraison,
                onInputChange: handleNomContactLivraison,
            },
            {
                id: 'prenom_contact_livraison',
                type: 'input',
                value: prenomContactLivraison,
                onInputChange: handlePrenomContactLivraison,
            },
            {
                id: 'telephone_contact_livraison',
                type: 'input',
                value: telephoneContactLivraison,
                onInputChange: handleTelephoneContactLivraison,
            },
            {
                id: 'mail_contact_livraison',
                type: 'input',
                value: mailContactLivraison,
                onInputChange: handleMailContactLivraison,
            },
            {
                id: 'nombre_palettes_prevu',
                type: 'number',
                value: nombrePalettesPrevu,
                onInputChange: handleNombrePalettesPrevu,
            },
            {
                id: 'nombre_palettes_consignees_prevu',
                type: 'number',
                value: nombrePalettesConsigneesPrevu,
                onInputChange: handleNombrePalettesConsigneesPrevu,
            },
            {
                id: 'nombre_cartons_prevu',
                type: 'number',
                value: nombreCartonsPrevu,
                onInputChange: handleNombreCartonsPrevu,
            },
            {
                id: 'poids_prevu_kg',
                type: 'number',
                value: poidsPrevuKg,
                onInputChange: handlePoidsPrevuKg,
            },
            {
                id: 'produits_sur_palettes',
                type: 'input',
                value: produitsSurPalettes,
                onInputChange: handleProduitsSurPalettes,
            },
            {
                id: 'commentaires',
                type: 'input',
                value: commentaires,
                onInputChange: handleCommentaires,
            },
            {
                id: 'pieces_associees',
                type: 'file',
                value: null,
                onInputChange: handlePiecesAssociees,
            },
        ]

        if (codeTypeLivraison === 'TRA') {
            fields.push({
                id: 'code_Prestataire_transporteur',
                type: 'search',
                value: codePrestataireTransporteur,
                url: '../../../api/select/prestataire',
                onInputChange: handleCodePrestataireTransporteur,
            })
        }
        const typeDon = async () => {
            const res = await fetch(
                `http://localhost:3000/api/select/dons/${params.donsID}/type-don`,
            )
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            const data: { code_type_don: string; code_type_produits: string } =
                (await res.json())[0]
            if (
                data !== undefined &&
                data.code_type_don === 'MAR' &&
                data.code_type_produits === 'ALI'
            ) {
                fields.push({
                    id: 'temperature_conserv_produits',
                    type: 'number',
                    value: temperatureConservProduits,
                    onInputChange: handleTemperatureConservProduits,
                })
            }
        }

        typeDon()
        return fields
    }, [
        params.donsID,
        numeroLivraison,
        codeDon,
        codeTypeLivraison,
        datePrevueLivraison,
        heurePrevueLivraison,
        adresseEnlevement,
        civiliteContactEnlevement,
        nomContactEnlevement,
        prenomContactEnlevement,
        telephoneContactEnlevement,
        mailContactEnlevement,
        codePrestataireTransporteur,
        adresseLivraison,
        civiliteContactLivraison,
        nomContactLivraison,
        prenomContactLivraison,
        telephoneContactLivraison,
        mailContactLivraison,
        nombrePalettesPrevu,
        nombrePalettesConsigneesPrevu,
        nombreCartonsPrevu,
        poidsPrevuKg,
        produitsSurPalettes,
        temperatureConservProduits,
        commentaires,
    ])

    useEffect(() => {
        const fetchModalitesLivraisons = async () => {
            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}/modalites-livraison?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const {
                data,
                total,
            }: { data: ModalitesLivraison[]; total: number } = await res.json()
            setModalitesLivraison(data)
            setTotalItems(total)
            setFields(generateFields())
        }

        fetchModalitesLivraisons()
    }, [page, itemsPerPage, params.donsID, generateFields])

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setPage(1) // reset page to 1 when items per page changes
    }

    return (
        <>
            <div className={style.page}>
                <List
                    items={ModalitesLivraisons.map(ModalitesLivraison => ({
                        value1: ModalitesLivraison.numero_livraison.toString(),
                        value2: ModalitesLivraison.code_Don.toString(),
                        value3: ModalitesLivraison.date_prevue_livraison
                            .toString()
                            .split('T')[0],
                        value4: ModalitesLivraison.telephone_contact_enlevement.toString(),
                        value5: ModalitesLivraison.mail_contact_enlevement.toString(),
                    }))}
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/dons/${params.donsID}/modalites-livraison`,
                    }}
                />
                <Pagination
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange} // pass the new prop here
                    totalItems={totalItems} // use the total items from the state
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                />
                {''}
                {isPopUpOpen && (
                    <div className={style.PopUp}>
                        <PopUp
                            onClose={handleClose}
                            url={`http://localhost:3000/api/dons/${params.donsID}/modalites-livraison`}
                            fields={fields}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(ModalitesLivraisonPage, ['AD', 'PR'])
