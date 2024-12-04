import { useAppQueryWithPaginationAndParams } from "@/api/client-constructor";
import { routes } from "@/api/routes";
import { PaginatedResponse, User } from "@/api/types";




export const useGetAllRegisteredUsers = (params?: {page: number, name?: string, email?: string}) => {
    return useAppQueryWithPaginationAndParams<PaginatedResponse<User>>({
        apiRoute: routes.users.getUsers,
        queryKey: ['ALL_REGISTERED_USERS', params?.page ?? 1, params?.name ?? '', params?.email ?? ''],
        params: params
    });
}
