'use client'

import { Loader2, Plus } from 'lucide-react';

import { useNewCategory } from '@/features/categories/hooks/use-new-category';
import { useBulkDeleteCategories } from '@/features/categories/api/use-bulk-delete-categories';
import { useGetCategories } from '@/features/categories/api/use-get-categories';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { Skeleton } from '@/components/ui/skeleton';

import { columns } from './columns';

const CategoriesPage = ()=>{
    const newCategory = useNewCategory(); 
    const deleteCategories= useBulkDeleteCategories();
    const categoriesQuery = useGetCategories();
    const categories = Array.isArray(categoriesQuery.data) ? categoriesQuery.data : [];

    // const accounts = (!accountsQuery.isError)? (accountsQuery.data || []) : [];

    const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

    if(categoriesQuery.isLoading){
        return (
            <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
                <Card className='border-none drop-shadow-sm'>
                    <CardHeader>
                        <Skeleton className='h-8 w-48' />
                    </CardHeader>
                    <CardContent>
                        <div className='h-[500px] w-full flex items-center justify-center'>
                            <Loader2 className='size-6 text-slate-300 animate-spin'/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle>
                        Categories Page
                    </CardTitle>
                    <Button onClick={newCategory.onOpen} className='font-bold size-sm'>
                        <Plus className='size-5 mr-2' />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable 
                        filterKey='name'    
                        columns={columns} 
                        data={categories}
                        onDelete={(row)=>{
                            const ids = row.map((r)=> r.original.id);
                            deleteCategories.mutate({ ids });
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesPage;