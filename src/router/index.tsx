import Tip from "@/pages/Tip";
import Layout from "@/components/layout";
import { createBrowserRouter } from "react-router";
import Profile from "@/pages/Profile";
import Support from "@/pages/Support";
import ProtectedRoute from "@/components/reusables/ProtectedRoute";

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
      <ProtectedRoute>
        <Layout>
          <Profile />
        </Layout>
      </ProtectedRoute>
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
