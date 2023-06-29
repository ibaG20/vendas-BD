-- cria role admin e user
CREATE ROLE ADM CREATEDB CREATEROLE;
CREATE ROLE USUARIO NOSUPERUSER NOCREATEDB NOCREATEROLE;

-- cria usuario administrador
CREATE USER ADMINISTRADOR WITH PASSWORD 'root';
-- atribui a role admin pra esse usuario
GRANT ADM TO ADMINISTRADOR;
GRANT INSERT, SELECT ON TB_ITENS, TB_VENDAS, TB_PRODUTO, TB_FUNCIONARIOS, TB_FORNECEDORES TO ADM;

-- cria usuario vendedor
CREATE USER VENDEDOR WITH PASSWORD 'root';
-- atribui a role USUARIO pra esse usuario
GRANT USUARIO TO VENDEDOR;
GRANT INSERT, SELECT ON TB_ITENS, TB_VENDAS TO USUARIO;
GRANT SELECT ON TB_PRODUTO TO USUARIO;