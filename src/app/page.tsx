import { getSiteData } from "@/lib/db"
import { PortfolioClient } from "@/components/PortfolioClient"

export const revalidate = 0

export default async function Home() {
  const data = await getSiteData()
  return <PortfolioClient initialData={data} />
}

