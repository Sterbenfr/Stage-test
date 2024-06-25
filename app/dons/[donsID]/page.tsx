'use client'
import { useEffect, useState } from 'react'
import style from '../../../styles/components.module.css'

interface DonID {
    code_Don: number
    raison_sociale: string
    date_proposition_don: Date
    contact_entite_donatrice: string
    TD_libelle: string
    TC_libelle: string
    TP_libelle: string
    MCP_libelle: string
    date_debut_mise_disposition: Date
    date_fin_mise_disposition: Date
    commentaires: string
    pieces_associees: Blob
    Utilisateur_saisie_don: string
    statut_acceptation_don: string
    date_acceptation_refus_don: Date
    type_date_acceptation_refus: string
    Utilisateur_accepte_refuse_don: string
    site: string
    indicateur_remerciement: string
    date_remerciement: Date
}

export default function DonPage({ params }: { params: { donsID: string } }) {
    const [don, setDon] = useState<DonID[]>([])

    useEffect(() => {
        const fetchDon = async () => {
            if (!params.donsID) return

            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const don: DonID[] = await res.json()
            setDon(don)
        }

        fetchDon()
    }, [params.donsID])
    if (!don || don.length === 0) return <div>Loading...</div>

    return (
        <div className={style.idPage}>
            <div>
                <h1 className={style.titre_global}>Détails du don :</h1>
            </div>

            <div className={style.info_id}>
                <div className={style.col_1}>
                    <div className={style.info}>
                        <p className={style.titre}>Code du don :</p>
                        <p>{don[0].code_Don == null ? '/' : don[0].code_Don}</p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Raison sociale :</p>
                        <p>
                            {don[0].raison_sociale == null
                                ? '/'
                                : don[0].raison_sociale}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Date de proposition du don :
                        </p>
                        <p>
                            {don[0].date_proposition_don == null
                                ? '/'
                                : don[0].date_proposition_don
                                      .toString()
                                      .split('T')[0]}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Contact de l&apos;entité donatrice :
                        </p>
                        <p>
                            {don[0].contact_entite_donatrice == null
                                ? '/'
                                : don[0].contact_entite_donatrice}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Type de don :</p>
                        <p>
                            {don[0].TD_libelle == null
                                ? '/'
                                : don[0].TD_libelle}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Type de compétence :</p>
                        <p>
                            {don[0].TC_libelle == null
                                ? '/'
                                : don[0].TC_libelle}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Type de produit :</p>
                        <p>
                            {don[0].TP_libelle == null
                                ? '/'
                                : don[0].TP_libelle}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Mode de consomation :</p>
                        <p>
                            {don[0].MCP_libelle == null
                                ? '/'
                                : don[0].MCP_libelle}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Date du début de mise a disposition :
                        </p>
                        <p>
                            {don[0].date_debut_mise_disposition == null
                                ? '/'
                                : don[0].date_debut_mise_disposition
                                      .toString()
                                      .split('T')[0]}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Date de la fin de mise a disposition :
                        </p>
                        <p>
                            {don[0].date_fin_mise_disposition == null
                                ? ''
                                : don[0].date_fin_mise_disposition
                                      .toString()
                                      .split('T')[0]}
                        </p>
                    </div>
                </div>

                <div className={style.col_2}>
                    <div className={style.info}>
                        <p className={style.titre}>Commentaires :</p>
                        <p>
                            {don[0].commentaires == null
                                ? '/'
                                : don[0].commentaires}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Utilisateur saisie de don :
                        </p>
                        <p>
                            {don[0].Utilisateur_saisie_don == null
                                ? '/'
                                : don[0].Utilisateur_saisie_don}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Statut d&apos;acceptation du don :
                        </p>
                        <p>
                            {don[0].statut_acceptation_don == null
                                ? '/'
                                : don[0].statut_acceptation_don}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Date d&apos;acceptation / refus :
                        </p>
                        <p>
                            {don[0].date_acceptation_refus_don == null
                                ? '/'
                                : don[0].date_acceptation_refus_don
                                      .toString()
                                      .split('T')[0]}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Acceptation / refus :</p>
                        <p>
                            {don[0].type_date_acceptation_refus == null
                                ? '/'
                                : don[0].type_date_acceptation_refus}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            L&apos;utilisateur qui accepte ou refuse le don :
                        </p>
                        <p>
                            {don[0].Utilisateur_accepte_refuse_don == null
                                ? '/'
                                : don[0].Utilisateur_accepte_refuse_don}
                        </p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>Site :</p>
                        <p>{don[0].site == null ? '/' : don[0].site}</p>
                    </div>

                    <div className={style.info}>
                        <p className={style.titre}>
                            Indicateur de remerciement :
                        </p>
                        <p>
                            {don[0].indicateur_remerciement == null
                                ? '/'
                                : don[0].indicateur_remerciement}
                        </p>
                    </div>

                    <div>
                        <p className={style.info}>
                            <p className={style.titre}>
                                Date du remerciement :
                            </p>
                            {don[0].date_remerciement == null
                                ? '/'
                                : don[0].date_remerciement
                                      .toString()
                                      .split('T')[0]}
                        </p>
                    </div>
                    <div className={style.info}>
                        <a href={`/dons/${params.donsID}/modalites-livraison`}><p className={style.titre}> Modalités de la livraison </p></a>
                    </div>
                    <div className={style.info}>
                        <a href={`/dons/${params.donsID}/reception`}><p className={style.titre}> Réception de la livraison </p></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
