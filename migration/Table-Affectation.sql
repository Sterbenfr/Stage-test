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
