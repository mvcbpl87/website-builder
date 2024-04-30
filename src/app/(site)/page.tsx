import React from 'react'
import Image from 'next/image';
import NavigationBar from '@/components/navigation';
import { pricingCards } from '@/lib/constant';
import clsx from 'clsx';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle} from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
function Wrapper({children}:{children:React.ReactNode}){
    const style = `flex flex-col min-h-screen bg-background/90 relative
    `;
    return(
    <div className={style}>
        <div className=" absolute bottom-0 left-0 right-0 top-0 
        bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]
        bg-[size:14px_24px]"/>
        {children}</div>)
}

function Section1(){
    const Wrapper = ({children}:{children:React.ReactNode})=>{
        const style = `z-10 flex flex-col justify-center items-center py-20`;
        return(<section className={style}>{children}</section>)
    }
    
    return(
    <Wrapper>
        <p className=' text-2xl '>Run your agency, in one place</p>
        <div className='bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative'>
            <h1 className='sm:text-[1rem] md:text-[200px] text-9xl font-semibold text-center'>Solaris</h1>
        </div>
        <div className=' z-20 relative'>
            <div className='w-full rounded-full bg-primary/50 h-32 blur-[120px] absolute -z-10 '/>
            <Image 
                src={'/assets/preview.png'} 
                alt="banner image" 
                height={1200} 
                width={1200} 
                className='rounded-t-2xl border-muted border-2'/>
            <div className='absolute bg-gradient-to-t bottom-0 w-full h-40 from-black'/>
        </div>
    </Wrapper>
    )
}

function Section2(){
    const Wrapper = ({children}:{children:React.ReactNode})=>{
        const style = `z-10 flex flex-col justify-center items-center gap-4 md:!mt-20 `;
        return(<section className={style}>{children}</section>)
    }
    const CardWrapper = ({children}:{children:React.ReactNode}) =>{
        const style = `flex items-center justify-center gap-6 flex-wrap mt-6`;
        return(<div className={style}>{children}</div>)
    }
    return(
    <Wrapper>
        <h2 className='text-4xl text-center'> Choose what fits you right</h2>
        <p className='text-muted-foreground text-center'>
            Our straightforward pricing plans are tailored to meet your need. if {"you're"} not <br/>
            ready to commit you can get started for free.
        </p>
        <CardWrapper>
        {pricingCards.map((card, index)=>(
            <Card
             key={`Card-${index+1}`}
             className={clsx('w-[300px] h-[20rem] flex flex-col justify-between',
                {
                    'border-2 border-primary': card.title === 'Unlimited Saas'
                }
             )}
             >
                <CardHeader>
                    <CardTitle 
                     className={clsx('',{
                        'text-muted-foreground':card.title !=="Unlimited Saas"
                     })}>
                        {card.title}
                    </CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <span className='text-4xl font-bold'>{card.price}</span>
                    <span className='text-muted-foreground'>/mth</span>
                </CardContent>
                <CardFooter className='flex flex-col items-start gap-4'>
                    <div>

                    {card.features.map((feature)=>(
                        <div key={feature}
                        className='flex gap-2 items-center'>
                            <Check className='text-muted-foreground'/>
                            <p>{feature}</p>
                        </div>
                    ))}
                    </div>
                    <Link href="#" 
                     className={clsx('w-full text-center bg-primary p-2 rounded-md',
                        {'!bg-muted-foreground': card.title !== 'Unlimited Saas'}
                     )}>
                        Get Started
                    </Link>

                </CardFooter>
            </Card>
        ))

        }
        </CardWrapper>
    </Wrapper>
    )
}

function HomePage() {
    return(
    <Wrapper>
        <NavigationBar/>
        <Section1/>
        <Section2/>
    </Wrapper>)
}

export default HomePage