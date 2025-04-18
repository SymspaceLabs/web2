// =============================================================
// Bank Account Form
// =============================================================

import { FlexBox } from '@/components/flex-box';
import { SymTextField, SymDropdown, SymRadio, SymMultiSelectDropdown } from '@/components/custom-inputs';

// =============================================================

function SurveyForm ({
    industry,
    setIndustry,
    role,
    setRole,
    employees,
    setEmployees,
    avgReturn,
    setAvgReturn,
    highReturn,
    setHighReturn,
    challenges,
    setChallenges,
    painPoints,
    setPainPoints,
    arAd,
    setArAd,
    gain,
    setGain,
    threeDProduct,
    setThreeDProduct,
    integrate3d,
    setIntegrate3d,
    prevAr,
    setPrevAr,
    arOutcome,
    setArOutcome,
    current3d,
    setCurrent3d,
    generate3d,
    setGenerate3d,
    envision,
    setEnvision,
    seekFunction,
    setSeekFunction,
    moreInformed,
    setMoreInformed,
    conversionRate,
    setConversionRate,
    criteria,
    setCriteria,
    concerns,
    setConcerns,
    upcoming,
    setUpcoming,
    question,
    setQuestion,
}) {
           
    return (
        <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
            
            <SymDropdown
                title="What is your company's primary industry?"
                value={industry} placeholder="Select an Option"
                onChange={(e) => setIndustry(e.target.value)}
                options={options.industry}
                hasOthersOption={true}
            />

            <SymDropdown
                title="What is your role within the company?"
                value={role}
                placeholder="Select an Option"
                onChange={(e) => setRole(e.target.value)}
                options={options.role}
                hasOthersOption={true}
            />

            <SymDropdown
                title="How many employees does your company have?"
                value={employees}
                placeholder="Select an Option"
                onChange={(e) => setEmployees(e.target.value)}
                options={options.employees}
            />

            <SymRadio 
                title="Are you aware that the average return rate for online purchases is around 35%?"
                selectedValue={avgReturn}
                onChange={(e) => setAvgReturn(e.target.value)}
                options={options.yesNo}
            />

            <SymRadio 
                title="Have you experienced high return rates due to customers receiving products that differ from their expectations?"
                selectedValue={highReturn}
                onChange={(e) => setHighReturn(e.target.value)}
                options={options.yesNo}
            />

            <SymMultiSelectDropdown
                title="What challenges are you currently facing in product marketing and customer engagement? (Select all that apply)" 
                selectedValue={Array.isArray(challenges) ? challenges : (challenges ? JSON.parse(challenges) : [])}
                handleChange={(e) => setChallenges(e.target.value)}
                options={options.challenges ?? []}
                hasOthersOption={true}
            />

            <SymMultiSelectDropdown
                title="What are your biggest pain points regarding product returns? (Select all that apply)"
                selectedValue={Array.isArray(painPoints) ? painPoints : JSON.parse(painPoints || "[]")} 
                handleChange={(e) => setPainPoints(e.target.value)} 
                options={options.painPoints ?? []}
            />

            <SymRadio 
                title="Did you know that products advertised with AR have a 94% higher conversion rate compared to those without?"
                selectedValue={arAd}
                onChange={(e) => setArAd(e.target.value)}
                options={options.yesNo}
            />

            <SymRadio 
                title="Are you interested in gaining a competitive advantage in the market by leveraging AR to potentially increase your product conversion rates?"
                selectedValue={gain}
                onChange={(e) => setGain(e.target.value)}
                options={[...options.yesNo, 'Maybe']}
            />

            <SymRadio 
                title="Were you aware that 3D product visuals can lead to a 5% decrease in return rates?"
                selectedValue={threeDProduct}
                onChange={(e) => setThreeDProduct(e.target.value)}
                options={options.yesNo}
            />

            <SymRadio 
                title="Would you consider integrating 3D models into your product listings to enhance customer understanding and reduce returns?"
                selectedValue={integrate3d}
                onChange={(e) => setIntegrate3d(e.target.value)}
                options={[...options.yesNo, 'Maybe']}
            />

            <SymDropdown
                title="Have you previously used AR or VR to improve sales, boost consumer engagement, or reduce returns?"
                value={prevAr}
                placeholder="Select an Option"
                onChange={(e) => setPrevAr(e.target.value)}
                options={options.prevAr}
            />

            <SymMultiSelectDropdown
                title="If yes, what were the outcomes of implementing these technologies? (Select all that apply)"
                selectedValue={Array.isArray(arOutcome) ? arOutcome : JSON.parse(arOutcome || "[]")} 
                handleChange={(e) => setArOutcome(e.target.value)} 
                options={options.arOutcome ?? []}
            />

            <SymDropdown
                title="Do you currently have 3D models of your product inventory?"
                value={current3d}
                placeholder="Select an Option"
                onChange={(e) => setCurrent3d(e.target.value)}
                options={options.current3d}
            />

            <SymDropdown
                title="Are you interested in generating high-quality 3D models of your product catalog?"
                value={generate3d}
                placeholder="Select an Option"
                onChange={(e) => setGenerate3d(e.target.value)}
                options={options.generate3d}
            />

            <SymMultiSelectDropdown
                title="How do you envision Symspace’s platform helping you with your business? (Select all that apply)"
                selectedValue={Array.isArray(envision) ? envision : JSON.parse(envision || "[]")} 
                handleChange={(e) => setEnvision(e.target.value)} 
                options={options.envision ?? []}
                hasOthersOption={true}
            />

            <SymMultiSelectDropdown
                title="What specific features or functionalities are you seeking in an AR platform? (Select all that apply)"
                selectedValue={Array.isArray(seekFunction) ? seekFunction : JSON.parse(seekFunction || "[]")} 
                handleChange={(e) => setSeekFunction(e.target.value)} 
                options={options.seekFunction ?? []}
                hasOthersOption={true}
            />

            <SymRadio 
                title="Are you aware that 3D product visuals create a more informed and satisfied consumer base, driving higher conversion rates and lowering product return rates?"
                selectedValue={moreInformed}
                onChange={(e) => setMoreInformed(e.target.value)}
                options={options.yesNo}
            />

            <SymRadio 
                title="Did you know that retailers using AR/AI see a 40% increase in conversion rates and a 20% increase in average order value compared to those not using these technologies?"
                selectedValue={conversionRate}
                onChange={(e) => setConversionRate(e.target.value)}
                options={options.yesNo}
            />

            <SymMultiSelectDropdown
                title="What criteria are most important to your team when selecting an AR platform? (Select all that apply)"
                selectedValue={Array.isArray(criteria) ? criteria : JSON.parse(criteria || "[]")} 
                handleChange={(e) => setCriteria(e.target.value)} 
                options={options.criteria ?? []}
                hasOthersOption={true}
            />

            <SymDropdown
                title="What concerns or barriers are preventing you from adopting AR sooner?"
                value={concerns}
                placeholder="Select an Option"
                onChange={(e) => setConcerns(e.target.value)}
                options={options.concerns}
                hasOthersOption={true}
            />

            <SymDropdown
                title="Are there any upcoming projects or product launches where AR integration would be beneficial?"
                value={upcoming}
                placeholder="Select an Option"
                onChange={(e) => setUpcoming(e.target.value)}
                options={options.upcoming}
            />

            <SymTextField
                title="Do you have any specific questions, comments, or ideas about AR integration with symspace?"
                value={question}
                placeholder="Elaborate on questions, comments, or ideas"
                onChange={(e) => setQuestion(e.target.value)}
            />


        </FlexBox>
    );
}

