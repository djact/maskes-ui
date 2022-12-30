import { Head, Html, Main, NextScript } from 'next/document'

/**
 * Next.js _document.tsx is used to customize the document's HTML and body tags
 * https://nextjs.org/docs/advanced-features/custom-document
 */
const Document = () => {
    return (
        <Html lang="en">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
                integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
                crossOrigin="anonymous"
            />
            <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"></script>
            <script>var Alert = ReactBootstrap.Alert;</script>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document
