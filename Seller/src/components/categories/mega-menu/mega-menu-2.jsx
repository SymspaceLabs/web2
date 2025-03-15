// LOCAL CUSTOM COMPONENTS
// import OfferBanner from "./banner";
import ColumnList from "./column-list";
import CategoryMenuItem from "../category-list-item"; // STYLED COMPONENT

import { StyledRoot } from "./styles"; // DATA TYPE

// =======================================================================
export default function MegaMenu2({
  data
}) {
  return <StyledRoot elevation={2}>
      {data.map(item =>
        <CategoryMenuItem
          href={item.href}
          icon={item.icon}
          key={item.title}
          title={item.title} 
          caret={!!item.children}
          render={<ColumnList minWidth={550} list={item.children} />} 
        />
      )}
    </StyledRoot>;
}