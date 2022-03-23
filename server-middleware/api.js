const express = require("express");
const app = express();
const cors = require("cors");

const router = express.Router();
app.use(cors());
app.use(express.json());

app.use(router);

router.get("/homepage", (req, res) => {
  return res.json({
    data: {
      banner: {
        layout: "",
        items: [
          {
            uuid: 1,
            img: "https://th-test-11.slatic.net/shop/cdfb4a9fa5fcf5d254c94d5c06252ba9.png",
          },
          {
            uuid: 2,
            img: "https://img.freepik.com/free-vector/sport-shoes-promotion-social-media-facebook-banner-template_252779-307.jpg",
          },
          {
            uuid: 3,
            img: "https://thumbs.dreamstime.com/z/big-clothes-sale-banner-design-color-vector-illustration-template-75549216.jpg",
          },
        ],
      },
      category: {
        layout: "",
        items: [
          {
            uuid: 1,
            img: "https://i.pinimg.com/originals/b9/be/a0/b9bea016fb73b816b5343130363bdc68.jpg",
          },
          {
            uuid: 2,
            img: "https://cutewallpaper.org/21/iron-man-symbol-wallpapers/Wallpaper-illustration-text-logo-flag-Marvel-Comics-.png",
          },
          {
            uuid: 3,
            img: "https://assets.turbologo.com/blog/en/2019/10/19084946/spiderman-logo-illustration.jpg",
          },
          {
            uuid: 4,
            img: "https://i.pinimg.com/originals/b9/be/a0/b9bea016fb73b816b5343130363bdc68.jpg",
          },
          {
            uuid: 5,
            img: "https://cutewallpaper.org/21/iron-man-symbol-wallpapers/Wallpaper-illustration-text-logo-flag-Marvel-Comics-.png",
          },
          {
            uuid: 6,
            img: "https://assets.turbologo.com/blog/en/2019/10/19084946/spiderman-logo-illustration.jpg",
          },
        ],
      },
      featuredProduct: {
        layout: "",
        items: [
          {
            uuid: 1,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            uuid: 2,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            uuid: 3,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            uuid: 4,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            uuid: 5,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
        ],
      },
      salesProduct: {
        layout: "",
        items: [
          {
            uuid: 1,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
            discount: 14.25,
          },
          {
            uuid: 2,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
            discount: 14.25,
          },
          {
            uuid: 3,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
            discount: 14.25,
          },
          {
            uuid: 4,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
            discount: 14.25,
          },
          {
            uuid: 5,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
            discount: 14.25,
          },
          {
            uuid: 6,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
            discount: 14.25,
          },
        ],
      },
      lookbook: {
        layout: "",
        items: [
          {
            uuid: 1,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            uuid: 2,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            uuid: 3,
            img: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
        ],
      },
    },
  });
});

router.get("/collections", (req, res) => {
  return res.json({
    data: [
      {
        uuid: 1,
        name: "New Arrivals",
      },
      {
        uuid: 2,
        name: "Summer",
      },
      {
        uuid: 3,
        name: "Winter",
      },
      {
        uuid: 4,
        name: "CNY 2021",
      },
    ],
  });
});

router.get("/category", (req, res) => {
  return res.json({
    data: [
      {
        uuid: 1,
        name: "Men",
      },
      {
        uuid: 2,
        name: "Women",
      },
      {
        uuid: 3,
        name: "Sport",
      },
    ],
  });
});

router.post("/products", (req, res) => {
  return res.json({
    data: [
      {
        id: 1,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 2,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 3,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 4,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 5,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 6,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
    ],
    total_items: 64,
  });
});

router.post("/product", (req, res) => {
  return res.json({
    data: {
      id: 1,
      name: "Oversized W Sweater",
      size: ["S", "M", "L", "XL"],
      price: 700,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.",
      SKU: "N/A",
      category: "Kids",
      tags: ["Casual", "Cotton", "Red"],
      additional:
        "agricultural machinery and other non-road vehicles more details and styles welcomed the consultation.",
      moreInformation:
        "Become a superhero of written English. YOUR NAME YOUR EMAIL ADDRESS START NOW. For more information",
      detail:
        "Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!.",
      img: [
        {
          color: "#fff",
          images: [
            {
              url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
            },
            {
              url: "https://picsum.photos/id/237/500/550",
            },
            {
              url: "https://picsum.photos/id/236/500/550",
            },
            {
              url: "https://picsum.photos/id/235/500/550",
            },
            {
              url: "https://picsum.photos/id/234/500/550",
            },
            {
              url: "https://picsum.photos/id/233/500/550",
            },
            {
              url: "https://picsum.photos/id/232/500/550",
            },
            {
              url: "https://picsum.photos/id/231/500/550",
            },
            {
              url: "https://picsum.photos/id/230/500/550",
            },
          ],
        },
        {
          color: "#000000",
          images: [
            {
              url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
            },
            {
              url: "https://picsum.photos/id/137/500/550",
            },
            {
              url: "https://picsum.photos/id/136/500/550",
            },
            {
              url: "https://picsum.photos/id/135/500/550",
            },
            {
              url: "https://picsum.photos/id/134/500/550",
            },
            {
              url: "https://picsum.photos/id/133/500/550",
            },
            {
              url: "https://picsum.photos/id/132/500/550",
            },
            {
              url: "https://picsum.photos/id/131/500/550",
            },
            {
              url: "https://picsum.photos/id/130/500/550",
            },
          ],
        },
      ],
    },

    total_items: 64,
  });
});

router.post("/relatedProducts", (req, res) => {
  return res.json({
    data: [
      {
        id: 1,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 2,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 3,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
    ],
    total_items: 64,
  });
});
module.exports = {
  path: "/api",
  handler: app,
};
