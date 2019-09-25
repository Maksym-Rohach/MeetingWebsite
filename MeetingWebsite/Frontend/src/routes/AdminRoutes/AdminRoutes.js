import UserProfile from "views/UserProfile.jsx";
import Login from "../../components/pages/login";

var routes = [
  
  {
    path: "/users",
    name: "Таблиця-користувачів",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/admins",
    name: "Таблиця-адмінов",
    rtlName: "الرموز",
    icon: "tim-icons icon-key-25",
    component: Login,
    layout: "/admin"
  },
  {
    path: "/schedule-attendance",
    name: "Графік активності",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/schedule-registration",
    name: "Графік реєстрації",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: UserProfile,
    layout: "/admin"
  },
  
  {
    path: "/vip-users",
    name: "VIP таблиця",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-shape-star",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/ban-list",
    name: "Бан таблиця",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-alert-circle-exc",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/mute-list",
    name: "Мут таблиця",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-volume-98",
    component: UserProfile,
    layout: "/admin"
  },
  // {
  //   path: "/login",
  //   name: "Логін",
  //   rtlName: "الرموز",
  //   icon: "tim-icons icon-atom",
  //   component: Login,
  //   layout: "/admin"
  // },
 

];
export default routes;
