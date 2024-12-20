import { Team } from "../../model/team";

test("valid Stats model", () => {
    const team = new Team({
        id: 1,
        name: "Real Madrid",
        goalsFor: 10,
        goalsAg: 3,
        points: 9,

    });

    expect(team.getId()).toBe(1)
    expect(team.getName()).toBe("Real Madrid")
    expect(team.getGoalsFor()).toBe(0)
    expect(team.getGoalsAg()).toBe(0)
    expect(team.getPoints()).toBe(0)
});


test("invalid Stats model with negative appearances", () => {
    expect(() => {
        new Team({
            id: 1,
            name: "",
            goalsFor: 10,
            goalsAg: 3,
            points: 9
        })
    }).toThrow("Name cannot be empty.");
});

test("invalid Stats model with negative appearances", () => {
    expect(() => {
        new Team({
            id: 1,
            name: "Real Madrid",
            goalsFor: -10,
            goalsAg: 3,
            points: 9
        })
    }).toThrow("Goals for cannot be negative.");
});

test("invalid Stats model with negative appearances", () => {
    expect(() => {
        new Team({
            id: 1,
            name: "Real Madrid",
            goalsFor: 10,
            goalsAg: -3,
            points: 9
        })
    }).toThrow("Goals against cannot be negative.");
});


test("invalid Stats model with negative appearances", () => {
    expect(() => {
        new Team({
            id: 1,
            name: "Real Madrid",
            goalsFor: 10,
            goalsAg: 3,
            points: -9
        })
    }).toThrow("Points cannot be negative.");
});