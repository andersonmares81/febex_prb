<template>
  <div class="container">
    <h1>Crear Usuario <Clock /></h1>
    <form @submit.prevent="guardarUsuario">
      <div class="row grid grid-cols-6 gap-4 align-items-center">
        <div class="col col-lg-1">&nbsp;</div>
          <div class="col col-lg-2">
            <label for="inputAVATAR" class="col-form-label">AVATAR: </label>
            <input type="text" class="form-control" v-model="usuarioEditado.AVATAR">
          </div>
        <div class="col col-lg-2">
          <label for="inputCODUSUARIO" class="col-form-label">CODUSUARIO:</label>
          <input type="number" class="form-control" v-model="usuarioEditado.CODUSUARIO" >
        </div>
        <div class="col col-lg-2">
          <label for="inputNITUSUARIO" class="col-form-label">NITUSUARIO:</label>
          <input type="number" class="form-control" v-model="usuarioEditado.NITUSUARIO">
        </div>
        <div class="col col-lg-3">
          <label for="inputNOMUSUARIO" class="col-form-label">NOMUSUARIO:</label>
          <input type="text" class="form-control" v-model="usuarioEditado.NOMUSUARIO">
        </div>
        <div class="col col-lg-1">&nbsp;</div>
      </div>
      <div class="row grid grid-cols-6 gap-4 align-items-center">
        <div class="col col-lg-1">&nbsp;</div>
          <div class="col col-lg-2">
            <label for="inputESTADOUSUARIO" class="col-form-label">ESTADOUSUARIO: </label>
            <select v-model="usuarioEditado.ESTADOUSUARIO" class="form-control" >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div class="col col-lg-2">
            <label for="inputCODEMPRESA" class="col-form-label">CODEMPRESA: </label>
            <input type="text" class="form-control" v-model="usuarioEditado.CODEMPRESA">
          </div>
          <div class="col col-lg-2">
            <label for="inputnumcelular" class="col-form-label">numcelular: </label>
            <input type="tel" class="form-control" v-model="usuarioEditado.numcelular">
          </div>
          <div class="col col-lg-3">
            <label for="inputPassword6" class="col-form-label">CLAVEUSUARIO: </label>
            <input type="password" class="form-control" v-model="usuarioEditado.CLAVEUSUARIO">
          </div>
        <div class="col col-lg-1">&nbsp;</div>
      </div>

      <div class="row grid grid-cols-6 gap-4 align-items-center">
        <div class="col col-lg-1">&nbsp;</div>
          <div class="col col-lg-2">
            <label for="inputFECGRA" class="col-form-label">FECGRA: </label>
            <input type="datetime-local" class="form-control" v-model="usuarioEditado.FECGRA">
          </div>
          <div class="col col-lg-2">
            <label for="inputFECNAC" class="col-form-label">FECNAC: </label>
            <input type="date" class="form-control" v-model="usuarioEditado.FECNAC">
          </div>
          <div class="col col-lg-2">
            <label for="inputEMAIL" class="col-form-label">EMAIL: </label>
            <input type="email" class="form-control" v-model="usuarioEditado.EMAIL">
          </div>
          <div class="col col-lg-2">
            <label for="inputSEXO" class="col-form-label">SEXO: </label><br/>
            <select v-model="usuarioEditado.SEXO" class="form-control" >
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </select>
          </div>
        <div class="col col-lg-1">&nbsp;</div>
      </div>

      <div class="row grid grid-cols-6 gap-4 align-items-center">
        <div class="col col-lg-4">&nbsp;</div>
          <div class="col col-lg-2">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        <div class="col col-lg-4">&nbsp;</div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Clock from './RelojView.vue';

export default {
  components: {
    Clock
  },
  data() {
    return {
      usuarioEditado: {
        NOMUSUARIO: 'NOMBRES',
        NITUSUARIO: '0123456789',
        CODUSUARIO: '0123456789',
        CLAVEUSUARIO: 'PASSWORD',
        ESTADOUSUARIO: 'A',
        CODEMPRESA: '###',
        FECGRA: '',
        EMAIL: '@',
        FECNAC: '',
        SEXO: 'Femenino',
        AVATAR: '0',
        numcelular: '(###) ### ## ##'
      }
    };
  },
  methods: {
    guardarUsuario() {
      axios.post(this.$api_web_url+`/create`, this.usuarioEditado)
        .then(response => {
          console.log('Usuario creado:', response.data);
          this.$router.push({ name: 'ViewUser' }); 
        })
        .catch(error => {
          console.error('Error al actualizar usuario:', error);
        });
    }
  },
  created() {
    this.cargarDatosUsuario();
    
    console.log('ID del usuario:', this.userId);
  }
};
</script>
