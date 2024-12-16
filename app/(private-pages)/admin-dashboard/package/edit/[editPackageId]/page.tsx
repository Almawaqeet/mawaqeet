import EditPackagePage from "../../_components/EditPackagePage";

export default function Page ({params} : { params: { editPackageId: string } }) {
    return <EditPackagePage id={params.editPackageId} />
}