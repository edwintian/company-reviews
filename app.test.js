const testData = require("./data/testData");
const testUserData = require("./data/testUserData");
const request = require("supertest");
const app = require("./app");
const { teardownMongoose } = require("./test/mongoose");
const Company = require("./models/company.model");
const User = require("./models/user.model");

describe("companies route", () => {
  afterAll(async () => await teardownMongoose());

  beforeEach(async () => {
    await User.create(testUserData);
    await Company.create(testData);
    signedInAgent = request.agent(app);
    await signedInAgent.post("/users/login").send(testUserData);
  });

  afterEach(async () => {
    await Company.deleteMany();
    jest.resetAllMocks();
  });

  it("1) GET should return all companies without reviews and _id and __v", async () => {
    const expectedCompanyInfo = [
      {
        companyName: "Brakus, Aufderhar and Gutkowski",
        companySuffix: "and Sons",
        numberOfEmployees: 60497,
        description:
          "Voluptas reiciendis quasi expedita ex qui sit. Qui enim facilis adipisci qui."
      }
    ];
    const { body: companyInfo } = await request(app)
      .get("/companies")
      .expect(200);
    expect(companyInfo).toEqual(expectedCompanyInfo);
  });

  it("2) GET /companies/:id should return the company info with reviews and without _id and __v", async () => {
    const expectedCompanyInfo =
      {
        id: "e5cc2c0a-93b5-4014-8910-6ed9f3056456",
        companyName: "Brakus, Aufderhar and Gutkowski",
        companySuffix: "and Sons",
        numberOfEmployees: 60497,
        description:
          "Voluptas reiciendis quasi expedita ex qui sit. Qui enim facilis adipisci qui.",
        reviews: [
          {
            id: "7da4d967-715b-4dc1-a74b-82a7992704f3",
            userId: "f6e016e6-e254-4375-bf82-797e6c00e3eb",
            username: "brenfish",
            rating: 0,
            title: "eligendi adipisci",
            review:
              "Consequatur esse beatae voluptate voluptatibus expedita aperiam perspiciatis cumque voluptatem. Cum quasi dolor ut dignissimos illum magni eos. Et aspernatur illum commodi."
          },
          {
            id: "fa07ef47-5849-4642-8af0-640e4887b1e6",
            userId: "13d0782f-2793-4c83-8279-93c9a03b3ac3",
            username: "annanico",
            rating: 4,
            title: "iusto consequatur",
            review:
              "Facere dicta delectus impedit sunt sed officia omnis. Officiis vel optio corrupti iure. Atque iusto nemo. Ut voluptas quaerat omnis quis impedit maiores nihil ipsam. Quod ea sed voluptates. Dolorem officia esse enim."
          }
        ]
      };
    const { body: companyInfo } = await request(app)
      .get("/companies/e5cc2c0a-93b5-4014-8910-6ed9f3056456")
      .expect(200);
    expect(companyInfo).toEqual(expectedCompanyInfo);
  });

  it("3) POST /companies/:id/reviews should return 201 and the new review", async () => {
    const expectedReturnInfo =
    {
      "userId": "754aece9-64bf-42ab-b91c-bb65e2db3a37",
      "username": "humburn",
      "rating": 4,
      "title": "eligendi adipisci",
      "review": "Et voluptatem voluptas quisquam quos officia assumenda. Mollitia delectus vitae quia molestias nulla ut hic praesentium. Sed et assumenda et iusto velit laborum sunt non."
    };

    const { body: companyInfo } = await request(app)
      .post("/companies/e5cc2c0a-93b5-4014-8910-6ed9f3056456/reviews")
      .expect(201);
    expect(companyInfo).toEqual(expectedCompanyInfo);
  });


});
