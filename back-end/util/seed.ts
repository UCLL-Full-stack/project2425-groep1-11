import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    try {
      await prisma.user.deleteMany()
      await prisma.stats.deleteMany()
      await prisma.player.deleteMany()
      await prisma.coach.deleteMany()
      await prisma.match.deleteMany()
      await prisma.team.deleteMany()
      await seed();
    } catch (e) {
      console.error(e);
    } finally {
      await prisma.$disconnect();
    }
  };

  async function seed() {
    const user = await prisma.user.createMany({
      data: [{
        email: 'team11@admin.be',
        password: await bcrypt.hash('admin', 12),
        role: 'Admin',
        },

        {
        email: 'team11@coach.be',
        password: await bcrypt.hash('coach', 12),
        role: 'Coach',
        },

        {
        email: 'team11@player.be',
        password: await bcrypt.hash('player', 12),
        role: 'Player',
        }
      ] 
    });

    const coach = await prisma.coach.createMany({
      data: [
        {
          name: 'Aaron Abbey',
          job: 'Head Coach',
          imageUrl: 'NO PICTURE???'
        },
        {
          name: 'Elliot Leigh',
          job: 'Assistant Coach'
        }
      ]
    });

    const team = await prisma.team.createMany({
        data: [
          {id:1, name: 'Manchester Shitty'},
          {id:2, name: 'Dokters United'},
          {id:3, name: 'FC Tigerno'},
          {id:4, name: 'Schalke Nul Bier'},
          {id:5, name: 'Collygang'},
          {id:6, name: 'Spatzia Louvain'},
          {id:7, name: 'Humaniora'},
          {id:8, name: 'Custodes Stellantis'},
          {id:9, name: 'Paralympiakos'},
          {id:10, name: 'Dynamo Daggoe'}
        ]
    });

    const player = await prisma.player.createMany({
      data: [
        {
          id: 1,
          name: 'Arvin Hadji Aligol',
          number: 1,
          position: 'Goalkeeper',
          birthdate: new Date('2001-09-12'),
          imageUrl: 'https://i.imgur.com/hcFQP5K.png',
          teamId: 1,
        },

        {
          id: 2,
          name: 'Jordy De Boeck',
          number: 7,
          position: 'Midfielder',
          birthdate: new Date('2003-04-12'),
          imageUrl: 'https://i.imgur.com/evC7tej.png',
          teamId: 1,
        },

        {
          id: 3,
          name: 'Maxime Detollenaere',
          number: 9,
          position: 'Forward',
          birthdate: new Date('2002-03-12'),
          imageUrl: 'https://i.imgur.com/kCKrfmM.png',
          teamId: 1,
        },

        {
          id: 4,
          name: 'Zion Scheffer',
          number: 13,
          position: 'Forward',
          birthdate: new Date('2003-05-19'),
          imageUrl: 'https://i.imgur.com/DO6XNQG.png',
          teamId: 1,
        },

        {
          id: 5,
          name: 'Dylan Vangoidtsenhoven',
          number: 24,
          position: 'Midfielder',
          birthdate: new Date('2002-08-29'),
          imageUrl: 'https://i.imgur.com/Dsj69P6.png',
          teamId: 1,
        },

        {
          id: 6,
          name: 'Tristan Devroey',
          number: 43,
          position: 'Defender',
          birthdate: new Date('2004-03-15'),
          imageUrl: 'https://i.imgur.com/glwo1ZF.png',
          teamId: 1,
        },

        {
          id: 7,
          name: 'Yasir Hozan',
          number: 69,
          position: 'Defender',
          birthdate: new Date('2000-01-27'),
          imageUrl: 'https://i.imgur.com/p4KGy6O.png',
          teamId: 1,
        },

        {
          id: 8,
          name: 'Aman Aron Gebriel',
          number: 2,
          position: 'Midfielder',
          birthdate: new Date('2002-05-22'),
          teamId: 1,
        },

        {
          id: 9,
          name: 'Matthias Maeckelbergh',
          number: 4,
          position: 'Defender',
          birthdate: new Date('2001-03-07'),
          teamId: 1,
        },

        {
          id: 10,
          name: 'Marijn Fitters',
          number: 3,
          position: 'Defender',
          birthdate: new Date('2003-07-17'),
          teamId: 1,          
        },

        {
          id: 11,
          name: 'Arthur Norga',
          number: 5,
          position: 'Goalkeeper',
          birthdate: new Date('2001-07-21'),
          teamId: 1,
        }
      ]
    });

    const stats = await prisma.stats.createMany({
      data: [
        {
          playerId: 1,
          appearances: 8,
          goals: 0,
          assists: 0,
        },

        {
          playerId: 2,
          appearances: 8,
          goals: 3,
          assists: 4,
        },

        {
          playerId: 3,
          appearances: 7,
          goals: 1,
          assists: 1,
        },

        {
          playerId: 4,
          appearances: 8,
          goals: 8,
          assists: 2,
        },

        {
          playerId: 5,
          appearances: 8,
          goals: 17,
          assists: 7,
        },

        {
          playerId: 6,
          appearances: 6,
          goals: 0,
          assists: 0,
        },

        {
          playerId: 7,
          appearances: 8,
          goals: 0,
          assists: 1,
        },

        {
          playerId: 8,
          appearances: 3,
          goals: 0,
          assists: 1,
        },

        {
          playerId: 9,
          appearances: 8,
          goals: 0,
          assists: 3,
        },

        {
          playerId: 10,
          appearances: 6,
          goals: 4,
          assists: 2,
        },

        {
          playerId: 11,
          appearances: 3,
          goals: 0,
          assists: 0,
        }
      ]});


    const match = await prisma.match.createMany({
      data: [
        {
          homeTeamName: 'Spatzia Louvain',
          awayTeamName: 'Schalke Nul Bier',
          homeScore: 2,
          awayScore: 2,
          date: new Date('2024-09-24'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'FC Tigerno',
          awayTeamName: 'Collygang',
          homeScore: 2,
          awayScore: 6,
          date: new Date('2024-09-24'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Manchester Shitty',
          awayTeamName: 'Dokters United',
          homeScore: 5,
          awayScore: 3,
          date: new Date('2024-09-26'),
          location: 'Rijschool Leuven',
        },

        {
          homeTeamName: 'Spatzia Louvain',
          awayTeamName: 'Collygang',
          homeScore: 13,
          awayScore: 6,
          date: new Date('2024-09-30'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Paralympiakos',
          awayTeamName: 'Schalke Nul Bier',
          homeScore: 0,
          awayScore: 6,
          date: new Date('2024-09-30'),
          location: 'Heilig Hart Heverlee',
        },

        {
          homeTeamName: 'FC Tigerno',
          awayTeamName: 'Dynamo Daggoe',
          homeScore: 4,
          awayScore: 1,
          date: new Date('2024-10-03'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Dokters United',
          awayTeamName: 'Custodes Stellantis',
          homeScore: 6,
          awayScore: 5,
          date: new Date('2024-10-08'),
          location: 'Rijschool Leuven',
        },

        {
          homeTeamName: 'Custodes Stellantis',
          awayTeamName: 'Paralympiakos',
          homeScore: 3,
          awayScore: 4,
          date: new Date('2024-10-08'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Custodes Stellantis',
          awayTeamName: 'FC Tigerno',
          homeScore: 2,
          awayScore: 5,
          date: new Date('2024-10-15'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'FC Tigerno',
          awayTeamName: 'Spatzia Louvain',
          homeScore: 8,
          awayScore: 10,
          date: new Date('2024-10-21'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Dynamo Daggoe',
          awayTeamName: 'Dokters United',
          homeScore: 3,
          awayScore: 5,
          date: new Date('2024-10-21'),
          location: 'Sportscuur Wilsele',
        },

        {
          homeTeamName: 'Manchester Shitty',
          awayTeamName: 'Spatzia Louvain',
          homeScore: 7,
          awayScore: 2,
          date: new Date('2024-10-23'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Collygang',
          awayTeamName: 'Schalke Nul Bier',
          homeScore: 7,
          awayScore: 4,
          date: new Date('2024-10-24'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Dynamo Daggoe',
          awayTeamName: 'Custodes Stellantis',
          homeScore: 4,
          awayScore: 3,
          date: new Date('2024-10-27'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Dokters United',
          awayTeamName: 'Paralympiakos',
          homeScore: 3,
          awayScore: 3,
          date: new Date('2024-10-28'),
          location: 'Redingenhof Leuven',
        },

        {
          homeTeamName: 'Collygang',
          awayTeamName: 'Spatzia Louvain',
          homeScore: 5,
          awayScore: 6,
          date: new Date('2024-10-29'),
          location: 'Sportscuur Wilsele',
        },

        {
          homeTeamName: 'Schalke Nul Bier',
          awayTeamName: 'Dynamo Daggoe',
          homeScore: 3,
          awayScore: 2,
          date: new Date('2024-10-30'),
          location: 'Heilig Hart Heverlee',
        },

        {
          homeTeamName: 'Manchester Shitty',
          awayTeamName: 'Humaniora',
          homeScore: 6,
          awayScore: 3,
          date: new Date('2024-10-30'),
          location: 'Sportcomplex Kessel-Lo',
        },

        {
          homeTeamName: 'Paralympiakos',
          awayTeamName: 'Spatzia Louvain',
          homeScore: 7,
          awayScore: 3,
          date: new Date('2024-10-30'),
          location: 'Wijnpers Leuven',
        },

        {
          homeTeamName: 'Humaniora',
          awayTeamName: 'FC Tigerno',
          homeScore: 6,
          awayScore: 8,
          date: new Date('2024-10-31'),
          location: 'Redingenhof Leuven',
        },

        {
          homeTeamName: 'FC Tigerno',
          awayTeamName: 'Schalke Nul Bier',
          homeScore: 1,
          awayScore: 8,
          date: new Date('2024-11-03'),
          location: 'Rijschool Leuven',
        },

        {
          homeTeamName: 'Custodes Stellantis',
          awayTeamName: 'Spatzia Louvain',
          homeScore: 12,
          awayScore: 5,
          date: new Date('2024-11-04'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Collygang',
          awayTeamName: 'Dokters United',
          homeScore: 4,
          awayScore: 7,
          date: new Date('2024-11-04'),
          location: 'Rijschool Leuven',
        },

        {
          homeTeamName: 'Manchester Shitty',
          awayTeamName: 'FC Tigerno',
          homeScore: 4,
          awayScore: 11,
          date: new Date('2024-11-04'),
          location: 'Redingenhof Leuven',
        },

        {
          homeTeamName: 'Humaniora',
          awayTeamName: 'Dynamo Daggoe',
          homeScore: 12,
          awayScore: 1,
          date: new Date('2024-11-06'),
          location: 'Sportcomplex Kessel-Lo',
        },

        {
          homeTeamName: 'Dynamo Daggoe',
          awayTeamName: 'Manchester Shitty',
          homeScore: 3,
          awayScore: 3,
          date: new Date('2024-11-07'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Paralympiakos',
          awayTeamName: 'Collygang',
          homeScore: 3,
          awayScore: 3,
          date: new Date('2024-11-10'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Dokters United',
          awayTeamName: 'Manchester Shitty',
          homeScore: 3,
          awayScore: 1,
          date: new Date('2024-11-13'),
          location: 'Heilig Hart Heverlee',
        },

        {
          homeTeamName: 'Dynamo Daggoe',
          awayTeamName: 'Humaniora',
          homeScore: 4,
          awayScore: 9,
          date: new Date('2024-11-18'),
          location: 'Wijnpers Leuven',
        },

        {
          homeTeamName: 'Dokters United',
          awayTeamName: 'Schalke Nul Bier',
          homeScore: 4,
          awayScore: 4,
          date: new Date('2024-11-20'),
          location: 'Sportcomplex Heverlee',
        },

        {
          homeTeamName: 'Manchester Shitty',
          awayTeamName: 'Schalke Nul Bier',
          homeScore: 4,
          awayScore: 1,
          date: new Date('2024-11-26'),
          location: 'Rijschool Leuven',
        },

        {
          homeTeamName: 'Manchester Shitty',
          awayTeamName: 'Custodes Stellantis',
          homeScore: 3,
          awayScore: 4,
          date: new Date('2024-12-01'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Paralympiakos',
          awayTeamName: 'Dokters United',
          homeScore: 5,
          awayScore: 8,
          date: new Date('2024-12-03'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Dynamo Daggoe',
          awayTeamName: 'Paralympiakos',
          homeScore: 4,
          awayScore: 3,
          date: new Date('2024-12-08'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Humaniora',
          awayTeamName: 'Collygang',
          homeScore: 5,
          awayScore: 4,
          date: new Date('2024-12-11'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Collygang',
          awayTeamName: 'Custodes Stellantis',
          homeScore: 3,
          awayScore: 5,
          date: new Date('2024-12-12'),
          location: 'Rijschool Leuven',
        },

        {
          homeTeamName: 'Collygang',
          awayTeamName: 'Paralympiakos',
          homeScore: 6,
          awayScore: 3,
          date: new Date('2024-12-17'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Dynamo Daggoe',
          awayTeamName: 'Collygang',
          date: new Date('2025-02-16'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Spatzia Louvain',
          awayTeamName: 'Humaniora',
          date: new Date('2025-02-18'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Dokters United',
          awayTeamName: 'FC Tigerno',
          date: new Date('2025-02-18'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Paralympiakos',
          awayTeamName: 'Manchester Shitty',
          date: new Date('2025-02-20'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Spatzia Louvain',
          awayTeamName: 'Custodes Stellantis',
          date: new Date('2025-02-24'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Custodes Stellantis',
          awayTeamName: 'Schalke Nul Bier',
          date: new Date('2025-03-02'),
          location: 'Rijschool Leuven',
        },

        {
          homeTeamName: 'Spatzia Louvain',
          awayTeamName: 'Dynamo Daggoe',
          date: new Date('2025-03-03'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Manchester Shitty',
          awayTeamName: 'Collygang',
          date: new Date('2025-03-03'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Paralympiakos',
          awayTeamName: 'Humaniora',
          date: new Date('2025-03-04'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'FC Tigerno',
          awayTeamName: 'Dokters United',
          date: new Date('2025-03-04'),
          location: 'Wijnpers Leuven',
        },

        {
          homeTeamName: 'Dynamo Daggoe',
          awayTeamName: 'Schalke Nul Bier',
          date: new Date('2025-03-06'),
          location: 'Sportcomplex Kessel-Lo',
        },

        {
          homeTeamName: 'Custodes Stellantis',
          awayTeamName: 'Collygang',
          date: new Date('2025-03-06'),
          location: 'Wijnpers Leuven',
        },

        {
          homeTeamName: 'Spatzia Louvain',
          awayTeamName: 'FC Tigerno',
          date: new Date('2025-03-10'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Spatzia Louvain',
          awayTeamName: 'Paralympiakos',
          date: new Date('2025-03-17'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Spatzia Louvain',
          awayTeamName: 'Dokters United',
          date: new Date('2025-03-24'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Dynamo Daggoe',
          awayTeamName: 'FC Tigerno',
          date: new Date('2025-03-24'),
          location: 'Wijnpers Leuven',
        },

        {
          homeTeamName: 'Paralympiakos',
          awayTeamName: 'Custodes Stellantis',
          date: new Date('2025-03-25'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Schalke Nul Bier',
          awayTeamName: 'Manchester Shitty',
          date: new Date('2025-03-25'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Collygang',
          awayTeamName: 'Humaniora',
          date: new Date('2025-03-30'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Schalke Nul Bier',
          awayTeamName: 'Dokters United',
          date: new Date('2025-04-01'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Paralympiakos',
          awayTeamName: 'Dynamo Daggoe',
          date: new Date('2025-04-03'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Collygang',
          awayTeamName: 'Manchester Shitty',
          date: new Date('2025-04-03'),
          location: 'Rijschool Leuven',
        },

        {
          homeTeamName: 'Custodes Stellantis',
          awayTeamName: 'Humaniora',
          date: new Date('2025-03-10'),
          location: 'Rijschool Leuven',
        },

        {
          homeTeamName: 'Schalke Nul Bier',
          awayTeamName: 'Humaniora',
          date: new Date('2025-04-22'),
          location: 'Heilig Hart Heverlee',
        },

        {
          homeTeamName: 'Schalke Nul Bier',
          awayTeamName: 'Collygang',
          date: new Date('2025-04-29'),
          location: 'Sportoase Philipssite',
        },

        {
          homeTeamName: 'Manchester Shitty',
          awayTeamName: 'Dynamo Daggoe',
          date: new Date('2025-05-05'),
          location: 'Wijnpers Leuven',
        },

        {
          homeTeamName: 'Custodes Stellantis',
          awayTeamName: 'Dokters United',
          date: new Date('2025-05-05'),
          location: 'Wijnpers Leuven',
        },

        {
          homeTeamName: 'Schalke Nul Bier',
          awayTeamName: 'Spatzia Louvain',
          date: new Date('2025-05-06'),
          location: 'Heilig Hart Heverlee',
        },

        {
          homeTeamName: 'FC Tigerno',
          awayTeamName: 'Paralympiakos',
          date: new Date('2025-05-06'),
          location: 'Sportoaase Philipssite',
        },

        {
          homeTeamName: 'Dokters United',
          awayTeamName: 'Dynamo Daggoe',
          date: new Date('2025-05-07'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Dynamo Daggoe',
          awayTeamName: 'Spatzia Louvain',
          date: new Date('2025-05-12'),
          location: 'Sportcomplex Kessel-Lo',
        },

        {
          homeTeamName: 'Collygang',
          awayTeamName: 'FC Tigerno',
          date: new Date('2025-05-13'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Schalke Nul Bier',
          awayTeamName: 'Paralympiakos',
          date: new Date('2025-05-13'),
          location: 'Sportoase Philipssite',
        },
        {
          homeTeamName: 'Custodes Stellantis',
          awayTeamName: 'Manchester Shitty',
          date: new Date('2025-05-14'),
          location: 'Rijschool Leuven',
        },

        {
          homeTeamName: 'Dokters United',
          awayTeamName: 'Spatzia Louvain',
          date: new Date('2025-05-20'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Schalke Nul Bier',
          awayTeamName: 'FC Tigerno',
          date: new Date('2025-05-21'),
          location: 'Rijschool Leuven',
        },

        {
          homeTeamName: 'Collygang',
          awayTeamName: 'Dynamo Daggoe',
          date: new Date('2025-05-22'),
          location: 'Sportschuur Wilsele',
        },

        {
          homeTeamName: 'Manchester Shitty',
          awayTeamName: 'Paralympiakos',
          date: new Date('2025-05-22'),
          location: 'Sportschuur Wilsele',
        },
      ]
    });

    console.log(user);
    console.log(coach);
    console.log(team);
    console.log(player);
    console.log(stats);
    console.log(match);
    console.log('The wait was worth it. Seeding completed!');
  }

  main().catch (async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });