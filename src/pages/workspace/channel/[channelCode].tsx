import { useRouter } from 'next/router'

export default function ChannelComp() {
  const router = useRouter()
  return <div>Channel{router.query.classCode}</div>
}
