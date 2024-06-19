'use client'
import { useEffect, useState } from 'react'
import style from '../../../styles/components.module.css'

interface siteID {
    code_site: number
    designation_longue: string
    designation_courte: string
    adresse: string
    libelle: string
    date_ouverture: Date
    date_fermeture: Date
    numero_telephone: string
    adresse_mail: string
    commentaires: string
}

export default function SitePage({ params }: { params: { siteID: string } }) {
    const [site, setSite] = useState<siteID[]>([])

    useEffect(() => {
        const fetchSite = async () => {
            if (!params.siteID) return

            const res = await fetch(
                `http://localhost:3000/api/sites/${params.siteID}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const site: siteID[] = await res.json()
            setSite(site)
        }

        fetchSite()
    }, [params.siteID])
    if (!site || site.length === 0) return <div>Loading...</div>

    return (
        <div className={style.idPage}>
            <div className='Titre_haut'>
                <h1 className={style.titre_global}>Details des sites :</h1>
            </div>

            <div className={style.info_id}>
                <div className={style.info}>
                    <p className={style.titre}>Code du site :</p>
                    <p>{site[0].code_site}</p>
                </div>

                <div className={style.info}>
                    <p className={style.titre}>Designation longue :</p>
                    <p>{site[0].designation_longue}</p>
                </div>

                <div className={style.info}>
                    <p className={style.titre}>Designation courte :</p>
                    <p>{site[0].designation_courte}</p>
                </div>

                <div className={style.info}>
                    <p className={style.titre}>Adresse :</p>
                    <p>{site[0].adresse}</p>
                </div>

                <div className={style.info}>
                    <p className={style.titre}>Libelle :</p>
                    <p>{site[0].libelle}</p>
                </div>

                <div className={style.info}>
                    <p className={style.titre}>Date ouverture :</p>
                    <p>
                        {site[0].date_ouverture == null
                            ? ''
                            : site[0].date_ouverture.toString().split('T')[0]}
                    </p>
                </div>
                <div className={style.info}>
                    <p className={style.titre}>Date fermeture :</p>
                    <p>
                        {site[0].date_fermeture == null
                            ? ''
                            : site[0].date_fermeture.toString().split('T')[0]}
                    </p>
                </div>

                <div className={style.info}>
                    <p className={style.titre}>Numero de telephone :</p>
                    <p>{site[0].numero_telephone}</p>
                </div>

                <div className={style.info}>
                    <p className={style.titre}>Adresse mail :</p>
                    <p>{site[0].adresse_mail}</p>
                </div>

                <div className={style.info}>
                    <p className={style.titre}>Commentaires :</p>
                    <p>{site[0].commentaires}</p>
                </div>
            </div>
        </div>
    )
}
