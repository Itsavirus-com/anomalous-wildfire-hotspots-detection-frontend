import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wildfire Detection Dashboard',
  description: 'Anomalous wildfire hotspot detection across Indonesia',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-gray-100 min-h-screen flex flex-col">
        <nav className="h-12 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-6 shrink-0 z-50">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-sm text-white">Wildfire Monitor</span>
            <span className="hidden sm:block text-xs text-gray-500 font-normal">Indonesia · Unusual fire activity detection</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="https://github.com/Itsavirus-com/anomalous-wildfire-hotspots-detection" className="text-gray-400 hover:text-white transition-colors">
              <Image src="/GitHub_Invertocat_White_Clearspace.svg" alt="GitHub" width={20} height={20} />
            </Link>
            <Link href="/stats" className="text-gray-400 hover:text-white transition-colors">
              Stats
            </Link>
            <Link href="/pipeline" className="text-gray-400 hover:text-white transition-colors">
              Pipeline
            </Link>
            <Link href="/updates" className="text-gray-400 hover:text-white transition-colors">
              Updates
            </Link>
          </div>
          {/* NASA attribution badge */}
          <div className="ml-auto flex items-center gap-2">
            <Image
              src="/nasa-logo.svg"
              alt="NASA"
              width={20}
              height={20}
              className="opacity-70"
            />
            <span className="text-[11px] text-gray-500">
              Made with{' '}
              <a
                href="https://firms.modaps.eosdis.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                NASA FIRMS
              </a>{' '}
              data
            </span>
          </div>
        </nav>
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
