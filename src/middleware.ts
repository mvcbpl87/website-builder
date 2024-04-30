import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
export default clerkMiddleware((auth,req)=>{
    const url = req.nextUrl;
    const searchParams = url.searchParams.toString()
    const pathWithSearchParams = `${url.pathname}${
        searchParams.length > 0 ? `?${searchParams}` : ''
      }`
    if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
        return NextResponse.redirect(new URL(`/agency/sign-in`, req.url))
      }
    if (
        url.pathname.startsWith('/agency') ||
        url.pathname.startsWith('/subaccount')
    ) {
        return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url))
    }

})

export const config = { matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']};