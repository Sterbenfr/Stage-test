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
(1, 'AN', 501, 301),
(2, 'AD', 502, 302),
(3, 'CD', 503, 303),
(4, 'DR', 504, 304),
(5, 'EO', 505, 305);
