import ModeToggle from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <>
    <Button variant={'secondary'}>Cancel</Button>
    <Button >Done</Button>
    <ModeToggle/>
    </>
  )
}

export default Home