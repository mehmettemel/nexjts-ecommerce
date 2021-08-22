import Layout from '../components/Layout'
import '../styles/globals.css'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { DataProvider } from '../store/GlobalState'

function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider>
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </GeistProvider>
  )
}

export default MyApp
