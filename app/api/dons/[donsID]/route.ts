import { NextResponse } from 'next/server'
import pool from '../../../../utils/db'
import { NextApiRequest } from 'next'

export async function GET(
    request: Request,
    { params }: { params: { donsID: string } },
) {
    const donsID = params.donsID
    try {
        const [rows] = await pool.query(
            'SELECT Dons.code_Don, Entite.raison_sociale, date_proposition_don,users.nom as contact_entite_donatrice, TypesDons.libelle as TD_libelle, TypesCompetences.libelle as TC_libelle,TypesProduits.libelle as TP_libelle, ModeConservationProduits.libelle as MCP_libelle, date_debut_mise_disposition, date_fin_mise_disposition, Dons.commentaires, Dons.pieces_associees, Utilisateur_saisie_don.nom as Utilisateur_saisie_don, statut_acceptation_don, date_acceptation_refus_don, Utilisateur_accepte_refuse_don.nom as Utilisateur_accepte_refuse_don, Sites.designation_longue,indicateur_remerciement,date_remerciement FROM Dons LEFT JOIN Entite ON Dons.code_Entite_donatrice = Entite.code_Entite LEFT JOIN ContactEntite ON Dons.code_contact_Entite_donatrice = ContactEntite.code_entite LEFT JOIN Utilisateurs as users ON ContactEntite.code_utilisateur_suivant = users.code_utilisateur LEFT JOIN TypesDons ON Dons.code_type_don = TypesDons.code_type_don LEFT JOIN TypesCompetences ON Dons.code_type_competences = TypesCompetences.code_type_competence LEFT JOIN TypesProduits ON Dons.code_type_produits = TypesProduits.code_type_produits LEFT JOIN ModeConservationProduits ON Dons.code_mode_conservation_produits = ModeConservationProduits.code_mode_conservation_produits LEFT JOIN Utilisateurs as Utilisateur_saisie_don ON Dons.code_Utilisateur_saisie_don = Utilisateur_saisie_don.code_utilisateur LEFT JOIN Utilisateurs as Utilisateur_accepte_refuse_don ON Dons.code_Utilisateur_accepte_refuse_don = Utilisateur_accepte_refuse_don.code_utilisateur LEFT JOIN Sites ON Dons.code_site_beneficiaire_don = Sites.code_site WHERE Dons.code_don = ?;',
            [donsID],
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

export async function DELETE(
    req: NextApiRequest,
    { params }: { params: { donsID: string } },
) {
    const donsID = params.donsID
    if (donsID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `dons` WHERE `code_Don` = ?'
        const [rows] = await pool.query(query, donsID)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
