import { NextResponse } from 'next/server'
import pool from '../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { societeID: string } },
) {
    const societeID = params.societeID
    try {
        const [rows] = await pool.query(
            'SELECT Societe.code_Societe, Societe.raison_sociale, Societe.nom_commercial, Societe.site_Web, Societe.Logo, Societe.Siren, Societe.code_type_activite_Societe, Societe.commentaires, Societe.code_Groupe_appartenance, Societe.date_arret_activite_Societe AS type_activite_nom FROM Societe LEFT JOIN TypeActiviteSociete ON Societe.code_type_activite_Societe = TypeActiviteSociete.code WHERE Societe.code_Societe = ?;',
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
