const express = require("express");
const app = express();
const cors = require("cors");
const { pool } = require("./data-base/data");


app.use(cors());
app.use(express.json());

app.listen(8080, () => {
    console.log("SERVIDOR ATIVO NA PORTA 8080!");

});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      return res.status(200).json({});
    }
    next();
  });

process.on('SIGINT', () => {
    pool.end();
    process.exit();
});


let register = null;

// POST cadastrar usuário

app.post('/cadastrarUsuario', async (req, res) => {
    try {
        register = await pool.connect();
        const { name, email, password } = req.body;
        await register.query(`INSERT INTO Users (id, nome, email, senha) VALUES (uuid_generate_v4(), '${name}', '${email}', '${password}')`);
        res.send("USUÁRIO CADASTRADO COM SUCESSO!");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `ERRO AO CRIAR USUÁRIO: ${error.message}` });
    } finally {
        register.release();
    }
});

// GET buscar todos os usuários

app.get('/buscarUsuarios', async(req, res) => {
    try {
        register = await pool.connect();
        const data = await register.query(`SELECT * FROM Users`);
        res.status(200).send(data.rows);
    } catch (error) { 
        res.status(500).json({ error: `ERRO AO REQUISITAR USUÁRIOS: ${error.message}` });
    }
});

// PUT alterar usuário especificado por id

app.put("/alterarUsuario/:id", async (req, res) => {
    try { 
      const { id } = req.params;
      const { name, email, password } = req.body;
  
      if (!id || !name) {
        return res.status(401).send("PREENCHA CORRETAMENTE OS CAMPOS!");
      }
  
      const client = await pool.connect();
      const user = await client.query("SELECT * FROM users WHERE id=$1", [id]);
      if (user.rows.length === 0) {
        return res.status(401).send("ERRO! USUÁRIO NÃO ENCONTRADO.");
      }
  
      await client.query(
        "UPDATE users SET nome=$1, email=$2, senha=$3 WHERE id=$4",
        [name, email, password, id]
      );

      res.status(200).send({
        msg: "USUÁRIO ATUALIZADO COM SUCESSO!",
        result: {
          id,
          name,
          email,
          password,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `ERRO AO ATUALIZAR USUÁRIO: ${error.message}` });
    }
  });

// DELETE excluir usuário especificado por id

app.delete("/excluirUsuario/:id", async(req, res) =>{
    try{
       const { id } = req.params;
       if(!id){
        return res.status(401).send("ERRO! ID NÃO ENCONTRADO.");
       }
       const client = await pool.connect();
       const del = await client.query("DELETE FROM Users WHERE id=$1", [id]);
    
    if(del.rowCount===1){
        return res.status(200).send(`O USUÁRIO "${name}" FOI DELETADO COM SUCESSO!`);
    }
    else{
        return res.status(401("ERRO! USUÁRIO NÃO ENCONTRADO."));
    }
    }catch(error){
        console.error("error");
        res.status(500).json({ error: `ERRO AO DELETAR USUÁRIO: ${error.message}` });
    }
  });
