import { useQuery } from '@tanstack/react-query';
import { Loader, ShoppingBag } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import api from '../../lib/auth/apiClient';
import useAuthStore from '../../lib/store/useAuthStore';

const SalesPage = () => {
  const { user, token } = useAuthStore();
  
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const { data: sales = [], isLoading, isError, error } = useQuery({
    queryKey: ['sales', isAdmin ? 'allsales' : 'mysales'],
    queryFn: async () => {

      const endpoint = isAdmin ? '/sales/allsales' : '/sales/mysales';
      
      const response = await api.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-red-500 font-medium">
        Error loading sales: {error.response?.data?.message || error.message}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Title & Header Card */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              {isAdmin ? 'All User Sales' : 'My Purchase History'}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {isAdmin
                ? 'Manage and view all transactions across the system.'
                : 'View all your previous purchases and order details.'}
            </p>
          </div>
          <Badge variant={isAdmin ? 'default' : 'secondary'} className="text-sm px-3 py-1">
            {isAdmin ? 'Admin View' : 'Customer View'}
          </Badge>
        </CardHeader>
      </Card>

      {/* Sales Table Container */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          {sales.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ShoppingBag className="mx-auto h-12 w-12 opacity-30 mb-2" />
              <p className="text-lg font-medium">No sales records found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  {isAdmin && <TableHead>Customer</TableHead>}
                  <TableHead>Items Purchased</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale._id}>
                    {/* Order ID */}
                    <TableCell className="font-mono text-xs">
                      #{sale._id ? sale._id.slice(-6).toUpperCase() : 'N/A'}
                    </TableCell>

                    {isAdmin && (
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">
                            {sale.userId?.name || 'Unknown'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {sale.userId?.email || 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                    )}

                    {/* Items List */}
                    <TableCell>
                      <div className="space-y-1">
                        {sale.items?.map((item, idx) => (
                          <div key={idx} className="text-sm">
                            <span className="font-medium">{item.name}</span>{' '}
                            <span className="text-xs text-muted-foreground">
                              x{item.quantity} (${item.price})
                            </span>
                          </div>
                        ))}
                      </div>
                    </TableCell>

                    {/* Total Amount */}
                    <TableCell className="font-bold text-green-600">
                      ${sale.totalAmount?.toFixed(2)}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <Badge
                        variant={
                          sale.status === 'completed'
                            ? 'default'
                            : sale.status === 'pending'
                            ? 'outline'
                            : 'destructive'
                        }
                        className="capitalize"
                      >
                        {sale.status || 'completed'}
                      </Badge>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="text-xs text-muted-foreground">
                      {sale.createdAt ? new Date(sale.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      }) : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesPage;