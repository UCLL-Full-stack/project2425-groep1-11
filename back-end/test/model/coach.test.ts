import { Coach } from "../../model/coach";

test("valid Head coach model", () => {
    const coach = new Coach({
        id: 1,
        name: "Aaron Abbey",
        job: "Head coach"
       
    });

    expect(coach.getId()).toBe(1);
    expect(coach.getName()).toMatch("Aaron Abbey")
    expect(coach.getJob()).toMatch("Head coach")
});


test("valid Assistent coach model", () => {
    const coach = new Coach({
        id: 2,
        name: "Elliot Englishman",
        job: "Assistant coach"
       
    });

    expect(coach.getId()).toBe(2);
    expect(coach.getName()).toMatch("Elliot Englishman")
    expect(coach.getJob()).toMatch("Assistant coach")
});

test("invalid Coach model with blank name", () => {
    expect(() => {
        new Coach({
            id: 2,
            name: "",
            job: "Assistant coach"
           
        });
    }).toThrow("Name cannot be empty.");
});
