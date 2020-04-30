const testData = require("../data/testData");
const request = require("supertest");
const app = require("../app");
const { teardownMongoose } = require("../test/mongoose");
const Company = require("../models/company.model");

describe("companies route", () => {
  afterAll(async () => await teardownMongoose());

  beforeEach(async () => {
    await Company.create(testData);
  });

  afterEach(async () => {
    await Company.deleteMany();
    jest.resetAllMocks();
  });

  it("1) GET should return all companies without reviews and id and v", async () => {
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
});
