import { useRouter } from 'next/router'

import SideBar from '../../components/SideBar'
import MessageBlock from '../../components/MessageBlock'
import InputBox from '../../components/InputBox'
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="title"> {router.query.classCode} </div>
          <MessageBlock />
          <MessageBlock />
        </div>
        <div>
          {' '}
          <InputBox />{' '}
        </div>
      </div>
    </SideBar>
  )
}
