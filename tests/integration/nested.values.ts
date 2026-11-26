import { expect } from "chai";

import { FormInterface } from "../../src/models/FormInterface";
import $ from "../fixtures/_.nested"; // FORMS


describe("Check Nested $F Unified Properties (values)", () => {
  it("$F state.city id should be a string", () =>
    expect($.$F.$("state.city").id).to.be.a("string"));

  it("$F state.city value should be an object", () =>
    expect($.$F.$("state.city").value).to.be.an("object"));

  it("$F state.city value should be an object", () =>
    expect($.$F.$("state.city").value).to.have.property("places"));

  it("$F state.city.places value should be an object", () =>
    expect($.$F.$("state.city.places").value).to.be.an("object"));

  it("$F state.city.places value should be an object", () =>
    expect($.$F.$("state.city.places").value).to.have.property(
      "statueOfLiberty"
    ));
});

describe("Check Nested $I Separated Properties (values)", () => {
  it("$I state.city.places.centralPark value should be true", () =>
    expect($.$I.$("state.city.places.centralPark").value).to.be.true);

  it("$I state.city.places.statueOfLiberty value should be false", () =>
    expect($.$I.$("state.city.places.statueOfLiberty").value).to.be.false);

  it("$I state.city.places.empireStateBuilding value should be true", () =>
    expect($.$I.$("state.city.places.empireStateBuilding").value).to.be.true);

  it("$I state.city.places.brooklynBridge value should be false", () =>
    expect($.$I.$("state.city.places.brooklynBridge").value).to.be.false);
});

describe("Check Nested $L Values", () => {
  it("$L state.city.places.centralPark value should be true", () =>
    expect($.$L.$("state.city.places.centralPark").value).to.be.true);

  it("$L state.city.places.statueOfLiberty value should be false", () =>
    expect($.$L.$("state.city.places.statueOfLiberty").value).to.be.false);

  it("$L state.city.places.empireStateBuilding value should be true", () =>
    expect($.$L.$("state.city.places.empireStateBuilding").value).to.be.true);

  it("$L state.city.places.brooklynBridge value should be false", () =>
    expect($.$L.$("state.city.places.brooklynBridge").value).to.be.false);
});

describe("Check Nested $M Values", () => {
  it('$M club value should be equal to "HELLO"', () =>
    expect($.$M.$("club").value).to.be.equal("HELLO"));

  it('$M members[0].firstname value should be equal to "Clint"', () =>
    expect($.$M.$("members[0].firstname").value).to.be.equal("Clint"));

  it('$M members[1].firstname value should be equal to "Charlie"', () =>
    expect($.$M.$("members[1].firstname").value).to.be.equal("Charlie"));

  it('$M members[0].hobbies[1] value should be equal to "Baseball"', () =>
    expect($.$M.$("members[0].hobbies[1]").value).to.be.equal("Baseball"));

  it('$M members[1].hobbies[0] value should be equal to "Golf"', () =>
    expect($.$M.$("members[1].hobbies[0]").value).to.be.equal("Golf"));

  it('$M members[1].hobbies[1] value should be equal to "Basket"', () =>
    expect($.$M.$("members[1].hobbies[1]").value).to.be.equal("Basket"));
});

describe("Check Nested $N Values", () => {
  it('$N nested.field value should be equal to "5" (string)', () =>
    expect($.$N.$("nested.field").value).to.be.equal("5"));

  it("$N nested.field value should be a string", () =>
    expect($.$N.$("nested.field").value).to.be.a("string"));

  it("$N nested.field get(value) should be equal to 5 (number)", () =>
    expect($.$N.$("nested.field").get("value")).to.be.equal(5));

  it("$N nested.field get(value) should be a number", () =>
    expect($.$N.$("nested.field").get("value")).to.be.a("number"));

  it("$N club value should be equal to empty object", () =>
    expect($.$N.$("club").value).to.deep.equal({ name: "", city: "" }));

  it('$N members.0.firstname value should be equal to "Clint"', () =>
    expect($.$N.$("members.0.firstname").value).to.be.equal("Clint"));

  it("$N members.1.firstname value should be empty", () =>
    expect($.$N.$("members.1.firstname").value).to.be.empty);

  it('$N members.0.hobbies.1 value should be equal to "Baseball"', () =>
    expect($.$N.$("members.0.hobbies.1").value).to.be.equal("Baseball"));

  it('$N members.1.hobbies.0 value should be equal to "Golf"', () =>
    expect($.$N.$("members.1.hobbies.0").value).to.be.equal("Golf"));

  it('$N members.1.hobbies.1 value should be equal to "Basket"', () =>
    expect($.$N.$("members.1.hobbies").$(1).value).to.be.equal("Basket"));
});

describe("Check Nested $O value computed check", () => {
  it("$O members[1].hobbies value should be array", () =>
    expect($.$O.$("members[1].hobbies").value).to.be.an("array"));

  it("$O members[1].hobbies value should be length of 2", () =>
    expect($.$O.$("members[1].hobbies").value).to.have.lengthOf(2));
});

