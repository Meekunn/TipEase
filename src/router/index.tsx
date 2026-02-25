import Tip from "@/pages/Tip";
import Layout from "@/components/layout";
import { createBrowserRouter } from "react-router";
import Profile from "@/pages/Profile";
import Support from "@/pages/Support";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Tip />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/support",
    element: (
      <Layout>
        <Support />
      </Layout>
    ),
  },
]);

export default router;
