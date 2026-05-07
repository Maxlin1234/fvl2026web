<template>
  <div class="language-switch">
    <button type="button" class="language-switch__btn" @click="toggleLanguage">
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

/* 與首頁 Hero 四角 EN／中文按鈕一致：黑色圓形 */
.language-switch__btn {
  box-sizing: border-box;
  width: 6.5em;
  height: 6.5em;
  min-width: 3.25rem;
  min-height: 3.25rem;
  max-width: 5.5rem;
  max-height: 5.5rem;
  padding: 0.35em;
  margin: 0;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: #000;
  color: #fff;
  font-size: clamp(14px, 1.05vw, 18px);
  font-weight: 700;
  line-height: 1.15;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.language-switch__btn:hover {
  transform: scale(1.1) rotate(5deg);
  background: rgba(255, 255, 255, 0.95);
  color: #000;
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



