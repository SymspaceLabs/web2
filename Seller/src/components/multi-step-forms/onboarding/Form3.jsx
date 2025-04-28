// ======================================================================================
// Form 3
// ======================================================================================

import { useState, useEffect } from 'react';
import { GlassBanner } from '@/components/custom-banner';
import SurveyForm from '@/components/custom-forms/onboarding/SurveyForm';
import { FlexBox, FlexCol, FlexColCenter } from '@/components/flex-box';
import { H1 } from '@/components/Typography';
import { Button } from '@mui/material';

// ======================================================================================

function Form3 ({
    setFormData,
    user,
    step,
    handleContinue
}) {

    // SURVEY FORM
    const [industry, setIndustry] = useState(user?.survey?.industry || '');
    const [role, setRole] = useState(user?.survey?.role || '');
    const [employees, setEmployees] = useState(user?.survey?.employees || '');
    const [avgReturn, setAvgReturn] = useState(user?.survey?.avgReturn);
    const [highReturn, setHighReturn] = useState(user?.survey?.highReturn);
    const [challenges, setChallenges] = useState(user?.survey?.challenges);
    const [painPoints, setPainPoints] = useState(user?.survey?.painPoints);
    const [arAd, setArAd] = useState(user?.survey?.arAd);
    const [gain, setGain] = useState(user?.survey?.gain);
    const [threeDProduct, setThreeDProduct] = useState(user?.survey?.threeDProduct);
    const [integrate3d, setIntegrate3d] = useState(user?.survey?.integrate3d);
    const [prevAr, setPrevAr] = useState(user?.survey?.prevAr || '');
    const [arOutcome, setArOutcome] = useState(user?.survey?.arOutcome);
    const [current3d, setCurrent3d] = useState(user?.survey?.current3d || '');
    const [generate3d, setGenerate3d] = useState(user?.survey?.generate3d || '');
    const [envision, setEnvision] = useState(user?.survey?.envision);
    const [seekFunction, setSeekFunction] = useState(user?.survey?.seekFunction);
    const [moreInformed, setMoreInformed] = useState(user?.survey?.moreInformed);
    const [conversionRate, setConversionRate] = useState(user?.survey?.conversionRate);
    const [criteria, setCriteria] = useState(user?.survey?.criteria);
    const [concerns, setConcerns] = useState(user?.survey?.concerns || '');
    const [upcoming, setUpcoming] = useState(user?.survey?.upcoming || '');
    const [question, setQuestion] = useState(user?.survey?.question);

    useEffect(() => {
        setIndustry(user?.survey?.industry || "");
        setRole(user?.survey?.role || "");
        setEmployees(user?.survey?.employees || "");
        setAvgReturn(user?.survey?.avgReturn || "");
        setHighReturn(user?.survey?.highReturn || "");
        setChallenges(user?.survey?.challenges || "");
        setPainPoints(user?.survey?.painPoints || "");
        setArAd(user?.survey?.arAd || "");
        setGain(user?.survey?.gain || "");
        setThreeDProduct(user?.survey?.threeDProduct || "");
        setIntegrate3d(user?.survey?.integrate3d || "");
        setPrevAr(user?.survey?.prevAr || "");
        setArOutcome(user?.survey?.arOutcome || "");
        setCurrent3d(user?.survey?.current3d || "");
        setGenerate3d(user?.survey?.generate3d || "");
        setEnvision(user?.survey?.envision || "");
        setSeekFunction(user?.survey?.seekFunction || "");
        setMoreInformed(user?.survey?.moreInformed || "");
        setConversionRate(user?.survey?.conversionRate || "");
        setCriteria(user?.survey?.criteria || "");
        setConcerns(user?.survey?.concerns || "");
        setUpcoming(user?.survey?.upcoming || "");
        setQuestion(user?.survey?.question || "");
    }, [user]); // Depend on `user` so it updates after submission

    
    // Update formData whenever state changes
    useEffect(() => {
        setFormData({
            "survey": {
                industry,
                role,
                employees,
                avgReturn,
                highReturn,
                challenges,
                painPoints,
                arAd,
                gain,
                threeDProduct,
                integrate3d,
                prevAr,
                arOutcome,
                current3d,
                generate3d,
                envision,
                seekFunction,
                moreInformed,
                conversionRate,
                criteria,
                concerns,
                upcoming,
                question,
            }

        });
    }, [ industry, role, employees, avgReturn, highReturn, challenges, painPoints, arAd, gain, threeDProduct, integrate3d,
        prevAr,
        arOutcome,
        current3d,
        generate3d,
        envision,
        seekFunction,
        moreInformed,
        conversionRate,
        criteria,
        concerns,
        upcoming,
        question]);
    
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            {/* Banner Card 1 */}
            <GlassBanner>
                <FlexBox flexDirection={{ xs:'column', sm:'row' }} justifyContent='space-between' gap={2}>
                    <FlexCol>
                        <H1 fontSize={{xs:14, sm:16}} color="#FFF" pb={1} >
                            complete this survey to unlock early adopter perks, including discounted pricing and a reduced 5% marketplace fee for products sold through our ar application—helping you increase sales and enhance consumer engagement.
                        </H1>
                    </FlexCol>
                    <FlexColCenter sx={{ maxWidth:{xs:'100%', sm:'350px'} }}>
                        <Button sx={styles.btn} onClick={handleContinue}>
                            skip
                        </Button>
                    </FlexColCenter>
                </FlexBox>
            </GlassBanner>

            <SurveyForm
                industry={industry}
                setIndustry={setIndustry}
                role={role}
                setRole={setRole}
                employees={employees}
                setEmployees={setEmployees}
                avgReturn={avgReturn}
                setAvgReturn={setAvgReturn}
                highReturn={highReturn}
                setHighReturn={setHighReturn}
                challenges={challenges}
                setChallenges={setChallenges}
                painPoints={painPoints}
                setPainPoints={setPainPoints}
                arAd={arAd}
                setArAd={setArAd}
                gain={gain}
                setGain={setGain}
                threeDProduct={threeDProduct}
                setThreeDProduct={setThreeDProduct}
                integrate3d={integrate3d}
                setIntegrate3d={setIntegrate3d}
                prevAr={prevAr}
                setPrevAr={setPrevAr}
                arOutcome={arOutcome}
                setArOutcome={setArOutcome}
                current3d={current3d}
                setCurrent3d={setCurrent3d}
                generate3d={generate3d}
                setGenerate3d={setGenerate3d}
                envision={envision}
                setEnvision={setEnvision}
                seekFunction={seekFunction}
                setSeekFunction={setSeekFunction}
                moreInformed={moreInformed}
                setMoreInformed={setMoreInformed}
                conversionRate={conversionRate}
                setConversionRate={setConversionRate}
                criteria={criteria}
                setCriteria={setCriteria}
                concerns={concerns}
                setConcerns={setConcerns}
                upcoming={upcoming}
                setUpcoming={setUpcoming}
                question={question}
                setQuestion={setQuestion}
            />

        </FlexBox>
    );
}

export default Form3;

const styles = {
    bannerButton : { 
        background:'linear-gradient(97.04deg, #666666 0%, #1D1D1D 100%)',
        borderRadius: '50px',
        px:5,
        py:1.5,
        color: '#fff',
        fontSize:{ xs:12, sm:14 },
        border:'1px solid #FFF',
        minWidth:{sm:'200px'}
    },
    btn: {
        background: 'linear-gradient(94.44deg, #666666 29%, #000000 100%)',
        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(50px)',
        borderRadius: '30px',
        color: '#FFF',
        px: 2,
        fontSize: { xs: 12, sm: 16 },
        fontWeight: 500,
        '&:hover': {
            background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
        }
    }
}
