import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/letnapark/Header';
import Hero from '@/components/letnapark/Hero';
import Intro from '@/components/letnapark/Intro';
import BasicInfo from '@/components/letnapark/BasicInfo';
import HoursSection from '@/components/letnapark/HoursSection';
import TicketsSection from '@/components/letnapark/TicketsSection';
import TransportSection from '@/components/letnapark/TransportSection';
import InfoSection from '@/components/letnapark/InfoSection';
import RouteSection from '@/components/letnapark/RouteSection';
import PhotoSpotsSection from '@/components/letnapark/PhotoSpotsSection';
import HotelsSection from '@/components/letnapark/HotelsSection';
import Gallery from '@/components/letnapark/Gallery';
import Reviews from '@/components/letnapark/Reviews';
import MapEmbed from '@/components/letnapark/MapEmbed';
import Recommendations from '@/components/letnapark/Recommendations';
import Footer from '@/components/letnapark/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <InfoSection />
        <RouteSection />
        <PhotoSpotsSection />
        <HotelsSection />
        <Gallery />
        <Reviews />
        <MapEmbed />
        <Recommendations />
      </main>
      <Footer />
    </>
  );
}
