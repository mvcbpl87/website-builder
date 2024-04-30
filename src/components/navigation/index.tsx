import Link from 'next/link';
import React from 'react'
import { ModeToggle } from '../global/mode-toggle';
import { getClerkAuth } from '@/server-actions/auth';
const Wrapper = ({children}:{children:React.ReactNode})=>{
    const style = `p-4 flex items-center justify-between relative  bg-background border-muted border-b-[1px]`;
    return(<nav className={style}>{children}</nav>)
}

async function NavigationBar() {
  const userId = await getClerkAuth()
  return (
    <Wrapper>
        <aside className='flex items-center gap-2 text-muted-foreground'>
            <span className='text-2xl font-bold'>Plura.</span>
        </aside>
        <aside className='flex gap-2 items-center'>
          {!userId ? <Link href="/sign-up" className='bg-primary text-white p-[0.45rem] px-4 rounded-md hover:bg-primary/80'>Login</Link>
           : <Link href="/agency" className='bg-primary text-white p-[0.45rem] px-4 rounded-md hover:bg-primary/80'>Getting Started</Link>

          }
            
            <ModeToggle/>
        </aside>
    </Wrapper>
  )
}

export default NavigationBar