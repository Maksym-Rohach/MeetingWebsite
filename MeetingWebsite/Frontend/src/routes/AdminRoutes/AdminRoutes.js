import UserProfile from "views/UserProfile.jsx";
import Login from "../../components/pages/login";
import User from "../../components/admin/Users";

var routes = [
  {
    path: "/admin",
    name: "Таблиця",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Логін",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Login,
    layout: "/admin"
  },
  {
    path: "/buttons",
    name: "Логін",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: User,
    layout: "/admin"
  }
];
export default routes;
