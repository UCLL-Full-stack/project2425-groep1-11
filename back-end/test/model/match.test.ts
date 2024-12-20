import { Match } from "../../model/match";

test("valid Head coach model", () => {
    const match = new Match({
        id: 1,
        location: "London",
        date: new Date("2024-12-16T17:30:00Z"),
        homeTeamName: "Chelsea",
        awayTeamName: "Manchester United",
        homeScore: 2,
        awayScore: 1,

       
    });

    expect(match.getId()).toBe(1);
    expect(match.getLocation()).toMatch("London")
    expect(match.getDate()).toBeInstanceOf(Date)
    expect(match.getHomeTeamName()).toMatch("Chelsea")
    expect(match.getAwayTeamName()).toMatch("Manchester United")
    expect(match.getHomeScore()).toBe(2)
    expect(match.getAwayScore()).toBe(1)

    
});

test("valid Head coach model", () => {
    const match = new Match({
        id: 1,
        location: "Stamford Bridge",
        date: new Date("2024-12-16T17:30:00Z"),
        homeTeamName: "Chelsea",
        awayTeamName: "Manchester United",
        homeScore: null,
        awayScore: null,
    });

    expect(match.getId()).toBe(1);
    expect(match.getLocation()).toMatch("Stamford Bridge")
    expect(match.getDate()).toBeInstanceOf(Date)
    expect(match.getHomeTeamName()).toMatch("Chelsea")
    expect(match.getAwayTeamName()).toMatch("Manchester United")
    

    
});


test("invalid Player model with invalid birthdate", () => {
    expect(() => {
        new Match({
            id: 1,
            location: "",
            date: new Date("2025-12-16T17:30:00Z"),
            homeTeamName: "Chelsea",
            awayTeamName: "Manchester United",
            homeScore: 2,
            awayScore: 1,
        });
    }).toThrow("Location is required");
});

test("invalid Player model with invalid birthdate", () => {
    expect(() => {
        new Match({
            id: 1,
            location: "Stamford Bridge",
            date: new Date("2025-12-16T17:30:00Z"),
            homeTeamName: "",
            awayTeamName: "Manchester United",
            homeScore: 2,
            awayScore: 1,
        });
    }).toThrow("Home team name is required");
});

test("invalid Player model with invalid birthdate", () => {
    expect(() => {
        new Match({
            id: 1,
            location: "Stamford Bridge",
            date: new Date("2025-12-16T17:30:00Z"),
            homeTeamName: "Chelsea",
            awayTeamName: "",
            homeScore: 2,
            awayScore: 1,
        });
    }).toThrow("Away team name is required");
});