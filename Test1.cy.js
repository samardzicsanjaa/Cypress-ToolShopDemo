///<reference types="cypress" />

describe("PurchaseFlow", () => {
  it("RegistrationLoginAndPurchase", () => {
    cy.visit("https://practicesoftwaretesting.com/");
    cy.url().should("eq", "https://practicesoftwaretesting.com/#/");
    cy.get('[data-test="nav-sign-in"]').click();
    cy.url().should("eq", "https://practicesoftwaretesting.com/#/auth/login");
    cy.get('[data-test="register-link"]').click();
    cy.url().should(
      "eq",
      "https://practicesoftwaretesting.com/#/auth/register"
    );
    cy.get('[data-test="first-name"]').type("Demo");
    cy.get('[data-test="last-name"]').type("User");
    cy.get('[data-test="dob"]').type("1991-11-08");
    cy.get('[data-test="address"]').type("Belgrade");
    cy.get('[data-test="postcode"]').type("10000");
    cy.get('[data-test="city"]').type("Belgrade");
    cy.get('[data-test="state"]').type("N/A");
    cy.get('[data-test="country"]').select("Serbia");
    cy.get('[data-test="country"]').should("have.value", "RS");
    cy.get('[data-test="phone"]').type("0640000000");
    cy.get('[data-test="email"]').type("demouser044@gmail.com");
    cy.get('[data-test="password"]').type("Test123#");
    cy.get('[data-test="register-submit"]').click();
    cy.url().should("eq", "https://practicesoftwaretesting.com/#/auth/login");
    cy.get('[id="email"]').type("demouser044@gmail.com");
    cy.get('[id="password"]').type("Test123#");
    cy.get('[data-test="login-submit"]').click();
    cy.url().should("eq", "https://practicesoftwaretesting.com/#/account");
    cy.wait(2000);
    cy.get('[data-test="nav-home"]').click();
    cy.url().should("eq", "https://practicesoftwaretesting.com/#/");
    cy.get("label").contains("Pliers").click();
    cy.get('h5[data-test="product-name"]')
      .filter((index, element) => {
        return element.innerText === "Pliers";
      })
      .click();
    cy.get('[data-test="increase-quantity"] > .fa').click();
    cy.get('[data-test="quantity"]').should("have.value", "2");
    cy.get('[data-test="add-to-cart"]').click();
    cy.get(".toast.bg-success.text-light.fade.show").should("exist");
    cy.wait(2000);
    cy.get('[data-test="cart-quantity"]').should("have.text", "2");
    cy.wait(2000);
    cy.get('[data-test="nav-home"]').click();
    cy.url().should("eq", "https://practicesoftwaretesting.com/#/");
    cy.get("label").contains("Wrench").click();
    cy.get('h5[data-test="product-name"]')
      .contains(" Adjustable Wrench")
      .click();
    cy.get('[data-test="product-name"]').should("contain", "Adjustable Wrench");
    cy.get('[data-test="quantity"]').should("have.value", "1");
    cy.get('[data-test="add-to-cart"]').click();
    cy.get(".toast.bg-success.text-light.fade.show").should("exist");
    cy.wait(2000);
    cy.get('[data-test="cart-quantity"]').should("have.text", "3");
    cy.get('[data-test="nav-cart"] > .fa').click();
    cy.url().should("eq", "https://practicesoftwaretesting.com/#/checkout");
    cy.get('[data-test="proceed-1"]').click();
    cy.wait(2000);
    cy.contains(
      "Hello Demo User, you are already logged in. You can proceed to checkout."
    ).should("exist");
    cy.get('[data-test="proceed-2"]').click();
    cy.get('[steptitle="Address"] > .container > .row > .col-md-6 > h3').should(
      "exist"
    );
    cy.get('[data-test="address"]').invoke("val").should("eq", "Belgrade");
    cy.get('[data-test="city"]').invoke("val").should("eq", "Belgrade");
    cy.get('[data-test="state"]').invoke("val").should("eq", "N/A");
    cy.get('[data-test="country"]').invoke("val").should("eq", "RS");
    cy.get('[data-test="postcode"]').invoke("val").should("eq", "10000");
    cy.get('[data-test="proceed-3"]').click();
    cy.get(
      "aw-wizard-completion-step > .container > .row > .col-md-6 > h3"
    ).should("exist");
    cy.get('[id="payment-method"]').select("Credit Card");
    cy.get('[id="payment-method"]').should("have.value", "3: Credit Card");
    cy.get('[data-test="account-name"]').type("Demo User");
    cy.get('[data-test="account-number"]').type("2424");
    cy.contains('[data-test="finish"]', "Confirm").click();
    cy.get(".alert.alert-success")
      .should("exist")
      .contains(".help-block", "Payment was successful");
  });
});
