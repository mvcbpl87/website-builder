import React from 'react'
import { WrapperProps } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function BlurPage({children, className}:WrapperProps){
  const customStyle = `overflow-y-auto absolute w-full h-full backdrop-blur-[35px] z-[11] 
  dark:bg-muted/40 bg-muted/60 dark:shadow-2xl dark:shadow-black p-6 pt-24 md:pt-6 `
  const style = cn(customStyle, className);
  return(
  <div className="relative flex flex-1 flex-col ">
    <div className={style}>{children}</div>
  </div>)
}