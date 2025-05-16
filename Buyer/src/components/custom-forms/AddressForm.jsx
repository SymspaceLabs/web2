import { FlexBox } from '@/components/flex-box';
import { SymTextField, SymAutoComplete } from '@/components/custom-inputs';
import countryList from 'data/countryList';

export default function AddressForm({ 
  data,
  onChange,
  color="#FFF"
}) {

  const handleChange = (field, value) => {
    onChange(field, value); // ✅ Only pass field and value
  };


  return (
    <FlexBox flexDirection="column" gap={3} sx={{ width: '100%' }}>
      <SymTextField
        title="Address"
        color={color}
        value={data.address1}
        placeholder="Address Line 1"
        onChange={(e) => handleChange('address1', e.target.value)}
      />

      <SymTextField
        title="Address Line 2 (Optional)"
        color={color}
        value={data.address2}
        placeholder="Address Line 2"
        onChange={(e) => handleChange('address2', e.target.value)}
      />

      <FlexBox justifyContent="center" flexDirection={{ xs: "column", sm: "row" }} gap={3}>
        <SymTextField
          title="City"
          color={color}
          value={data.city}
          placeholder="City"
          onChange={(e) => handleChange('city', e.target.value)}
        />
        <SymTextField
          title="State"
          color={color}
          value={data.state}
          placeholder="State"
          onChange={(e) => handleChange('state', e.target.value)}
        />
        <SymAutoComplete
          title="Country"
          color={color}
          placeholder="Country"
          value={data.country}
          onChange={(val) => handleChange('country', val)}
          options={countryList}
        />
        <SymTextField
          title="Zip Code"
          color={color}
          value={data.zip}
          placeholder="Zip Code"
          onChange={(e) => handleChange('zip', e.target.value)}
        />
      </FlexBox>
    </FlexBox>
  );
}
