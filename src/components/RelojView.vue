<template>
  <div>
    <p>{{ currentTime }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: ''
    };
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000); // Actualizar cada segundo
  },
  methods: {
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }
  }
};
</script>

