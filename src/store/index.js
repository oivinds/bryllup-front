import Vue from "vue";
import Vuex from "vuex";
import todos from "./todos.json";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: todos,
    userData: {
      name: "Kari",
      weddingDate: "",
    },
    editBool: false,
    newBool: false,
  },
  mutations: {
    setWeddingDate(state, date) {
      console.log(date);
      state.userData.weddingDate = date;
    },
    setEditBool(state, bool) {
      state.editBool = bool;
    },
    setNewBool(state, bool) {
      state.newBool = bool;
    },
    newTodo(state, todo) {
      state.todos = [todo, ...state.todos];
    },
    editTodo(state, todo) {
      const index = state.todos.findIndex((o) => o.id === todo.id);
      Vue.set(state.todos, index, todo);
    },
    // ?
    deleteTodo(state, todos) {
      state.todos = [...todos];
    },
  },
  actions: {
    setWeddingDate({ commit }, date) {
      commit("setWeddingDate", date);
    },
    deleteAction({ commit, getters }, todo) {
      const todos = getters.todos.filter((e) => e !== todo);
      commit("deleteTodo", todos);
    },

    newAction({ commit, getters }, task) {
      const ids = getters.todos.map((o) => o.id);
      const findMaxId = (acc, o) => Math.max(acc, o);
      const id = ids.reduce(findMaxId, 0) + 1;

      const created = new Date().toISOString();
      const newTask = { ...task, id, created, isCompleted: false };
      commit("newTodo", newTask);
      commit("setNewBool", false);
    },
    editAction({ commit }, task) {
      commit("editTodo", task);
      commit("setEditBool", false);
    },
  },
  getters: {
    todos(state) {
      /* // mmove uncompleted to bottom ..
      const completed = state.todos.filter((todo) => todo.isCompleted === true);
      const unCompleted = state.todos.filter(
        (todo) => todo.isCompleted === false
      );
      return [...unCompleted, ...completed]; */
      return state.todos;
    },
    low(state) {
      const group = state.todos.filter((todo) => todo.group === "low");
      return [...group];
    },
    medium(state) {
      const group = state.todos.filter((todo) => todo.group === "medium");
      return [...group];
    },
    high(state) {
      const group = state.todos.filter((todo) => todo.group === "high");
      return [...group];
    },
    todosDone(state) {
      const reduce = (ac, item) => ac + (item.isCompleted ? 1 : 0);
      const length = state.todos.reduce(reduce, 0);
      return length;
    },
  },
});
