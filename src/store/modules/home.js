import { defineStore } from 'pinia';

export const useHomeStore = defineStore('home', {
  state: () => {
    return {
      title: 'Pinia',
      count: 0
    };
  },
  getters: {
    getFuncTitle() {
      return `${this.title}`;
    }
  },
  actions: {
    increment() {
      this.count++;
    },
    async incrementPromise() {
      try {
        const result = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(10);
          }, 2000);
        });
        this.count += result;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
