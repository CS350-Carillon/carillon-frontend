import { useRouter } from 'next/router'

import SideBar from '../../../comps/SideBar'
import MessageBlock from '../../../comps/MessageBlock'
import '../../app/globals.css'

export default function ClassMainPage() {
  const router = useRouter()

  return (
    <SideBar>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <div className="vertical">
          <div className="title"> {router.query.classCode} </div>
          <MessageBlock />
          <MessageBlock />
        </div>
        <div> INPUT BOX</div>
      </div>
    </SideBar>
  )
}
