// import Utils from ".";
import images from "./images";

const countryCode = "+91"
/**
 * constant variable for the website
 */
const constant: any = {
  countryCode,
  productVariant: [
    "color",
    "shade",
  ],

  productImage: `${process.env.NEXT_PUBLIC_MEDIA_URL}catalog/product`,
  categoryImage: `${process.env.NEXT_PUBLIC_MEDIA_URL}catalog/category`,
  menuImage: `${process.env.NEXT_PUBLIC_MEDIA_URL}`,

  sortingData: [
    {
      id: 2,
      // name: "Relevance",
      name: "Popular",
    },
    {
      id: 3,
      name: "New In",
    },
    {
      id: 1,
      name: "Best Seller",
    },

    {
      id: 4,
      name: "Top Rated"
    },
    {
      id: 5,
      name: "Price: Low to High"
    },
    {
      id: 6,
      name: "Price: High to Low"
    }
  ],
  linkData: [
    { 'title': '', action: "/", id: "local-3" },

    { 'title': 'Gift Card', action: "/gift-card", id: "local-1" },
    { 'title': 'Offers', action: "/offers", id: "local-2" },
    // { 'title': 'Range', action: "/" },
    // { 'title': 'Offers', action: "/" },
    // { 'title': 'Body Club', action: "/" },
    // { 'title': 'Tips and Advice', action: "/tips-advice" ,id:"local-3"},
    { 'title': 'About Us', action: "/about-us", id: "local-4" }
  ],
  mobileGuestSideLinkData: [
    // { 'title': 'Tips & Advices', action: "/tips-advice" },
    // { title: "Donation",action: "#"},
    // { 'title': 'Offers', action: "/offers" },
    { 'title': 'Gift Card', action: "/gift-card" },
    { 'title': 'Settings', action: "/sideList" },
    // { 'title': 'Newsletter', action: "" },
    {
      title: "Help & Support",
      values: [
        { name: 'FAQ', action: "/faq", search: "" },
        { name: "Chat", action: "/", search: "" },
      ]
    },
  ],
  mobileSideLinkData: [

    { 'title': 'Gift Card', action: "/gift-card" },
    { 'title': 'My Account', action: "/my-profile" },
    // { 'title': 'Tips & Advices', action: "/tips-advice" },
    { title: "My Wishlist", action: "/wishlist" },
    { title: "My Orders", action: "/order/list" },
    // { title: "Donation",action: "#"},
    { title: "Settings", action: "/sideList" },
    // { title: "Newsletter",action: ""},
    {
      title: "Help & Support",
      values: [
        { name: 'FAQ', action: "/faq", search: "" },
        { name: 'Order Related Queries', action: "/help-support", search: "" },
        { name: "Chat", action: "/", search: "" },
      ]
    },

  ],
  orderStatus: {
    1: 'ORDER_PLACED',
    2: 'PAYMENT_PENDING',
    3: 'ORDER_CANCELED',//ORDER_CANCELED_BY_USER
    4: 'ORDER_CANCELED',//ORDER_CANCELED_BY_ADMIN
    5: 'ORDER_CONFIRMED',
    6: 'ORDER_PACKED',
    7: 'ORDER_SHIPPED',
    8: 'RETURN_INITIATED',
    9: 'ORDER_DELIVERED',
    10: 'ORDER_REFUND_INITIATED',
    11: 'RETURN_APPROVED',
    12: 'PAYMENT_FAILED',
    13: 'ORDER_PROCESSING',
    14: 'ORDER_HOLD',
    15: 'PROCESSING',
    16: 'PICKUP_PENDING',
    17: 'PICKUP_FAILED',
    18: 'OUT_FOR_DELIVERY',
    19: 'NOT_SERVICEABLE',
    20: 'FAILED_DELIVERY',
    21: 'RTO',
    22: 'RTO_OUT_FOR_DELIVERY',
    23: 'RTO_DELIVERED',
    24: 'RTO_FAILED',
    25: 'LOST',
    26: 'DAMAGED',
    27: 'SHIPMENT_DELAYED',
    28: 'CONTACT_CUSTOMER_CARE',
    29: 'SHIPMENT_HELD',
    30: 'RTO_INTRANSIT',
    31: 'OUT_FOR_PICKUP',
    32: 'RTO_CONTACT_CUSTOMER_CARE',
    33: 'RTO_SHIPMENT_DELAY',
    34: 'AWB_REGISTERED',
    35: 'EXCHANGE_PICKUP',
    36: 'EXCHANGE_INTRANSIT',
    37: 'EXCHANGE_DELIVERED',
    38: 'RETURN_ORDER_PLACED',
    39: 'INTRANSIT',
  },

  filterOption: [
    { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
    { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
    { id: 3, value: 'ORDER_CANCELED_BY_USER', label: 'Order Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_USER
    { id: 4, value: 'ORDER_CANCELED_BY_ADMIN', label: 'Order Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_ADMIN
    { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
    { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
    { id: 7, value: 'SHIPPED', label: 'Order Shipped', tag: 'Shipped' },
    { id: 8, value: 'RETURN_INITIATED', label: 'Order Return Initiated', tag: 'Returned' },
    { id: 9, value: 'DELIVERED', label: 'Order Delivered', tag: 'Delivered' },
    { id: 10, value: 'REFUND', label: 'Refunded', tag: 'Refunded' },
    { id: 11, value: 'RETURN_APPROVED', label: 'Return Approved', tag: 'Return Approved' },
    { id: 12, value: 'PAYMENT_FAILED', label: 'Payment Failed', tag: 'Payment Failed' },
    { id: 13, value: 'ORDER_PROCESSING', label: 'Order Processing', tag: 'Order Processing' },
    { id: 14, value: 'ORDER_HOLD', label: 'Order Hold', tag: 'Order Hold' },
    { id: 15, value: 'PROCESSING', label: 'Processing', tag: 'Processing' },
    // these 4 will not be visible on listing. Instead of this Shipped status will be shown
    { id: 16, value: 'PICKUP_PENDING', label: '', tag: '' },
    { id: 17, value: 'PICKUP_FAILED', label: '', tag: '' },
    { id: 18, value: 'OUT_FOR_DELIVERY', label: '', tag: '' },
    { id: 19, value: 'NOT_SERVICEABLE', label: '', tag: '' },
    // 
    { id: 20, value: 'FAILED_DELIVERY', label: 'Delivery Failed', tag: 'Delivery Failed' },
    { id: 21, value: 'RTO', label: 'RTO Initiated', tag: 'RTO Initiated' },
    { id: 22, value: 'RTO_OUT_FOR_DELIVERY', label: 'RTO Out For Delivery', tag: 'RTO Out For Delivery' },
    { id: 23, value: 'RTO_DELIVERED', label: 'RTO Delivered', tag: 'RTO Delivered' },
    { id: 24, value: 'RTO_FAILED', label: 'RTO Failed', tag: 'RTO Failed' },
    { id: 30, value: 'RTO_INTRANSIT', label: 'RTO in transit', tag: 'RTO in transit' },
    { id: 31, value: 'OUT_FOR_PICKUP', label: 'RTO in transit', tag: 'RTO in transit' },
    { id: 32, value: 'RTO_CONTACT_CUSTOMER_CARE', label: 'Connected RTO Customer Care', tag: 'Connected RTO Customer Care' },
    { id: 33, value: 'RTO_SHIPMENT_DELAY', label: "RTO Initiated", tag: "RTO Initiated" },
    { id: 34, value: 'AWB_REGISTERED', label: "RTO Initiated", tag: "RTO Initiated" },
    { id: 35, value: 'EXCHANGE_PICKUP', label: "RTO Initiated", tag: "RTO Initiated" },
    { id: 36, value: 'EXCHANGE_INTRANSIT', label: "RTO Initiated", tag: "RTO Initiated" },
    { id: 37, value: 'EXCHANGE_DELIVERED', label: "RTO Initiated", tag: "RTO Initiated" },
    { id: 38, value: 'RETURN_ORDER_PLACED', label: "RTO Initiated", tag: "RTO Initiated" },
    { id: 39, value: 'INTRANSIT', label: "RTO Initiated", tag: "RTO Initiated" },
    { id: 41, value: 'ORDER_RETURNED', label: "Order Returned", tag: "Order Returned" },
  ],

  ORDER_STATUS: {
    PRODUCT:
    {
      1: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },//green
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },// baaki grey
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        // { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
      ],
      2: [

        { id: 1, value: 'PLACED', label: 'Order not confirmed', tag: 'Placed' },
        { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },//plain green circle
        { id: 4, value: 'ORDER_CANCELED_BY_ADMIN', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_ADMIN//grey

      ],
      3: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 3, value: 'ORDER_CANCELED_BY_USER', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_USER

      ],
      
      3.2: [
        { id: 1, value: 'PLACED', label: 'Order not confirmed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 12, value: 'PAYMENT_FAILED', label: 'Payment Failed', tag: 'Payment Failed' },
        { id: 3, value: 'ORDER_CANCELED_BY_ADMIN', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_ADMIN

      ],
      3.3: [
        { id: 1, value: 'PLACED', label: 'Order not confirmed', tag: 'Placed' },
        { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        // { id: 12, value: 'PAYMENT_FAILED', label: 'Payment Failed', tag: 'Payment Failed' },
        { id: 3, value: 'ORDER_CANCELED_BY_ADMIN', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_ADMIN

      ],
      4: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 4, value: 'ORDER_CANCELED_BY_ADMIN', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_ADMIN
      ],
      // 4.1: [
      //   { id: 1, value: 'PLACED', label: 'Order not confirmed', tag: 'Placed' },
      //   { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
      //   // { id: 12, value: 'PAYMENT_FAILED', label: 'Payment Failed', tag: 'Payment Failed' },
      //   { id: 4, value: 'ORDER_CANCELED_BY_ADMIN', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_ADMIN

      // ],
      4.2: [
        { id: 1, value: 'PLACED', label: 'Order not confirmed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 12, value: 'PAYMENT_FAILED', label: 'Payment Failed', tag: 'Payment Failed' },
        { id: 4, value: 'ORDER_CANCELED_BY_ADMIN', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_ADMIN

      ],
      4.3: [
        { id: 1, value: 'PLACED', label: 'Order not confirmed', tag: 'Placed' },
        { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        // { id: 12, value: 'PAYMENT_FAILED', label: 'Payment Failed', tag: 'Payment Failed' },
        { id: 4, value: 'ORDER_CANCELED_BY_ADMIN', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_ADMIN

      ],
      5: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },//grey yaha se
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
      ],
      6: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },//grey
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
      ],
    
      7: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Picked' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },//grey
      ],
      8: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        // { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },//check transaction data contains confirmed
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
        { id: 8, value: 'RETURN_INITIATED', label: 'Return Request Raised', tag: 'Returned' },

      ],
      9: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
      ],
      10: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
        { id: 3, value: 'ORDER_CANCELED_BY_USER', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_USER
        { id: 10, value: 'REFUND', label: 'Refunded', tag: 'Refunded' },
      ],
      10.1: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
        { id: 10, value: 'REFUND', label: 'Refunded', tag: 'Refunded' },
      ],
      10.2: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 3, value: 'ORDER_CANCELED_BY_USER', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_USER
        { id: 10, value: 'REFUND', label: 'Refunded', tag: 'Refunded' },
      ],
      10.3: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 3, value: 'ORDER_CANCELED_BY_USER', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_USER
        // { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Picked' },
        { id: 10, value: 'REFUND', label: 'Refunded', tag: 'Refunded' },
      ],
      10.4: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Picked' },
        { id: 10, value: 'REFUND', label: 'Refunded', tag: 'Refunded' },
      ],
      12: [
        { id: 1, value: 'PLACED', label: 'Order Not Confirmed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 12, value: 'PAYMENT_FAILED', label: 'Payment Failed', tag: 'Payment Failed' },
        // { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 4, value: 'ORDER_CANCELED_BY_ADMIN', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_ADMIN//grey
      ],
      20: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 20, value: 'FAILED_DELIVERY', label: 'Delivery Failed', tag: 'Delivery Failed' },
      ],
      21: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
        { id: 21, value: 'RTO', label: 'RTO Initiated', tag: 'RTO Initiated' },

      ],
      23: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
        { id: 23, value: 'RTO_DELIVERED', label: 'RTO Delivered', tag: 'RTO Delivered' },

      ],
      30: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
        { id: 30, value: 'RTO_INTRANSIT', label: 'RTO in transit', tag: 'RTO in transit' },

      ],
      31: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
        { id: 31, value: 'OUT_FOR_PICKUP', label: 'Out For Pickup', tag: 'Out For Pickup' },

      ],
      41: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 6, value: 'PICKED', label: 'Order Packed', tag: 'Packed' },
        { id: 7, value: 'SHIPPED', label: 'Shipped', tag: 'Shipped' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
        { id: 41, value: 'ORDER_RETURNED', label: "Order Returned", tag: "Order Returned" },

      ],

    },
    OTHER: {
      2: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
      ],
      4: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 12, value: 'PAYMENT_FAILED', label: 'Payment Failed', tag: 'Payment Failed' },
        { id: 4, value: 'ORDER_CANCELED_BY_ADMIN', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_ADMIN

      ],
      5: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },

      ],
      9: [
        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        // { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 9, value: 'DELIVERED', label: 'Delivered', tag: 'Delivered' },
      ],
      12: [

        { id: 1, value: 'PLACED', label: 'Order Placed', tag: 'Placed' },
        // { id: 2, value: 'PAYMENT_PENDING', label: 'Payment Pending', tag: 'Payment Pending' },
        { id: 12, value: 'PAYMENT_FAILED', label: 'Payment Failed', tag: 'Payment Failed' },
        // { id: 5, value: 'CONFIRMED', label: 'Order Confirmed', tag: 'Confirmed' },
        { id: 4, value: 'ORDER_CANCELED_BY_ADMIN', label: 'Cancelled', tag: 'Cancelled' },//ORDER_CANCELED_BY_ADMIN

      ],

    }

  },
  shippingType: {
    EXPRESS: "expressshiping",
    STANDARD: "flatrate"
  },
  couponType: {
    DEFAULT: "default",
    FREE_SAMPLE: "free_sample",
    FREE_PRODUCT: "free_product",
    PAYMENT: "payment",
    AUTO_TYPE: "auto_type"
  },
  appliedCouponType: [
    "default",
    "free_sample",
    "free_product",
    "payment",
  ],
  PAYMENT_METHOD: {
    COD: 1,
    RAZORPAY_UPI: 2,
    RAZORPAY_NET_BANKING: 3,
    RAZORPAY_CREDIT_CARD: 4,
    PAYTM: 5,
    WALLET: 6,
    RAZORPAY_DEBIT_CARD: 7,
    REWARD_POINTS: 8,
    CARD: 9
  },
  PAYTM_STATUS: {
    SUCCESS: "TXN_SUCCESS",
    FAILED: "TXN_FAILURE",
    PENDING: "PENDING"
  },
  PAYMENT_METHOD_SOURCE: [
    { id: 1, value: "COD", type: "cod", tag: "COD" },
    { id: 2, value: "RAZORPAY_UPI", type: "upi", tag: "UPI" },
    { id: 3, value: "RAZORPAY_NET_BANKING", type: "netbanking", tag: "Net Banking" },
    { id: 4, value: "RAZORPAY_CREDIT_CARD", type: "creditCard", tag: "Credit" },
    { id: 5, value: "PAYTM", type: "paytm", tag: "paytm" },
    { id: 6, value: "WALLET", type: "wallet", tag: "wallet" },
    { id: 7, value: "RAZORPAY_DEBIT_CARD", type: "debitCard", tag: "debit" },
    { id: 8, value: "REWARD_POINTS", type: "rewards", tag: "rewards" },
    { id: 9, value: "CARD", type: "card", tag: "CARD" }
  ],
  // MODE_OF_PAYMENT: {
  //   2: 'UPI',
  //   3: 'NETBANKING',
  //   4: 'CREDIT CARD',
  //   5: 'PAYTM',
  //   6: 'WALLET',
  //   7: 'DEBIT CARD',
  //   8: 'REWARD',//check this on rewards when rewards flow is functional
  //   9: "CARD",
  //   1: 'COD',
  //   // 'Wallet+ Credit / Debit Card': 'ONLINE',
  //   // 'Wallet+ Reward + COD': 'COD'
  // },

  MODE_OF_PAYMENT: {
    2: 'UPI',
    3: 'NET BANKING',
    4: 'CREDIT CARD',
    5: 'PAYTM',
    6: 'WALLET',
    7: 'DEBIT CARD',
    8: 'REWARD',//check this on rewards when rewards flow is functional
    9: "CARD",
    1: 'COD',
    // 'Wallet+ Credit / Debit Card': 'ONLINE',
    // 'Wallet+ Reward + COD': 'COD'
  },

  CART_TYPE: {
    BAG: 1,
    EGIFT: 2
  },

  // WALLET_TXN_TYPE: {
  //   "WALLET REFUND": "WALLET CANCEL REDEEM", //-> refund payment
  //   "WALLET_PAYMENT": "WALLET REDEEM", //-> redeem amount -> paymnt krne pr wallet se
  //   "WALLET_ADD_MONEY": "ADD CARD TO WALLET", //-> add card to wallet -> gift card redeem krne pr
  //   "WALLET_CREATE": "WALLET CREATE" //-> wallet create -> signup krne pr wallet create
  // },
  WALLET_TXN_TYPE: [
    {
      transactionType: "WALLET CANCEL REDEEM",
      text: 'Order refund - Order ID ',
      imgIcon: images.WALLETTWO,
      tag: "REFUND ON"
    },
    {
      transactionType: 'WALLET REDEEM',
      text: 'Order placement - Order ID ',
      imgIcon: images.WALLETTHREE,
      tag: "ORDER PLACED ON"

    },
    {
      transactionType: "ADD CARD TO WALLET",
      text: 'Received gift card from ',
      imgIcon: images.WALLETONE,
      tag: "GIFT REDEEMED"

    },
    {
      transactionType: "WALLET CREATE",
      text: '',
      imgIcon: images.WALLETFOUR,
      tag: "WALLET CREATED"

    },
  ],
  paymentOptions: [
    {
      id: 1,

      mode: "PayTm",
      subMode: [],
    },
    {
      id: 2,
      mode: "UPI Payment",
      subMode: [
        { id: 1, method: "PhonePe" },
        { id: 2, method: "Google Pay" },
        { id: 3, method: "BHIM" },
      ],
    },
    {
      id: 3,
      mode: "Net Baning",
      subMode: [
      ],
    },
    {
      id: 4,
      mode: "COD (Cash on delivery)",
      subMode: [{ id: 1, method: "codText" }],
    },
  ],

  tierType: [
    { id: 3, value: "FRIEND_TIER", label: "FRIEND" },
    { id: 2, value: "CLUB_TIER", label: "CLUB" },
    { id: 1, value: "PLATINUM_TIER:", label: "PLATINUM" }
  ],
  EASY_POINT_TYPE: [
    { id: 1, value: "ACCRUAL", label: "Earned" },
    { id: 2, value: "REDEMPTION", label: "Redeemed" },
    { id: 3, value: "REFUND_TO_MEMBER", label: "Refund" },
    { id: 4, value: "REFUND_TO_MERCHANT", label: "Refund" },
    { id: 5, value: "FLAT_ACCRUAL", label: "Reward Bonus" },
    { id: 14, value: "LAPSE_POINTS_REDEMPTION", label: "Expired" },
    { id: 15, value: "FLAT_REDEMPTION", label: "Redeemed" },
    { id: 16, value: "REFERRAL_ACCRUAL", label: "Reward Bonus" },
    { id: 27, value: "SKU_ACCRUAL", label: "Earned" },
    { id: 30, value: "NEGATIVE_ACCRUAL", label: "Reverse" }
  ],
  OFFER_TYPE: {
    INSTANT: 'instant',
    DEFERRED: 'deferred',
    ALREADY_DISCOUNTED: 'already_discounted',
  },

  URL_BREADCRUMB: [
    {
      action: "/my-profile",
      title: "My Account",
    },
    {
      action: "/edit-profile",
      title: "Edit Account",
      parent: [{
        action: "/my-profile",
        title: "My Account",
      }]
    },
    {
      action: "/lybc",
      title: "My Dashboard",
      parent: [{ action: "/my-profile", title: "My Profile" }]
    },
    {
      action: "/upgrade-membership",
      title: "Upgrade Membership",
      parent: [{ action: "/my-profile", title: "My Profile" }, { action: "/lybc/dashboard", title: "My Dashboard" }]

    },
    {
      action: "/wallet",
      title: "My Wallet",
      parent: [{ action: "/my-profile", title: "My Profile" }]
    },
    {
      action: "/order/list",
      title: "My Orders",
      parent: [{ action: "/my-profile", title: "My Profile" }]
    },
    {
      action: "/order/detail",
      title: "Order Detail",
      parent: [{ action: "/my-profile", title: "My Profile" },
      { action: "/order/list", title: "My Orders" }]

    },
    {
      action: "/wishlist",
      title: "My Wishlist",
      parent: [{ action: "/my-profile", title: "My Profile" }]
    },
    {
      action: "/address",
      title: "My Address",
      parent: [{ action: "/my-profile", title: "My Profile" }]
    },
    {
      action: "/payment-method",
      title: "My Payment Methods",
      parent: [{ action: "/my-profile", title: "My Profile" }]
    },
    {
      action: "/skin-preference",
      title: "My Skin Preferences",
      parent: [{ action: "/my-profile", title: "My Profile" }]
    },
    {
      action: "/change-password",
      title: "Change Password",
      parent: [{ action: "/my-profile", title: "My Profile" }]
    },
    {
      action: "/notification",
      title: "Notifications",
      parent: [{ action: "/my-profile", title: "My Profile" }]
    },
    {
      action: "/help-support",
      title: "Order Related Queries",
      parent: [{ action: "/my-profile", title: "My Profile" }]
    },
    {
      action: "more-queries",
      title: "Queries related to your order",
      parent: [{ action: "/my-profile", title: "My Profile" },
      {
        action: "/help-support",
        title: "Order Related Queries"
      }]

    },
    {
      action: "/need-help",
      title: "Order Related Queries",
      parent: [{ action: "/my-profile", title: "My Profile" },
      { action: "/order/list", title: "My Orders" },
      { action: "/order/detail", title: "Order Detail" }]
    },
    {
      action: "/write-to-us",
      title: "Write to us",
      parent: [{ action: "/my-profile", title: "My Profile" }]
    }

  ]

  //  FooterSideMenu : [
  //   {
  //     id: 1,
  //     title: "Terms And Conditions",
  //     link: `${Utils.routes.TERMS_CONDITION}`,
  //   },
  //   {
  //     id: 2,
  //     title: "Love Your Body™ Club",
  //     link: `/`,
  //   },
  //   {
  //     id: 3,
  //     title: "Cookies",
  //     link: `${Utils.routes.COOKIES}`,
  //   },
  //   {
  //     id: 4,
  //     title: "Privacy Policy",
  //     link: `${Utils.routes.PRIVACY_POLICY}`,
  //   },

  //   {
  //     id: 5,
  //     title: "Sitemap",
  //     link: `/`,
  //   },
  // ]

};
export default constant;
