"use client";

// =================================================
// Order Row Component
// =================================================

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currency } from "@/utils/currency";
import { cn } from "@/lib/utils";

// =================================================

interface Order {
  id: string;
  status: string;
  createdAt: string;
  totalAmount: number;
}

interface OrderRowProps {
  order: Order;
}

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

// =================================================

export default function OrderRow({ order }: OrderRowProps) {
  const getStatusVariant = (status: string): BadgeVariant => {
    switch (status) {
      case "Pending":
      case "Processing":
        return "secondary";
      case "Delivered":
        return "default"; // Green success style via custom class below
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const variant = getStatusVariant(order.status);
  const isDelivered = order.status === "Delivered";

  return (
    <Link href={`/orders/${order.id}`}>
      <div
        className={cn(
          "flex items-center justify-between p-3 mb-2 bg-white rounded-[10px]",
          "shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer",
          "gap-4 flex-wrap sm:flex-nowrap"
        )}
      >
        {/* Order ID */}
        <h5 className="text-sm font-semibold text-gray-800 truncate flex-1 min-w-[120px]">
          #{order.id.substring(0, 18)}
        </h5>

        {/* Status Badge */}
        <div className="flex justify-center flex-1 min-w-[120px]">
          <Badge
            variant={variant}
            className={cn(
              "text-xs",
              isDelivered && "bg-green-100 text-green-700 hover:bg-green-100"
            )}
          >
            {order.status}
          </Badge>
        </div>

        {/* Date */}
        <p className="text-sm text-gray-600 text-center flex-1 min-w-[120px]">
          {format(new Date(order.createdAt), "MMM dd, yyyy")}
        </p>

        {/* Total Amount */}
        <p className="text-sm text-gray-600 text-center flex-1 min-w-[120px]">
          {currency(order.totalAmount)}
        </p>

        {/* Arrow (hidden on mobile) */}
        <div className="hidden sm:flex justify-end flex-1 min-w-[120px]">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-gray-600"
            asChild
          >
            <span>
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </div>
    </Link>
  );
}