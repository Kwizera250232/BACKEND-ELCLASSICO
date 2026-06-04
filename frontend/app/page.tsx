import { PremiumHome } from '@/components/sections/premium-home';
import { getHomeData } from '@/lib/home-data';
import { getHomepagePayload } from '@/lib/homepage-api';

export default async function HomePage() {
  const [data, homepage] = await Promise.all([getHomeData(), getHomepagePayload()]);

  return <PremiumHome data={data} homepage={homepage} />;
}
