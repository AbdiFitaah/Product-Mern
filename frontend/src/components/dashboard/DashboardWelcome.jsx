import React from 'react'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const DashboardWelcome = ({ onCreateTask, showCreateForm }) => {
    return (
        <Card className="border-0 shadow-sm bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader className="pb-4">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2 flex flex-col items-start">
                        <CardTitle className="text-2xl">Welcome back!</CardTitle>
                        <CardDescription className="text-base">
                            Here's Abdi what's happening with your tasks today.
                        </CardDescription>
                    </div>
                    {/* Batankan hadda wuxuu si toos ah u furayaa form-ka */}
                    <Button onClick={onCreateTask}>
                        Create New Product
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                {/* Card status */}
            </CardContent>
        </Card>
    )
}

export default DashboardWelcome