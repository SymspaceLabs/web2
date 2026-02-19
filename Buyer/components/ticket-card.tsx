"use client";

// =====================================================
// Support Ticket Card
// =====================================================

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// =====================================================

interface Ticket {
  id: string;
  slug: string;
  title: string;
  type: string;
  status: string;
  date: string;
  category: string;
}

interface TicketCardProps {
  ticket: Ticket;
}

// =====================================================

export default function TicketCard({ ticket }: TicketCardProps) {
  const { id, slug, title, type, status, date, category } = ticket ?? {};

  return (
    <Link href={`/support-tickets/${slug}`} key={id}>
      <div className="flex items-center justify-between px-4 py-3 mb-2 bg-white rounded-[15px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        {/* Left: info */}
        <div className="flex flex-col gap-2 min-w-0">
          <p className="text-sm font-medium text-gray-800 leading-none">
            {title}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {/* Type */}
            <Badge variant="secondary" className="text-xs">
              {type}
            </Badge>

            {/* Status */}
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
              {status}
            </Badge>

            {/* Date */}
            <span className="text-xs text-gray-500 whitespace-pre">
              {date ? format(new Date(date), "MMM dd, yyyy") : "—"}
            </span>

            {/* Category */}
            <span className="text-xs text-gray-500">{category}</span>
          </div>
        </div>

        {/* Right: arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-gray-400 hover:text-gray-600"
          asChild
        >
          <span>
            <ArrowRight className="h-4 w-4" />
          </span>
        </Button>
      </div>
    </Link>
  );
}