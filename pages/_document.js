import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  render() {
    return (
        <Html lang="pt-br">
        <Head crossOrigin="anonymous"/>
        <body>
          <Main />
          <NextScript crossOrigin="anonymous"/>
        </body>
      </Html>
    )
  }
}

export default MyDocument