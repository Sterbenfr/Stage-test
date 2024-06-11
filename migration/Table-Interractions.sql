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
    FOREIGN KEY (code_Utilisateur_Prospecteur) REFERENCES Utilisateur(code_utilisateur),
    FOREIGN KEY (code_Entite_Prospectee) REFERENCES Entite(code_Entite),
    FOREIGN KEY (code_type_interaction) REFERENCES TypeInteractions(code_type_interaction),
    FOREIGN KEY (code_modalite_interaction) REFERENCES ModaliteInteractions(code_modalite_interaction),
    FOREIGN KEY (code_contact_entite) REFERENCES ContactEntite(code_contact_entite)
);
