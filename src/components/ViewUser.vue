<template>
  <div class="container">
    <h1>Lista de Usuarios <Clock /></h1>

    <!-- Filtros -->
    <div class="filters">
      <label for="search">Buscar:</label>
      <input type="text" id="search" v-model="searchQuery">

      <label for="status">Estado:</label>
      <select id="status" v-model="selectedStatus">
        <option value="">Todos</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
    </div>

    <!-- Tabla de Usuarios -->
    <table v-if="paginatedFilteredUsers.length > 0" class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOMUSUARIO</th>
          <th>NITUSUARIO</th>
          <th>CODUSUARIO</th>
          <th>ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedFilteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.NOMUSUARIO }}</td>
          <td>{{ user.NITUSUARIO }}</td>
          <td>{{ user.CODUSUARIO }}</td>
          <td>
            <button @click="redirectEditarUsuario(user.CODUSUARIO)" type="button" class="btn btn-primary">Editar</button>
            <button @click="redirectBorrarUsuario(user.CODUSUARIO)" type="button" class="btn btn-danger">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- Mensaje si no hay usuarios filtrados -->
    <p v-else>No se encontraron usuarios.</p>

    <!-- Componente de paginación -->
    <paginate
      v-if="paginatedFilteredUsers.length > 0"
      :page-count="pageCount"
      :click-handler="changePage"
      :prev-text="'Anterior'"
      :next-text="'Siguiente'"
      :page-range="3" 
      :container-class="'pagination'" 
    >
    </paginate>
  </div>
</template>

<script>
import axios from 'axios';
import Clock from './RelojView.vue';
import Paginate from 'vuejs-paginate';

export default {
  components: {
    Clock,
    Paginate
  },
  data() {
    return {
      currentPage: 1, // Página actual
      itemsPerPage: 10, // Número de elementos por página
      users: [],
      searchQuery: '',
      selectedStatus: '',
      sortByKey: '', // Clave de ordenamiento
      sortDirection: 'asc' // Dirección de ordenamiento: 'asc' o 'desc'
    };
  },
  mounted() {
    axios.get(this.$api_web_url)
      .then(response => {
        this.users = response.data.data;
      })
      .catch(error => {
        console.error('Error al cargar usuarios:', error);
      });
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        const searchMatches = user.NOMUSUARIO.toLowerCase().includes(this.searchQuery.toLowerCase());
        const statusMatches = !this.selectedStatus || user.ESTADOUSUARIO === this.selectedStatus;
        return searchMatches && statusMatches;
      });
    },
    sortedFilteredUsers() {
      if (this.sortByKey) {
        return this.filteredUsers.slice().sort((a, b) => {
          const aValue = a[this.sortByKey];
          const bValue = b[this.sortByKey];
          if (this.sortDirection === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        });
      } else {
        return this.filteredUsers;
      }
    },
    pageCount() {
      return Math.ceil(this.sortedFilteredUsers.length / this.itemsPerPage);
    },
    paginatedFilteredUsers() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.sortedFilteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
    }
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    redirectEditarUsuario(id) {
      this.$router.push({ name: 'edit-user', params: { userId: id } });
    },
    redirectDeleteUsuario(userCod) {
      this.$router.push({ name: 'DeleteUser', params: { userCod: userCod } });
    },
    redirectBorrarUsuario(id) {
      this.$router.push({ name: 'delUser', params: { userId: id } });
    },
    sortBy(key) {
      if (key === this.sortByKey) {
        // Cambiar la dirección de ordenamiento si se hace clic en la misma clave de ordenamiento
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // Cambiar la clave de ordenamiento y establecer la dirección predeterminada como ascendente
        this.sortByKey = key;
        this.sortDirection = 'asc';
      }
    }
  }
};
</script>

<style scoped>
/* Estilos opcionales */
.filters {
  margin-bottom: 20px;
  background-color: lightskyblue;
}
th {
  cursor: pointer; 

}
.pagination{
  background-color: green;
}
</style>
