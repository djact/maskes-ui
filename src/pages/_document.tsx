import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
/**
 * Next.js _document.tsx is used to customize the document's HTML and body tags
 * https://nextjs.org/docs/advanced-features/custom-document
 */
const Document = () => {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document
