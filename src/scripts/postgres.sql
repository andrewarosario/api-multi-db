
DROP TABLE IF EXISTS tb_herois;
CREATE TABLE tb_herois (
    id int generated always as identity primary key not null,
    nome text not null,
    poder text not null
)

--CREATE
INSERT INTO tb_herois (nome, poder)
VALUES
    ('Flash', 'Velocidade'),
    ('Aquaman', 'Falar com os animais'),
    ('Batman', 'Dinheiro');

--READ
SELECT * FROM tb_herois;

--UPDATE
UPDATE tb_herois 
SET nome='Goku', poder='Deus'
WHERE id = 1;

--DELETE
DELETE tb_herois WHERE id = 2;