'use client';

import Image from 'next/image';
import { whiteSpaces } from '@/old-pages/utilities/GlobalSpaces';
import Link from 'next/link';

const Partners = () => {
  return (
    <section className="w-full bg-gradient-to-br from-gray-900 to-brand-color-main py-16 rounded-md">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-white mb-12">
          Our Trusted Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <Link href="https://www.mofa.gov.sa/" target="_blank">
                <Image
                  src={`/images/saudiforeignaffair.png`}
                  className="w-24 h-24 rounded-2xl object-contain bg-white p-2"
                  alt="Saudi Foreign Affairs Logo"
                  width={96}
                  height={96}
                />
                <div>
                  <h3 className="text-xl font-semibold text-white text-left mt-2">
                    Saudi Foreign Affairs
                  </h3>
                  <p className="text-gray-300 mt-1 text-left">
                    Official Government Partner
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <Link
                href="https://cdn.freebiesupply.com/logos/large/2x/iata-logo-png-transparent.png"
                target="_blank"
              >
                <Image
                  src="https://cdn.freebiesupply.com/logos/large/2x/iata-logo-png-transparent.png"
                  className="w-24 h-24 rounded-2xl object-contain bg-white p-2"
                  alt="IATA Logo"
                  width={96}
                  height={96}
                />
                <div>
                  <h3 className="text-xl font-semibold text-white text-left mt-2">
                    IATA
                  </h3>
                  <p className="text-gray-300 mt-1 text-left">
                    International Air Transport Association
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
