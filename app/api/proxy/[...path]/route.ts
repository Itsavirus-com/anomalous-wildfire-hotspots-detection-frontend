import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.API_URL || 'http://localhost:8000'

async function handler(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/')
  const search = req.nextUrl.search

  const targetUrl = `${API_URL}/api/${path}${search}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  let body: string | undefined
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await req.text()
  }

  const res = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
  })

  const data = await res.json()

  return NextResponse.json(data, { status: res.status })
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
