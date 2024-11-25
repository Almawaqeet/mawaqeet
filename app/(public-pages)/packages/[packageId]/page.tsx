import SingularPackage from "../../_components/packages-page/SingularPackage";




export default async function SingularPackagePage({ params }: { params: { packageId: string } }) {
    return <SingularPackage id={params.packageId} />;
}
