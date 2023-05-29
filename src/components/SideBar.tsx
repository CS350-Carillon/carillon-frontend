import * as React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { localPort } from '@/utils/constants'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowDimensions from './WindowSize'
import style from './SideBar.module.css'

export default function SideBar({ children }: { children: React.ReactNode }) {
  const styles = {
    accordion: {
      width: '150px',
      backgroundColor: '#2f6eba',
      color: 'white',
      border: 0,
      boxShadow: 0,
    },
  }
  const { height } = useWindowDimensions()
  let gap = 0
  let h = 0

  if (height) {
    gap = height - 400
    h = height
  }

  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [data, setData] = useState(null)
  const [currentworkspace, setWorkspace] = useState(null)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const fetchData = async () => {
    try {
      const result = await axios(`${localPort}/channels/`)
      return result
    } catch (err) {
      return err
    }
  }

  useEffect(() => {
    fetchData().then((res) => setData(res.data))
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        margin: '20px',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          marginRight: '40px',
          height: h,
        }}
      >
        <Link
          href="/workspace"
          style={{
            fontSize: '18pt',
            fontWeight: '900',
            color: '#2f6eba',
            marginBottom: '10px',
            textDecoration: 'none',
            width: '100%',
          }}
        >
          {' '}
          Carrilon{' '}
        </Link>
        <div
          style={{
            width: '200px',
            backgroundColor: '#2f6eba',
            height: '90vh',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '10px',
          }}
        >
          <div style={{ margin: '10px', color: 'white', fontWeight: 'bold' }}>
            {currentworkspace}
          </div>
          <div style={{ width: '90%', borderTop: '1px solid white' }} />
          <Accordion
            expanded={expanded === 'workspace'}
            onChange={handleChange('workspace')}
            sx={styles.accordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography> Workspace </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: gap,
              }}
            >
              <div>
                {data &&
                  data.map((workspace) => (
                    <Link
                      key={workspace.description}
                      href={`/workspace/${workspace.description}`}
                      className={style.accordionChild}
                      onClick={() => setWorkspace(workspace.description)}
                    >
                      {workspace.description}
                      <br />
                    </Link>
                  ))}
              </div>
              <Link href="/"> New Workspace </Link>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'channels'}
            onChange={handleChange('channels')}
            sx={styles.accordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography> Channels </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ height: gap }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Link
                  href="/workspace/cs350/channel1"
                  className={style.accordionChild}
                >
                  {' '}
                  Channel1{' '}
                </Link>
                <Link
                  href="/workspace/cs350/channel2"
                  className={style.accordionChild}
                >
                  {' '}
                  Channel2{' '}
                </Link>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'dm'}
            onChange={handleChange('dm')}
            sx={styles.accordion}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography> DM </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ height: gap }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Link
                  href="/workspace/cs350/Sally"
                  className={style.accordionChild}
                >
                  {' '}
                  Sally{' '}
                </Link>
                <Link
                  href="/workspace/cs350/Sam"
                  className={style.accordionChild}
                >
                  {' '}
                  Sam{' '}
                </Link>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'myinfo'}
            onChange={handleChange('myinfo')}
            sx={styles.accordion}
          >
            <AccordionSummary
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <div>
                <Link href="/mypage" className={style.accordionChild}>
                  <Typography> My Informaion </Typography>
                </Link>
              </div>
            </AccordionSummary>
          </Accordion>
        </div>
      </div>
      <div style={{ width: '90%' }}>{children}</div>
    </div>
  )
}
