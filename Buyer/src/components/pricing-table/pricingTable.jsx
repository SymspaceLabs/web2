import { useState } from "react";
import { Grid, Box } from '@mui/material';
import { FlexCol } from "../flex-box";
import PlanCard from './PlanCard';
import PlanToggle from './PlanToggle';

const PricingTable = ({plans, title, theme='light'}) => {
    const [billingCycle, setBillingCycle] = useState("monthly");
    const handleBillingCycleChange = (cycle) => {
        setBillingCycle(cycle);
    };

    return (
        <FlexCol gap={{ xs:5, sm:"75px" }}>
            {/* TOGGLE */}
            <PlanToggle
                title={title}
                subtitle="Save on the yearly plans!"
                onChange={handleBillingCycleChange}
                value={billingCycle}
                theme={theme}
            />

            {/* TABLE */}
            <Grid container spacing={4} alignItems="stretch">
                {plans(billingCycle).map((plan) => (
                    <Grid item xs={12} sm={6} md={3} key={plan.title} >
                        <PlanCard plan={plan} theme={theme} />
                    </Grid>
                ))}
            </Grid>





        </FlexCol>
    )
}

export default PricingTable