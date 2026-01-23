import FeaturesSection from '@shared/components/FeaturesSection';
import CreateSecret from '@features/CreateSecret';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { useConfig } from '@shared/hooks/useConfig';
import Navbar from '@shared/components/Navbar';
import Prefetcher from '@features/display-secret/Prefetcher';
import Upload from '@features/Upload';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { DISABLE_UPLOAD, PRIVACY_NOTICE_URL, IMPRINT_URL } = useConfig();
  const { t } = useTranslation();
  const hasPrivacyNotice = Boolean(PRIVACY_NOTICE_URL && PRIVACY_NOTICE_URL.trim());
  const hasImprint = Boolean(IMPRINT_URL && IMPRINT_URL.trim());
  const showLinks = hasPrivacyNotice || hasImprint;
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <HashRouter>
        <Navbar />

        {/* Main Content */}
        <div className="container mx-auto mb-auto px-4 py-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <Routes>
                <Route path="/" element={<CreateSecret />} />
                {!DISABLE_UPLOAD && (
                  <Route path="/upload" element={<Upload />} />
                )}
                <Route
                  path="/:format/:key/:password"
                  element={<Prefetcher />}
                />
                <Route path="/:format/:key" element={<Prefetcher />} />
              </Routes>
            </div>
          </div>
          <FeaturesSection />
        </div>
      </HashRouter>
      {/* Footer */}
      <footer className="bg-base-100 border-t border-base-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center space-y-4">
            {showLinks && (
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                {hasPrivacyNotice && (
                  <a
                    href={PRIVACY_NOTICE_URL}
                    className="text-base-content/70 hover:text-primary transition-colors duration-200 underline decoration-dotted underline-offset-4 hover:decoration-solid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('footer.privacyNotice')}
                  </a>
                )}
                {hasPrivacyNotice && hasImprint && (
                  <span className="text-base-content/40">•</span>
                )}
                {hasImprint && (
                  <a
                    href={IMPRINT_URL}
                    className="text-base-content/70 hover:text-primary transition-colors duration-200 underline decoration-dotted underline-offset-4 hover:decoration-solid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('footer.imprint')}
                  </a>
                )}
              </div>
            )}
            <div className="text-xs font-medium tracking-wide text-base-content/60">
              {t('footer.createdBy')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
