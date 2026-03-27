<template>
  <div class="language-switch">
    <button 
      @click="toggleLanguage" 
      :style="{ border: '1px solid rgba(255, 255, 255, 0.3)' }"
    >
      {{ isEnglish ? '繁中' : 'EN' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitch',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isEnglish: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  methods: {
    toggleLanguage() {
      this.isEnglish = !this.isEnglish;
    },
  },
};
</script>

<style lang="scss" scoped>
.language-switch {
  position: fixed;
  right: 8%;
  top: 1.2rem;
  z-index: 9999;
}

.language-switch button {
  background-color: transparent;
  color: rgb(255, 255, 255);
  padding: 15px;
  width: 8rem;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-switch button:hover {
  transform: translateY(-2px);
  text-shadow: 0 0 10px rgba(74, 158, 255, 0.5);
  box-shadow: 0 0 10px rgba(74, 158, 255, 0.3);
  background-color: rgba(74, 158, 255, 0.1);
}

@media only screen and (max-width: 1200px) {
  .language-switch {
    right: 1%;
    top: 5rem;
  }
}

@media only screen and (max-width: 992px) {
  .language-switch {
    right: 5%;
    top: 5rem;
  }
}

@media only screen and (max-width: 768px) {
  .language-switch {
    // top: auto;
    // bottom: 2.5rem;
    top: 10%;
    right:2rem;
  }
}

@media only screen and (max-width: 480px) {
  .language-switch {
    bottom: 1.5rem;
    right: 1.5rem;
  }
}
</style>



