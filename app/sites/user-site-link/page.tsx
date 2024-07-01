'use client'
import { useEffect, useState } from 'react'

interface Site_Rattachement {
    code_utilisateur: number
    code_site: number
    code_type_utilisateur: string
    date_fin_activite: Date
}

export default function Sites_RattachementPage() {
    const [Sites_Rattachement, setSites_Rattachement] = useState<
        Site_Rattachement[]
    >([])

    useEffect(() => {
        const fetchSites_Rattachement = async () => {
            const res = await fetch(
                'http://localhost:3000/api/sites/user-site-link',
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Sites_Rattachement: Site_Rattachement[] = await res.json()
            setSites_Rattachement(Sites_Rattachement)
        }

        fetchSites_Rattachement()
    }, [])

    return (
        <div>
            <h1>Sites Rattachement</h1>
            {Sites_Rattachement.map(SitesRattachement => (
                <div key={SitesRattachement.code_site}>
                    <h2>{SitesRattachement.code_site}</h2>
                    <h2>{SitesRattachement.code_utilisateur}</h2>
                    <h2>{SitesRattachement.code_type_utilisateur}</h2>
                    <h2>
                        {SitesRattachement.date_fin_activite == null
                            ? ''
                            : SitesRattachement.date_fin_activite.toString()}
                    </h2>
                </div>
            ))}
        </div>
    )
}
