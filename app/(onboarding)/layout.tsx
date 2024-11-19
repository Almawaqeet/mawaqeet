
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-brand-color-subtle pt-[120px]">
      {children}
    </div>
  )
}
