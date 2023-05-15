import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
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
    accordionChild: {
      textDecoration: 'none',
      color: 'white',
    },
  }

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
          }}
        >
          <Accordion sx={styles.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography> Workspace </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Link href="/workspace/cs350" style={styles.accordionChild}>
                {' '}
                CS350{' '}
              </Link>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordion}>
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
                  style={styles.accordionChild}
                >
                  {' '}
                  Channel1{' '}
                </Link>
                <Link
                  href="/workspace/cs350/channel2"
                  style={styles.accordionChild}
                >
                  {' '}
                  Channel2{' '}
                </Link>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordion}>
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
                  style={styles.accordionChild}
                >
                  {' '}
                  Sally{' '}
                </Link>
                <Link href="/workspace/cs350/Sam" style={styles.accordionChild}>
                  {' '}
                  Sam{' '}
                </Link>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={styles.accordion}>
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
