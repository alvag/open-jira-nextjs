import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';


class MyDocument extends Document {
    static async getInitialProps( ctx: DocumentContext ) {
        const initialProps = await Document.getInitialProps( ctx );

        return {
            ...initialProps,
            styles: initialProps.styles
        };
    }

    render() {
        return (
            <Html lang="es">
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>

                    <link rel="shortcut icon" href="/favicon.ico"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
