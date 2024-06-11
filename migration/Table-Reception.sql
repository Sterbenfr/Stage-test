CREATE TABLE Reception (
    numero_reception INT PRIMARY KEY,
    code_Don INT,
    numero_BL INT,
    date_reception DATE,
    heure_reception TIME,
    nombre_palettes_recues INT,
    nombre_palettes_consignees_recues INT,
    nombre_palettes_consignees_rendues INT,
    nombre_cartons_recus INT,
    poids_recu_kg INT,
    produits_sur_palettes VARCHAR(1),
    commentaires VARCHAR(200),
    pieces_associees BLOB,
    FOREIGN KEY (code_Don) REFERENCES Dons(code_Don),
    FOREIGN KEY (numero_BL) REFERENCES BonLivraison(numero_BL)
);
