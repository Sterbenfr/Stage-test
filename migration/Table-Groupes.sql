CREATE TABLE Groupe (
    code_Groupe INT PRIMARY KEY, -- clé primaire
    nom_du_Groupe VARCHAR(255) NOT NULL,
    Logo BLOB, -- assuming Logo is an image or binary data
    site_Web VARCHAR(255),
    commentaires VARCHAR(200),
    date_arret_activite_du_Groupe DATE
);
