import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" data-theme='corporate'>
      <Head>
        <meta charSet='utf-8' />
        <meta name='robots' content='follow, index' />        
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
