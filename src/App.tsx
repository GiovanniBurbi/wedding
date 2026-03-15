import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import LanguageToggle from './components/LanguageToggle/LanguageToggle'
import HeroSection from './components/HeroSection/HeroSection'
import ScheduleSection from './components/ScheduleSection/ScheduleSection'
import MapSection from './components/MapSection/MapSection'
import PartySection from './components/PartySection/PartySection'
import HoneymoonSection from './components/HoneymoonSection/HoneymoonSection'
import GiftSection from './components/GiftSection/GiftSection'
import PhotoPlaceholder from './components/PhotoPlaceholder/PhotoPlaceholder'

function ThankYouFooter() {
  const { t } = useLanguage();
  return (
    <footer style={{
      padding: 'var(--space-4xl) var(--content-padding)',
      backgroundColor: 'var(--color-ivory)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-xl)',
    }}>
      <div style={{
        width: '280px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
      }}>
        <PhotoPlaceholder alt={t.hero.photoAlt} aspectRatio="4/3" />
      </div>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'var(--font-size-4xl)',
        fontStyle: 'italic',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-champagne)',
        letterSpacing: 'var(--letter-spacing-tight)',
        margin: 0,
      }}>
        {t.footer.seeYouSoon}
      </p>
    </footer>
  );
}

function App() {
  return (
    <LanguageProvider>
      <LanguageToggle />
      <div>
        <HeroSection />
        <ScheduleSection />
        <MapSection />
        <PartySection />
        <HoneymoonSection />
        <GiftSection />
        <ThankYouFooter />
      </div>
    </LanguageProvider>
  )
}

export default App
