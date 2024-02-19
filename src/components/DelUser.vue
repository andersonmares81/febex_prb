<template>
    <div class="container" >
      <h1>Eliminar Usuario</h1>
      <Clock />
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
      </svg>
      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
        <div>
          <form @submit.prevent="eliminarUsuario">
            <input type="number" class="form-control" v-model="usuarioEditado.CODUSUARIO" readonly>
            ¿Estás seguro de que deseas eliminar a <span v-text="usuarioEditado.NOMUSUARIO"></span>?
            <button @click="eliminarUsuario(user.CODUSUARIO)" class="btn btn-danger">Eliminar Usuario </button>
          </form>
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios';
import Clock from './RelojView.vue';

export default {
  props: ['userId'],
  components: {
    Clock
  },
  data() {
    console.log('ID User to Del: ' + this.userId);
    return {
      usuarioEditado: {
        NOMUSUARIO: '',
        CODUSUARIO: ''
      }
    };
  },
  methods: {
    cargarDatosUsuario() {
      axios.get(this.$api_web_url+`/${this.$route.params.userId}`)
        .then(response => {
          this.usuarioEditado = response.data.data;
          console.log('Usuario encontrado:', response);
        })
        .catch(error => {
          console.error('DU - Error al cargar datos del usuario: ', error);
        });
    },

    eliminarUsuario() {
      if (confirm('Se eliminara el usuario ' + this.usuarioEditado.NOMUSUARIO)) {
        axios.get(`${this.$api_web_url}/delete/${this.$route.params.userId}`, this.usuarioEditado)
          .then(response => {
            console.log('Usuario eliminado:', response);
            // Redirigir al usuario a la página de listado de usuarios
            this.$router.push({ name: 'ViewUser' });
          })
          .catch(error => {
            console.error('Error al eliminar usuario:', error);
          });
      }
    }
  },
  created() {
    console.log('Cod del usuario:', this.$route.params.userId);
    this.cargarDatosUsuario();
    
  }
};
</script>
