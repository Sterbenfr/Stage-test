import { NextResponse } from 'next/server'
import pool from '../../../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { entiteID : string, contactID: string } }
  ) {
    const contactID = params.contactID;
    try {
        const [rows] = await pool.query(
            'SELECT code_contact,Entite.raison_sociale,civilite,nom,prenom,photo,fonction,service,numero_fixe,numero_portable,adresse_mail,contacts.commentaires,date_arret_contact FROM Contacts JOIN Entite ON Contacts.code_entite = Entite.code_entite WHERE code_contact = ?;',[contactID]
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