// ===========================================================

import Link from "next/link";
import NavAccordion from "./nav-accordion";

// ===========================================================

export default function renderChild(categories, parentTitle = "") {
  return categories.map((item, i) => {
    const isDuplicate = item.title === parentTitle; // Check if title is repeated

    if (item.children && !isDuplicate) {
      return (
        <NavAccordion item={item} key={i}>
          <div className="nested-children">
            {renderChild(item.children, item.title)} {/* Pass current title as parent */}
          </div>
        </NavAccordion>
      );
    }

    return (
      <Link href={`/products?category=${item.slug}`} key={i} className="link">
        {item.title}
      </Link>
    );
  });
}

