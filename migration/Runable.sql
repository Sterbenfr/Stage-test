CREATE TABLE TypesUtilisateurs (
    code_type_utilisateur CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

-- Insert predefined types of utilisateurs
INSERT INTO TypesUtilisateurs (code_type_utilisateur, libelle)
VALUES
('PR', 'Prospecteur'),
('AP', 'Approvisionneur'),
('RR', 'Responsable Réception'),
('RC', 'Responsable de Centre');



CREATE TABLE SiteTypes (
    code_type_site VARCHAR(4) NOT NULL PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

-- Insert predefined types of sites
INSERT INTO SiteTypes (code_type_site, libelle)
VALUES
('AN', 'Association Nationale'),
('DR', 'Délégation Régionale'),
('AD', 'Antenne Départementale'),
('CD', 'Centre de Distribution'),
('EO', "Entrepôt d'Opportunité");



CREATE TABLE TypesEntites (
    code_type_entite CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

-- Insert predefined types of entites
INSERT INTO TypesEntites (code_type_entite, libelle)
VALUES
('CEN', "Centrale d'Achat"),
('ENT', 'Entrepôt'),
('MAG', 'Magasin'),
('SIE', 'Siège social'),
('SIP', 'Site production'),
('ADM', 'Administration'),
('GRO', 'Grossiste'),
('ECO', 'Ecole');



CREATE TABLE TypesDons (
    code_type_don CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

-- Insert predefined types of dons
INSERT INTO TypesDons (code_type_don, libelle)
VALUES
('MAR', 'Marchandises'),
('FIN', 'Financiers'),
('RAM', 'Ramasse'),
('SIE', 'Prestations'),
('SIP', 'Compétences');



CREATE TABLE TypesProduits (
    code_type_produits CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

-- Insert predefined types of produits
INSERT INTO TypesProduits (code_type_produits, libelle)
VALUES
('ALI', 'Alimentaire'),
('VET', 'Vêtements'),
('HYG', 'Hygiène'),
('EQM', 'Equipement maison');




CREATE TABLE TypesCompetences (
    code_type_competence CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

-- Insert predefined types of competences
INSERT INTO TypesCompetences (code_type_competence, libelle)
VALUES
('FIN', 'Formation informatique'),
('MAK', 'Marketing'),
('DEV', 'Développement informatique'),
('BRI', 'Bricolage');




CREATE TABLE FrequencesCerfa (
    code_frequence_cerfa CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

-- Insert predefined frequencies for Cerfa
INSERT INTO FrequencesCerfa (code_frequence_cerfa, libelle)
VALUES
('LIV', 'Livraison'),
('MEN', 'Mensuel'),
('ANN', 'Annuel');




CREATE TABLE TypeActiviteSociete (
    code CHAR(3) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);
INSERT INTO TypeActiviteSociete (code, libelle) VALUES
('DIS', 'Distributeur'),
('FAB', 'Fabricant'),
('PRE', 'Prestataire de Services'),
('ADM', 'Administration');





CREATE TABLE TypePrestataires (
    code_type_de_Prestataire CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);
INSERT INTO TypePrestataires (code_type_de_Prestataire, libelle) VALUES
('TRA', 'Transporteur');




CREATE TABLE TypeInteractions (
    code_type_interaction CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);
INSERT INTO TypeInteractions (code_type_interaction, libelle) VALUES
('PRE', '1er contact'),
('REL', 'Relance');
-- Ajoutez d'autres types d'interactions au besoin




CREATE TABLE ModaliteInteractions (
    code_modalite_interaction CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);
INSERT INTO ModaliteInteractions (code_modalite_interaction, libelle) VALUES
('TEL', 'Téléphone'),
('MAI', 'Mail'),
('SMS', 'SMS');
-- Ajoutez d'autres modalités d'interactions au besoin




CREATE TABLE ModeConservationProduits (
    code_mode_conservation_produits CHAR(4) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);
INSERT INTO ModeConservationProduits (code_mode_conservation_produits, libelle) VALUES
('AMB', 'Ambiant'),
('SUR', 'Surgelés'),
('FRA', 'Frais');




CREATE TABLE TypeLivraison (
    code_type_livraison CHAR(3) PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

INSERT INTO TypeLivraison (code_type_livraison, libelle) VALUES
('DON', 'Donateur'),
('RES', 'Restos'),
('TRA', 'Transporteur');

CREATE TABLE Utilisateurs (
    code_utilisateur INT(6) NOT NULL AUTO_INCREMENT,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    tel_perso VARCHAR(12),
    mail_restos_du_coeur VARCHAR(50),
    commentaires VARCHAR(200),
    PRIMARY KEY (code_utilisateur)
);
INSERT INTO Utilisateurs (civilite, nom, prenom, tel_perso, mail_restos_du_coeur, commentaires) VALUES
('Mr.', 'Dupont', 'Jean', '0123456789', 'jean.dupont@restosducoeur.org', 'Nouveau bénévole.'),
('Mme', 'Martin', 'Marie', '0987654321', 'marie.martin@restosducoeur.org', 'Responsable de secteur.'),
('Mr.', 'Durand', 'Paul', '0123987654', 'paul.durand@restosducoeur.org', 'Volontaire depuis 2 ans.'),
('Mme', 'Petit', 'Sophie', '0765432109', 'sophie.petit@restosducoeur.org', 'Coordination des événements.'),
('M.', 'Leroy', 'Julien', '0654321987', 'julien.leroy@restosducoeur.org', 'Gestion des stocks.');

CREATE TABLE Societe (
    code_Societe INT PRIMARY KEY AUTO_INCREMENT, -- clé primaire
    raison_sociale VARCHAR(30) NOT NULL,
    nom_commercial VARCHAR(30) DEFAULT 'raison_sociale',
    Logo BLOB, -- assuming Logo is an image or binary data
    site_Web VARCHAR(255),
    Siren CHAR(9) NOT NULL,
    code_type_activite_Societe CHAR(4),
    commentaires VARCHAR(200),
    code_Groupe_appartenance INT,
    date_arret_activite_Societe DATE,
    FOREIGN KEY (code_type_activite_Societe) REFERENCES TypeActiviteSociete(code)
);
INSERT INTO Societe (
    raison_sociale,
    nom_commercial,
    Logo,
    site_Web,
    Siren,
    code_type_activite_Societe,
    commentaires,
    code_Groupe_appartenance,
    date_arret_activite_Societe
) VALUES 
('Société Alpha', NULL, NULL, 'http://www.alpha.com/', '123456789', 'DIS', 'Première société', 1, NULL),
('Société Beta', NULL, NULL, 'http://www.beta.com/', '234567890', 'FAB', 'Deuxième société', 2, NULL),
('Société Gamma', NULL, NULL, 'http://www.gamma.com/', '345678901', 'PRE', 'Troisième société', 3, NULL),
('Société Delta', NULL, NULL, 'http://www.delta.com/', '456789012', 'ADM', 'Quatrième société', 4, NULL),
('Société Epsilon', NULL, NULL, 'http://www.epsilon.com/', '567890123', 'PRE', 'Cinquième société', 5, NULL);

CREATE TABLE Sites (
    code_site INT(5) NOT NULL AUTO_INCREMENT,
    designation_longue VARCHAR(40) NOT NULL,
    designation_courte VARCHAR(15) NOT NULL,
    adresse TEXT NOT NULL,
    code_type_site CHAR(4) NOT NULL,
    date_ouverture DATE,
    date_fermeture DATE,
    numero_telephone VARCHAR(12),
    adresse_mail TEXT,
    commentaires VARCHAR(200),
    PRIMARY KEY (code_site),
    FOREIGN KEY (code_type_site) REFERENCES SiteTypes(code_type_site)
);
INSERT INTO Sites (
    designation_longue,
    designation_courte,
    adresse,
    code_type_site,
    date_ouverture,
    date_fermeture,
    numero_telephone,
    adresse_mail,
    commentaires
) VALUES 
('Siège Social', 'Siège', '123 Rue de Paris, 75001 Paris', 'AN', '2020-01-01', NULL, '0123456789', 'contact@entreprise.com', 'Commentaires sur le siège social'),
('Entrepôt Principal', 'Entrepôt', '456 Avenue de Lyon, 69000 Lyon', 'EO', '2020-02-01', NULL, '0234567890', 'entrepot@entreprise.com', "Commentaires sur l'entrepôt principal"),
('Bureau Régional', 'Bureau', '789 Boulevard de Nice, 06000 Nice', 'AD', '2020-03-01', NULL, '0345678901', 'bureau@entreprise.com', 'Commentaires sur le bureau régional'),
('Centre de Distribution', 'Distribution', '101 Rue de Marseille, 13000 Marseille', 'DR', '2020-04-01', NULL, '0456789012', 'distribution@entreprise.com', 'Commentaires sur le centre de distribution'),
('Magasin de Détail', 'Magasin', '202 Place de Bordeaux, 33000 Bordeaux', 'CD', '2020-05-01', NULL, '0567890123', 'magasin@entreprise.com', 'Commentaires sur le magasin de détail');

CREATE TABLE SitesRattachement (
    code_utilisateur INT(6) NOT NULL,
    code_site INT(5) NOT NULL,
    code_type_utilisateur CHAR(4) NOT NULL,
    date_fin_activite DATE,
    PRIMARY KEY (code_utilisateur, code_site),
    FOREIGN KEY (code_utilisateur) REFERENCES Utilisateurs(code_utilisateur),
    FOREIGN KEY (code_site) REFERENCES Sites(code_site),
    FOREIGN KEY (code_type_utilisateur) REFERENCES TypesUtilisateurs(code_type_utilisateur)
);
INSERT INTO SitesRattachement (
    code_utilisateur,
    code_site,
    code_type_utilisateur,
    date_fin_activite
) VALUES 
(1, 1, 'PR', NULL),
(2, 2, 'AP', NULL),
(3, 3, 'RR', NULL),
(4, 4, 'RC', NULL),
(5, 5, 'RR', NULL);

CREATE TABLE SuiviSociete (
    code_Societe INT,
    code_type_de_Site VARCHAR(4) NOT NULL,
    code_site_suivi INT NOT NULL,
    code_utilisateur_suivant INT,
    PRIMARY KEY (code_Societe, code_type_de_Site),
    FOREIGN KEY (code_Societe) REFERENCES Societe(code_Societe),
    FOREIGN KEY (code_type_de_Site) REFERENCES SiteTypes(code_type_site),
    FOREIGN KEY (code_site_suivi) REFERENCES Sites(code_site),
    FOREIGN KEY (code_utilisateur_suivant) REFERENCES Utilisateurs(code_utilisateur)
);
INSERT INTO SuiviSociete (
    code_Societe,
    code_type_de_Site,
    code_site_suivi,
    code_utilisateur_suivant
) VALUES 
(1, 'AN', 1, 1),
(2, 'DR', 2, 2),
(3, 'AD', 3, 3),
(4, 'CD', 4, 4),
(5, 'EO', 5, 5);

CREATE TABLE Prestataires (
    code_Prestataire INT PRIMARY KEY AUTO_INCREMENT,
    code_type_de_Prestataire CHAR(4) NOT NULL,
    raison_sociale VARCHAR(30) NOT NULL,
    nom_commercial VARCHAR(30),
    Siren CHAR(9),
    Siret CHAR(14),
    telephone VARCHAR(12),
    mail VARCHAR(255),
    adresse VARCHAR(255),
    civilite_contact_prestataire VARCHAR(3),
    nom_contact_prestataire VARCHAR(20),
    prenom_contact_prestataire VARCHAR(20),
    telephone_contact_prestataire VARCHAR(12),
    mail_contact_prestataire VARCHAR(255),
    commentaires VARCHAR(200),
    date_arret_activite_du_prestataire DATE,
    FOREIGN KEY (code_type_de_Prestataire) REFERENCES TypePrestataires(code_type_de_Prestataire)
);
INSERT INTO Prestataires (
    code_type_de_Prestataire,
    raison_sociale,
    nom_commercial,
    Siren,
    Siret,
    telephone,
    mail,
    adresse,
    civilite_contact_prestataire,
    nom_contact_prestataire,
    prenom_contact_prestataire,
    telephone_contact_prestataire,
    mail_contact_prestataire,
    commentaires,
    date_arret_activite_du_prestataire
) VALUES 
('TRA', 'Société Alpha', 'Société Alpha', '123456789', '12345678901234', '0123456789', 'contact@alpha.com', '123 Rue de Paris, 75001 Paris', 'M.', 'Dupont', 'Jean', '0123456789', 'jean.dupont@alpha.com', 'Premier prestataire', NULL),
('TRA', 'Société Beta', 'Société Beta', '234567890', '23456789012345', '0234567890', 'contact@beta.com', '456 Avenue de Lyon, 69000 Lyon', 'Mme', 'Martin', 'Sophie', '0234567890', 'sophie.martin@beta.com', 'Deuxième prestataire', NULL),
('TRA', 'Société Gamma', 'Société Gamma', '345678901', '34567890123456', '0345678901', 'contact@gamma.com', '789 Boulevard de Nice, 06000 Nice', 'M.', 'Durand', 'Pierre', '0345678901', 'pierre.durand@gamma.com', 'Troisième prestataire', NULL),
('TRA', 'Société Delta', 'Société Delta', '456789012', '45678901234567', '0456789012', 'contact@delta.com', '101 Rue de Marseille, 13000 Marseille', 'Mme', 'Leroy', 'Claire', '0456789012', 'claire.leroy@delta.com', 'Quatrième prestataire', NULL),
('TRA', 'Société Epsilon', 'Société Epsilon', '567890123', '56789012345678', '0567890123', 'contact@epsilon.com', '202 Place de Bordeaux, 33000 Bordeaux', 'M.', 'Moreau', 'Louis', '0567890123', 'louis.moreau@epsilon.com', 'Cinquième prestataire', NULL);

CREATE TABLE Groupe (
    code_Groupe INT PRIMARY KEY AUTO_INCREMENT, -- clé primaire
    nom_du_Groupe VARCHAR(255) NOT NULL,
    Logo BLOB, -- assuming Logo is an image or binary data
    site_Web VARCHAR(255),
    commentaires VARCHAR(200),
    date_arret_activite_du_Groupe DATE
);
INSERT INTO Groupe (
    nom_du_Groupe,
    Logo,
    site_Web,
    commentaires,
    date_arret_activite_du_Groupe
) VALUES 
('Groupe Alpha', NULL, 'http://www.alpha.com', 'Premier groupe', NULL),
('Groupe Beta', NULL, 'http://www.beta.com', 'Deuxième groupe', NULL),
('Groupe Gamma', NULL, 'http://www.gamma.com', 'Troisième groupe', NULL),
('Groupe Delta', NULL, 'http://www.delta.com', 'Quatrième groupe', NULL),
('Groupe Epsilon', NULL, 'http://www.epsilon.com', 'Cinquième groupe', NULL);


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
    FOREIGN KEY (code_frequence_cerfa) REFERENCES FrequencesCerfa(code_frequence_cerfa)
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

CREATE TABLE ContactEntite (
    code_entite INT(7) NOT NULL,
    code_type_site CHAR(4) NOT NULL,
    code_site_suivi INT(5) NOT NULL,
    code_utilisateur_suivant INT(6),
    PRIMARY KEY (code_entite, code_site_suivi, code_type_site),
    FOREIGN KEY (code_entite) REFERENCES Entite(code_entite),
    FOREIGN KEY (code_type_site) REFERENCES SiteTypes(code_type_site),
    FOREIGN KEY (code_site_suivi) REFERENCES Sites(code_site),
    FOREIGN KEY (code_utilisateur_suivant) REFERENCES Utilisateurs(code_utilisateur)
);
INSERT INTO ContactEntite (
    code_entite,
    code_type_site,
    code_site_suivi,
    code_utilisateur_suivant
) VALUES 
(1, 'AN', 1, 1),
(2, 'DR', 2, 2),
(3, 'AD', 3, 3),
(4, 'CD', 4, 4),
(5, 'EO', 5, 5);

CREATE TABLE Contacts (
    code_entite INT(7) NOT NULL,
    code_contact INT(3) NOT NULL AUTO_INCREMENT,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    photo BLOB,
    fonction VARCHAR(30),
    service VARCHAR(30),
    numero_fixe TEXT,
    numero_portable TEXT,
    adresse_mail TEXT,
    commentaires VARCHAR(200),
    date_arret_contact DATE,
    PRIMARY KEY (code_contact,code_entite),
    FOREIGN KEY (code_entite) REFERENCES Entite(code_entite)
);
INSERT INTO Contacts (
    code_entite,
    civilite,
    nom,
    prenom,
    photo,
    fonction,
    service,
    numero_fixe,
    numero_portable,
    adresse_mail,
    commentaires,
    date_arret_contact
) VALUES 
(1, 'M.', 'Dupont', 'Jean', NULL, 'Directeur', 'Administration', '01 23 45 67 89', '06 12 34 56 78', 'jean.dupont@example.com', 'Premier contact', NULL),
(2, 'Mme', 'Martin', 'Sophie', NULL, 'Responsable', 'Comptabilité', '01 23 45 67 90', '06 12 34 56 79', 'sophie.martin@example.com', 'Deuxième contact', NULL),
(3, 'M.', 'Durand', 'Pierre', NULL, 'Technicien', 'Informatique', '01 23 45 67 91', '06 12 34 56 80', 'pierre.durand@example.com', 'Troisième contact', NULL),
(4, 'Mme', 'Leroy', 'Claire', NULL, 'Assistante', 'Ressources Humaines', '01 23 45 67 92', '06 12 34 56 81', 'claire.leroy@example.com', 'Quatrième contact', NULL),
(5, 'M.', 'Moreau', 'Louis', NULL, 'Chef de projet', 'Marketing', '01 23 45 67 93', '06 12 34 56 82', 'louis.moreau@example.com', 'Cinquième contact', NULL);



CREATE TABLE AffectationDonateursProspecteurs (
    code_Utilisateur_Prospecteur INT,
    code_Entite INT,
    commentaires VARCHAR(200),
    date_affectation DATE NOT NULL,
    date_arret_affectation DATE,
    PRIMARY KEY (code_Utilisateur_Prospecteur, code_Entite),
    FOREIGN KEY (code_Utilisateur_Prospecteur) REFERENCES Utilisateurs(code_utilisateur),
    FOREIGN KEY (code_Entite) REFERENCES Entite(code_Entite)
);
INSERT INTO AffectationDonateursProspecteurs (
    code_Utilisateur_Prospecteur,
    code_Entite,
    commentaires,
    date_affectation,
    date_arret_affectation
) VALUES 
(1, 1, 'Premier affectation', '2023-01-01', '2023-12-31'),
(2, 2, 'Deuxième affectation', '2023-02-01', '2023-11-30'),
(3, 3, 'Troisième affectation', '2023-03-01', NULL),
(4, 4, 'Quatrième affectation', '2023-04-01', '2023-10-31'),
(5, 5, 'Cinquième affectation', '2023-05-01', '2023-09-30');

CREATE TABLE Interactions (
    code_Utilisateur_Prospecteur INT,
    code_Entite_Prospectee INT,
    date_interaction DATE,
    code_type_interactions CHAR(4),
    code_modalite_interaction CHAR(4),
    code_contact_entite INT,
    commentaires VARCHAR(200),
    pieces_associees BLOB, -- Assuming pieces_associees is for storing PDF files or similar
    date_relance DATE,
    PRIMARY KEY (code_Utilisateur_Prospecteur, code_Entite_Prospectee, date_interaction),
    FOREIGN KEY (code_Utilisateur_Prospecteur) REFERENCES Utilisateurs(code_utilisateur),
    FOREIGN KEY (code_Entite_Prospectee) REFERENCES Entite(code_Entite),
    FOREIGN KEY (code_type_interactions) REFERENCES TypeInteractions(code_type_interaction),
    FOREIGN KEY (code_modalite_interaction) REFERENCES ModaliteInteractions(code_modalite_interaction),
    FOREIGN KEY (code_contact_entite) REFERENCES ContactEntite(code_utilisateur_suivant)
);
INSERT INTO Interactions (
    code_Utilisateur_Prospecteur,
    code_Entite_Prospectee,
    date_interaction,
    code_type_interactions,
    code_modalite_interaction,
    code_contact_entite,
    commentaires,
    pieces_associees,
    date_relance
) VALUES 
(1, 1, '2023-06-01', 'PRE', 'TEL', 1, "Première interaction avec l'entité 101", NULL, '2023-06-15'),
(2, 2, '2023-06-02', 'PRE', 'TEL', 2, "Deuxième interaction avec l'entité 102", NULL, '2023-06-16'),
(3, 3, '2023-06-03', 'REL', 'SMS', 3, "Troisième interaction avec l'entité 103", NULL, '2023-06-17'),
(4, 4, '2023-06-04', 'PRE', 'MAI', 4, "Quatrième interaction avec l'entité 104", NULL, '2023-06-18');

CREATE TABLE SuiviGroupe (
    code_Groupe INT,
    code_type_de_Site CHAR(4) NOT NULL,
    code_site_suivi INT NOT NULL,
    code_utilisateur_suivant INT,
    PRIMARY KEY (code_Groupe, code_type_de_Site),
    FOREIGN KEY (code_Groupe) REFERENCES Groupe(code_Groupe),
    FOREIGN KEY (code_type_de_Site) REFERENCES SiteTypes(code_type_site),
    FOREIGN KEY (code_site_suivi) REFERENCES Sites(code_site),
    FOREIGN KEY (code_utilisateur_suivant) REFERENCES Utilisateurs(code_utilisateur)
);
INSERT INTO SuiviGroupe (
    code_Groupe,
    code_type_de_Site,
    code_site_suivi,
    code_utilisateur_suivant
) VALUES 
(1, 'AN', 1, 1),
(2, 'AD', 2, 2),
(3, 'CD', 3, 3),
(4, 'DR', 4, 4),
(5, 'EO', 5, 5);

CREATE TABLE Dons (
    code_Don INT PRIMARY KEY AUTO_INCREMENT,
    code_Entite_donatrice INT,
    date_proposition_don DATE NOT NULL,
    code_contact_Entite_donatrice INT(6),
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
    code_Utilisateur_accepte_refuse_don INT,
    code_site_beneficiaire_don INT,
    indicateur_remerciement ENUM('O','N'),
    date_remerciement DATE,
    FOREIGN KEY (code_Entite_donatrice) REFERENCES Entite(code_Entite),
    FOREIGN KEY (code_contact_Entite_donatrice) REFERENCES ContactEntite(code_utilisateur_suivant),
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
    code_Utilisateur_accepte_refuse_don,
    code_site_beneficiaire_don,
    indicateur_remerciement,
    date_remerciement
) VALUES 
(1, '2023-01-01', 1, 'MAR', NULL, 'ALI', 'AMB', '2023-02-01', '2023-12-31', 'Don de compétences techniques', NULL, 1, 'V', '2023-01-15', 1, 1,'N',NULL),
(2, '2023-02-01', 2, 'FIN', NULL, 'VET', NULL, '2023-03-01', '2023-11-30', 'Don de produits alimentaires', NULL, 2, 'V', '2023-02-15', 2, 2,'O','2023-06-25'),
(3, '2023-03-01', 3, 'RAM', NULL, NULL, NULL, '2023-04-01', '2023-10-31', 'Don de services juridiques', NULL, 3, 'R', '2023-03-15', 3, 3,'N',NULL),
(4, '2023-04-01', 4, 'SIE', NULL, NULL, NULL, '2023-05-01', '2023-09-30', 'Don de matériel informatique', NULL, 4, 'V', '2023-04-15', 4, 4,'O','2023-07-08'),
(5, '2023-05-01', 5, 'SIP', 'MAK', NULL, NULL, '2023-06-01', '2023-08-31', 'Don de vêtements', NULL, 5, 'R', '2023-05-15', 5, 5,'N',NULL);

CREATE TABLE Cerfa (
    numero_Cerfa INT PRIMARY KEY AUTO_INCREMENT,
    code_Don INT,
    montant_HT_Cerfa DECIMAL(10, 2),
    date_realisation_Cerfa DATE,
    date_envoi_Cerfa DATE,
    addresse_Cerfa VARCHAR(255),
    civilite_destinataire_Cerfa CHAR(4),
    nom_destinataire_Cerfa VARCHAR(20),
    prenom_destinataire_Cerfa VARCHAR(20),
    telephone_destinataire_Cerfa VARCHAR(12),
    mail_destinataire_Cerfa VARCHAR(255),
    FOREIGN KEY (code_Don) REFERENCES Dons(code_Don)
);
INSERT INTO Cerfa (
    code_Don,
    montant_HT_Cerfa,
    date_realisation_Cerfa,
    date_envoi_Cerfa,
    addresse_Cerfa,
    civilite_destinataire_Cerfa,
    nom_destinataire_Cerfa,
    prenom_destinataire_Cerfa,
    telephone_destinataire_Cerfa,
    mail_destinataire_Cerfa
) VALUES 
(1, 1500.00, '2023-01-10', '2023-01-15', '123 Main St', 'Mr.', 'Smith', 'John', '1234567890', 'john.smith@example.com'),
(2, 2500.50, '2023-02-20', '2023-02-25', '456 Oak Ave', 'Ms.', 'Johnson', 'Jane', '0987654321', 'jane.johnson@example.com'),
(3, 3200.75, '2023-03-05', '2023-03-10', '789 Pine Ln', 'Dr.', 'Williams', 'Robert', '1122334455', 'robert.williams@example.com'),
(4, 4500.00, '2023-04-15', '2023-04-20', '321 Elm Dr', 'Mrs.', 'Brown', 'Emily', '2233445566', 'emily.brown@example.com'),
(5, 1200.20, '2023-05-25', '2023-05-30', '654 Maple Ct', 'Mr.', 'Davis', 'James', '3344556677', 'james.davis@example.com');

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

CREATE TABLE Reception (
    numero_reception INT PRIMARY KEY,
    code_Don INT,
    numero_livraison INT,
    date_reception DATE,
    heure_reception TIME,
    nombre_palettes_recues INT,
    nombre_palettes_consignees_recues INT,
    nombre_palettes_consignees_rendues INT,
    nombre_cartons_recus INT,
    poids_recu_kg INT,
    produits_sur_palettes VARCHAR(1),
    commentaires VARCHAR(200),
    pieces_associees BLOB,
    FOREIGN KEY (code_Don) REFERENCES Dons(code_Don),
    FOREIGN KEY (numero_livraison) REFERENCES ModalitesLivraison(numero_livraison)
);
INSERT INTO Reception (
    numero_reception,
    code_Don,
    numero_livraison,
    date_reception,
    heure_reception,
    nombre_palettes_recues,
    nombre_palettes_consignees_recues,
    nombre_palettes_consignees_rendues,
    nombre_cartons_recus,
    poids_recu_kg,
    produits_sur_palettes,
    commentaires,
    pieces_associees
) VALUES 
(1, 1, 1, '2023-06-01', '08:00:00', 10, 8, 8, 200, 1000, 'O', 'Réception conforme', NULL),
(2, 2, 2, '2023-06-02', '09:00:00', 12, 10, 10, 250, 1200, 'O', 'Réception conforme', NULL),
(3, 3, 3, '2023-06-03', '10:00:00', 15, 12, 12, 300, 1500, 'O', 'Réception conforme', NULL),
(4, 4, 4, '2023-06-04', '11:00:00', 20, 18, 18, 400, 2000, 'O', 'Réception conforme', NULL),
(5, 5, 5, '2023-06-05', '12:00:00', 25, 20, 20, 500, 2500, 'O', 'Réception conforme', NULL);