describe("Check Nested $O Values", () => {
  it("$O club.name value should be equal to be empty", () =>
    expect($.$O.$("club.name").value).to.be.empty);

  it('$O club.city value should be equal to "New York"', () =>
    expect($.$O.$("club.city").value).to.be.equal("New York"));

  it('$O members[0].firstname value should be equal to "Clint"', () =>
    expect($.$O.$("members[0].firstname").value).to.be.equal("Clint"));

  it("$O members[1].firstname value should be empty", () =>
    expect($.$O.$("members[1].firstname").value).to.be.empty);

  it('$O members[1].lastname value should be equal to "Chaplin"', () =>
    expect($.$O.$("members[1].lastname").value).to.be.equal("Chaplin"));

  it('$O members[0].hobbies[1] value should be equal to "Baseball"', () =>
    expect($.$O.$("members[0].hobbies[1]").value).to.be.equal("Baseball"));

  it('$O members[1].hobbies[0] value should be equal to "Golf"', () =>
    expect($.$O.$("members[1].hobbies[0]").value).to.be.equal("Golf"));

  it('$O members[1].hobbies[1] value should be equal to "Basket"', () =>
    expect($.$O.$("members[1].hobbies[1]").value).to.be.equal("Basket"));
});

describe("Check Nested $P Values after reset", () => {
  it("$P club.name value should be empty", () =>
    expect($.$P.$("club.name").value).to.be.empty);

  it("$P members added by update() should be dropped", () =>
    expect($.$P.$("members").size).to.equal(0));

  it("$P members value should be empty", () =>
    expect($.$P.$("members").value).to.be.empty);
});

describe("Check Nested $R values()", () => {
  it("$R values() should be empty object", () =>
    expect($.$R.values()).to.be.deep.equal($.$R.initials()));

  it("$R (members).value should be equal to (members).initial", () =>
    expect($.$R.$("members").value).to.be.deep.equal(
      $.$R.$("members").initial
    ));
});

describe("Check Nested $Q Values after reset", () => {
  it('$Q club.name value should be equal to "HELLO"', () =>
    expect($.$Q.$("club.name").value).to.be.equal("HELLO"));

  it('$Q club.city value should be equal to "NY"', () =>
    expect($.$Q.$("club.city").value).to.be.equal("NY"));

  it('$Q members[1].firstname value should be equal to "Charlie"', () =>
    expect($.$Q.$("members[1].firstname").value).to.be.equal("Charlie"));

  it('$Q members[1].hobbies[1] value should be equal to "Basket"', () =>
    expect($.$Q.$("members[1].hobbies[1]").value).to.be.equal("Basket"));
});

describe("Check Nested $S Values", () => {
  it('$S club.name value should be equal to "club-name-set-value-intercepted"', () =>
    expect($.$S.$("club.name").value).to.be.equal(
      "club-name-set-value-intercepted"
    ));

  it('$S club.city value should be equal to "club-city-set-value"', () =>
    expect($.$S.$("club.city").value).to.be.equal("club-city-set-value"));

  it("$S club.bouncer value should be empty string", () =>
    expect($.$S.$("club.bouncer").value).to.equal(""));
});


describe("Check Nested $A1 Values", () => {
  it('$A1 form values() should be equal to "{ user: { firstname: null, lastname: null } }"', () =>
  expect($.$A1.values()).to.be.deep.equal({ user: { firstname: null, lastname: null } }));

  it('$A1 user values() should be equal to "{ firstname: null, lastname: null }"', () =>
    expect($.$A1.$('user').values()).to.be.deep.equal({ firstname: null, lastname: null }));

  it('$A1 user value should be equal to "{ firstname: null, lastname: null }"', () =>
    expect($.$A1.$('user').value).to.be.deep.equal({ firstname: '', lastname: '' }));

  it('$A1 user.firstname value should be equal to empty string', () =>
    expect($.$A1.$('user.firstname').value).to.be.equal(''));

  it('$A1 user.lastname value should be equal to empty string', () =>
    expect($.$A1.$('user.lastname').value).to.be.equal(''));
});

describe("Check Nested $A2 Values", () => {
  it('$A2 form values() should be equal to "{ user: { firstname: null, lastname: null } }"', () =>
  expect($.$A2.values()).to.be.deep.equal({ user: { firstname: null, lastname: null } }));

  it('$A2 user values() should be equal to "{ firstname: null, lastname: null }"', () =>
    expect($.$A2.$('user').values()).to.be.deep.equal({ firstname: null, lastname: null }));

  it('$A2 user values() should be equal to "{ firstname: null, lastname: null }"', () =>
    expect($.$A2.$('user').values()).to.be.deep.equal({ firstname: null, lastname: null }));

  it('$A2 user.firstname value should be null', () =>
    expect($.$A2.$('user.firstname').value).to.be.null);

  it('$A2 user.lastname value should be null', () =>
    expect($.$A2.$('user.lastname').value).to.be.null);

});
