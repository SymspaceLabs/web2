// ======================================================================================
// Form 3
// ======================================================================================

import { useState, useEffect } from 'react';
import { FlexBox } from '@/components/flex-box';
import SurveyForm from '@/components/custom-forms/onboarding/SurveyForm';

// ======================================================================================

function Form3 ({
    setFormData,
    user,
    step,
}) {

    // SURVEY FORM
    const [industry, setIndustry] = useState(user?.survey?.industry);
    const [role, setRole] = useState(user?.survey?.role);
    const [employees, setEmployees] = useState(user?.survey?.employees);
    const [avgReturn, setAvgReturn] = useState(user?.survey?.avgReturn);
    const [highReturn, setHighReturn] = useState(user?.survey?.highReturn);
    const [challenges, setChallenges] = useState(user?.survey?.challenges);
    const [painPoints, setPainPoints] = useState(user?.survey?.painPoints);
    const [arAd, setArAd] = useState(user?.survey?.arAd);
    const [gain, setGain] = useState(user?.survey?.gain);
    const [threeDProduct, setThreeDProduct] = useState(user?.survey?.threeDProduct);
    const [integrate3d, setIntegrate3d] = useState(user?.survey?.integrate3d);
    const [prevAr, setPrevAr] = useState(user?.survey?.prevAr);
    const [arOutcome, setArOutcome] = useState(user?.survey?.arOutcome);
    const [current3d, setCurrent3d] = useState(user?.survey?.current3d);
    const [generate3d, setGenerate3d] = useState(user?.survey?.generate3d);
    const [envision, setEnvision] = useState(user?.survey?.envision);
    const [seekFunction, setSeekFunction] = useState(user?.survey?.seekFunction);
    const [moreInformed, setMoreInformed] = useState(user?.survey?.moreInformed);
    const [conversionRate, setConversionRate] = useState(user?.survey?.conversionRate);
    const [criteria, setCriteria] = useState(user?.survey?.criteria);
    const [concerns, setConcerns] = useState(user?.survey?.concerns);
    const [upcoming, setUpcoming] = useState(user?.survey?.upcoming);
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