export default SurveyForm;


const options = {
    industry : [
        "Fashion & Apparel",
        "Home & Furniture",
        "Consumer Electronics",
        "Beauty & Cosmetics",
        "Automotive & Accessories",
        "Retail & E-commerce",
        // "Other (please specify)",
    ],
    role : [
        'Founder / C-Suite',
        'Marketing Team ',
        'Product Team',
        'Sales Team',
        // 'Other (please specify)'
        
    ],
    employees : [
        '1-10',
        '11-50',
        '51-200',
        '201-500',
        '500+'
    ],
    challenges : [
        'High return rates due to sizing issues',
        'Lack of realistic product visuals',
        'Difficulty showcasing products online',
        'Low customer engagement with product pages',
        'Limited access to 3D models or AR experiences',
        // 'Other (please specify)',
    ],
    painPoints : [
        'High return costs impacting profitability',
        'Frequent returns due to incorrect sizing',
        'Difficulty reselling returned items',
        'Poor customer experience leading to dissatisfaction',
        'No clear data on why returns happen',
        'Returns aren’t a major concern for us',
    ],
    prevAr : [
        'Yes, currently using AR/VR solutions',
        'Yes, but not continuing use ',
        'No, but interested in exploring AR/VR',
        'No, and not a priority right now'
    ],
    arOutcome : [
        'Increased sales and conversions',
        'Reduced product return rates',
        'Improved customer engagement and satisfaction',
        'No significant impact',
        'N/A',
    ],
    current3d : [
        'Yes, we have high-quality 3D models',
        'Yes, but they need improvements',
        'No, but we are considering it',
        'No, and not a priority right now',
    ],
    generate3d : [
        'Yes, we are actively looking for solutions',
        'Yes, but we are still researching options',
        'No, and not a priority right now',
    ],
    envision : [
        'Virtual try-on experiences for customers',
        '3D product visuals for online stores',
        'Interactive AR experiences for consumer engagement & marketing campaigns',
        'Reducing returns with AR sizing recommendations',
        'Expanding product marketing to underserved communities ',
        // 'Other (please specify)',
    ],
    seekFunction : [
        'True-to-size product visualization',
        'AI-powered sizing recommendations',
        'Custom branding for AR experiences',
        'Integration with existing online store',
        // 'Other (please specify)',
    ],
    criteria : [
        'Ease of integration',
        'Cost-effectiveness',
        'Customer experience improvement',
        'Profitability from AR integration',
        'Scalability and flexibility',
        // 'Other (please specify)',
    ],
    concerns : [
        'High implementation costs',
        'Lack of internal technical expertise',
        'Unclear return on investment (ROI)',
        'Concern about customer adoption of AR',
        'Integration complexity with our current system',
        // 'Other (please specify)',
    ],
    upcoming : [
        'Yes, within the next 3 months',
        'Yes, within the next 6 months',
        'No upcoming projects at the moment',
    ],
    yesNo: [
        "Yes",
        "No"
    ],
}
