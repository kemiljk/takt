import { Suspense } from 'react'
import { Playground } from '@/components/playground/Playground'

export default function HomePage() {
  return (
    <Suspense>
      <Playground />
    </Suspense>
  )
}
