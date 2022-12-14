import Coins from "@components/Coins";
import Coin from "@pages/Coin";

const routes = [
  {
    path: "/",
    element: <Coins />,
    children: [{ path: ":tab", element: <Coins /> }],
  },
  {
    path: "/coin",
    element: <Coin />,
    children: [{ path: ":id", element: <Coin /> }],
  },
  {
    path: "*",
    element: <Coins />,
  },
];

export default routes;
