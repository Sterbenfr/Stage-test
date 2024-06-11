CREATE TABLE SuiviGroupe (
    code_Groupe INT,
    code_type_de_Site VARCHAR(4) NOT NULL,
    code_site_suivi INT NOT NULL,
    code_utilisateur_suivant INT,
    PRIMARY KEY (code_Groupe, code_type_de_Site),
    FOREIGN KEY (code_Groupe) REFERENCES Groupe(code_Groupe),
    FOREIGN KEY (code_type_de_Site) REFERENCES TypeSite(code_type_de_Site),
    FOREIGN KEY (code_site_suivi) REFERENCES Site(code_site),
    FOREIGN KEY (code_utilisateur_suivant) REFERENCES Utilisateur(code_utilisateur)
);
