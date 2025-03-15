import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT
import Scrollbar from "../../../../components/scrollbar"; // Local CUSTOM COMPONENT
import SidebarAccordion from "./sidebar-accordion"; // LOCAL CUSTOM HOOKS
import { useLayout } from "../dashboard-layout-context"; // SIDEBAR NAVIGATION LIST
import { navigation } from "../dashboard-navigation"; // STYLED COMPONENTS
import { ListLabel, BadgeValue, StyledText, BulletIcon, ExternalLink, NavItemButton, ListIconWrapper } from "./styles";
import { useState } from "react";

export default function MultiLevelMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { COMPACT, TOP_HEADER_AREA, handleCloseMobileSidebar } = useLayout();

  // State to track the currently open accordion
  const [activeAccordion, setActiveAccordion] = useState(null); // Store only one active accordion at a time

  const activeRoute = (path) => (pathname === path ? 1 : 0);

  const handleNavigation = (path, event) => {
    event.stopPropagation(); // Prevent parent accordion toggle
    router.push(path);
    handleCloseMobileSidebar();
  };

  // Toggle accordion
  const handleAccordionToggle = (index) => {
    setActiveAccordion((prevIndex) => (prevIndex === index ? null : index)); // Only one accordion is open at a time
  };

  const renderLevels = (data, parentIndex = "") => {
    return data.map((item, index) => {
      const accordionIndex = `${parentIndex}-${index}`; // Create unique index for each accordion

      if (item.type === "label") {
        return (
          <ListLabel key={accordionIndex} compact={COMPACT}>
            {item.label}
          </ListLabel>
        );
      }

      if (item.children) {
        return (
          <SidebarAccordion
            key={accordionIndex}
            item={item}
            isOpen={activeAccordion === accordionIndex} // Only open if this accordion is active
            onToggle={() => handleAccordionToggle(accordionIndex)} // Toggle the accordion
          >
            {/* Recursive call to render the child levels */}
            {renderLevels(item.children, accordionIndex)}
          </SidebarAccordion>
        );
      }

      if (item.type === "extLink") {
        return (
          <ExternalLink key={accordionIndex} href={item.path} rel="noopener noreferrer" target="_blank">
            <NavItemButton key={item.name} name="child" active={0}>
              {item.icon ? (
                <ListIconWrapper>
                  <item.icon />
                </ListIconWrapper>
              ) : (
                <span className="item-icon icon-text">{item.iconText}</span>
              )}

              <StyledText compact={COMPACT}>{item.name}</StyledText>

              {item.badge ? <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue> : null}
            </NavItemButton>
          </ExternalLink>
        );
      }

      return (
        <NavItemButton
          key={accordionIndex}
          className="navItem"
          active={activeRoute(item.path)}
          onClick={(event) => handleNavigation(item.path, event)} // Ensure it doesn't collapse its parent
        >
          {item?.icon ? (
            <ListIconWrapper>
              <item.icon />
            </ListIconWrapper>
          ) : (
            <BulletIcon active={activeRoute(item.path)} />
          )}

          <StyledText compact={COMPACT}>{item.name}</StyledText>

          {item.badge ? <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue> : null}
        </NavItemButton>
      );
    });
  };

  return (
    <Scrollbar autoHide clickOnTrack={false} sx={{ overflowX: "hidden", maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)` }}>
      <Box height="100%" px={2}>
        {renderLevels(navigation)}
      </Box>
    </Scrollbar>
  );
}
// import { useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT
// import Scrollbar from "../../../../components/scrollbar"; // Local CUSTOM COMPONENT
// import SidebarAccordion from "./sidebar-accordion"; // LOCAL CUSTOM HOOKS
// import { useLayout } from "../dashboard-layout-context"; // SIDEBAR NAVIGATION LIST
// import { navigation } from "../dashboard-navigation"; // STYLED COMPONENTS
// import { ListLabel, BadgeValue, StyledText, BulletIcon, ExternalLink, NavItemButton, ListIconWrapper } from "./styles";

// export default function MultiLevelMenu() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { COMPACT, TOP_HEADER_AREA, handleCloseMobileSidebar } = useLayout();

//   // Manage open states for multiple accordions
//   const [openMenus, setOpenMenus] = useState([]);

//   const activeRoute = (path) => (pathname === path ? 1 : 0);

//   const handleNavigation = (path) => {
//     router.push(path);
//     handleCloseMobileSidebar();
//   };

//   // Function to toggle the accordion open state for multiple accordions
//   const toggleAccordion = (index) => {
//     setOpenMenus((prevOpenMenus) =>
//       prevOpenMenus.includes(index)
//         ? prevOpenMenus.filter((i) => i !== index) // Close the accordion if it's already open
//         : [...prevOpenMenus, index] // Add the accordion index to the open list
//     );
//   };

//   const renderLevels = (data) => {
//     return data.map((item, index) => {
//       if (item.type === "label") {
//         return (
//           <ListLabel key={index} compact={COMPACT}>
//             {item.label}
//           </ListLabel>
//         );
//       }

//       if (item.children) {
//         return (
//           <SidebarAccordion
//             key={index}
//             item={item}
//             isOpen={openMenus.includes(index)} // Check if this accordion is open
//             onToggle={() => toggleAccordion(index)} // Toggle this accordion
//           >
//             {renderLevels(item.children)}
//           </SidebarAccordion>
//         );
//       }

//       if (item.type === "extLink") {
//         return (
//           <ExternalLink
//             key={index}
//             href={item.path}
//             rel="noopener noreferrer"
//             target="_blank"
//           >
//             <NavItemButton key={item.name} active={0}>
//               {item.icon ? (
//                 <ListIconWrapper>
//                   <item.icon />
//                 </ListIconWrapper>
//               ) : (
//                 <span className="item-icon icon-text">{item.iconText}</span>
//               )}
//               <StyledText compact={COMPACT}>{item.name}</StyledText>
//               {item.badge ? (
//                 <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>
//               ) : null}
//             </NavItemButton>
//           </ExternalLink>
//         );
//       }

//       return (
//         <NavItemButton
//           key={index}
//           className="navItem"
//           active={activeRoute(item.path)}
//           onClick={() => handleNavigation(item.path)}
//         >
//           {item?.icon ? (
//             <ListIconWrapper>
//               <item.icon />
//             </ListIconWrapper>
//           ) : (
//             <BulletIcon active={activeRoute(item.path)} />
//           )}
//           <StyledText compact={COMPACT}>{item.name}</StyledText>
//           {item.badge ? (
//             <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>
//           ) : null}
//         </NavItemButton>
//       );
//     });
//   };

//   return (
//     <Scrollbar
//       autoHide
//       clickOnTrack={false}
//       sx={{
//         overflowX: "hidden",
//         maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`,
//       }}
//     >
//       <Box height="100%" px={2}>
//         {renderLevels(navigation)}
//       </Box>
//     </Scrollbar>
//   );
// }
