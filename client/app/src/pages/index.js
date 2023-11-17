import Head from 'next/head';
import { Box, Typography, Button, Container, TextField } from '@mui/material';
import { Layout as IndexLayout } from 'src/layouts/index/layout';
import { Logo } from 'src/components/logo';
import Link from 'next/link';
import Card from 'src/components/meal-card';
import Home from 'src/sections/index/home';
import About from 'src/sections/index/about';
import Contact from 'src/sections/index/contact';

const Page = () => {
  return (
    <>
      <Head>
        <title>Beam</title>
      </Head>
      <Home />
      <About />
      <Contact />
    </>
  );
};

Page.getLayout = (page) => <IndexLayout>{page}</IndexLayout>;

export default Page;