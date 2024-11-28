import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@/app/auth/_components/Login'), { ssr: false })

export default function Page() {
    return <Login />
}
