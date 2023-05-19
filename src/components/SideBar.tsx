import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import style from './SideBar.module.css'
import Link from 'next/link'

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

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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
          height: '100vh',
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
          <Accordion expanded={expanded === 'workspace'} onChange={handleChange('workspace')} sx={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography> Workspace </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
              <div>
                <Link href="/workspace/cs350" className={style.accordionChild}>
                  {' '}
                  CS350{' '}
                </Link>
              </div>
              <Link href="/new"> New Workspace </Link>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'channels'}  onChange={handleChange('channels')} sx={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography> Channels </Typography>
            </AccordionSummary>
            <AccordionDetails>
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
          <Accordion expanded={expanded === 'dm'}  onChange={handleChange('dm')} sx={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography> DM </Typography>
            </AccordionSummary>
            <AccordionDetails>
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
          <Accordion expanded={expanded === 'myinfo'}  onChange={handleChange('myinfo')} sx={styles.accordion}>
            <AccordionSummary
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography> My Information </Typography>
            </AccordionSummary>
          </Accordion>
        </div>
      </div>
      <div style={{ width: '90%' }}>{children}</div>
    </div>
  )
}
