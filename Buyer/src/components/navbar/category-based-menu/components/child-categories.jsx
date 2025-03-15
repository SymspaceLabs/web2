import Box from "@mui/material/Box";
import Link from "next/link";

import { H6 } from "../../../../components/Typography";
import Scrollbar from "../../../../components/scrollbar";

import CategoryItem from "./category-item";
import { SubCategoryList } from "../styles";
import { SubCategoryListItem } from "../styles"; // DATA TYPES

export default function ChildCategories({ categories }) {
  return (
    <Scrollbar autoHide={false} sx={{ width: "100%" }}>
      <Box px={6} py={2} height="100%" sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase' }}>
        {categories.child.map((item,index) => (
          <div key={index}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <H6 fontWeight={700} my={3} sx={{ color:'#000' }}>
                {item.title}
              </H6>
              {item?.subTitle?.map((subTitle, subIndex) => (
                <Link href="#" key={subIndex}>
                  <SubCategoryListItem sx={{ marginTop: '24px' }}>
                    {subTitle}
                  </SubCategoryListItem>
                </Link>
              ))}
            </Box>

            <SubCategoryList>
              {item.child.map((sub,index) => (
                <CategoryItem 
                  item={sub} 
                  key={index}
                />
              ))}
            </SubCategoryList>
          </div>
        ))}
      </Box>
    </Scrollbar>
  );
}
// ==============================================================
// export default function ChildCategories({ categories }) {
//   return <Scrollbar autoHide={false} sx={{ width: "100%" }}>
//       <Box px={6} py={2} height="100%" sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase' }}>
//         {categories.child.map((item, key) => <div key={key}>

//           <Box sx={{display:'flex', gap:2}} key={key}>
//             <H6 key={key} fontWeight={700} my={3}>{item.title}</H6>
//             {item?.subTitle?.map((subTitle)=> <Link href="#"><SubCategoryListItem key={subTitle} sx={{marginTop:'24px'}}>{subTitle}</SubCategoryListItem></Link> )}
//           </Box>

//             <SubCategoryList>
//               {item.child.map((sub, key) => <CategoryItem item={sub} key={key} />)}
//             </SubCategoryList>
//           </div>)}
//       </Box>
//     </Scrollbar>;
// }