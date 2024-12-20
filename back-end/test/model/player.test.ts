import { Player } from "../../model/player";
import { Stats } from "../../model/stats";

test("valid Player model", () => {
    const player = new Player({
        id: 1,
        name: "John Doe",
        position: "Goalkeeper",
        number: 10,
        birthdate: new Date("1990-01-01"),
        imageUrl: "https://example.com"
    });

    expect(player.getId()).toBe(1);
    expect(player.getName()).toBe("John Doe");
    expect(player.getPosition()).toBe("Goalkeeper");
    expect(player.getNumber()).toBe(10);
    expect(player.getBirthdate()).toEqual(new Date("1990-01-01"));
    expect(player.getimageUrl()).toBe("https://example.com");
    expect(player.getStat()).toBeUndefined();
});


test("Valid Player with stats ", () => {
    const player = new Player({
        id: 1,
        name: "John Doe",
        position: "Forward",
        number: 10,
        birthdate: new Date("1990-01-01"),
       stat: new Stats({ id: 1, playerId: 1, appearances: 0, goals: 0, assists: 0 })
    });


    expect(player.getId()).toBe(1);
    expect(player.getName()).toBe("John Doe");
    expect(player.getPosition()).toBe("Forward");
    expect(player.getNumber()).toBe(10);
    expect(player.getBirthdate()).toEqual(new Date("1990-01-01"));
    expect(player.getimageUrl()).toBeUndefined();
    expect(player.getStat()).toEqual(new Stats({ id: 1, playerId: 1, appearances: 0, goals: 0, assists: 0 }));

});

test("invalid Player model with blank name", () => {
    expect(() => {
        new Player({
            id: 1,
            name: "",
            position: "Goalkeeper",
            number: 10,
            birthdate: new Date("1990-01-01"),
            imageUrl: "https://example.com",
            
        });
    }).toThrow("Name is required");
});

test("invalid Player model with thriple digit squad number", () => {
    expect(() => {
        new Player({
            id: 1,
            name: "John Doe",
            position: "Forward",
            number: 100,
            birthdate: new Date("1990-01-01"),
            imageUrl: "https://example.com",
            
        });
    }).toThrow("Number must be between 0 and 99");
});

test("Valid Player with stats ", () => {
    expect(() => {
        new Player({
            id: 1,
            name: "John Doe",
            position: "Forward",
            number: 10,
            birthdate: new Date("1990-01-01"),
           stat: new Stats({ id: 1, playerId: 1, appearances: 0, goals: 0, assists: 0 })
            
        });
    })
});


test("invalid Player model with invalid birthdate", () => {
    expect(() => {
        new Player({
            id: 1,
            name: "John Doe",
            position: "Forward",
            number: 10,
            birthdate: new Date("2033-01-01"),
        });
    }).toThrow("Birthdate must be in the past");
});