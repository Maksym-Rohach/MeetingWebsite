import UserProfile from "views/UserProfile.jsx";
import Login from "../../components/pages/login";
import AdminTable from "../../components/admin/Tables/AdminTable"
import UserTable from "../../components/admin/Tables/UserTable"
import VipTable from "../../components/admin/Tables/VipTable"
import BanTable from "../../components/admin/Tables/BanTable"
import MuteTable from "../../components/admin/Tables/MuteTable"
import ActivityDashboard from "../../components/admin/Dashboards/ActivityDashboard"
import RegistryDashboard from "../../components/admin/Dashboards/RegistryDashboard"


var routes = [
  
  {
    path: "/users",
    name: "Таблиця-користувачів",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-single-02",
    component: UserTable,
    layout: "/admin"
  },
  {
    path: "/admins",
    name: "Таблиця-адмінов",
    rtlName: "الرموز",
    icon: "tim-icons icon-key-25",
    component: AdminTable,
    layout: "/admin"
  },
  {
    path: "/schedule-attendance",
    name: "Графік активності",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: ActivityDashboard,
    layout: "/admin"
  },
  {
    path: "/schedule-registration",
    name: "Графік реєстрації",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: RegistryDashboard,
    layout: "/admin"
  },
  
  {
    path: "/vip-users",
    name: "VIP таблиця",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-shape-star",
    component: VipTable,
    layout: "/admin"
  },
  {
    path: "/ban-list",
    name: "Бан таблиця",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-alert-circle-exc",
    component: BanTable,
    layout: "/admin"
  },
  {
    path: "/mute-list",
    name: "Мут таблиця",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-volume-98",
    component: MuteTable,
    layout: "/admin"
  },
];
export default routes;