
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import {  useQuery } from '@tanstack/react-query'


const useRole = () => {
    const {user,loading}=useAuth()
    const axiosSecure=useAxiosSecure()
  

    const {data:role='',isLoading}=useQuery({
        queryKey:['role',user?.email],
        enabled:!loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/${user?.email}`)
            return data.role
        },
        // refetchInterval: 600000, // refetch every 10 minutes
    })

    //fetch user info using logged in user

    return [role,isLoading];
}

export default useRole;