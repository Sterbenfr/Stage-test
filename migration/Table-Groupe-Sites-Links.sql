CREATE TABLE SuiviGroupe (
    code_Groupe INT,
    code_type_de_Site VARCHAR(4) NOT NULL,
    code_site_suivi INT NOT NULL,
    code_utilisateur_suivant INT,
    PRIMARY KEY (code_Groupe, code_type_de_Site),
    FOREIGN KEY (code_Groupe) REFERENCES Groupe(code_Groupe),
    FOREIGN KEY (code_type_de_Site) REFERENCES SiteTypes(code_type_de_Site),
    FOREIGN KEY (code_site_suivi) REFERENCES Sites(code_site),
    FOREIGN KEY (code_utilisateur_suivant) REFERENCES Utilisateurs(code_utilisateur)
);
INSERT INTO SuiviGroupe (
    code_Groupe,
    code_type_de_Site,
    code_site_suivi,
    code_utilisateur_suivant
) VALUES 
(1, 'ST01', 501, 301),
(2, 'ST02', 502, 302),
(3, 'ST03', 503, 303),
(4, 'ST04', 504, 304),
(5, 'ST05', 505, 305);
