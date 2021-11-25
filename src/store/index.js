import Vue from "vue";
import Vuex from "vuex";
import todos1 from "./todos/todos-1.json";
import todos2 from "./todos/todos-2.json";
import todos3 from "./todos/todos-3.json";
import todos4 from "./todos/todos-4.json";
import todos5 from "./todos/todos-5.json";
import todos6 from "./todos/todos-6.json";
import todos7 from "./todos/todos-7.json";
import todos8 from "./todos/todos-8.json";
import todos9 from "./todos/todos-9.json";
import todos10 from "./todos/todos-10.json";
import todos11 from "./todos/todos-11.json";

const all = [
	...todos1,
	...todos2,
	...todos3,
	...todos4,
	...todos5,
	...todos6,
	...todos7,
	...todos8,
	...todos9,
	...todos10,
	...todos11,
];
all.map((o, i) => {
	return Object.assign(o, { id: i });
});

Vue.use(Vuex);
import moment from "moment";
moment.locale("nb");
Object.defineProperty(Vue.prototype, "$moment", { value: moment });

const store = new Vuex.Store({
	state: {
		todos: [...all],
		name: "Kari",
		owner: null,
		partner: null,
		weddingDate: moment().add(1, "year").toISOString().substring(0, 10),
		timeBeforeWedding: null, //moment().add(1, "year").toISOString().substring(0, 10),
		editBool: false,
		newBool: false,
		delegates: [],
		duration: null,
		groupTitles: [],
		categories: [
			"Praktisk",
			"Festen",
			"Dekorasjon",
			"Antrekk  og tilbehør",
			"Gaver",
			"Bryllupsreise",
			"Hvetebrødsdagene",
		],
	},
	mutations: {
		initialiseStore(state) {
			// Check if the ID exists
			if (localStorage.getItem("store")) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem("store")))
				);
			}
		},
		setGroupTitles(state, titles) {
			state.groupTitles = titles;
		},
		setOwner(state, owner) {
			state.owner = owner;
		},
		setPartner(state, partner) {
			state.partner = partner;
		},
		setDelegate(state, delegate) {
			if (delegate === null) return;
			const isIn = state.delegates.includes(delegate);
			if (isIn) return;
			state.delegates.push(delegate);
		},
		removeDelegate(state, delegate) {
			const usedDelegate = state.todos.find((e) => e.delegate === delegate);
			if (usedDelegate) {
				return;
			}
			const reduce = (ac, item) => {
				if (item !== delegate) {
					ac.push(item);
				}
				return ac;
			};
			const delegates = state.delegates.reduce(reduce, []);
			state.delegates = [...delegates];
		},
		setTimeBeforeWedding(state, str) {
			state.timeBeforeWedding = str;
		},
		setDuration(state, duration) {
			state.duration = duration;
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
		setGroupTitles({ commit }, titles) {
			commit("setGroupTitles", titles);
		},

		setDuration({ commit }, date) {
			const now = moment();
			const then = moment(date);
			const duration = then.diff(now);
			//
			commit("setDuration", duration);
		},
		setTimeBeforeWedding({ commit }, date) {
			const now = moment().subtract(1, "day");
			const then = moment(date);
			const year = then.diff(now, "year");
			then.subtract(year, "year");
			const months = then.diff(now, "month");
			then.subtract(months, "month");
			const days = then.diff(now, "days");
			const yearText = year !== 0 ? `${year} år ` : "";
			const monthText = months !== 0 ? `${months} måneder ` : "";
			const daysText = days !== 0 ? `${days} dager` : "";
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
			const newTask = { ...task, created, isCompleted: false, id };
			commit("newTodo", newTask);
			commit("setNewBool", false);
		},
		editAction({ commit }, task) {
			// console.log("task");
			// console.log(task);

			commit("editTodo", task);
			commit("setEditBool", false);
		},
	},
	getters: {
		testTitles(state) {
			const titles = [...Array(6)].map((o, i) => {
				const singleDuration = state.duration - (i * state.duration) / 6;
				let d = moment.duration(singleDuration);
				d.add({ day: 2 });

				const years = d.years();
				d.subtract({ years });

				const months = d.months();

				d.subtract({ months: Math.floor(months) });

				const weeks = d.weeks();


				const ukePlur = weeks === 1 ? "uke" : "uker";
				let yearText =
					years !== 0 ? `${years} år ` : "";

				let monthText = months !== 0 ? `${months} mnd ` : "";

				let weekText = weeks !== 0 ? `${weeks} ${ukePlur} ` : "";

				return yearText + monthText + weekText + " før";

			});
			const fixedTitles = ["En uke før", "En dag før", "Bryllupsdagen", "I etterkant av bryllupet 1-3 mnd", "Innen 6 måneder etter bryllupet"]
			return [...titles, ...fixedTitles];
		},

		getGroupTitles(state) {
			return state.groupTitles;
		},
		getDuration(state) {
			return state.duration;
		},
		getDelegates(state) {
			let delegates = state.delegates.length ? state.delegates : [];
			let owner = state.owner ? state.owner : "ikke satt";
			let partner = state.partner ? state.partner : "ikke satt";
			delegates = [owner, partner, ...delegates];
			return [...delegates];
		},
		todos(state) {
			return state.todos;
		},
		todosDone(state) {
			const reduce = (ac, item) => ac + (item.isCompleted ? 1 : 0);
			const length = state.todos.reduce(reduce, 0);
			return length;
		},
		groupColors() {
			const colors = [
				"purple darken-3",
				"deep-purple darken-3",
				"indigo darken-3",
				"blue darken-3",
				"cyan darken-3",
				"teal darken-3",
				"green darken-3",
				"light-green darken-3",
				"lime darken-3",
				"amber darken-3",
				"orange darken-3",
			];

			colors.reverse();
			return colors;
		},
	},
});

// DATE FORMATTER



// Subscribe to store updates
export const unsubscribe = store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem("store", JSON.stringify(state));
});

export default store;
