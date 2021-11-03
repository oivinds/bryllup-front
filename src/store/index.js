import Vue from "vue";
import Vuex from "vuex";
import todos from "./todos.json";
Vue.use(Vuex);
import moment from "moment";
moment.locale("nb");
Object.defineProperty(Vue.prototype, "$moment", { value: moment });

export default new Vuex.Store({
  state: {
    todos: todos,
    name: "Kari",
    timeBeforeWedding: null,
    editBool: false,
    newBool: false,
  },
  mutations: {
    setTimeBeforeWedding(state, time) {
      state.timeBeforeWedding = time;

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
    setTimeBeforeWedding({ commit }, date) {
      const now = moment();
      const then = moment(date);
      const year = then.diff(now, 'year');
      then.subtract(year, 'year')
      const months = then.diff(now, 'month');
      then.subtract(months, 'month')
      const days = then.diff(now, 'days');
      const yearText = year !== 0 ? `${year} år,` : '';
      const monthText = months !== 0 ? `${months} måneder,` : '';
      const daysText = days !== 0 ? `${days} dager` : '';
      const timeBeforeWedding = `${yearText} ${monthText} ${daysText}`;

      commit("setTimeBeforeWedding", timeBeforeWedding);
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
