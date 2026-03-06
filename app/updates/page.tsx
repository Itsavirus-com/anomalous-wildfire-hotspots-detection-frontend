import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Updates & Release Notes · Wildfire Monitor',
    description: 'Latest updates, improvements, and release notes for the Wildfire Detection Dashboard.',
}

type PostTag = 'release' | 'data' | 'model' | 'fix' | 'infra'

interface Post {
    version: string
    date: string
    title: string
    tags: PostTag[]
    body: string[]
}

const TAG_STYLES: Record<PostTag, string> = {
    release: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    data: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    model: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    fix: 'bg-green-500/20 text-green-300 border-green-500/40',
    infra: 'bg-gray-500/20 text-gray-300 border-gray-500/40',
}

const posts: Post[] = [
    {
        version: 'v0.3.0',
        date: 'March 2026',
        title: 'Frontend Dashboard Launch',
        tags: ['release', 'infra'],
        body: [
            'Initial public release of the Wildfire Detection frontend dashboard.',
            'Interactive H3 hexagonal grid map powered by Deck.gl and MapLibre GL, showing real-time anomaly scores across Indonesia.',
            'Cell detail panel with time-series charts (Recharts), alert severity indicators, and raw feature breakdown.',
            'Alert sidebar listing the top anomalous hotspots, sortable by score and recency.',
            'Pipeline status page showing ingestion, scoring, and delivery stages.',
            'Stats overview page with national-level aggregation charts.',
        ],
    },
    {
        version: 'v0.2.0',
        date: 'February 2026',
        title: 'Isolation Forest Model Upgrade',
        tags: ['model', 'data'],
        body: [
            'Upgraded the anomaly detection model to Isolation Forest with H3 resolution 5 spatial indexing.',
            'Added FIRMS VIIRS satellite data ingestion pipeline from NASA LAADS DAAC.',
            'Improved false-positive rate by incorporating vegetation index (NDVI) and land-cover features.',
            'Model now scores each H3 cell independently, enabling sub-regional anomaly tracking.',
        ],
    },
    {
        version: 'v0.1.0',
        date: 'January 2026',
        title: 'Data Pipeline & Backend API',
        tags: ['infra', 'data'],
        body: [
            'Established the core backend API (FastAPI) serving hotspot data and anomaly scores.',
            'Integrated NASA FIRMS (Fire Information for Resource Management System) as the primary data source.',
            'Set up automated hourly ingestion of MODIS and VIIRS active fire data.',
            'Deployed initial H3-based spatial aggregation logic covering all Indonesian provinces.',
        ],
    },
]

function Tag({ tag }: { tag: PostTag }) {
    return (
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${TAG_STYLES[tag]}`}>
            {tag}
        </span>
    )
}

export default function UpdatesPage() {
    return (
        <div className="min-h-full bg-gray-950 text-gray-100">
            {/* Header */}
            <div className="border-b border-gray-800 bg-gray-900/60 backdrop-blur-sm">
                <div className="max-w-3xl mx-auto px-6 py-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-2">Changelog</p>
                    <h1 className="text-3xl font-bold text-white mb-2">Updates & Release Notes</h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Track the latest improvements, model updates, and data pipeline changes to the
                        Wildfire Detection Dashboard.
                    </p>
                </div>
            </div>

            {/* Posts */}
            <div className="max-w-3xl mx-auto px-6 py-10">
                <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-gray-800 hidden sm:block" />

                    <div className="space-y-12">
                        {posts.map((post) => (
                            <article key={post.version} className="relative sm:flex gap-8">
                                {/* Left: version + date */}
                                <div className="sm:w-24 shrink-0 flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 mb-3 sm:mb-0">
                                    <span className="font-mono text-xs font-bold text-orange-400 sm:text-right">
                                        {post.version}
                                    </span>
                                    <span className="text-[11px] text-gray-600 sm:text-right whitespace-nowrap">
                                        {post.date}
                                    </span>
                                </div>

                                {/* Timeline dot */}
                                <div className="hidden sm:flex items-start justify-center w-0 relative">
                                    <div className="absolute -left-2 top-1 w-3.5 h-3.5 rounded-full bg-orange-500 border-2 border-gray-950 z-10" />
                                </div>

                                {/* Right: content */}
                                <div className="flex-1 bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <h2 className="text-base font-semibold text-white">{post.title}</h2>
                                        <div className="flex gap-1.5 flex-wrap">
                                            {post.tags.map((tag) => (
                                                <Tag key={tag} tag={tag} />
                                            ))}
                                        </div>
                                    </div>
                                    <ul className="space-y-1.5">
                                        {post.body.map((line, i) => (
                                            <li key={i} className="flex gap-2 text-sm text-gray-400 leading-relaxed">
                                                <span className="text-orange-500 mt-1 shrink-0">·</span>
                                                <span>{line}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* NASA attribution footer */}
                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <Image
                        src="/nasa-logo.svg"
                        alt="NASA logo"
                        width={56}
                        height={56}
                        className="opacity-80 shrink-0"
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-300">
                            Powered by NASA Earth Observation Data
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                            Fire hotspot data sourced from{' '}
                            <a
                                href="https://firms.modaps.eosdis.nasa.gov/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-orange-400 hover:text-orange-300 underline underline-offset-2"
                            >
                                NASA FIRMS
                            </a>{' '}
                            (Fire Information for Resource Management System) via MODIS and VIIRS satellite instruments.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
