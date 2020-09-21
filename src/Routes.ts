import CreateLink from "./components/CreateLink";
import LinkList from "./components/LinkList";
import Login from "./components/Login";
import Search from "./components/Search";

const ROUTES = [
  { path: "/" },
  { path: "/create", component: CreateLink },
  { path: "/login", component: Login },
  { path: "/search", component: Search },
  { path: "/top", component: LinkList },
  { path: "/new/:page", component: LinkList },
];

export default ROUTES;
