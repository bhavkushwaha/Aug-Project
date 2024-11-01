import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono"
import { errorMonitor } from "events";

export const useGetAccounts = ()=>{
    const query = useQuery({
        queryKey : ["accounts"],
        queryFn : async () => {
            const response = await client.api.accounts.$get();

            if(!response.ok){
                return new Error("Failed to fetch accounts");
            }

            const {data} = await response.json();
            return data;
        } 
    });
    return query;
}