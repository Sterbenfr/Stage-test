CREATE TABLE Interactions (
    code_Utilisateur_Prospecteur INT,
    code_Entite_Prospectee INT,
    date_interaction DATE,
    code_type_interaction CHAR(4),
    code_modalite_interaction CHAR(4),
    code_contact_entite INT,
    commentaires VARCHAR(200),
    pieces_associees BLOB, -- Assuming pieces_associees is for storing PDF files or similar
    date_relance DATE,
    PRIMARY KEY (code_Utilisateur_Prospecteur, code_Entite_Prospectee, date_interaction),
    FOREIGN KEY (code_Utilisateur_Prospecteur) REFERENCES Utilisateurs(code_utilisateur),
    FOREIGN KEY (code_Entite_Prospectee) REFERENCES Entite(code_Entite),
    FOREIGN KEY (code_type_interaction) REFERENCES TypeInteractions(code_type_interaction),
    FOREIGN KEY (code_modalite_interaction) REFERENCES ModaliteInteractions(code_modalite_interaction),
    FOREIGN KEY (code_contact_entite) REFERENCES ContactEntite(code_utilisateur_suivant)
);
INSERT INTO Interactions (
    code_Utilisateur_Prospecteur,
    code_Entite_Prospectee,
    date_interaction,
    code_type_interaction,
    code_modalite_interaction,
    code_contact_entite,
    commentaires,
    pieces_associees,
    date_relance
) VALUES 
(301, 101, '2023-06-01', 'PRE', 'TEL', 201, 'Première interaction avec l\'entité 101', NULL, '2023-06-15'),
(302, 102, '2023-06-02', 'PRE', 'TEL', 202, 'Deuxième interaction avec l\'entité 102', NULL, '2023-06-16'),
(303, 103, '2023-06-03', 'REL', 'SMS', 203, 'Troisième interaction avec l\'entité 103', NULL, '2023-06-17'),
(304, 104, '2023-06-04', 'PRE', 'MAI', 204, 'Quatrième interaction avec l\'entité 104', NULL, '2023-06-18');
