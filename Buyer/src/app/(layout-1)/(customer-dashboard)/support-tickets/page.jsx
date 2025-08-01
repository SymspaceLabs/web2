import { TicketsPageView } from "pages-sections/customer-dashboard/support-tickets/page-view"; // API FUNCTIONS

// import api from "utils/__api__/ticket";
export const metadata = {
  title: "Support Tickets  E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

// const ticketList = [{
//   id: "40279d09-b80f-42e2-b271-7febbcab5bf0",
//   user: {
//     id: "c2d9ff45-f2bf-4219-a522-34a6916c6b29",
//     email: "Wilton_Bins88@gmail.com",
//     phone: "1-880-641-1129 x059",
//     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/238.jpg",
//     password: "2YgKrLvT_yf33iw",
//     dateOfBirth: "1945-01-22T05:32:32.096Z",
//     verified: true,
//     name: {
//       firstName: "Angel",
//       lastName: "Mayert"
//     }
//   },
//   slug: "product-broken.-i-need-refund",
//   type: "Urgent",
//   date: "13 April, 2022",
//   title: "Product Broken. I need refund",
//   status: "Open",
//   category: "Website Problem",
//   conversation: null
// }, {
//   id: "1241aaaa-c801-4ffa-b05f-7379a0012e6f",
//   user: {
//     id: "c2d9ff45-f2bf-4219-a522-34a6916c6b29",
//     email: "Wilton_Bins88@gmail.com",
//     phone: "1-880-641-1129 x059",
//     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/238.jpg",
//     password: "2YgKrLvT_yf33iw",
//     dateOfBirth: "1945-01-22T05:32:32.096Z",
//     verified: true,
//     name: {
//       firstName: "Angel",
//       lastName: "Mayert"
//     }
//   },
//   slug: "when-will-my-product-arrive",
//   type: "Normal",
//   date: "15 April, 2022",
//   title: "When will my product arrive?",
//   status: "Open",
//   category: "UX Problem",
//   conversation: null
// }, {
//   id: "5c609a0c-f695-4d63-8b51-e57d3f0041c0",
//   user: {
//     id: "89c409f4-481a-4375-b46a-55be97c90c56",
//     email: "Jo88@gmail.com",
//     phone: "280.377.3831 x081",
//     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/90.jpg",
//     password: "HMl8qnCXqnomuwq",
//     dateOfBirth: "1975-04-10T21:29:46.291Z",
//     verified: true,
//     name: {
//       firstName: "Jadon",
//       lastName: "Farrell"
//     }
//   },
//   slug: "payment-method-is-not-working",
//   type: "Urgent",
//   date: "17 April, 2022",
//   title: "Payment method is not working",
//   status: "Open",
//   category: "Payment Problem",
//   conversation: null
// }, {
//   id: "f5d4caa3-6583-4ba5-908b-e7c829d313bb",
//   user: {
//     id: "6c41c2cd-9494-4f69-8953-75e3e51f0db4",
//     email: "Rosalyn_Lowe64@yahoo.com",
//     phone: "(958) 634-3884",
//     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/576.jpg",
//     password: "hedRabRwEdpc6rr",
//     dateOfBirth: "1992-09-26T19:26:32.231Z",
//     verified: true,
//     name: {
//       firstName: "Richie",
//       lastName: "O'Conner"
//     }
//   },
//   slug: "do-you-accept-prepaid-card",
//   type: "Normal",
//   date: "13 April, 2022",
//   title: "Do you accept prepaid card?",
//   status: "Open",
//   category: "Website Problem",
//   conversation: null
// }, {
//   id: "f392048e-6f94-427a-8533-4441abc1cc9b",
//   user: {
//     id: "b291cdf2-73a9-457c-a7b6-6fe3966ae1a5",
//     email: "Kattie.Murphy58@hotmail.com",
//     phone: "814-657-0607 x4081",
//     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/570.jpg",
//     password: "4IDZJWfP2nuj2yh",
//     dateOfBirth: "2004-04-07T05:03:32.349Z",
//     verified: true,
//     name: {
//       firstName: "Elsie",
//       lastName: "Frami"
//     }
//   },
//   slug: "how-much-do-i-have-to-pay-for...",
//   type: "Normal",
//   date: "10 April, 2022",
//   title: "How much do I have to pay for...",
//   status: "Open",
//   category: "UX Problem",
//   conversation: null
// }, {
//   id: "c08db2ab-6e98-4234-b9b6-4103c31cd1f1",
//   user: {
//     id: "6c41c2cd-9494-4f69-8953-75e3e51f0db4",
//     email: "Rosalyn_Lowe64@yahoo.com",
//     phone: "(958) 634-3884",
//     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/576.jpg",
//     password: "hedRabRwEdpc6rr",
//     dateOfBirth: "1992-09-26T19:26:32.231Z",
//     verified: true,
//     name: {
//       firstName: "Richie",
//       lastName: "O'Conner"
//     }
//   },
//   slug: "do-you-ship-to-bangladesh",
//   type: "Urgent",
//   date: "16 April, 2022",
//   title: "Do you ship to Bangladesh?",
//   status: "Open",
//   category: "Payment Problem",
//   conversation: null
// }, {
//   id: "983f201e-8c73-4875-a60c-89d638c01cb9",
//   user: {
//     id: "7a241862-2ce4-400e-895b-82399760b58b",
//     email: "Oren74@gmail.com",
//     phone: "1-286-816-6529 x7187",
//     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/53.jpg",
//     password: "fBlOwIqjGYBhoJh",
//     dateOfBirth: "1995-07-25T23:36:34.428Z",
//     verified: true,
//     name: {
//       firstName: "Margarette",
//       lastName: "Marquardt"
//     }
//   },
//   slug: "where's-my-stuff",
//   type: "Urgent",
//   date: "13 April, 2022",
//   title: "Where's My Stuff?",
//   status: "Open",
//   category: "Website Problem",
//   conversation: null
// }, {
//   id: "73794e7d-c3e5-4c36-a1af-c5e063c6710f",
//   user: {
//     id: "c2d9ff45-f2bf-4219-a522-34a6916c6b29",
//     email: "Wilton_Bins88@gmail.com",
//     phone: "1-880-641-1129 x059",
//     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/238.jpg",
//     password: "2YgKrLvT_yf33iw",
//     dateOfBirth: "1945-01-22T05:32:32.096Z",
//     verified: true,
//     name: {
//       firstName: "Angel",
//       lastName: "Mayert"
//     }
//   },
//   slug: "when-will-my-product-arrive",
//   type: "Normal",
//   date: "19 April, 2022",
//   title: "When will my product arrive?",
//   status: "Open",
//   category: "UX Problem",
//   conversation: null
// }, {
//   id: "596bc950-2359-4e36-9bfa-fb1a8f6cc5cd",
//   user: {
//     id: "1756c6e5-b4b7-429b-8caf-01b5bebbc1bf",
//     email: "Antonia.Weimann49@yahoo.com",
//     phone: "1-702-985-9828 x4366",
//     avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/906.jpg",
//     password: "gc0Os4gUoePWimz",
//     dateOfBirth: "1964-12-30T23:57:12.154Z",
//     verified: true,
//     name: {
//       firstName: "Heath",
//       lastName: "Durgan"
//     }
//   },
//   slug: "payment-method-is-not-working",
//   type: "Urgent",
//   date: "23 April, 2022",
//   title: "Payment method is not working",
//   status: "Open",
//   category: "Payment Problem",
//   conversation: null
// }];

export default async function SupportTickets() {
  return <TicketsPageView tickets={[]} />;
}
