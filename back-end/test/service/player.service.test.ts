import playerDb from "../../repository/player.db";
import playerService from "../../service/player.service";



jest.mock("../../repository/player.db"); // Mock the playerDb module

describe("Player Service", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllPlayers", () => {
    it("should return all players when email is provided", async () => {
      const players = [{ id: 1, name: "John Doe" }];
      (playerDb.findAll as jest.Mock).mockResolvedValue(players);

      const result = await playerService.getAllPlayers({ email: "test@example.com" });

      expect(result).toEqual(players);
      expect(playerDb.findAll).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when email is not provided", async () => {
      await expect(playerService.getAllPlayers({ email: "" })).rejects.toThrow(
        "Cooked token not found"
      );
    });
  });

  describe("getPlayerById", () => {
    it("should return a player by ID when email is provided", async () => {
      const player = { id: 1, name: "John Doe" };
      (playerDb.findById as jest.Mock).mockResolvedValue(player);

      const result = await playerService.getPlayerById(1, { email: "test@example.com" });

      expect(result).toEqual(player);
      expect(playerDb.findById).toHaveBeenCalledWith(1);
    });

    it("should throw an error if player is not found", async () => {
      (playerDb.findById as jest.Mock).mockResolvedValue(null);

      await expect(
        playerService.getPlayerById(1, { email: "test@example.com" })
      ).rejects.toThrow("Player with id 1 not found");
    });

    it("should throw an error when email is not provided", async () => {
      await expect(playerService.getPlayerById(1, { email: "" })).rejects.toThrow(
        "Cooked token not found"
      );
    });
  });

  describe("addPlayer", () => {
    it("should add a player when valid data and admin role are provided", async () => {
      const playerInput = {
        name: "John Doe",
        number: 10,
        position: "Forward",
        birthdate: new Date("2000-01-01"),
        imageUrl: "url",
        teamId: 1
      };
      (playerDb.findById as jest.Mock).mockResolvedValue(null);
      (playerDb.addPlayer as jest.Mock).mockResolvedValue({ id: 1, ...playerInput });

      const result = await playerService.addPlayer(playerInput, {
        email: "admin@example.com",
        role: "Admin"
      });

      expect(result).toEqual({ id: 1, ...playerInput });
      expect(playerDb.addPlayer).toHaveBeenCalledWith(playerInput);
    });

    it("should throw an error if the player already exists", async () => {
      const playerInput = {
        name: "John Doe",
        number: 10,
        position: "Forward",
        birthdate: new Date("2000-01-01"),
        imageUrl: "url",
        teamId: 1
      };
      (playerDb.findById as jest.Mock).mockResolvedValue(playerInput);

      await expect(
        playerService.addPlayer(playerInput, {
          email: "admin@example.com",
          role: "Admin"
        })
      ).rejects.toThrow("Player with number 10 already exists");
    });

    it("should throw an error when email is not provided", async () => {
      const playerInput = {
        name: "John Doe",
        number: 10,
        position: "Forward",
        birthdate: new Date("2000-01-01"),
        imageUrl: "url",
        teamId: 1,
      };

      await expect(
        playerService.addPlayer(playerInput, { email: "", role: "Admin" })
      ).rejects.toThrow("Cooked token not found");
    });

    it("should throw an error if the role is Player", async () => {
      const playerInput = {
        name: "John Doe",
        number: 10,
        position: "Forward",
        birthdate: new Date("2000-01-01"),
        imageUrl: "url",
        teamId: 1,
      
      };

      await expect(
        playerService.addPlayer(playerInput, {
          email: "player@example.com",
          role: "Player"
        })
      ).rejects.toThrow("You do not have the permission to add a player");
    });
  });

  describe("updatePlayer", () => {
    it("should update a player when valid data and admin role are provided", async () => {
      const playerInput = {
        name: "John Doe",
        number: 10,
        position: "Forward",
        birthdate: new Date("2000-01-01")
      };

      (playerDb.updatePlayer as jest.Mock).mockResolvedValue({ id: 1, ...playerInput });

      const result = await playerService.updatePlayer(1, playerInput, {
        email: "admin@example.com",
        role: "Admin"
      });

      expect(result).toEqual({ id: 1, ...playerInput });
      expect(playerDb.updatePlayer).toHaveBeenCalledWith(1, playerInput);
    });
  });

  describe("RemovePlayer", () => {
    it("should delete a player when admin role is provided", async () => {
      (playerDb.deletePlayer as jest.Mock).mockResolvedValue(undefined);

      await playerService.RemovePlayer(1, {
        email: "admin@example.com",
        role: "Admin"
      });

      expect(playerDb.deletePlayer).toHaveBeenCalledWith(1);
    });

    it("should throw an error if role is not Admin", async () => {
      await expect(
        playerService.RemovePlayer(1, { email: "user@example.com", role: "User" })
      ).rejects.toThrow("You do not have the permission to delete a player.");
    });
  });
});
