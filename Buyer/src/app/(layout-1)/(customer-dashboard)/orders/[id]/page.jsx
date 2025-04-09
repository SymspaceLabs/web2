import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "../../../../../pages-sections/customer-dashboard/orders/page-view"; // API FUNCTIONS

// import api from "../../../../../utils/__api__/orders";
export const metadata = {
  title: "Order Details  E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function OrderDetails({
  params
}) {
  try {
    // const order = orders[0];
    return <OrderDetailsPageView order={orders[0]} />;
  } catch (error) {
    notFound();
  }
}

const orders = [
  {
    users: {
      id: "d6182878-c107-43f4-9f96-6898a573cd0c",
      email: "Micah.Hirthe@gmail.com",
      phone: "214.932.2455",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1129.jpg",
      password: "IIBBM119nM0nW35",
      dateOfBirth: "1951-08-19T22:27:56.791Z",
      verified: true,
      name: {
        firstName: "Benny",
        lastName: "Bergnaum"
      }
    },
    id: "f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8",
    tax: 0,
    items: [{
      product_img: "/assets/images/products/Automotive/2.Audi2017.png",
      product_name: "Budi 2017",
      product_price: 226,
      product_quantity: 4
    }, {
      product_img: "/assets/images/products/Automotive/3.Tesla2015.png",
      product_name: "Resla 2015",
      product_price: 101,
      product_quantity: 4
    }, {
      product_img: "/assets/images/products/Automotive/4.Porsche2018.png",
      product_name: "Xorsche 2018",
      product_price: 241,
      product_quantity: 4
    }],
    createdAt: "2022-11-10T10:35:02.079Z",
    discount: 0,
    totalPrice: 350,
    isDelivered: false,
    shippingAddress: "Kelly Williams 777 Brockton Avenue, Abington MA 2351",
    status: "Pending",
    deliveredAt: null
  }
];