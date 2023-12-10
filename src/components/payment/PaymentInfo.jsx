import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./Theme.js";
import axios from "axios";

function PaymentInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const buyMovie = async () => {
    const {
      data: { key },
    } = await axios.get("/api/getkey");
    setAmount(40);

    const {
      data: { order },
    } = await axios.post("/api/checkout", {
      amount,
    });
    console.log(order);
    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "Mukesh Giri Group",
      description: "Movie Seller",
      image: "https://avatars.githubusercontent.com/u/116891171?v=4",
      order_id: order.id,
      callback_url: "/api/paymentverification",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#C32148",
      },
    };
    const razor = new window.Razorpay(options);

    razor.open();
  };

  return (
    <>
      <ChakraProvider theme={theme}>
        <div className="paymentButtons">
          <button className="buyBtn" onClick={buyMovie}>
            Buy ₹40
          </button>
        </div>
      </ChakraProvider>
    </>
  );
}

export default PaymentInfo;
