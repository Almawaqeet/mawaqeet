import EditPackagePage from "../../_components/edit-package-page";


export default function Page ({params} : { params: { editPackageId: string } }) {
    return <EditPackagePage id={params.editPackageId} />
}