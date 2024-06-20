CREATE TABLE Dons (
    code_Don INT PRIMARY KEY AUTO_INCREMENT,
    code_Entite_donatrice INT,
    date_proposition_don DATE NOT NULL,
    code_contact_Entite_donatrice INT,
    code_type_don CHAR(4) NOT NULL,
    code_type_competences CHAR(4),
    code_type_produits CHAR(4),
    code_mode_conservation_produits CHAR(4),
    date_debut_mise_disposition DATE,
    date_fin_mise_disposition DATE,
    commentaires VARCHAR(200),
    pieces_associees BLOB,
    code_Utilisateur_saisie_don INT NOT NULL,
    statut_acceptation_don ENUM('V', 'R', 'B'),
    date_acceptation_refus_don DATE,
    type_date_acceptation_refus ENUM('A', 'R'),
    code_Utilisateur_accepte_refuse_don INT,
    code_site_beneficiaire_don INT,
    indicateur_remerciement ENUM('O','N'),
    date_remerciement DATE,
    FOREIGN KEY (code_Entite_donatrice) REFERENCES Entite(code_Entite),
    FOREIGN KEY (code_contact_Entite_donatrice) REFERENCES ContactEntite(code_contact_entite),
    FOREIGN KEY (code_type_don) REFERENCES TypesDons(code_type_don),
    FOREIGN KEY (code_type_competences) REFERENCES TypesCompetences(code_type_competence),
    FOREIGN KEY (code_type_produits) REFERENCES TypesProduits(code_type_produits),
    FOREIGN KEY (code_mode_conservation_produits) REFERENCES ModeConservationProduits(code_mode_conservation_produits),
    FOREIGN KEY (code_Utilisateur_saisie_don) REFERENCES Utilisateurs(code_utilisateur),
    FOREIGN KEY (code_Utilisateur_accepte_refuse_don) REFERENCES Utilisateurs(code_utilisateur),
    FOREIGN KEY (code_site_beneficiaire_don) REFERENCES Sites(code_site)
);
INSERT INTO Dons (
    code_Entite_donatrice,
    date_proposition_don,
    code_contact_Entite_donatrice,
    code_type_don,
    code_type_competences,
    code_type_produits,
    code_mode_conservation_produits,
    date_debut_mise_disposition,
    date_fin_mise_disposition,
    commentaires,
    pieces_associees,
    code_Utilisateur_saisie_don,
    statut_acceptation_don,
    date_acceptation_refus_don,
    type_date_acceptation_refus,
    code_Utilisateur_accepte_refuse_don,
    code_site_beneficiaire_don,
    indicateur_remerciement,
    date_remerciement
) VALUES 
(1, '2023-01-01', 1, 'MAR', NULL, 'ALI', 'AMB', '2023-02-01', '2023-12-31', 'Don de compétences techniques', NULL, 1, 'Valide', '2023-01-15', 'A', 1, 1,'N',NULL),
(2, '2023-02-01', 2, 'FIN', NULL, 'VET', NULL, '2023-03-01', '2023-11-30', 'Don de produits alimentaires', NULL, 2, 'Valide', '2023-02-15', 'A', 2, 2,'O','2023-06-25'),
(3, '2023-03-01', 3, 'RAM', NULL, NULL, NULL, '2023-04-01', '2023-10-31', 'Don de services juridiques', NULL, 3, 'Refuse', '2023-03-15', 'R', 3, 3,'N',NULL),
(4, '2023-04-01', 4, 'SIE', NULL, NULL, NULL, '2023-05-01', '2023-09-30', 'Don de matériel informatique', NULL, 4, 'Valide', '2023-04-15', 'A', 4, 4,'O','2023-07-08'),
(5, '2023-05-01', 5, 'SIP', 'MAK', NULL, NULL, '2023-06-01', '2023-08-31', 'Don de vêtements', NULL, 5, 'Refuse', '2023-05-15', 'R', 5, 5,'N',NULL);

SELECT Dons.code_Don, Entite.raison_sociale, date_proposition_don,code_contact_Entite_donatrice, TypesDons.libelle as TD_libelle, TypesCompetences.libelle as TC_libelle,TypesProduits.libelle as TP_libelle, ModeConservationProduits.libelle as MCP_libelle, date_debut_mise_disposition, date_fin_mise_disposition, Dons.commentaires, Dons.pieces_associees, Utilisateur_saisie_don.nom as Utilisateur_saisie_don, statut_acceptation_don, date_acceptation_refus_don, type_date_acceptation_refus, Utilisateur_accepte_refuse_don.nom as Utilisateur_accepte_refuse_don, Sites.designation_longue,indicateur_remerciement,date_remerciement FROM Dons
LEFT JOIN Entite ON Dons.code_Entite_donatrice = Entite.code_Entite
LEFT JOIN ContactEntite ON Dons.code_contact_Entite_donatrice = ContactEntite.code_utilisateur_suivant
LEFT JOIN TypesDons ON Dons.code_type_don = TypesDons.code_type_don
LEFT JOIN TypesCompetences ON Dons.code_type_competences = TypesCompetences.code_type_competence
LEFT JOIN TypesProduits ON Dons.code_type_produits = TypesProduits.code_type_produits
LEFT JOIN ModeConservationProduits ON Dons.code_mode_conservation_produits = ModeConservationProduits.code_mode_conservation_produits
LEFT JOIN Utilisateurs as Utilisateur_saisie_don ON Dons.code_Utilisateur_saisie_don = Utilisateur_saisie_don.code_utilisateur 
LEFT JOIN Utilisateurs as Utilisateur_accepte_refuse_don ON Dons.code_Utilisateur_accepte_refuse_don = Utilisateur_accepte_refuse_don.code_utilisateur
LEFT JOIN Sites ON Dons.code_site_beneficiaire_don = Sites.code_site
WHERE Dons.code_don = '1';