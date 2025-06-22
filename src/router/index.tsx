import Tip from "@/pages/Tip";
import Layout from "@/components/layout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Tip />
      </Layout>
    ),
  },
]);

export default router;
