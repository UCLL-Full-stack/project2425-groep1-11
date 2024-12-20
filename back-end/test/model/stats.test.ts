import { Stats } from "../../model/stats";

test("valid Stats model", () => {
    const stat = new Stats({
       id: 1,
       playerId: 1,
       appearances: 10,
       goals: 3,
       assists: 3
    });

    expect(stat.getId()).toBe(1)
    expect(stat.getPlayerId()).toBe(1)
    expect(stat.getAppearances()).toBe(10)
    expect(stat.getGoals()).toBe(3)
    expect(stat.getAssists()).toBe(3)
});


test("invalid Stats model with negative appearances", () => {
    expect(() => {
        new Stats({
            id: 1,
            playerId: 1,
            appearances: -12,
            goals: 3,
            assists: 3
         });
    }).toThrow("Appearances cannot be negative.");
});


test("invalid Player model with negative goals", () => {
    expect(() => {
        new Stats({
            id: 1,
            playerId: 1,
            appearances: 2,
            goals: -3,
            assists: 3
         });
    }).toThrow("Goals cannot be negative.");
});

test("invalid Player model with negative assists", () => {
    expect(() => {
        new Stats({
            id: 1,
            playerId: 1,
            appearances: 2,
            goals: 3,
            assists: -112
         });
    }).toThrow("Assists cannot be negative.");
});