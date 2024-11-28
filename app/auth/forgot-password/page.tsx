import dynamic from 'next/dynamic'

const ForgottenPassword = dynamic(() => import('@/app/auth/_components/ForgottenPassword'), { ssr: false })

export default function Page() {
  return (
    <ForgottenPassword />
  )
}
