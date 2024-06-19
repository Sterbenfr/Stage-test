CREATE TABLE Entite (
    code_entite INT(7) NOT NULL AUTO_INCREMENT,
    raison_sociale VARCHAR(30) NOT NULL,
    nom_commercial VARCHAR(30) DEFAULT '',
    logo BLOB,
    siret CHAR(14),
    code_ape CHAR(5),
    code_rna CHAR(10),
    code_cee CHAR(13),
    code_societe_appartenance INT(6),
    adresse TEXT,
    telephone VARCHAR(12),
    mail VARCHAR(50),
    site_internet VARCHAR(50),
    commentaires VARCHAR(200),
    code_type_entite CHAR(4) NOT NULL,
    code_type_don CHAR(4),
    code_type_produit CHAR(4),
    code_type_competence CHAR(4),
    commentaires_logistique VARCHAR(200),
    presence_quai CHAR(1),
    pieces_associees BLOB,
    cerfa CHAR(1),
    code_frequence_cerfa CHAR(4),
    date_arret_activite DATE,
    PRIMARY KEY (code_entite),
    FOREIGN KEY (code_type_entite) REFERENCES TypesEntites(code_type_entite),
    FOREIGN KEY (code_type_don) REFERENCES TypesDons(code_type_don),
    FOREIGN KEY (code_type_produit) REFERENCES TypesProduits(code_type_produits),
    FOREIGN KEY (code_type_competence) REFERENCES TypesCompetences(code_type_competence),
    FOREIGN KEY (code_frequence_cerfa) REFERENCES FrequencesCerfa(code_frequence_cerfa),
    FOREIGN KEY (code_societe_appartenance) REFERENCES Societe(code_Societe)
);
INSERT INTO Entite (
    raison_sociale,
    nom_commercial,
    logo,
    siret,
    code_ape,
    code_rna,
    code_cee,
    code_societe_appartenance,
    adresse,
    telephone,
    mail,
    site_internet,
    commentaires,
    code_type_entite,
    code_type_don,
    code_type_produit,
    code_type_competence,
    commentaires_logistique,
    presence_quai,
    pieces_associees,
    cerfa,
    code_frequence_cerfa,
    date_arret_activite
) VALUES 
('Entreprise Alpha', 'Alpha Corp', NULL, '12345678901234', '12345', 'RNA1234567','', 201, '123 Rue de Paris, 75001 Paris', '0123456789', 'contact@alpha.com', 'http://www.alpha.com', 'Commentaire 1', 'CEN', 'MAR', 'HYG', NULL, 'Logistique Alpha', 'O', NULL, 'O', 'LIV', NULL),
('Entreprise Beta', 'Beta Ltd', NULL, '23456789012345', '23456', 'RNA2345678','', 202, '456 Avenue de Lyon, 69000 Lyon', '0234567890', 'contact@beta.com', 'http://www.beta.com', 'Commentaire 2', 'ENT', 'FIN', NULL, NULL, 'Logistique Beta', 'N', NULL, 'N', 'MEN', NULL),
('Entreprise Gamma', 'Gamma Inc', NULL, '34567890123456', '34567', 'RNA3456789','', 203, '789 Boulevard de Nice, 06000 Nice', '0345678901', 'contact@gamma.com', 'http://www.gamma.com', 'Commentaire 3', 'MAG', 'RAM', NULL, NULL, 'Logistique Gamma', 'O', NULL, 'O', 'ANN', NULL),
('Entreprise Delta', 'Delta SA', NULL, '45678901234567', '45678', 'RNA4567890','', 204, '101 Rue de Marseille, 13000 Marseille', '0456789012', 'contact@delta.com', 'http://www.delta.com', 'Commentaire 4', 'SIE', 'SIE', NULL, 'DEV', 'Logistique Delta', 'N', NULL, 'N', 'LIV', NULL),
('Entreprise Epsilon', 'Epsilon GmbH', NULL, '56789012345678', '56789', 'RNA5678901','', 205, '202 Place de Bordeaux, 33000 Bordeaux', '0567890123', 'contact@epsilon.com', 'http://www.epsilon.com', 'Commentaire 5', 'SIP', 'SIP', NULL, 'BRI', 'Logistique Epsilon', 'O', NULL, 'O', 'MEN', NULL);

SELECT code_entite,raison_sociale,nom_commercial,logo,siret,code_ape,code_rna,code_cee,societe.raison_sociale as nom_societe,adresse,telephone,mail,site_internet,Entite.commentaires,TypesEntites.libelle as TE_libelle,TypesDons.libelle as TD_libelle,TypesProduits.libelle as TP_libelle,TypesCompetences.libelle as TC_libelle,commentaires_logistique,presence_quai,pieces_associees,cerfa,FrequencesCerfa.libelle,date_arret_activite FROM Entite
JOIN TypesEntites ON Entite.code_type_entite = TypesEntites.code_type_entite
JOIN TypesDons ON Entite.code_type_don = TypesDons.code_type_don
JOIN TypesProduits ON Entite.code_type_produit = TypesProduits.code_type_produits
JOIN TypesCompetences ON Entite.code_type_competence = TypesCompetences.code_type_competence
JOIN FrequencesCerfa ON Entite.code_frequence_cerfa = FrequencesCerfa.code_frequence_cerfa
JOIN Societe ON Entite.code_societe_appartenance = Societe.code_Societe
WHERE code_entite = 1;
