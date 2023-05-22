import SideBar from '../../components/SideBar'

export default function Workspace() {
  return (
    <SideBar>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <div> INPUT BOX</div>
      </div>
    </SideBar>
  )
}
