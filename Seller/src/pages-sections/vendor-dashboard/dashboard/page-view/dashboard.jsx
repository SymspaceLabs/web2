"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Local CUSTOM COMPONENTS
import Sales from "../sales";
import Card1 from "../card-1";
import Analytics from "../analytics";
import RecentPurchase from "../recent-purchase";
import StockOutProducts from "../stock-out-products";
import DashboardHeader from "../../../customer-dashboard/dashboard-header";
import TicketCard from "../../../customer-dashboard/business-details/ticket-card";

// DATA TYPES
import { IconButton } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import styled from "@mui/material/styles/styled"; // LOCAL CUSTOM HOOK

import { H1 } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { OnboardingDialog } from "@/components/custom-dialogs";
import { SellerProfileDialog } from "@/components/custom-dialogs";
import SimulationOverlay from "@/components/SimulationOverlay";

const DashboardPageView = () => {

  const { user } = useAuth();

  const [onboardingDialogOpen, setOnboardingDialogOpen] = useState(false);
  const [storeDialogOpen, setStoreDialogOpen] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [stockOutProducts, setStockOutProducts] = useState([]);
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [tickets2, setTickets2] = useState(tickets2Data);
  const [collapsed, setCollapsed] = useState(true);
  const [collapsedAnnouncement, setCollapsedAnnouncement] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardData, stockOutData, recentPurchaseData, ticketData] = await Promise.all([]);
        setCardList([]);
        setStockOutProducts(stockOutData);
        setRecentPurchase(recentPurchaseData);
        setTickets(ticketData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user && user.company.isOnboardingFormFilled === false) {
      setOnboardingDialogOpen(true);
    }
  }, [user]);
  

  const handleClick = () => setCollapsed(state => !state);
  const handleAnnouncementToggle = () => setCollapsedAnnouncement(!collapsedAnnouncement);

  return (
    <Box>
      
      {/* Welcome dialog */}
      <OnboardingDialog
        open={onboardingDialogOpen}
        setOpen={setOnboardingDialogOpen}
        setStoreDialogOpen={setStoreDialogOpen}
      />
      
      {/* Seller Profile Dialog */}
      <SellerProfileDialog
        open={storeDialogOpen}
        setOpen={setStoreDialogOpen}
      />

      {/* Simulation overlay - only shows when both dialogs are closed */}
      <SimulationOverlay
        open={!onboardingDialogOpen && !storeDialogOpen}
        setStoreDialogOpen={setStoreDialogOpen}
      />


      <Box px={0} >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 50%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px 15px', overflow:'hidden' }}>
              <Box sx={{ pb:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px  15px' }}>
                  <Box sx={{px:4}}>
                    <DashboardHeader />
                    <Box sx={{p:4, background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px 15px 0px 0px' }}>
                      <H1 fontSize='24px' color='#FFF'>
                        Begin your simulation
                      </H1>
                    </Box>
                    <Box sx={{p:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius:' 0px 0px 15px 15px;' }}>
                      <Box sx={{ display:'flex', justifyContent:'center', width:'100%' }}>
                          <IconButton onClick={handleClick}>
                            <ChevronRightIcon color="disabled" collapsed={collapsed ? 0 : 1} />
                          </IconButton>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{px:4}}>
                    <DashboardHeader />
                    <Box sx={{p:4, background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px 15px 0px 0px' }}>
                      <H1 sx={{ fontSize:'24px', color:'#fff'}}>
                        Announcements
                      </H1>
                    </Box>
                    <Box sx={{p:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius:' 0px 0px 15px 15px;' }}>
                      {collapsedAnnouncement && tickets2.map(item => <TicketCard ticket={item} key={item.id} fontSize="18px" />)}
                      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <IconButton onClick={handleAnnouncementToggle}>
                          <ChevronRightIcon color="disabled" collapsed={collapsedAnnouncement ? 0 : 1} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
              </Box>
            </Box>
          </Grid>

          <Grid container item xs={12} spacing={3}>
            {cardList.map(item => (
              <Grid item  lg={3} md={6} xs={12} key={item.id}>
                <Card1
                  title={item.title}
                  color={item.color}
                  amount1={item.amount1}
                  amount2={item.amount2}
                  percentage={item.percentage}
                  status={item.status === "down" ? "down" : "up"}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Sales />
          </Grid>

          {/* ANALYTICS AREA */}
          <Grid item xs={12}>
            <Analytics />
          </Grid>

          {/* RECENT PURCHASE AREA */}
          <Grid item md={7} xs={12}>
            <RecentPurchase data={recentPurchase} />
          </Grid>

          {/* STOCK OUT PRODUCTS */}
          <Grid item md={5} xs={12}>
            <StockOutProducts data={stockOutProducts} />
          </Grid>
        </Grid>
      </Box>
    </Box>

  );
};

export default DashboardPageView;

const ChevronRightIcon = styled(ChevronRight, {
  shouldForwardProp: prop => prop !== "collapsed"
})(({
  collapsed,
  theme: {
    direction
  }
}) => ({
  fontSize: 25,
  color: "white",
  transform: collapsed ? "rotate(90deg)" : "rotate(-90deg)",
  transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
  ...(collapsed && direction === "rtl" && {
    transform: "rotate(180deg)"
  })
}));

const tickets2Data = [{
  id: "40279d09-b80f-42e2-b271-7febbcab5bf0",
  slug: "form-1",
  title: "SYMSPACE has now partnered with organizations in all 50 states within the u.s.",
  buttonTitle: "Read more",

}, {
  id: "1241aaaa-c801-4ffa-b05f-7379a0012e6f",
  slug: "form-2",
  title: "partners are now able to leverage the automated ad feature to enhance marketing ads",
  buttonTitle: "Try it out",

}, {
  id: "5c609a0c-f695-4d63-8b51-e57d3f0041c0",
  slug: "form-3",
  title: "new categories added to our marketplace",
  buttonTitle: "Explore",
  },
]
