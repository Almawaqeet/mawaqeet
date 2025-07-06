import { MetadataRoute } from 'next';
import { about_us_team } from '@/old-pages/contents/about';
import { createServerAxiosInstance } from '@/network/server-constructor';
import { routes } from '@/network/routes';
import { CLIENT_ROUTES } from '@/lib/routes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://almawaqeet.com';

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.home}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.about.index}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.packages.index}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.contact}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.auth.login}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Team member pages
  const teamPages = about_us_team.map((team) => ({
    url: `${baseUrl}${CLIENT_ROUTES.PublicPages.about.details(team.id)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Package pages - fetch from API
  let packagePages: MetadataRoute.Sitemap = [];
  try {
    const packagesResponse = await createServerAxiosInstance(
      routes.packages.showAllActivePackages
    );

    if (packagesResponse?.data?.results) {
      packagePages = packagesResponse.data.results.map((pkg: any) => ({
        url: `${baseUrl}${CLIENT_ROUTES.PublicPages.packages.details(pkg.slug || pkg.id)}`,
        lastModified: new Date(pkg.updated_at || pkg.created_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Error fetching packages for sitemap:', error);
  }

  // Onboarding pages
  const onboardingPages = [
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.onboarding.newUser}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.onboarding.stepOne}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.onboarding.stepTwo}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.onboarding.stepThree}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.auth.password.stepOne}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.auth.password.stepTwo}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}${CLIENT_ROUTES.PublicPages.auth.password.stepThree}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  return [...staticPages, ...teamPages, ...packagePages, ...onboardingPages];
}
