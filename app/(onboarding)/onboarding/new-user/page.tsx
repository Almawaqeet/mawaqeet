

import dynamic from 'next/dynamic'

const NewUser = dynamic(() => import('@/app/(public-pages)/_components/onboarding/NewUser'), { ssr: false })

export default function NewUserPage() {
  return (
    <NewUser />
  )
}
