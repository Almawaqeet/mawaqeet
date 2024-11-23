import { SegregatedPackage } from "@/constants/types";

interface PackageProps {
    pkg: SegregatedPackage;
    theme?: 'light' | 'dark';
  }

export const Package: React.FC<PackageProps> = ({ pkg, theme = 'dark' }) => {
  const themeStyles = {
    light: {
        background: 'bg-white',
        border: 'border-gray-200',
        hoverBorder: 'hover:border-gray-300',
        iconBg: 'bg-gray-100',
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-600',
          tertiary: 'text-gray-500'
        },
        badge: 'bg-gray-100',
        button: 'hover:bg-gray-100'
      },
      dark: {
        background: 'bg-[#1A1A1A]',
        border: 'border-[#333333]',
        hoverBorder: 'hover:border-[#666666]',
        iconBg: 'bg-[#333333]',
        text: {
          primary: 'text-white',
          secondary: 'text-[#CCCCCC]',
          tertiary: 'text-[#666666]'
        },
        badge: 'bg-[#333333]',
        button: 'hover:bg-[#333333]'
      }
    };

    const styles = themeStyles[theme];

    return (
      <div
        className={`${styles.background} p-6 rounded-lg border ${styles.border} ${styles.hoverBorder} transition-all duration-300 flex flex-col h-full`}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-full ${styles.iconBg} flex items-center justify-center`}>
              {pkg.tier === 'STANDARD' && <span className={styles.text.primary}>★</span>}
              {pkg.tier === 'VIP' && <span className={styles.text.primary}>👑</span>}
              {pkg.tier === 'DELUXE' && <span className={styles.text.primary}>💫</span>}
            </div>
            <span className={`text-sm ${styles.text.tertiary} uppercase`}>
              {pkg?.type} - {pkg.tier}
            </span>
            {pkg.tier === 'VIP' && (
              <span className={`text-xs ${styles.badge} ${styles.text.primary} px-2 py-0.5 rounded`}>
                MOST POPULAR
              </span>
            )}
          </div>

          <h3 className={`text-lg font-semibold ${styles.text.primary} mb-1`}>{pkg.cohort}</h3>
          <p className={`text-2xl font-bold ${styles.text.primary} mb-4`}>{pkg.price}</p>
          <p className={`text-sm ${styles.text.tertiary} mb-6`}>{pkg.paymentPlan}</p>

          <ul className="space-y-4">
            {pkg.features?.map((feature, index) => (
              <li key={index} className={`text-sm ${styles.text.secondary} flex items-start gap-2`}>
                <span className={styles.text.tertiary}>•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <button className={`w-full mt-6 py-2 text-sm font-medium ${styles.text.primary} bg-transparent border ${styles.border} rounded ${styles.button} transition-colors duration-300`}>
          Learn more →
        </button>
      </div>
    );
  };
