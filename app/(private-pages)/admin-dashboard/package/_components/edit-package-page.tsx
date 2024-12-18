'use client'
import { useGetAllActivePackagesById } from "@/api/services/packages";
import SingularPackageToEdit from "./singular-package-to-edit";
import EditPackagePageSkeleton from "./edit -package-page-skeleton";
import { Package } from "@/constants/types";

export default function EditPackagePage ({ id }: { id:string}) {
    const { data: packages, isLoading } = useGetAllActivePackagesById(id);
    
return (
   isLoading || !packages ? <EditPackagePageSkeleton /> : <SingularPackageToEdit packages={packages} id={id}   />
)
}