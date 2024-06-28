import { NextResponse } from 'next/server'
import pool from '../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { societeID: string } },
) {
    const societeID = params.societeID
    try {
        const [rows] = await pool.query(
            'SELECT entreprise.code_Societe, entreprise.raison_sociale, entreprise.nom_commercial, entreprise.site_Web, entreprise.Logo, entreprise.Siren, entreprise.code_type_activite_Societe, entreprise.commentaires, entreprise.code_Groupe_appartenance, entreprise.date_arret_activite_Societe AS type_activite_nom FROM entreprise LEFT JOIN TypeActiviteSociete ON entreprise.code_type_activite_Societe = TypeActiviteSociete.code WHERE entreprise.code_Societe = ?;',
            [societeID],
        )
        return NextResponse.json(rows)
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
