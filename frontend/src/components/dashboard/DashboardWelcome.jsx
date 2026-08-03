import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Package, Sparkles, TrendingUp } from 'lucide-react'

const DashboardWelcome = ({ onCreateTask, showCreateForm }) => {
    return (
        <Card className="relative overflow-hidden border border-border/50 shadow-md bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl">
            {/* Background Decorative Glow Effects */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <CardHeader className="relative z-10 p-5 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Title & Welcome Info */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-white/10 text-blue-200 border-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                Store Catalog Center
                            </Badge>
                        </div>

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                                Welcome back, Abdi 👋
                            </h1>
                            <CardDescription className="text-slate-300 text-sm sm:text-base mt-1 max-w-xl">
                                Manage your inventory, track product performance, and launch new products to your store.
                            </CardDescription>
                        </div>

                        {/* Quick Stats/Badges */}
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                                <Package className="w-3.5 h-3.5 text-blue-400" />
                                <span>Inventory Active</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Sales Live</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 pt-2 md:pt-0">
                        <Button 
                            onClick={onCreateTask}
                            size="lg"
                            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 rounded-xl px-6 py-6 cursor-pointer border border-white/10 group"
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            Create New Product
                        </Button>
                    </div>

                </div>
            </CardHeader>
        </Card>
    )
}

export default DashboardWelcome