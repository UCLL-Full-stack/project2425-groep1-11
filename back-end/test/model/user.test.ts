import { User } from "../../model/user";

test("valid admin user model", () => {
   const admin = new User({
    email: "aaron@chad.com",
    password: "Theonepieceisreal",
    role: "Admin"
   })

   expect(admin.getEmail()).toMatch("aaron@chad.com")
   expect(admin.getPassword()).toMatch("Theonepieceisreal")
   expect(admin.getRole()).toMatch("Admin")

});


test("valid Player user model", () => {
    const player = new User({
     email: "aaron@chad.com",
     password: "Theonepieceisreal",
     role: "Player"
    })
 
    expect(player.getEmail()).toMatch("aaron@chad.com")
    expect(player.getPassword()).toMatch("Theonepieceisreal")
    expect(player.getRole()).toMatch("Player")
 
 });


 test("valid coach user model", () => {
    const coach = new User({
     email: "aaron@chad.com",
     password: "Theonepieceisreal",
     role: "Coach"
    })
 
    expect(coach.getEmail()).toMatch("aaron@chad.com")
    expect(coach.getPassword()).toMatch("Theonepieceisreal")
    expect(coach.getRole()).toMatch("Coach")
 
 });

 test("invalid User with empty email ", () => {
     expect(() => {
        new User({
            email: "",
            password: "Theonepieceisreal",
            role: "Coach"
           })
             
         }).toThrow("Email cannot be empty.")
     })

     test("invalid Player model with blank name", () => {
        expect(() => {
           new User({
               email: "Luffytaro@wano.com",
               password: "",
               role: "Coach"
              })
                
            }).toThrow("Password cannot be empty.")
        })
   