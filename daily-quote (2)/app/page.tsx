"use client"

import { Suspense, useEffect, useState } from "react"
import { getDailyQuote } from "@/lib/quotes"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [quote, setQuote] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuote = async () => {
      const { Quote } = await getDailyQuote()
      setQuote(Quote)
    }

    fetchQuote()

    const checkMidnight = () => {
      const now = new Date()
      const tunisianTime = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Tunis" }))

      if (tunisianTime.getHours() === 0 && tunisianTime.getMinutes() === 0) {
        setCurrentDate(now)
        fetchQuote()
      }
    }

    const timer = setInterval(checkMidnight, 60000) // Check every minute

    return () => clearInterval(timer)
  }, [])

  const tunisianTime = new Date(currentDate.toLocaleString("en-US", { timeZone: "Africa/Tunis" }))
  const dayName = tunisianTime.toLocaleDateString("en-US", { weekday: "long" })
  const day = tunisianTime.getDate()
  const month = tunisianTime.toLocaleDateString("en-US", { month: "long" })
  const year = tunisianTime.getFullYear()

  return (
    <main className="min-h-screen bg-[#ffffff] flex flex-col relative overflow-hidden">
      {/* Background Split */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#fd77ab]/10 backdrop-blur-sm clip-diagonal" />
      </div>

      {/* Top Bar */}
      <header className="w-full bg-[#fd77ab] py-4 px-6 relative z-10">
        <div className="mx-auto max-w-screen-xl flex items-center">
          <div className="mr-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-X6t9ZQcLosREcBcZEIFBxxsAltyYnP.png"
              alt="Maram's Secret Garden Logo"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
          </div>
          <nav className="flex items-center gap-8 text-[#ffffff] text-sm tracking-wider font-medium">
            <a href="#" className="hover:underline uppercase">
              MARAM'S SECRET GARDEN
            </a>
            <a href="#" className="hover:underline uppercase">
              FLOWERS
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow mx-auto max-w-screen-xl px-6 pt-8 relative z-10">
        <div className="relative grid min-h-[calc(100vh-10rem)] grid-cols-[auto,1fr] gap-12">
          {/* Left Side Date */}
          <div className="flex flex-col items-center justify-start pt-12 text-sm">
            <div className="horizontal-text space-y-6 text-center p-6 rounded-2xl bg-[#fd77ab]/10 backdrop-blur-sm border border-[#fd77ab]/20">
              <span className="block text-[#fd77ab] text-xl font-semibold">{dayName}</span>
              <div className="space-y-2">
                <span className="block text-[#ffb7d2] text-3xl font-bold">{day}</span>
                <span className="block text-[#111111] text-lg">{month}</span>
                <span className="block text-[#fd77ab]">{year}</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="relative grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-8">
            <div className="py-12 lg:py-0">
              <Suspense fallback={<div className="h-24 animate-pulse rounded-lg bg-[#eaeaec]" />}>
                <QuoteDisplay quote={quote} />
              </Suspense>
            </div>

            {/* Tulip Bouquet Carousel */}
            <div className="relative hidden lg:block">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px]">
                <Carousel className="w-full" opts={{ loop: true }}>
                  <CarouselContent>
                    <CarouselItem className="flex items-center justify-center">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tulips-bouquet-realistic-d-spring-holland-flowers-international-woman-day-march-mother-victory-day-greeting-tulips-bouquet-176568777-o0egrB40hHxpYm3h33QK23GPnWgc7l.webp"
                        alt="Pink tulips bouquet"
                        width={400}
                        height={400}
                        className="object-contain h-[400px]"
                        priority
                      />
                    </CarouselItem>
                    <CarouselItem className="flex items-center justify-center">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/png-clipart-red-and-white-tulips-flowers-white-and-red-tulips-with-ribbon-blue-flower-arranging-removebg-preview%201-uWAZaw6sY1NRp4RrpCF7RVDXcKbyYp.png"
                        alt="Red and white tulips bouquet"
                        width={400}
                        height={400}
                        className="object-contain h-[400px]"
                        priority
                      />
                    </CarouselItem>
                    <CarouselItem className="flex items-center justify-center">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/png-clipart-red-and-white-tulips-flowers-white-and-red-tulips-with-ribbon-blue-flower-arranging-removebg-preview%201%20(1)-CIo9smIKDXOz7zxVKNcvn7ezF9qWlt.png"
                        alt="Yellow tulips bouquet"
                        width={400}
                        height={400}
                        className="object-contain h-[400px]"
                        priority
                      />
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#fd77ab] py-4 px-6 mt-auto relative z-10">
        <div className="mx-auto max-w-screen-xl text-center text-[#ffffff] text-sm">
          © {year} Maram's Secret Garden. All rights reserved.
        </div>
      </footer>
    </main>
  )
}

function QuoteDisplay({ quote }: { quote: string | null }) {
  if (!quote) return null

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-5xl font-light leading-tight tracking-tight text-[#111111] lg:text-6xl">
          <div>
            Daily <span className="text-[#fd77ab]">Tulip</span>
          </div>
          <br />
          <div>{quote}</div>
        </h1>
      </div>
    </div>
  )
}

