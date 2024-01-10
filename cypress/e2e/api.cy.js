import {
  postRequestBody,
  putRequestBody,
  patchRequestBody,
} from "../fixtures/user.json";

describe("CRUD Operations", () => {
  let studentID;

  it("Retrieve a list of all users", () => {
    cy.request({
      method: "GET",
      url: "https://tech-global-training.com/students",
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.be.below(1000);
      expect(response.body.length).to.greaterThan(1);
      expect(response.body[1].firstName).to.equal("John");
      expect(response.body[1].lastName).to.equal("Doe");
    });
  });

  it("Create a new user", () => {
    cy.request({
      method: "POST",
      url: "https://tech-global-training.com/students",
      body: postRequestBody,
    }).then((response) => {
      studentID = response.body.id;

      // expect(response.status).to.equal(200)
      // expect(response.duration).to.be.below(1000)
      // expect(response.body.firstName).to.equal('Jason')
      // expect(response.body.lastName).to.equal('Statham')
      // expect(response.body.email).to.equal('jasonS@gmail.com')
      // expect(response.body.dob).to.equal('1965-07-07')

      cy.validateResponse(response, postRequestBody);
    });
  });

  it("Retrieve a specific user-created", () => {
    cy.request({
      method: "GET",
      url: `https://tech-global-training.com/students/${studentID}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.be.below(1000);
      cy.validateResponse(response, postRequestBody);
    });
  });
  it("Update an existing user ", () => {
    cy.request({
      method: "PUT",
      url: `https://tech-global-training.com/students/${studentID}`,
      body: putRequestBody,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.be.below(1000);
      cy.validateResponse(response, putRequestBody);
    });
  });
  it("Partially update an existing User", () => {
    cy.request({
      method: "PATCH",
      url: `https://tech-global-training.com/students/${studentID}`,
      body: patchRequestBody,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.be.below(1000);
      cy.validateResponse(response, patchRequestBody);
    });
  });
  it("Retrieve a list of all users again", () => {
    cy.request({
      method: "GET",
      url: "https://tech-global-training.com/students",
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.be.below(1000);
      expect(response.body.length).to.greaterThan(2);
    });
  });
  it("Retrieve a specific user created to confirm the update.", () => {
    cy.request({
      method: "GET",
      url: `https://tech-global-training.com/students/${studentID}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.be.below(1000);
      cy.validateResponse(response, patchRequestBody);
    });
  });

  it("Finally, delete the user that you created.", () => {
    cy.request({
      method: "DELETE",
      url: `https://tech-global-training.com/students/${studentID}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.duration).to.be.below(1000);
    });
  });
});
