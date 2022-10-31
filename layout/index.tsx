import Head from 'next/head'
import React from 'react'
import Header from '../components/Header';

interface Props {
    title?: string;
    children: React.ReactNode
}

export default function MainLayout({ title, children }: Props) {
    return (
        <div>
            <Head>
                <title>{title ? `${title} - Apple` : 'Apple'}</title>
                <link rel="icon" href="/apple.png" />
            </Head>
            <Header />
            {
                children
            }
        </div>
    )
}
