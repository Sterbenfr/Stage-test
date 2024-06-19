CREATE TABLE Utilisateurs (
    code_utilisateur INT(6) NOT NULL AUTO_INCREMENT,
    civilite CHAR(3) NOT NULL,
    nom VARCHAR(20) NOT NULL,
    prenom VARCHAR(20) NOT NULL,
    tel_perso VARCHAR(12),
    mail_restos_du_coeur VARCHAR(50),
    commentaires VARCHAR(200),
    PRIMARY KEY (code_utilisateur)
);
INSERT INTO Utilisateurs (civilite, nom, prenom, tel_perso, mail_restos_du_coeur, commentaires) VALUES
('Mr.', 'Dupont', 'Jean', '0123456789', 'jean.dupont@restosducoeur.org', 'Nouveau bénévole.'),
('Mme', 'Martin', 'Marie', '0987654321', 'marie.martin@restosducoeur.org', 'Responsable de secteur.'),
('Mr.', 'Durand', 'Paul', '0123987654', 'paul.durand@restosducoeur.org', 'Volontaire depuis 2 ans.'),
('Mme', 'Petit', 'Sophie', '0765432109', 'sophie.petit@restosducoeur.org', 'Coordination des événements.'),
('M.', 'Leroy', 'Julien', '0654321987', 'julien.leroy@restosducoeur.org', 'Gestion des stocks.');

SELECT * FROM Utilisateurs;