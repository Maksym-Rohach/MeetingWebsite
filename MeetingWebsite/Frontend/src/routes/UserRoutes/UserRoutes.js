import UserProfile from "../../components/Users/UserProfile/UserProfile";
import Login from "../../components/pages/login";
import Chat from "../../containers/chat/ChatContainer";
var routes = [
  {
    path: "/profile",
    name: "Profile",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: UserProfile,
    layout: "/user"
  },
  {
    path: "/chat2",
    name: "Tom",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Chat,
    layout: "/user"
  }
];
export default routes;
