CREATE TABLE BonLivraison (
    numero_BL INT PRIMARY KEY,
    code_Don INT,
    code_type_livraison CHAR(3),
    date_prevue_livraison DATE,
    heure_prevue_livraison TIME,
    adresse_enlevement VARCHAR(255),
    civilite_contact_enlevement VARCHAR(3),
    nom_contact_enlevement VARCHAR(20),
    prenom_contact_enlevement VARCHAR(20),
    telephone_contact_enlevement VARCHAR(20),
    mail_contact_enlevement VARCHAR(255),
    code_Prestataire_transporteur INT,
    adresse_livraison VARCHAR(255),
    civilite_contact_livraison VARCHAR(3),
    nom_contact_livraison VARCHAR(20),
    prenom_contact_livraison VARCHAR(20),
    telephone_contact_livraison VARCHAR(20),
    mail_contact_livraison VARCHAR(255),
    nombre_palettes_prevu INT,
    nombre_palettes_consignees_prevu INT,
    nombre_cartons_prevu INT,
    poids_prevu_kg INT,
    produits_sur_palettes VARCHAR(1),
    temperature_conserv_produits INT,
    commentaires VARCHAR(200),
    pieces_associees BLOB,
    FOREIGN KEY (code_Don) REFERENCES Dons(code_Don),
    FOREIGN KEY (code_type_livraison) REFERENCES TypeLivraison(code_type_livraison),
    FOREIGN KEY (code_Prestataire_transporteur) REFERENCES Prestataires(code_Prestataire)
);