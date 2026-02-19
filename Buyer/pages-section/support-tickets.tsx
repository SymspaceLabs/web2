"use client";

// =====================================================
// Support Tickets Page View
// =====================================================

import { useState } from "react";
import { HeadphonesIcon } from "lucide-react";

import TicketCard from "@/components/ticket-card";
import CustomPagination from "@/components/pagination";
import { SymDashboardHeader } from "@/components/sym-dashboard-header";

// =====================================================

interface SupportTicket {
  id: string;
  slug: string;
  title: string;
  type: string;
  status: string;
  date: string;
  category: string;
}

interface SupportTicketsPageViewProps {
  tickets: SupportTicket[];
}

const PAGE_SIZE = 10;

// =====================================================

export default function SupportTicketsPageView({ tickets }: SupportTicketsPageViewProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedTickets = tickets.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div
      className="p-[15px] rounded-[15px] shadow-[0px_1px_24px_-1px_rgba(0,0,0,0.18)] backdrop-blur-[12px] flex flex-col gap-2"
      style={{
        background: "linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)",
      }}
    >
      {/* Header */}
      <SymDashboardHeader
        title="Support Tickets"
        Icon={HeadphonesIcon}
        buttonText="New Ticket"
        onClick={() => {}}
        loading={false}
      />

      {/* Ticket list */}
      <div className="mt-2">
        {paginatedTickets.length === 0 ? (
          <p className="text-center text-sm text-white/70 py-8">
            No support tickets found.
          </p>
        ) : (
          paginatedTickets.map((item) => (
            <TicketCard ticket={item} key={item.id} />
          ))
        )}
      </div>

      {/* Pagination */}
      {tickets.length > PAGE_SIZE && (
        <CustomPagination
          count={Math.ceil(tickets.length / PAGE_SIZE)}
          page={currentPage}
          onChange={setCurrentPage}
        />
      )}
    </div>
  );
}