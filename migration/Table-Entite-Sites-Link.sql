CREATE TABLE ContactEntite (
    code_entite INT(7) NOT NULL,
    code_type_site CHAR(4) NOT NULL,
    code_site_suivi INT(5) NOT NULL,
    code_utilisateur_suivant INT(6),
    PRIMARY KEY (code_entite, code_site, code_type_site),
    FOREIGN KEY (code_entite) REFERENCES Entite(code_entite),
    FOREIGN KEY (code_type_site) REFERENCES TypesEntites(code_type_entite),
    FOREIGN KEY (code_site_suivi) REFERENCES Sites(code_site),
    FOREIGN KEY (code_utilisateur_suivant) REFERENCES Utilisateurs(code_utilisateur)
);
