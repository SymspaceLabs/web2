

import { Span } from "@/components/Typography";
import { Fragment, useState, useEffect  } from "react";
import { Checkbox, Collapse,FormControlLabel } from "@mui/material";
import AccordionHeader from "@/components/accordion/accordion-header";

export const CategoryAccordion = ({ data, setCheckedCategoryIds }) => {
  const [checkedMap, setCheckedMap] = useState({});

  useEffect(() => {
    const selectedIds = Object.entries(checkedMap)
      .filter(([, checked]) => checked)
      .map(([id]) => id);
    setCheckedCategoryIds(selectedIds);
  }, [checkedMap, setCheckedCategoryIds]);

  const onCheck = (itemId) => {
    setCheckedMap(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const renderCategory = (categories) =>
    categories.map((cat) => {
      const catKey = `cat-${cat.id}`;

      return (
        <Fragment key={catKey}>
          {/* Always show category header (optional click handler) */}
          <AccordionHeader
            open={true} // always open
            sx={{ pl: 0 }}
          >
            <Span sx={{ fontWeight: 'bold' }}>{cat.title}</Span>
          </AccordionHeader>

          {/* Always show subcategories */}
          <Collapse in={true}>
            {cat.subCategory.map((sub) => {
              const subKey = `sub-${sub.subcategoryItem.id}`;
              return (
                <FormControlLabel
                  key={subKey}
                  sx={{ pl: 3 }}
                  control={
                    <Checkbox
                      checked={!!checkedMap[sub.subcategoryItem.id]}
                      onChange={() => onCheck(sub.subcategoryItem.id)}
                      size="small"
                    />
                  }
                  label={sub.subcategoryItem.name}
                />
              );
            })}
          </Collapse>
        </Fragment>
      );
    });

  return <>{renderCategory(data)}</>;
};