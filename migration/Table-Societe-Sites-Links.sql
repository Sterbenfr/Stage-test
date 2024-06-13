CREATE TABLE SuiviSociete (
    code_Societe INT,
    code_type_de_Site VARCHAR(4) NOT NULL,
    code_site_suivi INT NOT NULL,
    code_utilisateur_suivant INT,
    PRIMARY KEY (code_Societe, code_type_de_Site),
    FOREIGN KEY (code_Societe) REFERENCES Societe(code_Societe),
    FOREIGN KEY (code_type_de_Site) REFERENCES SiteTypes(code_type_Site),
    FOREIGN KEY (code_site_suivi) REFERENCES Sites(code_site),
    FOREIGN KEY (code_utilisateur_suivant) REFERENCES Utilisateurs(code_utilisateur)
);
INSERT INTO SuiviSociete (
    code_Societe,
    code_type_de_Site,
    code_site_suivi,
    code_utilisateur_suivant
) VALUES 
(61, 'AN', 1, 1),
(62, 'DR', 2, 2),
(63, 'AD', 3, 3),
(64, 'CD', 4, 4),
(65, 'EO', 5, 5);
