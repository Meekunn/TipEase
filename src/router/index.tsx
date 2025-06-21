import Home from "@/pages/Home";
import Layout from "@/components/layout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
]);

export default router;
