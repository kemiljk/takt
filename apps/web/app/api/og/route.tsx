import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const score = searchParams.get('score') || '0'
  const rank = searchParams.get('rank') || 'Apprentice'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          color: '#fafafa',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: 32, opacity: 0.6, marginBottom: 16, display: 'flex' }}>Takt Test</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <div style={{ fontSize: 128, fontWeight: 700, letterSpacing: '-0.03em', display: 'flex' }}>
            {score}
          </div>
          <div style={{ fontSize: 48, opacity: 0.4, display: 'flex' }}>/500</div>
        </div>
        <div style={{ fontSize: 28, marginTop: 16, display: 'flex' }}>{rank}</div>
        <div style={{ fontSize: 18, opacity: 0.4, marginTop: 32, display: 'flex' }}>takt.style/game</div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
