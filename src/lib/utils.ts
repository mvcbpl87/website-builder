import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomColor = `#${Math.random().toString(16).slice(2, 8)}`;

export const shortenText = (text:string)=> {
  if(text.length > 50)
   return `${text.slice(0,10)}...${text.slice(text.length-10, text.length)}` 
  else return text
}