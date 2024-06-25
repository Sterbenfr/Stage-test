'use client'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface siteType {
    code_type_site: string
    libelle: string
}

function SiteTypesPage() {
    const [SiteTypes, setSiteTypes] = useState<siteType[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }
    useEffect(() => {
        const fetchSiteTypes = async () => {
            const res = await fetch(
                'http://localhost:3000/api/sites/type-site-types',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const siteTypes: siteType[] = await res.json()
            setSiteTypes(siteTypes)
        }

        fetchSiteTypes()
    }, [])

    return (
        <>
            <div>
                <h1>Site Types</h1>
                {SiteTypes.map(SiteTypes => (
                    <div key={SiteTypes.code_type_site}>
                        <h2>{SiteTypes.libelle}</h2>
                        <h2>{SiteTypes.code_type_site}</h2>
                    </div>
                ))}
            </div>
            <button onClick={() => setIsPopUpOpen(true)}>Open PopUp</button>
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url='http://localhost:3000/api/sites/type-site-types'
                    fields={[
                        {
                            id: 'code_type_site',
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
SiteTypesPage
export default withAuthorization(SiteTypesPage, ['AD', 'PR'])
