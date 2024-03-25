"use client";
import Navbar from "../../components/shared/Navbar/Navbar";

import Link from "next/link";
import RootLayout from "../layout";
import Layout from "../../layout/Layout";

const SearchPage = () => (
  <Layout>
    <Navbar>
      <h1>Coming soon... </h1>
      <Link href="/">Go home</Link>
    </Navbar>
  </Layout>
);

export default SearchPage;
