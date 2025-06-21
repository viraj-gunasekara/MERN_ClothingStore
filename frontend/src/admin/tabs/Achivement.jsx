import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React from 'react'

const TrophyImg = styled('img')({
  right: 10,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const TriangleImg = styled('div')({
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: 0,
  height: 0,
  borderLeft: '170px solid transparent',
  borderBottom: '170px solid lightgray', 
});


const Achivement = () => {
  return (
    <Card sx={{ position: 'relative', paddingRight: 20 }}>
      <CardContent>
        <Typography variant='h6' sx={{ letterSpacing: '0.25px' }}>
          ViraJ's Clothing Store
        </Typography>
        <Typography variant='body2' >Monthly Sales:</Typography>
        <Typography variant='h5' sx={{ my: 3.1, color: 'primary.main' }}>
          420.8k
        </Typography>
        <Button size='small' variant='contained'>
          View Sales
        </Button>
        <TriangleImg/>
        <TrophyImg src='https://cdn.iconscout.com/icon/premium/png-512-thumb/trophy-3380498-2806548.png?f=webp&w=512' alt=''/>
      </CardContent>
    </Card>
  )
}

export default Achivement