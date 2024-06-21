CREATE TABLE Cerfa (
    numero_Cerfa INT PRIMARY KEY AUTO_INCREMENT,
    code_Don INT,
    montant_HT_Cerfa DECIMAL(10, 2),
    date_realisation_Cerfa DATE,
    date_envoi_Cerfa DATE,
    addresse_Cerfa VARCHAR(255),
    civilite_destinataire_Cerfa CHAR(4),
    nom_destinataire_Cerfa VARCHAR(20),
    prenom_destinataire_Cerfa VARCHAR(20),
    telephone_destinataire_Cerfa VARCHAR(12),
    mail_destinataire_Cerfa VARCHAR(255),
    FOREIGN KEY (code_Don) REFERENCES Dons(code_Don)
);
INSERT INTO Cerfa (
    code_Don,
    montant_HT_Cerfa,
    date_realisation_Cerfa,
    date_envoi_Cerfa,
    addresse_Cerfa,
    civilite_destinataire_Cerfa,
    nom_destinataire_Cerfa,
    prenom_destinataire_Cerfa,
    telephone_destinataire_Cerfa,
    mail_destinataire_Cerfa
) VALUES 
(1, 1500.00, '2023-01-10', '2023-01-15', '123 Main St', 'Mr.', 'Smith', 'John', '1234567890', 'john.smith@example.com'),
(2, 2500.50, '2023-02-20', '2023-02-25', '456 Oak Ave', 'Ms.', 'Johnson', 'Jane', '0987654321', 'jane.johnson@example.com'),
(3, 3200.75, '2023-03-05', '2023-03-10', '789 Pine Ln', 'Dr.', 'Williams', 'Robert', '1122334455', 'robert.williams@example.com'),
(4, 4500.00, '2023-04-15', '2023-04-20', '321 Elm Dr', 'Mrs.', 'Brown', 'Emily', '2233445566', 'emily.brown@example.com'),
(5, 1200.20, '2023-05-25', '2023-05-30', '654 Maple Ct', 'Mr.', 'Davis', 'James', '3344556677', 'james.davis@example.com');
