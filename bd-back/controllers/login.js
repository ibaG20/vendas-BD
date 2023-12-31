/* 

import { db } from "../db.js";
import pkg from 'pg';
import jwt from 'jsonwebtoken';
const { Client } = pkg;

export const postLogin = async (req, res) => {
    // Conecta com o usuário e senha fornecidos
    const client = new Client({
        ...db,
        user: req.body.username,
        password: req.body.password,
    });

    try {
        await client.connect(); // Tenta conectar

        //---------------------------autenticação bem-sucedida--------------------------------
        const token = jwt.sign(
            { username: req.body.username, role: 'admin' },  // payload
            'your-secret-key',                               // secret key
            { expiresIn: '1h' }                              // options
        );
        //--------------------------------------------------------------------------------
        
        // Se a conexão for bem sucedida, as credenciais estão corretas
        res.status(200).json({ message: "Login bem sucedido", token });
    } catch (err) {
        // Se a conexão falhar, as credenciais estão erradas
        console.log(err.message);
        res.status(401).json({ message: "Login falhou" });
    } finally {
        await client.end(); // Encerra a conexão
    }
}; 
 */
//--------------------------------------------------------------------

import pkg from 'pg';
import jwt from 'jsonwebtoken';
const { Client } = pkg;

export const postLogin = async (req, res) => {
    // Conecta com o usuário e senha fornecidos
    const client = new Client({
        host: "localhost",
        database: "postgres",
        user: req.body.username,
        password: req.body.password,
    });

    try {
        await client.connect(); // Tenta conectar
        let roledb;
        if(req.body.username === 'vendedor'){
            roledb = 'admin';
        } else if(req.body.username === 'administrador'){
            roledb = 'user';
        } else {
            return res.status(401).json({ message: "Role inválido" });
        }
        console.log(roledb);
        //---------------------------autenticação bem-sucedida--------------------------------
        const token = jwt.sign(
            { username: req.body.username, role: roledb },  // payload
            'your-secret-key',                               // secret key
            { expiresIn: '400h' }                              // options
        );
        //--------------------------------------------------------------------------------
        
        // Se a conexão for bem sucedida, as credenciais estão corretas
        res.status(200).json({ message: "Login bem sucedido", token });
    } catch (err) {
        // Se a conexão falhar, as credenciais estão erradas
        console.log(err.message);
        res.status(401).json({ message: "Login falhou" });
    } finally {
        await client.end(); // Encerra a conexão
    }
}; 

