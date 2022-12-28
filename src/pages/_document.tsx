import { Head, Html, Main, NextScript } from 'next/document'

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
