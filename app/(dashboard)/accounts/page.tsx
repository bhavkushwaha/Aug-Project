'use client'

import { Plus } from 'lucide-react';

import { useNewAccount } from '@/features/accounts/hooks/use-new-account';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { DataTable } from '@/components/data-table';

import { columns, Payment } from './columns';


const data : Payment[] = [
    {
        id: "728ed52f",
        amount: 100, 
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "728ed52fde",
        amount: 200, 
        status: "success",
        email: "ajn@example.com",
    }
]

const AccountsPage = ()=>{
    const newAccount = useNewAccount(); 

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle>
                        Accounts Page
                    </CardTitle>
                    <Button onClick={newAccount.onOpen} className='font-bold size-sm'>
                        <Plus className='size-5 mr-2' />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable 
                        filterKey='email'    
                        columns={columns} 
                        data={data}
                        onDelete={()=>{}}
                        disabled={false}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage;