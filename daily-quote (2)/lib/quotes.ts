import { cache } from "react"

interface Quote {
  Quote: string
}

export const getDailyQuote = cache(async (): Promise<Quote> => {
  // Fetch quotes from the provided URL
  const response = await fetch(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tulip_quotes_365-PiDCpUr9mVSebFk7OiGjH2dLtpYpPe.csv",
    { next: { revalidate: 60 } }, // Revalidate every minute
  )
  const csvText = await response.text()

  // Parse CSV (skipping header row)
  const quotes = csvText
    .split("\n")
    .slice(1) // Skip header row
    .filter((line) => line.trim())
    .map((line) => {
      const Quote = line.trim()
      return { Quote }
    })

  // Get today's quote based on the day of the year in Tunisian time
  const tunisianTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Tunis" }))
  const startOfDay = new Date(tunisianTime.getFullYear(), tunisianTime.getMonth(), tunisianTime.getDate())
  const dayOfYear = Math.floor((startOfDay.getTime() - new Date(tunisianTime.getFullYear(), 0, 0).getTime()) / 86400000)

  // Use modulo to cycle through quotes
  const quoteIndex = dayOfYear % quotes.length
  return quotes[quoteIndex]
})

