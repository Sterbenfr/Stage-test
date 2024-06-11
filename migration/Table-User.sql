CREATE TABLE Utilisateurs (
    code_utilisateur INT(6) NOT NULL AUTO_INCREMENT,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    tel_perso VARCHAR(15),
    tel_restos_du_coeur VARCHAR(15),
    mail_perso VARCHAR(50),
    mail_restos_du_coeur VARCHAR(50),
    commentaires VARCHAR(200),
    PRIMARY KEY (code_utilisateur)
);
