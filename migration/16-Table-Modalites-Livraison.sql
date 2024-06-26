CREATE TABLE ModalitesLivraison (
    numero_livraison INT PRIMARY KEY,
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
INSERT INTO ModalitesLivraison (
    numero_livraison,
    code_Don,
    code_type_livraison,
    date_prevue_livraison,
    heure_prevue_livraison,
    adresse_enlevement,
    civilite_contact_enlevement,
    nom_contact_enlevement,
    prenom_contact_enlevement,
    telephone_contact_enlevement,
    mail_contact_enlevement,
    code_Prestataire_transporteur,
    adresse_livraison,
    civilite_contact_livraison,
    nom_contact_livraison,
    prenom_contact_livraison,
    telephone_contact_livraison,
    mail_contact_livraison,
    nombre_palettes_prevu,
    nombre_palettes_consignees_prevu,
    nombre_cartons_prevu,
    poids_prevu_kg,
    produits_sur_palettes,
    temperature_conserv_produits,
    commentaires,
    pieces_associees
) VALUES 
(1, 1, 'DON', '2024-06-15', '14:00:00', "123 Rue de l'Enlèvement, Paris", 'M.', 'Dupont', 'Jean', '0123456789', 'jean.dupont@example.com', 1, '456 Rue de la Livraison, Lyon', 'Mme', 'Martin', 'Marie', '0987654321', 'marie.martin@example.com', 5, 5, 50, 1000, 'O', 4, 'Livraison urgente', NULL),
(2, 2, 'RES', '2024-06-16', '09:00:00', "789 Rue de l'Enlèvement, Marseille", 'Mme', 'Durand', 'Sophie', '0234567890', 'sophie.durand@example.com', 2, '321 Rue de la Livraison, Lille', 'M.', 'Bernard', 'Pierre', '0876543210', 'pierre.bernard@example.com', 3, 3, 30, 600, 'N', 2, 'Livraison standard', NULL),
(3, 3, 'TRA', '2024-06-17', '16:00:00', "456 Rue de l'Enlèvement, Nice", 'M.', 'Moreau', 'Luc', '0345678901', 'luc.moreau@example.com', 3, '654 Rue de la Livraison, Bordeaux', 'Mme', 'Lefevre', 'Claire', '0765432109', 'claire.lefevre@example.com', 7, 7, 70, 1400, 'O', 5, 'Livraison avec retour', NULL),
(4, 4, 'DON', '2024-06-18', '11:00:00', "123 Rue de l'Enlèvement, Toulouse", 'Mme', 'Fabre', 'Julie', '0456789012', 'julie.fabre@example.com', 4, '987 Rue de la Livraison, Strasbourg', 'M.', 'Roux', 'Paul', '0654321098', 'paul.roux@example.com', 4, 4, 40, 800, 'N', 3, 'Livraison express', NULL),
(5, 5, 'RES', '2024-06-19', '13:00:00', "789 Rue de l'Enlèvement, Nantes", 'M.', 'Garnier', 'Antoine', '0567890123', 'antoine.garnier@example.com', 5, '321 Rue de la Livraison, Montpellier', 'Mme', 'Perrin', 'Lucie', '0543210987', 'lucie.perrin@example.com', 2, 2, 20, 400, 'O', 1, 'Livraison internationale', NULL);
