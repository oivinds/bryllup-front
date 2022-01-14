import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/todo",
		name: "Todo",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "todo" */ "../views/Todo.vue"),
	},
];

const router = new VueRouter({
	routes,
});

router.beforeEach((to, from, next) => {
	window.scrollTo(0, 0);
	next();
});

export default router;
