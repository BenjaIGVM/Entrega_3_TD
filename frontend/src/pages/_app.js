import React from 'react';
import App from 'next/app';
import Head from 'next/head';
// import Layout from "./layout"
import { ThemeProvider } from 'next-themes'

import { QueryClient, QueryClientProvider } from 'react-query';


import '../styles/globals.css';

class MyApp extends App {


    render() {
        const queryClient = new QueryClient();
        const { Component, pageProps } = this.props;

        return (
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Tinder Dog</title>
                    </Head>
                    <Component {...pageProps} />
                </ThemeProvider>
            </QueryClientProvider>
        );
    }
}

export default MyApp;



