CREATE TABLE Contacts (
    code_entite INT(7) NOT NULL,
    code_contact INT(3) NOT NULL AUTO_INCREMENT,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    photo BLOB,
    fonction VARCHAR(30),
    service VARCHAR(30),
    numeros_telephone TEXT,
    adresses_mail TEXT,
    commentaires VARCHAR(200),
    date_arret_contact DATE,
    PRIMARY KEY (code_contact),
    FOREIGN KEY (code_entite) REFERENCES Entites(code_entite)
);