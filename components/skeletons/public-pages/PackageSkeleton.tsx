'use client';

interface PackageSkeletonProps {
  theme?: 'light' | 'dark';
}

const PackageSkeleton: React.FC<PackageSkeletonProps> = ({
  theme = 'dark',
}) => {
  const themeStyles = {
    light: {
      background: 'bg-white',
      border: 'border-gray-200',
      skeleton: 'bg-gray-100',
    },
    dark: {
      background: 'bg-[#1A1A1A]',
      border: 'border-[#333333]',
      skeleton: 'bg-[#333333]',
    },
  };

  const styles = themeStyles[theme];

  return (
    <div
      className={`${styles.background} p-6 rounded-lg border ${styles.border} flex flex-col h-full animate-pulse`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-6 h-6 rounded-full ${styles.skeleton}`} />
          <div className={`h-4 w-32 ${styles.skeleton} rounded`} />
          <div className={`h-4 w-20 ${styles.skeleton} rounded`} />
        </div>

        <div className={`h-6 w-48 ${styles.skeleton} rounded mb-1`} />
        <div className={`h-8 w-36 ${styles.skeleton} rounded mb-4`} />
        <div className={`h-4 w-40 ${styles.skeleton} rounded mb-6`} />

        <ul className="space-y-4">
          {[1, 2].map((_, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className={`h-2 w-2 mt-2 rounded-full ${styles.skeleton}`} />
              <div className={`h-4 w-full ${styles.skeleton} rounded`} />
            </li>
          ))}
        </ul>
      </div>

      <div className={`w-full h-10 mt-6 ${styles.skeleton} rounded`} />
    </div>
  );
};

export default PackageSkeleton;
