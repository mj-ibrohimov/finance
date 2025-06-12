import { Hero } from '@/components/home/hero';
import { Features } from '@/components/home/features';
import { StockTicker } from '@/components/home/stock-ticker';
import { LatestNews } from '@/components/home/latest-news';
import { TeamPreview } from '@/components/home/team-preview';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <StockTicker />
      <Features />
      <TeamPreview />
      <LatestNews />
      <Footer />
    </div>
  );
}