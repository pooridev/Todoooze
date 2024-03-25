"use client";
import Link from "next/link";

import { Navbar } from "../../components/shared/Navbar";
import Layout from "../../layout/Layout";

const RecentPage = () => (
  <Layout>
    <Navbar>
      <h1>Coming soon...</h1>
      <Link href="/">Go home</Link>
    </Navbar>
  </Layout>
);

export default RecentPage;
