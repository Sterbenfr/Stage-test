CREATE TABLE Cerfa (
    numero_Cerfa INT PRIMARY KEY,
    code_Don INT,
    montant_HT_Cerfa DECIMAL(10, 2),
    date_realisation_Cerfa DATE,
    date_envoi_Cerfa DATE,
    FOREIGN KEY (code_Don) REFERENCES Dons(code_Don)
);
INSERT INTO Cerfa (
    numero_Cerfa,
    code_Don,
    montant_HT_Cerfa,
    date_realisation_Cerfa,
    date_envoi_Cerfa
) VALUES 
(1, 101, 1500.00, '2023-01-10', '2023-01-15'),
(2, 102, 2500.50, '2023-02-20', '2023-02-25'),
(3, 103, 3200.75, '2023-03-05', '2023-03-10'),
(4, 104, 4500.00, '2023-04-15', '2023-04-20'),
(5, 105, 1200.20, '2023-05-25', '2023-05-30');