'use client'
import { useEffect, useState } from 'react'

interface siteType {
    code_type_site: string
    libelle: string
}

export default function SiteTypesPage() {
    const [SiteTypes, setSiteTypes] = useState<siteType[]>([])

    useEffect(() => {
        const fetchSiteTypes = async () => {
            const res = await fetch(
                'http://localhost:3000/api/type-site-types',
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
        <div>
            <h1>Site Types</h1>
            {SiteTypes.map(SiteTypes => (
                <div key={SiteTypes.code_type_site}>
                    <h2>{SiteTypes.libelle}</h2>
                    <h2>{SiteTypes.code_type_site}</h2>
                </div>
            ))}
        </div>
    )
}
