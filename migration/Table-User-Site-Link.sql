CREATE TABLE SitesRattachement (
    code_rattachement INT(11) NOT NULL AUTO_INCREMENT,
    code_utilisateur INT(6) NOT NULL,
    code_site INT(5) NOT NULL,
    code_type_utilisateur CHAR(4) NOT NULL,
    date_fin_activite DATE,
    PRIMARY KEY (code_rattachement),
    FOREIGN KEY (code_utilisateur) REFERENCES Utilisateurs(code_utilisateur),
    FOREIGN KEY (code_site) REFERENCES Sites(code_site),
    FOREIGN KEY (code_type_utilisateur) REFERENCES TypesUtilisateurs(code_type_utilisateur)
);
