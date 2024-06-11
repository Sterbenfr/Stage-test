CREATE TABLE Cerfa (
    numero_Cerfa INT PRIMARY KEY,
    code_Don INT,
    montant_HT_Cerfa DECIMAL(10, 2),
    date_realisation_Cerfa DATE,
    date_envoi_Cerfa DATE,
    FOREIGN KEY (code_Don) REFERENCES Dons(code_Don)
);
