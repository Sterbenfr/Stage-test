CREATE TABLE Societe (
    code_Societe INT PRIMARY KEY AUTO_INCREMENT, -- clé primaire
    raison_sociale VARCHAR(30) NOT NULL,
    nom_commercial VARCHAR(30) DEFAULT raison_sociale,
    Logo BLOB, -- assuming Logo is an image or binary data
    site_Web VARCHAR(255),
    Siren CHAR(9) NOT NULL,
    code_type_activite_Societe CHAR(4),
    commentaires VARCHAR(200),
    code_Groupe_appartenance INT,
    date_arret_activite_Societe DATE,
    FOREIGN KEY (code_type_activite_Societe) REFERENCES TypeActiviteSociete(code);
);
