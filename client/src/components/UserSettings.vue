<template>
  <div class="container">

     <h2>REGISTRO DE USUÁRIO</h2>

     <form @submit.prevent="registrarUsuario" class="form">

       <label for="name">NOME:</label>
       <input type="text" id="name" v-model="name" required>

       <label for="email">E-MAIL:</label>
       <input type="email" id="email" v-model="email" required>

       <label for="password">SENHA:</label>
       <input type="password" id="password" v-model="password" required>
       
       <button type="submit">CADASTRAR</button>

     </form>

     <h2>LISTA DE USUÁRIOS</h2>

     <ul class="user-list">

       <li v-for="user in users" :key="user.id" class="user-item">
         {{ user.nome }} - {{ user.email }}
         <button @click="alterarUsuario(user)" class="btn-edit">EDITAR</button>
         <button @click="excluirUsuario(user.id)" class="btn-delete">EXCLUIR</button>
       </li>

     </ul>

   </div> 
</template> 

<script>
export default {
  name: 'UserSettings',

  data() {
    return {
      name: '',
      email: '',
      password: '',
      users: []
    };
  },

  methods: {
    async registrarUsuario() {
      try {
        const response = await fetch('http://localhost:8080/cadastrarUsuario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          })
        });
        
        if (response.ok) {
          alert('USUÁRIO CADASTRADO COM SUCESSO!');
          this.name = '';
          this.email = '';
          this.password = '';
          this.buscarUsuarios();
        } else {
          alert({ error: `ERRO AO CRIAR USUÁRIO: ${error.message}` });
        }
      } catch (error) {
        console.error(error);
        alert({ error: `ERRO AO CRIAR USUÁRIO: ${error.message}` });
      }
    },


    async buscarUsuarios() {
      try {
        const response = await fetch('http://localhost:8080/buscarUsuarios');
        
        if (response.ok) {
          this.users = await response.json();
        } else {
          alert({ error: `ERRO AO REQUISITAR USUÁRIOS: ${error.message}` });
        }
      } catch (error) {
        console.error(error);
        alert({ error: `ERRO AO REQUISITAR USUÁRIOS: ${error.message}` });
      }
    },


    async alterarUsuario(user) {
      const newName = prompt('DIGITE UM NOVO NOME:', user.name);
      const newEmail = prompt('DIGITE UM NOVO E-MAIL:', user.email);
      const newPassword = prompt('DIGITE UMA NOVA SENHA:',user.password)
      
      if (newName) {
        try {
          const response = await fetch(`http://localhost:8080/alterarUsuario/${user.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: newName,
              email: newEmail,
              password: newPassword
            })
          });
          
          if (response.ok) {
            alert('USUÁRIO ATUALIZADO COM SUCESSO!');
            this.buscarUsuarios();
          } else {
            alert({ error: `ERRO AO ATUALIZAR USUÁRIO: ${error.message}` });
          }
        } catch (error) {
          console.error(error);
          alert({ error: `ERRO AO ATUALIZAR USUÁRIO: ${error.message}` });
        }
      }
    },


    async excluirUsuario(userId) {

      const confirmDelete = confirm('VOCÊ TEM CERTEZA QUE DESEJA EXCLUIR ESTE USUÁRIO?');
      
      if (confirmDelete) {
        try {
          const response = await fetch(`http://localhost:8080/excluirUsuario/${userId}`, {
            method: 'DELETE'
          });
          
          if (response.ok) {
            alert(`O USUÁRIO FOI DELETADO COM SUCESSO!`);
            this.buscarUsuarios();
          } else {
            alert({ error: `ERRO AO DELETAR USUÁRIO: ${error.message}` });
          }
        } catch (error) {
          console.error(error);
          alert({ error: `ERRO AO DELETAR USUÁRIO: ${error.message}` });
        }
      }
    }
  },

  
  mounted() {
    this.buscarUsuarios();
  }
};
</script>